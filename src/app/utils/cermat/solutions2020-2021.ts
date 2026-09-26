/** Vzorová řešení úloh 9 a 10 z JPZ 2020–2021 (data v `data2020-2021.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Obraz bodu `p` v osové souměrnosti s osou (bod `a`, směr `d`). */
const reflect = (p: V, a: V, d: V): V => sub(mul(foot(p, a, d), 2), p);

/** Znaménko strany, na které leží bod `p` vůči přímce (bod `a`, směr `d`). */
const side = (p: V, a: V, d: V): number => Math.sign(d.x * (p.y - a.y) - d.y * (p.x - a.x));

/** Průsečíky dvou kružnic. */
function circleCircle(c1: V, r1: number, c2: V, r2: number): V[] {
  const d = dist(c1, c2);
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h2 = r1 * r1 - a * a;
  if (h2 < 0) return [];
  const u = unit(sub(c2, c1));
  const base = add(c1, mul(u, a));
  const h = Math.sqrt(h2);
  return [add(base, mul(perp(u), h)), sub(base, mul(perp(u), h))];
}

/** 2021, 1. řádný termín, úloha 9: o je osa strany AB, úhel BAC = 60°, C na polopřímce BX. */
function angle60AxisSolution(): AssignmentModelSolution {
  const g = given('5c5439be-f7b5-4987-be15-5721a6d1c650');
  const B = g.point('b');
  const X = g.point('x');
  const o = g.line('o');
  const S = foot(B, o.a, o.d);
  const A = sub(mul(S, 2), B);
  const bx = sub(X, B);
  // Rovnostranný trojúhelník ASE — z obou možností ta, jejíž polopřímka AE protne polopřímku BX.
  const cands = [Math.PI / 3, -Math.PI / 3].map(rad => {
    const E = rotate(S, A, rad);
    const C = lineLine(A, sub(E, A), B, bx);
    return { E, C, ok: dot(sub(C, B), bx) > 0 && dot(sub(C, A), sub(E, A)) > 0 };
  });
  const { E, C } = cands.find(q => q.ok)!;
  const far = dist(A, E) > dist(A, C) ? E : C;

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-x', X);
  s.point('sol-s', S, 'S');
  s.point('sol-a', A, 'A');
  s.point('sol-e', E, 'E');
  s.ref('sol-far', add(far, mul(unit(sub(far, A)), 40)));
  s.point('sol-c', C, 'C');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-s');
  s.arc('sol-arc-a', 'sol-s', 'sol-a');
  s.arc('sol-arc-e1', 'sol-a', 'sol-e');
  s.arc('sol-arc-e2', 'sol-s', 'sol-e');
  s.segment('sol-se', 'sol-s', 'sol-e', true);
  s.helperLine('sol-ae', 'sol-a', 'sol-far');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Přímka o je osou strany AB, vrchol A je proto obraz bodu B v osové souměrnosti s osou o. Úhel 60° při vrcholu A sestrojíme pomocí rovnostranného trojúhelníku ASE. Polopřímka AE protne polopřímku BX ve vrcholu C.',
    [
      {
        text: 'Osa strany AB je k ní kolmá a prochází jejím středem. Sestrojte kolmici k přímce o bodem B; průsečík s přímkou o je střed S strany AB.',
        points: ['sol-s'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Vrchol A leží na kolmici za přímkou o a |SA| = |SB|. Naneste vzdálenost |SB| kružítkem od S a označte A.',
        points: ['sol-a'],
        shapes: ['sol-arc-a'],
      },
      {
        text: 'Úhel BAC má 60°, stejně jako úhly rovnostranného trojúhelníku. Z bodů A a S opište oblouky o poloměru |AS|; jejich průsečík E (na straně polopřímky BX) tvoří s body A a S rovnostranný trojúhelník.',
        points: ['sol-e'],
        shapes: ['sol-arc-e1', 'sol-arc-e2', 'sol-se'],
      },
      {
        text: 'Úhel SAE, a tedy i úhel BAE, má 60°. Sestrojte polopřímku AE — protne polopřímku BX ve vrcholu C.',
        points: ['sol-c'],
        shapes: ['sol-ae'],
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

/** 2021, 1. řádný termín, úloha 10: rovnoramenný lichoběžník ABCD s kolmými úhlopříčkami v bodě P. */
function trapezoidPerpDiagonalsSolution(): AssignmentModelSolution {
  const g = given('ffdd43f9-08b9-4cd2-a059-387a41b97299');
  const B = g.point('b');
  const P = g.point('p');
  const q = g.line('q');
  const bp = sub(P, B);
  const C = lineLine(P, perp(bp), q.a, q.d);
  const A = add(P, mul(unit(sub(P, C)), dist(P, B)));
  const D = add(P, mul(unit(bp), dist(P, C)));

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-p', P);
  s.point('sol-c', C, 'C');
  s.point('sol-a', A, 'A');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-bd-line', 'sol-b', 'sol-p');
  s.helperLine('sol-ac-line', 'sol-p', 'sol-c');
  s.arc('sol-arc-a', 'sol-p', 'sol-a');
  s.arc('sol-arc-d', 'sol-p', 'sol-d');
  s.segment('sol-ac', 'sol-a', 'sol-c', true);
  s.segment('sol-bd', 'sol-b', 'sol-d', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčka BD leží na přímce BP a úhlopříčka AC na kolmici k ní v bodě P; kolmice protne přímku q ve vrcholu C. Rovnoramenný lichoběžník je souměrný podle osy základen, proto |PA| = |PB| a |PD| = |PC|.',
    [
      {
        text: 'Úhlopříčka BD prochází body B a P. Sestrojte přímku BP.',
        shapes: ['sol-bd-line'],
      },
      {
        text: 'Úhlopříčka AC je kolmá k BD a prochází bodem P. Sestrojte kolmici k přímce BP v bodě P. Vrchol C leží i na přímce q — průsečík je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-ac-line'],
      },
      {
        text: 'Rovnoramenný lichoběžník je souměrný, obě úhlopříčky se v bodě P dělí stejně: |PA| = |PB| a |PD| = |PC|. Naneste od P vzdálenost |PB| na polopřímku opačnou k PC — vrchol A. Naneste od P vzdálenost |PC| na polopřímku opačnou k PB — vrchol D.',
        points: ['sol-a', 'sol-d'],
        shapes: ['sol-arc-a', 'sol-arc-d', 'sol-ac', 'sol-bd'],
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

/** 2021, 2. řádný termín, úloha 9: rovnoramenný pravoúhlý ABC, B na polopřímce AX, C na c; pravý úhel při A, resp. B. */
function rightIsoscelesSolution(): AssignmentModelSolution {
  const g = given('303f469d-439d-4a89-9764-41356e085571');
  const A = g.point('a');
  const X = g.point('x');
  const c = g.line('c');
  const ax = sub(X, A);
  const n0 = perp(ax);
  const n = side(c.a, A, ax) === side(add(A, n0), A, ax) ? n0 : mul(n0, -1);
  const C1 = lineLine(A, n, c.a, c.d);
  const B1 = add(A, mul(unit(ax), dist(A, C1)));
  const Q = mid(B1, C1);
  const C2 = lineLine(A, sub(Q, A), c.a, c.d);
  const B2 = foot(C2, A, ax);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-x', X);
  s.ref('sol-q', Q);
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-c2', C2, 'C₂');
  s.point('sol-b2', B2, 'B₂');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-c1');
  s.arc('sol-arc-b1', 'sol-a', 'sol-b1', 0.3);
  s.helperLine('sol-osa', 'sol-a', 'sol-c2');
  s.helperLine('sol-kolmice2', 'sol-c2', 'sol-b2');
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c1', 'sol-b1', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c2', 'sol-b2', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    '9.1: Kolmice k polopřímce AX v bodě A protne přímku c ve vrcholu C₁, vrchol B₁ leží na AX ve vzdálenosti |AC₁| od A. 9.2: Při pravém úhlu u B má úhel při A 45°. Osa pravého úhlu B₁AC₁ protne c ve vrcholu C₂ a pata kolmice z C₂ k AX je vrchol B₂.',
    [
      {
        text: '9.1 Pravý úhel je při vrcholu A, strana AC je tedy kolmá k polopřímce AX. Sestrojte kolmici k AX v bodě A; její průsečík s přímkou c je vrchol C₁.',
        points: ['sol-c1'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Trojúhelník je rovnoramenný, odvěsny jsou stejně dlouhé: |AB| = |AC|. Naneste kružítkem vzdálenost |AC₁| od A na polopřímku AX a označte B₁. Narýsujte trojúhelník AB₁C₁.',
        points: ['sol-b1'],
        shapes: ['sol-arc-b1', 'sol-ab1', 'sol-b1c1', 'sol-c1a'],
      },
      {
        text: '9.2 Pravý úhel je při vrcholu B, ostré úhly rovnoramenného pravoúhlého trojúhelníku mají 45°. Úhel 45° při A získáte jako osu pravého úhlu B₁AC₁ — prochází středem úsečky B₁C₁. Osa protne přímku c ve vrcholu C₂.',
        points: ['sol-c2'],
        shapes: ['sol-osa'],
      },
      {
        text: 'Strana BC je kolmá k polopřímce AX. Sestrojte kolmici k AX bodem C₂; její pata je vrchol B₂.',
        points: ['sol-b2'],
        shapes: ['sol-kolmice2'],
      },
      {
        text: 'Narýsujte trojúhelník AB₂C₂.',
        shapes: ['sol-ab2', 'sol-b2c2', 'sol-c2a'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník AB₁C₁', vertices: ['sol-a', 'sol-b1', 'sol-c1'] },
        { name: 'trojúhelník AB₂C₂', vertices: ['sol-a', 'sol-b2', 'sol-c2'] },
      ],
    },
  );
}

/** 2021, 2. řádný termín, úloha 10: rovnoběžník ABCD, M na AB, N na AD, výška 5 cm, |BD| = |AD|. */
function parallelogramHeightSolution(): AssignmentModelSolution {
  const g = given('96a5023a-0b79-465a-8f8c-5335e1d1d73a');
  const A = g.point('a');
  const M = g.point('m');
  const N = g.point('n');
  const u = sub(M, A);
  const n0 = unit(perp(u));
  const n = side(N, A, u) === side(add(A, n0), A, u) ? n0 : mul(n0, -1);
  const H = add(M, mul(n, 250)); // 5 cm
  const D = lineLine(H, u, A, sub(N, A));
  const F = foot(D, A, u);
  const B = sub(mul(F, 2), A);
  const C = add(B, sub(D, A));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-m', M);
  s.ref('sol-n', N);
  s.point('sol-h', H, 'H');
  s.point('sol-d', D, 'D');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-am', 'sol-a', 'sol-m');
  s.helperLine('sol-an', 'sol-a', 'sol-n');
  s.helperLine('sol-kolmice', 'sol-m', 'sol-h');
  s.arc('sol-arc-h', 'sol-m', 'sol-h', 0.3);
  s.helperLine('sol-rovnobezka', 'sol-h', 'sol-d');
  s.arc('sol-arc-b', 'sol-d', 'sol-b', 0.35);
  s.helperLine('sol-par-bc', 'sol-b', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Vrchol D leží na polopřímce AN a na rovnoběžce s přímkou AM ve vzdálenosti 5 cm (výška na stranu AB). Protože |BD| = |AD|, leží B na kružnici se středem D a poloměrem |DA| a na polopřímce AM. Vrchol C doplní rovnoběžník.',
    [
      {
        text: 'Strana AB leží na polopřímce AM, strana AD na polopřímce AN. Sestrojte obě polopřímky.',
        shapes: ['sol-am', 'sol-an'],
      },
      {
        text: 'Výška na stranu AB měří 5 cm, vrchol D je tedy od přímky AM vzdálený 5 cm. Sestrojte kolmici k přímce AM v bodě M a naneste na ni 5 cm na stranu bodu N — bod H.',
        points: ['sol-h'],
        shapes: ['sol-kolmice', 'sol-arc-h'],
      },
      {
        text: 'Sestrojte rovnoběžku s přímkou AM bodem H. Protne polopřímku AN ve vrcholu D.',
        points: ['sol-d'],
        shapes: ['sol-rovnobezka'],
      },
      {
        text: 'Vrchol B má od D stejnou vzdálenost jako vrchol A: |BD| = |AD|. Kružnice se středem D a poloměrem |DA| protne polopřímku AM podruhé ve vrcholu B.',
        points: ['sol-b'],
        shapes: ['sol-arc-b'],
      },
      {
        text: 'Vrchol C leží na rovnoběžce s AD bodem B a na rovnoběžce s AB bodem D (je to průsečík přímky DH s rovnoběžkou). Narýsujte rovnoběžník ABCD.',
        points: ['sol-c'],
        shapes: ['sol-par-bc', 'sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'rovnoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** 2021, 1. náhradní termín, úloha 9: obdélník ABCD vepsaný do kružnice k procházející bodem M. */
function rectangleCircumcircleSolution(): AssignmentModelSolution {
  const g = given('3bf4d396-f839-4772-bae1-170d0a3da66f');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const S1 = mid(A, B);
  const S2 = mid(A, M);
  const S = lineLine(S1, perp(sub(B, A)), S2, perp(sub(M, A)));
  const C = sub(mul(S, 2), A);
  const D = sub(mul(S, 2), B);
  const o1 = add(S1, mul(unit(perp(sub(B, A))), 120));
  const o2 = add(S2, mul(unit(perp(sub(M, A))), 120));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-s1', S1);
  s.ref('sol-s2', S2);
  s.ref('sol-o1', o1);
  s.ref('sol-o2', o2);
  s.point('sol-s', S, 'S');
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-osa1', 'sol-s1', 'sol-o1', 'o₁');
  s.helperLine('sol-osa2', 'sol-s2', 'sol-o2', 'o₂');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.segment('sol-ac', 'sol-a', 'sol-c', true);
  s.segment('sol-bd', 'sol-b', 'sol-d', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Střed S kružnice k je stejně daleko od bodů A, B i M, leží proto na ose úsečky AB i na ose úsečky AM. Úhlopříčky obdélníku jsou průměry kružnice k: vrchol C je obraz bodu A a vrchol D obraz bodu B ve středové souměrnosti se středem S.',
    [
      {
        text: '9.1 Střed S kružnice k má stejnou vzdálenost od bodů A a B, leží tedy na ose o₁ úsečky AB. Sestrojte ji.',
        shapes: ['sol-osa1'],
      },
      {
        text: 'Bod S je stejně daleko i od bodů A a M, leží proto také na ose o₂ úsečky AM. Průsečík os o₁ a o₂ je střed S. Sestrojte kružnici k se středem S procházející body A, B a M.',
        points: ['sol-s'],
        shapes: ['sol-osa2', 'sol-k'],
      },
      {
        text: '9.2 Úhlopříčky obdélníku jsou stejně dlouhé a půlí se, jsou to tedy průměry kružnice k. Přímka AS protne kružnici k ve vrcholu C, přímka BS ve vrcholu D.',
        points: ['sol-c', 'sol-d'],
        shapes: ['sol-ac', 'sol-bd'],
      },
      {
        text: 'Narýsujte obdélník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'], extra: ['sol-s'] }],
    },
  );
}

/** 2021, 1. náhradní termín, úloha 10: trojúhelník ABC, osy úhlů při A a B procházejí bodem L. */
function angleBisectorsSolution(): AssignmentModelSolution {
  const g = given('0965319b-f70a-4211-94c0-b2ee9082c04f');
  const A = g.point('a');
  const B = g.point('b');
  const L = g.point('l');
  const B1 = reflect(B, A, sub(L, A));
  const A2 = reflect(A, B, sub(L, B));
  const C = lineLine(A, sub(B1, A), B, sub(A2, B));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-l', L);
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-a2', A2, 'A₂');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-al', 'sol-a', 'sol-l', 'o₁');
  s.helperLine('sol-bl', 'sol-b', 'sol-l', 'o₂');
  s.segment('sol-bb1', 'sol-b', 'sol-b1', true);
  s.segment('sol-aa2', 'sol-a', 'sol-a2', true);
  s.helperLine('sol-ab1', 'sol-a', 'sol-b1');
  s.helperLine('sol-ba2', 'sol-b', 'sol-a2');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Přímka AL je osa úhlu BAC, strana AC je proto obrazem strany AB v osové souměrnosti s osou AL. Stejně strana BC je obrazem strany BA podle přímky BL. Vrchol C je průsečík obou obrazů.',
    [
      {
        text: 'Osa úhlu BAC prochází body A a L. Sestrojte přímku o₁ = AL. Ramena úhlu jsou podle osy souměrná: obraz B₁ bodu B v osové souměrnosti s osou o₁ leží na polopřímce AC.',
        points: ['sol-b1'],
        shapes: ['sol-al', 'sol-bb1'],
      },
      {
        text: 'Stejně osa úhlu ABC je přímka o₂ = BL. Sestrojte obraz A₂ bodu A v osové souměrnosti s osou o₂ — leží na polopřímce BC.',
        points: ['sol-a2'],
        shapes: ['sol-bl', 'sol-aa2'],
      },
      {
        text: 'Sestrojte polopřímky AB₁ a BA₂. Jejich průsečík je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-ab1', 'sol-ba2'],
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

/** 2021, 2. náhradní termín, úloha 9: rovnoramenný KLM (ramena = 2 × základna), U uvnitř; tři řešení. */
function isoscelesTwiceBaseSolution(): AssignmentModelSolution {
  const g = given('b9736a8a-76a4-4caa-991d-0a1a7531bd6a');
  const L = g.point('l');
  const M = g.point('m');
  const U = g.point('u');
  const a = dist(L, M);
  const lm = sub(M, L);
  const onUSide = (p: V) => side(p, L, lm) === side(U, L, lm);
  const pick = (pts: V[]) => pts.find(onUSide)!;
  const SLM = mid(L, M);
  const K1 = pick(circleCircle(M, a, L, a / 2)); // základna LK₁, ramena ML = MK₁
  const K2 = pick(circleCircle(L, a, M, a / 2)); // základna MK₂, ramena LM = LK₂
  const K3 = pick(circleCircle(L, 2 * a, M, 2 * a)); // základna LM, ramena 2|LM|

  const s = new Board();
  s.ref('sol-l', L, 'L');
  s.ref('sol-m', M, 'M');
  s.ref('sol-u', U);
  s.point('sol-slm', SLM, 'S');
  s.point('sol-k1', K1, 'K₁');
  s.point('sol-k2', K2, 'K₂');
  s.point('sol-k3', K3, 'K₃');
  s.arc('sol-arc-k1m', 'sol-m', 'sol-k1', 0.35);
  s.arc('sol-arc-k1l', 'sol-l', 'sol-k1', 0.8);
  s.arc('sol-arc-k2l', 'sol-l', 'sol-k2', 0.35);
  s.arc('sol-arc-k2m', 'sol-m', 'sol-k2', 0.8);
  s.arc('sol-arc-k3l', 'sol-l', 'sol-k3', 0.15);
  s.arc('sol-arc-k3m', 'sol-m', 'sol-k3', 0.15);
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-lk1', 'sol-l', 'sol-k1');
  s.segment('sol-k1m', 'sol-k1', 'sol-m');
  s.segment('sol-lk2', 'sol-l', 'sol-k2');
  s.segment('sol-k2m', 'sol-k2', 'sol-m');
  s.segment('sol-lk3', 'sol-l', 'sol-k3');
  s.segment('sol-k3m', 'sol-k3', 'sol-m');

  return cumulative(
    s,
    'Úsečka LM může být základnou, nebo jedním z ramen. Je-li LM rameno, je základna poloviční |LM| : 2 a hlavní vrchol je M, nebo L. Je-li LM základna, mají ramena délku 2 · |LM|. Vrchol K vždy leží na té straně přímky LM, kde je bod U. Úloha má tři řešení.',
    [
      {
        text: 'Když je LM rameno, je základna dvakrát kratší: měří |LM| : 2. Sestrojte střed S úsečky LM, pak |LS| = |LM| : 2.',
        points: ['sol-slm'],
      },
      {
        text: 'Ramena LM a MK₁ (hlavní vrchol M): vrchol K₁ je od M vzdálený |ML| a od L vzdálený |LS|. Opište z M oblouk o poloměru |ML| a z L oblouk o poloměru |LS|. Vyberte průsečík na straně bodu U a označte ho K₁.',
        points: ['sol-k1'],
        shapes: ['sol-arc-k1m', 'sol-arc-k1l'],
      },
      {
        text: 'Ramena LM a LK₂ (hlavní vrchol L): vrchol K₂ je od L vzdálený |LM| a od M vzdálený |MS|. Opište oblouky a průsečík na straně bodu U označte K₂.',
        points: ['sol-k2'],
        shapes: ['sol-arc-k2l', 'sol-arc-k2m'],
      },
      {
        text: 'Když je LM základna, mají obě ramena délku 2 · |LM|. Opište z L i z M oblouky o poloměru 2 · |LM|; jejich průsečík na straně bodu U je vrchol K₃.',
        points: ['sol-k3'],
        shapes: ['sol-arc-k3l', 'sol-arc-k3m'],
      },
      {
        text: 'Narýsujte trojúhelníky K₁LM, K₂LM a K₃LM. Bod U leží uvnitř každého z nich, úloha má tři řešení.',
        shapes: ['sol-lm', 'sol-lk1', 'sol-k1m', 'sol-lk2', 'sol-k2m', 'sol-lk3', 'sol-k3m'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník K₁LM', vertices: ['sol-k1', 'sol-l', 'sol-m'] },
        { name: 'trojúhelník K₂LM', vertices: ['sol-k2', 'sol-l', 'sol-m'] },
        { name: 'trojúhelník K₃LM', vertices: ['sol-k3', 'sol-l', 'sol-m'] },
      ],
    },
  );
}

/** 2021, 2. náhradní termín, úloha 10: obdélník ABCD se středem S, |CD| = |CS|; dvě řešení. */
function rectangleCdCsSolution(): AssignmentModelSolution {
  const g = given('1388ef1f-d1c9-4332-b778-d2cf821bc7fa');
  const A = g.point('a');
  const S = g.point('s');
  const C = sub(mul(S, 2), A);
  const r = dist(S, A);
  const [D1, D2] = circleCircle(S, r, C, r).sort((p, q) => p.y - q.y);
  const B1 = sub(mul(S, 2), D1!);
  const B2 = sub(mul(S, 2), D2!);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.point('sol-c', C, 'C');
  s.point('sol-d1', D1!, 'D₁');
  s.point('sol-d2', D2!, 'D₂');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.arc('sol-arc-c', 'sol-s', 'sol-c');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.circle('sol-m', 'sol-c', 'sol-s', 'm');
  s.segment('sol-d1b1', 'sol-d1', 'sol-b1', true);
  s.segment('sol-d2b2', 'sol-d2', 'sol-b2', true);
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
    'Vrchol C je obraz bodu A ve středové souměrnosti se středem S. Všechny vrcholy leží na kružnici k se středem S a poloměrem |SA|. Vrchol D leží na k a je od C vzdálený |CS|, tedy na kružnici se středem C a poloměrem |CS|. Kružnice se protnou ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Bod S je střed obdélníku, úhlopříčky se v něm půlí. Vrchol C leží na polopřímce AS a |SC| = |SA|. Naneste vzdálenost |SA| za bod S a označte C.',
        points: ['sol-c'],
        shapes: ['sol-ac-thin', 'sol-arc-c'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé, všechny vrcholy jsou proto od S vzdálené |SA|. Sestrojte kružnici k se středem S a poloměrem |SA|.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol D je od C vzdálený |CS|. Sestrojte kružnici m se středem C a poloměrem |CS|. Protne kružnici k ve dvou bodech — označte je D₁ a D₂.',
        points: ['sol-d1', 'sol-d2'],
        shapes: ['sol-m'],
      },
      {
        text: 'Vrchol B je obraz vrcholu D ve středové souměrnosti se středem S. Na přímce D₁S naneste za S vzdálenost |SD₁| a označte B₁, stejně k bodu D₂ sestrojte B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-d1b1', 'sol-d2b2'],
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
    },
  );
}

/** 2020, 1. řádný termín, úloha 9: trojúhelník ABC, B na b, těžnice t_b = 6 cm; dvě řešení. */
function medianSixSolution(): AssignmentModelSolution {
  const g = given('ea963e72-f512-4cbd-af0d-4d5e7072a6f5');
  const A = g.point('a');
  const C = g.point('c');
  const b = g.line('b');
  const S = mid(A, C);
  const r = 300; // 6 cm
  const [B1, B2] = lineCircle(b.a, b.d, S, r).sort((p, q) => p.x - q.x);
  const n = unit(perp(sub(C, A)));
  const o1 = add(S, mul(n, 70));
  const o2 = sub(S, mul(n, 70));
  const rim = add(S, mul(unit(sub(S, C)), r));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.ref('sol-o1', o1);
  s.ref('sol-o2', o2);
  s.ref('sol-rim', rim);
  s.point('sol-s', S, 'S');
  s.point('sol-b1', B1!, 'B₁');
  s.point('sol-b2', B2!, 'B₂');
  s.helperLine('sol-osa', 'sol-o1', 'sol-o2');
  s.circle('sol-k', 'sol-s', 'sol-rim', 'k');
  s.segment('sol-t1', 'sol-s', 'sol-b1', true);
  s.segment('sol-t2', 'sol-s', 'sol-b2', true);
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');

  return cumulative(
    s,
    'Těžnice tb spojuje vrchol B se středem S strany AC. Vrchol B je proto od S vzdálený 6 cm: leží na kružnici se středem S a poloměrem 6 cm a zároveň na přímce b. Kružnice protne b ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Těžnice tb vede z vrcholu B do středu strany AC. Sestrojte osu úsečky AC; její průsečík s AC je střed S strany AC.',
        points: ['sol-s'],
        shapes: ['sol-osa'],
      },
      {
        text: 'Těžnice měří 6 cm, vrchol B je tedy od bodu S vzdálený 6 cm. Sestrojte kružnici k se středem S a poloměrem 6 cm.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol B leží i na přímce b. Kružnice k protne přímku b ve dvou bodech — označte je B₁ a B₂. Úsečky SB₁ a SB₂ jsou těžnice.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-t1', 'sol-t2'],
      },
      {
        text: 'Narýsujte trojúhelníky AB₁C a AB₂C. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-b1c', 'sol-ca', 'sol-ab2', 'sol-b2c'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník AB₁C', vertices: ['sol-a', 'sol-b1', 'sol-c'] },
        { name: 'trojúhelník AB₂C', vertices: ['sol-a', 'sol-b2', 'sol-c'] },
      ],
    },
  );
}

/** 2020, 1. řádný termín, úloha 10: rovnoramenný lichoběžník ABCD s osou o, M střed ramene BC. */
function isoscelesTrapezoidAxisSolution(): AssignmentModelSolution {
  const g = given('32f328bb-cb2f-4bec-ae7c-3c90c4cb3c4a');
  const A = g.point('a');
  const M = g.point('m');
  const o = g.line('o');
  const B = reflect(A, o.a, o.d);
  const C = sub(mul(M, 2), B);
  const D = reflect(C, o.a, o.d);
  const FA = foot(A, o.a, o.d);
  const FC = foot(C, o.a, o.d);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-m', M);
  s.ref('sol-fa', FA);
  s.ref('sol-fc', FC);
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-b');
  s.arc('sol-arc-b', 'sol-fa', 'sol-b');
  s.helperLine('sol-bm', 'sol-b', 'sol-c');
  s.arc('sol-arc-c', 'sol-m', 'sol-c');
  s.helperLine('sol-kolmice-c', 'sol-c', 'sol-d');
  s.arc('sol-arc-d', 'sol-fc', 'sol-d');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Osa rovnoramenného lichoběžníku je kolmá k oběma základnám a půlí je. Vrchol B je obraz bodu A v osové souměrnosti s osou o, vrchol C je obraz B ve středové souměrnosti se středem M a vrchol D je obraz C podle osy o.',
    [
      {
        text: 'Lichoběžník je souměrný podle osy o, vrchol B je proto obraz vrcholu A v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem A a naneste na ni za osu stejnou vzdálenost, jakou má A od o. Označte B.',
        points: ['sol-b'],
        shapes: ['sol-kolmice-a', 'sol-arc-b'],
      },
      {
        text: 'Bod M je střed ramene BC. Vrchol C leží na polopřímce BM a |MC| = |BM|. Naneste vzdálenost |BM| za bod M a označte C.',
        points: ['sol-c'],
        shapes: ['sol-bm', 'sol-arc-c'],
      },
      {
        text: 'Vrchol D je obraz vrcholu C v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem C a naneste na ni za osu vzdálenost bodu C od o. Označte D.',
        points: ['sol-d'],
        shapes: ['sol-kolmice-c', 'sol-arc-d'],
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

export const CERMAT_SOLUTIONS_2020_2021: [string, () => AssignmentModelSolution][] = [
  ['5c5439be-f7b5-4987-be15-5721a6d1c650', angle60AxisSolution],
  ['ffdd43f9-08b9-4cd2-a059-387a41b97299', trapezoidPerpDiagonalsSolution],
  ['303f469d-439d-4a89-9764-41356e085571', rightIsoscelesSolution],
  ['96a5023a-0b79-465a-8f8c-5335e1d1d73a', parallelogramHeightSolution],
  ['3bf4d396-f839-4772-bae1-170d0a3da66f', rectangleCircumcircleSolution],
  ['0965319b-f70a-4211-94c0-b2ee9082c04f', angleBisectorsSolution],
  ['b9736a8a-76a4-4caa-991d-0a1a7531bd6a', isoscelesTwiceBaseSolution],
  ['1388ef1f-d1c9-4332-b778-d2cf821bc7fa', rectangleCdCsSolution],
  ['ea963e72-f512-4cbd-af0d-4d5e7072a6f5', medianSixSolution],
  ['32f328bb-cb2f-4bec-ae7c-3c90c4cb3c4a', isoscelesTrapezoidAxisSolution],
];
