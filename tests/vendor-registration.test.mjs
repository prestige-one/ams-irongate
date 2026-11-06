import test from 'node:test';
import assert from 'node:assert/strict';
import { DOCUMENTS, MAX_FILE_BYTES, TRADES, fileProblem, initialFields, registrationPayload, validDate, validateStep } from '../src/lib/vendor/registration-model.mjs';
import { proxyVendorRequest } from '../src/lib/vendor/api-proxy.mjs';

const fields = () => ({ ...initialFields(), companyName: 'Synthetic Test Company', licenseNumber: 'TEST-123', contactName: 'Preview Tester', contactPhone: '+971 50 000 0000', email: 'preview@example.test', password: 'Testing-12345', confirm: 'Testing-12345' });
const payload = () => registrationPayload(fields(), [TRADES[0]], { iso9001: true, iso14001: false, iso45001: false }, true);
const options = fetchImpl => ({ upstreamOrigin: 'https://legacy.example', fetchImpl });
const jsonRequest = (data = payload(), extra = {}) => new Request('https://new.example/api/vendor/register', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://new.example', ...extra }, body: JSON.stringify(data) });
const noFetch = async () => { throw new Error('Unexpected upstream request'); };
function docRequest({ type = 'TRADE_LICENCE', expiry = '2028-04-21', bytes = new Uint8Array([37,80,68,70,45,49,46,55]), name = 'licence.pdf', cookie = 'other=no; ams_staff=private; ams_vendor=vendor.test.token' } = {}) {
  const body = new FormData(); body.set('docType', type); body.set('expiryDate', expiry); body.set('file', new File([bytes], name, { type: 'application/pdf' }));
  return new Request('https://new.example/api/vendor/documents', { method: 'POST', headers: { Cookie: cookie, Origin: 'https://new.example' }, body });
}

test('registration validates company, trade limits, credentials and confirmation before submission', () => {
  assert.equal(validateStep(0, fields(), [], {}), null);
  assert.equal(validateStep(0, { ...fields(), companyName: ' ' }, [], {}).field, 'companyName');
  assert.equal(validateStep(0, { ...fields(), yearEstablished: '2999' }, [], {}).field, 'yearEstablished');
  assert.equal(validateStep(1, fields(), [], {}).field, 'trades');
  assert.equal(validateStep(1, fields(), TRADES.slice(0, 12), {}), null);
  assert(validateStep(1, fields(), TRADES.slice(0, 13), {}));
  assert(validateStep(1, fields(), [TRADES[0], TRADES[0]], {}));
  assert(validateStep(1, fields(), ['Unknown'], {}));
  assert.equal(validateStep(2, { ...fields(), email: 'not-an-email' }, [], {}).field, 'email');
  assert.equal(validateStep(2, { ...fields(), password: 'short' }, [], {}).field, 'password');
  assert.equal(validateStep(2, { ...fields(), confirm: 'different' }, [], {}).field, 'confirm');
  assert(validateStep(2, { ...fields(), password: '😀'.repeat(20), confirm: '😀'.repeat(20) }, [], {}));
  assert.equal(validateStep(4, fields(), [], {}, false).field, 'accepted');
});

test('only the trade licence is initially mandatory; selected expiry documents need real calendar dates', () => {
  const uploads = { TRADE_LICENCE: { expiryDate: '2028-04-21' } };
  assert.equal(validateStep(3, fields(), [], uploads), null);
  assert.equal(validateStep(3, fields(), [], {}).field, 'TRADE_LICENCE');
  assert.equal(validateStep(3, fields(), [], { ...uploads, INSURANCE: { expiryDate: '' } }).field, 'INSURANCE-expiry');
  assert.equal(validDate('2027-02-29'), false); assert.equal(validDate('2028-02-29'), true);
  assert.equal(validateStep(3, fields(), [], { ...uploads, ISO_CERTIFICATE: { expiryDate: '2028-02-30' } }).field, 'ISO_CERTIFICATE-expiry');
});

test('payload keeps legacy keys, omits confirmation, trims profile data and preserves password bytes', () => {
  const result = registrationPayload({ ...fields(), companyName: '  Test Co  ', email: 'TEST@EXAMPLE.TEST', password: '  Testing12345  ' }, [TRADES[0]], { iso9001: true }, true);
  assert.equal(result.companyName, 'Test Co'); assert.equal(result.email, 'test@example.test'); assert.equal(result.password, '  Testing12345  '); assert(!('confirm' in result)); assert.equal(result.accepted, true);
});

test('document validation checks bytes, extensions and the 4 MB limit rather than trusting browser MIME', () => {
  const pdf = new Uint8Array([37,80,68,70]);
  assert.equal(fileProblem({ name: 'licence.pdf', size: MAX_FILE_BYTES }, pdf), null);
  assert(fileProblem({ name: 'licence.pdf', size: MAX_FILE_BYTES + 1 }, pdf));
  assert(fileProblem({ name: 'malware.exe', size: 10 }, pdf));
  assert(fileProblem({ name: 'spoof.pdf', size: 10 }, new Uint8Array([60,104,116,109])));
  assert(fileProblem({ name: 'empty.pdf', size: 0 }, pdf));
});

test('registration proxy forwards the exact API contract and only the vendor session cookie', async () => {
  let calls = 0;
  const response = await proxyVendorRequest(jsonRequest({ ...payload(), role: 'ADMIN', confirm: 'must-not-forward' }), 'register', options(async (url, init) => {
    calls++; assert.equal(String(url), 'https://legacy.example/api/vendor/register');
    const body = JSON.parse(init.body); assert.equal(body.email, 'preview@example.test'); assert(!('role' in body)); assert(!('confirm' in body)); assert.equal(init.redirect, 'manual');
    return Response.json({ ok: true }, { headers: { 'Set-Cookie': 'ams_vendor=session.test.token; Path=/; Secure; HttpOnly; SameSite=Lax' } });
  }));
  assert.equal(response.status, 200); assert.equal(calls, 1);
  assert.match(response.headers.get('set-cookie'), /^ams_vendor=session.test.token;/); assert.match(response.headers.get('set-cookie'), /HttpOnly/); assert.match(response.headers.get('set-cookie'), /Secure/); assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('invalid registration and foreign-origin requests are rejected without contacting the legacy app', async () => {
  for (const data of [{ ...payload(), accepted: false }, { ...payload(), trades: [] }, { ...payload(), company_website: 'bot-filled' }, { ...payload(), iso9001: 'true' }, { ...payload(), country: '' }]) {
    const response = await proxyVendorRequest(jsonRequest(data), 'register', options(noFetch)); assert.equal(response.status, 400);
  }
  assert.equal((await proxyVendorRequest(jsonRequest(payload(), { Origin: 'https://attacker.example' }), 'register', options(noFetch))).status, 403);
});

test('proxy rejects recursive, credential-bearing and non-TLS external origins', async () => {
  for (const upstreamOrigin of ['https://new.example', 'http://remote.example', 'https://user:pass@legacy.example', 'https://legacy.example/private']) {
    const response = await proxyVendorRequest(jsonRequest(), 'register', { upstreamOrigin, fetchImpl: noFetch }); assert.equal(response.status, 503);
  }
});

test('proxy limits request bodies even when content-length is absent', async () => {
  const request = new Request('https://new.example/api/vendor/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'x'.repeat(65537) });
  assert.equal((await proxyVendorRequest(request, 'register', options(noFetch))).status, 413);
});

test('authenticated uploads forward multipart fields and exclude staff or unrelated cookies', async () => {
  const response = await proxyVendorRequest(docRequest(), 'documents', options(async (url, init) => {
    assert.equal(String(url), 'https://legacy.example/api/vendor/documents'); assert.equal(init.headers.get('cookie'), 'ams_vendor=vendor.test.token');
    assert(init.body instanceof FormData); assert.equal(init.body.get('docType'), 'TRADE_LICENCE'); assert.equal(init.body.get('expiryDate'), '2028-04-21'); assert.equal(init.body.get('file').name, 'licence.pdf');
    return Response.json({ ok: true, id: 'test-doc-id' });
  }));
  assert.equal(response.status, 200); assert.deepEqual(await response.json(), { ok: true, id: 'test-doc-id' });
});

test('uploads enforce authentication, type, size and document expiry before any upstream write', async () => {
  assert.equal((await proxyVendorRequest(docRequest({ cookie: '' }), 'documents', options(noFetch))).status, 401);
  assert.equal((await proxyVendorRequest(docRequest({ type: 'UNKNOWN' }), 'documents', options(noFetch))).status, 400);
  assert.equal((await proxyVendorRequest(docRequest({ expiry: '2027-02-30' }), 'documents', options(noFetch))).status, 400);
  assert.equal((await proxyVendorRequest(docRequest({ bytes: new Uint8Array([60,104,116,109]) }), 'documents', options(noFetch))).status, 415);
  assert.equal((await proxyVendorRequest(docRequest({ bytes: new Uint8Array(MAX_FILE_BYTES + 1) }), 'documents', options(noFetch))).status, 413);
});

test('API errors and unavailable services never turn into a fake success', async () => {
  const duplicate = await proxyVendorRequest(jsonRequest(), 'register', options(async () => Response.json({ error: 'An account with this email already exists.' }, { status: 409 })));
  assert.equal(duplicate.status, 409);
  const noSession = await proxyVendorRequest(jsonRequest(), 'register', options(async () => Response.json({ ok: true })));
  assert.equal(noSession.status, 502);
  const unavailable = await proxyVendorRequest(jsonRequest(), 'register', options(async () => { throw new Error('offline'); })); assert.equal(unavailable.status, 504);
  const html = await proxyVendorRequest(jsonRequest(), 'register', options(async () => new Response('<html>unavailable</html>', { status: 503 }))); assert.equal(html.status, 502);
});


test('browser-facing Host is used behind Next internal URLs without weakening cross-site checks', async () => {
  const proxied = new Request('http://localhost:3000/api/vendor/register', { method: 'POST', headers: { Host: 'new.example', Origin: 'https://new.example', 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) });
  const response = await proxyVendorRequest(proxied, 'register', options(async () => Response.json({ ok: true }, { headers: { 'Set-Cookie': 'ams_vendor=proxied.session.token; Path=/; HttpOnly' } })));
  assert.equal(response.status, 200); assert.match(response.headers.get('set-cookie'), /Secure/);
  const loop = new Request('http://localhost:3000/api/vendor/register', { method: 'POST', headers: { Host: 'legacy.example', Origin: 'https://legacy.example', 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) });
  assert.equal((await proxyVendorRequest(loop, 'register', options(noFetch))).status, 503);
});

test('an upload response must include its persisted document ID', async () => {
  const response = await proxyVendorRequest(docRequest(), 'documents', options(async () => Response.json({ ok: true })));
  assert.equal(response.status, 502);
});
