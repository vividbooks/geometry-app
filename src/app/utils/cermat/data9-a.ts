/**
 * Úkoly 9. ročníku ve stylu konstrukčních úloh CERMAT (vlastní zadání), balík A.
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

const SOURCE = 'Vividbooks, 9. ročník (ve stylu úloh CERMAT)';

export const GRADE9_STYLE_A: CermatAssignmentInput[] = [
  {
    id: '8a0fdaf1-dbbe-4a3c-9a7a-7669f215fbb0',
    title: 'Kružnice vepsaná trojúhelníku',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží trojúhelník *ABC*.\n\n'
      + 'Kružnice *k* se dotýká všech tří stran trojúhelníku *ABC*.\n\n'
      + 'Sestrojte střed *S* kružnice *k*, označte ho písmenem a kružnici *k* narýsujte.',
    points: [
      { id: 'a', x: 130, y: 430, label: 'A' },
      { id: 'b', x: 650, y: 410, label: 'B' },
      { id: 'c', x: 390, y: 95, label: 'C' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'ab', from: 'a', to: 'b' },
      { kind: 'segment', id: 'bc', from: 'b', to: 'c' },
      { kind: 'segment', id: 'ca', from: 'c', to: 'a' },
    ],
    frame: { width: 815, height: 500 },
  },
  {
    id: 'ca84c8dd-e051-4da8-9609-61ef53129a0d',
    title: 'Trojúhelník s úhlem 45° a výškou',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB* a bod *M*.\n\n'
      + 'Úsečka *AB* je strana trojúhelníku *ABC*.\n'
      + 'Velikost úhlu *BAC* je 45°.\n'
      + 'Výška *v*_{c} trojúhelníku *ABC* měří 3 cm.\n'
      + 'Vrchol *C* leží v polorovině *ABM*.\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 160, y: 410, label: 'A' },
      { id: 'b', x: 529.3, y: 344.9, label: 'B' },
      { id: 'm', x: 560, y: 90, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: '3a93f766-6d0c-4ef1-bf93-6ce155da9d49',
    title: 'Pravoúhlý trojúhelník s danou odvěsnou',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží úsečka *AB*.\n\n'
      + 'Úsečka *AB* je přepona pravoúhlého trojúhelníku *ABC* s pravým úhlem při vrcholu *C*.\n'
      + 'Odvěsna *AC* měří 4 cm.\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 250, y: 310, label: 'A' },
      { id: 'b', x: 592.4, y: 237.2, label: 'B' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'ab', from: 'a', to: 'b' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: 'bd9d361b-722c-404c-ab0a-34d5fcac6b9e',
    title: 'Tečny rovnoběžné s přímkou',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží přímka *p* a kružnice *k* se středem *S*.\n\n'
      + 'Přímky *t*₁ a *t*₂ jsou tečny kružnice *k* a obě jsou rovnoběžné s přímkou *p*.\n\n'
      + 'Sestrojte body dotyku *T*₁, *T*₂ tečen *t*₁, *t*₂ s kružnicí *k*, označte je písmeny a obě tečny narýsujte.',
    points: [{ id: 's', x: 470, y: 265, label: 'S' }],
    lines: [{ label: 'p', from: { x: 84.5, y: 30 }, to: { x: 289.7, y: 470 } }],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 125, label: 'k' }],
    frame: { width: 815, height: 500 },
  },
  {
    id: 'daabc2f6-50e6-4279-a405-e6e1755e0070',
    title: 'Kružnice dotýkající se dvou přímek',
    source: SOURCE,
    instructionMarkup:
      'V rovině leží různoběžky *p*, *q* a bod *T* na přímce *p*.\n\n'
      + 'Kružnice *k* se dotýká přímky *p* v bodě *T* a zároveň se dotýká přímky *q*.\n\n'
      + 'Sestrojte střed *S* kružnice *k*, označte ho písmenem a kružnici *k* narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [{ id: 't', x: 479.2, y: 338.1, label: 'T' }],
    lines: [
      { label: 'p', from: { x: 399.0, y: 510.0 }, to: { x: 622.8, y: 30.0 } },
      { label: 'q', from: { x: 30.0, y: 396.2 }, to: { x: 675.2, y: 510.0 } },
    ],
    frame: { width: 815, height: 540 },
  },
];
