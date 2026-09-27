/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík G — vlastní test B3 (viz dataPrijimacky-g.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, dot, given, lineCircle, lineLine, mid, mul, perp, sub, unit } from './board';

/** Vlastní test B3, úloha 9: rovnoramenné trojúhelníky ABC se základnou AB a |CM| = 3 cm — osa AB ∩ k(M; 3 cm). */
function isoscelesNearPointSolution(): AssignmentModelSolution {
  const g = given('3013ed8b-09cc-4e06-b3ff-f5cc6421f05d');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const r = 150; // 3 cm
  const H = mid(A, B);
  const w = unit(perp(sub(B, A))); // směr osy
  const [C1, C2] = lineCircle(H, w, M, r).sort((p, q) => p.y - q.y);
  if (!C1 || !C2) throw new Error('Osa AB má protnout kružnici k(M; 3 cm)');
  // oblouky kružítka z A a B s poloměrem 0,7 · |AB|
  const half = dist(A, B) / 2;
  const rr = 0.7 * dist(A, B);
  const lift = Math.sqrt(rr * rr - half * half);
  const Z1 = add(H, mul(w, -lift)); // nad AB
  const Z2 = add(H, mul(w, lift)); // pod AB
  const up = w.y < 0 ? w : mul(w, -1);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M, 'M');
  s.ref('sol-z1', Z1);
  s.ref('sol-z2', Z2);
  // konec osy nahoře (popisek o v 1,1násobku úseku od dolního průsečíku oblouků)
  s.ref('sol-oe', add(Z2, mul(up, (lift + 190) / 1.1)));
  // bod kružnice vlevo dole — popisek k se kreslí naproti, vpravo nahoře
  s.ref('sol-kr', add(M, mul(unit({ x: -1, y: 1 }), r)));
  s.arc('sol-arc1', 'sol-a', 'sol-z1', 0.3);
  s.arc('sol-arc2', 'sol-b', 'sol-z1', 0.3);
  s.arc('sol-arc3', 'sol-a', 'sol-z2', 0.3);
  s.arc('sol-arc4', 'sol-b', 'sol-z2', 0.3);
  s.helperLine('sol-o', 'sol-z2', 'sol-oe', 'o');
  s.circle('sol-k', 'sol-m', 'sol-kr', 'k');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  if (Math.abs(dist(C1, A) - dist(C1, B)) > 0.5 || Math.abs(dist(C1, M) - r) > 0.5) throw new Error('C₁ nesedí');

  return cumulative(
    s,
    'Vrchol C je stejně daleko od A jako od B, leží tedy na ose o úsečky AB. Zároveň má od bodu M vzdálenost 3 cm, leží proto na kružnici k se středem M a poloměrem 3 cm. Osa o protne kružnici k ve dvou bodech C₁ a C₂. Úloha má dvě řešení: trojúhelníky ABC₁ a ABC₂, každý na jiné straně úsečky AB.',
    [
      {
        text: 'Trojúhelník je rovnoramenný se základnou AB, vrchol C je proto stejně daleko od A jako od B. Všechny takové body leží na ose úsečky AB. Sestrojte ji: z bodů A a B opište oblouky se stejným poloměrem (větším než polovina |AB|) nad i pod úsečkou.',
        shapes: ['sol-arc1', 'sol-arc2', 'sol-arc3', 'sol-arc4'],
      },
      {
        text: 'Průsečíky oblouků spojte přímkou — to je osa o úsečky AB.',
        shapes: ['sol-o'],
      },
      {
        text: 'Vrchol C má od bodu M vzdálenost 3 cm, leží tedy na kružnici se středem M a poloměrem 3 cm. Narýsujte kružnici k(M; 3 cm).',
        shapes: ['sol-k'],
      },
      {
        text: 'Osa o protne kružnici k ve dvou bodech. Označte je C₁ a C₂ — oba jsou stejně daleko od A i od B a mají od M vzdálenost 3 cm.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Úloha má dvě řešení, každé na jiné straně úsečky AB.',
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

/** Vlastní test B3, úloha 10: vrchol C z vrcholů A, B a průsečíku výšek V — dvě kolmice, jedno řešení. */
function orthocenterSolution(): AssignmentModelSolution {
  const g = given('eced3462-accd-4bda-aa0e-f410890397ba');
  const A = g.point('a');
  const B = g.point('b');
  const V = g.point('v');
  const nA = perp(sub(V, B)); // směr strany AC (kolmá k BV)
  const nB = perp(sub(V, A)); // směr strany BC (kolmá k AV)
  const C = lineLine(A, nA, B, nB);
  if (Math.abs(dot(sub(V, C), sub(B, A))) > 1) throw new Error('Přímka CV má být kolmá k AB');
  const past = (P: typeof A, Q: typeof A, extra: number) => add(Q, mul(unit(sub(Q, P)), extra));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-v', V, 'V');
  // přímky AV a BV vedené kousek za bod V (až k protější straně)
  s.ref('sol-av', past(A, V, 0.45 * dist(A, V) + 40));
  s.ref('sol-bv', past(B, V, 0.45 * dist(B, V) + 40));
  // kolmice vedené kousek za vrchol C
  s.ref('sol-ae', past(A, C, 45));
  s.ref('sol-be', past(B, C, 45));
  s.helperLine('sol-lav', 'sol-a', 'sol-av');
  s.helperLine('sol-lbv', 'sol-b', 'sol-bv');
  s.helperLine('sol-ka', 'sol-a', 'sol-ae');
  s.helperLine('sol-kb', 'sol-b', 'sol-be');
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.ref('sol-pc', { x: C.x, y: A.y }); // pata výšky z C (AB je vodorovná)
  s.segment('sol-vc', 'sol-c', 'sol-pc', true);

  return cumulative(
    s,
    'Výška z vrcholu B leží na přímce BV a je kolmá ke straně AC, proto strana AC leží na kolmici k přímce BV vedené bodem A. Stejně strana BC leží na kolmici k přímce AV vedené bodem B. Vrchol C je průsečík obou kolmic; kontrola: přímka CV je kolmá k AB. Úloha má jedno řešení.',
    [
      {
        text: 'Výška z vrcholu B prochází bodem V a je kolmá k protější straně AC; výška z vrcholu A prochází bodem V a je kolmá ke straně BC. Narýsujte přímky AV a BV.',
        shapes: ['sol-lav', 'sol-lbv'],
      },
      {
        text: 'Strana AC je kolmá k výšce z vrcholu B, tedy k přímce BV. Bodem A veďte kolmici k přímce BV (trojúhelníkem s ryskou) — na ní leží strana AC.',
        shapes: ['sol-ka'],
      },
      {
        text: 'Stejně strana BC je kolmá k přímce AV. Bodem B veďte kolmici k přímce AV — na ní leží strana BC.',
        shapes: ['sol-kb'],
      },
      {
        text: 'Průsečík obou kolmic je vrchol C. Označte ho a narýsujte trojúhelník ABC.',
        points: ['sol-c'],
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
      {
        text: 'Kontrola: přímka CV je kolmá ke straně AB, i třetí výška tedy prochází bodem V. Úloha má jedno řešení.',
        shapes: ['sol-vc'],
      },
    ],
    { figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_G: [string, () => AssignmentModelSolution][] = [
  ['3013ed8b-09cc-4e06-b3ff-f5cc6421f05d', isoscelesNearPointSolution],
  ['eced3462-accd-4bda-aa0e-f410890397ba', orthocenterSolution],
];
