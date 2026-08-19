-- Úkol Přímka 1 (541e27b8…): zruší u všech kroků volbu „Smazat předchozí konstrukce“.
-- Spusť v Supabase → SQL Editor (role postgres; obchází RLS).

begin;

update public.geometry_circuit_assignments g
set instruction_steps = (
  select coalesce(
    jsonb_agg(
      case
        when elem ? 'clear_previous_constructions'
          then elem - 'clear_previous_constructions'
        else elem
      end
      order by n
    ),
    '[]'::jsonb
  )
  from jsonb_array_elements(g.instruction_steps) with ordinality as t (elem, n)
)
where g.id = '541e27b8-25cc-49e8-ad8c-122346200d30'::uuid;

commit;
