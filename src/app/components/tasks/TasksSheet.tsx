import { lazy, Suspense, useState, useRef, useEffect, type ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  Check,
  Copy,
  DraftingCompass,
  ExternalLink,
  ImagePlus,
  Pencil,
  Library,
  Link,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { getSupabase, getSupabaseConfigInfo, isSupabaseConfigured } from '@/lib/supabase';
import { CIRCUIT_ASSIGNMENTS_TABLE, CIRCUIT_SUBMISSIONS_TABLE } from '@/lib/circuitTables';
import { assignmentPublicUrl } from '../../utils/appUrl';
import {
  TASK_LIBRARY,
  resolveLibraryImageSrc,
  resolveStudentLink,
  type TaskLibraryEntry,
} from './taskLibrary';
import { parseAssignmentIdFromUrlOrUuid } from '@/app/utils/assignmentUrl';
import {
  firstStepImage,
  instructionStepsToFallbackText,
  normalizeInstructionSteps,
} from '@/app/utils/instructionSteps';
import { toast } from 'sonner';
import '../../../../rysovani/src/index.css';

const MAX_IMAGE_BYTES = 1_500_000;

const FreeGeometryEditor = lazy(() =>
  import('../../../../rysovani/src/components/FreeGeometryEditor').then(m => ({
    default: m.FreeGeometryEditor,
  })),
);

type StepDraft = { text: string; image: string | null };

function formatCzechStepCount(n: number): string {
  if (n <= 0) return 'Bez kroků';
  if (n === 1) return '1 krok';
  if (n >= 2 && n <= 4) return `${n} kroky`;
  return `${n} kroků`;
}

function libraryStepCountFromRow(row: {
  instruction_steps: unknown;
  instruction_text: string | null;
}): number {
  const steps = normalizeInstructionSteps(row.instruction_steps);
  if (steps.length > 0) return steps.length;
  return row.instruction_text?.trim() ? 1 : 0;
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error('Nepodařilo se načíst PNG'));
    r.readAsDataURL(blob);
  });
}

/** HTML canvas (rýsování) → PNG data URL s omezením velikosti, stejný postup jako u SVG obvodu. */
async function canvasToPngDataUrlUnderMax(
  source: HTMLCanvasElement,
  opts: { maxBytes: number; background?: string } = { maxBytes: MAX_IMAGE_BYTES },
): Promise<string> {
  const background = opts.background ?? '#ffffff';
  const w = source.width;
  const h = source.height;
  if (!w || !h) throw new Error('Plátno je prázdné');

  const renderAtScale = async (scale: number): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D není dostupný');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve, reject) => {
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Export do PNG selhal'))), 'image/png');
    });
  };

  const scales = [2, 1.6, 1.3, 1.0, 0.85, 0.7, 0.55, 0.4];
  let lastBlob: Blob | null = null;
  for (const s of scales) {
    const blob = await renderAtScale(s);
    lastBlob = blob;
    if (blob.size <= opts.maxBytes) {
      return await blobToDataUrl(blob);
    }
  }

  throw new Error(
    `Obrázek je moc velký (${Math.round((lastBlob?.size ?? 0) / 1024)} kB). Zkus zjednodušit rýsování nebo zmenšit zoom.`,
  );
}

function formatDbError(e: unknown): string {
  if (!e || typeof e !== "object") return "Neznámá chyba";
  const o = e as {
    message?: string;
    details?: string;
    hint?: string;
    code?: string;
    statusCode?: string;
  };
  const parts = [o.message, o.details, o.hint, o.code ? `(${o.code})` : ""].filter(Boolean);
  return parts.length ? parts.join(" · ") : JSON.stringify(e).slice(0, 200);
}

/** Radix SheetTitle vyžaduje kořen `Sheet` (Dialog); v `embedded` režimu ho nemáme. */
function TasksSheetHeading({
  embedded,
  className,
  children,
}: {
  embedded: boolean;
  className?: string;
  children: ReactNode;
}) {
  return embedded ? (
    <h2 className={className}>{children}</h2>
  ) : (
    <SheetTitle className={className}>{children}</SheetTitle>
  );
}

function TasksSheetSubtext({
  embedded,
  className,
  children,
}: {
  embedded: boolean;
  className?: string;
  children: ReactNode;
}) {
  return embedded ? (
    <p className={className}>{children}</p>
  ) : (
    <SheetDescription className={className}>{children}</SheetDescription>
  );
}

export interface TasksSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * Absolutní URL stránky úkolu pro studenty (`…/ukol/:id`).
   * Výchozí: `assignmentPublicUrl` z této aplikace (Vite `base` + `/ukol/`).
   * V jiném nástroji předej vlastní builder, aby odkazy seděly s hostitelskou aplikací.
   */
  resolveAssignmentPublicUrl?: (assignmentId: string) => string;
  /** Segment v cestě před UUID (výchozí `ukol`). Musí sedět s `resolveAssignmentPublicUrl` a routou hostitele. */
  assignmentUrlPathSegment?: string;
  getSupabase?: () => SupabaseClient | null;
  getSupabaseConfigInfo?: () => {
    url: string | null;
    usingDefaults?: boolean;
    hasEnvUrl?: boolean;
    hasEnvAnonKey?: boolean;
  };
  taskLibrary?: TaskLibraryEntry[];
  sidebarIntro?: ReactNode;
  /** Bez fullscreen sheetu – vloží se do stránky (např. pod bobánky v Landing). */
  embedded?: boolean;
}

type TasksPanel = 'library' | 'create' | 'edit';

export function TasksSheet({
  open,
  onOpenChange,
  resolveAssignmentPublicUrl,
  assignmentUrlPathSegment = 'ukol',
  getSupabase: getSupabaseProp,
  getSupabaseConfigInfo: getSupabaseConfigInfoProp,
  taskLibrary: taskLibraryProp,
  sidebarIntro,
  embedded = false,
}: TasksSheetProps) {
  const assignmentPublicUrlForHost = resolveAssignmentPublicUrl ?? assignmentPublicUrl;
  const resolveClient = () => getSupabaseProp?.() ?? getSupabase();
  const supabaseConfigured = getSupabaseProp ? Boolean(getSupabaseProp()) : isSupabaseConfigured;
  const taskEntries = taskLibraryProp ?? TASK_LIBRARY;
  const readConfigInfo = () => getSupabaseConfigInfoProp?.() ?? getSupabaseConfigInfo();
  const createdLinkInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<StepDraft[]>([{ text: '', image: null }]);
  const [dragActiveStep, setDragActiveStep] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [tasksPanel, setTasksPanel] = useState<TasksPanel>('library');
  const [editAssignmentUrl, setEditAssignmentUrl] = useState('');
  const [geometryDrawOpen, setGeometryDrawOpen] = useState(false);
  const [geometryDrawStepIndex, setGeometryDrawStepIndex] = useState<number | null>(null);
  const [geometryDrawSession, setGeometryDrawSession] = useState(0);
  const [geometryDarkMode, setGeometryDarkMode] = useState(false);
  const geometryCanvasExportRef = useRef<(() => HTMLCanvasElement | null) | null>(null);
  /** title + instruction_image + počet kroků z DB podle UUID zadání (pro knihovnu) */
  const [libraryDbMeta, setLibraryDbMeta] = useState<
    Record<string, { instruction_image: string | null; title: string | null; stepCount: number }>
  >({});
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (open || embedded) {
      setTasksPanel('library');
      setEditAssignmentUrl('');
    }
  }, [open, embedded]);

  useEffect(() => {
    if ((!open && !embedded) || tasksPanel !== 'library' || !supabaseConfigured) return;
    const supabase = resolveClient();
    if (!supabase) return;
    const ids = [
      ...new Set(
        taskEntries.map(e => e.assignmentId?.trim()).filter((v): v is string => Boolean(v)),
      ),
    ];
    if (ids.length === 0) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from(CIRCUIT_ASSIGNMENTS_TABLE)
          .select('id, instruction_image, title, instruction_steps, instruction_text')
          .in('id', ids);
        if (cancelled || error || !data) return;
        const next: Record<
          string,
          { instruction_image: string | null; title: string | null; stepCount: number }
        > = {};
        for (const row of data as {
          id: string;
          instruction_image: string | null;
          title: string | null;
          instruction_steps: unknown;
          instruction_text: string | null;
        }[]) {
          next[row.id] = {
            instruction_image: row.instruction_image,
            title: row.title,
            stepCount: libraryStepCountFromRow({
              instruction_steps: row.instruction_steps,
              instruction_text: row.instruction_text,
            }),
          };
        }
        setLibraryDbMeta(next);
      } catch (e) {
        if (!cancelled) {
          console.error('Načtení knihovny (Supabase):', e);
          toast.error('Nepodařilo se načíst knihovnu úkolů (Supabase).');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, embedded, tasksPanel, supabaseConfigured, taskEntries]);

  useEffect(() => {
    if (!createdUrl) return;
    setLinkCopied(false);
    const t = window.setTimeout(() => createdLinkInputRef.current?.select(), 0);
    return () => window.clearTimeout(t);
  }, [createdUrl]);

  const resetForm = () => {
    setTitle('');
    setSteps([{ text: '', image: null }]);
    setDragActiveStep(null);
  };

  const openGeometryDrawForStep = (index: number) => {
    setGeometryDrawStepIndex(index);
    setGeometryDrawSession(s => s + 1);
    setGeometryDrawOpen(true);
  };

  const insertDrawnGeometryToStep = async () => {
    const idx = geometryDrawStepIndex;
    const canvas = geometryCanvasExportRef.current?.();
    if (idx == null || !canvas) return;
    try {
      const dataUrl = await canvasToPngDataUrlUnderMax(canvas, {
        maxBytes: MAX_IMAGE_BYTES,
        background: '#ffffff',
      });
      setStepImageAt(idx, dataUrl);
      setGeometryDrawOpen(false);
      toast.success('Rýsování vloženo jako obrázek.');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Nepodařilo se vložit rýsování jako obrázek.');
    }
  };

  const loadLibraryAssignmentIntoDraft = async (assignmentId: string) => {
    const supabase = resolveClient();
    if (!supabase) {
      toast.error('Supabase klient není k dispozici.');
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase
        .from(CIRCUIT_ASSIGNMENTS_TABLE)
        .select('id, title, instruction_text, instruction_steps')
        .eq('id', assignmentId)
        .maybeSingle();
      if (error || !data) {
        throw error ?? new Error('Zadání se nepodařilo načíst.');
      }

      const normalized = normalizeInstructionSteps((data as any).instruction_steps);
      const nextSteps: StepDraft[] =
        normalized.length > 0
          ? normalized.map(s => ({ text: s.text, image: s.image }))
          : [
              {
                text: String((data as any).instruction_text ?? '').trim(),
                image: null,
              },
            ];

      setTitle(String((data as any).title ?? '').trim());
      setSteps(nextSteps.length > 0 ? nextSteps : [{ text: '', image: null }]);
      setDragActiveStep(null);
      setCreatedUrl(null);
      setLinkCopied(false);
      setTasksPanel('create');
      setEditAssignmentUrl('');
      toast.success('Zadání načteno – uprav a ulož jako nové.');
    } catch (e) {
      console.error('Načtení zadání pro úpravu (Supabase):', e);
      toast.error('Nepodařilo se načíst zadání pro úpravu.');
    } finally {
      setBusy(false);
    }
  };

  const setStepTextAt = (index: number, value: string) => {
    setSteps(prev => prev.map((s, i) => (i === index ? { ...s, text: value } : s)));
  };

  const setStepImageAt = (index: number, dataUrl: string | null) => {
    setSteps(prev => prev.map((s, i) => (i === index ? { ...s, image: dataUrl } : s)));
  };

  const addStep = () => setSteps(prev => [...prev, { text: '', image: null }]);

  const removeStep = (index: number) => {
    setSteps(prev => (prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)));
    setDragActiveStep(d => {
      if (d == null) return null;
      if (d === index) return null;
      if (d > index) return d - 1;
      return d;
    });
  };

  const onPickStepImage = (index: number, file: File | undefined) => {
    if (!file) {
      setStepImageAt(index, null);
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Vyber obrázek (JPG, PNG, …)');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Obrázek je moc velký (max. cca 1,5 MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setStepImageAt(index, reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLoadAssignmentFromUrl = async () => {
    const id = parseAssignmentIdFromUrlOrUuid(editAssignmentUrl, assignmentUrlPathSegment);
    if (!id) {
      toast.error('Vlož platnou adresu zadání nebo UUID.');
      return;
    }
    await loadLibraryAssignmentIntoDraft(id);
  };

  const copyText = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} zkopírováno`);
    } catch {
      toast.error('Kopírování se nepovedlo');
    }
  };

  const handleCreate = async () => {
    const supabase = resolveClient();
    if (!supabase) {
      toast.error('Supabase klient není k dispozici.');
      return;
    }
    const cleaned = steps
      .map(s => ({ text: s.text.trim(), image: s.image }))
      .filter(s => s.text.length > 0);
    if (cleaned.length === 0) {
      toast.error('Vyplň aspoň jeden krok zadání.');
      return;
    }
    setBusy(true);
    try {
      const cleanedTitle = title.trim();
      const payload = {
        title: cleanedTitle,
        instruction_text: instructionStepsToFallbackText(cleaned.map(s => s.text)),
        instruction_steps: cleaned.map(s => (s.image ? { text: s.text, image: s.image } : { text: s.text })),
        instruction_image: firstStepImage(cleaned) ?? null,
      };
      const { data, error } = await supabase.from(CIRCUIT_ASSIGNMENTS_TABLE).insert(payload).select("id");

      if (error) throw error;
      const row = data?.[0];
      if (!row?.id) {
        throw new Error(
          `Záznam se nevrátil z databáze (zkontroluj RLS: INSERT i SELECT pro ${CIRCUIT_ASSIGNMENTS_TABLE}).`,
        );
      }

      const url = assignmentPublicUrlForHost(row.id);
      setCreatedUrl(url);
      resetForm();
      toast.success('Zadání je v databázi – zkopíruj odkaz pro studenty.');
    } catch (e) {
      console.error("Uložení zadání (Supabase):", e);
      const config = readConfigInfo();
      const isFetchFailure =
        e instanceof TypeError && /fetch/i.test(e.message || '') ||
        (typeof e === 'object' && e !== null && 'message' in e && String((e as any).message).includes('Failed to fetch'));
      const detail = formatDbError(e);
      toast.error(
        isFetchFailure
          ? `Supabase je nedostupný (Failed to fetch). Zkontroluj připojení, DNS / blokátory a konfiguraci. URL: ${config.url ?? '—'}`
          : detail.length > 0
            ? detail
            : `Nepodařilo se uložit zadání. V Supabase spusť supabase/geometry_circuit_schema.sql (${CIRCUIT_ASSIGNMENTS_TABLE}, ${CIRCUIT_SUBMISSIONS_TABLE}).`,
      );
    } finally {
      setBusy(false);
    }
  };

  const tasksRow = (
            <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
              <aside className="flex w-full shrink-0 flex-col gap-8 border-b border-[#4a5163] bg-[#565e75] px-5 py-8 sm:w-[17.5rem] sm:border-b-0 sm:border-r sm:border-[#4a5163]">
                <div className="space-y-3">
                  <p className="text-lg font-medium leading-snug tracking-tight text-white">Úkoly</p>
                  <p className="text-sm leading-relaxed text-[#c8cedf]">
                    {sidebarIntro ??
                      'Hotová zadání, nová úloha nebo úprava podle odkazu — stejně jako v přehledu lekce.'}
                  </p>
                </div>
                <nav className="flex flex-col gap-2.5" aria-label="Režim úkolů">
                  <button
                    type="button"
                    onClick={() => setTasksPanel('library')}
                    aria-current={tasksPanel === 'library' ? 'page' : undefined}
                    className={[
                      'flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm outline-none transition-colors',
                      'focus-visible:ring-2 focus-visible:ring-[#fbc02d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#565e75]',
                      tasksPanel === 'library'
                        ? 'bg-[#fbc02d] font-semibold text-slate-900 shadow-md shadow-black/15'
                        : 'bg-[#4f566b] font-medium text-white hover:bg-[#5c647a]',
                    ].join(' ')}
                  >
                    <Library
                      className={[
                        'size-[1.125rem] shrink-0 stroke-[2]',
                        tasksPanel === 'library' ? 'text-slate-800' : 'text-white/75',
                      ].join(' ')}
                      aria-hidden
                    />
                    Knihovna úkolů
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTasksPanel('create');
                      setEditAssignmentUrl('');
                    }}
                    aria-current={tasksPanel === 'create' ? 'page' : undefined}
                    className={[
                      'flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm outline-none transition-colors',
                      'focus-visible:ring-2 focus-visible:ring-[#fbc02d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#565e75]',
                      tasksPanel === 'create'
                        ? 'bg-[#fbc02d] font-semibold text-slate-900 shadow-md shadow-black/15'
                        : 'bg-[#4f566b] font-medium text-white hover:bg-[#5c647a]',
                    ].join(' ')}
                  >
                    <Plus
                      className={[
                        'size-[1.125rem] shrink-0 stroke-[2]',
                        tasksPanel === 'create' ? 'text-slate-800' : 'text-white/75',
                      ].join(' ')}
                      aria-hidden
                    />
                    Vytvořit úkol
                  </button>
                  <button
                    type="button"
                    onClick={() => setTasksPanel('edit')}
                    aria-current={tasksPanel === 'edit' ? 'page' : undefined}
                    className={[
                      'flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm outline-none transition-colors',
                      'focus-visible:ring-2 focus-visible:ring-[#fbc02d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#565e75]',
                      tasksPanel === 'edit'
                        ? 'bg-[#fbc02d] font-semibold text-slate-900 shadow-md shadow-black/15'
                        : 'bg-[#4f566b] font-medium text-white hover:bg-[#5c647a]',
                    ].join(' ')}
                  >
                    <Pencil
                      className={[
                        'size-[1.125rem] shrink-0 stroke-[2]',
                        tasksPanel === 'edit' ? 'text-slate-800' : 'text-white/75',
                      ].join(' ')}
                      aria-hidden
                    />
                    Editovat úkol
                  </button>
                </nav>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white sm:border-l sm:border-[#565e75]/18">
                {tasksPanel === 'library' ? (
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                      <div className="mb-8 space-y-2 pr-12">
                        <TasksSheetHeading
                          embedded={embedded}
                          className="text-left text-2xl font-semibold tracking-tight text-[#565e75]"
                        >
                          Knihovna úkolů
                        </TasksSheetHeading>
                        <TasksSheetSubtext
                          embedded={embedded}
                          className="text-left text-[15px] leading-relaxed text-slate-600 max-w-prose"
                        >
                          Hotová zadání z databáze — otevři náhled, pošli odkaz studentům, nebo si zadání načti do
                          editoru a uprav.
                        </TasksSheetSubtext>
                      </div>
                      {taskEntries.length === 0 ? (
                        <p className="rounded-2xl border border-dashed border-sky-200 bg-sky-50 px-6 py-10 text-center text-[15px] leading-relaxed text-slate-600">
                          Zatím žádné úkoly.
                        </p>
                      ) : (
                        <ul className="grid grid-cols-1 justify-items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
                          {taskEntries.map((entry, index) => {
                            const link = resolveStudentLink(entry, assignmentPublicUrlForHost);
                            const id = entry.assignmentId?.trim();
                            const fromDb = id ? libraryDbMeta[id] : undefined;
                            const displayTitle =
                              fromDb?.title && fromDb.title.trim() ? fromDb.title.trim() : entry.title;
                            const imgSrc =
                              resolveLibraryImageSrc(entry.imageUrl) ??
                              (fromDb?.instruction_image && fromDb.instruction_image.trim()
                                ? fromDb.instruction_image
                                : null);
                            return (
                              <li
                                key={entry.key}
                                style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
                                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both motion-safe:duration-500 flex w-full max-w-[520px] flex-col rounded-2xl border border-sky-100/90 bg-white p-6 shadow-sm transition-all duration-200 hover:border-sky-200 hover:shadow-md xl:max-w-none"
                              >
                                <div className="flex min-w-0 flex-1 flex-col gap-5">
                                  <div className="flex gap-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#565e75]/12 text-sm font-medium tabular-nums text-[#565e75]">
                                      {index + 1}
                                    </span>
                                    <div className="min-w-0 pt-1.5">
                                      <p className="text-[1.0625rem] font-medium leading-snug text-[#565e75]">
                                        {displayTitle}
                                      </p>
                                      {id ? (
                                        <p className="mt-1 text-sm text-slate-500">
                                          {fromDb
                                            ? formatCzechStepCount(fromDb.stepCount)
                                            : 'Načítám údaje…'}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                  {link ? (
                                    <div className="flex min-w-0 w-full flex-col gap-3 border-t border-sky-50 pt-4">
                                      <p className="m-0 text-sm font-medium text-slate-500">Rychlé akce</p>
                                      <div className="flex w-full flex-wrap items-center gap-2 py-0.5">
                                        <a
                                          href={link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-sky-600 px-3 text-xs font-medium text-white transition-colors hover:bg-sky-700"
                                        >
                                          <ExternalLink className="size-3.5 shrink-0 opacity-90" aria-hidden />
                                          Otevřít
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => void copyText('Odkaz pro zadání', link)}
                                          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-sky-200 bg-sky-50 px-3 text-xs font-medium text-sky-900 transition-colors hover:bg-sky-100"
                                        >
                                          <Copy className="size-3.5 shrink-0 opacity-80" aria-hidden />
                                          Odkaz pro zadání
                                        </button>
                                        <button
                                          type="button"
                                          disabled={!id || busy}
                                          onClick={() => (id ? void loadLibraryAssignmentIntoDraft(id) : undefined)}
                                          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-amber-200/90 bg-amber-50 px-3 text-xs font-medium text-amber-950 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
                                          title={!id ? 'Toto zadání nemá assignmentId' : 'Upravit toto zadání'}
                                        >
                                          <Pencil className="size-3.5 shrink-0 opacity-85" aria-hidden />
                                          Upravit
                                        </button>
                                      </div>
                                    </div>
                                  ) : null}
                                  {imgSrc ? (
                                    <img
                                      src={imgSrc}
                                      alt=""
                                      className="mx-auto block max-h-[min(33.6vw,9.8rem)] w-[70%] max-w-full object-contain object-center"
                                    />
                                  ) : null}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                  </div>
                ) : null}

                {tasksPanel === 'create' ? (
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                      <div className="mb-8 space-y-2 pr-12">
                        <TasksSheetHeading
                          embedded={embedded}
                          className="text-left text-2xl font-semibold tracking-tight text-[#565e75]"
                        >
                          Vytvořit úkol
                        </TasksSheetHeading>
                        <TasksSheetSubtext
                          embedded={embedded}
                          className="text-left text-[15px] leading-relaxed text-slate-600 max-w-prose"
                        >
                          Ke každému kroku můžeš přidat obrázek. Po uložení pošli studentům odkaz — odevzdání sleduješ u
                          jejich odpovědi.
                        </TasksSheetSubtext>
                      </div>
                      {createdUrl ? (
                        <div className="mb-8 flex w-full max-w-3xl flex-col gap-5 rounded-2xl border border-sky-100 border-l-4 border-l-sky-500 bg-sky-50 p-6 shadow-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3 text-slate-800">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-100">
                                <Link className="size-4 text-sky-700" aria-hidden />
                              </div>
                              <span className="text-base font-medium leading-tight">Odkaz na zadání</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setCreatedUrl(null);
                                setLinkCopied(false);
                              }}
                              className="flex size-9 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                              title="Skrýt odkaz"
                              aria-label="Skrýt odkaz"
                            >
                              <X className="size-4" aria-hidden />
                            </button>
                          </div>
                          <p className="m-0 text-sm leading-relaxed text-zinc-600">
                            Zkopíruj odkaz a pošli ho studentům. Po vyplnění jména uvidí zadání vpravo a mohou tvořit obvod.
                          </p>
                          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                            <input
                              ref={createdLinkInputRef}
                              readOnly
                              value={createdUrl}
                              onClick={() => createdLinkInputRef.current?.select()}
                              className="min-w-0 flex-1 rounded-xl border border-sky-200 bg-white px-4 py-3 text-xs text-slate-800 outline-none ring-sky-400/0 transition-shadow focus-visible:ring-2 focus-visible:ring-sky-400/40"
                              style={{ fontFamily: 'ui-monospace, monospace' }}
                            />
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  await navigator.clipboard.writeText(createdUrl);
                                } catch {
                                  createdLinkInputRef.current?.select();
                                  document.execCommand('copy');
                                }
                                setLinkCopied(true);
                                toast.success('Odkaz zkopírován');
                                window.setTimeout(() => setLinkCopied(false), 2000);
                              }}
                              className={[
                                'flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors',
                                linkCopied ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-sky-600 hover:bg-sky-700',
                              ].join(' ')}
                            >
                              {linkCopied ? (
                                <>
                                  <Check className="size-4" aria-hidden />
                                  Zkopírováno
                                </>
                              ) : (
                                <>
                                  <Copy className="size-4" aria-hidden />
                                  Kopírovat
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : null}
                      <div className="flex w-full flex-col gap-8 pb-4">
                        <div className="space-y-6">
                          <div className="space-y-2.5">
                            <Label className="text-base font-medium text-slate-800" htmlFor="task-title">
                              Název zadání{' '}
                              <span className="text-sm font-normal text-slate-500">(volitelné)</span>
                            </Label>
                            <div className="flex flex-col gap-3 min-[520px]:flex-row min-[520px]:items-stretch min-[520px]:gap-3">
                              <input
                                id="task-title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Např. Ampérmetr – základní zapojení"
                                className="min-w-0 flex-1 rounded-xl border border-sky-200/80 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none ring-sky-400/0 transition-shadow placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/25"
                              />
                              <div className="flex w-full shrink-0 flex-col gap-2 min-[520px]:w-auto min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-end">
                                <Button
                                  type="button"
                                  onClick={handleCreate}
                                  disabled={busy || !steps.some(s => s.text.trim())}
                                  className="h-11 w-full rounded-xl bg-sky-600 px-4 text-[15px] font-medium text-white shadow-sm hover:bg-sky-700 disabled:opacity-50 min-[520px]:h-12 min-[520px]:w-auto min-[520px]:shrink-0 min-[520px]:whitespace-nowrap"
                                >
                                  {busy ? 'Ukládám…' : 'Publikovat úkol'}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  disabled={busy}
                                  onClick={() => {
                                    setCreatedUrl(null);
                                    setLinkCopied(false);
                                    resetForm();
                                    toast.success('Zadání vymazáno.');
                                  }}
                                  className="h-11 w-full rounded-xl border-2 border-sky-200 bg-white text-[15px] font-medium text-sky-900 hover:bg-sky-50 min-[520px]:h-12 min-[520px]:w-auto min-[520px]:shrink-0 min-[520px]:whitespace-nowrap"
                                >
                                  Nový úkol
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Label className="block text-base font-medium text-slate-800">Kroky zadání</Label>
                          <p className="m-0 text-sm leading-relaxed text-zinc-500">
                            Každý krok se studentům zobrazí jako očíslovaný bod; obrázek u kroku je volitelný.
                          </p>
                          <ul className="m-0 grid list-none grid-cols-1 justify-items-stretch gap-6 p-0 sm:grid-cols-2 xl:grid-cols-3">
                            {steps.map((step, index) => {
                              const stepDrag = dragActiveStep === index;
                              return (
                                <li
                                  key={index}
                                  className="w-full max-w-[520px] rounded-2xl border border-sky-100/90 bg-white p-6 shadow-sm xl:max-w-none"
                                >
                                  <div className="mb-4 flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-900">
                                      Krok {index + 1}
                                    </span>
                                    {steps.length > 1 ? (
                                      <button
                                        type="button"
                                        onClick={() => removeStep(index)}
                                        className="flex size-9 items-center justify-center text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                        title="Odebrat krok"
                                        aria-label={`Odebrat krok ${index + 1}`}
                                      >
                                        <Trash2 className="size-4" aria-hidden />
                                      </button>
                                    ) : null}
                                  </div>
                                  <Textarea
                                    id={index === 0 ? 'task-step-0' : undefined}
                                    value={step.text}
                                    onChange={e => setStepTextAt(index, e.target.value)}
                                    placeholder="Např. Sestroj obvod se dvěma žárovkami …"
                                    rows={5}
                                    className="min-h-[100px] resize-y rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus-visible:border-sky-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-sky-400/20"
                                  />
                                  <div className="mt-5 space-y-3">
                                    <Label
                                      htmlFor={`task-step-img-${index}`}
                                      className="text-sm font-medium text-slate-600"
                                    >
                                      Obrázek ke kroku{' '}
                                      <span className="font-normal text-slate-400">(volitelné)</span>
                                    </Label>
                                    <input
                                      id={`task-step-img-${index}`}
                                      type="file"
                                      accept="image/*"
                                      className="sr-only"
                                      onChange={e => {
                                        onPickStepImage(index, e.target.files?.[0]);
                                        e.target.value = '';
                                      }}
                                    />
                                    {!step.image ? (
                                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div
                                          role="button"
                                          tabIndex={0}
                                          onClick={() => document.getElementById(`task-step-img-${index}`)?.click()}
                                          onKeyDown={e => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                              e.preventDefault();
                                              document.getElementById(`task-step-img-${index}`)?.click();
                                            }
                                          }}
                                          onDragEnter={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDragActiveStep(index);
                                          }}
                                          onDragOver={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                          }}
                                          onDragLeave={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                              setDragActiveStep(d => (d === index ? null : d));
                                            }
                                          }}
                                          onDrop={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setDragActiveStep(null);
                                            onPickStepImage(index, e.dataTransfer.files?.[0]);
                                          }}
                                          className={[
                                            'flex min-h-[104px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-3 py-4 text-center outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2',
                                            stepDrag
                                              ? 'border-sky-500 bg-sky-50 text-slate-900'
                                              : 'border-sky-200/70 bg-sky-50/40 text-slate-600 hover:border-sky-300 hover:bg-sky-50/70',
                                          ].join(' ')}
                                        >
                                          <ImagePlus
                                            className={`size-7 stroke-[1.5] ${stepDrag ? 'text-sky-600' : 'text-sky-500/80'}`}
                                            aria-hidden
                                          />
                                          <div className="text-xs font-medium text-slate-700">Přidat obrázek</div>
                                          <div className="text-[11px] text-slate-500">max. 1,5&nbsp;MB</div>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => openGeometryDrawForStep(index)}
                                          className="flex min-h-[104px] flex-col items-center justify-center gap-1.5 rounded-xl border border-violet-200/80 bg-violet-50/50 px-3 py-4 text-center text-violet-950 transition-colors hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2"
                                        >
                                          <DraftingCompass className="size-7 stroke-[1.5] text-violet-600" aria-hidden />
                                          <div className="text-xs font-medium text-violet-950">Narýsovat</div>
                                          <div className="text-[11px] text-violet-800/85">vloží jako obrázek</div>
                                        </button>
                                      </div>
                                    ) : null}
                                    {step.image ? (
                                      <div className="relative inline-block max-w-full overflow-hidden rounded-xl border border-sky-100 bg-sky-50/30 p-1">
                                        <img
                                          src={step.image}
                                          alt={`Náhled kroku ${index + 1}`}
                                          className="max-h-44 w-full rounded-lg border border-white bg-white object-contain"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => setStepImageAt(index, null)}
                                          className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-lg bg-slate-800 text-white shadow-md transition-colors hover:bg-slate-900"
                                          title="Odebrat obrázek"
                                        >
                                          <X size={16} aria-hidden />
                                        </button>
                                      </div>
                                    ) : null}
                                  </div>
                                </li>
                              );
                            })}
                            <li className="flex w-full max-w-[520px] flex-col rounded-2xl border border-sky-100/90 bg-white p-6 shadow-sm xl:max-w-none">
                              <button
                                type="button"
                                onClick={addStep}
                                className="flex min-h-[12rem] flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-sky-200/90 bg-white px-4 py-8 text-center transition-colors hover:border-sky-300 hover:bg-slate-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                              >
                                <span className="flex size-12 items-center justify-center rounded-full bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                                  <Plus className="size-6 stroke-[2]" aria-hidden />
                                </span>
                                <span className="text-sm font-medium text-slate-800">Přidat krok</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                ) : null}

                {tasksPanel === 'edit' ? (
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                      <div className="mb-8 space-y-2 pr-12">
                        <TasksSheetHeading
                          embedded={embedded}
                          className="text-left text-2xl font-semibold tracking-tight text-[#565e75]"
                        >
                          Editovat úkol
                        </TasksSheetHeading>
                        <TasksSheetSubtext
                          embedded={embedded}
                          className="text-left text-[15px] leading-relaxed text-slate-600 max-w-prose"
                        >
                          Vlož URL studentského zadání nebo{' '}
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm font-medium text-slate-800">
                            UUID
                          </span>{' '}
                          z databáze — obsah se načte do editoru (uložíš ho jako nový záznam).
                        </TasksSheetSubtext>
                      </div>
                      <div className="mx-auto max-w-lg space-y-6 rounded-2xl border border-indigo-100 border-l-4 border-l-indigo-400 bg-indigo-50 p-8 shadow-sm">
                        <div className="space-y-2">
                          <Label htmlFor="edit-assignment-url" className="text-sm font-medium text-slate-800">
                            Odkaz nebo ID zadání
                          </Label>
                          <p className="m-0 text-sm leading-relaxed text-slate-600">
                            Z studentské stránky zkopíruj celou adresu, nebo jen identifikátor záznamu.
                          </p>
                        </div>
                        <input
                          id="edit-assignment-url"
                          value={editAssignmentUrl}
                          onChange={e => setEditAssignmentUrl(e.target.value)}
                          placeholder={`https://…/${assignmentUrlPathSegment}/… nebo vlož UUID`}
                          disabled={busy}
                          className="w-full rounded-xl border border-indigo-200/80 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none ring-indigo-400/0 transition-shadow focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400/25"
                          style={{ fontFamily: 'ui-monospace, monospace' }}
                        />
                        <Button
                          type="button"
                          className="h-12 w-full rounded-xl bg-indigo-600 text-[15px] font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                          disabled={busy || !editAssignmentUrl.trim()}
                          onClick={() => void handleLoadAssignmentFromUrl()}
                        >
                          {busy ? 'Načítám…' : 'Načíst a editovat'}
                        </Button>
                      </div>
                  </div>
                ) : null}
              </div>
            </div>
  );

  return (
    <>
      {embedded ? (
        <section
          className="mx-auto w-full max-w-[min(100%,1600px)] [font-family:'Fenomen_Sans',system-ui,sans-serif]"
          aria-label="Úkoly"
        >
          <div className="flex max-h-[min(92vh,980px)] min-h-[min(72vh,620px)] w-full flex-col overflow-hidden rounded-2xl border border-[#565e75]/20 bg-[#fafbfc] shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{tasksRow}</div>
          </div>
        </section>
      ) : (
        <Sheet
          open={open}
          onOpenChange={v => {
            if (!v) {
              setTasksPanel('library');
              setEditAssignmentUrl('');
              setLibraryDbMeta({});
              setCreatedUrl(null);
              setLinkCopied(false);
            }
            onOpenChange(v);
          }}
        >
          <SheetContent
            side="right"
            className={[
              "inset-0 left-0 right-0 flex h-[100dvh] w-screen !max-w-none flex-col gap-0 overflow-hidden border-l-0 p-0 !shadow-2xl",
              "[font-family:'Fenomen_Sans',system-ui,sans-serif]",
              "border-t border-[#565e75]/15 bg-[#fafbfc]",
            ].join(" ")}
          >
            <div className="flex h-full min-h-0 min-h-[100dvh] w-full max-w-none flex-1 flex-col overflow-hidden">
              {tasksRow}
            </div>
          </SheetContent>
        </Sheet>
      )}
      <Dialog open={geometryDrawOpen} onOpenChange={setGeometryDrawOpen}>
        <DialogContent
          className="fixed !inset-0 !left-0 !top-0 z-50 flex h-[100dvh] max-h-[100dvh] w-screen min-h-0 min-w-0 max-w-none !translate-x-0 !translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 p-0 shadow-none sm:max-w-none [&>button.absolute]:hidden"
        >
          <div className="flex h-full w-full flex-col bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
              <DialogTitle className="m-0 flex items-center gap-2 text-base font-semibold text-zinc-900">
                <DraftingCompass className="size-4 text-zinc-600" aria-hidden />
                Narýsovat geometrii
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setGeometryDrawSession(s => s + 1)}
                  className="gap-2"
                >
                  <Trash2 className="size-4" aria-hidden />
                  Vymazat plátno
                </Button>
                <Button type="button" variant="outline" onClick={() => setGeometryDrawOpen(false)}>
                  Zrušit
                </Button>
                <Button type="button" onClick={() => void insertDrawnGeometryToStep()}>
                  Vložit jako obrázek
                </Button>
              </div>
            </div>
            <div className="relative min-h-0 flex-1">
              <Suspense
                fallback={
                  <div className="flex h-full w-full items-center justify-center bg-white text-zinc-500">
                    Načítám rýsovací editor…
                  </div>
                }
              >
                <FreeGeometryEditor
                  key={`task-geo-draw-${geometryDrawSession}`}
                  onBack={() => setGeometryDrawOpen(false)}
                  darkMode={geometryDarkMode}
                  onDarkModeChange={setGeometryDarkMode}
                  deviceType="computer"
                  canvasExportRef={geometryCanvasExportRef}
                />
              </Suspense>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
