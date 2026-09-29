/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík L — vlastní test B8 (viz dataPrijimacky-l.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, mid, mul, perp, sub, unit } from './board';

/** Vlastní test B8, úloha 9: rovnoramenný lichoběžník ABCD, D na přímce p, |AD| = 3 cm — D = p ∩ k(A; 3), C = obraz D podle osy AB. */
function isoscelesTrapezoidSolution(): AssignmentModelSolution {
  const g = given('a51c637a-b205-4830-8c79-815ea8df4351');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const M = mid(A, B);
  const n = perp(sub(B, A));
  const Ds = lineCircle(p.a, p.d, A, 150).sort((x, y) => y.x - x.x);
  const [D1, D2] = Ds;
  if (!D1 || !D2) throw new Error('Přímka p neprotíná kružnici k');
  const mirror = (D: typeof A) => add(D, mul(sub(foot(D, M, n), D), 2));
  const C1 = mirror(D1);
  const C2 = mirror(D2);
  if (dist(D1, { x: 280, y: 245 }) > 0.6 || dist(D2, { x: 148, y: 221 }) > 0.6 || dist(C1, { x: 450, y: 245 }) > 0.6 || dist(C2, { x: 582, y: 221 }) > 0.6) {
    throw new Error('Vrcholy C, D nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-o1', add(M, mul(unit(n), 330)));
  s.ref('sol-o2', add(M, mul(unit(n), -110)));
  s.helperLine('sol-osa', 'sol-o1', 'sol-o2', 'o');
  s.ref('sol-d10', D1);
  s.ref('sol-d20', D2);
  s.arc('sol-arc-d1', 'sol-a', 'sol-d10', 0.35);
  s.arc('sol-arc-d2', 'sol-a', 'sol-d20', 0.35);
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.segment('sol-h1', 'sol-d1', 'sol-c1', true);
  s.segment('sol-h2', 'sol-d2', 'sol-c2', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1d1', 'sol-c1', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2d2', 'sol-c2', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'Rovnoramenný lichoběžník je souměrný podle osy své základny AB, vrchol C je proto obraz vrcholu D v osové souměrnosti s osou úsečky AB. Vrchol D leží na přímce p a má od bodu A vzdálenost 3 cm, leží tedy také na kružnici k se středem A a poloměrem 3 cm. Kružnice k protne přímku p ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Sestrojte osu o úsečky AB — lichoběžník je podle ní souměrný.',
        shapes: ['sol-osa'],
      },
      {
        text: 'Kružítkem z bodu A s poloměrem 3 cm protněte přímku p. Průsečíky jsou vrcholy D₁ a D₂.',
        points: ['sol-d1', 'sol-d2'],
        shapes: ['sol-arc-d1', 'sol-arc-d2'],
      },
      {
        text: 'Vrchol C je obraz bodu D v osové souměrnosti s osou o: veďte bodem D kolmici k ose o a za osu naneste stejnou vzdálenost. Vzniknou vrcholy C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-h1', 'sol-h2'],
      },
      {
        text: 'Narýsujte lichoběžníky ABC₁D₁ a ABC₂D₂. Kontrola: |BC| = |AD| = 3 cm a CD ∥ AB. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc1', 'sol-c1d1', 'sol-d1a', 'sol-bc2', 'sol-c2d2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'lichoběžník ABC₁D₁', vertices: ['sol-a', 'sol-b', 'sol-c1', 'sol-d1'] },
        { name: 'lichoběžník ABC₂D₂', vertices: ['sol-a', 'sol-b', 'sol-c2', 'sol-d2'] },
      ],
      interchangeable: [['sol-d1', 'sol-d2'], ['sol-c1', 'sol-c2']],
    },
  );
}

/** Vlastní test B8, úloha 10: pravoúhlý rovnoramenný trojúhelník, přepona na p — pata P je střed přepony, A, B = p ∩ k(P; |PC|). */
function rightIsoscelesSolution(): AssignmentModelSolution {
  const g = given('01be6bbb-1410-4a7d-8960-3ccdd1c42848');
  const C = g.point('c');
  const p = g.line('p');
  const P = foot(C, p.a, p.d);
  const r = dist(P, C);
  const [A, B] = lineCircle(p.a, p.d, P, r).sort((x, y) => x.x - y.x);
  if (!A || !B || dist(P, { x: 365, y: 315 }) > 0.6 || dist(A, { x: 245, y: 225 }) > 0.6 || dist(B, { x: 485, y: 405 }) > 0.6) {
    throw new Error('Vrcholy A, B nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-ke', add(P, mul(unit(sub(P, C)), 40)));
  s.helperLine('sol-kolmice', 'sol-c', 'sol-ke');
  s.point('sol-p', P, 'P');
  s.circle('sol-k', 'sol-p', 'sol-c', 'k');
  s.point('sol-a', A, 'A');
  s.point('sol-b', B, 'B');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Pravoúhlý rovnoramenný trojúhelník je souměrný podle kolmice vedené vrcholem C k přeponě; pata P této kolmice je střed přepony AB. Vrchol C s pravým úhlem leží na Thaletově kružnici nad přeponou, proto |PA| = |PB| = |PC|. Úloha má jedno řešení.',
    [
      {
        text: 'Veďte bodem C kolmici k přímce p. Její průsečík s p označte P — je to střed přepony AB.',
        points: ['sol-p'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Narýsujte kružnici k se středem P procházející bodem C (Thaletova kružnice nad přeponou).',
        shapes: ['sol-k'],
      },
      {
        text: 'Kružnice k protne přímku p ve vrcholech A a B. Označte je.',
        points: ['sol-a', 'sol-b'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Kontrola: |CA| = |CB| a úhel ACB je pravý. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      interchangeable: [['sol-a', 'sol-b']],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_L: [string, () => AssignmentModelSolution][] = [
  ['a51c637a-b205-4830-8c79-815ea8df4351', isoscelesTrapezoidSolution],
  ['01be6bbb-1410-4a7d-8960-3ccdd1c42848', rightIsoscelesSolution],
];
