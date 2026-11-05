import type { ReactNode } from 'react';

/** Lightweight architectural corner marks shared by homepage headings. */
export function TitleFrame({ children }: { children: ReactNode }) {
  return <span className="ams-title-frame">{children}</span>;
}
