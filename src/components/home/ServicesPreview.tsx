import { ArrowLeft, BrainCircuit, ChartSpline } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/lib/services-data";

const icons = {
  statistical_analysis: ChartSpline,
  ai_consulting: BrainCircuit,
};

const styles = {
  statistical_analysis: {
    card: "!bg-brand-navy/10",
    icon: "bg-brand-navy/15 text-brand-navy",
    title: "text-brand-charcoal",
    description: "text-brand-charcoal/70",
    link: "text-brand-navy hover:text-brand-navy/80",
  },
  ai_consulting: {
    card: "!bg-brand-navy",
    icon: "bg-white/10 text-white",
    title: "text-white",
    description: "text-white/75",
    link: "text-brand-gold hover:text-brand-gold/80",
  },
};

export function ServicesPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="خدمات"
          title="دو تخصص در یک قاب"
          description="ترکیب مدل‌یابی معادلات ساختاری در روان‌شناسی و مشاوره هوش مصنوعی در پژوهش."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {(
            Object.entries(serviceCategories) as [
              keyof typeof serviceCategories,
              (typeof serviceCategories)[keyof typeof serviceCategories],
            ][]
          ).map(([key, category]) => {
            const Icon = icons[key];
            const style = styles[key];
            return (
              <Card key={key} className={`flex flex-col ${style.card}`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}>
                  <Icon size={24} />
                </div>
                <h3 className={`mt-4 text-xl font-bold ${style.title}`}>
                  {category.title}
                </h3>
                <p className={`mt-2 flex-1 text-sm leading-7 ${style.description}`}>
                  {category.description}
                </p>
                <Link
                  href="/services"
                  className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${style.link}`}
                >
                  مشاهده پکیج‌ها
                  <ArrowLeft size={16} />
                </Link>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
