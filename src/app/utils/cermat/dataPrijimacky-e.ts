/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík E — vlastní test A6.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test8.js` (30 px = 1 cm),
 * přepočteno ×5/3 na 50 px = 1 cm (stejný tvar a orientace). Konec `to` pojmenované přímky je zvolený tak,
 * aby popisek (editor ho kreslí v 1,1násobku úseku from → to) padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_E: CermatAssignmentInput[] = [
  {
    // ptest8-09-body-vzdalenost — S je 1,5 cm (75 px) nad vodorovnou přímkou p, kružnice k(S; 3 cm) se vejde
    // do rámečku celá (horní okraj y = 70, dolní y = 370).
    id: '674995d6-a63c-494b-9a86-4dae91f5a9d7',
    title: 'Vlastní test A6 · 9. Body v dané vzdálenosti od bodu a od přímky',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A6, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *p* a bod *S*, který na přímce *p* neleží.\n\n'
      + 'Sestrojte všechny body *X*, které mají od bodu *S* vzdálenost 3 cm a od přímky *p* vzdálenost 1 cm.\n'
      + 'Body označte *X*₁, *X*₂, …',
    points: [{ id: 's', x: 410.0, y: 220.0, label: 'S' }],
    lines: [{ label: 'p', from: { x: 40.0, y: 295.0 }, to: { x: 703.6, y: 295.0 } }],
    frame: { width: 815, height: 420 },
  },
  {
    // ptest8-10-strana-na-primce — |AB| = 4 cm, A je 3 cm (150 px) od přímky p; směr p (24, −7)/25 jako
    // v generátoru, konce přímky jsou body přímky s celočíselnými souřadnicemi.
    id: 'ed349788-10f5-4e92-bf6a-939a7dbbf2b2',
    title: 'Vlastní test A6 · 10. Trojúhelník s vrcholem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A6, úloha 10',
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*.\n\n'
      + 'Sestrojte všechny trojúhelníky *ABC*, pro které platí |*AC*| = 5 cm a vrchol *C* leží na přímce *p*.\n'
      + 'Trojúhelníky narýsujte a jejich vrcholy označte.',
    points: [
      { id: 'a', x: 425.0, y: 330.0, label: 'A' },
      { id: 'b', x: 625.0, y: 330.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 47.0, y: 284.0 }, to: { x: 695.0, y: 95.0 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 400 },
  },
];
