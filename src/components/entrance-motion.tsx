'use client';

import { useEffect } from 'react';

/** Shared, one-shot reveals. Server-rendered content stays visible without JavaScript. */
export function EntranceMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

    const elements = document.querySelectorAll<HTMLElement>('.ams-main [data-ams-reveal]');
    const pending = new Set(elements);
    const active = new Map<HTMLElement, Animation>();
    const compact = window.matchMedia('(max-width: 760px)');
    const thresholds = [0.15, 0.25, 0.35, 0.45];

    let viewportObserver: IntersectionObserver | undefined;
    const reveal = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting || !pending.has(element)) continue;
        // Wait until a meaningful part is inside the viewing area. Adapt for tall
        // mobile cards so the required visibility always remains reachable.
        const available = (entry.rootBounds?.height ?? window.innerHeight) * 0.65;
        const maximum = available / Math.max(entry.boundingClientRect.height, 1);
        const required = thresholds.filter(ratio => ratio <= maximum).at(-1) ?? thresholds[0];
        if (entry.intersectionRatio < required) continue;
        (element.dataset.amsRevealViewport === 'full' ? viewportObserver : observer)?.unobserve(element);
        pending.delete(element);
        element.dataset.amsRevealed = 'true';
        const fadeOnly = element.dataset.amsReveal === 'fade';
        const stagger = Math.min(Number(element.dataset.amsDelay) || 0, compact.matches ? 200 : 450);
        const animation = element.animate(
          fadeOnly
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [{ opacity: 0, translate: '0 24px' }, { opacity: 1, translate: '0 0' }],
          { duration: 1300, delay: 160 + stagger, easing: 'cubic-bezier(.25,.7,.3,1)', fill: 'backwards' },
        );
        active.set(element, animation);
        animation.onfinish = animation.oncancel = () => { active.delete(element); };
      }
      if (pending.size === 0) { observer.disconnect(); viewportObserver?.disconnect(); }
    };
    const observer = new IntersectionObserver(reveal, { threshold: thresholds, rootMargin: '0px 0px -' + Math.round(window.innerHeight * 0.2) + 'px 0px' });

    // Compact sections near the footer may never enter the upper viewing area.
    // Give explicitly marked content a full-viewport observer without changing other reveals.
    if (Array.from(elements).some(element => element.dataset.amsRevealViewport === 'full')) {
      viewportObserver = new IntersectionObserver(reveal, { threshold: thresholds });
    }
    elements.forEach(element => {
      element.dataset.amsRevealed = 'pending';
      (element.dataset.amsRevealViewport === 'full' ? viewportObserver : observer)?.observe(element);
    });
    const finishAll = () => {
      observer.disconnect();
      viewportObserver?.disconnect();
      pending.forEach(element => { element.dataset.amsRevealed = 'true'; });
      pending.clear();
      active.forEach(animation => animation.cancel());
      active.clear();
    };
    const motionChanged = () => { if (preference.matches) finishAll(); };
    // Focus immediately exposes pending or animating controls.
    const focusChanged = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      pending.forEach(element => {
        if (!element.contains(event.target as Node)) return;
        element.dataset.amsRevealed = 'true';
        (element.dataset.amsRevealViewport === 'full' ? viewportObserver : observer)?.unobserve(element);
        pending.delete(element);
      });
      active.forEach((animation, element) => {
        if (element.contains(event.target as Node)) animation.cancel();
      });
    };
    preference.addEventListener('change', motionChanged);
    document.addEventListener('focusin', focusChanged);
    return () => {
      finishAll();
      preference.removeEventListener('change', motionChanged);
      document.removeEventListener('focusin', focusChanged);
    };
  }, []);
  return null;
}
