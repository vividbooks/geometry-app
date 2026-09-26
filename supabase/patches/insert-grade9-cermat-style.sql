-- 9. ročník: konstrukční úkoly ve stylu úloh CERMAT.
-- Vygenerováno skriptem scripts/build-cermat-assignments.ts — neupravovat ručně.

begin;

-- Kružnice vepsaná trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '8a0fdaf1-dbbe-4a3c-9a7a-7669f215fbb0'::uuid,
  $txt$Kružnice vepsaná trojúhelníku$txt$,
  $txt$V rovině leží trojúhelník ABC.

Kružnice k se dotýká všech tří stran trojúhelníku ABC.

Sestrojte střed S kružnice k, označte ho písmenem a kružnici k narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží trojúhelník ABC.\n\nKružnice k se dotýká všech tří stran trojúhelníku ABC.\n\nSestrojte střed S kružnice k, označte ho písmenem a kružnici k narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":130,"y":430,"label":"A","locked":true},{"id":"pt-b","x":650,"y":410,"label":"B","locked":true},{"id":"pt-c","x":390,"y":95,"label":"C","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"shape-bc","type":"segment","label":"","points":["pt-b","pt-c"],"locked":true,"definition":{"p1Id":"pt-b","p2Id":"pt-c"}},{"id":"shape-ca","type":"segment","label":"","points":["pt-c","pt-a"],"locked":true,"definition":{"p1Id":"pt-c","p2Id":"pt-a"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Trojúhelník s úhlem 45° a výškou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ca84c8dd-e051-4da8-9609-61ef53129a0d'::uuid,
  $txt$Trojúhelník s úhlem 45° a výškou$txt$,
  $txt$V rovině leží úsečka AB a bod M.

Úsečka AB je strana trojúhelníku ABC.
Velikost úhlu BAC je 45°.
Výška vc trojúhelníku ABC měří 3 cm.
Vrchol C leží v polorovině ABM.

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod M.\n\nÚsečka AB je strana trojúhelníku ABC.\nVelikost úhlu BAC je 45°.\nVýška vc trojúhelníku ABC měří 3 cm.\nVrchol C leží v polorovině ABM.\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":160,"y":410,"label":"A","locked":true},{"id":"pt-b","x":529.3,"y":344.9,"label":"B","locked":true},{"id":"pt-m","x":560,"y":90,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Pravoúhlý trojúhelník s danou odvěsnou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '3a93f766-6d0c-4ef1-bf93-6ce155da9d49'::uuid,
  $txt$Pravoúhlý trojúhelník s danou odvěsnou$txt$,
  $txt$V rovině leží úsečka AB.

Úsečka AB je přepona pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.
Odvěsna AC měří 4 cm.

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB.\n\nÚsečka AB je přepona pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.\nOdvěsna AC měří 4 cm.\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":250,"y":310,"label":"A","locked":true},{"id":"pt-b","x":592.4,"y":237.2,"label":"B","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Tečny rovnoběžné s přímkou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'bd9d361b-722c-404c-ab0a-34d5fcac6b9e'::uuid,
  $txt$Tečny rovnoběžné s přímkou$txt$,
  $txt$V rovině leží přímka p a kružnice k se středem S.

Přímky t₁ a t₂ jsou tečny kružnice k a obě jsou rovnoběžné s přímkou p.

Sestrojte body dotyku T₁, T₂ tečen t₁, t₂ s kružnicí k, označte je písmeny a obě tečny narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a kružnice k se středem S.\n\nPřímky t₁ a t₂ jsou tečny kružnice k a obě jsou rovnoběžné s přímkou p.\n\nSestrojte body dotyku T₁, T₂ tečen t₁, t₂ s kružnicí k, označte je písmeny a obě tečny narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":84.5,"y":30,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":289.7,"y":470,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":470,"y":265,"label":"S","locked":true},{"id":"pt-k-rim","x":595,"y":265,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Kružnice dotýkající se dvou přímek
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'daabc2f6-50e6-4279-a405-e6e1755e0070'::uuid,
  $txt$Kružnice dotýkající se dvou přímek$txt$,
  $txt$V rovině leží různoběžky p, q a bod T na přímce p.

Kružnice k se dotýká přímky p v bodě T a zároveň se dotýká přímky q.

Sestrojte střed S kružnice k, označte ho písmenem a kružnici k narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží různoběžky p, q a bod T na přímce p.\n\nKružnice k se dotýká přímky p v bodě T a zároveň se dotýká přímky q.\n\nSestrojte střed S kružnice k, označte ho písmenem a kružnici k narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":540,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":399,"y":510,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":622.8,"y":30,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":30,"y":396.2,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":675.2,"y":510,"label":"","locked":true,"hidden":true},{"id":"pt-t","x":479.2,"y":338.1,"label":"T","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Rovnostranný trojúhelník vepsaný do kružnice
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '03923a22-64e3-4d41-b1e1-d613e193469a'::uuid,
  $txt$Rovnostranný trojúhelník vepsaný do kružnice$txt$,
  $txt$V rovině leží kružnice k se středem S a bod A, který leží na kružnici k.

Bod A je vrchol rovnostranného trojúhelníku ABC.
Všechny vrcholy trojúhelníku ABC leží na kružnici k.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží kružnice k se středem S a bod A, který leží na kružnici k.\n\nBod A je vrchol rovnostranného trojúhelníku ABC.\nVšechny vrcholy trojúhelníku ABC leží na kružnici k.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":400,"y":280,"label":"S","locked":true},{"id":"pt-a","x":237.7,"y":345.6,"label":"A","locked":true},{"id":"pt-k-rim","x":575,"y":280,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Obdélník z úhlopříčky a strany
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'f56c3372-661c-4d90-ad14-bfdc982778cb'::uuid,
  $txt$Obdélník z úhlopříčky a strany$txt$,
  $txt$V rovině leží úsečka AC.

Úsečka AC je úhlopříčka obdélníku ABCD.
Strana AB obdélníku ABCD má délku 3 cm.

Sestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AC.\n\nÚsečka AC je úhlopříčka obdélníku ABCD.\nStrana AB obdélníku ABCD má délku 3 cm.\n\nSestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":239,"y":324,"label":"A","locked":true},{"id":"pt-c","x":575,"y":226,"label":"C","locked":true}],"shapes":[{"id":"shape-ac","type":"segment","label":"","points":["pt-a","pt-c"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-c"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Kosočtverec s vrcholem na polopřímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '0619e1ad-eb62-489f-af79-67576a3ad352'::uuid,
  $txt$Kosočtverec s vrcholem na polopřímce$txt$,
  $txt$V rovině leží polopřímka AX a bod M.

Bod A je vrchol kosočtverce ABCD, jehož strany mají délku 4 cm.
Vrchol B leží na polopřímce AX.
Úhlopříčka AC kosočtverce ABCD leží na polopřímce AM.

Sestrojte vrcholy B, C, D kosočtverce ABCD, označte je písmeny a kosočtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží polopřímka AX a bod M.\n\nBod A je vrchol kosočtverce ABCD, jehož strany mají délku 4 cm.\nVrchol B leží na polopřímce AX.\nÚhlopříčka AC kosočtverce ABCD leží na polopřímce AM.\n\nSestrojte vrcholy B, C, D kosočtverce ABCD, označte je písmeny a kosočtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":150,"y":380,"label":"A","locked":true},{"id":"pt-x","x":626.4,"y":438.5,"label":"X","locked":true},{"id":"pt-m","x":282.4,"y":309.6,"label":"M","locked":true}],"shapes":[{"id":"shape-ax","type":"ray","label":"","points":["pt-a","pt-x"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-x"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Rovnoramenný lichoběžník s rameny 3 cm
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'bb89bf4c-dbe7-4a0a-ba5f-0946a98d72b7'::uuid,
  $txt$Rovnoramenný lichoběžník s rameny 3 cm$txt$,
  $txt$V rovině leží úsečka AB a přímka p, která je rovnoběžná s přímkou AB.

Úsečka AB je jedna ze základen rovnoramenného lichoběžníku ABCD.
Vrcholy C, D tohoto lichoběžníku leží na přímce p.
Ramena BC a AD mají délku 3 cm.

Sestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a přímka p, která je rovnoběžná s přímkou AB.\n\nÚsečka AB je jedna ze základen rovnoramenného lichoběžníku ABCD.\nVrcholy C, D tohoto lichoběžníku leží na přímce p.\nRamena BC a AD mají délku 3 cm.\n\nSestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":450,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":35,"y":312.4,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":780,"y":234.1,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":244.8,"y":390.8,"label":"A","locked":true},{"id":"pt-b","x":592.9,"y":354.2,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Trojúhelník s úhly 60° a 45°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '4ba5b152-9dc2-42fc-8fb1-1ce81e1a6709'::uuid,
  $txt$Trojúhelník s úhly 60° a 45°$txt$,
  $txt$V rovině leží úsečka AB a bod M.

Úsečka AB je strana trojúhelníku ABC.
Úhel BAC má velikost 60° a úhel ABC má velikost 45°.
Vrchol C leží v polorovině ABM.

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod M.\n\nÚsečka AB je strana trojúhelníku ABC.\nÚhel BAC má velikost 60° a úhel ABC má velikost 45°.\nVrchol C leží v polorovině ABM.\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":170,"y":420,"label":"A","locked":true},{"id":"pt-b","x":519.1,"y":395.6,"label":"B","locked":true},{"id":"pt-m","x":660,"y":215,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Úsečka se středem v daném bodě
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'eb989d60-d80e-49ef-a012-da8378c440d5'::uuid,
  $txt$Úsečka se středem v daném bodě$txt$,
  $txt$V rovině leží polopřímky VX, VY a bod P.

Bod K leží na polopřímce VX a bod L leží na polopřímce VY.
Bod P je středem úsečky KL.

Sestrojte body K, L, označte je písmeny a úsečku KL narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží polopřímky VX, VY a bod P.\n\nBod K leží na polopřímce VX a bod L leží na polopřímce VY.\nBod P je středem úsečky KL.\n\nSestrojte body K, L, označte je písmeny a úsečku KL narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":470,"label":"","locked":true,"hidden":true},{"id":"pt-v","x":100,"y":420,"label":"V","locked":true},{"id":"pt-x","x":757.5,"y":362.5,"label":"X","locked":true},{"id":"pt-y","x":226.5,"y":72.3,"label":"Y","locked":true},{"id":"pt-p","x":375.4,"y":259.4,"label":"P","locked":true}],"shapes":[{"id":"shape-vx","type":"ray","label":"","points":["pt-v","pt-x"],"locked":true,"definition":{"p1Id":"pt-v","p2Id":"pt-x"}},{"id":"shape-vy","type":"ray","label":"","points":["pt-v","pt-y"],"locked":true,"definition":{"p1Id":"pt-v","p2Id":"pt-y"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Body, ze kterých je úsečka vidět pod pravým úhlem
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '2fade1e1-0466-4cc2-8851-20cd375e5e63'::uuid,
  $txt$Body, ze kterých je úsečka vidět pod pravým úhlem$txt$,
  $txt$V rovině leží body A, B a přímka p.

Bod X leží na přímce p a úhel AXB je pravý.

Sestrojte bod X, označte ho písmenem a narýsujte trojúhelník ABX.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a přímka p.\n\nBod X leží na přímce p a úhel AXB je pravý.\n\nSestrojte bod X, označte ho písmenem a narýsujte trojúhelník ABX.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":470,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":410,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":676.4,"y":345.1,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":240,"y":290,"label":"A","locked":true},{"id":"pt-b","x":540,"y":240,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Čtverec se stranou na přímce a vrcholem na rovnoběžce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '3dff88fd-0008-4471-8626-8c98c4bfadc7'::uuid,
  $txt$Čtverec se stranou na přímce a vrcholem na rovnoběžce$txt$,
  $txt$V rovině leží rovnoběžné přímky p, q a bod A, který leží na přímce p.

Bod A je vrchol čtverce ABCD.
Strana AB tohoto čtverce leží na přímce p a vrchol D leží na přímce q.

Sestrojte vrcholy B, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží rovnoběžné přímky p, q a bod A, který leží na přímce p.\n\nBod A je vrchol čtverce ABCD.\nStrana AB tohoto čtverce leží na přímce p a vrchol D leží na přímce q.\n\nSestrojte vrcholy B, C, D čtverce ABCD, označte je písmeny a čtverec narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":490,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":47.9,"y":444.8,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":681.5,"y":310.1,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":40.8,"y":267.4,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":681,"y":131.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":400,"y":370,"label":"A","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Rovnostranný trojúhelník se stranou na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'a3d3599b-fc00-4380-a137-351b9856bf91'::uuid,
  $txt$Rovnostranný trojúhelník se stranou na přímce$txt$,
  $txt$V rovině leží bod A a přímka p.

Bod A je vrchol rovnostranného trojúhelníku ABC.
Vrcholy B a C tohoto trojúhelníku leží na přímce p.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod A a přímka p.\n\nBod A je vrchol rovnostranného trojúhelníku ABC.\nVrcholy B a C tohoto trojúhelníku leží na přímce p.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":430,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":54.6,"y":273.3,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":682.2,"y":361.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":330,"y":110,"label":"A","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Pravoúhlý trojúhelník s výškou na přeponu
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '75c7a4c0-1416-44e2-a989-26d2b1443bf2'::uuid,
  $txt$Pravoúhlý trojúhelník s výškou na přeponu$txt$,
  $txt$V rovině leží úsečka AB a bod M.

Úsečka AB je přepona pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.
Výška vc tohoto trojúhelníku měří 2 cm.
Vrchol C leží v polorovině ABM.

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod M.\n\nÚsečka AB je přepona pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.\nVýška vc tohoto trojúhelníku měří 2 cm.\nVrchol C leží v polorovině ABM.\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":226.7,"y":255.6,"label":"A","locked":true},{"id":"pt-b","x":573.3,"y":304.4,"label":"B","locked":true},{"id":"pt-m","x":680,"y":140,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Obdélník s úhlem úhlopříček 60°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '0333c78c-011e-4dc9-bf88-4280ec182d1d'::uuid,
  $txt$Obdélník s úhlem úhlopříček 60°$txt$,
  $txt$V rovině leží body A, C.

Úsečka AC je úhlopříčka obdélníku ABCD.
Úhlopříčky obdélníku ABCD svírají úhel 60°.

Sestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, C.\n\nÚsečka AC je úhlopříčka obdélníku ABCD.\nÚhlopříčky obdélníku ABCD svírají úhel 60°.\n\nSestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":238,"y":320.3,"label":"A","locked":true},{"id":"pt-c","x":576,"y":229.7,"label":"C","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Rovnoběžník s úhlem 135°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '7ffe484f-5940-4187-9c09-df105565f64a'::uuid,
  $txt$Rovnoběžník s úhlem 135°$txt$,
  $txt$V rovině leží úsečka AB a bod M.

Úsečka AB je strana rovnoběžníku ABCD.
Strana AD má délku 3 cm a úhel DAB má velikost 135°.
Vrchol D leží v polorovině ABM.

Sestrojte vrcholy C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod M.\n\nÚsečka AB je strana rovnoběžníku ABCD.\nStrana AD má délku 3 cm a úhel DAB má velikost 135°.\nVrchol D leží v polorovině ABM.\n\nSestrojte vrcholy C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":340,"y":370,"label":"A","locked":true},{"id":"pt-b","x":637.1,"y":328.2,"label":"B","locked":true},{"id":"pt-m","x":660,"y":160,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Nejkratší cesta přes přímku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '35635a11-fddf-4ee6-b3ab-51487ab0fc74'::uuid,
  $txt$Nejkratší cesta přes přímku$txt$,
  $txt$V rovině leží přímka p a body A, B v jedné polorovině s hraniční přímkou p.

Na přímce p leží bod X.
Součet délek úseček AX a XB je co nejmenší.

Sestrojte bod X, označte ho písmenem a narýsujte lomenou čáru AXB.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a body A, B v jedné polorovině s hraniční přímkou p.\n\nNa přímce p leží bod X.\nSoučet délek úseček AX a XB je co nejmenší.\n\nSestrojte bod X, označte ho písmenem a narýsujte lomenou čáru AXB.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":40,"y":350,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":775,"y":310,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":170,"y":140,"label":"A","locked":true},{"id":"pt-b","x":600,"y":230,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Kružnice dotýkající se kružnice zvenku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '985e4fcc-953c-4b90-b45d-71ee01fbfdc7'::uuid,
  $txt$Kružnice dotýkající se kružnice zvenku$txt$,
  $txt$V rovině leží kružnice k se středem S a bod A.

Kružnice k má poloměr 2,5 cm.
Kružnice l má poloměr 1,5 cm a prochází bodem A.
Kružnice l se dotýká kružnice k zvenku.

Sestrojte střed O kružnice l, označte ho písmenem a kružnici l narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží kružnice k se středem S a bod A.\n\nKružnice k má poloměr 2,5 cm.\nKružnice l má poloměr 1,5 cm a prochází bodem A.\nKružnice l se dotýká kružnice k zvenku.\n\nSestrojte střed O kružnice l, označte ho písmenem a kružnici l narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":530,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":340,"y":280,"label":"S","locked":true},{"id":"pt-a","x":545.4,"y":323.7,"label":"A","locked":true},{"id":"pt-k-rim","x":465,"y":280,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- Rovnoramenný trojúhelník vepsaný kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'da14d317-f0e7-42fb-a4d2-e008cf0ecc3a'::uuid,
  $txt$Rovnoramenný trojúhelník vepsaný kružnici$txt$,
  $txt$V rovině leží kružnice k se středem S a bod A na kružnici k.

Bod A je vrchol rovnoramenného trojúhelníku ABC se základnou BC.
Všechny vrcholy trojúhelníku ABC leží na kružnici k.
Ramena trojúhelníku ABC mají délku 5 cm.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží kružnice k se středem S a bod A na kružnici k.\n\nBod A je vrchol rovnoramenného trojúhelníku ABC se základnou BC.\nVšechny vrcholy trojúhelníku ABC leží na kružnici k.\nRamena trojúhelníku ABC mají délku 5 cm.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":500,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":407,"y":275,"label":"S","locked":true},{"id":"pt-a","x":277.1,"y":350,"label":"A","locked":true},{"id":"pt-k-rim","x":557,"y":275,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

commit;
