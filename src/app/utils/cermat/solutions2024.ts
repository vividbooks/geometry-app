/** Vzorová řešení úloh 9 a 10 z JPZ 2024 (data v `data2024.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, lineLine, mid, mul, perp, sub, unit } from './board';

/** 2024, 1. řádný termín, úloha 9: rovnostranný ABC, dán vrchol C a střed S strany AB. */
function equilateralMidpointSolution(): AssignmentModelSolution {
  const g = given('925f9c30-3b3e-4f46-9055-6ff8f98aa4c4');
  const C = g.point('c');
  const S = g.point('s');
  const u = unit(perp(sub(C, S)));
  const half = dist(C, S) / Math.sqrt(3); // |AS| = |CS| : √3 (výška rovnostranného trojúhelníku)
  const A = sub(S, mul(u, half));
  const B = add(S, mul(u, half));
  const P1 = sub(S, mul(u, half + 120));
  const P2 = add(S, mul(u, half + 120));
  const X = add(C, mul(sub(A, C), 1.2));

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-s', S, 'S');
  s.ref('sol-p1', P1);
  s.ref('sol-p2', P2);
  s.ref('sol-x', X);
  s.point('sol-a', A, 'A');
  s.point('sol-b', B, 'B');
  s.segment('sol-cs', 'sol-c', 'sol-s', true);
  s.helperLine('sol-p', 'sol-p1', 'sol-p2', 'p');
  s.helperLine('sol-cx', 'sol-c', 'sol-x');
  s.arc('sol-arc-b', 'sol-s', 'sol-b', 0.5);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'V rovnostranném trojúhelníku je úsečka CS výškou, strana AB proto leží na kolmici p k CS vedené bodem S. Úhel ACS je polovina úhlu 60°, tedy 30°: rameno úhlu 30° u vrcholu C protne kolmici p ve vrcholu A. Vrchol B je souměrný s A podle bodu S.',
    [
      {
        text: 'V rovnostranném trojúhelníku je spojnice vrcholu C se středem S protější strany zároveň výškou. Narýsujte úsečku CS a kolmici p k úsečce CS procházející bodem S — na ní leží strana AB.',
        shapes: ['sol-cs', 'sol-p'],
      },
      {
        text: 'Výška CS půlí úhel při vrcholu C. Úhel ACB má 60°, úhel ACS proto 30°. Sestrojte u vrcholu C úhel SCX o velikosti 30°.',
        shapes: ['sol-cx'],
      },
      {
        text: 'Rameno CX protne kolmici p ve vrcholu A. Označte ho.',
        points: ['sol-a'],
      },
      {
        text: 'Bod S je střed strany AB, proto |SB| = |SA|. Naneste kružítkem vzdálenost |SA| od bodu S na druhou stranu kolmice p a označte vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-arc-b'],
      },
      {
        text: 'Narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      // A a B jsou souměrné podle CS — prohozením vznikne pořád trojúhelník ABC.
      interchangeable: [['sol-a', 'sol-b']],
    },
  );
}

/** 2024, 1. řádný termín, úloha 10: obdélník ABCD, B na AE, C na p, |BD| = |AE|. */
function rectangleDiagonalSolution(): AssignmentModelSolution {
  const g = given('74e8bd33-763d-4644-afb2-b607515f45f7');
  const A = g.point('a');
  const E = g.point('e');
  const p = g.line('p');
  const r = dist(A, E);
  const C = lineCircle(p.a, p.d, A, r).sort((q, w) => dist(w, E) - dist(q, E))[0]!;
  const ae = sub(E, A);
  const B = foot(C, A, ae);
  const D = add(A, sub(C, B));
  const Q = add(B, mul(sub(B, C), 0.3));
  const R = add(A, mul(sub(A, D), 0.3));
  const T = add(C, mul(sub(C, D), 0.3));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-e', E, 'E');
  s.ref('sol-q', Q);
  s.ref('sol-r', R);
  s.ref('sol-t', T);
  s.point('sol-c', C, 'C');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.circle('sol-k', 'sol-a', 'sol-e', 'k');
  s.helperLine('sol-kolmice-q', 'sol-c', 'sol-q', 'q');
  s.helperLine('sol-kolmice-r', 'sol-r', 'sol-d', 'r');
  s.helperLine('sol-rovnobezka-s', 'sol-t', 'sol-d', 's');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky obdélníku jsou stejně dlouhé, takže |AC| = |BD| = |AE|: vrchol C leží na kružnici k se středem A a poloměrem |AE| a zároveň na přímce p. Vrchol B je pata kolmice z C na přímku AE a vrchol D doplní obdélník jako průsečík kolmice k AE v bodě A a rovnoběžky s AE bodem C.',
    [
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé, proto |AC| = |BD| = |AE|. Vrchol C je od bodu A vzdálený |AE| — sestrojte kružnici k se středem A a poloměrem |AE|.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol C leží také na přímce p. Kružnice k protne přímku p v bodě E a ještě v jednom bodě — to je vrchol C.',
        points: ['sol-c'],
      },
      {
        text: 'Úhel ABC je pravý a vrchol B leží na přímce AE. Sestrojte kolmici q k přímce AE procházející bodem C. Její průsečík s přímkou AE je vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-kolmice-q'],
      },
      {
        text: 'Strana AD je kolmá k přímce AE a strana CD je s přímkou AE rovnoběžná. Sestrojte kolmici r k přímce AE bodem A a rovnoběžku s s přímkou AE bodem C. Jejich průsečík je vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-kolmice-r', 'sol-rovnobezka-s'],
      },
      {
        text: 'Narýsujte obdélník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'obdélník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** 2024, 2. řádný termín, úloha 9: kosočtverec ABCD, C na přímce OA. */
function rhombusOnLineSolution(): AssignmentModelSolution {
  const g = given('00162934-16bc-4d00-8651-916fc1dcdfb2');
  const A = g.point('a');
  const B = g.point('b');
  const O = g.point('o');
  const side = dist(A, B);
  const dir = sub(A, O);
  const C = lineCircle(O, dir, B, side).sort((q, w) => dist(w, A) - dist(q, A))[0]!;
  const D = sub(add(A, C), B);
  const far = add(C, mul(unit(dir), 60));
  const T = add(C, mul(sub(C, D), 0.4));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-o', O, 'O');
  s.ref('sol-far', far);
  s.ref('sol-t', T);
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-oa', 'sol-o', 'sol-far');
  s.circle('sol-k1', 'sol-b', 'sol-a', 'k₁');
  s.helperLine('sol-rovnobezka', 'sol-t', 'sol-d', 'p');
  s.arc('sol-arc-d', 'sol-c', 'sol-d', 0.5);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Všechny strany kosočtverce jsou stejně dlouhé. Vrchol C leží na přímce OA a zároveň na kružnici se středem B a poloměrem |AB|. Vrchol D leží na rovnoběžce s AB vedené bodem C ve vzdálenosti |AB| od C.',
    [
      {
        text: 'Vrchol C leží na přímce OA. Sestrojte přímku OA.',
        shapes: ['sol-oa'],
      },
      {
        text: 'Kosočtverec má všechny strany stejně dlouhé, proto |BC| = |AB|. Sestrojte kružnici k₁ se středem B a poloměrem |AB|.',
        shapes: ['sol-k1'],
      },
      {
        text: 'Kružnice k₁ protne přímku OA v bodě A a ještě v jednom bodě — to je vrchol C.',
        points: ['sol-c'],
      },
      {
        text: 'Protější strany kosočtverce jsou rovnoběžné: CD ∥ AB a |CD| = |AB|. Sestrojte rovnoběžku p s přímkou AB bodem C a naneste na ni od bodu C vzdálenost |AB| (na stranu bodu A). Dostanete vrchol D.',
        points: ['sol-d'],
        shapes: ['sol-rovnobezka', 'sol-arc-d'],
      },
      {
        text: 'Narýsujte kosočtverec ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'kosočtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** 2024, 2. řádný termín, úloha 10: rovnoramenný KLM se základnou LM, M na kružnici k. */
function isoscelesOnCircleSolution(): AssignmentModelSolution {
  const g = given('80dbbba5-5d59-4e75-840f-96f11a7b3e38');
  const K = g.point('k');
  const L = g.point('l');
  const k = g.circle('k');
  const rad = dist(K, L);
  // Průsečíky kružnic m(K; |KL|) a k: na chordále ve vzdálenosti a od K.
  const d = dist(K, k.c);
  const a = (rad * rad - k.r * k.r + d * d) / (2 * d);
  const h = Math.sqrt(rad * rad - a * a);
  const u = unit(sub(k.c, K));
  const base = add(K, mul(u, a));
  const M1 = add(base, mul(perp(u), h));
  const M2 = sub(base, mul(perp(u), h));
  const [Mr, Ml] = [M1, M2].sort((q, w) => w.x - q.x);

  const s = new Board();
  s.ref('sol-k', K, 'K');
  s.ref('sol-l', L, 'L');
  s.point('sol-m1', Mr!, 'M₁');
  s.point('sol-m2', Ml!, 'M₂');
  s.segment('sol-kl-thin', 'sol-k', 'sol-l', true);
  s.circle('sol-m', 'sol-k', 'sol-l', 'm');
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm1', 'sol-l', 'sol-m1');
  s.segment('sol-m1k', 'sol-m1', 'sol-k');
  s.segment('sol-lm2', 'sol-l', 'sol-m2');
  s.segment('sol-m2k', 'sol-m2', 'sol-k');

  return cumulative(
    s,
    'Základnou je LM, ramena KL a KM jsou tedy stejně dlouhá. Vrchol M leží na kružnici m se středem K a poloměrem |KL| a zároveň na kružnici k. Kružnice se protínají ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Trojúhelník KLM má základnu LM, jeho ramena jsou KL a KM. Narýsujte úsečku KL — rameno trojúhelníku.',
        shapes: ['sol-kl-thin'],
      },
      {
        text: 'Ramena jsou stejně dlouhá, |KM| = |KL|. Vrchol M proto leží na kružnici m se středem K a poloměrem |KL|. Sestrojte ji.',
        shapes: ['sol-m'],
      },
      {
        text: 'Vrchol M leží také na kružnici k. Kružnice m a k se protínají ve dvou bodech — označte je M₁ a M₂.',
        points: ['sol-m1', 'sol-m2'],
      },
      {
        text: 'Narýsujte trojúhelníky KLM₁ a KLM₂. Úloha má dvě řešení.',
        shapes: ['sol-kl', 'sol-lm1', 'sol-m1k', 'sol-lm2', 'sol-m2k'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník KLM₁', vertices: ['sol-k', 'sol-l', 'sol-m1'] },
        { name: 'trojúhelník KLM₂', vertices: ['sol-k', 'sol-l', 'sol-m2'] },
      ],
    },
  );
}

/** 2024, 1. náhradní termín, úloha 9: pravoúhlý lichoběžník ABCD, C a D na kružnici k, E střed BC. */
function rightTrapezoidCircleSolution(): AssignmentModelSolution {
  const g = given('e19e6791-cfbe-441f-aba0-9b6188900a60');
  const A = g.point('a');
  const E = g.point('e');
  const k = g.circle('k');
  const S = k.c;
  const C = sub(mul(S, 2), A);
  const B = sub(mul(E, 2), C);
  const D = lineCircle(A, perp(sub(B, A)), S, k.r).sort((q, w) => dist(w, A) - dist(q, A))[0]!;
  const X = add(A, mul(sub(D, A), 1.2));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S, 'S');
  s.ref('sol-e', E, 'E');
  s.ref('sol-x', X);
  s.point('sol-c', C, 'C');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.segment('sol-cb-thin', 'sol-c', 'sol-b', true);
  s.arc('sol-arc-b', 'sol-e', 'sol-b', 0.5);
  s.helperLine('sol-kolmice', 'sol-a', 'sol-x');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Lichoběžník má pravé úhly při vrcholech A i D, úhel ADC je pravý a podle Thaletovy věty je AC průměr kružnice k — vrchol C leží na polopřímce AS naproti bodu A. Vrchol B je obraz C ve středové souměrnosti se středem E. Vrchol D je druhý průsečík kolmice k AB v bodě A s kružnicí k.',
    [
      {
        text: 'Základny AB a CD jsou rovnoběžné a úhel při vrcholu A je pravý, proto je pravý i úhel ADC. Vrcholy A, D, C leží na kružnici k, podle Thaletovy věty je tedy AC průměr kružnice k. Sestrojte polopřímku AS; protne kružnici k ve vrcholu C.',
        points: ['sol-c'],
        shapes: ['sol-ac-thin'],
      },
      {
        text: 'Bod E je střed ramene BC, vrchol B je proto obraz bodu C ve středové souměrnosti se středem E. Sestrojte polopřímku CE a naneste na ni za bod E vzdálenost |EC|. Dostanete vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-cb-thin', 'sol-arc-b'],
      },
      {
        text: 'Úhel při vrcholu A je pravý. Sestrojte kolmici k úsečce AB procházející bodem A. Kolmice protne kružnici k ve vrcholu D.',
        points: ['sol-d'],
        shapes: ['sol-kolmice'],
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

/** 2024, 1. náhradní termín, úloha 10: rovnoramenný lichoběžník ABCD s osou o, S střed BC. */
function isoscelesTrapezoidAxisSolution(): AssignmentModelSolution {
  const g = given('959f750b-ae45-47e1-98e8-629b7d16ce1c');
  const A = g.point('a');
  const S = g.point('s');
  const o = g.line('o');
  const B = sub(mul(foot(A, o.a, o.d), 2), A);
  const C = sub(mul(S, 2), B);
  const D = sub(mul(foot(C, o.a, o.d), 2), C);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S, 'S');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.point('sol-d', D, 'D');
  s.ref('sol-oa', mid(A, B));
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-b');
  s.arc('sol-arc-b', 'sol-oa', 'sol-b', 0.4);
  s.segment('sol-bc-thin', 'sol-b', 'sol-c', true);
  s.arc('sol-arc-c', 'sol-s', 'sol-c', 0.5);
  s.ref('sol-oc', mid(C, D));
  s.helperLine('sol-kolmice-c', 'sol-c', 'sol-d');
  s.arc('sol-arc-d', 'sol-oc', 'sol-d', 0.4);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Osa souměrnosti o převádí lichoběžník sám na sebe: vrchol B je obraz A a vrchol D je obraz C v osové souměrnosti s osou o. Vrchol C je obraz B ve středové souměrnosti se středem S, protože S je střed strany BC.',
    [
      {
        text: 'Přímka o je osa souměrnosti rovnoramenného lichoběžníku, vrchol B je proto obraz bodu A v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem A a na ní za osou bod B ve stejné vzdálenosti od o jako bod A.',
        points: ['sol-b'],
        shapes: ['sol-kolmice-a', 'sol-arc-b'],
      },
      {
        text: 'Bod S je střed strany BC. Sestrojte polopřímku BS a naneste na ni za bod S vzdálenost |BS|. Dostanete vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-bc-thin', 'sol-arc-c'],
      },
      {
        text: 'Vrchol D je obraz vrcholu C v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem C a na ní za osou bod D ve stejné vzdálenosti od o jako bod C.',
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

/** 2024, 2. náhradní termín, úloha 9: obdélník ABCD se středem S, D na přímce p. */
function rectangleCenterLineSolution(): AssignmentModelSolution {
  const g = given('57f87d7d-f994-4b66-b97b-3abd0dda8010');
  const A = g.point('a');
  const S = g.point('s');
  const p = g.line('p');
  const C = sub(mul(S, 2), A);
  const r = dist(S, A);
  const [D1, D2] = lineCircle(p.a, p.d, S, r).sort((q, w) => q.x - w.x);
  const B1 = sub(mul(S, 2), D1!);
  const B2 = sub(mul(S, 2), D2!);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S, 'S');
  s.point('sol-c', C, 'C');
  s.point('sol-d1', D1!, 'D₁');
  s.point('sol-d2', D2!, 'D₂');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.segment('sol-d1b1-thin', 'sol-d1', 'sol-b1', true);
  s.segment('sol-d2b2-thin', 'sol-d2', 'sol-b2', true);
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
    'Úhlopříčky obdélníku jsou stejně dlouhé a půlí se v bodě S, všechny vrcholy proto leží na kružnici k se středem S a poloměrem |SA|. Vrchol C je obraz A podle S, vrchol D je průsečík kružnice k s přímkou p a vrchol B obraz D podle S. Přímka p protne kružnici ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Bod S je střed úhlopříčky AC. Sestrojte polopřímku AS a naneste na ni za bod S vzdálenost |AS|. Dostanete vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-ac-thin'],
      },
      {
        text: 'Úhlopříčky obdélníku jsou stejně dlouhé a půlí se, všechny vrcholy jsou tedy od bodu S stejně daleko. Sestrojte kružnici k se středem S a poloměrem |SA| (je to Thaletova kružnice nad průměrem AC).',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol D leží na kružnici k i na přímce p. Kružnice k protne přímku p ve dvou bodech — označte je D₁ a D₂.',
        points: ['sol-d1', 'sol-d2'],
      },
      {
        text: 'Vrchol B je obraz vrcholu D ve středové souměrnosti se středem S. Na polopřímku D₁S naneste za bod S vzdálenost |D₁S| a označte B₁, stejně na polopřímce D₂S bod B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-d1b1-thin', 'sol-d2b2-thin'],
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

/** 2024, 2. náhradní termín, úloha 10: pravoúhlý ABC, S střed BC, AB ∥ p. */
function rightTriangleParallelSolution(): AssignmentModelSolution {
  const g = given('9f165d96-4d79-416b-9d23-925bd095a472');
  const C = g.point('c');
  const S = g.point('s');
  const p = g.line('p');
  const B = sub(mul(S, 2), C);
  const A1 = foot(C, B, p.d);
  const A2 = lineLine(C, perp(sub(B, C)), B, p.d);
  const u = unit(p.d);
  const P1 = add(B, mul(u, 80));
  const X = add(C, mul(sub(A1, C), 1.25));
  const Y = add(C, mul(sub(A2, C), 1.15));

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-s', S, 'S');
  s.ref('sol-p1', P1);
  s.ref('sol-x', X);
  s.ref('sol-y', Y);
  s.point('sol-b', B, 'B');
  s.point('sol-a1', A1, 'A₁');
  s.point('sol-a2', A2, 'A₂');
  s.segment('sol-cb-thin', 'sol-c', 'sol-b', true);
  s.arc('sol-arc-b', 'sol-s', 'sol-b', 0.5);
  s.helperLine('sol-p2', 'sol-b', 'sol-p1', 'p′');
  s.helperLine('sol-kolmice-r', 'sol-c', 'sol-x', 'r');
  s.helperLine('sol-kolmice-m', 'sol-c', 'sol-y', 'm');
  s.segment('sol-a1b', 'sol-a1', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca1', 'sol-c', 'sol-a1');
  s.segment('sol-a2b', 'sol-a2', 'sol-b');
  s.segment('sol-ca2', 'sol-c', 'sol-a2');

  return cumulative(
    s,
    'Vrchol B je obraz bodu C ve středové souměrnosti se středem S. Strana AB leží na rovnoběžce p′ s přímkou p vedené bodem B. Pravý úhel může být při vrcholu A (A₁ je pata kolmice z C na p′), nebo při vrcholu C (A₂ je průsečík kolmice k CB v bodě C s p′). Úloha má dvě řešení.',
    [
      {
        text: 'Bod S je střed strany BC, vrchol B je proto obraz bodu C ve středové souměrnosti se středem S. Sestrojte polopřímku CS a naneste na ni za bod S vzdálenost |CS|. Dostanete vrchol B.',
        points: ['sol-b'],
        shapes: ['sol-cb-thin', 'sol-arc-b'],
      },
      {
        text: 'Strana AB je rovnoběžná s přímkou p a prochází vrcholem B. Sestrojte rovnoběžku p′ s přímkou p bodem B — na ní leží vrchol A.',
        shapes: ['sol-p2'],
      },
      {
        text: 'První možnost: pravý úhel je při vrcholu A. Pak je strana CA kolmá k AB. Sestrojte kolmici r k přímce p′ bodem C; protne p′ ve vrcholu A₁.',
        points: ['sol-a1'],
        shapes: ['sol-kolmice-r'],
      },
      {
        text: 'Druhá možnost: pravý úhel je při vrcholu C. Pak je strana CA kolmá k CB. Sestrojte kolmici m k úsečce CB bodem C; protne p′ ve vrcholu A₂. (Pravý úhel při vrcholu B nastat nemůže, strana BC není k přímce p kolmá.)',
        points: ['sol-a2'],
        shapes: ['sol-kolmice-m'],
      },
      {
        text: 'Narýsujte trojúhelníky A₁BC a A₂BC. Úloha má dvě řešení.',
        shapes: ['sol-a1b', 'sol-bc', 'sol-ca1', 'sol-a2b', 'sol-ca2'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník A₁BC', vertices: ['sol-a1', 'sol-b', 'sol-c'] },
        { name: 'trojúhelník A₂BC', vertices: ['sol-a2', 'sol-b', 'sol-c'] },
      ],
    },
  );
}

export const CERMAT_SOLUTIONS_2024: [string, () => AssignmentModelSolution][] = [
  ['925f9c30-3b3e-4f46-9055-6ff8f98aa4c4', equilateralMidpointSolution],
  ['74e8bd33-763d-4644-afb2-b607515f45f7', rectangleDiagonalSolution],
  ['00162934-16bc-4d00-8651-916fc1dcdfb2', rhombusOnLineSolution],
  ['80dbbba5-5d59-4e75-840f-96f11a7b3e38', isoscelesOnCircleSolution],
  ['e19e6791-cfbe-441f-aba0-9b6188900a60', rightTrapezoidCircleSolution],
  ['959f750b-ae45-47e1-98e8-629b7d16ce1c', isoscelesTrapezoidAxisSolution],
  ['57f87d7d-f994-4b66-b97b-3abd0dda8010', rectangleCenterLineSolution],
  ['9f165d96-4d79-416b-9d23-925bd095a472', rightTriangleParallelSolution],
];
