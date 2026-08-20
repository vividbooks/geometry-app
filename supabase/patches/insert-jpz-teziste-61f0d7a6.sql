-- Ukázková konstrukce ve stylu JPZ CERMAT: Těžiště.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '61f0d7a6-9483-44de-83a8-a1b160fef1f2'::uuid,
  'Těžiště',
  $txt$Úsečka AB je stranou trojúhelníku ABC. Bod T je těžištěm tohoto trojúhelníku.

Sestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou trojúhelníku ABC. Bod T je těžištěm tohoto trojúhelníku.\n\nSestrojte vrchol C, označte jej a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-a","x":140,"y":320,"label":"A","locked":true},{"id":"pt-b","x":500,"y":320,"label":"B","locked":true},{"id":"pt-t","x":300,"y":240,"label":"T","locked":true}],"shapes":[{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
