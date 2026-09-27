/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík E — vlastní test A6 (viz dataPrijimacky-e.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, foot, given, lineCircle, mul, sub, unit } from './board';

/** Vlastní test A6, úloha 9: body 3 cm od bodu S a 1 cm od přímky p — kružnice a dvě rovnoběžky, čtyři řešení. */
function pointsAtDistancesSolution(): AssignmentModelSolution {
  const g = given('674995d6-a63c-494b-9a86-4dae91f5a9d7');
  const S = g.point('s');
  const p = g.line('p');
  const r = 150; // 3 cm
  const F = foot(S, p.a, p.d);
  const n = unit(sub(S, F)); // kolmice k p směrem k bodu S
  const u = unit(p.d);
  const H1 = add(F, mul(n, 50)); // 1 cm na stranu bodu S
  const H2 = sub(F, mul(n, 50)); // 1 cm na druhou stranu
  if (Math.abs(dist(S, F) - 75) > 0.5) throw new Error('Bod S má být 1,5 cm od přímky p');
  const byX = (a: V, b: V) => a.x - b.x;
  const [X1, X2] = lineCircle(H1, u, S, r).sort(byX);
  const [X3, X4] = lineCircle(H2, u, S, r).sort(byX);
  if (!X1 || !X2 || !X3 || !X4) throw new Error('Kružnice k má protnout obě rovnoběžky');

  // konce rovnoběžek pro popisky q₁, q₂ (editor je kreslí v 1,1násobku úseku) — pod popiskem přímky p
  const labelX = p.a.x + 1.1 * p.d.x;
  const qEnd = (H: V) => add(H, mul(u, (labelX - H.x) / u.x / 1.1));

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-f', F);
  s.point('sol-h1', H1, 'H₁');
  s.point('sol-h2', H2, 'H₂');
  s.ref('sol-h1e', qEnd(H1));
  s.ref('sol-h2e', qEnd(H2));
  // bod na kružnici vlevo dole — editor kreslí popisek naproti němu, tedy vpravo nahoře jako v přijímačkách
  s.ref('sol-kr', add(S, mul(unit({ x: -1, y: 1 }), r)));
  s.helperLine('sol-kolmice', 'sol-s', 'sol-f');
  s.arc('sol-arc-h1', 'sol-f', 'sol-h1', 0.35);
  s.arc('sol-arc-h2', 'sol-f', 'sol-h2', 0.35);
  s.helperLine('sol-q1', 'sol-h1', 'sol-h1e', 'q₁');
  s.helperLine('sol-q2', 'sol-h2', 'sol-h2e', 'q₂');
  s.circle('sol-k', 'sol-s', 'sol-kr', 'k');
  s.point('sol-x1', X1, 'X₁');
  s.point('sol-x2', X2, 'X₂');
  s.point('sol-x3', X3, 'X₃');
  s.point('sol-x4', X4, 'X₄');

  return cumulative(
    s,
    'Body vzdálené 1 cm od přímky p leží na dvou rovnoběžkách q₁ a q₂ s přímkou p, 1 cm od ní na každé straně. Body vzdálené 3 cm od bodu S leží na kružnici k se středem S a poloměrem 3 cm. Bod S je od rovnoběžek vzdálený 0,5 cm a 2,5 cm, méně než 3 cm, kružnice k proto protne každou rovnoběžku ve dvou bodech — úloha má čtyři řešení X₁, X₂, X₃, X₄.',
    [
      {
        text: 'Body, které mají od přímky p vzdálenost 1 cm, leží na dvou rovnoběžkách s přímkou p — jedna je 1 cm na jedné straně, druhá 1 cm na druhé straně. Sestrojte kolmici k přímce p bodem S a naneste na ni kružítkem od přímky p 1 cm na obě strany: body H₁ a H₂.',
        points: ['sol-h1', 'sol-h2'],
        shapes: ['sol-kolmice', 'sol-arc-h1', 'sol-arc-h2'],
      },
      {
        text: 'Body H₁ a H₂ veďte rovnoběžky q₁ a q₂ s přímkou p. Na nich leží všechny body, které mají od přímky p vzdálenost 1 cm.',
        shapes: ['sol-q1', 'sol-q2'],
      },
      {
        text: 'Body, které mají od bodu S vzdálenost 3 cm, leží na kružnici se středem S a poloměrem 3 cm. Narýsujte kružítkem kružnici k se středem S a poloměrem 3 cm.',
        shapes: ['sol-k'],
      },
      {
        text: 'Hledané body leží zároveň na kružnici k i na jedné z rovnoběžek. Bod S je od přímky p vzdálený 1,5 cm, od q₁ tedy 0,5 cm a od q₂ 2,5 cm — obě vzdálenosti jsou menší než poloměr 3 cm, kružnice k proto protne každou rovnoběžku ve dvou bodech. Průsečíky s q₁ označte X₁, X₂, průsečíky s q₂ označte X₃, X₄. Úloha má čtyři řešení — kdo by sestrojil jen jednu rovnoběžku, našel by jen dvě z nich.',
        points: ['sol-x1', 'sol-x2', 'sol-x3', 'sol-x4'],
      },
    ],
    {
      figures: [
        { name: 'bod X₁', vertices: ['sol-x1'] },
        { name: 'bod X₂', vertices: ['sol-x2'] },
        { name: 'bod X₃', vertices: ['sol-x3'] },
        { name: 'bod X₄', vertices: ['sol-x4'] },
      ],
    },
  );
}

/** Vlastní test A6, úloha 10: trojúhelník ABC s |AC| = 5 cm a vrcholem C na přímce p — kružnice k(A; 5 cm), dvě řešení. */
function sideEndOnLineSolution(): AssignmentModelSolution {
  const g = given('ed349788-10f5-4e92-bf6a-939a7dbbf2b2');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  if (Math.abs(dist(A, foot(A, p.a, p.d)) - 150) > 0.5) throw new Error('Bod A má být 3 cm od přímky p');
  const [C1, C2] = lineCircle(p.a, p.d, A, 250).sort((q, w) => q.x - w.x); // 5 cm
  if (!C1 || !C2) throw new Error('Kružnice k(A; 5 cm) má protnout přímku p');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  // body oblouků (stejné místo jako C₁, C₂), aby se vrcholy objevily až v kroku, kde se označí
  s.ref('sol-c1r', C1);
  s.ref('sol-c2r', C2);
  s.arc('sol-arc-c1', 'sol-a', 'sol-c1r', 0.3);
  s.arc('sol-arc-c2', 'sol-a', 'sol-c2r', 0.3);
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Vrchol C má od vrcholu A vzdálenost 5 cm, leží tedy na kružnici se středem A a poloměrem 5 cm, a zároveň leží na přímce p. Bod A je od přímky p vzdálený 3 cm, méně než 5 cm, kružnice proto protne přímku p ve dvou bodech C₁ a C₂. Úloha má dvě řešení — trojúhelníky ABC₁ a ABC₂.',
    [
      {
        text: 'Vrchol C má od vrcholu A vzdálenost 5 cm, leží tedy na kružnici se středem A a poloměrem 5 cm. Zároveň má ležet na přímce p. Nastavte kružítko na 5 cm a z bodu A opište oblouk tam, kde protne přímku p vlevo.',
        shapes: ['sol-arc-c1'],
      },
      {
        text: 'Bod A je od přímky p vzdálený 3 cm, méně než 5 cm — kružnice proto protne přímku p i na druhé straně. Opište stejným poloměrem z bodu A oblouk i vpravo.',
        shapes: ['sol-arc-c2'],
      },
      {
        text: 'Průsečíky oblouků s přímkou p označte C₁ a C₂. Oba mají od bodu A vzdálenost 5 cm a leží na přímce p.',
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

export const PRIJIMACKY_TEST_SOLUTIONS_E: [string, () => AssignmentModelSolution][] = [
  ['674995d6-a63c-494b-9a86-4dae91f5a9d7', pointsAtDistancesSolution],
  ['ed349788-10f5-4e92-bf6a-939a7dbbf2b2', sideEndOnLineSolution],
];
