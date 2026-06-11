import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";
import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export { isSupabaseConfigured };

export async function createClient() {
  const cookieStore = await cookies();

  // مقادیر جایگزین جلوی خطای ساخت کلاینت را می‌گیرند تا وقتی Supabase
  // متصل نشده، صفحات با لیست/داده خالی رندر شوند نه با کرش کامل.
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // در Server Component فراخوانی می‌شود؛ proxy.ts نشست را تازه نگه می‌دارد.
          }
        },
      },
    },
  );
}

// تا زمانی که Supabase متصل نشده، کاربر وارد‌نشده در نظر گرفته می‌شود.
export async function getCurrentUser(): Promise<User | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
