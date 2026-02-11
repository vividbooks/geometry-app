import type { FaceData, MathProperty, ParameterDef } from './shared';

export const TRAPEZOID_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Horní základna (a)', min: 2, max: 18, step: 0.5, defaultValue: 6, unit: 'cm' },
  { id: 'c', label: 'Dolní základna (c)', min: 3, max: 20, step: 0.5, defaultValue: 12, unit: 'cm' },
  { id: 'v', label: 'Výška (v)', min: 1, max: 15, step: 0.5, defaultValue: 7, unit: 'cm' },
];

export function computeTrapezoidVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 6;
  const c = params.c ?? 12;
  const v = params.v ?? 7;
  const offset = (c - a) / 2;
  return [
    { x: 0, y: 0 },
    { x: c, y: 0 },
    { x: c - offset, y: v },
    { x: offset, y: v },
  ];
}

export function computeTrapezoidFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeTrapezoidVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeTrapezoidProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 6;
  const c = params.c ?? 12;
  const v = params.v ?? 7;
  const offset = (c - a) / 2;
  const side = Math.sqrt(offset * offset + v * v);
  const perimeter = a + c + 2 * side;
  const area = ((a + c) * v) / 2;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Rameno', value: `${Math.round(side * 100) / 100} cm`, color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
