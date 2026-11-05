type ExpertisePanelProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
};

export function ExpertisePanel({ id, title, description, image, imagePosition = '50% 50%' }: ExpertisePanelProps) {
  const titleId = 'ams-expertise-' + id + '-title';
  const descriptionId = 'ams-expertise-' + id + '-description';
  return <li className="ams-expertise-panel" tabIndex={0} aria-labelledby={titleId} aria-describedby={descriptionId}>
    <img className="ams-expertise-image"
      src={image + '-800.webp'}
      srcSet={image + '-480.webp 480w, ' + image + '-800.webp 800w'}
      sizes="(max-width:600px) 86vw, (max-width:1000px) 44vw, 40vw"
      width="800" height="1067" loading="lazy" decoding="async" alt=""
      style={{ objectPosition: imagePosition }} />
    <div className="ams-expertise-copy">
      <h3 id={titleId}>{title}</h3>
      <p id={descriptionId}>{description}</p>
    </div>
  </li>;
}
