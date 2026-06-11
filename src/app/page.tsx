import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { UspSection } from "@/components/home/UspSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { CtaBanner } from "@/components/shared/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <UspSection />
      <AudienceSection />
      <CtaBanner />
    </>
  );
}
