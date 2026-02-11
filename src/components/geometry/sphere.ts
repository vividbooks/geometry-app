import {
  type FaceData,
  type MathProperty,
  type ParameterDef,
  type Point3D,
  MODEL_SCALE,
} from './shared';

const MERIDIANS = 24;
const PARALLELS = 16;

export const SPHERE_PARAMS: ParameterDef[] = [
  { id: 'radius', label: 'Poloměr', min: 2, max: 15, step: 0.5, defaultValue: 8, unit: 'cm' },
];

export function computeSphereFaces(
  params: Record<string, number>,
  _unfoldProgress: number
): FaceData[] {
  const radius = params.radius || 8;
  const R = radius * MODEL_SCALE;

  // Generate UV sphere vertices
  const verts: Point3D[][] = []; // [parallel][meridian]
  for (let p = 0; p <= PARALLELS; p++) {
    const phi = (p * Math.PI) / PARALLELS; // 0 (north pole) to PI (south pole)
    const row: Point3D[] = [];
    for (let m = 0; m < MERIDIANS; m++) {
      const theta = (m * 2 * Math.PI) / MERIDIANS;
      row.push({
        x: R * Math.sin(phi) * Math.cos(theta),
        y: -R * Math.cos(phi), // north pole at top (-y)
        z: R * Math.sin(phi) * Math.sin(theta),
      });
    }
    verts.push(row);
  }

  const faces: FaceData[] = [];

  for (let p = 0; p < PARALLELS; p++) {
    for (let m = 0; m < MERIDIANS; m++) {
      const mNext = (m + 1) % MERIDIANS;

      if (p === 0) {
        // Triangle at north pole
        faces.push({
          vertices: [verts[0][m], verts[1][m], verts[1][mNext]],
          colorIndex: (p + m) % 4 + 2,
        });
      } else if (p === PARALLELS - 1) {
        // Triangle at south pole
        faces.push({
          vertices: [verts[p][m], verts[p + 1][m], verts[p][mNext]],
          colorIndex: (p + m) % 4 + 2,
        });
      } else {
        // Quad
        faces.push({
          vertices: [verts[p][m], verts[p + 1][m], verts[p + 1][mNext], verts[p][mNext]],
          colorIndex: (p + m) % 4 + 2,
        });
      }
    }
  }

  return faces;
}

export function computeSphereProperties(params: Record<string, number>): MathProperty[] {
  const r = params.radius || 8;
  const volume = (4 / 3) * Math.PI * r * r * r;
  const surface = 4 * Math.PI * r * r;
  return [
    { label: 'Tvar', value: 'koule', color: 'emerald' },
    { label: 'Objem', value: `${Math.round(volume * 100) / 100} cm³`, color: 'purple' },
    { label: 'Povrch', value: `${Math.round(surface * 100) / 100} cm²`, color: 'purple' },
  ];
}
