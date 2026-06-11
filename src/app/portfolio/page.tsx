import type { Metadata } from "next";
import { Award, MessageSquareQuote, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "نمونه‌کار و نظرات | DataMind AI",
  description:
    "نمونه‌ای از پروژه‌های تحلیل آماری و SEM، گواهینامه‌ها و نظرات دانشجویان و پژوهشگرانی که با DataMind AI همکاری کرده‌اند.",
};

type SampleProject = {
  title: string;
  description: string;
  tags: string[];
};

const sampleProjects: SampleProject[] = [
  {
    title: "تحلیل SEM پایان‌نامه ارشد روان‌شناسی تربیتی",
    description:
      "بررسی رابطه خودکارآمدی، انگیزش تحصیلی و عملکرد تحصیلی دانش‌آموزان با مدل‌یابی معادلات ساختاری در Amos.",
    tags: ["Amos", "SEM"],
  },
  {
    title: "تحلیل آماری مقاله در حوزه مشاوره خانواده",
    description:
      "تحلیل رگرسیون چندگانه و تحلیل واریانس برای بررسی اثر یک مداخله مشاوره‌ای بر سازگاری زناشویی با SPSS.",
    tags: ["SPSS", "رگرسیون"],
  },
  {
    title: "تحلیل عاملی تأییدی پرسش‌نامه پژوهشی",
    description:
      "بررسی روایی سازه یک پرسش‌نامه پژوهشی با تحلیل عاملی تأییدی (CFA) در Lisrel.",
    tags: ["Lisrel", "CFA"],
  },
  {
    title: "کارگاه کاربرد هوش مصنوعی در پژوهش",
    description:
      "برگزاری کارگاه آنلاین کاربرد ابزارهای هوش مصنوعی در مرور ادبیات و نگارش علمی برای یک گروه دانشگاهی.",
    tags: ["AI", "ورکشاپ"],
  },
];

type Certificate = {
  title: string;
  issuer: string;
};

const certificates: Certificate[] = [];

type Testimonial = {
  name: string;
  roleLabel: string | null;
  content: string;
};

async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("name, role_label, content")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((item) => ({
    name: item.name,
    roleLabel: item.role_label,
    content: item.content,
  }));
}

export default async function PortfolioPage() {
  const testimonials = await getFeaturedTestimonials();

  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="نمونه‌کار"
            title="نمونه‌ای از پروژه‌های انجام‌شده"
            description="به دلیل رعایت محرمانگی اطلاعات پژوهشی دانشجویان و پژوهشگران، در اینجا نوع و روش پروژه‌ها بدون ذکر اطلاعات هویتی آورده شده است."
            align="center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sampleProjects.map((project) => (
              <Card key={project.title} className="flex flex-col">
                <h3 className="text-base font-bold text-brand-charcoal">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-brand-charcoal/70">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} tone="navy">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="گواهینامه‌ها"
            title="مدارک و گواهینامه‌های تخصصی"
            align="center"
          />

          {certificates.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <Card key={certificate.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-amber/15 text-brand-amber">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-brand-charcoal">
                      {certificate.title}
                    </h3>
                    <p className="mt-1 text-sm text-brand-charcoal/70">
                      {certificate.issuer}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-amber/15 text-brand-amber">
                <Award size={24} />
              </div>
              <p className="text-sm leading-7 text-brand-charcoal/70">
                گواهینامه‌ها و مدارک تخصصی به‌زودی در این بخش قرار می‌گیرند.
              </p>
            </Card>
          )}
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="نظرات"
            title="نظرات دانشجویان و پژوهشگران"
            align="center"
          />

          {testimonials.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <MessageSquareQuote className="text-brand-teal" size={24} />
                  <p className="mt-3 text-sm leading-7 text-brand-charcoal/80">
                    {testimonial.content}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-bold text-brand-charcoal">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-brand-charcoal/60">
                      {testimonial.roleLabel}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
                <Sparkles size={24} />
              </div>
              <p className="text-sm leading-7 text-brand-charcoal/70">
                هنوز نظری ثبت نشده است. به‌زودی نظرات دانشجویان و پژوهشگرانی
                که با DataMind AI همکاری کرده‌اند، در این بخش نمایش داده
                می‌شود.
              </p>
            </Card>
          )}
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
