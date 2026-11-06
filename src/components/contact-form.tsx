'use client';
import { RollingLabel } from './rolling-label';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowIcon } from './arrow-icon';

/** Demo-only form: validates locally and displays a confirmation; nothing is sent or stored. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const projectRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setReady(true);
    const purpose = new URLSearchParams(window.location.search).get('enquiry');
    if (purpose === 'profile' || purpose === 'vendor') {
      if (messageRef.current) messageRef.current.value = purpose === 'profile'
        ? 'I would like to request the AMS Irongate company profile.'
        : 'I would like to speak with your team about becoming a vendor.';
      if (projectRef.current) projectRef.current.value = 'Other';
    }
  }, []);
  useEffect(() => { if (submitted) statusRef.current?.focus(); }, [submitted]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of Array.from(form.elements)) {
      if ((field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) && field.required) {
        field.setCustomValidity(field.value.trim() ? '' : 'Please complete this field.');
      }
    }
    if (form.reportValidity()) setSubmitted(true);
  }
  return <div className="ams-contact-form-panel" data-ams-reveal="up" data-ams-delay="120">
    <h3 id="ams-contact-form-title">Start a project</h3>
    <p className="ams-contact-form-intro">Tell us a little about your plans. Fields marked * are required.</p>
    <form id="ams-contact-form" aria-labelledby="ams-contact-form-title" onSubmit={submit} onInput={event => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) event.target.setCustomValidity('');
      if (submitted) setSubmitted(false);
    }}>
      <fieldset className="ams-contact-form-fields" disabled={!ready}>
      <div className="ams-contact-fields">
        <div className="ams-contact-field"><label htmlFor="ams-contact-name">Full name *</label><input id="ams-contact-name" name="fullName" autoComplete="name" required maxLength={120} /></div>
        <div className="ams-contact-field"><label htmlFor="ams-contact-company">Company</label><input id="ams-contact-company" name="company" autoComplete="organization" maxLength={160} /></div>
        <div className="ams-contact-field"><label htmlFor="ams-contact-email">Email *</label><input id="ams-contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        <div className="ams-contact-field"><label htmlFor="ams-contact-phone">Phone</label><input id="ams-contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={60} /></div>
        <div className="ams-contact-field ams-contact-field-wide"><label htmlFor="ams-contact-project-type">Project type *</label><select ref={projectRef} id="ams-contact-project-type" name="projectType" defaultValue="Residential" required><option>Residential</option><option>Commercial</option><option>Mixed-use</option><option>Other</option></select></div>
        <div className="ams-contact-field ams-contact-field-wide"><label htmlFor="ams-contact-message">Tell us about your project *</label><textarea ref={messageRef} id="ams-contact-message" name="message" rows={5} required maxLength={4000} /></div>
      </div>
      <button className="ams-button ams-button-primary ams-pill-button ams-contact-submit" type="submit" disabled={submitted}><RollingLabel text={submitted ? 'Enquiry submitted' : 'Send enquiry'} /><ArrowIcon /></button>
      {submitted && <div className="ams-contact-success" role="status" tabIndex={-1} ref={statusRef}><strong>Thank you for your enquiry.</strong><p>Your enquiry has been submitted. One of our agents will contact you within 24 hours.</p></div>}
      </fieldset>
      <noscript><p className="ams-contact-form-intro">Enable JavaScript to use this enquiry preview.</p></noscript>
    </form>
  </div>;
}
