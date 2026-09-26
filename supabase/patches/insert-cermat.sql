-- Sekce CERMAT: konstrukční úlohy 9 a 10 z jednotné přijímací zkoušky (čtyřleté obory).
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

-- 2025 · 1. řádný termín · 9. Obdélník s vrcholy na dvou přímkách
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '34699e67-edac-4ea3-a3cb-af15f219a8f4'::uuid,
  $txt$2025 · 1. řádný termín · 9. Obdélník s vrcholy na dvou přímkách$txt$,
  $txt$V rovině leží různoběžky p, q a bod R.

9.1 Sestrojte osu většího úhlu, který svírají přímky p, q, a označte ji písmenem o.

9.2 Na přímkách p, q leží všechny čtyři vrcholy obdélníku KLMN.
Bod R leží uvnitř strany MN tohoto obdélníku.
Sestrojte vrcholy obdélníku KLMN, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží různoběžky p, q a bod R.\n\n9.1 Sestrojte osu většího úhlu, který svírají přímky p, q, a označte ji písmenem o.\n\n9.2 Na přímkách p, q leží všechny čtyři vrcholy obdélníku KLMN.\nBod R leží uvnitř strany MN tohoto obdélníku.\nSestrojte vrcholy obdélníku KLMN, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":472.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":83.7,"y":336.5,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":658.6,"y":189.4,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":145.5,"y":64.3,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":518.9,"y":439.3,"label":"","locked":true,"hidden":true},{"id":"pt-r","x":307.3,"y":161.1,"label":"R","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 1. řádný termín · 10. Trojúhelník z výšky a těžnice
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'cadca086-00a5-418f-844e-26c0b459112d'::uuid,
  $txt$2025 · 1. řádný termín · 10. Trojúhelník z výšky a těžnice$txt$,
  $txt$V rovině leží bod B a přímky p, q, které se protínají v bodě C.

Body B, C jsou vrcholy trojúhelníku ABC.
Na přímce p leží výška vc na stranu c a na přímce q leží těžnice tc na stranu c tohoto trojúhelníku.

Sestrojte vrchol A trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod B a přímky p, q, které se protínají v bodě C.\n\nBody B, C jsou vrcholy trojúhelníku ABC.\nNa přímce p leží výška vc na stranu c a na přímce q leží těžnice tc na stranu c tohoto trojúhelníku.\n\nSestrojte vrchol A trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":522.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":451.2,"y":87.4,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":514.3,"y":470.5,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":505.2,"y":64.4,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":333.2,"y":489.2,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":692.9,"y":342.3,"label":"B","locked":true},{"id":"pt-c","x":464.1,"y":165.9,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 2. řádný termín · 9. Rovnoramenný trojúhelník s bodem na těžnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'fe3fbee6-e2ca-4c69-9d1c-9c72eb7c2bdd'::uuid,
  $txt$2025 · 2. řádný termín · 9. Rovnoramenný trojúhelník s bodem na těžnici$txt$,
  $txt$V rovině leží body A, B, M.

Body A, B jsou vrcholy rovnoramenného trojúhelníku ABC.
Bod M je uvnitř tohoto trojúhelníku a leží na těžnici tc na stranu AB.
(Bod M není těžištěm trojúhelníku ABC.)

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B, M.\n\nBody A, B jsou vrcholy rovnoramenného trojúhelníku ABC.\nBod M je uvnitř tohoto trojúhelníku a leží na těžnici tc na stranu AB.\n(Bod M není těžištěm trojúhelníku ABC.)\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":547.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":174.1,"y":479.6,"label":"A","locked":true},{"id":"pt-b","x":524.8,"y":450.3,"label":"B","locked":true},{"id":"pt-m","x":399.5,"y":315.1,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou na polopřímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '3b226b02-7fd9-41a4-8c0b-758cbb3c30a2'::uuid,
  $txt$2025 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou na polopřímce$txt$,
  $txt$V rovině leží body A, D, M.

Body A, D jsou vrcholy rovnoběžníku ABCD.
Na polopřímce DM leží jedna z úhlopříček tohoto rovnoběžníku.
Druhá úhlopříčka rovnoběžníku ABCD má stejnou délku jako úsečka DM.

Sestrojte vrcholy B, C rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, D, M.\n\nBody A, D jsou vrcholy rovnoběžníku ABCD.\nNa polopřímce DM leží jedna z úhlopříček tohoto rovnoběžníku.\nDruhá úhlopříčka rovnoběžníku ABCD má stejnou délku jako úsečka DM.\n\nSestrojte vrcholy B, C rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":547.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":308.3,"y":481.7,"label":"A","locked":true},{"id":"pt-d","x":163.1,"y":446.4,"label":"D","locked":true},{"id":"pt-m","x":489.4,"y":216.2,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 1. náhradní termín · 9. Rovnoramenný trojúhelník s výškou BM
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '5d45eb2b-6be2-49bb-8610-18521a51b49e'::uuid,
  $txt$2025 · 1. náhradní termín · 9. Rovnoramenný trojúhelník s výškou BM$txt$,
  $txt$V rovině leží body B, M a přímka q.

Bod B je vrchol rovnoramenného trojúhelníku ABC se základnou AB.
Úsečka BM je jednou z výšek tohoto trojúhelníku a bod M leží na straně AC.
Na přímce q leží vrchol A trojúhelníku ABC.

Sestrojte vrcholy A, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body B, M a přímka q.\n\nBod B je vrchol rovnoramenného trojúhelníku ABC se základnou AB.\nÚsečka BM je jednou z výšek tohoto trojúhelníku a bod M leží na straně AC.\nNa přímce q leží vrchol A trojúhelníku ABC.\n\nSestrojte vrcholy A, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":599.9,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":108.6,"y":317.9,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":633.6,"y":317.9,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":448.4,"y":530.8,"label":"B","locked":true},{"id":"pt-m","x":305.6,"y":254.5,"label":"M","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 1. náhradní termín · 10. Obdélník se středem strany CD
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'faba27b5-efdb-4fe2-9ee3-91bca4a147b8'::uuid,
  $txt$2025 · 1. náhradní termín · 10. Obdélník se středem strany CD$txt$,
  $txt$V rovině leží body A, S a přímka p.

Bod A je vrchol obdélníku ABCD, jehož vrchol D leží na přímce p.
Bod S je střed strany CD obdélníku ABCD.

Sestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, S a přímka p.\n\nBod A je vrchol obdélníku ABCD, jehož vrchol D leží na přímce p.\nBod S je střed strany CD obdélníku ABCD.\n\nSestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":549.8,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":33.6,"y":116.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":708.6,"y":116.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":63,"y":344.5,"label":"A","locked":true},{"id":"pt-s","x":386.7,"y":180,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 2. náhradní termín · 9. Rovnostranný trojúhelník a jeho osový obraz
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'd6ec38d4-f5e3-4fd9-9fc7-2fd8ff02cc13'::uuid,
  $txt$2025 · 2. náhradní termín · 9. Rovnostranný trojúhelník a jeho osový obraz$txt$,
  $txt$V rovině leží body A, A′ a M.

Bod A je vrchol rovnostranného trojúhelníku ABC.
Na přímce AM leží vrchol C tohoto trojúhelníku.
Bod A′ je vrchol trojúhelníku A′B′C, který je obrazem trojúhelníku ABC v osové souměrnosti s osou o.
Oba trojúhelníky mají pouze jeden společný bod, a to vrchol C.

9.1 Sestrojte osu o a označte ji písmenem.

9.2 Sestrojte všechny chybějící vrcholy trojúhelníků ABC i A′B′C, označte je písmeny a oba trojúhelníky narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, A′ a M.\n\nBod A je vrchol rovnostranného trojúhelníku ABC.\nNa přímce AM leží vrchol C tohoto trojúhelníku.\nBod A′ je vrchol trojúhelníku A′B′C, který je obrazem trojúhelníku ABC v osové souměrnosti s osou o.\nOba trojúhelníky mají pouze jeden společný bod, a to vrchol C.\n\n9.1 Sestrojte osu o a označte ji písmenem.\n\n9.2 Sestrojte všechny chybějící vrcholy trojúhelníků ABC i A′B′C, označte je písmeny a oba trojúhelníky narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":549.8,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":364.4,"y":476.4,"label":"A","locked":true},{"id":"pt-a2","x":190.6,"y":261.7,"label":"A′","locked":true},{"id":"pt-m","x":411.2,"y":146.6,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2025 · 2. náhradní termín · 10. Rovnoběžník se stejně dlouhou stranou a úhlopříčkou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '85623ecc-2fc6-4cc1-ae93-8fda25c8e6c7'::uuid,
  $txt$2025 · 2. náhradní termín · 10. Rovnoběžník se stejně dlouhou stranou a úhlopříčkou$txt$,
  $txt$V rovině leží body L, M a přímka p procházející bodem M.

Body L, M jsou vrcholy rovnoběžníku KLMN.
Na přímce p leží střed S souměrnosti tohoto rovnoběžníku.
Délka strany LM je stejná jako délka úhlopříčky LN.

Sestrojte střed S a vrcholy K, N rovnoběžníku KLMN, označte je písmeny a rovnoběžník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body L, M a přímka p procházející bodem M.\n\nBody L, M jsou vrcholy rovnoběžníku KLMN.\nNa přímce p leží střed S souměrnosti tohoto rovnoběžníku.\nDélka strany LM je stejná jako délka úhlopříčky LN.\n\nSestrojte střed S a vrcholy K, N rovnoběžníku KLMN, označte je písmeny a rovnoběžník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":424.9,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":33.6,"y":292.1,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":708.6,"y":204.7,"label":"","locked":true,"hidden":true},{"id":"pt-l","x":444.6,"y":350.2,"label":"L","locked":true},{"id":"pt-m","x":663.9,"y":210.5,"label":"M","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 1. řádný termín · 9. Rovnostranný trojúhelník se středem strany
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '925f9c30-3b3e-4f46-9055-6ff8f98aa4c4'::uuid,
  $txt$2024 · 1. řádný termín · 9. Rovnostranný trojúhelník se středem strany$txt$,
  $txt$V rovině leží body C a S.

Bod C je vrchol rovnostranného trojúhelníku ABC.
Bod S je středem strany AB.

Sestrojte vrcholy A, B rovnostranného trojúhelníku ABC a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body C a S.\n\nBod C je vrchol rovnostranného trojúhelníku ABC.\nBod S je středem strany AB.\n\nSestrojte vrcholy A, B rovnostranného trojúhelníku ABC a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.4,"y":551.8,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":324.4,"y":206.3,"label":"C","locked":true},{"id":"pt-s","x":476.8,"y":363.5,"label":"S","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 1. řádný termín · 10. Obdélník s úhlopříčkou délky AE
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '74e8bd33-763d-4644-afb2-b607515f45f7'::uuid,
  $txt$2024 · 1. řádný termín · 10. Obdélník s úhlopříčkou délky AE$txt$,
  $txt$V rovině leží přímka AE a přímka p procházející bodem E.

Bod A je vrchol obdélníku ABCD.
Vrchol B leží na přímce AE a vrchol C na přímce p.
Úhlopříčka BD obdélníku ABCD má stejnou délku jako úsečka AE.

Sestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka AE a přímka p procházející bodem E.\n\nBod A je vrchol obdélníku ABCD.\nVrchol B leží na přímce AE a vrchol C na přímce p.\nÚhlopříčka BD obdélníku ABCD má stejnou délku jako úsečka AE.\n\nSestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.4,"y":775.1,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":269.5,"y":190.6,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":637.7,"y":558.8,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":177.3,"y":570.3,"label":"A","locked":true},{"id":"pt-e","x":525.2,"y":446.3,"label":"E","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ae","type":"line","label":"","points":["pt-a","pt-e"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-e"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 2. řádný termín · 9. Kosočtverec s vrcholem C na přímce OA
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '00162934-16bc-4d00-8651-916fc1dcdfb2'::uuid,
  $txt$2024 · 2. řádný termín · 9. Kosočtverec s vrcholem C na přímce OA$txt$,
  $txt$V rovině jsou dány body A, B a O.

Body A, B jsou vrcholy kosočtverce ABCD.
Vrchol C kosočtverce leží na přímce OA.

Sestrojte kosočtverec ABCD.$txt$,
  null,
  $json$[{"text":"V rovině jsou dány body A, B a O.\n\nBody A, B jsou vrcholy kosočtverce ABCD.\nVrchol C kosočtverce leží na přímce OA.\n\nSestrojte kosočtverec ABCD.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.4,"y":789.1,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":342.1,"y":372.8,"label":"A","locked":true},{"id":"pt-b","x":552.3,"y":422.5,"label":"B","locked":true},{"id":"pt-o","x":167.9,"y":421.6,"label":"O","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 2. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '80dbbba5-5d59-4e75-840f-96f11a7b3e38'::uuid,
  $txt$2024 · 2. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na kružnici$txt$,
  $txt$V rovině je dána kružnice k se středem S a body K, L.

Body K, L jsou vrcholy rovnoramenného trojúhelníku KLM se základnou LM.

Sestrojte rovnoramenný trojúhelník KLM, leží-li bod M na kružnici k.
Nalezněte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině je dána kružnice k se středem S a body K, L.\n\nBody K, L jsou vrcholy rovnoramenného trojúhelníku KLM se základnou LM.\n\nSestrojte rovnoramenný trojúhelník KLM, leží-li bod M na kružnici k.\nNalezněte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.4,"y":822.6,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":444.2,"y":389.2,"label":"S","locked":true},{"id":"pt-k","x":275.4,"y":515.5,"label":"K","locked":true},{"id":"pt-l","x":528.6,"y":634.8,"label":"L","locked":true},{"id":"pt-k-rim","x":617,"y":389.2,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s vrcholy na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'e19e6791-cfbe-441f-aba0-9b6188900a60'::uuid,
  $txt$2024 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s vrcholy na kružnici$txt$,
  $txt$V rovině leží bod E a kružnice k se středem S, která prochází bodem A.

Bod A je vrchol pravoúhlého lichoběžníku ABCD se základnami AB a CD a pravým úhlem při vrcholu A.
Vrcholy C a D tohoto lichoběžníku leží na kružnici k, bod E je střed ramene BC.

Sestrojte zbývající vrcholy B, C a D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod E a kružnice k se středem S, která prochází bodem A.\n\nBod A je vrchol pravoúhlého lichoběžníku ABCD se základnami AB a CD a pravým úhlem při vrcholu A.\nVrcholy C a D tohoto lichoběžníku leží na kružnici k, bod E je střed ramene BC.\n\nSestrojte zbývající vrcholy B, C a D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.5,"y":741,"label":"","locked":true,"hidden":true},{"id":"pt-e","x":477.1,"y":404.5,"label":"E","locked":true},{"id":"pt-s","x":259.5,"y":435.8,"label":"S","locked":true},{"id":"pt-a","x":136.7,"y":547.9,"label":"A","locked":true},{"id":"pt-k-rim","x":425.8,"y":435.8,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 1. náhradní termín · 10. Rovnoramenný lichoběžník s osou souměrnosti
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '959f750b-ae45-47e1-98e8-629b7d16ce1c'::uuid,
  $txt$2024 · 1. náhradní termín · 10. Rovnoramenný lichoběžník s osou souměrnosti$txt$,
  $txt$V rovině je dána přímka o a body A a S, které neleží na přímce o.

Bod A je vrchol rovnoramenného lichoběžníku ABCD, bod S je střed strany BC.
Přímka o je osa souměrnosti lichoběžníku.

Sestrojte lichoběžník ABCD.$txt$,
  null,
  $json$[{"text":"V rovině je dána přímka o a body A a S, které neleží na přímce o.\n\nBod A je vrchol rovnoramenného lichoběžníku ABCD, bod S je střed strany BC.\nPřímka o je osa souměrnosti lichoběžníku.\n\nSestrojte lichoběžník ABCD.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.5,"y":990.8,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":457.4,"y":273.2,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":377.7,"y":756.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":313.9,"y":641.5,"label":"A","locked":true},{"id":"pt-s","x":525.6,"y":551.9,"label":"S","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 2. náhradní termín · 9. Obdélník se středem S
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '57f87d7d-f994-4b66-b97b-3abd0dda8010'::uuid,
  $txt$2024 · 2. náhradní termín · 9. Obdélník se středem S$txt$,
  $txt$V rovině je dána přímka p a body A a S, které neleží na přímce p.

Bod A je vrchol obdélníku ABCD, bod S je střed obdélníku (průsečík úhlopříček).
Vrchol D obdélníku leží na přímce p.

Sestrojte obdélník ABCD.
Nalezněte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině je dána přímka p a body A a S, které neleží na přímce p.\n\nBod A je vrchol obdélníku ABCD, bod S je střed obdélníku (průsečík úhlopříček).\nVrchol D obdélníku leží na přímce p.\n\nSestrojte obdélník ABCD.\nNalezněte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.5,"y":894.2,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":91.7,"y":342.7,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":701.1,"y":291.4,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":245.4,"y":448.8,"label":"A","locked":true},{"id":"pt-s","x":380.4,"y":410.4,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2024 · 2. náhradní termín · 10. Pravoúhlý trojúhelník se stranou rovnoběžnou s p
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '9f165d96-4d79-416b-9d23-925bd095a472'::uuid,
  $txt$2024 · 2. náhradní termín · 10. Pravoúhlý trojúhelník se stranou rovnoběžnou s p$txt$,
  $txt$V rovině leží body C, S a přímka p.

Bod C je vrchol pravoúhlého trojúhelníku ABC.
Bod S je střed strany BC tohoto trojúhelníku.
Strana AB tohoto trojúhelníku je rovnoběžná s přímkou p.

Sestrojte pravoúhlý trojúhelník ABC.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body C, S a přímka p.\n\nBod C je vrchol pravoúhlého trojúhelníku ABC.\nBod S je střed strany BC tohoto trojúhelníku.\nStrana AB tohoto trojúhelníku je rovnoběžná s přímkou p.\n\nSestrojte pravoúhlý trojúhelník ABC.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":797.5,"y":780.8,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":240.4,"y":568.3,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":638.1,"y":352.9,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":179.4,"y":274,"label":"C","locked":true},{"id":"pt-s","x":366.2,"y":302.4,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 1. řádný termín · 9. Obdélník s bodem na úhlopříčce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '63de8400-89fe-4b62-b87c-3cde2a240cd7'::uuid,
  $txt$2023 · 1. řádný termín · 9. Obdélník s bodem na úhlopříčce$txt$,
  $txt$V rovině leží body A, C, M.

Body A, C jsou vrcholy obdélníku ABCD.
Bod M leží na úhlopříčce BD tohoto obdélníku.

Sestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, C, M.\n\nBody A, C jsou vrcholy obdélníku ABCD.\nBod M leží na úhlopříčce BD tohoto obdélníku.\n\nSestrojte vrcholy B, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":347.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":180.5,"y":155.4,"label":"A","locked":true},{"id":"pt-c","x":556.3,"y":224.4,"label":"C","locked":true},{"id":"pt-m","x":471.8,"y":131.2,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 1. řádný termín · 10. Rovnoramenný trojúhelník v kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'd55973f1-c0d3-49c7-9345-57456cc64806'::uuid,
  $txt$2023 · 1. řádný termín · 10. Rovnoramenný trojúhelník v kružnici$txt$,
  $txt$V rovině leží body A, P a kružnice k se středem S.

Bod A je vrchol rovnoramenného trojúhelníku ABC, jehož základna leží na přímce AP.
Vrcholy B, C tohoto trojúhelníku leží na kružnici k.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, P a kružnice k se středem S.\n\nBod A je vrchol rovnoramenného trojúhelníku ABC, jehož základna leží na přímce AP.\nVrcholy B, C tohoto trojúhelníku leží na kružnici k.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":497.4,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":591.7,"y":280.4,"label":"A","locked":true},{"id":"pt-p","x":270.5,"y":161.4,"label":"P","locked":true},{"id":"pt-s","x":317.8,"y":255.7,"label":"S","locked":true},{"id":"pt-k-rim","x":508.8,"y":255.7,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 2. řádný termín · 9. Rovnoramenný lichoběžník se středem ramene
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '2002b117-0ea6-44f7-bbee-3effd363a033'::uuid,
  $txt$2023 · 2. řádný termín · 9. Rovnoramenný lichoběžník se středem ramene$txt$,
  $txt$V rovině leží úsečka AB a bod S.

Úsečka AB je základna rovnoramenného lichoběžníku ABCD.
Bod S je střed ramene AD tohoto lichoběžníku.

Sestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka AB a bod S.\n\nÚsečka AB je základna rovnoramenného lichoběžníku ABCD.\nBod S je střed ramene AD tohoto lichoběžníku.\n\nSestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":472.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":160.2,"y":390.6,"label":"A","locked":true},{"id":"pt-b","x":651.3,"y":295.8,"label":"B","locked":true},{"id":"pt-s","x":216,"y":259.9,"label":"S","locked":true}],"shapes":[{"id":"shape-ab","type":"segment","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 2. řádný termín · 10. Pravoúhlý trojúhelník vepsaný do kružnice
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '26098805-0b3a-4215-bd7b-099e20d76e02'::uuid,
  $txt$2023 · 2. řádný termín · 10. Pravoúhlý trojúhelník vepsaný do kružnice$txt$,
  $txt$V rovině leží body C, Q a kružnice k se středem S, která prochází bodem C.

Bod C je vrchol trojúhelníku ABC s pravým úhlem při vrcholu C.
Na kružnici k leží také zbývající dva vrcholy A, B tohoto trojúhelníku a bodem Q prochází jedna jeho strana.

Sestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body C, Q a kružnice k se středem S, která prochází bodem C.\n\nBod C je vrchol trojúhelníku ABC s pravým úhlem při vrcholu C.\nNa kružnici k leží také zbývající dva vrcholy A, B tohoto trojúhelníku a bodem Q prochází jedna jeho strana.\n\nSestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":597.5,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":328.4,"y":99.5,"label":"C","locked":true},{"id":"pt-q","x":499,"y":269.9,"label":"Q","locked":true},{"id":"pt-s","x":382.8,"y":327.1,"label":"S","locked":true},{"id":"pt-k-rim","x":616.8,"y":327.1,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s úhlopříčkou
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '425e5407-78a3-44dd-94b5-c75e56cc0b19'::uuid,
  $txt$2023 · 1. náhradní termín · 9. Pravoúhlý lichoběžník s úhlopříčkou$txt$,
  $txt$V rovině leží přímka AB a přímka p procházející bodem B.

Úsečka AB je strana pravoúhlého lichoběžníku ABCD.
Vrchol C tohoto lichoběžníku leží na přímce p, úhlopříčka AC má stejnou délku jako strana AB lichoběžníku ABCD.

Sestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka AB a přímka p procházející bodem B.\n\nÚsečka AB je strana pravoúhlého lichoběžníku ABCD.\nVrchol C tohoto lichoběžníku leží na přímce p, úhlopříčka AC má stejnou délku jako strana AB lichoběžníku ABCD.\n\nSestrojte vrcholy C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":522.2,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":282.7,"y":64.4,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":653.1,"y":373.7,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":261,"y":445.6,"label":"A","locked":true},{"id":"pt-b","x":570.5,"y":304.7,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-ab","type":"line","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 1. náhradní termín · 10. Rovnoramenný trojúhelník s výškou na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'c53c736c-a778-45af-bedb-8978ff15d68d'::uuid,
  $txt$2023 · 1. náhradní termín · 10. Rovnoramenný trojúhelník s výškou na přímce$txt$,
  $txt$V rovině leží body A, C a přímka p procházející bodem C.

Úsečka AC je základna rovnoramenného trojúhelníku ABC.
Na přímce p leží jedna ze tří výšek tohoto trojúhelníku.

10.1 Sestrojte osu souměrnosti trojúhelníku ABC a označte ji písmenem o.

10.2 Sestrojte vrchol B trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, C a přímka p procházející bodem C.\n\nÚsečka AC je základna rovnoramenného trojúhelníku ABC.\nNa přímce p leží jedna ze tří výšek tohoto trojúhelníku.\n\n10.1 Sestrojte osu souměrnosti trojúhelníku ABC a označte ji písmenem o.\n\n10.2 Sestrojte vrchol B trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":472.4,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":110,"y":67.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":345,"y":426.8,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":218.3,"y":393.6,"label":"A","locked":true},{"id":"pt-c","x":146.3,"y":122.8,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 2. náhradní termín · 9. Čtverec a tři body
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'fee7ba52-1602-4736-9f91-90f1187d09de'::uuid,
  $txt$2023 · 2. náhradní termín · 9. Čtverec a tři body$txt$,
  $txt$V rovině leží body P, Q, R a přímka a.

Na přímce a leží strana AB čtverce ABCD.
Dva ze tří bodů P, Q, R leží uvnitř dvou různých stran tohoto čtverce a třetí bod leží vně čtverce ABCD.

Sestrojte všechny vrcholy čtverce ABCD, označte je písmeny a čtverec narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body P, Q, R a přímka a.\n\nNa přímce a leží strana AB čtverce ABCD.\nDva ze tří bodů P, Q, R leží uvnitř dvou různých stran tohoto čtverce a třetí bod leží vně čtverce ABCD.\n\nSestrojte všechny vrcholy čtverce ABCD, označte je písmeny a čtverec narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":422.3,"label":"","locked":true,"hidden":true},{"id":"pt-a1","x":108.6,"y":291.7,"label":"","locked":true,"hidden":true},{"id":"pt-a2","x":633.6,"y":384.7,"label":"","locked":true,"hidden":true},{"id":"pt-p","x":260.9,"y":208.2,"label":"P","locked":true},{"id":"pt-q","x":309.4,"y":161.5,"label":"Q","locked":true},{"id":"pt-r","x":514.4,"y":289.8,"label":"R","locked":true}],"shapes":[{"id":"line-a","type":"line","label":"a","points":["pt-a1","pt-a2"],"locked":true,"definition":{"p1Id":"pt-a1","p2Id":"pt-a2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2023 · 2. náhradní termín · 10. Pravoúhlý trojúhelník s úhlem 40°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '1590f78d-6718-4a8a-a1df-65a2db988905'::uuid,
  $txt$2023 · 2. náhradní termín · 10. Pravoúhlý trojúhelník s úhlem 40°$txt$,
  $txt$V rovině leží přímky b, c a na přímce b leží bod A.

Bod A je vrchol trojúhelníku ABC s pravým úhlem při vrcholu A.
Na přímce b leží vrchol B a na přímce c leží vrchol C tohoto trojúhelníku.
Velikost vnitřního úhlu trojúhelníku ABC při vrcholu C je 40°.

Sestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímky b, c a na přímce b leží bod A.\n\nBod A je vrchol trojúhelníku ABC s pravým úhlem při vrcholu A.\nNa přímce b leží vrchol B a na přímce c leží vrchol C tohoto trojúhelníku.\nVelikost vnitřního úhlu trojúhelníku ABC při vrcholu C je 40°.\n\nSestrojte vrcholy B, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":422.4,"label":"","locked":true,"hidden":true},{"id":"pt-b1","x":68.8,"y":186.2,"label":"","locked":true,"hidden":true},{"id":"pt-b2","x":670,"y":350.6,"label":"","locked":true,"hidden":true},{"id":"pt-c1","x":68.7,"y":129.2,"label":"","locked":true,"hidden":true},{"id":"pt-c2","x":673.5,"y":87.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":409.9,"y":279.5,"label":"A","locked":true}],"shapes":[{"id":"line-b","type":"line","label":"b","points":["pt-b1","pt-b2"],"locked":true,"definition":{"p1Id":"pt-b1","p2Id":"pt-b2"}},{"id":"line-c","type":"line","label":"c","points":["pt-c1","pt-c2"],"locked":true,"definition":{"p1Id":"pt-c1","p2Id":"pt-c2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 1. řádný termín · 9. Rovnoramenný trojúhelník se středem ramene
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '56119862-e436-42e1-a50c-9c321ea9af0f'::uuid,
  $txt$2022 · 1. řádný termín · 9. Rovnoramenný trojúhelník se středem ramene$txt$,
  $txt$V rovině leží body C, S a přímka q.

Bod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.
Bod S je střed jednoho ramene tohoto trojúhelníku a na přímce q leží jeden z vrcholů A, B.

Sestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body C, S a přímka q.\n\nBod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.\nBod S je střed jednoho ramene tohoto trojúhelníku a na přímce q leží jeden z vrcholů A, B.\n\nSestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":457.4,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":43.6,"y":174.8,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":699,"y":174.8,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":354.9,"y":392.6,"label":"C","locked":true},{"id":"pt-s","x":415.8,"y":247.8,"label":"S","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 1. řádný termín · 10. Čtverec se středem O
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '9e3c09a9-2e77-49a3-9401-e2df66717426'::uuid,
  $txt$2022 · 1. řádný termín · 10. Čtverec se středem O$txt$,
  $txt$V rovině leží bod O a přímka p.

Bod O je střed čtverce ABCD, jehož strana BC leží na přímce p.

Sestrojte všechny vrcholy čtverce ABCD, označte je písmeny a čtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod O a přímka p.\n\nBod O je střed čtverce ABCD, jehož strana BC leží na přímce p.\n\nSestrojte všechny vrcholy čtverce ABCD, označte je písmeny a čtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":572.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":340.2,"y":70.4,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":637.6,"y":405.5,"label":"","locked":true,"hidden":true},{"id":"pt-o","x":355.1,"y":307.3,"label":"O","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 2. řádný termín · 9. Rovnoramenný trojúhelník se základnou 6 cm
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'f5537aae-9082-4ee3-bc0a-3c3d01c56808'::uuid,
  $txt$2022 · 2. řádný termín · 9. Rovnoramenný trojúhelník se základnou 6 cm$txt$,
  $txt$V rovině leží bod C a přímka q.

Bod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.
Základna AB leží na přímce q a má délku 6 cm.

Sestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod C a přímka q.\n\nBod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.\nZákladna AB leží na přímce q a má délku 6 cm.\n\nSestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":407.3,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":131.1,"y":307.4,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":603.2,"y":67.3,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":482.8,"y":342.5,"label":"C","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou kolmou k přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '070552e5-1085-4627-a062-04867f0f76a7'::uuid,
  $txt$2022 · 2. řádný termín · 10. Rovnoběžník s úhlopříčkou kolmou k přímce$txt$,
  $txt$V rovině leží body A, C a přímka p.

Body A, C jsou vrcholy rovnoběžníku ABCD, jehož dvě strany jsou rovnoběžné s přímkou p. Jedna z úhlopříček rovnoběžníku ABCD je k přímce p kolmá.

10.1 Sestrojte střed S rovnoběžníku ABCD a označte ho písmenem.

10.2 Sestrojte vrcholy B, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, C a přímka p.\n\nBody A, C jsou vrcholy rovnoběžníku ABCD, jehož dvě strany jsou rovnoběžné s přímkou p. Jedna z úhlopříček rovnoběžníku ABCD je k přímce p kolmá.\n\n10.1 Sestrojte střed S rovnoběžníku ABCD a označte ho písmenem.\n\n10.2 Sestrojte vrcholy B, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":572.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":177.7,"y":91.7,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":654.9,"y":334.7,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":98.8,"y":422.1,"label":"A","locked":true},{"id":"pt-c","x":620.5,"y":176.4,"label":"C","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 1. náhradní termín · 9. Trojúhelník s osou strany
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '668bd325-fdd7-4006-8959-8dde3529df33'::uuid,
  $txt$2022 · 1. náhradní termín · 9. Trojúhelník s osou strany$txt$,
  $txt$V rovině leží body P, Q a přímka o.

Body P, Q jsou vrcholy trojúhelníku PQR.
Přímka o je osou některé strany tohoto trojúhelníku.

Sestrojte vrchol R trojúhelníku PQR, označte ho písmenem a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body P, Q a přímka o.\n\nBody P, Q jsou vrcholy trojúhelníku PQR.\nPřímka o je osou některé strany tohoto trojúhelníku.\n\nSestrojte vrchol R trojúhelníku PQR, označte ho písmenem a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":547.2,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":199.3,"y":514.3,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":485.4,"y":64.4,"label":"","locked":true,"hidden":true},{"id":"pt-p","x":198.2,"y":99.5,"label":"P","locked":true},{"id":"pt-q","x":144.1,"y":304.6,"label":"Q","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 1. náhradní termín · 10. Obdélník k rovnoběžkám
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '87b2f9e1-d375-4b4e-bbc3-df9b8362c9c7'::uuid,
  $txt$2022 · 1. náhradní termín · 10. Obdélník k rovnoběžkám$txt$,
  $txt$V rovině leží body A, X a rovnoběžné přímky c, p.

Bod A je vrchol obdélníku ABCD. Bod X leží uvnitř strany AB obdélníku.
Na přímce c leží vrchol C obdélníku ABCD a na přímce p jeden ze zbývajících dvou vrcholů obdélníku.

Sestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, X a rovnoběžné přímky c, p.\n\nBod A je vrchol obdélníku ABCD. Bod X leží uvnitř strany AB obdélníku.\nNa přímce c leží vrchol C obdélníku ABCD a na přímce p jeden ze zbývajících dvou vrcholů obdélníku.\n\nSestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":447.4,"label":"","locked":true,"hidden":true},{"id":"pt-c1","x":708.6,"y":99.9,"label":"","locked":true,"hidden":true},{"id":"pt-c2","x":33.7,"y":99.9,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":708.6,"y":205.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":33.7,"y":205.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":226.6,"y":391.5,"label":"A","locked":true},{"id":"pt-x","x":395.2,"y":310.2,"label":"X","locked":true}],"shapes":[{"id":"line-c","type":"line","label":"c","points":["pt-c1","pt-c2"],"locked":true,"definition":{"p1Id":"pt-c1","p2Id":"pt-c2"}},{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 2. náhradní termín · 9. Rovnoběžník s úhlem 120°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '5ea60228-04fd-48ad-90f0-254e3a876e1f'::uuid,
  $txt$2022 · 2. náhradní termín · 9. Rovnoběžník s úhlem 120°$txt$,
  $txt$V rovině leží body A, S a přímka p procházející bodem A.

Bod A je vrchol rovnoběžníku ABCD. Bod S je střed tohoto rovnoběžníku.
Na přímce p leží vrchol B rovnoběžníku ABCD. Úhel ASB má velikost 120°.

Sestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, S a přímka p procházející bodem A.\n\nBod A je vrchol rovnoběžníku ABCD. Bod S je střed tohoto rovnoběžníku.\nNa přímce p leží vrchol B rovnoběžníku ABCD. Úhel ASB má velikost 120°.\n\nSestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":472.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":103.9,"y":399.3,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":691,"y":274.8,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":217,"y":375.3,"label":"A","locked":true},{"id":"pt-s","x":337.8,"y":246.1,"label":"S","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2022 · 2. náhradní termín · 10. Rovnoramenný trojúhelník s osou souměrnosti
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'cc670aa6-d652-4090-b22b-88e347470afd'::uuid,
  $txt$2022 · 2. náhradní termín · 10. Rovnoramenný trojúhelník s osou souměrnosti$txt$,
  $txt$V rovině leží body C, Q a přímka p.

Bod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.
Ramena mají délku 5 cm. Na přímce p leží jeden vrchol trojúhelníku ABC.
Bodem Q prochází osa souměrnosti trojúhelníku ABC.

Sestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body C, Q a přímka p.\n\nBod C je vrchol rovnoramenného trojúhelníku ABC se základnou AB.\nRamena mají délku 5 cm. Na přímce p leží jeden vrchol trojúhelníku ABC.\nBodem Q prochází osa souměrnosti trojúhelníku ABC.\n\nSestrojte vrcholy A, B trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":597.5,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":211.1,"y":563.8,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":683.3,"y":327.6,"label":"","locked":true,"hidden":true},{"id":"pt-c","x":357.9,"y":314.4,"label":"C","locked":true},{"id":"pt-q","x":162.9,"y":342,"label":"Q","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 1. řádný termín · 9. Trojúhelník s úhlem 60° a osou strany
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '5c5439be-f7b5-4987-be15-5721a6d1c650'::uuid,
  $txt$2021 · 1. řádný termín · 9. Trojúhelník s úhlem 60° a osou strany$txt$,
  $txt$V rovině leží polopřímka BX a přímka o.

Bod B je vrchol trojúhelníku ABC. Přímka o je osou strany AB.
Velikost vnitřního úhlu BAC je 60° a vrchol C leží na polopřímce BX.

Sestrojte vrcholy A, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží polopřímka BX a přímka o.\n\nBod B je vrchol trojúhelníku ABC. Přímka o je osou strany AB.\nVelikost vnitřního úhlu BAC je 60° a vrchol C leží na polopřímce BX.\n\nSestrojte vrcholy A, C trojúhelníku ABC, označte je písmeny a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":818.6,"y":523.6,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":133.1,"y":125.7,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":486.6,"y":439.7,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":136.4,"y":431.5,"label":"B","locked":true},{"id":"pt-x","x":582.5,"y":362.4,"label":"X","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}},{"id":"shape-bx","type":"ray","label":"","points":["pt-b","pt-x"],"locked":true,"definition":{"p1Id":"pt-b","p2Id":"pt-x"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 1. řádný termín · 10. Lichoběžník s kolmými úhlopříčkami
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ffdd43f9-08b9-4cd2-a059-387a41b97299'::uuid,
  $txt$2021 · 1. řádný termín · 10. Lichoběžník s kolmými úhlopříčkami$txt$,
  $txt$V rovině leží body B, P a přímka q procházející bodem B.

Bod B je vrchol rovnoramenného lichoběžníku ABCD se základnou AB, rameno BC leží na přímce q.
Úhlopříčky AC a BD se protínají v bodě P a jsou na sebe kolmé.

Sestrojte vrcholy A, C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body B, P a přímka q procházející bodem B.\n\nBod B je vrchol rovnoramenného lichoběžníku ABCD se základnou AB, rameno BC leží na přímce q.\nÚhlopříčky AC a BD se protínají v bodě P a jsou na sebe kolmé.\n\nSestrojte vrcholy A, C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":818.6,"y":648.1,"label":"","locked":true,"hidden":true},{"id":"pt-q1","x":661.9,"y":78.9,"label":"","locked":true,"hidden":true},{"id":"pt-q2","x":501.1,"y":613.8,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":520.1,"y":550.5,"label":"B","locked":true},{"id":"pt-p","x":434.9,"y":288.1,"label":"P","locked":true}],"shapes":[{"id":"line-q","type":"line","label":"q","points":["pt-q1","pt-q2"],"locked":true,"definition":{"p1Id":"pt-q1","p2Id":"pt-q2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 2. řádný termín · 9. Rovnoramenný pravoúhlý trojúhelník
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '303f469d-439d-4a89-9764-41356e085571'::uuid,
  $txt$2021 · 2. řádný termín · 9. Rovnoramenný pravoúhlý trojúhelník$txt$,
  $txt$V rovině leží přímka c a polopřímka AX.

Bod A je vrchol rovnoramenného pravoúhlého trojúhelníku ABC.
Vrchol B tohoto trojúhelníku leží na polopřímce AX, vrchol C na přímce c.
Pravý úhel je buď při vrcholu A, nebo při vrcholu B.

Sestrojte trojúhelník ABC s pravým úhlem při vrcholu
9.1 A,
9.2 B
a vrcholy B, C označte písmeny.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka c a polopřímka AX.\n\nBod A je vrchol rovnoramenného pravoúhlého trojúhelníku ABC.\nVrchol B tohoto trojúhelníku leží na polopřímce AX, vrchol C na přímce c.\nPravý úhel je buď při vrcholu A, nebo při vrcholu B.\n\nSestrojte trojúhelník ABC s pravým úhlem při vrcholu\n9.1 A,\n9.2 B\na vrcholy B, C označte písmeny.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":497.3,"label":"","locked":true,"hidden":true},{"id":"pt-c1","x":83.7,"y":256.8,"label":"","locked":true,"hidden":true},{"id":"pt-c2","x":636.7,"y":64.4,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":155.9,"y":424,"label":"A","locked":true},{"id":"pt-x","x":566.2,"y":424,"label":"X","locked":true}],"shapes":[{"id":"line-c","type":"line","label":"c","points":["pt-c1","pt-c2"],"locked":true,"definition":{"p1Id":"pt-c1","p2Id":"pt-c2"}},{"id":"shape-ax","type":"ray","label":"","points":["pt-a","pt-x"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-x"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 2. řádný termín · 10. Rovnoběžník s výškou 5 cm
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '96a5023a-0b79-465a-8f8c-5335e1d1d73a'::uuid,
  $txt$2021 · 2. řádný termín · 10. Rovnoběžník s výškou 5 cm$txt$,
  $txt$V rovině leží tři různé body A, M, N.

Bod A je vrchol rovnoběžníku ABCD.
Bod M leží uvnitř strany AB tohoto rovnoběžníku, bod N uvnitř strany AD a výška na stranu AB měří 5 cm.
Vrchol D má od vrcholů A i B stejnou vzdálenost, tedy |BD| = |AD|.

Sestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží tři různé body A, M, N.\n\nBod A je vrchol rovnoběžníku ABCD.\nBod M leží uvnitř strany AB tohoto rovnoběžníku, bod N uvnitř strany AD a výška na stranu AB měří 5 cm.\nVrchol D má od vrcholů A i B stejnou vzdálenost, tedy |BD| = |AD|.\n\nSestrojte vrcholy B, C, D rovnoběžníku ABCD, označte je písmeny a rovnoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":522.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":110.5,"y":437.1,"label":"A","locked":true},{"id":"pt-m","x":426.1,"y":387.5,"label":"M","locked":true},{"id":"pt-n","x":219.1,"y":255.9,"label":"N","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 1. náhradní termín · 9. Obdélník vepsaný do kružnice
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '3bf4d396-f839-4772-bae1-170d0a3da66f'::uuid,
  $txt$2021 · 1. náhradní termín · 9. Obdélník vepsaný do kružnice$txt$,
  $txt$V rovině leží body A, B, M.

Body A, B jsou vrcholy obdélníku ABCD.
Bod M leží na téže kružnici k jako všechny vrcholy obdélníku ABCD.

9.1 Sestrojte střed kružnice k a označte ho písmenem S.

9.2 Sestrojte vrcholy C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B, M.\n\nBody A, B jsou vrcholy obdélníku ABCD.\nBod M leží na téže kružnici k jako všechny vrcholy obdélníku ABCD.\n\n9.1 Sestrojte střed kružnice k a označte ho písmenem S.\n\n9.2 Sestrojte vrcholy C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":647.3,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":169.9,"y":374.1,"label":"A","locked":true},{"id":"pt-b","x":547.1,"y":566.9,"label":"B","locked":true},{"id":"pt-m","x":383.9,"y":105.3,"label":"M","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 1. náhradní termín · 10. Trojúhelník z os úhlů
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '0965319b-f70a-4211-94c0-b2ee9082c04f'::uuid,
  $txt$2021 · 1. náhradní termín · 10. Trojúhelník z os úhlů$txt$,
  $txt$V rovině leží body A, B, L.

Body A, B jsou vrcholy trojúhelníku ABC. Osy vnitřních úhlů BAC a ABC tohoto trojúhelníku procházejí bodem L.

Sestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B, L.\n\nBody A, B jsou vrcholy trojúhelníku ABC. Osy vnitřních úhlů BAC a ABC tohoto trojúhelníku procházejí bodem L.\n\nSestrojte vrchol C trojúhelníku ABC, označte ho písmenem a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":622.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":268.3,"y":536.5,"label":"A","locked":true},{"id":"pt-b","x":728.6,"y":397.1,"label":"B","locked":true},{"id":"pt-l","x":334.1,"y":397.2,"label":"L","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 2. náhradní termín · 9. Rovnoramenný trojúhelník se stranou LM
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'b9736a8a-76a4-4caa-991d-0a1a7531bd6a'::uuid,
  $txt$2021 · 2. náhradní termín · 9. Rovnoramenný trojúhelník se stranou LM$txt$,
  $txt$V rovině leží úsečka LM a bod U.

Úsečka LM je strana rovnoramenného trojúhelníku KLM.
V tomto trojúhelníku je každé z obou ramen dvakrát delší než základna.
Bod U leží uvnitř trojúhelníku KLM.

Sestrojte vrchol K trojúhelníku KLM, označte jej písmenem a trojúhelník narýsujte.
Najděte všechna 3 řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží úsečka LM a bod U.\n\nÚsečka LM je strana rovnoramenného trojúhelníku KLM.\nV tomto trojúhelníku je každé z obou ramen dvakrát delší než základna.\nBod U leží uvnitř trojúhelníku KLM.\n\nSestrojte vrchol K trojúhelníku KLM, označte jej písmenem a trojúhelník narýsujte.\nNajděte všechna 3 řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":722.3,"label":"","locked":true,"hidden":true},{"id":"pt-l","x":667.3,"y":355.9,"label":"L","locked":true},{"id":"pt-m","x":542.2,"y":83.4,"label":"M","locked":true},{"id":"pt-u","x":553.7,"y":194.7,"label":"U","locked":true}],"shapes":[{"id":"shape-lm","type":"segment","label":"","points":["pt-l","pt-m"],"locked":true,"definition":{"p1Id":"pt-l","p2Id":"pt-m"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2021 · 2. náhradní termín · 10. Obdélník se středem S
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '1388ef1f-d1c9-4332-b778-d2cf821bc7fa'::uuid,
  $txt$2021 · 2. náhradní termín · 10. Obdélník se středem S$txt$,
  $txt$V rovině leží body A, S.

Bod A je vrchol obdélníku ABCD a bod S je střed tohoto obdélníku.
Vrchol C má od vrcholu D i od středu S stejnou vzdálenost, tedy |CD| = |CS|.

Sestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, S.\n\nBod A je vrchol obdélníku ABCD a bod S je střed tohoto obdélníku.\nVrchol C má od vrcholu D i od středu S stejnou vzdálenost, tedy |CD| = |CS|.\n\nSestrojte vrcholy B, C, D obdélníku ABCD, označte je písmeny a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":597.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":212.9,"y":436.5,"label":"A","locked":true},{"id":"pt-s","x":387.9,"y":310.7,"label":"S","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2020 · 1. řádný termín · 9. Trojúhelník s těžnicí 6 cm
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'ea963e72-f512-4cbd-af0d-4d5e7072a6f5'::uuid,
  $txt$2020 · 1. řádný termín · 9. Trojúhelník s těžnicí 6 cm$txt$,
  $txt$V rovině leží přímka AC a přímka b.

Body A, C jsou vrcholy trojúhelníku ABC. Na přímce b leží vrchol B.
Délka těžnice tb na stranu AC je 6 cm.

Sestrojte vrchol B trojúhelníku ABC, označte jej písmenem a trojúhelník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka AC a přímka b.\n\nBody A, C jsou vrcholy trojúhelníku ABC. Na přímce b leží vrchol B.\nDélka těžnice tb na stranu AC je 6 cm.\n\nSestrojte vrchol B trojúhelníku ABC, označte jej písmenem a trojúhelník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":522.2,"label":"","locked":true,"hidden":true},{"id":"pt-b1","x":83.7,"y":456.6,"label":"","locked":true,"hidden":true},{"id":"pt-b2","x":679.7,"y":363.1,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":194.7,"y":244.4,"label":"A","locked":true},{"id":"pt-c","x":465.4,"y":99,"label":"C","locked":true}],"shapes":[{"id":"line-b","type":"line","label":"b","points":["pt-b1","pt-b2"],"locked":true,"definition":{"p1Id":"pt-b1","p2Id":"pt-b2"}},{"id":"shape-ac","type":"line","label":"","points":["pt-a","pt-c"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-c"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2020 · 1. řádný termín · 10. Rovnoramenný lichoběžník s osou o
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '32f328bb-cb2f-4bec-ae7c-3c90c4cb3c4a'::uuid,
  $txt$2020 · 1. řádný termín · 10. Rovnoramenný lichoběžník s osou o$txt$,
  $txt$V rovině leží přímka o a body A, M.

Bod A je vrchol rovnoramenného lichoběžníku ABCD, bod M je střed jeho ramene BC. Přímka o je osou lichoběžníku ABCD.

Sestrojte vrcholy B, C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka o a body A, M.\n\nBod A je vrchol rovnoramenného lichoběžníku ABCD, bod M je střed jeho ramene BC. Přímka o je osou lichoběžníku ABCD.\n\nSestrojte vrcholy B, C, D lichoběžníku ABCD, označte je písmeny a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":817.4,"y":547.3,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":311.1,"y":74,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":444.4,"y":488.6,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":336.3,"y":478.6,"label":"A","locked":true},{"id":"pt-m","x":558.3,"y":270.9,"label":"M","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2019 · 1. řádný termín · 9. Rovnoramenný trojúhelník s úhlem 30°
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'dd18ad23-fbf0-47a7-83aa-d49fc59f5cf3'::uuid,
  $txt$2019 · 1. řádný termín · 9. Rovnoramenný trojúhelník s úhlem 30°$txt$,
  $txt$V rovině leží přímka KL.

Body K, L jsou vrcholy trojúhelníku KLM. Velikost úhlu LKM je 30°.
Vzdálenost bodu L od bodu K je stejná jako vzdálenost bodu L od bodu M.

Sestrojte jeden trojúhelník KLM.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka KL.\n\nBody K, L jsou vrcholy trojúhelníku KLM. Velikost úhlu LKM je 30°.\nVzdálenost bodu L od bodu K je stejná jako vzdálenost bodu L od bodu M.\n\nSestrojte jeden trojúhelník KLM.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":842.4,"y":438.4,"label":"","locked":true,"hidden":true},{"id":"pt-k","x":211.2,"y":372.3,"label":"K","locked":true},{"id":"pt-l","x":536.2,"y":372.3,"label":"L","locked":true}],"shapes":[{"id":"shape-kl","type":"line","label":"","points":["pt-k","pt-l"],"locked":true,"definition":{"p1Id":"pt-k","p2Id":"pt-l"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2019 · 1. řádný termín · 10. Obdélník s vrcholem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '0cdf95dc-06ff-429a-9084-e20b7efc8296'::uuid,
  $txt$2019 · 1. řádný termín · 10. Obdélník s vrcholem na přímce$txt$,
  $txt$V rovině leží přímka c a mimo ni dva různé body B, D.

Body B, D jsou vrcholy obdélníku ABCD. Vrchol C obdélníku ABCD leží na přímce c.

10.1 Sestrojte a označte písmenem chybějící vrchol C obdélníku ABCD.

10.2 Sestrojte a označte písmenem chybějící vrchol A obdélníku ABCD a obdélník narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka c a mimo ni dva různé body B, D.\n\nBody B, D jsou vrcholy obdélníku ABCD. Vrchol C obdélníku ABCD leží na přímce c.\n\n10.1 Sestrojte a označte písmenem chybějící vrchol C obdélníku ABCD.\n\n10.2 Sestrojte a označte písmenem chybějící vrchol A obdélníku ABCD a obdélník narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":842.4,"y":671,"label":"","locked":true,"hidden":true},{"id":"pt-c1","x":205.4,"y":140.1,"label":"","locked":true,"hidden":true},{"id":"pt-c2","x":674.2,"y":274.7,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":558.1,"y":482.6,"label":"B","locked":true},{"id":"pt-d","x":152.6,"y":289.1,"label":"D","locked":true}],"shapes":[{"id":"line-c","type":"line","label":"c","points":["pt-c1","pt-c2"],"locked":true,"definition":{"p1Id":"pt-c1","p2Id":"pt-c2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2019 · 2. řádný termín · 9. Rovnoramenný trojúhelník s ramenem na přímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '66926945-7f45-417b-a642-c55cbe9fa3d6'::uuid,
  $txt$2019 · 2. řádný termín · 9. Rovnoramenný trojúhelník s ramenem na přímce$txt$,
  $txt$V rovině leží bod B a přímka p, která prochází bodem A.

Body A, B jsou vrcholy rovnoramenného trojúhelníku ABC se základnou AB.
Rameno AC leží na přímce p.

Sestrojte a označte písmenem chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží bod B a přímka p, která prochází bodem A.\n\nBody A, B jsou vrcholy rovnoramenného trojúhelníku ABC se základnou AB.\nRameno AC leží na přímce p.\n\nSestrojte a označte písmenem chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":842.4,"y":471.7,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":517.4,"y":46.5,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":517.4,"y":450.2,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":517.4,"y":73.6,"label":"A","locked":true},{"id":"pt-b","x":303.7,"y":350.8,"label":"B","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2019 · 2. řádný termín · 10. Čtverec se dvěma vrcholy na kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'dafd0c20-bb5e-4926-9cbd-0edb3bcf2c55'::uuid,
  $txt$2019 · 2. řádný termín · 10. Čtverec se dvěma vrcholy na kružnici$txt$,
  $txt$V rovině leží přímka p a kružnice k se středem S. Bod A je jedním ze dvou průsečíků přímky p a kružnice k.

Bod A je vrchol čtverce ABCD, bod S leží uvnitř tohoto čtverce a na přímce p leží strana AB.
Právě dva ze čtyř vrcholů čtverce ABCD leží na kružnici k.

Sestrojte a označte písmeny chybějící vrcholy čtverce ABCD a čtverec narýsujte.
Najděte všechna řešení.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a kružnice k se středem S. Bod A je jedním ze dvou průsečíků přímky p a kružnice k.\n\nBod A je vrchol čtverce ABCD, bod S leží uvnitř tohoto čtverce a na přímce p leží strana AB.\nPrávě dva ze čtyř vrcholů čtverce ABCD leží na kružnici k.\n\nSestrojte a označte písmeny chybějící vrcholy čtverce ABCD a čtverec narýsujte.\nNajděte všechna řešení.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":842.4,"y":599.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":108.3,"y":397.2,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":636.3,"y":559.9,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":405.1,"y":311.9,"label":"S","locked":true},{"id":"pt-a","x":253,"y":441.8,"label":"A","locked":true},{"id":"pt-k-rim","x":605.1,"y":311.9,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}},{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2018 · 1. řádný termín · 9. Trojúhelník s těžnicí a výškou 6 cm
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'd0abcd42-585f-4d26-b9c8-db0555db7e12'::uuid,
  $txt$2018 · 1. řádný termín · 9. Trojúhelník s těžnicí a výškou 6 cm$txt$,
  $txt$V rovině leží přímka AB a mimo ni bod M.

Úsečka AB je strana c trojúhelníku ABC. Bod M leží uvnitř tohoto trojúhelníku na těžnici tc (těžnice na stranu c). Výška vc (výška na stranu c) měří 6 cm.

9.1 Sestrojte těžnici tc, chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.

9.2 Sestrojte těžiště trojúhelníku ABC a označte jej písmenem T.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka AB a mimo ni bod M.\n\nÚsečka AB je strana c trojúhelníku ABC. Bod M leží uvnitř tohoto trojúhelníku na těžnici tc (těžnice na stranu c). Výška vc (výška na stranu c) měří 6 cm.\n\n9.1 Sestrojte těžnici tc, chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.\n\n9.2 Sestrojte těžiště trojúhelníku ABC a označte jej písmenem T.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":477.9,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":156.6,"y":395.9,"label":"A","locked":true},{"id":"pt-b","x":609,"y":395.9,"label":"B","locked":true},{"id":"pt-m","x":609.7,"y":165.6,"label":"M","locked":true}],"shapes":[{"id":"shape-ab","type":"line","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2018 · 1. řádný termín · 10. Střed kružnice opsané trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'be4e60f3-cd27-4c1f-9e1e-28694f4238b6'::uuid,
  $txt$2018 · 1. řádný termín · 10. Střed kružnice opsané trojúhelníku$txt$,
  $txt$V rovině leží trojúhelník KLM.

Kružnice k prochází vrcholy trojúhelníku KLM.

Sestrojte střed S kružnice k.$txt$,
  null,
  $json$[{"text":"V rovině leží trojúhelník KLM.\n\nKružnice k prochází vrcholy trojúhelníku KLM.\n\nSestrojte střed S kružnice k.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":707.5,"label":"","locked":true,"hidden":true},{"id":"pt-k","x":343,"y":630.1,"label":"K","locked":true},{"id":"pt-l","x":690.8,"y":176.3,"label":"L","locked":true},{"id":"pt-m","x":148.4,"y":278.2,"label":"M","locked":true}],"shapes":[{"id":"shape-kl","type":"segment","label":"","points":["pt-k","pt-l"],"locked":true,"definition":{"p1Id":"pt-k","p2Id":"pt-l"}},{"id":"shape-lm","type":"segment","label":"","points":["pt-l","pt-m"],"locked":true,"definition":{"p1Id":"pt-l","p2Id":"pt-m"}},{"id":"shape-mk","type":"segment","label":"","points":["pt-m","pt-k"],"locked":true,"definition":{"p1Id":"pt-m","p2Id":"pt-k"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2018 · 2. řádný termín · 9. Výšky pravoúhlého trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '022dd853-050e-48b2-84f9-aa37e1f96184'::uuid,
  $txt$2018 · 2. řádný termín · 9. Výšky pravoúhlého trojúhelníku$txt$,
  $txt$9.1 V pravoúhlém trojúhelníku ABC sestrojte a popište výšky va, vb, vc.

9.2 V rovině leží přímka AB a mimo ni bod M.
Úsečka AB je přepona c pravoúhlého trojúhelníku ABC.
Bod M leží na kterékoli z jeho tří výšek va, vb, vc.
Sestrojte chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.
Najděte všechna řešení.
(Neuvažujte o řešení, kdy bod M leží vně trojúhelníku.)$txt$,
  null,
  $json$[{"text":"9.1 V pravoúhlém trojúhelníku ABC sestrojte a popište výšky va, vb, vc.\n\n9.2 V rovině leží přímka AB a mimo ni bod M.\nÚsečka AB je přepona c pravoúhlého trojúhelníku ABC.\nBod M leží na kterékoli z jeho tří výšek va, vb, vc.\nSestrojte chybějící vrchol C trojúhelníku ABC a trojúhelník narýsujte.\nNajděte všechna řešení.\n(Neuvažujte o řešení, kdy bod M leží vně trojúhelníku.)","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":764.5,"label":"","locked":true,"hidden":true},{"id":"pt-a0","x":39.8,"y":174.3,"label":"A","locked":true},{"id":"pt-b0","x":268.2,"y":174.3,"label":"B","locked":true},{"id":"pt-c0","x":193.3,"y":67,"label":"C","locked":true},{"id":"pt-a","x":126.5,"y":660.8,"label":"A","locked":true},{"id":"pt-b","x":579,"y":660.8,"label":"B","locked":true},{"id":"pt-m","x":318.9,"y":580.5,"label":"M","locked":true}],"shapes":[{"id":"shape-ab0","type":"segment","label":"","points":["pt-a0","pt-b0"],"locked":true,"definition":{"p1Id":"pt-a0","p2Id":"pt-b0"}},{"id":"shape-bc0","type":"segment","label":"","points":["pt-b0","pt-c0"],"locked":true,"definition":{"p1Id":"pt-b0","p2Id":"pt-c0"}},{"id":"shape-ca0","type":"segment","label":"","points":["pt-c0","pt-a0"],"locked":true,"definition":{"p1Id":"pt-c0","p2Id":"pt-a0"}},{"id":"shape-ab","type":"line","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2018 · 2. řádný termín · 10. Rovnoramenný lichoběžník s osou o
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '032e2924-d7f2-4ca9-a250-2e6f66c08203'::uuid,
  $txt$2018 · 2. řádný termín · 10. Rovnoramenný lichoběžník s osou o$txt$,
  $txt$V rovině leží polopřímka AX a přímka o.

Bod A je vrchol rovnoramenného lichoběžníku ABCD s osou souměrnosti o.
Vrchol D tohoto lichoběžníku leží na polopřímce AX.
Strany AB a AD mají stejnou délku.

Sestrojte a popište chybějící vrcholy lichoběžníku ABCD a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží polopřímka AX a přímka o.\n\nBod A je vrchol rovnoramenného lichoběžníku ABCD s osou souměrnosti o.\nVrchol D tohoto lichoběžníku leží na polopřímce AX.\nStrany AB a AD mají stejnou délku.\n\nSestrojte a popište chybějící vrcholy lichoběžníku ABCD a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":465.1,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":316,"y":51.5,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":444.3,"y":429.9,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":320.3,"y":414.4,"label":"A","locked":true},{"id":"pt-x","x":135.5,"y":172.1,"label":"X","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}},{"id":"shape-ax","type":"ray","label":"","points":["pt-a","pt-x"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-x"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2017 · 1. řádný termín · 9. Rovnoramenný trojúhelník s osou souměrnosti
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '945ea4b4-5157-4c8b-ac4c-97ca027ec5d4'::uuid,
  $txt$2017 · 1. řádný termín · 9. Rovnoramenný trojúhelník s osou souměrnosti$txt$,
  $txt$V rovině leží různoběžky o, p a bod L na přímce p.

Bod L je vrchol rovnoramenného trojúhelníku KLM, přímka o je osou souměrnosti tohoto trojúhelníku a strana KL leží na přímce p.
Sestrojte chybějící vrcholy K, M trojúhelníku KLM a trojúhelník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží různoběžky o, p a bod L na přímce p.\n\nBod L je vrchol rovnoramenného trojúhelníku KLM, přímka o je osou souměrnosti tohoto trojúhelníku a strana KL leží na přímce p.\nSestrojte chybějící vrcholy K, M trojúhelníku KLM a trojúhelník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":286.9,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":173.9,"y":220.7,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":573.4,"y":130.7,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":91.9,"y":248.1,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":600.9,"y":248.1,"label":"","locked":true,"hidden":true},{"id":"pt-l","x":549.6,"y":248.1,"label":"L","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}},{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2017 · 1. řádný termín · 10. Pravoúhlý lichoběžník
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'e8ba1297-750a-4136-b690-5407da0d82c3'::uuid,
  $txt$2017 · 1. řádný termín · 10. Pravoúhlý lichoběžník$txt$,
  $txt$V rovině leží body A, B a D.

Body A, B a D jsou vrcholy pravoúhlého lichoběžníku ABCD.
Sestrojte chybějící vrchol C lichoběžníku ABCD a lichoběžník narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a D.\n\nBody A, B a D jsou vrcholy pravoúhlého lichoběžníku ABCD.\nSestrojte chybějící vrchol C lichoběžníku ABCD a lichoběžník narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":421,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":120.8,"y":376,"label":"A","locked":true},{"id":"pt-b","x":618.9,"y":274,"label":"B","locked":true},{"id":"pt-d","x":257.5,"y":123.9,"label":"D","locked":true}],"shapes":[{"id":"shape-ab","type":"ray","label":"","points":["pt-a","pt-b"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-b"}},{"id":"shape-ad","type":"ray","label":"","points":["pt-a","pt-d"],"locked":true,"definition":{"p1Id":"pt-a","p2Id":"pt-d"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2017 · 2. řádný termín · 9. Středová souměrnost trojúhelníku
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '7b69ed0e-c269-4c28-9f1b-874ff1bd7ed7'::uuid,
  $txt$2017 · 2. řádný termín · 9. Středová souměrnost trojúhelníku$txt$,
  $txt$V rovině leží trojúhelník RST.

Sestrojte obraz R₁S₁T₁ trojúhelníku RST ve středové souměrnosti se středem S. Všechny vrcholy trojúhelníku R₁S₁T₁ označte.$txt$,
  null,
  $json$[{"text":"V rovině leží trojúhelník RST.\n\nSestrojte obraz R₁S₁T₁ trojúhelníku RST ve středové souměrnosti se středem S. Všechny vrcholy trojúhelníku R₁S₁T₁ označte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":457.4,"label":"","locked":true,"hidden":true},{"id":"pt-r","x":83.3,"y":203,"label":"R","locked":true},{"id":"pt-s","x":385.3,"y":203,"label":"S","locked":true},{"id":"pt-t","x":527.2,"y":61.2,"label":"T","locked":true}],"shapes":[{"id":"shape-rs","type":"segment","label":"","points":["pt-r","pt-s"],"locked":true,"definition":{"p1Id":"pt-r","p2Id":"pt-s"}},{"id":"shape-st","type":"segment","label":"","points":["pt-s","pt-t"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-t"}},{"id":"shape-tr","type":"segment","label":"","points":["pt-t","pt-r"],"locked":true,"definition":{"p1Id":"pt-t","p2Id":"pt-r"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2017 · 2. řádný termín · 10. Rovnoramenný lichoběžník v kružnici
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '9fe9e420-8e4b-48b2-8ed0-a515f80db1b2'::uuid,
  $txt$2017 · 2. řádný termín · 10. Rovnoramenný lichoběžník v kružnici$txt$,
  $txt$Kružnici k se středem S protíná přímka ve dvou bodech C a D.

Body C, D jsou vrcholy rovnoramenného lichoběžníku ABCD.
Všechny čtyři vrcholy tohoto lichoběžníku leží na kružnici k.
Vzdálenost chybějících vrcholů A, B od přímky CD je rovna poloměru r = |SC| kružnice k.

10.1 Sestrojte vrcholy A, B lichoběžníku ABCD a lichoběžník narýsujte.

10.2 Sestrojte osu souměrnosti lichoběžníku ABCD (pokud existuje) a označte ji o.

10.3 Sestrojte výšku lichoběžníku ABCD z vrcholu D a označte ji v.$txt$,
  null,
  $json$[{"text":"Kružnici k se středem S protíná přímka ve dvou bodech C a D.\n\nBody C, D jsou vrcholy rovnoramenného lichoběžníku ABCD.\nVšechny čtyři vrcholy tohoto lichoběžníku leží na kružnici k.\nVzdálenost chybějících vrcholů A, B od přímky CD je rovna poloměru r = |SC| kružnice k.\n\n10.1 Sestrojte vrcholy A, B lichoběžníku ABCD a lichoběžník narýsujte.\n\n10.2 Sestrojte osu souměrnosti lichoběžníku ABCD (pokud existuje) a označte ji o.\n\n10.3 Sestrojte výšku lichoběžníku ABCD z vrcholu D a označte ji v.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":575.3,"label":"","locked":true,"hidden":true},{"id":"pt-s","x":454.1,"y":333.2,"label":"S","locked":true},{"id":"pt-c","x":454.1,"y":122.7,"label":"C","locked":true},{"id":"pt-d","x":269.9,"y":231.1,"label":"D","locked":true},{"id":"pt-k-rim","x":664.7,"y":333.2,"label":"","locked":true,"hidden":true}],"shapes":[{"id":"shape-k","type":"circle","label":"k","points":["pt-s","pt-k-rim"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-k-rim"}},{"id":"shape-cd","type":"line","label":"","points":["pt-c","pt-d"],"locked":true,"definition":{"p1Id":"pt-c","p2Id":"pt-d"}},{"id":"shape-sc","type":"segment","label":"","points":["pt-s","pt-c"],"locked":true,"definition":{"p1Id":"pt-s","p2Id":"pt-c"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2016 · 1. řádný termín · 9. Body na přímce: úhel 60° a stejná vzdálenost
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'a1a8f6ef-551a-4893-ae35-cdbfefe22230'::uuid,
  $txt$2016 · 1. řádný termín · 9. Body na přímce: úhel 60° a stejná vzdálenost$txt$,
  $txt$V rovině leží přímka p a mimo ni dva různé body M, L.

Na přímce p sestrojte všechny takové body
9.1 K, aby velikost úhlu KLM byla 60°;
9.2 N, aby vzdálenost bodů M, N byla stejná jako vzdálenost bodů M, L.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka p a mimo ni dva různé body M, L.\n\nNa přímce p sestrojte všechny takové body\n9.1 K, aby velikost úhlu KLM byla 60°;\n9.2 N, aby vzdálenost bodů M, N byla stejná jako vzdálenost bodů M, L.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":283.3,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":75.7,"y":77.1,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":683.1,"y":234.3,"label":"","locked":true,"hidden":true},{"id":"pt-l","x":562.2,"y":73.5,"label":"L","locked":true},{"id":"pt-m","x":355.6,"y":193.7,"label":"M","locked":true}],"shapes":[{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2016 · 1. řádný termín · 10. Čtverec s úhlopříčkou BD
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '4aa04c20-bb1e-481f-aeda-d0121ec69768'::uuid,
  $txt$2016 · 1. řádný termín · 10. Čtverec s úhlopříčkou BD$txt$,
  $txt$V rovině leží přímka BD.

Sestrojte chybějící vrcholy A, C čtverce ABCD. Čtverec narýsujte.$txt$,
  null,
  $json$[{"text":"V rovině leží přímka BD.\n\nSestrojte chybějící vrcholy A, C čtverce ABCD. Čtverec narýsujte.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":448.5,"label":"","locked":true,"hidden":true},{"id":"pt-b","x":497,"y":381.4,"label":"B","locked":true},{"id":"pt-d","x":290.6,"y":86.1,"label":"D","locked":true}],"shapes":[{"id":"shape-bd","type":"line","label":"","points":["pt-b","pt-d"],"locked":true,"definition":{"p1Id":"pt-b","p2Id":"pt-d"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2015 · 1. řádný termín · 9. Obraz bodu a přímky v osové souměrnosti
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  '1c15fd5e-c352-4a78-b019-1f00dbfd37e7'::uuid,
  $txt$2015 · 1. řádný termín · 9. Obraz bodu a přímky v osové souměrnosti$txt$,
  $txt$V rovině leží různoběžky o, p a bod A na přímce p.

9.1 Sestrojte bod B, který je obrazem bodu A v osové souměrnosti s osou o.

9.2 Sestrojte přímku q, která je obrazem přímky p v osové souměrnosti s osou o.$txt$,
  null,
  $json$[{"text":"V rovině leží různoběžky o, p a bod A na přímce p.\n\n9.1 Sestrojte bod B, který je obrazem bodu A v osové souměrnosti s osou o.\n\n9.2 Sestrojte přímku q, která je obrazem přímky p v osové souměrnosti s osou o.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":320.8,"label":"","locked":true,"hidden":true},{"id":"pt-o1","x":210.8,"y":63.9,"label":"","locked":true,"hidden":true},{"id":"pt-o2","x":683,"y":205.5,"label":"","locked":true,"hidden":true},{"id":"pt-p1","x":110.3,"y":34.8,"label":"","locked":true,"hidden":true},{"id":"pt-p2","x":528.8,"y":288.5,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":492.3,"y":266.5,"label":"A","locked":true}],"shapes":[{"id":"line-o","type":"line","label":"o","points":["pt-o1","pt-o2"],"locked":true,"definition":{"p1Id":"pt-o1","p2Id":"pt-o2"}},{"id":"line-p","type":"line","label":"p","points":["pt-p1","pt-p2"],"locked":true,"definition":{"p1Id":"pt-p1","p2Id":"pt-p2"}}],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

-- 2015 · 1. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na polopřímce
insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps
) values (
  'b074f32f-f15e-47ca-b924-af04f17ef939'::uuid,
  $txt$2015 · 1. řádný termín · 10. Rovnoramenný trojúhelník s vrcholem na polopřímce$txt$,
  $txt$V rovině leží body A, B a Y.

10.1 Na polopřímce BY sestrojte bod C tak, aby body A, B, C tvořily vrcholy rovnoramenného trojúhelníku se základnou AB, a trojúhelník ABC narýsujte.

10.2 Sestrojte osu souměrnosti o trojúhelníku ABC.$txt$,
  null,
  $json$[{"text":"V rovině leží body A, B a Y.\n\n10.1 Na polopřímce BY sestrojte bod C tak, aby body A, B, C tvořily vrcholy rovnoramenného trojúhelníku se základnou AB, a trojúhelník ABC narýsujte.\n\n10.2 Sestrojte osu souměrnosti o trojúhelníku ABC.","canvas_snapshot":{"points":[{"id":"pt-frame-tl","x":0,"y":0,"label":"","locked":true,"hidden":true},{"id":"pt-frame-br","x":820.6,"y":288.9,"label":"","locked":true,"hidden":true},{"id":"pt-a","x":432.9,"y":240.2,"label":"A","locked":true},{"id":"pt-b","x":766.7,"y":45.2,"label":"B","locked":true},{"id":"pt-y","x":390.6,"y":81.6,"label":"Y","locked":true}],"shapes":[],"freehandPaths":[]}}]$json$::jsonb
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps;

commit;
