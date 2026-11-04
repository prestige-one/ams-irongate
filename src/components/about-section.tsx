import { ArrowIcon } from './arrow-icon';
import { AnimatedFigures } from './animated-figures';

const companyFigures = [
  { value: 58, suffix: '+', label: 'Years of experience' },
  { value: 1000, suffix: '+', label: 'Engineers & specialists' },
  { value: 5, suffix: ' Million', decimals: 1, label: 'Sq ft under construction' },
];

export function AboutSection() {
  return <section className="ams-about-section" id="ams-about" aria-labelledby="ams-about-title">
    <div className="ams-about-overview">
      <div className="ams-about-visual">
        <img className="ams-about-image" src="/images/charcoal-architecture-1000.webp" srcSet="/images/charcoal-architecture-480.webp 480w, /images/charcoal-architecture-1000.webp 1000w" sizes="(max-width:760px) 86vw, 42vw" width="1000" height="800" loading="lazy" decoding="async" alt="Concrete building with silver architectural outlines and a legacy built to last caption" />
      </div>
      <div className="ams-about-content">
        <p className="ams-kicker">ABOUT AMS IRON GATE</p>
        <h2 id="ams-about-title">Built on precision.<br />Defined by delivery.</h2>
        <div className="ams-about-copy">
          <p>We deliver residential and commercial developments across Dubai, turning ambitious designs into enduring structures.</p>
          <p>Engineering rigour. Disciplined site management. Craftsmanship in every detail.</p>
        </div>
        <a className="ams-about-discover ams-button ams-button-primary" href="#ams-capabilities">Discover AMS <ArrowIcon /></a>
      </div>
    </div>
    <AnimatedFigures figures={companyFigures} />
    <div className="ams-about-baseline"><p>Engineering <span>/</span> Construction <span>/</span> Craftsmanship</p><span className="ams-about-rule" aria-hidden="true" /></div>
  </section>;
}
