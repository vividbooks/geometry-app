import type { Point3D, WireframeDimension } from './shared';
import { MODEL_SCALE } from './shared';

/**
 * Vrátí jen potřebné rozměry pro drátěný režim u každého tělesa
 * (jedna hodnota typu a, b, c, r, v podle tvaru).
 */
export function getWireframeDimensions(
  objectId: string,
  params: Record<string, number>
): WireframeDimension[] | undefined {
  const fmt = (v: number, unit: string) =>
    v >= 10 ? `${Math.round(v)} ${unit}` : `${v.toFixed(1)} ${unit}`;

  switch (objectId) {
    case 'krychle': {
      const edge = params.edge ?? 10;
      const a = edge * MODEL_SCALE;
      const h = a / 2;
      return [
        { label: 'a', value: fmt(edge, 'cm'), position: { x: 0, y: h, z: -h } },
      ];
    }
    case 'kvadr': {
      const aVal = params.a ?? 10;
      const bVal = params.b ?? 6;
      const cVal = params.c ?? 8;
      const wa = (aVal * MODEL_SCALE) / 2;
      const wb = (bVal * MODEL_SCALE) / 2;
      const hc = (cVal * MODEL_SCALE) / 2;
      return [
        { label: 'a', value: fmt(aVal, 'cm'), position: { x: 0, y: hc, z: -wb } },
        { label: 'b', value: fmt(bVal, 'cm'), position: { x: wa, y: hc, z: 0 } },
        { label: 'c', value: fmt(cVal, 'cm'), position: { x: wa, y: 0, z: wb } },
      ];
    }
    case 'hranol': {
      const sides = Math.round(params.sides ?? 6);
      const edgeLength = params.edgeLength ?? 8;
      const height = params.height ?? 15;
      const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
      const R = baseRadius * MODEL_SCALE;
      const H = height * MODEL_SCALE;
      const angle1 = (2 * Math.PI) / sides;
      const midEdgeX = R * (1 + Math.cos(angle1)) / 2;
      const midEdgeZ = R * Math.sin(angle1) / 2;
      return [
        { label: 'a', value: fmt(edgeLength, 'cm'), position: { x: midEdgeX, y: H / 2, z: midEdgeZ } },
        { label: 'v', value: fmt(height, 'cm'), position: { x: 0, y: 0, z: 0 } },
      ];
    }
    case 'jehlan': {
      const sides = Math.round(params.sides ?? 4);
      const edgeLength = params.edgeLength ?? 10;
      const height = params.height ?? 12;
      const baseRadius = edgeLength / (2 * Math.sin(Math.PI / sides));
      const R = baseRadius * MODEL_SCALE;
      const H = height * MODEL_SCALE;
      const yBase = H / 3;
      const yApex = -2 * H / 3;
      const angle1 = (2 * Math.PI) / sides;
      const midEdgeX = R * (1 + Math.cos(angle1)) / 2;
      const midEdgeZ = R * Math.sin(angle1) / 2;
      return [
        { label: 'a', value: fmt(edgeLength, 'cm'), position: { x: midEdgeX, y: yBase, z: midEdgeZ } },
        { label: 'v', value: fmt(height, 'cm'), position: { x: 0, y: (yBase + yApex) / 2, z: 0 } },
      ];
    }
    case 'valec': {
      const radius = params.radius ?? 6;
      const height = params.height ?? 14;
      const R = radius * MODEL_SCALE;
      const H = height * MODEL_SCALE;
      return [
        { label: 'r', value: fmt(radius, 'cm'), position: { x: R / 2, y: H / 2, z: 0 } },
        { label: 'v', value: fmt(height, 'cm'), position: { x: 0, y: 0, z: 0 } },
      ];
    }
    case 'kuzel': {
      const radius = params.radius ?? 6;
      const height = params.height ?? 14;
      const R = radius * MODEL_SCALE;
      const H = height * MODEL_SCALE;
      const yBase = H / 3;
      const yApex = -2 * H / 3;
      return [
        { label: 'r', value: fmt(radius, 'cm'), position: { x: R / 2, y: yBase, z: 0 } },
        { label: 'v', value: fmt(height, 'cm'), position: { x: 0, y: (yBase + yApex) / 2, z: 0 } },
      ];
    }
    case 'koule': {
      const radius = params.radius ?? 8;
      const R = radius * MODEL_SCALE;
      return [
        { label: 'r', value: fmt(radius, 'cm'), position: { x: R / 2, y: 0, z: 0 } },
      ];
    }
    default:
      return undefined;
  }
}
