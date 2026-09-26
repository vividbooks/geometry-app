import { Fragment } from 'react';
import { instructionMarkupSegments } from '../../utils/instructionMarkup';

/**
 * Text zadání úkolu. U úloh CERMAT a úkolů 9. ročníku sází názvy bodů, přímek a útvarů kurzívou
 * (podle značek v `cermatAssignments.ts`); ostatní zadání zobrazí beze změny.
 */
export function InstructionText({ assignmentId, text }: { assignmentId: string | undefined; text: string }) {
  const segments = instructionMarkupSegments(assignmentId, text);
  if (!segments) return <>{text}</>;
  return (
    <>
      {segments.map((part, i) =>
        part.sub ? (
          <sub key={i} className="italic">
            {part.text}
          </sub>
        ) : part.italic ? (
          <i key={i}>{part.text}</i>
        ) : (
          <Fragment key={i}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}
