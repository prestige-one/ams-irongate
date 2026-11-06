import { TitleFrame } from './title-frame';
import { ArrowIcon } from './arrow-icon';
import { VendorDocument } from './vendor-document';

const documents = [
  { title: 'Trade licence', required: true },
  { title: 'VAT certificate', required: true },
  { title: 'Company profile', required: true },
  { title: 'Insurance certificate', required: true },
  { title: 'ISO certificate', required: false },
  { title: 'Bank details letter', required: false },
];

export function VendorPreparation() {
  return <section className="ams-vendor-prep" id="ams-vendor-preparation" aria-labelledby="ams-vendor-preparation-title">
    <div className="ams-vendor-prep-inner">
      <div className="ams-vendor-prep-copy" data-ams-reveal="up">
        <p className="ams-kicker">BEFORE YOU START</p>
        <h2 id="ams-vendor-preparation-title"><TitleFrame>What you<br />will need</TitleFrame></h2>
        <p className="ams-vendor-prep-description">PDF, JPG or PNG files. You can add the rest from your portal after registering.</p>
        <ul className="ams-vendor-formats" aria-label="Accepted document formats"><li>PDF</li><li>JPG</li><li>PNG</li></ul>
        <a className="ams-button ams-button-primary ams-pill-button" href="/vendor-registration">Register as a vendor <ArrowIcon /></a>
      </div>
      <div className="ams-vendor-documents" data-ams-reveal="up" data-ams-delay="120">
        <div className="ams-vendor-documents-heading"><p>Document checklist</p><span>4 required · 2 optional</span></div>
        <ul aria-label="Documents to prepare for vendor registration">
          {documents.map(document => <VendorDocument key={document.title} {...document} />)}
        </ul>
      </div>
    </div>
  </section>;
}
