-- Short links: /l/[slug] -> redirect + hit logging (service role only at runtime; RLS blocks anon/auth)

create table if not exists public.short_links (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  url text not null,
  label text,
  created_at timestamptz not null default now(),
  constraint short_links_slug_format check (slug ~ '^[a-zA-Z0-9_-]+$'),
  constraint short_links_slug_length check (char_length(slug) <= 128),
  constraint short_links_url_scheme check (url ~ '^https?://')
);

create table if not exists public.short_link_hits (
  id uuid primary key default gen_random_uuid(),
  short_link_id uuid not null references public.short_links (id) on delete cascade,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists short_link_hits_short_link_id_idx on public.short_link_hits (short_link_id);
create index if not exists short_link_hits_created_at_idx on public.short_link_hits (created_at desc);

alter table public.short_links enable row level security;
alter table public.short_link_hits enable row level security;

-- No policies: authenticated and anon roles have no access; service_role bypasses RLS.

comment on table public.short_links is 'URL shortener targets for /l/[slug]; manage rows via Supabase dashboard.';
comment on column public.short_links.label is 'Optional human-readable label in the dashboard.';
comment on table public.short_link_hits is 'Per-request log for short link redirects (referrer, user agent).';
