import { OverviewGrid } from './overview-grid';
import { TitleFrame } from './title-frame';

const values = [
  { id: 'ams-value-precision', title: 'Precision', description: 'Engineering accuracy and meticulous attention to detail in every stage of construction.' },
  { id: 'ams-value-integrity', title: 'Integrity', description: 'Honouring our commitments through transparency, accountability and trusted partnerships.' },
  { id: 'ams-value-innovation', title: 'Innovation', description: 'Embracing modern construction methods and smarter engineering solutions.' },
  { id: 'ams-value-craftsmanship', title: 'Craftsmanship', description: 'Bringing architectural visions to life through skilled execution and exceptional finishing.' },
  { id: 'ams-value-quality', title: 'Quality', description: 'Maintaining exacting standards in materials, workmanship and execution.' },
  { id: 'ams-value-safety', title: 'Safety', description: 'Protecting our people through responsible practices and uncompromising site standards.' },
];

export function ValuesSection() {
  return <section className="ams-services-overview ams-values-section" id="ams-values" aria-labelledby="ams-values-title">
    <div className="ams-services-overview-inner">
      <header className="ams-services-overview-heading" data-ams-reveal="up">
        <p className="ams-kicker">OUR VALUES</p>
        <h2 id="ams-values-title"><TitleFrame>The principles that define us</TitleFrame></h2>
      </header>
      <OverviewGrid items={values} label="Our six core values" />
    </div>
  </section>;
}
