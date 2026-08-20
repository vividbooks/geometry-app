-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Trojúhelník z osy úhlu.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '0daeda38-6964-4e93-a3db-745003b63e53'::uuid,
  'Trojúhelník z osy úhlu',
  $txt$Úsečka AB je stranou trojúhelníku ABC. Přímka o je osou vnitřního úhlu při vrcholu A a vrchol C leží na přímce p.

Sestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou trojúhelníku ABC. Přímka o je osou vnitřního úhlu při vrcholu A a vrchol C leží na přímce p.\n\nSestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":120,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":160,"y":340,"label":"A","locked":true},{"id":"pt-b","x":470,"y":340,"label":"B","locked":true},{"id":"pt-o2","x":430,"y":165,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-o","type":"line","label":"o","points":["pt-a","pt-o2"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-o2"}},{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
