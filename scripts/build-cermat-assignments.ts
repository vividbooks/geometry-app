/**
 * Složí SQL pro úlohy sekce CERMAT (`geometry_circuit_assignments`) ze zadání
 * v `src/app/utils/cermatAssignments.ts` (data ročníků v `src/app/utils/cermat/`).
 *
 * Usage:
 *   npx esbuild scripts/build-cermat-assignments.ts --bundle --platform=node --format=esm \
 *     --outfile=/tmp/build-cermat.mjs && node /tmp/build-cermat.mjs [rows.json]
 *
 * Úloha má jediný krok, sloupec new_canvas_per_step proto není potřeba (v produkční DB ani není).
 * Výstup: supabase/patches/insert-cermat.sql (sekce CERMAT) a insert-grade9-cermat-style.sql
 * (úkoly 9. ročníku ve stylu CERMAT) a insert-prijimacky-testy.sql (úlohy vlastních testů přijímaček), každý v jedné transakci, insert … on conflict do update.
 * Volitelný argument uloží všechny řádky i jako JSON (pro vložení přes REST).
 */
import { writeFileSync } from 'node:fs';
import {
  type CermatAssignment,
  CERMAT_ASSIGNMENTS,
  GRADE9_STYLE_ASSIGNMENTS,
  PRIJIMACKY_TEST_ASSIGNMENTS,
  cermatInstructionSnapshot,
} from '../src/app/utils/cermatAssignments';

const toRow = (item: CermatAssignment) => ({
  id: item.id,
  title: item.title,
  instruction_text: item.instructionText,
  instruction_image: null,
  instruction_steps: [{ text: item.instructionText, canvas_snapshot: cermatInstructionSnapshot(item) }],
});
type Row = ReturnType<typeof toRow>;

function sqlFor(heading: string, rows: Row[]): string {
  return [
    `-- ${heading}`,
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
}

const cermat = CERMAT_ASSIGNMENTS.map(toRow);
const grade9 = GRADE9_STYLE_ASSIGNMENTS.map(toRow);
const prijimacky = PRIJIMACKY_TEST_ASSIGNMENTS.map(toRow);
writeFileSync(
  'supabase/patches/insert-cermat.sql',
  sqlFor('Sekce CERMAT: konstrukční úlohy 9 a 10 z jednotné přijímací zkoušky (čtyřleté obory).', cermat),
);
writeFileSync(
  'supabase/patches/insert-grade9-cermat-style.sql',
  sqlFor('9. ročník: konstrukční úkoly ve stylu úloh CERMAT.', grade9),
);
writeFileSync(
  'supabase/patches/insert-prijimacky-testy.sql',
  sqlFor('Rýsovací úlohy vlastních testů aplikace Přijímací zkoušky (v knihovně úkolů nejsou).', prijimacky),
);
const rowsOut = process.argv[2];
if (rowsOut) writeFileSync(rowsOut, `${JSON.stringify([...cermat, ...grade9, ...prijimacky])}\n`);
console.log(`Zapsáno ${cermat.length} úloh CERMAT, ${grade9.length} úkolů 9. ročníku a ${prijimacky.length} úloh vlastních přijímačkových testů.`);
