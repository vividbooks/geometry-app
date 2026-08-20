-- Úkol „Těžnice“: 3 kroky se sdíleným plátnem. Spusť v Supabase SQL Editoru.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'a7c3e19b-4d52-48f0-b6e1-9c8a2d4f0b31'::uuid,
  'Těžnice',
  $txt$1. Sestroj všechny těžnice zadaného trojúhelníku.

2. Sestroj všechny těžnice zadaného trojúhelníku.

3. Sestroj všechny těžnice zadaného trojúhelníku.$txt$,
  null,
  $json$[{"text":"Sestroj všechny těžnice zadaného trojúhelníku.","canvas_snapshot":{"points":[{"id":"pt-abc-a","x":140,"y":360,"label":"A","locked":true},{"id":"pt-abc-b","x":500,"y":360,"label":"B","locked":true},{"id":"pt-abc-c","x":280,"y":100,"label":"C","locked":true}],"shapes":[{"id":"seg-abc-ab","type":"segment","label":"","points":["pt-abc-a","pt-abc-b"],"locked":true,"definition":{"p1Id":"pt-abc-a","p2Id":"pt-abc-b"}},{"id":"seg-abc-bc","type":"segment","label":"","points":["pt-abc-b","pt-abc-c"],"locked":true,"definition":{"p1Id":"pt-abc-b","p2Id":"pt-abc-c"}},{"id":"seg-abc-ca","type":"segment","label":"","points":["pt-abc-c","pt-abc-a"],"locked":true,"definition":{"p1Id":"pt-abc-c","p2Id":"pt-abc-a"}}],"freehandPaths":[]}},{"text":"Sestroj všechny těžnice zadaného trojúhelníku.","canvas_snapshot":{"points":[{"id":"pt-def-d","x":140,"y":360,"label":"D","locked":true},{"id":"pt-def-e","x":500,"y":360,"label":"E","locked":true},{"id":"pt-def-f","x":140,"y":80,"label":"F","locked":true}],"shapes":[{"id":"seg-def-de","type":"segment","label":"","points":["pt-def-d","pt-def-e"],"locked":true,"definition":{"p1Id":"pt-def-d","p2Id":"pt-def-e"}},{"id":"seg-def-ef","type":"segment","label":"","points":["pt-def-e","pt-def-f"],"locked":true,"definition":{"p1Id":"pt-def-e","p2Id":"pt-def-f"}},{"id":"seg-def-fd","type":"segment","label":"","points":["pt-def-f","pt-def-d"],"locked":true,"definition":{"p1Id":"pt-def-f","p2Id":"pt-def-d"}}],"freehandPaths":[]}},{"text":"Sestroj všechny těžnice zadaného trojúhelníku.","canvas_snapshot":{"points":[{"id":"pt-klm-k","x":280,"y":360,"label":"K","locked":true},{"id":"pt-klm-l","x":540,"y":360,"label":"L","locked":true},{"id":"pt-klm-m","x":80,"y":80,"label":"M","locked":true}],"shapes":[{"id":"seg-klm-kl","type":"segment","label":"","points":["pt-klm-k","pt-klm-l"],"locked":true,"definition":{"p1Id":"pt-klm-k","p2Id":"pt-klm-l"}},{"id":"seg-klm-lm","type":"segment","label":"","points":["pt-klm-l","pt-klm-m"],"locked":true,"definition":{"p1Id":"pt-klm-l","p2Id":"pt-klm-m"}},{"id":"seg-klm-mk","type":"segment","label":"","points":["pt-klm-m","pt-klm-k"],"locked":true,"definition":{"p1Id":"pt-klm-m","p2Id":"pt-klm-k"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
