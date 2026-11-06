import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { vendorDashboard } from '@/lib/vendor/dashboard';
import { Brand } from '@/components/brand';
import { VendorSignOut } from '@/components/vendor-sign-out';
export const metadata: Metadata = { title: 'Vendor Portal — AMS Irongate', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
const states: Record<string,string> = { valid: 'On file', expiring: 'Expiring soon', expired: 'Expired', missing: 'Needed' };
export default async function VendorPage(){
 const result = await vendorDashboard();
 if(result.state === 'signed-out') redirect('/sign-in');
 return <main className="ams-main ams-portal"><div className="ams-portal-wrap">
 <header className="ams-portal-top"><a href="/" aria-label="AMS Irongate home"><Brand /></a><VendorSignOut /></header>
 <p className="ams-kicker">VENDOR PORTAL</p>
 {result.state === 'unavailable' ? <section className="ams-portal-card" role="status"><h1>Portal temporarily unavailable</h1><p>We could not load your application. Please try again shortly or contact our team.</p><a className="ams-pill-button ams-button" href="/vendor">Try again</a><p><a href="/contact?enquiry=vendor">Contact the vendor team</a></p></section> : <>
 <section className="ams-portal-card"><p>{result.data.reference}</p><h1>{result.data.companyName}</h1><strong className="ams-portal-status">{result.data.status}</strong><p>{result.data.statusText}</p>{result.data.note && <p>{result.data.note}</p>}</section>
 <div className="ams-portal-grid"><section className="ams-portal-card"><h2>Required documents</h2><p>{result.data.compliance.score}% complete</p>
 {result.data.compliance.items.map(item=><div className="ams-portal-row" key={item.key}><span>{item.label}</span><span className="ams-portal-status">{states[item.state] || item.state}</span></div>)}</section>
 <section className="ams-portal-card"><h2>Application history</h2>{result.data.events.length ? <ol className="ams-portal-history">{result.data.events.map(event=><li key={event.id}>{event.message}<time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleDateString('en-GB',{timeZone:'Asia/Dubai'})}</time></li>)}</ol> : <p>No updates yet.</p>}</section></div>
 <p><a href="/contact?enquiry=vendor">Need help? Contact our vendor team.</a></p></>}
 </div></main>;
}
