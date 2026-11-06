type VendorDocumentProps = { title: string; required: boolean };

/** A requirement, not an uploaded-document state or interactive checkbox. */
export function VendorDocument({ title, required }: VendorDocumentProps) {
  return <li className={'ams-vendor-document' + (required ? ' ams-vendor-document-required' : '')}>
    <svg className="ams-vendor-document-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M8.5 12L11 14.5L15.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span className="ams-vendor-document-name">{title}</span>
    <span className="ams-vendor-document-status">{required ? 'Required' : 'Optional'}</span>
  </li>;
}
