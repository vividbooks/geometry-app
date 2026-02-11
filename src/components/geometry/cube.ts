import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  MODEL_SCALE,
  sub,
  vecNormalize,
  rotateAroundAxis,
} from './shared';

export const CUBE_PARAMS: ParameterDef[] = [
  { id: 'edge', label: 'Délka hrany', min: 3, max: 20, step: 0.5, defaultValue: 10, unit: 'cm' },
];

export function computeCubeFaces(
  params: Record<string, number>,
  unfoldProgress: number
): FaceData[] {
  const a = (params.edge || 10) * MODEL_SCALE;
  const h = a / 2;

  // 8 vertices of a cube centred at origin
  //   0-3: bottom (y = +h), 4-7: top (y = -h)
  const bottom = [
    { x: -h, y:  h, z: -h }, // 0
    { x:  h, y:  h, z: -h }, // 1
    { x:  h, y:  h, z:  h }, // 2
    { x: -h, y:  h, z:  h }, // 3
  ];
  const top = [
    { x: -h, y: -h, z: -h }, // 4
    { x:  h, y: -h, z: -h }, // 5
    { x:  h, y: -h, z:  h }, // 6
    { x: -h, y: -h, z:  h }, // 7
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

export function computeCubeProperties(params: Record<string, number>): MathProperty[] {
  const a = params.edge || 10;
  return [
    { label: 'Počet vrcholů', value: '8', color: 'emerald' },
    { label: 'Počet hran', value: '12', color: 'emerald' },
    { label: 'Počet stěn', value: '6', color: 'emerald' },
    { label: 'Objem', value: `${Math.round(a * a * a * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(6 * a * a * 100) / 100} cm²`, color: 'purple' },
  ];
}
