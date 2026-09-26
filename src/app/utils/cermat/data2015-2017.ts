/**
 * Úlohy 9 a 10 z testových sešitů CERMAT 2015–2017 (čtyřleté obory).
 * Souřadnice v px plátna (50 px = 1 cm) od levého horního rohu rámečku obrázku v sešitu,
 * odměřené z vektorových dat PDF.
 */
import type { CermatAssignmentInput } from '../cermatAssignments';

export const CERMAT_2015_2017: CermatAssignmentInput[] = [
  {
    id: '945ea4b4-5157-4c8b-ac4c-97ca027ec5d4',
    title: '2017 · 1. řádný termín · 9. Rovnoramenný trojúhelník s osou souměrnosti',
    source: 'JPZ 2017, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží různoběžky *o*, *p* a bod *L* na přímce *p*.\n\n'
      + 'Bod *L* je vrchol rovnoramenného trojúhelníku *KLM*, přímka *o* je osou souměrnosti tohoto trojúhelníku '
      + 'a strana *KL* leží na přímce *p*.\n'
      + 'Sestrojte chybějící vrcholy *K*, *M* trojúhelníku *KLM* a trojúhelník narýsujte.',
    points: [{ id: 'l', x: 549.6, y: 248.1, label: 'L' }],
    lines: [
      { label: 'o', from: { x: 173.9, y: 220.7 }, to: { x: 573.4, y: 130.7 } },
      { label: 'p', from: { x: 91.9, y: 248.1 }, to: { x: 600.9, y: 248.1 } },
    ],
    frame: { width: 820.6, height: 286.9 },
  },
  {
    id: 'e8ba1297-750a-4136-b690-5407da0d82c3',
    title: '2017 · 1. řádný termín · 10. Pravoúhlý lichoběžník',
    source: 'JPZ 2017, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *D*.\n\n'
      + 'Body *A*, *B* a *D* jsou vrcholy pravoúhlého lichoběžníku *ABCD*.\n'
      + 'Sestrojte chybějící vrchol *C* lichoběžníku *ABCD* a lichoběžník narýsujte.',
    points: [
      { id: 'a', x: 120.8, y: 376.0, label: 'A' },
      { id: 'b', x: 618.9, y: 274.0, label: 'B' },
      { id: 'd', x: 257.5, y: 123.9, label: 'D' },
    ],
    lines: [],
    shapes: [
      { kind: 'ray', id: 'ab', from: 'a', through: 'b' },
      { kind: 'ray', id: 'ad', from: 'a', through: 'd' },
    ],
    frame: { width: 820.6, height: 421.0 },
  },
  {
    id: '7b69ed0e-c269-4c28-9f1b-874ff1bd7ed7',
    title: '2017 · 2. řádný termín · 9. Středová souměrnost trojúhelníku',
    source: 'JPZ 2017, 2. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží trojúhelník *RST*.\n\n'
      + 'Sestrojte obraz *R₁S₁T₁* trojúhelníku *RST* ve středové souměrnosti se středem *S*. '
      + 'Všechny vrcholy trojúhelníku *R₁S₁T₁* označte.',
    points: [
      { id: 'r', x: 83.3, y: 203.0, label: 'R' },
      { id: 's', x: 385.3, y: 203.0, label: 'S' },
      { id: 't', x: 527.2, y: 61.2, label: 'T' },
    ],
    lines: [],
    shapes: [
      { kind: 'segment', id: 'rs', from: 'r', to: 's' },
      { kind: 'segment', id: 'st', from: 's', to: 't' },
      { kind: 'segment', id: 'tr', from: 't', to: 'r' },
    ],
    frame: { width: 820.6, height: 457.4 },
  },
  {
    id: '9fe9e420-8e4b-48b2-8ed0-a515f80db1b2',
    title: '2017 · 2. řádný termín · 10. Rovnoramenný lichoběžník v kružnici',
    source: 'JPZ 2017, 2. řádný termín, úloha 10',
    instructionMarkup:
      'Kružnici *k* se středem *S* protíná přímka ve dvou bodech *C* a *D*.\n\n'
      + 'Body *C*, *D* jsou vrcholy rovnoramenného lichoběžníku *ABCD*.\n'
      + 'Všechny čtyři vrcholy tohoto lichoběžníku leží na kružnici *k*.\n'
      + 'Vzdálenost chybějících vrcholů *A*, *B* od přímky *CD* je rovna poloměru *r* = |*SC*| kružnice *k*.\n\n'
      + '10.1 Sestrojte vrcholy *A*, *B* lichoběžníku *ABCD* a lichoběžník narýsujte.\n\n'
      + '10.2 Sestrojte osu souměrnosti lichoběžníku *ABCD* (pokud existuje) a označte ji *o*.\n\n'
      + '10.3 Sestrojte výšku lichoběžníku *ABCD* z vrcholu *D* a označte ji *v*.',
    points: [
      { id: 's', x: 454.1, y: 333.2, label: 'S' },
      { id: 'c', x: 454.1, y: 122.7, label: 'C' },
      { id: 'd', x: 269.9, y: 231.1, label: 'D' },
    ],
    lines: [],
    shapes: [
      { kind: 'circle', id: 'k', center: 's', radius: 210.6, label: 'k' },
      { kind: 'line', id: 'cd', through: ['c', 'd'] },
      { kind: 'segment', id: 'sc', from: 's', to: 'c' },
    ],
    frame: { width: 820.6, height: 575.3 },
  },
  {
    id: 'a1a8f6ef-551a-4893-ae35-cdbfefe22230',
    title: '2016 · 1. řádný termín · 9. Body na přímce: úhel 60° a stejná vzdálenost',
    source: 'JPZ 2016, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží přímka *p* a mimo ni dva různé body *M*, *L*.\n\n'
      + 'Na přímce *p* sestrojte všechny takové body\n'
      + '9.1 *K*, aby velikost úhlu *KLM* byla 60°;\n'
      + '9.2 *N*, aby vzdálenost bodů *M*, *N* byla stejná jako vzdálenost bodů *M*, *L*.',
    points: [
      { id: 'l', x: 562.2, y: 73.5, label: 'L' },
      { id: 'm', x: 355.6, y: 193.7, label: 'M' },
    ],
    lines: [{ label: 'p', from: { x: 75.7, y: 77.1 }, to: { x: 683.1, y: 234.3 } }],
    frame: { width: 820.6, height: 283.3 },
  },
  {
    id: '4aa04c20-bb1e-481f-aeda-d0121ec69768',
    title: '2016 · 1. řádný termín · 10. Čtverec s úhlopříčkou BD',
    source: 'JPZ 2016, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží přímka *BD*.\n\n'
      + 'Sestrojte chybějící vrcholy *A*, *C* čtverce *ABCD*. Čtverec narýsujte.',
    points: [
      { id: 'b', x: 497.0, y: 381.4, label: 'B' },
      { id: 'd', x: 290.6, y: 86.1, label: 'D' },
    ],
    lines: [],
    shapes: [{ kind: 'line', id: 'bd', through: ['b', 'd'] }],
    frame: { width: 820.6, height: 448.5 },
  },
  {
    id: '1c15fd5e-c352-4a78-b019-1f00dbfd37e7',
    title: '2015 · 1. řádný termín · 9. Obraz bodu a přímky v osové souměrnosti',
    source: 'JPZ 2015, 1. řádný termín, úloha 9',
    instructionMarkup:
      'V rovině leží různoběžky *o*, *p* a bod *A* na přímce *p*.\n\n'
      + '9.1 Sestrojte bod *B*, který je obrazem bodu *A* v osové souměrnosti s osou *o*.\n\n'
      + '9.2 Sestrojte přímku *q*, která je obrazem přímky *p* v osové souměrnosti s osou *o*.',
    points: [{ id: 'a', x: 492.3, y: 266.5, label: 'A' }],
    lines: [
      { label: 'o', from: { x: 210.8, y: 63.9 }, to: { x: 683.0, y: 205.5 } },
      { label: 'p', from: { x: 110.3, y: 34.8 }, to: { x: 528.8, y: 288.5 } },
    ],
    frame: { width: 820.6, height: 320.8 },
  },
  {
    id: 'b074f32f-f15e-47ca-b924-af04f17ef939',
    title: '2015 · 1. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na polopřímce',
    source: 'JPZ 2015, 1. řádný termín, úloha 10',
    instructionMarkup:
      'V rovině leží body *A*, *B* a *Y*.\n\n'
      + '10.1 Na polopřímce *BY* sestrojte bod *C* tak, aby body *A*, *B*, *C* tvořily vrcholy '
      + 'rovnoramenného trojúhelníku se základnou *AB*, a trojúhelník *ABC* narýsujte.\n\n'
      + '10.2 Sestrojte osu souměrnosti *o* trojúhelníku *ABC*.',
    points: [
      { id: 'a', x: 432.9, y: 240.2, label: 'A' },
      { id: 'b', x: 766.7, y: 45.2, label: 'B' },
      { id: 'y', x: 390.6, y: 81.6, label: 'Y' },
    ],
    lines: [],
    frame: { width: 820.6, height: 288.9 },
  },
];
