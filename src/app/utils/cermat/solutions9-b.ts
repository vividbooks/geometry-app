/** Vzorová řešení a kontrola úkolů 9. ročníku ve stylu CERMAT, balík B (data v `data9-b.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Strana přímky AB, na které leží bod P (znaménko vektorového součinu). */
const side = (a: V, b: V, p: V) => Math.sign((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x));

/** Rovnostranný trojúhelník ABC vepsaný do kružnice k(S), A na k. */
function equilateralInCircleSolution(): AssignmentModelSolution {
  const g = given('03923a22-64e3-4d41-b1e1-d613e193469a');
  const S = g.point('s');
  const A = g.point('a');
  const A2 = sub(mul(S, 2), A);
  const B = rotate(A, S, (2 * Math.PI) / 3);
  const C = rotate(A, S, (-2 * Math.PI) / 3);

  const s = new Board();
  s.ref('sol-s', S);
  s.ref('sol-a', A, 'A');
  s.point('sol-a2', A2, 'A′');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-as', 'sol-a', 'sol-s');
  s.arc('sol-arc-b', 'sol-a2', 'sol-b', 0.5);
  s.arc('sol-arc-c', 'sol-a2', 'sol-c', 0.5);
  s.segment('sol-sb-thin', 'sol-s', 'sol-b', true);
  s.segment('sol-sc-thin', 'sol-s', 'sol-c', true);
  s.segment('sol-a2b-thin', 'sol-a2', 'sol-b', true);
  s.segment('sol-a2c-thin', 'sol-a2', 'sol-c', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Vrcholy rovnostranného trojúhelníku dělí kružnici k na tři shodné oblouky, úhly ASB a ASC mají velikost 120°. Bod A′ naproti bodu A leží na přímce AS; kružnice se středem A′ a poloměrem |SA| protne k ve vrcholech B a C, protože trojúhelníky SA′B a SA′C jsou rovnostranné.',
    [
      {
        text: 'Vrcholy B a C leží na kružnici k a úhly ASB a ASC mají velikost 120° (vrcholy rozdělí kružnici na tři stejné oblouky). Sestrojte přímku AS. Její druhý průsečík s kružnicí k označte A′ — je to bod naproti bodu A.',
        points: ['sol-a2'],
        shapes: ['sol-as'],
      },
      {
        text: 'Sestrojte kružnici se středem A′ a poloměrem |SA| (stačí dva oblouky). Protne kružnici k ve dvou bodech — to jsou vrcholy B a C.',
        points: ['sol-b', 'sol-c'],
        shapes: ['sol-arc-b', 'sol-arc-c'],
      },
      {
        text: 'Proč to platí: |SB| = |SA′| = |A′B| = |SA|, trojúhelník SA′B je rovnostranný a úhel A′SB má 60°. Úhel ASB je proto 180° − 60° = 120°. Stejně je to s vrcholem C.',
        shapes: ['sol-sb-thin', 'sol-a2b-thin', 'sol-sc-thin', 'sol-a2c-thin'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Úloha má jedno řešení (vrcholy B a C lze pojmenovat obráceně).',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      // Prohozením B ↔ C vznikne tentýž trojúhelník.
      interchangeable: [['sol-b', 'sol-c']],
    },
  );
}

/** Obdélník ABCD z úhlopříčky AC a strany |AB| = 3 cm: Thaletova kružnice nad AC ∩ kružnice (A, 3 cm). */
function rectangleDiagonalSideSolution(): AssignmentModelSolution {
  const g = given('f56c3372-661c-4d90-ad14-bfdc982778cb');
  const A = g.point('a');
  const C = g.point('c');
  const S = mid(A, C);
  const ab = 150; // 3 cm
  const u = mul(unit(sub(C, A)), ab);
  const ang = Math.acos(ab / dist(A, C));
  // B₁ pod úhlopříčkou AC (blíž spodnímu okraji), B₂ nad ní.
  const [B1, B2] = [add(A, rotate(u, { x: 0, y: 0 }, ang)), add(A, rotate(u, { x: 0, y: 0 }, -ang))].sort(
    (p, q) => q.y - p.y,
  ) as [V, V];
  const D1 = sub(mul(S, 2), B1);
  const D2 = sub(mul(S, 2), B2);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.point('sol-s', S, 'S');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.arc('sol-arc-b1', 'sol-a', 'sol-b1', 0.6);
  s.arc('sol-arc-b2', 'sol-a', 'sol-b2', 0.6);
  s.segment('sol-b1d1-thin', 'sol-b1', 'sol-d1', true);
  s.segment('sol-b2d2-thin', 'sol-b2', 'sol-d2', true);
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
    'Úhel ABC je pravý, vrchol B proto leží na Thaletově kružnici nad úhlopříčkou AC a zároveň na kružnici se středem A a poloměrem 3 cm. Kružnice se protínají ve dvou bodech. Vrchol D je obraz vrcholu B ve středové souměrnosti se středem S úhlopříčky. Úloha má dvě řešení.',
    [
      {
        text: 'V obdélníku je úhel ABC pravý, vrchol B proto leží na Thaletově kružnici nad průměrem AC. Sestrojte střed S úsečky AC a kružnici k se středem S procházející body A a C.',
        points: ['sol-s'],
        shapes: ['sol-k'],
      },
      {
        text: 'Strana AB má délku 3 cm, vrchol B leží na kružnici se středem A a poloměrem 3 cm. Ta protne kružnici k ve dvou bodech — označte je B₁ a B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-arc-b1', 'sol-arc-b2'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé a půlí se v bodě S, úhlopříčka BD je tedy také průměr kružnice k. Vrchol D je obraz bodu B ve středové souměrnosti se středem S: přímka B₁S protne kružnici k v bodě D₁, přímka B₂S v bodě D₂.',
        points: ['sol-d1', 'sol-d2'],
        shapes: ['sol-b1d1-thin', 'sol-b2d2-thin'],
      },
      {
        text: 'Narýsujte obdélníky AB₁CD₁ a AB₂CD₂. Úloha má dvě řešení, jsou souměrná podle přímky AC.',
        shapes: ['sol-ab1', 'sol-b1c', 'sol-cd1', 'sol-d1a', 'sol-ab2', 'sol-b2c', 'sol-cd2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'obdélník AB₁CD₁', vertices: ['sol-a', 'sol-b1', 'sol-c', 'sol-d1'] },
        { name: 'obdélník AB₂CD₂', vertices: ['sol-a', 'sol-b2', 'sol-c', 'sol-d2'] },
      ],
    },
  );
}

/** Kosočtverec ABCD se stranou 4 cm, B na polopřímce AX, úhlopříčka AC na polopřímce AM. */
function rhombusOnRaySolution(): AssignmentModelSolution {
  const g = given('0619e1ad-eb62-489f-af79-67576a3ad352');
  const A = g.point('a');
  const X = g.point('x');
  const M = g.point('m');
  const a = 200; // 4 cm
  const B = add(A, mul(unit(sub(X, A)), a));
  const C = lineCircle(A, sub(M, A), B, a).sort((p, q) => dist(q, A) - dist(p, A))[0]!;
  const D = sub(mul(foot(B, A, sub(M, A)), 2), B);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-x', X);
  s.ref('sol-m', M);
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.arc('sol-arc-b', 'sol-a', 'sol-b', 0.5);
  s.ref('sol-far', add(C, mul(unit(sub(C, A)), 80)));
  s.segment('sol-am', 'sol-a', 'sol-far', true);
  s.arc('sol-arc-c', 'sol-b', 'sol-c', 0.5);
  s.arc('sol-arc-d1', 'sol-a', 'sol-d', 0.5);
  s.arc('sol-arc-d2', 'sol-c', 'sol-d', 0.5);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Vrchol B leží na polopřímce AX ve vzdálenosti 4 cm od A. Vrchol C leží na polopřímce AM a |BC| = 4 cm, je to tedy druhý průsečík kružnice se středem B a poloměrem 4 cm s polopřímkou AM. Vrchol D je od A i od C vzdálený 4 cm. Úloha má jedno řešení.',
    [
      {
        text: 'Vrchol B leží na polopřímce AX a strana AB má délku 4 cm. Naneste kružítkem od bodu A na polopřímku AX vzdálenost 4 cm a označte vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-arc-b'],
      },
      {
        text: 'Úhlopříčka AC leží na polopřímce AM. Sestrojte polopřímku AM (za bodem M ji dostatečně prodlužte).',
        shapes: ['sol-am'],
      },
      {
        text: 'Všechny strany kosočtverce mají 4 cm, i strana BC. Kružnice se středem B a poloměrem 4 cm prochází bodem A a polopřímku AM protne ještě v jednom bodě — to je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Vrchol D je od vrcholů A i C vzdálený 4 cm. Oblouky se středy A a C o poloměru 4 cm se protnou v bodě B a v bodě na druhé straně úhlopříčky AC — to je vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-arc-d1', 'sol-arc-d2'],
      },
      {
        text: 'Narýsujte kosočtverec ABCD. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'kosočtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** Rovnoramenný lichoběžník ABCD, C, D na p ∥ AB, ramena 3 cm: kratší i delší horní základna. */
function isoscelesTrapezoidLegsSolution(): AssignmentModelSolution {
  const g = given('bb89bf4c-dbe7-4a0a-ba5f-0946a98d72b7');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const leg = 150; // 3 cm
  const byDist = (from: V) => (x: V, y: V) => dist(x, from) - dist(y, from);
  const [D1, D2] = lineCircle(p.a, p.d, A, leg).sort(byDist(B)) as [V, V];
  const [C1, C2] = lineCircle(p.a, p.d, B, leg).sort(byDist(A)) as [V, V];
  const O = mid(A, B);
  const n = unit(perp(sub(B, A)));
  // Osa míří k přímce p; popisek o (uprostřed čáry) leží mezi AB a p.
  const toP = dist(add(O, n), foot(add(O, n), p.a, p.d)) < dist(O, foot(O, p.a, p.d)) ? n : mul(n, -1);
  const O1 = add(O, mul(toP, 170));
  const O2 = sub(O, mul(toP, 40));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-o1', O1);
  s.ref('sol-o2', O2);
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.arc('sol-arc-d1', 'sol-a', 'sol-d1', 0.45);
  s.arc('sol-arc-d2', 'sol-a', 'sol-d2', 0.45);
  s.arc('sol-arc-c1', 'sol-b', 'sol-c1', 0.45);
  s.arc('sol-arc-c2', 'sol-b', 'sol-c2', 0.45);
  s.helperLine('sol-o', 'sol-o1', 'sol-o2', 'o');
  s.segment('sol-ab1', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1d1', 'sol-c1', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2d2', 'sol-c2', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'Vrchol D leží na přímce p a na kružnici se středem A a poloměrem 3 cm, vrchol C na přímce p a na kružnici se středem B a poloměrem 3 cm. Obě kružnice protnou p ve dvou bodech. Rovnoramenný lichoběžník je souměrný podle osy základny AB, proto se k sobě hodí jen body souměrné podle této osy: vznikne lichoběžník s kratší a lichoběžník s delší základnou CD. Úloha má dvě řešení.',
    [
      {
        text: 'Rameno AD má délku 3 cm, vrchol D proto leží na kružnici se středem A a poloměrem 3 cm. Ta protne přímku p ve dvou bodech — označte je D₁ a D₂.',
        points: ['sol-d1', 'sol-d2'],
        shapes: ['sol-arc-d1', 'sol-arc-d2'],
      },
      {
        text: 'Rameno BC má také 3 cm, vrchol C leží na kružnici se středem B a poloměrem 3 cm. Ta protne přímku p v bodech C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Rovnoramenný lichoběžník je souměrný podle osy o základny AB, vrcholy C a D jsou proto souměrné podle osy o. Sestrojte osu o úsečky AB: C₁ patří k D₁ a C₂ k D₂. (Dvojice D₁, C₂ nebo D₂, C₁ by dala rovnoběžník, ne lichoběžník.)',
        shapes: ['sol-o'],
      },
      {
        text: 'Narýsujte lichoběžníky ABC₁D₁ (kratší základna C₁D₁) a ABC₂D₂ (delší základna C₂D₂). Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-bc1', 'sol-c1d1', 'sol-d1a', 'sol-bc2', 'sol-c2d2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'lichoběžník ABC₁D₁', vertices: ['sol-a', 'sol-b', 'sol-c1', 'sol-d1'] },
        { name: 'lichoběžník ABC₂D₂', vertices: ['sol-a', 'sol-b', 'sol-c2', 'sol-d2'] },
      ],
    },
  );
}

/** Trojúhelník ABC s úhly 60° při A a 45° při B, C v polorovině ABM. */
function triangleTwoAnglesSolution(): AssignmentModelSolution {
  const g = given('4ba5b152-9dc2-42fc-8fb1-1ce81e1a6709');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const sM = side(A, B, M);
  // Vrchol E rovnostranného trojúhelníku ABE v polorovině ABM.
  const E = [rotate(B, A, Math.PI / 3), rotate(B, A, -Math.PI / 3)].find(q => side(A, B, q) === sM)!;
  const r = 125; // 2,5 cm — poloměr oblouků pro osu pravého úhlu
  const nRaw = unit(perp(sub(B, A)));
  const n = side(A, B, add(B, nRaw)) === sM ? nRaw : mul(nRaw, -1);
  const P = add(B, mul(unit(sub(A, B)), r));
  const Q = add(B, mul(n, r));
  const K = add(B, mul(n, 330)); // konec kolmice v bodě B
  const Rr = sub(add(P, Q), B);
  const C = lineLine(A, sub(E, A), B, sub(Rr, B));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-k', K);
  s.ref('sol-mid', add(B, mul(unit(sub(Rr, B)), r)));
  s.point('sol-e', E, 'E');
  s.point('sol-p', P, 'P');
  s.point('sol-q', Q, 'Q');
  s.point('sol-r', Rr, 'R');
  s.point('sol-c', C, 'C');
  s.arc('sol-arc-e1', 'sol-a', 'sol-e', 0.35);
  s.arc('sol-arc-e2', 'sol-b', 'sol-e', 0.35);
  s.helperLine('sol-ae', 'sol-a', 'sol-e');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-k');
  s.arc('sol-arc-pq', 'sol-b', 'sol-mid', Math.PI / 2 + 0.3);
  s.arc('sol-arc-rp', 'sol-p', 'sol-r', 0.5);
  s.arc('sol-arc-rq', 'sol-q', 'sol-r', 0.5);
  s.helperLine('sol-br', 'sol-b', 'sol-r');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Úhel 60° při vrcholu A sestrojíte pomocí rovnostranného trojúhelníku ABE nad stranou AB, úhel 45° při vrcholu B jako osu pravého úhlu mezi přímkou BA a kolmicí k AB v bodě B. Obojí v polorovině ABM. Vrchol C je průsečík ramen obou úhlů, úloha má jedno řešení.',
    [
      {
        text: 'Úhel 60° je úhel rovnostranného trojúhelníku. Sestrojte nad stranou AB v polorovině ABM rovnostranný trojúhelník ABE: oblouky se středy A a B o poloměru |AB| se protnou v bodě E. Úhel BAE má 60°, vrchol C proto leží na přímce AE.',
        points: ['sol-e'],
        shapes: ['sol-arc-e1', 'sol-arc-e2', 'sol-ae'],
      },
      {
        text: 'Úhel 45° je polovina pravého úhlu. Sestrojte kolmici k přímce AB procházející bodem B.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Sestrojte osu pravého úhlu v polorovině ABM: oblouk se středem B protne úsečku BA v bodě P a kolmici v bodě Q. Oblouky se středy P a Q o stejném poloměru se protnou v bodě R. Přímka BR je osa pravého úhlu, úhel ABR má 45°.',
        points: ['sol-p', 'sol-q', 'sol-r'],
        shapes: ['sol-arc-pq', 'sol-arc-rp', 'sol-arc-rq', 'sol-br'],
      },
      {
        text: 'Vrchol C leží na přímce AE i na přímce BR. Jejich průsečík v polorovině ABM je vrchol C.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
    },
  );
}

export const GRADE9_STYLE_SOLUTIONS_B: [string, () => AssignmentModelSolution][] = [
  ['03923a22-64e3-4d41-b1e1-d613e193469a', equilateralInCircleSolution],
  ['f56c3372-661c-4d90-ad14-bfdc982778cb', rectangleDiagonalSideSolution],
  ['0619e1ad-eb62-489f-af79-67576a3ad352', rhombusOnRaySolution],
  ['bb89bf4c-dbe7-4a0a-ba5f-0946a98d72b7', isoscelesTrapezoidLegsSolution],
  ['4ba5b152-9dc2-42fc-8fb1-1ce81e1a6709', triangleTwoAnglesSolution],
];
