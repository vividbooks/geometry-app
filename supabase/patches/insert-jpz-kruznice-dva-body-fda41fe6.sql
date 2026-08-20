-- Ukázková konstrukce ve stylu JPZ CERMAT: Kružnice daná dvěma body.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'fda41fe6-dfad-4881-be72-771d509ba49f'::uuid,
  'Kružnice daná dvěma body',
  $txt$Kružnice k prochází body A a B. Střed S kružnice k leží na přímce p.

Sestrojte střed S, označte jej a kružnici k narýsujte.$txt$,
  null,
  $json$[{"text":"Kružnice k prochází body A a B. Střed S kružnice k leží na přímce p.\n\nSestrojte střed S, označte jej a kružnici k narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":320,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":320,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":200,"y":140,"label":"A","locked":true},{"id":"pt-b","x":480,"y":180,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
