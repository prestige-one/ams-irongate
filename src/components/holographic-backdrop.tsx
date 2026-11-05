'use client';
import { useEffect, useRef, useState } from 'react';
import type { HolographicRenderer } from '@/lib/holographic-renderer';

export function HolographicBackdrop(){
  const imageRef=useRef<HTMLImageElement>(null), canvasRef=useRef<HTMLCanvasElement>(null), rendererRef=useRef<HolographicRenderer|null>(null);
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    let disposed=false;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    let enabled=!preference.matches;
    const change=()=>{enabled=!preference.matches;rendererRef.current?.setMotion(enabled);};
    preference.addEventListener('change',change);
    async function start(){
      try{
        // Load the tiny animation module alongside the visible poster.
        const [, {createHolographicRenderer}] = await Promise.all([
          imageRef.current!.decode(), import('@/lib/holographic-renderer')
        ]);
        if(disposed)return;
        rendererRef.current=createHolographicRenderer(canvasRef.current!,imageRef.current!,enabled);
        setReady(true);
      }catch{/* Keep the static poster when WebGL is unavailable. */}
    }
    start();
    return()=>{disposed=true;preference.removeEventListener('change',change);rendererRef.current?.dispose();rendererRef.current=null;};
  },[]);
  return <>
    <div className="ams-hero-art" aria-hidden="true">
      <img ref={imageRef} className="ams-hero-image" src="/images/monochrome-building.webp" srcSet="/images/monochrome-building-720.webp 720w, /images/monochrome-building-1080.webp 1080w, /images/monochrome-building-1600.webp 1600w, /images/monochrome-building-1882.webp 1882w" sizes="(max-width:760px) 190vw, 100vw" width="1882" height="836" fetchPriority="high" alt="" />
      <canvas ref={canvasRef} className={`ams-holographic-canvas${ready?' ams-holographic-ready':''}`} />
    </div>
    <div className="ams-hero-shade" aria-hidden="true" />

  </>;
}
