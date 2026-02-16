import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  type Point3D,
  MODEL_SCALE,
} from './shared';

const SEGMENTS = 48;

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
  const t = unfoldProgress;
  const circ = 2 * Math.PI * R;
  const faces: FaceData[] = [];

  if (t < 0.5) {
    // ── 3D Cylinder (assembled) ──────────────────────────────
    // Bottom cap
    const bottomCap: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      bottomCap.push({ x: R * Math.cos(a), y: H / 2, z: R * Math.sin(a) });
    }
    faces.push({ vertices: bottomCap, colorIndex: 0 });

    // Top cap
    const topCap: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      topCap.push({ x: R * Math.cos(a), y: -H / 2, z: R * Math.sin(a) });
    }
    faces.push({ vertices: topCap.slice().reverse(), colorIndex: 1 });

    // Lateral surface
    for (let i = 0; i < SEGMENTS; i++) {
      const a1 = (i * 2 * Math.PI) / SEGMENTS;
      const a2 = ((i + 1) * 2 * Math.PI) / SEGMENTS;
      faces.push({
        vertices: [
          { x: R * Math.cos(a1), y: H / 2, z: R * Math.sin(a1) },
          { x: R * Math.cos(a2), y: H / 2, z: R * Math.sin(a2) },
          { x: R * Math.cos(a2), y: -H / 2, z: R * Math.sin(a2) },
          { x: R * Math.cos(a1), y: -H / 2, z: R * Math.sin(a1) },
        ],
        colorIndex: 2,
      });
    }
  } else {
    // ── Flat net (unfolded) ──────────────────────────────────
    // Everything in y=0 plane (camera goes to top-down at t=1).
    // Rectangle (plášť): x ∈ [-circ/2, +circ/2], z ∈ [-H/2, +H/2]
    for (let i = 0; i < SEGMENTS; i++) {
      const x1 = (i / SEGMENTS) * circ - circ / 2;
      const x2 = ((i + 1) / SEGMENTS) * circ - circ / 2;
      faces.push({
        vertices: [
          { x: x1, y: 0, z: -H / 2 },
          { x: x2, y: 0, z: -H / 2 },
          { x: x2, y: 0, z: H / 2 },
          { x: x1, y: 0, z: H / 2 },
        ],
        colorIndex: 2,
      });
    }

    // Bottom circle: tangent to long edge z = +H/2, center at (0, 0, H/2 + R)
    const bottomCircle: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      bottomCircle.push({
        x: R * Math.cos(a),
        y: 0,
        z: H / 2 + R + R * Math.sin(a),
      });
    }
    faces.push({ vertices: bottomCircle, colorIndex: 0 });

    // Top circle: tangent to long edge z = -H/2, center at (0, 0, -H/2 - R)
    const topCircle: Point3D[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i * 2 * Math.PI) / SEGMENTS;
      topCircle.push({
        x: R * Math.cos(a),
        y: 0,
        z: -H / 2 - R + R * Math.sin(a),
      });
    }
    faces.push({ vertices: topCircle.slice().reverse(), colorIndex: 1 });
  }

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
