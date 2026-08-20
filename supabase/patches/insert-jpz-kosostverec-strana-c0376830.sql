-- Ukázková konstrukce ve stylu JPZ CERMAT: Kosočtverec 2.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'c0376830-b727-477e-9837-48f9f47552b4'::uuid,
  'Kosočtverec 2',
  $txt$Úsečka AB je stranou kosočtverce ABCD. Vrchol D leží na přímce p.

Sestrojte kosočtverec ABCD, označte zbývající vrcholy a kosočtverec narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou kosočtverce ABCD. Vrchol D leží na přímce p.\n\nSestrojte kosočtverec ABCD, označte zbývající vrcholy a kosočtverec narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":200,"y":300,"label":"A","locked":true},{"id":"pt-b","x":420,"y":300,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
