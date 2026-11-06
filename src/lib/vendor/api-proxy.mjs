import { authPayload } from './auth-model.mjs';
import { DOCUMENTS, MAX_FILE_BYTES, fileKind, initialFields, textLimits, validDate, validateStep } from './registration-model.mjs';

const ENDPOINTS = { register: '/api/vendor/register', documents: '/api/vendor/documents', login: '/api/vendor/login', forgot: '/api/vendor/forgot', logout: '/api/vendor/logout' };
const DEFAULT_ORIGIN = 'https://ams-irongate.vercel.app';
const localHost = host => ['localhost', '127.0.0.1', '[::1]'].includes(host);
const failure = (error, status = 400) => Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function limitedBody(request, limit) {
  if (Number(request.headers.get('content-length')) > limit) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks = []; let length = 0;
  try { while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > limit) { await reader.cancel(); throw new RangeError(); } chunks.push(value); } }
  finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}
/** Fixed legacy endpoints only. Credentials and document contents are never logged. */
export async function proxyVendorRequest(request, endpoint, options = {}) {
  if (!Object.hasOwn(ENDPOINTS, endpoint)) return failure('Not found.', 404);
  const current = new URL(request.url);
  // Next may expose an internal localhost URL. Host identifies the browser-facing site.
  let publicURL;
  try { publicURL = new URL(current.protocol + '//' + (request.headers.get('host') || current.host)); }
  catch { return failure('Please submit this form from the website.', 403); }
  const origin = request.headers.get('origin');
  if (origin) {
    try { const supplied = new URL(origin); if (supplied.origin !== origin || supplied.host !== publicURL.host || !['http:', 'https:'].includes(supplied.protocol)) throw new Error(); }
    catch { return failure('Please submit this form from the website.', 403); }
  }
  if (endpoint === 'logout') {
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store', 'Set-Cookie': 'ams_vendor=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0' + (localHost(publicURL.hostname) && publicURL.protocol === 'http:' ? '' : '; Secure') } });
  }
  let upstream;
  try {
    upstream = new URL(options.upstreamOrigin ?? process.env.AMS_VENDOR_API_ORIGIN ?? DEFAULT_ORIGIN);
    if (upstream.username || upstream.password || upstream.search || upstream.hash || upstream.pathname !== '/' || upstream.host === publicURL.host || (upstream.protocol !== 'https:' && !(upstream.protocol === 'http:' && localHost(upstream.hostname)))) throw new Error();
  } catch { return failure('Vendor service is temporarily unavailable. Please contact our team.', 503); }
  const fetchImpl = options.fetchImpl ?? fetch;
  const headers = new Headers({ Accept: 'application/json' });
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (clientIp) headers.set('x-forwarded-for', clientIp);
  let body;
  try {
    if (endpoint === 'login' || endpoint === 'forgot') {
      if (!request.headers.get('content-type')?.startsWith('application/json')) return failure('Please check your sign-in details.');
      let data; try { data = JSON.parse(new TextDecoder().decode(await limitedBody(request, 4096))); } catch (error) { if (error instanceof RangeError) throw error; return failure('Please check your sign-in details.'); }
      const payload = authPayload(data, endpoint);
      if (!payload) return failure(endpoint === 'forgot' ? 'Enter a valid email address.' : 'Enter your email and password.');
      body = JSON.stringify(payload); headers.set('Content-Type', 'application/json');
    } else if (endpoint === 'register') {
      if (!request.headers.get('content-type')?.startsWith('application/json')) return failure('Please submit a valid registration.');
      let data;
      try { data = JSON.parse(new TextDecoder().decode(await limitedBody(request, 65536))); } catch (error) { if (error instanceof RangeError) throw error; return failure('Please submit a valid registration.'); }
      if (!data || typeof data !== 'object' || Array.isArray(data)) return failure('Please submit a valid registration.');
      if (data.company_website) return failure('Unable to process this registration.');
      const fields = initialFields();
      for (const key of Object.keys(fields)) {
        if (key === 'confirm') continue;
        if (data[key] !== undefined && typeof data[key] !== 'string') return failure('Please check the registration fields.');
        if (data[key] !== undefined) fields[key] = data[key];
      }
      fields.confirm = fields.password;
      const trades = Array.isArray(data.trades) && data.trades.every(item => typeof item === 'string') ? data.trades : [];
      for (const step of [0, 1, 2, 4]) { const issue = validateStep(step, fields, trades, {}, data.accepted === true); if (issue) return failure(issue.message); }
      if (fields.country.trim().length < 2) return failure('Enter your country.');
      for (const key of ['iso9001', 'iso14001', 'iso45001']) if (data[key] !== undefined && typeof data[key] !== 'boolean') return failure('Please check the certification choices.');
      const { confirm, ...profile } = fields;
      for (const key of Object.keys(textLimits)) profile[key] = profile[key].trim();
      profile.email = profile.email.toLowerCase();
      body = JSON.stringify({ ...profile, trades, iso9001: data.iso9001 ?? false, iso14001: data.iso14001 ?? false, iso45001: data.iso45001 ?? false, accepted: true, company_website: '' });
      headers.set('Content-Type', 'application/json');
    } else {
      const session = request.headers.get('cookie')?.split(';').map(item => item.trim()).find(item => /^ams_vendor=[A-Za-z0-9_.-]+$/.test(item));
      if (!session) return failure('Your session has expired. Please sign in before uploading documents.', 401);
      headers.set('Cookie', session);
      if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) return failure('Choose a document to upload.');
      const bytes = await limitedBody(request, MAX_FILE_BYTES + 65536);
      let form;
      try { form = await new Request(request.url, { method: 'POST', headers: { 'Content-Type': request.headers.get('content-type') }, body: bytes }).formData(); }
      catch { return failure('Choose a valid document to upload.'); }
      const file = form.get('file');
      if (!(file instanceof File) || !file.size) return failure('Choose a file to upload.');
      if (file.size > MAX_FILE_BYTES) return failure('Each document must be 4 MB or smaller.', 413);
      const document = DOCUMENTS.find(item => item.key === form.get('docType'));
      if (!document) return failure('Choose a valid document type.');
      const expiry = form.get('expiryDate') || '';
      if (typeof expiry !== 'string' || (document.hasExpiry ? !validDate(expiry) : !!expiry && !validDate(expiry))) return failure('Add a valid expiry date for this document.');
      const mime = fileKind(new Uint8Array(await file.slice(0, 8).arrayBuffer()));
      if (!mime || !/\.(pdf|jpe?g|png)$/i.test(file.name)) return failure('Please upload a PDF, JPG or PNG file.', 415);
      const cleanName = file.name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').replace(/^\.+/, '').slice(0, 150) || 'document';
      body = new FormData(); body.set('file', file, cleanName); body.set('docType', document.key); body.set('expiryDate', expiry);
    }
  } catch (error) { if (error instanceof RangeError) return failure('This upload is too large.', 413); return failure('Please check the submitted fields.'); }
  try {
    const result = await fetchImpl(new URL(ENDPOINTS[endpoint], upstream), { method: 'POST', headers, body, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(45000) });
    let data;
    try { data = JSON.parse(new TextDecoder().decode(await limitedBody(result, 65536))); } catch { return failure('Vendor service is unavailable. Please try again later.', 502); }
    if (!result.ok) return failure(typeof data.error === 'string' ? data.error.slice(0, 300) : 'Please try again later.', result.status >= 500 ? 502 : result.status);
    if (data.ok !== true) return failure('We could not confirm this request. Please try again.', 502);
    if (endpoint === 'documents' && (typeof data.id !== 'string' || !data.id)) return failure('We could not confirm this document upload. Please try again.', 502);
    const responseHeaders = new Headers({ 'Cache-Control': 'no-store' });
    if (endpoint === 'register' || endpoint === 'login') {
      const cookie = result.headers.getSetCookie().find(value => value.startsWith('ams_vendor='));
      const value = cookie?.match(/^ams_vendor=([A-Za-z0-9_.-]+)(?:;|$)/)?.[1];
      if (!value) return failure('We could not start your vendor session. Please try signing in.', 502);
      responseHeaders.set('Set-Cookie', 'ams_vendor=' + value + '; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800' + (localHost(publicURL.hostname) && (origin ? new URL(origin).protocol : publicURL.protocol) === 'http:' ? '' : '; Secure'));
    }
    return Response.json({ ok: true, ...(endpoint === 'documents' && typeof data.id === 'string' ? { id: data.id } : {}) }, { headers: responseHeaders });
  } catch (error) { return failure(error?.name === 'TimeoutError' ? 'The request timed out. Please try again.' : 'The vendor service could not be reached. Please try again.', 504); }
}
