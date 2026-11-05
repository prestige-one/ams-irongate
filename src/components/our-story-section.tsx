import { ArchitecturalSplit } from './architectural-split';
import { AnimatedFigures } from './animated-figures';
import { TitleFrame } from './title-frame';
import { amsCompanyFigures } from '@/lib/company-figures';

export function OurStorySection() {
  return <section className="ams-about-section ams-story-section" id="ams-story" aria-labelledby="ams-story-title">
    <ArchitecturalSplit imageRight image={{ src: '/images/about-our-story.webp', srcSet: '/images/about-our-story-480.webp 480w, /images/about-our-story.webp 1000w', width: 1000, height: 800, alt: 'Concrete and steel building framework under construction at sunset beside the Dubai skyline' }}>
      <p className="ams-kicker" data-ams-reveal="up">OUR STORY</p>
      <h2 id="ams-story-title" data-ams-reveal="up" data-ams-delay="120"><TitleFrame>Founded on a simple belief:<br />build it right.</TitleFrame></h2>
      <div className="ams-about-copy">
        <p data-ams-reveal="up" data-ams-delay="220">AMS Iron Gate Contracting began with a commitment to building a timeless legacy. Grounded in integrity, strengthened by expertise and guided by precision, we approach every development with an enduring sense of responsibility.</p>
        <p data-ams-reveal="up" data-ams-delay="320">Our team brings together engineering expertise, construction management and skilled craftsmanship to deliver developments that meet exacting standards.</p>
        <p data-ams-reveal="up" data-ams-delay="420">It is this dedication to our people, our partners and our craft that defines who we are.</p>
      </div>
    </ArchitecturalSplit>
    <AnimatedFigures figures={amsCompanyFigures} />
  </section>;
}
