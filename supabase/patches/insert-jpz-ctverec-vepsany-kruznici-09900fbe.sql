-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Čtverec vepsaný kružnici.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '09900fbe-d904-45f1-9450-5f20eaaba23b'::uuid,
  'Čtverec vepsaný kružnici',
  $txt$Všechny vrcholy trojúhelníku ABC leží na kružnici k.

1. Sestrojte kružnici k a označte její střed S.
2. Bod C je vrcholem čtverce CDEF, jehož zbývající vrcholy D, E, F leží také na kružnici k. Sestrojte čtverec CDEF a označte jeho vrcholy.$txt$,
  null,
  $json$[{"text":"Všechny vrcholy trojúhelníku ABC leží na kružnici k.\n\n1. Sestrojte kružnici k a označte její střed S.\n2. Bod C je vrcholem čtverce CDEF, jehož zbývající vrcholy D, E, F leží také na kružnici k. Sestrojte čtverec CDEF a označte jeho vrcholy.","canvas_snapshot":{"points":[{"id":"pt-a","x":150,"y":330,"label":"A","locked":true},{"id":"pt-b","x":470,"y":330,"label":"B","locked":true},{"id":"pt-c","x":300,"y":120,"label":"C","locked":true}],"shapes":[{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"seg-bc","type":"segment","label":"","points":["pt-b","pt-c"],"locked":true,"definition":{"p1Id":"pt-b","p2Id":"pt-c"}},{"id":"seg-ca","type":"segment","label":"","points":["pt-c","pt-a"],"locked":true,"definition":{"p1Id":"pt-c","p2Id":"pt-a"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
