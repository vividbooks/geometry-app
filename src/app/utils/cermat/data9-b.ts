/**
 * Úkoly 9. ročníku ve stylu konstrukčních úloh CERMAT (vlastní zadání), balík B.
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

const SOURCE = 'Vividbooks, 9. ročník (ve stylu úloh CERMAT)';

export const GRADE9_STYLE_B: CermatAssignmentInput[] = [
  {
    // Kružnice k: střed S, poloměr 3,5 cm; bod A na k.
    id: '03923a22-64e3-4d41-b1e1-d613e193469a',
    title: 'Rovnostranný trojúhelník vepsaný do kružnice',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží kružnice *k* se středem *S* a bod *A*, který leží na kružnici *k*.\n\n'
      + 'Bod *A* je vrchol rovnostranného trojúhelníku *ABC*.\n'
      + 'Všechny vrcholy trojúhelníku *ABC* leží na kružnici *k*.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [
      { id: 's', x: 400, y: 280, label: 'S' },
      { id: 'a', x: 237.7, y: 345.6, label: 'A' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 175, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
  {
    // Úhlopříčka AC délky 7 cm, strana AB 3 cm.
    id: 'f56c3372-661c-4d90-ad14-bfdc982778cb',
    title: 'Obdélník z úhlopříčky a strany',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AC*.\n\n'
      + 'Úsečka *AC* je úhlopříčka obdélníku *ABCD*.\n'
      + 'Strana *AB* obdélníku *ABCD* má délku 3 cm.\n\n'
      + 'Sestrojte vrcholy *B*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 239, y: 324, label: 'A' },
      { id: 'c', x: 575, y: 226, label: 'C' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ac', from: 'a', to: 'c' }],
    frame: { width: 815, height: 500 },
  },
  {
    // Úhel XAM = 35°, strana kosočtverce 4 cm; M leží uvnitř úhlopříčky AC.
    id: '0619e1ad-eb62-489f-af79-67576a3ad352',
    title: 'Kosočtverec s vrcholem na polopřímce',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží polopřímka *AX* a bod *M*.\n\n'
      + 'Bod *A* je vrchol kosočtverce *ABCD*, jehož strany mají délku 4 cm.\n'
      + 'Vrchol *B* leží na polopřímce *AX*.\n'
      + 'Úhlopříčka *AC* kosočtverce *ABCD* leží na polopřímce *AM*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* kosočtverce *ABCD*, označte je písmeny a kosočtverec narýsujte.',
    points: [
      { id: 'a', x: 150, y: 380, label: 'A' },
      { id: 'x', x: 626.4, y: 438.5, label: 'X' },
      { id: 'm', x: 282.4, y: 309.6, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'ray', id: 'ax', from: 'a', through: 'x' }],
    frame: { width: 815, height: 500 },
  },
  {
    // |AB| = 7 cm, přímka p ve vzdálenosti 2 cm od AB, ramena 3 cm.
    id: 'bb89bf4c-dbe7-4a0a-ba5f-0946a98d72b7',
    title: 'Rovnoramenný lichoběžník s rameny 3 cm',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB* a přímka *p*, která je rovnoběžná s přímkou *AB*.\n\n'
      + 'Úsečka *AB* je jedna ze základen rovnoramenného lichoběžníku *ABCD*.\n'
      + 'Vrcholy *C*, *D* tohoto lichoběžníku leží na přímce *p*.\n'
      + 'Ramena *BC* a *AD* mají délku 3 cm.\n\n'
      + 'Sestrojte vrcholy *C*, *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 244.8, y: 390.8, label: 'A' },
      { id: 'b', x: 592.9, y: 354.2, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 35.0, y: 312.4 }, to: { x: 780.0, y: 234.1 } }],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 450 },
  },
  {
    // |AB| = 7 cm, úhly 60° při A a 45° při B.
    id: '4ba5b152-9dc2-42fc-8fb1-1ce81e1a6709',
    title: 'Trojúhelník s úhly 60° a 45°',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *M*.\n\n'
      + 'Úsečka *AB* je strana trojúhelníku *ABC*.\n'
      + 'Úhel *BAC* má velikost 60° a úhel *ABC* má velikost 45°.\n'
      + 'Vrchol *C* leží v polorovině *ABM*.\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 170, y: 420, label: 'A' },
      { id: 'b', x: 519.1, y: 395.6, label: 'B' },
      { id: 'm', x: 660, y: 215, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 500 },
  },
];
