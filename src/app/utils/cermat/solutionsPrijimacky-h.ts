/** Vzorová řešení rýsovacích úloh vlastních přijímačkových testů, balík H — vlastní test B4 (viz dataPrijimacky-h.ts). */
import type { AssignmentModelSolution } from '../assignmentSolutions';
import { add, Board, cumulative, dist, foot, given, lineCircle, mid, mul, perp, sub, unit } from './board';

/** Vlastní test B4, úloha 9: úsečky XY se středem S, X na p, Y na k — obraz p′ přímky p ∩ k, dvě řešení. */
function midpointSegmentSolution(): AssignmentModelSolution {
  const g = given('4d9f1111-c9ed-4623-8ca6-6e0a845b22ab');
  const S = g.point('s');
  const p = g.line('p');
  const k = g.circle('k');
  const u = unit(p.d);
  const F = foot(S, p.a, p.d);
  const F2 = add(S, sub(S, F)); // obraz paty kolmice ve středové souměrnosti se středem S
  const [Y1, Y2] = lineCircle(F2, u, k.c, k.r).sort((a, b) => a.x - b.x);
  if (!Y1 || !Y2) throw new Error('Obraz p′ má protnout kružnici k');
  const X1 = add(S, sub(S, Y1));
  const X2 = add(S, sub(S, Y2));
  if (Math.abs(dist(X1, foot(X1, p.a, p.d))) > 0.5) throw new Error('X₁ má ležet na přímce p');

  // konec p′ pro popisek (editor ho kreslí v 1,1násobku úseku) — nad popiskem přímky p
  const labelX = p.a.x + 1.1 * p.d.x;
  const pStart = add(F2, mul(u, (p.a.x - F2.x) / u.x));
  const pEnd = add(pStart, mul(u, (labelX - pStart.x) / u.x / 1.1));

  const s = new Board();
  s.ref('sol-s', S, 'S');
  s.ref('sol-o', k.c, 'O');
  s.ref('sol-f', F);
  s.ref('sol-f2', F2);
  s.ref('sol-p2a', pStart);
  s.ref('sol-p2e', pEnd);
  s.helperLine('sol-kolmice', 'sol-f', 'sol-s');
  s.arc('sol-arc-f2', 'sol-s', 'sol-f2', 0.35);
  s.helperLine('sol-p2', 'sol-p2a', 'sol-p2e', 'p′');
  s.point('sol-y1', Y1, 'Y₁');
  s.point('sol-y2', Y2, 'Y₂');
  s.point('sol-x1', X1, 'X₁');
  s.point('sol-x2', X2, 'X₂');
  s.segment('sol-xy1', 'sol-x1', 'sol-y1');
  s.segment('sol-xy2', 'sol-x2', 'sol-y2');

  return cumulative(
    s,
    'Bod S je středem úsečky XY, proto je Y obrazem bodu X ve středové souměrnosti se středem S. Obraz p′ přímky p je rovnoběžka s p na druhé straně bodu S ve stejné vzdálenosti. Přímka p′ protne kružnici k v bodech Y₁ a Y₂; přímky Y₁S a Y₂S protnou přímku p v bodech X₁ a X₂. Úloha má dvě řešení: úsečky X₁Y₁ a X₂Y₂.',
    [
      {
        text: 'Bod S je středem úsečky XY, bod Y je proto obrazem bodu X ve středové souměrnosti se středem S. Všechny obrazy bodů přímky p leží na obrazu p′ přímky p. Sestrojte kolmici z bodu S k přímce p.',
        shapes: ['sol-kolmice'],
      },
      {
        text: 'Vzdálenost bodu S od přímky p naneste kružítkem na kolmici za bod S.',
        shapes: ['sol-arc-f2'],
      },
      {
        text: 'Naneseným bodem veďte rovnoběžku s přímkou p — to je obraz p′ přímky p ve středové souměrnosti se středem S.',
        shapes: ['sol-p2'],
      },
      {
        text: 'Bod Y leží na přímce p′ i na kružnici k. Přímka p′ protne kružnici k ve dvou bodech — označte je Y₁ a Y₂.',
        points: ['sol-y1', 'sol-y2'],
      },
      {
        text: 'Přímka Y₁S protne přímku p v bodě X₁, přímka Y₂S v bodě X₂ (kružítkem ověřte |X₁S| = |SY₁|). Narýsujte úsečky X₁Y₁ a X₂Y₂ a krajní body označte. Úloha má dvě řešení.',
        points: ['sol-x1', 'sol-x2'],
        shapes: ['sol-xy1', 'sol-xy2'],
      },
    ],
    {
      figures: [
        { name: 'úsečka X₁Y₁', vertices: ['sol-x1', 'sol-y1'] },
        { name: 'úsečka X₂Y₂', vertices: ['sol-x2', 'sol-y2'] },
      ],
    },
  );
}

/** Vlastní test B4, úloha 10: vrchol C z vrcholů A, B a těžiště T — |SC| = 3 · |ST|, jedno řešení. */
function centroidSolution(): AssignmentModelSolution {
  const g = given('82c5a5f1-5e14-45d6-aa7b-f020465f2dcb');
  const A = g.point('a');
  const B = g.point('b');
  const T = g.point('t');
  const S = mid(A, B);
  const d = sub(T, S);
  const P1 = add(T, d);
  const C = add(P1, d);
  const w = unit(perp(sub(B, A)));
  const half = dist(A, B) / 2;
  const rr = 0.55 * dist(A, B); // oblouky pod AB musí zůstat v rámečku
  const lift = Math.sqrt(rr * rr - half * half);
  const Z1 = add(S, mul(w, -lift));
  const Z2 = add(S, mul(w, lift));
  const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  if (dist(G, T) > 0.5) throw new Error('T má být těžištěm trojúhelníku ABC');

  const s = new Board();
  s.ref('sol-a', A, 'A');
  s.ref('sol-b', B, 'B');
  s.ref('sol-t', T, 'T');
  s.ref('sol-z1', Z1);
  s.ref('sol-z2', Z2);
  s.ref('sol-p1', P1);
  s.ref('sol-c0', C); // stejné místo jako C, aby se vrchol objevil až v kroku, kde se označí
  s.ref('sol-ce', add(C, mul(unit(d), 45)));
  s.arc('sol-arc1', 'sol-a', 'sol-z1', 0.3);
  s.arc('sol-arc2', 'sol-b', 'sol-z1', 0.3);
  s.arc('sol-arc3', 'sol-a', 'sol-z2', 0.3);
  s.arc('sol-arc4', 'sol-b', 'sol-z2', 0.3);
  s.helperLine('sol-osa', 'sol-z1', 'sol-z2');
  s.point('sol-s', S, 'S');
  s.helperLine('sol-st', 'sol-s', 'sol-ce');
  s.arc('sol-arc-p1', 'sol-t', 'sol-p1', 0.35);
  s.arc('sol-arc-c', 'sol-p1', 'sol-c0', 0.35);
  s.point('sol-c', C, 'C');
  s.segment('sol-ab', 'sol-a', 'sol-b');
  s.segment('sol-bc', 'sol-b', 'sol-c');
  s.segment('sol-ca', 'sol-c', 'sol-a');

  return cumulative(
    s,
    'Těžiště T leží na těžnici z vrcholu C, která končí ve středu S strany AB, a dělí ji v poměru 2 : 1. Sestrojíme střed S (osou úsečky AB) a polopřímku ST; vrchol C na ní leží ve vzdálenosti 3 · |ST| od S, vzdálenost |ST| proto naneseme kružítkem od T ještě dvakrát. Úloha má jedno řešení.',
    [
      {
        text: 'Těžiště T leží na těžnici z vrcholu C, tedy na úsečce, která spojuje C se středem S strany AB. Najděte střed S: z bodů A a B opište oblouky se stejným poloměrem nad i pod úsečkou a průsečíky spojte — osa protne AB v bodě S.',
        points: ['sol-s'],
        shapes: ['sol-arc1', 'sol-arc2', 'sol-arc3', 'sol-arc4', 'sol-osa'],
      },
      {
        text: 'Narýsujte polopřímku ST — leží na ní těžnice z vrcholu C.',
        shapes: ['sol-st'],
      },
      {
        text: 'Těžiště dělí těžnici v poměru 2 : 1, od vrcholu je dvakrát dál než od středu strany: |SC| = 3 · |ST|. Do kružítka vezměte vzdálenost |ST| a naneste ji od bodu T ještě dvakrát za sebou.',
        shapes: ['sol-arc-p1', 'sol-arc-c'],
      },
      {
        text: 'Druhý nanesený bod je vrchol C. Označte ho a narýsujte trojúhelník ABC. Úloha má jedno řešení.',
        points: ['sol-c'],
        shapes: ['sol-ab', 'sol-bc', 'sol-ca'],
      },
    ],
    { figures: [{ name: 'trojúhelník ABC', vertices: ['sol-a', 'sol-b', 'sol-c'] }] },
  );
}

export const PRIJIMACKY_TEST_SOLUTIONS_H: [string, () => AssignmentModelSolution][] = [
  ['4d9f1111-c9ed-4623-8ca6-6e0a845b22ab', midpointSegmentSolution],
  ['82c5a5f1-5e14-45d6-aa7b-f020465f2dcb', centroidSolution],
];
