/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík K — vlastní test B7 (viz dataPrijimacky-k.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, lineLine, mid, mul, perp, sub, unit } from './board';

/** Vlastní test B7, úloha 9: osa úhlu BAC je osou souměrnosti ramen — obraz B′ bodu B leží na AC, C = AB′ ∩ k. */
function angleBisectorCircleSolution(): AssignmentModelSolution {
  const g = given('4560a048-0cb0-44bb-977d-ac45711ff4a1');
  const A = g.point('a');
  const B = g.point('b');
  const K = g.point('k');
  const k = g.circle('kk');
  const o = g.line('o');
  const P = foot(B, o.a, o.d);
  const B2 = add(P, sub(P, B));
  const dir = sub(B2, A);
  const cs = lineCircle(A, dir, k.c, k.r).filter(C => dist(C, A) > 1);
  const [C1, C2] = cs.sort((x, y) => dist(x, A) - dist(y, A));
  if (!C1 || !C2 || dist(B2, { x: 375, y: 160 }) > 0.6 || dist(C1, { x: 255, y: 320 }) > 0.6 || dist(C2, { x: 345, y: 200 }) > 0.6) {
    throw new Error('Body B′, C₁, C₂ nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-k', K, 'K');
  s.ref('sol-be', add(B2, mul(unit(sub(B2, B)), 35)));
  s.helperLine('sol-kolmice', 'sol-b', 'sol-be');
  s.point('sol-p', P, 'P');
  s.ref('sol-b20', B2);
  s.arc('sol-arc-b2', 'sol-p', 'sol-b20', 0.3);
  s.point('sol-b2', B2, 'B′');
  s.ref('sol-ae', add(B2, mul(unit(dir), 60)));
  s.helperLine('sol-ab2', 'sol-a', 'sol-ae');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Osa úhlu je jeho osou souměrnosti: osová souměrnost s osou o zobrazí rameno AB na rameno AC. Obraz B′ bodu B proto leží na polopřímce AC. Vrchol C leží na polopřímce AB′ i na kružnici k — je to jejich průsečík. Polopřímka AB′ protíná kružnici k ve dvou bodech, úloha má tedy dvě řešení.',
    [
      {
        text: 'Sestrojte obraz B′ bodu B v osové souměrnosti s osou o: veďte bodem B kolmici k přímce o (pata P) a vzdálenost |BP| naneste kružítkem za bod P.',
        points: ['sol-p', 'sol-b2'],
        shapes: ['sol-kolmice', 'sol-arc-b2'],
      },
      {
        text: 'Bod B′ leží na rameni AC. Narýsujte polopřímku AB′.',
        shapes: ['sol-ab2'],
      },
      {
        text: 'Polopřímka AB′ protne kružnici k ve dvou bodech — to jsou vrcholy C₁ a C₂. Označte je.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Kontrola: přímka o půlí úhel BAC₁ i BAC₂. Úloha má dvě řešení.',
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

/** Vlastní test B7, úloha 10: obdélník ABCD, střed S na přímce p — S = osa AB ∩ p, C a D obrazy A a B podle S. */
function rectangleCenterOnLineSolution(): AssignmentModelSolution {
  const g = given('e4bd0630-04f3-48cf-9a7f-591dbb7c927e');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const M = mid(A, B);
  const n = perp(sub(B, A));
  const S = lineLine(M, n, p.a, p.d);
  const C = add(S, sub(S, A));
  const D = add(S, sub(S, B));
  if (dist(S, { x: 315, y: 265 }) > 0.6 || dist(C, { x: 440, y: 165 }) > 0.6 || dist(D, { x: 190, y: 165 }) > 0.6) {
    throw new Error('Body S, C, D nesedí s generátorem');
  }

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-o1', add(M, mul(unit(n), 90)));
  s.ref('sol-o2', add(M, mul(unit(n), -300)));
  s.helperLine('sol-osa', 'sol-o1', 'sol-o2', 'o');
  s.point('sol-s', S, 'S');
  s.ref('sol-ce', add(C, mul(unit(sub(C, A)), 35)));
  s.ref('sol-de', add(D, mul(unit(sub(D, B)), 35)));
  s.helperLine('sol-as', 'sol-a', 'sol-ce');
  s.helperLine('sol-bs', 'sol-b', 'sol-de');
  s.ref('sol-c0', C);
  s.ref('sol-d0', D);
  s.arc('sol-arc-c', 'sol-s', 'sol-c0', 0.3);
  s.arc('sol-arc-d', 'sol-s', 'sol-d0', 0.3);
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Obdélník je souměrný podle osy své strany AB a jeho střed S na této ose leží. Střed S leží také na přímce p — je to průsečík osy úsečky AB s přímkou p. Obdélník je navíc středově souměrný podle S: vrchol C je obraz bodu A a vrchol D obraz bodu B. Úloha má jedno řešení.',
    [
      {
        text: 'Sestrojte osu o úsečky AB (dva oblouky stejného poloměru z bodů A a B, spojnice jejich průsečíků).',
        shapes: ['sol-osa'],
      },
      {
        text: 'Průsečík osy o s přímkou p je střed S obdélníku. Označte ho.',
        points: ['sol-s'],
      },
      {
        text: 'Vrchol C je obraz bodu A ve středové souměrnosti se středem S: narýsujte polopřímku AS a za bod S naneste kružítkem vzdálenost |AS|. Stejně na polopřímce BS najdete vrchol D.',
        points: ['sol-c', 'sol-d'],
        shapes: ['sol-as', 'sol-bs', 'sol-arc-c', 'sol-arc-d'],
      },
      {
        text: 'Narýsujte obdélník ABCD a vrcholy označte. Kontrola: |AC| = |BD| a úhlopříčky se v bodě S půlí. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    { figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_K: [string, () => AssignmentModelSolution][] = [
  ['4560a048-0cb0-44bb-977d-ac45711ff4a1', angleBisectorCircleSolution],
  ['e4bd0630-04f3-48cf-9a7f-591dbb7c927e', rectangleCenterOnLineSolution],
];
