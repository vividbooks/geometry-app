-- Úkol „Konstrukce trojúhelníků 2“: 11 kroků. Spusť v Supabase SQL Editoru.

begin;

alter table public.geometry_circuit_assignments
  add column if not exists new_canvas_per_step boolean not null default false;

insert into public.geometry_circuit_assignments (
  id, title, instruction_text, instruction_image, instruction_steps, new_canvas_per_step
) values (
  'e5f1a8c3-2d47-4b9e-91c0-8a3f6d2e5b17'::uuid,
  'Konstrukce trojúhelníků 2',
  $txt$1. Narýsuj trojúhelník DEF, jestliže |DF| = 6 cm, |DE| = 6 cm, |FE| = 5 cm. Zapiš, kolik neshodných trojúhelníků DEF je možné narýsovat.

2. Narýsuj trojúhelník GHI, jestliže |GI| = 8 cm, |GH| = 2 cm, |IH| = 5 cm. Zapiš, kolik neshodných trojúhelníků GHI je možné narýsovat.

3. Narýsuj trojúhelník KLM, jestliže |KM| = 8 cm, |KL| = 6 cm, |∠ LKM| = 60°. Zapiš, kolik neshodných trojúhelníků KLM je možné narýsovat.

4. Narýsuj trojúhelník PQR, jestliže |QR| = 7 cm, |PQ| = 9 cm, |∠ PQR| = 45°. Zapiš, kolik neshodných trojúhelníků PQR je možné narýsovat.

5. Narýsuj trojúhelník STU, jestliže |∠ UST| = 40°, |∠ STU| = 70°, |ST| = 9 cm. Zapiš, kolik neshodných trojúhelníků STU je možné narýsovat.

6. Narýsuj trojúhelník XYZ, jestliže |∠ XYZ| = 50°, |∠ YZX| = 100°, |YZ| = 10 cm. Zapiš, kolik neshodných trojúhelníků XYZ je možné narýsovat.

7. Narýsuj trojúhelník MNO, jestliže |∠ OMN| = 115°, |∠ NOM| = 80°, |OM| = 11 cm. Zapiš, kolik neshodných trojúhelníků MNO je možné narýsovat.

8. Narýsuj trojúhelník UVW, jestliže |∠ WUV| = 45°, |∠ UVW| = 55°, |WU| = 10 cm. Zapiš, kolik neshodných trojúhelníků UVW je možné narýsovat.

9. Narýsuj trojúhelník RST, jestliže |∠ TRS| = 50°, |TR| = 10 cm, |ST| = 7 cm. Zapiš, kolik neshodných trojúhelníků RST je možné narýsovat.

10. Narýsuj trojúhelník JKL, jestliže |∠ LJK| = 30°, |LJ| = 4 cm, |KL| = 3 cm. Zapiš, kolik neshodných trojúhelníků JKL je možné narýsovat.

11. Narýsuj trojúhelník FGH, jestliže |∠ HFG| = 90°, |HF| = 3 cm, |GH| = 5 cm. Zapiš, kolik neshodných trojúhelníků FGH je možné narýsovat.$txt$,
  null,
  $json$[{"text":"Narýsuj trojúhelník DEF, jestliže |DF| = 6 cm, |DE| = 6 cm, |FE| = 5 cm. Zapiš, kolik neshodných trojúhelníků DEF je možné narýsovat."},{"text":"Narýsuj trojúhelník GHI, jestliže |GI| = 8 cm, |GH| = 2 cm, |IH| = 5 cm. Zapiš, kolik neshodných trojúhelníků GHI je možné narýsovat."},{"text":"Narýsuj trojúhelník KLM, jestliže |KM| = 8 cm, |KL| = 6 cm, |∠ LKM| = 60°. Zapiš, kolik neshodných trojúhelníků KLM je možné narýsovat."},{"text":"Narýsuj trojúhelník PQR, jestliže |QR| = 7 cm, |PQ| = 9 cm, |∠ PQR| = 45°. Zapiš, kolik neshodných trojúhelníků PQR je možné narýsovat."},{"text":"Narýsuj trojúhelník STU, jestliže |∠ UST| = 40°, |∠ STU| = 70°, |ST| = 9 cm. Zapiš, kolik neshodných trojúhelníků STU je možné narýsovat."},{"text":"Narýsuj trojúhelník XYZ, jestliže |∠ XYZ| = 50°, |∠ YZX| = 100°, |YZ| = 10 cm. Zapiš, kolik neshodných trojúhelníků XYZ je možné narýsovat."},{"text":"Narýsuj trojúhelník MNO, jestliže |∠ OMN| = 115°, |∠ NOM| = 80°, |OM| = 11 cm. Zapiš, kolik neshodných trojúhelníků MNO je možné narýsovat."},{"text":"Narýsuj trojúhelník UVW, jestliže |∠ WUV| = 45°, |∠ UVW| = 55°, |WU| = 10 cm. Zapiš, kolik neshodných trojúhelníků UVW je možné narýsovat."},{"text":"Narýsuj trojúhelník RST, jestliže |∠ TRS| = 50°, |TR| = 10 cm, |ST| = 7 cm. Zapiš, kolik neshodných trojúhelníků RST je možné narýsovat."},{"text":"Narýsuj trojúhelník JKL, jestliže |∠ LJK| = 30°, |LJ| = 4 cm, |KL| = 3 cm. Zapiš, kolik neshodných trojúhelníků JKL je možné narýsovat."},{"text":"Narýsuj trojúhelník FGH, jestliže |∠ HFG| = 90°, |HF| = 3 cm, |GH| = 5 cm. Zapiš, kolik neshodných trojúhelníků FGH je možné narýsovat."}]$json$::jsonb,
  true
)
on conflict (id) do update set
  title = excluded.title,
  instruction_text = excluded.instruction_text,
  instruction_image = excluded.instruction_image,
  instruction_steps = excluded.instruction_steps,
  new_canvas_per_step = excluded.new_canvas_per_step;

commit;
