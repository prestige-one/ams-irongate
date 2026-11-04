'use client';
import { useEffect, useRef } from 'react';

type CompanyFigure = { value: number; suffix: string; label: string; decimals?: number };
const integerFormat = new Intl.NumberFormat('en-US');
const duration = 1600;

export function AnimatedFigures({ figures }: { figures: CompanyFigure[] }) {
  const listRef = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const list = listRef.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rows = Array.from(list.children) as HTMLElement[];
    const counters = rows.map(row => row.querySelector<HTMLElement>('.ams-counter-value')!);
    const starts = figures.map(() => -1);
    const completed = figures.map(() => false);
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    function finalValue(index: number) {
      counters[index].textContent = integerFormat.format(figures[index].value) + figures[index].suffix;
      rows[index].dataset.amsCountState = 'complete';
      completed[index] = true;
    }
    function finish() {
      cancelAnimationFrame(frame);
      frame = 0;
      observer?.disconnect();
      figures.forEach((_, index) => finalValue(index));
    }
    function tick(now: number) {
      frame = 0;
      let active = false;
      figures.forEach((figure, index) => {
        if (starts[index] < 0 || completed[index]) return;
        const progress = Math.min((now - starts[index]) / duration, 1);
        if (progress >= 1) { finalValue(index); return; }
        const value = figure.value * (1 - Math.pow(1 - progress, 3));
        const next = (figure.decimals ? value.toFixed(figure.decimals) : integerFormat.format(Math.floor(value))) + figure.suffix;
        if (counters[index].textContent !== next) counters[index].textContent = next;
        active = true;
      });
      if (active) frame = requestAnimationFrame(tick);
    }
    if (motion.matches || !('IntersectionObserver' in window)) { finish(); return; }
    counters.forEach((counter, index) => {
      counter.textContent = (figures[index].decimals ? '0.0' : '0') + figures[index].suffix;
      rows[index].dataset.amsCountState = 'waiting';
    });
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = rows.indexOf(entry.target as HTMLElement);
        if (index < 0 || starts[index] >= 0 || completed[index]) return;
        starts[index] = performance.now();
        rows[index].dataset.amsCountState = 'counting';
        observer!.unobserve(entry.target);
        if (!frame) frame = requestAnimationFrame(tick);
      });
    }, { threshold: 0.35 });
    rows.forEach(row => observer!.observe(row));
    const preferenceChanged = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', preferenceChanged);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      motion.removeEventListener('change', preferenceChanged);
    };
  }, [figures]);
  return <dl className="ams-about-figures" ref={listRef}>
    {figures.map(figure => <div className="ams-about-figure" key={figure.label}>
      <dt>{figure.label}</dt>
      <dd aria-label={integerFormat.format(figure.value) + figure.suffix}><span className="ams-counter-value" aria-hidden="true">{integerFormat.format(figure.value)}{figure.suffix}</span></dd>
    </div>)}
  </dl>;
}
