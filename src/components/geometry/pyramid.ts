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

export const PYRAMID_PARAMS: ParameterDef[] = [
  { id: 'sides', label: 'Počet stěn podstavy', min: 3, max: 8, step: 1, defaultValue: 4, unit: '' },
  { id: 'edgeLength', label: 'Délka hrany podstavy', min: 3, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'height', label: 'Výška', min: 3, max: 25, step: 0.5, defaultValue: 12, unit: 'cm' },
];

export function computePyramidFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const sides = Math.round(params.sides || 4);
  const edgeLength = params.edgeLength || 10;
  const height = params.height || 12;

  const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
  const R = baseRadius * MODEL_SCALE;
  const H = height * MODEL_SCALE;

  // Base vertices at y = +H/3 (shift so centroid roughly at origin)
  const yBase = H / 3;
  const yApex = -2 * H / 3;

  const base: Point3D[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides;
    base.push({ x: Math.cos(angle) * R, y: yBase, z: Math.sin(angle) * R });
  }
  const apex: Point3D = { x: 0, y: yApex, z: 0 };

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // Base face (anchor)
  faces.push({ vertices: base.map((v) => ({ ...v })), colorIndex: 0 });

  // Triangular side faces — each hinges around its base edge
  for (let i = 0; i < sides; i++) {
    const next = (i + 1) % sides;
    const hO = base[i];
    const hD = vecNormalize(sub(base[next], base[i]));
    const uApex = rotateAroundAxis(apex, hO, hD, unfoldAngle);
    faces.push({ vertices: [base[i], base[next], uApex], colorIndex: i + 2 });
  }

  return faces;
}

export function computePyramidProperties(params: Record<string, number>): MathProperty[] {
  const sides = Math.round(params.sides || 4);
  const edgeLength = params.edgeLength || 10;
  const height = params.height || 12;

  const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
  const baseArea = (sides * edgeLength * edgeLength) / (4 * Math.tan(Math.PI / sides));

  // Slant height of triangular face
  const apothem = baseRadius * Math.cos(Math.PI / sides);
  const slantHeight = Math.sqrt(height * height + apothem * apothem);
  const lateralArea = (sides * edgeLength * slantHeight) / 2;

  const volume = (1 / 3) * baseArea * height;
  const surface = baseArea + lateralArea;

  return [
    { label: 'Počet vrcholů', value: `${sides + 1}`, color: 'emerald' },
    { label: 'Počet hran', value: `${sides * 2}`, color: 'emerald' },
    { label: 'Počet stěn', value: `${sides + 1}`, color: 'emerald' },
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}
