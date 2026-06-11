import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyNewOrder } from "@/lib/email";

type OrderWithService = {
  id: string;
  notes: string | null;
  user_id: string;
  services: { title: string } | null;
};

export async function POST(request: Request) {
  const { orderId } = await request.json();

  if (!orderId) {
    return NextResponse.json({ error: "orderId الزامی است." }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: order } = await supabase
    .from("orders")
    .select("id, notes, user_id, services(title)")
    .eq("id", orderId)
    .single<OrderWithService>();

  if (!order) {
    return NextResponse.json({ error: "سفارش یافت نشد." }, { status: 404 });
  }

  const [{ data: profile }, { data: authUser }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", order.user_id).single(),
    supabase.auth.admin.getUserById(order.user_id),
  ]);

  await notifyNewOrder({
    serviceName: order.services?.title ?? "نامشخص",
    customerName: profile?.full_name || authUser?.user?.email || "کاربر",
    customerEmail: authUser?.user?.email ?? "",
    notes: order.notes,
    orderId: order.id,
  });

  return NextResponse.json({ ok: true });
}
