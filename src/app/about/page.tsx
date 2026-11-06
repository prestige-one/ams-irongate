import { MissionVisionSection } from '@/components/mission-vision-section';
import { CtaSection } from '@/components/cta-section';
import { ValuesSection } from '@/components/values-section';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about-hero';
import { OurStorySection } from '@/components/our-story-section';
import { EntranceMotion } from '@/components/entrance-motion';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'About Us — AMS Irongate Contracting',
  description: 'Strength in structure. Integrity in everything. Discover the story behind AMS Irongate Contracting, a Dubai-based contracting company.',
};

export default function AboutPage() {
  return <main className="ams-main ams-about-page">
    <EntranceMotion />
    <AboutHero />
    <OurStorySection />
    <MissionVisionSection />
    <ValuesSection />
    <CtaSection />
    <SiteFooter page="about" />
  </main>;
}
