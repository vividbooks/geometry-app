import type { FaceData, MathProperty, ParameterDef } from './shared';

export const TRIANGLE_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Strana a', min: 1, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'b', label: 'Strana b', min: 1, max: 20, step: 0.5, defaultValue: 6, unit: 'cm' },
  { id: 'c', label: 'Strana c', min: 1, max: 20, step: 0.5, defaultValue: 5, unit: 'cm' },
];

export function isValidTriangle(a: number, b: number, c: number): boolean {
  return a + b > c && a + c > b && b + c > a;
}

/**
 * Vertices: A at (0,0), B at (c, 0), C derived via law of cosines.
 * Side a = BC, side b = AC, side c = AB.
 */
export function computeTriangleVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a = params.a ?? 7;
  const b = params.b ?? 6;
  const c = params.c ?? 5;

  if (c <= 0) return [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0.5, y: 0.5 }];

  // x_C = (b² + c² - a²) / (2c), y_C = sqrt(b² - x_C²)
  const x = (b * b + c * c - a * a) / (2 * c);
  const y2 = b * b - x * x;
  const y = y2 >= 0 ? Math.sqrt(y2) : 0;

  return [{ x: 0, y: 0 }, { x: c, y: 0 }, { x, y }];
}

export function computeTriangleFaces(params: Record<string, number>, _unfold: number): FaceData[] {
  const verts = computeTriangleVertices(params);
  return [{ vertices: verts.map((v) => ({ x: v.x, y: v.y, z: 0 })), colorIndex: 0 }];
}

export function computeTriangleProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a ?? 7;
  const b = params.b ?? 6;
  const c = params.c ?? 5;

  const perimeter = a + b + c;
  const s = perimeter / 2;
  const areaSquared = s * (s - a) * (s - b) * (s - c);
  const area = areaSquared >= 0 ? Math.sqrt(areaSquared) : 0;
  const fmt = (v: number) => Math.round(v * 100) / 100;

  return [
    { label: 'Počet stran', value: '3', color: 'emerald' },
    { label: 'Obvod', value: `${fmt(perimeter)} cm`, color: 'purple' },
    { label: 'Obsah', value: `${fmt(area)} cm²`, color: 'purple' },
  ];
}

/** Generate a random valid triangle with sides in [3, 10] */
export function generateTriangleParams(): Record<string, number> {
  let a: number, b: number, c: number;
  do {
    a = Math.floor(Math.random() * 8) + 3; // 3–10
    b = Math.floor(Math.random() * 8) + 3;
    c = Math.floor(Math.random() * 8) + 3;
  } while (!isValidTriangle(a, b, c));
  return { a, b, c };
}

// ── Exercise variant: base (a) + height (va) ──────────────────────────────

export const TRIANGLE_EXERCISE_PARAMS: import('./shared').ParameterDef[] = [
  { id: 'a',  label: 'Základna (a)',    min: 2, max: 12, step: 1, defaultValue: 10, unit: 'cm' },
  { id: 'va', label: 'Výška (vₐ)',      min: 2, max: 12, step: 1, defaultValue: 6, unit: 'cm' },
];

/**
 * Obtuse triangle: base a along x-axis, apex at (dx, va).
 * dx is always outside [0, a] so the altitude foot lies outside the base,
 * giving a clearly obtuse angle at A (dx < 0) or B (dx > a).
 * A=(0,0), B=(a,0), C=(dx, va).
 */
export function computeTriangleExerciseVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a  = params.a  ?? 8;
  const va = params.va ?? 6;
  // Default: apex overhangs to the left by 25 % of base → clearly obtuse at A
  const dx = params.dx !== undefined ? params.dx : -a * 0.25;
  return [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: dx, y: va }];
}

export function computeTriangleExerciseProperties(params: Record<string, number>): import('./shared').MathProperty[] {
  const a  = params.a  ?? 8;
  const va = params.va ?? 6;
  const dx = params.dx !== undefined ? params.dx : -a * 0.25;
  const sideAC = Math.sqrt(dx ** 2 + va ** 2);
  const sideBC = Math.sqrt((a - dx) ** 2 + va ** 2);
  const perimeter = a + sideAC + sideBC;
  const area = (a * va) / 2;
  const fmt = (v: number) => Math.round(v * 100) / 100;
  return [
    { label: 'Počet stran', value: '3', color: 'emerald' },
    { label: 'Obvod', value: `${fmt(perimeter)} cm`, color: 'purple' },
    { label: 'Obsah', value: `${fmt(area)} cm²`, color: 'purple' },
  ];
}

export function generateTriangleExerciseParams(): Record<string, number> {
  const a  = Math.floor(Math.random() * 7) + 4; // 4–10
  const va = Math.floor(Math.random() * 7) + 3; // 3–9
  // Always obtuse: apex outside the base (dx < 0 → obtuse at A, dx > a → obtuse at B)
  const leftSide = Math.random() < 0.5;
  const overhang = Math.round((0.2 + Math.random() * 0.4) * a * 10) / 10;
  const dx = leftSide ? -overhang : a + overhang;
  return { a, va, dx };
}
