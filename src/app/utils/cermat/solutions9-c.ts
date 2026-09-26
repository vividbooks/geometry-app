/** Vzorová řešení a kontrola úkolů 9. ročníku ve stylu CERMAT, balík C (data v `data9-c.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/**
 * Střed úsečky PQ sestrojený osou úsečky: oblouky ze P a Q se stejným poloměrem, spojnice jejich průsečíků
 * (tenká úsečka) protne PQ ve středu. Vrací id čar; středem je bod, který si volající přidá sám.
 */
function bisectorArcs(s: Board, prefix: string, pId: string, qId: string, P: V, Q: V): string[] {
  const h = dist(P, Q) / 2;
  const off = Math.sqrt((h * 1.3) ** 2 - h * h);
  const n = unit(perp(sub(Q, P)));
  const H = mid(P, Q);
  const z1 = s.ref(`${prefix}-z1`, add(H, mul(n, off)));
  const z2 = s.ref(`${prefix}-z2`, sub(H, mul(n, off)));
  return [
    s.arc(`${prefix}-arc1`, pId, z1, 0.3),
    s.arc(`${prefix}-arc2`, qId, z1, 0.3),
    s.arc(`${prefix}-arc3`, pId, z2, 0.3),
    s.arc(`${prefix}-arc4`, qId, z2, 0.3),
    s.segment(`${prefix}-osa`, z1, z2, true),
  ];
}

/** Úsečka KL s K na VX, L na VY a středem P: L je průsečík VY s obrazem polopřímky VX podle středu P. */
function segmentWithMidpointSolution(): AssignmentModelSolution {
  const g = given('eb989d60-d80e-49ef-a012-da8378c440d5');
  const Vv = g.point('v');
  const P = g.point('p');
  const vx = g.line('vx');
  const vy = g.line('vy');
  const V2 = sub(mul(P, 2), Vv);
  const L = lineLine(V2, vx.d, Vv, vy.d);
  const K = sub(mul(P, 2), L);
  const W = sub(V2, mul(unit(vx.d), dist(V2, L) + 80));

  const s = new Board();
  s.ref('sol-v', Vv);
  s.ref('sol-p', P);
  s.ref('sol-w', W);
  s.point('sol-v2', V2, 'V′');
  s.point('sol-l', L, 'L');
  s.point('sol-k', K, 'K');
  s.helperLine('sol-vp', 'sol-v', 'sol-v2');
  s.arc('sol-arc-v2', 'sol-p', 'sol-v2');
  s.helperLine('sol-par', 'sol-v2', 'sol-w');
  s.helperLine('sol-lp', 'sol-l', 'sol-k');
  s.arc('sol-arc-k', 'sol-p', 'sol-k');
  s.segment('sol-kl', 'sol-k', 'sol-l');

  return cumulative(
    s,
    'Bod K je obraz bodu L ve středové souměrnosti se středem P. Obraz polopřímky VX v této souměrnosti je rovnoběžka s VX vedená obrazem V′ bodu V; její průsečík s polopřímkou VY je bod L. Bod K dostanete jako průsečík přímky LP s polopřímkou VX.',
    [
      {
        text: 'Bod P je středem úsečky KL, proto je bod K obrazem bodu L ve středové souměrnosti se středem P. Zobrazte v této souměrnosti polopřímku VX: nejprve sestrojte obraz V′ bodu V. Narýsujte přímku VP a za bodem P naneste kružítkem vzdálenost |PV|.',
        points: ['sol-v2'],
        shapes: ['sol-vp', 'sol-arc-v2'],
      },
      {
        text: 'Obrazem polopřímky VX ve středové souměrnosti je polopřímka s počátkem V′, která je s VX rovnoběžná. Sestrojte bodem V′ rovnoběžku s polopřímkou VX.',
        shapes: ['sol-par'],
      },
      {
        text: 'Obraz bodu K leží na obrazu polopřímky VX a je to bod L, který leží zároveň na polopřímce VY. Průsečík rovnoběžky s polopřímkou VY označte L.',
        points: ['sol-l'],
      },
      {
        text: 'Bod K je obraz bodu L: leží na přímce LP za bodem P a platí |PK| = |PL|. Narýsujte přímku LP — protne polopřímku VX v bodě K.',
        points: ['sol-k'],
        shapes: ['sol-lp', 'sol-arc-k'],
      },
      {
        text: 'Narýsujte úsečku KL. Úloha má jedno řešení.',
        shapes: ['sol-kl'],
      },
    ],
    {
      figures: [{ name: 'úsečka KL', vertices: ['sol-k', 'sol-l'] }],
    },
  );
}

/** Body X na přímce p s pravým úhlem AXB: průsečíky Thaletovy kružnice nad AB s přímkou p. */
function rightAngleOnLineSolution(): AssignmentModelSolution {
  const g = given('2fade1e1-0466-4cc2-8851-20cd375e5e63');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const S = mid(A, B);
  const r = dist(A, B) / 2;
  const [X1, X2] = lineCircle(p.a, p.d, S, r).sort((u, w) => u.x - w.x);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  const osa = bisectorArcs(s, 'sol-o', 'sol-a', 'sol-b', A, B);
  s.segment('sol-ab-thin', 'sol-a', 'sol-b', true);
  s.point('sol-s', S, 'S');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.point('sol-x1', X1!, 'X₁');
  s.point('sol-x2', X2!, 'X₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bx1', 'sol-b', 'sol-x1');
  s.segment('sol-x1a', 'sol-x1', 'sol-a');
  s.segment('sol-bx2', 'sol-b', 'sol-x2');
  s.segment('sol-x2a', 'sol-x2', 'sol-a');

  return cumulative(
    s,
    'Úhel AXB je pravý právě tehdy, když bod X leží na Thaletově kružnici nad průměrem AB. Hledané body jsou průsečíky této kružnice s přímkou p — kružnice protne přímku p ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Body, ze kterých je úsečka AB vidět pod pravým úhlem, leží na Thaletově kružnici nad průměrem AB. Její střed je střed úsečky AB. Sestrojte osu úsečky AB; její průsečík s úsečkou AB označte S.',
        points: ['sol-s'],
        shapes: [...osa, 'sol-ab-thin'],
      },
      {
        text: 'Sestrojte Thaletovu kružnici k se středem S a poloměrem |SA|. Prochází body A i B.',
        shapes: ['sol-k'],
      },
      {
        text: 'Bod X leží na kružnici k i na přímce p. Kružnice k protne přímku p ve dvou bodech — označte je X₁ a X₂.',
        points: ['sol-x1', 'sol-x2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABX₁ a ABX₂. Oba mají pravý úhel při vrcholu X, úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bx1', 'sol-x1a', 'sol-bx2', 'sol-x2a'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABX₁', vertices: ['sol-a', 'sol-b', 'sol-x1'] },
        { name: 'trojúhelník ABX₂', vertices: ['sol-a', 'sol-b', 'sol-x2'] },
      ],
    },
  );
}

/** Čtverec ABCD: AB na p, D na q; D je pata kolmice z A na q, B na p ve vzdálenosti |AD| na obě strany. */
function squareBetweenParallelsSolution(): AssignmentModelSolution {
  const g = given('3dff88fd-0008-4471-8626-8c98c4bfadc7');
  const A = g.point('a');
  const p = g.line('p');
  const q = g.line('q');
  const D = foot(A, q.a, q.d);
  const side = dist(A, D);
  const u = unit(p.d);
  const B1 = add(A, mul(u, side));
  const B2 = sub(A, mul(u, side));
  const C1 = add(D, mul(u, side));
  const C2 = sub(D, mul(u, side));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.point('sol-d', D, 'D');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.helperLine('sol-kolm', 'sol-a', 'sol-d');
  s.arc('sol-arc-b1', 'sol-a', 'sol-b1', 0.4);
  s.arc('sol-arc-b2', 'sol-a', 'sol-b2', 0.4);
  s.arc('sol-arc-c1', 'sol-d', 'sol-c1', 0.4);
  s.arc('sol-arc-c2', 'sol-d', 'sol-c2', 0.4);
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c1', 'sol-b1', 'sol-c1');
  s.segment('sol-c1d', 'sol-c1', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c2', 'sol-b2', 'sol-c2');
  s.segment('sol-c2d', 'sol-c2', 'sol-d');

  return cumulative(
    s,
    'Strana AD je kolmá ke straně AB, a tedy k přímce p; vrchol D je proto průsečík kolmice k p bodem A s přímkou q. Délka strany je |AD|, vrchol B leží na p ve vzdálenosti |AD| od A — vlevo nebo vpravo. Vrchol C leží na q ve vzdálenosti |AD| od D. Úloha má dvě řešení.',
    [
      {
        text: 'Ve čtverci je strana AD kolmá ke straně AB, která leží na přímce p. Sestrojte kolmici k přímce p bodem A. Její průsečík s přímkou q je vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-kolm'],
      },
      {
        text: 'Všechny strany čtverce mají délku |AD|. Vrchol B leží na přímce p ve vzdálenosti |AD| od bodu A. Naneste kružítkem vzdálenost |AD| od bodu A na přímku p na obě strany — dostanete body B₁ a B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-arc-b1', 'sol-arc-b2'],
      },
      {
        text: 'Strana DC je rovnoběžná se stranou AB, leží proto na přímce q, a platí |DC| = |AD|. Naneste vzdálenost |AD| od bodu D na přímku q na stejné strany jako u bodů B₁, B₂ — dostanete vrcholy C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Narýsujte čtverce AB₁C₁D a AB₂C₂D. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-b1c1', 'sol-c1d', 'sol-da', 'sol-ab2', 'sol-b2c2', 'sol-c2d'],
      },
    ],
    {
      figures: [
        { name: 'čtverec AB₁C₁D', vertices: ['sol-a', 'sol-b1', 'sol-c1', 'sol-d'] },
        { name: 'čtverec AB₂C₂D', vertices: ['sol-a', 'sol-b2', 'sol-c2', 'sol-d'] },
      ],
    },
  );
}

/** Rovnostranný trojúhelník ABC s B, C na p: výška AP a úhel 30° od ní (osa úhlu 60° z rovnostranného APE). */
function equilateralOnLineSolution(): AssignmentModelSolution {
  const g = given('a3d3599b-fc00-4380-a137-351b9856bf91');
  const A = g.point('a');
  const p = g.line('p');
  const P = foot(A, p.a, p.d);
  const E = [rotate(P, A, Math.PI / 3), rotate(P, A, -Math.PI / 3)].sort(
    (u, w) => dot(sub(w, A), p.d) - dot(sub(u, A), p.d),
  )[0]!;
  const M = mid(P, E);
  const B = lineLine(A, sub(M, A), p.a, p.d);
  const C = sub(mul(P, 2), B);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.point('sol-pp', P, 'P');
  s.point('sol-e', E, 'E');
  s.point('sol-m', M, 'M');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-kolm', 'sol-a', 'sol-pp');
  s.arc('sol-arc-ea', 'sol-a', 'sol-e', 0.4);
  s.arc('sol-arc-ep', 'sol-pp', 'sol-e', 0.4);
  s.segment('sol-ae', 'sol-a', 'sol-e', true);
  s.segment('sol-pe', 'sol-pp', 'sol-e', true);
  const osa = bisectorArcs(s, 'sol-o', 'sol-pp', 'sol-e', P, E);
  s.helperLine('sol-am', 'sol-a', 'sol-b');
  s.arc('sol-arc-c', 'sol-pp', 'sol-c', 0.5);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Výška AP rovnostranného trojúhelníku je kolmá k přímce p a půlí úhel při vrcholu A, strany AB a AC s ní proto svírají úhel 30°. Úhel 30° sestrojíte jako polovinu úhlu 60° z rovnostranného trojúhelníku APE. Vrchol C je obraz vrcholu B v osové souměrnosti s osou AP.',
    [
      {
        text: 'Vrcholy B, C leží na přímce p, výška z vrcholu A je proto kolmá k přímce p. Sestrojte kolmici k přímce p bodem A a její průsečík s p označte P. V rovnostranném trojúhelníku je P střed strany BC a výška AP půlí úhel BAC.',
        points: ['sol-pp'],
        shapes: ['sol-kolm'],
      },
      {
        text: 'Úhel BAC má 60°, strana AB proto svírá s výškou AP úhel 30°. Nejprve sestrojte úhel 60°: oblouky se středy A a P a poloměrem |AP| se protnou v bodě E. Trojúhelník APE je rovnostranný, úhel PAE má 60°.',
        points: ['sol-e'],
        shapes: ['sol-arc-ea', 'sol-arc-ep', 'sol-ae', 'sol-pe'],
      },
      {
        text: 'Úhel 30° je polovina úhlu PAE. Osa úhlu PAE v rovnostranném trojúhelníku APE prochází středem M strany PE — sestrojte ho osou úsečky PE. Polopřímka AM svírá s AP úhel 30° a protne přímku p ve vrcholu B.',
        points: ['sol-m', 'sol-b'],
        shapes: [...osa, 'sol-am'],
      },
      {
        text: 'Přímka AP je osou souměrnosti trojúhelníku ABC, vrchol C je proto obraz vrcholu B: leží na přímce p a |PC| = |PB|. Naneste kružítkem vzdálenost |PB| od bodu P na druhou stranu a označte C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Úloha má jedno řešení (vrcholy B a C lze pojmenovat i obráceně).',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      // B i C leží na přímce p — prohozením písmen vznikne tentýž rovnostranný trojúhelník.
      interchangeable: [['sol-b', 'sol-c']],
    },
  );
}

/** Pravoúhlý trojúhelník nad přeponou AB s výškou 2 cm: Thaletova kružnice ∩ rovnoběžka s AB v polorovině ABM. */
function rightTriangleHeightSolution(): AssignmentModelSolution {
  const g = given('75c7a4c0-1416-44e2-a989-26d2b1443bf2');
  const A = g.point('a');
  const B = g.point('b');
  const Mm = g.point('m');
  const S = mid(A, B);
  const r = dist(A, B) / 2;
  const u = unit(sub(B, A));
  let n = unit(perp(u));
  if (dot(sub(Mm, S), n) < 0) n = mul(n, -1);
  const Q = add(S, mul(n, 100)); // výška 2 cm = 100 px
  const [C1, C2] = lineCircle(Q, u, S, r).sort((a, b) => a.x - b.x);
  const R1 = sub(Q, mul(u, r + 60));
  const R2 = add(Q, mul(u, r + 60));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  const osa = bisectorArcs(s, 'sol-o', 'sol-a', 'sol-b', A, B);
  s.point('sol-s', S, 'S');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.point('sol-q', Q, 'Q');
  s.ref('sol-r1', R1);
  s.ref('sol-r2', R2);
  // Osa úsečky AB je zároveň kolmice k AB bodem S — na ní se nanáší výška.
  s.helperLine('sol-kolm', 'sol-o-z1', 'sol-o-z2');
  s.arc('sol-arc-q', 'sol-s', 'sol-q', 0.4);
  s.helperLine('sol-r', 'sol-r1', 'sol-r2', 'r');
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Vrchol C pravého úhlu leží na Thaletově kružnici nad přeponou AB. Výška vc je vzdálenost vrcholu C od přímky AB, C proto leží na rovnoběžce s AB ve vzdálenosti 2 cm v polorovině ABM. Rovnoběžka protne Thaletovu kružnici ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Trojúhelník ABC má pravý úhel při vrcholu C, vrchol C proto leží na Thaletově kružnici nad průměrem AB. Sestrojte osu úsečky AB, její průsečík s AB je střed S. Narýsujte kružnici k se středem S a poloměrem |SA|.',
        points: ['sol-s'],
        shapes: [...osa.filter(id => id !== 'sol-o-osa'), 'sol-kolm', 'sol-k'],
      },
      {
        text: 'Výška vc je vzdálenost vrcholu C od přímky AB, musí měřit 2 cm. Osa úsečky AB je k přímce AB kolmá. Naneste na ni od bodu S do poloroviny ABM vzdálenost 2 cm a dostanete bod Q.',
        points: ['sol-q'],
        shapes: ['sol-arc-q'],
      },
      {
        text: 'Všechny body poloroviny ABM, které mají od přímky AB vzdálenost 2 cm, leží na rovnoběžce s AB. Sestrojte bodem Q rovnoběžku r s úsečkou AB.',
        shapes: ['sol-r'],
      },
      {
        text: 'Vrchol C leží na kružnici k i na přímce r. Průsečíky označte C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc1', 'sol-c1a', 'sol-bc2', 'sol-c2a'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC₁', vertices: ['sol-a', 'sol-b', 'sol-c1'] },
        { name: 'trojúhelník ABC₂', vertices: ['sol-a', 'sol-b', 'sol-c2'] },
      ],
    },
  );
}

export const GRADE9_STYLE_SOLUTIONS_C: [string, () => AssignmentModelSolution][] = [
  ['eb989d60-d80e-49ef-a012-da8378c440d5', segmentWithMidpointSolution],
  ['2fade1e1-0466-4cc2-8851-20cd375e5e63', rightAngleOnLineSolution],
  ['3dff88fd-0008-4471-8626-8c98c4bfadc7', squareBetweenParallelsSolution],
  ['a3d3599b-fc00-4380-a137-351b9856bf91', equilateralOnLineSolution],
  ['75c7a4c0-1416-44e2-a989-26d2b1443bf2', rightTriangleHeightSolution],
];
