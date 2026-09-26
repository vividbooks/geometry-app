/**
 * Úkoly 9. ročníku ve stylu konstrukčních úloh CERMAT (vlastní zadání), balík D.
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

const SOURCE = 'Vividbooks, 9. ročník (ve stylu úloh CERMAT)';

export const GRADE9_STYLE_D: CermatAssignmentInput[] = [
  {
    id: '0333c78c-011e-4dc9-bf88-4280ec182d1d',
    title: 'Obdélník s úhlem úhlopříček 60°',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží body *A*, *C*.\n\n'
      + 'Úsečka *AC* je úhlopříčka obdélníku *ABCD*.\n'
      + 'Úhlopříčky obdélníku *ABCD* svírají úhel 60°.\n\n'
      + 'Sestrojte vrcholy *B*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    // |AC| = 7 cm, střed úhlopříčky v (407, 275).
    points: [
      { id: 'a', x: 238.0, y: 320.3, label: 'A' },
      { id: 'c', x: 576.0, y: 229.7, label: 'C' },
    ],
    lines: [],
    frame: { width: 815, height: 500 },
  },
  {
    id: '7ffe484f-5940-4187-9c09-df105565f64a',
    title: 'Rovnoběžník s úhlem 135°',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *M*.\n\n'
      + 'Úsečka *AB* je strana rovnoběžníku *ABCD*.\n'
      + 'Strana *AD* má délku 3 cm a úhel *DAB* má velikost 135°.\n'
      + 'Vrchol *D* leží v polorovině *ABM*.\n\n'
      + 'Sestrojte vrcholy *C*, *D* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    // |AB| = 6 cm.
    points: [
      { id: 'a', x: 340.0, y: 370.0, label: 'A' },
      { id: 'b', x: 637.1, y: 328.2, label: 'B' },
      { id: 'm', x: 660.0, y: 160.0, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: '35635a11-fddf-4ee6-b3ab-51487ab0fc74',
    title: 'Nejkratší cesta přes přímku',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží přímka *p* a body *A*, *B* v jedné polorovině s hraniční přímkou *p*.\n\n'
      + 'Na přímce *p* leží bod *X*.\n'
      + 'Součet délek úseček *AX* a *XB* je co nejmenší.\n\n'
      + 'Sestrojte bod *X*, označte ho písmenem a narýsujte lomenou čáru *AXB*.',
    points: [
      { id: 'a', x: 170.0, y: 140.0, label: 'A' },
      { id: 'b', x: 600.0, y: 230.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 350.0 }, to: { x: 775.0, y: 310.0 } }],
    frame: { width: 815, height: 500 },
  },
  {
    id: '985e4fcc-953c-4b90-b45d-71ee01fbfdc7',
    title: 'Kružnice dotýkající se kružnice zvenku',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží kružnice *k* se středem *S* a bod *A*.\n\n'
      + 'Kružnice *k* má poloměr 2,5 cm.\n'
      + 'Kružnice *l* má poloměr 1,5 cm a prochází bodem *A*.\n'
      + 'Kružnice *l* se dotýká kružnice *k* zvenku.\n\n'
      + 'Sestrojte střed *O* kružnice *l*, označte ho písmenem a kružnici *l* narýsujte.\n'
      + 'Najděte všechna řešení.',
    // |SA| = 4,2 cm.
    points: [
      { id: 's', x: 340.0, y: 280.0, label: 'S' },
      { id: 'a', x: 545.4, y: 323.7, label: 'A' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 125, label: 'k' }],
    frame: { width: 815, height: 530 },
  },
  {
    id: 'da14d317-f0e7-42fb-a4d2-e008cf0ecc3a',
    title: 'Rovnoramenný trojúhelník vepsaný kružnici',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží kružnice *k* se středem *S* a bod *A* na kružnici *k*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného trojúhelníku *ABC* se základnou *BC*.\n'
      + 'Všechny vrcholy trojúhelníku *ABC* leží na kružnici *k*.\n'
      + 'Ramena trojúhelníku *ABC* mají délku 5 cm.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    // Poloměr k = 3 cm.
    points: [
      { id: 's', x: 407.0, y: 275.0, label: 'S' },
      { id: 'a', x: 277.1, y: 350.0, label: 'A' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 150, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
];
