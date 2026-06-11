import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { NewTestimonialForm } from "@/components/admin/NewTestimonialForm";
import { TestimonialActions } from "@/components/admin/TestimonialActions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "مدیریت نظرات | پنل ادمین",
};

type TestimonialRow = {
  id: string;
  name: string;
  role_label: string | null;
  content: string;
  is_featured: boolean;
};

export default async function AdminTestimonialsPage() {
  if (!isSupabaseConfigured) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id, name, role_label, content, is_featured")
    .order("created_at", { ascending: false })
    .returns<TestimonialRow[]>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal">مدیریت نظرات مشتریان</h1>
        <p className="mt-1 text-sm text-brand-charcoal/70">
          نظرات تایید‌شده در صفحه نمونه‌کار به نمایش گذاشته می‌شوند.
        </p>
      </div>

      <Card>
        <h2 className="mb-4 text-base font-bold text-brand-charcoal">افزودن نظر جدید</h2>
        <NewTestimonialForm />
      </Card>

      {testimonials && testimonials.length > 0 ? (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-brand-charcoal">
                      {testimonial.name}
                    </h3>
                    {testimonial.role_label && (
                      <span className="text-xs text-brand-charcoal/60">
                        {testimonial.role_label}
                      </span>
                    )}
                    {testimonial.is_featured && <Badge tone="teal">نمایش داده می‌شود</Badge>}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-brand-charcoal/70">
                    {testimonial.content}
                  </p>
                </div>
                <TestimonialActions
                  id={testimonial.id}
                  isFeatured={testimonial.is_featured}
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
            <MessageSquareQuote size={24} />
          </div>
          <p className="text-sm leading-7 text-brand-charcoal/70">
            هنوز نظری ثبت نشده است.
          </p>
        </Card>
      )}
    </div>
  );
}
