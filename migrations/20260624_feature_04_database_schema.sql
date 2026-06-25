create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  phone text,
  location text,
  current_title text,
  experience_level text check (
    experience_level is null
    or experience_level in ('junior', 'mid', 'senior', 'lead')
  ),
  years_experience integer check (
    years_experience is null
    or years_experience >= 0
  ),
  skills text[] not null default '{}'::text[],
  industries text[] not null default '{}'::text[],
  work_experience jsonb not null default '[]'::jsonb check (
    jsonb_typeof(work_experience) = 'array'
    and jsonb_array_length(work_experience) <= 3
  ),
  education jsonb not null default '{}'::jsonb check (
    jsonb_typeof(education) = 'object'
  ),
  job_titles_seeking text[] not null default '{}'::text[],
  remote_preference text check (
    remote_preference is null
    or remote_preference in ('remote', 'onsite', 'hybrid', 'any')
  ),
  preferred_locations text[] not null default '{}'::text[],
  salary_expectation text,
  cover_letter_tone text check (
    cover_letter_tone is null
    or cover_letter_tone in ('formal', 'casual', 'enthusiastic')
  ),
  linkedin_url text,
  portfolio_url text,
  work_authorization text check (
    work_authorization is null
    or work_authorization in ('citizen', 'permanent_resident', 'visa_required')
  ),
  resume_pdf_url text,
  is_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (
    status in ('running', 'completed', 'failed')
  ),
  job_title_searched text not null,
  location_searched text,
  jobs_found integer not null default 0 check (jobs_found >= 0),
  started_at timestamptz not null default now(),
  completed_at timestamptz check (
    completed_at is null
    or completed_at >= started_at
  )
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid references public.agent_runs(id) on delete set null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null check (
    source in ('search', 'url')
  ),
  source_url text not null,
  external_apply_url text not null,
  title text not null,
  company text not null,
  location text,
  salary text,
  job_type text check (
    job_type is null
    or job_type in ('fulltime', 'parttime', 'contract')
  ),
  about_role text,
  responsibilities text[] not null default '{}'::text[],
  requirements text[] not null default '{}'::text[],
  nice_to_have text[] not null default '{}'::text[],
  benefits text[] not null default '{}'::text[],
  about_company text,
  match_score integer not null check (
    match_score >= 0
    and match_score <= 100
  ),
  match_reason text,
  matched_skills text[] not null default '{}'::text[],
  missing_skills text[] not null default '{}'::text[],
  company_research jsonb check (
    company_research is null
    or jsonb_typeof(company_research) = 'object'
  ),
  found_at timestamptz not null default now(),
  constraint jobs_search_runs_check check (
    source = 'url'
    or run_id is not null
  )
);

create table if not exists public.agent_logs (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.agent_runs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  level text not null check (
    level in ('info', 'success', 'warning', 'error')
  ),
  job_id uuid references public.jobs(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_email on public.profiles (email);
create index if not exists idx_agent_runs_user_id_started_at
  on public.agent_runs (user_id, started_at desc);
create index if not exists idx_jobs_user_id_found_at
  on public.jobs (user_id, found_at desc);
create index if not exists idx_jobs_user_id_match_score
  on public.jobs (user_id, match_score desc);
create index if not exists idx_jobs_run_id on public.jobs (run_id);
create index if not exists idx_agent_logs_run_id_created_at
  on public.agent_logs (run_id, created_at desc);
create index if not exists idx_agent_logs_user_id_created_at
  on public.agent_logs (user_id, created_at desc);
create index if not exists idx_agent_logs_job_id on public.agent_logs (job_id);

revoke all on public.profiles from public, anon;
revoke all on public.agent_runs from public, anon;
revoke all on public.jobs from public, anon;
revoke all on public.agent_logs from public, anon;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.agent_runs to authenticated;
grant select, insert, update, delete on public.jobs to authenticated;
grant select, insert, update, delete on public.agent_logs to authenticated;

alter table public.profiles enable row level security;
alter table public.agent_runs enable row level security;
alter table public.jobs enable row level security;
alter table public.agent_logs enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_delete_own" on public.profiles;
drop policy if exists "agent_runs_select_own" on public.agent_runs;
drop policy if exists "agent_runs_insert_own" on public.agent_runs;
drop policy if exists "agent_runs_update_own" on public.agent_runs;
drop policy if exists "agent_runs_delete_own" on public.agent_runs;
drop policy if exists "jobs_select_own" on public.jobs;
drop policy if exists "jobs_insert_own" on public.jobs;
drop policy if exists "jobs_update_own" on public.jobs;
drop policy if exists "jobs_delete_own" on public.jobs;
drop policy if exists "agent_logs_select_own" on public.agent_logs;
drop policy if exists "agent_logs_insert_own" on public.agent_logs;
drop policy if exists "agent_logs_update_own" on public.agent_logs;
drop policy if exists "agent_logs_delete_own" on public.agent_logs;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "profiles_delete_own"
on public.profiles
for delete
to authenticated
using (id = auth.uid());

create policy "agent_runs_select_own"
on public.agent_runs
for select
to authenticated
using (user_id = auth.uid());

create policy "agent_runs_insert_own"
on public.agent_runs
for insert
to authenticated
with check (user_id = auth.uid());

create policy "agent_runs_update_own"
on public.agent_runs
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "agent_runs_delete_own"
on public.agent_runs
for delete
to authenticated
using (user_id = auth.uid());

create policy "jobs_select_own"
on public.jobs
for select
to authenticated
using (user_id = auth.uid());

create policy "jobs_insert_own"
on public.jobs
for insert
to authenticated
with check (user_id = auth.uid());

create policy "jobs_update_own"
on public.jobs
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "jobs_delete_own"
on public.jobs
for delete
to authenticated
using (user_id = auth.uid());

create policy "agent_logs_select_own"
on public.agent_logs
for select
to authenticated
using (user_id = auth.uid());

create policy "agent_logs_insert_own"
on public.agent_logs
for insert
to authenticated
with check (user_id = auth.uid());

create policy "agent_logs_update_own"
on public.agent_logs
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "agent_logs_delete_own"
on public.agent_logs
for delete
to authenticated
using (user_id = auth.uid());

alter table storage.objects enable row level security;

drop policy if exists "resumes_select_own" on storage.objects;
drop policy if exists "resumes_insert_own" on storage.objects;
drop policy if exists "resumes_update_own" on storage.objects;
drop policy if exists "resumes_delete_own" on storage.objects;

create policy "resumes_select_own"
on storage.objects
for select
to authenticated
using (
  bucket = 'resumes'
  and key like 'resumes/' || auth.uid()::text || '/%'
);

create policy "resumes_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket = 'resumes'
  and key like 'resumes/' || auth.uid()::text || '/%'
);

create policy "resumes_update_own"
on storage.objects
for update
to authenticated
using (
  bucket = 'resumes'
  and key like 'resumes/' || auth.uid()::text || '/%'
)
with check (
  bucket = 'resumes'
  and key like 'resumes/' || auth.uid()::text || '/%'
);

create policy "resumes_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket = 'resumes'
  and key like 'resumes/' || auth.uid()::text || '/%'
);

-- Auto-create profile on first auth user creation to guarantee profile exists before child inserts
drop trigger if exists create_profile_on_auth_user_created on auth.users;
drop function if exists public.handle_new_auth_user();

create function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger create_profile_on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();
