// ===================== Types =====================

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface FaceData {
  vertices: Point3D[];
  colorIndex: number;
}

/** Popisek rozměru ve drátěném režimu (poloměr, výška) – používá se u válce, kužele, koule, jehlanu */
export interface WireframeDimension {
  label: string;
  value: string;
  position: Point3D;
}

export interface ParameterDef {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface MathProperty {
  label: string;
  value: string;
  color: 'emerald' | 'purple';
}

// ===================== Vector Math =====================

export function sub(a: Point3D, b: Point3D): Point3D {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

export function add(a: Point3D, b: Point3D): Point3D {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function scale(v: Point3D, s: number): Point3D {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

export function vecNormalize(v: Point3D): Point3D {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len < 1e-10) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

export function vecDot(a: Point3D, b: Point3D): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function vecCross(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function vecLength(v: Point3D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

// ===================== Rodrigues Rotation =====================

/**
 * Rotate `point` around an axis defined by `origin` + `dir` (unit vector)
 * by `angle` radians using Rodrigues' rotation formula.
 */
export function rotateAroundAxis(
  point: Point3D,
  origin: Point3D,
  dir: Point3D,
  angle: number
): Point3D {
  if (Math.abs(angle) < 1e-10) return { ...point };
  const p = sub(point, origin);
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const d = vecDot(p, dir);
  const cr = vecCross(dir, p);
  return {
    x: p.x * cosA + cr.x * sinA + dir.x * d * (1 - cosA) + origin.x,
    y: p.y * cosA + cr.y * sinA + dir.y * d * (1 - cosA) + origin.y,
    z: p.z * cosA + cr.z * sinA + dir.z * d * (1 - cosA) + origin.z,
  };
}

// ===================== Camera Rotations =====================

/** Rotate around global X axis (for camera pitch) */
export function rotateXGlobal(point: Point3D, angle: number): Point3D {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: point.x, y: point.y * c - point.z * s, z: point.y * s + point.z * c };
}

/** Rotate around global Y axis (for camera yaw) */
export function rotateYGlobal(point: Point3D, angle: number): Point3D {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: point.x * c + point.z * s, y: point.y, z: -point.x * s + point.z * c };
}

// ===================== Color Palettes =====================

export const DEFAULT_COLOR_PALETTE = [
  '#4263f5', // Blue       – bottom base / face 0
  '#ff5c7a', // Pink/Red   – top base / face 1
  '#00e0d1', // Turquoise
  '#1f316f', // Dark Blue
  '#ff9f43', // Orange
  '#7a1f25', // Dark Red
  '#e8b3e8', // Light Pink
  '#1f9f7a', // Green
  '#5a9fff', // Light Blue
  '#e74c5a', // Red
  '#4263f5', // Blue (repeat)
  '#555555', // Gray
  '#00e0d1',
  '#ff9f43',
  '#1f316f',
  '#7a1f25',
  '#e8b3e8',
  '#1f9f7a',
  '#5a9fff',
  '#e74c5a',
  '#4263f5',
  '#555555',
  '#00e0d1',
  '#ff9f43',
  '#1f316f',
  '#7a1f25',
  '#e8b3e8',
  '#1f9f7a',
  '#5a9fff',
  '#e74c5a',
  '#4263f5',
  '#555555',
  '#00e0d1',
  '#ff9f43',
];

// ===================== Shared Scale Constant =====================

/** Model-space units per centimetre */
export const MODEL_SCALE = 8;
