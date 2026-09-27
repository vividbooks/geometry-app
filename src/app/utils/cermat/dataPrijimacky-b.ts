/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík B.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Předlohy (generátory aplikace Přijímací zkoušky):
 * - vlastní test 3, úloha 9 — `ptest3-09-kruznice-na-primce` (CIRCLE_SCENE, měřítko 2,3×)
 * - vlastní test 3, úloha 10 — `ptest3-10-tecny-rovnobezne` (PARALLEL_SCENE, poloměr 2 cm)
 * - vlastní test 4, úloha 9 — `ptest4-09-obdelnik-kruznice` (RECT_SCENE, měřítko 2,4×)
 * - vlastní test 4, úloha 10 — `ptest4-10-vrchol-na-primce` (ISO_SCENE, měřítko 2,3×)
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_B: CermatAssignmentInput[] = [
  {
    id: '7dc37bc8-f846-4796-8a7a-59b2e7d60129',
    title: 'Vlastní test 3 · 9. Kružnice se středem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 3, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *B* a přímka *p*.\n\n'
      + 'Sestrojte kružnici *k*, která prochází body *A*, *B* a jejíž střed *S* leží na přímce *p*. '
      + 'Střed označte písmenem a kružnici narýsujte.',
    points: [
      { id: 'a', x: 261, y: 80, label: 'A' },
      { id: 'b', x: 445, y: 144, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 30, y: 295.2 }, to: { x: 785, y: 208.5 } }],
    frame: { width: 815, height: 500 },
  },
  {
    id: '21b3f91d-9c66-4c22-8ecf-9e2baa2413e5',
    title: 'Vlastní test 3 · 10. Tečny rovnoběžné s přímkou',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 3, úloha 10',
    instructionMarkup:
      'V rovině leží kružnice *k* se středem *S* a přímka *p*, která kružnici neprotíná.\n\n'
      + 'Sestrojte všechny tečny kružnice *k*, které jsou rovnoběžné s přímkou *p*. '
      + 'Body dotyku označte *T*₁, *T*₂ a tečny narýsujte.',
    points: [{ id: 's', x: 300, y: 235, label: 'S' }],
    lines: [{ label: 'p', from: { x: 30, y: 445.5 }, to: { x: 785, y: 324.7 } }],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 100, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: '9a2574e2-ffa3-421e-97b0-f40348af3399',
    title: 'Vlastní test 4 · 9. Obdélník s vrcholem na kružnici',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 4, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *B* a kružnice *k* se středem *S*.\n\n'
      + 'Úsečka *AB* je strana obdélníku *ABCD*. Vrchol *C* leží na kružnici *k*.\n\n'
      + 'Sestrojte vrcholy *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 209, y: 445, label: 'A' },
      { id: 'b', x: 530, y: 378, label: 'B' },
      { id: 's', x: 555, y: 167, label: 'S' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 110, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: 'e6a47f1b-58dd-4bfd-b2ae-ae0022b1e811',
    title: 'Vlastní test 4 · 10. Rovnoramenný trojúhelník s vrcholem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 4, úloha 10',
    instructionMarkup:
      'V rovině leží body *K*, *L* a přímka *p*.\n\n'
      + 'Úsečka *KL* je základna rovnoramenného trojúhelníku *KLM*. Vrchol *M* leží na přímce *p*.\n\n'
      + 'Sestrojte vrchol *M*, označte ho písmenem a trojúhelník *KLM* narýsujte.',
    points: [
      { id: 'k', x: 187, y: 359, label: 'K' },
      { id: 'l', x: 431, y: 391, label: 'L' },
    ],
    lines: [{ label: 'p', from: { x: 30, y: 74.2 }, to: { x: 785, y: 198.2 } }],
    frame: { width: 815, height: 500 },
  },
];
