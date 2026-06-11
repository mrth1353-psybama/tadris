import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ClipboardList, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { OrderStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "داشبورد | DataMind AI",
};

type OrderRow = {
  id: string;
  status: OrderStatus;
  notes: string | null;
  price: number | null;
  created_at: string;
  services: { title: string; slug: string } | null;
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, status, notes, price, created_at, services(title, slug)")
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">سفارش‌های من</h1>
          <p className="mt-1 text-sm text-brand-charcoal/70">
            وضعیت سفارش‌ها و فایل‌های پروژه‌تان را اینجا پیگیری کنید.
          </p>
        </div>
        <LinkButton href="/dashboard/orders/new" className="gap-2">
          <PlusCircle size={18} />
          ثبت سفارش جدید
        </LinkButton>
      </div>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-base font-bold text-brand-charcoal">
                      {order.services?.title ?? "خدمت نامشخص"}
                    </h2>
                    <p className="mt-1 text-xs text-brand-charcoal/60">
                      ثبت‌شده در{" "}
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
            <ClipboardList size={24} />
          </div>
          <h2 className="text-base font-bold text-brand-charcoal">
            هنوز سفارشی ثبت نکرده‌اید
          </h2>
          <p className="max-w-sm text-sm leading-7 text-brand-charcoal/70">
            با ثبت سفارش جدید، خدمت موردنظر را انتخاب کنید و فایل داده‌های
            خود را آپلود کنید تا بررسی آن آغاز شود.
          </p>
          <LinkButton href="/dashboard/orders/new" className="mt-2 gap-2">
            <PlusCircle size={18} />
            ثبت سفارش جدید
          </LinkButton>
        </Card>
      )}
    </div>
  );
}
