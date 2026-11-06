import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ServicesCatalog } from '@/components/services-catalog';
import { ExpertiseSection } from '@/components/expertise-section';
import { EntranceMotion } from '@/components/entrance-motion';
import { CtaSection } from '@/components/cta-section';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Services — AMS Irongate Contracting',
  description: 'From concept to completion. Specialist construction capabilities and seamless coordination for residential and commercial developments in Dubai.',
};

export default function ServicesPage() {
  return <main className="ams-main ams-services-page">
    <EntranceMotion />
    <PageHero page="services" titleId="ams-services-hero-title" kicker="SERVICES"
      title={<>From concept<br /><em>to completion</em></>}
      description="From the earliest stages of planning to the final handover, we bring together specialist capabilities and seamless coordination to realise ambitious architectural visions with distinction." />
    <ServicesCatalog />
    <ExpertiseSection />
    <CtaSection />
    <SiteFooter page="services" />
  </main>;
}
