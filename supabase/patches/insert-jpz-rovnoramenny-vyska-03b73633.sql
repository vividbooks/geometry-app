-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Rovnoramenný trojúhelník s výškou.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '03b73633-c003-46dd-a9a3-1cd8253a2fea'::uuid,
  'Rovnoramenný trojúhelník s výškou',
  $txt$Bod B je vrcholem rovnoramenného trojúhelníku ABC se základnou AB. Úsečka BM je jednou z výšek tohoto trojúhelníku a bod M leží na straně AC. Vrchol A leží na přímce q.

Sestrojte vrcholy A a C, označte je a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"Bod B je vrcholem rovnoramenného trojúhelníku ABC se základnou AB. Úsečka BM je jednou z výšek tohoto trojúhelníku a bod M leží na straně AC. Vrchol A leží na přímce q.\n\nSestrojte vrcholy A a C, označte je a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-q1","x":40,"y":350,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":620,"y":350,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":440,"y":250,"label":"B","locked":true},{"id":"pt-m","x":310,"y":175,"label":"M","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
