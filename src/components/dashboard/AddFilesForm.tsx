"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function AddFilesForm({ orderId }: { orderId: string }) {
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
    if (files.length === 0) return;

    setError(null);
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("ابتدا وارد حساب کاربری خود شوید.");
      setLoading(false);
      return;
    }

    for (const file of files) {
      const filePath = `${orderId}/input/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("order-files")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        setError(`خطا در آپلود فایل «${file.name}»: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      await supabase.from("order_files").insert({
        order_id: orderId,
        uploaded_by: user.id,
        file_path: filePath,
        file_name: file.name,
        kind: "input",
      });
    }

    setFiles([]);
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label
        htmlFor="extra-files"
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-brand-charcoal/20 bg-brand-ivory px-4 py-6 text-center text-sm text-brand-charcoal/70 transition-colors hover:border-brand-teal hover:text-brand-teal"
      >
        <Upload size={20} />
        برای انتخاب فایل کلیک کنید
        <input
          id="extra-files"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <ul className="space-y-2">
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      {files.length > 0 && (
        <Button type="submit" disabled={loading} variant="outline">
          {loading ? "در حال آپلود..." : "آپلود فایل‌ها"}
        </Button>
      )}
    </form>
  );
}
