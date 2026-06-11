import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { TypewriterTitle } from "@/components/home/TypewriterTitle";
import { siteConfig } from "@/lib/site-config";

const tools = ["SPSS", "Amos", "Lisrel", "SEM"];

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-brand-charcoal/10 bg-gradient-to-b from-white to-brand-ivory">
      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <Badge tone="teal">مشاور هوش مصنوعی و تحلیلگر آماری</Badge>

          <TypewriterTitle
            text={siteConfig.tagline}
            className="mt-6 text-4xl font-bold leading-tight text-brand-charcoal sm:text-5xl"
          />

          <p className="animate-fade-loop mt-4 text-xl font-semibold text-brand-navy">
            {siteConfig.subTagline}
          </p>

          <p className="mt-6 max-w-xl text-base leading-8 text-brand-charcoal/70">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/contact">اولین جلسه رایگان</LinkButton>
            <LinkButton href="/services" variant="outline">
              مشاهده خدمات
            </LinkButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-sm text-brand-charcoal/60">
              تخصص نرم‌افزاری:
            </span>
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md bg-white px-3 py-1 font-mono text-sm text-brand-charcoal shadow-sm ring-1 ring-brand-charcoal/10"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-brand-charcoal/10 bg-white p-8 shadow-lg">
            <p className="font-mono text-sm text-brand-gray">model fit</p>
            <p className="mt-2 font-mono text-lg text-brand-teal">
              CFI = 0.96 · RMSEA = 0.048
            </p>
            <div className="mt-6 space-y-3">
              <div className="h-3 w-full rounded-full bg-brand-ivory">
                <div className="h-3 w-[92%] rounded-full bg-brand-teal" />
              </div>
              <div className="h-3 w-full rounded-full bg-brand-ivory">
                <div className="h-3 w-[78%] rounded-full bg-brand-navy" />
              </div>
              <div className="h-3 w-full rounded-full bg-brand-ivory">
                <div className="h-3 w-[65%] rounded-full bg-brand-amber" />
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-brand-charcoal/70">
              «بذارید با یه مثال ساده توضیح بدم چرا این مدل بهتر کار می‌کنه.»
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
