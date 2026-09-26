/**
 * Zadání úkolů 9. ročníku se značkami kurzívy (názvy bodů, přímek a útvarů mezi hvězdičkami,
 * dolní index `_{c}`). Text v databázi je stejný bez značek; když se v databázi změní, zobrazí
 * se zadání bez kurzívy (viz `instructionMarkupSegments`).
 */
import { cermatInstructionSegments, cermatMarkupSegments, stripCermatMarkup, type CermatTextSegment } from './cermatAssignments';

const INSTRUCTION_MARKUP: Record<string, string[]> = {
  '3f73cd7a-f6d9-46ef-a2f2-9f34d1479bbe': [
    "Bod *O* je středem čtverce *ABCD*. Strana *BC* leží na přímce *p*.\n\nSestrojte všechny vrcholy čtverce *ABCD*, označte je a čtverec narýsujte.",
  ],
  '09900fbe-d904-45f1-9450-5f20eaaba23b': [
    "Všechny vrcholy trojúhelníku *ABC* leží na kružnici *k*.\n\n1. Sestrojte kružnici *k* a označte její střed *S*.\n2. Bod *C* je vrcholem čtverce *CDEF*, jehož zbývající vrcholy *D*, *E*, *F* leží také na kružnici *k*. Sestrojte čtverec *CDEF* a označte jeho vrcholy.",
  ],
  'c0376830-b727-477e-9837-48f9f47552b4': [
    "Úsečka *AB* je stranou kosočtverce *ABCD*. Vrchol *D* leží na přímce *p*.\n\nSestrojte kosočtverec *ABCD*, označte zbývající vrcholy a kosočtverec narýsujte.\nNajděte všechna řešení.",
  ],
  '605d7ecd-faf2-474d-a304-3ab328ae5d0e': [
    "Úsečka *AC* je úhlopříčkou kosočtverce *ABCD*. Vrchol *B* leží na přímce *p*.\n\nSestrojte kosočtverec *ABCD*, označte zbývající vrcholy a kosočtverec narýsujte.",
  ],
  'fda41fe6-dfad-4881-be72-771d509ba49f': [
    "Kružnice *k* prochází body *A* a *B*. Střed *S* kružnice *k* leží na přímce *p*.\n\nSestrojte střed *S*, označte jej a kružnici *k* narýsujte.",
  ],
  '46725d97-9b34-4003-ae15-c020b22a2704': [
    "Přímky *p* a *q* jsou rovnoběžné. Kružnice *k* se dotýká obou přímek a prochází bodem *M*.\n\nSestrojte střed *S* kružnice *k*, označte jej a kružnici narýsujte.\nNajděte všechna řešení.",
  ],
  'a6d9de88-c424-46fa-8af1-814c07a4466e': [
    "Kružnice *k* se dotýká přímky *p* v bodě *A* a prochází bodem *B*.\n\nSestrojte střed *S* kružnice *k*, označte jej a kružnici narýsujte.",
  ],
  '834c4b76-6217-4564-83f5-503900b0c711': [
    "Body *A* a *B* jsou vrcholy rovnoramenného lichoběžníku *ABCD* se základnami *AB* a *CD*, pro které platí |*CD*| = ½ · |*AB*|. Vrcholy *C* a *D* leží na přímce *p*.\n\nSestrojte vrcholy *C* a *D*, označte je a lichoběžník *ABCD* narýsujte.",
  ],
  '29b49708-92f0-4ef6-a947-8f0bdef02451': [
    "Bod *A* je vrcholem obdélníku *ABCD*, jehož vrchol *D* leží na přímce *p*. Bod *S* je středem strany *CD*.\n\nSestrojte vrcholy *B*, *C*, *D*, označte je a obdélník narýsujte.\nNajděte všechna řešení.",
  ],
  '4a1829f5-69f3-4737-b8e6-8b898b176901': [
    "Body *A* a *C* jsou vrcholy rovnoběžníku *ABCD*, jehož úhlopříčka *BD* je dvakrát delší než úhlopříčka *AC*. Jeden ze zbývajících vrcholů *B*, *D* leží na přímce *p*.\n\nSestrojte vrcholy *B* a *D*, označte je a rovnoběžník *ABCD* narýsujte.\nNajděte všechna řešení.",
  ],
  '519619a4-1076-4da8-b81a-bf1024d9b3a8': [
    "Bod *C* je vrcholem rovnoramenného trojúhelníku *ABC* se základnou *AB*. Bod *S* je středem jednoho z jeho ramen. Jeden z vrcholů *A*, *B* leží na přímce *q*.\n\nSestrojte vrcholy *A* a *B*, označte je a trojúhelník *ABC* narýsujte.\nNajděte všechna řešení.",
  ],
  '03b73633-c003-46dd-a9a3-1cd8253a2fea': [
    "Bod *B* je vrcholem rovnoramenného trojúhelníku *ABC* se základnou *AB*. Úsečka *BM* je jednou z výšek tohoto trojúhelníku a bod *M* leží na straně *AC*. Vrchol *A* leží na přímce *q*.\n\nSestrojte vrcholy *A* a *C*, označte je a trojúhelník *ABC* narýsujte.",
  ],
  'cb596b9e-c109-48f9-874a-90abe34ba852': [
    "Body *A* a *D* jsou protilehlé vrcholy pravidelného šestiúhelníku *ABCDEF*.\n\nSestrojte zbývající vrcholy *B*, *C*, *E*, *F*, označte je a šestiúhelník narýsujte.",
  ],
  '656c28a0-9549-4554-8615-d5d3ad388ce1': [
    "Bod *S* je středem kružnice *k*. Z bodu *P* veďte tečny ke kružnici *k*.\n\nSestrojte obě tečny, označte body dotyku a tečny narýsujte.\nNajděte všechna řešení.",
  ],
  '3e77b1d1-4a07-4b1a-b49f-a8cd108a8de5': [
    "Bod *S* je středem kružnice *k*. Tětiva *XY* kružnice *k* je rovnoběžná s přímkou *p* a měří 4 cm.\n\nSestrojte tětivu *XY*, označte její krajní body a tětivu narýsujte.\nNajděte všechna řešení.",
  ],
  '61f0d7a6-9483-44de-83a8-a1b160fef1f2': [
    "Úsečka *AB* je stranou trojúhelníku *ABC*. Bod *T* je těžištěm tohoto trojúhelníku.\n\nSestrojte vrchol *C*, označte jej a trojúhelník *ABC* narýsujte.",
  ],
  'c67ac52d-eaea-46b4-8fda-d4dff5d29488': [
    "Úsečka *AB* je stranou trojúhelníku *ABC*. Bod *M* leží na těžnici z vrcholu *C* na stranu *AB*. Vrchol *C* leží na přímce *q*, která je rovnoběžná s *AB*.\n\nSestrojte vrchol *C*, označte jej a trojúhelník *ABC* narýsujte.",
  ],
  '401b7ed6-fd9b-42ab-8ea0-c147657c5ab6': [
    "Úsečka *AB* je stranou *c* trojúhelníku *ABC*. Bod *M* leží uvnitř tohoto trojúhelníku na těžnici *t*_{c}. Výška *v*_{c} měří 4 cm.\n\n1. Sestrojte těžnici *t*_{c}, chybějící vrchol *C* a trojúhelník *ABC* narýsujte.\n2. Sestrojte těžiště trojúhelníku *ABC* a označte jej písmenem *T*.",
  ],
  '66fa2048-f25d-43ce-97ca-491807df805b': [
    "Úsečka *AB* je stranou trojúhelníku *ABC*. Bod *V* je průsečíkem výšek tohoto trojúhelníku.\n\nSestrojte vrchol *C*, označte jej a trojúhelník *ABC* narýsujte.",
  ],
  '0daeda38-6964-4e93-a3db-745003b63e53': [
    "Úsečka *AB* je stranou trojúhelníku *ABC*. Přímka *o* je osou vnitřního úhlu při vrcholu *A* a vrchol *C* leží na přímce *p*.\n\nSestrojte vrchol *C*, označte jej a trojúhelník *ABC* narýsujte.",
  ],
};

/**
 * Části textu zadání s kurzívou pro úkol `assignmentId` (úlohy CERMAT i 9. ročník).
 * `null`, když úkol značky nemá nebo text neodpovídá (zobrazí se beze změny).
 */
export function instructionMarkupSegments(assignmentId: string | undefined, text: string): CermatTextSegment[] | null {
  const cermat = cermatInstructionSegments(assignmentId, text);
  if (cermat) return cermat;
  if (!assignmentId) return null;
  const markup = INSTRUCTION_MARKUP[assignmentId]?.find(m => stripCermatMarkup(m).trim() === text.trim());
  return markup ? cermatMarkupSegments(markup.trim()) : null;
}
