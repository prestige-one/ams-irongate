'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
export function VendorSignOut() {
 const [busy,setBusy]=useState(false); const [error,setError]=useState(false); const locked=useRef(false); const router=useRouter();
 async function logout(){if(locked.current)return;locked.current=true;setBusy(true);setError(false);try{const response=await fetch('/api/vendor/logout',{method:'POST',credentials:'same-origin'});if(!response.ok)throw new Error();router.replace('/sign-in');router.refresh();}catch{setError(true);locked.current=false;setBusy(false);}}
 return <div><button className="ams-pill-button ams-button" onClick={logout} disabled={busy}>{busy?'Signing out…':'Sign out'}</button>{error&&<p role="alert">Unable to sign out. Please try again.</p>}</div>;
}
