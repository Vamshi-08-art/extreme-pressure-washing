import { useState, useEffect } from 'react';
import { SERVICE_AREAS, getActiveServiceAreaLocation } from '../data/serviceAreas';
import { navigateTo, getCurrentRoute } from '../utils/navigation';
import './Footer.css';

/**
 * Footer Component with Inspired Inquiry Form
 *
 * Full-width site footer with responsive columns:
 * 1. Brand logo, verified summary, phone, email, and social link.
 * 2. Quick navigation links including "Request a Quote".
 * 3. 6 Confirmed Service Area hub links.
 * 4. Dedicated Quick Inquiry Form (shown ONLY on the Get a Free Quote page).
 * 5. Dynamic copyright and verified location disclaimer.
 */
export default function Footer({ isQuotePage: isQuotePageProp }) {
  const currentYear = new Date().getFullYear();
  const [activeLocation, setActiveLocation] = useState(getActiveServiceAreaLocation);
  const [isQuoteRoute, setIsQuoteRoute] = useState(() => {
    if (typeof isQuotePageProp === 'boolean') return isQuotePageProp;
    if (typeof window !== 'undefined') return getCurrentRoute() === '/quote';
    return false;
  });
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Sync active location and route on route or hash changes
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

  // Sync quote page status if prop is omitted or dynamic
  useEffect(() => {
    if (typeof isQuotePageProp === 'boolean') {
      setIsQuoteRoute(isQuotePageProp);
      return;
    }

    const handleRouteChange = () => {
      setIsQuoteRoute(getCurrentRoute() === '/quote');
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, [isQuotePageProp]);

  const showInquiryForm = typeof isQuotePageProp === 'boolean' ? isQuotePageProp : isQuoteRoute;

  const handleInquiryChange = (e) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    // Visual demo only: do not send data or claim false success
    setInquirySubmitted(true);
  };

  return (
    <footer id="contact" className="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer Information</h2>

      <div className="container">
        <div className={`footer-grid ${showInquiryForm ? 'has-inquiry' : ''}`}>
          {/* Group 1: Company Information & Verified Contacts */}
          <div className="footer-col footer-col-brand">
            <a
              href="/"
              className="footer-logo-link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              aria-label="Extreme Pressure Washing Rock Hill Home"
            >
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
              Extreme Pressure Washing Rock Hill delivers premier residential and commercial pressure washing,
              soft washing, and surface restoration across York County and surrounding communities.
            </p>

            {/* Quick Verified Contact Items */}
            <div className="footer-contact-items">
              <a href="tel:803-833-0988" className="footer-phone-link">
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>803-833-0988</span>
              </a>

              <a
                href="mailto:extremepressurewashing4u@gmail.com"
                className="footer-email-link"
                aria-label="Email Extreme Pressure Washing at extremepressurewashing4u@gmail.com"
              >
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>extremepressurewashing4u@gmail.com</span>
              </a>

              <div className="footer-location-item" title={`Active Service Area: ${activeLocation}`}>
                <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="footer-location-text">{activeLocation}</span>
              </div>
            </div>

            <div className="footer-social-row">
              <a
                href="https://www.facebook.com/extremewashing"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Visit Extreme Pressure Washing on Facebook (opens in new window)"
                title="Extreme Pressure Washing Facebook Page"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/');
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#about');
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#services');
                  }}
                >
                  Residential Services
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#services');
                  }}
                >
                  Commercial Services
                </a>
              </li>
              <li>
                <a
                  href="/#service-areas"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#service-areas');
                  }}
                >
                  Service Areas
                </a>
              </li>
              <li>
                <a
                  href="/#gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#gallery');
                  }}
                >
                  Before &amp; After
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/#faq');
                  }}
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/quote"
                  className="footer-quote-link-highlight"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/quote');
                  }}
                >
                  Get a Free Quote &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Group 3: Service Areas */}
          <div className="footer-col">
            <h3 className="footer-heading">Service Areas</h3>
            <ul className="footer-links-list">
              {SERVICE_AREAS.map((area) => (
                <li key={area.id}>
                  <a
                    href={area.link}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(area.link);
                    }}
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 4: Small Footer Enquiry Form (Shown ONLY on Get a Free Quote page) */}
          {showInquiryForm && (
            <div className="footer-col footer-col-inquiry">
              <div className="footer-inquiry-card">
                <h3 className="footer-inquiry-heading">Have any inquiry? Drop us a few lines!</h3>
                <p className="footer-inquiry-note">
                  Send a quick note or call <a href="tel:803-833-0988">803-833-0988</a>.
                </p>

                <form className="footer-inquiry-form" onSubmit={handleInquirySubmit}>
                  <div className="footer-form-field">
                    <label htmlFor="footer-name" className="sr-only">Your Name</label>
                    <input
                      id="footer-name"
                      name="name"
                      type="text"
                      className="footer-form-input"
                      placeholder="Your name"
                      value={inquiryData.name}
                      onChange={handleInquiryChange}
                      required
                    />
                  </div>

                  <div className="footer-form-field">
                    <label htmlFor="footer-email" className="sr-only">Email address</label>
                    <input
                      id="footer-email"
                      name="email"
                      type="email"
                      className="footer-form-input"
                      placeholder="Email address"
                      value={inquiryData.email}
                      onChange={handleInquiryChange}
                      required
                    />
                  </div>

                  <div className="footer-form-field">
                    <label htmlFor="footer-message" className="sr-only">Your message</label>
                    <textarea
                      id="footer-message"
                      name="message"
                      rows="2"
                      className="footer-form-textarea"
                      placeholder="Your message"
                      value={inquiryData.message}
                      onChange={handleInquiryChange}
                      required
                    />
                  </div>

                  <div className="footer-form-actions">
                    <button type="submit" className="btn-footer-send">
                      <span>Send Message</span>
                    </button>
                    <span className="footer-demo-pill">Visual demo only</span>
                  </div>

                  {inquirySubmitted && (
                    <div className="footer-demo-alert" role="status">
                      <span>
                        <strong>Visual Demo Only:</strong> Message not sent to backend. Please call <a href="tel:803-833-0988">803-833-0988</a> for service.
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Copyright Row */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} Extreme Pressure Washing Rock Hill. All rights reserved.
          </p>
          <div className="footer-disclaimer">
            <span>Rock Hill, SC &bull; Lake Wylie, SC &bull; York, SC &bull; Clover, SC &bull; Fort Mill, Indian Land, &amp; Tega Cay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
