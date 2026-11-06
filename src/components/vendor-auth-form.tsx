'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from './brand';
import { ArrowIcon } from './arrow-icon';
import { sendVendorAuth } from '@/lib/vendor/registration-api.mjs';

export function VendorAuthForm({ recovery: initialRecovery = false }: { recovery?: boolean }) {
  const router = useRouter();
  const [recovery, setRecovery] = useState(initialRecovery);
  const title = useRef<HTMLHeadingElement>(null);
  const modeChanged = useRef(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [visible, setVisible] = useState(false);
  const locked = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const notice = useRef<HTMLDivElement>(null);
  useEffect(() => { setReady(true); return () => abort.current?.abort(); }, []);
  useEffect(() => { if (error || sent) notice.current?.focus(); }, [error, sent]);
  useEffect(() => { if (modeChanged.current) title.current?.focus({ preventScroll: true }); }, [recovery]);
  function switchMode(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (locked.current) return;
    setError(''); setSent(false); setVisible(false);
    modeChanged.current = true;
    setRecovery(value => !value);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true; setBusy(true); setError('');
    const form = event.currentTarget;
    const fields = new FormData(form);
    const controller = new AbortController(); abort.current = controller;
    let navigating = false;
    try {
      await sendVendorAuth(recovery ? 'forgot' : 'login', { email: fields.get('email'), ...(!recovery && { password: fields.get('password') }) }, controller.signal);
      form.reset();
      if (recovery) setSent(true);
      else { navigating = true; router.replace('/vendor'); router.refresh(); }
    } catch (failure) {
      if (!controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'Please try again.');
    } finally { if (!controller.signal.aborted && !navigating) { locked.current = false; setBusy(false); } }
  }
  return <section className="ams-auth-section" aria-labelledby="ams-auth-title">
    <div className="ams-auth-card">
      <a className="ams-auth-brand" href="/" aria-label="AMS Irongate home"><Brand /></a>
      <h2 id="ams-auth-title" ref={title} tabIndex={-1}>{recovery ? 'Reset your password' : 'Vendor portal'}</h2>
      <p className="ams-auth-intro">{recovery ? 'Enter your registered email and we will send you a reset link.' : 'Track your application and keep your documents current.'}</p>
      {sent ? <div className="ams-auth-notice ams-auth-success" ref={notice} tabIndex={-1} role="status">
        <h3>Check your inbox</h3><p>If that email has an account, a password reset link has been requested. Please check your inbox and spam folder.</p>
      </div> : <form key={recovery ? 'recovery' : 'login'} onSubmit={submit} aria-busy={busy}>
        <fieldset disabled={!ready || busy} className="ams-auth-fields">
          <label htmlFor="ams-auth-email">Email <span aria-hidden="true">*</span></label>
          <input id="ams-auth-email" name="email" type="email" autoComplete="username" required maxLength={200} autoCapitalize="none" spellCheck={false} aria-describedby={error ? 'ams-auth-error' : undefined} />
          {!recovery && <><label htmlFor="ams-auth-password">Password <span aria-hidden="true">*</span></label>
            <div className="ams-auth-password"><input id="ams-auth-password" name="password" type={visible ? 'text' : 'password'} autoComplete="current-password" required maxLength={200} aria-describedby={error ? 'ams-auth-error' : undefined} />
              <button type="button" className="ams-auth-reveal" onClick={() => setVisible(value => !value)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>{visible ? 'Hide' : 'Show'}</button>
            </div></>}
          {error && <div id="ams-auth-error" ref={notice} tabIndex={-1} role="alert" className="ams-auth-notice ams-auth-error">{error}</div>}
          <button className="ams-pill-button ams-button" type="submit">{busy ? (recovery ? 'Sending…' : 'Signing in…') : (recovery ? 'Send reset link' : 'Sign in')}<ArrowIcon /></button>
        </fieldset>
        <noscript><p>Please enable JavaScript to securely use this form.</p></noscript>
      </form>}
      <div className="ams-auth-links"><a href={recovery ? '/sign-in' : '/forgot-password'} onClick={switchMode} aria-disabled={busy || undefined}>{recovery ? 'Back to sign in' : 'Forgot password?'}</a><a href="/vendor-registration">Register your company</a></div>
    </div>
  </section>;
}
