import { Card } from "@/components/ui/Card";

export function SupabaseNotConfiguredNotice() {
  return (
    <Card className="border-brand-amber/30 bg-brand-amber/5 text-center">
      <p className="text-sm leading-7 text-brand-charcoal/80">
        سیستم ورود و ثبت‌نام هنوز فعال نشده است. برای فعال‌سازی، باید یک
        پروژه Supabase بسازید و مقادیر آن را در فایل{" "}
        <code dir="ltr" className="font-mono text-xs">
          .env.local
        </code>{" "}
        قرار دهید.
      </p>
    </Card>
  );
}
