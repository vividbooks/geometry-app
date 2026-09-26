/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2020–2021 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2020_2021: CermatAssignmentInput[] = [
  {
    id: '5c5439be-f7b5-4987-be15-5721a6d1c650',
    title: '2021 · 1. řádný termín · 9. Trojúhelník s úhlem 60° a osou strany',
    source: 'JPZ 2021, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží polopřímka *BX* a přímka *o*.\n\n'
      + 'Bod *B* je vrchol trojúhelníku *ABC*. Přímka *o* je osou strany *AB*.\n'
      + 'Velikost vnitřního úhlu *BAC* je 60° a vrchol *C* leží na polopřímce *BX*.\n\n'
      + 'Sestrojte vrcholy *A*, *C* trojúhelníku *ABC*, označte je písmeny a trojúhelník narýsujte.',
    points: [
      { id: 'b', x: 136.4, y: 431.5, label: 'B' },
      { id: 'x', x: 582.5, y: 362.4, label: 'X' },
    ],
    lines: [{ label: 'o', from: { x: 133.1, y: 125.7 }, to: { x: 486.6, y: 439.7 } }],
    shapes: [{ kind: 'ray', id: 'bx', from: 'b', through: 'x' }],
    frame: { width: 818.6, height: 523.6 },
  },
  {
    id: 'ffdd43f9-08b9-4cd2-a059-387a41b97299',
    title: '2021 · 1. řádný termín · 10. Lichoběžník s kolmými úhlopříčkami',
    source: 'JPZ 2021, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *B*, *P* a přímka *q* procházející bodem *B*.\n\n'
      + 'Bod *B* je vrchol rovnoramenného lichoběžníku *ABCD* se základnou *AB*, rameno *BC* leží na přímce *q*.\n'
      + 'Úhlopříčky *AC* a *BD* se protínají v bodě *P* a jsou na sebe kolmé.\n\n'
      + 'Sestrojte vrcholy *A*, *C*, *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.',
    points: [
      { id: 'b', x: 520.1, y: 550.5, label: 'B' },
      { id: 'p', x: 434.9, y: 288.1, label: 'P' },
    ],
    lines: [{ label: 'q', from: { x: 661.9, y: 78.9 }, to: { x: 501.1, y: 613.8 } }],
    frame: { width: 818.6, height: 648.1 },
  },
  {
    id: '303f469d-439d-4a89-9764-41356e085571',
    title: '2021 · 2. řádný termín · 9. Rovnoramenný pravoúhlý trojúhelník',
    source: 'JPZ 2021, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *c* a polopřímka *AX*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného pravoúhlého trojúhelníku *ABC*.\n'
      + 'Vrchol *B* tohoto trojúhelníku leží na polopřímce *AX*, vrchol *C* na přímce *c*.\n'
      + 'Pravý úhel je buď při vrcholu *A*, nebo při vrcholu *B*.\n\n'
      + 'Sestrojte trojúhelník *ABC* s pravým úhlem při vrcholu\n'
      + '9.1 *A*,\n'
      + '9.2 *B*\n'
      + 'a vrcholy *B*, *C* označte písmeny.',
    points: [
      { id: 'a', x: 155.9, y: 424.0, label: 'A' },
      { id: 'x', x: 566.2, y: 424.0, label: 'X' },
    ],
    lines: [{ label: 'c', from: { x: 83.7, y: 256.8 }, to: { x: 636.7, y: 64.4 } }],
    shapes: [{ kind: 'ray', id: 'ax', from: 'a', through: 'x' }],
    frame: { width: 817.4, height: 497.3 },
  },
  {
    id: '96a5023a-0b79-465a-8f8c-5335e1d1d73a',
    title: '2021 · 2. řádný termín · 10. Rovnoběžník s výškou 5 cm',
    source: 'JPZ 2021, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží tři různé body *A*, *M*, *N*.\n\n'
      + 'Bod *A* je vrchol rovnoběžníku *ABCD*.\n'
      + 'Bod *M* leží uvnitř strany *AB* tohoto rovnoběžníku, bod *N* uvnitř strany *AD* a výška na stranu *AB* měří 5 cm.\n'
      + 'Vrchol *D* má od vrcholů *A* i *B* stejnou vzdálenost, tedy |*BD*| = |*AD*|.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* rovnoběžníku *ABCD*, označte je písmeny a rovnoběžník narýsujte.',
    points: [
      { id: 'a', x: 110.5, y: 437.1, label: 'A' },
      { id: 'm', x: 426.1, y: 387.5, label: 'M' },
      { id: 'n', x: 219.1, y: 255.9, label: 'N' },
    ],
    lines: [],
    frame: { width: 817.4, height: 522.3 },
  },
  {
    id: '3bf4d396-f839-4772-bae1-170d0a3da66f',
    title: '2021 · 1. náhradní termín · 9. Obdélník vepsaný do kružnice',
    source: 'JPZ 2021, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *A*, *B*, *M*.\n\n'
      + 'Body *A*, *B* jsou vrcholy obdélníku *ABCD*.\n'
      + 'Bod *M* leží na téže kružnici *k* jako všechny vrcholy obdélníku *ABCD*.\n\n'
      + '9.1 Sestrojte střed kružnice *k* a označte ho písmenem *S*.\n\n'
      + '9.2 Sestrojte vrcholy *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.',
    points: [
      { id: 'a', x: 169.9, y: 374.1, label: 'A' },
      { id: 'b', x: 547.1, y: 566.9, label: 'B' },
      { id: 'm', x: 383.9, y: 105.3, label: 'M' },
    ],
    lines: [],
    frame: { width: 817.4, height: 647.3 },
  },
  {
    id: '0965319b-f70a-4211-94c0-b2ee9082c04f',
    title: '2021 · 1. náhradní termín · 10. Trojúhelník z os úhlů',
    source: 'JPZ 2021, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B*, *L*.\n\n'
      + 'Body *A*, *B* jsou vrcholy trojúhelníku *ABC*. Osy vnitřních úhlů *BAC* a *ABC* tohoto trojúhelníku procházejí bodem *L*.\n\n'
      + 'Sestrojte vrchol *C* trojúhelníku *ABC*, označte ho písmenem a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 268.3, y: 536.5, label: 'A' },
      { id: 'b', x: 728.6, y: 397.1, label: 'B' },
      { id: 'l', x: 334.1, y: 397.2, label: 'L' },
    ],
    lines: [],
    frame: { width: 817.4, height: 622.5 },
  },
  {
    id: 'b9736a8a-76a4-4caa-991d-0a1a7531bd6a',
    title: '2021 · 2. náhradní termín · 9. Rovnoramenný trojúhelník se stranou LM',
    source: 'JPZ 2021, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží úsečka *LM* a bod *U*.\n\n'
      + 'Úsečka *LM* je strana rovnoramenného trojúhelníku *KLM*.\n'
      + 'V tomto trojúhelníku je každé z obou ramen dvakrát delší než základna.\n'
      + 'Bod *U* leží uvnitř trojúhelníku *KLM*.\n\n'
      + 'Sestrojte vrchol *K* trojúhelníku *KLM*, označte jej písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna 3 řešení.',
    points: [
      { id: 'l', x: 667.3, y: 355.9, label: 'L' },
      { id: 'm', x: 542.2, y: 83.4, label: 'M' },
      { id: 'u', x: 553.7, y: 194.7, label: 'U' },
    ],
    lines: [],
    shapes: [{ kind: 'segment', id: 'lm', from: 'l', to: 'm' }],
    frame: { width: 817.4, height: 722.3 },
  },
  {
    id: '1388ef1f-d1c9-4332-b778-d2cf821bc7fa',
    title: '2021 · 2. náhradní termín · 10. Obdélník se středem S',
    source: 'JPZ 2021, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *S*.\n\n'
      + 'Bod *A* je vrchol obdélníku *ABCD* a bod *S* je střed tohoto obdélníku.\n'
      + 'Vrchol *C* má od vrcholu *D* i od středu *S* stejnou vzdálenost, tedy |*CD*| = |*CS*|.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 212.9, y: 436.5, label: 'A' },
      { id: 's', x: 387.9, y: 310.7, label: 'S' },
    ],
    lines: [],
    frame: { width: 817.4, height: 597.5 },
  },
  {
    id: 'ea963e72-f512-4cbd-af0d-4d5e7072a6f5',
    title: '2020 · 1. řádný termín · 9. Trojúhelník s těžnicí 6 cm',
    source: 'JPZ 2020, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *AC* a přímka *b*.\n\n'
      + 'Body *A*, *C* jsou vrcholy trojúhelníku *ABC*. Na přímce *b* leží vrchol *B*.\n'
      + 'Délka těžnice *t*_{b} na stranu *AC* je 6 cm.\n\n'
      + 'Sestrojte vrchol *B* trojúhelníku *ABC*, označte jej písmenem a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'a', x: 194.7, y: 244.4, label: 'A' },
      { id: 'c', x: 465.4, y: 99.0, label: 'C' },
    ],
    lines: [{ label: 'b', from: { x: 83.7, y: 456.6 }, to: { x: 679.7, y: 363.1 } }],
    shapes: [{ kind: 'line', id: 'ac', through: ['a', 'c'] }],
    frame: { width: 817.4, height: 522.2 },
  },
  {
    id: '32f328bb-cb2f-4bec-ae7c-3c90c4cb3c4a',
    title: '2020 · 1. řádný termín · 10. Rovnoramenný lichoběžník s osou o',
    source: 'JPZ 2020, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *o* a body *A*, *M*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného lichoběžníku *ABCD*, bod *M* je střed jeho ramene *BC*. '
      + 'Přímka *o* je osou lichoběžníku *ABCD*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 336.3, y: 478.6, label: 'A' },
      { id: 'm', x: 558.3, y: 270.9, label: 'M' },
    ],
    lines: [{ label: 'o', from: { x: 311.1, y: 74.0 }, to: { x: 444.4, y: 488.6 } }],
    frame: { width: 817.4, height: 547.3 },
  },
];
