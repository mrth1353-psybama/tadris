"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { OrderStatus } from "@/lib/supabase/types";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "awaiting_payment", label: "در انتظار پرداخت" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "completed", label: "تکمیل‌شده" },
  { value: "cancelled", label: "لغوشده" },
];

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const newStatus = event.target.value as OrderStatus;
    setLoading(true);

    const supabase = createClient();
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);

    setLoading(false);
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={loading}
      className="rounded-xl border border-brand-charcoal/15 bg-white px-4 py-2 text-sm font-semibold text-brand-charcoal outline-none focus:border-brand-teal disabled:opacity-60"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
