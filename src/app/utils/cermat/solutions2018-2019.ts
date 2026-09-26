/** Vzorová řešení úloh 9 a 10 z JPZ 2018–2019 (data v `data2018-2019.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Obraz bodu `p` v osové souměrnosti podle přímky (bod `a`, směr `d`). */
const reflect = (p: V, a: V, d: V): V => sub(mul(foot(p, a, d), 2), p);

/** Dva body osy úsečky XY (průsečíky oblouků se stejným poloměrem `k`·|XY| z obou krajních bodů). */
function axisPoints(X: V, Y: V, k = 0.6): [V, V] {
  const M = mid(X, Y);
  const l = dist(X, Y);
  const h = Math.sqrt((k * l) ** 2 - (l / 2) ** 2);
  const n = unit(perp(sub(Y, X)));
  return [add(M, mul(n, h)), sub(M, mul(n, h))];
}

/** 2019, 1. řádný termín, úloha 9: trojúhelník KLM, úhel LKM = 30°, |LM| = |LK|. */
function triangle30Solution(): AssignmentModelSolution {
  const g = given('dd18ad23-fbf0-47a7-83aa-d49fc59f5cf3');
  const K = g.point('k');
  const L = g.point('l');
  const kl = dist(K, L);
  const u = unit(sub(L, K));
  // Úhel se sestrojí nad přímkou KL (pod ní v rámečku není místo).
  const E = rotate(L, K, -Math.PI / 3);
  const dir = rotate(u, { x: 0, y: 0 }, -Math.PI / 6);
  const M = add(K, mul(dir, 2 * kl * Math.cos(Math.PI / 6)));
  const far = add(K, mul(dir, dist(K, M) + 60));

  const s = new Board();
  s.ref('sol-k', K, 'K');
  s.ref('sol-l', L, 'L');
  s.ref('sol-far', far);
  s.point('sol-e', E, 'E');
  s.point('sol-m', M, 'M');
  s.arc('sol-arc-ek', 'sol-k', 'sol-e');
  s.arc('sol-arc-el', 'sol-l', 'sol-e');
  s.segment('sol-le', 'sol-l', 'sol-e', true);
  s.segment('sol-ke', 'sol-k', 'sol-e', true);
  s.helperLine('sol-osa', 'sol-k', 'sol-far');
  s.circle('sol-kr', 'sol-l', 'sol-k');
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mk', 'sol-m', 'sol-k');

  return cumulative(
    s,
    'Úhel 30° je polovina úhlu 60°, který má rovnostranný trojúhelník nad úsečkou KL. Protože |LM| = |LK|, leží vrchol M na kružnici se středem L a poloměrem |LK|. Ta protne druhé rameno úhlu 30° ve vrcholu M.',
    [
      {
        text: 'Úhel 30° je polovina úhlu 60°. Sestrojte rovnostranný trojúhelník KLE: oblouky se středy K a L a poloměrem |KL| se protnou v bodě E. Úhel LKE má 60°.',
        points: ['sol-e'],
        shapes: ['sol-arc-ek', 'sol-arc-el', 'sol-ke', 'sol-le'],
      },
      {
        text: 'Rozpulte úhel LKE — sestrojte jeho osu. (V rovnostranném trojúhelníku prochází osa úhlu při K středem strany LE.) Osa svírá s přímkou KL úhel 30°, leží na ní strana KM.',
        shapes: ['sol-osa'],
      },
      {
        text: 'Vrchol M je od bodu L stejně daleko jako bod K. Sestrojte kružnici se středem L a poloměrem |LK|. Kromě bodu K protne osu úhlu ještě v jednom bodě — to je vrchol M.',
        points: ['sol-m'],
        shapes: ['sol-kr'],
      },
      {
        text: 'Narýsujte trojúhelník KLM. Stačí jeden trojúhelník (druhý, souměrný podle přímky KL, by ležel pod ní).',
        shapes: ['sol-kl', 'sol-lm', 'sol-mk'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník KLM', vertices: ['sol-k', 'sol-l', 'sol-m'] }],
    },
  );
}

/** 2019, 1. řádný termín, úloha 10: obdélník ABCD s úhlopříčkou BD a vrcholem C na přímce c. */
function rectangleOnLineSolution(): AssignmentModelSolution {
  const g = given('0cdf95dc-06ff-429a-9084-e20b7efc8296');
  const B = g.point('b');
  const D = g.point('d');
  const c = g.line('c');
  const S = mid(B, D);
  const r = dist(B, D) / 2;
  const [C1, C2] = lineCircle(c.a, c.d, S, r).sort((p, q) => p.x - q.x);
  const A1 = sub(mul(S, 2), C1!);
  const A2 = sub(mul(S, 2), C2!);

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-d', D, 'D');
  s.point('sol-s', S, 'S');
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.point('sol-a1', A1, 'A₁');
  s.point('sol-a2', A2, 'A₂');
  s.segment('sol-bd-thin', 'sol-b', 'sol-d', true);
  s.circle('sol-k', 'sol-s', 'sol-b', 'k');
  s.segment('sol-c1a1-thin', 'sol-c1', 'sol-a1', true);
  s.segment('sol-c2a2-thin', 'sol-c2', 'sol-a2', true);
  s.segment('sol-a1b', 'sol-a1', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1d', 'sol-c1', 'sol-d');
  s.segment('sol-da1', 'sol-d', 'sol-a1');
  s.segment('sol-a2b', 'sol-a2', 'sol-b');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2d', 'sol-c2', 'sol-d');
  s.segment('sol-da2', 'sol-d', 'sol-a2');

  return cumulative(
    s,
    'Body B a D jsou protější vrcholy, BD je úhlopříčka obdélníku. Úhel BCD je pravý, vrchol C proto leží na Thaletově kružnici nad BD a zároveň na přímce c — kružnice ji protne ve dvou bodech. Vrchol A je obraz C ve středové souměrnosti se středem S úhlopříčky BD. Úloha má dvě řešení.',
    [
      {
        text: '10.1 V obdélníku ABCD jsou B a D protější vrcholy, úsečka BD je jeho úhlopříčka a úhel BCD je pravý. Vrchol C proto leží na Thaletově kružnici nad průměrem BD. Sestrojte střed S úsečky BD a kružnici k se středem S procházející body B a D.',
        points: ['sol-s'],
        shapes: ['sol-bd-thin', 'sol-k'],
      },
      {
        text: 'Vrchol C leží také na přímce c. Kružnice k protne přímku c ve dvou bodech — označte je C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: '10.2 Úhlopříčky obdélníku se půlí, vrchol A je proto obraz bodu C ve středové souměrnosti se středem S. Na polopřímce C₁S naneste za bod S vzdálenost |C₁S| a označte A₁, stejně na polopřímce C₂S bod A₂. Oba leží na kružnici k.',
        points: ['sol-a1', 'sol-a2'],
        shapes: ['sol-c1a1-thin', 'sol-c2a2-thin'],
      },
      {
        text: 'Narýsujte obdélníky A₁BC₁D a A₂BC₂D. Úloha má dvě řešení.',
        shapes: ['sol-a1b', 'sol-bc1', 'sol-c1d', 'sol-da1', 'sol-a2b', 'sol-bc2', 'sol-c2d', 'sol-da2'],
      },
    ],
    {
      figures: [
        { name: 'obdélník A₁BC₁D', vertices: ['sol-a1', 'sol-b', 'sol-c1', 'sol-d'] },
        { name: 'obdélník A₂BC₂D', vertices: ['sol-a2', 'sol-b', 'sol-c2', 'sol-d'] },
      ],
    },
  );
}

/** 2019, 2. řádný termín, úloha 9: rovnoramenný ABC se základnou AB, rameno AC na p. */
function isoscelesOnLineSolution(): AssignmentModelSolution {
  const g = given('66926945-7f45-417b-a642-c55cbe9fa3d6');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const [Q1, Q2] = axisPoints(A, B, 0.65);
  const C = lineLine(Q1, sub(Q2, Q1), p.a, p.d);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.point('sol-c', C, 'C');
  s.arc('sol-arc-a1', 'sol-a', 'sol-q1', 0.3);
  s.arc('sol-arc-b1', 'sol-b', 'sol-q1', 0.3);
  s.arc('sol-arc-a2', 'sol-a', 'sol-q2', 0.3);
  s.arc('sol-arc-b2', 'sol-b', 'sol-q2', 0.3);
  s.helperLine('sol-osa', 'sol-q1', 'sol-q2', 'o');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Ramena AC a BC jsou stejně dlouhá, vrchol C je tedy stejně daleko od A i od B a leží na ose úsečky AB. Rameno AC leží na přímce p, vrchol C je průsečík osy úsečky AB s přímkou p. Úloha má jedno řešení.',
    [
      {
        text: 'Základna je AB, ramena AC a BC mají stejnou délku. Vrchol C je proto stejně daleko od bodů A a B — leží na ose úsečky AB.',
      },
      {
        text: 'Sestrojte osu o úsečky AB: z bodů A a B narýsujte oblouky se stejným poloměrem (větším než polovina |AB|). Protnou se ve dvou bodech, jimi veďte osu o.',
        shapes: ['sol-arc-a1', 'sol-arc-b1', 'sol-arc-a2', 'sol-arc-b2', 'sol-osa'],
      },
      {
        text: 'Rameno AC leží na přímce p, vrchol C tedy leží i na ní. Průsečík osy o s přímkou p je vrchol C.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
    },
  );
}

/** 2019, 2. řádný termín, úloha 10: čtverec ABCD, AB na p, S uvnitř, právě dva vrcholy na k. */
function squareCircleSolution(): AssignmentModelSolution {
  const g = given('dafd0c20-bb5e-4926-9cbd-0edb3bcf2c55');
  const A = g.point('a');
  const p = g.line('p');
  const k = g.circle('k');
  const S = k.c;
  // Druhý průsečík přímky p s kružnicí k.
  const E = lineCircle(p.a, p.d, S, k.r).sort((a, b) => dist(b, A) - dist(a, A))[0]!;
  const u = unit(sub(E, A)); // směr strany AB (S se promítá mezi A a E)
  let n = unit(perp(u));
  if (dot(n, sub(S, A)) < 0) n = mul(n, -1); // směr strany AD do poloroviny s bodem S
  const square = (a: number) => {
    const B = add(A, mul(u, a));
    const D = add(A, mul(n, a));
    return { B, C: add(B, mul(n, a)), D };
  };
  // 1) na k leží B, 2) na k leží D, 3) na k leží C (úhlopříčka AC svírá s p úhel 45°).
  const a1 = dist(A, E);
  const a2 = 2 * dot(sub(S, A), n);
  const a3 = (2 * dot(sub(S, A), unit(add(u, n)))) / Math.SQRT2;
  const q1 = square(a1);
  const q2 = square(a2);
  const q3 = square(a3);
  const farN = add(A, mul(n, a2 + 60));
  const farDiag = add(A, mul(unit(add(u, n)), a3 * Math.SQRT2 + 60));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.ref('sol-far-n', farN);
  s.ref('sol-far-diag', farDiag);
  s.point('sol-b1', q1.B, 'B₁');
  s.point('sol-c1', q1.C, 'C₁');
  s.point('sol-d1', q1.D, 'D₁');
  s.point('sol-b2', q2.B, 'B₂');
  s.point('sol-c2', q2.C, 'C₂');
  s.point('sol-d2', q2.D, 'D₂');
  s.point('sol-b3', q3.B, 'B₃');
  s.point('sol-c3', q3.C, 'C₃');
  s.point('sol-d3', q3.D, 'D₃');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-far-n', 'q');
  s.arc('sol-arc-d1', 'sol-a', 'sol-d1');
  s.arc('sol-arc-c1b', 'sol-b1', 'sol-c1');
  s.arc('sol-arc-c1d', 'sol-d1', 'sol-c1');
  s.arc('sol-arc-b2', 'sol-a', 'sol-b2');
  s.arc('sol-arc-c2b', 'sol-b2', 'sol-c2');
  s.arc('sol-arc-c2d', 'sol-d2', 'sol-c2');
  s.helperLine('sol-diag', 'sol-a', 'sol-far-diag');
  s.segment('sol-c3b3-thin', 'sol-c3', 'sol-b3', true);
  s.segment('sol-c3d3-thin', 'sol-c3', 'sol-d3', true);
  for (const i of [1, 2, 3]) {
    s.segment(`sol-ab${i}`, 'sol-a', `sol-b${i}`);
    s.segment(`sol-b${i}c${i}`, `sol-b${i}`, `sol-c${i}`);
    s.segment(`sol-c${i}d${i}`, `sol-c${i}`, `sol-d${i}`);
    s.segment(`sol-d${i}a`, `sol-d${i}`, 'sol-a');
  }
  const sides = (i: number) => [`sol-ab${i}`, `sol-b${i}c${i}`, `sol-c${i}d${i}`, `sol-d${i}a`];

  return cumulative(
    s,
    'Čtverec leží v polorovině s bodem S, strana AB na přímce p a strana AD na kolmici k p v bodě A. Druhým vrcholem na kružnici k může být B (druhý průsečík p a k), D (průsečík kolmice s k), nebo C (průsečík k s polopřímkou z A pod úhlem 45° k p). Každá možnost určí délku strany, úloha má tři řešení.',
    [
      {
        text: 'Strana AB leží na přímce p a bod S má ležet uvnitř čtverce. Čtverec proto leží v polorovině s bodem S a vrchol B leží na polopřímce z A směrem ke druhému průsečíku přímky p s kružnicí k. Strana AD je kolmá k p: sestrojte kolmici q k přímce p v bodě A.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Řešení 1: druhý vrchol na kružnici k je B. Vrchol B₁ je druhý průsečík přímky p s kružnicí k. Naneste |AB₁| kružítkem na kolmici q — dostanete D₁. Vrchol C₁ je od B₁ i od D₁ vzdálený |AB₁|.',
        points: ['sol-b1', 'sol-d1', 'sol-c1'],
        shapes: ['sol-arc-d1', 'sol-arc-c1b', 'sol-arc-c1d'],
      },
      {
        text: 'Řešení 2: na kružnici k leží D. Vrchol D₂ je průsečík kolmice q s kružnicí k. Naneste |AD₂| na přímku p — dostanete B₂ — a doplňte vrchol C₂.',
        points: ['sol-d2', 'sol-b2', 'sol-c2'],
        shapes: ['sol-arc-b2', 'sol-arc-c2b', 'sol-arc-c2d'],
      },
      {
        text: 'Řešení 3: na kružnici k leží C. Úhlopříčka AC půlí pravý úhel při vrcholu A, svírá tedy s přímkou p úhel 45° — sestrojte osu úhlu mezi p a q. Protne kružnici k ve vrcholu C₃. Paty kolmic z C₃ na přímky p a q jsou vrcholy B₃ a D₃.',
        points: ['sol-c3', 'sol-b3', 'sol-d3'],
        shapes: ['sol-diag', 'sol-c3b3-thin', 'sol-c3d3-thin'],
      },
      {
        text: 'Narýsujte čtverce AB₁C₁D₁, AB₂C₂D₂ a AB₃C₃D₃. V každém leží na kružnici k právě dva vrcholy a bod S je uvnitř. Úloha má tři řešení.',
        shapes: [...sides(1), ...sides(2), ...sides(3)],
      },
    ],
    {
      figures: [
        { name: 'čtverec AB₁C₁D₁', vertices: ['sol-a', 'sol-b1', 'sol-c1', 'sol-d1'] },
        { name: 'čtverec AB₂C₂D₂', vertices: ['sol-a', 'sol-b2', 'sol-c2', 'sol-d2'] },
        { name: 'čtverec AB₃C₃D₃', vertices: ['sol-a', 'sol-b3', 'sol-c3', 'sol-d3'] },
      ],
    },
  );
}

/** 2018, 1. řádný termín, úloha 9: trojúhelník ABC, M na těžnici tc, vc = 6 cm, těžiště T. */
function medianHeightSolution(): AssignmentModelSolution {
  const g = given('d0abcd42-585f-4d26-b9c8-db0555db7e12');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const ab = sub(B, A);
  let n = unit(perp(ab));
  if (dot(n, sub(M, A)) < 0) n = mul(n, -1);
  const S = mid(A, B);
  const [Q1, Q2] = axisPoints(A, B, 0.6);
  const H = add(A, mul(n, 300)); // 6 cm nad bodem A
  const H2 = add(H, ab);
  const C = lineLine(S, sub(M, S), H, ab);
  const P = mid(B, C);
  const T = add(S, mul(sub(C, S), 1 / 3));
  const [R1, R2] = axisPoints(B, C, 0.6);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.ref('sol-h', H);
  s.ref('sol-h2', H2);
  s.ref('sol-r1', R1);
  s.ref('sol-r2', R2);
  s.point('sol-s', S, 'S');
  s.point('sol-c', C, 'C');
  s.point('sol-p', P, 'P');
  s.point('sol-t', T, 'T');
  s.arc('sol-arc-q1a', 'sol-a', 'sol-q1', 0.25);
  s.arc('sol-arc-q1b', 'sol-b', 'sol-q1', 0.25);
  s.arc('sol-arc-q2a', 'sol-a', 'sol-q2', 0.25);
  s.arc('sol-arc-q2b', 'sol-b', 'sol-q2', 0.25);
  s.helperLine('sol-osa-ab', 'sol-q1', 'sol-q2');
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-h');
  s.arc('sol-arc-h', 'sol-a', 'sol-h', 0.2);
  s.helperLine('sol-rovnobezka', 'sol-h', 'sol-h2');
  s.helperLine('sol-sm', 'sol-s', 'sol-m');
  s.segment('sol-tc', 'sol-s', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.arc('sol-arc-r1b', 'sol-b', 'sol-r1', 0.25);
  s.arc('sol-arc-r1c', 'sol-c', 'sol-r1', 0.25);
  s.arc('sol-arc-r2b', 'sol-b', 'sol-r2', 0.25);
  s.arc('sol-arc-r2c', 'sol-c', 'sol-r2', 0.25);
  s.segment('sol-ta', 'sol-a', 'sol-p', true);

  return cumulative(
    s,
    'Těžnice tc vychází ze středu S strany AB a prochází bodem M. Vrchol C má od přímky AB vzdálenost 6 cm, leží proto na rovnoběžce s AB ve vzdálenosti 6 cm na straně bodu M; průsečík s polopřímkou SM je vrchol C. Těžiště T je průsečík těžnic — stačí sestrojit ještě těžnici z vrcholu A do středu P strany BC.',
    [
      {
        text: '9.1 Těžnice tc spojuje vrchol C se středem strany AB. Sestrojte osu úsečky AB (průsečíky oblouků se stejným poloměrem z bodů A a B) — protne úsečku AB v jejím středu S.',
        points: ['sol-s'],
        shapes: ['sol-arc-q1a', 'sol-arc-q1b', 'sol-arc-q2a', 'sol-arc-q2b', 'sol-osa-ab'],
      },
      {
        text: 'Výška vc měří 6 cm, vrchol C je tedy od přímky AB vzdálený 6 cm. Sestrojte kolmici k AB v bodě A, naneste na ni 6 cm na stranu bodu M a tímto bodem veďte rovnoběžku s přímkou AB.',
        shapes: ['sol-kolmice-a', 'sol-arc-h', 'sol-rovnobezka'],
      },
      {
        text: 'Bod M leží na těžnici tc, vrchol C proto leží na polopřímce SM. Její průsečík s rovnoběžkou je vrchol C. Narýsujte těžnici tc = SC a trojúhelník ABC.',
        points: ['sol-c'],
        shapes: ['sol-sm', 'sol-tc', 'sol-ab', 'sol-bc', 'sol-ca'],
      },
      {
        text: '9.2 Těžiště je průsečík těžnic. Sestrojte střed P strany BC (osou úsečky BC) a těžnici AP.',
        points: ['sol-p'],
        shapes: ['sol-arc-r1b', 'sol-arc-r1c', 'sol-arc-r2b', 'sol-arc-r2c', 'sol-ta'],
      },
      {
        text: 'Těžnice AP protne těžnici tc v těžišti. Označte ho písmenem T.',
        points: ['sol-t'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'], extra: ['sol-t'] },
        { name: 'těžnice tc', vertices: ['sol-s', 'sol-c'] },
      ],
    },
  );
}

/** 2018, 1. řádný termín, úloha 10: střed kružnice opsané trojúhelníku KLM. */
function circumcenterSolution(): AssignmentModelSolution {
  const g = given('be4e60f3-cd27-4c1f-9e1e-28694f4238b6');
  const K = g.point('k');
  const L = g.point('l');
  const M = g.point('m');
  const [P1, P2] = axisPoints(M, L, 0.6);
  const [Q1, Q2] = axisPoints(M, K, 0.65);
  const S = lineLine(P1, sub(P2, P1), Q1, sub(Q2, Q1));

  const s = new Board();
  s.ref('sol-k', K, 'K');
  s.ref('sol-l', L, 'L');
  s.ref('sol-m', M, 'M');
  s.ref('sol-p1', P1);
  s.ref('sol-p2', P2);
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.point('sol-s', S, 'S');
  s.arc('sol-arc-p1m', 'sol-m', 'sol-p1', 0.25);
  s.arc('sol-arc-p1l', 'sol-l', 'sol-p1', 0.25);
  s.arc('sol-arc-p2m', 'sol-m', 'sol-p2', 0.25);
  s.arc('sol-arc-p2l', 'sol-l', 'sol-p2', 0.25);
  s.helperLine('sol-osa-ml', 'sol-p1', 'sol-p2');
  s.arc('sol-arc-q1m', 'sol-m', 'sol-q1', 0.25);
  s.arc('sol-arc-q1k', 'sol-k', 'sol-q1', 0.25);
  s.arc('sol-arc-q2m', 'sol-m', 'sol-q2', 0.25);
  s.arc('sol-arc-q2k', 'sol-k', 'sol-q2', 0.25);
  s.helperLine('sol-osa-mk', 'sol-q1', 'sol-q2');
  s.circle('sol-kr', 'sol-s', 'sol-k', 'k');

  return cumulative(
    s,
    'Střed S kružnice k je od všech tří vrcholů stejně daleko, leží proto na ose každé strany trojúhelníku KLM. Stačí sestrojit osy dvou stran, jejich průsečík je střed S.',
    [
      {
        text: 'Střed S je stejně daleko od vrcholů M a L, leží tedy na ose strany ML. Sestrojte ji: z bodů M a L narýsujte oblouky se stejným poloměrem (větším než polovina |ML|) a průsečíky oblouků spojte.',
        shapes: ['sol-arc-p1m', 'sol-arc-p1l', 'sol-arc-p2m', 'sol-arc-p2l', 'sol-osa-ml'],
      },
      {
        text: 'Střed S je stejně daleko také od vrcholů M a K, leží i na ose strany MK. Sestrojte ji stejným způsobem.',
        shapes: ['sol-arc-q1m', 'sol-arc-q1k', 'sol-arc-q2m', 'sol-arc-q2k', 'sol-osa-mk'],
      },
      {
        text: 'Průsečík obou os je střed S kružnice k. Označte ho. Kružnice k se středem S prochází všemi třemi vrcholy K, L, M.',
        points: ['sol-s'],
        shapes: ['sol-kr'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
    },
  );
}

/** 2018, 2. řádný termín, úloha 9: výšky pravoúhlého trojúhelníku (9.1) a vrchol C s M na výšce (9.2). */
function rightTriangleHeightsSolution(): AssignmentModelSolution {
  const g = given('022dd853-050e-48b2-84f9-aa37e1f96184');
  const A0 = g.point('a0');
  const B0 = g.point('b0');
  const C0 = g.point('c0');
  const P0 = foot(C0, A0, sub(B0, A0));
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const S = mid(A, B);
  const r = dist(A, B) / 2;
  const other = (from: V) => lineCircle(from, sub(M, from), S, r).sort((p, q) => dist(q, from) - dist(p, from))[0]!;
  const C1 = other(B); // M na výšce vb = odvěsně BC
  const F = foot(M, A, sub(B, A));
  const C2 = lineCircle(F, sub(M, F), S, r).find(q => dot(sub(q, F), sub(M, F)) > 0)!; // M na výšce vc
  const C3 = other(A); // M na výšce va = odvěsně AC

  const s = new Board();
  s.ref('sol-a0', A0, 'A');
  s.ref('sol-b0', B0, 'B');
  s.ref('sol-c0', C0, 'C');
  s.point('sol-p0', P0, 'P');
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-f', F);
  s.point('sol-s', S, 'S');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.point('sol-c3', C3, 'C₃');
  s.segment('sol-vc0', 'sol-c0', 'sol-p0');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.helperLine('sol-kolmice', 'sol-f', 'sol-m');
  s.helperLine('sol-bm', 'sol-b', 'sol-m');
  s.helperLine('sol-am', 'sol-a', 'sol-m');
  s.segment('sol-vc2', 'sol-c2', 'sol-f', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  for (const i of [1, 2, 3]) {
    s.segment(`sol-bc${i}`, 'sol-b', `sol-c${i}`);
    s.segment(`sol-c${i}a`, `sol-c${i}`, 'sol-a');
  }

  return cumulative(
    s,
    'V pravoúhlém trojúhelníku jsou výšky va a vb totožné s odvěsnami AC a BC, výška vc je kolmice z C na přeponu AB. Vrchol C pravého úhlu leží na Thaletově kružnici nad AB; bod M leží buď na výšce vc (kolmice k AB bodem M), nebo na odvěsně BC (polopřímka BM), nebo na odvěsně AC (polopřímka AM). Úloha 9.2 má tři řešení.',
    [
      {
        text: '9.1 Úhel při vrcholu C je pravý. Výška va je kolmice z A na přímku BC — to je právě odvěsna AC. Stejně výška vb je odvěsna BC. Výšku vc sestrojte jako kolmici z vrcholu C na přeponu AB, její patu označte P. Popište výšky va (AC), vb (BC) a vc (CP).',
        points: ['sol-p0'],
        shapes: ['sol-vc0'],
      },
      {
        text: '9.2 Úsečka AB je přepona, úhel při C je pravý. Vrchol C proto leží na Thaletově kružnici nad průměrem AB. Sestrojte střed S úsečky AB a kružnici k se středem S procházející body A a B.',
        points: ['sol-s'],
        shapes: ['sol-k'],
      },
      {
        text: 'Bod M leží na výšce vc: ta je kolmá k přeponě AB. Sestrojte kolmici k přímce AB bodem M — protne kružnici k (nad přímkou AB) ve vrcholu C₂.',
        points: ['sol-c2'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Bod M leží na výšce vb, tedy na odvěsně BC: polopřímka BM protne kružnici k ve vrcholu C₁. Bod M leží na výšce va, tedy na odvěsně AC: polopřímka AM protne kružnici k ve vrcholu C₃.',
        points: ['sol-c1', 'sol-c3'],
        shapes: ['sol-bm', 'sol-am'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁, ABC₂ a ABC₃. Průsečíky pod přímkou AB nevyhovují — bod M by ležel vně trojúhelníku. Úloha má tři řešení.',
        shapes: ['sol-ab', 'sol-vc2', 'sol-bc1', 'sol-c1a', 'sol-bc2', 'sol-c2a', 'sol-bc3', 'sol-c3a'],
      },
    ],
    {
      figures: [
        { name: 'výška vc (9.1)', vertices: ['sol-c0', 'sol-p0'] },
        { name: 'trojúhelník ABC₁', vertices: ['sol-a', 'sol-b', 'sol-c1'] },
        { name: 'trojúhelník ABC₂', vertices: ['sol-a', 'sol-b', 'sol-c2'] },
        { name: 'trojúhelník ABC₃', vertices: ['sol-a', 'sol-b', 'sol-c3'] },
      ],
    },
  );
}

/** 2018, 2. řádný termín, úloha 10: rovnoramenný lichoběžník ABCD s osou o, D na polopřímce AX, |AB| = |AD|. */
function isoscelesTrapezoidSolution(): AssignmentModelSolution {
  const g = given('032e2924-d7f2-4ca9-a250-2e6f66c08203');
  const A = g.point('a');
  const X = g.point('x');
  const o = g.line('o');
  const P = foot(A, o.a, o.d);
  const B = reflect(A, o.a, o.d);
  const D = add(A, mul(unit(sub(X, A)), dist(A, B)));
  const Q = foot(D, o.a, o.d);
  const C = reflect(D, o.a, o.d);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-p', P);
  s.ref('sol-q', Q);
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-p');
  s.arc('sol-arc-b', 'sol-p', 'sol-b');
  s.arc('sol-arc-d', 'sol-a', 'sol-d');
  s.helperLine('sol-kolmice-d', 'sol-d', 'sol-q');
  s.arc('sol-arc-c', 'sol-q', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Osa souměrnosti rovnoramenného lichoběžníku je kolmá k oběma základnám a půlí je. Vrchol B je obraz A podle osy o, vrchol D leží na polopřímce AX ve vzdálenosti |AB| od A a vrchol C je obraz D podle osy o.',
    [
      {
        text: 'Přímka o je osa souměrnosti lichoběžníku, základna AB je k ní kolmá a o ji půlí. Vrchol B je proto obraz bodu A v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem A a za osu naneste vzdálenost bodu A od o.',
        points: ['sol-b'],
        shapes: ['sol-kolmice-a', 'sol-arc-b'],
      },
      {
        text: 'Strany AB a AD mají stejnou délku a D leží na polopřímce AX. Naneste kružítkem od bodu A na polopřímku AX délku |AB| — dostanete vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-arc-d'],
      },
      {
        text: 'Vrchol C je obraz vrcholu D v osové souměrnosti s osou o. Sestrojte kolmici k o bodem D a za osu naneste vzdálenost bodu D od o.',
        points: ['sol-c'],
        shapes: ['sol-kolmice-d', 'sol-arc-c'],
      },
      {
        text: 'Narýsujte lichoběžník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'lichoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

export const CERMAT_SOLUTIONS_2018_2019: [string, () => AssignmentModelSolution][] = [
  ['dd18ad23-fbf0-47a7-83aa-d49fc59f5cf3', triangle30Solution],
  ['0cdf95dc-06ff-429a-9084-e20b7efc8296', rectangleOnLineSolution],
  ['66926945-7f45-417b-a642-c55cbe9fa3d6', isoscelesOnLineSolution],
  ['dafd0c20-bb5e-4926-9cbd-0edb3bcf2c55', squareCircleSolution],
  ['d0abcd42-585f-4d26-b9c8-db0555db7e12', medianHeightSolution],
  ['be4e60f3-cd27-4c1f-9e1e-28694f4238b6', circumcenterSolution],
  ['022dd853-050e-48b2-84f9-aa37e1f96184', rightTriangleHeightsSolution],
  ['032e2924-d7f2-4ca9-a250-2e6f66c08203', isoscelesTrapezoidSolution],
];
