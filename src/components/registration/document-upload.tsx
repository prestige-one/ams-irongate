'use client';

import { useState, type DragEvent } from 'react';
import { ACCEPTED_FILES } from '@/lib/vendor/registration-model.mjs';

export type RegistrationUpload = { file: File | null; filename: string; size: number; expiryDate: string; uploaded?: boolean; error?: string };
type DocumentType = { key: string; label: string; hasExpiry: boolean; initialRequired: boolean; approvalRequired?: boolean };
export function RegistrationDocument({ document, upload, onPick, onRemove, onExpiry, invalid }: {
  document: DocumentType; upload?: RegistrationUpload; onPick: (file: File) => Promise<void>; onRemove: () => void; onExpiry: (value: string) => void; invalid?: boolean;
}) {
  const [dragging, setDragging] = useState(false);
  const [checking, setChecking] = useState(false);
  async function pick(file?: File) { if (!file || checking) return; setChecking(true); try { await onPick(file); } finally { setChecking(false); } }
  function drop(event: DragEvent<HTMLDivElement>) { event.preventDefault(); setDragging(false); if (event.dataTransfer.files.length === 1) void pick(event.dataTransfer.files[0]); }
  return <div className="ams-reg-upload" id={'ams-reg-' + document.key} tabIndex={-1} data-dragging={dragging} data-invalid={invalid || undefined}
    onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={drop}>
    <div className="ams-reg-upload-copy"><p>{document.label}{document.initialRequired && <span className="ams-reg-required"> *</span>}</p>
      <span title={upload?.filename}>{checking ? 'Checking file…' : upload ? upload.filename : document.initialRequired ? 'Required to register' : document.approvalRequired ? 'Required for approval · can follow later' : 'Optional'}</span>
      {upload?.error && <small>{upload.error}</small>}{upload?.uploaded && <small className="ams-reg-uploaded">Uploaded successfully</small>}
    </div>
    {upload && document.hasExpiry && <label className="ams-reg-expiry" htmlFor={'ams-reg-' + document.key + '-expiry'}>Expires <span className="ams-reg-required">*</span>
      <input type="date" id={'ams-reg-' + document.key + '-expiry'} aria-label={document.label + ' expiry date'} value={upload.expiryDate} onChange={event => onExpiry(event.target.value)} />
    </label>}
    {!upload?.uploaded && <div className="ams-reg-upload-controls"><label className="ams-reg-file-button">{upload ? 'Replace' : 'Choose file'}
      <input type="file" className="ams-sr-only" accept={ACCEPTED_FILES} aria-label={'Upload ' + document.label} disabled={checking} onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void pick(file); }} />
    </label>{upload && <button type="button" className="ams-reg-remove" aria-label={'Remove ' + document.label} onClick={onRemove}>×</button>}</div>}
  </div>;
}
