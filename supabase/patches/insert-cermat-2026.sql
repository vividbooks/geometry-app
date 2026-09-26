-- Sekce CERMAT: konstrukční úlohy 9 a 10 z jednotné přijímací zkoušky 2026 (čtyřleté obory).
-- Vygenerováno skriptem scripts/build-cermat-assignments.ts — neupravovat ručně.

begin;

-- 2026 · 1. řádný termín · 9. Trojúhelník ke dvěma přímkám
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '046da8bc-3b22-44ff-b1e3-231a94b03dd6'::uuid,
  $txt$2026 · 1. řádný termín · 9. Trojúhelník ke dvěma přímkám$txt$,
  $txt$V rovině leží bod A a přímky b, c.

Bod A je vrchol trojúhelníku ABC.
Strana AB tohoto trojúhelníku je kolmá k přímce b a vrchol B leží na přímce b.
Strana BC je o 2 cm delší než strana AB a vrchol C leží na přímce c.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží bod A a přímky b, c.\n\nBod A je vrchol trojúhelníku ABC.\nStrana AB tohoto trojúhelníku je kolmá k přímce b a vrchol B leží na přímce b.\nStrana BC je o 2 cm delší než strana AB a vrchol C leží na přímce c.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":521,"label":"","locked":true,"hidden":true},{"id":"pt-b1","x":342.5,"y":488.5,"label":"","locked":true,"hidden":true},{"id":"pt-b2","x":431,"y":63.5,"label":"","locked":true,"hidden":true},{"id":"pt-c1","x":32.2,"y":126.6,"label":"","locked":true,"hidden":true},{"id":"pt-c2","x":707,"y":352.6,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":139.5,"y":378.7,"label":"A","locked":true}],"shapes":[{"id":"line-b","type":"line","label":"b","points":["pt-b1","pt-b2"],"locked":true,"definition":{"p1Id":"pt-b1","p2Id":"pt-b2"}},{"id":"line-c","type":"line","label":"c","points":["pt-c1","pt-c2"],"locked":true,"definition":{"p1Id":"pt-c1","p2Id":"pt-c2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 1. řádný termín · 10. Rovnoběžník s osou souměrnosti
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'f9d688a0-31c3-4eec-bfc1-e648bc9ada54'::uuid,
  $txt$2026 · 1. řádný termín · 10. Rovnoběžník s osou souměrnosti$txt$,
  $txt$V rovině leží bod A a přímka o.

Bod A je vrchol rovnoběžníku ABCD.
Přímka o je osou souměrnosti tohoto rovnoběžníku a leží na ní vrcholy B, D.
Úhlopříčka BD rovnoběžníku ABCD je dvakrát delší než úhlopříčka AC.

Sestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod A a přímka o.\n\nBod A je vrchol rovnoběžníku ABCD.\nPřímka o je osou souměrnosti tohoto rovnoběžníku a leží na ní vrcholy B, D.\nÚhlopříčka BD rovnoběžníku ABCD je dvakrát delší než úhlopříčka AC.\n\nSestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":446,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":33.4,"y":116,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":707.4,"y":337,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":356.9,"y":370.4,"label":"A","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 2. řádný termín · 9. Pravidelný šestiúhelník
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '284a261e-1323-404c-8d69-b90f4ffdd8d8'::uuid,
  $txt$2026 · 2. řádný termín · 9. Pravidelný šestiúhelník$txt$,
  $txt$V rovině leží body A, O, P.

Bod A je vrchol pravidelného šestiúhelníku ABCDEF.
Přímka OP je osa strany AB tohoto šestiúhelníku.
Na polopřímce OP leží střed souměrnosti S šestiúhelníku ABCDEF.

Sestrojte vrcholy B, C, D, E, F šestiúhelníku ABCDEF, označte je písmeny a šestiúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, O, P.\n\nBod A je vrchol pravidelného šestiúhelníku ABCDEF.\nPřímka OP je osa strany AB tohoto šestiúhelníku.\nNa polopřímce OP leží střed souměrnosti S šestiúhelníku ABCDEF.\n\nSestrojte vrcholy B, C, D, E, F šestiúhelníku ABCDEF, označte je písmeny a šestiúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":471,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":151.1,"y":229.4,"label":"A","locked":true},{"id":"pt-o","x":134.8,"y":328.5,"label":"O","locked":true},{"id":"pt-p","x":570.2,"y":138.4,"label":"P","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 2. řádný termín · 10. Dva pravoúhlé trojúhelníky
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '33c47712-dbb7-4ebb-a43c-d1fcab735d1e'::uuid,
  $txt$2026 · 2. řádný termín · 10. Dva pravoúhlé trojúhelníky$txt$,
  $txt$V rovině leží body A, B, D.

Body A a B jsou vrcholy pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.
Body B a D jsou vrcholy pravoúhlého trojúhelníku BCD s pravým úhlem při vrcholu C.
(Vrcholy B a C jsou společnými vrcholy obou trojúhelníků.)

Sestrojte vrchol C, označte ho písmenem a narýsujte trojúhelníky ABC a BCD.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B, D.\n\nBody A a B jsou vrcholy pravoúhlého trojúhelníku ABC s pravým úhlem při vrcholu C.\nBody B a D jsou vrcholy pravoúhlého trojúhelníku BCD s pravým úhlem při vrcholu C.\n(Vrcholy B a C jsou společnými vrcholy obou trojúhelníků.)\n\nSestrojte vrchol C, označte ho písmenem a narýsujte trojúhelníky ABC a BCD.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":546,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":286.8,"y":231.6,"label":"A","locked":true},{"id":"pt-b","x":587.2,"y":231.6,"label":"B","locked":true},{"id":"pt-d","x":152,"y":477.9,"label":"D","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 1. náhradní termín · 9. Rovnoramenný trojúhelník se středy stran
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '5b33aef9-b257-4238-8fd7-195745c28f33'::uuid,
  $txt$2026 · 1. náhradní termín · 9. Rovnoramenný trojúhelník se středy stran$txt$,
  $txt$V rovině leží body A, S a přímka p procházející bodem A.

Bod A je vrchol rovnoramenného trojúhelníku ABC, jehož strany AC a BC mají stejnou délku.
Bod S je střed strany AC a na přímce p leží střed P strany BC trojúhelníku ABC.

Sestrojte vrchol C, střed P a vrchol B, označte je písmeny a narýsujte trojúhelník ABC.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, S a přímka p procházející bodem A.\n\nBod A je vrchol rovnoramenného trojúhelníku ABC, jehož strany AC a BC mají stejnou délku.\nBod S je střed strany AC a na přímce p leží střed P strany BC trojúhelníku ABC.\n\nSestrojte vrchol C, střed P a vrchol B, označte je písmeny a narýsujte trojúhelník ABC.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":521,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":68.6,"y":385.7,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":631.6,"y":140.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":131.7,"y":358.2,"label":"A","locked":true},{"id":"pt-s","x":243.4,"y":232,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 1. náhradní termín · 10. Obdélník se středem V
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '43f19b67-3f62-41f2-a75b-ef0f62d76310'::uuid,
  $txt$2026 · 1. náhradní termín · 10. Obdélník se středem V$txt$,
  $txt$V rovině leží body U, V a přímka k.

Bod U leží uvnitř strany KN obdélníku KLMN.
Na přímce k leží strana KL tohoto obdélníku.
Bod V má stejnou vzdálenost od všech čtyř vrcholů obdélníku KLMN.

Sestrojte všechny vrcholy obdélníku KLMN, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body U, V a přímka k.\n\nBod U leží uvnitř strany KN obdélníku KLMN.\nNa přímce k leží strana KL tohoto obdélníku.\nBod V má stejnou vzdálenost od všech čtyř vrcholů obdélníku KLMN.\n\nSestrojte všechny vrcholy obdélníku KLMN, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":546,"label":"","locked":true,"hidden":true},{"id":"pt-k1","x":57.6,"y":461.4,"label":"","locked":true,"hidden":true},{"id":"pt-k2","x":681.6,"y":286.2,"label":"","locked":true,"hidden":true},{"id":"pt-u","x":101.6,"y":283.2,"label":"U","locked":true},{"id":"pt-v","x":296.8,"y":281.3,"label":"V","locked":true}],"shapes":[{"id":"line-k","type":"line","label":"k","points":["pt-k1","pt-k2"],"locked":true,"definition":{"p1Id":"pt-k1","p2Id":"pt-k2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 2. náhradní termín · 9. Lichoběžník z pravoúhlého trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '093d6b4f-f088-40c3-bf5b-d958a62cde63'::uuid,
  $txt$2026 · 2. náhradní termín · 9. Lichoběžník z pravoúhlého trojúhelníku$txt$,
  $txt$V rovině leží přímka p a body B, D.

Body B, D jsou vrcholy pravoúhlého rovnoramenného trojúhelníku BCD s pravým úhlem při vrcholu C. Bod C má od přímky p větší vzdálenost než bod B.

9.1 Sestrojte vrchol C trojúhelníku BCD a označte ho písmenem.

9.2 Body B, C, D jsou zároveň vrcholy lichoběžníku ABCD.
Vrchol A tohoto lichoběžníku leží na přímce p.
Sestrojte vrchol A lichoběžníku ABCD, označte ho písmenem a lichoběžník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a body B, D.\n\nBody B, D jsou vrcholy pravoúhlého rovnoramenného trojúhelníku BCD s pravým úhlem při vrcholu C. Bod C má od přímky p větší vzdálenost než bod B.\n\n9.1 Sestrojte vrchol C trojúhelníku BCD a označte ho písmenem.\n\n9.2 Body B, C, D jsou zároveň vrcholy lichoběžníku ABCD.\nVrchol A tohoto lichoběžníku leží na přímce p.\nSestrojte vrchol A lichoběžníku ABCD, označte ho písmenem a lichoběžník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":471,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":132.1,"y":63.5,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":388.6,"y":438.2,"label":"","locked":true,"hidden":true},{"id":"pt-d","x":452.1,"y":140.1,"label":"D","locked":true},{"id":"pt-b","x":489.8,"y":356.7,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2026 · 2. náhradní termín · 10. Obdélník vepsaný do kružnice
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '55aca9c1-8043-4e36-9af3-c991cb3ddf00'::uuid,
  $txt$2026 · 2. náhradní termín · 10. Obdélník vepsaný do kružnice$txt$,
  $txt$V rovině leží body D, S, U.

Bod D je vrchol obdélníku ABCD.
Bod S je střed kružnice k, na níž leží všechny vrcholy tohoto obdélníku.
Bodem U prochází přímka u, na které leží vrcholy A, C obdélníku ABCD.

Sestrojte kružnici k a vrcholy A, B, C obdélníku ABCD, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body D, S, U.\n\nBod D je vrchol obdélníku ABCD.\nBod S je střed kružnice k, na níž leží všechny vrcholy tohoto obdélníku.\nBodem U prochází přímka u, na které leží vrcholy A, C obdélníku ABCD.\n\nSestrojte kružnici k a vrcholy A, B, C obdélníku ABCD, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":815,"y":546,"label":"","locked":true,"hidden":true},{"id":"pt-d","x":123.2,"y":153,"label":"D","locked":true},{"id":"pt-s","x":299.5,"y":282.4,"label":"S","locked":true},{"id":"pt-u","x":631.6,"y":240.7,"label":"U","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

commit;
