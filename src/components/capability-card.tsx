
type CapabilityCardProps = {
  number: string;
  title: string;
  description: string;
  image: string;
  index: number;
};

export function CapabilityCard({ number, title, description, image, index }: CapabilityCardProps) {
  return <article className="ams-capability">
    <img className="ams-capability-image"
      src={'/images/capabilities/' + image + '-467.webp'}
      srcSet={'/images/capabilities/' + image + '-320.webp 320w, /images/capabilities/' + image + '-467.webp 467w'}
      sizes="(max-width: 600px) 86vw, (max-width: 1100px) 44vw, (max-width: 1600px) 22vw, 350px"
      width="467" height="700" loading="lazy" decoding="async" alt="" />
    <div className="ams-capability-copy">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <svg className="ams-capability-border" viewBox="0 0 467 700" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <rect x="1" y="1" width="465" height="698" rx="12" pathLength="100" style={{ animationDelay: (index * 2.5) + 's' }} />
      <rect className="ams-capability-glare" x="1" y="1" width="465" height="698" rx="12" pathLength="100" style={{ animationDelay: (index * 2.5) + 's' }} />
    </svg>
    <span className="ams-sr-only">Capability {number}</span>
  </article>;
}
