-- Úkol d046caea-a938-4f51-9fe0-b312f2f88df0: odstranit 3. krok z instruction_steps.
-- Spusť v Supabase → SQL Editor (role postgres; obchází RLS), projekt geometrie viz INTEGRATION.md.
--
-- Synchronizuje i instruction_text (číslovaný souhrn kroků) podle nového pole instruction_steps.

begin;

with new_data as (
  select
    g.id,
    (
      select coalesce(jsonb_agg(elem order by n), '[]'::jsonb)
      from jsonb_array_elements(g.instruction_steps) with ordinality as t (elem, n)
      where n != 3
    ) as new_steps
  from public.geometry_circuit_assignments g
  where g.id = 'd046caea-a938-4f51-9fe0-b312f2f88df0'::uuid
),
text_sync as (
  select
    nd.id,
    nd.new_steps,
    coalesce(
      (
        select string_agg(
          format('%s. %s', n::int, trim(elem->>'text')),
          e'\n\n' order by n
        )
        from jsonb_array_elements(nd.new_steps) with ordinality as x (elem, n)
        where trim(coalesce(elem->>'text', '')) <> ''
      ),
      ''
    ) as new_instruction_text
  from new_data nd
)
update public.geometry_circuit_assignments g
set
  instruction_steps = ts.new_steps,
  instruction_text = ts.new_instruction_text
from text_sync ts
where g.id = ts.id;

commit;
