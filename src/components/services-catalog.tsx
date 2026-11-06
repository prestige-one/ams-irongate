import { amsServices } from '@/lib/services';
import { ServiceRow } from './service-row';

export function ServicesCatalog() {
  return <section className="ams-services-catalog" id="service-list" aria-label="Our construction services">
    <ol className="ams-services-catalog-list">
      {amsServices.map((service, index) => <ServiceRow key={service.id} {...service} index={index} />)}
    </ol>
  </section>;
}
