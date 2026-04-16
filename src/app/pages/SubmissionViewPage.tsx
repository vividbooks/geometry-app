import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import type { ViewMode } from '../components/ComponentSvg';
import { ComponentPalette, type Tool } from '../components/ComponentPalette';
import { CircuitCanvas } from '../components/CircuitCanvas';
import { getSupabase } from '@/lib/supabase';
import { CIRCUIT_ASSIGNMENTS_TABLE, CIRCUIT_SUBMISSIONS_TABLE } from '@/lib/circuitTables';
import { decodeCircuit } from '../utils/circuitUrl';
import { parseGeometrySubmission } from '../utils/geometrySubmissionCodec';
import { assignmentInstructionDisplay } from '../utils/instructionSteps';
import { useIsTouch, useToolbarScale } from '../hooks/editorChrome';
import '../../../rysovani/src/index.css';
import type { GeometrySubmissionSnapshot } from '../../../rysovani/src/components/FreeGeometryEditor';

const FreeGeometryEditor = lazy(() =>
  import('../../../rysovani/src/components/FreeGeometryEditor').then(m => ({
    default: m.FreeGeometryEditor,
  })),
);

type SubmissionRow = {
  id: string;
  student_name: string;
  circuit_encoded: string;
  assignment_id: string;
  student_note?: string;
};

type AssignmentRow = {
  title?: string;
  instruction_text: string;
  instruction_image: string | null;
  instruction_steps?: unknown;
};

export default function SubmissionViewPage() {
  const { submissionId } = useParams<{ submissionId: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('realistic');
  const [zoom, setZoom] = useState(2);
  const [tool, setTool] = useState<Tool>('select');
  const isTouch = useIsTouch();
  const toolbarScale = useToolbarScale();

  const setViewTool = useCallback((t: Tool) => {
    if (t === 'select' || t === 'pan') setTool(t);
  }, []);

  const [loadState, setLoadState] = useState<'loading' | 'error' | 'ready'>('loading');
  const [submission, setSubmission] = useState<SubmissionRow | null>(null);
  const [assignment, setAssignment] = useState<AssignmentRow | null>(null);

  useEffect(() => {
    if (!submissionId) {
      setLoadState('error');
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setLoadState('error');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { data: sub, error: e1 } = await supabase
          .from(CIRCUIT_SUBMISSIONS_TABLE)
          .select('*')
          .eq('id', submissionId)
          .maybeSingle();
        if (cancelled) return;
        if (e1 || !sub) {
          setLoadState('error');
          return;
        }
        setSubmission(sub as SubmissionRow);

        const { data: asg } = await supabase
          .from(CIRCUIT_ASSIGNMENTS_TABLE)
          .select('title, instruction_text, instruction_image, instruction_steps')
          .eq('id', (sub as SubmissionRow).assignment_id)
          .maybeSingle();

        if (!cancelled && asg) setAssignment(asg as AssignmentRow);
        setLoadState('ready');
      } catch (e) {
        if (!cancelled) {
          console.error('Načtení odevzdání (Supabase):', e);
          setLoadState('error');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [submissionId]);

  const submissionKind = useMemo<'geometry' | 'circuit' | null>(() => {
    if (!submission?.circuit_encoded) return null;
    if (parseGeometrySubmission(submission.circuit_encoded)) return 'geometry';
    if (decodeCircuit(submission.circuit_encoded)) return 'circuit';
    return null;
  }, [submission]);

  const circuitInitialState = useMemo(() => {
    if (!submission?.circuit_encoded || submissionKind !== 'circuit') return undefined;
    return decodeCircuit(submission.circuit_encoded);
  }, [submission, submissionKind]);

  const geometrySnapshot = useMemo(() => {
    if (!submission?.circuit_encoded || submissionKind !== 'geometry') return null;
    return parseGeometrySubmission(submission.circuit_encoded);
  }, [submission, submissionKind]);

  if (!submissionId) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-600">Neplatný odkaz.</div>;
  }

  if (loadState === 'loading') {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500">Načítám odevzdání…</div>;
  }

  if (loadState === 'error' || !submission || !submissionKind) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-2 p-6 text-center text-zinc-600">
        <p>Odevzdání se nepodařilo načíst.</p>
      </div>
    );
  }

  const instructionView = assignment ? assignmentInstructionDisplay(assignment) : null;

  const mainCanvas =
    submissionKind === 'geometry' && geometrySnapshot ? (
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-white text-zinc-500">
            Načítám náhled rýsování…
          </div>
        }
      >
        <FreeGeometryEditor
          onBack={() => {}}
          darkMode={false}
          onDarkModeChange={() => {}}
          deviceType="computer"
          embedInAssignment
          readOnlyCanvas
          initialCanvasSnapshot={geometrySnapshot as GeometrySubmissionSnapshot}
        />
      </Suspense>
    ) : (
      <>
        <CircuitCanvas
          tool={tool}
          viewMode={viewMode}
          clearTrigger={0}
          zoom={zoom}
          setTool={setViewTool}
          setZoom={setZoom}
          isViewOnly
          initialState={circuitInitialState!}
          isTouch={isTouch}
        />

        <div
          className="absolute left-3 z-20"
          style={{
            top: '50%',
            overflow: 'visible',
            transformOrigin: 'left center',
            transform: `translateY(-50%) scale(${toolbarScale})`,
          }}
        >
          <ComponentPalette
            navigationOnly
            tool={tool}
            onToolChange={setTool}
            onClearAll={() => {}}
          />
        </div>

        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <TopBar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            zoom={zoom}
            onZoomChange={setZoom}
            isViewOnly
          />
        </div>
      </>
    );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <div className="flex-1 relative min-w-0 overflow-hidden">{mainCanvas}</div>

      <aside className="flex w-[min(100vw,288px)] min-w-0 shrink-0 flex-col border-l border-zinc-200 bg-zinc-50/90">
        <div className="shrink-0 border-b border-zinc-200/80 px-4 py-3">
          <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Odevzdání</div>
          <p className="mt-2 text-sm text-zinc-700">
            <span className="font-medium text-zinc-900">Student:</span> {submission.student_name}
          </p>
          {submission.student_note?.trim() ? (
            <div className="mt-3">
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Poznámka studenta</div>
              <p className="mt-1 text-sm text-zinc-700 whitespace-pre-wrap">{submission.student_note.trim()}</p>
            </div>
          ) : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {assignment && instructionView && (
            <>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wide">Zadání</div>
              {assignment.title?.trim() ? (
                <div className="text-base font-semibold text-zinc-900">{assignment.title.trim()}</div>
              ) : null}
              {instructionView.kind === 'steps' ? (
                <ol className="m-0 list-decimal space-y-3 pl-4 text-sm leading-relaxed text-zinc-800 marker:text-zinc-500">
                  {instructionView.steps.map((s, i) => (
                    <li key={i} className="space-y-2 pl-0.5">
                      <div className="whitespace-pre-wrap">{s.text}</div>
                      {s.image ? (
                        <img
                          src={s.image}
                          alt=""
                          className="rounded-lg border border-zinc-200 w-full object-contain max-h-[40vh]"
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <>
                  <p className="text-sm text-zinc-800 whitespace-pre-wrap">{instructionView.text || '—'}</p>
                  {assignment.instruction_image ? (
                    <img
                      src={assignment.instruction_image}
                      alt="Zadání"
                      className="rounded-lg border border-zinc-200 w-full object-contain max-h-[40vh]"
                    />
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
