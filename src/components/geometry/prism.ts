import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  MODEL_SCALE,
  sub,
  vecNormalize,
  rotateAroundAxis,
} from './shared';

// ── Parameter definitions ──────────────────────────────────

export const PRISM_PARAMS: ParameterDef[] = [
  { id: 'sides', label: 'Počet podstavných hran', min: 3, max: 12, step: 1, defaultValue: 6, unit: '' },
  { id: 'edgeLength', label: 'Délka hrany', min: 3, max: 20, step: 0.5, defaultValue: 8, unit: 'cm' },
  { id: 'height', label: 'Výška', min: 5, max: 30, step: 1, defaultValue: 15, unit: 'cm' },
];

// ── Face computation ───────────────────────────────────────

export function computePrismFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const sides = Math.round(params.sides || 6);
  const edgeLength = params.edgeLength || 8;
  const height = params.height || 15;

  const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
  const R = baseRadius * MODEL_SCALE;
  const H = height * MODEL_SCALE;

  const bottom = [];
  const top = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    const cx = Math.cos(angle) * R;
    const cz = Math.sin(angle) * R;
    bottom.push({ x: cx, y: H / 2, z: cz });
    top.push({ x: cx, y: -H / 2, z: cz });
  }

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // Bottom base (anchor)
  faces.push({ vertices: bottom.map((v) => ({ ...v })), colorIndex: 0 });

  // Side faces
  for (let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    const hO = bottom[i];
    const hD = vecNormalize(sub(bottom[next], bottom[i]));
    const uTopI = rotateAroundAxis(top[i], hO, hD, unfoldAngle);
    const uTopNext = rotateAroundAxis(top[next], hO, hD, unfoldAngle);
    faces.push({ vertices: [bottom[i], bottom[next], uTopNext, uTopI], colorIndex: i + 2 });
  }

  // Top base (chain unfold via side 0)
  const h0O = bottom[0];
  const h0D = vecNormalize(sub(bottom[1], bottom[0]));
  const topA = top.map((v) => rotateAroundAxis(v, h0O, h0D, unfoldAngle));
  const hBO = topA[0];
  const hBD = vecNormalize(sub(topA[1], topA[0]));
  const topFinal = topA.map((v) => rotateAroundAxis(v, hBO, hBD, unfoldAngle));
  faces.push({ vertices: topFinal.slice().reverse(), colorIndex: 1 });

  return faces;
}

// ── Objem exercise: base area (Sp) + height (h) ───────────────────────────────

export const PRISM_VOLUME_PARAMS: ParameterDef[] = [
  { id: 'Sp', label: 'Obsah podstavy (Sp)', min: 4, max: 200, step: 1, defaultValue: 48, unit: 'cm²' },
  { id: 'h',  label: 'Výška (h)',            min: 2, max: 30,  step: 1, defaultValue: 10, unit: 'cm' },
];

export function computePrismVolumeProperties(params: Record<string, number>): MathProperty[] {
  const Sp = params.Sp ?? 48;
  const h  = params.h  ?? 10;
  const volume = Sp * h;
  return [
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
  ];
}

export function generatePrismVolumeParams(): Record<string, number> {
  const Sp = (4 + Math.floor(Math.random() * 10)) * (2 + Math.floor(Math.random() * 6)); // product of two small ints
  const h  = 4 + Math.floor(Math.random() * 12);
  return { Sp, h };
}

// ── Povrch exercise: base area (Sp) + base perimeter (Op) + height (h) ────────

export const PRISM_SURFACE_PARAMS: ParameterDef[] = [
  { id: 'Sp', label: 'Obsah podstavy (Sp)', min: 4, max: 200, step: 1, defaultValue: 48, unit: 'cm²' },
  { id: 'Op', label: 'Obvod podstavy (Op)', min: 6, max: 80,  step: 1, defaultValue: 28, unit: 'cm' },
  { id: 'h',  label: 'Výška (h)',            min: 2, max: 30,  step: 1, defaultValue: 10, unit: 'cm' },
];

export function computePrismSurfaceProperties(params: Record<string, number>): MathProperty[] {
  const Sp = params.Sp ?? 48;
  const Op = params.Op ?? 28;
  const h  = params.h  ?? 10;
  const surface = 2 * Sp + Op * h;
  return [
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}

export function generatePrismSurfaceParams(): Record<string, number> {
  // Regular n-gon prism: pick sides and edge length, derive Sp and Op
  const sides = 3 + Math.floor(Math.random() * 4); // 3–6
  const edge  = 4 + Math.floor(Math.random() * 8); // 4–11
  const Sp = Math.round((sides * edge * edge) / (4 * Math.tan(Math.PI / sides)));
  const Op = sides * edge;
  const h  = 4 + Math.floor(Math.random() * 12);
  return { Sp, h, Op };
}

// ── Math properties ────────────────────────────────────────

export function computePrismProperties(params: Record<string, number>): MathProperty[] {
  const sides = Math.round(params.sides || 6);
  const edgeLength = params.edgeLength || 8;
  const height = params.height || 15;
  const baseArea = (sides * edgeLength * edgeLength) / (4 * Math.tan(Math.PI / sides));
  const sideArea = sides * edgeLength * height;
  const volume = baseArea * height;
  const surface = 2 * baseArea + sideArea;

  return [
    { label: 'Počet vrcholů', value: `${sides * 2}`, color: 'emerald' },
    { label: 'Počet hran', value: `${sides * 3}`, color: 'emerald' },
    { label: 'Počet stěn', value: `${sides + 2}`, color: 'emerald' },
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}
