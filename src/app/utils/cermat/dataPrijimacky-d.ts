/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík D.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test7.js` (vlastní test A5; obrázek
 * v měřítku 30 px = 1 cm, přepočteno na 50 px = 1 cm, stejný tvar a orientace). Konec `to` pojmenované
 * přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to) padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_D: CermatAssignmentInput[] = [
  {
    // ptest7-09-kruznice-tecna-bod — p skloněná o 10°, M = T + 2,4 cm po p + 3,2 cm kolmo (|TM| = 4 cm),
    // hledaná kružnice má poloměr 2,5 cm (střed 2,5 cm od T po kolmici).
    id: '027f44c0-e12f-477d-9ea8-624dda6064e7',
    title: 'Vlastní test A5 · 9. Kružnice dotýkající se přímky v daném bodě',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A5, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *p* s bodem *T* a bod *M*, který na přímce *p* neleží.\n\n'
      + 'Sestrojte kružnici *k*, která se dotýká přímky *p* v bodě *T* a prochází bodem *M*.\n'
      + 'Střed kružnice označte *S* a kružnici narýsujte.',
    points: [
      { id: 't', x: 360.0, y: 380.0, label: 'T' },
      { id: 'm', x: 450.4, y: 201.6, label: 'M' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 436.4 }, to: { x: 703.6, y: 319.4 } }],
    frame: { width: 815, height: 480 },
  },
  {
    // ptest7-10-pravy-uhel-na-primce — |AB| = 5 cm vodorovně, p prochází bodem 3,5 cm nad B pod úhlem 20°.
    id: 'ce35b9bc-885e-4c96-9e42-fc36ddfb7a69',
    title: 'Vlastní test A5 · 10. Pravoúhlý trojúhelník s vrcholem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A5, úloha 10',
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*.\n\n'
      + 'Sestrojte trojúhelník *ABC* s pravým úhlem při vrcholu *B*, jehož vrchol *C* leží na přímce *p*.\n'
      + 'Vrchol *C* označte písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 180.0, y: 410.0, label: 'A' },
      { id: 'b', x: 430.0, y: 410.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 376.9 }, to: { x: 703.6, y: 135.4 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 470 },
  },
];
