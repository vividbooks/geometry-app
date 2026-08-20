-- Ukázková konstrukce ve stylu JPZ CERMAT: Těžnice.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'c67ac52d-eaea-46b4-8fda-d4dff5d29488'::uuid,
  'Těžnice a rovnoběžka',
  $txt$Úsečka AB je stranou trojúhelníku ABC. Bod M leží na těžnici z vrcholu C na stranu AB. Vrchol C leží na přímce q, která je rovnoběžná s AB.

Sestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou trojúhelníku ABC. Bod M leží na těžnici z vrcholu C na stranu AB. Vrchol C leží na přímce q, která je rovnoběžná s AB.\n\nSestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-q1","x":40,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":620,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":140,"y":340,"label":"A","locked":true},{"id":"pt-b","x":500,"y":340,"label":"B","locked":true},{"id":"pt-m","x":280,"y":240,"label":"M","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}},{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
