/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2022 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2022: CermatAssignmentInput[] = [
  {
    id: '56119862-e436-42e1-a50c-9c321ea9af0f',
    title: '2022 · 1. řádný termín · 9. Rovnoramenný trojúhelník se středem ramene',
    source: 'JPZ 2022, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *C*, *S* a přímka *q*.\n\n'
      + 'Bod *C* je vrchol rovnoramenného trojúhelníku *ABC* se základnou *AB*.\n'
      + 'Bod *S* je střed jednoho ramene tohoto trojúhelníku a na přímce *q* leží jeden z vrcholů *A*, *B*.\n\n'
      + 'Sestrojte vrcholy *A*, *B* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'c', x: 354.9, y: 392.6, label: 'C' },
      { id: 's', x: 415.8, y: 247.8, label: 'S' },
    ],
    lines: [{ label: 'q', from: { x: 43.6, y: 174.8 }, to: { x: 699.0, y: 174.8 } }],
    frame: { width: 817.4, height: 457.4 },
  },
  {
    id: '9e3c09a9-2e77-49a3-9401-e2df66717426',
    title: '2022 · 1. řádný termín · 10. Čtverec se středem O',
    source: 'JPZ 2022, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží bod *O* a přímka *p*.\n\n'
      + 'Bod *O* je střed čtverce *ABCD*, jehož strana *BC* leží na přímce *p*.\n\n'
      + 'Sestrojte všechny vrcholy čtverce *ABCD*, označte je písmeny a čtverec narýsujte.',
    points: [{ id: 'o', x: 355.1, y: 307.3, label: 'O' }],
    lines: [{ label: 'p', from: { x: 340.2, y: 70.4 }, to: { x: 637.6, y: 405.5 } }],
    frame: { width: 817.4, height: 572.3 },
  },
  {
    id: 'f5537aae-9082-4ee3-bc0a-3c3d01c56808',
    title: '2022 · 2. řádný termín · 9. Rovnoramenný trojúhelník se základnou 6 cm',
    source: 'JPZ 2022, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží bod *C* a přímka *q*.\n\n'
      + 'Bod *C* je vrchol rovnoramenného trojúhelníku *ABC* se základnou *AB*.\n'
      + 'Základna *AB* leží na přímce *q* a má délku 6 cm.\n\n'
      + 'Sestrojte vrcholy *A*, *B* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [{ id: 'c', x: 482.8, y: 342.5, label: 'C' }],
    lines: [{ label: 'q', from: { x: 131.1, y: 307.4 }, to: { x: 603.2, y: 67.3 } }],
    frame: { width: 817.4, height: 407.3 },
  },
  {
    id: '070552e5-1085-4627-a062-04867f0f76a7',
    title: '2022 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou kolmou k přímce',
    source: 'JPZ 2022, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *C* a přímka *p*.\n\n'
      + 'Body *A*, *C* jsou vrcholy rovnoběžníku *ABCD*, jehož dvě strany jsou rovnoběžné s přímkou *p*. '
      + 'Jedna z úhlopříček rovnoběžníku *ABCD* je k přímce *p* kolmá.\n\n'
      + '10.1 Sestrojte střed *S* rovnoběžníku *ABCD* a označte ho písmenem.\n\n'
      + '10.2 Sestrojte vrcholy *B*, *D* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    points: [
      { id: 'a', x: 98.8, y: 422.1, label: 'A' },
      { id: 'c', x: 620.5, y: 176.4, label: 'C' },
    ],
    lines: [{ label: 'p', from: { x: 177.7, y: 91.7 }, to: { x: 654.9, y: 334.7 } }],
    frame: { width: 817.4, height: 572.3 },
  },
  {
    id: '668bd325-fdd7-4006-8959-8dde3529df33',
    title: '2022 · 1. náhradní termín · 9. Trojúhelník s osou strany',
    source: 'JPZ 2022, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *P*, *Q* a přímka *o*.\n\n'
      + 'Body *P*, *Q* jsou vrcholy trojúhelníku *PQR*.\n'
      + 'Přímka *o* je osou některé strany tohoto trojúhelníku.\n\n'
      + 'Sestrojte vrchol *R* trojúhelníku *PQR*, označte ho písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'p', x: 198.2, y: 99.5, label: 'P' },
      { id: 'q', x: 144.1, y: 304.6, label: 'Q' },
    ],
    lines: [{ label: 'o', from: { x: 199.3, y: 514.3 }, to: { x: 485.4, y: 64.4 } }],
    frame: { width: 817.4, height: 547.2 },
  },
  {
    id: '87b2f9e1-d375-4b4e-bbc3-df9b8362c9c7',
    title: '2022 · 1. náhradní termín · 10. Obdélník k rovnoběžkám',
    source: 'JPZ 2022, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *X* a rovnoběžné přímky *c*, *p*.\n\n'
      + 'Bod *A* je vrchol obdélníku *ABCD*. Bod *X* leží uvnitř strany *AB* obdélníku.\n'
      + 'Na přímce *c* leží vrchol *C* obdélníku *ABCD* a na přímce *p* jeden ze zbývajících dvou vrcholů obdélníku.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 226.6, y: 391.5, label: 'A' },
      { id: 'x', x: 395.2, y: 310.2, label: 'X' },
    ],
    lines: [
      { label: 'c', from: { x: 708.6, y: 99.9 }, to: { x: 33.7, y: 99.9 } },
      { label: 'p', from: { x: 708.6, y: 205.2 }, to: { x: 33.7, y: 205.2 } },
    ],
    frame: { width: 817.4, height: 447.4 },
  },
  {
    id: '5ea60228-04fd-48ad-90f0-254e3a876e1f',
    title: '2022 · 2. náhradní termín · 9. Rovnoběžník s úhlem 120°',
    source: 'JPZ 2022, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *S* a přímka *p* procházející bodem *A*.\n\n'
      + 'Bod *A* je vrchol rovnoběžníku *ABCD*. Bod *S* je střed tohoto rovnoběžníku.\n'
      + 'Na přímce *p* leží vrchol *B* rovnoběžníku *ABCD*. Úhel *ASB* má velikost 120°.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    points: [
      { id: 'a', x: 217.0, y: 375.3, label: 'A' },
      { id: 's', x: 337.8, y: 246.1, label: 'S' },
    ],
    lines: [{ label: 'p', from: { x: 103.9, y: 399.3 }, to: { x: 691.0, y: 274.8 } }],
    frame: { width: 817.4, height: 472.3 },
  },
  {
    id: 'cc670aa6-d652-4090-b22b-88e347470afd',
    title: '2022 · 2. náhradní termín · 10. Rovnoramenný trojúhelník s osou souměrnosti',
    source: 'JPZ 2022, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *C*, *Q* a přímka *p*.\n\n'
      + 'Bod *C* je vrchol rovnoramenného trojúhelníku *ABC* se základnou *AB*.\n'
      + 'Ramena mají délku 5 cm. Na přímce *p* leží jeden vrchol trojúhelníku *ABC*.\n'
      + 'Bodem *Q* prochází osa souměrnosti trojúhelníku *ABC*.\n\n'
      + 'Sestrojte vrcholy *A*, *B* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'c', x: 357.9, y: 314.4, label: 'C' },
      { id: 'q', x: 162.9, y: 342.0, label: 'Q' },
    ],
    lines: [{ label: 'p', from: { x: 211.1, y: 563.8 }, to: { x: 683.3, y: 327.6 } }],
    frame: { width: 817.4, height: 597.5 },
  },
];
