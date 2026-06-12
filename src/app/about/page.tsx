import type { Metadata } from "next";
import {
  BarChart3,
  BrainCircuit,
  GraduationCap,
  LineChart,
  Sigma,
  SquareStack,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CtaBanner } from "@/components/shared/CtaBanner";

export const metadata: Metadata = {
  title: "درباره من | DataMind AI",
  description:
    "آشنایی با محمدرضا تدریس حسنی، آماری‌شناس و مشاور هوش مصنوعی متخصص تحلیل داده و مدل‌یابی معادلات ساختاری (SEM) برای پژوهش‌های روان‌شناسی، مشاوره و علوم تربیتی.",
};

const software = ["SPSS", "Amos", "Lisrel", "SmartPLS"];

const expertiseAreas = [
  {
    icon: Sigma,
    title: "آمار توصیفی و استنباطی",
    description:
      "تحلیل‌های پایه و پیشرفته آماری متناسب با فرضیه‌ها و سوالات پژوهش، از آزمون‌های t و تحلیل واریانس تا رگرسیون.",
  },
  {
    icon: SquareStack,
    title: "مدل‌یابی معادلات ساختاری (SEM)",
    description:
      "طراحی، برازش و اصلاح مدل‌های اندازه‌گیری و ساختاری با Amos و Lisrel، همراه با تفسیر شاخص‌های برازش.",
  },
  {
    icon: LineChart,
    title: "تحلیل داده پایان‌نامه و مقاله",
    description:
      "همراهی از فصل سوم تا فصل چهارم؛ از طراحی پرسش‌نامه و روایی/پایایی تا گزارش نهایی یافته‌ها.",
  },
  {
    icon: BrainCircuit,
    title: "کاربرد هوش مصنوعی در پژوهش",
    description:
      "استفاده معتبر و قابل دفاع از ابزارهای AI در مرور ادبیات، سازمان‌دهی منابع و نگارش علمی.",
  },
];

const approachSteps = [
  {
    step: "۰۱",
    title: "گفتگوی اولیه و شناخت پروژه",
    description:
      "بررسی سوالات و فرضیه‌های پژوهش، نوع داده‌ها و هدف نهایی شما در یک جلسه مشاوره رایگان.",
  },
  {
    step: "۰۲",
    title: "تحلیل داده",
    description:
      "اجرای تحلیل‌های مناسب با SPSS، Amos یا Lisrel متناسب با طرح پژوهش و سطح سنجش متغیرها.",
  },
  {
    step: "۰۳",
    title: "تفسیر و گزارش‌نویسی",
    description:
      "تبدیل خروجی‌های آماری به گزارشی روشن و قابل دفاع، به زبانی که برای رشته شما آشناست.",
  },
  {
    step: "۰۴",
    title: "همراهی تا جلسه دفاع",
    description:
      "پاسخ به سوالات شما درباره نتایج و آماده‌سازی برای توضیح یافته‌ها در جلسه دفاع یا داوری مقاله.",
  },
];

const credentials = [
  {
    title: "تحصیلات تکمیلی در آمار",
    description:
      "تحصیل در مقطع تحصیلات تکمیلی با گرایش آمار، با تمرکز بر روش‌های چندمتغیره و مدل‌یابی معادلات ساختاری.",
  },
  {
    title: "سال‌ها همکاری پژوهشی",
    description:
      "همکاری در تحلیل آماری ده‌ها پایان‌نامه و مقاله در حوزه‌های روان‌شناسی، مشاوره و علوم تربیتی.",
  },
  {
    title: "آموزش و کارگاه",
    description:
      "برگزاری دوره‌ها و کارگاه‌های آموزشی SPSS، Amos و Lisrel برای دانشجویان و اعضای هیئت علمی.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center lg:mx-0 lg:items-start lg:text-start">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
              <BarChart3 size={72} strokeWidth={1.5} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-brand-charcoal sm:text-4xl">
              محمدرضا تدریس حسنی
            </h1>
            <p className="mt-2 text-lg font-semibold text-brand-navy">
              تحلیل‌گر داده‌های آماری و مشاور هوش مصنوعی
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {software.map((item) => (
                <Badge key={item} tone="navy">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-5 text-base leading-8 text-brand-charcoal/80">
            <p>
              من به‌صورت تخصصی در حوزه تحلیل داده‌های آماری برای رشته‌های
              روان‌شناسی بالینی و عمومی، مشاوره و علوم تربیتی فعالیت می‌کنم.
              سال‌هاست در کنار دانشجویان تحصیلات تکمیلی، پژوهشگران و اعضای
              هیئت علمی بوده‌ام تا داده‌های پژوهش‌شان را به یافته‌هایی روشن و
              قابل دفاع تبدیل کنند.
            </p>
            <p>
              با نرم‌افزارهای آماری <strong>SPSS</strong>،{" "}
              <strong>Amos</strong> و <strong>Lisrel</strong> به‌صورت تخصصی
              کار می‌کنم و تمرکز اصلی من بر{" "}
              <strong>مدل‌یابی معادلات ساختاری (SEM)</strong> است؛ از طراحی
              مدل اندازه‌گیری و ساختاری گرفته تا بررسی شاخص‌های برازش و
              اصلاح مدل.
            </p>
            <p>
              در کنار آمار، به‌طور جدی به کاربرد هوش مصنوعی در پژوهش‌های علوم
              انسانی پرداخته‌ام. هدف من کمک به پژوهشگرانی است که می‌خواهند هم
              از آمار درست و هم از ابزارهای هوشمند، به شکلی معتبر و اخلاقی در
              کار علمی‌شان استفاده کنند.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-peach py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="حوزه‌های تخصصی"
            title="در چه زمینه‌هایی می‌توانم کمک کنم؟"
            description="تمرکز اصلی من روی تحلیل آماری دقیق و قابل دفاع، در کنار استفاده هوشمندانه از هوش مصنوعی در مسیر پژوهش است."
            align="center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertiseAreas.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Icon size={24} />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-charcoal/70">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="روند همکاری"
            title="همکاری ما چطور پیش می‌رود؟"
            description="یک مسیر شفاف از شروع تا دفاع از پایان‌نامه یا چاپ مقاله."
            align="center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map(({ step, title, description }) => (
              <Card key={step}>
                <span className="font-mono text-2xl font-bold text-brand-amber">
                  {step}
                </span>
                <h3 className="mt-3 text-base font-bold text-brand-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-brand-charcoal/70">
                  {description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-sand py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="سوابق"
            title="تحصیلات و تجربه"
            align="center"
          />

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
            {credentials.map(({ title, description }) => (
              <Card key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-charcoal">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-7 text-brand-charcoal/70">
                    {description}
                  </p>
                </div>
              </Card>
            ))}
            <Card className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-amber/15 text-brand-amber">
                <Workflow size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-charcoal">
                  رویکرد کاری
                </h3>
                <p className="mt-1 text-sm leading-7 text-brand-charcoal/70">
                  هر پروژه را متناسب با طرح پژوهشی و نیاز همان دانشجو یا
                  پژوهشگر پیش می‌برم؛ نه یک قالب ثابت برای همه.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
