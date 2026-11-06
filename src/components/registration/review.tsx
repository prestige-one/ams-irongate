import { CERTIFICATIONS, DOCUMENTS, VENDOR_TYPES } from '@/lib/vendor/registration-model.mjs';
import type { RegistrationUpload } from './document-upload';
import type { initialFields } from '@/lib/vendor/registration-model.mjs';

type Fields = ReturnType<typeof initialFields>;
export function RegistrationReview({ fields, trades, certifications, uploads, onEdit, locked }: {
  fields: Fields; trades: string[]; certifications: Record<string, boolean>; uploads: Record<string, RegistrationUpload>; onEdit: (step: number) => void; locked: boolean;
}) {
  const groups = [
    { title: 'Company', step: 0, rows: [['Company', fields.companyName], ['Type', VENDOR_TYPES.find(type => type.value === fields.type)?.label], ['Trade licence', fields.licenseNumber], ['Licensing authority', fields.licenseAuthority], ['VAT number', fields.trn], ['Year established', fields.yearEstablished], ['Company size', fields.employees], ['Website', fields.website], ['Office address', fields.address], ['City', fields.city], ['About your company', fields.about]] },
    { title: 'Trades & certifications', step: 1, rows: [['Trades', trades.join(', ')], ['Certifications', CERTIFICATIONS.filter(item => certifications[item.key]).map(item => item.label).join(', ') || 'None selected'], ['Contractor classification', fields.contractorGrade]] },
    { title: 'Contact', step: 2, rows: [['Contact name', fields.contactName], ['Job title', fields.contactTitle], ['Email', fields.email], ['Phone', fields.contactPhone]] },
  ];
  const groupCard = (group: (typeof groups)[number]) => <section className="ams-reg-review-group" key={group.title}>
      <header><h3>{group.title}</h3>{!locked && <button type="button" onClick={() => onEdit(group.step)} aria-label={'Edit ' + group.title}>Edit</button>}</header>
      <dl>{group.rows.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </section>;
  return <div className="ams-reg-review">
    <div className="ams-reg-review-column">{groupCard(groups[0])}{groupCard(groups[2])}</div>
    <div className="ams-reg-review-column">{groupCard(groups[1])}
    <section className="ams-reg-review-group"><header><h3>Documents</h3>{!locked && <button type="button" onClick={() => onEdit(3)}>Edit documents</button>}</header>
      <ul>{DOCUMENTS.filter(document => uploads[document.key]).map(document => { const upload = uploads[document.key]; return <li key={document.key}><strong>{document.label}</strong><span>{upload.filename}</span>{document.hasExpiry && <span>Expires {upload.expiryDate}</span>}{upload.uploaded && <small>Uploaded</small>}{upload.error && <small className="ams-reg-review-error">Upload needs retry</small>}</li>; })}</ul>
    </section></div>
  </div>;
}
