-- Run in Supabase SQL editor or via CLI after linking the project.
create table if not exists public.weight_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kg double precision not null,
  note text,
  source text,
  raw_payload jsonb
);

create index if not exists weight_entries_created_at_idx
  on public.weight_entries (created_at desc);

comment on table public.weight_entries is 'Personal weight log via secured API; no public anon access required when writes go only through Next.js.';
