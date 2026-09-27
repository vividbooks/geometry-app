/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík H — vlastní test B4.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test11.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo dole je v px [40 + 50x; 40 + 50 · (9 − y)].
 * Konec `to` pojmenované přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to)
 * padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_H: CermatAssignmentInput[] = [
  {
    // ptest11-09-stredova-soumernost — p vodorovná 2 cm pod bodem S; obraz p′ je 2 cm nad S a protne
    // kružnici k(O; 2 cm) ve dvou bodech Y₁ (6,4; 5) a Y₂ (9,6; 5) cm. Rámeček 13 × 9 cm.
    id: '4d9f1111-c9ed-4623-8ca6-6e0a845b22ab',
    title: 'Vlastní test B4 · 9. Úsečka se středem v daném bodě',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B4, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *p*, kružnice *k* se středem *O* a bod *S*.\n\n'
      + 'Sestrojte všechny úsečky *XY*, jejichž středem je bod *S*, bod *X* leží na přímce *p* '
      + 'a bod *Y* leží na kružnici *k*.\n'
      + 'Krajní body úseček označte.',
    points: [
      { id: 's', x: 340.0, y: 340.0, label: 'S' },
      { id: 'o', x: 440.0, y: 180.0, label: 'O' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 440.0 }, to: { x: 620.0, y: 440.0 } }],
    shapes: [{ kind: 'circle', id: 'k', center: 'o', radius: 100, label: 'k' }],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest11-10-teziste — |AB| = 7 cm vodorovně, těžiště T (6,5; 3,5) cm, střed S strany AB (5,5; 1,5) cm,
    // vrchol C (8,5; 7,5) cm = S + 3 · (T − S). Rámeček 13 × 9 cm.
    id: '82c5a5f1-5e14-45d6-aa7b-f020465f2dcb',
    title: 'Vlastní test B4 · 10. Trojúhelník z těžiště',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B4, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *T*. Body *A*, *B* jsou vrcholy trojúhelníku *ABC* a bod *T* je jeho těžiště.\n\n'
      + 'Sestrojte vrchol *C*, označte ho a trojúhelník *ABC* narýsujte.',
    points: [
      { id: 'a', x: 140.0, y: 415.0, label: 'A' },
      { id: 'b', x: 490.0, y: 415.0, label: 'B' },
      { id: 't', x: 365.0, y: 315.0, label: 'T' },
    ],
    lines: [],
    frame: { width: 730, height: 530 },
  },
];
