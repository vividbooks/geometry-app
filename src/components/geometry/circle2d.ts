import type { FaceData, MathProperty, ParameterDef } from './shared';

const SEGMENTS = 64;

export const CIRCLE2D_PARAMS: ParameterDef[] = [
  { id: 'r', label: 'Poloměr (r)', min: 1, max: 15, step: 0.5, defaultValue: 7, unit: 'cm' },
];

export function computeCircle2DVertices(params: Record<string, number>): { x: number; y: number }[] {
  const r = params.r ?? 7;
  const verts: { x: number; y: number }[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i * 2 * Math.PI) / SEGMENTS;
    verts.push({ x: r + Math.cos(angle) * r, y: r + Math.sin(angle) * r });
  }
  return verts;
}

export function computeCircle2DFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeCircle2DVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeCircle2DProperties(params: Record<string, number>): MathProperty[] {
  const r = params.r ?? 7;
  const perimeter = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  return [
    { label: 'Průměr', value: `${Math.round(2 * r * 100) / 100} cm`, color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
    { label: 'Obsah', value: `${Math.round(area * 100) / 100} cm²`, color: 'purple' },
  ];
}
