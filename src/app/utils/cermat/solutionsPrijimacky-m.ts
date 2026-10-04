/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík M — vlastní test A8 (viz dataPrijimacky-m.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, given, lineLine, mul, perp, rotate, sub, unit } from './board';

/** Vlastní test A8, úloha 9: úhel 60° na obě strany přímky AB (kružítkem přes rovnostranné trojúhelníky), na ramenech C₁, C₂ ve vzdálenosti 4 cm. */
function angle60Solution(): AssignmentModelSolution {
  const g = given('999e71a2-cd4a-4166-bb43-387ab4cea9e7');
  const A = g.point('a');
  const B = g.point('b');
  const e = unit(sub(B, A));
  const r = 100;
  const P = add(A, mul(e, r));
  const Q1 = rotate(P, A, -Math.PI / 3);
  const Q2 = rotate(P, A, Math.PI / 3);
  const f1 = unit(sub(Q1, A));
  const f2 = unit(sub(Q2, A));
  const C1 = add(A, mul(f1, 200));
  const C2 = add(A, mul(f2, 200));
  if (dist(C1, { x: 240, y: 91.795 }) > 0.6 || dist(C2, { x: 240, y: 438.205 }) > 0.6) {
    throw new Error('Vrcholy C nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-q10', Q1);
  s.ref('sol-q20', Q2);
  s.ref('sol-c10', C1);
  s.ref('sol-c20', C2);
  s.ref('sol-ray1', add(A, mul(f1, 260)));
  s.ref('sol-ray2', add(A, mul(f2, 260)));
  s.point('sol-p', P, 'P');
  s.arc('sol-arc-a', 'sol-a', 'sol-p', 2.6);
  s.arc('sol-arc-p1', 'sol-p', 'sol-q10', 0.5);
  s.arc('sol-arc-p2', 'sol-p', 'sol-q20', 0.5);
  s.point('sol-q1', Q1, 'Q₁');
  s.point('sol-q2', Q2, 'Q₂');
  s.helperLine('sol-aq1', 'sol-a', 'sol-ray1');
  s.helperLine('sol-aq2', 'sol-a', 'sol-ray2');
  s.arc('sol-arc-c1', 'sol-a', 'sol-c10', 0.35);
  s.arc('sol-arc-c2', 'sol-a', 'sol-c20', 0.35);
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Vrchol C leží na rameni úhlu 60° s vrcholem A a ramenem AB a od bodu A je vzdálený 4 cm. Úhel 60° jde přenést na obě strany přímky AB, úloha má proto dvě řešení souměrná podle AB. Úhel 60° je vnitřní úhel rovnostranného trojúhelníku, dá se tedy sestrojit i kružítkem jedním poloměrem.',
    [
      {
        text: 'Úhel 60° můžete sestrojit úhloměrem, nebo kružítkem: z bodu A opište oblouk (třeba poloměrem 2 cm), který protne úsečku AB v bodě P.',
        points: ['sol-p'],
        shapes: ['sol-arc-a'],
      },
      {
        text: 'Stejným poloměrem opište oblouky z bodu P. Protnou první oblouk v bodech Q₁ a Q₂ na obou stranách přímky AB. Trojúhelníky APQ₁ a APQ₂ jsou rovnostranné, úhly při vrcholu A mají 60°.',
        points: ['sol-q1', 'sol-q2'],
        shapes: ['sol-arc-p1', 'sol-arc-p2'],
      },
      {
        text: 'Narýsujte polopřímky AQ₁ a AQ₂ a na každou kružítkem naneste od bodu A vzdálenost 4 cm. Tak dostanete vrcholy C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-aq1', 'sol-aq2', 'sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Kontrola: |AC| = 4 cm a úhel BAC má 60°. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc1', 'sol-c1a', 'sol-bc2', 'sol-c2a'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC₁', vertices: ['sol-a', 'sol-b', 'sol-c1'] },
        { name: 'trojúhelník ABC₂', vertices: ['sol-a', 'sol-b', 'sol-c2'] },
      ],
      interchangeable: [['sol-c1', 'sol-c2']],
    },
  );
}

/** Vlastní test A8, úloha 10: obdélník ABCD — kolmice k AB v A a B, rovnoběžka s AB bodem M. */
function rectangleSolution(): AssignmentModelSolution {
  const g = given('da74199d-f437-4340-8260-b70780498b52');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const e = sub(B, A);
  let n = unit(perp(e));
  if (n.y > 0) n = mul(n, -1);
  const D = lineLine(A, n, M, e);
  const C = lineLine(B, n, M, e);
  if (dist(D, { x: 124.321, y: 240.822 }) > 0.6 || dist(C, { x: 372.951, y: 214.69 }) > 0.6) {
    throw new Error('Vrcholy C, D nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M, 'M');
  s.ref('sol-ka', add(A, mul(n, 200)));
  s.ref('sol-kb', add(B, mul(n, 200)));
  s.ref('sol-p1', add(M, mul(unit(e), -120)));
  s.ref('sol-p2', add(M, mul(unit(e), 230)));
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-ka');
  s.helperLine('sol-kolmice-b', 'sol-b', 'sol-kb');
  s.helperLine('sol-p', 'sol-p1', 'sol-p2', 'p');
  s.point('sol-d', D, 'D');
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'V obdélníku jsou strany AD a BC kolmé na AB a strana CD je s AB rovnoběžná. Vrcholy D a C proto leží na kolmicích k AB v bodech A a B a zároveň na rovnoběžce s AB vedené bodem M. Úloha má jedno řešení.',
    [
      {
        text: 'V bodech A a B sestrojte kolmice k přímce AB.',
        shapes: ['sol-kolmice-a', 'sol-kolmice-b'],
      },
      {
        text: 'Bodem M veďte rovnoběžku p s přímkou AB — leží na ní strana CD.',
        shapes: ['sol-p'],
      },
      {
        text: 'Průsečík p s kolmicí v bodě A je vrchol D, průsečík s kolmicí v bodě B je vrchol C. Označte je.',
        points: ['sol-d', 'sol-c'],
      },
      {
        text: 'Narýsujte obdélník ABCD. Kontrola: bod M leží na straně CD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_M: [string, () => AssignmentModelSolution][] = [
  ['999e71a2-cd4a-4166-bb43-387ab4cea9e7', angle60Solution],
  ['da74199d-f437-4340-8260-b70780498b52', rectangleSolution],
];
