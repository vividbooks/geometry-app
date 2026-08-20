-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Čtverec se stranou na přímce.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '3f73cd7a-f6d9-46ef-a2f2-9f34d1479bbe'::uuid,
  'Čtverec se stranou na přímce',
  $txt$Bod O je středem čtverce ABCD. Strana BC leží na přímce p.

Sestrojte všechny vrcholy čtverce ABCD, označte je a čtverec narýsujte.$txt$,
  null,
  $json$[{"text":"Bod O je středem čtverce ABCD. Strana BC leží na přímce p.\n\nSestrojte všechny vrcholy čtverce ABCD, označte je a čtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-o","x":300,"y":180,"label":"O","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
