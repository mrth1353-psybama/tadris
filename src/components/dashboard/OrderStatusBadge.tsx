import { Badge } from "@/components/ui/Badge";
import type { OrderStatus } from "@/lib/supabase/types";

const statusConfig: Record<OrderStatus, { label: string; tone: "teal" | "navy" | "amber" | "gray" }> = {
  pending: { label: "در انتظار بررسی", tone: "gray" },
  awaiting_payment: { label: "در انتظار پرداخت", tone: "amber" },
  in_progress: { label: "در حال انجام", tone: "navy" },
  completed: { label: "تکمیل‌شده", tone: "teal" },
  cancelled: { label: "لغوشده", tone: "gray" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}
