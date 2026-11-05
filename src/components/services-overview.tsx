import { OverviewGrid } from './overview-grid';
import { TitleFrame } from './title-frame';
import { amsServices } from '@/lib/services';
import { ArrowIcon } from './arrow-icon';



export function ServicesOverview({ showAction = true }: { showAction?: boolean }) {
  return <section className="ams-services-overview" id="ams-services-overview" aria-labelledby="ams-services-overview-title">
    <div className="ams-services-overview-inner">
      <header className="ams-services-overview-heading" data-ams-reveal="up">
        <h2 id="ams-services-overview-title"><TitleFrame>One partner.<br />Every stage.</TitleFrame></h2>
      </header>
      <OverviewGrid items={amsServices} id="ams-service-list" label="Our six services" />
      {showAction && <div className="ams-services-overview-actions" data-ams-reveal="up"><a className="ams-button ams-button-primary ams-pill-button" href="/services">All services <ArrowIcon /></a></div>}
    </div>
  </section>;
}
