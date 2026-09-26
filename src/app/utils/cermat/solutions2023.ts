/** Vzorová řešení úloh 9 a 10 z JPZ 2023 (data v `data2023.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, len, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Bod na kružnici (střed `c`, poloměr `r`) uprostřed mezi směry k bodům `p` a `q` — střed oblouku kružítka. */
function arcMid(c: V, r: number, p: V, q: V): V {
  return add(c, mul(unit(add(unit(sub(p, c)), unit(sub(q, c)))), r));
}

/** Úhel mezi směry z bodu `c` k bodům `p` a `q` (rad). */
function angleAt(c: V, p: V, q: V): number {
  const u = sub(p, c);
  const w = sub(q, c);
  return Math.acos(Math.max(-1, Math.min(1, dot(u, w) / (len(u) * len(w)))));
}

/** 2023, 1. řádný termín, úloha 9: obdélník ABCD z vrcholů A, C a bodu M na úhlopříčce BD. */
function rectangleDiagonalPointSolution(): AssignmentModelSolution {
  const g = given('63de8400-89fe-4b62-b87c-3cde2a240cd7');
  const A = g.point('a');
  const C = g.point('c');
  const M = g.point('m');
  const S = mid(A, C);
  const r = dist(S, A);
  const dir = sub(M, S);
  const hits = lineCircle(S, dir, S, r);
  const D = hits.find(q => dot(sub(q, S), dir) > 0)!;
  const B = hits.find(q => dot(sub(q, S), dir) < 0)!;

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.ref('sol-m', M);
  s.point('sol-s', S, 'S');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.helperLine('sol-sm', 'sol-s', 'sol-m');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky obdélníku se půlí a jsou stejně dlouhé. Střed S úsečky AC je proto i středem úhlopříčky BD, která leží na přímce SM. Vrcholy B a D leží na kružnici se středem S a poloměrem |SA|, tedy v průsečících této kružnice s přímkou SM.',
    [
      {
        text: 'Úhlopříčky obdélníku se navzájem půlí. Střed úhlopříčky AC je proto zároveň středem úhlopříčky BD. Sestrojte úsečku AC a její střed S.',
        points: ['sol-s'],
        shapes: ['sol-ac-thin'],
      },
      {
        text: 'Úhlopříčka BD prochází středem S a bodem M. Sestrojte přímku SM — na ní leží vrcholy B a D.',
        shapes: ['sol-sm'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé, takže |SB| = |SD| = |SA|. Sestrojte kružnici k se středem S a poloměrem |SA|. Protne přímku SM ve vrcholech B a D.',
        points: ['sol-b', 'sol-d'],
        shapes: ['sol-k'],
      },
      {
        text: 'Narýsujte obdélník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      // B a D leží oba na přímce SM — prohozením vznikne pořád obdélník ABCD.
      interchangeable: [['sol-b', 'sol-d']],
    },
  );
}

/** 2023, 1. řádný termín, úloha 10: rovnoramenný ABC se základnou AB na přímce AP, B a C na kružnici k. */
function isoscelesOnCircleSolution(): AssignmentModelSolution {
  const g = given('d55973f1-c0d3-49c7-9345-57456cc64806');
  const A = g.point('a');
  const P = g.point('p');
  const k = g.circle('k');
  const hits = lineCircle(A, sub(P, A), k.c, k.r).sort((p, q) => dist(q, A) - dist(p, A));
  const B = hits[0]!; // vzdálenější průsečík
  const Bs = hits[1]!; // bližší průsečík B*
  const n = perp(sub(B, A));
  const M = mid(A, B);
  const [C1, C2] = lineCircle(M, n, k.c, k.r).sort((p, q) => p.y - q.y);
  const Ms = mid(A, Bs);
  const Ms1 = add(Ms, mul(unit(n), 150));
  const Ms2 = sub(Ms, mul(unit(n), 150));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-m', M);
  s.ref('sol-ms1', Ms1);
  s.ref('sol-ms2', Ms2);
  s.point('sol-b', B, 'B');
  s.point('sol-bs', Bs, 'B*');
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.helperLine('sol-ap', 'sol-a', 'sol-b');
  s.helperLine('sol-os', 'sol-ms1', 'sol-ms2', 'o*');
  s.helperLine('sol-o', 'sol-c1', 'sol-c2', 'o');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Vrchol B leží na přímce AP i na kružnici k — přímka AP protne k v bodech B a B*. Hlavní vrchol C leží na ose základny a zároveň na k. Osa úsečky AB* kružnici k neprotne, osa úsečky AB ji protne ve dvou bodech C₁ a C₂. Úloha má dvě řešení.',
    [
      {
        text: 'Základna AB leží na přímce AP a vrchol B leží na kružnici k. Sestrojte přímku AP. Protne kružnici k ve dvou bodech — označte je B a B* (B* je blíž bodu A). Oba mohou být vrcholem B.',
        points: ['sol-b', 'sol-bs'],
        shapes: ['sol-ap'],
      },
      {
        text: 'Trojúhelník je rovnoramenný se základnou AB, jeho hlavní vrchol C proto leží na ose základny. Sestrojte osu o* úsečky AB*. Kružnici k neprotne, s bodem B* tedy řešení nevznikne.',
        shapes: ['sol-os'],
      },
      {
        text: 'Sestrojte osu o úsečky AB. Vrchol C leží na ose o i na kružnici k. Osa protne kružnici ve dvou bodech — označte je C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-o'],
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

/** 2023, 2. řádný termín, úloha 9: rovnoramenný lichoběžník se základnou AB a středem S ramene AD. */
function isoscelesTrapezoidSolution(): AssignmentModelSolution {
  const g = given('2002b117-0ea6-44f7-bbee-3effd363a033');
  const A = g.point('a');
  const B = g.point('b');
  const S = g.point('s');
  const D = sub(mul(S, 2), A);
  const M = mid(A, B);
  const n = perp(sub(B, A));
  const X = lineLine(D, sub(B, A), M, n);
  const C = sub(mul(X, 2), D);
  const oEnd = add(M, mul(unit(sub(X, M)), dist(X, M) + 60));
  const oStart = sub(M, mul(unit(sub(X, M)), 60));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-s', S);
  s.ref('sol-x', X);
  s.ref('sol-o1', oStart);
  s.ref('sol-o2', oEnd);
  s.point('sol-d', D, 'D');
  s.point('sol-c', C, 'C');
  s.segment('sol-ad-thin', 'sol-a', 'sol-d', true);
  s.arc('sol-arc-d', 'sol-s', 'sol-d');
  s.helperLine('sol-o', 'sol-o1', 'sol-o2', 'o');
  s.helperLine('sol-par', 'sol-d', 'sol-c');
  s.arc('sol-arc-c', 'sol-x', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Vrchol D je obraz bodu A ve středové souměrnosti se středem S. Rovnoramenný lichoběžník je souměrný podle osy základny AB, vrchol C je proto obraz vrcholu D v osové souměrnosti s osou o úsečky AB; leží na rovnoběžce s AB vedené bodem D.',
    [
      {
        text: 'Bod S je střed ramene AD, vrchol D proto leží na polopřímce AS a |SD| = |AS|. Naneste vzdálenost |AS| za bod S a označte D.',
        points: ['sol-d'],
        shapes: ['sol-ad-thin', 'sol-arc-d'],
      },
      {
        text: 'Rovnoramenný lichoběžník je souměrný podle osy své základny. Sestrojte osu o úsečky AB.',
        shapes: ['sol-o'],
      },
      {
        text: 'Základna CD je rovnoběžná se základnou AB. Bodem D veďte rovnoběžku s AB. Vrchol C je obraz bodu D podle osy o: leží na rovnoběžce za osou ve stejné vzdálenosti od osy jako D. Naneste ji kružítkem a označte C.',
        points: ['sol-c'],
        shapes: ['sol-par', 'sol-arc-c'],
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

/** 2023, 2. řádný termín, úloha 10: pravoúhlý ABC vepsaný do kružnice k, jedna strana prochází bodem Q. */
function rightTriangleInCircleSolution(): AssignmentModelSolution {
  const g = given('26098805-0b3a-4215-bd7b-099e20d76e02');
  const C = g.point('c');
  const Q = g.point('q');
  const k = g.circle('k');
  const S = k.c;
  const B1 = lineCircle(C, sub(Q, C), S, k.r).sort((p, q) => dist(q, C) - dist(p, C))[0]!;
  const A1 = sub(mul(S, 2), B1);
  const dir = sub(Q, S);
  const hits = lineCircle(S, dir, S, k.r);
  const B2 = hits.find(q => dot(sub(q, S), dir) > 0)!;
  const A2 = hits.find(q => dot(sub(q, S), dir) < 0)!;

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-s', S);
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-a1', A1, 'A₁');
  s.point('sol-a2', A2, 'A₂');
  s.point('sol-b2', B2, 'B₂');
  s.helperLine('sol-cq', 'sol-c', 'sol-b1');
  s.segment('sol-b1a1-thin', 'sol-b1', 'sol-a1', true);
  s.helperLine('sol-sq', 'sol-a2', 'sol-b2');
  s.segment('sol-a1b1', 'sol-a1', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-ca1', 'sol-c', 'sol-a1');
  s.segment('sol-a2b2', 'sol-a2', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');
  s.segment('sol-ca2', 'sol-c', 'sol-a2');

  return cumulative(
    s,
    'Všechny vrcholy leží na kružnici k a úhel při C je pravý, podle Thaletovy věty je proto přepona AB průměrem kružnice k. Bodem Q prochází buď odvěsna (přímka CQ protne k ve vrcholu B₁, A₁ je druhý konec průměru), nebo přepona (přímka SQ protne k ve vrcholech A₂, B₂). Úloha má dvě řešení.',
    [
      {
        text: 'Vrcholy A, B, C leží na kružnici k a úhel při vrcholu C je pravý. Podle Thaletovy věty je přepona AB průměrem kružnice k — prochází středem S. První možnost: bodem Q prochází odvěsna. Sestrojte přímku CQ. Protne kružnici k ještě v jednom bodě — vrcholu B₁.',
        points: ['sol-b1'],
        shapes: ['sol-cq'],
      },
      {
        text: 'Přepona A₁B₁ je průměr kružnice k. Veďte z bodu B₁ úsečku přes střed S až na kružnici — druhý konec průměru je vrchol A₁.',
        points: ['sol-a1'],
        shapes: ['sol-b1a1-thin'],
      },
      {
        text: 'Druhá možnost: bodem Q prochází přepona AB. Přepona je průměr, leží proto na přímce SQ. Sestrojte přímku SQ. Protne kružnici k ve vrcholech A₂ a B₂.',
        points: ['sol-a2', 'sol-b2'],
        shapes: ['sol-sq'],
      },
      {
        text: 'Narýsujte trojúhelníky A₁B₁C a A₂B₂C. Úloha má dvě řešení.',
        shapes: ['sol-a1b1', 'sol-b1c', 'sol-ca1', 'sol-a2b2', 'sol-b2c', 'sol-ca2'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník A₁B₁C', vertices: ['sol-a1', 'sol-b1', 'sol-c'] },
        { name: 'trojúhelník A₂B₂C', vertices: ['sol-a2', 'sol-b2', 'sol-c'] },
      ],
      // Vrcholy A a B jsou konce průměru — prohozením vznikne pořád trojúhelník ABC.
      interchangeable: [
        ['sol-a1', 'sol-b1'],
        ['sol-a2', 'sol-b2'],
      ],
    },
  );
}

/** 2023, 1. náhradní termín, úloha 9: pravoúhlý lichoběžník ABCD, C na p, |AC| = |AB|. */
function rightTrapezoidSolution(): AssignmentModelSolution {
  const g = given('425e5407-78a3-44dd-94b5-c75e56cc0b19');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const r = dist(A, B);
  const C = lineCircle(p.a, p.d, A, r).sort((x, y) => dist(y, B) - dist(x, B))[0]!;
  const ab = sub(B, A);
  const D1 = lineLine(C, ab, A, perp(ab));
  const D2 = lineLine(A, p.d, C, perp(p.d));
  const rim = arcMid(A, r, B, C);
  const span = angleAt(A, B, C) + 0.25;

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-rim', rim);
  s.point('sol-c', C, 'C');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.arc('sol-arc-c', 'sol-a', 'sol-rim', span);
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-d1');
  s.helperLine('sol-par-c', 'sol-c', 'sol-d1');
  s.helperLine('sol-par-a', 'sol-a', 'sol-d2');
  s.helperLine('sol-kolmice-c', 'sol-c', 'sol-d2');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd1', 'sol-c', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-cd2', 'sol-c', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'Vrchol C leží na kružnici se středem A a poloměrem |AB| a na přímce p. Pravý úhel nemůže být při vrcholu B, proto buď AB ∥ CD s pravými úhly při A a D, nebo BC ∥ AD s pravými úhly při C a D. Úloha má dvě řešení.',
    [
      {
        text: 'Úhlopříčka AC je stejně dlouhá jako strana AB, vrchol C proto leží na kružnici se středem A a poloměrem |AB|. Ta protne přímku p v bodě B a ještě v jednom bodě — to je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Strana BC leží na přímce p, která není kolmá k AB, pravý úhel proto nemůže být při vrcholu B. První možnost: základny AB a CD a pravé úhly při vrcholech A a D. Sestrojte kolmici k přímce AB v bodě A a rovnoběžku s AB bodem C. Jejich průsečík je vrchol D₁.',
        points: ['sol-d1'],
        shapes: ['sol-kolmice-a', 'sol-par-c'],
      },
      {
        text: 'Druhá možnost: základny BC a AD a pravé úhly při vrcholech C a D. Sestrojte kolmici k přímce p v bodě C a rovnoběžku s přímkou p bodem A. Jejich průsečík je vrchol D₂.',
        points: ['sol-d2'],
        shapes: ['sol-kolmice-c', 'sol-par-a'],
      },
      {
        text: 'Narýsujte lichoběžníky ABCD₁ a ABCD₂. Úloha má dvě řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd1', 'sol-d1a', 'sol-cd2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'lichoběžník ABCD₁', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d1'] },
        { name: 'lichoběžník ABCD₂', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d2'] },
      ],
    },
  );
}

/** 2023, 1. náhradní termín, úloha 10: rovnoramenný ABC se základnou AC, na p leží výška z C. */
function isoscelesHeightSolution(): AssignmentModelSolution {
  const g = given('c53c736c-a778-45af-bedb-8978ff15d68d');
  const A = g.point('a');
  const C = g.point('c');
  const p = g.line('p');
  const M = mid(A, C);
  const n = unit(perp(sub(C, A)));
  const B = lineLine(A, perp(p.d), M, n);
  const R = dist(A, C) * 0.7;
  const h = Math.sqrt(R * R - (dist(A, C) / 2) ** 2);
  const X1 = add(M, mul(n, h));
  const X2 = sub(M, mul(n, h));
  // Konce osy o: kousek za průsečíky oblouků a za vrcholem B.
  const toB = dot(sub(B, M), n) > 0 ? 1 : -1;
  const far = add(B, mul(n, 60 * toB));
  const near = sub(toB > 0 ? X2 : X1, mul(n, 40 * toB));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.ref('sol-near', near);
  s.ref('sol-far', far);
  s.ref('sol-f', foot(A, p.a, p.d));
  s.point('sol-b', B, 'B');
  s.arc('sol-arc-a1', 'sol-a', 'sol-x1', 0.35);
  s.arc('sol-arc-a2', 'sol-a', 'sol-x2', 0.35);
  s.arc('sol-arc-c1', 'sol-c', 'sol-x1', 0.35);
  s.arc('sol-arc-c2', 'sol-c', 'sol-x2', 0.35);
  s.line('sol-o', 'sol-near', 'sol-far', 'o');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-f');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Osa souměrnosti rovnoramenného trojúhelníku se základnou AC je osa o úsečky AC a leží na ní vrchol B. Přímkou p prochází výška z vrcholu C, strana AB je proto kolmá k přímce p. Vrchol B je průsečík kolmice k p vedené bodem A s osou o.',
    [
      {
        text: '10.1 Rovnoramenný trojúhelník se základnou AC je souměrný podle osy základny. Sestrojte osu úsečky AC: z bodů A a C opište oblouky se stejným poloměrem a jejich průsečíky proložte přímku. Označte ji o.',
        shapes: ['sol-arc-a1', 'sol-arc-a2', 'sol-arc-c1', 'sol-arc-c2', 'sol-o'],
      },
      {
        text: '10.2 Přímka p prochází vrcholem C, leží na ní proto výška z vrcholu C. Ta je kolmá ke straně AB, strana AB je tedy kolmá k přímce p. Sestrojte kolmici k přímce p bodem A.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Vrchol B leží na kolmici i na ose o. Průsečík obou přímek označte B.',
        points: ['sol-b'],
      },
      {
        text: 'Narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      lines: [{ name: 'o', p1Id: 'sol-near', p2Id: 'sol-far' }],
    },
  );
}

/** 2023, 2. náhradní termín, úloha 9: čtverec ABCD se stranou AB na a; dva z bodů P, Q, R uvnitř stran. */
function squareThreePointsSolution(): AssignmentModelSolution {
  const g = given('fee7ba52-1602-4736-9f91-90f1187d09de');
  const P = g.point('p');
  const Q = g.point('q');
  const R = g.point('r');
  const a = g.line('a');
  const u0 = unit(a.d);
  const heightOf = (X: V) => dot(sub(X, a.a), perp(u0));
  // Normála k přímce a směrem k bodům, směr u tak, aby bod Q byl od P „doprava“.
  const n = heightOf(P) > 0 ? perp(u0) : mul(perp(u0), -1);
  const u = dot(sub(Q, P), u0) > 0 ? u0 : mul(u0, -1);
  const h = (X: V) => dot(sub(X, a.a), n);

  // 1. řešení: P uvnitř AD, Q uvnitř CD (R vně).
  const A1 = foot(P, a.a, a.d);
  const s1 = h(Q);
  const B1 = add(A1, mul(u, s1));
  const D1 = add(A1, mul(n, s1));
  const C1 = add(B1, mul(n, s1));
  // 2. řešení: Q uvnitř AD, R uvnitř BC (P vně).
  const A2 = foot(Q, a.a, a.d);
  const B2 = foot(R, a.a, a.d);
  const s2 = dist(A2, B2);
  const D2 = add(A2, mul(n, s2));
  const C2 = add(B2, mul(n, s2));
  const rim1 = add(A1, mul(unit(add(u, n)), s1));
  const rim2 = add(A2, mul(unit(add(u, n)), s2));

  const s = new Board();
  s.ref('sol-rim1', rim1);
  s.ref('sol-rim2', rim2);
  s.ref('sol-p', P);
  s.ref('sol-q', Q);
  s.ref('sol-r', R);
  s.ref('sol-b1n', add(B1, n));
  s.ref('sol-d2u', add(D2, u));
  s.point('sol-a1', A1, 'A₁');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-a2', A2, 'A₂');
  s.point('sol-b2', B2, 'B₂');
  s.point('sol-c2', C2, 'C₂');
  s.point('sol-d2', D2, 'D₂');
  s.helperLine('sol-kolmice-p', 'sol-a1', 'sol-p');
  s.helperLine('sol-par-q', 'sol-d1', 'sol-q');
  s.arc('sol-arc-b1', 'sol-a1', 'sol-rim1', Math.PI / 2 + 0.2);
  s.helperLine('sol-kolmice-b1', 'sol-b1', 'sol-b1n');
  s.helperLine('sol-kolmice-q', 'sol-a2', 'sol-q');
  s.helperLine('sol-kolmice-r', 'sol-b2', 'sol-r');
  s.arc('sol-arc-d2', 'sol-a2', 'sol-rim2', Math.PI / 2 + 0.2);
  s.helperLine('sol-par-d2', 'sol-d2', 'sol-d2u');
  s.segment('sol-a1b1', 'sol-a1', 'sol-b1');
  s.segment('sol-b1c1', 'sol-b1', 'sol-c1');
  s.segment('sol-c1d1', 'sol-c1', 'sol-d1');
  s.segment('sol-d1a1', 'sol-d1', 'sol-a1');
  s.segment('sol-a2b2', 'sol-a2', 'sol-b2');
  s.segment('sol-b2c2', 'sol-b2', 'sol-c2');
  s.segment('sol-c2d2', 'sol-c2', 'sol-d2');
  s.segment('sol-d2a2', 'sol-d2', 'sol-a2');

  return cumulative(
    s,
    'Strany AD a BC čtverce jsou kolmé k přímce a, strana CD je s ní rovnoběžná. Vyhovují dvě dvojice bodů: P na straně AD a Q na straně CD (R je vně), nebo Q na straně AD a R na straně BC (P je vně). Úloha má dvě řešení.',
    [
      {
        text: 'Strana AB leží na přímce a, strany AD a BC jsou k ní kolmé a strana CD je s ní rovnoběžná. První možnost: bod P leží uvnitř strany AD a bod Q uvnitř strany CD. Sestrojte kolmici k přímce a bodem P — její pata je vrchol A₁ — a rovnoběžku s přímkou a bodem Q. Jejich průsečík je vrchol D₁.',
        points: ['sol-a1', 'sol-d1'],
        shapes: ['sol-kolmice-p', 'sol-par-q'],
      },
      {
        text: 'Strana čtverce má délku |A₁D₁|. Kružnicí se středem A₁ a tímto poloměrem najděte na přímce a vrchol B₁. Kolmice k přímce a v bodě B₁ protne rovnoběžku ve vrcholu C₁. Bod R leží vně čtverce A₁B₁C₁D₁.',
        points: ['sol-b1', 'sol-c1'],
        shapes: ['sol-arc-b1', 'sol-kolmice-b1'],
      },
      {
        text: 'Druhá možnost: bod Q leží uvnitř strany AD a bod R uvnitř strany BC. Sestrojte kolmice k přímce a body Q a R. Jejich paty jsou vrcholy A₂ a B₂.',
        points: ['sol-a2', 'sol-b2'],
        shapes: ['sol-kolmice-q', 'sol-kolmice-r'],
      },
      {
        text: 'Strana čtverce má délku |A₂B₂|. Kružnicí se středem A₂ a tímto poloměrem najděte na kolmici bodem Q vrchol D₂. Rovnoběžka s přímkou a bodem D₂ protne kolmici bodem R ve vrcholu C₂. Bod P leží vně čtverce A₂B₂C₂D₂.',
        points: ['sol-d2', 'sol-c2'],
        shapes: ['sol-arc-d2', 'sol-par-d2'],
      },
      {
        text: 'Ostatní dvojice bodů nevyhovují — bod by nebyl uvnitř strany, nebo by třetí bod ležel uvnitř čtverce. Narýsujte čtverce A₁B₁C₁D₁ a A₂B₂C₂D₂. Úloha má dvě řešení.',
        shapes: [
          'sol-a1b1', 'sol-b1c1', 'sol-c1d1', 'sol-d1a1',
          'sol-a2b2', 'sol-b2c2', 'sol-c2d2', 'sol-d2a2',
        ],
      },
    ],
    {
      figures: [
        { name: 'čtverec A₁B₁C₁D₁', vertices: ['sol-a1', 'sol-b1', 'sol-c1', 'sol-d1'] },
        { name: 'čtverec A₂B₂C₂D₂', vertices: ['sol-a2', 'sol-b2', 'sol-c2', 'sol-d2'] },
      ],
      // Čtverec lze pojmenovat i zrcadlově (A vpravo, B vlevo) — prohodí se A↔B a C↔D.
      interchangeable: [
        ['sol-a1', 'sol-b1'],
        ['sol-c1', 'sol-d1'],
        ['sol-a2', 'sol-b2'],
        ['sol-c2', 'sol-d2'],
      ],
    },
  );
}

/** 2023, 2. náhradní termín, úloha 10: pravoúhlý ABC (pravý úhel při A), B na b, C na c, úhel při C 40°. */
function rightTriangle40Solution(): AssignmentModelSolution {
  const g = given('1590f78d-6718-4a8a-a1df-65a2db988905');
  const A = g.point('a');
  const b = g.line('b');
  const c = g.line('c');
  const C = lineLine(A, perp(b.d), c.a, c.d);
  const rad = (40 * Math.PI) / 180;
  const Br = lineLine(C, sub(rotate(A, C, rad), C), b.a, b.d);
  const Bl = lineLine(C, sub(rotate(A, C, -rad), C), b.a, b.d);
  const [B1, B2] = [Br, Bl].sort((p, q) => q.x - p.x);
  const r = 45;
  const onCA = add(C, mul(unit(sub(A, C)), r));
  const rim1 = arcMid(C, r, onCA, B1!);
  const rim2 = arcMid(C, r, onCA, B2!);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-rim1', rim1);
  s.ref('sol-rim2', rim2);
  s.point('sol-c', C, 'C');
  s.point('sol-b1', B1!, 'B₁');
  s.point('sol-b2', B2!, 'B₂');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-c');
  s.helperLine('sol-rameno1', 'sol-c', 'sol-b1');
  s.arc('sol-uhel1', 'sol-c', 'sol-rim1', rad);
  s.helperLine('sol-rameno2', 'sol-c', 'sol-b2');
  s.arc('sol-uhel2', 'sol-c', 'sol-rim2', rad);
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');

  return cumulative(
    s,
    'Strana AB leží na přímce b a pravý úhel při A znamená, že strana AC je k b kolmá: vrchol C je průsečík kolmice k b v bodě A s přímkou c. Úhel 40° při vrcholu C naneseme od polopřímky CA na obě strany, ramena protnou přímku b ve vrcholech B₁ a B₂. Úloha má dvě řešení.',
    [
      {
        text: 'Vrcholy A a B leží na přímce b, strana AB proto leží na b. Úhel při vrcholu A je pravý, strana AC je tedy k přímce b kolmá. Sestrojte kolmici k přímce b v bodě A. Protne přímku c ve vrcholu C.',
        points: ['sol-c'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Vnitřní úhel při vrcholu C má velikost 40°. Naneste při vrcholu C od polopřímky CA úhel 40° na jednu stranu. Jeho rameno protne přímku b ve vrcholu B₁.',
        points: ['sol-b1'],
        shapes: ['sol-uhel1', 'sol-rameno1'],
      },
      {
        text: 'Úhel 40° naneste od polopřímky CA i na druhou stranu. Rameno protne přímku b ve vrcholu B₂.',
        points: ['sol-b2'],
        shapes: ['sol-uhel2', 'sol-rameno2'],
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

export const CERMAT_SOLUTIONS_2023: [string, () => AssignmentModelSolution][] = [
  ['63de8400-89fe-4b62-b87c-3cde2a240cd7', rectangleDiagonalPointSolution],
  ['d55973f1-c0d3-49c7-9345-57456cc64806', isoscelesOnCircleSolution],
  ['2002b117-0ea6-44f7-bbee-3effd363a033', isoscelesTrapezoidSolution],
  ['26098805-0b3a-4215-bd7b-099e20d76e02', rightTriangleInCircleSolution],
  ['425e5407-78a3-44dd-94b5-c75e56cc0b19', rightTrapezoidSolution],
  ['c53c736c-a778-45af-bedb-8978ff15d68d', isoscelesHeightSolution],
  ['fee7ba52-1602-4736-9f91-90f1187d09de', squareThreePointsSolution],
  ['1590f78d-6718-4a8a-a1df-65a2db988905', rightTriangle40Solution],
];
