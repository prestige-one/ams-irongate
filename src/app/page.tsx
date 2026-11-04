import { HomeHero } from '@/components/home-hero';
import { AboutSection } from '@/components/about-section';
import { CapabilitiesSection } from '@/components/capabilities-section';

export default function Home() {
  return <main className="ams-main">
    <HomeHero />
    <AboutSection />
    <CapabilitiesSection />
  </main>;
}
