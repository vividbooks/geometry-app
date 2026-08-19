-- Nový úkol „Konstrukce trojúhelníků“ (5 kroků, v každém 1 trojúhelník).
-- Spusť v Supabase → SQL Editor (role postgres; obchází RLS).

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id,
  title,
  instruction_text,
  instruction_image,
  instruction_steps,
  new_canvas_per_step
)
values (
  '7c3e9b12-4f8a-4d6e-9c21-8b5a0e17d4f3'::uuid,
  'Konstrukce trojúhelníků',
  $txt$1. Narýsuj △DEF takový, že |DE| = 5 cm, |DF| = 7 cm a |EF| = 6 cm. Kolik různých trojúhelníků s těmito délkami stran existuje?

2. Sestroj trojúhelník PQR s |PQ| = 5 cm, |QR| = 3 cm a úhlem PQR o velikosti 70°. Kolik různých trojúhelníků splňujících tyto podmínky existuje?

3. Narýsuj trojúhelník ABC se stranou |BC| = 5 cm, úhlem ABC o velikosti 50° a úhlem ACB o velikosti 65°. Kolik různých trojúhelníků s těmito údaji existuje?

4. Narýsuj △MNO takový, že |MN| = 5 cm, |NO| = 6 cm a |∠ NMO| = 75°. Kolik různých trojúhelníků, které splňují tyto podmínky, existuje?

5. Sestroj trojúhelník STU s délkami |ST| = 7 cm a |TU| = 5 cm a s úhlem TSU o velikosti 40°. Kolik různých trojúhelníků s těmito podmínkami existuje?$txt$,
  null,
  $json$[
    {"text": "Narýsuj △DEF takový, že |DE| = 5 cm, |DF| = 7 cm a |EF| = 6 cm. Kolik různých trojúhelníků s těmito délkami stran existuje?"},
    {"text": "Sestroj trojúhelník PQR s |PQ| = 5 cm, |QR| = 3 cm a úhlem PQR o velikosti 70°. Kolik různých trojúhelníků splňujících tyto podmínky existuje?"},
    {"text": "Narýsuj trojúhelník ABC se stranou |BC| = 5 cm, úhlem ABC o velikosti 50° a úhlem ACB o velikosti 65°. Kolik různých trojúhelníků s těmito údaji existuje?"},
    {"text": "Narýsuj △MNO takový, že |MN| = 5 cm, |NO| = 6 cm a |∠ NMO| = 75°. Kolik různých trojúhelníků, které splňují tyto podmínky, existuje?"},
    {"text": "Sestroj trojúhelník STU s délkami |ST| = 7 cm a |TU| = 5 cm a s úhlem TSU o velikosti 40°. Kolik různých trojúhelníků s těmito podmínkami existuje?"}
  ]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
