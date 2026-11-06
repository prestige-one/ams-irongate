import { FaqSection } from '@/components/faq-section';
import { CtaSection } from '@/components/cta-section';
import { ExpertiseSection } from '@/components/expertise-section';
import { ApproachSection } from '@/components/approach-section';
import { ApproachComparisonSection } from '@/components/approach-comparison-section';
import { EntranceMotion } from '@/components/entrance-motion';
import { HomeHero } from '@/components/home-hero';
import { AboutSection } from '@/components/about-section';
import { CapabilitiesSection } from '@/components/capabilities-section';
import { DifferenceSection } from '@/components/difference-section';
import { SiteFooter } from '@/components/site-footer';
import { ServicesOverview } from '@/components/services-overview';

export function HomePage({ comparison = false }: { comparison?: boolean }) {
  return <main className="ams-main">
    <EntranceMotion />
    <HomeHero />
    <AboutSection />
    <CapabilitiesSection />
    <DifferenceSection />
    <ServicesOverview />
    {comparison ? <ApproachComparisonSection /> : <ApproachSection />}
    <ExpertiseSection />
    <FaqSection />
    <CtaSection />
    <SiteFooter />
  </main>;
}
