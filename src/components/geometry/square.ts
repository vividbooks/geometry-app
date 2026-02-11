import type { FaceData, MathProperty, ParameterDef } from './shared';

export const SQUARE_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Délka strany (a)', min: 1, max: 20, step: 0.5, defaultValue: 8, unit: 'cm' },
];

export function computeSquareVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 8;
  return [
    { x: 0, y: 0 },
    { x: a, y: 0 },
    { x: a, y: a },
    { x: 0, y: a },
  ];
}

export function computeSquareFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeSquareVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeSquareProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 8;
  const perimeter = 4 * a;
  const area = a * a;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
