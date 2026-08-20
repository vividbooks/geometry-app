-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Trojúhelník z průsečíku výšek.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '66fa2048-f25d-43ce-97ca-491807df805b'::uuid,
  'Trojúhelník z průsečíku výšek',
  $txt$Úsečka AB je stranou trojúhelníku ABC. Bod V je průsečíkem výšek tohoto trojúhelníku.

Sestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou trojúhelníku ABC. Bod V je průsečíkem výšek tohoto trojúhelníku.\n\nSestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-a","x":160,"y":330,"label":"A","locked":true},{"id":"pt-b","x":470,"y":330,"label":"B","locked":true},{"id":"pt-v","x":310,"y":250,"label":"V","locked":true}],"shapes":[{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
