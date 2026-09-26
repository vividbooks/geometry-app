/** Vzorová řešení úloh 9 a 10 z JPZ 2025 (data v `data2025.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Znaménko strany, na které leží bod `q` vůči přímce bodem `a` ve směru `d`. */
const side = (q: V, a: V, d: V): number => Math.sign(d.x * (q.y - a.y) - d.y * (q.x - a.x));

/**
 * Střed úsečky PQ sestrojený osou úsečky: oblouky ze P a Q se stejným poloměrem, spojnice jejich průsečíků
 * (tenká úsečka) protne PQ ve středu. Vrací id čar; středem je bod `midId`, který si volající přidá sám.
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

/** 2025, 1. řádný termín, úloha 9: osa většího úhlu přímek p, q a obdélník KLMN s úhlopříčkami na p, q. */
function rectangleOnTwoLinesSolution(): AssignmentModelSolution {
  const g = given('34699e67-edac-4ea3-a3cb-af15f219a8f4');
  const R = g.point('r');
  const p = g.line('p');
  const q = g.line('q');
  const S = lineLine(p.a, p.d, q.a, q.d);
  // Jednotkové směry obou přímek tak, aby svíraly větší (tupý) úhel; jeho osa má směr u + w.
  const u = unit(p.d);
  let w = unit(q.d);
  if (dot(u, w) > 0) w = mul(w, -1);
  const o = unit(add(u, w));
  const r = 110;
  const P1 = add(S, mul(u, r));
  const Q1 = add(S, mul(w, r));
  const Z = add(P1, sub(Q1, S)); // průsečík oblouků ze P1 a Q1 (kosočtverec S P1 Z Q1)
  const Y = add(S, mul(o, r));
  const n = perp(o);
  const M = lineLine(R, n, p.a, p.d);
  const N = lineLine(R, n, q.a, q.d);
  const K = sub(mul(S, 2), M);
  const L = sub(mul(S, 2), N);
  const angle = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));

  const s = new Board();
  s.ref('sol-r', R);
  s.point('sol-s', S, 'S');
  s.ref('sol-p1', P1);
  s.ref('sol-q1', Q1);
  s.ref('sol-y', Y);
  s.ref('sol-z', Z);
  s.point('sol-m', M, 'M');
  s.point('sol-n', N, 'N');
  s.point('sol-k', K, 'K');
  s.point('sol-l', L, 'L');
  s.arc('sol-arc-s', 'sol-s', 'sol-y', angle + 0.35);
  s.arc('sol-arc-p1', 'sol-p1', 'sol-z', 0.5);
  s.arc('sol-arc-q1', 'sol-q1', 'sol-z', 0.5);
  s.line('sol-o', 'sol-s', 'sol-z', 'o');
  s.helperLine('sol-kolmice', 'sol-m', 'sol-n');
  s.arc('sol-arc-k', 'sol-s', 'sol-k');
  s.arc('sol-arc-l', 'sol-s', 'sol-l');
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mn', 'sol-m', 'sol-n');
  s.segment('sol-nk', 'sol-n', 'sol-k');

  return cumulative(
    s,
    'Osa o většího úhlu přímek p, q se sestrojí kružítkem z jejich průsečíku S. Vrcholy obdélníku leží po dvou na přímkách p a q, jeho úhlopříčky proto leží na těchto přímkách a obdélník je souměrný podle osy o. Strana MN je kolmá k ose o a prochází bodem R, vrcholy K a L jsou obrazy M a N ve středové souměrnosti se středem S.',
    [
      {
        text: '9.1 Průsečík přímek p a q označte S. Kružnicí se středem S vyznačte stejně daleko od S po jednom bodě na obou ramenech většího (tupého) úhlu. Z těchto bodů udělejte oblouky se stejným poloměrem; jejich průsečík spojte s bodem S — to je osa o.',
        points: ['sol-s'],
        shapes: ['sol-arc-s', 'sol-arc-p1', 'sol-arc-q1', 'sol-o'],
      },
      {
        text: '9.2 Všechny čtyři vrcholy leží na přímkách p a q, na každé přímce jsou dva protější vrcholy. Úhlopříčky obdélníku tedy leží na přímkách p, q a protínají se v bodě S. Jsou stejně dlouhé a půlí se, proto je obdélník souměrný podle osy o a strana MN je k ose o kolmá.',
      },
      {
        text: 'Sestrojte bodem R kolmici k ose o. Protne přímku p ve vrcholu M a přímku q ve vrcholu N (bod R leží mezi nimi).',
        points: ['sol-m', 'sol-n'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Úhlopříčky se v bodě S půlí: vrchol K je obraz bodu M a vrchol L obraz bodu N ve středové souměrnosti se středem S. Naneste |SM| na přímku p za bod S a |SN| na přímku q za bod S.',
        points: ['sol-k', 'sol-l'],
        shapes: ['sol-arc-k', 'sol-arc-l'],
      },
      {
        text: 'Narýsujte obdélník KLMN.',
        shapes: ['sol-kl', 'sol-lm', 'sol-mn', 'sol-nk'],
      },
    ],
    {
      figures: [{ name: 'obdélník KLMN', vertices: ['sol-k', 'sol-l', 'sol-m', 'sol-n'] }],
      lines: [{ name: 'o', p1Id: 'sol-s', p2Id: 'sol-z' }],
      // Zadání neříká, který z vrcholů M, N leží na p: prohozením M ↔ N (a tím K ↔ L) vznikne také obdélník KLMN.
      interchangeable: [['sol-m', 'sol-n'], ['sol-k', 'sol-l']],
    },
  );
}

/** 2025, 1. řádný termín, úloha 10: výška v_c na p, těžnice t_c na q; A je obraz B podle středu strany AB. */
function triangleAltitudeMedianSolution(): AssignmentModelSolution {
  const g = given('cadca086-00a5-418f-844e-26c0b459112d');
  const B = g.point('b');
  const C = g.point('c');
  const p = g.line('p');
  const q = g.line('q');
  const F = foot(B, p.a, p.d);
  const S = lineLine(B, sub(F, B), q.a, q.d);
  const A = sub(mul(S, 2), B);

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-c', C, 'C');
  s.ref('sol-f', F);
  s.point('sol-s', S, 'S');
  s.point('sol-a', A, 'A');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-f');
  s.arc('sol-arc-a', 'sol-s', 'sol-a');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Výška na stranu c je kolmá ke straně AB, strana AB proto leží na kolmici k přímce p vedené bodem B. Těžnice t_c končí ve středu S strany AB, S je tedy průsečík této kolmice s přímkou q. Vrchol A je obraz bodu B ve středové souměrnosti se středem S.',
    [
      {
        text: 'Výška v_c leží na přímce p a je kolmá ke straně c = AB. Strana AB proto leží na kolmici k přímce p, která prochází vrcholem B. Sestrojte ji.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Těžnice t_c spojuje vrchol C se středem strany AB a leží na přímce q. Průsečík kolmice s přímkou q je střed S strany AB.',
        points: ['sol-s'],
      },
      {
        text: 'Vrchol A je obraz bodu B ve středové souměrnosti se středem S: naneste kružítkem vzdálenost |SB| na kolmici za bod S.',
        points: ['sol-a'],
        shapes: ['sol-arc-a'],
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

/** 2025, 2. řádný termín, úloha 9: rovnoramenný ABC, M na těžnici t_c (C na polopřímce SM za M). */
function isoscelesMedianPointSolution(): AssignmentModelSolution {
  const g = given('fe3fbee6-e2ca-4c69-9d1c-9c72eb7c2bdd');
  const A = g.point('a');
  const B = g.point('b');
  const M = g.point('m');
  const S = mid(A, B);
  const d = sub(M, S);
  const c = dist(A, B);
  // C leží na polopřímce SM za bodem M (M je uvnitř trojúhelníku).
  const beyondM = (x: V) => dot(sub(x, S), d) > dot(d, d);
  const C1 = lineCircle(S, d, A, c).find(beyondM)!; // |AC₁| = |AB|
  const C2 = lineCircle(S, d, B, c).find(beyondM)!; // |BC₂| = |AB|
  const far = add(S, mul(unit(d), Math.max(dist(S, C1), dist(S, C2)) + 50));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-far', far);
  s.point('sol-s', S, 'S');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.helperLine('sol-t', 'sol-s', 'sol-far');
  s.arc('sol-arc-c1', 'sol-a', 'sol-c1', 0.5);
  s.arc('sol-arc-c2', 'sol-b', 'sol-c2', 0.5);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc1', 'sol-b', 'sol-c1');
  s.segment('sol-c1a', 'sol-c1', 'sol-a');
  s.segment('sol-bc2', 'sol-b', 'sol-c2');
  s.segment('sol-c2a', 'sol-c2', 'sol-a');

  return cumulative(
    s,
    'Těžnice t_c vede ze středu S strany AB přes bod M do vrcholu C. Bod M neleží na ose úsečky AB, trojúhelník proto nemá základnu AB: buď |AC| = |AB|, nebo |BC| = |AB|. Kružnice se středem A, resp. B a poloměrem |AB| protnou polopřímku SM za bodem M ve vrcholech C₁ a C₂. Úloha má dvě řešení.',
    [
      {
        text: 'Těžnice t_c spojuje střed strany AB s vrcholem C. Sestrojte střed S úsečky AB a polopřímku SM — vrchol C na ní leží za bodem M, protože M je uvnitř trojúhelníku.',
        points: ['sol-s'],
        shapes: ['sol-t'],
      },
      {
        text: 'Kdyby AB byla základna (|AC| = |BC|), ležel by vrchol C i těžnice na ose úsečky AB. Bod M na ní neleží, rameny tedy musí být strana AC, nebo strana BC a každé rameno je stejně dlouhé jako AB.',
      },
      {
        text: 'První možnost |AC| = |AB|: kružnice se středem A a poloměrem |AB| protne polopřímku SM ve vrcholu C₁.',
        points: ['sol-c1'],
        shapes: ['sol-arc-c1'],
      },
      {
        text: 'Druhá možnost |BC| = |AB|: kružnice se středem B a poloměrem |AB| protne polopřímku SM ve vrcholu C₂. V obou případech leží M uvnitř trojúhelníku a není jeho těžištěm.',
        points: ['sol-c2'],
        shapes: ['sol-arc-c2'],
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

/** 2025, 2. řádný termín, úloha 10: rovnoběžník ABCD, úhlopříčka BD na polopřímce DM, |AC| = |DM|. */
function parallelogramDiagonalRaySolution(): AssignmentModelSolution {
  const g = given('3b226b02-7fd9-41a4-8c0b-758cbb3c30a2');
  const A = g.point('a');
  const D = g.point('d');
  const M = g.point('m');
  const d = sub(M, D);
  const half = dist(D, M) / 2;
  const hits = lineCircle(D, d, A, half);
  const S = hits.find(x => dot(sub(x, D), d) > 0)!;
  const H = mid(D, M);
  const B = sub(mul(S, 2), D);
  const C = sub(mul(S, 2), A);
  const far = add(D, mul(unit(d), Math.max(dist(D, B), dist(D, M)) + 50));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-d', D, 'D');
  s.ref('sol-m', M);
  s.ref('sol-far', far);
  s.point('sol-h', H, 'H');
  s.point('sol-s', S, 'S');
  s.point('sol-b', B, 'B');
  s.point('sol-c', C, 'C');
  s.helperLine('sol-dm', 'sol-d', 'sol-far');
  const osa = bisectorArcs(s, 'sol-dm-osa', 'sol-d', 'sol-m', D, M);
  s.circle('sol-k', 'sol-a', 'sol-s', 'k');
  s.arc('sol-arc-b', 'sol-s', 'sol-b');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.arc('sol-arc-c', 'sol-s', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčka vycházející z vrcholu D je BD, leží tedy na polopřímce DM a na ní leží i střed S rovnoběžníku. Úhlopříčky se půlí a |AC| = |DM|, proto |AS| = |DM| : 2: S je průsečík polopřímky DM s kružnicí se středem A a poloměrem |DM| : 2. Vrcholy B a C jsou obrazy bodů D a A ve středové souměrnosti se středem S.',
    [
      {
        text: 'Z vrcholu D vychází úhlopříčka BD, na polopřímce DM proto leží vrchol B i průsečík S úhlopříček. Sestrojte polopřímku DM.',
        shapes: ['sol-dm'],
      },
      {
        text: 'Druhá úhlopříčka AC měří |DM| a úhlopříčky se půlí, takže |AS| = |DM| : 2. Sestrojte osu úsečky DM; protne ji ve středu H a |DH| = |DM| : 2.',
        points: ['sol-h'],
        shapes: osa,
      },
      {
        text: 'Sestrojte kružnici k se středem A a poloměrem |DH|. Protne přímku DM ve dvou bodech, na polopřímce DM ale leží jen jeden z nich — to je střed S.',
        points: ['sol-s'],
        shapes: ['sol-k'],
      },
      {
        text: 'Vrchol B je obraz bodu D a vrchol C obraz bodu A ve středové souměrnosti se středem S. Naneste |SD| na polopřímku DM za bod S a |SA| na polopřímku AS za bod S.',
        points: ['sol-b', 'sol-c'],
        shapes: ['sol-arc-b', 'sol-ac-thin', 'sol-arc-c'],
      },
      {
        text: 'Narýsujte rovnoběžník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'rovnoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
    },
  );
}

/** 2025, 1. náhradní termín, úloha 9: rovnoramenný ABC se základnou AB, výška BM na AC, A na q. */
function isoscelesAltitudeSolution(): AssignmentModelSolution {
  const g = given('5d45eb2b-6be2-49bb-8610-18521a51b49e');
  const B = g.point('b');
  const M = g.point('m');
  const q = g.line('q');
  const dAC = perp(sub(M, B));
  const A = lineLine(M, dAC, q.a, q.d);
  const O = mid(A, B);
  const C = lineLine(M, dAC, O, perp(sub(B, A)));
  const farAC = add(C, mul(unit(sub(C, A)), 60));

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-m', M);
  s.ref('sol-far', farAC);
  s.ref('sol-o', O);
  s.point('sol-a', A, 'A');
  s.point('sol-c', C, 'C');
  s.segment('sol-bm', 'sol-b', 'sol-m', true);
  s.helperLine('sol-kolmice', 'sol-m', 'sol-far');
  s.helperLine('sol-osa', 'sol-o', 'sol-c');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Úsečka BM je výška na stranu AC, strana AC proto leží na kolmici k BM v bodě M. Vrchol A je průsečík této kolmice s přímkou q. Základna je AB, takže |AC| = |BC| a vrchol C leží na ose úsečky AB i na kolmici AM.',
    [
      {
        text: 'Úsečka BM je výška z vrcholu B a bod M leží na straně AC. Strana AC je proto kolmá k BM a prochází bodem M. Sestrojte kolmici k úsečce BM v bodě M.',
        shapes: ['sol-bm', 'sol-kolmice'],
      },
      {
        text: 'Vrchol A leží na přímce q i na přímce AC. Průsečík kolmice s přímkou q je vrchol A.',
        points: ['sol-a'],
      },
      {
        text: 'Trojúhelník má základnu AB, ramena AC a BC jsou stejně dlouhá. Vrchol C proto leží na ose úsečky AB. Sestrojte ji; protne kolmici AM ve vrcholu C (bod M leží mezi A a C).',
        points: ['sol-c'],
        shapes: ['sol-osa'],
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

/** 2025, 1. náhradní termín, úloha 10: obdélník ABCD, D na p, S střed CD — D na Thaletově kružnici nad AS. */
function rectangleSideMidpointSolution(): AssignmentModelSolution {
  const g = given('faba27b5-efdb-4fe2-9ee3-91bca4a147b8');
  const A = g.point('a');
  const S = g.point('s');
  const p = g.line('p');
  const O = mid(A, S);
  const [D1, D2] = lineCircle(p.a, p.d, O, dist(A, S) / 2).sort((a, b) => b.x - a.x);
  const C1 = sub(mul(S, 2), D1!);
  const C2 = sub(mul(S, 2), D2!);
  const B1 = add(A, sub(C1, D1!));
  const B2 = add(A, sub(C2, D2!));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.point('sol-o', O, 'O');
  s.point('sol-d1', D1!, 'D₁');
  s.point('sol-d2', D2!, 'D₂');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-c2', C2, 'C₂');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-b2', B2, 'B₂');
  s.segment('sol-as-thin', 'sol-a', 'sol-s', true);
  s.circle('sol-k', 'sol-o', 'sol-a', 'k');
  s.segment('sol-dc1-thin', 'sol-d1', 'sol-c1', true);
  s.segment('sol-dc2-thin', 'sol-d2', 'sol-c2', true);
  s.arc('sol-arc-c1', 'sol-s', 'sol-c1');
  s.arc('sol-arc-c2', 'sol-s', 'sol-c2');
  s.helperLine('sol-par1', 'sol-a', 'sol-b1');
  s.helperLine('sol-par2', 'sol-a', 'sol-b2');
  s.arc('sol-arc-b1', 'sol-a', 'sol-b1');
  s.arc('sol-arc-b2', 'sol-a', 'sol-b2');
  s.segment('sol-ab1', 'sol-a', 'sol-b1');
  s.segment('sol-b1c1', 'sol-b1', 'sol-c1');
  s.segment('sol-c1d1', 'sol-c1', 'sol-d1');
  s.segment('sol-d1a', 'sol-d1', 'sol-a');
  s.segment('sol-ab2', 'sol-a', 'sol-b2');
  s.segment('sol-b2c2', 'sol-b2', 'sol-c2');
  s.segment('sol-c2d2', 'sol-c2', 'sol-d2');
  s.segment('sol-d2a', 'sol-d2', 'sol-a');

  return cumulative(
    s,
    'Strany AD a DC obdélníku jsou kolmé a bod S leží na straně CD, úhel ADS je proto pravý a vrchol D leží na Thaletově kružnici nad průměrem AS. Ta protne přímku p ve dvou bodech D₁, D₂. Vrchol C je obraz D podle středu S a vrchol B dostaneme posunutím bodu A o úsečku DC. Úloha má dvě řešení.',
    [
      {
        text: 'Strany AD a DC jsou na sebe kolmé a bod S leží na straně CD, úhel ADS je tedy pravý. Vrchol D proto leží na Thaletově kružnici nad průměrem AS. Sestrojte střed O úsečky AS a kružnici k se středem O procházející body A a S.',
        points: ['sol-o'],
        shapes: ['sol-as-thin', 'sol-k'],
      },
      {
        text: 'Vrchol D leží i na přímce p. Kružnice k protne přímku p ve dvou bodech — označte je D₁ a D₂.',
        points: ['sol-d1', 'sol-d2'],
      },
      {
        text: 'Bod S je střed strany CD, vrchol C je proto obraz bodu D ve středové souměrnosti se středem S. Na polopřímce D₁S naneste |D₁S| za bod S a označte C₁, stejně na polopřímce D₂S bod C₂.',
        points: ['sol-c1', 'sol-c2'],
        shapes: ['sol-dc1-thin', 'sol-dc2-thin', 'sol-arc-c1', 'sol-arc-c2'],
      },
      {
        text: 'Strana AB je rovnoběžná se stranou DC a stejně dlouhá. Bodem A veďte rovnoběžku s D₁C₁ a naneste na ni od A délku |D₁C₁| na stejnou stranu, kam směřuje C₁ od D₁ — to je vrchol B₁. Stejně sestrojte B₂.',
        points: ['sol-b1', 'sol-b2'],
        shapes: ['sol-par1', 'sol-par2', 'sol-arc-b1', 'sol-arc-b2'],
      },
      {
        text: 'Narýsujte obdélníky AB₁C₁D₁ a AB₂C₂D₂. Úloha má dvě řešení.',
        shapes: ['sol-ab1', 'sol-b1c1', 'sol-c1d1', 'sol-d1a', 'sol-ab2', 'sol-b2c2', 'sol-c2d2', 'sol-d2a'],
      },
    ],
    {
      figures: [
        { name: 'obdélník AB₁C₁D₁', vertices: ['sol-a', 'sol-b1', 'sol-c1', 'sol-d1'] },
        { name: 'obdélník AB₂C₂D₂', vertices: ['sol-a', 'sol-b2', 'sol-c2', 'sol-d2'] },
      ],
    },
  );
}

/** 2025, 2. náhradní termín, úloha 9: rovnostranný ABC, C na AM, A′B′C obraz v osové souměrnosti s osou o. */
function equilateralMirrorSolution(): AssignmentModelSolution {
  const g = given('d6ec38d4-f5e3-4fd9-9fc7-2fd8ff02cc13');
  const A = g.point('a');
  const A2 = g.point('a2');
  const M = g.point('m');
  const H = mid(A, A2);
  const od = perp(sub(A2, A));
  const h = dist(A, A2) / 2;
  const r = h * 1.15;
  const off = Math.sqrt(r * r - h * h);
  const Z1 = add(H, mul(unit(od), off));
  const Z2 = sub(H, mul(unit(od), off));
  const C = lineLine(A, sub(M, A), H, od);
  // Vrchol B musí ležet na stejné straně osy o jako A, jinak by se trojúhelníky překrývaly.
  const sideA = side(A, H, od);
  const cands = [rotate(A, C, Math.PI / 3), rotate(A, C, -Math.PI / 3)];
  const B = cands.find(x => side(x, H, od) === sideA)!;
  const X = cands.find(x => x !== B)!;
  const F = foot(B, H, od);
  const B2 = sub(mul(F, 2), B);
  const farM = dist(A, M) > dist(A, C) ? M : C;

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-a2', A2, 'A′');
  s.ref('sol-m', M);
  s.ref('sol-farm', add(farM, mul(unit(sub(M, A)), 50)));
  s.ref('sol-z1', Z1);
  s.ref('sol-z2', Z2);
  s.ref('sol-x', X);
  s.ref('sol-f', F);
  s.point('sol-c', C, 'C');
  s.point('sol-b', B, 'B');
  s.point('sol-b2', B2, 'B′');
  s.arc('sol-arc-z1a', 'sol-a', 'sol-z1', 0.3);
  s.arc('sol-arc-z1b', 'sol-a2', 'sol-z1', 0.3);
  s.arc('sol-arc-z2a', 'sol-a', 'sol-z2', 0.3);
  s.arc('sol-arc-z2b', 'sol-a2', 'sol-z2', 0.3);
  s.line('sol-o', 'sol-z1', 'sol-z2', 'o');
  s.helperLine('sol-am', 'sol-a', 'sol-farm');
  s.arc('sol-arc-ba', 'sol-a', 'sol-b', 0.4);
  s.arc('sol-arc-bc', 'sol-c', 'sol-b', 0.4);
  s.arc('sol-arc-xa', 'sol-a', 'sol-x', 0.4);
  s.arc('sol-arc-xc', 'sol-c', 'sol-x', 0.4);
  s.segment('sol-bb2-thin', 'sol-b', 'sol-b2', true);
  s.arc('sol-arc-b2', 'sol-f', 'sol-b2');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');
  s.segment('sol-a2b2', 'sol-a2', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');
  s.segment('sol-ca2', 'sol-c', 'sol-a2');

  return cumulative(
    s,
    'Bod A′ je obraz bodu A, osa o je proto osa úsečky AA′. Společný vrchol C se zobrazí sám na sebe, leží tedy na ose o a zároveň na přímce AM. Rovnostranný trojúhelník ABC musí ležet celý na straně bodu A, aby se s obrazem dotýkal jen ve vrcholu C; vrchol B′ je obraz B podle osy o.',
    [
      {
        text: '9.1 Bod A′ je obraz bodu A v osové souměrnosti s osou o, osa o je proto osa úsečky AA′. Z bodů A a A′ udělejte oblouky se stejným poloměrem (větším než polovina |AA′|); jejich průsečíky spojte — to je osa o.',
        shapes: ['sol-arc-z1a', 'sol-arc-z1b', 'sol-arc-z2a', 'sol-arc-z2b', 'sol-o'],
      },
      {
        text: '9.2 Vrchol C je společný oběma trojúhelníkům, v souměrnosti se zobrazí sám na sebe, a proto leží na ose o. Leží také na přímce AM. Sestrojte přímku AM; její průsečík s osou o je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-am'],
      },
      {
        text: 'Trojúhelník ABC je rovnostranný: vrchol B je od A i od C vzdálený |AC|. Oblouky se středy A a C a poloměrem |AC| se protnou ve dvou bodech. Jeden z nich leží za osou o — trojúhelníky by se pak překrývaly. Vrchol B je druhý průsečík, na stejné straně osy jako bod A.',
        points: ['sol-b'],
        shapes: ['sol-arc-ba', 'sol-arc-bc', 'sol-arc-xa', 'sol-arc-xc'],
      },
      {
        text: 'Vrchol B′ je obraz bodu B v osové souměrnosti s osou o. Veďte bodem B kolmici k ose o a naneste za osu stejnou vzdálenost, jakou má bod B od osy.',
        points: ['sol-b2'],
        shapes: ['sol-bb2-thin', 'sol-arc-b2'],
      },
      {
        text: 'Narýsujte trojúhelníky ABC a A′B′C. Mají společný jen vrchol C.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca', 'sol-a2b2', 'sol-b2c', 'sol-ca2'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] },
        { name: 'trojúhelník A′B′C', vertices: ['sol-a2', 'sol-b2', 'sol-c'] },
      ],
      lines: [{ name: 'o', p1Id: 'sol-z1', p2Id: 'sol-z2' }],
    },
  );
}

/** 2025, 2. náhradní termín, úloha 10: rovnoběžník KLMN, S na p (p prochází M), |LN| = |LM|. */
function parallelogramEqualDiagonalSolution(): AssignmentModelSolution {
  const g = given('85623ecc-2fc6-4cc1-ae93-8fda25c8e6c7');
  const L = g.point('l');
  const M = g.point('m');
  const p = g.line('p');
  const H = mid(L, M);
  const [S1, S2] = lineCircle(p.a, p.d, L, dist(L, M) / 2).sort((a, b) => b.x - a.x);
  const N1 = sub(mul(S1!, 2), L);
  const N2 = sub(mul(S2!, 2), L);
  const K1 = sub(mul(S1!, 2), M);
  const K2 = sub(mul(S2!, 2), M);

  const s = new Board();
  s.ref('sol-l', L, 'L');
  s.ref('sol-m', M, 'M');
  s.point('sol-h', H, 'H');
  s.point('sol-s1', S1!, 'S₁');
  s.point('sol-s2', S2!, 'S₂');
  s.point('sol-k1', K1, 'K₁');
  s.point('sol-k2', K2, 'K₂');
  s.point('sol-n1', N1, 'N₁');
  s.point('sol-n2', N2, 'N₂');
  const osa = bisectorArcs(s, 'sol-lm-osa', 'sol-l', 'sol-m', L, M);
  s.circle('sol-k', 'sol-l', 'sol-h', 'k');
  s.arc('sol-arc-k1', 'sol-s1', 'sol-k1');
  s.arc('sol-arc-k2', 'sol-s2', 'sol-k2');
  s.segment('sol-ln1-thin', 'sol-l', 'sol-n1', true);
  s.segment('sol-ln2-thin', 'sol-l', 'sol-n2', true);
  s.arc('sol-arc-n1', 'sol-s1', 'sol-n1');
  s.arc('sol-arc-n2', 'sol-s2', 'sol-n2');
  s.segment('sol-k1l', 'sol-k1', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mn1', 'sol-m', 'sol-n1');
  s.segment('sol-n1k1', 'sol-n1', 'sol-k1');
  s.segment('sol-k2l', 'sol-k2', 'sol-l');
  s.segment('sol-mn2', 'sol-m', 'sol-n2');
  s.segment('sol-n2k2', 'sol-n2', 'sol-k2');

  return cumulative(
    s,
    'Střed S je středem úhlopříčky LN, proto |LS| = |LN| : 2 = |LM| : 2: S leží na kružnici se středem L a poloměrem |LM| : 2 a zároveň na přímce p. Kružnice protne p ve dvou bodech S₁, S₂. Vrcholy K a N jsou obrazy bodů M a L ve středové souměrnosti se středem S. Úloha má dvě řešení.',
    [
      {
        text: 'Úhlopříčky rovnoběžníku se půlí ve středu S, takže |LS| = |LN| : 2. Úhlopříčka LN je stejně dlouhá jako strana LM, proto |LS| = |LM| : 2. Sestrojte osou úsečky LM její střed H a kružnici k se středem L a poloměrem |LH|.',
        points: ['sol-h'],
        shapes: [...osa, 'sol-k'],
      },
      {
        text: 'Střed S leží na přímce p. Kružnice k protne přímku p ve dvou bodech — označte je S₁ a S₂.',
        points: ['sol-s1', 'sol-s2'],
      },
      {
        text: 'Úhlopříčka KM prochází středem S a bodem M, leží tedy celá na přímce p. Vrchol K je obraz bodu M ve středové souměrnosti se středem S: naneste |MS₁| na přímku p za bod S₁ a označte K₁, stejně za bod S₂ bod K₂.',
        points: ['sol-k1', 'sol-k2'],
        shapes: ['sol-arc-k1', 'sol-arc-k2'],
      },
      {
        text: 'Vrchol N je obraz bodu L ve středové souměrnosti se středem S. Na polopřímce LS₁ naneste |LS₁| za bod S₁ a označte N₁, stejně na polopřímce LS₂ bod N₂.',
        points: ['sol-n1', 'sol-n2'],
        shapes: ['sol-ln1-thin', 'sol-ln2-thin', 'sol-arc-n1', 'sol-arc-n2'],
      },
      {
        text: 'Narýsujte rovnoběžníky K₁LMN₁ a K₂LMN₂. Úloha má dvě řešení.',
        shapes: ['sol-k1l', 'sol-lm', 'sol-mn1', 'sol-n1k1', 'sol-k2l', 'sol-mn2', 'sol-n2k2'],
      },
    ],
    {
      figures: [
        { name: 'rovnoběžník K₁LMN₁', vertices: ['sol-k1', 'sol-l', 'sol-m', 'sol-n1'], extra: ['sol-s1'] },
        { name: 'rovnoběžník K₂LMN₂', vertices: ['sol-k2', 'sol-l', 'sol-m', 'sol-n2'], extra: ['sol-s2'] },
      ],
    },
  );
}

export const CERMAT_SOLUTIONS_2025: [string, () => AssignmentModelSolution][] = [
  ['34699e67-edac-4ea3-a3cb-af15f219a8f4', rectangleOnTwoLinesSolution],
  ['cadca086-00a5-418f-844e-26c0b459112d', triangleAltitudeMedianSolution],
  ['fe3fbee6-e2ca-4c69-9d1c-9c72eb7c2bdd', isoscelesMedianPointSolution],
  ['3b226b02-7fd9-41a4-8c0b-758cbb3c30a2', parallelogramDiagonalRaySolution],
  ['5d45eb2b-6be2-49bb-8610-18521a51b49e', isoscelesAltitudeSolution],
  ['faba27b5-efdb-4fe2-9ee3-91bca4a147b8', rectangleSideMidpointSolution],
  ['d6ec38d4-f5e3-4fd9-9fc7-2fd8ff02cc13', equilateralMirrorSolution],
  ['85623ecc-2fc6-4cc1-ae93-8fda25c8e6c7', parallelogramEqualDiagonalSolution],
];
