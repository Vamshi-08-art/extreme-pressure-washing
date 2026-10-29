import { navigateTo } from '../utils/navigation';
import './QuoteCTA.css';

/**
 * QuoteCTA Component ("Request a Free Quote")
 *
 * Full-width photographic call-to-action banner with layered
 * deep navy overlay, prominent heading, and primary estimate button.
 */
export default function QuoteCTA() {
  return (
    <section id="quote" className="quote-cta-section" aria-labelledby="quote-cta-heading">
      <div className="quote-cta-overlay">
        <div className="container">
          <div className="quote-cta-content">
            <span className="section-eyebrow quote-cta-eyebrow">LOOKING FOR SERVICE?</span>
            <h2 id="quote-cta-heading" className="quote-cta-title">
              Request a Free Quote Today!
            </h2>
            <p className="quote-cta-description">
              Get a free quote for professional pressure washing services! Contact us today to restore the clean look of your home or business.
            </p>
            <div className="quote-cta-actions">
              <a
                href="/quote"
                className="btn-quote-estimate"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/quote');
                }}
                aria-label="Get a free pressure washing estimate (Dedicated Quote Page)"
              >
                <span>Get a Free Estimate</span>
                <svg className="estimate-arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href="tel:803-833-0988"
                className="btn-quote-phone"
                aria-label="Call Extreme Pressure Washing at 803-833-0988"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call 803-833-0988</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
