/**
 * Opravy snapshotu sdíleného plátna pro konkrétní zadání (např. překlep štítku v DB).
 * Používá se tam, kde klient nemá UPDATE na geometry_circuit_assignments.
 */

const LINE_LABEL_T_TO_O: Readonly<{ assignmentId: string; shapeId: string }> = {
  assignmentId: '9415e7a8-5cdb-499c-a1a2-b4873816ec57',
  shapeId: '99667ea0-e2de-47b0-9fb6-99067b5ce164',
};

export function normalizeInitialCanvasSnapshot(assignmentId: string, snapshot: unknown): unknown {
  if (
    assignmentId !== LINE_LABEL_T_TO_O.assignmentId ||
    !snapshot ||
    typeof snapshot !== 'object'
  ) {
    return snapshot;
  }
  const o = snapshot as { shapes?: unknown[] };
  if (!Array.isArray(o.shapes)) return snapshot;
  return {
    ...o,
    shapes: o.shapes.map(shape => {
      if (!shape || typeof shape !== 'object') return shape;
      const s = shape as { id?: string; type?: string; label?: string };
      if (
        s.id === LINE_LABEL_T_TO_O.shapeId &&
        s.type === 'line' &&
        s.label === 't'
      ) {
        return { ...s, label: 'o' };
      }
      return shape;
    }),
  };
}
