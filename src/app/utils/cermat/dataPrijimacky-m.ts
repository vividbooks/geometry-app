/**
 * Rýsovací úlohy vlastních přijímačkových testů (aplikace Přijímací zkoušky), balík M — vlastní test A8.
 *
 * Tyhle úkoly nejsou v knihovně úkolů Rýsování — otevírají se jen odkazem z testu
 * v aplikaci Přijímací zkoušky. Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 *
 * Rozmístění je převzaté z obrázků generátoru `generator-prijimacky-test16.js` (stejné délky v cm, stejný
 * tvar a orientace): bod (x; y) cm s počátkem vlevo nahoře a osou y dolů je v px [40 + 50x; 40 + 50y].
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const PRIJIMACKY_TEST_M: CermatAssignmentInput[] = [
  {
    // ptest16-09-uhel-60 — A (2; 4,5), B (8; 4,5) cm, |AB| = 6 cm. C leží na rameni úhlu 60° při vrcholu A, |AC| = 4 cm:
    // C₁ (4; 1,036), C₂ (4; 7,964) cm. Dvě řešení souměrná podle AB. Rámeček 10,6 × 10,6 cm.
    id: '999e71a2-cd4a-4166-bb43-387ab4cea9e7',
    title: 'Vlastní test A8 · 9. Trojúhelník ze dvou stran a úhlu 60° mezi nimi',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A8, úloha 9',
    instructionMarkup:
      'Úsečka *AB* je strana trojúhelníku *ABC*.\n\n'
      + 'Sestrojte všechny trojúhelníky *ABC*, pro které platí |∢*BAC*| = 60° a |*AC*| = 4 cm. '
      + 'Vrcholy *C* označte *C*₁, *C*₂, … a trojúhelníky narýsujte.',
    points: [
      { id: 'a', x: 140.0, y: 265.0, label: 'A' },
      { id: 'b', x: 440.0, y: 265.0, label: 'B' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 530, height: 530 },
  },
  {
    // ptest16-10-obdelnik-bod — A (2; 7) cm, AB 5 cm ve směru −6° (nahoru doprava), výška obdélníku 3 cm,
    // M na CD 1,8 cm od D: B (6,973; 6,477), D (1,686; 4,016), C (6,659; 3,494), M (3,477; 3,828) cm.
    // Jedno řešení. Rámeček 10,6 × 9 cm.
    id: 'da74199d-f437-4340-8260-b70780498b52',
    title: 'Vlastní test A8 · 10. Obdélník ze strany a bodu na protější straně',
    source: 'Vividbooks, Přijímací zkoušky – vlastní test A8, úloha 10',
    instructionMarkup:
      'Body *A* a *B* jsou sousední vrcholy obdélníku *ABCD*. Bod *M* leží na jeho straně *CD*.\n\n'
      + 'Sestrojte vrcholy *C* a *D*, označte je a obdélník narýsujte.',
    points: [
      { id: 'a', x: 140.0, y: 390.0, label: 'A' },
      { id: 'b', x: 388.63, y: 363.868, label: 'B' },
      { id: 'm', x: 213.828, y: 231.414, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 530, height: 450 },
  },
];
