/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík F (viz dataPrijimacky-f.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, given, lineCircle, lineLine, mul, perp, sub, unit } from './board';

/** Úhel mezi dvěma směry (rad). */
function angleBetween(a: V, b: V): number {
  return Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
}

/** Vlastní test A7, úloha 9: kružnice vepsaná do úhlu AVB s bodem dotyku T na rameni VA — jedno řešení. */
function angleTangentCircleSolution(): AssignmentModelSolution {
  const g = given('6cf98d8f-9775-49de-8203-24dc967f3f0e');
  const Vv = g.point('v');
  const A = g.point('a');
  const B = g.point('b');
  const T = g.point('t');
  const uA = unit(sub(A, Vv));
  const uB = unit(sub(B, Vv));
  const rho = 100; // rozevření kružítka pro osu úhlu: 2 cm
  const P1 = add(Vv, mul(uA, rho));
  const P2 = add(Vv, mul(uB, rho));
  const Q = sub(add(P1, P2), Vv);
  const dirO = unit(sub(Q, Vv));
  const S = lineLine(Vv, dirO, T, perp(uA));
  const r = dist(S, T);
  // Kolmice p a osa o zadané dvěma body za kružnicí k — popisek (uprostřed úseku i v jeho 1,1násobku)
  // tak padne nad kružnici, mimo oblouky a písmena.
  const n = dot(perp(uA), sub(B, Vv)) > 0 ? unit(perp(uA)) : mul(unit(perp(uA)), -1);
  const pNear = add(T, mul(n, 2 * r + 15));
  const pFar = add(T, mul(n, 2 * r + 45));
  const oNear = add(S, mul(dirO, r + 30));
  const oFar = add(S, mul(dirO, r + 90));
  // Bod dotyku na rameni VB (jen pro kontrolu výpočtu): |VU| = |VT|.
  const U = add(Vv, mul(uB, dist(Vv, T)));
  if (Math.abs(dist(S, U) - r) > 0.5) throw new Error('Kružnice se nemá dotýkat ramene VB');

  const s = new Board();
  s.ref('sol-v', Vv, 'V');
  s.ref('sol-t', T, 'T');
  s.ref('sol-p1', P1);
  s.ref('sol-p2', P2);
  s.ref('sol-q', Q);
  s.ref('sol-rim-v', add(Vv, mul(dirO, rho)));
  s.ref('sol-o-near', oNear);
  s.ref('sol-o-far', oFar);
  s.ref('sol-p-near', pNear);
  s.ref('sol-p-far', pFar);
  s.arc('sol-arc-v', 'sol-v', 'sol-rim-v', angleBetween(uA, uB) + 0.35);
  s.arc('sol-arc-p1', 'sol-p1', 'sol-q', 0.5);
  s.arc('sol-arc-p2', 'sol-p2', 'sol-q', 0.5);
  s.helperLine('sol-o', 'sol-o-near', 'sol-o-far', 'o');
  s.helperLine('sol-p', 'sol-p-near', 'sol-p-far', 'p');
  s.point('sol-s', S, 'S');
  s.circle('sol-k', 'sol-s', 'sol-t', 'k');

  return cumulative(
    s,
    'Kružnice se dotýká obou ramen, její střed S má proto od obou ramen stejnou vzdálenost a leží na ose o úhlu AVB. Poloměr ST do bodu dotyku je kolmý k rameni VA, střed leží i na kolmici p k rameni VA v bodě T. Střed S je průsečík osy o s kolmicí p, kružnice k má poloměr |ST|. Úloha má jedno řešení.',
    [
      {
        text: 'Kružnice k se dotýká obou ramen úhlu, její střed S má proto od obou ramen stejnou vzdálenost. Takové body leží na ose úhlu AVB. Sestrojte ji: z vrcholu V opište oblouk, který protne obě ramena. Z obou průsečíků opište stejným poloměrem oblouky dovnitř úhlu a jejich průsečík spojte s vrcholem V. Dostanete osu o.',
        shapes: ['sol-arc-v', 'sol-arc-p1', 'sol-arc-p2', 'sol-o'],
      },
      {
        text: 'Poloměr vedený do bodu dotyku je kolmý k tečně. Poloměr ST je proto kolmý k rameni VA a střed S leží na kolmici k rameni VA v bodě T. Sestrojte tuto kolmici p (trojúhelníkem s ryskou).',
        shapes: ['sol-p'],
      },
      {
        text: 'Střed S leží na ose o i na kolmici p. Jejich průsečík označte S.',
        points: ['sol-s'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |ST|. Dotkne se ramene VA v bodě T a také ramene VB — v bodě, který má od vrcholu V stejnou vzdálenost jako bod T. Kolmice p protne osu o v jediném bodě, úloha má proto jedno řešení.',
        shapes: ['sol-k'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-t' }],
    },
  );
}

/** Vlastní test A7, úloha 10: lichoběžník ABCD ze tří vrcholů A, B, D a základny |CD| = 3 cm — jedno řešení. */
function trapezoidFromThreeVerticesSolution(): AssignmentModelSolution {
  const g = given('7dc9ef65-bfe5-44a8-8518-22ff5823d375');
  const A = g.point('a');
  const B = g.point('b');
  const D = g.point('d');
  const u = unit(sub(B, A));
  const cd = 150; // 3 cm
  // Na přímce p leží dva body ve vzdálenosti 3 cm od D; vrchol C je ten ve směru od A k B.
  const [C] = lineCircle(D, u, D, cd).filter(X => dot(sub(X, D), u) > 0);
  if (!C) throw new Error('Chybí vrchol C');
  // Rovnoběžka p zadaná dvěma body za vrcholem C — popisek tak nepadne k písmenu C.
  const pNear = add(D, mul(u, cd + 60));
  const pFar = add(D, mul(u, cd + 120));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-d', D, 'D');
  s.ref('sol-p-near', pNear);
  s.ref('sol-p-far', pFar);
  s.helperLine('sol-p', 'sol-p-near', 'sol-p-far', 'p');
  s.ref('sol-c-rim', C); // oblouk kružítka zvlášť, aby se písmeno C ukázalo až ve 3. kroku
  s.arc('sol-arc-c', 'sol-d', 'sol-c-rim', 0.4);
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Základny lichoběžníku jsou rovnoběžné, vrchol C proto leží na rovnoběžce p s přímkou AB vedené bodem D. Na ni naneste od bodu D kružítkem 3 cm ve směru, kterým vede úsečka AB od A k B — to je vrchol C. Na opačné straně bodu D by se strany zkřížily, úloha má jedno řešení.',
    [
      {
        text: 'Základny AB a CD lichoběžníku jsou rovnoběžné. Vrchol C proto leží na rovnoběžce s přímkou AB, která prochází bodem D. Sestrojte ji (posunutím trojúhelníku podél pravítka) a označte p.',
        shapes: ['sol-p'],
      },
      {
        text: 'Základna CD měří 3 cm, vrchol C je tedy od bodu D vzdálený 3 cm. Zapíchněte kružítko do bodu D, rozevřete ho na 3 cm a vyznačte oblouk na přímce p na tu stranu, kterou míří úsečka AB od A k B.',
        shapes: ['sol-arc-c'],
      },
      {
        text: 'Průsečík oblouku s přímkou p označte C. Kružnice se středem D by protnula přímku p ještě na druhé straně od bodu D. Tam by ale úsečka DC mířila opačně než AB, strany BC a AD by se zkřížily a lichoběžník by nevznikl.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte lichoběžník ABCD: spojte B s C a C s D. Úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'lichoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_F: [string, () => AssignmentModelSolution][] = [
  ['6cf98d8f-9775-49de-8203-24dc967f3f0e', angleTangentCircleSolution],
  ['7dc9ef65-bfe5-44a8-8518-22ff5823d375', trapezoidFromThreeVerticesSolution],
];
