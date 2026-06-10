-- Re-key admins on email so access can be granted before first sign-in,
-- and add roles: superadmins manage the admin list, admins manage content.

-- 1) Schema: role column, email becomes the key, user_id becomes optional.
alter table public.admins add column if not exists role text not null default 'admin';
alter table public.admins add constraint admins_role_check check (role in ('admin', 'superadmin'));

update public.admins a
set email = lower(u.email)
from auth.users u
where u.id = a.user_id and (a.email is null or a.email = '');

alter table public.admins drop constraint admins_pkey;
alter table public.admins drop constraint admins_user_id_fkey;
alter table public.admins alter column user_id drop not null;
alter table public.admins alter column email set not null;
alter table public.admins add constraint admins_email_lowercase check (email = lower(email));
alter table public.admins add primary key (email);
alter table public.admins
  add constraint admins_user_id_fkey foreign key (user_id)
  references auth.users (id) on delete set null;

-- 2) Seed superadmins.
update public.admins set role = 'superadmin' where email = 'hello@lashly.app';
insert into public.admins (email, role)
values ('nathan@cghotelgroup.com', 'superadmin')
on conflict (email) do update set role = 'superadmin';

-- 3) Helpers. Email in the JWT is verified (magic-link sign-in), so matching on
-- it is safe and lets invited users be admins before their first sign-in.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1 from public.admins a
    where a.email = lower(coalesce(auth.jwt()->>'email', ''))
       or (auth.uid() is not null and a.user_id = auth.uid())
  );
$$;

create or replace function public.is_superadmin()
returns boolean
language sql stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1 from public.admins a
    where a.role = 'superadmin'
      and (a.email = lower(coalesce(auth.jwt()->>'email', ''))
        or (auth.uid() is not null and a.user_id = auth.uid()))
  );
$$;

-- Pre-auth login gate: the login page refuses to send a magic link (and so
-- refuses to create an account) for emails not on the admin list.
create or replace function public.is_allowed_email(check_email text)
returns boolean
language sql stable security definer
set search_path to 'public'
as $$
  select exists (
    select 1 from public.admins a where a.email = lower(trim(check_email))
  );
$$;

revoke all on function public.is_allowed_email(text) from public;
grant execute on function public.is_allowed_email(text) to anon, authenticated;

-- 4) Policies: admins can read the list; only superadmins can invite/remove.
-- Invites are restricted to @cghotelgroup.com and to the plain admin role at
-- the database level; superadmin rows can't be removed through the API at all.
drop policy if exists "admins manage" on public.admins;
drop policy if exists "admins read self" on public.admins;

create policy "admins read" on public.admins
  for select using (
    is_admin() or email = lower(coalesce(auth.jwt()->>'email', ''))
  );

create policy "superadmins invite" on public.admins
  for insert with check (
    is_superadmin()
    and role = 'admin'
    and email like '%@cghotelgroup.com'
  );

create policy "superadmins remove" on public.admins
  for delete using (is_superadmin() and role = 'admin');
