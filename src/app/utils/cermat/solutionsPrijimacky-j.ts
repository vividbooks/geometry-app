/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík J — vlastní test B6 (viz dataPrijimacky-j.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, mid, mul, sub, unit } from './board';

/** Vlastní test B6, úloha 9: rovnoběžníky ze tří vrcholů — čtvrtý vrchol je obraz podle středu úhlopříčky. */
function parallelogramsFromThreePointsSolution(): AssignmentModelSolution {
  const g = given('8682943e-b3ac-457a-89b9-fe05aa306ee2');
  const K = g.point('k');
  const L = g.point('l');
  const M = g.point('m');
  // [úhlopříčka, třetí bod, index]
  const cases: Array<{ p: string; q: string; r: string; P: typeof K; Q: typeof K; R: typeof K; i: number }> = [
    { p: 'k', q: 'l', r: 'm', P: K, Q: L, R: M, i: 1 },
    { p: 'k', q: 'm', r: 'l', P: K, Q: M, R: L, i: 2 },
    { p: 'l', q: 'm', r: 'k', P: L, Q: M, R: K, i: 3 },
  ];
  const s = new Board();
  s.ref('sol-k', K, 'K');
  s.ref('sol-l', L, 'L');
  s.ref('sol-m', M, 'M');
  const idx = ['', '₁', '₂', '₃'];
  const N: Record<number, typeof K> = {};
  for (const c of cases) {
    const S = mid(c.P, c.Q);
    const Nn = add(S, sub(S, c.R));
    N[c.i] = Nn;
    s.segment(`sol-d${c.i}`, `sol-${c.p}`, `sol-${c.q}`, true);
    s.point(`sol-s${c.i}`, S, `S${idx[c.i]}`);
    s.ref(`sol-e${c.i}`, add(Nn, mul(unit(sub(Nn, c.R)), 35)));
    s.helperLine(`sol-h${c.i}`, `sol-${c.r}`, `sol-e${c.i}`);
    s.ref(`sol-n${c.i}0`, Nn);
    s.arc(`sol-arc${c.i}`, `sol-s${c.i}`, `sol-n${c.i}0`, 0.3);
    s.point(`sol-n${c.i}`, Nn, `N${idx[c.i]}`);
    // Rovnoběžník: P – R – Q – N
    s.segment(`sol-p${c.i}a`, `sol-${c.p}`, `sol-${c.r}`);
    s.segment(`sol-p${c.i}b`, `sol-${c.r}`, `sol-${c.q}`);
    s.segment(`sol-p${c.i}c`, `sol-${c.q}`, `sol-n${c.i}`);
    s.segment(`sol-p${c.i}d`, `sol-n${c.i}`, `sol-${c.p}`);
  }
  if (dist(N[1]!, { x: 365, y: 440 }) > 0.5 || dist(N[2]!, { x: 215, y: 190 }) > 0.5 || dist(N[3]!, { x: 515, y: 240 }) > 0.5) {
    throw new Error('Čtvrté vrcholy nesedí s generátorem');
  }
  const step = (i: number, diag: string, third: string) => ({
    text: `Úhlopříčkou je ${diag}. Najděte její střed S${idx[i]} a sestrojte obraz bodu ${third} ve středové souměrnosti se středem S${idx[i]}: veďte přímku ${third}S${idx[i]} a za bodem S${idx[i]} naneste vzdálenost |${third}S${idx[i]}|. Vznikne vrchol N${idx[i]}; rovnoběžník narýsujte.`,
    points: [`sol-s${i}`, `sol-n${i}`],
    shapes: [`sol-d${i}`, `sol-h${i}`, `sol-arc${i}`, `sol-p${i}a`, `sol-p${i}b`, `sol-p${i}c`, `sol-p${i}d`],
  });
  return cumulative(
    s,
    'Úhlopříčky rovnoběžníku se navzájem půlí. Čtvrtý vrchol je proto obrazem třetího daného bodu ve středové souměrnosti se středem ve středu úhlopříčky. Úhlopříčkou může být kterákoli ze spojnic KL, KM a LM, úloha má tedy tři řešení: rovnoběžníky KMLN₁, KLMN₂ a KLN₃M.',
    [
      step(1, 'úsečka KL', 'M'),
      step(2, 'úsečka KM', 'L'),
      step(3, 'úsečka LM', 'K'),
      {
        text: 'Kontrola: body K, L, M jsou středy stran trojúhelníku N₁N₂N₃. Úloha má tři řešení.',
      },
    ],
    {
      figures: [
        { name: 'rovnoběžník KMLN₁', vertices: ['sol-k', 'sol-m', 'sol-l', 'sol-n1'] },
        { name: 'rovnoběžník KLMN₂', vertices: ['sol-k', 'sol-l', 'sol-m', 'sol-n2'] },
        { name: 'rovnoběžník KLN₃M', vertices: ['sol-k', 'sol-l', 'sol-n3', 'sol-m'] },
      ],
      interchangeable: [['sol-n1', 'sol-n2', 'sol-n3']],
    },
  );
}

/** Vlastní test B6, úloha 10: pětiúhelník ABCDE souměrný podle osy o, vrchol D na ose, |CD| = 3 cm. */
function symmetricPentagonSolution(): AssignmentModelSolution {
  const g = given('1a92910c-b5d6-4e4c-8018-c26ebf461395');
  const A = g.point('a');
  const C = g.point('c');
  const o = g.line('o');
  const P = foot(A, o.a, o.d);
  const Q = foot(C, o.a, o.d);
  const B = add(P, sub(P, A));
  const E = add(Q, sub(Q, C));
  const [D1, D2] = lineCircle(o.a, o.d, C, 150).sort((u, v) => u.y - v.y);
  if (!D1 || !D2) throw new Error('Kružnice k(C; 3 cm) má protnout osu o ve dvou bodech');
  const D = D1; // výš (menší y) — dál od přímky AB než C
  if (dist(D, { x: 365, y: 180 }) > 0.5) throw new Error('Vrchol D nesedí s generátorem');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.ref('sol-be', add(B, mul(unit(sub(B, A)), 35)));
  s.helperLine('sol-ab-h', 'sol-a', 'sol-be');
  s.point('sol-p', P, '', true);
  s.ref('sol-b0', B);
  s.arc('sol-arc-b', 'sol-p', 'sol-b0', 0.25);
  s.point('sol-b', B, 'B');
  s.ref('sol-ee', add(E, mul(unit(sub(E, C)), 35)));
  s.helperLine('sol-ce-h', 'sol-c', 'sol-ee');
  s.point('sol-q', Q, '', true);
  s.ref('sol-e0', E);
  s.arc('sol-arc-e', 'sol-q', 'sol-e0', 0.25);
  s.point('sol-e', E, 'E');
  s.ref('sol-d0', D);
  s.ref('sol-d20', D2);
  s.arc('sol-arc-d', 'sol-c', 'sol-d0', 0.35);
  s.arc('sol-arc-d2', 'sol-c', 'sol-d20', 0.35);
  s.point('sol-d', D, 'D');
  s.segment('sol-s1', 'sol-a', 'sol-b');
  s.segment('sol-s2', 'sol-b', 'sol-c');
  s.segment('sol-s3', 'sol-c', 'sol-d');
  s.segment('sol-s4', 'sol-d', 'sol-e');
  s.segment('sol-s5', 'sol-e', 'sol-a');

  return cumulative(
    s,
    'Osová souměrnost s osou o zobrazí pětiúhelník sám na sebe. Vrchol D leží na ose, vrchol B je obrazem bodu A a vrchol E obrazem bodu C. Vrchol D leží na ose o a na kružnici se středem C a poloměrem 3 cm; ze dvou průsečíků vyhovuje ten, který je od přímky AB dál než C. Úloha má jedno řešení.',
    [
      {
        text: 'Vrchol B je obrazem bodu A v osové souměrnosti s osou o: veďte bodem A kolmici k ose o a vzdálenost bodu A od osy naneste kružítkem na druhou stranu.',
        points: ['sol-b'],
        shapes: ['sol-ab-h', 'sol-arc-b'],
      },
      {
        text: 'Stejně sestrojte vrchol E jako obraz bodu C.',
        points: ['sol-e'],
        shapes: ['sol-ce-h', 'sol-arc-e'],
      },
      {
        text: 'Vrchol D leží na ose o a má od C vzdálenost 3 cm. Kružítkem s poloměrem 3 cm a středem C protněte osu o — vzniknou dva body. Vrchol D je ten, který je od přímky AB dál než C (horní průsečík).',
        points: ['sol-d'],
        shapes: ['sol-arc-d', 'sol-arc-d2'],
      },
      {
        text: 'Narýsujte pětiúhelník ABCDE a vrcholy B, D, E označte. Kontrola: |DE| = |CD| = 3 cm, |AE| = |BC|. Úloha má jedno řešení.',
        shapes: ['sol-s1', 'sol-s2', 'sol-s3', 'sol-s4', 'sol-s5'],
      },
    ],
    { figures: [{ name: 'pětiúhelník ABCDE', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d', 'sol-e'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_J: [string, () => AssignmentModelSolution][] = [
  ['8682943e-b3ac-457a-89b9-fe05aa306ee2', parallelogramsFromThreePointsSolution],
  ['1a92910c-b5d6-4e4c-8018-c26ebf461395', symmetricPentagonSolution],
];
