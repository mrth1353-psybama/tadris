import { NextResponse } from "next/server";
import { notifyContactMessage } from "@/lib/email";

export async function POST(request: Request) {
  const { name, phone, topic, message } = await request.json();

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "نام، شماره تلفن و پیام الزامی هستند." },
      { status: 400 },
    );
  }

  await notifyContactMessage({
    name: String(name),
    phone: String(phone),
    topic: String(topic ?? "سایر موارد"),
    message: String(message),
  });

  return NextResponse.json({ ok: true });
}
