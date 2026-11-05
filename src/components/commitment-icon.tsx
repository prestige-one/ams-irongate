type CommitmentIconName = 'engineering' | 'safety' | 'craft' | 'quality';

export function CommitmentIcon({ name }: { name: CommitmentIconName }) {
  return <svg className="ams-commitment-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {name === 'engineering' && <><circle cx="24" cy="12" r="5" /><path d="M24 3v4M21 16 8 43l5-2 11-22 11 22 5 2-13-27M14 31h20M24 24v6M21 12h6" /></>}
    {name === 'safety' && <><path d="M24 4c-6 4-12 6-17 7v13c0 10 7 16 17 21 10-5 17-11 17-21V11c-5-1-11-3-17-7Z" /><path d="m16 24 6 6 12-13" /></>}
    {name === 'craft' && <><path d="m5 18 27-14 11 6-27 14-11-6Zm0 0v13l27 14 11-6V26L32 20M16 24v13M32 32v13M16 24l27 15M5 31l11-6M32 20l11-6v-4" /></>}
    {name === 'quality' && <><circle cx="24" cy="24" r="20" /><path d="m13 24 8 8 15-17" /></>}
  </svg>;
}
