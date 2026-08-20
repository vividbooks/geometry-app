-- Zkopíruje obsah úkolu 7042b1ea… do úkolu 541e27b8… (stejný veřejný odkaz v knihovně).
-- Spusť v Supabase → SQL Editor (role postgres; obchází RLS).

begin;

update public.geometry_circuit_assignments target
set
  title = source.title,
  instruction_text = source.instruction_text,
  instruction_image = source.instruction_image,
  instruction_steps = source.instruction_steps,
  initial_canvas_snapshot = source.initial_canvas_snapshot
from public.geometry_circuit_assignments source
where target.id = '541e27b8-25cc-49e8-ad8c-122346200d30'::uuid
  and source.id = '7042b1ea-f010-4da0-a56e-b3cf5cb28ca9'::uuid;

commit;
