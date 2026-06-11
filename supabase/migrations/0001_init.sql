-- DataMind AI - Initial schema
-- Tables: profiles, services, orders, order_files, testimonials
-- Storage: order-files (private bucket)

-- ============================================================
-- profiles
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_admin_select_all"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Auto-create a profile row whenever a new auth user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- services
-- ============================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null check (category in ('statistical_analysis', 'ai_consulting')),
  description text,
  price_from numeric,
  price_to numeric,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "services_select_all"
  on public.services for select
  using (true);

create policy "services_admin_write"
  on public.services for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

insert into public.services (slug, title, category, description, features) values
  ('thesis-statistical-analysis', 'تحلیل آماری پایان‌نامه و مقاله', 'statistical_analysis',
    'آمار توصیفی و استنباطی با SPSS، همراه با گزارش کامل و تفسیر نتایج برای فصل چهارم.',
    '["تحلیل داده با SPSS متناسب با فرضیه‌ها و سوالات پژوهش", "گزارش خروجی‌ها همراه با تفسیر علمی و قابل دفاع", "راهنمایی برای نگارش بخش یافته‌ها"]'),
  ('sem-modeling', 'مدل‌یابی معادلات ساختاری (SEM)', 'statistical_analysis',
    'طراحی، برازش و تفسیر مدل SEM با Amos یا Lisrel — همراه با راهنمای گام‌به‌گام برای دفاع.',
    '["طراحی مدل اندازه‌گیری و ساختاری متناسب با چارچوب نظری", "بررسی شاخص‌های برازش (CFI، RMSEA و...) و اصلاح مدل", "تفسیر خروجی به زبان ساده و آماده‌سازی برای جلسه دفاع"]'),
  ('software-coaching', 'آموزش خصوصی SPSS / Amos / Lisrel', 'statistical_analysis',
    'جلسات یک‌به‌یک برای یادگیری کاربردی نرم‌افزارهای آماری، متناسب با پروژه شما.',
    '["آموزش گام‌به‌گام بر اساس داده‌های واقعی پروژه شما", "رفع گیر‌های رایج (خطاهای مدل، عدم برازش و...)", "مناسب برای دانشجویانی که می‌خواهند خودشان تحلیل را انجام دهند"]'),
  ('ai-research-consulting', 'مشاوره استفاده از AI در پژوهش', 'ai_consulting',
    'به‌کارگیری معتبر و قابل دفاع هوش مصنوعی در مرور ادبیات، نگارش و تحلیل پژوهش.',
    '["راهنمایی برای استفاده اخلاقی و معتبر از AI در پژوهش علمی", "کمک به مرور ادبیات و سازمان‌دهی منابع با ابزارهای AI", "بازبینی و ویرایش محتوای تولیدشده با AI"]'),
  ('ai-workshop', 'ورکشاپ کاربرد AI برای پژوهشگران', 'ai_consulting',
    'کارگاه آموزشی برای دانشجویان و اعضای هیئت علمی روان‌شناسی و علوم تربیتی.',
    '["آشنایی با ابزارهای کاربردی AI در پژوهش‌های علوم انسانی", "تمرین عملی روی پروژه‌های واقعی شرکت‌کنندگان", "قابل برگزاری به صورت آنلاین برای گروه‌ها و دانشگاه‌ها"]'),
  ('ai-strategy', 'مشاوره و پیاده‌سازی AI برای کسب‌وکار', 'ai_consulting',
    'استراتژی و پیاده‌سازی هوش مصنوعی برای افراد و سازمان‌ها.',
    '["بررسی نیازها و فرصت‌های استفاده از AI در فرآیندها", "پیشنهاد ابزارها و راهکارهای متناسب", "همراهی در مراحل اولیه پیاده‌سازی"]');

-- ============================================================
-- orders
-- ============================================================
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  service_id uuid references public.services (id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'awaiting_payment', 'in_progress', 'completed', 'cancelled')),
  notes text,
  price numeric,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "orders_admin_all"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ============================================================
-- order_files
-- ============================================================
create table public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  uploaded_by uuid not null references auth.users (id) on delete cascade,
  file_path text not null,
  file_name text not null,
  kind text not null check (kind in ('input', 'deliverable')),
  created_at timestamptz not null default now()
);

alter table public.order_files enable row level security;

create policy "order_files_select_own"
  on public.order_files for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_files.order_id and o.user_id = auth.uid()
    )
  );

create policy "order_files_insert_own"
  on public.order_files for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_files.order_id and o.user_id = auth.uid()
    )
    and kind = 'input'
    and uploaded_by = auth.uid()
  );

create policy "order_files_admin_all"
  on public.order_files for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ============================================================
-- testimonials
-- ============================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_label text,
  content text not null,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "testimonials_select_featured"
  on public.testimonials for select
  using (is_featured = true);

create policy "testimonials_admin_all"
  on public.testimonials for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ============================================================
-- storage: order-files (private bucket)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('order-files', 'order-files', false)
on conflict (id) do nothing;

-- Path convention: {order_id}/{kind}/{file_name}
-- Users can read/write files only within orders that belong to them.
create policy "order_files_storage_select_own"
  on storage.objects for select
  using (
    bucket_id = 'order-files'
    and exists (
      select 1 from public.orders o
      where o.id::text = (storage.foldername(name))[1]
        and o.user_id = auth.uid()
    )
  );

create policy "order_files_storage_insert_own"
  on storage.objects for insert
  with check (
    bucket_id = 'order-files'
    and exists (
      select 1 from public.orders o
      where o.id::text = (storage.foldername(name))[1]
        and o.user_id = auth.uid()
    )
  );

create policy "order_files_storage_admin_all"
  on storage.objects for all
  using (
    bucket_id = 'order-files'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    bucket_id = 'order-files'
    and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
