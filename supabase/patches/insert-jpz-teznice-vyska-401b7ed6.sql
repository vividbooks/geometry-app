-- Konstrukční úloha ve stylu JPZ CERMAT (čtyřleté obory): Trojúhelník z těžnice a výšky.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  '401b7ed6-fd9b-42ab-8ea0-c147657c5ab6'::uuid,
  'Trojúhelník z těžnice a výšky',
  $txt$Úsečka AB je stranou c trojúhelníku ABC. Bod M leží uvnitř tohoto trojúhelníku na těžnici tc. Výška vc měří 4 cm.

1. Sestrojte těžnici tc, chybějící vrchol C a trojúhelník ABC narýsujte.
2. Sestrojte těžiště trojúhelníku ABC a označte jej písmenem T.$txt$,
  null,
  $json$[{"text":"Úsečka AB je stranou c trojúhelníku ABC. Bod M leží uvnitř tohoto trojúhelníku na těžnici tc. Výška vc měří 4 cm.\n\n1. Sestrojte těžnici tc, chybějící vrchol C a trojúhelník ABC narýsujte.\n2. Sestrojte těžiště trojúhelníku ABC a označte jej písmenem T.","canvas_snapshot":{"points":[{"id":"pt-a","x":140,"y":340,"label":"A","locked":true},{"id":"pt-b","x":460,"y":340,"label":"B","locked":true},{"id":"pt-m","x":270,"y":265,"label":"M","locked":true}],"shapes":[{"id":"seg-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
