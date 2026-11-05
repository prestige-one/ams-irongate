type FaqItemProps = {
  index: number;
  question: string;
  answer: string;
};

export function FaqItem({ index, question, answer }: FaqItemProps) {
  return <details className="ams-faq-item" name="ams-faq-questions" open={index === 0} data-ams-reveal="up" data-ams-delay={index * 90}>
    <summary className="ams-faq-summary">
      <span className="ams-faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <span className="ams-faq-question">{question}</span>
      <span className="ams-faq-toggle" aria-hidden="true" />
    </summary>
    <div className="ams-faq-answer"><p>{answer}</p></div>
  </details>;
}
