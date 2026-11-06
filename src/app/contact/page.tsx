import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { EntranceMotion } from '@/components/entrance-motion';
import { ContactSection } from '@/components/contact-section';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Contact Us — AMS Irongate Contracting',
  description: 'Bring your vision to life. Contact AMS Irongate Contracting in Dubai to discuss your next development.',
};

export default function ContactPage() {
  return <main className="ams-main ams-contact-page">
    <EntranceMotion />
    <PageHero page="contact" titleId="ams-contact-hero-title" kicker="CONTACT US"
      title={<>Let’s build<br /><em>what’s next.</em></>}
      description="From an initial idea to a detailed project brief, our team is ready to discuss your next development." />
    <ContactSection />
    <SiteFooter page="contact" />
  </main>;
}
