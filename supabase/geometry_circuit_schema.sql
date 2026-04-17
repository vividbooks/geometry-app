-- Geometrie online – úkoly „obvodů“ (stejné sloupce jako Elobvod circuit_*).
-- Spusť v Supabase → SQL Editor (stejný projekt jako Elobvod: jjpiguuubvmiobmixwgh).
-- Data jsou oddělená od public.circuit_assignments / circuit_submissions.

create table if not exists public.geometry_circuit_assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  instruction_text text not null default '',
  instruction_image text,
  instruction_steps jsonb not null default '[]'::jsonb,
  initial_canvas_snapshot jsonb,
  created_at timestamptz not null default now()
);

comment on table public.geometry_circuit_assignments is
  'Geometrie online – zadání úkolů (elektrické obvody); odděleno od Elobvod public.circuit_assignments.';

alter table public.geometry_circuit_assignments add column if not exists title text not null default '';
alter table public.geometry_circuit_assignments add column if not exists instruction_text text not null default '';
alter table public.geometry_circuit_assignments add column if not exists instruction_image text;
alter table public.geometry_circuit_assignments add column if not exists instruction_steps jsonb not null default '[]'::jsonb;
alter table public.geometry_circuit_assignments add column if not exists initial_canvas_snapshot jsonb;
alter table public.geometry_circuit_assignments add column if not exists created_at timestamptz not null default now();

create table if not exists public.geometry_circuit_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.geometry_circuit_assignments (id) on delete cascade,
  student_name text not null,
  circuit_encoded text not null,
  student_note text not null default '',
  created_at timestamptz not null default now()
);

comment on table public.geometry_circuit_submissions is
  'Geometrie online – odevzdání studentů; odděleno od Elobvod public.circuit_submissions.';

alter table public.geometry_circuit_submissions add column if not exists assignment_id uuid references public.geometry_circuit_assignments (id) on delete cascade;
alter table public.geometry_circuit_submissions add column if not exists student_name text not null default '';
alter table public.geometry_circuit_submissions add column if not exists circuit_encoded text not null default '';
alter table public.geometry_circuit_submissions add column if not exists student_note text not null default '';
alter table public.geometry_circuit_submissions add column if not exists created_at timestamptz not null default now();

create index if not exists geometry_circuit_submissions_assignment_id_idx
  on public.geometry_circuit_submissions (assignment_id);

grant usage on schema public to anon, authenticated;
grant select, insert on public.geometry_circuit_assignments to anon, authenticated;
grant select, insert on public.geometry_circuit_submissions to anon, authenticated;

alter table public.geometry_circuit_assignments enable row level security;
alter table public.geometry_circuit_submissions enable row level security;

drop policy if exists "geometry_circuit_assignments_select" on public.geometry_circuit_assignments;
drop policy if exists "geometry_circuit_assignments_insert" on public.geometry_circuit_assignments;
drop policy if exists "geometry_circuit_submissions_select" on public.geometry_circuit_submissions;
drop policy if exists "geometry_circuit_submissions_insert" on public.geometry_circuit_submissions;

create policy "geometry_circuit_assignments_select" on public.geometry_circuit_assignments for select using (true);
create policy "geometry_circuit_assignments_insert" on public.geometry_circuit_assignments for insert with check (true);

create policy "geometry_circuit_submissions_select" on public.geometry_circuit_submissions for select using (true);
create policy "geometry_circuit_submissions_insert" on public.geometry_circuit_submissions for insert with check (true);

notify pgrst, 'reload schema';
