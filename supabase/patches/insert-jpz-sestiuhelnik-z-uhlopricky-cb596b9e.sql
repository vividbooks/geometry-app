-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Šestiúhelník z úhlopříčky.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'cb596b9e-c109-48f9-874a-90abe34ba852'::uuid,
  'Šestiúhelník z úhlopříčky',
  $txt$Body A a D jsou protilehlé vrcholy pravidelného šestiúhelníku ABCDEF.

Sestrojte zbývající vrcholy B, C, E, F, označte je a šestiúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"Body A a D jsou protilehlé vrcholy pravidelného šestiúhelníku ABCDEF.\n\nSestrojte zbývající vrcholy B, C, E, F, označte je a šestiúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-a","x":190,"y":240,"label":"A","locked":true},{"id":"pt-d","x":450,"y":240,"label":"D","locked":true}],"shapes":[{"id":"seg-ad","type":"segment","label":"","points":["pt-a","pt-d"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-d"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
