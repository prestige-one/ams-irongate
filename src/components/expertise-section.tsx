import { TitleFrame } from './title-frame';
import { ExpertisePanel } from './expertise-panel';

const expertise = [
  { id: 'branded-residences', title: 'Branded Residences', description: 'Boutique buildings with hotel-grade amenities.', image: '/images/expertise/expertise--branded-residential' },
  { id: 'master-communities', title: 'Master Communities', description: 'Master-planned destinations combining residences, leisure and landscapes.', image: '/images/expertise/expertise--master-communities' },
  { id: 'residential', title: 'Residential', description: 'Apartment towers and premium communities.', image: '/images/expertise/expertise--residential' },
  { id: 'commercial', title: 'Commercial', description: 'Grade A offices and retail destinations.', image: '/images/expertise/expertise--commercial' },
  { id: 'mixed-use', title: 'Mixed-Use', description: 'Integrated living, working and leisure.', image: '/images/expertise/expertise--mixed-use' },
];

export function ExpertiseSection() {
  return <section className="ams-expertise-section" id="ams-expertise" aria-labelledby="ams-expertise-title">
    <div className="ams-expertise-inner">
      <header className="ams-expertise-heading" data-ams-reveal="up" data-ams-reveal-viewport="full">
        <h2 id="ams-expertise-title"><TitleFrame>Areas of expertise</TitleFrame></h2>
      </header>
      <ul className="ams-expertise-panels" aria-label="Areas of construction expertise">
        {expertise.map(area => <ExpertisePanel key={area.id} {...area} />)}
      </ul>
      <p className="ams-expertise-touch-hint">Swipe to explore</p>
    </div>
  </section>;
}
