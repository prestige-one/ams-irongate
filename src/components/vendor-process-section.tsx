import { TitleFrame } from './title-frame';
import { ProcessStage } from './process-stage';

const stages = [
  { title: 'Register', description: 'Tell us about your company and trades, then upload your documents. It takes about ten minutes.' },
  { title: 'Review', description: 'Our team checks your application. If anything is missing, we send it back with a clear note.' },
  { title: 'Approval', description: 'Once approved, your company is on our vendor list. You will hear from us by email.' },
  { title: 'Stay current', description: 'Keep licences and insurance up to date in your portal. We remind you before anything expires.' },
];

export function VendorProcessSection() {
  return <section className="ams-process-section ams-vendor-process" id="ams-vendor-process" aria-labelledby="ams-vendor-process-title">
    <div className="ams-process-inner">
      <header className="ams-process-heading" data-ams-reveal="up" data-ams-reveal-viewport="full">
        <p className="ams-kicker">HOW IT WORKS</p>
        <h2 id="ams-vendor-process-title"><TitleFrame>Four steps to approval</TitleFrame></h2>
      </header>
      <ol className="ams-process-roadmap" aria-label="Four steps to vendor approval">
        {stages.map((stage, index) => <ProcessStage key={stage.title} number={index + 1} {...stage} />)}
      </ol>
    </div>
  </section>;
}
