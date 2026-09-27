-- Rýsovací úlohy vlastních testů aplikace Přijímací zkoušky (v knihovně úkolů nejsou).
-- Vygenerováno skriptem scripts/build-cermat-assignments.ts — neupravovat ručně.

begin;

-- Vlastní test 1 · 9. Kružnice opsaná trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'f6383b17-cbf5-452d-8789-2927973cd8bc'::uuid,
  $txt$Vlastní test 1 · 9. Kružnice opsaná trojúhelníku$txt$,
  $txt$V rovině leží body A, B a C, které jsou vrcholy trojúhelníku ABC.

Sestrojte kružnici k opsanou trojúhelníku ABC, označte její střed S a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a C, které jsou vrcholy trojúhelníku ABC.\n\nSestrojte kružnici k opsanou trojúhelníku ABC, označte její střed S a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":520,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":227.2,"y":330.2,"label":"A","locked":true},{"id":"pt-b","x":571.6,"y":368,"label":"B","locked":true},{"id":"pt-c","x":416.2,"y":86.6,"label":"C","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 1 · 10. Čtverec ze středu a vrcholu
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '5fea3f29-3f2d-4a0f-905a-78c875ef01c7'::uuid,
  $txt$Vlastní test 1 · 10. Čtverec ze středu a vrcholu$txt$,
  $txt$V rovině leží body S a A.
Bod A je vrchol čtverce ABCD a bod S je průsečík jeho úhlopříček.

Sestrojte vrcholy B, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body S a A.\nBod A je vrchol čtverce ABCD a bod S je průsečík jeho úhlopříček.\n\nSestrojte vrcholy B, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":407.5,"y":265,"label":"S","locked":true},{"id":"pt-a","x":237.2,"y":369.8,"label":"A","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 2 · 9. Kružnice vepsaná trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ce4125e5-3b95-49dd-a7a3-4d08d0dc5a94'::uuid,
  $txt$Vlastní test 2 · 9. Kružnice vepsaná trojúhelníku$txt$,
  $txt$V rovině leží trojúhelník ABC.

Sestrojte kružnici k vepsanou trojúhelníku ABC a označte její střed S.$txt$,
  null,
  $json$[{"text":"V rovině leží trojúhelník ABC.\n\nSestrojte kružnici k vepsanou trojúhelníku ABC a označte její střed S.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":160,"y":420,"label":"A","locked":true},{"id":"pt-b","x":650,"y":420,"label":"B","locked":true},{"id":"pt-c","x":415,"y":105,"label":"C","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"shape-bc","type":"segment","label":"","points":["pt-b","pt-c"],"locked":true,"definition":{"p1Id":"pt-b","p2Id":"pt-c"}},{"id":"shape-ca","type":"segment","label":"","points":["pt-c","pt-a"],"locked":true,"definition":{"p1Id":"pt-c","p2Id":"pt-a"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 2 · 10. Tečny z vnějšího bodu
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '41edeb22-c521-4909-a2fd-1b2c1fbc0dbc'::uuid,
  $txt$Vlastní test 2 · 10. Tečny z vnějšího bodu$txt$,
  $txt$V rovině leží kružnice k se středem S a bod M, který leží vně kružnice.

Sestrojte obě tečny z bodu M ke kružnici k a body dotyku označte T₁ a T₂.$txt$,
  null,
  $json$[{"text":"V rovině leží kružnice k se středem S a bod M, který leží vně kružnice.\n\nSestrojte obě tečny z bodu M ke kružnici k a body dotyku označte T₁ a T₂.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":294.5,"y":318.3,"label":"S","locked":true},{"id":"pt-m","x":640.7,"y":231.7,"label":"M","locked":true},{"id":"pt-k-rim","x":419.5,"y":318.3,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 3 · 9. Kružnice se středem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '7dc37bc8-f846-4796-8a7a-59b2e7d60129'::uuid,
  $txt$Vlastní test 3 · 9. Kružnice se středem na přímce$txt$,
  $txt$V rovině leží body A, B a přímka p.

Sestrojte kružnici k, která prochází body A, B a jejíž střed S leží na přímce p. Střed označte písmenem a kružnici narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a přímka p.\n\nSestrojte kružnici k, která prochází body A, B a jejíž střed S leží na přímce p. Střed označte písmenem a kružnici narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":30,"y":295.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":785,"y":208.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":261,"y":80,"label":"A","locked":true},{"id":"pt-b","x":445,"y":144,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 3 · 10. Tečny rovnoběžné s přímkou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '21b3f91d-9c66-4c22-8ecf-9e2baa2413e5'::uuid,
  $txt$Vlastní test 3 · 10. Tečny rovnoběžné s přímkou$txt$,
  $txt$V rovině leží kružnice k se středem S a přímka p, která kružnici neprotíná.

Sestrojte všechny tečny kružnice k, které jsou rovnoběžné s přímkou p. Body dotyku označte T₁, T₂ a tečny narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží kružnice k se středem S a přímka p, která kružnici neprotíná.\n\nSestrojte všechny tečny kružnice k, které jsou rovnoběžné s přímkou p. Body dotyku označte T₁, T₂ a tečny narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":30,"y":445.5,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":785,"y":324.7,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":300,"y":235,"label":"S","locked":true},{"id":"pt-k-rim","x":400,"y":235,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 4 · 9. Obdélník s vrcholem na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '9a2574e2-ffa3-421e-97b0-f40348af3399'::uuid,
  $txt$Vlastní test 4 · 9. Obdélník s vrcholem na kružnici$txt$,
  $txt$V rovině leží body A, B a kružnice k se středem S.

Úsečka AB je strana obdélníku ABCD. Vrchol C leží na kružnici k.

Sestrojte vrcholy C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a kružnice k se středem S.\n\nÚsečka AB je strana obdélníku ABCD. Vrchol C leží na kružnici k.\n\nSestrojte vrcholy C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":209,"y":445,"label":"A","locked":true},{"id":"pt-b","x":530,"y":378,"label":"B","locked":true},{"id":"pt-s","x":555,"y":167,"label":"S","locked":true},{"id":"pt-k-rim","x":665,"y":167,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 4 · 10. Rovnoramenný trojúhelník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'e6a47f1b-58dd-4bfd-b2ae-ae0022b1e811'::uuid,
  $txt$Vlastní test 4 · 10. Rovnoramenný trojúhelník s vrcholem na přímce$txt$,
  $txt$V rovině leží body K, L a přímka p.

Úsečka KL je základna rovnoramenného trojúhelníku KLM. Vrchol M leží na přímce p.

Sestrojte vrchol M, označte ho písmenem a trojúhelník KLM narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body K, L a přímka p.\n\nÚsečka KL je základna rovnoramenného trojúhelníku KLM. Vrchol M leží na přímce p.\n\nSestrojte vrchol M, označte ho písmenem a trojúhelník KLM narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":30,"y":74.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":785,"y":198.2,"label":"","locked":true,"hidden":true},{"id":"pt-k","x":187,"y":359,"label":"K","locked":true},{"id":"pt-l","x":431,"y":391,"label":"L","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 5 · 9. Trojúhelník s výškou a vrcholem na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '930e880e-5ddd-4b34-bdcb-a82df6df9749'::uuid,
  $txt$Vlastní test 5 · 9. Trojúhelník s výškou a vrcholem na kružnici$txt$,
  $txt$V rovině leží úsečka AB a kružnice k se středem S.

Sestrojte trojúhelník ABC, jehož výška na stranu AB měří 2 cm a vrchol C leží na kružnici k.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a kružnice k se středem S.\n\nSestrojte trojúhelník ABC, jehož výška na stranu AB měří 2 cm a vrchol C leží na kružnici k.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":520,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":200,"y":362,"label":"A","locked":true},{"id":"pt-b","x":522.4,"y":320.7,"label":"B","locked":true},{"id":"pt-s","x":396.5,"y":161.7,"label":"S","locked":true},{"id":"pt-k-rim","x":496.5,"y":161.7,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 5 · 10. Čtverec s úhlopříčkou na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '35ac1752-e8ca-49fe-9f9b-d71ff2bcee0d'::uuid,
  $txt$Vlastní test 5 · 10. Čtverec s úhlopříčkou na přímce$txt$,
  $txt$V rovině leží přímka p a bod B.

Úhlopříčka AC čtverce ABCD leží na přímce p.

Sestrojte vrcholy A, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a bod B.\n\nÚhlopříčka AC čtverce ABCD leží na přímce p.\n\nSestrojte vrcholy A, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":490,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":325,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":703.6,"y":229.5,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":428.9,"y":92.3,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 6 · 9. Body kružnice stejně vzdálené od dvou přímek
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'fd30e76c-6340-4925-88a7-f7c9327a2aad'::uuid,
  $txt$Vlastní test 6 · 9. Body kružnice stejně vzdálené od dvou přímek$txt$,
  $txt$V rovině leží různoběžky p, q a kružnice k se středem S.

Sestrojte všechny body X kružnice k, které mají od přímky p i od přímky q stejnou vzdálenost, a označte je.$txt$,
  null,
  $json$[{"text":"V rovině leží různoběžky p, q a kružnice k se středem S.\n\nSestrojte všechny body X kružnice k, které mají od přímky p i od přímky q stejnou vzdálenost, a označte je.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":460,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":397.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":703.6,"y":181.6,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":84,"y":50,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":501.1,"y":400,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":430,"y":240,"label":"S","locked":true},{"id":"pt-k-rim","x":580,"y":240,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test 6 · 10. Pravoúhlý trojúhelník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'e35fd27b-5243-4b37-8c61-6f6bab7a6bda'::uuid,
  $txt$Vlastní test 6 · 10. Pravoúhlý trojúhelník s vrcholem na přímce$txt$,
  $txt$V rovině leží úsečka AB a přímka p.

Úsečka AB je přepona pravoúhlého trojúhelníku ABC, jehož vrchol C leží na přímce p.

Sestrojte vrchol C, označte ho písmenem a trojúhelník ABC narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p.\n\nÚsečka AB je přepona pravoúhlého trojúhelníku ABC, jehož vrchol C leží na přímce p.\n\nSestrojte vrchol C, označte ho písmenem a trojúhelník ABC narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":540,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":161.8,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":708.2,"y":68.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":165.9,"y":314.2,"label":"A","locked":true},{"id":"pt-b","x":564.6,"y":281.8,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

commit;
