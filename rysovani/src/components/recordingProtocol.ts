/**
 * Zápis konstrukce pro přehrávač záznamu (česká školní notace, LaTeX pro KaTeX).
 *
 * Má-li krok vlastní zápis (`notation` z editoru záznamu), použije se beze změny.
 * Jinak se zápis odvodí z rozdílu snapshotů: nové úsečky, přímky, polopřímky,
 * kružnice (i oblouky), body na průsečících, nově uzavřené trojúhelníky a čtyřúhelníky,
 * smazání, posun a zvýraznění. Krok bez odvoditelného zápisu dostane popis kroku nebo
 * název akce — nikdy prázdný řádek.
 */

type ProtoPoint = { id: string; x: number; y: number; label: string; hidden?: boolean };
type ProtoShape = {
  id: string;
  type: string;
  label: string;
  thinStroke?: boolean;
  emphasisStroke?: boolean;
  definition: { p1Id: string; p2Id?: string; angle?: number };
};
export type ProtoStep = {
  actionType: string;
  description?: string;
  notation?: string;
  snapshot: { points: ProtoPoint[]; shapes: ProtoShape[]; freehandPaths?: unknown[] };
};

export type RecordingProtocolRow = {
  /** Index kroku v záznamu (0…n-1). */
  stepIndex: number;
  /** Zápis kroku v LaTeXu. */
  latex: string;
  /** true = zápis převzatý ze záznamu, false = odvozený z geometrie. */
  fromRecording: boolean;
};

const LINE_TYPES = new Set(['line', 'lineDashed', 'lineDashDot']);
const CIRCLE_TYPES = new Set(['circle', 'circleArc']);

/** Label do LaTeXu: ASCII nechá, jinak (A′, Sₖₗ) zabalí do \text{}. */
const SUBSCRIPTS: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  'ₐ': 'a', 'ₑ': 'e', 'ₕ': 'h', 'ᵢ': 'i', 'ⱼ': 'j', 'ₖ': 'k', 'ₗ': 'l', 'ₘ': 'm', 'ₙ': 'n',
  'ₒ': 'o', 'ₚ': 'p', 'ᵣ': 'r', 'ₛ': 's', 'ₜ': 't', 'ᵤ': 'u', 'ᵥ': 'v', 'ₓ': 'x',
};
function lx(label: string): string {
  let base = label.replace(/[′’]/g, "'");
  let sub = '';
  while (base.length > 1 && SUBSCRIPTS[base[base.length - 1]]) {
    sub = SUBSCRIPTS[base[base.length - 1]] + sub;
    base = base.slice(0, -1);
  }
  const m = /^([A-Za-z0-9]+)('*)$/.exec(base);
  const core = m ? base : `\\text{${base.replace(/[{}\\]/g, '')}}`;
  return sub ? `${core}_{${sub.toUpperCase()}}` : core;
}

function fmtCm(px: number, pixelsPerCm: number): string {
  const cm = Math.round((px / pixelsPerCm) * 10) / 10;
  const s = cm % 1 === 0 ? cm.toFixed(0) : cm.toFixed(1);
  return s.replace('.', '{,}');
}

function visibleLabel(p: ProtoPoint | undefined): string | null {
  if (!p || p.hidden) return null;
  const l = (p.label || '').trim();
  return l ? l : null;
}

function distPointToShape(pt: ProtoPoint, s: ProtoShape, byId: Map<string, ProtoPoint>): number {
  const a = byId.get(s.definition.p1Id);
  const b = s.definition.p2Id ? byId.get(s.definition.p2Id) : undefined;
  if (!a || !b) return Infinity;
  if (CIRCLE_TYPES.has(s.type)) {
    const r = Math.hypot(b.x - a.x, b.y - a.y);
    return Math.abs(Math.hypot(pt.x - a.x, pt.y - a.y) - r);
  }
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 < 1e-9) return Infinity;
  let t = ((pt.x - a.x) * dx + (pt.y - a.y) * dy) / len2;
  if (s.type === 'segment') t = Math.max(0, Math.min(1, t));
  else if (s.type === 'ray') t = Math.max(0, t);
  return Math.hypot(pt.x - (a.x + t * dx), pt.y - (a.y + t * dy));
}

/** Jméno útvaru v zápisu: přímka/kružnice svým popiskem, úsečka/polopřímka krajními body. */
function shapeName(
  s: ProtoShape,
  byId: Map<string, ProtoPoint>,
  labelOf: (p: ProtoPoint | undefined) => string | null = visibleLabel,
): string | null {
  const la = labelOf(byId.get(s.definition.p1Id));
  const lb = s.definition.p2Id ? labelOf(byId.get(s.definition.p2Id)) : null;
  const own = (s.label || '').trim();
  if (s.type === 'segment') return la && lb ? `${lx(la)}${lx(lb)}` : own ? lx(own) : null;
  if (s.type === 'ray') return own ? lx(own) : la && lb ? `\\mapsto ${lx(la)}${lx(lb)}` : null;
  return own ? lx(own) : null;
}

function direction(s: ProtoShape, byId: Map<string, ProtoPoint>): { x: number; y: number } | null {
  const a = byId.get(s.definition.p1Id);
  const b = s.definition.p2Id ? byId.get(s.definition.p2Id) : undefined;
  if (!a || !b) return null;
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  if (len < 1e-6) return null;
  return { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
}

function deriveStepLatex(step: ProtoStep, prev: ProtoStep['snapshot'], pixelsPerCm: number): string[] {
  const snap = step.snapshot;
  const byId = new Map(snap.points.map((p) => [p.id, p]));
  const prevPointIds = new Set(prev.points.map((p) => p.id));
  const prevShapeIds = new Set(prev.shapes.map((s) => s.id));
  const newShapes = snap.shapes.filter((s) => !prevShapeIds.has(s.id));
  const oldShapes = snap.shapes.filter((s) => prevShapeIds.has(s.id));
  const parts: string[] = [];
  const segmentPart = new Map<string, string>();

  // Neoznačený bod ležící přesně na pojmenovaném bodu (přichycení) nese jeho jméno.
  const namedPoints = snap.points.filter((p) => visibleLabel(p));
  const twinOf = (p: ProtoPoint | undefined): ProtoPoint | undefined => {
    if (!p) return undefined;
    if (visibleLabel(p)) return p;
    return namedPoints.find((q) => Math.hypot(q.x - p.x, q.y - p.y) < 1.5);
  };
  const labelOf = (p: ProtoPoint | undefined) => visibleLabel(twinOf(p));
  const canon = (id: string | undefined) => (id ? twinOf(byId.get(id))?.id ?? id : '');

  // Body: nové pojmenované viditelné body, které nejsou jen krajními body nových útvarů.
  const endpointIds = new Set<string>();
  for (const s of newShapes) {
    endpointIds.add(s.definition.p1Id);
    if (s.definition.p2Id) endpointIds.add(s.definition.p2Id);
  }
  const newPoints = snap.points.filter((p) => !prevPointIds.has(p.id) && visibleLabel(p));
  const groups = new Map<string, string[]>();
  for (const p of newPoints) {
    if (endpointIds.has(p.id) && newShapes.length > 0) continue;
    const on = oldShapes
      .filter((s) => distPointToShape(p, s, byId) < 1.5)
      .map((s) => shapeName(s, byId, labelOf))
      .filter((n): n is string => !!n);
    const key = on.join(' \\cap ');
    groups.set(key, [...(groups.get(key) ?? []), lx(p.label.trim())]);
  }
  for (const [key, labels] of groups) {
    const names = labels.join(',\\ ');
    parts.push(key ? `${names};\\ ${labels.join(', ')} \\in ${key}` : names);
  }

  // Útvary.
  for (const s of newShapes) {
    const a = byId.get(s.definition.p1Id);
    const b = s.definition.p2Id ? byId.get(s.definition.p2Id) : undefined;
    const la = labelOf(a);
    const lb = labelOf(b);
    const own = (s.label || '').trim();
    if (s.type === 'segment') {
      if (la && lb && a && b) {
        const d = fmtCm(Math.hypot(b.x - a.x, b.y - a.y), pixelsPerCm);
        const txt = `${lx(la)}${lx(lb)};\\ |${lx(la)}${lx(lb)}| = ${d}\\ \\text{cm}`;
        segmentPart.set([canon(a.id), canon(b.id)].sort().join('|'), txt);
        parts.push(txt);
      } else if (own) parts.push(lx(own));
    } else if (CIRCLE_TYPES.has(s.type)) {
      if (!a || !b) continue;
      const r = fmtCm(Math.hypot(b.x - a.x, b.y - a.y), pixelsPerCm);
      const center = la ? lx(la) : '\\cdot';
      const body = `(${center};\\ ${r}\\ \\text{cm})`;
      const kind = s.type === 'circleArc' ? 'oblouk' : 'kružnice';
      parts.push(own ? `${lx(own)};\\ ${lx(own)}${body}` : `\\text{${kind} }${body}`);
    } else if (s.type === 'ray') {
      if (la && lb) parts.push(`\\mapsto ${lx(la)}${lx(lb)}`);
      else if (own) parts.push(lx(own));
      else if (la && a && b) {
        const through = snap.points.find(
          (q) => q.id !== a.id && visibleLabel(q) && distPointToShape(q, s, byId) < 1.5,
        );
        parts.push(`\\mapsto ${lx(la)}${through ? lx(through.label.trim()) : ''}`);
      }
    } else if (LINE_TYPES.has(s.type)) {
      const name = own ? lx(own) : null;
      if (la && lb) {
        parts.push(name ? `${name};\\ ${name} = \\overleftrightarrow{${lx(la)}${lx(lb)}}` : `\\overleftrightarrow{${lx(la)}${lx(lb)}}`);
        continue;
      }
      const dir = direction(s, byId);
      let rel = '';
      if (dir) {
        for (const o of oldShapes) {
          if (!LINE_TYPES.has(o.type) && o.type !== 'segment' && o.type !== 'ray') continue;
          const on = shapeName(o, byId, labelOf);
          const od = direction(o, byId);
          if (!on || !od) continue;
          const dot = Math.abs(dir.x * od.x + dir.y * od.y);
          if (dot < 0.02) { rel = ` \\perp ${on}`; break; }
          if (dot > 0.9998 && !rel) rel = ` \\parallel ${on}`;
        }
      }
      if (name) parts.push(rel ? `${name};\\ ${name}${rel}` : name);
      else if (rel) parts.push(`\\text{přímka}${rel}`);
    }
  }

  // Nově uzavřené trojúhelníky a čtyřúhelníky z úseček mezi pojmenovanými body.
  const segKey = (s: ProtoShape) => [canon(s.definition.p1Id), canon(s.definition.p2Id)].sort().join('|');
  const prevById = new Map(prev.points.map((p) => [p.id, p]));
  const prevNamed = prev.points.filter((p) => visibleLabel(p));
  const prevCanon = (id: string | undefined) => {
    const p = id ? prevById.get(id) : undefined;
    if (!p) return id ?? '';
    if (visibleLabel(p)) return p.id;
    return prevNamed.find((q) => Math.hypot(q.x - p.x, q.y - p.y) < 1.5)?.id ?? p.id;
  };
  const segsNow = new Set(snap.shapes.filter((s) => s.type === 'segment').map(segKey));
  const segsBefore = new Set(
    prev.shapes
      .filter((s) => s.type === 'segment')
      .map((s) => [prevCanon(s.definition.p1Id), prevCanon(s.definition.p2Id)].sort().join('|')),
  );
  const has = (set: Set<string>, x: string, y: string) => set.has([x, y].sort().join('|'));
  const named = namedPoints;
  const name = (p: ProtoPoint) => lx(p.label.trim());
  const dropSides = (pts: ProtoPoint[]) => {
    for (let i = 0; i < pts.length; i++) {
      const x = pts[i];
      const y = pts[(i + 1) % pts.length];
      const txt = segmentPart.get([x.id, y.id].sort().join('|'));
      const at = txt ? parts.indexOf(txt) : -1;
      if (at >= 0) parts.splice(at, 1);
    }
  };
  for (let i = 0; i < named.length; i++)
    for (let j = i + 1; j < named.length; j++)
      for (let k = j + 1; k < named.length; k++) {
        const [A, B, C] = [named[i], named[j], named[k]];
        if (!has(segsNow, A.id, B.id) || !has(segsNow, B.id, C.id) || !has(segsNow, A.id, C.id)) continue;
        if (has(segsBefore, A.id, B.id) && has(segsBefore, B.id, C.id) && has(segsBefore, A.id, C.id)) continue;
        // Strany trojúhelníku se v zápisu nevypisují zvlášť — stačí △ABC.
        dropSides([A, B, C]);
        parts.push(`\\triangle ${name(A)}${name(B)}${name(C)}`);
      }
  // Čtyřúhelník: uzavřený nekřížený cyklus 4 úseček, který tímto krokem vznikl.
  if (named.length >= 4 && named.length <= 24) {
    const crosses = (p: ProtoPoint, q: ProtoPoint, r: ProtoPoint, t: ProtoPoint) => {
      const o = (a: ProtoPoint, b: ProtoPoint, c: ProtoPoint) => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
      return o(p, q, r) * o(p, q, t) < 0 && o(r, t, p) * o(r, t, q) < 0;
    };
    const seen = new Set<string>();
    for (const A of named)
      for (const B of named) {
        if (B === A || !has(segsNow, A.id, B.id)) continue;
        for (const C of named) {
          if (C === A || C === B || !has(segsNow, B.id, C.id)) continue;
          for (const D of named) {
            if (D === A || D === B || D === C) continue;
            if (!has(segsNow, C.id, D.id) || !has(segsNow, D.id, A.id)) continue;
            if (has(segsNow, A.id, C.id) || has(segsNow, B.id, D.id)) continue; // úhlopříčky → spíš trojúhelníky
            const key = [A.id, B.id, C.id, D.id].sort().join('|');
            if (seen.has(key)) continue;
            seen.add(key);
            if (crosses(A, B, C, D) || crosses(B, C, D, A)) continue;
            const before =
              has(segsBefore, A.id, B.id) && has(segsBefore, B.id, C.id) && has(segsBefore, C.id, D.id) && has(segsBefore, D.id, A.id);
            if (before) continue;
            // Pořadí od abecedně prvního vrcholu, jak se čtyřúhelník píše.
            const ring = [A, B, C, D];
            const start = ring.reduce((m, p, idx) => (p.label.trim() < ring[m].label.trim() ? idx : m), 0);
            let ordered = [...ring.slice(start), ...ring.slice(0, start)];
            if (ordered[3].label.trim() < ordered[1].label.trim()) ordered = [ordered[0], ordered[3], ordered[2], ordered[1]];
            parts.push(`\\text{čtyřúhelník } ${ordered.map(name).join('')}`);
          }
        }
      }
  }

  if (parts.length > 0) return parts;

  // Bez nové geometrie: smazání, zvýraznění/ztenčení, posun bodů.
  const nowShapeIds = new Set(snap.shapes.map((s) => s.id));
  const prevByIdShape = new Map(prev.shapes.map((s) => [s.id, s]));
  const prevPointsById = new Map(prev.points.map((p) => [p.id, p]));
  const prevLabelOf = (p: ProtoPoint | undefined) => {
    if (!p) return null;
    if (visibleLabel(p)) return visibleLabel(p);
    const twin = prevNamed.find((q) => Math.hypot(q.x - p.x, q.y - p.y) < 1.5);
    return twin ? visibleLabel(twin) : null;
  };
  const removed = prev.shapes
    .filter((s) => !nowShapeIds.has(s.id))
    .map((s) => shapeName(s, prevPointsById, prevLabelOf))
    .filter((n): n is string => !!n);
  const nowPointIds = new Set(snap.points.map((p) => p.id));
  const removedPoints = prev.points.filter((p) => !nowPointIds.has(p.id) && visibleLabel(p)).map((p) => lx(p.label.trim()));
  if (removed.length + removedPoints.length > 0) {
    parts.push(`\\text{smažeme } ${[...removed, ...removedPoints].join(',\\ ')}`);
  }
  const emphasized: string[] = [];
  const restyled: string[] = [];
  for (const s of snap.shapes) {
    const before = prevByIdShape.get(s.id);
    if (!before) continue;
    const n = shapeName(s, byId, labelOf);
    if (!n) continue;
    if (!!s.emphasisStroke !== !!before.emphasisStroke && s.emphasisStroke) emphasized.push(n);
    else if (!!s.emphasisStroke !== !!before.emphasisStroke || !!s.thinStroke !== !!before.thinStroke || s.type !== before.type) restyled.push(n);
  }
  if (emphasized.length) parts.push(`\\text{zvýrazníme } ${emphasized.join(',\\ ')}`);
  if (restyled.length) parts.push(`\\text{upravíme čáru } ${restyled.join(',\\ ')}`);
  const moved = snap.points
    .filter((p) => {
      const q = prevPointsById.get(p.id);
      return q && visibleLabel(p) && Math.hypot(q.x - p.x, q.y - p.y) > 0.5;
    })
    .map((p) => lx(p.label.trim()));
  if (moved.length) parts.push(`\\text{posuneme } ${moved.join(',\\ ')}`);
  if (parts.length > 0) return parts;

  // Nové útvary bez jmen: aspoň druh útvaru (vlastní popis kroku má přednost).
  if ((step.description ?? '').trim()) return parts;
  const kinds: Record<string, string> = {
    segment: 'úsečka', line: 'přímka', lineDashed: 'přímka', lineDashDot: 'přímka', ray: 'polopřímka',
    circle: 'kružnice', circleArc: 'oblouk',
  };
  const kindList = [...new Set(newShapes.map((x) => kinds[x.type]).filter(Boolean))];
  if (kindList.length) parts.push(`\\text{${kindList.join(', ')}}`);
  return parts;
}

const ACTION_NAMES: Record<string, string> = {
  'create-point': 'bod',
  'create-segment': 'úsečka',
  'create-line': 'přímka',
  'create-line-dashed': 'přímka',
  'create-line-dashdot': 'přímka',
  'create-ray': 'polopřímka',
  'create-circle': 'kružnice',
  'create-angle': 'úhel',
  'move-point': 'posun bodu',
  delete: 'smazání',
  freehand: 'kreslení perem',
};

export function buildRecordingProtocol(steps: ReadonlyArray<ProtoStep>, pixelsPerCm = 50): RecordingProtocolRow[] {
  return steps.map((step, i) => {
    const own = (step.notation ?? '').trim();
    if (own) return { stepIndex: i, latex: own, fromRecording: true };
    const prev = i > 0 ? steps[i - 1].snapshot : { points: [], shapes: [] };
    const parts = deriveStepLatex(step, prev, pixelsPerCm);
    const fallback = (step.description || '').trim() || ACTION_NAMES[step.actionType] || `krok ${i + 1}`;
    const latex = parts.length > 0
      ? parts.join(',\\ \\ ')
      : `\\text{${fallback.replace(/[{}\\$%#&_^~]/g, '').slice(0, 80)}}`;
    return { stepIndex: i, latex, fromRecording: false };
  });
}
