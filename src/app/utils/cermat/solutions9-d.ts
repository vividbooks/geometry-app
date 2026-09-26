/** Vzorová řešení a kontrola úkolů 9. ročníku ve stylu CERMAT, balík D (data v `data9-d.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Průsečíky kružnic (c1, r1) a (c2, r2). */
function circleCircle(c1: V, r1: number, c2: V, r2: number): [V, V] {
  const d = dist(c1, c2);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const u = unit(sub(c2, c1));
  const f = add(c1, mul(u, a));
  const n = perp(u);
  return [add(f, mul(n, h)), sub(f, mul(n, h))];
}

/** Obdélník ABCD z úhlopříčky AC, úhlopříčky svírají 60° — dvě řešení. */
function rectangleDiagonalAngleSolution(): AssignmentModelSolution {
  const g = given('0333c78c-011e-4dc9-bf88-4280ec182d1d');
  const A = g.point('a');
  const C = g.point('c');
  const S = mid(A, C);
  const B1 = rotate(A, S, Math.PI / 3);
  const D1 = rotate(C, S, Math.PI / 3);
  const B2 = rotate(C, S, -Math.PI / 3);
  const D2 = rotate(A, S, -Math.PI / 3);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.point('sol-s', S, 'S');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-d2', D2, 'D₂');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-b2', B2, 'B₂');
  s.segment('sol-ac', 'sol-a', 'sol-c', true);
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.arc('sol-arc-b1', 'sol-a', 'sol-b1');
  s.arc('sol-arc-d2', 'sol-a', 'sol-d2');
  s.helperLine('sol-bd1', 'sol-b1', 'sol-d1');
  s.helperLine('sol-bd2', 'sol-d2', 'sol-b2');
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-cd1', 'sol-c', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');
  s.segment('sol-cd2', 'sol-c', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky obdélníku jsou stejně dlouhé a půlí se, všechny vrcholy proto leží na kružnici k se středem S uprostřed AC a poloměrem |SA|. Úhel 60° při středu S dává rovnostranný trojúhelník: oblouk se středem A a poloměrem |SA| protne k ve vrcholech B₁ a D₂, druhé konce úhlopříček jsou D₁ a B₂. Úloha má dvě řešení.',
    [
      {
        text: 'Úhlopříčky obdélníku se navzájem půlí. Sestrojte střed S úsečky AC (například pomocí osy úsečky AC) — v něm se úhlopříčky protínají.',
        points: ['sol-s'],
        shapes: ['sol-ac'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé, takže |SA| = |SB| = |SC| = |SD|. Všechny vrcholy leží na kružnici k se středem S a poloměrem |SA|. Sestrojte ji.',
        shapes: ['sol-k'],
      },
      {
        text: 'Úhel 60° sestrojíte pomocí rovnostranného trojúhelníku. Oblouk se středem A a poloměrem |SA| protne kružnici k v bodech B₁ a D₂. Trojúhelníky ASB₁ a ASD₂ jsou rovnostranné, proto úhly ASB₁ i ASD₂ mají velikost 60°.',
        points: ['sol-b1', 'sol-d2'],
        shapes: ['sol-arc-b1', 'sol-arc-d2'],
      },
      {
        text: 'Úhlopříčka BD prochází středem S. Přímka B₁S protne kružnici k podruhé ve vrcholu D₁, přímka D₂S ve vrcholu B₂.',
        points: ['sol-d1', 'sol-b2'],
        shapes: ['sol-bd1', 'sol-bd2'],
      },
      {
        text: 'Narýsujte obdélníky AB₁CD₁ a AB₂CD₂. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-b1c', 'sol-cd1', 'sol-d1a', 'sol-ab2', 'sol-b2c', 'sol-cd2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'obdélník AB₁CD₁', vertices: ['sol-a', 'sol-b1', 'sol-c', 'sol-d1'] },
        { name: 'obdélník AB₂CD₂', vertices: ['sol-a', 'sol-b2', 'sol-c', 'sol-d2'] },
      ],
      // B a D jsou oba konce druhé úhlopříčky — prohozením vznikne pořád obdélník ABCD.
      interchangeable: [['sol-b1', 'sol-d1'], ['sol-b2', 'sol-d2']],
    },
  );
}

/** Rovnoběžník ABCD se stranou AB, |AD| = 3 cm, úhel DAB = 135°, D v polorovině ABM. */
function parallelogram135Solution(): AssignmentModelSolution {
  const g = given('7ffe484f-5940-4187-9c09-df105565f64a');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const u = unit(sub(B, A));
  let n = perp(u);
  if (dot(n, sub(M, A)) < 0) n = mul(n, -1);
  const arcR = 60; // 1,2 cm
  const P = add(A, mul(n, arcR)); // na kolmici
  const R = sub(A, mul(u, arcR)); // na prodloužení úsečky BA za bod A
  const Q = add(P, sub(R, A));
  const w = unit(sub(Q, A));
  const D = add(A, mul(w, 150)); // 3 cm
  const Cc = add(D, sub(B, A));
  const ext = sub(A, mul(u, 150));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-ext', ext);
  s.ref('sol-p', P);
  s.ref('sol-r', R);
  s.ref('sol-q', Q);
  s.ref('sol-mid', add(A, mul(w, arcR)));
  s.point('sol-d', D, 'D');
  s.point('sol-c', Cc, 'C');
  s.helperLine('sol-ab-line', 'sol-ext', 'sol-b');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-p');
  s.arc('sol-arc-pr', 'sol-a', 'sol-mid', Math.PI / 2 + 0.5);
  s.arc('sol-arc-p', 'sol-p', 'sol-q', 0.6);
  s.arc('sol-arc-r', 'sol-r', 'sol-q', 0.6);
  s.helperLine('sol-osa', 'sol-a', 'sol-q');
  s.arc('sol-arc-d', 'sol-a', 'sol-d');
  s.arc('sol-arc-c1', 'sol-d', 'sol-c');
  s.arc('sol-arc-c2', 'sol-b', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhel 135° složíte z pravého úhlu a jeho poloviny: v bodě A sestrojte kolmici k AB a rozpulte pravý úhel, který svírá s prodloužením úsečky AB za bod A. Na vzniklé polopřímce leží ve vzdálenosti 3 cm od A vrchol D a vrchol C doplníte z rovnosti protějších stran rovnoběžníku.',
    [
      {
        text: 'Úhel 135° vznikne jako 90° + 45°. Prodlužte úsečku AB za bod A a v bodě A sestrojte kolmici k přímce AB. Kolmice svírá s polopřímkou AB úhel 90°.',
        shapes: ['sol-ab-line', 'sol-kolmice'],
      },
      {
        text: 'Rozpulte pravý úhel mezi kolmicí a prodloužením úsečky za bod A: oblouk se středem A protne obě ramena, z obou průsečíků opište oblouky stejného poloměru. Polopřímka z bodu A přes průsečík oblouků je osa tohoto pravého úhlu a svírá s polopřímkou AB úhel 90° + 45° = 135°. Leží na straně bodu M.',
        shapes: ['sol-arc-pr', 'sol-arc-p', 'sol-arc-r', 'sol-osa'],
      },
      {
        text: 'Strana AD má délku 3 cm. Naneste kružítkem 3 cm od bodu A na sestrojenou polopřímku — dostanete vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-arc-d'],
      },
      {
        text: 'Protější strany rovnoběžníku jsou stejně dlouhé: |DC| = |AB| a |BC| = |AD| = 3 cm. Oblouk se středem D a poloměrem |AB| a oblouk se středem B a poloměrem 3 cm se protnou ve vrcholu C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Narýsujte rovnoběžník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'rovnoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** Bod X na přímce p s nejmenším součtem |AX| + |XB| (osová souměrnost bodu B podle p). */
function shortestPathSolution(): AssignmentModelSolution {
  const g = given('35635a11-fddf-4ee6-b3ab-51487ab0fc74');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const F = foot(B, p.a, p.d);
  const B2 = sub(mul(F, 2), B);
  const X = lineLine(A, sub(B2, A), p.a, p.d);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-f', F);
  s.point('sol-b2', B2, 'B′');
  s.point('sol-x', X, 'X');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-f');
  s.arc('sol-arc-b2', 'sol-f', 'sol-b2');
  s.segment('sol-ab2', 'sol-a', 'sol-b2', true);
  s.segment('sol-ax', 'sol-a', 'sol-x');
  s.segment('sol-xb', 'sol-x', 'sol-b');

  return cumulative(
    s,
    'Sestrojte obraz B′ bodu B v osové souměrnosti s osou p. Pro každý bod X přímky p je |XB| = |XB′|, součet |AX| + |XB| je proto nejmenší, když X leží na úsečce AB′. Bod X je průsečík úsečky AB′ s přímkou p.',
    [
      {
        text: 'Sestrojte kolmici k přímce p procházející bodem B.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Na kolmici naneste kružítkem za přímku p stejnou vzdálenost, jakou má bod B od přímky p. Dostanete bod B′ — obraz bodu B v osové souměrnosti s osou p.',
        points: ['sol-b2'],
        shapes: ['sol-arc-b2'],
      },
      {
        text: 'Pro každý bod X přímky p platí |XB| = |XB′|, takže |AX| + |XB| = |AX| + |XB′|. Tento součet je nejmenší, když bod X leží na úsečce AB′ (lomená čára je delší než úsečka). Sestrojte úsečku AB′; její průsečík s přímkou p je hledaný bod X.',
        points: ['sol-x'],
        shapes: ['sol-ab2'],
      },
      {
        text: 'Narýsujte lomenou čáru AXB, tedy úsečky AX a XB.',
        shapes: ['sol-ax', 'sol-xb'],
      },
    ],
    {
      figures: [
        { name: 'úsečka AX', vertices: ['sol-a', 'sol-x'] },
        { name: 'úsečka XB', vertices: ['sol-x', 'sol-b'] },
      ],
    },
  );
}

/** Kružnice l (r = 1,5 cm) přes bod A s vnějším dotykem s kružnicí k (S, 2,5 cm) — dvě řešení. */
function circleTangentExternallySolution(): AssignmentModelSolution {
  const g = given('985e4fcc-953c-4b90-b45d-71ee01fbfdc7');
  const S = g.point('s');
  const A = g.point('a');
  const k = g.circle('k');
  const rl = 75; // 1,5 cm
  const rm = k.r + rl;
  const [O1, O2] = circleCircle(S, rm, A, rl);
  const T1 = add(S, mul(unit(sub(O1, S)), k.r));
  const T2 = add(S, mul(unit(sub(O2, S)), k.r));
  const away = unit(sub(A, S));
  const mRim = sub(S, mul(away, rm));
  const nRim = add(A, mul(away, rl));

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-a', A, 'A');
  s.ref('sol-m-rim', mRim);
  s.ref('sol-n-rim', nRim);
  s.point('sol-o1', O1, 'O₁');
  s.point('sol-o2', O2, 'O₂');
  s.point('sol-t1', T1, 'T₁');
  s.point('sol-t2', T2, 'T₂');
  s.circle('sol-m', 'sol-s', 'sol-m-rim', 'm');
  s.circle('sol-n', 'sol-a', 'sol-n-rim', 'n');
  s.segment('sol-so1', 'sol-s', 'sol-o1', true);
  s.segment('sol-so2', 'sol-s', 'sol-o2', true);
  const l1 = s.circle('sol-l1', 'sol-o1', 'sol-t1', 'l₁');
  const l2 = s.circle('sol-l2', 'sol-o2', 'sol-t2', 'l₂');

  return cumulative(
    s,
    'Kružnice se dotýkají zvenku, když je vzdálenost středů rovna součtu poloměrů, střed O proto leží na kružnici m se středem S a poloměrem 4 cm. Protože kružnice l prochází bodem A, leží její střed také na kružnici n se středem A a poloměrem 1,5 cm. Kružnice m a n se protínají ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Dvě kružnice se dotýkají zvenku, když je vzdálenost jejich středů rovna součtu poloměrů: |SO| = 2,5 cm + 1,5 cm = 4 cm. Střed O proto leží na kružnici m se středem S a poloměrem 4 cm. Sestrojte ji.',
        shapes: ['sol-m'],
      },
      {
        text: 'Kružnice l prochází bodem A a má poloměr 1,5 cm, její střed O je tedy od bodu A vzdálený 1,5 cm. Sestrojte kružnici n se středem A a poloměrem 1,5 cm.',
        shapes: ['sol-n'],
      },
      {
        text: 'Střed O leží na obou kružnicích m a n. Kružnice se protínají ve dvou bodech — označte je O₁ a O₂.',
        points: ['sol-o1', 'sol-o2'],
      },
      {
        text: 'Bod dotyku dvou kružnic leží na spojnici jejich středů. Úsečky SO₁ a SO₂ protnou kružnici k v bodech dotyku T₁ a T₂.',
        points: ['sol-t1', 'sol-t2'],
        shapes: ['sol-so1', 'sol-so2'],
      },
      {
        text: 'Narýsujte kružnice l₁ se středem O₁ a l₂ se středem O₂, obě s poloměrem 1,5 cm. Obě procházejí bodem A a dotýkají se kružnice k zvenku. Úloha má dvě řešení.',
        shapes: [l1, l2],
      },
    ],
    {
      figures: [
        { name: 'střed O₁', vertices: ['sol-o1'] },
        { name: 'střed O₂', vertices: ['sol-o2'] },
      ],
      circles: [
        { name: 'l₁', centerId: 'sol-o1', rimId: 'sol-t1' },
        { name: 'l₂', centerId: 'sol-o2', rimId: 'sol-t2' },
      ],
    },
  );
}

/** Rovnoramenný trojúhelník ABC se základnou BC vepsaný kružnici k, ramena 5 cm. */
function isoscelesInscribedSolution(): AssignmentModelSolution {
  const g = given('da14d317-f0e7-42fb-a4d2-e008cf0ecc3a');
  const S = g.point('s');
  const A = g.point('a');
  const k = g.circle('k');
  const leg = 250; // 5 cm
  const [B, C] = circleCircle(S, k.r, A, leg);
  const far = add(S, mul(unit(sub(S, A)), k.r + 40));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.ref('sol-far', far);
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.arc('sol-arc-b', 'sol-a', 'sol-b', 0.35);
  s.arc('sol-arc-c', 'sol-a', 'sol-c', 0.35);
  s.helperLine('sol-osa', 'sol-a', 'sol-far');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Vrcholy B a C jsou od vrcholu A vzdálené 5 cm (délka ramen) a leží na kružnici k. Oblouk se středem A a poloměrem 5 cm protne kružnici k ve dvou bodech — to jsou vrcholy B, C. Úloha má jedno řešení (písmena B a C lze zaměnit).',
    [
      {
        text: 'Ramena AB a AC mají délku 5 cm, vrcholy B a C jsou proto od bodu A vzdálené 5 cm. Opište kružítkem se středem A a poloměrem 5 cm oblouky přes kružnici k.',
        shapes: ['sol-arc-b', 'sol-arc-c'],
      },
      {
        text: 'Vrcholy B a C leží zároveň na kružnici k. Oblouky protnou kružnici k ve dvou bodech — označte je B a C.',
        points: ['sol-b', 'sol-c'],
      },
      {
        text: 'Pro kontrolu: přímka AS je osou souměrnosti trojúhelníku ABC. Body B a C jsou podle ní souměrné a základna BC je k ní kolmá.',
        shapes: ['sol-osa'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Úloha má jedno řešení (písmena B a C můžete zaměnit).',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      // B a C leží souměrně podle osy AS — prohozením vznikne pořád trojúhelník ABC.
      interchangeable: [['sol-b', 'sol-c']],
    },
  );
}

export const GRADE9_STYLE_SOLUTIONS_D: [string, () => AssignmentModelSolution][] = [
  ['0333c78c-011e-4dc9-bf88-4280ec182d1d', rectangleDiagonalAngleSolution],
  ['7ffe484f-5940-4187-9c09-df105565f64a', parallelogram135Solution],
  ['35635a11-fddf-4ee6-b3ab-51487ab0fc74', shortestPathSolution],
  ['985e4fcc-953c-4b90-b45d-71ee01fbfdc7', circleTangentExternallySolution],
  ['da14d317-f0e7-42fb-a4d2-e008cf0ecc3a', isoscelesInscribedSolution],
];
