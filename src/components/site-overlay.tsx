'use client';
import { useEffect, useId, useRef } from 'react';
import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';

export function SiteOverlay({ mode, onClose, purpose }: { mode: 'contact' | null; onClose: () => void; purpose?: 'consultation' | 'profile' }) {
  const titleId = 'ams-overlay-title-' + useId().replaceAll(':', '');
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
  return <dialog ref={ref} className="ams-overlay" aria-labelledby={titleId} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="ams-overlay-inner">
      <div className="ams-overlay-header"><Brand /><button className="ams-close" onClick={onClose} aria-label="Close dialog">Close <span aria-hidden="true">×</span></button></div>
      <p className="ams-kicker">START A CONVERSATION</p>
      <h2 id={titleId}>{purpose === 'profile' ? <>Request our<br /><em>company profile.</em></> : purpose === 'consultation' ? <>Let’s discuss<br /><em>your project.</em></> : <>Bring your<br /><em>vision to life.</em></>}</h2>
      <p className="ams-contact-copy">{purpose === 'profile' ? 'Contact our team to request the AMS Iron Gate company profile.' : purpose === 'consultation' ? 'Share your project brief or arrange a meeting with our team.' : 'Share your brief, request our company profile or arrange a meeting with our team.'}</p>
      <a className="ams-contact-email" href="mailto:info@example.com">info@example.com <ArrowIcon /></a>
      <a className="ams-contact-phone" href="tel:+97140000000">+971 4 000 0000</a>
      <p className="ams-overlay-note">Dubai, UAE<br />Sample contact details for this design preview.</p>
    </div>
  </dialog>;
}
