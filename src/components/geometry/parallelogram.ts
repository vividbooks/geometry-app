import type { FaceData, MathProperty, ParameterDef } from './shared';

export const PARALLELOGRAM_PARAMS: ParameterDef[] = [
  { id: 'a',  label: 'Strana a (základna)', min: 2, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'b',  label: 'Strana b',            min: 2, max: 20, step: 0.5, defaultValue: 7,  unit: 'cm' },
  { id: 'va', label: 'Výška (vₐ)',          min: 1, max: 18, step: 0.5, defaultValue: 5,  unit: 'cm' },
];

export function isValidParallelogram(b: number, va: number): boolean {
  return va < b;
}

/**
 * Vertices: A(0,0), B(a,0), C(a+dx, va), D(dx, va)
 * where dx = sqrt(b² - va²) — horizontal offset of slanted side.
 */
export function computeParallelogramVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a  = params.a  ?? 10;
  const b  = params.b  ?? 7;
  const va = params.va ?? 5;
  const dx = Math.sqrt(Math.max(0, b * b - va * va));
  return [
    { x: 0,      y: 0  },
    { x: a,      y: 0  },
    { x: a + dx, y: va },
    { x: dx,     y: va },
  ];
}

export function computeParallelogramFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeParallelogramVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeParallelogramProperties(params: Record<string, number>): MathProperty[] {
  const a  = params.a  ?? 10;
  const b  = params.b  ?? 7;
  const va = params.va ?? 5;
  const perimeter = 2 * (a + b);
  const area = a * va;
  const fmt = (v: number) => Math.round(v * 100) / 100;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Obvod', value: `${fmt(perimeter)} cm`, color: 'purple' },
    { label: 'Obsah', value: `${fmt(area)} cm²`, color: 'purple' },
  ];
}
