import 'server-only';
import { limitedBody } from './api-proxy.mjs';
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
export type VendorDashboard = {
 ok: true; companyName: string; reference: string; status: string; statusText: string; note: string | null;
 compliance: { score: number; complete: boolean; items: { key: string; label: string; state: string }[] };
 events: { id: string; message: string | null; createdAt: string }[];
};
export async function vendorDashboard(): Promise<{ state: 'signed-out'; data?: never } | { state: 'unavailable'; data?: never } | { state: 'ready'; data: VendorDashboard }> {
 const token = (await cookies()).get('ams_vendor')?.value;
 if (!token || !/^[A-Za-z0-9_.-]+$/.test(token)) return { state: 'signed-out' };
 try {
  const origin = new URL(process.env.AMS_VENDOR_API_ORIGIN || 'https://ams-irongate.vercel.app');
  const host = (await headers()).get('host');
  const local = ['localhost','127.0.0.1','[::1]'].includes(origin.hostname);
  if (origin.host === host || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash || (origin.protocol !== 'https:' && !(local && origin.protocol === 'http:'))) return { state: 'unavailable' };
  const result = await fetch(new URL('/api/vendor/dashboard', origin), { headers: { Cookie: 'ams_vendor=' + token, Accept: 'application/json' }, cache: 'no-store', redirect: 'manual', signal: AbortSignal.timeout(12000) });
  if (result.status === 401) return { state: 'signed-out' };
  if (!result.ok || !result.headers.get('content-type')?.includes('application/json')) return { state: 'unavailable' };
  const data = JSON.parse(new TextDecoder().decode(await limitedBody(result, 65536)));
  if (data?.ok !== true || typeof data.companyName !== 'string' || typeof data.reference !== 'string' || typeof data.status !== 'string' || typeof data.statusText !== 'string' || typeof data.compliance?.score !== 'number' || data.compliance.score < 0 || data.compliance.score > 100 || !Array.isArray(data.compliance?.items) || !Array.isArray(data.events)) return { state: 'unavailable' };
  if (!data.compliance.items.every((item: Record<string, unknown>) => item && typeof item.key === 'string' && typeof item.label === 'string' && typeof item.state === 'string') || !data.events.every((item: Record<string, unknown>) => item && typeof item.id === 'string' && (item.message === null || typeof item.message === 'string') && typeof item.createdAt === 'string' && Number.isFinite(Date.parse(item.createdAt)))) return { state: 'unavailable' };
  return { state: 'ready', data };
 } catch { return { state: 'unavailable' }; }
}
