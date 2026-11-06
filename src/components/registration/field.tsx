import type { ReactNode } from 'react';

export function RegistrationField({ name, label, wide = false, children }: { name: string; label: string; wide?: boolean; children: ReactNode }) {
  const required = label.indexOf('*');
  return <div className={'ams-reg-field' + (wide ? ' ams-reg-field-wide' : '')}>
    <label htmlFor={'ams-reg-' + name}>{required < 0 ? label : <>{label.slice(0, required)}<span className="ams-reg-required">*</span>{label.slice(required + 1)}</>}</label>{children}
  </div>;
}
