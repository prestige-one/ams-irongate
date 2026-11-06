import test from 'node:test';
import assert from 'node:assert/strict';
import { authPayload } from '../src/lib/vendor/auth-model.mjs';
import { proxyVendorRequest } from '../src/lib/vendor/api-proxy.mjs';
const request=(body,endpoint='login',origin='https://new.example')=>new Request('https://new.example/api/vendor/'+endpoint,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
const options=fetchImpl=>({upstreamOrigin:'https://legacy.example',fetchImpl});
const unused=()=>{throw new Error('Must not call backend');};
test('login accepts legacy short passwords, normalizes email and preserves password bytes',()=>{
 assert.deepEqual(authPayload({email:'  TEST@example.test ',password:' x ',role:'admin'}),{email:'test@example.test',password:' x '});
 for(const body of [null,[],{email:'bad',password:'x'},{email:'ok@example.test',password:''},{email:'ok@example.test',password:'a'.repeat(201)}])assert.equal(authPayload(body),null);
 assert.deepEqual(authPayload({email:'t@example.test',password:'ignored'},'forgot'),{email:'t@example.test'});
});
test('login forwards only credentials and requires a vendor session before success',async()=>{
 const response=await proxyVendorRequest(request({email:' TEST@example.test ',password:'old',role:'staff'}),'login',options(async(url,init)=>{
  assert.equal(String(url),'https://legacy.example/api/vendor/login');
  assert.deepEqual(JSON.parse(init.body),{email:'test@example.test',password:'old'});
  assert.equal(init.headers.get('cookie'),null);assert.equal(init.redirect,'manual');
  return Response.json({ok:true},{headers:{'Set-Cookie':'ams_vendor=signed.test.token; HttpOnly; Secure'}});
 }));
 assert.equal(response.status,200);assert.match(response.headers.get('set-cookie'),/HttpOnly; SameSite=Lax; Max-Age=604800; Secure/);
 const missing=await proxyVendorRequest(request({email:'t@example.test',password:'x'}),'login',options(async()=>Response.json({ok:true})));
 assert.equal(missing.status,502);
});
test('login preserves credential failures and account lockout; rejects invalid and cross-origin requests',async()=>{
 for(const status of [401,429]){
  const response=await proxyVendorRequest(request({email:'t@example.test',password:'x'}),'login',options(async()=>Response.json({error:'Try again later.'},{status})));
  assert.equal(response.status,status);assert.equal(response.headers.get('set-cookie'),null);
 }
 assert.equal((await proxyVendorRequest(request({email:'bad',password:'x'}),'login',options(unused))).status,400);
 assert.equal((await proxyVendorRequest(request({email:'t@example.test',password:'x'},'login','https://other.example'),'login',options(unused))).status,403);
});
test('recovery sends only an email and cannot leak backend account information',async()=>{
 const response=await proxyVendorRequest(request({email:' T@example.test ',password:'ignored'},'forgot'),'forgot',options(async(url,init)=>{
  assert.equal(String(url),'https://legacy.example/api/vendor/forgot');assert.deepEqual(JSON.parse(init.body),{email:'t@example.test'});
  return Response.json({ok:true,accountExists:true});
 }));
 assert.deepEqual(await response.json(),{ok:true});assert.equal(response.headers.get('set-cookie'),null);
});
test('logout clears only vendor cookie and rejects cross-site requests',async()=>{
 const response=await proxyVendorRequest(request({},'logout'),'logout',options(unused));
 assert.equal(response.status,200);assert.match(response.headers.get('set-cookie'),/^ams_vendor=;.*Max-Age=0/);assert.doesNotMatch(response.headers.get('set-cookie'),/ams_staff/);
 assert.equal((await proxyVendorRequest(request({},'logout','https://other.example'),'logout',options(unused))).status,403);
});
