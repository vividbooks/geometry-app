/**
 * Složí SQL pro úlohy sekce CERMAT (`geometry_circuit_assignments`) ze zadání
 * v `src/app/utils/cermatAssignments.ts` (data ročníků v `src/app/utils/cermat/`).
 *
 * Usage:
 *   npx esbuild scripts/build-cermat-assignments.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-cermat.mjs && node /tmp/build-cermat.mjs [rows.json]
 *
 * Úloha má jediný krok, sloupec new_canvas_per_step proto není potřeba (v produkční DB ani není).
 * Výstup: supabase/patches/insert-cermat.sql (všechny úlohy v jedné transakci, insert … on conflict
 * do update). Volitelný argument uloží řádky i jako JSON (pro vložení přes REST).
 */
import { writeFileSync } from 'node:fs';
import { CERMAT_ASSIGNMENTS, cermatInstructionSnapshot } from '../src/app/utils/cermatAssignments';

const rows = CERMAT_ASSIGNMENTS.map(item => ({
  id: item.id,
  title: item.title,
  instruction_text: item.instructionText,
  instruction_image: null,
  instruction_steps: [{ text: item.instructionText, canvas_snapshot: cermatInstructionSnapshot(item) }],
}));

const sql = [
  '-- Sekce CERMAT: konstrukční úlohy 9 a 10 z jednotné přijímací zkoušky (čtyřleté obory).',
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

writeFileSync('supabase/patches/insert-cermat.sql', sql);
const rowsOut = process.argv[2];
if (rowsOut) writeFileSync(rowsOut, `${JSON.stringify(rows)}\n`);
console.log(`Zapsáno ${rows.length} úloh.`);
