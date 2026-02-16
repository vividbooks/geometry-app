import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Canvas3DViewer } from './Canvas3DViewer';
import { Flat2DViewer } from './Flat2DViewer';
import { ObjectQuizPanel, generateRandomParams, type TaskType } from './ObjectQuizPanel';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { ArrowLeft, Box, Grid3X3, Expand, List } from 'lucide-react';
import { getObjectDef } from '../../data/objects';
import { getWireframeDimensions } from '../geometry/wireframeDimensions';
import type { FaceData } from '../geometry/shared';
import type { ParameterDef } from '../geometry/shared';

/** Parsuje jeden řádek z query (např. "5,4,10") na objekt parametrů podle pořadí parameterDefs */
function parseRowParams(parameterDefs: ParameterDef[], rowStr: string): Record<string, number> | null {
  const parts = rowStr.split(',').map((s) => parseFloat(s.trim()));
  if (parts.length !== parameterDefs.length) return null;
  const out: Record<string, number> = {};
  parameterDefs.forEach((d, i) => {
    const v = parts[i];
    out[d.id] = Number.isFinite(v) ? v : d.defaultValue;
  });
  return out;
}

/** Parse numeric value from math property string e.g. "480 cm³" or "376.5 cm²" */
function parseValueFromProperty(valueStr: string): number {
  const normalized = valueStr.replace(',', '.').trim();
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : NaN;
}

/** Extract display number (no unit) for correct answer message */
function formatCorrectValue(valueStr: string): string {
  const normalized = valueStr.replace(',', '.');
  const match = normalized.match(/^([\d.]+)/);
  return match ? match[1] : valueStr;
}

function parseUserAnswer(input: string): number {
  const normalized = input.trim().replace(',', '.');
  const num = parseFloat(normalized);
  return Number.isFinite(num) ? num : NaN;
}

/** Allow small rounding difference: relative 0.5% or absolute 0.01 */
function isAnswerCorrect(userNum: number, correctNum: number): boolean {
  if (!Number.isFinite(userNum) || !Number.isFinite(correctNum)) return false;
  const tolerance = Math.max(0.01, correctNum * 0.005);
  return Math.abs(userNum - correctNum) <= tolerance;
}

function parseTaskType(s: string | undefined): TaskType {
  if (s === 'objem' || s === 'povrch' || s === 'obvod' || s === 'obsah') return s;
  return 'objem';
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

export type AnswerMode = 'number' | 'choices';

/** Vygeneruje 4 možnosti A–D: jedna správná a tři plausibilní špatné */
function generateChoices(correctNum: number, correctDisplay: string): string[] {
  const step = Math.max(1, Math.abs(correctNum) * 0.12);
  const wrongs = new Set<string>();
  const variants = [
    correctNum - step,
    correctNum + step,
    correctNum - 2 * step,
    correctNum + 2 * step,
    correctNum * 0.85,
    correctNum * 1.15,
  ].filter((n) => Number.isFinite(n) && n > 0 && Math.abs(n - correctNum) > 0.01);
  for (const v of variants) {
    const s = v >= 10 ? String(Math.round(v)) : v.toFixed(1);
    if (s !== correctDisplay) wrongs.add(s);
    if (wrongs.size >= 3) break;
  }
  while (wrongs.size < 3) {
    const v = correctNum + (wrongs.size + 1) * step;
    wrongs.add(v >= 10 ? String(Math.round(v)) : v.toFixed(1));
  }
  const choices = [correctDisplay, ...Array.from(wrongs).slice(0, 3)];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
}

export function ObjectExercisePage() {
  const { objectId, taskType: taskTypeParam } = useParams<{ objectId: string; taskType: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const def = getObjectDef(objectId || '');
  const taskType = parseTaskType(taskTypeParam);

  const urlAnswerMode = searchParams.get('answerMode') === 'choices' ? 'choices' : 'number';
  const urlRows = searchParams.get('rows');
  const urlParamsRandom = searchParams.get('params') === 'random';

  const initialParamsFromUrl = useMemo(() => {
    if (!def) return null;
    if (urlParamsRandom || (!urlRows && !searchParams.has('params'))) return null;
    if (urlRows) {
      const firstRow = urlRows.split('|')[0]?.trim();
      if (firstRow) return parseRowParams(def.parameterDefs, firstRow);
    }
    return null;
  }, [def, urlParamsRandom, urlRows, searchParams]);

  const [params, setParams] = useState<Record<string, number>>(() =>
    initialParamsFromUrl ?? (def ? generateRandomParams(def.parameterDefs) : {})
  );
  const [unfoldProgress, setUnfoldProgress] = useState(0);
  const [isWireframe, setIsWireframe] = useState(false);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answerMode, setAnswerMode] = useState<AnswerMode>(urlAnswerMode);

  const resetTask = useCallback(() => {
    if (!def) return;
    setParams(generateRandomParams(def.parameterDefs));
    setChecked(false);
    setCorrect(false);
  }, [def]);

  useEffect(() => {
    if (!def) return;
    if (initialParamsFromUrl) {
      setParams(initialParamsFromUrl);
      setChecked(false);
      setCorrect(false);
    } else {
      resetTask();
    }
  }, [def, objectId, resetTask, initialParamsFromUrl]);

  useEffect(() => {
    setAnswerMode(urlAnswerMode);
  }, [urlAnswerMode]);

  const mathProperties = def ? def.computeProperties(params) : [];
  const TASK_LABEL_MAP: Record<string, string> = { objem: 'Objem', povrch: 'Povrch', obvod: 'Obvod', obsah: 'Obsah' };
  const UNIT_MAP: Record<string, string> = { objem: 'cm³', povrch: 'cm²', obvod: 'cm', obsah: 'cm²' };
  const taskLabel = TASK_LABEL_MAP[taskType] ?? 'Objem';
  const prop = mathProperties.find((p) => p.label === taskLabel);
  const correctNum = prop ? parseValueFromProperty(prop.value) : NaN;
  const correctValueDisplay = prop ? formatCorrectValue(prop.value) : '—';
  const unit = UNIT_MAP[taskType] ?? 'cm²';
  const choices =
    answerMode === 'choices' && Number.isFinite(correctNum)
      ? generateChoices(correctNum, correctValueDisplay)
      : undefined;

  const handleCheck = useCallback(
    (answer: string) => {
      const userNum = parseUserAnswer(answer);
      const ok = isAnswerCorrect(userNum, correctNum);
      setChecked(true);
      setCorrect(ok);
    },
    [correctNum]
  );

  const computeFaces = useCallback(
    (progress: number): FaceData[] => {
      if (!def) return [];
      return def.computeFaces(params, progress);
    },
    [def, params]
  );

  const hasUnfold = def?.hasUnfold ?? false;

  if (!def) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFF1F8' }}>
        <div className="text-center">
          <p className="text-slate-600 text-lg mb-4">Těleso „{objectId}“ nebylo nalezeno.</p>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" /> Zpět na rozcestník
          </button>
        </div>
      </div>
    );
  }

  const gap = 16;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Levá polovina – úkol, bez stínu */}
      <div
        style={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '40%' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
          overflow: 'hidden',
          boxShadow: 'none',
        }}
      >
        <div className="flex items-center gap-2" style={{ flexShrink: 0, padding: isMobile ? 8 : 12 }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
            style={{
              width: isMobile ? 36 : 40,
              height: isMobile ? 36 : 40,
              borderRadius: '50%',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
            }}
            title="Zpět na rozcestník"
          >
            <ArrowLeft className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          </button>
          <Link
            to="/cviceni"
            className={`flex items-center gap-2 text-slate-600 hover:text-slate-900 ${isMobile ? 'text-xs' : 'text-sm'}`}
            style={{ textDecoration: 'none' }}
          >
            <List className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            Výběr úloh
          </Link>
          <Link
            to={def.path}
            className={`flex items-center gap-2 text-slate-600 hover:text-slate-900 ${isMobile ? 'text-xs' : 'text-sm'}`}
            style={{ textDecoration: 'none' }}
          >
            <Box className={isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
            Prohlížet těleso
          </Link>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '0 12px 12px' : '0 16px 16px' }}>
            <ObjectQuizPanel
              objectName={def.name}
              shapeBadge={def.badge}
              params={params}
              parameterDefs={def.parameterDefs}
              taskType={taskType}
              unit={unit}
              answerMode={answerMode}
              onAnswerModeChange={setAnswerMode}
              choices={choices}
              onCheck={handleCheck}
              checked={checked}
              correct={correct}
              correctValue={correctValueDisplay}
            />
            {checked && (
              <button
                type="button"
                onClick={resetTask}
                className={`text-blue-600 hover:underline mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}
              >
                Další úloha
              </button>
            )}
          </div>

          {/* Drátěný model a Rozbalení do sítě – jedna řádka, dole */}
          {/* Ovládací lišta – jen pro 3D tělesa */}
          {!def?.is2D && (
            <div
              style={{
                flexShrink: 0,
                padding: '16px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4 text-slate-600 flex-shrink-0" />
                <Label className="text-slate-700 text-sm whitespace-nowrap">Drátěný model</Label>
                <Switch checked={isWireframe} onCheckedChange={setIsWireframe} />
              </div>
              {hasUnfold && (
                <div className="flex items-center gap-2" style={{ flex: 1, minWidth: 180 }}>
                  <Expand className="h-4 w-4 text-slate-600 flex-shrink-0" />
                  <Label className="text-slate-700 text-sm whitespace-nowrap">
                    Rozbalení do sítě: {Math.round(unfoldProgress * 100)}%
                  </Label>
                  <Slider
                    value={[unfoldProgress]}
                    onValueChange={(v) => setUnfoldProgress(v[0])}
                    min={0}
                    max={1}
                    step={0.01}
                    className="flex-1"
                    style={{ maxWidth: 200 }}
                  />
                </div>
              )}
              {!hasUnfold && (
                <div className="text-sm text-slate-600">
                  💡 Táhněte pro otáčení, kolečkem myši přiblížíte nebo oddálíte.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pravá polovina – 3D nebo 2D zobrazení */}
      <div
        style={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '60%' : 'auto',
          position: 'relative',
          padding: isMobile ? gap / 2 : gap,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'stretch',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 16,
            background: '#E0E7FF',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          {def?.is2D && def.computeVertices2D ? (
            <Flat2DViewer
              vertices={def.computeVertices2D(params)}
              params={params}
              paramIds={def.parameterDefs.map((d) => d.id)}
              fillColor={def.color}
              backgroundColor="#E0E7FF"
              isCircle={objectId === 'kruh2d'}
            />
          ) : (
            <Canvas3DViewer
              computeFaces={computeFaces}
              unfoldProgress={unfoldProgress}
              isWireframe={isWireframe}
              offsetCenterX={0}
              backgroundColor="#E0E7FF"
              wireframeDimensions={objectId ? getWireframeDimensions(objectId, params) : undefined}
            />
          )}
        </div>
      </div>
    </div>
  );
}
