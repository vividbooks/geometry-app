/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík J — vlastní test B6 (viz dataPrijimacky-j.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineLine, mid, mul, sub, unit } from './board';

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

/** Vlastní test B6, úloha 10: rovnoramenný trojúhelník ABC, osa o daná, M na rameni BC — B = obraz A, C = BM ∩ o. */
function isoscelesFromAxisSolution(): AssignmentModelSolution {
  const g = given('d4ee7c4c-695c-4b92-9c9c-6d2f406b55ce');
  const A = g.point('a');
  const M = g.point('m');
  const o = g.line('o');
  const P = foot(A, o.a, o.d);
  const B = add(P, sub(P, A));
  const C = lineLine(B, sub(M, B), o.a, o.d);
  if (dist(B, { x: 490, y: 265 }) > 0.6 || dist(C, { x: 210, y: 100 }) > 0.6) throw new Error('Vrcholy B, C nesedí s generátorem');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-m', M, 'M');
  s.ref('sol-be', add(B, mul(unit(sub(B, A)), 35)));
  s.helperLine('sol-kolmice', 'sol-a', 'sol-be');
  s.point('sol-p', P, 'P');
  s.ref('sol-b0', B);
  s.arc('sol-arc-b', 'sol-p', 'sol-b0', 0.3);
  s.point('sol-b', B, 'B');
  s.ref('sol-ce', add(C, mul(unit(sub(C, B)), 35)));
  s.helperLine('sol-bm', 'sol-b', 'sol-ce');
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Osa souměrnosti rovnoramenného trojúhelníku se základnou AB prochází hlavním vrcholem C a je kolmá k základně. Osová souměrnost s osou o proto zobrazí vrchol A na vrchol B. Bod M leží na rameni BC, vrchol C je tedy průsečík přímky BM s osou o. Úloha má jedno řešení.',
    [
      {
        text: 'Vrchol B je obrazem bodu A v osové souměrnosti s osou o: veďte bodem A kolmici k ose o (pata P) a vzdálenost |AP| naneste kružítkem za bod P.',
        points: ['sol-p', 'sol-b'],
        shapes: ['sol-kolmice', 'sol-arc-b'],
      },
      {
        text: 'Bod M leží na rameni BC, vrchol C proto leží na přímce BM. Narýsujte přímku BM.',
        shapes: ['sol-bm'],
      },
      {
        text: 'Vrchol C leží i na ose o: je to průsečík přímky BM s osou o. Označte ho.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC a vrcholy B, C označte. Kontrola: |AC| = |BC|, bod M leží mezi B a C. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    { figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_J: [string, () => AssignmentModelSolution][] = [
  ['8682943e-b3ac-457a-89b9-fe05aa306ee2', parallelogramsFromThreePointsSolution],
  ['d4ee7c4c-695c-4b92-9c9c-6d2f406b55ce', isoscelesFromAxisSolution],
];
