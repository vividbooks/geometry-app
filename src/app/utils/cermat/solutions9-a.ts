/** Vzorová řešení a kontrola úkolů 9. ročníku ve stylu CERMAT, balík A (data v `data9-a.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineLine, mid, mul, perp, sub, unit } from './board';

/** Úhel mezi dvěma směry (rad). */
function angleBetween(a: V, b: V): number {
  return Math.acos(Math.max(-1, Math.min(1, dot(unit(a), unit(b)))));
}

/** Konce přímky (bod `a`, směr `d`) oříznuté na rámeček s okrajem `m` (nahoře `top`). */
function clipToFrame(a: V, d: V, frame: { width: number; height: number }, m = 40, top = 60): [V, V] {
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

/** Kružnice vepsaná trojúhelníku ABC: střed S je průsečík os vnitřních úhlů. */
function inscribedCircleSolution(): AssignmentModelSolution {
  const g = given('8a0fdaf1-dbbe-4a3c-9a7a-7669f215fbb0');
  const A = g.point('a');
  const B = g.point('b');
  const C = g.point('c');
  const rho = 90;
  const bisector = (P: V, Q: V, R: V) => {
    const x1 = add(P, mul(unit(sub(Q, P)), rho));
    const x2 = add(P, mul(unit(sub(R, P)), rho));
    const y = sub(add(x1, x2), P);
    const dir = unit(sub(y, P));
    return { x1, x2, y, dir, span: angleBetween(sub(Q, P), sub(R, P)) };
  };
  const bA = bisector(A, B, C);
  const bB = bisector(B, A, C);
  const S = lineLine(A, bA.dir, B, bB.dir);
  const T = foot(S, A, sub(B, A));
  // Osy zadané dvěma body za kružnicí k — popisek (uprostřed) tak nepřekryje oblouky ani kružnici.
  const farA = add(S, mul(bA.dir, 200));
  const nearA = add(S, mul(bA.dir, 140));
  const farB = add(S, mul(bB.dir, 200));
  const nearB = add(S, mul(bB.dir, 140));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-c', C, 'C');
  s.ref('sol-xa1', bA.x1);
  s.ref('sol-xa2', bA.x2);
  s.ref('sol-ya', bA.y);
  s.ref('sol-rima', add(A, mul(bA.dir, rho)));
  s.ref('sol-fara', farA);
  s.ref('sol-neara', nearA);
  s.ref('sol-xb1', bB.x1);
  s.ref('sol-xb2', bB.x2);
  s.ref('sol-yb', bB.y);
  s.ref('sol-rimb', add(B, mul(bB.dir, rho)));
  s.ref('sol-farb', farB);
  s.ref('sol-nearb', nearB);
  s.point('sol-s', S, 'S');
  s.point('sol-t', T, 'T');
  s.arc('sol-arc-a', 'sol-a', 'sol-rima', bA.span + 0.35);
  s.arc('sol-arc-a1', 'sol-xa1', 'sol-ya', 0.5);
  s.arc('sol-arc-a2', 'sol-xa2', 'sol-ya', 0.5);
  s.helperLine('sol-oa', 'sol-neara', 'sol-fara', 'o₁');
  s.arc('sol-arc-b', 'sol-b', 'sol-rimb', bB.span + 0.35);
  s.arc('sol-arc-b1', 'sol-xb1', 'sol-yb', 0.5);
  s.arc('sol-arc-b2', 'sol-xb2', 'sol-yb', 0.5);
  s.helperLine('sol-ob', 'sol-nearb', 'sol-farb', 'o₂');
  s.segment('sol-st', 'sol-s', 'sol-t', true);
  s.circle('sol-k', 'sol-s', 'sol-t', 'k');

  return cumulative(
    s,
    'Střed kružnice vepsané má stejnou vzdálenost od všech tří stran, leží proto na osách vnitřních úhlů trojúhelníku. Stačí sestrojit dvě osy, jejich průsečík je střed S. Poloměr je vzdálenost bodu S od libovolné strany, tu určí kolmice z bodu S na stranu.',
    [
      {
        text: 'Kružnice k se dotýká stran AB a AC, její střed S má proto od obou stran stejnou vzdálenost a leží na ose úhlu BAC. Sestrojte ji: z vrcholu A opište oblouk, který protne strany AB a AC, z obou průsečíků opište oblouky se stejným poloměrem a jejich průsečík spojte s bodem A. Dostanete osu o₁.',
        shapes: ['sol-arc-a', 'sol-arc-a1', 'sol-arc-a2', 'sol-oa'],
      },
      {
        text: 'Střed S má stejnou vzdálenost i od stran AB a BC, leží tedy také na ose úhlu ABC. Sestrojte ji stejným postupem z vrcholu B — to je osa o₂.',
        shapes: ['sol-arc-b', 'sol-arc-b1', 'sol-arc-b2', 'sol-ob'],
      },
      {
        text: 'Průsečík os o₁ a o₂ je střed S kružnice k. Označte ho. (Osa třetího úhlu by bodem S prošla také, sestrojovat ji není potřeba.)',
        points: ['sol-s'],
      },
      {
        text: 'Poloměr kružnice k je vzdálenost bodu S od strany trojúhelníku. Sestrojte kolmici z bodu S na stranu AB, její pata T je bod, ve kterém se kružnice k dotýká strany AB.',
        points: ['sol-t'],
        shapes: ['sol-st'],
      },
      {
        text: 'Narýsujte kružnici k se středem S a poloměrem |ST|. Dotýká se všech tří stran trojúhelníku ABC.',
        shapes: ['sol-k'],
      },
    ],
    {
      figures: [{ name: 'střed S', vertices: ['sol-s'] }],
      circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-t' }],
    },
  );
}

/** Trojúhelník ABC: úhel BAC = 45°, v_c = 3 cm, C v polorovině ABM. */
function triangle45HeightSolution(): AssignmentModelSolution {
  const g = given('ca84c8dd-e051-4da8-9609-61ef53129a0d');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const u = unit(sub(B, A));
  let n = perp(u);
  if (dot(sub(M, A), n) < 0) n = mul(n, -1);
  const rho = 90;
  const X1 = add(A, mul(u, rho));
  const X2 = add(A, mul(n, rho));
  const Y = sub(add(X1, X2), A);
  const dir45 = unit(add(u, n));
  const D = add(A, mul(n, 150)); // v_c = 3 cm
  const C = lineLine(A, dir45, D, u);
  const K = add(A, mul(n, 260));
  const F = add(A, mul(dir45, dist(A, C) + 80));
  const [Q1, Q2] = clipToFrame(D, u, g.item.frame);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-k', K);
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.ref('sol-y', Y);
  s.ref('sol-rim', add(A, mul(dir45, rho)));
  s.ref('sol-f', F);
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.point('sol-d', D, 'D');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-k');
  s.arc('sol-arc-a', 'sol-a', 'sol-rim', Math.PI / 2 + 0.35);
  s.arc('sol-arc-x1', 'sol-x1', 'sol-y', 0.5);
  s.arc('sol-arc-x2', 'sol-x2', 'sol-y', 0.5);
  s.segment('sol-af', 'sol-a', 'sol-f', true);
  s.arc('sol-arc-d', 'sol-a', 'sol-d', 0.35);
  s.helperLine('sol-q', 'sol-q1', 'sol-q2', 'q');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Úhel 45° sestrojíme jako osu pravého úhlu u vrcholu A, na vzniklé polopřímce leží vrchol C. Výška vc = 3 cm znamená, že C leží na rovnoběžce s přímkou AB ve vzdálenosti 3 cm. Obojí sestrojíme jen v polorovině ABM, úloha má proto jedno řešení.',
    [
      {
        text: 'Vrchol C leží v polorovině ABM. V bodě A sestrojte kolmici k přímce AB — s polopřímkou AB svírá pravý úhel otevřený do poloroviny ABM.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Úhel 45° je polovina pravého úhlu. Sestrojte osu tohoto pravého úhlu: z bodu A opište oblouk, z jeho průsečíků s polopřímkou AB a s kolmicí opište oblouky stejného poloměru a jejich průsečík spojte s bodem A. Na vzniklé polopřímce leží vrchol C.',
        shapes: ['sol-arc-a', 'sol-arc-x1', 'sol-arc-x2', 'sol-af'],
      },
      {
        text: 'Výška vc je vzdálenost vrcholu C od přímky AB, vrchol C proto leží na rovnoběžce s přímkou AB ve vzdálenosti 3 cm. Na kolmici naneste od bodu A délku 3 cm (bod D) a bodem D veďte rovnoběžku q s přímkou AB.',
        points: ['sol-d'],
        shapes: ['sol-arc-d', 'sol-q'],
      },
      {
        text: 'Vrchol C je průsečík polopřímky s úhlem 45° a rovnoběžky q. Označte ho.',
        points: ['sol-c'],
      },
      {
        text: 'Narýsujte trojúhelník ABC. Souměrné řešení v opačné polorovině podmínka „C leží v polorovině ABM“ vylučuje, úloha má jedno řešení.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
    },
  );
}

/** Pravoúhlý trojúhelník ABC s přeponou AB a odvěsnou |AC| = 4 cm: Thaletova kružnice ∩ kružnice (A, 4 cm). */
function rightTriangleLegSolution(): AssignmentModelSolution {
  const g = given('3a93f766-6d0c-4ef1-bf93-6ce155da9d49');
  const A = g.point('a');
  const B = g.point('b');
  const c = dist(A, B);
  const u = unit(sub(B, A));
  const n = perp(u);
  const S = mid(A, B);
  const ac = 200; // 4 cm
  const f = (ac * ac) / c;
  const h = Math.sqrt(ac * ac - f * f);
  const base = add(A, mul(u, f));
  const [C1, C2] = [add(base, mul(n, h)), sub(base, mul(n, h))].sort((p, q) => p.y - q.y);
  const rho = 190;
  const hx = Math.sqrt(rho * rho - (c / 2) ** 2);
  const X1 = add(S, mul(n, hx));
  const X2 = sub(S, mul(n, hx));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.point('sol-s', S, 'S');
  s.point('sol-c1', C1!, 'C₁');
  s.point('sol-c2', C2!, 'C₂');
  s.arc('sol-arc-a1', 'sol-a', 'sol-x1', 0.4);
  s.arc('sol-arc-a2', 'sol-a', 'sol-x2', 0.4);
  s.arc('sol-arc-b1', 'sol-b', 'sol-x1', 0.4);
  s.arc('sol-arc-b2', 'sol-b', 'sol-x2', 0.4);
  s.helperLine('sol-osa', 'sol-x1', 'sol-x2');
  s.circle('sol-k', 'sol-s', 'sol-a', 'k');
  s.arc('sol-arc-c1', 'sol-a', 'sol-c1', 0.6);
  s.arc('sol-arc-c2', 'sol-a', 'sol-c2', 0.6);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Pravý úhel při vrcholu C znamená, že C leží na Thaletově kružnici nad průměrem AB. Zároveň je vrchol C od bodu A vzdálený 4 cm, leží tedy i na kružnici se středem A a poloměrem 4 cm. Tyto kružnice se protínají ve dvou bodech souměrných podle přímky AB, úloha má dvě řešení.',
    [
      {
        text: 'Trojúhelník ABC má pravý úhel při vrcholu C, vrchol C proto leží na Thaletově kružnici nad průměrem AB. K ní potřebujete střed S úsečky AB: sestrojte osu úsečky AB (oblouky se stejným poloměrem z bodů A a B), její průsečík s úsečkou AB je bod S.',
        points: ['sol-s'],
        shapes: ['sol-arc-a1', 'sol-arc-a2', 'sol-arc-b1', 'sol-arc-b2', 'sol-osa'],
      },
      {
        text: 'Sestrojte Thaletovu kružnici k se středem S a poloměrem |SA|. Body A a B samy vrcholem C být nemohou, trojúhelník by nevznikl.',
        shapes: ['sol-k'],
      },
      {
        text: 'Odvěsna AC měří 4 cm, vrchol C je tedy od bodu A vzdálený 4 cm. Opište z bodu A oblouky o poloměru 4 cm. Protnou kružnici k ve dvou bodech — v každé polorovině s hraniční přímkou AB v jednom. Označte je C₁ a C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC₁ a ABC₂. Jsou souměrné podle přímky AB, úloha má dvě řešení.',
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

/** Tečny kružnice k rovnoběžné s přímkou p: body dotyku leží na kolmici k p vedené středem S. */
function parallelTangentsSolution(): AssignmentModelSolution {
  const g = given('bd9d361b-722c-404c-ab0a-34d5fcac6b9e');
  const k = g.circle('k');
  const S = k.c;
  const p = g.line('p');
  const P = foot(S, p.a, p.d);
  const toP = unit(sub(P, S));
  // T₁ je bod dotyku blíž k přímce p, T₂ ten vzdálenější.
  const T1 = add(S, mul(toP, k.r));
  const T2 = sub(S, mul(toP, k.r));
  const [a1, b1] = clipToFrame(T1, p.d, g.item.frame);
  const [a2, b2] = clipToFrame(T2, p.d, g.item.frame);
  const [n1, n2] = clipToFrame(S, toP, g.item.frame);

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-n1', n1);
  s.ref('sol-n2', n2);
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
    'Tečna je kolmá k poloměru v bodě dotyku. Tečna rovnoběžná s přímkou p je proto kolmá ke stejné přímce jako p, body dotyku tedy leží na kolmici k přímce p vedené středem S. Kolmice protne kružnici ve dvou bodech T₁, T₂ a v nich sestrojíme tečny rovnoběžné s p.',
    [
      {
        text: 'Tečna kružnice je kolmá k poloměru, který vede do bodu dotyku. Má-li být tečna rovnoběžná s přímkou p, musí být tento poloměr kolmý k přímce p. Sestrojte bodem S kolmici n k přímce p.',
        shapes: ['sol-n'],
      },
      {
        text: 'Kolmice n protne kružnici k ve dvou bodech. To jsou body dotyku hledaných tečen — označte je T₁ a T₂.',
        points: ['sol-t1', 'sol-t2'],
      },
      {
        text: 'V bodě T₁ sestrojte kolmici k přímce n. Je to tečna t₁ kružnice k a je rovnoběžná s přímkou p, protože obě přímky jsou kolmé k přímce n.',
        shapes: ['sol-tt1'],
      },
      {
        text: 'Stejně v bodě T₂ narýsujte kolmici k přímce n — tečnu t₂. Kružnice k má dvě tečny rovnoběžné s přímkou p.',
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

/** Kružnice dotýkající se p v bodě T a přímky q: střed na kolmici v T a na osách úhlů přímek p, q. */
function circleTwoLinesSolution(): AssignmentModelSolution {
  const g = given('daabc2f6-50e6-4279-a405-e6e1755e0070');
  const T = g.point('t');
  const p = g.line('p');
  const q = g.line('q');
  const Vx = lineLine(p.a, p.d, q.a, q.d);
  const up = unit(sub(T, Vx));
  const uq = unit(q.d);
  const d1 = unit(add(up, uq));
  const d2 = unit(sub(up, uq));
  const nDir = perp(up);
  const S1 = lineLine(T, nDir, Vx, d1);
  const S2 = lineLine(T, nDir, Vx, d2);
  const rho = 70;
  const P1 = add(Vx, mul(up, rho));
  const Q1 = add(Vx, mul(uq, rho));
  const Q2 = sub(Vx, mul(uq, rho));
  const Y1 = sub(add(P1, Q1), Vx);
  const Y2 = sub(add(P1, Q2), Vx);
  const [n1, n2] = clipToFrame(T, nDir, g.item.frame);
  // Osy zadané dvěma body kousek za středy — popisek (uprostřed) nepřekryje bod S₁, S₂.
  const o1a = add(S1, mul(d1, 60));
  const o1b = add(S1, mul(d1, 160));
  const o2a = add(S2, mul(d2, 60));
  const o2b = add(S2, mul(d2, 160));

  const s = new Board();
  s.ref('sol-t', T, 'T');
  s.ref('sol-n1', n1);
  s.ref('sol-n2', n2);
  s.ref('sol-o1a', o1a);
  s.ref('sol-o1b', o1b);
  s.ref('sol-o2a', o2a);
  s.ref('sol-o2b', o2b);
  s.ref('sol-p1', P1);
  s.ref('sol-q1', Q1);
  s.ref('sol-q2', Q2);
  s.ref('sol-y1', Y1);
  s.ref('sol-y2', Y2);
  s.point('sol-v', Vx, 'V');
  s.point('sol-s1', S1, 'S₁');
  s.point('sol-s2', S2, 'S₂');
  s.helperLine('sol-n', 'sol-n1', 'sol-n2', 'n');
  s.arc('sol-arc-v', 'sol-v', 'sol-p1', Math.PI + 0.3);
  s.arc('sol-arc-p1a', 'sol-p1', 'sol-y1', 0.5);
  s.arc('sol-arc-q1', 'sol-q1', 'sol-y1', 0.5);
  s.helperLine('sol-o1', 'sol-o1a', 'sol-o1b', 'o₁');
  s.arc('sol-arc-p1b', 'sol-p1', 'sol-y2', 0.5);
  s.arc('sol-arc-q2', 'sol-q2', 'sol-y2', 0.5);
  s.helperLine('sol-o2', 'sol-o2a', 'sol-o2b', 'o₂');
  s.circle('sol-k1', 'sol-s1', 'sol-t', 'k₁');
  s.circle('sol-k2', 'sol-s2', 'sol-t', 'k₂');

  return cumulative(
    s,
    'Kružnice se dotýká přímky p v bodě T, její střed proto leží na kolmici k přímce p v bodě T. Střed má stejnou vzdálenost od obou přímek, leží tedy i na jedné z os úhlů, které přímky p a q svírají. Kolmice protne obě osy, úloha má dvě řešení.',
    [
      {
        text: 'Kružnice se dotýká přímky p v bodě T, poloměr ST je proto kolmý k přímce p. Sestrojte v bodě T kolmici n k přímce p — na ní leží střed S.',
        shapes: ['sol-n'],
      },
      {
        text: 'Střed S je od přímek p a q stejně daleko (obě vzdálenosti jsou rovny poloměru), leží proto na ose úhlu, který přímky p a q svírají. Označte průsečík přímek V, opište z něj oblouk a z průsečíků oblouku s přímkami p a q opište oblouky stejného poloměru. Tak sestrojte osu o₁ jednoho z úhlů, které přímky svírají.',
        points: ['sol-v'],
        shapes: ['sol-arc-v', 'sol-arc-p1a', 'sol-arc-q1', 'sol-o1'],
      },
      {
        text: 'Přímky p a q svírají ještě vedlejší úhel. Stejně sestrojte i jeho osu o₂ — je kolmá k ose o₁.',
        shapes: ['sol-arc-p1b', 'sol-arc-q2', 'sol-o2'],
      },
      {
        text: 'Kolmice n protne osu o₁ v bodě S₁ a osu o₂ v bodě S₂. Oba body mají od přímky q stejnou vzdálenost jako od bodu T, jsou to středy hledaných kružnic.',
        points: ['sol-s1', 'sol-s2'],
      },
      {
        text: 'Narýsujte kružnici k₁ se středem S₁ a poloměrem |S₁T| a kružnici k₂ se středem S₂ a poloměrem |S₂T|. Obě se dotýkají přímky p v bodě T i přímky q, úloha má dvě řešení.',
        shapes: ['sol-k1', 'sol-k2'],
      },
    ],
    {
      figures: [
        { name: 'střed S₁', vertices: ['sol-s1'] },
        { name: 'střed S₂', vertices: ['sol-s2'] },
      ],
      circles: [
        { name: 'k₁', centerId: 'sol-s1', rimId: 'sol-t' },
        { name: 'k₂', centerId: 'sol-s2', rimId: 'sol-t' },
      ],
    },
  );
}

export const GRADE9_STYLE_SOLUTIONS_A: [string, () => AssignmentModelSolution][] = [
  ['8a0fdaf1-dbbe-4a3c-9a7a-7669f215fbb0', inscribedCircleSolution],
  ['ca84c8dd-e051-4da8-9609-61ef53129a0d', triangle45HeightSolution],
  ['3a93f766-6d0c-4ef1-bf93-6ce155da9d49', rightTriangleLegSolution],
  ['bd9d361b-722c-404c-ab0a-34d5fcac6b9e', parallelTangentsSolution],
  ['daabc2f6-50e6-4279-a405-e6e1755e0070', circleTwoLinesSolution],
];
