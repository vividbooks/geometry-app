import type { FaceData, MathProperty, ParameterDef } from './shared';

export const TRIANGLE_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Základna (a)', min: 2, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'va', label: 'Výška k a (vₐ)', min: 1, max: 20, step: 0.5, defaultValue: 8, unit: 'cm' },
];

export function computeTriangleVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 10;
  const va = params.va ?? 8;
  return [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a / 2, y: va },
  ];
}

export function computeTriangleFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeTriangleVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeTriangleProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 10;
  const va = params.va ?? 8;
  // Isosceles: apex at (a/2, va), base corners at (0,0) and (a,0)
  const sideB = Math.sqrt((a / 2) ** 2 + va ** 2);
  const perimeter = a + 2 * sideB;
  const area = (a * va) / 2;
  return [
    { label: 'Počet stran', value: '3', color: 'emerald' },
    { label: 'Strana b = c', value: `${Math.round(sideB * 100) / 100} cm`, color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
