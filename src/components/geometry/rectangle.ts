import type { FaceData, MathProperty, ParameterDef } from './shared';

export const RECTANGLE_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Šířka (a)', min: 1, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'b', label: 'Výška (b)', min: 1, max: 20, step: 0.5, defaultValue: 6, unit: 'cm' },
];

export function computeRectangleVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 10;
  const b = params.b ?? 6;
  return [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a, y: b },
    { x: 0, y: b },
  ];
}

export function computeRectangleFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeRectangleVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeRectangleProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 10;
  const b = params.b ?? 6;
  const perimeter = 2 * (a + b);
  const area = a * b;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
