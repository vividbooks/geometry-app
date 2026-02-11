import type { FaceData, MathProperty, ParameterDef } from './shared';

export const RHOMBUS_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Délka strany (a)', min: 2, max: 20, step: 0.5, defaultValue: 8, unit: 'cm' },
  { id: 'va', label: 'Výška (vₐ)', min: 1, max: 18, step: 0.5, defaultValue: 6, unit: 'cm' },
];

export function computeRhombusVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 8;
  const va = params.va ?? 6;
  const dx = Math.sqrt(Math.max(0, a * a - va * va));
  return [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a + dx, y: va },
    { x: dx, y: va },
  ];
}

export function computeRhombusFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeRhombusVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeRhombusProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 8;
  const va = params.va ?? 6;
  const perimeter = 4 * a;
  const area = a * va;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
