import type { Metadata } from "next";
import { CheckCircle2, BrainCircuit, ChartSpline } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { serviceCategories, services, type ServiceCategory } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "خدمات و تعرفه‌ها | AI & Data Analysis",
  description:
    "خدمات تحلیل آماری، مدل‌یابی معادلات ساختاری (SEM) با SPSS/Amos/Lisrel و مشاوره کاربرد هوش مصنوعی در پژوهش، برای دانشجویان، پژوهشگران و اعضای هیئت علمی.",
};

const categoryIcons: Record<ServiceCategory, typeof ChartSpline> = {
  statistical_analysis: ChartSpline,
  ai_consulting: BrainCircuit,
};

const categoryOrder: ServiceCategory[] = ["statistical_analysis", "ai_consulting"];

const tierStyles = [
  {
    card: "!bg-brand-navy/8",
    title: "text-brand-charcoal",
    description: "text-brand-charcoal/70",
    icon: "text-brand-teal",
    feature: "text-brand-charcoal/80",
    button: "",
  },
  {
    card: "!bg-brand-navy/22",
    title: "text-brand-charcoal",
    description: "text-brand-charcoal/70",
    icon: "text-brand-navy",
    feature: "text-brand-charcoal/80",
    button: "",
  },
  {
    card: "!bg-brand-navy",
    title: "text-white",
    description: "text-white/75",
    icon: "text-brand-gold",
    feature: "text-white/85",
    button: "!border-white/30 !text-white hover:!bg-white/10",
  },
];

export default function ServicesPage() {
  return (
    <>
      {categoryOrder.map((categoryKey, index) => {
        const category = serviceCategories[categoryKey];
        const Icon = categoryIcons[categoryKey];
        const items = services.filter((service) => service.category === categoryKey);

        return (
          <section
            key={categoryKey}
            className={
              index === 0
                ? "pt-6 sm:pt-10 pb-16 sm:pb-24"
                : index % 2 === 1
                  ? "bg-brand-peach py-16 sm:py-24"
                  : "py-16 sm:py-24"
            }
          >
            <Container>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-charcoal sm:text-3xl">
                    {category.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-7 text-brand-charcoal/70 sm:text-base">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {items.map((service, i) => {
                  const tier = tierStyles[i];

                  return (
                    <Card key={service.slug} className={`flex flex-col ${tier.card}`}>
                      <h3 className={`text-lg font-bold ${tier.title}`}>
                        {service.title}
                      </h3>
                      <p className={`mt-2 text-sm leading-7 ${tier.description}`}>
                        {service.shortDescription}
                      </p>
                      <ul className="mt-4 flex-1 space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2
                              className={`mt-0.5 shrink-0 ${tier.icon}`}
                              size={16}
                            />
                            <span className={`text-sm leading-7 ${tier.feature}`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <LinkButton
                        href="/contact"
                        variant="outline"
                        className={`mt-6 ${tier.button}`}
                      >
                        درخواست مشاوره
                      </LinkButton>
                    </Card>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-16 sm:py-24">
        <Container>
          <Card className="mx-auto max-w-3xl text-center">
            <h2 className="text-xl font-bold text-brand-charcoal sm:text-2xl">
              تعرفه چطور تعیین می‌شود؟
            </h2>
            <p className="mt-4 text-base leading-8 text-brand-charcoal/70">
              تعرفه هر پروژه بر اساس عواملی مثل تعداد متغیرها و حجم نمونه،
              نوع تحلیل (آمار توصیفی، استنباطی یا مدل‌یابی معادلات ساختاری)
              و زمان موردنیاز شما تعیین می‌شود. در جلسه مشاوره اولیه، که
              رایگان است، پروژه شما را بررسی می‌کنم و یک برآورد شفاف از
              هزینه و زمان ارائه می‌دهم.
            </p>
          </Card>
        </Container>
      </section>

      <CtaBanner
        title="آماده شروع پروژه‌تان هستید؟"
        description="از طریق صفحه تماس، خلاصه‌ای از پروژه و سوالات پژوهش‌تان را برای من بفرستید تا در اولین فرصت پاسخ بدهم."
      />
    </>
  );
}
