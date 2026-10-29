import { navigateTo } from '../utils/navigation';
import './Hero.css';

/**
 * Hero Component for Extreme Pressure Washing Rock Hill
 *
 * Implements:
 * - Full-width photographic hero section using /images/hero-pressure-washing.jpg
 * - Directional brand navy gradient fading smoothly toward the right
 * - High-contrast, bold typography and readable description
 * - Accessible, responsive primary CTA linking to the dedicated Quote Page
 * - Fully responsive across mobile, tablet, and desktop viewports
 */
export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-label="Hero">
      <div className="hero-overlay">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Professional Pressure Washing in Rock Hill, SC
            </h1>
            <p className="hero-description">
              Professional pressure washing and soft washing for homes and businesses in Rock Hill, SC, and surrounding York County communities.
            </p>
            <div className="hero-actions">
              <a
                href="/quote"
                className="hero-cta-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/quote');
                }}
              >
                <span>Get a Free Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

