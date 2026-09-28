/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík J — vlastní test B6.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test13.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo nahoře a osou y dolů je v px [40 + 50x; 40 + 50y].
 * Konec `to` pojmenované přímky je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to)
 * padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_J: CermatAssignmentInput[] = [
  {
    // ptest13-09-rovnobezniky-ze-tri-bodu — K (5; 5,5), L (8; 6), M (6,5; 3,5) cm. Čtvrtý vrchol je obraz třetího
    // bodu podle středu úhlopříčky: N₁ (6,5; 8) podle středu KL, N₂ (3,5; 3) podle středu KM, N₃ (9,5; 4) podle
    // středu LM. Tři řešení KMLN₁, KLMN₂, KLN₃M. Rámeček 13 × 9 cm.
    id: '8682943e-b3ac-457a-89b9-fe05aa306ee2',
    title: 'Vlastní test B6 · 9. Rovnoběžníky ze tří vrcholů',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B6, úloha 9',
    instructionMarkup:
      'V rovině leží body *K*, *L* a *M*, které neleží na jedné přímce.\n\n'
      + 'Sestrojte všechny rovnoběžníky, jejichž tři vrcholy jsou body *K*, *L* a *M*. Čtvrtý vrchol každého '
      + 'rovnoběžníku označte (*N*₁, *N*₂, …) a rovnoběžníky narýsujte. Najděte všechna řešení.',
    points: [
      { id: 'k', x: 290.0, y: 315.0, label: 'K' },
      { id: 'l', x: 440.0, y: 340.0, label: 'L' },
      { id: 'm', x: 365.0, y: 215.0, label: 'M' },
    ],
    lines: [],
    frame: { width: 730, height: 530 },
  },
  {
    // ptest13-10-soumerny-petiuhelnik — osa o: x = 6,5 cm (svislá), A (3,5; 7,5), C (8,9; 4,6) cm, |CD| = 3 cm.
    // B = obraz A (9,5; 7,5), E = obraz C (4,1; 4,6); k(C; 3 cm) ∩ o = D (6,5; 2,8) a D′ (6,5; 6,4) cm — vyhovuje D,
    // které je od přímky AB dál než C. Rámeček 13 × 9 cm.
    id: '1a92910c-b5d6-4e4c-8018-c26ebf461395',
    title: 'Vlastní test B6 · 10. Pětiúhelník souměrný podle osy',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B6, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *o* a body *A*, *C*. Pětiúhelník *ABCDE* je souměrný podle přímky *o* a jeho vrchol *D* '
      + 'leží na přímce *o*. Strana *CD* měří 3 cm a vrchol *D* má od přímky *AB* větší vzdálenost než vrchol *C*.\n\n'
      + 'Sestrojte vrcholy *B*, *D*, *E*, označte je a pětiúhelník narýsujte.',
    points: [
      { id: 'a', x: 215.0, y: 415.0, label: 'A' },
      { id: 'c', x: 485.0, y: 270.0, label: 'C' },
    ],
    lines: [{ label: 'o', from: { x: 365.0, y: 480.0 }, to: { x: 365.0, y: 90.0 } }],
    frame: { width: 730, height: 530 },
  },
];
