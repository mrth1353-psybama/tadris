import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// این مسیر برای بیدار نگه‌داشتن پروژه‌ی Supabase (طرح رایگان) با یک کوئری سبک پینگ می‌شود.
export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: true, supabase: "not-configured" });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("services").select("id").limit(1);

  return NextResponse.json({ ok: !error, supabase: "configured" });
}
