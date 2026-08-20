-- Ukázková konstrukce ve stylu JPZ CERMAT: Tečny ke kružnici.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '656c28a0-9549-4554-8615-d5d3ad388ce1'::uuid,
  'Tečny ke kružnici',
  $txt$Bod S je středem kružnice k. Z bodu P veďte tečny ke kružnici k.

Sestrojte obě tečny, označte body dotyku a tečny narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Bod S je středem kružnice k. Z bodu P veďte tečny ke kružnici k.\n\nSestrojte obě tečny, označte body dotyku a tečny narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-s","x":280,"y":240,"label":"S","locked":true},{"id":"pt-rim","x":430,"y":240,"label":"","locked":true,"hidden":true},{"id":"pt-p","x":500,"y":100,"label":"P","locked":true}],"shapes":[{"id":"circ-k","type":"circle","label":"k","points":["pt-s","pt-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-rim"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
