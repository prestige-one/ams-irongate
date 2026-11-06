import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { EntranceMotion } from '@/components/entrance-motion';
import { VendorSignInSection } from '@/components/vendor-sign-in-section';
import { SiteFooter } from '@/components/site-footer';
export const metadata: Metadata = { title: 'Vendor Sign In — AMS Irongate Contracting', robots: { index: false, follow: false } };
export default function Page() {
 return <main className="ams-main ams-auth-page"><EntranceMotion />
 <PageHero page="sign-in" titleId="ams-sign-in-title" kicker="VENDOR SIGN IN" title={<>Welcome back.<br /><em>Build with us.</em></>} description="Track your application and keep your documents current." />
 <VendorSignInSection /><SiteFooter page="sign-in" /></main>;
}
