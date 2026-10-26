import { useState } from 'react';
import './FAQ.css';

/**
 * FAQ Component
 *
 * Implements an accessible, keyboard-navigable accordion containing
 * 14 verified customer questions with the first question open by default.
 */
const FAQ_DATA = [
  {
    id: 'cost',
    question: 'How much does pressure washing cost?',
    answer: 'Pricing varies based on the size of the surface, dirt buildup, and the type of job. We offer free estimates for residential and commercial properties in Rock Hill, Lake Wylie, York, Clover, and surrounding areas.',
  },
  {
    id: 'difference',
    question: 'What’s the difference between pressure washing and soft washing?',
    answer: 'Pressure washing uses high-pressure water to remove tough stains from concrete, driveways, and hard surfaces. Soft washing uses low pressure and specialized cleaning solutions to clean roofs, siding, and delicate areas without damaging them.',
  },
  {
    id: 'frequency',
    question: 'How often should I get my home washed?',
    answer: 'Most homes in our service area benefit from professional exterior cleaning every 12–24 months. Homes near water or in shaded, moist areas may require more frequent cleaning due to algae and mildew buildup.',
  },
  {
    id: 'commercial',
    question: 'Do you serve commercial properties?',
    answer: 'Yes. We provide commercial pressure washing for storefronts, offices, parking areas, sidewalks, restaurants, HOAs, and more throughout York County and the surrounding community.',
  },
  {
    id: 'safe',
    question: 'Is pressure washing safe for my home?',
    answer: 'When performed by trained professionals using appropriate equipment and techniques, exterior cleaning can be performed safely. Improper pressure washing can damage siding, paint and roofing materials, which is why the correct pressure and cleaning solutions should be selected for each surface.',
  },
  {
    id: 'landscaping',
    question: 'Will pressure washing harm my landscaping?',
    answer: 'We take precautions to protect plants, grass, shrubs and outdoor features while cleaning exterior surfaces.',
  },
  {
    id: 'prepare',
    question: 'How do I prepare for pressure washing?',
    answer: 'Move vehicles, outdoor furniture, grills and toys away from areas to be cleaned. Our team handles the rest and takes precautions to protect delicate fixtures and landscaping during service.',
  },
  {
    id: 'duration',
    question: 'How long does pressure washing take?',
    answer: 'Service time varies by job size and condition. Many residential properties can be completed in a few hours, while commercial properties may take longer depending on their size and scope.',
  },
  {
    id: 'estimate',
    question: 'How do I get a free estimate?',
    answer: 'Call 803-833-0988 or visit the contact/quote destination to arrange an estimate.',
  },
  {
    id: 'rock-hill-frequency',
    question: 'How often should a home be pressure washed in Rock Hill, SC?',
    answer: 'Most homes in Rock Hill should be professionally pressure washed every 12–18 months. South Carolina\'s humid climate encourages algae, mildew, dirt and pollen buildup on siding, roofs and concrete. Regular cleaning helps maintain curb appeal and reduce staining.',
  },
  {
    id: 'soft-vs-pressure-houses',
    question: 'Is soft washing better than pressure washing for houses?',
    answer: 'Soft washing is often more appropriate for surfaces such as vinyl siding, painted wood, stucco and roofing materials. It uses specialized cleaning solutions and low-pressure water to remove organic buildup while reducing the risk of damage.',
  },
  {
    id: 'surfaces',
    question: 'What surfaces can be professionally pressure washed?',
    answer: 'Common surfaces include driveways, sidewalks, patios, decks, fences and other suitable concrete or hard surfaces. Cleaning methods should be adjusted according to the material and its condition.',
  },
  {
    id: 'black-streaks',
    question: 'Can pressure washing remove black streaks from a roof?',
    answer: 'Black streaks on roofs are often associated with algae growth. Appropriate roof-cleaning methods, such as soft washing where suitable, can help remove this buildup without using damaging high pressure.',
  },
  {
    id: 'best-time',
    question: 'When is the best time of year to pressure wash a house in York County?',
    answer: 'Pressure washing can be performed throughout the year in South Carolina when weather and conditions permit. Many homeowners schedule exterior cleaning in spring or fall when pollen, dirt and algae buildup becomes more noticeable.',
  },
];

export default function FAQ() {
  // First item open by default (index 0)
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="container">
        {/* Header */}
        <div className="faq-header">
          <span className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 id="faq-heading" className="faq-title">
            Got Questions? We Have Answers.
          </h2>
          <p className="faq-description">
            Find clear answers to common questions about our pressure washing and soft washing services in Rock Hill and York County.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="faq-accordion-wrapper">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  id={buttonId}
                  className="faq-question-button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={contentId}
                  className="faq-answer-panel"
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

