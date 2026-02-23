import type { FaceData, MathProperty, ParameterDef } from './shared';

export const TRIANGLE_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Strana a', min: 1, max: 20, step: 0.5, defaultValue: 7, unit: 'cm' },
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
  { id: 'a',  label: 'Základna (a)',    min: 2, max: 12, step: 1, defaultValue: 8, unit: 'cm' },
  { id: 'va', label: 'Výška (vₐ)',      min: 2, max: 12, step: 1, defaultValue: 6, unit: 'cm' },
];

/**
 * General triangle: base a along x-axis, apex at (dx, va).
 * dx is the foot of the altitude — always in (0, a) so the height stays inside the base.
 * A=(0,0), B=(a,0), C=(dx, va).
 */
export function computeTriangleExerciseVertices(params: Record<string, number>): { x: number; y: number }[] {
  const a  = params.a  ?? 8;
  const va = params.va ?? 6;
  const dx = params.dx ?? a / 2;
  return [{ x: 0, y: 0 }, { x: a, y: 0 }, { x: dx, y: va }];
}

export function computeTriangleExerciseProperties(params: Record<string, number>): import('./shared').MathProperty[] {
  const a  = params.a  ?? 8;
  const va = params.va ?? 6;
  const dx = params.dx ?? a / 2;
  // Side lengths: AB=a, AC=sqrt(dx²+va²), BC=sqrt((a-dx)²+va²)
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
  const a  = Math.floor(Math.random() * 9) + 2; // 2–10
  const va = Math.floor(Math.random() * 9) + 2;
  // Random apex offset: 10%–90% of base → foot always inside base, various triangle types
  // Occasionally produce a nearly-right-angled triangle (dx ≈ 0 or dx ≈ a)
  const r = Math.random();
  let dx: number;
  if (r < 0.15) {
    dx = 0; // right angle at A
  } else if (r < 0.30) {
    dx = a; // right angle at B
  } else {
    dx = Math.round((0.15 + Math.random() * 0.70) * a * 10) / 10;
  }
  return { a, va, dx };
}
