/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík D (viz dataPrijimacky-d.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, dot, given, lineLine, mid, mul, perp, sub, unit } from './board';

/** Vlastní test A5, úloha 9: kružnice k dotýkající se přímky p v bodě T a procházející bodem M — jedno řešení. */
function tangentCircleThroughPointSolution(): AssignmentModelSolution {
  const g = given('027f44c0-e12f-477d-9ea8-624dda6064e7');
  const T = g.point('t');
  const M = g.point('m');
  const p = g.line('p');
  const e = unit(p.d);
  // normála k p na stranu bodu M
  const n0 = perp(e);
  const n = dot(n0, sub(M, T)) > 0 ? n0 : mul(n0, -1);
  const H = mid(T, M);
  const u = unit(sub(M, T));
  const w0 = perp(u);
  const S = lineLine(T, n, H, w0);
  const w = unit(dot(w0, sub(S, H)) > 0 ? w0 : mul(w0, -1)); // směr osy o od středu TM k bodu S
  // oblouky kružítka z T a M s poloměrem 1,5 · |TM|/2 (jako na obrázku přijímaček)
  const half = dist(T, M) / 2;
  const lift = Math.sqrt((half * 1.5) ** 2 - half * half);
  const Z1 = add(H, mul(w, lift)); // za středem S
  const Z2 = sub(H, mul(w, lift)); // vpravo dole u přímky p

  const s = new Board();
  s.ref('sol-t', T, 'T');
  s.ref('sol-m', M, 'M');
  // konec kolmice q nad kružnicí (popisek v 1,1násobku úseku)
  s.ref('sol-qe', add(T, mul(n, 290 / 1.1)));
  s.ref('sol-z1', Z1);
  s.ref('sol-z2', Z2);
  // konec osy o vlevo nahoře za kružnicí k (popisek v 1,1násobku úseku od Z2)
  s.ref('sol-oe', add(Z2, mul(w, (lift + dist(H, S) + 165) / 1.1)));
  s.helperLine('sol-q', 'sol-t', 'sol-qe', 'q');
  s.segment('sol-tm', 'sol-t', 'sol-m', true);
  s.arc('sol-arc1', 'sol-t', 'sol-z1', 0.3);
  s.arc('sol-arc2', 'sol-m', 'sol-z1', 0.3);
  s.arc('sol-arc3', 'sol-t', 'sol-z2', 0.3);
  s.arc('sol-arc4', 'sol-m', 'sol-z2', 0.3);
  s.helperLine('sol-o', 'sol-z2', 'sol-oe', 'o');
  s.point('sol-s', S, 'S');
  s.circle('sol-k', 'sol-s', 'sol-t', 'k');

  if (Math.abs(dist(S, M) - dist(S, T)) > 0.5) throw new Error('Kružnice k má procházet bodem M');

  return cumulative(
    s,
    'Poloměr do bodu dotyku je kolmý k tečně, střed S proto leží na kolmici q k přímce p v bodě T. Kružnice prochází body T a M, střed je od nich stejně daleko a leží i na ose o úsečky TM. Střed S je průsečík kolmice q a osy o, poloměr je |ST|. Úloha má jedno řešení.',
    [
      {
        text: 'Kružnice k se má dotýkat přímky p v bodě T, přímka p je tedy její tečna. Poloměr ST do bodu dotyku je k tečně kolmý, střed S proto leží na kolmici q k přímce p vedené bodem T. Sestrojte ji (trojúhelníkem s ryskou).',
        shapes: ['sol-q'],
      },
      {
        text: 'Kružnice prochází body T i M, její střed S má tedy od obou bodů stejnou vzdálenost. Všechny takové body leží na ose úsečky TM. Spojte body T a M.',
        shapes: ['sol-tm'],
      },
      {
        text: 'Sestrojte osu o úsečky TM: z bodu T i z bodu M opište oblouky se stejným poloměrem, větším než polovina |TM|. Přímka přes oba průsečíky oblouků je osa o.',
        shapes: ['sol-arc1', 'sol-arc2', 'sol-arc3', 'sol-arc4', 'sol-o'],
      },
      {
        text: 'Střed S leží na kolmici q i na ose o. Jejich průsečík označte S.',
        points: ['sol-s'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |ST|. Dotýká se přímky p v bodě T a prochází i bodem M. Úloha má jedno řešení: kolmice q a osa o nejsou rovnoběžné, protnou se v jediném bodě.',
        shapes: ['sol-k'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-t' }],
    },
  );
}

/** Vlastní test A5, úloha 10: trojúhelník ABC s pravým úhlem při B a vrcholem C na přímce p — jedno řešení. */
function rightAngleAtBOnLineSolution(): AssignmentModelSolution {
  const g = given('ce35b9bc-885e-4c96-9e42-fc36ddfb7a69');
  const A = g.point('a');
  const B = g.point('b');
  const p = g.line('p');
  const u = unit(sub(B, A));
  const n0 = perp(u);
  const C = lineLine(B, n0, p.a, p.d);
  const n = unit(sub(C, B)); // kolmice míří od B k přímce p
  // kolmice kružítkem: oblouk z B (1,5 cm) protne přímku AB v X a Y, z nich oblouky 2,5 cm → průsečík Z
  const X = sub(B, mul(u, 75));
  const Y = add(B, mul(u, 75));
  const Z = add(B, mul(n, Math.sqrt(125 ** 2 - 75 ** 2)));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-x', X);
  s.ref('sol-y', Y);
  s.ref('sol-z', Z);
  s.ref('sol-ke', add(B, mul(n, dist(B, C) + 60)));
  s.helperLine('sol-pab', 'sol-a', 'sol-b');
  s.arc('sol-arc-x', 'sol-b', 'sol-x', 0.3);
  s.arc('sol-arc-y', 'sol-b', 'sol-y', 0.3);
  s.arc('sol-arc-zx', 'sol-x', 'sol-z', 0.3);
  s.arc('sol-arc-zy', 'sol-y', 'sol-z', 0.3);
  s.helperLine('sol-kolmice', 'sol-b', 'sol-ke');
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Úhel při vrcholu B je pravý, strana BC je tedy kolmá k AB a vrchol C leží na kolmici k úsečce AB vedené bodem B. Zároveň leží na přímce p, je to proto průsečík té kolmice s přímkou p. Úloha má jedno řešení.',
    [
      {
        text: 'Úhel při vrcholu B má být pravý, strana BC je proto kolmá k AB. Vrchol C tedy leží na kolmici k úsečce AB vedené bodem B. Prodlužte úsečku AB za bod B a z bodu B opište oblouk (třeba o poloměru 1,5 cm), který ji protne na obou stranách od B.',
        shapes: ['sol-pab', 'sol-arc-x', 'sol-arc-y'],
      },
      {
        text: 'Z obou průsečíků opište oblouky se stejným poloměrem, větším než 1,5 cm. Jejich průsečík spojte s bodem B — dostanete kolmici k úsečce AB v bodě B. (Kolmici můžete narýsovat i trojúhelníkem s ryskou.)',
        shapes: ['sol-arc-zx', 'sol-arc-zy', 'sol-kolmice'],
      },
      {
        text: 'Vrchol C leží zároveň na přímce p. Kolmice protne přímku p v jediném bodě — označte ho C.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Úhel při vrcholu B je pravý a vrchol C leží na přímce p. Úloha má jedno řešení: kolmice není s přímkou p rovnoběžná, protne ji jen jednou.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_D: [string, () => AssignmentModelSolution][] = [
  ['027f44c0-e12f-477d-9ea8-624dda6064e7', tangentCircleThroughPointSolution],
  ['ce35b9bc-885e-4c96-9e42-fc36ddfb7a69', rightAngleAtBOnLineSolution],
];
