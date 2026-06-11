import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "اولین جلسه مشاوره رایگان است",
  description = "اگر الان توی پایان‌نامه، مقاله یا پروژه‌ای گیر کرده‌اید، یک پیام بدهید — با هم نگاه می‌کنیم از کجا شروع کنیم.",
}: CtaBannerProps) {
  return (
    <section className="bg-brand-charcoal py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-base leading-8 text-white/70">
          {description}
        </p>
        <LinkButton href="/contact">رزرو جلسه رایگان</LinkButton>
      </Container>
    </section>
  );
}
