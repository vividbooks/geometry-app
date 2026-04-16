/**
 * Parsuje UUID zadání z čistého UUID, z URL obsahující `/${pathSegment}/:uuid`, nebo z libovolného textu s UUID.
 * @param pathSegment např. `ukol` → hledá `/ukol/…`; bez úvodních lomítek
 */
export function parseAssignmentIdFromUrlOrUuid(
  raw: string,
  pathSegment: string = 'ukol',
): string | null {
  const s = raw.trim();
  const uuid =
    /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
  const only = s.match(uuid);
  if (only) return only[1]!.toLowerCase();

  const seg = pathSegment.replace(/^\/+|\/+$/g, '');
  if (seg) {
    const esc = seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const inPath = s.match(
      new RegExp(
        `/${esc}/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})`,
        'i',
      ),
    );
    if (inPath) return inPath[1]!.toLowerCase();
  }

  const anywhere = s.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
  );
  return anywhere ? anywhere[0]!.toLowerCase() : null;
}
