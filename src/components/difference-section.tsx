'use client';
import { RollingLabel } from './rolling-label';
import { TitleFrame } from './title-frame';


import { useEffect, useRef } from 'react';
import { Brand } from './brand';
import { CommitmentIcon } from './commitment-icon';
import { ArrowIcon } from './arrow-icon';

const commitments = [
  { title: 'Engineering-Led Delivery', description: 'Technical expertise and meticulous planning, from the first decision to the final detail.', icon: 'engineering' },
  { title: 'Uncompromising Safety', description: 'Disciplined site management, workforce protection and responsible construction.', icon: 'safety' },
  { title: 'A Legacy of Craftsmanship', description: 'Skilled execution that brings architectural intent to life with accuracy and care.', icon: 'craft' },
  { title: 'Quality That Endures', description: 'Rigorous inspections, exacting standards and meticulous finishing, delivered with confidence.', icon: 'quality' },
] as const;

export function DifferenceSection() {
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const network = networkRef.current!;
    let visible = false;
    const updateMotion = () => {
      network.dataset.amsAnimate = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    });
    observer.observe(network);
    document.addEventListener('visibilitychange', updateMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateMotion);
    };
  }, []);

  return <section className="ams-difference" id="difference" aria-labelledby="ams-difference-title">
    <div className="ams-difference-inner">
      <header className="ams-difference-heading" data-ams-reveal="up">
        <p className="ams-kicker">THE AMS DIFFERENCE</p>
        <h2 id="ams-difference-title"><TitleFrame>Built on trust. Defined by standards.</TitleFrame></h2>
        <p>Four commitments that guide every project, from the first decision to the final handover.</p>
      </header>
      <div ref={networkRef} className="ams-difference-network" data-ams-animate="false">
        <div className="ams-difference-hub" data-ams-reveal="fade">
          <span className="ams-difference-wave ams-difference-wave-one" aria-hidden="true" />
          <span className="ams-difference-wave ams-difference-wave-two" aria-hidden="true" />
          <span className="ams-difference-wave ams-difference-wave-three" aria-hidden="true" />
          <div className="ams-difference-metal" aria-hidden="true" />
          <svg className="ams-difference-orbit" viewBox="0 0 320 320" aria-hidden="true" focusable="false">
            <circle cx="160" cy="160" r="157" pathLength="100" />
            <circle className="ams-difference-orbit-core" cx="160" cy="160" r="157" pathLength="100" />
          </svg>
          <div className="ams-difference-logo"><Brand /></div>
        </div>
        {commitments.map((commitment, index) => <article key={commitment.icon} className={'ams-commitment ams-commitment-' + (index + 1)} data-ams-reveal="fade" data-ams-delay={index * 70}>
          <CommitmentIcon name={commitment.icon} />
          <div><h3>{commitment.title}</h3><p>{commitment.description}</p></div>
        </article>)}
      </div>
      <div className="ams-approach" data-ams-reveal="up">
        <a className="ams-button ams-button-primary ams-pill-button ams-approach-button" href="/about#values"><RollingLabel text="Discover our approach" /> <ArrowIcon /></a>
      </div>
    </div>
  </section>;
}
