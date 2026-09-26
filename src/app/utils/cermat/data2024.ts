/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2024 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF. Obrázky 2024 B úloha 10 a 2024 C úloha 9 jsou v sešitu
 * rastrové — kružnice a body jsou odměřené z výřezu stránky.
 * V sešitech 2024 je celý výchozí text uvnitř rámečku, proto je rámeček vyšší a body jsou níž.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2024: CermatAssignmentInput[] = [
  {
    id: '925f9c30-3b3e-4f46-9055-6ff8f98aa4c4',
    title: '2024 · 1. řádný termín · 9. Rovnostranný trojúhelník se středem strany',
    source: 'JPZ 2024, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží body *C* a *S*.\n\n'
      + 'Bod *C* je vrchol rovnostranného trojúhelníku *ABC*.\n'
      + 'Bod *S* je středem strany *AB*.\n\n'
      + 'Sestrojte vrcholy *A*, *B* rovnostranného trojúhelníku *ABC* a trojúhelník narýsujte.',
    points: [
      { id: 'c', x: 324.4, y: 206.3, label: 'C' },
      { id: 's', x: 476.8, y: 363.5, label: 'S' },
    ],
    lines: [],
    frame: { width: 797.4, height: 551.8 },
  },
  {
    id: '74e8bd33-763d-4644-afb2-b607515f45f7',
    title: '2024 · 1. řádný termín · 10. Obdélník s úhlopříčkou délky AE',
    source: 'JPZ 2024, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *AE* a přímka *p* procházející bodem *E*.\n\n'
      + 'Bod *A* je vrchol obdélníku *ABCD*.\n'
      + 'Vrchol *B* leží na přímce *AE* a vrchol *C* na přímce *p*.\n'
      + 'Úhlopříčka *BD* obdélníku *ABCD* má stejnou délku jako úsečka *AE*.\n\n'
      + 'Sestrojte vrcholy *B*, *C*, *D* obdélníku *ABCD*, označte je písmeny a obdélník narýsujte.',
    points: [
      { id: 'a', x: 177.3, y: 570.3, label: 'A' },
      { id: 'e', x: 525.2, y: 446.3, label: 'E' },
    ],
    lines: [{ label: 'p', from: { x: 269.5, y: 190.6 }, to: { x: 637.7, y: 558.8 } }],
    shapes: [{ kind: 'line', id: 'ae', through: ['a', 'e'] }],
    frame: { width: 797.4, height: 775.1 },
  },
  {
    id: '00162934-16bc-4d00-8651-916fc1dcdfb2',
    title: '2024 · 2. řádný termín · 9. Kosočtverec s vrcholem C na přímce OA',
    source: 'JPZ 2024, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině jsou dány body *A*, *B* a *O*.\n\n'
      + 'Body *A*, *B* jsou vrcholy kosočtverce *ABCD*.\n'
      + 'Vrchol *C* kosočtverce leží na přímce *OA*.\n\n'
      + 'Sestrojte kosočtverec *ABCD*.',
    points: [
      { id: 'a', x: 342.1, y: 372.8, label: 'A' },
      { id: 'b', x: 552.3, y: 422.5, label: 'B' },
      { id: 'o', x: 167.9, y: 421.6, label: 'O' },
    ],
    lines: [],
    frame: { width: 797.4, height: 789.1 },
  },
  {
    id: '80dbbba5-5d59-4e75-840f-96f11a7b3e38',
    title: '2024 · 2. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na kružnici',
    source: 'JPZ 2024, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině je dána kružnice *k* se středem *S* a body *K*, *L*.\n\n'
      + 'Body *K*, *L* jsou vrcholy rovnoramenného trojúhelníku *KLM* se základnou *LM*.\n\n'
      + 'Sestrojte rovnoramenný trojúhelník *KLM*, leží-li bod *M* na kružnici *k*.\n'
      + 'Nalezněte všechna řešení.',
    points: [
      { id: 's', x: 444.2, y: 389.2, label: 'S' },
      { id: 'k', x: 275.4, y: 515.5, label: 'K' },
      { id: 'l', x: 528.6, y: 634.8, label: 'L' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 172.8, label: 'k' }],
    frame: { width: 797.4, height: 822.6 },
  },
  {
    id: 'e19e6791-cfbe-441f-aba0-9b6188900a60',
    title: '2024 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s vrcholy na kružnici',
    source: 'JPZ 2024, 1. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině leží bod *E* a kružnice *k* se středem *S*, která prochází bodem *A*.\n\n'
      + 'Bod *A* je vrchol pravoúhlého lichoběžníku *ABCD* se základnami *AB* a *CD* a pravým úhlem při vrcholu *A*.\n'
      + 'Vrcholy *C* a *D* tohoto lichoběžníku leží na kružnici *k*, bod *E* je střed ramene *BC*.\n\n'
      + 'Sestrojte zbývající vrcholy *B*, *C* a *D* lichoběžníku *ABCD*, označte je písmeny a lichoběžník narýsujte.',
    points: [
      { id: 'e', x: 477.1, y: 404.5, label: 'E' },
      { id: 's', x: 259.5, y: 435.8, label: 'S' },
      { id: 'a', x: 136.7, y: 547.9, label: 'A' },
    ],
    lines: [],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 166.3, label: 'k' }],
    frame: { width: 797.5, height: 741.0 },
  },
  {
    id: '959f750b-ae45-47e1-98e8-629b7d16ce1c',
    title: '2024 · 1. náhradní termín · 10. Rovnoramenný lichoběžník s osou souměrnosti',
    source: 'JPZ 2024, 1. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině je dána přímka *o* a body *A* a *S*, které neleží na přímce *o*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného lichoběžníku *ABCD*, bod *S* je střed strany *BC*.\n'
      + 'Přímka *o* je osa souměrnosti lichoběžníku.\n\n'
      + 'Sestrojte lichoběžník *ABCD*.',
    points: [
      { id: 'a', x: 313.9, y: 641.5, label: 'A' },
      { id: 's', x: 525.6, y: 551.9, label: 'S' },
    ],
    lines: [{ label: 'o', from: { x: 457.4, y: 273.2 }, to: { x: 377.7, y: 756.2 } }],
    frame: { width: 797.5, height: 990.8 },
  },
  {
    id: '57f87d7d-f994-4b66-b97b-3abd0dda8010',
    title: '2024 · 2. náhradní termín · 9. Obdélník se středem S',
    source: 'JPZ 2024, 2. náhradní termín, úloha 9',
    instructionMarkup:
      'V rovině je dána přímka *p* a body *A* a *S*, které neleží na přímce *p*.\n\n'
      + 'Bod *A* je vrchol obdélníku *ABCD*, bod *S* je střed obdélníku (průsečík úhlopříček).\n'
      + 'Vrchol *D* obdélníku leží na přímce *p*.\n\n'
      + 'Sestrojte obdélník *ABCD*.\n'
      + 'Nalezněte všechna řešení.',
    points: [
      { id: 'a', x: 245.4, y: 448.8, label: 'A' },
      { id: 's', x: 380.4, y: 410.4, label: 'S' },
    ],
    lines: [{ label: 'p', from: { x: 91.7, y: 342.7 }, to: { x: 701.1, y: 291.4 } }],
    frame: { width: 797.5, height: 894.2 },
  },
  {
    id: '9f165d96-4d79-416b-9d23-925bd095a472',
    title: '2024 · 2. náhradní termín · 10. Pravoúhlý trojúhelník se stranou rovnoběžnou s p',
    source: 'JPZ 2024, 2. náhradní termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *C*, *S* a přímka *p*.\n\n'
      + 'Bod *C* je vrchol pravoúhlého trojúhelníku *ABC*.\n'
      + 'Bod *S* je střed strany *BC* tohoto trojúhelníku.\n'
      + 'Strana *AB* tohoto trojúhelníku je rovnoběžná s přímkou *p*.\n\n'
      + 'Sestrojte pravoúhlý trojúhelník *ABC*.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'c', x: 179.4, y: 274.0, label: 'C' },
      { id: 's', x: 366.2, y: 302.4, label: 'S' },
    ],
    lines: [{ label: 'p', from: { x: 240.4, y: 568.3 }, to: { x: 638.1, y: 352.9 } }],
    frame: { width: 797.5, height: 780.8 },
  },
];
