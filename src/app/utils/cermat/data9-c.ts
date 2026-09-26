/**
 * Úkoly 9. ročníku ve stylu konstrukčních úloh CERMAT (vlastní zadání), balík C.
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku. Konec `to` pojmenované přímky
 * je zvolený tak, aby popisek (editor ho kreslí v 1,1násobku úseku from → to) padl dovnitř rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

const SOURCE = 'Vividbooks, 9. ročník (ve stylu úloh CERMAT)';

export const GRADE9_STYLE_C: CermatAssignmentInput[] = [
  {
    id: 'eb989d60-d80e-49ef-a012-da8378c440d5',
    title: 'Úsečka se středem v daném bodě',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží polopřímky *VX*, *VY* a bod *P*.\n\n'
      + 'Bod *K* leží na polopřímce *VX* a bod *L* leží na polopřímce *VY*.\n'
      + 'Bod *P* je středem úsečky *KL*.\n\n'
      + 'Sestrojte body *K*, *L*, označte je písmeny a úsečku *KL* narýsujte.',
    points: [
      { id: 'v', x: 100.0, y: 420.0, label: 'V' },
      { id: 'x', x: 757.5, y: 362.5, label: 'X' },
      { id: 'y', x: 226.5, y: 72.3, label: 'Y' },
      { id: 'p', x: 375.4, y: 259.4, label: 'P' },
    ],
    lines: [],
    shapes: [
      { kind: 'ray', id: 'vx', from: 'v', through: 'x' },
      { kind: 'ray', id: 'vy', from: 'v', through: 'y' },
    ],
    frame: { width: 815, height: 470 },
  },
  {
    id: '2fade1e1-0466-4cc2-8851-20cd375e5e63',
    title: 'Body, ze kterých je úsečka vidět pod pravým úhlem',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží body *A*, *B* a přímka *p*.\n\n'
      + 'Bod *X* leží na přímce *p* a úhel *AXB* je pravý.\n\n'
      + 'Sestrojte bod *X*, označte ho písmenem a narýsujte trojúhelník *ABX*.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 240.0, y: 290.0, label: 'A' },
      { id: 'b', x: 540.0, y: 240.0, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 40.0, y: 410.0 }, to: { x: 676.4, y: 345.1 } }],
    frame: { width: 815, height: 470 },
  },
  {
    id: '3dff88fd-0008-4471-8626-8c98c4bfadc7',
    title: 'Čtverec se stranou na přímce a vrcholem na rovnoběžce',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží rovnoběžné přímky *p*, *q* a bod *A*, který leží na přímce *p*.\n\n'
      + 'Bod *A* je vrchol čtverce *ABCD*.\n'
      + 'Strana *AB* tohoto čtverce leží na přímce *p* a vrchol *D* leží na přímce *q*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* čtverce *ABCD*, označte je písmeny a čtverec narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [{ id: 'a', x: 400.0, y: 370.0, label: 'A' }],
    lines: [
      { label: 'p', from: { x: 47.9, y: 444.8 }, to: { x: 681.5, y: 310.1 } },
      { label: 'q', from: { x: 40.8, y: 267.4 }, to: { x: 681.0, y: 131.3 } },
    ],
    frame: { width: 815, height: 490 },
  },
  {
    id: 'a3d3599b-fc00-4380-a137-351b9856bf91',
    title: 'Rovnostranný trojúhelník se stranou na přímce',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží bod *A* a přímka *p*.\n\n'
      + 'Bod *A* je vrchol rovnostranného trojúhelníku *ABC*.\n'
      + 'Vrcholy *B* a *C* tohoto trojúhelníku leží na přímce *p*.\n\n'
      + 'Sestrojte vrcholy *B*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [{ id: 'a', x: 330.0, y: 110.0, label: 'A' }],
    lines: [{ label: 'p', from: { x: 54.6, y: 273.3 }, to: { x: 682.2, y: 361.5 } }],
    frame: { width: 815, height: 430 },
  },
  {
    id: '75c7a4c0-1416-44e2-a989-26d2b1443bf2',
    title: 'Pravoúhlý trojúhelník s výškou na přeponu',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *M*.\n\n'
      + 'Úsečka *AB* je přepona pravoúhlého trojúhelníku *ABC* s pravým úhlem při vrcholu *C*.\n'
      + 'Výška *v*_{c} tohoto trojúhelníku měří 2 cm.\n'
      + 'Vrchol *C* leží v polorovině *ABM*.\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 226.7, y: 255.6, label: 'A' },
      { id: 'b', x: 573.3, y: 304.4, label: 'B' },
      { id: 'm', x: 680.0, y: 140.0, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 500 },
  },
];
