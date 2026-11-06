import { amsContact } from '@/lib/contact-details';
import { FooterBrandBand } from './footer-brand-band';
import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';
import { amsServices } from '@/lib/services';

type FooterLink = { label: string; href?: string };

function FooterLinkGroup({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return <nav className="ams-site-footer-group" aria-label={title}>
    <h3 className="ams-kicker">{title}</h3>
    <ul>{links.map(link => <li key={link.label}>{link.href ? <a href={link.href}>{link.label}</a> : <span className="ams-site-footer-label">{link.label}</span>}</li>)}</ul>
  </nav>;
}

const companyLinks: readonly FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Landmarks' },
  { label: 'How We Work', href: '#ams-process' },
  { label: 'FAQ', href: '#ams-faq' },
  { label: 'Contact Us', href: '/contact' },
];

const vendorLinks = [
  { label: 'Register as a vendor' },
  { label: 'Vendor enquiries' },
];

export function SiteFooter({ page = 'home' }: { page?: 'home' | 'about' | 'services' | 'contact' }) {
  const homeAnchor = (href: string) => page === 'home' || href === '#ams-top' || href === '#ams-build-with-us' ? href : '/' + href;
  const pageCompanyLinks = companyLinks.map(link => ({ ...link, href: link.href?.startsWith('#') ? homeAnchor(link.href) : link.href }));
  return <footer id="ams-footer" className="ams-site-footer ams-footer-wrap" aria-label="Site footer">
    <FooterBrandBand />
    <div className="ams-site-footer-main">
      <div className="ams-site-footer-grid">
        <div className="ams-site-footer-brand">
          <a href="#ams-top" aria-label="AMS Irongate Contracting — back to top"><Brand /></a>
          <p className="ams-site-footer-tagline">Built with precision.<br />Delivered with integrity.</p>
          <p className="ams-site-footer-description">A Dubai contracting company delivering residential and commercial landmarks.</p>
        </div>
        <FooterLinkGroup title="Company" links={pageCompanyLinks} />
        <FooterLinkGroup title="Services" links={amsServices.map(service => ({ label: service.title, href: (page === 'services' ? '' : '/services') + '#' + service.id }))} />
        <div className="ams-site-footer-contact-column">
          <FooterLinkGroup title="Vendors" links={vendorLinks} />
          <div className="ams-site-footer-group">
            <h3 className="ams-kicker">Contact</h3>
            <address>Dubai, UAE<br /><a href={'mailto:' + amsContact.email}>{amsContact.email}</a><br />{amsContact.phone}</address>
          </div>
        </div>
      </div>
      <div className="ams-site-footer-bottom">
        <p>© {new Date().getFullYear()} AMS Irongate Contracting · Dubai, UAE</p>
        <a className="ams-site-footer-top" href="#ams-top" aria-label="Back to top"><ArrowIcon /></a>
      </div>
    </div>
  </footer>;
}
