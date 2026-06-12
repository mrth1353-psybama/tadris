import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const audiences = [
  {
    title: "دانشجویان تحصیلات تکمیلی",
    description:
      "کمک برای انجام درست تحلیل آماری پایان‌نامه و آماده‌شدن برای جلسه دفاع.",
  },
  {
    title: "پژوهشگران دانشگاهی",
    description:
      "همراهی در طراحی مدل، تحلیل داده و استفاده معتبر از AI برای چاپ مقاله.",
  },
  {
    title: "نویسندگان پایان‌نامه و رساله",
    description:
      "از طراحی پرسش‌نامه تا تفسیر خروجی SPSS، Amos و Lisrel به زبان ساده.",
  },
  {
    title: "اعضای هیئت علمی",
    description:
      "مشاوره و ورکشاپ کاربرد هوش مصنوعی و SEM برای تیم‌های پژوهشی و دانشجویان.",
  },
];

const cardStyles = [
  { card: "!bg-brand-navy/8", title: "text-brand-charcoal", description: "text-brand-charcoal/70" },
  { card: "!bg-brand-navy/20", title: "text-brand-charcoal", description: "text-brand-charcoal/70" },
  { card: "!bg-brand-navy/35", title: "text-brand-charcoal", description: "text-brand-charcoal/70" },
  { card: "!bg-brand-navy", title: "text-white", description: "text-white/75" },
];

export function AudienceSection() {
  return (
    <section className="bg-brand-sand py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="مخاطبان"
          title="برای چه کسانی مناسب است؟"
          align="center"
          description="اگر در حوزه روان‌شناسی، مشاوره یا علوم تربیتی پژوهش می‌کنید، این خدمات برای شماست."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item, index) => {
            const style = cardStyles[index];
            return (
              <Card key={item.title} className={style.card}>
                <h3 className={`text-base font-bold ${style.title}`}>
                  {item.title}
                </h3>
                <p className={`mt-2 text-sm leading-7 ${style.description}`}>
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
