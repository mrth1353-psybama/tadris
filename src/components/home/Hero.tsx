import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { TypewriterTitle } from "@/components/home/TypewriterTitle";
import { AnimatedChartsShowcase } from "@/components/home/AnimatedChartsShowcase";
import { siteConfig } from "@/lib/site-config";

const tools = [
  { name: "SPSS", gradient: "from-brand-amber to-brand-teal" },
  { name: "Amos", gradient: "from-brand-coral to-brand-navy" },
  { name: "Lisrel", gradient: "from-brand-gold to-brand-navy" },
  { name: "SEM", gradient: "from-brand-rust to-brand-teal" },
];

export function Hero() {
  return (
    <section className="overflow-hidden border-b border-brand-charcoal/10 bg-gradient-to-b from-brand-cream to-brand-peach">
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
              تخصص نرم‌افزاری من:
            </span>
            {tools.map((tool) => (
              <span
                key={tool.name}
                className={`rounded-md bg-gradient-to-br ${tool.gradient} px-3 py-1 font-mono text-sm text-white shadow-sm`}
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatedChartsShowcase />
        </div>
      </Container>
    </section>
  );
}
