import type { ReactNode } from 'react';

type ArchitecturalImage = { src: string; srcSet: string; width: number; height: number; alt: string };
const defaultImage: ArchitecturalImage = {
  src: '/images/charcoal-architecture-1000.webp',
  srcSet: '/images/charcoal-architecture-480.webp 480w, /images/charcoal-architecture-1000.webp 1000w',
  width: 1000, height: 800,
  alt: 'Concrete building with silver architectural outlines and a legacy built to last caption',
};

/** Shared home/About split layout with a responsive architectural image. */
export function ArchitecturalSplit({ children, imageRight = false, image = defaultImage }: { children: ReactNode; imageRight?: boolean; image?: ArchitecturalImage }) {
  return <div className={'ams-about-overview' + (imageRight ? ' ams-about-overview-reversed' : '')}>
    <div className="ams-about-visual" data-ams-reveal="up">
      <img className="ams-about-image" src={image.src} srcSet={image.srcSet} sizes="(max-width:760px) 86vw, 42vw" width={image.width} height={image.height} loading="lazy" decoding="async" alt={image.alt} />
    </div>
    <div className="ams-about-content">{children}</div>
  </div>;
}
