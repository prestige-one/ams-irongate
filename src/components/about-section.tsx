import { RollingLabel } from './rolling-label';
import { ArchitecturalSplit } from './architectural-split';
import { amsCompanyFigures } from '@/lib/company-figures';
import { TitleFrame } from './title-frame';
import { ArrowIcon } from './arrow-icon';
import { AnimatedFigures } from './animated-figures';

export function AboutSection() {
  return <section className="ams-about-section" id="ams-about" aria-labelledby="ams-about-title">
    <ArchitecturalSplit>
        <p className="ams-kicker" data-ams-reveal="up">ABOUT AMS IRONGATE</p>
        <h2 id="ams-about-title" data-ams-reveal="up" data-ams-delay="120"><TitleFrame>Built on precision.<br />Defined by delivery.</TitleFrame></h2>
        <div className="ams-about-copy">
          <p data-ams-reveal="up" data-ams-delay="220">We deliver residential and commercial developments across Dubai, turning ambitious designs into enduring structures.</p>
          <p data-ams-reveal="up" data-ams-delay="320">Engineering rigour. Disciplined site management. Craftsmanship in every detail.</p>
        </div>
        <a className="ams-about-discover ams-button ams-button-primary" href="/about" data-ams-reveal="up" data-ams-delay="420"><RollingLabel text="EXPLORE MORE" /> <ArrowIcon /></a>
    </ArchitecturalSplit>
    <AnimatedFigures figures={amsCompanyFigures} />
    <div className="ams-about-baseline"><p>Engineering <span>/</span> Construction <span>/</span> Craftsmanship</p><span className="ams-about-rule" aria-hidden="true" /></div>
  </section>;
}
