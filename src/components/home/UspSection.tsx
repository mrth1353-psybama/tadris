import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

const points = [
  "تنها مشاوری که هم مدل‌یابی SEM در روان‌شناسی بلد است، هم هوش مصنوعی را به زبان پژوهشگران توضیح می‌دهد.",
  "تحلیل آماری پایان‌نامه با Amos و Lisrel، همراه با راهنمایی گام‌به‌گام برای دفاع موفق.",
  "از داده‌های خامت تا نتیجه‌گیری علمی — با زبانی که روان‌شناسان می‌فهمند، نه برنامه‌نویسان.",
];

export function UspSection() {
  return (
    <section className="bg-brand-peach py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="چرا من؟"
          title="ترکیب نادر هوش مصنوعی و SEM در روان‌شناسی و مشاوره"
          description="در ایران کمتر کسی تخصص هوش مصنوعی را با مدل‌یابی معادلات ساختاری در حوزه روان‌شناسی همزمان ارائه می‌دهد. این رویکرد، دقیقاً پاسخ به دغدغه پژوهشگرانی‌ست که هم آمار و هم AI را نیاز دارند، اما کسی را پیدا نمی‌کنند که زبان رشته‌شان را هم بفهمد."
        />

        <ul className="space-y-4">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-2xl border border-brand-charcoal/10 bg-brand-cream p-4"
            >
              <CheckCircle2 className="mt-0.5 shrink-0 text-brand-teal" size={20} />
              <p className="text-sm leading-7 text-brand-charcoal/80">{point}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
