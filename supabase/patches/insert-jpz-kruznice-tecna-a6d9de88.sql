-- Ukázková konstrukce ve stylu JPZ CERMAT: Kružnice tečná k přímce.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'a6d9de88-c424-46fa-8af1-814c07a4466e'::uuid,
  'Kružnice tečná k přímce',
  $txt$Kružnice k se dotýká přímky p v bodě A a prochází bodem B.

Sestrojte střed S kružnice k, označte jej a kružnici narýsujte.$txt$,
  null,
  $json$[{"text":"Kružnice k se dotýká přímky p v bodě A a prochází bodem B.\n\nSestrojte střed S kružnice k, označte jej a kružnici narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":280,"y":340,"label":"A","locked":true},{"id":"pt-b","x":400,"y":140,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
