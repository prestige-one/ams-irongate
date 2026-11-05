import { TitleFrame } from './title-frame';
import { ProcessStage } from './process-stage';

const stages = [
  { title: 'Plan', description: 'Pre-construction reviews, programme planning and early risk assessment.' },
  { title: 'Engineer', description: 'Value engineering and coordination between design, structure and services.' },
  { title: 'Build', description: 'Safe, well-managed sites with rigorous quality checks at every milestone.' },
  { title: 'Handover', description: 'Snagging, testing and commissioning for a seamless transfer to the client.' },
];

export function ApproachSection() {
  return <section className="ams-process-section" id="ams-process" aria-labelledby="ams-process-title">
    <div className="ams-process-inner">
      <header className="ams-process-heading" data-ams-reveal="up" data-ams-reveal-viewport="full">
        <p className="ams-kicker">OUR APPROACH</p>
        <h2 id="ams-process-title"><TitleFrame>Discipline at every stage.</TitleFrame></h2>
        <p className="ams-process-description">Strategic planning, engineering expertise and precision in execution.<br className="ams-process-desktop-break" /> A clear process from the first decision to the final handover.</p>
      </header>
      <ol className="ams-process-roadmap" aria-label="Our construction process">
        {stages.map((stage, index) => <ProcessStage key={stage.title} number={index + 1} {...stage} />)}
      </ol>
    </div>
  </section>;
}
