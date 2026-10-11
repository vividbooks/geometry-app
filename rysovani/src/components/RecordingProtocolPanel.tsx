import React, { useEffect, useRef } from 'react';
import { ListOrdered, X } from 'lucide-react';
import { Latex } from './ConstructionProtocol';
import type { RecordingProtocolRow } from './recordingProtocol';

/** Šířka bočního panelu na desktopu a výška spodního listu na mobilu (px). */
export const RECORDING_PROTOCOL_PANEL_WIDTH = 360;
export const recordingProtocolSheetHeight = (viewportH: number) =>
  Math.round(Math.min(Math.max(viewportH * 0.4, 220), 380));
/** Pod touto šířkou plátna je panel spodní list místo bočního panelu. */
export const RECORDING_PROTOCOL_SHEET_BELOW = 640;

interface Props {
  rows: RecordingProtocolRow[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onClose: () => void;
  darkMode: boolean;
  /** true = spodní list (mobil), false = boční panel vpravo. */
  sheet: boolean;
  sheetHeight: number;
}

/**
 * Zápis konstrukce v přehrávači záznamu — aktuální krok je zvýrazněný,
 * klik na řádek skočí na daný krok.
 */
export function RecordingProtocolPanel({
  rows,
  currentStepIndex,
  onSelectStep,
  onClose,
  darkMode,
  sheet,
  sheetHeight,
}: Props) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-step="${currentStepIndex}"]`);
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [currentStepIndex]);

  const frame = sheet
    ? `left-0 right-0 bottom-0 rounded-t-2xl border-t ${darkMode ? 'border-[#2a2b3d]' : 'border-gray-200'}`
    : `top-0 right-0 bottom-0 border-l ${darkMode ? 'border-[#2a2b3d]' : 'border-gray-200'}`;

  return (
    <div
      className={`absolute z-[55] flex flex-col shadow-[0_0_24px_rgba(0,0,0,0.12)] ${frame} ${
        darkMode ? 'bg-[#1a1b26] text-[#c0caf5]' : 'bg-white text-gray-900'
      }`}
      style={sheet ? { height: sheetHeight } : { width: RECORDING_PROTOCOL_PANEL_WIDTH }}
      role="dialog"
      aria-label="Zápis konstrukce"
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <div className={`flex items-center justify-between px-4 ${sheet ? 'py-2.5' : 'py-4'} border-b ${
        darkMode ? 'border-[#2a2b3d]' : 'border-gray-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${darkMode ? 'bg-[#24283b]' : 'bg-gray-100'}`}>
            <ListOrdered className={`w-5 h-5 ${darkMode ? 'text-[#7aa2f7]' : 'text-gray-600'}`} />
          </div>
          <h3 className="text-lg font-medium">Zápis konstrukce</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`p-2 rounded-lg transition-all ${
            darkMode ? 'hover:bg-[#24283b] text-[#565f89] hover:text-[#c0caf5]' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
          }`}
          title="Zavřít zápis"
          aria-label="Zavřít zápis"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <ol ref={listRef} className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {rows.map((row) => {
          const active = row.stepIndex === currentStepIndex;
          const done = row.stepIndex < currentStepIndex;
          return (
            <li key={row.stepIndex} data-step={row.stepIndex}>
              <button
                type="button"
                onClick={() => onSelectStep(row.stepIndex)}
                aria-current={active ? 'step' : undefined}
                className={`w-full flex items-baseline gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                  active
                    ? darkMode
                      ? 'bg-[#7aa2f7]/20 ring-1 ring-[#7aa2f7]/50'
                      : 'bg-blue-50 ring-1 ring-blue-300'
                    : darkMode
                      ? 'hover:bg-[#24283b]/70'
                      : 'hover:bg-gray-50'
                } ${!active && !done ? 'opacity-60' : ''}`}
              >
                <span className={`min-w-[26px] text-right tabular-nums text-base ${
                  active ? (darkMode ? 'text-[#7aa2f7] font-bold' : 'text-blue-600 font-bold') : darkMode ? 'text-[#565f89]' : 'text-gray-400'
                }`}>
                  {row.stepIndex + 1}.
                </span>
                <span className="flex-1 min-w-0 text-[17px] leading-relaxed break-words">
                  <Latex math={row.latex} className={darkMode ? 'katex-dark' : ''} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
