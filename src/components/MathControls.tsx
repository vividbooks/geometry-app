import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Expand, ChevronDown, Calculator, Grid3X3 } from 'lucide-react';

interface Props {
  sides: number;
  height: number;
  edgeLength: number;
  unfoldProgress: number;
  isWireframe: boolean;
  onSidesChange: (sides: number) => void;
  onHeightChange: (height: number) => void;
  onEdgeLengthChange: (edgeLength: number) => void;
  onUnfoldProgressChange: (progress: number) => void;
  onWireframeToggle: (wireframe: boolean) => void;
  onReset: () => void;
}

export function MathControls({
  sides,
  height,
  edgeLength,
  unfoldProgress,
  isWireframe,
  onSidesChange,
  onHeightChange,
  onEdgeLengthChange,
  onUnfoldProgressChange,
  onWireframeToggle,
  onReset
}: Props) {
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  const getShapeName = (sides: number) => {
    const names: { [key: number]: string } = {
      3: 'Trojboký hranol',
      4: 'Čtyřboký hranol (kvádr)',
      5: 'Pětiboký hranol',
      6: 'Šestiboký hranol',
      7: 'Sedmiboký hranol',
      8: 'Osmiboký hranol',
      9: 'Devítiboký hranol',
      10: 'Desetiboký hranol',
      11: 'Jedenáctiboký hranol',
      12: 'Dvanáctiboký hranol'
    };
    return names[sides] || `${sides}-boký hranol`;
  };

  const calculateVolume = () => {
    // Calculate radius from edge length
    const radius = edgeLength / (2 * Math.sin(Math.PI / sides));
    const sideLength = edgeLength;
    const baseArea = (sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides));
    return Math.round(baseArea * height * 100) / 100; // Round to 2 decimal places
  };

  const calculateSurfaceArea = () => {
    // Calculate based on edge length
    const sideLength = edgeLength;
    const baseArea = (sides * sideLength * sideLength) / (4 * Math.tan(Math.PI / sides));
    const sideArea = sides * sideLength * height;
    return Math.round((2 * baseArea + sideArea) * 100) / 100; // Round to 2 decimal places
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white" style={{ borderRadius: '16px', border: 'none', boxShadow: 'none' }}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Vlastnosti hranolu</span>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {getShapeName(sides)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-slate-700">Počet stěn: {sides}</Label>
            <Slider
              value={[sides]}
              onValueChange={(value) => onSidesChange(value[0])}
              min={3}
              max={12}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700">Délka hrany: {edgeLength} cm</Label>
            <Slider
              value={[edgeLength]}
              onValueChange={(value) => onEdgeLengthChange(value[0])}
              min={3}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700">Výška: {height} cm</Label>
            <Slider
              value={[height]}
              onValueChange={(value) => onHeightChange(value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Grid3X3 className="h-4 w-4 text-slate-600" />
                <Label className="text-slate-700">Drátěný model</Label>
              </div>
              <Switch
                checked={isWireframe}
                onCheckedChange={onWireframeToggle}
              />
            </div>
            <div className="text-sm text-slate-500">
              {isWireframe ? 'Zobrazit pouze hrany (bez výplně)' : 'Barevné stěny s výplní'}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <Expand className="h-4 w-4 text-slate-600" />
              <Label className="text-slate-700">
                Rozbalení do sítě: {Math.round(unfoldProgress * 100)}%
              </Label>
            </div>
            <Slider
              value={[unfoldProgress]}
              onValueChange={(value) => onUnfoldProgressChange(value[0])}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            {unfoldProgress < 1 && (
              <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                {unfoldProgress === 0
                  ? '💡 Tip: Chyťte a táhněte 3D model pro otáčení'
                  : '💡 Táhněte slider pro postupné rozbalení'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Collapsible open={isPropertiesOpen} onOpenChange={setIsPropertiesOpen}>
        <Card className="bg-white" style={{ borderRadius: '16px', border: 'none', boxShadow: 'none' }}>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-4 cursor-pointer hover:bg-slate-50 transition-colors">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calculator className="mr-2 h-4 w-4 text-slate-600" />
                  <span>Matematické vlastnosti</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isPropertiesOpen ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 pt-0">
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Počet vrcholů:</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{sides * 2}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Počet hran:</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{sides * 3}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Počet stěn:</span>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{sides + 2}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Objem:</span>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200">{calculateVolume()} cm³</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700">Povrch:</span>
                <Badge className="bg-purple-50 text-purple-700 border-purple-200">{calculateSurfaceArea()} cm²</Badge>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}