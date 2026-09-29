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
    // ptest13-10-rovnoramenny-osa-bod-na-rameni — osa o bodem (2,5; 0) ve směru (3; 4)/5, A (5; 7,5), M (6,76; 3,18) cm.
    // B = obraz A podle o (9; 4,5), pata kolmice P (7; 6); C = BM ∩ o (3,4; 1,2) cm. |AB| = 5 cm, ramena 6,5 cm.
    // Rámeček 13 × 9 cm.
    id: 'd4ee7c4c-695c-4b92-9c9c-6d2f406b55ce',
    title: 'Vlastní test B6 · 10. Rovnoramenný trojúhelník z osy a bodu na rameni',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test B6, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *o* a body *A*, *M*. Přímka *o* je osou souměrnosti rovnoramenného trojúhelníku *ABC* '
      + 'se základnou *AB*. Bod *M* leží na rameni *BC* tohoto trojúhelníku.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 290.0, y: 415.0, label: 'A' },
      { id: 'm', x: 378.0, y: 199.0, label: 'M' },
    ],
    lines: [{ label: 'o', from: { x: 502.5, y: 490.0 }, to: { x: 202.5, y: 90.0 } }],
    frame: { width: 730, height: 530 },
  },
];
