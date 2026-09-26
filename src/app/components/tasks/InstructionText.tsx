import { Fragment } from 'react';
import { cermatInstructionSegments } from '../../utils/cermatAssignments';

/**
 * Text zadání úkolu. U úloh CERMAT sází názvy bodů, přímek a útvarů kurzívou
 * (podle značek v `cermatAssignments.ts`); ostatní zadání zobrazí beze změny.
 */
export function InstructionText({ assignmentId, text }: { assignmentId: string | undefined; text: string }) {
  const segments = cermatInstructionSegments(assignmentId, text);
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
