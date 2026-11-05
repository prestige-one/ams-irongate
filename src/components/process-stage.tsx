type ProcessStageProps = {
  number: number;
  title: string;
  description: string;
};

export function ProcessStage({ number, title, description }: ProcessStageProps) {
  return <li className="ams-process-roadmap-stage">
    <span className="ams-process-roadmap-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
    <div className="ams-process-roadmap-copy" data-ams-reveal="up" data-ams-reveal-viewport="full" data-ams-delay={(number - 1) * 120}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </li>;
}
