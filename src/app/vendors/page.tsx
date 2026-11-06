import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { EntranceMotion } from '@/components/entrance-motion';
import { VendorProcessSection } from '@/components/vendor-process-section';
import { VendorPreparation } from '@/components/vendor-preparation';
import { SiteFooter } from '@/components/site-footer';
import { ArrowIcon } from '@/components/arrow-icon';

export const metadata: Metadata = {
  title: 'Vendors — AMS Irongate Contracting',
  description: 'Build with AMS Irongate. Vendor registration information for subcontractors, suppliers, manufacturers, consultants and service providers.',
};

export default function VendorsPage() {
  return <main className="ams-main ams-vendors-page">
    <EntranceMotion />
    <PageHero page="vendors" titleId="ams-vendors-hero-title" kicker="VENDORS"
      title={<>Build with<br /><em>AMS Irongate</em></>}
      description="We work with subcontractors, suppliers, manufacturers, consultants and service providers who share our standards. Register once and keep your company file current in one place."
      actions={<><a className="ams-button ams-button-primary ams-pill-button" href="/vendor-registration">Register as a vendor <ArrowIcon /></a><a className="ams-button ams-button-outline" href="/sign-in">Vendor sign in <ArrowIcon /></a></>} />
    <VendorProcessSection />
    <VendorPreparation />
    <SiteFooter page="vendors" />
  </main>;
}
