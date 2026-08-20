-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Tětiva dané délky.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '3e77b1d1-4a07-4b1a-b49f-a8cd108a8de5'::uuid,
  'Tětiva dané délky',
  $txt$Bod S je středem kružnice k. Tětiva XY kružnice k je rovnoběžná s přímkou p a měří 4 cm.

Sestrojte tětivu XY, označte její krajní body a tětivu narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Bod S je středem kružnice k. Tětiva XY kružnice k je rovnoběžná s přímkou p a měří 4 cm.\n\nSestrojte tětivu XY, označte její krajní body a tětivu narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":380,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":300,"y":200,"label":"S","locked":true},{"id":"pt-rim","x":450,"y":200,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"circ-k","type":"circle","label":"k","points":["pt-s","pt-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-rim"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
