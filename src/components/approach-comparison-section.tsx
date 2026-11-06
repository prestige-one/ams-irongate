import { TitleFrame } from './title-frame';
import { ImageComparison } from './image-comparison';
import { constructionStages } from '@/lib/construction-stages';

export function ApproachComparisonSection() {
  return <section className="ams-process-section ams-compare-section" id="process" aria-labelledby="ams-compare-title">
    <div className="ams-compare-inner">
      <header className="ams-compare-heading" data-ams-reveal="up" data-ams-reveal-viewport="full">
        <p className="ams-kicker">OUR APPROACH</p>
        <h2 id="ams-compare-title"><TitleFrame>Discipline at every stage.</TitleFrame></h2>
        <p>A clear process. A considered result. From the first plan to the final detail.</p>
      </header>
      <div className="ams-compare-layout">
        <ol className="ams-compare-steps" aria-label="Our construction process">
          {constructionStages.map((step, index) => <li key={step.title} data-ams-reveal="up" data-ams-delay={index * 100}>
            <span className="ams-compare-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{step.title}</h3><p>{step.description}</p></div>
          </li>)}
        </ol>
        <div className="ams-compare-visual" data-ams-reveal="up" data-ams-reveal-viewport="full" data-ams-delay="160"><ImageComparison /></div>
      </div>
    </div>
  </section>;
}
