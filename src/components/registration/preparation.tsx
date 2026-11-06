import { DOCUMENTS } from '@/lib/vendor/registration-model.mjs';

export function RegistrationPreparation() {
  return <section className="ams-reg-preparation" aria-labelledby="ams-reg-preparation-title">
    <div className="ams-reg-preparation-inner">
      <h2 id="ams-reg-preparation-title">Before you start</h2>
      <p>Have these documents ready as PDF, JPG or PNG files, up to 4 MB each. Only your trade licence is needed to register; the other required documents can follow before approval.</p>
      <ul>{DOCUMENTS.map(document => <li key={document.key}>
        <span className={'ams-reg-preparation-check' + (document.initialRequired || document.approvalRequired ? '' : ' ams-reg-preparation-optional')} aria-hidden="true">✓</span>
        <span>{document.label} <small>({document.initialRequired || document.approvalRequired ? 'required' : 'optional'})</small></span>
      </li>)}</ul>
    </div>
  </section>;
}
