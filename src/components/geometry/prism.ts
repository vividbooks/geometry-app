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
  { id: 'sides', label: 'Počet stěn', min: 3, max: 12, step: 1, defaultValue: 6, unit: '' },
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
