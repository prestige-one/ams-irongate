import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { BuildingBackdrop } from './building-backdrop';
import { TitleFrame } from './title-frame';

/** Shared inner-page hero with one responsive photograph and shared contact navigation. */
export function PageHero({ page, titleId, kicker, title, description }: {
  page: 'about' | 'services' | 'contact'; titleId: string; kicker: string; title: ReactNode; description: string;
}) {
  return <section className={'ams-hero-centered ams-page-hero ams-' + page + '-hero'} id="ams-top" aria-labelledby={titleId}>
      <BuildingBackdrop priority />
      <SiteHeader page={page} />
      <div className="ams-page-hero-content">
        <p className="ams-kicker ams-kicker-pill" data-ams-reveal="up">{kicker}</p>
        <h1 id={titleId} data-ams-reveal="up" data-ams-delay="120"><TitleFrame>{title}</TitleFrame></h1>
        <p className="ams-page-hero-description" data-ams-reveal="up" data-ams-delay="240">{description}</p>
      </div>
    </section>;
}
