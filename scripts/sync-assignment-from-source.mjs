#!/usr/bin/env node
/**
 * Zkopíruje obsah zdrojového úkolu do cílového (geometry_circuit_assignments).
 * Vyžaduje SUPABASE_SERVICE_ROLE_KEY v prostředí.
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY=... node scripts/sync-assignment-from-source.mjs \
 *     541e27b8-25cc-49e8-ad8c-122346200d30 7042b1ea-f010-4da0-a56e-b3cf5cb28ca9
 */
const SUPABASE_URL = process.env.SUPABASE_URL ?? 'https://jjpiguuubvmiobmixwgh.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const [targetId, sourceId] = process.argv.slice(2);
if (!SERVICE_KEY) {
  console.error('Chybí SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}
if (!targetId || !sourceId) {
  console.error('Usage: node scripts/sync-assignment-from-source.mjs <targetId> <sourceId>');
  process.exit(1);
}

const headers = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

const table = 'geometry_circuit_assignments';
const select = 'title,instruction_text,instruction_image,instruction_steps,initial_canvas_snapshot';

const sourceRes = await fetch(
  `${SUPABASE_URL}/rest/v1/${table}?id=eq.${sourceId}&select=${select}`,
  { headers },
);
if (!sourceRes.ok) {
  console.error('Načtení zdroje selhalo:', sourceRes.status, await sourceRes.text());
  process.exit(1);
}
const [source] = await sourceRes.json();
if (!source) {
  console.error('Zdrojový úkol nenalezen:', sourceId);
  process.exit(1);
}

const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${targetId}`, {
  method: 'PATCH',
  headers: { ...headers, Prefer: 'return=representation' },
  body: JSON.stringify(source),
});
const body = await patchRes.text();
if (!patchRes.ok) {
  console.error('Update selhal:', patchRes.status, body);
  process.exit(1);
}

console.log('OK – úkol aktualizován:', targetId);
console.log(body);
