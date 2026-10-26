import './WhyChooseUs.css';

/**
 * Why Choose Us Component
 *
 * Balanced 2-column layout on desktop:
 * - Left column: Full photographic feature card
 * - Right column: Eyebrow, Heading, Copy, Owner-operated highlight, and 4 stacked benefits
 * Mobile stacks vertically: Heading -> Photo -> Benefits
 */
const BENEFITS_DATA = [
  {
    id: 'staff',
    title: 'Experienced Staff',
    description: 'Experience You Can Trust, Results That Speak for Themselves.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    id: 'chemicals',
    title: 'Chemical Knowledge',
    description: 'We use more than 13 different chemicals. We understand what each surface and situation requires.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <line x1="8.5" y1="2" x2="15.5" y2="2" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </svg>
    ),
  },
  {
    id: 'speed',
    title: 'Fast Service',
    description: 'Normally we can fit you in within a few days. On time and top communication!',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: 'equipment',
    title: 'Best Equipment',
    description: 'We continuously update our equipment to get the job done fast and detailed to ensure quality results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="why-us-section" aria-labelledby="why-us-heading">
      <div className="container">
        <div className="why-us-grid">
          {/* Header block: Eyebrow, Heading, Copy, Highlight */}
          <div className="why-us-header-block">
            <span className="section-eyebrow">WHY CHOOSE US?</span>
            <h2 id="why-us-heading" className="why-us-title">
              Professional Pressure Washing with Unmatched Care.
            </h2>
            <p className="why-us-copy">
              We are locally owned and proudly serve Rock Hill, Fort Mill, Lake Wylie, York, Clover, Indian Land, and Tega Cay. Our equipment, eco-friendly cleaning solutions, and proven process ensure safe, thorough results on every project. Every job includes a detailed inspection, proper surface preparation, professional cleaning application, and final walkthrough to guarantee satisfaction.
            </p>
            <p className="why-us-highlight">
              <strong>Owner-Operated Commitment:</strong> Extreme Pressure Washing Rock Hill is owner-operated. You will be speaking with the owner, and the owner will be at the job.
            </p>
          </div>

          {/* Two-Image Overlap Composition (Desktop Left Column, Mobile Stacks With Content) */}
          <div className="why-us-image-block">
            <div className="why-us-image-composition">
              <div className="why-us-img-frame why-us-img-back">
                <img
                  src="/images/Why%20choose%20us%20image/why%20%20choose%20us%20image%202.jpg"
                  alt="Restored residential concrete driveway after professional pressure washing"
                  className="why-us-img"
                  loading="lazy"
                />
              </div>
              <div className="why-us-img-frame why-us-img-front">
                <img
                  src="/images/Why%20choose%20us%20image/why%20choose%20us%20image%201.jpg"
                  alt="Extreme Pressure Washing official service truck equipped with professional washing rig"
                  className="why-us-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* 4 Benefits Stacked (Desktop Right Column, lower section) */}
          <div className="why-us-benefits-block">
            <div className="benefits-list">
              {BENEFITS_DATA.map((benefit, index) => (
                <div key={benefit.id} className="benefit-item">
                  <div className="benefit-icon-box">
                    {benefit.icon}
                  </div>
                  <div className="benefit-text">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                  {index < BENEFITS_DATA.length - 1 && <div className="benefit-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
