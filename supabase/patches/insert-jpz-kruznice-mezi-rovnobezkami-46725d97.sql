-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Kružnice mezi rovnoběžkami.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '46725d97-9b34-4003-ae15-c020b22a2704'::uuid,
  'Kružnice mezi rovnoběžkami',
  $txt$Přímky p a q jsou rovnoběžné. Kružnice k se dotýká obou přímek a prochází bodem M.

Sestrojte střed S kružnice k, označte jej a kružnici narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"Přímky p a q jsou rovnoběžné. Kružnice k se dotýká obou přímek a prochází bodem M.\n\nSestrojte střed S kružnice k, označte jej a kružnici narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-p1","x":40,"y":140,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":140,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":40,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":620,"y":340,"label":"","locked":true,"hidden":true},{"id":"pt-m","x":350,"y":290,"label":"M","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
