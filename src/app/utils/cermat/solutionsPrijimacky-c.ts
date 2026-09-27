/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík C (viz dataPrijimacky-c.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, sub, unit } from './board';

/** Na kterou stranu přímky (bod `a`, směr `d`) padne bod `q`. */
const side = (q: V, a: V, d: V): number => Math.sign(d.x * (q.y - a.y) - d.y * (q.x - a.x));

/**
 * Osa úsečky PQ kružítkem: oblouky ze P a Q se stejným poloměrem, spojnice jejich průsečíků (tenká úsečka).
 * Vrací id čar; střed úsečky si volající přidá sám.
 */
function bisectorArcs(s: Board, prefix: string, pId: string, qId: string, P: V, Q: V, factor = 1.3): string[] {
  const h = dist(P, Q) / 2;
  const off = Math.sqrt((h * factor) ** 2 - h * h);
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

/** Vlastní test 5, úloha 9: trojúhelník ABC s výškou v_c = 2 cm a vrcholem C na kružnici k — dvě řešení. */
function heightOnCircleSolution(): AssignmentModelSolution {
  const g = given('930e880e-5ddd-4b34-bdcb-a82df6df9749');
  const A = g.point('a');
  const B = g.point('b');
  const k = g.circle('k');
  const u = unit(sub(B, A));
  const n0 = unit(perp(u));
  // n míří na stranu kružnice k
  const n = side(k.c, A, u) === side(add(A, n0), A, u) ? n0 : mul(n0, -1);
  const H1 = add(A, mul(n, 100)); // 2 cm na stranu kružnice
  const H2 = sub(A, mul(n, 100)); // 2 cm na druhou stranu
  const [C1, C2] = lineCircle(H1, u, k.c, k.r).sort((p, q) => p.x - q.x);
  if (lineCircle(H2, u, k.c, k.r).length) throw new Error('Druhá rovnoběžka nemá kružnici k protínat');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.point('sol-h1', H1, 'H₁');
  s.point('sol-h2', H2, 'H₂');
  s.ref('sol-h1b', add(H1, mul(u, 200)));
  s.ref('sol-h2b', add(H2, mul(u, 200)));
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-h1');
  s.arc('sol-arc-h1', 'sol-a', 'sol-h1', 0.35);
  s.arc('sol-arc-h2', 'sol-a', 'sol-h2', 0.35);
  s.helperLine('sol-par1', 'sol-h1', 'sol-h1b');
  s.helperLine('sol-par2', 'sol-h2', 'sol-h2b');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Výška na stranu AB je vzdálenost vrcholu C od přímky AB, vrchol C proto leží na jedné ze dvou rovnoběžek s AB ve vzdálenosti 2 cm. Rovnoběžka na straně kružnice k ji protne ve dvou bodech C₁ a C₂, druhá rovnoběžka kružnici mine. Úloha má dvě řešení.',
    [
      {
        text: 'Výška na stranu AB je vzdálenost vrcholu C od přímky AB. Vrchol C proto leží na rovnoběžce s AB ve vzdálenosti 2 cm — takové rovnoběžky jsou dvě, na každé straně jedna. Sestrojte kolmici k přímce AB v bodě A a naneste na ni kružítkem od bodu A 2 cm na obě strany: body H₁ a H₂.',
        points: ['sol-h1', 'sol-h2'],
        shapes: ['sol-kolmice', 'sol-arc-h1', 'sol-arc-h2'],
      },
      {
        text: 'Body H₁ a H₂ veďte rovnoběžky s přímkou AB. Na nich leží všechny body, které mají od přímky AB vzdálenost 2 cm.',
        shapes: ['sol-par1', 'sol-par2'],
      },
      {
        text: 'Vrchol C leží zároveň na kružnici k. Rovnoběžka bodem H₁ protne kružnici k ve dvou bodech — označte je C₁ a C₂. Rovnoběžka bodem H₂ kružnici mine, žádný vrchol nedá.',
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

/** Vlastní test 5, úloha 10: čtverec ABCD s úhlopříčkou AC na přímce p a daným vrcholem B — jedno řešení. */
function squareDiagonalOnLineSolution(): AssignmentModelSolution {
  const g = given('35ac1752-e8ca-49fe-9f9b-d71ff2bcee0d');
  const B = g.point('b');
  const p = g.line('p');
  const S = foot(B, p.a, p.d);
  const D = sub(mul(S, 2), B);
  const r = dist(S, B);
  const u = unit(p.d);
  const [A, C] = [sub(S, mul(u, r)), add(S, mul(u, r))].sort((q, w) => q.x - w.x);

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.point('sol-s', S, 'S');
  s.point('sol-d', D, 'D');
  s.point('sol-a', A!, 'A');
  s.point('sol-c', C!, 'C');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-s');
  s.arc('sol-arc-d', 'sol-s', 'sol-d', 0.35);
  s.circle('sol-k', 'sol-s', 'sol-b');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky čtverce jsou na sebe kolmé, stejně dlouhé a navzájem se půlí. Úhlopříčka BD proto leží na kolmici z bodu B k přímce p a její pata S je střed čtverce; vrchol D je obraz bodu B podle přímky p. Vrcholy A a C jsou průsečíky kružnice se středem S a poloměrem |SB| s přímkou p. Úloha má jedno řešení.',
    [
      {
        text: 'Úhlopříčky čtverce jsou na sebe kolmé. Úhlopříčka BD je tedy kolmá k přímce p, na které leží úhlopříčka AC. Sestrojte kolmici z bodu B k přímce p. Její průsečík s přímkou p označte S — v něm se úhlopříčky protínají, je to střed čtverce.',
        points: ['sol-s'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Úhlopříčky čtverce se navzájem půlí, proto |SD| = |SB|. Naneste kružítkem na kolmici za bod S vzdálenost |SB| — dostanete vrchol D (je to obraz bodu B v osové souměrnosti podle přímky p).',
        points: ['sol-d'],
        shapes: ['sol-arc-d'],
      },
      {
        text: 'Úhlopříčka AC je stejně dlouhá jako BD a v bodě S se také půlí: |SA| = |SC| = |SB|. Sestrojte kružnici se středem S a poloměrem |SB|. Protne přímku p ve vrcholech A a C.',
        points: ['sol-a', 'sol-c'],
        shapes: ['sol-k'],
      },
      {
        text: 'Narýsujte čtverec ABCD. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'čtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      // A a C leží oba na přímce p — prohozením vznikne pořád čtverec ABCD.
      interchangeable: [['sol-a', 'sol-c']],
    },
  );
}

/** Vlastní test 6, úloha 9: body kružnice k stejně vzdálené od různoběžek p, q — průsečíky obou os úhlů, čtyři řešení. */
function equidistantOnCircleSolution(): AssignmentModelSolution {
  const g = given('fd30e76c-6340-4925-88a7-f7c9327a2aad');
  const p = g.line('p');
  const q = g.line('q');
  const k = g.circle('k');
  const Vv = lineLine(p.a, p.d, q.a, q.d);
  const up = unit(p.d);
  const uq = unit(q.d);
  const rho = 80;
  const P1 = add(Vv, mul(up, rho));
  const Q1 = add(Vv, mul(uq, rho));
  const P2 = sub(Vv, mul(up, rho));
  // Osa úhlu P1 V Q1 a osa vedlejšího úhlu Q1 V P2: čtvrtý vrchol kosočtverce
  const W1 = sub(add(P1, Q1), Vv);
  const W2 = sub(add(Q1, P2), Vv);
  const d1 = sub(W1, Vv);
  const d2 = sub(W2, Vv);
  if (Math.abs(dot(unit(d1), unit(d2))) > 1e-6) throw new Error('Osy úhlů mají být kolmé');
  const byX = (a: V, b: V) => a.x - b.x;
  const [X1, X2] = lineCircle(Vv, d1, k.c, k.r).sort(byX);
  const [X4, X3] = lineCircle(Vv, d2, k.c, k.r).sort((a, b) => b.y - a.y);

  const s = new Board();
  s.point('sol-v', Vv, 'V');
  s.ref('sol-p1', P1);
  s.ref('sol-q1', Q1);
  s.ref('sol-p2', P2);
  s.ref('sol-w1', W1);
  s.ref('sol-w2', W2);
  // konce os pro popisky o₁, o₂ (editor je kreslí v 1,1násobku úseku): o₁ za bodem X₂, o₂ pod bodem X₄
  s.ref('sol-o1e', add(Vv, mul(unit(d1), 250 / 1.1)));
  s.ref('sol-o2e', add(Vv, mul(unit(d2), 135 / 1.1)));
  s.arc('sol-arc-p1', 'sol-v', 'sol-p1', 0.35);
  s.arc('sol-arc-q1', 'sol-v', 'sol-q1', 0.35);
  s.arc('sol-arc-w1a', 'sol-p1', 'sol-w1', 0.35);
  s.arc('sol-arc-w1b', 'sol-q1', 'sol-w1', 0.35);
  s.helperLine('sol-o1', 'sol-v', 'sol-o1e', 'o₁');
  s.arc('sol-arc-p2', 'sol-v', 'sol-p2', 0.35);
  s.arc('sol-arc-w2a', 'sol-q1', 'sol-w2', 0.4);
  s.arc('sol-arc-w2b', 'sol-p2', 'sol-w2', 0.4);
  s.helperLine('sol-o2', 'sol-v', 'sol-o2e', 'o₂');
  s.point('sol-x1', X1!, 'X₁');
  s.point('sol-x2', X2!, 'X₂');
  s.point('sol-x3', X3!, 'X₃');
  s.point('sol-x4', X4!, 'X₄');

  return cumulative(
    s,
    'Body se stejnou vzdáleností od dvou různoběžek leží na osách úhlů, které přímky p a q svírají. Takové osy jsou dvě, procházejí průsečíkem V přímek a jsou na sebe kolmé. Bod V leží uvnitř kružnice k, proto každá osa protne kružnici ve dvou bodech — úloha má čtyři řešení X₁, X₂, X₃, X₄.',
    [
      {
        text: 'Body, které mají stejnou vzdálenost od dvou různoběžek, leží na osách úhlů, které přímky svírají. Různoběžky p a q svírají dvě dvojice úhlů, os jsou proto dvě. Průsečík přímek p a q označte V.',
        points: ['sol-v'],
      },
      {
        text: 'Sestrojte osu o₁ jednoho úhlu: z bodu V opište oblouk, který protne přímky p i q. Z obou průsečíků opište oblouky se stejným poloměrem a jejich průsečík spojte s bodem V.',
        shapes: ['sol-arc-p1', 'sol-arc-q1', 'sol-arc-w1a', 'sol-arc-w1b', 'sol-o1'],
      },
      {
        text: 'Stejně sestrojte osu o₂ vedlejšího úhlu (oblouk z bodu V protne přímku p i na druhé straně od V). Osa o₂ je kolmá k ose o₁.',
        shapes: ['sol-arc-p2', 'sol-arc-w2a', 'sol-arc-w2b', 'sol-o2'],
      },
      {
        text: 'Hledané body leží zároveň na kružnici k. Bod V je uvnitř kružnice, každá osa ji proto protne ve dvou bodech. Průsečíky osy o₁ s kružnicí k označte X₁, X₂, průsečíky osy o₂ označte X₃, X₄. Úloha má čtyři řešení — kdo by sestrojil jen jednu osu, našel by jen dvě z nich.',
        points: ['sol-x1', 'sol-x2', 'sol-x3', 'sol-x4'],
      },
    ],
    {
      figures: [
        { name: 'bod X₁', vertices: ['sol-x1'] },
        { name: 'bod X₂', vertices: ['sol-x2'] },
        { name: 'bod X₃', vertices: ['sol-x3'] },
        { name: 'bod X₄', vertices: ['sol-x4'] },
      ],
    },
  );
}

/** Vlastní test 6, úloha 10: pravoúhlý trojúhelník s přeponou AB a vrcholem C na přímce p — Thaletova kružnice, dvě řešení. */
function thalesOnLineSolution(): AssignmentModelSolution {
  const g = given('e35fd27b-5243-4b37-8c61-6f6bab7a6bda');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const S = mid(A, B);
  const [C1, C2] = lineCircle(p.a, p.d, S, dist(A, B) / 2).sort((u, w) => u.x - w.x);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  // menší poloměr oblouků, aby se horní průsečík nepletl k přímce p a vrcholům C
  const osa = bisectorArcs(s, 'sol-o', 'sol-a', 'sol-b', A, B, 1.1);
  s.point('sol-s', S, 'S');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Úsečka AB je přepona, pravý úhel je proto při vrcholu C. Podle Thaletovy věty leží vrchol C na kružnici s průměrem AB: její střed S je střed úsečky AB a poloměr |SA|. Kružnice protne přímku p ve dvou bodech C₁ a C₂, úloha má dvě řešení.',
    [
      {
        text: 'Úsečka AB je přepona, pravý úhel je tedy při vrcholu C. Podle Thaletovy věty leží vrchol C na kružnici s průměrem AB. Najděte její střed: sestrojte osu úsečky AB — z bodů A a B opište oblouky se stejným poloměrem a jejich průsečíky spojte. Osa protne úsečku AB v jejím středu S.',
        points: ['sol-s'],
        shapes: osa,
      },
      {
        text: 'Sestrojte Thaletovu kružnici k se středem S a poloměrem |SA|. Prochází body A i B.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol C leží na kružnici k i na přímce p. Kružnice k protne přímku p ve dvou bodech — označte je C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Oba mají pravý úhel při vrcholu C, úloha má dvě řešení.',
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

export const PRIJIMACKY_TEST_SOLUTIONS_C: [string, () => AssignmentModelSolution][] = [
  ['930e880e-5ddd-4b34-bdcb-a82df6df9749', heightOnCircleSolution],
  ['35ac1752-e8ca-49fe-9f9b-d71ff2bcee0d', squareDiagonalOnLineSolution],
  ['fd30e76c-6340-4925-88a7-f7c9327a2aad', equidistantOnCircleSolution],
  ['e35fd27b-5243-4b37-8c61-6f6bab7a6bda', thalesOnLineSolution],
];
