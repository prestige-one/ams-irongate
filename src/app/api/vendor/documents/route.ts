import { proxyVendorRequest } from '@/lib/vendor/api-proxy.mjs';

export const runtime = 'nodejs';
export const maxDuration = 60;
export async function POST(request: Request) {
  return proxyVendorRequest(request, 'documents');
}
