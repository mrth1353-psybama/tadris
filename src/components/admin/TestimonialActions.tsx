"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function TestimonialActions({
  id,
  isFeatured,
}: {
  id: string;
  isFeatured: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleFeatured() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from("testimonials").update({ is_featured: !isFeatured }).eq("id", id);
    setLoading(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("این نظر حذف شود؟")) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from("testimonials").delete().eq("id", id);
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleFeatured}
        disabled={loading}
        title={isFeatured ? "پنهان کردن از نمونه‌کار" : "نمایش در نمونه‌کار"}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-charcoal/15 text-brand-charcoal/70 transition-colors hover:bg-brand-charcoal/5 disabled:opacity-60"
      >
        {isFeatured ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        title="حذف"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-charcoal/15 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
