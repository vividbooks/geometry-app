/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík I — vlastní test B5.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test12.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo dole je v px [40 + 50x; 40 + 50 · (9 − y)].
 * Konec `to` pojmenované přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to)
 * padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_I: CermatAssignmentInput[] = [
  {
    // ptest12-09-osova-hledana-osa — A (3,5; 5), B (4,5; 8), M (6,5; 5) cm, p: y = 3,2 cm. Bod M leží na ose,
    // proto |MA′| = |MA| = 3 cm: kružnice k(M; 3 cm) protne p v A′₁ (4,1; 3,2) a A′₂ (8,9; 3,2) cm; osy jsou
    // osy úseček AA′₁ a AA′₂, B′₁ (6,7; 1,4) a B′₂ (9,9; 6,2) cm. Rámeček 13 × 9 cm.
    id: '76b5bc23-ee12-4efd-97b5-c037a1ed04e0',
    title: 'Vlastní test B5 · 9. Osa souměrnosti daným bodem',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B5, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB*, bod *M* a přímka *p*. Úsečka *A′B′* je obrazem úsečky *AB* v osové souměrnosti '
      + 's osou *o*. Osa *o* prochází bodem *M* a bod *A′* leží na přímce *p*.\n\n'
      + 'Sestrojte všechny takové osy *o* a pro každou z nich úsečku *A′B′*. Osy i krajní body úseček označte. '
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 215.0, y: 240.0, label: 'A' },
      { id: 'b', x: 265.0, y: 90.0, label: 'B' },
      { id: 'm', x: 365.0, y: 240.0, label: 'M' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 330.0 }, to: { x: 620.0, y: 330.0 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest12-10-lichobeznik-stred-ramene — A (1; 1,5), D (2; 6,5), S (6,5; 4) cm, |CD| = 3 cm. Obraz A′ bodu A
    // ve středové souměrnosti se středem S (12; 6,5) cm leží na přímce DC; C (5; 6,5) cm, B = obraz C (8; 1,5) cm.
    // Rámeček 13 × 9 cm.
    id: '18a46298-7db2-48e7-8fa4-7b6d1da090f6',
    title: 'Vlastní test B5 · 10. Lichoběžník ze středu ramene',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B5, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *D* a *S*. Body *A*, *D* jsou vrcholy lichoběžníku *ABCD* se základnami *AB* a *CD*. '
      + 'Bod *S* je střed ramene *BC* a základna *CD* měří 3 cm.\n\n'
      + 'Sestrojte vrcholy *B*, *C* lichoběžníku *ABCD*, označte je a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 90.0, y: 415.0, label: 'A' },
      { id: 'd', x: 140.0, y: 165.0, label: 'D' },
      { id: 's', x: 365.0, y: 290.0, label: 'S' },
    ],
    lines: [],
    frame: { width: 730, height: 530 },
  },
];
