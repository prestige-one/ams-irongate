import { BuildingBackdrop } from './building-backdrop';
import { TitleFrame } from './title-frame';
import { CtaActions } from './cta-actions';

export function CtaSection() {
  return <section className="ams-cta-section" id="build-with-us" aria-labelledby="ams-cta-title">
    <BuildingBackdrop />
    <div className="ams-cta-content" data-ams-reveal="up" data-ams-reveal-viewport="full">
      <p className="ams-kicker">BUILD WITH US</p>
      <h2 id="ams-cta-title"><TitleFrame>Let’s build your<br />next landmark.</TitleFrame></h2>
      <p className="ams-cta-description">Share your brief, request our company profile or arrange a meeting with our team.</p>
      <CtaActions />
    </div>
  </section>;
}
