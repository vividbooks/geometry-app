-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Rovnoběžník s delší úhlopříčkou.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '4a1829f5-69f3-4737-b8e6-8b898b176901'::uuid,
  'Rovnoběžník s delší úhlopříčkou',
  $txt$Body A a C jsou vrcholy rovnoběžníku ABCD, jehož úhlopříčka BD je dvakrát delší než úhlopříčka AC. Jeden ze zbývajících vrcholů B, D leží na přímce p.

Sestrojte vrcholy B a D, označte je a rovnoběžník ABCD narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Body A a C jsou vrcholy rovnoběžníku ABCD, jehož úhlopříčka BD je dvakrát delší než úhlopříčka AC. Jeden ze zbývajících vrcholů B, D leží na přímce p.\n\nSestrojte vrcholy B a D, označte je a rovnoběžník ABCD narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":130,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":130,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":190,"y":320,"label":"A","locked":true},{"id":"pt-c","x":400,"y":210,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
