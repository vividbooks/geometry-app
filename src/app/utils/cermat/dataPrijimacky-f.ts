/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík F.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test9.js` (tam 30 px = 1 cm),
 * přepočteno ×50/30 se stejným tvarem a orientací.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_F: CermatAssignmentInput[] = [
  {
    // ptest9-09-kruznice-uhel — úhel AVB 60°, rameno VA vodorovně doprava, |VT| = 4 cm, |VA| = 7,5 cm
    // jako v obrázku, bod B posunutý na |VB| = 6 cm, aby se jeho křížek nepletl ke kolmici p v řešení;
    // r = 4 · tg 30° ≈ 2,31 cm.
    id: '6cf98d8f-9775-49de-8203-24dc967f3f0e',
    title: 'Vlastní test A7 · 9. Kružnice vepsaná do úhlu',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A7, úloha 9',
    instructionMarkup:
      'V rovině leží úhel *AVB* (polopřímky *VA* a *VB*) a na jeho rameni *VA* bod *T*.\n\n'
      + 'Sestrojte kružnici *k*, která se dotýká obou ramen úhlu, přičemž ramene *VA* se dotýká v bodě *T*.\n'
      + 'Střed kružnice označte *S* a kružnici narýsujte.',
    points: [
      { id: 'v', x: 200.0, y: 420.0, label: 'V' },
      { id: 'a', x: 575.0, y: 420.0, label: 'A' },
      { id: 'b', x: 350.0, y: 160.19, label: 'B' },
      { id: 't', x: 400.0, y: 420.0, label: 'T' },
    ],
    lines: [],
    shapes: [
      { kind: 'ray', id: 'va', from: 'v', through: 'a' },
      { kind: 'ray', id: 'vb', from: 'v', through: 'b' },
    ],
    frame: { width: 815, height: 480 },
  },
  {
    // ptest9-10-lichobeznik — |AB| = 6 cm (8° nad vodorovnou), |AD| = 3,5 cm, úhel DAB = 72°.
    id: '7dc9ef65-bfe5-44a8-8518-22ff5823d375',
    title: 'Vlastní test A7 · 10. Lichoběžník ze tří vrcholů',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A7, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *D*, které neleží na jedné přímce.\n\n'
      + 'Sestrojte lichoběžník *ABCD* se základnami *AB* a *CD*, jehož základna *CD* měří 3 cm.\n'
      + 'Vrchol *C* označte a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 270.0, y: 330.0, label: 'A' },
      { id: 'b', x: 567.08, y: 288.25, label: 'B' },
      { id: 'd', x: 300.39, y: 157.66, label: 'D' },
    ],
    lines: [],
    frame: { width: 815, height: 400 },
  },
];
