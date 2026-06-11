import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "مدیریت سفارش‌ها | پنل ادمین",
};

type OrderRow = {
  id: string;
  user_id: string;
  status: OrderStatus;
  created_at: string;
  services: { title: string } | null;
};

export default async function AdminOrdersPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("id, user_id, status, created_at, services(title)")
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  const userIds = [...new Set((orders ?? []).map((order) => order.user_id))];
  const { data: profiles } = userIds.length
    ? await supabase.from("profiles").select("id, full_name").in("id", userIds)
    : { data: [] as { id: string; full_name: string | null }[] };

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p.full_name]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal">مدیریت سفارش‌ها</h1>
        <p className="mt-1 text-sm text-brand-charcoal/70">
          وضعیت سفارش‌ها را تغییر دهید و فایل‌های گزارش نهایی را آپلود کنید.
        </p>
      </div>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/admin/orders/${order.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-brand-charcoal">
                      {order.services?.title ?? "خدمت نامشخص"}
                    </h2>
                    <p className="mt-1 text-xs text-brand-charcoal/60">
                      {profileMap.get(order.user_id) || "کاربر"} ·{" "}
                      {new Date(order.created_at).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
            <ClipboardList size={24} />
          </div>
          <p className="text-sm leading-7 text-brand-charcoal/70">
            هنوز سفارشی ثبت نشده است.
          </p>
        </Card>
      )}
    </div>
  );
}
