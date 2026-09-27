/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík A.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Obrázky v přijímačkách jsou jen ilustrační (zadání neuvádí žádné délky); rozmístění je převzaté
 * z generátorů a zvětšené tak, aby se celé řešení vešlo do rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_A: CermatAssignmentInput[] = [
  // Test (vlastní test 1), úloha 9 — ptest-09-kruznice
  {
    id: 'f6383b17-cbf5-452d-8789-2927973cd8bc',
    title: 'Vlastní test 1 · 9. Kružnice opsaná trojúhelníku',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 1, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *C*, které jsou vrcholy trojúhelníku *ABC*.\n\n'
      + 'Sestrojte kružnici *k* opsanou trojúhelníku *ABC*, označte její střed *S* a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 227.2, y: 330.2, label: 'A' },
      { id: 'b', x: 571.6, y: 368.0, label: 'B' },
      { id: 'c', x: 416.2, y: 86.6, label: 'C' },
    ],
    lines: [],
    frame: { width: 815, height: 520 },
  },
  // Test (vlastní test 1), úloha 10 — ptest-10-ctverec
  {
    id: '5fea3f29-3f2d-4a0f-905a-78c875ef01c7',
    title: 'Vlastní test 1 · 10. Čtverec ze středu a vrcholu',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 1, úloha 10',
    instructionMarkup:
      'V rovině leží body *S* a *A*.\n'
      + 'Bod *A* je vrchol čtverce *ABCD* a bod *S* je průsečík jeho úhlopříček.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* čtverce *ABCD*, označte je písmeny a čtverec narýsujte.',
    points: [
      { id: 's', x: 407.5, y: 265, label: 'S' },
      { id: 'a', x: 237.2, y: 369.8, label: 'A' },
    ],
    lines: [],
    frame: { width: 815, height: 500 },
  },
  // Test 2 (vlastní test 2), úloha 9 — ptest2-09-vepsana
  {
    id: 'ce4125e5-3b95-49dd-a7a3-4d08d0dc5a94',
    title: 'Vlastní test 2 · 9. Kružnice vepsaná trojúhelníku',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 2, úloha 9',
    instructionMarkup:
      'V rovině leží trojúhelník *ABC*.\n\n'
      + 'Sestrojte kružnici *k* vepsanou trojúhelníku *ABC* a označte její střed *S*.',
    points: [
      { id: 'a', x: 160, y: 420, label: 'A' },
      { id: 'b', x: 650, y: 420, label: 'B' },
      { id: 'c', x: 415, y: 105, label: 'C' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'ab', from: 'a', to: 'b' },
      { kind: 'segment', id: 'bc', from: 'b', to: 'c' },
      { kind: 'segment', id: 'ca', from: 'c', to: 'a' },
    ],
    frame: { width: 815, height: 500 },
  },
  // Test 2 (vlastní test 2), úloha 10 — ptest2-10-tecna
  {
    id: '41edeb22-c521-4909-a2fd-1b2c1fbc0dbc',
    title: 'Vlastní test 2 · 10. Tečny z vnějšího bodu',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 2, úloha 10',
    instructionMarkup:
      'V rovině leží kružnice *k* se středem *S* a bod *M*, který leží vně kružnice.\n\n'
      + 'Sestrojte obě tečny z bodu *M* ke kružnici *k* a body dotyku označte *T*₁ a *T*₂.',
    points: [
      { id: 's', x: 294.5, y: 318.3, label: 'S' },
      { id: 'm', x: 640.7, y: 231.7, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 125, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
];
