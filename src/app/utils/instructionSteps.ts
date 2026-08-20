import type { GeometrySubmissionSnapshot } from '../../../rysovani/src/components/FreeGeometryEditor';

/** Jednotlivý krok zadání v DB (`geometry_circuit_assignments.instruction_steps`). */
export type InstructionStep = {
  text: string;
  image?: string | null;
  canvas_snapshot?: unknown;
};

export type InstructionStepContent = {
  text: string;
  image: string | null;
  canvasSnapshot: GeometrySubmissionSnapshot | null;
};

function parseStepImage(raw: unknown): string | null {
  if (raw == null) return null;
  if (typeof raw !== 'string') return null;
  const s = raw.trim();
  return s.length > 0 ? s : null;
}

export function parseCanvasSnapshot(raw: unknown): GeometrySubmissionSnapshot | null {
  if (!raw || typeof raw !== 'object') return null;
  const snap = raw as {
    points?: unknown;
    shapes?: unknown;
    freehandPaths?: unknown;
  };
  if (!Array.isArray(snap.points) || !Array.isArray(snap.shapes)) return null;
  return {
    points: snap.points as GeometrySubmissionSnapshot['points'],
    shapes: snap.shapes as GeometrySubmissionSnapshot['shapes'],
    freehandPaths: Array.isArray(snap.freehandPaths)
      ? (snap.freehandPaths as GeometrySubmissionSnapshot['freehandPaths'])
      : [],
  };
}

export function stepHasContent(step: Pick<InstructionStepContent, 'text' | 'image' | 'canvasSnapshot'>): boolean {
  return Boolean(step.text.trim()) || Boolean(step.image) || Boolean(step.canvasSnapshot);
}

export function instructionStepFallbackLabel(step: InstructionStepContent, index: number): string {
  const text = step.text.trim();
  if (text) return text;
  return `Krok ${index + 1}`;
}

export function normalizeInstructionSteps(raw: unknown): InstructionStepContent[] {
  if (raw == null) return [];
  if (!Array.isArray(raw)) return [];
  const out: InstructionStepContent[] = [];
  for (const item of raw) {
    if (item && typeof item === 'object') {
      const rawText = 'text' in item ? (item as { text: unknown }).text : '';
      const text = typeof rawText === 'string' ? rawText.trim() : '';
      const image = parseStepImage(
        'image' in item ? (item as { image: unknown }).image : null,
      );
      const canvasSnapshot = parseCanvasSnapshot(
        'canvas_snapshot' in item ? (item as { canvas_snapshot: unknown }).canvas_snapshot : null,
      );
      if (!text && !image && !canvasSnapshot) continue;
      out.push({ text, image, canvasSnapshot });
    } else if (typeof item === 'string' && item.trim()) {
      out.push({ text: item.trim(), image: null, canvasSnapshot: null });
    }
  }
  return out;
}

export function instructionStepsHaveCanvasSnapshot(steps: InstructionStepContent[]): boolean {
  return steps.some(s => s.canvasSnapshot != null);
}

/** Úkoly, kde má být každý krok na novém plátně i bez sloupce v DB. */
const FORCE_NEW_CANVAS_PER_STEP_IDS = new Set([
  '7c3e9b12-4f8a-4d6e-9c21-8b5a0e17d4f3',
  'e5f1a8c3-2d47-4b9e-91c0-8a3f6d2e5b17',
]);

export function assignmentUsesNewCanvasPerStep(row: {
  id?: string;
  new_canvas_per_step?: unknown;
  instruction_steps?: unknown;
}): boolean {
  if (row.id && FORCE_NEW_CANVAS_PER_STEP_IDS.has(row.id)) return true;
  if (row.new_canvas_per_step === true) return true;
  return instructionStepsHaveCanvasSnapshot(normalizeInstructionSteps(row.instruction_steps));
}

/** Sloučí texty kroků do jednoho pole pro `instruction_text` (zpětná kompatibilita). */
export function instructionStepsToFallbackText(stepTexts: string[]): string {
  if (stepTexts.length === 0) return '';
  if (stepTexts.length === 1) return stepTexts[0]!;
  return stepTexts.map((t, i) => `${i + 1}. ${t}`).join('\n\n');
}

export function assignmentInstructionDisplay(row: {
  id?: string;
  instruction_steps?: unknown;
  instruction_text: string;
}):
  | { kind: 'steps'; steps: InstructionStepContent[] }
  | { kind: 'text'; text: string } {
  const steps = normalizeInstructionSteps(row.instruction_steps);
  if (steps.length > 0) return { kind: 'steps', steps };
  return { kind: 'text', text: row.instruction_text || '' };
}

/** První obrázek z kroků — vhodné pro `instruction_image` u nových zadání. */
export function firstStepImage(steps: InstructionStepContent[]): string | null {
  for (const s of steps) {
    if (s.image) return s.image;
  }
  return null;
}

/** Serializace kroku pro uložení do DB. */
export function serializeInstructionStep(step: InstructionStepContent): InstructionStep {
  const out: InstructionStep = { text: step.text };
  if (step.image) out.image = step.image;
  if (step.canvasSnapshot) out.canvas_snapshot = step.canvasSnapshot;
  return out;
}
