/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík L — vlastní test B8.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test15.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo nahoře a osou y dolů je v px [40 + 50x; 40 + 50y].
 * Konec `to` pojmenované přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to)
 * padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_L: CermatAssignmentInput[] = [
  {
    // ptest15-09-lichobeznik-rameno-na-primce — A (3; 6,5), B (10; 6,5) cm, přímka p body D₂ (2,16; 3,62) a D₁ (4,8; 4,1)
    // cm (sklon 2 : 11), |AD| = 3 cm. D = p ∩ k(A; 3 cm), C = obraz D podle osy úsečky AB (x = 6,5 cm):
    // C₁ (8,2; 4,1), C₂ (10,84; 3,62) cm. Dvě řešení. Rámeček 13 × 9 cm.
    id: 'a51c637a-b205-4830-8c79-815ea8df4351',
    title: 'Vlastní test B8 · 9. Rovnoramenný lichoběžník s vrcholem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B8, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*. Úsečka *AB* je základna rovnoramenného lichoběžníku *ABCD*. '
      + 'Vrchol *D* leží na přímce *p* a rameno *AD* měří 3 cm.\n\n'
      + 'Sestrojte všechny takové lichoběžníky, vrcholy označte (*C*₁, *D*₁, …) a lichoběžníky narýsujte.',
    points: [
      { id: 'a', x: 190.0, y: 365.0, label: 'A' },
      { id: 'b', x: 540.0, y: 365.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 65.0, y: 205.909 }, to: { x: 615.0, y: 305.909 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest15-10-pravouhly-rovnoramenny — C (8,3; 3,1) cm, přímka p bodem P (6,5; 5,5) ve směru (4; 3). P je pata kolmice
    // z C (střed přepony), |PC| = 3 cm; A, B = p ∩ k(P; 3 cm): A (4,1; 3,7), B (8,9; 7,3) cm. Jedno řešení.
    // Rámeček 13 × 9 cm.
    id: '01be6bbb-1410-4a7d-8960-3ccdd1c42848',
    title: 'Vlastní test B8 · 10. Pravoúhlý rovnoramenný trojúhelník s přeponou na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B8, úloha 10',
    instructionMarkup:
      'V rovině leží bod *C* a přímka *p*. Bod *C* je vrchol pravoúhlého rovnoramenného trojúhelníku *ABC* '
      + 's pravým úhlem při vrcholu *C*. Přepona *AB* leží na přímce *p*.\n\n'
      + 'Sestrojte vrcholy *A*, *B*, označte je a trojúhelník narýsujte.',
    points: [{ id: 'c', x: 455.0, y: 195.0, label: 'C' }],
    lines: [{ label: 'p', from: { x: 90.0, y: 108.75 }, to: { x: 490.0, y: 408.75 } }],
    frame: { width: 730, height: 530 },
  },
];
