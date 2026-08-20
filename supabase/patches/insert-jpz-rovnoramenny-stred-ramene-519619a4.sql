-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Rovnoramenný trojúhelník se středem ramene.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '519619a4-1076-4da8-b81a-bf1024d9b3a8'::uuid,
  'Rovnoramenný trojúhelník se středem ramene',
  $txt$Bod C je vrcholem rovnoramenného trojúhelníku ABC se základnou AB. Bod S je středem jednoho z jeho ramen. Jeden z vrcholů A, B leží na přímce q.

Sestrojte vrcholy A a B, označte je a trojúhelník ABC narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Bod C je vrcholem rovnoramenného trojúhelníku ABC se základnou AB. Bod S je středem jednoho z jeho ramen. Jeden z vrcholů A, B leží na přímce q.\n\nSestrojte vrcholy A a B, označte je a trojúhelník ABC narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-q1","x":40,"y":350,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":620,"y":350,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":300,"y":130,"label":"C","locked":true},{"id":"pt-s","x":390,"y":235,"label":"S","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
