/**
 * Společné nářadí vzorových řešení úloh CERMAT: vektorová geometrie, `Board` (body a čáry řešení),
 * `cumulative` (kroky narůstají) a `given` (dané body a čáry zadání).
 *
 * Konvence pro kreslení kroků (drží jednotný vzhled se staršími úlohami):
 * - pomocná přímka `helperLine` (čárkovaná, tenká), pomocná úsečka `segment(..., true)` (tenká),
 * - kružnice `circle` a oblouk kružítka `arc` jsou tenké,
 * - výsledný útvar `segment(...)` plnou čarou; dané body zadání jsou `ref(id, bod, 'A')`.
 */
import type { GeometrySubmissionSnapshot } from '../../../../rysovani/src/components/FreeGeometryEditor';
import type {
  AssignmentModelSolution,
  AssignmentSolutionStep,
  ConstructionCheck,
  ConstructionCheckPoint,
} from '../assignmentSolutions';
import { getCermatAssignment } from '../cermatAssignments';

type SolPoint = GeometrySubmissionSnapshot['points'][number];
type SolShape = GeometrySubmissionSnapshot['shapes'][number];
export type V = { x: number; y: number };

export const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: V, b: V): V => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: V, s: number): V => ({ x: a.x * s, y: a.y * s });
export const mid = (a: V, b: V): V => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
export const dot = (a: V, b: V): number => a.x * b.x + a.y * b.y;
export const len = (a: V): number => Math.hypot(a.x, a.y);
export const dist = (a: V, b: V): number => len(sub(a, b));
export const unit = (a: V): V => mul(a, 1 / (len(a) || 1));
export const perp = (a: V): V => ({ x: -a.y, y: a.x });

/** Pata kolmice z bodu `p` na přímku bodem `a` ve směru `d`. */
export function foot(p: V, a: V, d: V): V {
  const u = unit(d);
  return add(a, mul(u, dot(sub(p, a), u)));
}

/** Průsečíky přímky (bod `a`, směr `d`) s kružnicí; seřazené podle parametru na přímce. */
export function lineCircle(a: V, d: V, c: V, r: number): V[] {
  const u = unit(d);
  const f = foot(c, a, u);
  const h2 = r * r - dist(f, c) ** 2;
  if (h2 < 0) return [];
  const h = Math.sqrt(h2);
  return [sub(f, mul(u, h)), add(f, mul(u, h))];
}

export function lineLine(p: V, r: V, q: V, s: V): V {
  const den = r.x * s.y - r.y * s.x;
  const t = ((q.x - p.x) * s.y - (q.y - p.y) * s.x) / den;
  return add(p, mul(r, t));
}

export function rotate(p: V, c: V, rad: number): V {
  const d = sub(p, c);
  return {
    x: c.x + d.x * Math.cos(rad) - d.y * Math.sin(rad),
    y: c.y + d.x * Math.sin(rad) + d.y * Math.cos(rad),
  };
}

/** Sbírka bodů a čar jednoho řešení; kroky z ní vybírají podle id. */
export class Board {
  private readonly points: SolPoint[] = [];
  private readonly shapes: SolShape[] = [];
  private readonly names = new Map<string, { name: string; sought: boolean }>();

  point(id: string, p: V, label = '', hidden = false): string {
    this.points.push({ id, x: p.x, y: p.y, label, locked: true, ...(hidden ? { hidden: true } : {}) });
    this.names.set(id, { name: label, sought: !hidden });
    return id;
  }

  /** Skrytý bod (daný bod zadání nebo pomocný konec čáry); `name` je jeho písmeno v zadání. */
  ref(id: string, p: V, name = ''): string {
    this.point(id, p, '', true);
    this.names.set(id, { name, sought: false });
    return id;
  }

  /** Bod pro kontrolu řešení: jméno a jestli ho žák má sestrojit. */
  checkPoint(id: string): ConstructionCheckPoint {
    const info = this.names.get(id);
    if (!info?.name) throw new Error(`Bod ${id} nemá jméno pro kontrolu řešení`);
    return { id, name: info.name, sought: info.sought };
  }

  segment(id: string, p1: string, p2: string, thin = false): string {
    this.shapes.push({
      id,
      type: 'segment',
      label: '',
      points: [p1, p2],
      locked: true,
      thinStroke: thin || undefined,
      definition: { p1Id: p1, p2Id: p2 },
    });
    return id;
  }

  /** Pomocná přímka (čárkovaná, tenká), případně s popiskem. */
  helperLine(id: string, p1: string, p2: string, label = ''): string {
    this.shapes.push({
      id,
      type: 'lineDashed',
      label,
      points: [p1, p2],
      locked: true,
      thinStroke: true,
      definition: { p1Id: p1, p2Id: p2 },
    });
    return id;
  }

  line(id: string, p1: string, p2: string, label = ''): string {
    this.shapes.push({
      id,
      type: 'line',
      label,
      points: [p1, p2],
      locked: true,
      definition: { p1Id: p1, p2Id: p2 },
    });
    return id;
  }

  circle(id: string, center: string, rim: string, label = ''): string {
    this.shapes.push({
      id,
      type: 'circle',
      label,
      points: [center, rim],
      locked: true,
      thinStroke: true,
      definition: { p1Id: center, p2Id: rim },
    });
    return id;
  }

  /** Oblouk kružítka kolem bodu `rim` (výseč o velikosti `span` rad). */
  arc(id: string, center: string, rim: string, span = 0.45): string {
    this.shapes.push({
      id,
      type: 'circleArc',
      label: '',
      points: [center, rim],
      locked: true,
      thinStroke: true,
      definition: { p1Id: center, p2Id: rim, arcSpan: span },
    });
    return id;
  }

  snap(pointIds: string[], shapeIds: string[]): GeometrySubmissionSnapshot {
    const shapes = this.shapes.filter(s => shapeIds.includes(s.id));
    const needed = new Set(pointIds);
    for (const s of shapes) {
      needed.add(s.definition.p1Id);
      if (s.definition.p2Id) needed.add(s.definition.p2Id);
    }
    return { points: this.points.filter(p => needed.has(p.id)), shapes, freehandPaths: [] };
  }
}

/** Výsledek, který kontrola čeká: útvary (id vrcholů po obvodu) a sestrojené kružnice. */
export type CheckSpec = {
  figures: Array<{ name: string; vertices: string[]; extra?: string[] }>;
  circles?: ConstructionCheck['circles'];
  /** Přímky, které má žák sestrojit (osa, obraz přímky …): dva body řešení, jimiž vede. */
  lines?: ConstructionCheck['lines'];
  interchangeable?: ConstructionCheck['interchangeable'];
};

/** Kroky se skládají narůstáním: každý krok přidá body a čáry k předchozím. */
export function cumulative(
  board: Board,
  explanation: string,
  steps: Array<{ text: string; points?: string[]; shapes?: string[] }>,
  checkSpec?: CheckSpec,
): AssignmentModelSolution {
  const points: string[] = [];
  const shapes: string[] = [];
  const out: AssignmentSolutionStep[] = steps.map(step => {
    points.push(...(step.points ?? []));
    shapes.push(...(step.shapes ?? []));
    return { text: step.text, snapshot: board.snap([...points], [...shapes]) };
  });
  const snapshot = out[out.length - 1]!.snapshot;
  const check: ConstructionCheck | undefined = checkSpec
    ? {
        figures: checkSpec.figures.map(f => ({
          name: f.name,
          vertices: f.vertices.map(id => board.checkPoint(id)),
          ...(f.extra?.length ? { extra: f.extra.map(id => board.checkPoint(id)) } : {}),
        })),
        ...(checkSpec.circles?.length ? { circles: checkSpec.circles } : {}),
        ...(checkSpec.lines?.length ? { lines: checkSpec.lines } : {}),
        ...(checkSpec.interchangeable?.length ? { interchangeable: checkSpec.interchangeable } : {}),
      }
    : undefined;
  if (check) {
    const inSnapshot = new Set(snapshot.points.map(p => p.id));
    const ids = [
      ...check.figures.flatMap(f => [...f.vertices, ...(f.extra ?? [])].map(p => p.id)),
      ...(check.circles ?? []).flatMap(c => [c.centerId, c.rimId]),
      ...(check.lines ?? []).flatMap(l => [l.p1Id, l.p2Id]),
    ];
    const missing = ids.find(id => !inSnapshot.has(id));
    if (missing) throw new Error(`Bod ${missing} z kontroly chybí ve výsledném řešení`);
  }
  return { explanation, steps: out, snapshot, ...(check ? { check } : {}) };
}

export function given(id: string) {
  const item = getCermatAssignment(id);
  if (!item) throw new Error(`Chybí zadání CERMAT ${id}`);
  const point = (pid: string): V => {
    const p = item.points.find(q => q.id === pid);
    if (!p) throw new Error(`Chybí bod ${pid} v zadání ${id}`);
    return { x: p.x, y: p.y };
  };
  /** Pojmenovaná přímka zadání (`lines`), nebo útvar přímka/polopřímka/úsečka (`shapes`) podle id. */
  const line = (labelOrShapeId: string): { a: V; d: V } => {
    const l = item.lines.find(q => q.label === labelOrShapeId);
    if (l) return { a: l.from, d: sub(l.to, l.from) };
    const s = item.shapes?.find(q => q.id === labelOrShapeId && q.kind !== 'circle');
    if (!s || s.kind === 'circle') throw new Error(`Chybí přímka ${labelOrShapeId} v zadání ${id}`);
    const [a, b] = s.kind === 'line' ? s.through : s.kind === 'ray' ? [s.from, s.through] : [s.from, s.to];
    return { a: point(a), d: sub(point(b), point(a)) };
  };
  /** Kružnice zadání podle id útvaru: střed a poloměr. */
  const circle = (shapeId: string): { c: V; r: number } => {
    const s = item.shapes?.find(q => q.id === shapeId);
    if (!s || s.kind !== 'circle') throw new Error(`Chybí kružnice ${shapeId} v zadání ${id}`);
    return { c: point(s.center), r: s.radius };
  };
  return { point, line, circle, item };
}
