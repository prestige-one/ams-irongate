import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { EntranceMotion } from '@/components/entrance-motion';
import { RegistrationPreparation } from '@/components/registration/preparation';
import { VendorRegistrationForm } from '@/components/registration/registration-form';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Vendor Registration — AMS Irongate Contracting',
  description: 'Join our vendor network. Register your company, trades, contact details and supporting documents with AMS Irongate.',
};

export default function VendorRegistrationPage() {
  return <main className="ams-main ams-vendor-registration-page">
    <EntranceMotion />
    <PageHero page="vendor-registration" titleId="ams-registration-hero-title" kicker="VENDOR REGISTRATION"
      title={<>Join our<br /><em>vendor network</em></>}
      description="It takes about ten minutes."
      actions={<p className="ams-registration-signin">Already registered? <a href="/sign-in">Sign in to your portal.</a></p>} />
    <RegistrationPreparation />
    <VendorRegistrationForm />
    <SiteFooter page="vendor-registration" />
  </main>;
}
