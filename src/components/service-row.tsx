import type { amsServices } from '@/lib/services';

type ServiceRowProps = (typeof amsServices)[number] & { index: number };

export function ServiceRow({ id, title, detail, image, imageWidth, imageAlt, index }: ServiceRowProps) {
  const base = '/images/services/' + image;
  return <li className="ams-service-row" id={id} aria-labelledby={id + '-title'}>
    <span className="ams-service-row-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
    <div className="ams-service-row-visual" data-ams-reveal="up">
      <img src={base + '-' + imageWidth + '.webp'}
        srcSet={base + '-320.webp 320w, ' + base + '-' + imageWidth + '.webp ' + imageWidth + 'w'}
        sizes="(max-width:760px) 86vw, (max-width:1100px) 24vw, 280px"
        width={imageWidth} height={Math.round(imageWidth * 5 / 8)} loading="lazy" decoding="async" alt={imageAlt} />
    </div>
    <div className="ams-service-row-copy" data-ams-reveal="up" data-ams-delay="120">
      <h2 id={id + '-title'}>{title}</h2>
      <p>{detail}</p>
    </div>
  </li>;
}
