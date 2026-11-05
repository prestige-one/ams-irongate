const commitments = [
  { id: 'ams-mission', title: 'Our Mission', statement: 'To deliver every project with precision, transparency and uncompromising quality, from the first foundation to the final handover.' },
  { id: 'ams-vision', title: 'Our Vision', statement: 'To be the contractor of choice for Dubai’s most distinguished residential and commercial landmarks.' },
];

function PurposeCard({ id, title, statement, index }: (typeof commitments)[number] & { index: number }) {
  return <article className="ams-purpose-card" aria-labelledby={id + '-title'} data-ams-reveal="up" data-ams-delay={index * 140}>
    <h2 className="ams-kicker" id={id + '-title'}>{title}</h2>
    <p>{statement}</p>
  </article>;
}

export function MissionVisionSection() {
  return <section className="ams-purpose-section" id="ams-mission-vision" aria-label="Our mission and vision">
    <div className="ams-purpose-grid">
      {commitments.map((commitment, index) => <PurposeCard key={commitment.id} {...commitment} index={index} />)}
    </div>
  </section>;
}
