'use client';
import { useEffect, useRef } from 'react';
import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';

export function SiteOverlay({ mode, onClose }: { mode: 'contact' | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    if (mode) {
      dialog.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = old; if (dialog.open) dialog.close(); };
    }
  }, [mode]);
  return <dialog ref={ref} className="ams-overlay" aria-labelledby="ams-overlay-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="ams-overlay-inner">
      <div className="ams-overlay-header"><Brand /><button className="ams-close" onClick={onClose} aria-label="Close dialog">Close <span aria-hidden="true">×</span></button></div>
      <p className="ams-kicker">START A CONVERSATION</p>
      <h2 id="ams-overlay-title">Bring your<br /><em>vision to life.</em></h2>
      <p className="ams-contact-copy">Share your brief, request our company profile or arrange a meeting with our team.</p>
      <a className="ams-contact-email" href="mailto:info@example.com">info@example.com <ArrowIcon /></a>
      <a className="ams-contact-phone" href="tel:+97140000000">+971 4 000 0000</a>
      <p className="ams-overlay-note">Dubai, UAE<br />Sample contact details for this design preview.</p>
    </div>
  </dialog>;
}
