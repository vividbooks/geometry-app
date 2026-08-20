-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Lichoběžník s poloviční základnou.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '834c4b76-6217-4564-83f5-503900b0c711'::uuid,
  'Lichoběžník s poloviční základnou',
  $txt$Body A a B jsou vrcholy rovnoramenného lichoběžníku ABCD se základnami AB a CD, pro které platí |CD| = ½ · |AB|. Vrcholy C a D leží na přímce p.

Sestrojte vrcholy C a D, označte je a lichoběžník ABCD narýsujte.$txt$,
  null,
  $json$[{"text":"Body A a B jsou vrcholy rovnoramenného lichoběžníku ABCD se základnami AB a CD, pro které platí |CD| = ½ · |AB|. Vrcholy C a D leží na přímce p.\n\nSestrojte vrcholy C a D, označte je a lichoběžník ABCD narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":160,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":160,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":150,"y":340,"label":"A","locked":true},{"id":"pt-b","x":490,"y":340,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
