/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík C.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátorů `generator-prijimacky-test5.js` a `-test6.js`
 * (stejný tvar a orientace, přepočteno na 50 px = 1 cm). Konec `to` pojmenované přímky je zvolený tak,
 * aby popisek (editor ho kreslí v 1,1násobku úseku from → to) padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_C: CermatAssignmentInput[] = [
  {
    // ptest5-09-vyska-kruznice — obrázek 1 cm = 23,6 jednotky, přepočteno ×50/23,6; |AB| = 6,5 cm, r = 2 cm.
    id: '930e880e-5ddd-4b34-bdcb-a82df6df9749',
    title: 'Vlastní test 5 · 9. Trojúhelník s výškou a vrcholem na kružnici',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 5, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB* a kružnice *k* se středem *S*.\n\n'
      + 'Sestrojte trojúhelník *ABC*, jehož výška na stranu *AB* měří 2 cm a vrchol *C* leží na kružnici *k*.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 200.0, y: 362.0, label: 'A' },
      { id: 'b', x: 522.4, y: 320.7, label: 'B' },
      { id: 's', x: 396.5, y: 161.7, label: 'S' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'ab', from: 'a', to: 'b' },
      { kind: 'circle', id: 'k', center: 's', radius: 100, label: 'k' },
    ],
    frame: { width: 815, height: 520 },
  },
  {
    // ptest5-10-ctverec-uhlopricka — obrázek ×2,5; bod B posunutý po kolmici tak, aby |SB| = 3,5 cm.
    id: '35ac1752-e8ca-49fe-9f9b-d71ff2bcee0d',
    title: 'Vlastní test 5 · 10. Čtverec s úhlopříčkou na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 5, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *p* a bod *B*.\n\n'
      + 'Úhlopříčka *AC* čtverce *ABCD* leží na přímce *p*.\n\n'
      + 'Sestrojte vrcholy *A*, *C*, *D* čtverce *ABCD*, označte je písmeny a čtverec narýsujte.',
    points: [{ id: 'b', x: 428.9, y: 92.3, label: 'B' }],
    lines: [{ label: 'p', from: { x: 40.0, y: 325.0 }, to: { x: 703.6, y: 229.5 } }],
    frame: { width: 815, height: 490 },
  },
  {
    // ptest6-09-stejne-daleko — obrázek ×2,5 (r = 3 cm); průsečík V přímek p, q leží uvnitř k.
    id: 'fd30e76c-6340-4925-88a7-f7c9327a2aad',
    title: 'Vlastní test 6 · 9. Body kružnice stejně vzdálené od dvou přímek',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 6, úloha 9',
    instructionMarkup:
      'V rovině leží různoběžky *p*, *q* a kružnice *k* se středem *S*.\n\n'
      + 'Sestrojte všechny body *X* kružnice *k*, které mají od přímky *p* i od přímky *q* stejnou vzdálenost, a označte je.',
    points: [{ id: 's', x: 430.0, y: 240.0, label: 'S' }],
    lines: [
      { label: 'p', from: { x: 40.0, y: 397.2 }, to: { x: 703.6, y: 181.6 } },
      { label: 'q', from: { x: 84.0, y: 50.0 }, to: { x: 501.1, y: 400.0 } },
    ],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 150, label: 'k' }],
    frame: { width: 815, height: 460 },
  },
  {
    // ptest6-10-thaletova — obrázek ×2,318 (|AB| = 8 cm); přímka p posunutá o 0,3 cm dolů, aby Thaletovu
    // kružnici neprotínala skoro tečně (vzdálenost od středu 3,6 cm při poloměru 4 cm).
    id: 'e35fd27b-5243-4b37-8c61-6f6bab7a6bda',
    title: 'Vlastní test 6 · 10. Pravoúhlý trojúhelník s vrcholem na přímce',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test 6, úloha 10',
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*.\n\n'
      + 'Úsečka *AB* je přepona pravoúhlého trojúhelníku *ABC*, jehož vrchol *C* leží na přímce *p*.\n\n'
      + 'Sestrojte vrchol *C*, označte ho písmenem a trojúhelník *ABC* narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 165.9, y: 314.2, label: 'A' },
      { id: 'b', x: 564.6, y: 281.8, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 161.8 }, to: { x: 708.2, y: 68.3 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 540 },
  },
];
