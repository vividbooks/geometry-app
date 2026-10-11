/**
 * Zápis konstrukce pro přehrávač záznamu (česká školní notace, LaTeX pro KaTeX).
 *
 * Má-li krok vlastní zápis (`notation` z editoru záznamu), použije se beze změny.
 * Jinak se zápis odvodí z rozdílu snapshotů: nové úsečky, přímky, polopřímky,
 * kružnice (i oblouky), body na průsečících a nově uzavřené trojúhelníky.
 */

type ProtoPoint = { id: string; x: number; y: number; label: string; hidden?: boolean };
type ProtoShape = {
  id: string;
  type: string;
  label: string;
  definition: { p1Id: string; p2Id?: string; angle?: number };
};
export type ProtoStep = {
  actionType: string;
  description?: string;
  notation?: string;
  snapshot: { points: ProtoPoint[]; shapes: ProtoShape[] };
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
function shapeName(s: ProtoShape, byId: Map<string, ProtoPoint>): string | null {
  const la = visibleLabel(byId.get(s.definition.p1Id));
  const lb = s.definition.p2Id ? visibleLabel(byId.get(s.definition.p2Id)) : null;
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
      .map((s) => shapeName(s, byId))
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
    const la = visibleLabel(a);
    const lb = visibleLabel(b);
    const own = (s.label || '').trim();
    if (s.type === 'segment') {
      if (la && lb && a && b) {
        const d = fmtCm(Math.hypot(b.x - a.x, b.y - a.y), pixelsPerCm);
        const txt = `${lx(la)}${lx(lb)};\\ |${lx(la)}${lx(lb)}| = ${d}\\ \\text{cm}`;
        segmentPart.set([a.id, b.id].sort().join('|'), txt);
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
          const on = shapeName(o, byId);
          const od = direction(o, byId);
          if (!on || !od) continue;
          const dot = Math.abs(dir.x * od.x + dir.y * od.y);
          if (dot < 0.02) { rel = ` \\perp ${on}`; break; }
          if (dot > 0.9998 && !rel) rel = ` \\parallel ${on}`;
        }
      }
      if (name) parts.push(rel ? `${name};\\ ${name}${rel}` : name);
    }
  }

  // Nově uzavřený trojúhelník ze tří úseček mezi pojmenovanými body.
  const segKey = (s: ProtoShape) => [s.definition.p1Id, s.definition.p2Id ?? ''].sort().join('|');
  const segsNow = new Set(snap.shapes.filter((s) => s.type === 'segment').map(segKey));
  const segsBefore = new Set(prev.shapes.filter((s) => s.type === 'segment').map(segKey));
  const has = (set: Set<string>, x: string, y: string) => set.has([x, y].sort().join('|'));
  const named = snap.points.filter((p) => visibleLabel(p));
  for (let i = 0; i < named.length; i++)
    for (let j = i + 1; j < named.length; j++)
      for (let k = j + 1; k < named.length; k++) {
        const [A, B, C] = [named[i], named[j], named[k]];
        if (!has(segsNow, A.id, B.id) || !has(segsNow, B.id, C.id) || !has(segsNow, A.id, C.id)) continue;
        if (has(segsBefore, A.id, B.id) && has(segsBefore, B.id, C.id) && has(segsBefore, A.id, C.id)) continue;
        // Strany trojúhelníku se v zápisu nevypisují zvlášť — stačí △ABC.
        for (const [x, y] of [[A, B], [B, C], [A, C]] as const) {
          const txt = segmentPart.get([x.id, y.id].sort().join('|'));
          const at = txt ? parts.indexOf(txt) : -1;
          if (at >= 0) parts.splice(at, 1);
        }
        parts.push(`\\triangle ${lx(A.label.trim())}${lx(B.label.trim())}${lx(C.label.trim())}`);
      }

  return parts;
}

export function buildRecordingProtocol(steps: ReadonlyArray<ProtoStep>, pixelsPerCm = 50): RecordingProtocolRow[] {
  return steps.map((step, i) => {
    const own = (step.notation ?? '').trim();
    if (own) return { stepIndex: i, latex: own, fromRecording: true };
    const prev = i > 0 ? steps[i - 1].snapshot : { points: [], shapes: [] };
    const parts = deriveStepLatex(step, prev, pixelsPerCm);
    const latex = parts.length > 0
      ? parts.join(',\\ \\ ')
      : `\\text{${(step.description || '—').replace(/[{}\\]/g, '').slice(0, 80)}}`;
    return { stepIndex: i, latex, fromRecording: false };
  });
}
