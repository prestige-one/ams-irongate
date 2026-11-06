'use client';
import { RollingLabel } from './rolling-label';
import { TitleFrame } from './title-frame';
import { ArrowIcon } from './arrow-icon';


import { useEffect, useRef } from 'react';
import { CapabilityCard } from './capability-card';

const capabilities = [
  { number: '01', title: 'Structure', description: 'Foundations and structural frameworks executed with engineering precision.', image: 'structure' },
  { number: '02', title: 'Façade', description: 'Architectural envelopes delivered with accuracy and technical expertise.', image: 'facade' },
  { number: '03', title: 'MEP Systems', description: 'Integrated building services engineered for seamless performance.', image: 'mep' },
  { number: '04', title: 'Finishing', description: 'Every interior detail completed with craftsmanship and care.', image: 'finishing' },
];

export function CapabilitiesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const grid = gridRef.current!;
    let inView = false;
    const update = () => { grid.dataset.amsAnimate = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(grid);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);


  return <section className="ams-capabilities" id="ams-capabilities" aria-labelledby="ams-capabilities-title">
    <div className="ams-capabilities-inner">
      <div className="ams-capabilities-heading" data-ams-reveal="up">
        <div><p className="ams-kicker">FULL-SCOPE CAPABILITY</p><h2 id="ams-capabilities-title"><TitleFrame>Precision at every level.</TitleFrame></h2></div>
        <p className="ams-capabilities-intro">From the structural core to the final detail, our expertise covers every layer of your development.</p>
      </div>
      <div className="ams-capabilities-grid" ref={gridRef} data-ams-animate="false">
        {capabilities.map((capability, index) => <CapabilityCard key={capability.number} {...capability} index={index} />)}
      </div>
      <div className="ams-capabilities-baseline" data-ams-reveal="up">
        <a className="ams-button ams-button-primary ams-pill-button ams-services-button" href="/services"><RollingLabel text="Explore our services" /> <ArrowIcon /></a>
      </div>
    </div>
  </section>;
}
