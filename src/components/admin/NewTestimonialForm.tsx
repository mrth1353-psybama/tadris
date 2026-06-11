"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function NewTestimonialForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const roleLabel = String(formData.get("role_label") ?? "");
    const content = String(formData.get("content") ?? "");
    const isFeatured = formData.get("is_featured") === "on";

    const supabase = createClient();
    const { error: insertError } = await supabase.from("testimonials").insert({
      name,
      role_label: roleLabel || null,
      content,
      is_featured: isFeatured,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    (event.target as HTMLFormElement).reset();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            نام
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label
            htmlFor="role_label"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            عنوان/جایگاه
          </label>
          <input
            id="role_label"
            name="role_label"
            type="text"
            placeholder="مثلاً دانشجوی کارشناسی ارشد روان‌شناسی"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          متن نظر
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          required
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-charcoal">
        <input type="checkbox" name="is_featured" className="h-4 w-4 rounded border-brand-charcoal/30" />
        نمایش در صفحه نمونه‌کار
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "در حال ثبت..." : "افزودن نظر"}
      </Button>
    </form>
  );
}
