/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík G — vlastní test B3.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test10.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo dole je v px [40 + 50x; 40 + 50 · (výška − y)].
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_G: CermatAssignmentInput[] = [
  {
    // ptest10-09-rovnoramenny-kruznice — |AB| = 6 cm vodorovně, M je 1,8 cm vpravo od osy AB a 0,5 cm nad AB;
    // osa AB protne kružnici k(M; 3 cm) ve dvou bodech (2,9 cm nad AB a 1,9 cm pod ní). Rámeček 13 × 9 cm.
    id: '3013ed8b-09cc-4e06-b3ff-f5cc6421f05d',
    title: 'Vlastní test B3 · 9. Rovnoramenný trojúhelník s vrcholem ve vzdálenosti 3 cm od bodu',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B3, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *M*.\n\n'
      + 'Sestrojte všechny rovnoramenné trojúhelníky *ABC* se základnou *AB*, jejichž vrchol *C* má od bodu *M* '
      + 'vzdálenost 3 cm.\n'
      + 'Vrcholy *C* označte a trojúhelníky narýsujte.',
    points: [
      { id: 'a', x: 140.0, y: 265.0, label: 'A' },
      { id: 'b', x: 440.0, y: 265.0, label: 'B' },
      { id: 'm', x: 380.0, y: 240.0, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest10-10-prusecik-vysek — |AB| = 8 cm vodorovně, průsečík výšek V (4,5; 3,5) cm, vrchol C (4,5; 7) cm.
    // Rámeček 11 × 8 cm.
    id: 'eced3462-accd-4bda-aa0e-f410890397ba',
    title: 'Vlastní test B3 · 10. Trojúhelník z průsečíku výšek',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B3, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *V*. Bod *A* a bod *B* jsou vrcholy trojúhelníku *ABC*. '
      + 'Bod *V* je průsečík výšek trojúhelníku *ABC* a leží uvnitř trojúhelníku.\n\n'
      + 'Sestrojte vrchol *C*, označte ho a trojúhelník *ABC* narýsujte.',
    points: [
      { id: 'a', x: 115.0, y: 390.0, label: 'A' },
      { id: 'b', x: 515.0, y: 390.0, label: 'B' },
      { id: 'v', x: 265.0, y: 265.0, label: 'V' },
    ],
    lines: [],
    frame: { width: 630, height: 480 },
  },
];
