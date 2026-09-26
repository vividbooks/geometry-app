/** Vzorová řešení úloh 9 a 10 z JPZ 2015–2017 (data v `data2015-2017.ts`). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, dot, foot, given, lineCircle, lineLine, mid, mul, perp, rotate, sub, unit } from './board';

/** Popisek úsečky (Board.segment ho neumí) — např. výška *v*. Tvary jsou sdílené mezi kroky. */
function labelShape(sol: AssignmentModelSolution, shapeId: string, label: string): AssignmentModelSolution {
  for (const snap of [sol.snapshot, ...sol.steps.map(s => s.snapshot)]) {
    for (const shape of snap.shapes) if (shape.id === shapeId) shape.label = label;
  }
  return sol;
}

/** 2017, 1. řádný termín, úloha 9: rovnoramenný KLM s osou o, KL na p — K = o ∩ p, M obraz L podle o. */
function isoscelesAxisSolution(): AssignmentModelSolution {
  const g = given('945ea4b4-5157-4c8b-ac4c-97ca027ec5d4');
  const L = g.point('l');
  const o = g.line('o');
  const p = g.line('p');
  const K = lineLine(o.a, o.d, p.a, p.d);
  const F = foot(L, o.a, o.d);
  const M = sub(mul(F, 2), L);

  const s = new Board();
  s.ref('sol-l', L, 'L');
  s.ref('sol-f', F);
  s.point('sol-k', K, 'K');
  s.point('sol-m', M, 'M');
  s.helperLine('sol-kolmice', 'sol-l', 'sol-f');
  s.arc('sol-arc-m', 'sol-f', 'sol-m');
  s.segment('sol-kl', 'sol-k', 'sol-l');
  s.segment('sol-lm', 'sol-l', 'sol-m');
  s.segment('sol-mk', 'sol-m', 'sol-k');

  return cumulative(
    s,
    'Osa souměrnosti rovnoramenného trojúhelníku prochází hlavním vrcholem a je kolmá k základně. Bod L na ose neleží, je to vrchol základny, a hlavní vrchol K leží na ose o i na přímce p. Vrchol M je obraz bodu L v osové souměrnosti s osou o.',
    [
      {
        text: 'Osa souměrnosti rovnoramenného trojúhelníku prochází hlavním vrcholem. Bod L na ose o neleží, je to tedy vrchol základny a hlavním vrcholem je K. Vrchol K leží na ose o a zároveň na přímce p (strana KL leží na p) — je to průsečík přímek o a p.',
        points: ['sol-k'],
      },
      {
        text: 'Druhý vrchol základny M je obraz bodu L v osové souměrnosti s osou o. Sestrojte kolmici k přímce o procházející bodem L.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Bod M leží na kolmici na druhé straně osy o a je od osy stejně daleko jako bod L. Naneste tuto vzdálenost kružítkem za osu a označte M.',
        points: ['sol-m'],
        shapes: ['sol-arc-m'],
      },
      {
        text: 'Narýsujte trojúhelník KLM.',
        shapes: ['sol-kl', 'sol-lm', 'sol-mk'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník KLM', vertices: ['sol-k', 'sol-l', 'sol-m'] }],
    },
  );
}

/** 2017, 1. řádný termín, úloha 10: pravoúhlý lichoběžník ABCD, CD ∥ AB, BC ⊥ AB. */
function rightTrapezoidSolution(): AssignmentModelSolution {
  const g = given('e8ba1297-750a-4136-b690-5407da0d82c3');
  const A = g.point('a');
  const B = g.point('b');
  const D = g.point('d');
  const u = sub(B, A);
  const n = perp(u);
  const C = lineLine(D, u, B, n);
  const D2 = add(D, mul(unit(u), 100));
  const B2 = add(B, mul(unit(n), 100));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-d', D, 'D');
  s.ref('sol-d2', D2);
  s.ref('sol-b2', B2);
  s.point('sol-c', C, 'C');
  s.helperLine('sol-rovnobezka', 'sol-d', 'sol-d2');
  s.helperLine('sol-kolmice', 'sol-b', 'sol-b2');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Základny lichoběžníku jsou AB a CD, proto vrchol C leží na rovnoběžce s AB vedené bodem D. Úhel u vrcholu A pravý není, pravý úhel je tedy u vrcholu B a rameno BC je kolmé k AB. Vrchol C je průsečík rovnoběžky a kolmice.',
    [
      {
        text: 'Strany AB a CD jsou základny lichoběžníku, jsou tedy rovnoběžné. Sestrojte rovnoběžku s přímkou AB procházející bodem D — na ní leží vrchol C.',
        shapes: ['sol-rovnobezka'],
      },
      {
        text: 'V pravoúhlém lichoběžníku je jedno rameno kolmé k základnám. Úhel DAB pravý není, kolmé musí být rameno BC. Sestrojte kolmici k přímce AB v bodě B.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Průsečík rovnoběžky a kolmice je vrchol C. Označte ho.',
        points: ['sol-c'],
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

/** 2017, 2. řádný termín, úloha 9: obraz trojúhelníku RST ve středové souměrnosti se středem S. */
function pointReflectionTriangleSolution(): AssignmentModelSolution {
  const g = given('7b69ed0e-c269-4c28-9f1b-874ff1bd7ed7');
  const R = g.point('r');
  const S = g.point('s');
  const T = g.point('t');
  const R1 = sub(mul(S, 2), R);
  const T1 = sub(mul(S, 2), T);

  const s = new Board();
  s.ref('sol-r', R);
  s.ref('sol-t', T);
  // Vrchol S₁ splývá s daným bodem S — v kontrole je to daný vrchol, na plátně jen popisek S₁.
  s.ref('sol-s', S, 'S₁');
  s.point('sol-s1', S, 'S₁');
  s.point('sol-r1', R1, 'R₁');
  s.point('sol-t1', T1, 'T₁');
  s.segment('sol-rr1', 'sol-r', 'sol-r1', true);
  s.arc('sol-arc-r1', 'sol-s', 'sol-r1');
  s.segment('sol-tt1', 'sol-t', 'sol-t1', true);
  s.arc('sol-arc-t1', 'sol-s', 'sol-t1');
  s.segment('sol-r1s1', 'sol-r1', 'sol-s');
  s.segment('sol-s1t1', 'sol-s', 'sol-t1');
  s.segment('sol-t1r1', 'sol-t1', 'sol-r1');

  return cumulative(
    s,
    'Střed souměrnosti S se zobrazí sám na sebe, proto S₁ = S. Obraz R₁ leží na polopřímce RS za bodem S ve vzdálenosti |RS|, obraz T₁ na polopřímce TS za bodem S ve vzdálenosti |TS|.',
    [
      {
        text: 'Ve středové souměrnosti se střed S zobrazí sám na sebe. Obraz vrcholu S je tedy bod S₁ = S — označte ho S₁.',
        points: ['sol-s1'],
      },
      {
        text: 'Obraz R₁ leží na polopřímce RS za bodem S a |SR₁| = |RS|. Prodlužte úsečku RS za bod S, naneste kružítkem vzdálenost |RS| a označte R₁.',
        points: ['sol-r1'],
        shapes: ['sol-rr1', 'sol-arc-r1'],
      },
      {
        text: 'Stejně sestrojte T₁: prodlužte úsečku TS za bod S a naneste vzdálenost |TS|.',
        points: ['sol-t1'],
        shapes: ['sol-tt1', 'sol-arc-t1'],
      },
      {
        text: 'Narýsujte trojúhelník R₁S₁T₁ a označte všechny jeho vrcholy.',
        shapes: ['sol-r1s1', 'sol-s1t1', 'sol-t1r1'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník R₁S₁T₁', vertices: ['sol-r1', 'sol-s', 'sol-t1'] }],
    },
  );
}

/** 2017, 2. řádný termín, úloha 10: rovnoramenný lichoběžník ABCD vepsaný do k, AB ∥ CD ve vzdálenosti r. */
function isoscelesTrapezoidInCircleSolution(): AssignmentModelSolution {
  const g = given('9fe9e420-8e4b-48b2-8ed0-a515f80db1b2');
  const S = g.point('s');
  const C = g.point('c');
  const D = g.point('d');
  const k = g.circle('k');
  const r = k.r;
  const dcd = sub(C, D);
  const F = foot(S, D, dcd);
  const n = unit(sub(S, F));
  const E = add(F, mul(n, r));
  const E2 = add(E, mul(unit(dcd), 100));
  const [A, B] = lineCircle(E, dcd, S, r).sort((p, q) => dist(p, D) - dist(q, D));
  const P = foot(D, E, dcd);

  const s = new Board();
  s.ref('sol-s', S);
  s.ref('sol-c', C, 'C');
  s.ref('sol-d', D, 'D');
  s.ref('sol-f', F);
  s.ref('sol-e', E);
  s.ref('sol-e2', E2);
  // Pata výšky: v kontrole daný bod (nemusí být pojmenovaný), na plátně popisek P.
  s.ref('sol-p', P, 'P');
  s.point('sol-p-label', P, 'P');
  s.point('sol-a', A!, 'A');
  s.point('sol-b', B!, 'B');
  s.line('sol-o', 'sol-f', 'sol-e', 'o');
  s.arc('sol-arc-e', 'sol-f', 'sol-e');
  s.helperLine('sol-rovnobezka', 'sol-e', 'sol-e2');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');
  s.segment('sol-v', 'sol-d', 'sol-p');

  const sol = cumulative(
    s,
    'Vrcholy A, B mají od přímky CD vzdálenost r, leží proto na rovnoběžce s CD ve vzdálenosti r; kružnici k protne jen rovnoběžka na straně středu S. Její průsečíky s kružnicí k jsou vrcholy A (u vrcholu D) a B. Osa souměrnosti o je kolmice k CD vedená středem S, výška v je kolmice z bodu D k základně AB.',
    [
      {
        text: '10.2 Rovnoramenný lichoběžník vepsaný do kružnice je souměrný podle přímky, která prochází středem S a je kolmá k základnám. Sestrojte kolmici k přímce CD procházející bodem S a označte ji o.',
        shapes: ['sol-o'],
      },
      {
        text: '10.1 Vrcholy A, B mají od přímky CD vzdálenost r = |SC|. Na ose o naneste kružítkem od přímky CD vzdálenost |SC| směrem ke středu S a tímto bodem veďte rovnoběžku s přímkou CD. Rovnoběžka na druhé straně přímky CD by byla od S dál než r a kružnici k by neprotnula.',
        shapes: ['sol-arc-e', 'sol-rovnobezka'],
      },
      {
        text: 'Rovnoběžka protne kružnici k ve dvou bodech — to jsou vrcholy A a B. Vrchol A označte na straně vrcholu D, vrchol B na straně vrcholu C, aby strany AD a BC byly ramena.',
        points: ['sol-a', 'sol-b'],
      },
      {
        text: 'Narýsujte lichoběžník ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
      {
        text: '10.3 Výška z vrcholu D je kolmá k základně AB. Sestrojte kolmici z bodu D k přímce AB; patu kolmice označte P. Úsečka DP je výška — označte ji v.',
        points: ['sol-p-label'],
        shapes: ['sol-v'],
      },
    ],
    {
      figures: [
        { name: 'lichoběžník ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] },
        // Pata výšky P se nekontroluje jako hledaný bod — jen narýsovaná úsečka DP.
        { name: 'výška v', vertices: ['sol-d', 'sol-p'] },
      ],
      lines: [{ name: 'o', p1Id: 'sol-f', p2Id: 'sol-e' }],
    },
  );
  return labelShape(sol, 'sol-v', 'v');
}

/** 2016, 1. řádný termín, úloha 9: K na p s úhlem KLM = 60°, N na p s |MN| = |ML|. */
function angleAndDistanceOnLineSolution(): AssignmentModelSolution {
  const g = given('a1a8f6ef-551a-4893-ae35-cdbfefe22230');
  const L = g.point('l');
  const M = g.point('m');
  const p = g.line('p');
  const e = 150; // 3 cm — strana pomocného rovnostranného trojúhelníku
  const X = add(L, mul(unit(sub(M, L)), e));
  // Rameno úhlu 60° od LM, které přímku p protne (druhé míří od ní).
  const hit = [Math.PI / 3, -Math.PI / 3]
    .map(rad => {
      const E = rotate(X, L, rad);
      const K = lineLine(L, sub(E, L), p.a, p.d);
      return { E, K, ok: dot(sub(K, L), sub(E, L)) > 0 };
    })
    .filter(h => h.ok);
  const { E, K } = hit[0]!;
  const r = dist(M, L);
  const [N1, N2] = lineCircle(p.a, p.d, M, r).sort((a, b) => a.x - b.x);

  const s = new Board();
  s.ref('sol-l', L);
  s.ref('sol-m', M);
  s.ref('sol-x', X);
  s.ref('sol-e', E);
  s.point('sol-k', K, 'K');
  s.point('sol-n1', N1!, 'N₁');
  s.point('sol-n2', N2!, 'N₂');
  s.segment('sol-lm', 'sol-l', 'sol-m', true);
  s.arc('sol-arc-x', 'sol-l', 'sol-x');
  s.arc('sol-arc-e1', 'sol-l', 'sol-e');
  s.arc('sol-arc-e2', 'sol-x', 'sol-e');
  s.segment('sol-le', 'sol-l', 'sol-e', true);
  s.arc('sol-arc-n1', 'sol-m', 'sol-n1', 0.3);
  s.arc('sol-arc-n2', 'sol-m', 'sol-n2', 0.3);

  return cumulative(
    s,
    'Úhel 60° je vnitřní úhel rovnostranného trojúhelníku: sestrojíte ho nad úsečkou LM a jeho rameno protne přímku p v bodě K (rameno na druhou stranu od LM přímku p neprotne). Body N leží na kružnici se středem M a poloměrem |ML|, která protne přímku p ve dvou bodech N₁ a N₂.',
    [
      {
        text: '9.1 Úhel 60° sestrojíte pomocí rovnostranného trojúhelníku. Narýsujte úsečku LM a naneste na ni od bodu L kružítkem vzdálenost 3 cm. Stejným poloměrem opište oblouky se středem v bodě L a v nově naneseném bodě — protnou se ve třetím vrcholu rovnostranného trojúhelníku.',
        shapes: ['sol-lm', 'sol-arc-x', 'sol-arc-e1', 'sol-arc-e2'],
      },
      {
        text: 'Polopřímka z bodu L přes průsečík oblouků svírá s úsečkou LM úhel 60°. Protne přímku p v bodě K. Rameno úhlu 60° na druhé straně od LM míří od přímky p a neprotne ji, bod K je proto jen jeden.',
        points: ['sol-k'],
        shapes: ['sol-le'],
      },
      {
        text: '9.2 Body N mají od bodu M stejnou vzdálenost jako bod L, leží tedy na kružnici se středem M a poloměrem |ML|. Opište kružítkem z bodu M oblouky o poloměru |ML| přes přímku p.',
        shapes: ['sol-arc-n1', 'sol-arc-n2'],
      },
      {
        text: 'Oblouky protnou přímku p ve dvou bodech — označte je N₁ a N₂. Na přímce p tedy leží jeden bod K a dva body N.',
        points: ['sol-n1', 'sol-n2'],
      },
    ],
    {
      figures: [
        { name: 'bod K', vertices: ['sol-k'] },
        { name: 'bod N₁', vertices: ['sol-n1'] },
        { name: 'bod N₂', vertices: ['sol-n2'] },
      ],
    },
  );
}

/** 2016, 1. řádný termín, úloha 10: čtverec ABCD s úhlopříčkou BD. */
function squareFromDiagonalSolution(): AssignmentModelSolution {
  const g = given('4aa04c20-bb1e-481f-aeda-d0121ec69768');
  const B = g.point('b');
  const D = g.point('d');
  const S = mid(B, D);
  const half = dist(B, D) / 2;
  const n = unit(perp(sub(B, D)));
  const ra = dist(B, D) * 0.75;
  const h = Math.sqrt(ra * ra - half * half);
  const X1 = add(S, mul(n, h));
  const X2 = sub(S, mul(n, h));
  const [A, C] = [add(S, mul(n, half)), sub(S, mul(n, half))].sort((p, q) => p.x - q.x);

  const s = new Board();
  s.ref('sol-b', B, 'B');
  s.ref('sol-d', D, 'D');
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.point('sol-s', S, 'S');
  s.point('sol-a', A!, 'A');
  s.point('sol-c', C!, 'C');
  s.arc('sol-arc-b1', 'sol-b', 'sol-x1', 0.3);
  s.arc('sol-arc-d1', 'sol-d', 'sol-x1', 0.3);
  s.arc('sol-arc-b2', 'sol-b', 'sol-x2', 0.3);
  s.arc('sol-arc-d2', 'sol-d', 'sol-x2', 0.3);
  s.helperLine('sol-osa', 'sol-x1', 'sol-x2');
  s.circle('sol-k', 'sol-s', 'sol-b', 'k');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-cd', 'sol-c', 'sol-d');
  s.segment('sol-da', 'sol-d', 'sol-a');

  return cumulative(
    s,
    'Body B a D jsou protější vrcholy, úsečka BD je tedy úhlopříčka čtverce. Úhlopříčky čtverce jsou stejně dlouhé, navzájem kolmé a půlí se: vrcholy A, C leží na ose úsečky BD ve vzdálenosti |SB| od jejího středu S.',
    [
      {
        text: 'Vrcholy B a D jsou ve čtverci ABCD protější, úsečka BD je jeho úhlopříčka. Druhá úhlopříčka AC je k ní kolmá a půlí ji — leží na ose úsečky BD. Opište z bodů B a D oblouky o stejném poloměru (větším než polovina |BD|) a jejich průsečíky spojte přímkou.',
        shapes: ['sol-arc-b1', 'sol-arc-d1', 'sol-arc-b2', 'sol-arc-d2', 'sol-osa'],
      },
      {
        text: 'Osa protne úsečku BD v jejím středu S. To je střed čtverce, v něm se úhlopříčky půlí.',
        points: ['sol-s'],
      },
      {
        text: 'Úhlopříčky čtverce jsou stejně dlouhé, proto |SA| = |SC| = |SB|. Sestrojte kružnici k se středem S a poloměrem |SB|. Protne osu ve vrcholech A a C.',
        points: ['sol-a', 'sol-c'],
        shapes: ['sol-k'],
      },
      {
        text: 'Narýsujte čtverec ABCD.',
        shapes: ['sol-ab', 'sol-bc', 'sol-cd', 'sol-da'],
      },
    ],
    {
      figures: [{ name: 'čtverec ABCD', vertices: ['sol-a', 'sol-b', 'sol-c', 'sol-d'] }],
      // A a C leží oba na ose BD — prohozením vznikne pořád čtverec ABCD.
      interchangeable: [['sol-a', 'sol-c']],
    },
  );
}

/** 2015, 1. řádný termín, úloha 9: obraz bodu A a přímky p v osové souměrnosti s osou o. */
function axialImageSolution(): AssignmentModelSolution {
  const g = given('1c15fd5e-c352-4a78-b019-1f00dbfd37e7');
  const A = g.point('a');
  const o = g.line('o');
  const p = g.line('p');
  const F = foot(A, o.a, o.d);
  const B = sub(mul(F, 2), A);
  const X = lineLine(o.a, o.d, p.a, p.d);

  const s = new Board();
  s.ref('sol-a', A);
  s.ref('sol-f', F);
  s.point('sol-b', B, 'B');
  s.point('sol-x', X, 'X');
  s.helperLine('sol-kolmice', 'sol-a', 'sol-f');
  s.arc('sol-arc-b', 'sol-f', 'sol-b');
  s.line('sol-q', 'sol-x', 'sol-b', 'q');

  return cumulative(
    s,
    'Bod B leží na kolmici k ose o vedené bodem A, na druhé straně osy a ve stejné vzdálenosti od ní. Průsečík X přímek o a p leží na ose, zobrazí se sám na sebe. Obraz q přímky p proto prochází body X a B.',
    [
      {
        text: '9.1 Bod a jeho obraz v osové souměrnosti leží na přímce kolmé k ose. Sestrojte kolmici k přímce o procházející bodem A.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Obraz B je od osy o stejně daleko jako bod A, ale na druhé straně. Naneste kružítkem vzdálenost bodu A od osy za osu a označte bod B.',
        points: ['sol-b'],
        shapes: ['sol-arc-b'],
      },
      {
        text: '9.2 Průsečík X přímek o a p leží na ose souměrnosti, jeho obrazem je proto on sám. Obraz přímky p tedy prochází bodem X.',
        points: ['sol-x'],
      },
      {
        text: 'Bod A leží na přímce p, jeho obraz B proto leží na přímce q. Narýsujte přímku q procházející body X a B.',
        shapes: ['sol-q'],
      },
    ],
    {
      figures: [{ name: 'bod B', vertices: ['sol-b'] }],
      lines: [{ name: 'q', p1Id: 'sol-x', p2Id: 'sol-b' }],
    },
  );
}

/** 2015, 1. řádný termín, úloha 10: rovnoramenný ABC se základnou AB a vrcholem C na polopřímce BY. */
function isoscelesOnRaySolution(): AssignmentModelSolution {
  const g = given('b074f32f-f15e-47ca-b924-af04f17ef939');
  const A = g.point('a');
  const B = g.point('b');
  const Y = g.point('y');
  const M = mid(A, B);
  const half = dist(A, B) / 2;
  const n = unit(perp(sub(B, A)));
  const ra = dist(A, B) * 0.6;
  const h = Math.sqrt(ra * ra - half * half);
  const X1 = add(M, mul(n, h));
  const X2 = sub(M, mul(n, h));
  const C = lineLine(M, n, B, sub(Y, B));
  const far = add(B, mul(sub(Y, B), 1.15));

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-far', far);
  s.ref('sol-x1', X1);
  s.ref('sol-x2', X2);
  s.point('sol-c', C, 'C');
  s.arc('sol-arc-a1', 'sol-a', 'sol-x1', 0.3);
  s.arc('sol-arc-b1', 'sol-b', 'sol-x1', 0.3);
  s.arc('sol-arc-a2', 'sol-a', 'sol-x2', 0.3);
  s.arc('sol-arc-b2', 'sol-b', 'sol-x2', 0.3);
  s.line('sol-o', 'sol-x1', 'sol-x2', 'o');
  s.segment('sol-by', 'sol-b', 'sol-far', true);
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Vrchol C rovnoramenného trojúhelníku se základnou AB je stejně daleko od A i od B, leží proto na ose úsečky AB. Ta protne polopřímku BY ve vrcholu C a je zároveň osou souměrnosti o trojúhelníku ABC.',
    [
      {
        text: 'Ramena AC a BC jsou stejně dlouhá, vrchol C je proto stejně daleko od bodů A a B a leží na ose úsečky AB. Opište z bodů A a B oblouky o stejném poloměru (větším než polovina |AB|) — protnou se ve dvou bodech.',
        shapes: ['sol-arc-a1', 'sol-arc-b1', 'sol-arc-a2', 'sol-arc-b2'],
      },
      {
        text: '10.2 Průsečíky oblouků spojte přímkou — je to osa úsečky AB. Prochází vrcholem C a je kolmá k základně, je to tedy osa souměrnosti o trojúhelníku ABC.',
        shapes: ['sol-o'],
      },
      {
        text: '10.1 Sestrojte polopřímku BY. Její průsečík s osou o je vrchol C.',
        points: ['sol-c'],
        shapes: ['sol-by'],
      },
      {
        text: 'Narýsujte trojúhelník ABC.',
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    {
      figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }],
      lines: [{ name: 'o', p1Id: 'sol-x1', p2Id: 'sol-x2' }],
    },
  );
}

export const CERMAT_SOLUTIONS_2015_2017: [string, () => AssignmentModelSolution][] = [
  ['945ea4b4-5157-4c8b-ac4c-97ca027ec5d4', isoscelesAxisSolution],
  ['e8ba1297-750a-4136-b690-5407da0d82c3', rightTrapezoidSolution],
  ['7b69ed0e-c269-4c28-9f1b-874ff1bd7ed7', pointReflectionTriangleSolution],
  ['9fe9e420-8e4b-48b2-8ed0-a515f80db1b2', isoscelesTrapezoidInCircleSolution],
  ['a1a8f6ef-551a-4893-ae35-cdbfefe22230', angleAndDistanceOnLineSolution],
  ['4aa04c20-bb1e-481f-aeda-d0121ec69768', squareFromDiagonalSolution],
  ['1c15fd5e-c352-4a78-b019-1f00dbfd37e7', axialImageSolution],
  ['b074f32f-f15e-47ca-b924-af04f17ef939', isoscelesOnRaySolution],
];
