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

// ── Obvod exercise variant: explicit 4 sides a, b, c, d ──────────────────────

export const TRAPEZOID_PERIMETER_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Strana a (horní základna)', min: 2, max: 12, step: 1, defaultValue: 5, unit: 'cm' },
  { id: 'b', label: 'Strana b (levé rameno)',    min: 2, max: 10, step: 1, defaultValue: 4, unit: 'cm' },
  { id: 'c', label: 'Strana c (dolní základna)', min: 4, max: 16, step: 1, defaultValue: 10, unit: 'cm' },
  { id: 'd', label: 'Strana d (pravé rameno)',   min: 2, max: 10, step: 1, defaultValue: 6, unit: 'cm' },
];

export function computeTrapezoidPerimeterVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 5;
  const b = params.b ?? 4;
  const c = params.c ?? 10;
  const d = params.d ?? 6;
  // A=(0,0), B=(c,0), D=(xD,yD), C=(xD+a,yD)
  // From AD=b and BC=d: solve for xD
  const denom = 2 * (a - c); // negative when c > a
  const xD = denom !== 0 ? (d * d - b * b - (a - c) * (a - c)) / denom : 0;
  const yD2 = b * b - xD * xD;
  const yD = yD2 > 0 ? Math.sqrt(yD2) : 2;
  return [{ x: 0, y: 0 }, { x: c, y: 0 }, { x: xD + a, y: yD }, { x: xD, y: yD }];
}

export function computeTrapezoidPerimeterProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 5;
  const b = params.b ?? 4;
  const c = params.c ?? 10;
  const d = params.d ?? 6;
  const perimeter = a + b + c + d;
  return [
    { label: 'Počet stran', value: '4', color: 'emerald' },
    { label: 'Obvod', value: `${Math.round(perimeter * 100) / 100} cm`, color: 'purple' },
  ];
}

export function generateTrapezoidPerimeterParams(): Record<string, number> {
  const c = 8 + Math.floor(Math.random() * 5);   // 8–12
  const a = 3 + Math.floor(Math.random() * 4);   // 3–6, always < c
  const h = 3 + Math.floor(Math.random() * 5);   // 3–7 (height)
  const maxOff = Math.max(1, c - a - 1);
  const offset = 1 + Math.floor(Math.random() * maxOff);
  const b = Math.round(Math.sqrt(offset * offset + h * h) * 10) / 10;
  const d = Math.round(Math.sqrt((c - a - offset) ** 2 + h * h) * 10) / 10;
  return { a, b, c, d };
}
