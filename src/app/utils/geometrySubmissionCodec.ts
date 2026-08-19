/** Ukládá se do sloupce `circuit_encoded` — odliší se od Elobvod base64 obvodu prefixem. */

export const GEOMETRY_SUBMISSION_PREFIX = 'geo:v1:' as const;
export const GEOMETRY_SUBMISSION_PREFIX_V2 = 'geo:v2:' as const;

export type GeometryPayloadV1 = {
  points: unknown[];
  shapes: unknown[];
  freehandPaths: unknown[];
};

export type ParsedGeometrySubmission =
  | { version: 1; snapshot: GeometryPayloadV1 }
  | { version: 2; steps: GeometryPayloadV1[] };

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

function isSnapshotShape(data: unknown): data is GeometryPayloadV1 {
  if (!data || typeof data !== 'object') return false;
  const o = data as { points?: unknown; shapes?: unknown; freehandPaths?: unknown };
  if (!Array.isArray(o.points) || !Array.isArray(o.shapes)) return false;
  return true;
}

function normalizeSnapshot(data: GeometryPayloadV1): GeometryPayloadV1 {
  return {
    points: data.points,
    shapes: data.shapes,
    freehandPaths: Array.isArray(data.freehandPaths) ? data.freehandPaths : [],
  };
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

export function formatGeometryStepSubmissions(steps: GeometryPayloadV1[]): string {
  const payload = {
    v: 2 as const,
    steps: steps.map(normalizeSnapshot),
  };
  return `${GEOMETRY_SUBMISSION_PREFIX_V2}${toBase64Url(JSON.stringify(payload))}`;
}

export function isGeometrySubmission(encoded: string): boolean {
  return (
    encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX) || encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX_V2)
  );
}

export function parseGeometrySubmissionAny(encoded: string): ParsedGeometrySubmission | null {
  if (encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX_V2)) {
    try {
      const json = fromBase64Url(encoded.slice(GEOMETRY_SUBMISSION_PREFIX_V2.length));
      const data = JSON.parse(json) as { v?: number; steps?: unknown };
      if (!data || data.v !== 2 || !Array.isArray(data.steps) || data.steps.length === 0) return null;
      const steps: GeometryPayloadV1[] = [];
      for (const item of data.steps) {
        if (!isSnapshotShape(item)) return null;
        steps.push(normalizeSnapshot(item));
      }
      return { version: 2, steps };
    } catch {
      return null;
    }
  }
  const v1 = parseGeometrySubmission(encoded);
  if (!v1) return null;
  return { version: 1, snapshot: v1 };
}

export function parseGeometrySubmission(encoded: string): GeometryPayloadV1 | null {
  const any = encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX_V2)
    ? parseGeometrySubmissionAny(encoded)
    : null;
  if (any?.version === 2) return any.steps[0] ?? null;
  if (!encoded.startsWith(GEOMETRY_SUBMISSION_PREFIX)) return null;
  const raw = encoded.slice(GEOMETRY_SUBMISSION_PREFIX.length);
  try {
    const json = fromBase64Url(raw);
    const data = JSON.parse(json) as {
      v?: number;
      points?: unknown;
      shapes?: unknown;
      freehandPaths?: unknown;
    };
    if (!data || data.v !== 1 || !isSnapshotShape(data)) return null;
    return normalizeSnapshot(data);
  } catch {
    return null;
  }
}

export function geometrySnapshotIsEmpty(snap: GeometryPayloadV1 | null | undefined): boolean {
  if (!snap) return true;
  return (
    snap.points.length === 0 &&
    snap.shapes.length === 0 &&
    (!snap.freehandPaths || snap.freehandPaths.length === 0)
  );
}
