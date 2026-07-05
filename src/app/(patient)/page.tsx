import { HeroSection } from "@/components/Home/hero-section";
import { AboutSection } from '@/components/Home/about-section'
import { ServicesSection } from '@/components/Home/ServicesSection'
import { WorkingHoursSection } from '@/components/Home/WorkingHoursSection'
import { QuickBookingSection } from '@/components/Home/QuickBookingSection'
import { GallerySection } from '@/components/Home/GallerySection'
import { FaqSection } from '@/components/Home/FaqSection'
import { ArticlesSection } from '@/components/Home/ArticlesSection'
import { ContactCtaSection } from '@/components/Home/ContactCtaSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkingHoursSection />
      <QuickBookingSection />
      <GallerySection />
      <FaqSection />
      <ArticlesSection />
      <ContactCtaSection />
    </main>
  );
}



