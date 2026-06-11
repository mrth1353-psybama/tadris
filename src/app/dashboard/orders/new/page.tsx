import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { NewOrderForm } from "@/components/dashboard/NewOrderForm";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "ثبت سفارش جدید | DataMind AI",
};

export default async function NewOrderPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, title, category")
    .order("category", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal">ثبت سفارش جدید</h1>
        <p className="mt-1 text-sm text-brand-charcoal/70">
          خدمت موردنظر را انتخاب کنید، توضیحی درباره پروژه‌تان بنویسید و در
          صورت تمایل فایل‌های داده را همین حالا آپلود کنید.
        </p>
      </div>

      <Card>
        <NewOrderForm services={services ?? []} />
      </Card>
    </div>
  );
}
