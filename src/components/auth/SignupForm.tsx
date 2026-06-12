"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

const errorMessages: Record<string, string> = {
  "User already registered": "این ایمیل قبلاً ثبت‌نام کرده است.",
  "Password should be at least 6 characters":
    "رمز عبور باید حداقل ۶ کاراکتر باشد.",
};

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("full_name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(errorMessages[signUpError.message] ?? signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <p className="rounded-xl bg-brand-teal/10 p-4 text-sm leading-7 text-brand-charcoal">
        ثبت‌نام شما انجام شد. لطفاً ایمیل خود را برای تایید حساب کاربری بررسی
        کنید.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <GoogleAuthButton redirectTo="/dashboard" />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-brand-charcoal/10" />
        <span className="text-xs text-brand-charcoal/50">یا</span>
        <div className="h-px flex-1 bg-brand-charcoal/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="full_name"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            رمز عبور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            dir="ltr"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </Button>
      </form>
    </div>
  );
}
