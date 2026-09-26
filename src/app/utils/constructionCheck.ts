/**
 * Kontrola žákova rýsování proti výsledku vzorového řešení.
 *
 * Hodnotí se jen výsledek, ne postup: každý hledaný bod musí na plátně ležet
 * do 2 mm od správné polohy a strany útvaru musí být narýsované — úsečkou,
 * nebo ležet na narýsované přímce či polopřímce.
 * Postup konstrukce se nehodnotí, projde i jiný správný postup.
 *
 * Názvy bodů na výsledek nemají vliv: správně narýsovaný útvar se špatně
 * pojmenovaným vrcholem je splněný, žák jen dostane upozornění, že název nesedí.
 * Porovnává se písmeno bez indexu (C, C₁, C1 i C' jsou pro vrchol C₂ v pořádku,
 * u úloh s více řešeními tedy nezáleží, které řešení je první).
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

/** `warn` = bod sedí, ale má jiný název, než má mít. */
export type CheckMarker = V & { ok: boolean; warn?: boolean };

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
  /** Chybějící nebo špatné kružnice a přímky, které zadání chce sestrojit. */
  extraIssues: string[];
  /** Upozornění na názvy bodů (výsledek neovlivňují). */
  labelIssues: string[];
  /** Kroužky na plátně: zelené u správných bodů, oranžové u špatného názvu, červené u bodů vedle. */
  markers: CheckMarker[];
};

type PointMatch =
  | { status: 'ok'; at: V; distance: number; label: string }
  | { status: 'off'; at: V; distance: number; label: string }
  | { status: 'missing' };

/** Písmeno názvu bez indexu a čárek: „C₂“, „C2“, „C'“ → „C“. */
export function labelBase(label: string): string {
  return label.replace(/[₀-₉0-9'′″_\s]/g, '');
}

/** Přípustná písmena bodu; bod společný dvěma řešením může mít dvě jména („A₁ = B₂“). */
function nameBases(name: string): string[] {
  return name.split('=').map(labelBase).filter(Boolean);
}

const dist = (a: V, b: V) => Math.hypot(a.x - b.x, a.y - b.y);

/** Čára, na které může ležet strana útvaru: úsečka, přímka nebo polopřímka. */
type Carrier = { kind: 'segment' | 'line' | 'ray'; a: V; d: V };

/** Vzdálenost bodu od čáry (u úsečky od koncových bodů, u polopřímky od počátku). */
function distToCarrier(p: V, c: Carrier): number {
  const l2 = c.d.x * c.d.x + c.d.y * c.d.y;
  if (l2 === 0) return dist(p, c.a);
  let t = ((p.x - c.a.x) * c.d.x + (p.y - c.a.y) * c.d.y) / l2;
  if (c.kind !== 'line') t = Math.max(0, t);
  if (c.kind === 'segment') t = Math.min(1, t);
  return dist(p, { x: c.a.x + c.d.x * t, y: c.a.y + c.d.y * t });
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
  // Písmena, která smí bod nést: jeho vlastní, u zaměnitelné skupiny kterékoli ze skupiny.
  const groupOf = new Map<string, string[]>();
  for (const group of check.interchangeable ?? []) for (const id of group) groupOf.set(id, group);
  const allowedBases = (id: string): string[] =>
    (groupOf.get(id) ?? [id]).flatMap(g => nameBases(sought.get(g)?.name ?? ''));

  const pairs: Array<{ id: string; sp: V & { id: string; label: string }; d: number; named: boolean }> = [];
  for (const id of sought.keys()) {
    const target = at(id);
    const bases = allowedBases(id);
    for (const sp of candidates) {
      const d = dist(target, sp);
      if (d <= NEAR_PX) pairs.push({ id, sp, d, named: nameBases(sp.label ?? '').some(b => bases.includes(b)) });
    }
  }
  // Nejdřív body v toleranci, mezi nimi ty se správným názvem (když žák má na místě
  // vrcholu dva body, třeba průsečík a pojmenovaný bod), pak podle vzdálenosti.
  const within = (d: number) => (d <= CHECK_TOLERANCE_PX ? 0 : 1);
  pairs.sort((a, b) => within(a.d) - within(b.d) || Number(b.named) - Number(a.named) || a.d - b.d);
  const matches = new Map<string, PointMatch>();
  const usedStudent = new Set<string>();
  for (const pair of pairs) {
    if (matches.has(pair.id) || usedStudent.has(pair.sp.id)) continue;
    usedStudent.add(pair.sp.id);
    matches.set(pair.id, {
      status: pair.d <= CHECK_TOLERANCE_PX ? 'ok' : 'off',
      at: { x: pair.sp.x, y: pair.sp.y },
      distance: pair.d,
      label: pair.sp.label ?? '',
    });
  }
  const matchOf = (id: string): PointMatch => matches.get(id) ?? { status: 'missing' };

  /** Kde bod na žákově plátně je — hledaný podle přiřazení, daný přímo ze zadání. */
  const placed = (p: ConstructionCheckPoint): V | null => {
    if (!p.sought) return at(p.id);
    const m = matchOf(p.id);
    return m.status === 'missing' ? null : m.at;
  };

  // Strana je narýsovaná, když leží na žákově úsečce, přímce nebo polopřímce (plné čáře;
  // čárkované pomocné čáry se za stranu nepočítají).
  const carriers: Carrier[] = [];
  for (const s of studentShapes) {
    if (s.type !== 'segment' && s.type !== 'line' && s.type !== 'ray') continue;
    const a = studentById.get(s.definition.p1Id);
    if (!a) continue;
    const b = s.definition.p2Id ? studentById.get(s.definition.p2Id) : undefined;
    let d: V | null = null;
    if (b) d = { x: b.x - a.x, y: b.y - a.y };
    else if (s.type !== 'segment' && s.definition.angle !== undefined) {
      const rad = (-s.definition.angle * Math.PI) / 180;
      d = { x: Math.cos(rad), y: Math.sin(rad) };
    }
    if (d) carriers.push({ kind: s.type, a: { x: a.x, y: a.y }, d });
  }
  const sideDrawn = (a: V, b: V) =>
    carriers.some(c => distToCarrier(a, c) <= CHECK_TOLERANCE_PX && distToCarrier(b, c) <= CHECK_TOLERANCE_PX);

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

    const polygon = f.vertices.length >= 3;
    const isVertex = new Set(polygon ? f.vertices.map(v => v.id) : []);
    for (const p of own) {
      const m = matchOf(p.id);
      const word = isVertex.has(p.id) ? 'vrchol' : 'bod';
      if (m.status === 'missing') issues.push(`${word} ${p.name} chybí`);
      else if (m.status === 'off') issues.push(`${word} ${p.name} je o ${mm(m.distance)} vedle`);
    }

    const missingSides: string[] = [];
    // Jeden bod nemá strany, dva body tvoří úsečku, tři a víc mnohoúhelník.
    const sideCount = f.vertices.length < 2 ? 0 : f.vertices.length === 2 ? 1 : f.vertices.length;
    f.vertices.slice(0, sideCount).forEach((v, i) => {
      const w = f.vertices[(i + 1) % f.vertices.length]!;
      const a = placed(v);
      const b = placed(w);
      if (!a || !b) return; // chybějící vrchol už je v hlášení
      if (!sideDrawn(a, b)) missingSides.push(`${v.name}${w.name}`);
    });
    if (!polygon && missingSides.length) issues.push(`není narýsovaná úsečka ${missingSides[0]}`);
    else if (missingSides.length === 1) issues.push(`není narýsovaná strana ${missingSides[0]}`);
    else if (missingSides.length > 1) issues.push(`nejsou narýsované strany ${listCz(missingSides)}`);

    return { name: f.name, ok: issues.length === 0, issues };
  });

  const extraIssues: string[] = [];
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
      extraIssues.push(
        sameCenter ? `kružnice ${c.name} má jiný poloměr` : `chybí kružnice ${c.name}`,
      );
    }
  }

  // Přímky, které se mají sestrojit (osa, obraz přímky …): žákova přímka, polopřímka nebo úsečka
  // (i čárkovaná) musí po prodloužení vést oběma kontrolními body, které leží daleko od sebe.
  const lineCarriers: Carrier[] = [];
  for (const s of studentShapes) {
    if (s.type === 'circle' || s.type === 'circleArc') continue;
    const a = studentById.get(s.definition.p1Id);
    if (!a) continue;
    const b = s.definition.p2Id ? studentById.get(s.definition.p2Id) : undefined;
    let d: V | null = null;
    if (b) d = { x: b.x - a.x, y: b.y - a.y };
    else if (s.definition.angle !== undefined) {
      const rad = (-s.definition.angle * Math.PI) / 180;
      d = { x: Math.cos(rad), y: Math.sin(rad) };
    }
    if (d) lineCarriers.push({ kind: 'line', a: { x: a.x, y: a.y }, d });
  }
  for (const l of check.lines ?? []) {
    const p1 = at(l.p1Id);
    const p2 = at(l.p2Id);
    const len = dist(p1, p2) || 1;
    const u = { x: (p2.x - p1.x) / len, y: (p2.y - p1.y) / len };
    const m = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    // Kontrolní body 3 cm na obě strany od středu: přímka musí mít správnou polohu i směr.
    const q1 = { x: m.x - u.x * 150, y: m.y - u.y * 150 };
    const q2 = { x: m.x + u.x * 150, y: m.y + u.y * 150 };
    const through = (q: V) => lineCarriers.filter(c => distToCarrier(q, c) <= CHECK_TOLERANCE_PX);
    const good = through(q1).some(c => distToCarrier(q2, c) <= CHECK_TOLERANCE_PX);
    if (!good) {
      extraIssues.push(
        through(m).length ? `přímka ${l.name} má jiný směr` : `chybí přímka ${l.name}`,
      );
    }
  }

  // Názvy: u každé zaměnitelné skupiny se písmena rozdělí mezi body, jednotlivé body
  // musí mít své písmeno. Hlásí se jen body, které žák sestrojil.
  const vertexIds = new Set(check.figures.flatMap(f => (f.vertices.length >= 3 ? f.vertices.map(v => v.id) : [])));
  const badLabel = new Set<string>();
  const labelIssues: string[] = [];
  const done = new Set<string>();
  for (const id of sought.keys()) {
    if (done.has(id)) continue;
    const group = groupOf.get(id) ?? [id];
    group.forEach(g => done.add(g));
    const pool = group.map(g => sought.get(g)!);
    const members = group
      .map(g => ({ id: g, m: matchOf(g) }))
      .filter((x): x is { id: string; m: Extract<PointMatch, { label: string }> } => x.m.status !== 'missing');
    const wrong: typeof members = [];
    const free = [...pool];
    for (const x of members) {
      const given = nameBases(x.m.label);
      const i = free.findIndex(p => nameBases(p.name).some(b => given.includes(b)));
      if (i >= 0) free.splice(i, 1);
      else wrong.push(x);
    }
    for (const x of wrong) {
      // Očekávané jméno: vlastní, pokud ho nikdo ze skupiny nepoužil, jinak první volné.
      const own = sought.get(x.id)!;
      const expectedName = (free.find(p => p.id === own.id) ?? free[0] ?? own).name;
      const i = free.findIndex(p => p.name === expectedName);
      if (i >= 0) free.splice(i, 1);
      const word = vertexIds.has(x.id) ? 'Vrchol' : 'Bod';
      badLabel.add(x.id);
      labelIssues.push(
        x.m.label.trim()
          ? `${word} označený ${x.m.label.trim()} má mít název ${expectedName}.`
          : `${word} ${expectedName} nemá název.`,
      );
    }
  }

  const markers: CheckMarker[] = [];
  for (const id of sought.keys()) {
    const m = matchOf(id);
    if (m.status === 'missing') continue;
    const ok = m.status === 'ok';
    markers.push({ x: m.at.x, y: m.at.y, ok, ...(ok && badLabel.has(id) ? { warn: true } : {}) });
  }
  // Vrcholy daných bodů zadání (třeba A, B) se zezelenají, když je útvar, do kterého patří, správně.
  const givenMarked = new Set<string>();
  check.figures.forEach((f, i) => {
    if (!figures[i]!.ok) return;
    for (const v of f.vertices) {
      if (v.sought || givenMarked.has(v.id)) continue;
      givenMarked.add(v.id);
      markers.push({ ...at(v.id), ok: true });
    }
  });

  return {
    ok: figures.every(f => f.ok) && extraIssues.length === 0,
    empty,
    figures,
    extraIssues,
    labelIssues,
    markers,
  };
}
