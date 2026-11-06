import { TitleFrame } from './title-frame';
import { FaqItem } from './faq-item';

const questions = [
  {
    question: 'What services does AMS Irongate Contracting provide?',
    answer: 'We deliver general contracting, design and build, structural and civil works, MEP coordination, interior fit-out and project management for residential, commercial and mixed-use developments across Dubai.',
  },
  {
    question: 'How does AMS Irongate collaborate with developers and consultants?',
    answer: 'We work as one accountable partner. Our team joins early to review programme, buildability and cost, coordinates design, structure and services with your consultants, and reports openly so you always know where the project stands and what comes next.',
  },
  {
    question: 'How does AMS Irongate Contracting ensure construction quality and safety?',
    answer: 'Through disciplined site management, workforce protection and rigorous quality checks at every milestone. Each stage is inspected against exacting standards, and handover includes snagging, testing and commissioning.',
  },
  {
    question: 'How can developers contact AMS Irongate Contracting for a construction project in Dubai?',
    answer: 'Share your brief through our contact form and a member of our team will be in touch within 24 hours. You can also request our company profile or arrange a meeting with the team.',
  },
];

export function FaqSection() {
  return <section className="ams-faq-section" id="faq" aria-labelledby="ams-faq-title">
    <div className="ams-faq-inner">
      <header className="ams-faq-heading" data-ams-reveal="up">
        <p className="ams-kicker">FAQ</p>
        <h2 id="ams-faq-title"><TitleFrame>Everything you need to know.</TitleFrame></h2>
      </header>
      <div className="ams-faq-list">
        {questions.map((item, index) => <FaqItem key={item.question} index={index} {...item} />)}
      </div>
    </div>
  </section>;
}
