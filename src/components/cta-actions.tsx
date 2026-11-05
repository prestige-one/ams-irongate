import { ArrowIcon } from './arrow-icon';

export function CtaActions() {
  return <div className="ams-cta-actions">
    <a className="ams-button ams-button-primary ams-pill-button" href="/contact#ams-contact-form">Request a consultation <ArrowIcon /></a>
    <a className="ams-button ams-button-outline" href="/contact?enquiry=profile#ams-contact-form">Request company profile <ArrowIcon /></a>
  </div>;
}
