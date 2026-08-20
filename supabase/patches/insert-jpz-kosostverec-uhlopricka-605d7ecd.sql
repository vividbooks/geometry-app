-- Ukázková konstrukce ve stylu JPZ CERMAT: Kosočtverec.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '605d7ecd-faf2-474d-a304-3ab328ae5d0e'::uuid,
  'Kosočtverec',
  $txt$Úsečka AC je úhlopříčkou kosočtverce ABCD. Vrchol B leží na přímce p.

Sestrojte kosočtverec ABCD, označte zbývající vrcholy a kosočtverec narýsujte.$txt$,
  null,
  $json$[{"text":"Úsečka AC je úhlopříčkou kosočtverce ABCD. Vrchol B leží na přímce p.\n\nSestrojte kosočtverec ABCD, označte zbývající vrcholy a kosočtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":160,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":160,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":160,"y":280,"label":"A","locked":true},{"id":"pt-c","x":480,"y":200,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"seg-ac","type":"segment","label":"","points":["pt-a","pt-c"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-c"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
