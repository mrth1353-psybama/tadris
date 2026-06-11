"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-brand-charcoal/70 transition-colors hover:bg-brand-charcoal/5 hover:text-brand-charcoal"
    >
      <LogOut size={18} />
      خروج از حساب
    </button>
  );
}
