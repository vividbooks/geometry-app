/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2025 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2025: CermatAssignmentInput[] = [
  {
    id: '34699e67-edac-4ea3-a3cb-af15f219a8f4',
    title: '2025 · 1. řádný termín · 9. Obdélník s vrcholy na dvou přímkách',
    source: 'JPZ 2025, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží různoběžky *p*, *q* a bod *R*.\n\n'
      + '9.1 Sestrojte osu většího úhlu, který svírají přímky *p*, *q*, a označte ji písmenem *o*.\n\n'
      + '9.2 Na přímkách *p*, *q* leží všechny čtyři vrcholy obdélníku *KLMN*.\n'
      + 'Bod *R* leží uvnitř strany *MN* tohoto obdélníku.\n'
      + 'Sestrojte vrcholy obdélníku *KLMN*, označte je písmeny a obdélník narýsujte.',
    points: [{ id: 'r', x: 307.3, y: 161.1, label: 'R' }],
    lines: [
      { label: 'p', from: { x: 83.7, y: 336.5 }, to: { x: 658.6, y: 189.4 } },
      { label: 'q', from: { x: 145.5, y: 64.3 }, to: { x: 518.9, y: 439.3 } },
    ],
    frame: { width: 817.4, height: 472.3 },
  },
  {
    id: 'cadca086-00a5-418f-844e-26c0b459112d',
    title: '2025 · 1. řádný termín · 10. Trojúhelník z výšky a těžnice',
    source: 'JPZ 2025, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží bod *B* a přímky *p*, *q*, které se protínají v bodě *C*.\n\n'
      + 'Body *B*, *C* jsou vrcholy trojúhelníku *ABC*.\n'
      + 'Na přímce *p* leží výška *v*_{c} na stranu *c* a na přímce *q* leží těžnice *t*_{c} na stranu *c* tohoto trojúhelníku.\n\n'
      + 'Sestrojte vrchol *A* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'b', x: 692.9, y: 342.3, label: 'B' },
      // Průsečík přímek p, q — sešit ho nevyznačuje křížkem, jen písmenem C.
      { id: 'c', x: 464.1, y: 165.9, label: 'C' },
    ],
    lines: [
      { label: 'p', from: { x: 451.2, y: 87.4 }, to: { x: 514.3, y: 470.5 } },
      { label: 'q', from: { x: 505.2, y: 64.4 }, to: { x: 333.2, y: 489.2 } },
    ],
    frame: { width: 817.4, height: 522.3 },
  },
  {
    id: 'fe3fbee6-e2ca-4c69-9d1c-9c72eb7c2bdd',
    title: '2025 · 2. řádný termín · 9. Rovnoramenný trojúhelník s bodem na těžnici',
    source: 'JPZ 2025, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *B*, *M*.\n\n'
      + 'Body *A*, *B* jsou vrcholy rovnoramenného trojúhelníku *ABC*.\n'
      + 'Bod *M* je uvnitř tohoto trojúhelníku a leží na těžnici *t*_{c} na stranu *AB*.\n'
      + '(Bod *M* není těžištěm trojúhelníku *ABC*.)\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 174.1, y: 479.6, label: 'A' },
      { id: 'b', x: 524.8, y: 450.3, label: 'B' },
      { id: 'm', x: 399.5, y: 315.1, label: 'M' },
    ],
    lines: [],
    frame: { width: 817.4, height: 547.2 },
  },
  {
    id: '3b226b02-7fd9-41a4-8c0b-758cbb3c30a2',
    title: '2025 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou na polopřímce',
    source: 'JPZ 2025, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *D*, *M*.\n\n'
      + 'Body *A*, *D* jsou vrcholy rovnoběžníku *ABCD*.\n'
      + 'Na polopřímce *DM* leží jedna z úhlopříček tohoto rovnoběžníku.\n'
      + 'Druhá úhlopříčka rovnoběžníku *ABCD* má stejnou délku jako úsečka *DM*.\n\n'
      + 'Sestrojte vrcholy *B*, *C* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    points: [
      { id: 'a', x: 308.3, y: 481.7, label: 'A' },
      { id: 'd', x: 163.1, y: 446.4, label: 'D' },
      { id: 'm', x: 489.4, y: 216.2, label: 'M' },
    ],
    lines: [],
    frame: { width: 817.4, height: 547.3 },
  },
  {
    id: '5d45eb2b-6be2-49bb-8610-18521a51b49e',
    title: '2025 · 1. náhradní termín · 9. Rovnoramenný trojúhelník s výškou BM',
    source: 'JPZ 2025, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *B*, *M* a přímka *q*.\n\n'
      + 'Bod *B* je vrchol rovnoramenného trojúhelníku *ABC* se základnou *AB*.\n'
      + 'Úsečka *BM* je jednou z výšek tohoto trojúhelníku a bod *M* leží na straně *AC*.\n'
      + 'Na přímce *q* leží vrchol *A* trojúhelníku *ABC*.\n\n'
      + 'Sestrojte vrcholy *A*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [
      { id: 'b', x: 448.4, y: 530.8, label: 'B' },
      { id: 'm', x: 305.6, y: 254.5, label: 'M' },
    ],
    lines: [{ label: 'q', from: { x: 108.6, y: 317.9 }, to: { x: 633.6, y: 317.9 } }],
    frame: { width: 817.4, height: 599.9 },
  },
  {
    id: 'faba27b5-efdb-4fe2-9ee3-91bca4a147b8',
    title: '2025 · 1. náhradní termín · 10. Obdélník se středem strany CD',
    source: 'JPZ 2025, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *S* a přímka *p*.\n\n'
      + 'Bod *A* je vrchol obdélníku *ABCD*, jehož vrchol *D* leží na přímce *p*.\n'
      + 'Bod *S* je střed strany *CD* obdélníku *ABCD*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 63.0, y: 344.5, label: 'A' },
      { id: 's', x: 386.7, y: 180.0, label: 'S' },
    ],
    lines: [{ label: 'p', from: { x: 33.6, y: 116.2 }, to: { x: 708.6, y: 116.2 } }],
    frame: { width: 817.4, height: 549.8 },
  },
  {
    id: 'd6ec38d4-f5e3-4fd9-9fc7-2fd8ff02cc13',
    title: '2025 · 2. náhradní termín · 9. Rovnostranný trojúhelník a jeho osový obraz',
    source: 'JPZ 2025, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *A*′ a *M*.\n\n'
      + 'Bod *A* je vrchol rovnostranného trojúhelníku *ABC*.\n'
      + 'Na přímce *AM* leží vrchol *C* tohoto trojúhelníku.\n'
      + 'Bod *A*′ je vrchol trojúhelníku *A*′*B*′*C*, který je obrazem trojúhelníku *ABC* v osové souměrnosti s osou *o*.\n'
      + 'Oba trojúhelníky mají pouze jeden společný bod, a to vrchol *C*.\n\n'
      + '9.1 Sestrojte osu *o* a označte ji písmenem.\n\n'
      + '9.2 Sestrojte všechny chybějící vrcholy trojúhelníků *ABC* i *A*′*B*′*C*, označte je písmeny a oba trojúhelníky narýsujte.',
    points: [
      { id: 'a', x: 364.4, y: 476.4, label: 'A' },
      { id: 'a2', x: 190.6, y: 261.7, label: 'A′' },
      { id: 'm', x: 411.2, y: 146.6, label: 'M' },
    ],
    lines: [],
    frame: { width: 817.4, height: 549.8 },
  },
  {
    id: '85623ecc-2fc6-4cc1-ae93-8fda25c8e6c7',
    title: '2025 · 2. náhradní termín · 10. Rovnoběžník se stejně dlouhou stranou a úhlopříčkou',
    source: 'JPZ 2025, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *L*, *M* a přímka *p* procházející bodem *M*.\n\n'
      + 'Body *L*, *M* jsou vrcholy rovnoběžníku *KLMN*.\n'
      + 'Na přímce *p* leží střed *S* souměrnosti tohoto rovnoběžníku.\n'
      + 'Délka strany *LM* je stejná jako délka úhlopříčky *LN*.\n\n'
      + 'Sestrojte střed *S* a vrcholy *K*, *N* rovnoběžníku *KLMN*, označte je písmeny a rovnoběžník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'l', x: 444.6, y: 350.2, label: 'L' },
      // Bod M je na přímce p vyznačený čárkou.
      { id: 'm', x: 663.9, y: 210.5, label: 'M' },
    ],
    lines: [{ label: 'p', from: { x: 33.6, y: 292.1 }, to: { x: 708.6, y: 204.7 } }],
    frame: { width: 817.4, height: 424.9 },
  },
];
