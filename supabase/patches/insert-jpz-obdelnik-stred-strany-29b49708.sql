-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Obdélník se středem strany.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '29b49708-92f0-4ef6-a947-8f0bdef02451'::uuid,
  'Obdélník se středem strany',
  $txt$Bod A je vrcholem obdélníku ABCD, jehož vrchol D leží na přímce p. Bod S je středem strany CD.

Sestrojte vrcholy B, C, D, označte je a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Bod A je vrcholem obdélníku ABCD, jehož vrchol D leží na přímce p. Bod S je středem strany CD.\n\nSestrojte vrcholy B, C, D, označte je a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":150,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":150,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":180,"y":330,"label":"A","locked":true},{"id":"pt-s","x":430,"y":210,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
