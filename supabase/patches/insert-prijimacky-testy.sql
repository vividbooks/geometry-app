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

-- Vlastní test 2 · 10. Kosočtverec z úhlopříčky a strany
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '4f2ac3f0-bc59-4c7f-84c4-ce1d671c5a9a'::uuid,
  $txt$Vlastní test 2 · 10. Kosočtverec z úhlopříčky a strany$txt$,
  $txt$V rovině leží body A a C. Úsečka AC je úhlopříčka kosočtverce ABCD, jehož strana měří 4 cm.

Sestrojte vrcholy B a D, označte je písmeny a kosočtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A a C. Úsečka AC je úhlopříčka kosočtverce ABCD, jehož strana měří 4 cm.\n\nSestrojte vrcholy B a D, označte je písmeny a kosočtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":266.05,"y":301.3,"label":"A","locked":true},{"id":"pt-c","x":547.95,"y":198.7,"label":"C","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
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

-- Vlastní test A5 · 9. Kružnice dotýkající se přímky v daném bodě
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '027f44c0-e12f-477d-9ea8-624dda6064e7'::uuid,
  $txt$Vlastní test A5 · 9. Kružnice dotýkající se přímky v daném bodě$txt$,
  $txt$V rovině leží přímka p s bodem T a bod M, který na přímce p neleží.

Sestrojte kružnici k, která se dotýká přímky p v bodě T a prochází bodem M.
Střed kružnice označte S a kružnici narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p s bodem T a bod M, který na přímce p neleží.\n\nSestrojte kružnici k, která se dotýká přímky p v bodě T a prochází bodem M.\nStřed kružnice označte S a kružnici narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":480,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":436.4,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":703.6,"y":319.4,"label":"","locked":true,"hidden":true},{"id":"pt-t","x":360,"y":380,"label":"T","locked":true},{"id":"pt-m","x":450.4,"y":201.6,"label":"M","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test A5 · 10. Pravoúhlý trojúhelník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ce35b9bc-885e-4c96-9e42-fc36ddfb7a69'::uuid,
  $txt$Vlastní test A5 · 10. Pravoúhlý trojúhelník s vrcholem na přímce$txt$,
  $txt$V rovině leží úsečka AB a přímka p.

Sestrojte trojúhelník ABC s pravým úhlem při vrcholu B, jehož vrchol C leží na přímce p.
Vrchol C označte písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p.\n\nSestrojte trojúhelník ABC s pravým úhlem při vrcholu B, jehož vrchol C leží na přímce p.\nVrchol C označte písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":470,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":376.9,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":703.6,"y":135.4,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":180,"y":410,"label":"A","locked":true},{"id":"pt-b","x":430,"y":410,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test A6 · 9. Body v dané vzdálenosti od bodu a od přímky
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '674995d6-a63c-494b-9a86-4dae91f5a9d7'::uuid,
  $txt$Vlastní test A6 · 9. Body v dané vzdálenosti od bodu a od přímky$txt$,
  $txt$V rovině leží přímka p a bod S, který na přímce p neleží.

Sestrojte všechny body X, které mají od bodu S vzdálenost 3 cm a od přímky p vzdálenost 1 cm.
Body označte X₁, X₂, …$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a bod S, který na přímce p neleží.\n\nSestrojte všechny body X, které mají od bodu S vzdálenost 3 cm a od přímky p vzdálenost 1 cm.\nBody označte X₁, X₂, …","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":420,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":295,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":703.6,"y":295,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":410,"y":220,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test A6 · 10. Trojúhelník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ed349788-10f5-4e92-bf6a-939a7dbbf2b2'::uuid,
  $txt$Vlastní test A6 · 10. Trojúhelník s vrcholem na přímce$txt$,
  $txt$V rovině leží úsečka AB a přímka p.

Sestrojte všechny trojúhelníky ABC, pro které platí |AC| = 5 cm a vrchol C leží na přímce p.
Trojúhelníky narýsujte a jejich vrcholy označte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p.\n\nSestrojte všechny trojúhelníky ABC, pro které platí |AC| = 5 cm a vrchol C leží na přímce p.\nTrojúhelníky narýsujte a jejich vrcholy označte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":400,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":47,"y":284,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":695,"y":95,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":425,"y":330,"label":"A","locked":true},{"id":"pt-b","x":625,"y":330,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test A7 · 9. Kružnice vepsaná do úhlu
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '6cf98d8f-9775-49de-8203-24dc967f3f0e'::uuid,
  $txt$Vlastní test A7 · 9. Kružnice vepsaná do úhlu$txt$,
  $txt$V rovině leží úhel AVB (polopřímky VA a VB) a na jeho rameni VA bod T.

Sestrojte kružnici k, která se dotýká obou ramen úhlu, přičemž ramene VA se dotýká v bodě T.
Střed kružnice označte S a kružnici narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úhel AVB (polopřímky VA a VB) a na jeho rameni VA bod T.\n\nSestrojte kružnici k, která se dotýká obou ramen úhlu, přičemž ramene VA se dotýká v bodě T.\nStřed kružnice označte S a kružnici narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":480,"label":"","locked":true,"hidden":true},{"id":"pt-v","x":200,"y":420,"label":"V","locked":true},{"id":"pt-a","x":575,"y":420,"label":"A","locked":true},{"id":"pt-b","x":350,"y":160.19,"label":"B","locked":true},{"id":"pt-t","x":400,"y":420,"label":"T","locked":true}],"shapes":[{"id":"shape-va","type":"ray","label":"","points":["pt-v","pt-a"],"locked":true,"definition":{"p1Id":"pt-v","p2Id":"pt-a"}},{"id":"shape-vb","type":"ray","label":"","points":["pt-v","pt-b"],"locked":true,"definition":{"p1Id":"pt-v","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test A7 · 10. Lichoběžník ze tří vrcholů
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '7dc9ef65-bfe5-44a8-8518-22ff5823d375'::uuid,
  $txt$Vlastní test A7 · 10. Lichoběžník ze tří vrcholů$txt$,
  $txt$V rovině leží body A, B a D, které neleží na jedné přímce.

Sestrojte lichoběžník ABCD se základnami AB a CD, jehož základna CD měří 3 cm.
Vrchol C označte a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a D, které neleží na jedné přímce.\n\nSestrojte lichoběžník ABCD se základnami AB a CD, jehož základna CD měří 3 cm.\nVrchol C označte a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":400,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":270,"y":330,"label":"A","locked":true},{"id":"pt-b","x":567.08,"y":288.25,"label":"B","locked":true},{"id":"pt-d","x":300.39,"y":157.66,"label":"D","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B3 · 9. Rovnoramenný trojúhelník s vrcholem ve vzdálenosti 3 cm od bodu
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '3013ed8b-09cc-4e06-b3ff-f5cc6421f05d'::uuid,
  $txt$Vlastní test B3 · 9. Rovnoramenný trojúhelník s vrcholem ve vzdálenosti 3 cm od bodu$txt$,
  $txt$V rovině leží úsečka AB a bod M.

Sestrojte všechny rovnoramenné trojúhelníky ABC se základnou AB, jejichž vrchol C má od bodu M vzdálenost 3 cm.
Vrcholy C označte a trojúhelníky narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod M.\n\nSestrojte všechny rovnoramenné trojúhelníky ABC se základnou AB, jejichž vrchol C má od bodu M vzdálenost 3 cm.\nVrcholy C označte a trojúhelníky narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":140,"y":265,"label":"A","locked":true},{"id":"pt-b","x":440,"y":265,"label":"B","locked":true},{"id":"pt-m","x":380,"y":240,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B3 · 10. Trojúhelník z průsečíku výšek
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'eced3462-accd-4bda-aa0e-f410890397ba'::uuid,
  $txt$Vlastní test B3 · 10. Trojúhelník z průsečíku výšek$txt$,
  $txt$V rovině leží body A, B a V. Bod A a bod B jsou vrcholy trojúhelníku ABC. Bod V je průsečík výšek trojúhelníku ABC a leží uvnitř trojúhelníku.

Sestrojte vrchol C, označte ho a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a V. Bod A a bod B jsou vrcholy trojúhelníku ABC. Bod V je průsečík výšek trojúhelníku ABC a leží uvnitř trojúhelníku.\n\nSestrojte vrchol C, označte ho a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":630,"y":480,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":115,"y":390,"label":"A","locked":true},{"id":"pt-b","x":515,"y":390,"label":"B","locked":true},{"id":"pt-v","x":265,"y":265,"label":"V","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B4 · 9. Úsečka se středem v daném bodě
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '4d9f1111-c9ed-4623-8ca6-6e0a845b22ab'::uuid,
  $txt$Vlastní test B4 · 9. Úsečka se středem v daném bodě$txt$,
  $txt$V rovině leží přímka p, kružnice k se středem O a bod S.

Sestrojte všechny úsečky XY, jejichž středem je bod S, bod X leží na přímce p a bod Y leží na kružnici k.
Krajní body úseček označte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p, kružnice k se středem O a bod S.\n\nSestrojte všechny úsečky XY, jejichž středem je bod S, bod X leží na přímce p a bod Y leží na kružnici k.\nKrajní body úseček označte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":440,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":440,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":340,"y":340,"label":"S","locked":true},{"id":"pt-o","x":440,"y":180,"label":"O","locked":true},{"id":"pt-k-rim","x":540,"y":180,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-o","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-o","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B4 · 10. Trojúhelník z těžiště
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '82c5a5f1-5e14-45d6-aa7b-f020465f2dcb'::uuid,
  $txt$Vlastní test B4 · 10. Trojúhelník z těžiště$txt$,
  $txt$V rovině leží body A, B a T. Body A, B jsou vrcholy trojúhelníku ABC a bod T je jeho těžiště.

Sestrojte vrchol C, označte ho a trojúhelník ABC narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a T. Body A, B jsou vrcholy trojúhelníku ABC a bod T je jeho těžiště.\n\nSestrojte vrchol C, označte ho a trojúhelník ABC narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":140,"y":415,"label":"A","locked":true},{"id":"pt-b","x":490,"y":415,"label":"B","locked":true},{"id":"pt-t","x":365,"y":315,"label":"T","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B5 · 9. Osa souměrnosti daným bodem
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '76b5bc23-ee12-4efd-97b5-c037a1ed04e0'::uuid,
  $txt$Vlastní test B5 · 9. Osa souměrnosti daným bodem$txt$,
  $txt$V rovině leží úsečka AB, bod M a přímka p. Úsečka A′B′ je obrazem úsečky AB v osové souměrnosti s osou o. Osa o prochází bodem M a bod A′ leží na přímce p.

Sestrojte všechny takové osy o a pro každou z nich úsečku A′B′. Osy i krajní body úseček označte. Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB, bod M a přímka p. Úsečka A′B′ je obrazem úsečky AB v osové souměrnosti s osou o. Osa o prochází bodem M a bod A′ leží na přímce p.\n\nSestrojte všechny takové osy o a pro každou z nich úsečku A′B′. Osy i krajní body úseček označte. Najděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":330,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":620,"y":330,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":215,"y":240,"label":"A","locked":true},{"id":"pt-b","x":265,"y":90,"label":"B","locked":true},{"id":"pt-m","x":365,"y":240,"label":"M","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B5 · 10. Lichoběžník ze středu ramene
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '18a46298-7db2-48e7-8fa4-7b6d1da090f6'::uuid,
  $txt$Vlastní test B5 · 10. Lichoběžník ze středu ramene$txt$,
  $txt$V rovině leží body A, D a S. Body A, D jsou vrcholy lichoběžníku ABCD se základnami AB a CD. Bod S je střed ramene BC a základna CD měří 3 cm.

Sestrojte vrcholy B, C lichoběžníku ABCD, označte je a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, D a S. Body A, D jsou vrcholy lichoběžníku ABCD se základnami AB a CD. Bod S je střed ramene BC a základna CD měří 3 cm.\n\nSestrojte vrcholy B, C lichoběžníku ABCD, označte je a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":90,"y":415,"label":"A","locked":true},{"id":"pt-d","x":140,"y":165,"label":"D","locked":true},{"id":"pt-s","x":365,"y":290,"label":"S","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B6 · 9. Rovnoběžníky ze tří vrcholů
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '8682943e-b3ac-457a-89b9-fe05aa306ee2'::uuid,
  $txt$Vlastní test B6 · 9. Rovnoběžníky ze tří vrcholů$txt$,
  $txt$V rovině leží body K, L a M, které neleží na jedné přímce.

Sestrojte všechny rovnoběžníky, jejichž tři vrcholy jsou body K, L a M. Čtvrtý vrchol každého rovnoběžníku označte (N₁, N₂, …) a rovnoběžníky narýsujte. Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body K, L a M, které neleží na jedné přímce.\n\nSestrojte všechny rovnoběžníky, jejichž tři vrcholy jsou body K, L a M. Čtvrtý vrchol každého rovnoběžníku označte (N₁, N₂, …) a rovnoběžníky narýsujte. Najděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-k","x":290,"y":315,"label":"K","locked":true},{"id":"pt-l","x":440,"y":340,"label":"L","locked":true},{"id":"pt-m","x":365,"y":215,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B6 · 10. Rovnoramenný trojúhelník z osy a bodu na rameni
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'd4ee7c4c-695c-4b92-9c9c-6d2f406b55ce'::uuid,
  $txt$Vlastní test B6 · 10. Rovnoramenný trojúhelník z osy a bodu na rameni$txt$,
  $txt$V rovině leží přímka o a body A, M. Přímka o je osou souměrnosti rovnoramenného trojúhelníku ABC se základnou AB. Bod M leží na rameni BC tohoto trojúhelníku.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka o a body A, M. Přímka o je osou souměrnosti rovnoramenného trojúhelníku ABC se základnou AB. Bod M leží na rameni BC tohoto trojúhelníku.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":502.5,"y":490,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":202.5,"y":90,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":290,"y":415,"label":"A","locked":true},{"id":"pt-m","x":378,"y":199,"label":"M","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B7 · 9. Trojúhelník s osou úhlu a vrcholem na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '4560a048-0cb0-44bb-977d-ac45711ff4a1'::uuid,
  $txt$Vlastní test B7 · 9. Trojúhelník s osou úhlu a vrcholem na kružnici$txt$,
  $txt$V rovině leží úsečka AB, přímka o a kružnice k se středem K. Přímka o prochází bodem A a je osou vnitřního úhlu BAC trojúhelníku ABC. Vrchol C leží na kružnici k.

Sestrojte všechny takové trojúhelníky ABC, vrcholy C označte (C₁, C₂, …) a trojúhelníky narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB, přímka o a kružnice k se středem K. Přímka o prochází bodem A a je osou vnitřního úhlu BAC trojúhelníku ABC. Vrchol C leží na kružnici k.\n\nSestrojte všechny takové trojúhelníky ABC, vrcholy C označte (C₁, C₂, …) a trojúhelníky narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":115,"y":465,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":615,"y":215,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":165,"y":440,"label":"A","locked":true},{"id":"pt-b","x":515,"y":440,"label":"B","locked":true},{"id":"pt-k","x":220,"y":200,"label":"K","locked":true},{"id":"pt-kk-rim","x":345,"y":200,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"shape-kk","type":"circle","label":"k","points":["pt-k","pt-kk-rim"],"locked":true,"definition":{"p1Id":"pt-k","p2Id":"pt-kk-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B7 · 10. Obdélník se středem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'e4bd0630-04f3-48cf-9a7f-591dbb7c927e'::uuid,
  $txt$Vlastní test B7 · 10. Obdélník se středem na přímce$txt$,
  $txt$V rovině leží úsečka AB a přímka p. Úsečka AB je strana obdélníku ABCD. Střed S obdélníku ABCD (průsečík jeho úhlopříček) leží na přímce p.

Sestrojte střed S a vrcholy C, D, označte je a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p. Úsečka AB je strana obdélníku ABCD. Střed S obdélníku ABCD (průsečík jeho úhlopříček) leží na přímce p.\n\nSestrojte střed S a vrcholy C, D, označte je a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":165,"y":315,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":615,"y":165,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":190,"y":365,"label":"A","locked":true},{"id":"pt-b","x":440,"y":365,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B8 · 9. Rovnoramenný lichoběžník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'a51c637a-b205-4830-8c79-815ea8df4351'::uuid,
  $txt$Vlastní test B8 · 9. Rovnoramenný lichoběžník s vrcholem na přímce$txt$,
  $txt$V rovině leží úsečka AB a přímka p. Úsečka AB je základna rovnoramenného lichoběžníku ABCD. Vrchol D leží na přímce p a rameno AD měří 3 cm.

Sestrojte všechny takové lichoběžníky, vrcholy označte (C₁, D₁, …) a lichoběžníky narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p. Úsečka AB je základna rovnoramenného lichoběžníku ABCD. Vrchol D leží na přímce p a rameno AD měří 3 cm.\n\nSestrojte všechny takové lichoběžníky, vrcholy označte (C₁, D₁, …) a lichoběžníky narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":65,"y":205.909,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":615,"y":305.909,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":190,"y":365,"label":"A","locked":true},{"id":"pt-b","x":540,"y":365,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Vlastní test B8 · 10. Pravoúhlý rovnoramenný trojúhelník s přeponou na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '01be6bbb-1410-4a7d-8960-3ccdd1c42848'::uuid,
  $txt$Vlastní test B8 · 10. Pravoúhlý rovnoramenný trojúhelník s přeponou na přímce$txt$,
  $txt$V rovině leží bod C a přímka p. Bod C je vrchol pravoúhlého rovnoramenného trojúhelníku ABC s pravým úhlem při vrcholu C. Přepona AB leží na přímce p.

Sestrojte vrcholy A, B, označte je a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod C a přímka p. Bod C je vrchol pravoúhlého rovnoramenného trojúhelníku ABC s pravým úhlem při vrcholu C. Přepona AB leží na přímce p.\n\nSestrojte vrcholy A, B, označte je a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":730,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":90,"y":108.75,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":490,"y":408.75,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":455,"y":195,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

commit;
