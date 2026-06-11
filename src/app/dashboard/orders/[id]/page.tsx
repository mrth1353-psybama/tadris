import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { AddFilesForm } from "@/components/dashboard/AddFilesForm";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { OrderFileKind, OrderStatus } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "جزئیات سفارش | DataMind AI",
};

type OrderDetail = {
  id: string;
  status: OrderStatus;
  notes: string | null;
  price: number | null;
  created_at: string;
  services: { title: string; category: string } | null;
};

type OrderFileRow = {
  id: string;
  file_name: string;
  file_path: string;
  kind: OrderFileKind;
  created_at: string;
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, status, notes, price, created_at, services(title, category)")
    .eq("id", id)
    .single<OrderDetail>();

  if (!order) {
    notFound();
  }

  const { data: files } = await supabase
    .from("order_files")
    .select("id, file_name, file_path, kind, created_at")
    .eq("order_id", id)
    .order("created_at", { ascending: false })
    .returns<OrderFileRow[]>();

  const filesWithUrls = await Promise.all(
    (files ?? []).map(async (file) => {
      const { data } = await supabase.storage
        .from("order-files")
        .createSignedUrl(file.file_path, 60 * 60);

      return { ...file, url: data?.signedUrl ?? null };
    }),
  );

  const inputFiles = filesWithUrls.filter((file) => file.kind === "input");
  const deliverableFiles = filesWithUrls.filter((file) => file.kind === "deliverable");

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal"
      >
        <ArrowRight size={16} />
        بازگشت به سفارش‌ها
      </Link>

      <Card className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-brand-charcoal">
              {order.services?.title ?? "خدمت نامشخص"}
            </h1>
            <p className="mt-1 text-xs text-brand-charcoal/60">
              ثبت‌شده در {new Date(order.created_at).toLocaleDateString("fa-IR")}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        {order.notes && (
          <div>
            <h2 className="text-sm font-bold text-brand-charcoal">توضیحات شما</h2>
            <p className="mt-1 whitespace-pre-line text-sm leading-7 text-brand-charcoal/70">
              {order.notes}
            </p>
          </div>
        )}

        {order.price != null && (
          <div>
            <h2 className="text-sm font-bold text-brand-charcoal">هزینه</h2>
            <p className="mt-1 text-sm text-brand-charcoal/70">
              {order.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="text-base font-bold text-brand-charcoal">
          فایل‌های گزارش نهایی
        </h2>
        {deliverableFiles.length > 0 ? (
          <ul className="space-y-2">
            {deliverableFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-brand-ivory px-3 py-3 text-sm text-brand-charcoal"
              >
                <span className="flex items-center gap-2 truncate">
                  <FileText size={16} className="shrink-0 text-brand-teal" />
                  <span className="truncate">{file.file_name}</span>
                </span>
                {file.url && (
                  <a
                    href={file.url}
                    download={file.file_name}
                    className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-teal"
                  >
                    <Download size={14} />
                    دانلود
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-7 text-brand-charcoal/70">
            گزارش نهایی هنوز آماده نشده است. پس از آماده‌شدن، اینجا برای
            دانلود در دسترس قرار می‌گیرد.
          </p>
        )}
      </Card>

      <Card className="space-y-4">
        <h2 className="text-base font-bold text-brand-charcoal">فایل‌های شما</h2>

        {inputFiles.length > 0 ? (
          <ul className="space-y-2">
            {inputFiles.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-brand-ivory px-3 py-3 text-sm text-brand-charcoal"
              >
                <span className="flex items-center gap-2 truncate">
                  <FileText size={16} className="shrink-0 text-brand-charcoal/50" />
                  <span className="truncate">{file.file_name}</span>
                </span>
                {file.url && (
                  <a
                    href={file.url}
                    download={file.file_name}
                    className="flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-teal"
                  >
                    <Download size={14} />
                    دانلود
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-7 text-brand-charcoal/70">
            هنوز فایلی برای این سفارش آپلود نکرده‌اید.
          </p>
        )}

        <AddFilesForm orderId={order.id} />
      </Card>
    </div>
  );
}
