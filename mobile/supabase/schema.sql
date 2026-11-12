-- Life Fix AI native schema. Run only in its dedicated Supabase project.
-- Additive/idempotent starter; inspect existing objects before applying to populated data.
create extension if not exists pgcrypto;grant usage on schema public to authenticated;
create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = '' as $ begin new.updated_at=now();return new;end;$;
create table if not exists public.profiles(id uuid primary key references auth.users(id) on delete cascade,display_name text,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
alter table public.profiles enable row level security;grant select,insert,update on public.profiles to authenticated;
drop policy if exists profiles_select_own on public.profiles;create policy profiles_select_own on public.profiles for select to authenticated using((select auth.uid())=id);
drop policy if exists profiles_insert_own on public.profiles;create policy profiles_insert_own on public.profiles for insert to authenticated with check((select auth.uid())=id);
drop policy if exists profiles_update_own on public.profiles;create policy profiles_update_own on public.profiles for update to authenticated using((select auth.uid())=id) with check((select auth.uid())=id);
drop trigger if exists profiles_updated_at on public.profiles;create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();

create table if not exists public.household_assets(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,asset_name text not null,category text,brand text,model text,purchase_date date,notes text,photo_path text,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table if not exists public.repair_projects(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,title text not null,description text,category text,difficulty text,status text not null default 'planned' check(status in('planned','in_progress','paused','completed')),estimated_cost numeric(10,2),actual_cost numeric(10,2),asset_id uuid references public.household_assets(id) on delete set null,completed_at timestamptz,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table if not exists public.repair_steps(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,project_id uuid not null references public.repair_projects(id) on delete cascade,step_number integer not null,instruction text not null,is_complete boolean not null default false,safety_note text,notes text,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table if not exists public.saved_solutions(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,title text not null,problem_description text,solution_text text not null,source_label text,is_ai_generated boolean not null default false,tags text[] not null default '{}'::text[],created_at timestamptz not null default now(),updated_at timestamptz not null default now());

do $$ declare t text;begin foreach t in array array['household_assets','repair_projects','repair_steps','saved_solutions'] loop
execute format('alter table public.%I enable row level security',t);execute format('grant select,insert,update,delete on public.%I to authenticated',t);
execute format('drop policy if exists %I on public.%I',t||'_select_own',t);execute format('create policy %I on public.%I for select to authenticated using((select auth.uid())=user_id)',t||'_select_own',t);
execute format('drop policy if exists %I on public.%I',t||'_insert_own',t);execute format('create policy %I on public.%I for insert to authenticated with check((select auth.uid())=user_id)',t||'_insert_own',t);
execute format('drop policy if exists %I on public.%I',t||'_update_own',t);execute format('create policy %I on public.%I for update to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id)',t||'_update_own',t);
execute format('drop policy if exists %I on public.%I',t||'_delete_own',t);execute format('create policy %I on public.%I for delete to authenticated using((select auth.uid())=user_id)',t||'_delete_own',t);
execute format('drop trigger if exists %I on public.%I',t||'_updated_at',t);execute format('create trigger %I before update on public.%I for each row execute function public.set_updated_at()',t||'_updated_at',t);
end loop;end $$;

insert into storage.buckets(id,name,public) values('life-fix-ai','life-fix-ai',false) on conflict(id) do nothing;
drop policy if exists life_fix_select_own on storage.objects;create policy life_fix_select_own on storage.objects for select to authenticated using(bucket_id='life-fix-ai' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists life_fix_insert_own on storage.objects;create policy life_fix_insert_own on storage.objects for insert to authenticated with check(bucket_id='life-fix-ai' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists life_fix_update_own on storage.objects;create policy life_fix_update_own on storage.objects for update to authenticated using(bucket_id='life-fix-ai' and (storage.foldername(name))[1]=(select auth.uid())::text) with check(bucket_id='life-fix-ai' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists life_fix_delete_own on storage.objects;create policy life_fix_delete_own on storage.objects for delete to authenticated using(bucket_id='life-fix-ai' and (storage.foldername(name))[1]=(select auth.uid())::text);
