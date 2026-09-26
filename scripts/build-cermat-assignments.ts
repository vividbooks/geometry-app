/**
 * Složí SQL a JSON pro úlohy sekce CERMAT (`geometry_circuit_assignments`) ze souřadnic
 * v `src/app/utils/cermatAssignments.ts`.
 *
 * Usage (Node 22+):
 *   node --experimental-strip-types scripts/build-cermat-assignments.ts
 * Úloha má jediný krok, sloupec new_canvas_per_step proto není potřeba (v produkční DB ani není).
 * Výstup: supabase/patches/insert-cermat-2026.sql (všech 8 úloh v jedné transakci)
 *         a supabase/patches/insert-cermat-2026-<id>.json pro každou úlohu.
 */
import { writeFileSync } from 'node:fs';
import { CERMAT_ASSIGNMENTS, cermatInstructionSnapshot } from '../src/app/utils/cermatAssignments.ts';

const rows = CERMAT_ASSIGNMENTS.map(item => ({
  id: item.id,
  title: item.title,
  instruction_text: item.instructionText,
  instruction_image: null,
  instruction_steps: [{ text: item.instructionText, canvas_snapshot: cermatInstructionSnapshot(item) }],
}));

const sql = [
  '-- Sekce CERMAT: konstrukční úlohy 9 a 10 z jednotné přijímací zkoušky 2026 (čtyřleté obory).',
  '-- Vygenerováno skriptem scripts/build-cermat-assignments.ts — neupravovat ručně.',
  '',
  'begin;',
  '',
  ...rows.flatMap(row => [
    `-- ${row.title}`,
    'insert into public.geometry_circuit_assignments (',
    '  id, title, instruction_text, instruction_image, instruction_steps',
    ') values (',
    `  '${row.id}'::uuid,`,
    `  $txt$${row.title}$txt$,`,
    `  $txt$${row.instruction_text}$txt$,`,
    '  null,',
    `  $json$${JSON.stringify(row.instruction_steps)}$json$::jsonb`,
    ')',
    'on conflict (id) do update set',
    '  title = excluded.title,',
    '  instruction_text = excluded.instruction_text,',
    '  instruction_image = excluded.instruction_image,',
    '  instruction_steps = excluded.instruction_steps;',
    '',
  ]),
  'commit;',
  '',
].join('\n');

writeFileSync('supabase/patches/insert-cermat-2026.sql', sql);
for (const row of rows) {
  writeFileSync(`supabase/patches/insert-cermat-2026-${row.id.slice(0, 8)}.json`, `${JSON.stringify(row, null, 2)}\n`);
}
console.log(`Zapsáno ${rows.length} úloh.`);
