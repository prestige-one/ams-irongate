export function authPayload(data, mode = 'login') {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const email = typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';
  if (email.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (mode === 'forgot') return { email };
  if (typeof data.password !== 'string' || !data.password.length || data.password.length > 200) return null;
  return { email, password: data.password };
}
