/** Vzorová řešení úloh 9 a 10 z JPZ 2022 (data v `data2022.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { type V, add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Obraz bodu `p` v osové souměrnosti s osou (bod `a`, směr `d`). */
const reflect = (p: V, a: V, d: V): V => sub(mul(foot(p, a, d), 2), p);

/** 2022, 1. řádný termín, úloha 9: rovnoramenný ABC se základnou AB, S střed ramene, A nebo B na q. */
function isoscelesLegMidpointSolution(): AssignmentModelSolution {
  const g = given('56119862-e436-42e1-a50c-9c321ea9af0f');
  const C = g.point('c');
  const S = g.point('s');
  const q = g.line('q');
  const X = sub(mul(S, 2), C);
  const r = dist(C, X);
  const [Y1, Y2] = lineCircle(q.a, q.d, C, r).sort((a, b) => a.x - b.x);

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-s', S);
  s.point('sol-x', X, 'A₁ = B₂');
  s.point('sol-y1', Y1!, 'B₁');
  s.point('sol-y2', Y2!, 'A₂');
  s.segment('sol-cx-thin', 'sol-c', 'sol-x', true);
  s.arc('sol-arc-x', 'sol-s', 'sol-x');
  s.circle('sol-k', 'sol-c', 'sol-x', 'k');
  s.segment('sol-cx', 'sol-c', 'sol-x');
  s.segment('sol-xy1', 'sol-x', 'sol-y1');
  s.segment('sol-y1c', 'sol-y1', 'sol-c');
  s.segment('sol-xy2', 'sol-x', 'sol-y2');
  s.segment('sol-y2c', 'sol-y2', 'sol-c');

  return cumulative(
    s,
    'Bod S je střed ramene, jehož jeden konec je vrchol C, druhý konec ramene je proto obraz bodu C ve středové souměrnosti se středem S. Ramena jsou stejně dlouhá, zbývající vrchol tedy leží na kružnici se středem C procházející tímto bodem a zároveň na přímce q. Kružnice protne q ve dvou bodech, úloha má dvě řešení.',
    [
      {
        text: 'Bod S je střed ramene, jehož jeden konec je vrchol C. Druhý konec tohoto ramene je obraz bodu C ve středové souměrnosti se středem S: na polopřímce CS naneste za bod S vzdálenost |CS|. Sestrojený bod je vrchol A (když S je střed ramene AC), nebo vrchol B (když S je střed ramene BC).',
        points: ['sol-x'],
        shapes: ['sol-cx-thin', 'sol-arc-x'],
      },
      {
        text: 'Ramena AC a BC jsou stejně dlouhá, zbývající vrchol základny je proto od C vzdálený stejně jako sestrojený bod. Sestrojte kružnici k se středem C procházející sestrojeným bodem.',
        shapes: ['sol-k'],
      },
      {
        text: 'Sestrojený bod na přímce q neleží, na q tedy leží zbývající vrchol základny. Kružnice k protne přímku q ve dvou bodech. Je-li S střed ramene AC, je sestrojený bod vrchol A₁ a průsečík vrchol B₁. Je-li S střed ramene BC, je sestrojený bod vrchol B₂ a druhý průsečík vrchol A₂.',
        points: ['sol-y1', 'sol-y2'],
      },
      {
        text: 'Narýsujte trojúhelníky A₁B₁C a A₂B₂C. Úloha má dvě řešení.',
        shapes: ['sol-cx', 'sol-xy1', 'sol-y1c', 'sol-xy2', 'sol-y2c'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník A₁B₁C', vertices: ['sol-x', 'sol-y1', 'sol-c'] },
        { name: 'trojúhelník A₂B₂C', vertices: ['sol-y2', 'sol-x', 'sol-c'] },
      ],
      // Vrcholy základny smí mít písmena A a B prohozená; sestrojený bod je společný oběma řešením.
      interchangeable: [['sol-x', 'sol-y1', 'sol-y2']],
    },
  );
}

/** 2022, 1. řádný termín, úloha 10: čtverec ABCD se středem O, strana BC na přímce p. */
function squareCenterSolution(): AssignmentModelSolution {
  const g = given('9e3c09a9-2e77-49a3-9401-e2df66717426');
  const O = g.point('o');
  const p = g.line('p');
  const M = foot(O, p.a, p.d);
  const h = dist(O, M);
  const [C, B] = lineCircle(p.a, p.d, M, h).sort((a, b) => a.y - b.y);
  const A = sub(mul(O, 2), C!);
  const D = sub(mul(O, 2), B!);

  const s = new Board();
  s.ref('sol-o', O);
  s.point('sol-m', M, 'S');
  s.point('sol-b', B!, 'B');
  s.point('sol-c', C!, 'C');
  s.point('sol-a', A, 'A');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-kolmice', 'sol-o', 'sol-m');
  s.circle('sol-km', 'sol-m', 'sol-o');
  s.circle('sol-k', 'sol-o', 'sol-b', 'k');
  s.segment('sol-ca-thin', 'sol-c', 'sol-a', true);
  s.segment('sol-bd-thin', 'sol-b', 'sol-d', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Pata kolmice z bodu O k přímce p je střed S strany BC a vzdálenost |OS| je polovina strany čtverce. Vrcholy B, C leží na p ve vzdálenosti |OS| od bodu S. Úhlopříčky čtverce se půlí v bodě O, vrcholy A a D jsou obrazy vrcholů C a B ve středové souměrnosti se středem O.',
    [
      {
        text: 'Střed O čtverce je od strany BC vzdálený o polovinu délky strany a pata kolmice z O ke straně BC je střed této strany. Sestrojte kolmici k přímce p procházející bodem O. Její průsečík s přímkou p označte S — je to střed strany BC.',
        points: ['sol-m'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Polovina strany čtverce je |OS|, vrcholy B a C jsou proto od bodu S vzdálené |OS|. Sestrojte kružnici se středem S procházející bodem O. Protne přímku p ve vrcholech B a C.',
        points: ['sol-b', 'sol-c'],
        shapes: ['sol-km'],
      },
      {
        text: 'Úhlopříčky čtverce jsou stejně dlouhé a půlí se v bodě O, všechny vrcholy tedy leží na kružnici k se středem O procházející bodem B. Vrchol A leží na polopřímce CO a vrchol D na polopřímce BO, oba na kružnici k.',
        points: ['sol-a', 'sol-d'],
        shapes: ['sol-k', 'sol-ca-thin', 'sol-bd-thin'],
      },
      {
        text: 'Narýsujte čtverec ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'čtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      // Prohozením B a C (a zároveň A a D) vznikne pořád čtverec ABCD se stranou BC na p.
      interchangeable: [['sol-b', 'sol-c'], ['sol-a', 'sol-d']],
    },
  );
}

/** 2022, 2. řádný termín, úloha 9: rovnoramenný ABC se základnou AB na q, |AB| = 6 cm. */
function isoscelesBaseSolution(): AssignmentModelSolution {
  const g = given('f5537aae-9082-4ee3-bc0a-3c3d01c56808');
  const C = g.point('c');
  const q = g.line('q');
  const M = foot(C, q.a, q.d);
  const [B, A] = lineCircle(q.a, q.d, M, 150); // 3 cm = 150 px

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.point('sol-m', M, 'S');
  s.point('sol-a', A!, 'A');
  s.point('sol-b', B!, 'B');
  s.helperLine('sol-kolmice', 'sol-c', 'sol-m');
  s.circle('sol-k', 'sol-m', 'sol-a', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'V rovnoramenném trojúhelníku je výška na základnu zároveň osou základny. Pata kolmice z bodu C k přímce q je proto střed S základny AB a vrcholy A, B leží na q ve vzdálenosti 3 cm od bodu S.',
    [
      {
        text: 'V rovnoramenném trojúhelníku prochází osa základny AB vrcholem C a je k základně kolmá. Sestrojte kolmici k přímce q procházející bodem C. Její průsečík s přímkou q je střed S základny AB.',
        points: ['sol-m'],
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Základna má délku 6 cm, vrcholy A a B jsou tedy od jejího středu S vzdálené 3 cm. Sestrojte kružnici k se středem S a poloměrem 3 cm.',
        shapes: ['sol-k'],
      },
      {
        text: 'Vrcholy A a B leží na kružnici k i na přímce q. Kružnice k protne přímku q ve dvou bodech — to jsou vrcholy A a B.',
        points: ['sol-a', 'sol-b'],
      },
      {
        text: 'Narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      // Vrcholy základny lze pojmenovat obráceně, trojúhelník je pořád rovnoramenný se základnou AB.
      interchangeable: [['sol-a', 'sol-b']],
    },
  );
}

/** 2022, 2. řádný termín, úloha 10: rovnoběžník ABCD, dvě strany ∥ p, úhlopříčka BD ⊥ p. */
function parallelogramPerpDiagonalSolution(): AssignmentModelSolution {
  const g = given('070552e5-1085-4627-a062-04867f0f76a7');
  const A = g.point('a');
  const C = g.point('c');
  const p = g.line('p');
  const S = mid(A, C);
  const n = perp(p.d);
  const B = lineLine(A, p.d, S, n);
  const D = lineLine(C, p.d, S, n);
  const axisDir = unit(perp(sub(C, A)));
  const O1 = add(S, mul(axisDir, 100));
  const O2 = sub(S, mul(axisDir, 100));
  const pa = add(A, unit(p.d));
  const pc = add(C, unit(p.d));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-c', C, 'C');
  s.ref('sol-o1', O1);
  s.ref('sol-o2', O2);
  s.ref('sol-pa', pa);
  s.ref('sol-pc', pc);
  s.ref('sol-n', add(S, unit(n)));
  s.point('sol-s', S, 'S');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.segment('sol-ac-thin', 'sol-a', 'sol-c', true);
  s.helperLine('sol-osa', 'sol-o1', 'sol-o2');
  s.helperLine('sol-kolmice', 'sol-s', 'sol-n');
  s.helperLine('sol-rovn-a', 'sol-a', 'sol-pa');
  s.helperLine('sol-rovn-c', 'sol-c', 'sol-pc');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky rovnoběžníku se půlí, střed S je proto střed úsečky AC. Úhlopříčka AC k přímce p kolmá není, kolmá je tedy úhlopříčka BD — leží na kolmici k p vedené bodem S. Strany rovnoběžné s p vycházejí z vrcholů A a C; rovnoběžky s p vedené body A a C protnou kolmici ve vrcholech B a D.',
    [
      {
        text: '10.1 Úhlopříčky rovnoběžníku se navzájem půlí, střed S rovnoběžníku je tedy střed úhlopříčky AC. Sestrojte osu úsečky AC; její průsečík s úsečkou AC je střed S.',
        points: ['sol-s'],
        shapes: ['sol-ac-thin', 'sol-osa'],
      },
      {
        text: '10.2 Úhlopříčka AC k přímce p kolmá není, kolmá k p je proto úhlopříčka BD. I ona prochází středem S. Sestrojte kolmici k přímce p procházející bodem S.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Strany rovnoběžné s přímkou p jsou AB a CD. Sestrojte rovnoběžku s p bodem A — protne kolmici ve vrcholu B. Rovnoběžka s p bodem C protne kolmici ve vrcholu D.',
        points: ['sol-b', 'sol-d'],
        shapes: ['sol-rovn-a', 'sol-rovn-c'],
      },
      {
        text: 'Narýsujte rovnoběžník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [
        { name: 'rovnoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'], extra: ['sol-s'] },
      ],
      // B a D leží oba na kolmici bodem S — prohozením vznikne pořád rovnoběžník ABCD.
      interchangeable: [['sol-b', 'sol-d']],
    },
  );
}

/** 2022, 1. náhradní termín, úloha 9: trojúhelník PQR, o je osou strany PR nebo QR. */
function triangleSideAxisSolution(): AssignmentModelSolution {
  const g = given('668bd325-fdd7-4006-8959-8dde3529df33');
  const P = g.point('p');
  const Q = g.point('q');
  const o = g.line('o');
  const F1 = foot(P, o.a, o.d);
  const F2 = foot(Q, o.a, o.d);
  const R1 = reflect(P, o.a, o.d);
  const R2 = reflect(Q, o.a, o.d);

  const s = new Board();
  s.ref('sol-p', P, 'P');
  s.ref('sol-q', Q, 'Q');
  s.ref('sol-f1', F1);
  s.ref('sol-f2', F2);
  s.point('sol-r1', R1, 'R₁');
  s.point('sol-r2', R2, 'R₂');
  s.segment('sol-pq-thin', 'sol-p', 'sol-q', true);
  s.helperLine('sol-kolmice-p', 'sol-p', 'sol-r1');
  s.arc('sol-arc-r1', 'sol-f1', 'sol-r1');
  s.helperLine('sol-kolmice-q', 'sol-q', 'sol-r2');
  s.arc('sol-arc-r2', 'sol-f2', 'sol-r2');
  s.segment('sol-pq', 'sol-p', 'sol-q');
  s.segment('sol-qr1', 'sol-q', 'sol-r1');
  s.segment('sol-r1p', 'sol-r1', 'sol-p');
  s.segment('sol-qr2', 'sol-q', 'sol-r2');
  s.segment('sol-r2p', 'sol-r2', 'sol-p');

  return cumulative(
    s,
    'Krajní body strany jsou souměrné podle její osy. Body P a Q podle přímky o souměrné nejsou, o tedy není osou strany PQ. Je-li o osou strany PR, je R₁ obraz bodu P v osové souměrnosti s osou o; je-li osou strany QR, je R₂ obraz bodu Q. Úloha má dvě řešení.',
    [
      {
        text: 'Osa strany je k ní kolmá a prochází jejím středem, krajní body strany jsou proto souměrné podle osy. Úsečka PQ k přímce o kolmá není, o tedy není osou strany PQ — je osou strany PR, nebo QR.',
        shapes: ['sol-pq-thin'],
      },
      {
        text: 'Je-li o osou strany PR, je vrchol R obraz bodu P v osové souměrnosti s osou o. Sestrojte kolmici k přímce o bodem P a na ni za osu naneste vzdálenost bodu P od přímky o. Dostanete vrchol R₁.',
        points: ['sol-r1'],
        shapes: ['sol-kolmice-p', 'sol-arc-r1'],
      },
      {
        text: 'Je-li o osou strany QR, je vrchol R obraz bodu Q v osové souměrnosti s osou o. Stejně sestrojte obraz bodu Q a označte ho R₂.',
        points: ['sol-r2'],
        shapes: ['sol-kolmice-q', 'sol-arc-r2'],
      },
      {
        text: 'Narýsujte trojúhelníky PQR₁ a PQR₂. Úloha má dvě řešení.',
        shapes: ['sol-pq', 'sol-qr1', 'sol-r1p', 'sol-qr2', 'sol-r2p'],
      },
    ],
    {
      figures: [
        { name: 'trojúhelník PQR₁', vertices: ['sol-p', 'sol-q', 'sol-r1'] },
        { name: 'trojúhelník PQR₂', vertices: ['sol-p', 'sol-q', 'sol-r2'] },
      ],
    },
  );
}

/** 2022, 1. náhradní termín, úloha 10: obdélník ABCD, X uvnitř AB, C na c, B nebo D na p. */
function rectangleParallelsSolution(): AssignmentModelSolution {
  const g = given('87b2f9e1-d375-4b4e-bbc3-df9b8362c9c7');
  const A = g.point('a');
  const X = g.point('x');
  const c = g.line('c');
  const p = g.line('p');
  const u = sub(X, A);
  const n = perp(u);
  // Řešení 1: B na p.
  const B1 = lineLine(A, u, p.a, p.d);
  const C1 = lineLine(B1, n, c.a, c.d);
  const D1 = add(A, sub(C1, B1));
  // Řešení 2: D na p.
  const D2 = lineLine(A, n, p.a, p.d);
  const C2 = lineLine(D2, u, c.a, c.d);
  const B2 = add(A, sub(C2, D2));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-x', X);
  s.ref('sol-na', add(A, unit(n)));
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-c1', C1, 'C₁');
  s.point('sol-d1', D1, 'D₁');
  s.point('sol-d2', D2, 'D₂');
  s.point('sol-c2', C2, 'C₂');
  s.point('sol-b2', B2, 'B₂');
  s.helperLine('sol-ax', 'sol-a', 'sol-x');
  s.helperLine('sol-kolmice-a', 'sol-a', 'sol-na');
  s.helperLine('sol-kolmice-b1', 'sol-b1', 'sol-c1');
  s.helperLine('sol-rovn-c1', 'sol-c1', 'sol-d1');
  s.helperLine('sol-rovn-d2', 'sol-d2', 'sol-c2');
  s.helperLine('sol-kolmice-c2', 'sol-c2', 'sol-b2');
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
    'Strana AB leží na polopřímce AX a strana AD na kolmici k ní v bodě A. Na přímce p leží buď vrchol B (průsečík polopřímky AX s p), nebo vrchol D (průsečík kolmice s p). Zbylé vrcholy doplní kolmice a rovnoběžky s AX, vrchol C přitom leží na přímce c. Úloha má dvě řešení.',
    [
      {
        text: 'Bod X leží uvnitř strany AB, strana AB tedy leží na polopřímce AX. Strana AD je k ní kolmá. Sestrojte polopřímku AX a kolmici k ní v bodě A.',
        shapes: ['sol-ax', 'sol-kolmice-a'],
      },
      {
        text: 'První možnost: na přímce p leží vrchol B. Polopřímka AX protne přímku p ve vrcholu B₁. Kolmice k AX v bodě B₁ protne přímku c ve vrcholu C₁. Rovnoběžka s AX bodem C₁ protne kolmici v bodě A ve vrcholu D₁.',
        points: ['sol-b1', 'sol-c1', 'sol-d1'],
        shapes: ['sol-kolmice-b1', 'sol-rovn-c1'],
      },
      {
        text: 'Druhá možnost: na přímce p leží vrchol D. Kolmice v bodě A protne přímku p ve vrcholu D₂. Rovnoběžka s AX bodem D₂ protne přímku c ve vrcholu C₂ a kolmice k AX bodem C₂ protne polopřímku AX ve vrcholu B₂. Bod X leží uvnitř strany AB₁ i AB₂.',
        points: ['sol-d2', 'sol-c2', 'sol-b2'],
        shapes: ['sol-rovn-d2', 'sol-kolmice-c2'],
      },
      {
        text: 'Narýsujte obdélníky AB₁C₁D₁ a AB₂C₂D₂. Úloha má dvě řešení.',
        shapes: [
          'sol-ab1', 'sol-b1c1', 'sol-c1d1', 'sol-d1a',
          'sol-ab2', 'sol-b2c2', 'sol-c2d2', 'sol-d2a',
        ],
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

/** 2022, 2. náhradní termín, úloha 9: rovnoběžník ABCD se středem S, B na p, |∠ASB| = 120°. */
function parallelogram120Solution(): AssignmentModelSolution {
  const g = given('5ea60228-04fd-48ad-90f0-254e3a876e1f');
  const A = g.point('a');
  const S = g.point('s');
  const p = g.line('p');
  const C = sub(mul(S, 2), A);
  // Úhel CSB je vedlejší k úhlu ASB, má 60°: B leží na polopřímce SE, kde SCE je rovnostranný.
  const options = [1, -1].map(sg => {
    const E = rotate(C, S, (sg * Math.PI) / 3);
    const B = lineLine(S, sub(E, S), p.a, p.d);
    return { E, B, ahead: dot(sub(B, S), sub(E, S)) > 0 };
  });
  const { E, B } = options.find(o => o.ahead)!;
  const D = sub(mul(S, 2), B);

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-s', S);
  s.ref('sol-e', E);
  s.point('sol-c', C, 'C');
  s.point('sol-b', B, 'B');
  s.point('sol-d', D, 'D');
  s.helperLine('sol-ac', 'sol-a', 'sol-c');
  s.arc('sol-arc-c', 'sol-s', 'sol-c');
  s.arc('sol-arc-e1', 'sol-s', 'sol-e');
  s.arc('sol-arc-e2', 'sol-c', 'sol-e');
  s.helperLine('sol-bd', 'sol-s', 'sol-b');
  s.arc('sol-arc-d', 'sol-s', 'sol-d');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Úhlopříčky rovnoběžníku se půlí v bodě S, vrchol C je proto obraz bodu A ve středové souměrnosti se středem S. Úhel BSC je vedlejší k úhlu ASB a má 60°, sestrojí se pomocí rovnostranného trojúhelníku. Jeho rameno protne přímku p ve vrcholu B a vrchol D je obraz B podle středu S.',
    [
      {
        text: 'Úhlopříčky rovnoběžníku se navzájem půlí v bodě S. Vrchol C proto leží na polopřímce AS a |SC| = |SA|. Sestrojte přímku AS a za bod S naneste vzdálenost |SA|. Dostanete vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-ac', 'sol-arc-c'],
      },
      {
        text: 'Úhel ASB má 120°, vedlejší úhel BSC má tedy 180° − 120° = 60°. Úhel 60° je úhel rovnostranného trojúhelníku: oblouky se středy S a C a poloměrem |SC| se protnou v bodě, se kterým body S a C tvoří rovnostranný trojúhelník.',
        shapes: ['sol-arc-e1', 'sol-arc-e2'],
      },
      {
        text: 'Polopřímka ze středu S přes průsečík oblouků svírá s polopřímkou SC úhel 60°. Protne přímku p ve vrcholu B. (Druhý průsečík oblouků, na opačné straně přímky AC, dává polopřímku, která přímku p neprotne.)',
        points: ['sol-b'],
        shapes: ['sol-bd'],
      },
      {
        text: 'Vrchol D je obraz vrcholu B ve středové souměrnosti se středem S: na polopřímce BS naneste za bod S vzdálenost |SB|.',
        points: ['sol-d'],
        shapes: ['sol-arc-d'],
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

/** 2022, 2. náhradní termín, úloha 10: rovnoramenný ABC, ramena 5 cm, osa CQ, jeden vrchol na p. */
function isoscelesAxisSolution(): AssignmentModelSolution {
  const g = given('cc670aa6-d652-4090-b22b-88e347470afd');
  const C = g.point('c');
  const Q = g.point('q');
  const p = g.line('p');
  const axis = sub(Q, C);
  const [B2, A1] = lineCircle(p.a, p.d, C, 250); // 5 cm = 250 px
  const B1 = reflect(A1!, C, axis);
  const A2 = reflect(B2!, C, axis);

  const s = new Board();
  s.ref('sol-c', C, 'C');
  s.ref('sol-q', Q);
  s.point('sol-a1', A1!, 'A₁');
  s.point('sol-b1', B1, 'B₁');
  s.point('sol-a2', A2, 'A₂');
  s.point('sol-b2', B2!, 'B₂');
  s.helperLine('sol-osa', 'sol-c', 'sol-q', 'o');
  s.circle('sol-k', 'sol-c', 'sol-a1', 'k');
  s.helperLine('sol-kolmice-1', 'sol-a1', 'sol-b1');
  s.helperLine('sol-kolmice-2', 'sol-b2', 'sol-a2');
  s.segment('sol-a1b1', 'sol-a1', 'sol-b1');
  s.segment('sol-b1c', 'sol-b1', 'sol-c');
  s.segment('sol-ca1', 'sol-c', 'sol-a1');
  s.segment('sol-a2b2', 'sol-a2', 'sol-b2');
  s.segment('sol-b2c', 'sol-b2', 'sol-c');
  s.segment('sol-ca2', 'sol-c', 'sol-a2');

  return cumulative(
    s,
    'Osa souměrnosti rovnoramenného trojúhelníku prochází vrcholem C, je to přímka CQ. Vrcholy A, B leží na kružnici se středem C a poloměrem 5 cm; ta protne přímku p ve dvou bodech. Každý z nich je jeden vrchol základny a druhý vrchol je jeho obraz v osové souměrnosti s osou CQ. Úloha má dvě řešení.',
    [
      {
        text: 'Osa souměrnosti rovnoramenného trojúhelníku ABC prochází vrcholem C a je kolmá k základně AB. Prochází i bodem Q, je to tedy přímka CQ. Sestrojte ji.',
        shapes: ['sol-osa'],
      },
      {
        text: 'Ramena AC a BC mají délku 5 cm, vrcholy A a B proto leží na kružnici k se středem C a poloměrem 5 cm. Vrchol C na přímce p neleží, na p tedy leží vrchol A nebo B. Kružnice k protne přímku p ve dvou bodech — označte je A₁ a B₂.',
        points: ['sol-a1', 'sol-b2'],
        shapes: ['sol-k'],
      },
      {
        text: 'Druhý vrchol základny je obraz prvního v osové souměrnosti s osou CQ. Kolmice k přímce CQ bodem A₁ protne kružnici k podruhé ve vrcholu B₁, kolmice bodem B₂ ve vrcholu A₂.',
        points: ['sol-b1', 'sol-a2'],
        shapes: ['sol-kolmice-1', 'sol-kolmice-2'],
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
      // Vrcholy základny smí mít písmena A a B prohozená.
      interchangeable: [['sol-a1', 'sol-b1'], ['sol-a2', 'sol-b2']],
    },
  );
}

export const CERMAT_SOLUTIONS_2022: [string, () => AssignmentModelSolution][] = [
  ['56119862-e436-42e1-a50c-9c321ea9af0f', isoscelesLegMidpointSolution],
  ['9e3c09a9-2e77-49a3-9401-e2df66717426', squareCenterSolution],
  ['f5537aae-9082-4ee3-bc0a-3c3d01c56808', isoscelesBaseSolution],
  ['070552e5-1085-4627-a062-04867f0f76a7', parallelogramPerpDiagonalSolution],
  ['668bd325-fdd7-4006-8959-8dde3529df33', triangleSideAxisSolution],
  ['87b2f9e1-d375-4b4e-bbc3-df9b8362c9c7', rectangleParallelsSolution],
  ['5ea60228-04fd-48ad-90f0-254e3a876e1f', parallelogram120Solution],
  ['cc670aa6-d652-4090-b22b-88e347470afd', isoscelesAxisSolution],
];
