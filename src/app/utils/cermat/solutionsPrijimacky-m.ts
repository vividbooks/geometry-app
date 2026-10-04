/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík M — vlastní test A8 (viz dataPrijimacky-m.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, given, lineLine, mul, perp, rotate, sub, unit } from './board';

/** Vlastní test A8, úloha 9: úhel 60° kružítkem (rovnostranný trojúhelník APQ), na rameni AQ bod C ve vzdálenosti 4 cm. */
function angle60Solution(): AssignmentModelSolution {
  const g = given('999e71a2-cd4a-4166-bb43-387ab4cea9e7');
  const A = g.point('a');
  const B = g.point('b');
  const e = unit(sub(B, A));
  const r = 100;
  const P = add(A, mul(e, r));
  // Úhel 60° nad přímkou AB: v souřadnicích plátna (osa y dolů) je to otočení o −60°.
  const Q = rotate(P, A, -Math.PI / 3);
  const f = unit(sub(Q, A));
  const C = add(A, mul(f, 200));
  if (dist(C, { x: 240, y: 216.795 }) > 0.6 || Math.abs(dist(P, Q) - r) > 1e-6) {
    throw new Error('Vrchol C nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-r30', rotate(P, A, -Math.PI / 6));
  s.ref('sol-q0', Q);
  s.ref('sol-c0', C);
  s.ref('sol-ray', add(A, mul(f, 260)));
  s.point('sol-p', P, 'P');
  s.arc('sol-arc-a', 'sol-a', 'sol-r30', 1.5);
  s.arc('sol-arc-p', 'sol-p', 'sol-q0', 0.5);
  s.point('sol-q', Q, 'Q');
  s.helperLine('sol-aq', 'sol-a', 'sol-ray');
  s.arc('sol-arc-c', 'sol-a', 'sol-c0', 0.35);
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Úhel 60° je vnitřní úhel rovnostranného trojúhelníku, sestrojí se proto kružítkem jedním poloměrem. Vrchol C leží na rameni tohoto úhlu a od bodu A je vzdálený 4 cm. Nad přímkou AB má úloha jedno řešení.',
    [
      {
        text: 'Z bodu A opište oblouk libovolným poloměrem (třeba 2 cm). Průsečík s úsečkou AB označte P.',
        points: ['sol-p'],
        shapes: ['sol-arc-a'],
      },
      {
        text: 'Stejným poloměrem opište oblouk z bodu P. Průsečík obou oblouků nad AB označte Q. Trojúhelník APQ je rovnostranný, |∢PAQ| = 60°.',
        points: ['sol-q'],
        shapes: ['sol-arc-p'],
      },
      {
        text: 'Narýsujte polopřímku AQ a kružítkem na ni naneste od bodu A vzdálenost 4 cm. Tak dostanete vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-aq', 'sol-arc-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Kontrola: |AC| = 4 cm a úhel BAC má 60°.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
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
