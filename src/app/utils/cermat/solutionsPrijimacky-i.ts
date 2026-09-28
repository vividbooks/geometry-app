/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík I — vlastní test B5 (viz dataPrijimacky-i.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, mid, mul, perp, sub, unit } from './board';

/** Obraz bodu `p` v osové souměrnosti s osou bodem `a` ve směru `d`. */
const reflect = (p: { x: number; y: number }, a: { x: number; y: number }, d: { x: number; y: number }) => {
  const f = foot(p, a, d);
  return add(f, sub(f, p));
};

/** Vlastní test B5, úloha 9: osa o bodem M, obraz A′ na přímce p — A′ ∈ k(M; |MA|) ∩ p, dvě řešení. */
function axisThroughPointSolution(): AssignmentModelSolution {
  const g = given('76b5bc23-ee12-4efd-97b5-c037a1ed04e0');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const p = g.line('p');
  const [P1, P2] = lineCircle(p.a, p.d, M, dist(M, A)).sort((u, v) => u.x - v.x);
  if (!P1 || !P2) throw new Error('Kružnice k(M; |MA|) má protnout přímku p ve dvou bodech');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M, 'M');
  s.circle('sol-k', 'sol-m', 'sol-a');
  s.point('sol-a1', P1, 'A′₁');
  s.point('sol-a2', P2, 'A′₂');

  // Osy úseček AA′₁ a AA′₂ procházejí bodem M; konce čar volené tak, aby popisek padl do rámečku.
  const axes = [P1, P2].map((P, i) => {
    const d = unit(perp(sub(P, A)));
    const up = d.y < 0 ? d : mul(d, -1); // směr nahoru (y px klesá)
    const Mi = mid(A, P);
    if (dist(foot(M, Mi, up), M) > 0.5) throw new Error('Osa úsečky AA′ má procházet bodem M');
    const r = 0.8 * dist(A, P);
    const h = Math.sqrt(r * r - (dist(A, P) / 2) ** 2);
    const Q1 = add(Mi, mul(up, h));
    const Q2 = add(Mi, mul(up, -h));
    const tDown = i === 0 ? 100 : 93;
    const tUp = i === 0 ? 300 : 190;
    const start = add(M, mul(up, -tDown));
    const end = add(M, mul(up, tUp / 1.1));
    const n = i + 1;
    s.ref(`sol-q${n}a`, Q1);
    s.ref(`sol-q${n}b`, Q2);
    s.arc(`sol-arc${n}a1`, 'sol-a', `sol-q${n}a`, 0.3);
    s.arc(`sol-arc${n}a2`, 'sol-a', `sol-q${n}b`, 0.3);
    s.arc(`sol-arc${n}p1`, `sol-a${n}`, `sol-q${n}a`, 0.3);
    s.arc(`sol-arc${n}p2`, `sol-a${n}`, `sol-q${n}b`, 0.3);
    s.ref(`sol-o${n}s`, start);
    s.ref(`sol-o${n}e`, end);
    s.line(`sol-o${n}`, `sol-o${n}s`, `sol-o${n}e`, `o${n === 1 ? '₁' : '₂'}`);
    const F = foot(B, M, up);
    const B1 = reflect(B, M, up);
    s.ref(`sol-f${n}`, F);
    s.helperLine(`sol-kolmice${n}`, 'sol-b', `sol-f${n}`);
    s.arc(`sol-arc-b${n}`, `sol-f${n}`, `sol-b${n}0`, 0.35);
    s.ref(`sol-b${n}0`, B1);
    s.point(`sol-b${n}`, B1, `B′${n === 1 ? '₁' : '₂'}`);
    s.segment(`sol-ab${n}`, `sol-a${n}`, `sol-b${n}`);
    if (Math.abs(dist(B1, P) - dist(A, B)) > 0.5) throw new Error('|A′B′| má být |AB|');
    return n;
  });
  if (axes.length !== 2) throw new Error('Mají být dvě osy');

  return cumulative(
    s,
    'Bod M leží na ose o, proto je stejně daleko od bodu A jako od jeho obrazu A′: |MA′| = |MA|. Bod A′ tedy leží na kružnici k(M; |MA|) a zároveň na přímce p. Kružnice protne přímku p ve dvou bodech A′₁ a A′₂. Osa o je osou úsečky AA′ a prochází bodem M. Obraz B′ bodu B sestrojíme kolmicí k ose a nanesením vzdálenosti bodu B od osy na druhou stranu. Úloha má dvě řešení.',
    [
      {
        text: 'Bod M leží na ose o, obraz A′ je proto od bodu M stejně daleko jako bod A. Narýsujte kružnici k se středem M a poloměrem |MA|.',
        shapes: ['sol-k'],
      },
      {
        text: 'Bod A′ leží na kružnici k i na přímce p. Kružnice protne přímku p ve dvou bodech — označte je A′₁ a A′₂.',
        points: ['sol-a1', 'sol-a2'],
      },
      {
        text: 'Osa souměrnosti, která zobrazí A na A′₁, je osa úsečky AA′₁. Sestrojte ji oblouky z bodů A a A′₁ a označte o₁ — prochází bodem M. Stejně sestrojte osu o₂ úsečky AA′₂.',
        shapes: ['sol-arc1a1', 'sol-arc1a2', 'sol-arc1p1', 'sol-arc1p2', 'sol-o1', 'sol-arc2a1', 'sol-arc2a2', 'sol-arc2p1', 'sol-arc2p2', 'sol-o2'],
      },
      {
        text: 'Obraz bodu B podle osy o₁: veďte bodem B kolmici k ose o₁ a vzdálenost bodu B od osy naneste kružítkem na druhou stranu. Vznikne bod B′₁. Stejně podle osy o₂ sestrojte bod B′₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-kolmice1', 'sol-arc-b1', 'sol-kolmice2', 'sol-arc-b2'],
      },
      {
        text: 'Narýsujte úsečky A′₁B′₁ a A′₂B′₂ a krajní body označte. Kontrola: |A′B′| = |AB|. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-ab2'],
      },
    ],
    {
      figures: [
        { name: 'úsečka A′₁B′₁', vertices: ['sol-a1', 'sol-b1'] },
        { name: 'úsečka A′₂B′₂', vertices: ['sol-a2', 'sol-b2'] },
      ],
    },
  );
}

/** Vlastní test B5, úloha 10: lichoběžník ABCD ze středu S ramene BC — obraz A′ bodu A leží na přímce DC. */
function trapezoidFromLegMidpointSolution(): AssignmentModelSolution {
  const g = given('18a46298-7db2-48e7-8fa4-7b6d1da090f6');
  const A = g.point('a');
  const D = g.point('d');
  const S = g.point('s');
  const A1 = add(S, sub(S, A));
  const u = unit(sub(A1, D));
  const C = add(D, mul(u, 150)); // |CD| = 3 cm
  const B = add(S, sub(S, C));
  if (Math.abs((B.y - A.y) * u.x - (B.x - A.x) * u.y) > 0.5) throw new Error('AB má být rovnoběžná s CD');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-d', D, 'D');
  s.ref('sol-s', S, 'S');
  s.ref('sol-a1e', add(A1, mul(unit(sub(A1, A)), 40)));
  s.helperLine('sol-as', 'sol-a', 'sol-a1e');
  s.ref('sol-a10', A1);
  s.arc('sol-arc-a1', 'sol-s', 'sol-a10', 0.25);
  s.point('sol-a1', A1, 'A′');
  s.ref('sol-de', add(A1, mul(u, 40)));
  s.helperLine('sol-dc', 'sol-d', 'sol-de');
  s.ref('sol-c0', C);
  s.arc('sol-arc-c', 'sol-d', 'sol-c0', 0.35);
  s.point('sol-c', C, 'C');
  s.ref('sol-be', add(B, mul(unit(sub(B, C)), 40)));
  s.helperLine('sol-cs', 'sol-c', 'sol-be');
  s.ref('sol-b0', B);
  s.arc('sol-arc-b', 'sol-s', 'sol-b0', 0.3);
  s.point('sol-b', B, 'B');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Středová souměrnost se středem S zobrazí vrchol B na vrchol C a přímku AB na rovnoběžnou přímku, na které leží základna CD. Obraz A′ bodu A proto leží na přímce DC. Na polopřímce DA′ naneseme od D délku 3 cm a dostaneme vrchol C; vrchol B je obrazem bodu C podle středu S. Úloha má jedno řešení.',
    [
      {
        text: 'Bod S je střed ramene BC, středová souměrnost se středem S proto zobrazí B na C a přímku AB na přímku, na které leží základna CD. Sestrojte obraz A′ bodu A: veďte přímku AS a za bodem S naneste vzdálenost |AS|.',
        points: ['sol-a1'],
        shapes: ['sol-as', 'sol-arc-a1'],
      },
      {
        text: 'Obraz A′ leží na přímce DC. Narýsujte polopřímku DA′.',
        shapes: ['sol-dc'],
      },
      {
        text: 'Základna CD měří 3 cm: naneste na polopřímku DA′ od bodu D kružítkem 3 cm. Vznikne vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Vrchol B je obrazem bodu C podle středu S: veďte přímku CS a za bodem S naneste vzdálenost |CS|.',
        points: ['sol-b'],
        shapes: ['sol-cs', 'sol-arc-b'],
      },
      {
        text: 'Narýsujte lichoběžník ABCD a vrcholy B, C označte. Kontrola: AB ∥ CD. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    { figures: [{ name: 'lichoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_I: [string, () => AssignmentModelSolution][] = [
  ['76b5bc23-ee12-4efd-97b5-c037a1ed04e0', axisThroughPointSolution],
  ['18a46298-7db2-48e7-8fa4-7b6d1da090f6', trapezoidFromLegMidpointSolution],
];
