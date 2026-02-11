import React, { useState } from 'react';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Expand, ChevronDown, Calculator, Grid3X3 } from 'lucide-react';
import type { ParameterDef, MathProperty } from '../geometry/shared';

interface Props {
  objectName: string;
  shapeBadge: string;
  params: Record<string, number>;
  parameterDefs: ParameterDef[];
  onParamChange: (id: string, value: number) => void;
  unfoldProgress: number;
  onUnfoldProgressChange: (v: number) => void;
  isWireframe: boolean;
  onWireframeToggle: (v: boolean) => void;
  hasUnfold: boolean;
  mathProperties: MathProperty[];
}

export function ObjectControls({
  objectName,
  shapeBadge,
  params,
  parameterDefs,
  onParamChange,
  unfoldProgress,
  onUnfoldProgressChange,
  isWireframe,
  onWireframeToggle,
  hasUnfold,
  mathProperties,
}: Props) {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div style={{ paddingBottom: 8 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 400, color: '#0f172a' }}>{objectName}</h2>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200" style={{ fontWeight: 400 }}>
            {shapeBadge}
          </Badge>
        </div>
        <div className="space-y-6">
          {/* Dynamic parameter sliders */}
          {parameterDefs.map((def) => (
            <div key={def.id} className="space-y-3">
              <Label className="text-slate-700">
                {def.label}: {params[def.id]}{def.unit ? ` ${def.unit}` : ''}
              </Label>
              <Slider
                value={[params[def.id]]}
                onValueChange={(v) => onParamChange(def.id, v[0])}
                min={def.min}
                max={def.max}
                step={def.step}
                className="w-full"
              />
            </div>
          ))}

          {/* Wireframe toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Grid3X3 className="h-4 w-4 text-slate-600" />
                <Label className="text-slate-700">Drátěný model</Label>
              </div>
              <Switch checked={isWireframe} onCheckedChange={onWireframeToggle} />
            </div>
            <div className="text-sm text-slate-500">
              {isWireframe ? 'Zobrazit pouze hrany (bez výplně)' : 'Barevné stěny s výplní'}
            </div>
          </div>

          {/* Unfold slider */}
          {hasUnfold && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <Expand className="h-4 w-4 text-slate-600" />
                <Label className="text-slate-700">
                  Rozbalení do sítě: {Math.round(unfoldProgress * 100)}%
                </Label>
              </div>
              <Slider
                value={[unfoldProgress]}
                onValueChange={(v) => onUnfoldProgressChange(v[0])}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
              {unfoldProgress < 1 && (
                <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {unfoldProgress === 0
                    ? '💡 Tip: Táhněte pro otáčení, kolečkem myši přiblížíte nebo oddálíte.'
                    : '💡 Táhněte slider pro postupné rozbalení'}
                </div>
              )}
            </div>
          )}

          {/* Tip when no unfold */}
          {!hasUnfold && (
            <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
              💡 Tip: Táhněte pro otáčení, kolečkem myši přiblížíte nebo oddálíte.
            </div>
          )}
        </div>
      </div>

      {/* Matematické vlastnosti */}
      <Collapsible open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0' }}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors text-left"
              style={{ padding: '14px 16px', border: 'none', background: 'none', fontSize: '1rem', fontWeight: 400, color: '#0f172a' }}
            >
              <div className="flex items-center">
                <Calculator className="mr-2 h-4 w-4 text-slate-600" />
                <span>Matematické vlastnosti</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isPropertiesOpen ? 'rotate-180' : ''}`} />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3" style={{ padding: '0 16px 16px' }}>
              {mathProperties.map((prop, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-slate-700">{prop.label}:</span>
                  <Badge
                    className={
                      prop.color === 'emerald'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }
                  >
                    {prop.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
