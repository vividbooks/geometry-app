/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík A (viz dataPrijimacky-a.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineLine, mid, mul, perp, sub, unit } from './board';

/** Úhel mezi dvěma směry (rad). */
function angleBetween(a: V, b: V): number {
  return Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
}

/**
 * Průsečíky oblouků kružítka pro osu úsečky XY: bod ve vzdálenosti `h1` od středu úsečky na jednu
 * stranu (ve směru `perp(Y − X)`) a `h2` na druhou. Každá dvojice oblouků má vlastní poloměr.
 */
function axisPoints(X: V, Y: V, h1: number, h2: number): [V, V] {
  const M = mid(X, Y);
  const n = unit(perp(sub(Y, X)));
  return [add(M, mul(n, h1)), sub(M, mul(n, h2))];
}

/** Vlastní test 1, úloha 9: kružnice opsaná trojúhelníku ABC (střed S v průsečíku os stran). */
function circumcircleSolution(): AssignmentModelSolution {
  const g = given('f6383b17-cbf5-452d-8789-2927973cd8bc');
  const A = g.point('a');
  const B = g.point('b');
  const C = g.point('c');
  // perp(B − A) míří dolů (od středu S), perp(C − B) doprava nahoru (také od středu S);
  // oblouky na straně středu S jsou dál, aby se průsečík os nesléval s oblouky.
  const [P1, P2] = axisPoints(A, B, 105, 190);
  const [Q1, Q2] = axisPoints(B, C, 130, 160);
  const S = lineLine(P1, sub(P2, P1), Q1, sub(Q2, Q1));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-c', C, 'C');
  s.ref('sol-p1', P1);
  s.ref('sol-p2', P2);
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.point('sol-s', S, 'S');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.arc('sol-arc-p1a', 'sol-a', 'sol-p1', 0.22);
  s.arc('sol-arc-p1b', 'sol-b', 'sol-p1', 0.22);
  s.arc('sol-arc-p2a', 'sol-a', 'sol-p2', 0.22);
  s.arc('sol-arc-p2b', 'sol-b', 'sol-p2', 0.22);
  s.helperLine('sol-osa-ab', 'sol-p1', 'sol-p2');
  s.arc('sol-arc-q1b', 'sol-b', 'sol-q1', 0.22);
  s.arc('sol-arc-q1c', 'sol-c', 'sol-q1', 0.22);
  s.arc('sol-arc-q2b', 'sol-b', 'sol-q2', 0.22);
  s.arc('sol-arc-q2c', 'sol-c', 'sol-q2', 0.22);
  s.helperLine('sol-osa-bc', 'sol-q1', 'sol-q2');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');

  return cumulative(
    s,
    'Střed S kružnice opsané má od všech tří vrcholů stejnou vzdálenost, leží proto na ose každé strany trojúhelníku ABC. Stačí sestrojit osy dvou stran, například AB a BC, jejich průsečík je střed S. Kružnice k má poloměr |SA| a prochází všemi třemi vrcholy.',
    [
      {
        text: 'Spojte body A, B a C úsečkami — narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
      {
        text: 'Střed S kružnice opsané je stejně daleko od vrcholů A a B, leží proto na ose strany AB. Sestrojte ji: z bodů A a B opište oblouky se stejným poloměrem (větším než polovina |AB|) a oba průsečíky oblouků spojte přímkou.',
        shapes: ['sol-arc-p1a', 'sol-arc-p1b', 'sol-arc-p2a', 'sol-arc-p2b', 'sol-osa-ab'],
      },
      {
        text: 'Střed S je stejně daleko také od vrcholů B a C, leží tedy i na ose strany BC. Sestrojte ji stejným postupem (oblouky z bodů B a C).',
        shapes: ['sol-arc-q1b', 'sol-arc-q1c', 'sol-arc-q2b', 'sol-arc-q2c', 'sol-osa-bc'],
      },
      {
        text: 'Průsečík obou os je střed S kružnice opsané. Označte ho. (Osa třetí strany CA by bodem S prošla také, rýsovat ji nemusíte.)',
        points: ['sol-s'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |SA|. Prochází i vrcholy B a C. Úloha má jediné řešení.',
        shapes: ['sol-k'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'], extra: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-a' }],
    },
  );
}

/** Vlastní test 1, úloha 10: čtverec ABCD z vrcholu A a průsečíku úhlopříček S. */
function squareFromCentreSolution(): AssignmentModelSolution {
  const g = given('5fea3f29-3f2d-4a0f-905a-78c875ef01c7');
  const S = g.point('s');
  const A = g.point('a');
  const half = dist(S, A);
  const dir = unit(sub(S, A)); // od A přes S k C
  const across = perp(dir);
  const C = add(S, mul(dir, half));
  const B = add(S, mul(across, half));
  const D = sub(S, mul(across, half));

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-a', A, 'A');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  // Kolmice zadaná skrytým bodem, aby se vrchol D neukázal dřív, než ho žák sestrojí.
  s.ref('sol-n', sub(S, mul(across, 0.6 * half)));
  s.helperLine('sol-ac', 'sol-a', 'sol-s');
  s.arc('sol-arc-c', 'sol-s', 'sol-c', 0.5);
  s.helperLine('sol-bd', 'sol-n', 'sol-s');
  s.arc('sol-arc-b', 'sol-s', 'sol-b', 0.5);
  s.arc('sol-arc-d', 'sol-s', 'sol-d', 0.5);
  s.segment('sol-sab', 'sol-a', 'sol-b');
  s.segment('sol-sbc', 'sol-b', 'sol-c');
  s.segment('sol-scd', 'sol-c', 'sol-d');
  s.segment('sol-sda', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky čtverce jsou stejně dlouhé, navzájem se půlí a jsou na sebe kolmé. Bod S je proto střed obou úhlopříček a všechny vrcholy mají od něj vzdálenost |SA|. Vrchol C leží na přímce AS za bodem S, vrcholy B a D na kolmici k AC vedené bodem S.',
    [
      {
        text: 'Úhlopříčky čtverce se navzájem půlí, bod S je proto střed úhlopříčky AC. Narýsujte přímku AS a prodlužte ji za bod S — leží na ní úhlopříčka AC.',
        shapes: ['sol-ac'],
      },
      {
        text: 'Vrchol C je od bodu S stejně daleko jako vrchol A. Kružítkem se středem S a poloměrem |SA| naneste tuto vzdálenost na přímku za bod S. Průsečík označte C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Úhlopříčky čtverce jsou na sebe kolmé. Bodem S veďte kolmici k přímce AC — leží na ní druhá úhlopříčka BD.',
        shapes: ['sol-bd'],
      },
      {
        text: 'Úhlopříčky čtverce jsou stejně dlouhé, také vrcholy B a D mají od bodu S vzdálenost |SA|. Naneste ji kružítkem ze středu S na kolmici na obě strany a průsečíky označte B a D.',
        points: ['sol-b', 'sol-d'],
        shapes: ['sol-arc-b', 'sol-arc-d'],
      },
      {
        text: 'Spojte body A, B, C, D v tomto pořadí a narýsujte čtverec ABCD. Úloha má jediné řešení.',
        shapes: ['sol-sab', 'sol-sbc', 'sol-scd', 'sol-sda'],
      },
    ],
    {
      figures: [{ name: 'čtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      interchangeable: [['sol-b', 'sol-d']],
    },
  );
}

/** Vlastní test 2, úloha 9: kružnice vepsaná trojúhelníku ABC (střed S v průsečíku os úhlů). */
function inscribedCircleSolution(): AssignmentModelSolution {
  const g = given('ce4125e5-3b95-49dd-a7a3-4d08d0dc5a94');
  const A = g.point('a');
  const B = g.point('b');
  const C = g.point('c');
  const rho = 90;
  const bisector = (P: V, Q: V, R: V) => {
    const x1 = add(P, mul(unit(sub(Q, P)), rho));
    const x2 = add(P, mul(unit(sub(R, P)), rho));
    const y = sub(add(x1, x2), P);
    const dir = unit(sub(y, P));
    return { x1, x2, y, dir, span: angleBetween(sub(Q, P), sub(R, P)) };
  };
  const bA = bisector(A, B, C);
  const bB = bisector(B, A, C);
  const S = lineLine(A, bA.dir, B, bB.dir);
  const T = foot(S, A, sub(B, A));
  const r = dist(S, T);
  // Osy zadané dvěma body za kružnicí k — popisek (uprostřed) tak nepřekryje oblouky ani kružnici.
  const farA = add(S, mul(bA.dir, r + 110));
  const nearA = add(S, mul(bA.dir, r + 40));
  const farB = add(S, mul(bB.dir, r + 110));
  const nearB = add(S, mul(bB.dir, r + 40));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-c', C, 'C');
  s.ref('sol-xa1', bA.x1);
  s.ref('sol-xa2', bA.x2);
  s.ref('sol-ya', bA.y);
  s.ref('sol-rima', add(A, mul(bA.dir, rho)));
  s.ref('sol-fara', farA);
  s.ref('sol-neara', nearA);
  s.ref('sol-xb1', bB.x1);
  s.ref('sol-xb2', bB.x2);
  s.ref('sol-yb', bB.y);
  s.ref('sol-rimb', add(B, mul(bB.dir, rho)));
  s.ref('sol-farb', farB);
  s.ref('sol-nearb', nearB);
  s.point('sol-s', S, 'S');
  s.point('sol-t', T, 'T');
  s.arc('sol-arc-a', 'sol-a', 'sol-rima', bA.span + 0.35);
  s.arc('sol-arc-a1', 'sol-xa1', 'sol-ya', 0.5);
  s.arc('sol-arc-a2', 'sol-xa2', 'sol-ya', 0.5);
  s.helperLine('sol-oa', 'sol-neara', 'sol-fara', 'o₁');
  s.arc('sol-arc-b', 'sol-b', 'sol-rimb', bB.span + 0.35);
  s.arc('sol-arc-b1', 'sol-xb1', 'sol-yb', 0.5);
  s.arc('sol-arc-b2', 'sol-xb2', 'sol-yb', 0.5);
  s.helperLine('sol-ob', 'sol-nearb', 'sol-farb', 'o₂');
  s.segment('sol-st', 'sol-s', 'sol-t', true);
  s.circle('sol-k', 'sol-s', 'sol-t', 'k');

  return cumulative(
    s,
    'Kružnice vepsaná se dotýká všech tří stran, její střed S má proto od všech stran stejnou vzdálenost a leží na osách vnitřních úhlů trojúhelníku. Stačí sestrojit osy dvou úhlů, například při vrcholech A a B, jejich průsečík je střed S. Poloměr je vzdálenost bodu S od strany — určí ji kolmice z bodu S na stranu AB.',
    [
      {
        text: 'Kružnice k se dotýká stran AB a AC, její střed S má proto od obou stran stejnou vzdálenost a leží na ose úhlu při vrcholu A. Sestrojte ji: z vrcholu A opište oblouk, který protne strany AB a AC, z obou průsečíků opište oblouky se stejným poloměrem a jejich průsečík spojte s bodem A. Dostanete osu o₁.',
        shapes: ['sol-arc-a', 'sol-arc-a1', 'sol-arc-a2', 'sol-oa'],
      },
      {
        text: 'Střed S má stejnou vzdálenost i od stran AB a BC, leží tedy také na ose úhlu při vrcholu B. Sestrojte ji stejným postupem — to je osa o₂.',
        shapes: ['sol-arc-b', 'sol-arc-b1', 'sol-arc-b2', 'sol-ob'],
      },
      {
        text: 'Průsečík os o₁ a o₂ je střed S kružnice k. Označte ho. (Osa úhlu při vrcholu C by bodem S prošla také, rýsovat ji nemusíte.)',
        points: ['sol-s'],
      },
      {
        text: 'Poloměr kružnice k je vzdálenost bodu S od strany trojúhelníku. Z bodu S sestrojte kolmici na stranu AB, její pata T je bod, ve kterém se kružnice k dotýká strany AB.',
        points: ['sol-t'],
        shapes: ['sol-st'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |ST|. Dotýká se všech tří stran trojúhelníku ABC. Úloha má jediné řešení.',
        shapes: ['sol-k'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-t' }],
    },
  );
}

/** Vlastní test 2, úloha 10: tečny z vnějšího bodu M ke kružnici k (body dotyku na Thaletově kružnici). */
function tangentsFromPointSolution(): AssignmentModelSolution {
  const g = given('41edeb22-c521-4909-a2fd-1b2c1fbc0dbc');
  const k = g.circle('k');
  const S = k.c;
  const M = g.point('m');
  const d = dist(S, M);
  const u = unit(sub(M, S));
  const n = perp(u); // míří dolů: T₁ je dolní bod dotyku, T₂ horní (jako v přijímačkách)
  const base = add(S, mul(u, (k.r * k.r) / d));
  const off = (k.r * Math.sqrt(d * d - k.r * k.r)) / d;
  const T1 = add(base, mul(n, off));
  const T2 = sub(base, mul(n, off));
  const O = mid(S, M);
  const [P1, P2] = axisPoints(S, M, 150, 150);

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-m', M, 'M');
  s.ref('sol-p1', P1);
  s.ref('sol-p2', P2);
  s.point('sol-o', O, 'O');
  s.point('sol-t1', T1, 'T₁');
  s.point('sol-t2', T2, 'T₂');
  s.segment('sol-sm', 'sol-s', 'sol-m', true);
  s.arc('sol-arc-p1s', 'sol-s', 'sol-p1', 0.22);
  s.arc('sol-arc-p1m', 'sol-m', 'sol-p1', 0.22);
  s.arc('sol-arc-p2s', 'sol-s', 'sol-p2', 0.22);
  s.arc('sol-arc-p2m', 'sol-m', 'sol-p2', 0.22);
  s.segment('sol-osa', 'sol-p1', 'sol-p2', true);
  s.circle('sol-thalet', 'sol-o', 'sol-s');
  s.segment('sol-st1', 'sol-s', 'sol-t1', true);
  s.segment('sol-st2', 'sol-s', 'sol-t2', true);
  s.line('sol-mt1', 'sol-m', 'sol-t1');
  s.line('sol-mt2', 'sol-m', 'sol-t2');

  return cumulative(
    s,
    'Tečna je v bodě dotyku kolmá na poloměr, úhel STM je proto pravý. Body, ze kterých je úsečka SM vidět pod pravým úhlem, leží na Thaletově kružnici nad úsečkou SM. Její průsečíky s kružnicí k jsou body dotyku T₁, T₂ a přímky MT₁, MT₂ jsou hledané tečny.',
    [
      {
        text: 'Tečna je v bodě dotyku T kolmá na poloměr ST, úhel STM je tedy pravý. Bod T proto leží na Thaletově kružnici nad úsečkou SM. Narýsujte úsečku SM a najděte její střed: z bodů S a M opište oblouky se stejným poloměrem a průsečíky oblouků spojte — tato osa protne úsečku SM v jejím středu O.',
        points: ['sol-o'],
        shapes: ['sol-sm', 'sol-arc-p1s', 'sol-arc-p1m', 'sol-arc-p2s', 'sol-arc-p2m', 'sol-osa'],
      },
      {
        text: 'Ze středu O opište Thaletovu kružnici s poloměrem |OS| = |SM| : 2. Prochází body S i M.',
        shapes: ['sol-thalet'],
      },
      {
        text: 'Thaletova kružnice protne kružnici k ve dvou bodech. To jsou body dotyku — označte je T₁ a T₂.',
        points: ['sol-t1', 'sol-t2'],
      },
      {
        text: 'Narýsujte přímky MT₁ a MT₂ — to jsou hledané tečny. Úsečky ST₁ a ST₂ jsou na ně kolmé. Z bodu M vedou ke kružnici k dvě tečny.',
        shapes: ['sol-st1', 'sol-st2', 'sol-mt1', 'sol-mt2'],
      },
    ],
    {
      figures: [
        { name: 'bod dotyku T₁', vertices: ['sol-t1'] },
        { name: 'bod dotyku T₂', vertices: ['sol-t2'] },
      ],
      lines: [
        { name: 'MT₁', p1Id: 'sol-m', p2Id: 'sol-t1' },
        { name: 'MT₂', p1Id: 'sol-m', p2Id: 'sol-t2' },
      ],
      interchangeable: [['sol-t1', 'sol-t2']],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_A: [string, () => AssignmentModelSolution][] = [
  ['f6383b17-cbf5-452d-8789-2927973cd8bc', circumcircleSolution],
  ['5fea3f29-3f2d-4a0f-905a-78c875ef01c7', squareFromCentreSolution],
  ['ce4125e5-3b95-49dd-a7a3-4d08d0dc5a94', inscribedCircleSolution],
  ['41edeb22-c521-4909-a2fd-1b2c1fbc0dbc', tangentsFromPointSolution],
];
