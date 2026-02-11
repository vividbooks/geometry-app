import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  MODEL_SCALE,
  sub,
  vecNormalize,
  rotateAroundAxis,
} from './shared';

export const CUBOID_PARAMS: ParameterDef[] = [
  { id: 'a', label: 'Šířka (a)', min: 2, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
  { id: 'b', label: 'Hloubka (b)', min: 2, max: 20, step: 0.5, defaultValue: 6, unit: 'cm' },
  { id: 'c', label: 'Výška (c)', min: 2, max: 20, step: 0.5, defaultValue: 8, unit: 'cm' },
];

export function computeCuboidFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const wa = (params.a || 10) * MODEL_SCALE / 2;
  const wb = (params.b || 6) * MODEL_SCALE / 2;
  const hc = (params.c || 8) * MODEL_SCALE / 2;

  // Bottom (y = +hc) and top (y = -hc)
  const bottom = [
    { x: -wa, y:  hc, z: -wb },
    { x:  wa, y:  hc, z: -wb },
    { x:  wa, y:  hc, z:  wb },
    { x: -wa, y:  hc, z:  wb },
  ];
  const top = [
    { x: -wa, y: -hc, z: -wb },
    { x:  wa, y: -hc, z: -wb },
    { x:  wa, y: -hc, z:  wb },
    { x: -wa, y: -hc, z:  wb },
  ];

  const unfoldAngle = unfoldProgress * (Math.PI / 2);
  const faces: FaceData[] = [];

  // Bottom base (anchor)
  faces.push({ vertices: [...bottom], colorIndex: 0 });

  // 4 side faces
  for (let i = 0; i < 4; i++) {
    const next = (i + 1) % 4;
    const hO = bottom[i];
    const hD = vecNormalize(sub(bottom[next], bottom[i]));
    const uTopI = rotateAroundAxis(top[i], hO, hD, unfoldAngle);
    const uTopNext = rotateAroundAxis(top[next], hO, hD, unfoldAngle);
    faces.push({ vertices: [bottom[i], bottom[next], uTopNext, uTopI], colorIndex: i + 2 });
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

export function computeCuboidProperties(params: Record<string, number>): MathProperty[] {
  const a = params.a || 10;
  const b = params.b || 6;
  const c = params.c || 8;
  return [
    { label: 'Počet vrcholů', value: '8', color: 'emerald' },
    { label: 'Počet hran', value: '12', color: 'emerald' },
    { label: 'Počet stěn', value: '6', color: 'emerald' },
    { label: 'Objem', value: `${Math.round(a * b * c * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(2 * (a * b + b * c + a * c) * 100) / 100} cm²`, color: 'purple' },
  ];
}
