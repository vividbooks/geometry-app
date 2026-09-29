/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík K — vlastní test B7.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test14.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo nahoře a osou y dolů je v px [40 + 50x; 40 + 50y].
 * Konec `to` pojmenované přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to)
 * padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_K: CermatAssignmentInput[] = [
  {
    // ptest14-09-osa-uhlu-kruznice — A (2,5; 8), B (9,5; 8) cm, osa o bodem A ve směru (2; −1), kružnice k se středem
    // K (3,6; 3,2) cm a poloměrem 2,5 cm. Obraz B′ bodu B podle o je (6,7; 2,4) cm (pata kolmice P (8,1; 5,2));
    // polopřímka AB′ protne k v bodech C₁ (4,3; 5,6) a C₂ (6,1; 3,2) cm. Dvě řešení. Rámeček 13 × 9 cm.
    id: '4560a048-0cb0-44bb-977d-ac45711ff4a1',
    title: 'Vlastní test B7 · 9. Trojúhelník s osou úhlu a vrcholem na kružnici',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B7, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB*, přímka *o* a kružnice *k* se středem *K*. Přímka *o* prochází bodem *A* a je osou '
      + 'vnitřního úhlu *BAC* trojúhelníku *ABC*. Vrchol *C* leží na kružnici *k*.\n\n'
      + 'Sestrojte všechny takové trojúhelníky *ABC*, vrcholy *C* označte (*C*₁, *C*₂, …) a trojúhelníky narýsujte.',
    points: [
      { id: 'a', x: 165.0, y: 440.0, label: 'A' },
      { id: 'b', x: 515.0, y: 440.0, label: 'B' },
      { id: 'k', x: 220.0, y: 200.0, label: 'K' },
    ],
    lines: [{ label: 'o', from: { x: 115.0, y: 465.0 }, to: { x: 615.0, y: 215.0 } }],
    shapes: [
      { kind: 'segment', id: 'ab', from: 'a', to: 'b' },
      { kind: 'circle', id: 'kk', center: 'k', radius: 125, label: 'k' },
    ],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest14-10-obdelnik-stred-na-primce — A (3; 6,5), B (8; 6,5) cm, přímka p body (2,5; 5,5) a (11,5; 2,5) cm.
    // Střed S = osa AB ∩ p = (5,5; 4,5) cm; C = obraz A podle S (8; 2,5), D = obraz B podle S (3; 2,5) cm.
    // Jedno řešení, |AB| = 5 cm, |BC| = 4 cm. Rámeček 13 × 9 cm.
    id: 'e4bd0630-04f3-48cf-9a7f-591dbb7c927e',
    title: 'Vlastní test B7 · 10. Obdélník se středem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B7, úloha 10',
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*. Úsečka *AB* je strana obdélníku *ABCD*. Střed *S* obdélníku *ABCD* '
      + '(průsečík jeho úhlopříček) leží na přímce *p*.\n\n'
      + 'Sestrojte střed *S* a vrcholy *C*, *D*, označte je a obdélník narýsujte.',
    points: [
      { id: 'a', x: 190.0, y: 365.0, label: 'A' },
      { id: 'b', x: 440.0, y: 365.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 165.0, y: 315.0 }, to: { x: 615.0, y: 165.0 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 730, height: 530 },
  },
];
