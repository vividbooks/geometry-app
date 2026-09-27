/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík B (viz dataPrijimacky-b.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, sub, unit } from './board';

/** Konce přímky (bod `a`, směr `d`) oříznuté na rámeček s okrajem `m` (nahoře `top`). */
function clipToFrame(a: V, d: V, frame: { width: number; height: number }, m = 40, top = 50): [V, V] {
  const u = unit(d);
  const ts: number[] = [];
  if (Math.abs(u.x) > 1e-9) ts.push((m - a.x) / u.x, (frame.width - m - a.x) / u.x);
  if (Math.abs(u.y) > 1e-9) ts.push((top - a.y) / u.y, (frame.height - m - a.y) / u.y);
  const inside = ts
    .map(t => ({ t, p: add(a, mul(u, t)) }))
    .filter(({ p }) => p.x >= m - 1e-6 && p.x <= frame.width - m + 1e-6 && p.y >= top - 1e-6 && p.y <= frame.height - m + 1e-6)
    .sort((x, y) => x.t - y.t);
  return [inside[0]!.p, inside[inside.length - 1]!.p];
}

/**
 * Průsečíky oblouků se stejným poloměrem `rho` opsaných z krajních bodů úsečky PQ — body osy úsečky.
 * Vrací [X₁, X₂], kde X₁ leží ve směru `side` od úsečky.
 */
function bisectorMarks(P: V, Q: V, rho: number, side: V): [V, V] {
  const M = mid(P, Q);
  let n = perp(unit(sub(Q, P)));
  if (dot(n, side) < 0) n = mul(n, -1);
  const h = Math.sqrt(rho * rho - (dist(P, Q) / 2) ** 2);
  return [add(M, mul(n, h)), sub(M, mul(n, h))];
}

/** Vlastní test 3, úloha 9: kružnice k prochází body A, B a její střed S leží na přímce p. */
function circleCenterOnLineSolution(): AssignmentModelSolution {
  const g = given('7dc37bc8-f846-4796-8a7a-59b2e7d60129');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const M = mid(A, B);
  const dirO = perp(unit(sub(B, A)));
  const S = lineLine(M, dirO, p.a, p.d);
  // Oblouky s poloměrem 1,2 · |AB|/2 (jako v přijímačkách); X₁ je průsečík nad úsečkou AB.
  const [X1, X2] = bisectorMarks(A, B, 0.6 * dist(A, B), { x: 0, y: -1 });
  const toS = unit(sub(S, M));
  const O1 = add(S, mul(toS, 20));
  const O2 = add(S, mul(toS, 90));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.ref('sol-o1', O1);
  s.ref('sol-o2', O2);
  s.point('sol-s', S, 'S');
  s.arc('sol-arc-a1', 'sol-a', 'sol-x1', 0.4);
  s.arc('sol-arc-a2', 'sol-a', 'sol-x2', 0.4);
  s.arc('sol-arc-b1', 'sol-b', 'sol-x1', 0.4);
  s.arc('sol-arc-b2', 'sol-b', 'sol-x2', 0.4);
  s.helperLine('sol-o', 'sol-o1', 'sol-o2', 'o');
  s.segment('sol-sa', 'sol-s', 'sol-a', true);
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');

  return cumulative(
    s,
    'Kružnice k prochází body A a B, její střed S je proto od obou bodů stejně daleko a leží na ose o úsečky AB. Zároveň leží na přímce p, střed S je tedy průsečík osy o s přímkou p. Poloměr kružnice je |SA|. Osa o není s přímkou p rovnoběžná, úloha má jedno řešení.',
    [
      {
        text: 'Kružnice k prochází body A i B, její střed S má proto od obou bodů stejnou vzdálenost. Všechny takové body leží na ose úsečky AB. K její konstrukci opište z bodu A i z bodu B oblouky se stejným poloměrem, větším než polovina |AB|, tak aby se protnuly na obou stranách úsečky AB.',
        shapes: ['sol-arc-a1', 'sol-arc-a2', 'sol-arc-b1', 'sol-arc-b2'],
      },
      {
        text: 'Oba průsečíky oblouků spojte přímkou. To je osa o úsečky AB — každý její bod je stejně daleko od A jako od B.',
        shapes: ['sol-o'],
      },
      {
        text: 'Střed S má zároveň ležet na přímce p. Průsečík osy o s přímkou p je proto střed hledané kružnice — označte ho S. Osa o není s přímkou p rovnoběžná, protne ji tedy v jediném bodě.',
        points: ['sol-s'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |SA|. Projde i bodem B, protože bod S leží na ose úsečky AB a |SB| = |SA|. Úloha má jedno řešení.',
        shapes: ['sol-sa', 'sol-k'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-a' }],
    },
  );
}

/** Vlastní test 3, úloha 10: tečny kružnice k rovnoběžné s přímkou p. */
function parallelTangentsSolution(): AssignmentModelSolution {
  const g = given('21b3f91d-9c66-4c22-8ecf-9e2baa2413e5');
  const k = g.circle('k');
  const S = k.c;
  const p = g.line('p');
  const P = foot(S, p.a, p.d);
  const toP = unit(sub(P, S));
  // T₁ je bod dotyku dál od přímky p (nahoře), T₂ ten bližší.
  const T1 = sub(S, mul(toP, k.r));
  const T2 = add(S, mul(toP, k.r));
  const u = unit(p.d);
  const [a1, b1] = clipToFrame(T1, u, g.item.frame);
  const [a2, b2] = clipToFrame(T2, u, g.item.frame);
  // Body pro kolmici n: popisek n (uprostřed mezi nimi) leží mezi kružnicí a přímkou p.
  const N1 = T2;
  const N2 = P;

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-n1', N1);
  s.ref('sol-n2', N2);
  s.ref('sol-a1', a1);
  s.ref('sol-b1', b1);
  s.ref('sol-a2', a2);
  s.ref('sol-b2', b2);
  s.point('sol-t1', T1, 'T₁');
  s.point('sol-t2', T2, 'T₂');
  s.helperLine('sol-n', 'sol-n1', 'sol-n2', 'n');
  s.line('sol-tt1', 'sol-a1', 'sol-b1', 't₁');
  s.line('sol-tt2', 'sol-a2', 'sol-b2', 't₂');

  return cumulative(
    s,
    'Tečna je v bodě dotyku kolmá k poloměru. Tečna rovnoběžná s přímkou p je proto kolmá ke kolmici na p, body dotyku tedy leží na kolmici n k přímce p vedené středem S. Kolmice n protne kružnici k v bodech T₁ a T₂ a těmi vedeme rovnoběžky s přímkou p — tečny t₁ a t₂. Úloha má dvě řešení.',
    [
      {
        text: 'Tečna kružnice je v bodě dotyku kolmá k poloměru. Má-li být tečna rovnoběžná s přímkou p, musí být poloměr do bodu dotyku kolmý k přímce p. Body dotyku proto leží na kolmici k přímce p, která prochází středem S. Sestrojte ji (trojúhelníkem s ryskou) a označte n.',
        shapes: ['sol-n'],
      },
      {
        text: 'Kolmice n protne kružnici k ve dvou bodech. To jsou body dotyku hledaných tečen — označte je T₁ a T₂.',
        points: ['sol-t1', 'sol-t2'],
      },
      {
        text: 'Bodem T₁ veďte rovnoběžku s přímkou p. Je kolmá k přímce n, a tedy i k poloměru ST₁, je to proto tečna t₁ kružnice k.',
        shapes: ['sol-tt1'],
      },
      {
        text: 'Narýsujte stejně bodem T₂ rovnoběžku s přímkou p — tečnu t₂. Úloha má dvě řešení: tečny t₁ a t₂ leží na opačných stranách kružnice k.',
        shapes: ['sol-tt2'],
      },
    ],
    {
      figures: [
        { name: 'bod dotyku T₁', vertices: ['sol-t1'] },
        { name: 'bod dotyku T₂', vertices: ['sol-t2'] },
      ],
      lines: [
        { name: 't₁', p1Id: 'sol-a1', p2Id: 'sol-b1' },
        { name: 't₂', p1Id: 'sol-a2', p2Id: 'sol-b2' },
      ],
    },
  );
}

/** Vlastní test 4, úloha 9: obdélník ABCD se stranou AB a vrcholem C na kružnici k. */
function rectangleOnCircleSolution(): AssignmentModelSolution {
  const g = given('9a2574e2-ffa3-421e-97b0-f40348af3399');
  const A = g.point('a');
  const B = g.point('b');
  const k = g.circle('k');
  const u = unit(sub(B, A));
  let n = perp(u);
  if (dot(n, sub(k.c, B)) < 0) n = mul(n, -1);
  // C₁ je průsečík blíž k bodu B, C₂ ten vzdálenější.
  const [C1, C2] = lineCircle(B, n, k.c, k.r).sort((x, y) => dist(x, B) - dist(y, B));
  const D1 = add(A, sub(C1!, B));
  const D2 = add(A, sub(C2!, B));
  const [ab1, ab2] = clipToFrame(A, u, g.item.frame);
  const [bn1, bn2] = clipToFrame(B, n, g.item.frame);
  const [an1, an2] = clipToFrame(A, n, g.item.frame);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-ab1', ab1);
  s.ref('sol-ab2', ab2);
  s.ref('sol-bn1', bn1);
  s.ref('sol-bn2', bn2);
  s.ref('sol-an1', an1);
  s.ref('sol-an2', an2);
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.helperLine('sol-ab-line', 'sol-ab1', 'sol-ab2');
  s.helperLine('sol-kb', 'sol-bn1', 'sol-bn2');
  s.helperLine('sol-ka', 'sol-an1', 'sol-an2');
  s.arc('sol-arc-d1', 'sol-a', 'sol-d1', 0.35);
  s.arc('sol-arc-d2', 'sol-a', 'sol-d2', 0.3);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1d1', 'sol-c1', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2d2', 'sol-c2', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'V obdélníku je strana BC kolmá ke straně AB, vrchol C proto leží na kolmici k přímce AB vedené bodem B. Tato kolmice protne kružnici k ve dvou bodech C₁ a C₂. Vrchol D leží na kolmici k přímce AB v bodě A a |AD| = |BC|. Úloha má dvě řešení.',
    [
      {
        text: 'V obdélníku jsou sousední strany na sebe kolmé. Strana BC je kolmá k AB, vrchol C proto leží na kolmici k přímce AB vedené bodem B. Narýsujte přímku AB a bodem B veďte k ní kolmici (trojúhelníkem s ryskou).',
        shapes: ['sol-ab-line', 'sol-kb'],
      },
      {
        text: 'Vrchol C leží zároveň na kružnici k. Kolmice protne kružnici k ve dvou bodech — označte je C₁ a C₂. Úloha má proto dvě řešení.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Také strana AD je kolmá k AB. Bodem A veďte kolmici k přímce AB — na ní leží vrchol D.',
        shapes: ['sol-ka'],
      },
      {
        text: 'Protější strany obdélníku jsou stejně dlouhé. Naneste kružítkem z bodu A na kolmici délku |BC₁|, a to na stejnou stranu přímky AB, na které leží C₁ — dostanete vrchol D₁. Stejně s délkou |BC₂| najdete vrchol D₂.',
        points: ['sol-d1', 'sol-d2'],
        shapes: ['sol-arc-d1', 'sol-arc-d2'],
      },
      {
        text: 'Narýsujte obdélníky ABC₁D₁ a ABC₂D₂. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc1', 'sol-c1d1', 'sol-d1a', 'sol-bc2', 'sol-c2d2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'obdélník ABC₁D₁', vertices: ['sol-a', 'sol-b', 'sol-c1', 'sol-d1'] },
        { name: 'obdélník ABC₂D₂', vertices: ['sol-a', 'sol-b', 'sol-c2', 'sol-d2'] },
      ],
    },
  );
}

/** Vlastní test 4, úloha 10: rovnoramenný trojúhelník KLM se základnou KL a vrcholem M na přímce p. */
function isoscelesApexOnLineSolution(): AssignmentModelSolution {
  const g = given('e6a47f1b-58dd-4bfd-b2ae-ae0022b1e811');
  const K = g.point('k');
  const L = g.point('l');
  const p = g.line('p');
  const Mid = mid(K, L);
  const dirO = perp(unit(sub(L, K)));
  const M = lineLine(Mid, dirO, p.a, p.d);
  const [X1, X2] = bisectorMarks(K, L, 0.56 * dist(K, L), sub(M, Mid));

  const s = new Board();
  s.ref('sol-k', K, 'K');
  s.ref('sol-l', L, 'L');
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  // Druhý bod pro popisek osy: popisek o pak leží mezi úsečkou KL a přímkou p, ne na základně.
  s.ref('sol-om', M);
  s.point('sol-m', M, 'M');
  s.arc('sol-arc-k1', 'sol-k', 'sol-x1', 0.35);
  s.arc('sol-arc-k2', 'sol-k', 'sol-x2', 0.35);
  s.arc('sol-arc-l1', 'sol-l', 'sol-x1', 0.35);
  s.arc('sol-arc-l2', 'sol-l', 'sol-x2', 0.35);
  s.helperLine('sol-o', 'sol-x1', 'sol-om', 'o');
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mk', 'sol-m', 'sol-k');

  return cumulative(
    s,
    'Ramena KM a LM rovnoramenného trojúhelníku jsou shodná, vrchol M je proto stejně daleko od K jako od L a leží na ose úsečky KL. Osu sestrojíme dvěma dvojicemi oblouků se stejným poloměrem ze středů K a L. Její průsečík s přímkou p je vrchol M, úloha má jedno řešení.',
    [
      {
        text: 'Úsečka KL je základna, ramena KM a LM jsou stejně dlouhá. Vrchol M je tedy stejně daleko od bodu K jako od bodu L — všechny takové body leží na ose úsečky KL. K její konstrukci opište z bodů K a L oblouky se stejným poloměrem, větším než polovina |KL|, na obě strany úsečky.',
        shapes: ['sol-arc-k1', 'sol-arc-k2', 'sol-arc-l1', 'sol-arc-l2'],
      },
      {
        text: 'Oba průsečíky oblouků spojte přímkou — to je osa o úsečky KL.',
        shapes: ['sol-o'],
      },
      {
        text: 'Vrchol M leží zároveň na přímce p. Průsečík osy o s přímkou p označte M. Osa a přímka p se protnou v jediném bodě, úloha má proto jedno řešení.',
        points: ['sol-m'],
      },
      {
        text: 'Narýsujte trojúhelník KLM.',
        shapes: ['sol-kl', 'sol-lm', 'sol-mk'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník KLM', vertices: ['sol-k', 'sol-l', 'sol-m'] }],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_B: [string, () => AssignmentModelSolution][] = [
  ['7dc37bc8-f846-4796-8a7a-59b2e7d60129', circleCenterOnLineSolution],
  ['21b3f91d-9c66-4c22-8ecf-9e2baa2413e5', parallelTangentsSolution],
  ['9a2574e2-ffa3-421e-97b0-f40348af3399', rectangleOnCircleSolution],
  ['e6a47f1b-58dd-4bfd-b2ae-ae0022b1e811', isoscelesApexOnLineSolution],
];
