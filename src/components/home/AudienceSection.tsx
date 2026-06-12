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

export function AudienceSection() {
  return (
    <section className="bg-brand-sand py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="مخاطبان"
          title="برای چه کسانی مناسب است؟"
          align="center"
          description="اگر در حوزه روان‌شناسی، مشاوره یا علوم تربیتی پژوهش می‌کنید و با آمار یا هوش مصنوعی گیر کرده‌اید، این خدمات برای شماست."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-bold text-brand-charcoal">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-brand-charcoal/70">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
