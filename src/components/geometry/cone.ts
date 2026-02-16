import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  type Point3D,
  MODEL_SCALE,
} from './shared';

const SEGMENTS = 48;

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
  const t = unfoldProgress;
  const faces: FaceData[] = [];

  if (t < 0.5) {
    // ── 3D Cone (assembled) ──────────────────────────────────
    const yBase = H / 3;
    const yApex = -2 * H / 3;

    // Base circle
    const base: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      base.push({ x: Math.cos(a) * R, y: yBase, z: Math.sin(a) * R });
    }
    faces.push({ vertices: base, colorIndex: 0 });

    // Lateral triangles
    const apex: Point3D = { x: 0, y: yApex, z: 0 };
    for (let i = 0; i < SEGMENTS; i++) {
      const next = (i + 1) % SEGMENTS;
      faces.push({
        vertices: [base[i], base[next], apex],
        colorIndex: (i % 2 === 0) ? 2 : 3,
      });
    }
  } else {
    // ── Flat net (unfolded) ──────────────────────────────────
    // Everything in y=0 plane (camera goes to top-down at t=1).
    // Slant height = radius of the sector
    const S = Math.sqrt(R * R + H * H);
    // Sector angle: arc length = base circumference = 2πR, radius = S
    const theta = (2 * Math.PI * R) / S;

    // Sector (plášť): apex at origin, bisector along +x axis
    for (let i = 0; i < SEGMENTS; i++) {
      const a1 = -theta / 2 + (i / SEGMENTS) * theta;
      const a2 = -theta / 2 + ((i + 1) / SEGMENTS) * theta;
      faces.push({
        vertices: [
          { x: 0, y: 0, z: 0 },
          { x: S * Math.cos(a1), y: 0, z: S * Math.sin(a1) },
          { x: S * Math.cos(a2), y: 0, z: S * Math.sin(a2) },
        ],
        colorIndex: (i % 2 === 0) ? 2 : 3,
      });
    }

    // Base circle: tangent to the arc at its midpoint (x=S, z=0)
    // Center at (S + R, 0, 0)
    const cx = S + R;
    const baseCircle: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      baseCircle.push({
        x: cx + R * Math.cos(a),
        y: 0,
        z: R * Math.sin(a),
      });
    }
    faces.push({ vertices: baseCircle, colorIndex: 0 });
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
