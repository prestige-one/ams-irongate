'use client';

import { useEffect, useRef, useState } from 'react';
import { CapabilityCard } from './capability-card';

const capabilities = [
  { number: '01', title: 'Structure', description: 'Foundations and structural frameworks executed with engineering precision.', image: 'structure', detail: 'From foundations to reinforced concrete frames, we coordinate structural works with careful planning, quality checks and disciplined site management.' },
  { number: '02', title: 'Façade', description: 'Architectural envelopes delivered with accuracy and technical expertise.', image: 'facade', detail: 'We coordinate exterior envelopes with the structure and building services, bringing together glazing, cladding and architectural details with attention to fit, finish and performance.' },
  { number: '03', title: 'MEP Systems', description: 'Integrated building services engineered for seamless performance.', image: 'mep', detail: 'Mechanical, electrical and plumbing systems are planned alongside the structure and finishes, supporting coordinated installation, testing and a smooth handover.' },
  { number: '04', title: 'Finishing', description: 'Every interior detail completed with craftsmanship and care.', image: 'finishing', detail: 'Stone, joinery, lighting and interior finishes are coordinated around the design intent, with careful attention to the details people see and experience every day.' },
];

export function CapabilitiesSection() {
  const [selected, setSelected] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
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
  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      dialog.close();
    };
  }, [selected]);


  return <section className="ams-capabilities" id="ams-capabilities" aria-labelledby="ams-capabilities-title">
    <div className="ams-capabilities-inner">
      <div className="ams-capabilities-heading">
        <div><p className="ams-kicker">FULL-SCOPE CAPABILITY</p><h2 id="ams-capabilities-title">Precision at every level.</h2></div>
        <p className="ams-capabilities-intro">From the structural core to the final detail, our expertise covers every layer of your development.</p>
      </div>
      <div className="ams-capabilities-grid" ref={gridRef} data-ams-animate="false">
        {capabilities.map((capability, index) => <CapabilityCard key={capability.number} {...capability} index={index} />)}
      </div>
      <div className="ams-capabilities-baseline">
        <button className="ams-button ams-button-primary ams-services-button" onClick={() => setSelected(true)} aria-haspopup="dialog">Explore our services</button>
      </div>
      <footer className="ams-footer"><span>AMS IRON GATE CONTRACTING</span><p>Built with precision. Delivered with integrity.</p><a href="#ams-top">BACK TO TOP ↑</a></footer>
    </div>
    <dialog ref={dialogRef} className="ams-services-dialog" aria-labelledby="ams-services-dialog-title" onCancel={() => setSelected(false)} onClick={event => { if (event.target === event.currentTarget) setSelected(false); }}>
      <div className="ams-services-dialog-inner">
        <div className="ams-services-dialog-header"><p className="ams-kicker">FULL-SCOPE CAPABILITY</p><button className="ams-close" onClick={() => setSelected(false)} aria-label="Close services">Close <span aria-hidden="true">×</span></button></div>
        <h2 id="ams-services-dialog-title">Our services</h2>
        <div className="ams-services-detail-list">{capabilities.map(service => <div className="ams-service-detail" key={service.number}>
          <h3>{service.title}</h3>
          <p>{service.detail}</p>
        </div>)}</div>
      </div>
    </dialog>
  </section>;
}
