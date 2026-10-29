import { useState } from 'react';
import Testimonials from './Testimonials';
import { navigateTo } from '../utils/navigation';
import './QuotePage.css';

/**
 * Verified Service Options from the Extreme Pressure Washing Website
 */
const SERVICE_OPTIONS = [
  'House Washing / Soft Wash',
  'Pressure Washing',
  'Concrete Cleaning (Driveways, Sidewalks, Patios)',
  'Roof Cleaning',
  'Deck Cleaning & Staining',
  'Wood Restoration',
  'Fence Cleaning & Sealing',
  'Paver Sealing & Cleaning',
  'Commercial Exterior Cleaning',
  'Multiple Services / Complete Exterior Package',
  'Other / Custom Service',
];

/**
 * Dedicated "Get a Free Quote" Page
 *
 * Implements:
 * - Photographic hero header reusing /images/hero-pressure-washing.jpg
 * - Heading: "Request a Free Quote"
 * - Verified introduction text and business details
 * - Prominent, clean 2-column form container inspired by reference design
 * - Verified service dropdown list
 * - Demo-only visual notice (no false submission messages)
 * - Google Maps/Earth remote quoting notice
 * - Verified Testimonials section with theme-aware background
 */
export default function QuotePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: '',
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end visual demo only: do not send data or pretend a submission succeeded.
    setHasSubmitted(true);
  };

  return (
    <div className="quote-page" id="quote-page">
      {/* =========================================================================
          Hero Header Section (Reusing /images/hero-pressure-washing.jpg)
          ========================================================================= */}
      <section className="quote-hero" aria-labelledby="quote-page-heading">
        <div className="quote-hero-overlay">
          <div className="container quote-hero-container">
            {/* Breadcrumb Navigation */}
            <nav className="quote-breadcrumb" aria-label="Breadcrumb">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/');
                }}
              >
                Home
              </a>
              <span className="breadcrumb-separator" aria-hidden="true">/</span>
              <span className="breadcrumb-current" aria-current="page">Request a Free Quote</span>
            </nav>

            <span className="section-eyebrow quote-hero-eyebrow">ONLINE ESTIMATE</span>
            <h1 id="quote-page-heading" className="quote-hero-title">
              Request a Free Quote
            </h1>

            <p className="quote-hero-intro">
              Ready to restore your home or business exterior? At Extreme Pressure Washing Rock Hill,
              we provide professional pressure washing and soft washing services throughout Rock Hill,
              Lake Wylie, York, Clover, and surrounding areas. Our team is ready to answer your questions
              and schedule your free estimate.
            </p>

            <p className="quote-hero-subnote">
              Use the form below to request a free quote or schedule a pressure washing service.
              We respond promptly to all inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Main Quote Request Form Section (Visually Prominent Container)
          ========================================================================= */}
      <section className="quote-form-section" aria-label="Quote Request Form">
        <div className="container">
          <div className="quote-form-wrapper">
            <div className="quote-form-card">
              <div className="quote-form-header">
                <h2 className="quote-form-heading">Tell Us About Your Property</h2>
                <p className="quote-form-desc">
                  Please enter your details below. Fast, accurate estimates tailored to your exterior cleaning needs.
                </p>
              </div>

              {/* Front-end Visual Demo Banner */}
              <div className="demo-notice-indicator" role="note">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>
                  <strong>Visual Demo Notice:</strong> This interactive form demonstrates the quote request layout.
                  To schedule your actual service today, call <a href="tel:803-833-0988">803-833-0988</a>.
                </span>
              </div>

              <form className="quote-form" onSubmit={handleSubmit} noValidate={false}>
                <div className="form-grid">
                  {/* Field 1: Your Name */}
                  <div className="form-field">
                    <label htmlFor="quote-name" className="form-label">
                      Your name <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-name"
                      name="fullName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Walter Insley"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Field 2: Your Email */}
                  <div className="form-field">
                    <label htmlFor="quote-email" className="form-label">
                      Your email <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="form-field">
                    <label htmlFor="quote-phone" className="form-label">
                      Phone number <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="e.g. 803-833-0988"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Field 4: Service Address */}
                  <div className="form-field">
                    <label htmlFor="quote-address" className="form-label">
                      Service address <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-address"
                      name="address"
                      type="text"
                      className="form-input"
                      placeholder="e.g. 123 Main St, Rock Hill, SC 29730"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Field 5: Service Needed (Dropdown of Verified Services) */}
                  <div className="form-field form-field-full">
                    <label htmlFor="quote-service" className="form-label">
                      Service needed <span className="field-required" aria-hidden="true">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="quote-service"
                        name="service"
                        className="form-select"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a pressure washing service...</option>
                        {SERVICE_OPTIONS.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="select-arrow-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* Field 6: Your Message (Optional) */}
                  <div className="form-field form-field-full">
                    <label htmlFor="quote-message" className="form-label">
                      Your message <span className="field-optional">(optional)</span>
                    </label>
                    <textarea
                      id="quote-message"
                      name="message"
                      rows="4"
                      className="form-textarea"
                      placeholder="Tell us about the property, areas of buildup, preferred time frame, or any specific questions..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="form-submit-row">
                  <button type="submit" className="btn-quote-submit">
                    <span>Request a Free Quote</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                  <span className="submit-disclaimer">
                    Demo only &bull; Direct estimates via 803-833-0988
                  </span>
                </div>

                {/* Non-misleading Demo Status Banner shown when user clicks submit */}
                {hasSubmitted && (
                  <div className="demo-submission-alert" role="status">
                    <div className="demo-alert-header">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <strong>Front-end Visual Demonstration:</strong>
                    </div>
                    <p>
                      This is a prototype interface. No data was emailed or stored. To schedule your
                      professional pressure washing service right now, please contact Extreme Pressure Washing directly:
                    </p>
                    <div className="demo-alert-actions">
                      <a href="tel:803-833-0988" className="btn-demo-contact">
                        Call 803-833-0988
                      </a>
                      <a href="mailto:extremepressurewashing4u@gmail.com" className="btn-demo-contact">
                        extremepressurewashing4u@gmail.com
                      </a>
                    </div>
                  </div>
                )}
              </form>

              {/* =====================================================================
                  Verified Note Below the Form (Google Maps/Earth & Direct Phone Call)
                  ===================================================================== */}
              <div className="quote-form-footer-note">
                <div className="note-card">
                  <div className="note-icon-col">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                      <line x1="8" y1="2" x2="8" y2="18" />
                      <line x1="16" y1="6" x2="16" y2="22" />
                    </svg>
                  </div>
                  <div className="note-content-col">
                    <p className="note-primary-text">
                      Please enter your name and address below. Most quotes can be completed online
                      using Google Maps or Google Earth. An appointment will be scheduled if an in-person
                      visit is needed.
                    </p>
                    <p className="note-call-action">
                      Call <a href="tel:803-833-0988">803-833-0988</a> today or fill out the form above
                      to schedule your professional pressure washing service.
                    </p>
                  </div>
                </div>

                {/* Verified Business Information Bar */}
                <div className="verified-info-strip">
                  <div className="verified-info-item">
                    <span className="verified-label">Business:</span>
                    <span className="verified-value">Extreme Pressure Washing Rock Hill</span>
                  </div>
                  <div className="verified-info-item">
                    <span className="verified-label">Phone:</span>
                    <a href="tel:803-833-0988" className="verified-link">803-833-0988</a>
                  </div>
                  <div className="verified-info-item">
                    <span className="verified-label">Email:</span>
                    <a href="mailto:extremepressurewashing4u@gmail.com" className="verified-link">
                      extremepressurewashing4u<wbr />@gmail.com
                    </a>
                  </div>
                  <div className="verified-info-item verified-info-full">
                    <span className="verified-label">Service Areas:</span>
                    <span className="verified-value">
                      Rock Hill, SC &bull; Lake Wylie, SC &bull; York, SC &bull; Clover, SC &bull; Fort Mill, Indian Land, and Tega Cay
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Testimonials Section ("What Our Clients Say")
          Reuses existing component with verified reviews and equal heights.
          Respects #222222 in dark mode, pure white in light mode.
          ========================================================================= */}
      <Testimonials />
    </div>
  );
}

