-- Spusť v Supabase → SQL Editor (role postgres; obchází RLS).
-- 1) Smaže starší duplicitu „Osa úsečky 1“ (id 3e285ab1…, není v taskLibrary).
-- 2) U úkolu 11a2a50a… opraví krok 3: kružnice u B se jmenuje „l“ místo „k“.

begin;

delete from public.geometry_circuit_submissions
where assignment_id = '3e285ab1-89a6-4f07-81fb-523f96f53803';

delete from public.geometry_circuit_assignments
where id = '3e285ab1-89a6-4f07-81fb-523f96f53803';

update public.geometry_circuit_assignments
set
  instruction_steps = jsonb_set(
    instruction_steps,
    '{2,text}',
    to_jsonb('Narýsuj kružnici l se středem v bodě B a s poloměrem |AB|.'::text)
  ),
  instruction_text = replace(
    instruction_text,
    E'3. Narýsuj kružnici k se středem v bodě B a s poloměrem |AB|.',
    E'3. Narýsuj kružnici l se středem v bodě B a s poloměrem |AB|.'
  )
where id = '11a2a50a-a149-4a8a-8fc0-c87cd6e39d87';

commit;
