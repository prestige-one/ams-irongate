import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { EntranceMotion } from '@/components/entrance-motion';
import { VendorSignInSection } from '@/components/vendor-sign-in-section';
import { SiteFooter } from '@/components/site-footer';
export const metadata: Metadata = { title: 'Reset Password — AMS Irongate Contracting', robots: { index: false, follow: false } };
export default function Page() {
 return <main className="ams-main ams-auth-page"><EntranceMotion />
 <PageHero page="forgot-password" titleId="ams-forgot-password-title" kicker="ACCOUNT RECOVERY" title={<>Reset your<br /><em>password.</em></>} description="A secure way back to your vendor account." />
 <VendorSignInSection recovery /><SiteFooter page="forgot-password" /></main>;
}
