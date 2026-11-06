'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowIcon } from '../arrow-icon';
import { RegistrationField } from './field';
import { RegistrationDocument, type RegistrationUpload } from './document-upload';
import { RegistrationReview } from './review';
import { CERTIFICATIONS, DOCUMENTS, EMPLOYEE_BANDS, MAX_TRADES, STEPS, TRADES, VENDOR_TYPES, fileProblem, initialFields, registrationPayload, textLimits, validateStep } from '@/lib/vendor/registration-model.mjs';
import { VendorApiError, registerVendor, uploadVendorDocument } from '@/lib/vendor/registration-api.mjs';

type Fields = ReturnType<typeof initialFields>;
type Issue = { step: number; field: string; message: string } | null;
const initialCertifications = { iso9001: false, iso14001: false, iso45001: false };
const stepTitles = ['Company details', 'Trades & expertise', 'Your contact details', 'Company documents', 'Review your application'];

export function VendorRegistrationForm() {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(0);
  const [fields, setFields] = useState(initialFields);
  const [trades, setTrades] = useState<string[]>([]);
  const [certifications, setCertifications] = useState(initialCertifications);
  const [uploads, setUploads] = useState<Record<string, RegistrationUpload>>({});
  const [accepted, setAccepted] = useState(false);
  const [trap, setTrap] = useState('');
  const [issue, setIssue] = useState<Issue>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [complete, setComplete] = useState<{ documents: number } | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [apiStatus, setApiStatus] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const focusFrame = useRef(0);
  const submittingRef = useRef(false);
  useEffect(() => { setReady(true); return () => { abortRef.current?.abort(); cancelAnimationFrame(focusFrame.current); }; }, []);
  useEffect(() => { if (complete) { outcomeRef.current?.focus(); outcomeRef.current?.scrollIntoView({ block: 'center' }); } }, [complete]);

  function goTo(next: number) {
    setIssue(null); setApiStatus(0); setStep(next); setVisited(current => Math.max(current, next));
    cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => { topRef.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); headingRef.current?.focus({ preventScroll: true }); });
  }
  function showIssue(next: NonNullable<Issue>) {
    setStep(next.step); setIssue(next);
    cancelAnimationFrame(focusFrame.current);
    focusFrame.current = requestAnimationFrame(() => { const field = document.getElementById('ams-reg-' + next.field); (field ?? document.getElementById('ams-reg-error'))?.focus(); });
  }
  function update(key: keyof Fields, value: string) { cancelAnimationFrame(focusFrame.current); setFields(current => ({ ...current, [key]: value })); setIssue(null); }
  function inputProps(key: keyof Fields) {
    return { id: 'ams-reg-' + key, name: key, value: fields[key], onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => update(key, event.target.value), 'aria-invalid': issue?.field === key || undefined, 'aria-describedby': issue?.field === key ? 'ams-reg-error' : undefined };
  }
  function field(key: keyof Fields, label: string, options: { wide?: boolean; type?: string; autoComplete?: string; placeholder?: string; required?: boolean; maxLength?: number; inputMode?: 'numeric' | 'url' } = {}) {
    return <RegistrationField name={key} label={label} wide={options.wide}><input {...inputProps(key)} type={options.type ?? 'text'} autoComplete={options.autoComplete} placeholder={options.placeholder} required={options.required} maxLength={options.maxLength ?? textLimits[key as keyof typeof textLimits] ?? 200} inputMode={options.inputMode} /></RegistrationField>;
  }
  async function pick(key: string, file: File) {
    try {
      const problem = fileProblem(file, new Uint8Array(await file.slice(0, 8).arrayBuffer()));
      if (problem) return setIssue({ step: 3, field: key, message: problem });
      setUploads(current => ({ ...current, [key]: { file, filename: file.name, size: file.size, expiryDate: current[key]?.expiryDate ?? '' } })); setIssue(null);
    } catch { setIssue({ step: 3, field: key, message: 'This file could not be read. Please choose it again.' }); }
  }
  async function send() {
    if (submittingRef.current) return;
    if (!accountCreated) {
      for (let current = 0; current < 5; current++) { const nextIssue = validateStep(current, fields, trades, uploads, accepted); if (nextIssue) return showIssue(nextIssue); }
    }
    submittingRef.current = true;
    setIssue(null); setApiStatus(0);
    const controller = new AbortController(); abortRef.current = controller;
    try {
      if (!accountCreated) {
        setBusy('Creating your vendor account…');
        await registerVendor(registrationPayload(fields, trades, certifications, accepted, trap), controller.signal);
        setAccountCreated(true);
        setFields(current => ({ ...current, password: '', confirm: '' }));
      }
      const pending = Object.entries(uploads).filter(([, upload]) => !upload.uploaded && upload.file);
      let failures = 0;
      for (const [index, [key, upload]] of pending.entries()) {
        setBusy('Uploading documents (' + (index + 1) + ' of ' + pending.length + ')…');
        try {
          await uploadVendorDocument(key, upload, controller.signal);
          // Release the native File reference as soon as its upload is confirmed.
          setUploads(current => ({ ...current, [key]: { ...current[key], file: null, uploaded: true, error: undefined } }));
        } catch (error) {
          if (controller.signal.aborted) return;
          failures++;
          const message = error instanceof Error ? error.message : 'Upload failed. Please retry.';
          setUploads(current => ({ ...current, [key]: { ...current[key], error: message } }));
          if (error instanceof VendorApiError) setApiStatus(error.status);
        }
      }
      if (failures) setIssue({ step: 4, field: 'uploads', message: 'Your company account was created, but ' + failures + ' document upload' + (failures === 1 ? '' : 's') + ' could not be completed. Retry the remaining uploads below.' });
      else { setComplete({ documents: Object.keys(uploads).length }); setUploads({}); }
    } catch (error) {
      if (controller.signal.aborted) return;
      setApiStatus(error instanceof VendorApiError ? error.status : 0);
      setIssue({ step: 4, field: 'submission', message: error instanceof Error ? error.message : 'We could not submit your application. Please try again.' });
    } finally { submittingRef.current = false; if (!controller.signal.aborted) setBusy(null); }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 4) { void send(); return; }
    const nextIssue = validateStep(step, fields, trades, uploads, accepted);
    if (nextIssue) showIssue(nextIssue); else goTo(step + 1);
  }

  if (complete) return <section className="ams-registration-section"><div className="ams-registration-outcome" ref={outcomeRef} tabIndex={-1} role="status">
    <span className="ams-reg-success-icon" aria-hidden="true">✓</span><p className="ams-kicker">APPLICATION RECEIVED</p><h2>Thank you for joining our network.</h2>
    <p>Your registration for <strong>{fields.companyName}</strong> and {complete.documents} document{complete.documents === 1 ? '' : 's'} have been received. Our team will review your application.</p>
    <div className="ams-page-hero-actions"><a className="ams-button ams-button-primary ams-pill-button" href="/vendors">Back to Vendors <ArrowIcon /></a><a className="ams-button ams-button-outline" href="/sign-in">Vendor sign in <ArrowIcon /></a></div>
  </div></section>;

  return <section className="ams-registration-section" aria-label="Vendor application form">
    <div className="ams-registration-panel" id="ams-registration-form" ref={topRef}>
      <form noValidate onSubmit={submit} aria-labelledby="ams-reg-step-title" aria-busy={!!busy}>
        <fieldset className="ams-reg-fieldset" disabled={!ready || !!busy}>
          <ol className="ams-reg-progress" aria-label="Registration progress">
            {STEPS.map((title, index) => <li key={title} aria-current={index === step ? 'step' : undefined} data-complete={index < step}>
              <button type="button" onClick={() => goTo(index)} disabled={index > visited || accountCreated} aria-label={'Step ' + (index + 1) + ': ' + title + (index < step ? ', completed' : '')}>
                <span className="ams-reg-progress-number">{index < step ? '✓' : index + 1}</span><span className="ams-reg-progress-label">{title}</span>
              </button>
            </li>)}
          </ol>
          <div className="ams-reg-step-heading"><p>Step {step + 1} of 5</p><h2 id="ams-reg-step-title" ref={headingRef} tabIndex={-1}>{stepTitles[step]}</h2></div>
          <div className="ams-reg-step" key={step}>
            {step === 0 && <div className="ams-reg-fields">
              {field('companyName', 'Company name *', { wide: true, required: true, autoComplete: 'organization' })}
              <RegistrationField name="type" label="Company type *"><select {...inputProps('type')} required>{VENDOR_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}</select></RegistrationField>
              {field('licenseNumber', 'Trade licence number *', { required: true })}
              {field('licenseAuthority', 'Licensing authority', { placeholder: 'e.g. DET Dubai' })}{field('trn', 'VAT number (TRN)')}
              {field('yearEstablished', 'Year established', { inputMode: 'numeric', maxLength: 4 })}
              <RegistrationField name="employees" label="Company size"><select {...inputProps('employees')}><option value="">Select</option>{EMPLOYEE_BANDS.map(band => <option key={band}>{band}</option>)}</select></RegistrationField>
              {field('website', 'Website', { autoComplete: 'url', placeholder: 'www.yourcompany.com', inputMode: 'url' })}{field('city', 'City', { autoComplete: 'address-level2' })}
              {field('address', 'Office address', { wide: true, autoComplete: 'street-address' })}
              <RegistrationField name="about" label="About your company" wide><textarea {...inputProps('about')} rows={3} maxLength={2000} /></RegistrationField>
            </div>}
            {step === 1 && <>
              <div id="ams-reg-trades" tabIndex={-1}><div className="ams-reg-choice-heading"><h3>Which trades do you cover? <span className="ams-reg-required">*</span></h3><span aria-live="polite">{trades.length} / {MAX_TRADES} selected</span></div>
                <p className="ams-reg-help">Choose up to 12 trades. {trades.length === MAX_TRADES && 'Deselect a trade to choose another.'}</p>
                <div className="ams-reg-choices">{TRADES.map(trade => <label key={trade} className="ams-reg-choice" data-selected={trades.includes(trade)}>
                  <input className="ams-sr-only" type="checkbox" name="trade" value={trade} checked={trades.includes(trade)} disabled={!trades.includes(trade) && trades.length >= MAX_TRADES} onChange={event => { setTrades(current => event.target.checked ? [...current, trade] : current.filter(value => value !== trade)); setIssue(null); }} />{trade}
                </label>)}</div>
              </div>
              <div className="ams-reg-choice-section"><h3>Certifications</h3><div className="ams-reg-choices">{CERTIFICATIONS.map(certification => <label className="ams-reg-choice" key={certification.key} data-selected={certifications[certification.key as keyof typeof certifications]}><input className="ams-sr-only" type="checkbox" checked={certifications[certification.key as keyof typeof certifications]} onChange={event => setCertifications(current => ({ ...current, [certification.key]: event.target.checked }))} />{certification.label}</label>)}</div></div>
              <div className="ams-reg-choice-section ams-reg-short-field">{field('contractorGrade', 'Contractor classification', { placeholder: 'e.g. G+12, Grade A' })}</div>
            </>}
            {step === 2 && <div className="ams-reg-fields">
              {field('contactName', 'Contact name *', { required: true, autoComplete: 'name' })}{field('contactTitle', 'Job title', { autoComplete: 'organization-title' })}
              {field('email', 'Email * (your sign-in)', { type: 'email', required: true, autoComplete: 'email' })}{field('contactPhone', 'Phone *', { type: 'tel', required: true, autoComplete: 'tel' })}
              {(['password', 'confirm'] as const).map(key => <RegistrationField name={key} label={key === 'password' ? 'Password * (10+ characters)' : 'Confirm password *'} key={key}><div className="ams-reg-password"><input {...inputProps(key)} type={showPasswords ? 'text' : 'password'} autoComplete="new-password" maxLength={72} required /><button type="button" aria-label={(showPasswords ? 'Hide' : 'Show') + (key === 'confirm' ? ' confirm password' : ' password')} aria-pressed={showPasswords} onClick={() => setShowPasswords(current => !current)}>{showPasswords ? 'Hide' : 'Show'}</button></div></RegistrationField>)}
            </div>}
            {step === 3 && <><p className="ams-reg-help ams-reg-docs-intro">PDF, JPG or PNG, up to 4 MB each. Only the trade licence is needed now. The rest can follow from your portal.</p><div className="ams-reg-documents">
              {DOCUMENTS.map(document => <RegistrationDocument key={document.key} document={document} upload={uploads[document.key]} invalid={issue?.field.startsWith(document.key)} onPick={file => pick(document.key, file)} onRemove={() => { setUploads(current => { const next = { ...current }; delete next[document.key]; return next; }); setIssue(null); }} onExpiry={value => { setUploads(current => ({ ...current, [document.key]: { ...current[document.key], expiryDate: value } })); setIssue(null); }} />)}
            </div></>}
            {step === 4 && <><RegistrationReview fields={fields} trades={trades} certifications={certifications} uploads={uploads} onEdit={goTo} locked={accountCreated} />
              <label className="ams-reg-declaration"><input type="checkbox" id="ams-reg-accepted" checked={accepted} disabled={accountCreated} onChange={event => { setAccepted(event.target.checked); setIssue(null); }} /><span>I confirm this information is accurate and that I am authorised to register this company with AMS Irongate Contracting.</span></label>
            </>}
          </div>
          <input type="text" name="company_website" value={trap} onChange={event => setTrap(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="ams-reg-trap" />
          {issue && <div className="ams-reg-error" role="alert" tabIndex={-1} id="ams-reg-error"><p>{issue.message}</p>{(apiStatus === 409 || apiStatus === 401) && <a href="/sign-in">Sign in instead</a>}</div>}
          {busy && <p className="ams-reg-busy" role="status"><span className="ams-reg-spinner" aria-hidden="true" />{busy}</p>}
          <div className="ams-reg-actions">{step > 0 ? <button className="ams-reg-back" type="button" onClick={() => goTo(step - 1)} disabled={accountCreated}><ArrowIcon /> Back</button> : <span />}
            <button className="ams-button ams-button-primary ams-pill-button" type="submit">{busy ? 'Please wait…' : step < 4 ? 'Continue' : accountCreated ? 'Retry failed uploads' : 'Submit application'}<ArrowIcon /></button>
          </div>
        </fieldset>
        <noscript><p className="ams-reg-help">Enable JavaScript to complete this five-step registration.</p></noscript>
      </form>
    </div>
  </section>;
}
