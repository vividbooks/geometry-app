/**
 * Kontrola žákova rýsování proti výsledku vzorového řešení.
 *
 * Hodnotí se jen výsledek, ne postup: každý hledaný bod musí na plátně ležet
 * do 2 mm od správné polohy a strany útvaru musí být narýsované úsečkami.
 * Popisky bodů se nekontrolují, takže projde i jiné pojmenování nebo jiný
 * správný postup konstrukce.
 */
import type { GeometrySubmissionSnapshot } from '../../../rysovani/src/components/FreeGeometryEditor';
import type { ConstructionCheck, ConstructionCheckPoint } from './assignmentSolutions';

type V = { x: number; y: number };

/** 50 px = 1 cm na plátně. */
const PX_PER_MM = 5;
/** Bod je správně, když je od správné polohy nejvýš 2 mm. */
export const CHECK_TOLERANCE_PX = 2 * PX_PER_MM;
/** Do 1,5 cm hlásíme „vedle“ i se vzdáleností, dál už bod bereme jako chybějící. */
const NEAR_PX = 15 * PX_PER_MM;

export type CheckMarker = V & { ok: boolean };

export type CheckFigureResult = {
  name: string;
  ok: boolean;
  issues: string[];
};

export type ConstructionCheckResult = {
  ok: boolean;
  /** Žák zatím nenarýsoval nic vlastního. */
  empty: boolean;
  figures: CheckFigureResult[];
  circleIssues: string[];
  /** Kroužky na plátně: zelené u správných bodů, červené u bodů vedle. */
  markers: CheckMarker[];
};

type PointMatch =
  | { status: 'ok'; at: V; distance: number }
  | { status: 'off'; at: V; distance: number }
  | { status: 'missing' };

const dist = (a: V, b: V) => Math.hypot(a.x - b.x, a.y - b.y);

function distToSegment(p: V, a: V, b: V): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  if (l2 === 0) return dist(p, a);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return dist(p, { x: a.x + dx * t, y: a.y + dy * t });
}

function mm(px: number): string {
  const v = Math.round(px / PX_PER_MM);
  return `${v} mm`;
}

function listCz(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} a ${items[items.length - 1]}`;
}

/**
 * @param check  co řešení musí obsahovat (z `AssignmentModelSolution.check`)
 * @param solution  výsledné vzorové řešení — odtud se berou správné polohy bodů
 * @param student  aktuální stav plátna žáka
 * @param givenPointIds  id bodů zadání (ty se za hledané body nepočítají)
 */
export function checkConstruction(
  check: ConstructionCheck,
  solution: GeometrySubmissionSnapshot,
  student: GeometrySubmissionSnapshot | null,
  givenPointIds: ReadonlySet<string>,
): ConstructionCheckResult {
  const expected = new Map(solution.points.map(p => [p.id, { x: p.x, y: p.y }]));
  const at = (id: string): V => {
    const p = expected.get(id);
    if (!p) throw new Error(`Kontrola: ve vzorovém řešení chybí bod ${id}`);
    return p;
  };

  const studentPoints = student?.points ?? [];
  const studentById = new Map(studentPoints.map(p => [p.id, p]));
  const candidates = studentPoints.filter(p => !p.hidden && !givenPointIds.has(p.id));
  const studentShapes = student?.shapes ?? [];
  const empty =
    candidates.length === 0 && studentShapes.every(s => s.locked) && !(student?.freehandPaths?.length);

  // Hledané body (bez opakování) a jejich přiřazení k žákovým bodům — nejbližší páry první,
  // aby jeden žákův bod neobsadil dva různé vrcholy.
  const sought = new Map<string, ConstructionCheckPoint>();
  for (const f of check.figures) {
    for (const p of [...f.vertices, ...(f.extra ?? [])]) if (p.sought) sought.set(p.id, p);
  }
  const pairs: Array<{ id: string; sp: V & { id: string }; d: number }> = [];
  for (const id of sought.keys()) {
    const target = at(id);
    for (const sp of candidates) {
      const d = dist(target, sp);
      if (d <= NEAR_PX) pairs.push({ id, sp, d });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  const matches = new Map<string, PointMatch>();
  const usedStudent = new Set<string>();
  for (const pair of pairs) {
    if (matches.has(pair.id) || usedStudent.has(pair.sp.id)) continue;
    usedStudent.add(pair.sp.id);
    matches.set(pair.id, {
      status: pair.d <= CHECK_TOLERANCE_PX ? 'ok' : 'off',
      at: { x: pair.sp.x, y: pair.sp.y },
      distance: pair.d,
    });
  }
  const matchOf = (id: string): PointMatch => matches.get(id) ?? { status: 'missing' };

  /** Kde bod na žákově plátně je — hledaný podle přiřazení, daný přímo ze zadání. */
  const placed = (p: ConstructionCheckPoint): V | null => {
    if (!p.sought) return at(p.id);
    const m = matchOf(p.id);
    return m.status === 'missing' ? null : m.at;
  };

  const segments: Array<[V, V]> = [];
  for (const s of studentShapes) {
    if (s.type !== 'segment') continue;
    const a = studentById.get(s.definition.p1Id);
    const b = s.definition.p2Id ? studentById.get(s.definition.p2Id) : undefined;
    if (a && b) segments.push([a, b]);
  }
  const sideDrawn = (a: V, b: V) =>
    segments.some(
      ([p, q]) => distToSegment(a, p, q) <= CHECK_TOLERANCE_PX && distToSegment(b, p, q) <= CHECK_TOLERANCE_PX,
    );

  const figures: CheckFigureResult[] = check.figures.map(f => {
    const own = [...f.vertices, ...(f.extra ?? [])].filter(p => p.sought);
    const issues: string[] = [];

    // Když žák u víc řešení nesestrojil žádný bod, který je jen tohoto řešení, chybí celé.
    const exclusive = own.filter(
      p => check.figures.filter(g => [...g.vertices, ...(g.extra ?? [])].some(q => q.id === p.id)).length === 1,
    );
    if (
      check.figures.length > 1 &&
      exclusive.length > 0 &&
      exclusive.every(p => matchOf(p.id).status === 'missing')
    ) {
      return { name: f.name, ok: false, issues: ['toto řešení zatím chybí'] };
    }

    const isVertex = new Set(f.vertices.map(v => v.id));
    for (const p of own) {
      const m = matchOf(p.id);
      const word = isVertex.has(p.id) ? 'vrchol' : 'bod';
      if (m.status === 'missing') issues.push(`${word} ${p.name} chybí`);
      else if (m.status === 'off') issues.push(`${word} ${p.name} je o ${mm(m.distance)} vedle`);
    }

    const missingSides: string[] = [];
    f.vertices.forEach((v, i) => {
      const w = f.vertices[(i + 1) % f.vertices.length]!;
      const a = placed(v);
      const b = placed(w);
      if (!a || !b) return; // chybějící vrchol už je v hlášení
      if (!sideDrawn(a, b)) missingSides.push(`${v.name}${w.name}`);
    });
    if (missingSides.length === 1) issues.push(`není narýsovaná strana ${missingSides[0]}`);
    else if (missingSides.length > 1) issues.push(`nejsou narýsované strany ${listCz(missingSides)}`);

    return { name: f.name, ok: issues.length === 0, issues };
  });

  const circleIssues: string[] = [];
  for (const c of check.circles ?? []) {
    const center = at(c.centerId);
    const r = dist(center, at(c.rimId));
    const circles = studentShapes
      .filter(s => s.type === 'circle')
      .map(s => {
        const a = studentById.get(s.definition.p1Id);
        const b = s.definition.p2Id ? studentById.get(s.definition.p2Id) : undefined;
        return a && b ? { c: a as V, r: dist(a, b) } : null;
      })
      .filter((x): x is { c: V; r: number } => x !== null);
    const good = circles.some(
      k => dist(k.c, center) <= CHECK_TOLERANCE_PX && Math.abs(k.r - r) <= CHECK_TOLERANCE_PX,
    );
    if (!good) {
      const sameCenter = circles.some(k => dist(k.c, center) <= CHECK_TOLERANCE_PX);
      circleIssues.push(
        sameCenter ? `kružnice ${c.name} má jiný poloměr` : `chybí kružnice ${c.name}`,
      );
    }
  }

  const markers: CheckMarker[] = [];
  for (const id of sought.keys()) {
    const m = matchOf(id);
    if (m.status !== 'missing') markers.push({ ...m.at, ok: m.status === 'ok' });
  }

  return {
    ok: figures.every(f => f.ok) && circleIssues.length === 0,
    empty,
    figures,
    circleIssues,
    markers,
  };
}
