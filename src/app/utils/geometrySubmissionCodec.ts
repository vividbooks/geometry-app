/** Ukládá se do sloupce `circuit_encoded` — odliší se od Elobvod base64 obvodu prefixem. */

export const GEOMETRY_SUBMISSION_PREFIX = 'geo:v1:' as const;

export type GeometryPayloadV1 = {
  points: unknown[];
  shapes: unknown[];
  freehandPaths: unknown[];
};

function toBase64Url(json: string): string {
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function fromBase64Url(b64: string): string {
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const standard = b64.replace(/-/g, '+').replace(/_/g, '/') + pad;
  return decodeURIComponent(escape(atob(standard)));
}

export function formatGeometrySubmission(snapshot: GeometryPayloadV1): string {
  const payload = {
    v: 1 as const,
    points: snapshot.points,
    shapes: snapshot.shapes,
    freehandPaths: snapshot.freehandPaths,
  };
  return `${GEOMETRY_SUBMISSION_PREFIX}${toBase64Url(JSON.stringify(payload))}`;
}

export function isGeometrySubmission(encoded: string): boolean {
  return encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX);
}

export function parseGeometrySubmission(encoded: string): GeometryPayloadV1 | null {
  if (!isGeometrySubmission(encoded)) return null;
  const raw = encoded.slice(GEOMETRY_SUBMISSION_PREFIX.length);
  try {
    const json = fromBase64Url(raw);
    const data = JSON.parse(json) as { v?: number; points?: unknown; shapes?: unknown; freehandPaths?: unknown };
    if (!data || data.v !== 1 || !Array.isArray(data.points) || !Array.isArray(data.shapes)) return null;
    return {
      points: data.points,
      shapes: data.shapes,
      freehandPaths: Array.isArray(data.freehandPaths) ? data.freehandPaths : [],
    };
  } catch {
    return null;
  }
}
