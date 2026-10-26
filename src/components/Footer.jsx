import { useState, useEffect } from 'react';
import { SERVICE_AREAS, getActiveServiceAreaLocation } from '../data/serviceAreas';
import './Footer.css';

/**
 * Footer Component
 *
 * Full-width site footer with 4 multi-column sections:
 * - Brand logo, summary, and official Facebook link
 * - Quick navigation links
 * - 6 Confirmed Service Area hub links (Steele Creek removed)
 * - Get in Touch: phone link, active service area location, and estimate CTA.
 * - Dynamic copyright bar.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeLocation, setActiveLocation] = useState(getActiveServiceAreaLocation);

  // Sync active location on route or hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLocation(getActiveServiceAreaLocation());
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer Information</h2>

      <div className="container">
        <div className="footer-grid">
          {/* Group 1: Company Information */}
          <div className="footer-col footer-col-brand">
            <a href="/" className="footer-logo-link" aria-label="Extreme Pressure Washing Rock Hill Home">
              <img
                src="/logo/Extreme%20Pressure%20Washing%20logo.jpg"
                alt="Extreme Pressure Washing Logo"
                className="footer-logo-img"
                width="64"
                height="64"
                loading="lazy"
              />
            </a>
            <p className="footer-brand-text">
              Extreme Pressure Washing Rock Hill delivers premier residential and commercial pressure washing, soft washing, and surface restoration across York County and surrounding communities.
            </p>
            <div className="footer-social-row">
              <a
                href="https://www.facebook.com/extremewashing"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Visit Extreme Pressure Washing on Facebook (opens in new window)"
                title="Extreme Pressure Washing Facebook Page"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>

          {/* Group 2: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Residential Services</a></li>
              <li><a href="#services">Commercial Services</a></li>
              <li><a href="#service-areas">Service Areas</a></li>
              <li><a href="#gallery">Before & After</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Group 3: Service Areas (6 Confirmed Locations) */}
          <div className="footer-col">
            <h3 className="footer-heading">Service Areas</h3>
            <ul className="footer-links-list">
              {SERVICE_AREAS.map((area) => (
                <li key={area.id}>
                  <a href={area.link}>{area.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 4: Get In Touch */}
          <div className="footer-col footer-col-contact">
            <h3 className="footer-heading">Get in Touch</h3>
            <div className="footer-contact-items">
              <a href="tel:803-833-0988" className="footer-phone-link">
                <svg className="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>803-833-0988</span>
              </a>

              {/* Dynamic Service Area Location */}
              <div className="footer-location-item" title={`Active Service Area: ${activeLocation}`}>
                <svg className="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="footer-location-text">{activeLocation}</span>
              </div>
            </div>

            <div className="footer-cta-box">
              <a href="#quote" className="btn-footer-estimate">
                Get a Free Estimate
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} Extreme Pressure Washing Rock Hill. All rights reserved.
          </p>
          <div className="footer-disclaimer">
            <span>Rock Hill, SC & Surrounding York County Communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
