import { TitleFrame } from './title-frame';
import { ContactForm } from './contact-form';
import { amsContact } from '@/lib/contact-details';

export function ContactSection() {
  return <section className="ams-contact-section" id="ams-contact" aria-labelledby="ams-contact-title">
    <div className="ams-contact-inner">
      <div className="ams-contact-details" data-ams-reveal="up">
        <p className="ams-kicker">CONTACT US</p>
        <h2 id="ams-contact-title"><TitleFrame>Bring your<br /><em>vision to life</em></TitleFrame></h2>
        <p className="ams-contact-intro">Tell us about your project and a member of our team will be in touch within 24 hours.</p>
        <dl className="ams-contact-info">
          <div><dt>Office</dt><dd>{amsContact.office}</dd></div>
          <div><dt>Phone</dt><dd>{amsContact.phone}</dd></div>
          <div><dt>Email</dt><dd><a href={'mailto:' + amsContact.email}>[{amsContact.email}]</a></dd></div>
          <div><dt>Office hours</dt><dd>{amsContact.hours}</dd></div>
        </dl>
      </div>
      <ContactForm />
    </div>
  </section>;
}
