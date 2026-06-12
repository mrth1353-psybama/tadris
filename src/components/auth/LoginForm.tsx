"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { GoogleAuthButton } from "@/components/auth/GoogleAuthButton";

const errorMessages: Record<string, string> = {
  "Invalid login credentials": "ایمیل یا رمز عبور اشتباه است.",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(errorMessages[signInError.message] ?? signInError.message);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <GoogleAuthButton redirectTo={redirectTo} />

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-brand-charcoal/10" />
        <span className="text-xs text-brand-charcoal/50">یا</span>
        <div className="h-px flex-1 bg-brand-charcoal/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            dir="ltr"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
    </div>
  );
}
