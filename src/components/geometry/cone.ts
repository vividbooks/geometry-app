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

export const CONE_PARAMS: ParameterDef[] = [
  { id: 'radius', label: 'Poloměr podstavy', min: 2, max: 15, step: 0.5, defaultValue: 6, unit: 'cm' },
  { id: 'height', label: 'Výška', min: 3, max: 25, step: 0.5, defaultValue: 14, unit: 'cm' },
];

export function computeConeFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const radius = params.radius || 6;
  const height = params.height || 14;

  const R = radius * MODEL_SCALE;
  const H = height * MODEL_SCALE;

  // Base at y = +H/3, apex at y = -2H/3 (centre of mass roughly at origin)
  const yBase = H / 3;
  const yApex = -2 * H / 3;

  const base: Point3D[] = [];
  for (let i = 0; i < SEGMENTS; i++) {
    const angle = (i * 2 * Math.PI) / SEGMENTS;
    base.push({ x: Math.cos(angle) * R, y: yBase, z: Math.sin(angle) * R });
  }
  const apex: Point3D = { x: 0, y: yApex, z: 0 };

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // Base (anchor)
  faces.push({ vertices: base.map((v) => ({ ...v })), colorIndex: 0 });

  // Triangular side faces
  for (let i = 0; i < SEGMENTS; i++) {
    const next = (i + 1) % SEGMENTS;
    const hO = base[i];
    const hD = vecNormalize(sub(base[next], base[i]));
    const uApex = rotateAroundAxis(apex, hO, hD, unfoldAngle);
    faces.push({ vertices: [base[i], base[next], uApex], colorIndex: (i % 2 === 0) ? 2 : 3 });
  }

  return faces;
}

export function computeConeProperties(params: Record<string, number>): MathProperty[] {
  const r = params.radius || 6;
  const h = params.height || 14;
  const slantHeight = Math.sqrt(r * r + h * h);
  const volume = (1 / 3) * Math.PI * r * r * h;
  const surface = Math.PI * r * (r + slantHeight);
  return [
    { label: 'Podstava', value: 'kruh', color: 'emerald' },
    { label: 'Počet stěn', value: '2 (podstava + plášť)', color: 'emerald' },
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}
