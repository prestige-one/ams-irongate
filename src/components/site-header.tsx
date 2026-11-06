import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';

type SitePage = 'home' | 'about' | 'services' | 'contact';

const navigation: readonly { label: string; href?: string; page?: SitePage }[] = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About Us', href: '/about', page: 'about' },
  { label: 'Services', href: '/services', page: 'services' },
  { label: 'Our Landmarks' },
  { label: 'Vendors' },
];

export function SiteHeader({ page = 'home' }: { page?: SitePage }) {
  return <header className="ams-header">
    <a className="ams-logo-link" href="/" aria-label="AMS Iron Gate Contracting — Home"><Brand /></a>
    <nav className="ams-primary-nav" aria-label="Main navigation">
      {navigation.map(item => item.href
        ? <a key={item.label} href={item.href} aria-current={item.page === page ? 'page' : undefined}>{item.label}</a>
        : <span className="ams-nav-label" key={item.label}>{item.label}</span>)}
    </nav>
    <a className="ams-enquire-button" href={page === 'contact' ? '#ams-contact-form' : '/contact#ams-contact-form'}>Enquire Us <ArrowIcon /></a>
  </header>;
}
