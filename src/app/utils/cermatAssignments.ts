/**
 * Konstrukční úlohy z jednotné přijímací zkoušky CERMAT (čtyřleté obory), sekce „CERMAT“ v knihovně úkolů.
 *
 * Zadání jsou přesné kopie úloh 9 a 10 z testových sešitů. Polohy bodů, přímek a kružnic jsou
 * odměřené ze sešitu (vektorová data PDF, u 2026 sken 300 dpi) a převedené ve skutečném měřítku:
 * 1 cm na papíře = 50 px na plátně (PIXELS_PER_CM v editoru), takže délky jako „o 2 cm delší“
 * sedí i při měření na plátně. Počátek je levý horní roh rámečku obrázku v sešitu.
 *
 * Data jednotlivých ročníků jsou v `./cermat/data<rok>.ts`. Soubor je bez závislostí na aplikaci —
 * používá ho aplikace (zadání, vzorová řešení, kontrola) i skript `scripts/build-cermat-assignments.ts`,
 * který z něj skládá SQL pro `geometry_circuit_assignments`.
 */
import { CERMAT_2026 } from './cermat/data2026';
import { CERMAT_2025 } from './cermat/data2025';
import { CERMAT_2024 } from './cermat/data2024';
import { CERMAT_2023 } from './cermat/data2023';
import { CERMAT_2022 } from './cermat/data2022';
import { CERMAT_2020_2021 } from './cermat/data2020-2021';
import { CERMAT_2018_2019 } from './cermat/data2018-2019';
import { CERMAT_2015_2017 } from './cermat/data2015-2017';
import { GRADE9_STYLE_A } from './cermat/data9-a';
import { GRADE9_STYLE_B } from './cermat/data9-b';
import { GRADE9_STYLE_C } from './cermat/data9-c';
import { GRADE9_STYLE_D } from './cermat/data9-d';

export type CermatVec = { x: number; y: number };

/** Daný bod zadání (zamčený křížek s písmenem). `hidden` = bod bez křížku (např. střed kružnice, který sešit nevyznačuje). */
export type CermatPoint = { id: string; x: number; y: number; label: string; hidden?: boolean };

/** Pojmenovaná přímka zadání (p, q, o …); vede skrytými body z krajů čáry v sešitu. */
export type CermatLine = { label: string; from: CermatVec; to: CermatVec };

/**
 * Další útvary zadání, které se opírají o dané body (`points[].id`):
 * - `line`: přímka procházející dvěma body (přímka *AB*, *BD* …),
 * - `ray`: polopřímka z bodu `from` přes bod `through` (polopřímka *AX*),
 * - `segment`: úsečka (úsečka *LM*, strany daného trojúhelníku),
 * - `circle`: kružnice se středem v bodě `center` a poloměrem `radius` (px).
 */
export type CermatShape =
  | { kind: 'line'; id: string; through: [string, string]; label?: string }
  | { kind: 'ray'; id: string; from: string; through: string; label?: string }
  | { kind: 'segment'; id: string; from: string; to: string; label?: string }
  | { kind: 'circle'; id: string; center: string; radius: number; label?: string };

export type CermatAssignment = {
  id: string;
  title: string;
  /** Např. „JPZ 2026, 1. řádný termín, úloha 9“. */
  source: string;
  /** Zadání tak, jak ho vidí žák (bez značek) — stejný text je v databázi. */
  instructionText: string;
  /**
   * Totéž zadání se značkami kurzívy: názvy bodů, přímek a útvarů jsou mezi hvězdičkami
   * (`bod *A*`, `přímka *p*`, `trojúhelník *ABC*`). Aplikace podle nich sází kurzívu.
   */
  instructionMarkup: string;
  points: CermatPoint[];
  lines: CermatLine[];
  shapes?: CermatShape[];
  /** Rozměr rámečku obrázku v sešitu (px plátna) — skryté rohy drží stejný výřez plátna. */
  frame: { width: number; height: number };
};

/** Úloha tak, jak je zapsaná v datech ročníku (čistý text se odvodí ze značek). */
export type CermatAssignmentInput = Omit<CermatAssignment, 'instructionText'>;

/** Zadání bez značek kurzívy a dolních indexů (`*t*_{c}` → `tc`). */
export function stripCermatMarkup(markup: string): string {
  return markup.replace(/\*([^*\n]+)\*/g, '$1').replace(/_\{([^}\n]+)\}/g, '$1');
}

export type CermatTextSegment = { text: string; italic: boolean; sub?: boolean };

/**
 * Části textu zadání: `*A*` → kurzíva, `_{c}` → dolní index (sází se kurzívou, např. těžnice *t*_{c}).
 */
export function cermatMarkupSegments(markup: string): CermatTextSegment[] {
  const out: CermatTextSegment[] = [];
  const re = /\*([^*\n]+)\*|_\{([^}\n]+)\}/g;
  let last = 0;
  for (let m = re.exec(markup); m; m = re.exec(markup)) {
    if (m.index > last) out.push({ text: markup.slice(last, m.index), italic: false });
    if (m[1] !== undefined) out.push({ text: m[1], italic: true });
    else out.push({ text: m[2]!, italic: true, sub: true });
    last = re.lastIndex;
  }
  if (last < markup.length) out.push({ text: markup.slice(last), italic: false });
  return out.filter(part => part.text !== '');
}

/**
 * Kurzíva pro text zadání úlohy CERMAT. Vrátí části jen tehdy, když text přesně odpovídá
 * zadání v kódu (např. z databáze); jinak `null` a text se zobrazí tak, jak je.
 */
export function cermatInstructionSegments(
  assignmentId: string | undefined,
  text: string,
): CermatTextSegment[] | null {
  const item = getCermatAssignment(assignmentId);
  if (!item || item.instructionText.trim() !== text.trim()) return null;
  return cermatMarkupSegments(item.instructionMarkup.trim());
}

/** Všechny úlohy, od nejnovějšího ročníku; v ročníku podle termínu a čísla úlohy. */
export const CERMAT_ASSIGNMENTS: CermatAssignment[] = [
  ...CERMAT_2026,
  ...CERMAT_2025,
  ...CERMAT_2024,
  ...CERMAT_2023,
  ...CERMAT_2022,
  ...CERMAT_2020_2021,
  ...CERMAT_2018_2019,
  ...CERMAT_2015_2017,
].map(item => ({
  ...item,
  instructionText: stripCermatMarkup(item.instructionMarkup),
}));

/**
 * Úkoly 9. ročníku ve stylu úloh CERMAT (vlastní zadání, stejné nářadí: data, vzorové řešení
 * po krocích, kontrola, kurzíva). V knihovně jsou v 9. ročníku, ne v sekci CERMAT.
 */
export const GRADE9_STYLE_ASSIGNMENTS: CermatAssignment[] = [
  ...GRADE9_STYLE_A,
  ...GRADE9_STYLE_B,
  ...GRADE9_STYLE_C,
  ...GRADE9_STYLE_D,
].map(item => ({
  ...item,
  instructionText: stripCermatMarkup(item.instructionMarkup),
}));

/** Všechny konstrukční úlohy s daty v kódu (CERMAT i úkoly 9. ročníku ve stylu CERMAT). */
export const CONSTRUCTION_ASSIGNMENTS: CermatAssignment[] = [...CERMAT_ASSIGNMENTS, ...GRADE9_STYLE_ASSIGNMENTS];

export function getCermatAssignment(id: string | undefined): CermatAssignment | null {
  if (!id) return null;
  return CONSTRUCTION_ASSIGNMENTS.find(item => item.id === id) ?? null;
}

/** Id bodu zadání na plátně (stejné v zadání i ve vzorovém řešení). */
export const cermatPointId = (pointId: string) => `pt-${pointId}`;

/** Id útvaru zadání na plátně (`shapes[].id`). */
export const cermatShapeId = (shapeId: string) => `shape-${shapeId}`;

type SnapPoint = { id: string; x: number; y: number; label: string; locked: true; hidden?: true };
type SnapShape = {
  id: string;
  type: 'line' | 'ray' | 'segment' | 'circle';
  label: string;
  points: string[];
  locked: true;
  definition: { p1Id: string; p2Id: string };
};

/**
 * Snapshot plátna zadání: body jsou zamčené křížky, přímky vedou skrytými body z krajů čar v sešitu,
 * útvary (`shapes`) se opírají o dané body; kružnice má skrytý bod na obvodu.
 */
export function cermatInstructionSnapshot(item: CermatAssignment) {
  const points: SnapPoint[] = [
    { id: 'pt-frame-tl', x: 0, y: 0, label: '', locked: true, hidden: true },
    { id: 'pt-frame-br', x: item.frame.width, y: item.frame.height, label: '', locked: true, hidden: true },
  ];
  const shapes: SnapShape[] = [];
  for (const line of item.lines) {
    const p1 = `pt-${line.label}1`;
    const p2 = `pt-${line.label}2`;
    points.push({ id: p1, x: line.from.x, y: line.from.y, label: '', locked: true, hidden: true });
    points.push({ id: p2, x: line.to.x, y: line.to.y, label: '', locked: true, hidden: true });
    shapes.push({
      id: `line-${line.label}`,
      type: 'line',
      label: line.label,
      points: [p1, p2],
      locked: true,
      definition: { p1Id: p1, p2Id: p2 },
    });
  }
  for (const point of item.points) {
    points.push({
      id: cermatPointId(point.id),
      x: point.x,
      y: point.y,
      label: point.hidden ? '' : point.label,
      locked: true,
      ...(point.hidden ? { hidden: true as const } : {}),
    });
  }
  const pointOf = (id: string) => {
    const p = item.points.find(q => q.id === id);
    if (!p) throw new Error(`Úloha ${item.id}: útvar odkazuje na neznámý bod ${id}`);
    return p;
  };
  for (const shape of item.shapes ?? []) {
    const id = cermatShapeId(shape.id);
    const label = shape.label ?? '';
    if (shape.kind === 'circle') {
      const c = pointOf(shape.center);
      const rim = `pt-${shape.id}-rim`;
      points.push({ id: rim, x: c.x + shape.radius, y: c.y, label: '', locked: true, hidden: true });
      const p1 = cermatPointId(shape.center);
      shapes.push({ id, type: 'circle', label, points: [p1, rim], locked: true, definition: { p1Id: p1, p2Id: rim } });
      continue;
    }
    const [a, b] =
      shape.kind === 'line' ? shape.through : shape.kind === 'ray' ? [shape.from, shape.through] : [shape.from, shape.to];
    pointOf(a);
    pointOf(b);
    const p1 = cermatPointId(a);
    const p2 = cermatPointId(b);
    shapes.push({ id, type: shape.kind, label, points: [p1, p2], locked: true, definition: { p1Id: p1, p2Id: p2 } });
  }
  return { points, shapes, freehandPaths: [] as never[] };
}
