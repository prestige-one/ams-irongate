import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';

const navigation = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About Us', href: '/about', page: 'about' },
  { label: 'Services', href: '/services', page: 'services' },
  { label: 'Our Landmarks', href: 'https://ams-irongate.vercel.app/landmarks' },
  { label: 'Vendors', href: 'https://ams-irongate.vercel.app/vendors' },
];

export function SiteHeader({ page = 'home' }: { page?: 'home' | 'about' | 'services' | 'contact' }) {
  return <header className="ams-header">
    <a className="ams-logo-link" href="/" aria-label="AMS Iron Gate Contracting — Home"><Brand /></a>
    <nav className="ams-primary-nav" aria-label="Main navigation">
      {navigation.map(item => <a key={item.label} href={item.href} aria-current={item.page === page ? 'page' : undefined}>{item.label}</a>)}
    </nav>
    <a className="ams-enquire-button" href={page === 'contact' ? '#ams-contact-form' : '/contact#ams-contact-form'}>Enquire Us <ArrowIcon /></a>
  </header>;
}
