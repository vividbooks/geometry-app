/**
 * Kontrola řešení u konstrukčních úkolů 9. ročníku (knihovna úkolů).
 *
 * Id bodů odkazují do výsledného snapshotu vzorového řešení v `assignmentSolutions.ts`
 * (`sol-…`). Dané body zadání jsou `given` (`sought: false`) a kontrola bere jejich polohu
 * z řešení — ta sedí na bodech zadání v databázi.
 */
import type { ConstructionCheck, ConstructionCheckPoint } from './assignmentSolutions';

const given = (id: string, name: string): ConstructionCheckPoint => ({ id, name, sought: false });
const sought = (id: string, name: string): ConstructionCheckPoint => ({ id, name, sought: true });

export const GRADE9_CHECKS: Record<string, ConstructionCheck> = {
  // Rovnoběžník s delší úhlopříčkou: dvě polohy B na p, B a D lze zaměnit.
  '4a1829f5-69f3-4737-b8e6-8b898b176901': {
    figures: [
      {
        name: 'rovnoběžník AB₁CD₁',
        vertices: [given('sol-a', 'A'), sought('sol-b1', 'B₁'), given('sol-c', 'C'), sought('sol-d1', 'D₁')],
      },
      {
        name: 'rovnoběžník AB₂CD₂',
        vertices: [given('sol-a', 'A'), sought('sol-b2', 'B₂'), given('sol-c', 'C'), sought('sol-d2', 'D₂')],
      },
    ],
    interchangeable: [
      ['sol-b1', 'sol-d1'],
      ['sol-b2', 'sol-d2'],
    ],
  },
  // Čtverec vepsaný kružnici: 1. kružnice k se středem S, 2. čtverec CDEF.
  '09900fbe-d904-45f1-9450-5f20eaaba23b': {
    figures: [
      { name: 'střed S', vertices: [sought('sol-s', 'S')] },
      {
        name: 'čtverec CDEF',
        vertices: [given('sol-c', 'C'), sought('sol-d', 'D'), sought('sol-e', 'E'), sought('sol-f', 'F')],
      },
    ],
    circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-c' }],
    interchangeable: [['sol-d', 'sol-f']],
  },
  // Rovnoramenný trojúhelník s výškou BM.
  '03b73633-c003-46dd-a9a3-1cd8253a2fea': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [sought('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
    ],
  },
  // Obdélník se středem strany: dvě řešení.
  '29b49708-92f0-4ef6-a947-8f0bdef02451': {
    figures: [
      {
        name: 'obdélník AB₁C₁D₁',
        vertices: [given('sol-a', 'A'), sought('sol-b1', 'B₁'), sought('sol-c1', 'C₁'), sought('sol-d1', 'D₁')],
      },
      {
        name: 'obdélník AB₂C₂D₂',
        vertices: [given('sol-a', 'A'), sought('sol-b2', 'B₂'), sought('sol-c2', 'C₂'), sought('sol-d2', 'D₂')],
      },
    ],
  },
  // Trojúhelník z těžnice a výšky: trojúhelník, těžnice CN (N nemusí být pojmenovaný) a těžiště T.
  '401b7ed6-fd9b-42ab-8ea0-c147657c5ab6': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
      { name: 'těžnice tc', vertices: [sought('sol-c', 'C'), given('sol-n', 'N')] },
      { name: 'těžiště T', vertices: [sought('sol-t', 'T')] },
    ],
  },
  // Rovnoramenný trojúhelník se středem ramene: záměnou A ↔ B vzniknou další dvě řešení.
  '519619a4-1076-4da8-b81a-bf1024d9b3a8': {
    figures: [
      { name: 'trojúhelník A₁B₁C', vertices: [sought('sol-af', 'A₁'), sought('sol-b1', 'B₁'), given('sol-c', 'C')] },
      { name: 'trojúhelník A₁B₂C', vertices: [sought('sol-af', 'A₁'), sought('sol-b2', 'B₂'), given('sol-c', 'C')] },
    ],
    labelAlternatives: { 'sol-af': ['B'], 'sol-b1': ['A'], 'sol-b2': ['A'] },
  },
  // Čtverec se stranou na přímce: opačný oběh (B ↔ C, A ↔ D) je tentýž čtverec.
  '3f73cd7a-f6d9-46ef-a2f2-9f34d1479bbe': {
    figures: [
      {
        name: 'čtverec ABCD',
        vertices: [sought('sol-a', 'A'), sought('sol-b', 'B'), sought('sol-c', 'C'), sought('sol-d', 'D')],
      },
    ],
    labelAlternatives: { 'sol-a': ['D'], 'sol-b': ['C'], 'sol-c': ['B'], 'sol-d': ['A'] },
  },
  // Lichoběžník s poloviční základnou.
  '834c4b76-6217-4564-83f5-503900b0c711': {
    figures: [
      {
        name: 'lichoběžník ABCD',
        vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C'), sought('sol-d', 'D')],
      },
    ],
  },
  // Kosočtverec s úhlopříčkou AC, B na p.
  '605d7ecd-faf2-474d-a304-3ab328ae5d0e': {
    figures: [
      {
        name: 'kosočtverec ABCD',
        vertices: [given('sol-a', 'A'), sought('sol-b', 'B'), given('sol-c', 'C'), sought('sol-d', 'D')],
      },
    ],
  },
  // Kosočtverec se stranou AB, D na p: dvě řešení.
  'c0376830-b727-477e-9837-48f9f47552b4': {
    figures: [
      {
        name: 'kosočtverec ABC₁D₁',
        vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c1', 'C₁'), sought('sol-d1', 'D₁')],
      },
      {
        name: 'kosočtverec ABC₂D₂',
        vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c2', 'C₂'), sought('sol-d2', 'D₂')],
      },
    ],
  },
  // Kružnice mezi rovnoběžkami: dva středy a dvě kružnice.
  '46725d97-9b34-4003-ae15-c020b22a2704': {
    figures: [
      { name: 'střed S₁', vertices: [sought('sol-s1', 'S₁')] },
      { name: 'střed S₂', vertices: [sought('sol-s2', 'S₂')] },
    ],
    circles: [
      { name: 'k₁', centerId: 'sol-s1', rimId: 'sol-rim1' },
      { name: 'k₂', centerId: 'sol-s2', rimId: 'sol-rim2' },
    ],
  },
  // Těžiště: vrchol C.
  '61f0d7a6-9483-44de-83a8-a1b160fef1f2': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
    ],
  },
  // Tečny ke kružnici: dvě tečny z P s body dotyku T₁, T₂.
  '656c28a0-9549-4554-8615-d5d3ad388ce1': {
    figures: [
      { name: 'tečna PT₁', vertices: [given('sol-p', 'P'), sought('sol-t1', 'T₁')] },
      { name: 'tečna PT₂', vertices: [given('sol-p', 'P'), sought('sol-t2', 'T₂')] },
    ],
  },
  // Tětiva dané délky: dvě tětivy, krajní body X, Y lze prohodit.
  '3e77b1d1-4a07-4b1a-b49f-a8cd108a8de5': {
    figures: [
      { name: 'tětiva X₁Y₁', vertices: [sought('sol-x1', 'X₁'), sought('sol-y1', 'Y₁')] },
      { name: 'tětiva X₂Y₂', vertices: [sought('sol-x2', 'X₂'), sought('sol-y2', 'Y₂')] },
    ],
    interchangeable: [
      ['sol-x1', 'sol-y1'],
      ['sol-x2', 'sol-y2'],
    ],
  },
  // Kružnice daná dvěma body, střed na p.
  'fda41fe6-dfad-4881-be72-771d509ba49f': {
    figures: [{ name: 'střed S', vertices: [sought('sol-s', 'S')] }],
    circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-a' }],
  },
  // Těžnice a rovnoběžka: vrchol C.
  'c67ac52d-eaea-46b4-8fda-d4dff5d29488': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
    ],
  },
  // Šestiúhelník z úhlopříčky AD: opačný oběh prohodí B ↔ F a C ↔ E.
  'cb596b9e-c109-48f9-874a-90abe34ba852': {
    figures: [
      {
        name: 'šestiúhelník ABCDEF',
        vertices: [
          given('sol-a', 'A'),
          sought('sol-b', 'B'),
          sought('sol-c', 'C'),
          given('sol-d', 'D'),
          sought('sol-e', 'E'),
          sought('sol-f', 'F'),
        ],
      },
    ],
    interchangeable: [
      ['sol-b', 'sol-f'],
      ['sol-c', 'sol-e'],
    ],
  },
  // Kružnice tečná k přímce p v bodě A a procházející B.
  'a6d9de88-c424-46fa-8af1-814c07a4466e': {
    figures: [{ name: 'střed S', vertices: [sought('sol-s', 'S')] }],
    circles: [{ name: 'k', centerId: 'sol-s', rimId: 'sol-a' }],
  },
  // Trojúhelník z průsečíku výšek.
  '66fa2048-f25d-43ce-97ca-491807df805b': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
    ],
  },
  // Trojúhelník z osy úhlu.
  '0daeda38-6964-4e93-a3db-745003b63e53': {
    figures: [
      { name: 'trojúhelník ABC', vertices: [given('sol-a', 'A'), given('sol-b', 'B'), sought('sol-c', 'C')] },
    ],
  },
};
