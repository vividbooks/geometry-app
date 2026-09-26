/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2018–2019 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2018_2019: CermatAssignmentInput[] = [
  {
    id: 'dd18ad23-fbf0-47a7-83aa-d49fc59f5cf3',
    title: '2019 · 1. řádný termín · 9. Rovnoramenný trojúhelník s úhlem 30°',
    source: 'JPZ 2019, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *KL*.\n\n'
      + 'Body *K*, *L* jsou vrcholy trojúhelníku *KLM*. Velikost úhlu *LKM* je 30°.\n'
      + 'Vzdálenost bodu *L* od bodu *K* je stejná jako vzdálenost bodu *L* od bodu *M*.\n\n'
      + 'Sestrojte jeden trojúhelník *KLM*.',
    points: [
      { id: 'k', x: 211.2, y: 372.3, label: 'K' },
      { id: 'l', x: 536.2, y: 372.3, label: 'L' },
    ],
    lines: [],
    shapes: [{ kind: 'line', id: 'kl', through: ['k', 'l'] }],
    frame: { width: 842.4, height: 438.4 },
  },
  {
    id: '0cdf95dc-06ff-429a-9084-e20b7efc8296',
    title: '2019 · 1. řádný termín · 10. Obdélník s vrcholem na přímce',
    source: 'JPZ 2019, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *c* a mimo ni dva různé body *B*, *D*.\n\n'
      + 'Body *B*, *D* jsou vrcholy obdélníku *ABCD*. Vrchol *C* obdélníku *ABCD* leží na přímce *c*.\n\n'
      + '10.1 Sestrojte a označte písmenem chybějící vrchol *C* obdélníku *ABCD*.\n\n'
      + '10.2 Sestrojte a označte písmenem chybějící vrchol *A* obdélníku *ABCD* a obdélník narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 'b', x: 558.1, y: 482.6, label: 'B' },
      { id: 'd', x: 152.6, y: 289.1, label: 'D' },
    ],
    lines: [{ label: 'c', from: { x: 205.4, y: 140.1 }, to: { x: 674.2, y: 274.7 } }],
    frame: { width: 842.4, height: 671.0 },
  },
  {
    id: '66926945-7f45-417b-a642-c55cbe9fa3d6',
    title: '2019 · 2. řádný termín · 9. Rovnoramenný trojúhelník s ramenem na přímce',
    source: 'JPZ 2019, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží bod *B* a přímka *p*, která prochází bodem *A*.\n\n'
      + 'Body *A*, *B* jsou vrcholy rovnoramenného trojúhelníku *ABC* se základnou *AB*.\n'
      + 'Rameno *AC* leží na přímce *p*.\n\n'
      + 'Sestrojte a označte písmenem chybějící vrchol *C* trojúhelníku *ABC* a trojúhelník narýsujte.',
    points: [
      { id: 'a', x: 517.4, y: 73.6, label: 'A' },
      { id: 'b', x: 303.7, y: 350.8, label: 'B' },
    ],
    lines: [{ label: 'p', from: { x: 517.4, y: 46.5 }, to: { x: 517.4, y: 450.2 } }],
    frame: { width: 842.4, height: 471.7 },
  },
  {
    id: 'dafd0c20-bb5e-4926-9cbd-0edb3bcf2c55',
    title: '2019 · 2. řádný termín · 10. Čtverec se dvěma vrcholy na kružnici',
    source: 'JPZ 2019, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *p* a kružnice *k* se středem *S*. '
      + 'Bod *A* je jedním ze dvou průsečíků přímky *p* a kružnice *k*.\n\n'
      + 'Bod *A* je vrchol čtverce *ABCD*, bod *S* leží uvnitř tohoto čtverce a na přímce *p* leží strana *AB*.\n'
      + 'Právě dva ze čtyř vrcholů čtverce *ABCD* leží na kružnici *k*.\n\n'
      + 'Sestrojte a označte písmeny chybějící vrcholy čtverce *ABCD* a čtverec narýsujte.\n'
      + 'Najděte všechna řešení.',
    points: [
      { id: 's', x: 405.1, y: 311.9, label: 'S' },
      { id: 'a', x: 253.0, y: 441.8, label: 'A' },
    ],
    lines: [{ label: 'p', from: { x: 108.3, y: 397.2 }, to: { x: 636.3, y: 559.9 } }],
    shapes: [{ kind: 'circle', id: 'k', center: 's', radius: 200, label: 'k' }],
    frame: { width: 842.4, height: 599.3 },
  },
  {
    id: 'd0abcd42-585f-4d26-b9c8-db0555db7e12',
    title: '2018 · 1. řádný termín · 9. Trojúhelník s těžnicí a výškou 6 cm',
    source: 'JPZ 2018, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *AB* a mimo ni bod *M*.\n\n'
      + 'Úsečka *AB* je strana *c* trojúhelníku *ABC*. Bod *M* leží uvnitř tohoto trojúhelníku '
      + 'na těžnici *t*_{c} (těžnice na stranu *c*). Výška *v*_{c} (výška na stranu *c*) měří 6 cm.\n\n'
      + '9.1 Sestrojte těžnici *t*_{c}, chybějící vrchol *C* trojúhelníku *ABC* a trojúhelník narýsujte.\n\n'
      + '9.2 Sestrojte těžiště trojúhelníku *ABC* a označte jej písmenem *T*.',
    points: [
      { id: 'a', x: 156.6, y: 395.9, label: 'A' },
      { id: 'b', x: 609.0, y: 395.9, label: 'B' },
      { id: 'm', x: 609.7, y: 165.6, label: 'M' },
    ],
    lines: [],
    shapes: [{ kind: 'line', id: 'ab', through: ['a', 'b'] }],
    frame: { width: 820.6, height: 477.9 },
  },
  {
    id: 'be4e60f3-cd27-4c1f-9e1e-28694f4238b6',
    title: '2018 · 1. řádný termín · 10. Střed kružnice opsané trojúhelníku',
    source: 'JPZ 2018, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží trojúhelník *KLM*.\n\n'
      + 'Kružnice *k* prochází vrcholy trojúhelníku *KLM*.\n\n'
      + 'Sestrojte střed *S* kružnice *k*.',
    points: [
      { id: 'k', x: 343.0, y: 630.1, label: 'K' },
      { id: 'l', x: 690.8, y: 176.3, label: 'L' },
      { id: 'm', x: 148.4, y: 278.2, label: 'M' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'kl', from: 'k', to: 'l' },
      { kind: 'segment', id: 'lm', from: 'l', to: 'm' },
      { kind: 'segment', id: 'mk', from: 'm', to: 'k' },
    ],
    frame: { width: 820.6, height: 707.5 },
  },
  {
    id: '022dd853-050e-48b2-84f9-aa37e1f96184',
    title: '2018 · 2. řádný termín · 9. Výšky pravoúhlého trojúhelníku',
    source: 'JPZ 2018, 2. řádný termín, úloha 9',
    instructionMarkup:
      '9.1 V pravoúhlém trojúhelníku *ABC* sestrojte a popište výšky *v*_{a}, *v*_{b}, *v*_{c}.\n\n'
      + '9.2 V rovině leží přímka *AB* a mimo ni bod *M*.\n'
      + 'Úsečka *AB* je přepona *c* pravoúhlého trojúhelníku *ABC*.\n'
      + 'Bod *M* leží na kterékoli z jeho tří výšek *v*_{a}, *v*_{b}, *v*_{c}.\n'
      + 'Sestrojte chybějící vrchol *C* trojúhelníku *ABC* a trojúhelník narýsujte.\n'
      + 'Najděte všechna řešení.\n'
      + '(Neuvažujte o řešení, kdy bod *M* leží vně trojúhelníku.)',
    points: [
      // 9.1: malý pravoúhlý trojúhelník ABC (pravý úhel při C) v horní části rámečku
      { id: 'a0', x: 39.8, y: 174.3, label: 'A' },
      { id: 'b0', x: 268.2, y: 174.3, label: 'B' },
      { id: 'c0', x: 193.3, y: 67.0, label: 'C' },
      // 9.2: přímka AB a bod M
      { id: 'a', x: 126.5, y: 660.8, label: 'A' },
      { id: 'b', x: 579.0, y: 660.8, label: 'B' },
      { id: 'm', x: 318.9, y: 580.5, label: 'M' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'ab0', from: 'a0', to: 'b0' },
      { kind: 'segment', id: 'bc0', from: 'b0', to: 'c0' },
      { kind: 'segment', id: 'ca0', from: 'c0', to: 'a0' },
      { kind: 'line', id: 'ab', through: ['a', 'b'] },
    ],
    frame: { width: 820.6, height: 764.5 },
  },
  {
    id: '032e2924-d7f2-4ca9-a250-2e6f66c08203',
    title: '2018 · 2. řádný termín · 10. Rovnoramenný lichoběžník s osou o',
    source: 'JPZ 2018, 2. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží polopřímka *AX* a přímka *o*.\n\n'
      + 'Bod *A* je vrchol rovnoramenného lichoběžníku *ABCD* s osou souměrnosti *o*.\n'
      + 'Vrchol *D* tohoto lichoběžníku leží na polopřímce *AX*.\n'
      + 'Strany *AB* a *AD* mají stejnou délku.\n\n'
      + 'Sestrojte a popište chybějící vrcholy lichoběžníku *ABCD* a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 320.3, y: 414.4, label: 'A' },
      { id: 'x', x: 135.5, y: 172.1, label: 'X' },
    ],
    lines: [{ label: 'o', from: { x: 316.0, y: 51.5 }, to: { x: 444.3, y: 429.9 } }],
    shapes: [{ kind: 'ray', id: 'ax', from: 'a', through: 'x' }],
    frame: { width: 820.6, height: 465.1 },
  },
];
