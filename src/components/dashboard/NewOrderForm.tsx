"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { ServiceCategory } from "@/lib/supabase/types";

type ServiceOption = {
  id: string;
  title: string;
  category: ServiceCategory;
};

const categoryLabels: Record<ServiceCategory, string> = {
  statistical_analysis: "تحلیل آماری و SEM",
  ai_consulting: "مشاوره هوش مصنوعی",
};

export function NewOrderForm({ services }: { services: ServiceOption[] }) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFiles((prev) => [...prev, ...Array.from(event.target.files!)]);
    }
    event.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const formData = new FormData(event.currentTarget);
    const serviceId = String(formData.get("service_id") ?? "");
    const notes = String(formData.get("notes") ?? "");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("ابتدا وارد حساب کاربری خود شوید.");
      setLoading(false);
      return;
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_id: user.id, service_id: serviceId || null, notes: notes || null })
      .select("id")
      .single();

    if (orderError || !order) {
      setError(orderError?.message ?? "خطا در ثبت سفارش.");
      setLoading(false);
      return;
    }

    for (const file of files) {
      const filePath = `${order.id}/input/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("order-files")
        .upload(filePath, file);

      if (uploadError) {
        setError(`خطا در آپلود فایل «${file.name}»: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      await supabase.from("order_files").insert({
        order_id: order.id,
        uploaded_by: user.id,
        file_path: filePath,
        file_name: file.name,
        kind: "input",
      });
    }

    fetch("/api/notifications/new-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    }).catch(() => {
      // اطلاع‌رسانی ایمیلی اختیاری است؛ شکست آن نباید ثبت سفارش را متوقف کند.
    });

    setLoading(false);
    router.push(`/dashboard/orders/${order.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="service_id"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          نوع خدمت
        </label>
        <select
          id="service_id"
          name="service_id"
          required
          defaultValue=""
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        >
          <option value="" disabled>
            انتخاب کنید...
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {categoryLabels[service.category]} — {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          توضیحات پروژه
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="کمی درباره پروژه، داده‌ها و سوالات پژوهش‌تان بنویسید..."
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-brand-charcoal">
          فایل‌های داده (SPSS، Excel، Word و ...)
        </label>
        <label
          htmlFor="files"
          className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-brand-charcoal/20 bg-brand-ivory px-4 py-8 text-center text-sm text-brand-charcoal/70 transition-colors hover:border-brand-teal hover:text-brand-teal"
        >
          <Upload size={24} />
          برای انتخاب فایل کلیک کنید
          <input
            id="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg bg-brand-ivory px-3 py-2 text-sm text-brand-charcoal"
              >
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-brand-charcoal/50 transition-colors hover:text-red-600"
                  aria-label="حذف فایل"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        {loading ? "در حال ثبت..." : "ثبت سفارش"}
      </Button>
    </form>
  );
}
