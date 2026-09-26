/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2023 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2023: CermatAssignmentInput[] = [
  {
    id: '63de8400-89fe-4b62-b87c-3cde2a240cd7',
    title: '2023 · 1. řádný termín · 9. Obdélník s bodem na úhlopříčce',
    source: 'JPZ 2023, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *C*, *M*.\n\n'
      + 'Body *A*, *C* jsou vrcholy obdélníku *ABCD*.\n'
      + 'Bod *M* leží na úhlopříčce *BD* tohoto obdélníku.\n\n'
      + 'Sestrojte vrcholy *B*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.',
    points: [
      { id: 'a', x: 180.5, y: 155.4, label: 'A' },
      { id: 'c', x: 556.3, y: 224.4, label: 'C' },
      { id: 'm', x: 471.8, y: 131.2, label: 'M' },
    ],
    lines: [],
    frame: { width: 817.4, height: 347.5 },
  },
  {
    id: 'd55973f1-c0d3-49c7-9345-57456cc64806',
    title: '2023 · 1. řádný termín · 10. Rovnoramenný trojúhelník v kružnici',
    source: 'JPZ 2023, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *P* a kružnice *k* se středem *S*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného trojúhelníku *ABC*, jehož základna leží na přímce *AP*.\n'
      + 'Vrcholy *B*, *C* tohoto trojúhelníku leží na kružnici *k*.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 591.7, y: 280.4, label: 'A' },
      { id: 'p', x: 270.5, y: 161.4, label: 'P' },
      { id: 's', x: 317.8, y: 255.7, label: 'S' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 191.0, label: 'k' }],
    frame: { width: 817.4, height: 497.4 },
  },
  {
    id: '2002b117-0ea6-44f7-bbee-3effd363a033',
    title: '2023 · 2. řádný termín · 9. Rovnoramenný lichoběžník se středem ramene',
    source: 'JPZ 2023, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *S*.\n\n'
      + 'Úsečka *AB* je základna rovnoramenného lichoběžníku *ABCD*.\n'
      + 'Bod *S* je střed ramene *AD* tohoto lichoběžníku.\n\n'
      + 'Sestrojte vrcholy *C*, *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 160.2, y: 390.6, label: 'A' },
      { id: 'b', x: 651.3, y: 295.8, label: 'B' },
      { id: 's', x: 216.0, y: 259.9, label: 'S' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 817.4, height: 472.3 },
  },
  {
    id: '26098805-0b3a-4215-bd7b-099e20d76e02',
    title: '2023 · 2. řádný termín · 10. Pravoúhlý trojúhelník vepsaný do kružnice',
    source: 'JPZ 2023, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *C*, *Q* a kružnice *k* se středem *S*, která prochází bodem *C*.\n\n'
      + 'Bod *C* je vrchol trojúhelníku *ABC* s pravým úhlem při vrcholu *C*.\n'
      + 'Na kružnici *k* leží také zbývající dva vrcholy *A*, *B* tohoto trojúhelníku a bodem *Q* prochází jedna jeho strana.\n\n'
      + 'Sestrojte vrcholy *A*, *B* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'c', x: 328.4, y: 99.5, label: 'C' },
      { id: 'q', x: 499.0, y: 269.9, label: 'Q' },
      { id: 's', x: 382.8, y: 327.1, label: 'S' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 234.0, label: 'k' }],
    frame: { width: 817.4, height: 597.5 },
  },
  {
    id: '425e5407-78a3-44dd-94b5-c75e56cc0b19',
    title: '2023 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s úhlopříčkou',
    source: 'JPZ 2023, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *AB* a přímka *p* procházející bodem *B*.\n\n'
      + 'Úsečka *AB* je strana pravoúhlého lichoběžníku *ABCD*.\n'
      + 'Vrchol *C* tohoto lichoběžníku leží na přímce *p*, úhlopříčka *AC* má stejnou délku jako strana *AB* lichoběžníku *ABCD*.\n\n'
      + 'Sestrojte vrcholy *C*, *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 261.0, y: 445.6, label: 'A' },
      { id: 'b', x: 570.5, y: 304.7, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 282.7, y: 64.4 }, to: { x: 653.1, y: 373.7 } }],
    shapes: [{ kind: 'line', id: 'ab', through: ['a', 'b'] }],
    frame: { width: 817.4, height: 522.2 },
  },
  {
    id: 'c53c736c-a778-45af-bedb-8978ff15d68d',
    title: '2023 · 1. náhradní termín · 10. Rovnoramenný trojúhelník s výškou na přímce',
    source: 'JPZ 2023, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *C* a přímka *p* procházející bodem *C*.\n\n'
      + 'Úsečka *AC* je základna rovnoramenného trojúhelníku *ABC*.\n'
      + 'Na přímce *p* leží jedna ze tří výšek tohoto trojúhelníku.\n\n'
      + '10.1 Sestrojte osu souměrnosti trojúhelníku *ABC* a označte ji písmenem *o*.\n\n'
      + '10.2 Sestrojte vrchol *B* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 218.3, y: 393.6, label: 'A' },
      { id: 'c', x: 146.3, y: 122.8, label: 'C' },
    ],
    lines: [{ label: 'p', from: { x: 110.0, y: 67.2 }, to: { x: 345.0, y: 426.8 } }],
    frame: { width: 817.4, height: 472.4 },
  },
  {
    id: 'fee7ba52-1602-4736-9f91-90f1187d09de',
    title: '2023 · 2. náhradní termín · 9. Čtverec a tři body',
    source: 'JPZ 2023, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *P*, *Q*, *R* a přímka *a*.\n\n'
      + 'Na přímce *a* leží strana *AB* čtverce *ABCD*.\n'
      + 'Dva ze tří bodů *P*, *Q*, *R* leží uvnitř dvou různých stran tohoto čtverce a třetí bod leží vně čtverce *ABCD*.\n\n'
      + 'Sestrojte všechny vrcholy čtverce *ABCD*, označte je písmeny a čtverec narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'p', x: 260.9, y: 208.2, label: 'P' },
      { id: 'q', x: 309.4, y: 161.5, label: 'Q' },
      { id: 'r', x: 514.4, y: 289.8, label: 'R' },
    ],
    lines: [{ label: 'a', from: { x: 108.6, y: 291.7 }, to: { x: 633.6, y: 384.7 } }],
    frame: { width: 817.4, height: 422.3 },
  },
  {
    id: '1590f78d-6718-4a8a-a1df-65a2db988905',
    title: '2023 · 2. náhradní termín · 10. Pravoúhlý trojúhelník s úhlem 40°',
    source: 'JPZ 2023, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímky *b*, *c* a na přímce *b* leží bod *A*.\n\n'
      + 'Bod *A* je vrchol trojúhelníku *ABC* s pravým úhlem při vrcholu *A*.\n'
      + 'Na přímce *b* leží vrchol *B* a na přímce *c* leží vrchol *C* tohoto trojúhelníku.\n'
      + 'Velikost vnitřního úhlu trojúhelníku *ABC* při vrcholu *C* je 40°.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [{ id: 'a', x: 409.9, y: 279.5, label: 'A' }],
    lines: [
      { label: 'b', from: { x: 68.8, y: 186.2 }, to: { x: 670.0, y: 350.6 } },
      { label: 'c', from: { x: 68.7, y: 129.2 }, to: { x: 673.5, y: 87.2 } },
    ],
    frame: { width: 817.4, height: 422.4 },
  },
];
