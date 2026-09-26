/**
 * Vzorová řešení konstrukčních úloh CERMAT (sekce „CERMAT“ v knihovně úkolů) po krocích.
 * Počítají se ze stejných souřadnic jako zadání (`cermatAssignments.ts`), takže řešení
 * na plátně přesně sedí na daných bodech a přímkách.
 */
import type { GeometrySubmissionSnapshot } from '../../../rysovani/src/components/FreeGeometryEditor';
import type {
  AssignmentModelSolution,
  AssignmentSolutionStep,
  ConstructionCheck,
  ConstructionCheckPoint,
} from './assignmentSolutions';
import { getCermatAssignment } from './cermatAssignments';

type SolPoint = GeometrySubmissionSnapshot['points'][number];
type SolShape = GeometrySubmissionSnapshot['shapes'][number];
type V = { x: number; y: number };

const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
const sub = (a: V, b: V): V => ({ x: a.x - b.x, y: a.y - b.y });
const mul = (a: V, s: number): V => ({ x: a.x * s, y: a.y * s });
const mid = (a: V, b: V): V => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
const dot = (a: V, b: V): number => a.x * b.x + a.y * b.y;
const len = (a: V): number => Math.hypot(a.x, a.y);
const dist = (a: V, b: V): number => len(sub(a, b));
const unit = (a: V): V => mul(a, 1 / (len(a) || 1));
const perp = (a: V): V => ({ x: -a.y, y: a.x });

/** Pata kolmice z bodu `p` na přímku bodem `a` ve směru `d`. */
function foot(p: V, a: V, d: V): V {
  const u = unit(d);
  return add(a, mul(u, dot(sub(p, a), u)));
}

/** Průsečíky přímky (bod `a`, směr `d`) s kružnicí; seřazené podle parametru na přímce. */
function lineCircle(a: V, d: V, c: V, r: number): V[] {
  const u = unit(d);
  const f = foot(c, a, u);
  const h2 = r * r - dist(f, c) ** 2;
  if (h2 < 0) return [];
  const h = Math.sqrt(h2);
  return [sub(f, mul(u, h)), add(f, mul(u, h))];
}

function lineLine(p: V, r: V, q: V, s: V): V {
  const den = r.x * s.y - r.y * s.x;
  const t = ((q.x - p.x) * s.y - (q.y - p.y) * s.x) / den;
  return add(p, mul(r, t));
}

function rotate(p: V, c: V, rad: number): V {
  const d = sub(p, c);
  return {
    x: c.x + d.x * Math.cos(rad) - d.y * Math.sin(rad),
    y: c.y + d.x * Math.sin(rad) + d.y * Math.cos(rad),
  };
}

/** Sbírka bodů a čar jednoho řešení; kroky z ní vybírají podle id. */
class Board {
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
type CheckSpec = {
  figures: Array<{ name: string; vertices: string[]; extra?: string[] }>;
  circles?: ConstructionCheck['circles'];
  interchangeable?: ConstructionCheck['interchangeable'];
};

/** Kroky se skládají narůstáním: každý krok přidá body a čáry k předchozím. */
function cumulative(
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
        ...(checkSpec.interchangeable?.length ? { interchangeable: checkSpec.interchangeable } : {}),
      }
    : undefined;
  if (check) {
    const inSnapshot = new Set(snapshot.points.map(p => p.id));
    const ids = [
      ...check.figures.flatMap(f => [...f.vertices, ...(f.extra ?? [])].map(p => p.id)),
      ...(check.circles ?? []).flatMap(c => [c.centerId, c.rimId]),
    ];
    const missing = ids.find(id => !inSnapshot.has(id));
    if (missing) throw new Error(`Bod ${missing} z kontroly chybí ve výsledném řešení`);
  }
  return { explanation, steps: out, snapshot, ...(check ? { check } : {}) };
}

function given(id: string) {
  const item = getCermatAssignment(id);
  if (!item) throw new Error(`Chybí zadání CERMAT ${id}`);
  const point = (pid: string): V => {
    const p = item.points.find(q => q.id === pid);
    if (!p) throw new Error(`Chybí bod ${pid} v zadání ${id}`);
    return { x: p.x, y: p.y };
  };
  const line = (label: string): { a: V; d: V } => {
    const l = item.lines.find(q => q.label === label);
    if (!l) throw new Error(`Chybí přímka ${label} v zadání ${id}`);
    return { a: l.from, d: sub(l.to, l.from) };
  };
  return { point, line };
}

/** 2026, 1. řádný termín, úloha 9: trojúhelník ABC, AB ⊥ b, |BC| = |AB| + 2 cm, C na c. */
function triangleTwoLinesSolution(): AssignmentModelSolution {
  const g = given('046da8bc-3b22-44ff-b1e3-231a94b03dd6');
  const A = g.point('a');
  const b = g.line('b');
  const c = g.line('c');
  const B = foot(A, b.a, b.d);
  const r = dist(A, B) + 100; // 2 cm = 100 px
  const X = add(B, mul(unit(sub(A, B)), r));
  const [C1, C2] = lineCircle(c.a, c.d, B, r).sort((p, q) => p.x - q.x);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.point('sol-b', B, 'B');
  s.ref('sol-x', X);
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-b');
  s.segment('sol-ax', 'sol-a', 'sol-x', true);
  s.circle('sol-k', 'sol-b', 'sol-x', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Vrchol B je pata kolmice z bodu A k přímce b. Vrchol C leží na kružnici se středem B a poloměrem |AB| + 2 cm a zároveň na přímce c. Kružnice protne c ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Strana AB je kolmá k přímce b a vrchol B leží na přímce b. Sestrojte kolmici k přímce b procházející bodem A. Její průsečík s přímkou b je vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Strana BC je o 2 cm delší než strana AB. Prodlužte úsečku BA za bod A o 2 cm — dostanete úsečku délky |AB| + 2 cm.',
        shapes: ['sol-ax'],
      },
      {
        text: 'Vrchol C je od vrcholu B vzdálený |AB| + 2 cm. Sestrojte kružnici k se středem B a tímto poloměrem.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol C leží zároveň na přímce c. Kružnice k protne přímku c ve dvou bodech — označte je C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc1', 'sol-c1a', 'sol-bc2', 'sol-c2a'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC₁', vertices: ['sol-a', 'sol-b', 'sol-c1'] },
        { name: 'trojúhelník ABC₂', vertices: ['sol-a', 'sol-b', 'sol-c2'] },
      ],
    },
  );
}

/** 2026, 1. řádný termín, úloha 10: rovnoběžník s osou o přes B, D a |BD| = 2|AC| (kosočtverec). */
function rhombusAxisSolution(): AssignmentModelSolution {
  const g = given('f9d688a0-31c3-4eec-bfc1-e648bc9ada54');
  const A = g.point('a');
  const o = g.line('o');
  const S = foot(A, o.a, o.d);
  const C = sub(mul(S, 2), A);
  const ac = dist(A, C);
  const u = unit(o.d);
  const B = add(S, mul(u, ac));
  const D = sub(S, mul(u, ac));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.point('sol-s', S, 'S');
  s.point('sol-c', C, 'C');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-s');
  s.arc('sol-arc-c', 'sol-s', 'sol-c');
  s.segment('sol-ac', 'sol-a', 'sol-c', true);
  s.circle('sol-k', 'sol-s', 'sol-b', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Osa souměrnosti procházející vrcholy B a D dělá z rovnoběžníku kosočtverec, jeho úhlopříčky jsou na sebe kolmé a půlí se. Střed S je pata kolmice z A k ose o, C je obraz A podle o a B, D leží na o ve vzdálenosti |AC| od S.',
    [
      {
        text: 'Přímka o je osou souměrnosti rovnoběžníku a leží na ní vrcholy B, D. Takový rovnoběžník je kosočtverec a úhlopříčka AC je k ose o kolmá. Sestrojte kolmici k přímce o bodem A; průsečík je střed S úhlopříček.',
        points: ['sol-s'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Vrchol C je obraz bodu A v osové souměrnosti s osou o: leží na kolmici za osou a |SC| = |SA|. Naneste vzdálenost |SA| kružítkem od S a označte C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c', 'sol-ac'],
      },
      {
        text: 'Úhlopříčka BD je dvakrát delší než AC, polovina BD je tedy stejně dlouhá jako celá AC: |SB| = |SD| = |AC|. Sestrojte kružnici k se středem S a poloměrem |AC|. Protne přímku o ve vrcholech B a D.',
        points: ['sol-b', 'sol-d'],
        shapes: ['sol-k'],
      },
      {
        text: 'Narýsujte rovnoběžník (kosočtverec) ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'rovnoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      // B a D leží oba na ose o — prohozením vznikne pořád rovnoběžník ABCD.
      interchangeable: [['sol-b', 'sol-d']],
    },
  );
}

/** 2026, 2. řádný termín, úloha 9: pravidelný šestiúhelník, OP je osa strany AB, S na polopřímce OP. */
function regularHexagonSolution(): AssignmentModelSolution {
  const g = given('284a261e-1323-404c-8d69-b90f4ffdd8d8');
  const A = g.point('a');
  const O = g.point('o');
  const P = g.point('p');
  const dir = sub(P, O);
  const X = foot(A, O, dir);
  const B = sub(mul(X, 2), A);
  const side = dist(A, B);
  const S = lineCircle(O, dir, A, side).find(q => dot(sub(q, O), dir) > 0)!;
  const cross = (A.x - S.x) * (B.y - S.y) - (A.y - S.y) * (B.x - S.x);
  const step = (cross > 0 ? 1 : -1) * (Math.PI / 3);
  const Cc = rotate(B, S, step);
  const D = rotate(Cc, S, step);
  const E = rotate(D, S, step);
  const F = rotate(E, S, step);
  const far = add(S, mul(unit(dir), dist(S, P) + 60));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-o', O);
  s.ref('sol-far', far);
  s.point('sol-b', B, 'B');
  s.point('sol-s', S, 'S');
  s.point('sol-c', Cc, 'C');
  s.point('sol-d', D, 'D');
  s.point('sol-e', E, 'E');
  s.point('sol-f', F, 'F');
  s.helperLine('sol-op', 'sol-o', 'sol-far');
  s.segment('sol-ab-thin', 'sol-a', 'sol-b', true);
  s.arc('sol-arc-s', 'sol-a', 'sol-s', 0.55);
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-de', 'sol-d', 'sol-e');
  s.segment('sol-ef', 'sol-e', 'sol-f');
  s.segment('sol-fa', 'sol-f', 'sol-a');

  return cumulative(
    s,
    'Vrchol B je obraz bodu A podle přímky OP. Střed S pravidelného šestiúhelníku je od každého vrcholu stejně daleko jako délka strany, leží proto na kružnici se středem A a poloměrem |AB| a zároveň na polopřímce OP. Zbylé vrcholy leží na kružnici se středem S a poloměrem |SA|, sousední jsou od sebe vzdálené |AB|.',
    [
      {
        text: 'Přímka OP je osou strany AB, bod B je proto obraz bodu A v osové souměrnosti s osou OP. Sestrojte přímku OP, kolmici k ní bodem A a na ní bod B ve stejné vzdálenosti od OP jako bod A.',
        points: ['sol-b'],
        shapes: ['sol-op', 'sol-ab-thin'],
      },
      {
        text: 'V pravidelném šestiúhelníku je střed S od každého vrcholu stejně daleko jako délka strany: |SA| = |AB|. Kružnice se středem A a poloměrem |AB| protne polopřímku OP ve středu S.',
        points: ['sol-s'],
        shapes: ['sol-arc-s'],
      },
      {
        text: 'Všechny vrcholy leží na kružnici k se středem S a poloměrem |SA|. Sestrojte ji a od bodu B nanášejte kružítkem délku strany |AB| — dostanete vrcholy C, D, E a F.',
        points: ['sol-c', 'sol-d', 'sol-e', 'sol-f'],
        shapes: ['sol-k'],
      },
      {
        text: 'Narýsujte šestiúhelník ABCDEF.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-de', 'sol-ef', 'sol-fa'],
      },
    ],
    {
      figures: [
        {
          name: 'šestiúhelník ABCDEF',
          vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d', 'sol-e', 'sol-f'],
        },
      ],
    },
  );
}

/** 2026, 2. řádný termín, úloha 10: C na Thaletových kružnicích nad AB a nad BD. */
function twoRightTrianglesSolution(): AssignmentModelSolution {
  const g = given('33c47712-dbb7-4ebb-a43c-d1fcab735d1e');
  const A = g.point('a');
  const B = g.point('b');
  const D = g.point('d');
  const S1 = mid(A, B);
  const S2 = mid(B, D);
  // Druhý průsečík obou Thaletových kružnic (prvním je B): obraz B podle spojnice středů.
  const C = sub(mul(foot(B, S1, sub(S2, S1)), 2), B);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-d', D, 'D');
  s.point('sol-s1', S1, 'S₁');
  s.point('sol-s2', S2, 'S₂');
  s.point('sol-c', C, 'C');
  s.circle('sol-k1', 'sol-s1', 'sol-b', 'k₁');
  s.circle('sol-k2', 'sol-s2', 'sol-b', 'k₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-db', 'sol-d', 'sol-b');

  return cumulative(
    s,
    'Pravý úhel při vrcholu C znamená, že C leží na Thaletově kružnici nad AB i na Thaletově kružnici nad BD. Kružnice se protínají v bodě B a ve vrcholu C.',
    [
      {
        text: 'Trojúhelník ABC má pravý úhel při vrcholu C, C proto leží na Thaletově kružnici nad průměrem AB. Sestrojte střed S₁ úsečky AB a kružnici k₁ se středem S₁ procházející body A a B.',
        points: ['sol-s1'],
        shapes: ['sol-k1'],
      },
      {
        text: 'Trojúhelník BCD má také pravý úhel při C, C leží i na Thaletově kružnici nad průměrem BD. Sestrojte střed S₂ úsečky BD a kružnici k₂.',
        points: ['sol-s2'],
        shapes: ['sol-k2'],
      },
      {
        text: 'Kružnice k₁ a k₂ se protínají v bodě B a ještě v jednom bodě — to je vrchol C. Označte ho.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC a BCD. Body A, C, D leží na jedné přímce, protože obě úsečky CA i CD jsou kolmé na CB.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca', 'sol-cd', 'sol-db'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] },
        { name: 'trojúhelník BCD', vertices: ['sol-b', 'sol-c', 'sol-d'] },
      ],
    },
  );
}

/** 2026, 1. náhradní termín, úloha 9: rovnoramenný ABC (|AC| = |BC|), S střed AC, střed P strany BC na p. */
function isoscelesMidpointsSolution(): AssignmentModelSolution {
  const g = given('5b33aef9-b257-4238-8fd7-195745c28f33');
  const A = g.point('a');
  const S = g.point('s');
  const p = g.line('p');
  const C = sub(mul(S, 2), A);
  const r = dist(C, S);
  const hits = lineCircle(p.a, p.d, C, r).sort((a, b) => dist(a, A) - dist(b, A));
  const P1 = hits[0]!;
  const P2 = hits[1]!;
  const B1 = sub(mul(P1, 2), C);
  const B2 = sub(mul(P2, 2), C);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.point('sol-c', C, 'C');
  s.point('sol-p1', P1, 'P₁');
  s.point('sol-p2', P2, 'P₂');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.arc('sol-arc-c', 'sol-s', 'sol-c');
  s.circle('sol-k', 'sol-c', 'sol-s', 'k');
  s.segment('sol-cb1-thin', 'sol-c', 'sol-b1', true);
  s.segment('sol-cb2-thin', 'sol-c', 'sol-b2', true);
  s.arc('sol-arc-b1', 'sol-p1', 'sol-b1');
  s.arc('sol-arc-b2', 'sol-p2', 'sol-b2');
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');

  return cumulative(
    s,
    'Vrchol C je obraz bodu A ve středové souměrnosti se středem S. Protože |BC| = |AC| a P je střed BC, platí |CP| = |CS|: P leží na kružnici se středem C a poloměrem |CS| a zároveň na přímce p. Vrchol B je obraz C podle P. Úloha má dvě řešení.',
    [
      {
        text: 'Bod S je střed strany AC. Vrchol C proto leží na polopřímce AS a |SC| = |AS|. Naneste vzdálenost |AS| za bod S a označte C.',
        points: ['sol-c'],
        shapes: ['sol-ac-thin', 'sol-arc-c'],
      },
      {
        text: 'Strany AC a BC jsou stejně dlouhé a P je střed strany BC, takže |CP| = |BC| : 2 = |AC| : 2 = |CS|. Sestrojte kružnici k se středem C a poloměrem |CS|.',
        shapes: ['sol-k'],
      },
      {
        text: 'Střed P leží na kružnici k i na přímce p. Kružnice protne přímku p ve dvou bodech — označte je P₁ a P₂.',
        points: ['sol-p1', 'sol-p2'],
      },
      {
        text: 'Bod P je střed strany BC, vrchol B je tedy obraz bodu C ve středové souměrnosti se středem P. Na polopřímce CP₁ naneste za P₁ vzdálenost |CP₁| a označte B₁, stejně na polopřímce CP₂ bod B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-cb1-thin', 'sol-cb2-thin', 'sol-arc-b1', 'sol-arc-b2'],
      },
      {
        text: 'Narýsujte trojúhelníky AB₁C a AB₂C. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-b1c', 'sol-ca', 'sol-ab2', 'sol-b2c'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník AB₁C', vertices: ['sol-a', 'sol-b1', 'sol-c'], extra: ['sol-p1'] },
        { name: 'trojúhelník AB₂C', vertices: ['sol-a', 'sol-b2', 'sol-c'], extra: ['sol-p2'] },
      ],
    },
  );
}

/** 2026, 1. náhradní termín, úloha 10: obdélník KLMN, U na KN, KL na k, V střed. */
function rectangleCenterSolution(): AssignmentModelSolution {
  const g = given('43f19b67-3f62-41f2-a75b-ef0f62d76310');
  const U = g.point('u');
  const V = g.point('v');
  const k = g.line('k');
  const K = foot(U, k.a, k.d);
  const r = dist(V, K);
  const L = lineCircle(k.a, k.d, V, r).sort((a, b) => dist(b, K) - dist(a, K))[0]!;
  const N = lineCircle(K, sub(U, K), V, r).sort((a, b) => dist(b, K) - dist(a, K))[0]!;
  const M = sub(mul(V, 2), K);

  const s = new Board();
  s.ref('sol-u', U);
  s.ref('sol-v', V);
  s.point('sol-k', K, 'K');
  s.point('sol-l', L, 'L');
  s.point('sol-m', M, 'M');
  s.point('sol-n', N, 'N');
  s.helperLine('sol-kolmice', 'sol-k', 'sol-u');
  s.circle('sol-kr', 'sol-v', 'sol-k');
  s.segment('sol-km-thin', 'sol-k', 'sol-m', true);
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mn', 'sol-m', 'sol-n');
  s.segment('sol-nk', 'sol-n', 'sol-k');

  return cumulative(
    s,
    'Strana KN je kolmá na přímku k a prochází bodem U, vrchol K je pata kolmice z U na k. Bod V je střed obdélníku, všechny vrcholy leží na kružnici se středem V a poloměrem |VK|. Ta protne k ve vrcholu L a kolmici ve vrcholu N, vrchol M je obraz K podle V.',
    [
      {
        text: 'Strana KL leží na přímce k a strana KN je k ní kolmá a prochází bodem U. Sestrojte kolmici k přímce k bodem U. Její průsečík s přímkou k je vrchol K.',
        points: ['sol-k'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Bod V je stejně daleko od všech čtyř vrcholů — je to střed obdélníku a vrcholy leží na kružnici se středem V. Sestrojte kružnici se středem V procházející vrcholem K.',
        shapes: ['sol-kr'],
      },
      {
        text: 'Kružnice protne přímku k ve vrcholu L a kolmici KU ve vrcholu N. Vrchol M je obraz bodu K ve středové souměrnosti se středem V — leží na kružnici naproti K.',
        points: ['sol-l', 'sol-n', 'sol-m'],
        shapes: ['sol-km-thin'],
      },
      {
        text: 'Narýsujte obdélník KLMN.',
        shapes: ['sol-kl', 'sol-lm', 'sol-mn', 'sol-nk'],
      },
    ],
    {
      figures: [{ name: 'obdélník KLMN', vertices: ['sol-k', 'sol-l', 'sol-m', 'sol-n'] }],
    },
  );
}

/** 2026, 2. náhradní termín, úloha 9: pravoúhlý rovnoramenný BCD a lichoběžník ABCD s A na p. */
function trapezoidFromRightTriangleSolution(): AssignmentModelSolution {
  const g = given('093d6b4f-f088-40c3-bf5b-d958a62cde63');
  const D = g.point('d');
  const B = g.point('b');
  const p = g.line('p');
  const M = mid(B, D);
  const h = dist(B, D) / 2;
  const n = unit(perp(sub(B, D)));
  const distToP = (q: V) => Math.abs((q.x - p.a.x) * p.d.y - (q.y - p.a.y) * p.d.x) / len(p.d);
  const C = [add(M, mul(n, h)), sub(M, mul(n, h))].sort((a, b) => distToP(b) - distToP(a))[0]!;
  const other = sub(mul(M, 2), C);
  const A1 = lineLine(B, sub(C, D), p.a, p.d);
  const A2 = lineLine(D, sub(C, B), p.a, p.d);

  const s = new Board();
  s.ref('sol-d', D, 'D');
  s.ref('sol-b', B, 'B');
  s.ref('sol-other', other);
  s.point('sol-m', M, 'S');
  s.point('sol-c', C, 'C');
  s.point('sol-a1', A1, 'A₁');
  s.point('sol-a2', A2, 'A₂');
  s.segment('sol-bd-thin', 'sol-b', 'sol-d', true);
  s.circle('sol-k', 'sol-m', 'sol-b', 'k');
  s.helperLine('sol-osa', 'sol-other', 'sol-c');
  s.helperLine('sol-par1', 'sol-b', 'sol-a1');
  s.helperLine('sol-par2', 'sol-d', 'sol-a2');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-a1b', 'sol-a1', 'sol-b');
  s.segment('sol-da1', 'sol-d', 'sol-a1');
  s.segment('sol-a2b', 'sol-a2', 'sol-b');
  s.segment('sol-da2', 'sol-d', 'sol-a2');

  return cumulative(
    s,
    'Vrchol C leží na Thaletově kružnici nad BD a zároveň na ose úsečky BD; ze dvou průsečíků platí ten vzdálenější od přímky p. Lichoběžník ABCD má rovnoběžné buď strany AB a CD, nebo AD a BC — rovnoběžky vedené bodem B, resp. D protnou p ve vrcholech A₁ a A₂. Úloha má dvě řešení.',
    [
      {
        text: '9.1 Úhel při vrcholu C je pravý, C proto leží na Thaletově kružnici nad průměrem BD. Sestrojte střed S úsečky BD a kružnici k se středem S procházející body B a D.',
        points: ['sol-m'],
        shapes: ['sol-bd-thin', 'sol-k'],
      },
      {
        text: 'Trojúhelník je rovnoramenný, |CB| = |CD|, takže C leží i na ose úsečky BD. Osa protne kružnici k ve dvou bodech. Bod C má být od přímky p dál než bod B — vyberte vzdálenější průsečík a označte ho C.',
        points: ['sol-c'],
        shapes: ['sol-osa'],
      },
      {
        text: '9.2 Lichoběžník ABCD má dvě rovnoběžné strany. První možnost: AB ∥ CD. Rovnoběžka s přímkou CD vedená bodem B protne přímku p ve vrcholu A₁.',
        points: ['sol-a1'],
        shapes: ['sol-par1'],
      },
      {
        text: 'Druhá možnost: AD ∥ BC. Rovnoběžka s přímkou BC vedená bodem D protne přímku p ve vrcholu A₂.',
        points: ['sol-a2'],
        shapes: ['sol-par2'],
      },
      {
        text: 'Narýsujte lichoběžníky A₁BCD a A₂BCD. Úloha má dvě řešení.',
        shapes: ['sol-bc', 'sol-cd', 'sol-a1b', 'sol-da1', 'sol-a2b', 'sol-da2'],
      },
    ],
    {
      figures: [
        { name: 'lichoběžník A₁BCD', vertices: ['sol-a1', 'sol-b', 'sol-c', 'sol-d'] },
        { name: 'lichoběžník A₂BCD', vertices: ['sol-a2', 'sol-b', 'sol-c', 'sol-d'] },
      ],
    },
  );
}

/** 2026, 2. náhradní termín, úloha 10: obdélník ABCD vepsaný do kružnice k(S), A, C na přímce SU. */
function rectangleInCircleSolution(): AssignmentModelSolution {
  const g = given('55aca9c1-8043-4e36-9af3-c991cb3ddf00');
  const D = g.point('d');
  const S = g.point('s');
  const U = g.point('u');
  const r = dist(S, D);
  const dir = sub(U, S);
  const hits = lineCircle(S, dir, S, r);
  const C = hits.find(q => dot(sub(q, S), dir) > 0)!;
  const A = hits.find(q => dot(sub(q, S), dir) < 0)!;
  const B = sub(mul(S, 2), D);

  const s = new Board();
  s.ref('sol-d', D, 'D');
  s.ref('sol-s', S);
  s.ref('sol-u', U);
  s.point('sol-a', A, 'A');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.circle('sol-k', 'sol-s', 'sol-d', 'k');
  s.line('sol-u-line', 'sol-s', 'sol-u', 'u');
  s.segment('sol-db-thin', 'sol-d', 'sol-b', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Kružnice k má střed S a prochází vrcholem D. Úhlopříčky obdélníku jsou průměry kružnice k a půlí se v bodě S, přímka u proto vede body S a U a protíná k ve vrcholech A a C. Vrchol B je obraz D ve středové souměrnosti se středem S.',
    [
      {
        text: 'Všechny vrcholy obdélníku leží na kružnici k se středem S, i vrchol D. Sestrojte kružnici k se středem S a poloměrem |SD|.',
        shapes: ['sol-k'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé a půlí se, jsou to tedy průměry kružnice k a procházejí středem S. Úhlopříčka AC leží na přímce u, která proto prochází body S a U. Sestrojte ji; protne kružnici k ve vrcholech A a C (vrchol C je na straně bodu U).',
        points: ['sol-a', 'sol-c'],
        shapes: ['sol-u-line'],
      },
      {
        text: 'Vrchol B je druhý konec průměru DS — obraz bodu D ve středové souměrnosti se středem S.',
        points: ['sol-b'],
        shapes: ['sol-db-thin'],
      },
      {
        text: 'Narýsujte obdélník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-d' }],
      // A a C leží oba na přímce u — prohozením vznikne pořád obdélník ABCD.
      interchangeable: [['sol-a', 'sol-c']],
    },
  );
}

export const CERMAT_SOLUTION_BUILDERS: [string, () => AssignmentModelSolution][] = [
  ['046da8bc-3b22-44ff-b1e3-231a94b03dd6', triangleTwoLinesSolution],
  ['f9d688a0-31c3-4eec-bfc1-e648bc9ada54', rhombusAxisSolution],
  ['284a261e-1323-404c-8d69-b90f4ffdd8d8', regularHexagonSolution],
  ['33c47712-dbb7-4ebb-a43c-d1fcab735d1e', twoRightTrianglesSolution],
  ['5b33aef9-b257-4238-8fd7-195745c28f33', isoscelesMidpointsSolution],
  ['43f19b67-3f62-41f2-a75b-ef0f62d76310', rectangleCenterSolution],
  ['093d6b4f-f088-40c3-bf5b-d958a62cde63', trapezoidFromRightTriangleSolution],
  ['55aca9c1-8043-4e36-9af3-c991cb3ddf00', rectangleInCircleSolution],
];
