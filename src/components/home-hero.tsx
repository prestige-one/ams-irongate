import { RollingLabel } from './rolling-label';
import { TitleFrame } from './title-frame';

import { SiteHeader } from './site-header';
import { ArrowIcon } from './arrow-icon';
import { HolographicBackdrop } from './holographic-backdrop';

export function HomeHero() {
  return <section className="ams-hero ams-hero-centered" id="ams-top" aria-labelledby="ams-hero-title">
      <HolographicBackdrop />
      <SiteHeader />
      <div className="ams-hero-content">
        <p className="ams-kicker ams-kicker-pill">VISION &bull; PRECISION &bull; EXECUTION</p>
        <h1 id="ams-hero-title"><TitleFrame>Building a timeless <em>legacy.</em></TitleFrame></h1>
        <p className="ams-hero-description">Engineering discipline, uncompromising safety and craftsmanship, brought to every structure we build.</p>
        <div className="ams-hero-actions"><a className="ams-button ams-button-primary" href="/contact#ams-contact-form"><RollingLabel text="Let’s Build Together" /> <ArrowIcon /></a></div>
      </div>

    </section>;
}
