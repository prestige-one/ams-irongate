import { FaqSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';
import { ExpertiseSection } from '@/components/expertise-section';
import { ApproachSection } from '@/components/approach-section';
import { EntranceMotion } from '@/components/entrance-motion';
import { HomeHero } from '@/components/home-hero';
import { AboutSection } from '@/components/about-section';
import { CapabilitiesSection } from '@/components/capabilities-section';
import { DifferenceSection } from '@/components/difference-section';
import { SiteFooter } from '@/components/site-footer';
import { ServicesOverview } from '@/components/services-overview';

export default function Home() {
  return <main className="ams-main">
    <EntranceMotion />
    <HomeHero />
    <AboutSection />
    <CapabilitiesSection />
    <DifferenceSection />
    <ServicesOverview />
    <ApproachSection />
    <ExpertiseSection />
    <FaqSection />
    <CtaSection />
    <SiteFooter />
  </main>;
}
