import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";
import { SupabaseNotConfiguredNotice } from "@/components/auth/SupabaseNotConfiguredNotice";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "ورود | AI & Data Analysis",
};

export default function LoginPage() {
  return (
    <Card>
      <h1 className="text-2xl font-bold text-brand-charcoal">ورود به حساب کاربری</h1>
      <p className="mt-2 text-sm text-brand-charcoal/70">
        برای مشاهده سفارش‌ها و آپلود فایل‌های پروژه وارد شوید.
      </p>

      <div className="mt-6">
        {isSupabaseConfigured ? (
          <Suspense>
            <LoginForm />
          </Suspense>
        ) : (
          <SupabaseNotConfiguredNotice />
        )}
      </div>

      <p className="mt-6 text-center text-sm text-brand-charcoal/70">
        حساب کاربری ندارید؟{" "}
        <Link href="/signup" className="font-semibold text-brand-teal">
          ثبت‌نام کنید
        </Link>
      </p>
    </Card>
  );
}
