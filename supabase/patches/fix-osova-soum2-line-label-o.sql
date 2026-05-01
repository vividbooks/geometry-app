-- Trvalá oprava štítku přímky v sdíleném plátně zadání „Osová souměrnost 2“
-- (úkol 9415e7a8-5cdb-499c-a1a2-b4873816ec57): přímka měla label "t", má být "o".
-- Spusť v Supabase → SQL Editor (projekt jjpiguuubvmiobmixwgh).

update public.geometry_circuit_assignments
set initial_canvas_snapshot = jsonb_set(
  initial_canvas_snapshot,
  '{shapes}',
  coalesce(
    (
      select jsonb_agg(
        case
          when elem->>'id' = '99667ea0-e2de-47b0-9fb6-99067b5ce164'
            and elem->>'type' = 'line'
            and elem->>'label' = 't'
          then jsonb_set(elem, '{label}', '"o"', true)
          else elem
        end order by ord
      )
      from jsonb_array_elements(initial_canvas_snapshot->'shapes') with ordinality as t(elem, ord)
    ),
    initial_canvas_snapshot->'shapes'
  ),
  true
)
where id = '9415e7a8-5cdb-499c-a1a2-b4873816ec57'::uuid
  and initial_canvas_snapshot is not null
  and initial_canvas_snapshot->'shapes' is not null;
