import React, { useEffect, useRef, type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  PanelBottomClose,
  PanelBottomOpen,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
  X,
} from 'lucide-react';
import { Latex, getTypeColor, getTypeSymbol, useKatexCSS, type ConstructionStep } from './ConstructionProtocol';
import type { RecordingProtocolRow } from './recordingProtocol';

/** Šířka sloupce přehrávače na desktopu (px). */
export const RECORDING_COLUMN_WIDTH = 360;
/** Pod touto šířkou plátna je sloupec spodní list. */
export const RECORDING_COLUMN_SHEET_BELOW = 640;
/** Výška spodního listu na mobilu (px). */
export const recordingSheetHeight = (viewportH: number) => Math.round(viewportH * 0.45);

export type RecordingSubtask = { key: string; id: string };

type StepInfo = { actionType?: string; description?: string };

/** Kolečko podúlohy jako přepínač Rýsování ve Freeform nástěnce (modré s obrysem). */
export const subtaskLetterClass = (active: boolean, darkMode: boolean) =>
  `flex size-10 items-center justify-center rounded-full border-2 text-[15px] font-bold leading-none transition-colors ${
    active
      ? 'border-[#2f6df6] bg-[#2f6df6] text-white shadow-[0_6px_14px_rgba(47,109,246,0.35)] hover:bg-[#1f58d8]'
      : darkMode
        ? 'border-[#2f6df6] bg-[#1a1b26] text-[#8fb0ff] hover:bg-[#2f6df6]/20'
        : 'border-[#2f6df6] bg-white text-[#2f6df6] hover:bg-[#eaf1ff]'
  }`;

const ACTION_TO_TYPE: Record<string, ConstructionStep['type']> = {
  'create-point': 'point',
  'create-segment': 'segment',
  'create-line': 'line',
  'create-line-dashed': 'lineDashed',
  'create-line-dashdot': 'lineDashed',
  'create-ray': 'ray',
  'create-circle': 'circle',
  'create-angle': 'angle',
  freehand: 'freehand',
};

interface Props {
  rows: RecordingProtocolRow[];
  steps: ReadonlyArray<StepInfo>;
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onRestart: () => void;
  darkMode: boolean;
  /** true = spodní list (mobil), false = sloupec vpravo. */
  sheet: boolean;
  sheetHeight: number;
  subtasks?: RecordingSubtask[];
  activeSubtaskId?: string | null;
  onSelectSubtask?: (id: string) => void;
  /** Bez handleru se ✕ nezobrazí (např. v iframe, kde má hostitel vlastní hlavičku). */
  onClose?: () => void;
  /** Schová sloupec (zůstane plovoucí tlačítko pro znovuotevření). */
  onHide?: () => void;
  /** Doplňkové akce (lokální záznam: upravit, tisk, sdílet). */
  footer?: ReactNode;
}

/**
 * Sloupec přehrávače záznamu: přepínač podúloh, Zpět/Další a zápis konstrukce
 * (aktuální krok zvýrazněný s vysvětlením, klik na řádek = skok na krok).
 * Vzhled řádků a hlavičky je stejný jako panel „Zápis konstrukce“ v editoru.
 */
export function RecordingPlayerColumn({
  rows,
  steps,
  currentStepIndex,
  onSelectStep,
  onRestart,
  darkMode,
  sheet,
  sheetHeight,
  subtasks,
  activeSubtaskId,
  onSelectSubtask,
  onClose,
  onHide,
  footer,
}: Props) {
  useKatexCSS();
  const listRef = useRef<HTMLDivElement>(null);
  const total = rows.length;
  const canPrev = currentStepIndex >= 0;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (currentStepIndex < 0) {
      list.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = list.querySelector<HTMLElement>(`[data-step="${currentStepIndex}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [currentStepIndex]);

  const showSubtasks = !!subtasks && subtasks.length > 1;
  const stepsLabel = total === 1 ? 'krok' : total >= 2 && total <= 4 ? 'kroky' : 'kroků';

  const muted = darkMode ? 'text-[#9aa5ce]' : 'text-gray-500';
  const iconBtn = `flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
    darkMode ? 'text-[#c0caf5] hover:bg-[#24283b]' : 'text-black hover:bg-gray-200'
  }`;
  return (
    <div
      className={`absolute z-[55] flex flex-col ${
        sheet
          ? `left-0 right-0 bottom-0 rounded-t-2xl border-t shadow-[0_-4px_24px_rgba(0,0,0,0.12)]`
          : 'top-0 right-0 bottom-0 border-l shadow-[-4px_0_24px_rgba(0,0,0,0.12)]'
      } ${darkMode ? 'bg-[#1a1b26] border-[#2a2b3d] text-[#c0caf5]' : 'bg-white border-gray-200 text-gray-900'}`}
      style={sheet ? { height: sheetHeight } : { width: RECORDING_COLUMN_WIDTH }}
      role="region"
      aria-label="Přehrávač konstrukce"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Podúlohy + zavřít (bez podúloh je ✕ v hlavičce zápisu) */}
      {showSubtasks && (
        <div className={`flex items-center gap-2 px-4 ${sheet ? 'py-3' : 'py-4'}`}>
          <div className="flex items-center gap-2" role="tablist" aria-label="Podúlohy">
              {subtasks!.map((t) => {
                const active = t.id === activeSubtaskId;
                return (
                  <button
                    key={t.key + t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => !active && onSelectSubtask?.(t.id)}
                    className={subtaskLetterClass(active, darkMode)}
                    title={`Podúloha ${t.key}`}
                  >
                    {t.key}
                  </button>
                );
              })}
            </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`ml-auto ${iconBtn}`}
              title="Zavřít přehrávač"
              aria-label="Zavřít přehrávač"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      )}

      {/* Hlavička zápisu — jako v editoru */}
      <div
        className={`flex items-center gap-3 px-4 ${sheet ? 'py-2' : 'py-3'} border-b ${showSubtasks ? 'border-t' : ''} ${
          darkMode ? 'border-[#2a2b3d]' : 'border-gray-100'
        }`}
      >
        {onHide && (
          <button
            type="button"
            onClick={onHide}
            className={`-ml-1 ${iconBtn}`}
            title="Skrýt zápis"
            aria-label="Skrýt zápis"
          >
            {sheet ? <PanelBottomClose className="size-5" /> : <PanelRightClose className="size-5" />}
          </button>
        )}
        <div
          className={`flex items-center justify-center rounded-xl ${sheet ? 'size-9' : 'size-[42px]'} ${
            darkMode ? 'bg-[#24283b]' : 'bg-gray-100'
          }`}
        >
          <FileText className={`size-5 ${darkMode ? 'text-[#7aa2f7]' : 'text-gray-600'}`} />
        </div>
        <div className="min-w-0">
          <h3 className={`text-[18px] leading-tight ${darkMode ? 'text-[#c0caf5]' : 'text-gray-900'}`}>Zápis konstrukce</h3>
          <p className={`text-[14px] ${muted}`}>
            {currentStepIndex >= 0 ? `Krok ${currentStepIndex + 1} z ${total}` : `${total} ${stepsLabel}`}
          </p>
        </div>
        <button
          type="button"
          onClick={onRestart}
          disabled={!canPrev}
          className={`ml-auto ${iconBtn}`}
          title="Znovu od začátku"
          aria-label="Znovu od začátku"
        >
          <RotateCcw className="size-5" />
        </button>
        {!showSubtasks && onClose && (
          <button type="button" onClick={onClose} className={iconBtn} title="Zavřít přehrávač" aria-label="Zavřít přehrávač">
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Kroky */}
      <div ref={listRef} className={`flex-1 min-h-0 overflow-y-auto px-3 ${sheet ? 'py-2' : 'py-3'} space-y-1.5`}>
        {rows.map((row) => {
          const i = row.stepIndex;
          const active = i === currentStepIndex;
          const done = i < currentStepIndex;
          const info = steps[i] ?? {};
          const type = ACTION_TO_TYPE[info.actionType ?? ''] ?? 'point';
          const description = info.description?.trim();
          return (
            <button
              key={i}
              type="button"
              data-step={i}
              onClick={() => onSelectStep(i)}
              aria-current={active ? 'step' : undefined}
              className={`w-full flex items-start gap-3 px-3 py-3 rounded-xl text-left transition-colors ${
                active
                  ? darkMode
                    ? 'bg-[#24283b] ring-1 ring-[#7aa2f7]/60'
                    : 'bg-blue-50 ring-1 ring-blue-200'
                  : darkMode
                    ? 'hover:bg-[#24283b]/60'
                    : 'hover:bg-gray-50'
              } ${!active && !done ? 'opacity-55' : ''}`}
            >
              <span
                className={`min-w-[28px] pt-0.5 text-right text-[17px] tabular-nums ${
                  active ? (darkMode ? 'text-[#7aa2f7] font-bold' : 'text-[#1e1b4b] font-bold') : muted
                }`}
              >
                {i + 1}.
              </span>
              <span className="pt-0.5 flex-shrink-0" style={{ minWidth: 22 }}>
                <Latex math={`{\\color{${getTypeColor(type)}} ${getTypeSymbol(type)}}`} />
              </span>
              <span className="flex-1 min-w-0">
                <span className={`block text-[17px] leading-relaxed break-words ${darkMode ? 'katex-dark' : ''}`}>
                  <Latex math={row.latex} className={darkMode ? 'katex-dark' : ''} />
                </span>
                {active && description && (
                  <span className={`block mt-1 text-[14px] leading-snug ${darkMode ? 'text-[#a9b1d6]' : 'text-gray-600'}`}>
                    {description}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {footer && (
        <div className={`flex items-center justify-center gap-1 px-4 py-2 border-t ${darkMode ? 'border-[#2a2b3d]' : 'border-gray-100'}`}>
          {footer}
        </div>
      )}

      <style>{`
        .katex-dark .katex,
        .katex-dark .katex .katex-mathml,
        .katex-dark .katex .katex-html,
        .katex-dark .katex .mord,
        .katex-dark .katex .mbin,
        .katex-dark .katex .mrel,
        .katex-dark .katex .mopen,
        .katex-dark .katex .mclose,
        .katex-dark .katex .mpunct,
        .katex-dark .katex .minner {
          color: #c0caf5;
        }
      `}</style>
    </div>
  );
}

/** Šipky Předchozí / Další krok — fialová kolečka jako přepínání úkolů ve Freeform nástěnce. */
export const RECORDING_ARROW_SIZE = 56;
export const RECORDING_ARROW_GAP = 12;
export const RECORDING_ARROW_EDGE = 16;

export function RecordingStepArrows({
  onPrev,
  onNext,
  canPrev,
  canNext,
  row,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  /** true = vedle sebe dole uprostřed (mobil), false = pod sebou u levého okraje. */
  row: boolean;
}) {
  const btn =
    'pointer-events-auto flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-white/[0.98] bg-[#7c3aed] text-white shadow-[0_10px_22px_rgba(124,58,237,0.32)] transition-[background,opacity] duration-150 hover:bg-[#6d28d9] focus-visible:bg-[#6d28d9] active:bg-[#6d28d9] disabled:cursor-default disabled:opacity-[0.36] disabled:shadow-none disabled:hover:bg-[#7c3aed]';
  return (
    <div
      className={`absolute z-50 flex pointer-events-none ${
        row ? 'left-1/2 -translate-x-1/2 flex-row' : 'top-1/2 -translate-y-1/2 flex-col'
      }`}
      style={
        row
          ? { bottom: RECORDING_ARROW_EDGE - 4, gap: RECORDING_ARROW_GAP }
          : { left: RECORDING_ARROW_EDGE, gap: RECORDING_ARROW_GAP }
      }
      aria-label="Přepínání kroků"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <button type="button" onClick={onPrev} disabled={!canPrev} className={btn} aria-label="Předchozí krok" title="Předchozí krok">
        <ChevronLeft size={22} strokeWidth={2.8} />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} className={btn} aria-label="Další krok" title="Další krok">
        <ChevronRight size={22} strokeWidth={2.8} />
      </button>
    </div>
  );
}

/**
 * Schovaný sloupec: plovoucí přepínač podúloh (je-li jich víc) a tlačítko pro znovuotevření
 * zápisu. Desktop: vpravo nahoře; mobil: podúlohy vpravo pod lištou zoomu, tlačítko vpravo dole.
 */
export function RecordingCollapsedControls({
  sheet,
  darkMode,
  subtasks,
  activeSubtaskId,
  onSelectSubtask,
  onShow,
}: {
  sheet: boolean;
  darkMode: boolean;
  subtasks?: RecordingSubtask[];
  activeSubtaskId?: string | null;
  onSelectSubtask?: (id: string) => void;
  onShow: () => void;
}) {
  const showSubtasks = !!subtasks && subtasks.length > 1;
  const pill = `pointer-events-auto flex items-center gap-1.5 rounded-full p-1.5 shadow-sm ${
    darkMode ? 'bg-[#24283b] ring-1 ring-[#2f3549]' : 'bg-[#F2F2F2]'
  }`;
  const letters = showSubtasks ? (
    <div className={pill} role="tablist" aria-label="Podúlohy">
      {subtasks!.map((t) => {
        const active = t.id === activeSubtaskId;
        return (
          <button
            key={t.key + t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => !active && onSelectSubtask?.(t.id)}
            className={subtaskLetterClass(active, darkMode)}
            title={`Podúloha ${t.key}`}
          >
            {t.key}
          </button>
        );
      })}
    </div>
  ) : null;
  const openBtn = (
    <button
      type="button"
      onClick={onShow}
      className={`pointer-events-auto flex h-[52px] items-center gap-2 rounded-full px-4 text-[15px] font-medium shadow-sm transition-all duration-300 ${
        darkMode ? 'bg-[#24283b] text-[#c0caf5] ring-1 ring-[#2f3549] hover:bg-[#2f3549]' : 'bg-[#F2F2F2] text-black hover:bg-gray-200'
      }`}
      title="Zobrazit zápis konstrukce"
      aria-label="Zápis konstrukce"
    >
      {sheet ? <PanelBottomOpen className="size-5" /> : <PanelRightOpen className="size-5" />}
      {!sheet && <span>Zápis konstrukce</span>}
    </button>
  );
  const stop = {
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
    onTouchStart: (e: React.TouchEvent) => e.stopPropagation(),
  };
  if (sheet) {
    return (
      <>
        {letters && (
          <div className="absolute right-3 z-50 pointer-events-none" style={{ top: RECORDING_ZOOM_BAR_RESERVE_PX }} {...stop}>
            {letters}
          </div>
        )}
        <div className="absolute right-4 bottom-4 z-50 pointer-events-none" {...stop}>
          {openBtn}
        </div>
      </>
    );
  }
  return (
    <div className="absolute top-4 right-4 z-50 flex items-center gap-2 pointer-events-none" {...stop}>
      {letters}
      {openBtn}
    </div>
  );
}

/** Výška plovoucího ovládání zoomu nahoře na plátně (top-4 + lišta 56 px + mezera). */
export const RECORDING_ZOOM_BAR_RESERVE_PX = 80;
/** Výška plovoucího přepínače podúloh na mobilu při schovaném listu. */
export const RECORDING_COLLAPSED_LETTERS_PX = 56;
