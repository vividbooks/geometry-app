-- Úkol „Kružnice trojúhelníku opsaná“: 4 kroky se sdíleným plátnem
-- (ostroúhlý ABC, pravoúhlý DEF, tupoúhlý KLM + vlastní pravoúhlý). Spusť v Supabase SQL Editoru.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '4468a8e9-cb79-4dd7-9063-36734bd9ea4e'::uuid,
  'Kružnice trojúhelníku opsaná',
  $txt$1. Narýsuj zadanému trojúhelníku kružnici opsanou.

2. Narýsuj zadanému trojúhelníku kružnici opsanou.

3. Narýsuj zadanému trojúhelníku kružnici opsanou.

4. Narýsuj libovolný trojúhelník včetně jeho kružnice opsané, aby platilo, že střed této kružnice leží na některé ze stran trojúhelníku.$txt$,
  null,
  $json$[{"text":"Narýsuj zadanému trojúhelníku kružnici opsanou.","canvas_snapshot":{"points":[{"id":"pt-abc-a","x":140,"y":360,"label":"A","locked":true},{"id":"pt-abc-b","x":500,"y":360,"label":"B","locked":true},{"id":"pt-abc-c","x":280,"y":100,"label":"C","locked":true}],"shapes":[{"id":"seg-abc-ab","type":"segment","label":"","points":["pt-abc-a","pt-abc-b"],"locked":true,"definition":{"p1Id":"pt-abc-a","p2Id":"pt-abc-b"}},{"id":"seg-abc-bc","type":"segment","label":"","points":["pt-abc-b","pt-abc-c"],"locked":true,"definition":{"p1Id":"pt-abc-b","p2Id":"pt-abc-c"}},{"id":"seg-abc-ca","type":"segment","label":"","points":["pt-abc-c","pt-abc-a"],"locked":true,"definition":{"p1Id":"pt-abc-c","p2Id":"pt-abc-a"}}],"freehandPaths":[]}},{"text":"Narýsuj zadanému trojúhelníku kružnici opsanou.","canvas_snapshot":{"points":[{"id":"pt-def-d","x":140,"y":360,"label":"D","locked":true},{"id":"pt-def-e","x":500,"y":360,"label":"E","locked":true},{"id":"pt-def-f","x":140,"y":80,"label":"F","locked":true}],"shapes":[{"id":"seg-def-de","type":"segment","label":"","points":["pt-def-d","pt-def-e"],"locked":true,"definition":{"p1Id":"pt-def-d","p2Id":"pt-def-e"}},{"id":"seg-def-ef","type":"segment","label":"","points":["pt-def-e","pt-def-f"],"locked":true,"definition":{"p1Id":"pt-def-e","p2Id":"pt-def-f"}},{"id":"seg-def-fd","type":"segment","label":"","points":["pt-def-f","pt-def-d"],"locked":true,"definition":{"p1Id":"pt-def-f","p2Id":"pt-def-d"}}],"freehandPaths":[]}},{"text":"Narýsuj zadanému trojúhelníku kružnici opsanou.","canvas_snapshot":{"points":[{"id":"pt-klm-k","x":280,"y":360,"label":"K","locked":true},{"id":"pt-klm-l","x":540,"y":360,"label":"L","locked":true},{"id":"pt-klm-m","x":80,"y":80,"label":"M","locked":true}],"shapes":[{"id":"seg-klm-kl","type":"segment","label":"","points":["pt-klm-k","pt-klm-l"],"locked":true,"definition":{"p1Id":"pt-klm-k","p2Id":"pt-klm-l"}},{"id":"seg-klm-lm","type":"segment","label":"","points":["pt-klm-l","pt-klm-m"],"locked":true,"definition":{"p1Id":"pt-klm-l","p2Id":"pt-klm-m"}},{"id":"seg-klm-mk","type":"segment","label":"","points":["pt-klm-m","pt-klm-k"],"locked":true,"definition":{"p1Id":"pt-klm-m","p2Id":"pt-klm-k"}}],"freehandPaths":[]}},{"text":"Narýsuj libovolný trojúhelník včetně jeho kružnice opsané, aby platilo, že střed této kružnice leží na některé ze stran trojúhelníku.","canvas_snapshot":{"points":[],"shapes":[],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
