import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { SignupForm } from "@/components/auth/SignupForm";
import { SupabaseNotConfiguredNotice } from "@/components/auth/SupabaseNotConfiguredNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "ثبت‌نام | AI & Data Analysis",
};

export default function SignupPage() {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-brand-charcoal">ساخت حساب کاربری</h1>
      <p className="mt-2 text-sm text-brand-charcoal/70">
        با ساخت حساب کاربری می‌توانید سفارش ثبت کنید و فایل‌های پروژه‌تان را
        آپلود و دانلود کنید.
      </p>

      <div className="mt-6">
        {isSupabaseConfigured ? <SignupForm /> : <SupabaseNotConfiguredNotice />}
      </div>

      <p className="mt-6 text-center text-sm text-brand-charcoal/70">
        قبلاً ثبت‌نام کرده‌اید؟{" "}
        <Link href="/login" className="font-semibold text-brand-teal">
          وارد شوید
        </Link>
      </p>
    </Card>
  );
}
