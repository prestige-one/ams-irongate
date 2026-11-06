'use client';

import { useId, useRef, type PointerEvent } from 'react';

/** Native keyboard control + pointer capture. Dragging updates one CSS property, not React state. */
export function ImageComparison() {
  const stage = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const helpId = 'ams-comparison-help-' + useId();
  function reveal(value: number) {
    const percentage = Math.min(100, Math.max(0, Math.round(value)));
    stage.current?.style.setProperty('--ams-compare-position', percentage + '%');
    if (input.current) {
      input.current.value = String(percentage);
      input.current.setAttribute('aria-valuetext', percentage + '% render, ' + (100 - percentage) + '% reality');
    }
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width) reveal((event.clientX - bounds.left) / bounds.width * 100);
  }
  function start(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    input.current?.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    move(event);
  }
  function finish(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }
  return <figure className="ams-comparison">
    <div className="ams-comparison-stage" ref={stage}
      onPointerDown={start}
      onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) move(event); }}
      onPointerUp={finish} onPointerCancel={finish}>
      <img className="ams-comparison-image" src="/images/comparison/actual-image-1280.webp"
        srcSet="/images/comparison/actual-image-640.webp 640w, /images/comparison/actual-image-1280.webp 1280w"
        sizes="(max-width:900px) 92vw, (max-width:1608px) 57vw, 870px" width="1672" height="941" loading="lazy" decoding="async" draggable={false}
        alt="Actual image of the stone and glass villa with a landscaped pool terrace" />
      <span className="ams-comparison-tag ams-comparison-tag-reality">Reality</span>
      <div className="ams-comparison-render">
        <img className="ams-comparison-image" src="/images/comparison/render-image-1280.webp"
          srcSet="/images/comparison/render-image-640.webp 640w, /images/comparison/render-image-1280.webp 1280w"
          sizes="(max-width:900px) 92vw, (max-width:1608px) 57vw, 870px" width="1672" height="941" loading="lazy" decoding="async" draggable={false}
          alt="Architectural render of the same villa and pool terrace" />
        <span className="ams-comparison-tag ams-comparison-tag-render">Render</span>
      </div>
      <div className="ams-comparison-divider" aria-hidden="true"><span className="ams-comparison-grip">
        <svg viewBox="0 0 32 24" fill="none"><path d="m10 7-5 5 5 5m12-10 5 5-5 5M16 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span></div>
      <input ref={input} className="ams-comparison-range" type="range" min="0" max="100" step="1" defaultValue="50"
        aria-label="Render versus reality comparison" aria-describedby={helpId}
        aria-valuetext="50% render, 50% reality" onInput={event => reveal(event.currentTarget.valueAsNumber)} />
    </div>
    <figcaption id={helpId}><span className="ams-comparison-caption-mark" aria-hidden="true" />Drag the divider to compare<span className="ams-comparison-keyboard-help">. Use arrow keys, Home or End when the slider is focused.</span></figcaption>
  </figure>;
}
