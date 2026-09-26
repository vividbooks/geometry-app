/**
 * Konstrukční úlohy z jednotné přijímací zkoušky CERMAT (čtyřleté obory), sekce „CERMAT“ v knihovně úkolů.
 *
 * Zadání jsou přesné kopie úloh 9 a 10 z testových sešitů 2026 (M9A–M9D_2026_TS). Polohy bodů
 * a přímek jsou odměřené ze sešitu (sken 300 dpi) a převedené ve skutečném měřítku:
 * 1 cm na papíře = 50 px na plátně (PIXELS_PER_CM v editoru), takže délky jako „o 2 cm delší“
 * sedí i při měření na plátně. Počátek je levý horní roh rámečku obrázku v sešitu.
 *
 * Soubor je bez závislostí — používá ho aplikace (vzorová řešení) i skript
 * `scripts/build-cermat-assignments.ts`, který z něj skládá SQL pro `geometry_circuit_assignments`.
 */

export type CermatPoint = { id: string; x: number; y: number; label: string };
export type CermatLine = { label: string; from: { x: number; y: number }; to: { x: number; y: number } };

export type CermatAssignment = {
  id: string;
  title: string;
  /** Např. „2026, 1. řádný termín, úloha 9“. */
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
  /** Rozměr rámečku obrázku v sešitu (px plátna) — skryté rohy drží stejný výřez plátna. */
  frame: { width: number; height: number };
};

const FRAME_WIDTH = 815;

/** Zadání bez značek kurzívy. */
export function stripCermatMarkup(markup: string): string {
  return markup.replace(/\*([^*\n]+)\*/g, '$1');
}

/** Části textu zadání s příznakem kurzívy (`*A*` → `{ text: 'A', italic: true }`). */
export function cermatMarkupSegments(markup: string): Array<{ text: string; italic: boolean }> {
  return markup
    .split(/\*([^*\n]+)\*/)
    .map((text, i) => ({ text, italic: i % 2 === 1 }))
    .filter(part => part.text !== '');
}

/**
 * Kurzíva pro text zadání úlohy CERMAT. Vrátí části jen tehdy, když text přesně odpovídá
 * zadání v kódu (např. z databáze); jinak `null` a text se zobrazí tak, jak je.
 */
export function cermatInstructionSegments(
  assignmentId: string | undefined,
  text: string,
): Array<{ text: string; italic: boolean }> | null {
  const item = getCermatAssignment(assignmentId);
  if (!item || item.instructionText.trim() !== text.trim()) return null;
  return cermatMarkupSegments(item.instructionMarkup.trim());
}

const CERMAT_ASSIGNMENTS_RAW: Array<Omit<CermatAssignment, 'instructionText'>> = [
  {
    id: '046da8bc-3b22-44ff-b1e3-231a94b03dd6',
    title: '2026 · 1. řádný termín · 9. Trojúhelník ke dvěma přímkám',
    source: 'JPZ 2026, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží bod *A* a přímky *b*, *c*.\n\n'
      + 'Bod *A* je vrchol trojúhelníku *ABC*.\n'
      + 'Strana *AB* tohoto trojúhelníku je kolmá k přímce *b* a vrchol *B* leží na přímce *b*.\n'
      + 'Strana *BC* je o 2 cm delší než strana *AB* a vrchol *C* leží na přímce *c*.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [{ id: 'a', x: 139.5, y: 378.7, label: 'A' }],
    lines: [
      { label: 'b', from: { x: 342.5, y: 488.5 }, to: { x: 431.0, y: 63.5 } },
      { label: 'c', from: { x: 32.2, y: 126.6 }, to: { x: 707.0, y: 352.6 } },
    ],
    frame: { width: FRAME_WIDTH, height: 521 },
  },
  {
    id: 'f9d688a0-31c3-4eec-bfc1-e648bc9ada54',
    title: '2026 · 1. řádný termín · 10. Rovnoběžník s osou souměrnosti',
    source: 'JPZ 2026, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží bod *A* a přímka *o*.\n\n'
      + 'Bod *A* je vrchol rovnoběžníku *ABCD*.\n'
      + 'Přímka *o* je osou souměrnosti tohoto rovnoběžníku a leží na ní vrcholy *B*, *D*.\n'
      + 'Úhlopříčka *BD* rovnoběžníku *ABCD* je dvakrát delší než úhlopříčka *AC*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    points: [{ id: 'a', x: 356.9, y: 370.4, label: 'A' }],
    lines: [{ label: 'o', from: { x: 33.4, y: 116.0 }, to: { x: 707.4, y: 337.0 } }],
    frame: { width: FRAME_WIDTH, height: 446 },
  },
  {
    id: '284a261e-1323-404c-8d69-b90f4ffdd8d8',
    title: '2026 · 2. řádný termín · 9. Pravidelný šestiúhelník',
    source: 'JPZ 2026, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *O*, *P*.\n\n'
      + 'Bod *A* je vrchol pravidelného šestiúhelníku *ABCDEF*.\n'
      + 'Přímka *OP* je osa strany *AB* tohoto šestiúhelníku.\n'
      + 'Na polopřímce *OP* leží střed souměrnosti *S* šestiúhelníku *ABCDEF*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D*, *E*, *F* šestiúhelníku *ABCDEF*, označte je písmeny a šestiúhelník narýsujte.',
    points: [
      { id: 'a', x: 151.1, y: 229.4, label: 'A' },
      { id: 'o', x: 134.8, y: 328.5, label: 'O' },
      { id: 'p', x: 570.2, y: 138.4, label: 'P' },
    ],
    lines: [],
    frame: { width: FRAME_WIDTH, height: 471 },
  },
  {
    id: '33c47712-dbb7-4ebb-a43c-d1fcab735d1e',
    title: '2026 · 2. řádný termín · 10. Dva pravoúhlé trojúhelníky',
    source: 'JPZ 2026, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B*, *D*.\n\n'
      + 'Body *A* a *B* jsou vrcholy pravoúhlého trojúhelníku *ABC* s pravým úhlem při vrcholu *C*.\n'
      + 'Body *B* a *D* jsou vrcholy pravoúhlého trojúhelníku *BCD* s pravým úhlem při vrcholu *C*.\n'
      + '(Vrcholy *B* a *C* jsou společnými vrcholy obou trojúhelníků.)\n\n'
      + 'Sestrojte vrchol *C*, označte ho písmenem a narýsujte trojúhelníky *ABC* a *BCD*.',
    points: [
      { id: 'a', x: 286.8, y: 231.6, label: 'A' },
      { id: 'b', x: 587.2, y: 231.6, label: 'B' },
      { id: 'd', x: 152.0, y: 477.9, label: 'D' },
    ],
    lines: [],
    frame: { width: FRAME_WIDTH, height: 546 },
  },
  {
    id: '5b33aef9-b257-4238-8fd7-195745c28f33',
    title: '2026 · 1. náhradní termín · 9. Rovnoramenný trojúhelník se středy stran',
    source: 'JPZ 2026, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *S* a přímka *p* procházející bodem *A*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného trojúhelníku *ABC*, jehož strany *AC* a *BC* mají stejnou délku.\n'
      + 'Bod *S* je střed strany *AC* a na přímce *p* leží střed *P* strany *BC* trojúhelníku *ABC*.\n\n'
      + 'Sestrojte vrchol *C*, střed *P* a vrchol *B*, označte je písmeny a narýsujte trojúhelník *ABC*.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 131.7, y: 358.2, label: 'A' },
      { id: 's', x: 243.4, y: 232.0, label: 'S' },
    ],
    lines: [{ label: 'p', from: { x: 68.6, y: 385.7 }, to: { x: 631.6, y: 140.5 } }],
    frame: { width: FRAME_WIDTH, height: 521 },
  },
  {
    id: '43f19b67-3f62-41f2-a75b-ef0f62d76310',
    title: '2026 · 1. náhradní termín · 10. Obdélník se středem V',
    source: 'JPZ 2026, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *U*, *V* a přímka *k*.\n\n'
      + 'Bod *U* leží uvnitř strany *KN* obdélníku *KLMN*.\n'
      + 'Na přímce *k* leží strana *KL* tohoto obdélníku.\n'
      + 'Bod *V* má stejnou vzdálenost od všech čtyř vrcholů obdélníku *KLMN*.\n\n'
      + 'Sestrojte všechny vrcholy obdélníku *KLMN*, označte je písmeny a obdélník narýsujte.',
    points: [
      { id: 'u', x: 101.6, y: 283.2, label: 'U' },
      { id: 'v', x: 296.8, y: 281.3, label: 'V' },
    ],
    lines: [{ label: 'k', from: { x: 57.6, y: 461.4 }, to: { x: 681.6, y: 286.2 } }],
    frame: { width: FRAME_WIDTH, height: 546 },
  },
  {
    id: '093d6b4f-f088-40c3-bf5b-d958a62cde63',
    title: '2026 · 2. náhradní termín · 9. Lichoběžník z pravoúhlého trojúhelníku',
    source: 'JPZ 2026, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *p* a body *B*, *D*.\n\n'
      + 'Body *B*, *D* jsou vrcholy pravoúhlého rovnoramenného trojúhelníku *BCD* s pravým úhlem při vrcholu *C*. '
      + 'Bod *C* má od přímky *p* větší vzdálenost než bod *B*.\n\n'
      + '9.1 Sestrojte vrchol *C* trojúhelníku *BCD* a označte ho písmenem.\n\n'
      + '9.2 Body *B*, *C*, *D* jsou zároveň vrcholy lichoběžníku *ABCD*.\n'
      + 'Vrchol *A* tohoto lichoběžníku leží na přímce *p*.\n'
      + 'Sestrojte vrchol *A* lichoběžníku *ABCD*, označte ho písmenem a lichoběžník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'd', x: 452.1, y: 140.1, label: 'D' },
      { id: 'b', x: 489.8, y: 356.7, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 132.1, y: 63.5 }, to: { x: 388.6, y: 438.2 } }],
    frame: { width: FRAME_WIDTH, height: 471 },
  },
  {
    id: '55aca9c1-8043-4e36-9af3-c991cb3ddf00',
    title: '2026 · 2. náhradní termín · 10. Obdélník vepsaný do kružnice',
    source: 'JPZ 2026, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *D*, *S*, *U*.\n\n'
      + 'Bod *D* je vrchol obdélníku *ABCD*.\n'
      + 'Bod *S* je střed kružnice *k*, na níž leží všechny vrcholy tohoto obdélníku.\n'
      + 'Bodem *U* prochází přímka *u*, na které leží vrcholy *A*, *C* obdélníku *ABCD*.\n\n'
      + 'Sestrojte kružnici *k* a vrcholy *A*, *B*, *C* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.',
    points: [
      { id: 'd', x: 123.2, y: 153.0, label: 'D' },
      { id: 's', x: 299.5, y: 282.4, label: 'S' },
      { id: 'u', x: 631.6, y: 240.7, label: 'U' },
    ],
    lines: [],
    frame: { width: FRAME_WIDTH, height: 546 },
  },
];

export const CERMAT_ASSIGNMENTS: CermatAssignment[] = CERMAT_ASSIGNMENTS_RAW.map(item => ({
  ...item,
  instructionText: stripCermatMarkup(item.instructionMarkup),
}));

export function getCermatAssignment(id: string | undefined): CermatAssignment | null {
  if (!id) return null;
  return CERMAT_ASSIGNMENTS.find(item => item.id === id) ?? null;
}

/** Id bodu zadání na plátně (stejné v zadání i ve vzorovém řešení). */
export const cermatPointId = (pointId: string) => `pt-${pointId}`;

/** Snapshot plátna zadání: body jsou zamčené křížky, přímky vedou skrytými body z krajů čar v sešitu. */
export function cermatInstructionSnapshot(item: CermatAssignment) {
  const points: Array<{ id: string; x: number; y: number; label: string; locked: true; hidden?: true }> = [
    { id: 'pt-frame-tl', x: 0, y: 0, label: '', locked: true, hidden: true },
    { id: 'pt-frame-br', x: item.frame.width, y: item.frame.height, label: '', locked: true, hidden: true },
  ];
  const shapes: Array<{
    id: string;
    type: 'line';
    label: string;
    points: string[];
    locked: true;
    definition: { p1Id: string; p2Id: string };
  }> = [];
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
    points.push({ id: cermatPointId(point.id), x: point.x, y: point.y, label: point.label, locked: true });
  }
  return { points, shapes, freehandPaths: [] as never[] };
}
