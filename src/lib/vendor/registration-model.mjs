// Registration contract recovered from intruderfr/ams-irongate (main).
export const MAX_FILE_BYTES = 4 * 1024 * 1024;
export const MAX_TRADES = 12;
export const ACCEPTED_FILES = '.pdf,.jpg,.jpeg,.png';
export const STEPS = ['Company', 'Trades', 'Contact', 'Documents', 'Review'];
export const VENDOR_TYPES = [
  { value: 'SUBCONTRACTOR', label: 'Subcontractor' }, { value: 'SUPPLIER', label: 'Supplier' },
  { value: 'MANUFACTURER', label: 'Manufacturer' }, { value: 'CONSULTANT', label: 'Consultant' },
  { value: 'SERVICE_PROVIDER', label: 'Service provider' },
];
export const TRADES = [
  "Piling & Excavation", "Civil & Structural", "Formwork & Rebar", "Concrete Supply", "Blockwork & Plaster",
  "Façade & Glazing", "Aluminium & Metalwork", "Waterproofing", "HVAC", "Electrical", "Plumbing & Drainage",
  "Fire & Life Safety", "Lifts & Escalators", "Joinery & Carpentry", "Flooring & Stone", "Ceilings & Partitions",
  "Painting & Coatings", "Interior Fit-Out", "Pools & Water Features", "Landscaping", "Building Materials",
  "Plant & Equipment Hire", "Scaffolding", "Design & Engineering", "Testing & Commissioning", "Other",
];
export const EMPLOYEE_BANDS = ['1–10', '11–50', '51–200', '201–500', '500+'];
export const CERTIFICATIONS = [
  { key: 'iso9001', label: 'ISO 9001 Quality' }, { key: 'iso14001', label: 'ISO 14001 Environment' },
  { key: 'iso45001', label: 'ISO 45001 Health & Safety' },
];
export const DOCUMENTS = [
  { key: 'TRADE_LICENCE', label: 'Trade licence', initialRequired: true, hasExpiry: true },
  { key: 'VAT_CERTIFICATE', label: 'VAT certificate', initialRequired: false, hasExpiry: false, approvalRequired: true },
  { key: 'COMPANY_PROFILE', label: 'Company profile', initialRequired: false, hasExpiry: false, approvalRequired: true },
  { key: 'INSURANCE', label: 'Insurance certificate', initialRequired: false, hasExpiry: true, approvalRequired: true },
  { key: 'ISO_CERTIFICATE', label: 'ISO certificate', initialRequired: false, hasExpiry: true },
  { key: 'BANK_LETTER', label: 'Bank details letter', initialRequired: false, hasExpiry: false },
];
export function initialFields() {
  return { companyName: '', type: 'SUBCONTRACTOR', about: '', yearEstablished: '', employees: '', website: '', address: '', city: 'Dubai', country: 'United Arab Emirates', licenseNumber: '', licenseAuthority: '', trn: '', contractorGrade: '', contactName: '', contactTitle: '', contactPhone: '', email: '', password: '', confirm: '' };
}
export const textLimits = { companyName: 200, about: 2000, employees: 20, website: 200, address: 300, city: 120, country: 120, licenseNumber: 80, licenseAuthority: 120, trn: 30, contractorGrade: 80, contactName: 120, contactTitle: 120, contactPhone: 40, email: 200 };
export function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}
export function fileKind(bytes) {
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return 'application/pdf';
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a) return 'image/png';
  return null;
}
export function fileProblem(file, bytes) {
  if (!file.size) return 'Choose a non-empty document.';
  if (file.size > MAX_FILE_BYTES) return 'Each document must be 4 MB or smaller.';
  if (!/\.(pdf|jpe?g|png)$/i.test(file.name) || !fileKind(bytes)) return 'Please choose a PDF, JPG or PNG document.';
  return null;
}
export function validateStep(step, fields, trades, uploads = {}, accepted = false) {
  const problem = (field, message) => ({ step, field, message });
  const value = key => String(fields[key] ?? '').trim();
  if (step === 0) {
    if (value('companyName').length < 2) return problem('companyName', 'Enter your company name.');
    if (!VENDOR_TYPES.some(type => type.value === fields.type)) return problem('type', 'Choose your company type.');
    if (value('licenseNumber').length < 2) return problem('licenseNumber', 'Enter your trade licence number.');
    if (value('yearEstablished') && (!/^\d{4}$/.test(value('yearEstablished')) || Number(fields.yearEstablished) < 1850 || Number(fields.yearEstablished) > new Date().getFullYear())) return problem('yearEstablished', 'Enter a valid year of establishment.');
    if (value('website')) { try { const url = new URL(/^https?:\/\//i.test(value('website')) ? value('website') : 'https://' + value('website')); if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error(); } catch { return problem('website', 'Enter a valid company website.'); } }
  }
  if (step === 1) {
    if (!trades.length) return problem('trades', 'Choose at least one trade.');
    if (trades.length > MAX_TRADES || new Set(trades).size !== trades.length || trades.some(trade => !TRADES.includes(trade))) return problem('trades', 'Choose up to 12 different trades from the list.');
  }
  if (step === 2) {
    if (value('contactName').length < 2) return problem('contactName', 'Enter a contact name.');
    if (value('contactPhone').length < 6) return problem('contactPhone', 'Enter a contact phone number.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value('email')) || value('email').length > 200) return problem('email', 'Enter a valid email address.');
    if (String(fields.password ?? '').length < 10) return problem('password', 'Use a password of at least 10 characters.');
    if (new TextEncoder().encode(fields.password).length > 72) return problem('password', 'Your password is too long. Please use a shorter password.');
    if (fields.password !== fields.confirm) return problem('confirm', 'The two passwords do not match.');
  }
  if (step < 3) { for (const [key, limit] of Object.entries(textLimits)) if (value(key).length > limit) return problem(key, 'Please shorten this field.'); }
  if (step === 3) {
    if (!uploads.TRADE_LICENCE) return problem('TRADE_LICENCE', 'Please add your trade licence. Other documents can follow from your portal.');
    for (const document of DOCUMENTS) {
      const upload = uploads[document.key];
      if (upload && document.hasExpiry && !validDate(upload.expiryDate)) return problem(document.key + '-expiry', 'Add a valid expiry date for your ' + document.label.toLowerCase() + '.');
    }
  }
  if (step === 4 && !accepted) return problem('accepted', 'Please confirm that you are authorised to register this company.');
  return null;
}
export function registrationPayload(fields, trades, certifications, accepted, trap = '') {
  const { confirm, ...rest } = fields;
  for (const key of Object.keys(rest)) if (key !== 'password') rest[key] = String(rest[key]).trim();
  return { ...rest, email: rest.email.toLowerCase(), trades, ...certifications, accepted, company_website: trap };
}
