-- Fix infinite recursion in RLS policies that check admin role.
-- The previous policies queried `profiles` from within a policy defined
-- on `profiles` itself (and tables whose admin policies reference
-- `profiles`), which Postgres rejects with
-- "infinite recursion detected in policy for relation profiles".
-- A security-definer function bypasses RLS for this internal check.

create function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles
drop policy if exists "profiles_admin_select_all" on public.profiles;
create policy "profiles_admin_select_all"
  on public.profiles for select
  using (public.is_admin());

-- services
drop policy if exists "services_admin_write" on public.services;
create policy "services_admin_write"
  on public.services for all
  using (public.is_admin())
  with check (public.is_admin());

-- orders
drop policy if exists "orders_admin_all" on public.orders;
create policy "orders_admin_all"
  on public.orders for all
  using (public.is_admin())
  with check (public.is_admin());

-- order_files
drop policy if exists "order_files_admin_all" on public.order_files;
create policy "order_files_admin_all"
  on public.order_files for all
  using (public.is_admin())
  with check (public.is_admin());

-- testimonials
drop policy if exists "testimonials_admin_all" on public.testimonials;
create policy "testimonials_admin_all"
  on public.testimonials for all
  using (public.is_admin())
  with check (public.is_admin());

-- storage: order-files
drop policy if exists "order_files_storage_admin_all" on storage.objects;
create policy "order_files_storage_admin_all"
  on storage.objects for all
  using (bucket_id = 'order-files' and public.is_admin())
  with check (bucket_id = 'order-files' and public.is_admin());
