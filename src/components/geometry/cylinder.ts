import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  type Point3D,
  MODEL_SCALE,
  sub,
  vecNormalize,
  rotateAroundAxis,
} from './shared';

const SEGMENTS = 32;

export const CYLINDER_PARAMS: ParameterDef[] = [
  { id: 'radius', label: 'Poloměr podstavy', min: 2, max: 15, step: 0.5, defaultValue: 6, unit: 'cm' },
  { id: 'height', label: 'Výška', min: 3, max: 30, step: 1, defaultValue: 14, unit: 'cm' },
];

export function computeCylinderFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const radius = params.radius || 6;
  const height = params.height || 14;

  const R = radius * MODEL_SCALE;
  const H = height * MODEL_SCALE;

  const bottom: Point3D[] = [];
  const top: Point3D[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i * 2 * Math.PI) / SEGMENTS;
    const cx = Math.cos(angle) * R;
    const cz = Math.sin(angle) * R;
    bottom.push({ x: cx, y: H / 2, z: cz });
    top.push({ x: cx, y: -H / 2, z: cz });
  }

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // Bottom base (anchor)
  faces.push({ vertices: bottom.map((v) => ({ ...v })), colorIndex: 0 });

  // Side faces (quads)
  for (let i = 0; i < SEGMENTS; i++) {
    const next = (i + 1) % SEGMENTS;
    const hO = bottom[i];
    const hD = vecNormalize(sub(bottom[next], bottom[i]));
    const uTopI = rotateAroundAxis(top[i], hO, hD, unfoldAngle);
    const uTopNext = rotateAroundAxis(top[next], hO, hD, unfoldAngle);
    faces.push({ vertices: [bottom[i], bottom[next], uTopNext, uTopI], colorIndex: (i % 2 === 0) ? 2 : 3 });
  }

  // Top base (chain via side 0)
  const h0O = bottom[0];
  const h0D = vecNormalize(sub(bottom[1], bottom[0]));
  const topA = top.map((v) => rotateAroundAxis(v, h0O, h0D, unfoldAngle));
  const hBO = topA[0];
  const hBD = vecNormalize(sub(topA[1], topA[0]));
  const topFinal = topA.map((v) => rotateAroundAxis(v, hBO, hBD, unfoldAngle));
  faces.push({ vertices: topFinal.slice().reverse(), colorIndex: 1 });

  return faces;
}

export function computeCylinderProperties(params: Record<string, number>): MathProperty[] {
  const r = params.radius || 6;
  const h = params.height || 14;
  const volume = Math.PI * r * r * h;
  const surface = 2 * Math.PI * r * (r + h);
  return [
    { label: 'Podstava', value: 'kruh', color: 'emerald' },
    { label: 'Počet stěn', value: '3 (2 podstavy + plášť)', color: 'emerald' },
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}
