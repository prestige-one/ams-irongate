export class VendorApiError extends Error {
  constructor(message, status = 0) { super(message); this.name = 'VendorApiError'; this.status = status; }
}
async function request(url, options) {
  try { return await fetch(url, options); }
  catch (error) { if (error?.name === 'AbortError') throw error; throw new VendorApiError('Your connection was interrupted. Please check your connection and try again.'); }
}
async function responseData(response) {
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.ok !== true) throw new VendorApiError(data?.error || 'We could not complete that request. Please try again.', response.status);
  return data;
}
export async function registerVendor(payload, signal) {
  const response = await request('/api/vendor/register', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal });
  return responseData(response);
}
export async function uploadVendorDocument(docType, upload, signal) {
  const body = new FormData(); body.set('file', upload.file); body.set('docType', docType); body.set('expiryDate', upload.expiryDate);
  const response = await request('/api/vendor/documents', { method: 'POST', credentials: 'same-origin', body, signal });
  return responseData(response);
}

export async function sendVendorAuth(endpoint, payload, signal) {
  if (!['login', 'forgot'].includes(endpoint)) throw new VendorApiError('Invalid request.');
  return responseData(await request('/api/vendor/' + endpoint, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal }));
}
