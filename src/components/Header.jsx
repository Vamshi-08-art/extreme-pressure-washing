import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

/**
 * Header Component for Extreme Pressure Washing Rock Hill
 *
 * Implements:
 * - Row 1 (Info Bar): Fixed #1f2630 background in both light and dark themes.
 *   Contains clickable phone number, business hours placeholder, and Facebook link placeholder.
 * - Row 2 (Main Navigation): Fixed at top: 0 while scrolling with a layout placeholder.
 *   Fixed #1f2630 background and a subtle dark gradient shadow beneath.
 *   Contains actual business logo, navigation links with animated #45b4e666 underline,
 *   blue hover/active accents, accessible dropdowns, ThemeToggle, and Free Quote CTA.
 * - Mobile navigation drawer and accordion menus.
 */

const RESIDENTIAL_SERVICES = [
  { id: 'res-house-washing', name: 'House Washing', href: '#service-house-washing' },
  { id: 'res-soft-wash', name: 'Soft Wash', href: '#service-soft-wash' },
  { id: 'res-concrete-cleaning', name: 'Concrete Cleaning', href: '#service-concrete-cleaning' },
  { id: 'res-roof-cleaning', name: 'Roof Cleaning', href: '#service-roof-cleaning' },
  { id: 'res-pressure-washing', name: 'Pressure Washing', href: '#service-pressure-washing' },
  { id: 'res-deck-cleaning', name: 'Deck Cleaning', href: '#service-deck-cleaning' },
  { id: 'res-wood-restoration', name: 'Wood Restoration', href: '#service-wood-restoration' },
  { id: 'res-fence-deck-staining', name: 'Fence and Deck Staining', href: '#service-fence-deck-staining' },
  { id: 'res-paver-sealing', name: 'Paver Sealing', href: '#service-paver-sealing' },
];

const COMMERCIAL_SERVICES = [
  { id: 'com-storefront-cleaning', name: 'Storefront Cleaning', href: '#service-storefront-cleaning' },
  { id: 'com-building-cleaning', name: 'Building Cleaning', href: '#service-building-cleaning' },
  { id: 'com-parking-lot-cleaning', name: 'Parking Lot Cleaning', href: '#service-parking-lot-cleaning' },
  { id: 'com-sidewalk-cleaning', name: 'Sidewalk Cleaning', href: '#service-sidewalk-cleaning' },
  { id: 'com-roof-cleaning', name: 'Roof Cleaning', href: '#service-roof-cleaning-commercial' },
  { id: 'com-driveway-cleaning', name: 'Driveway Cleaning', href: '#service-driveway-cleaning-commercial' },
  { id: 'com-concrete-cleaning', name: 'Concrete Cleaning', href: '#service-concrete-cleaning-commercial' },
  { id: 'com-paver-cleaning', name: 'Paver Cleaning', href: '#service-paver-cleaning' },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState('home');
  const [openDropdown, setOpenDropdown] = useState(null); // 'residential' | 'commercial' | 'blog' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedDropdown, setMobileExpandedDropdown] = useState(null);
  const [isFixed, setIsFixed] = useState(false);
  const [navHeight, setNavHeight] = useState(72);

  const topBarRef = useRef(null);
  const headerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const residentialTriggerRef = useRef(null);
  const commercialTriggerRef = useRef(null);
  const blogTriggerRef = useRef(null);

  // Measure navbar height and manage fixed navbar positioning during scroll
  useEffect(() => {
    const updateMeasurements = () => {
      if (headerRef.current) {
        setNavHeight(headerRef.current.offsetHeight);
      }
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);

    const handleScroll = () => {
      const topBarHeight = topBarRef.current ? topBarRef.current.offsetHeight : 34;
      if (window.scrollY >= topBarHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', updateMeasurements);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle Escape key to close open menus and return focus to triggers
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (openDropdown) {
          if (openDropdown === 'residential') residentialTriggerRef.current?.focus();
          if (openDropdown === 'commercial') commercialTriggerRef.current?.focus();
          if (openDropdown === 'blog') blogTriggerRef.current?.focus();
          setOpenDropdown(null);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openDropdown, isMobileMenuOpen]);

  // Lock background page scrolling when the mobile navigation menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Desktop Dropdown hover handlers with debounce buffer to eliminate cursor flicker
  const handleMouseEnter = (name) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  // Desktop click toggle for triggers
  const handleDropdownClick = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Mobile accordion toggle
  const toggleMobileDropdown = (name) => {
    setMobileExpandedDropdown((prev) => (prev === name ? null : name));
  };

  // Navigation click handler
  const handleLinkSelect = (id) => {
    setActiveLink(id);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          Row 1: Information Bar (Desktop & Mobile) - Fixed #1f2630 in both themes
          ========================================================================= */}
      <div className="top-bar" ref={topBarRef}>
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <a
              href="tel:803-833-0988"
              className="top-bar-item top-bar-phone"
              aria-label="Call Extreme Pressure Washing at 803-833-0988"
            >
              <svg
                className="top-bar-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>803-833-0988</span>
            </a>

            <div className="top-bar-item top-bar-hours">
              <svg
                className="top-bar-icon"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Open 24/7</span>
            </div>
          </div>

          {/* Social placeholder (hidden on mobile) */}
          <div className="top-bar-right">
            <a
              href="#facebook-placeholder"
              className="top-bar-social"
              aria-label="Visit Extreme Pressure Washing on Facebook (Placeholder link)"
              title="Facebook page (Link placeholder pending confirmation)"
            >
              <svg
                className="top-bar-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Row 2: Main Navigation Bar with Layout Placeholder & Permanently Fixed Scrolling
          ========================================================================= */}
      <div
        className="site-header-placeholder"
        style={{ height: isFixed || isMobileMenuOpen ? `${navHeight}px` : 'auto' }}
      >
        <header
          className={`site-header ${isFixed || isMobileMenuOpen ? 'is-fixed' : ''}`}
          ref={headerRef}
        >
          <nav className="main-navbar" aria-label="Main navigation">
            <div className="container main-navbar-container">
              {/* Business Logo */}
              <a
                href="/"
                className="navbar-brand"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkSelect('home');
                }}
                aria-label="Extreme Pressure Washing Rock Hill - Back to Homepage"
              >
                <img
                  src="/logo/Extreme%20Pressure%20Washing%20logo.jpg"
                  alt="Extreme Pressure Washing Logo"
                  className="navbar-logo-img"
                  width="58"
                  height="58"
                />
              </a>

              {/* Desktop Navigation Row */}
              <div className="desktop-navigation">
                <ul className="desktop-nav-list">
                  {/* Home */}
                  <li className="desktop-nav-item">
                    <a
                      href="#home"
                      className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('home')}
                    >
                      Home
                    </a>
                  </li>

                  {/* About Us */}
                  <li className="desktop-nav-item">
                    <a
                      href="#about"
                      className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('about')}
                    >
                      About Us
                    </a>
                  </li>

                  {/* Residential Services Dropdown */}
                  <li
                    className={`desktop-nav-item has-dropdown ${openDropdown === 'residential' ? 'dropdown-open' : ''}`}
                    onMouseEnter={() => handleMouseEnter('residential')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      ref={residentialTriggerRef}
                      className={`nav-dropdown-trigger ${activeLink.startsWith('res') ? 'active' : ''}`}
                      onClick={() => handleDropdownClick('residential')}
                      aria-expanded={openDropdown === 'residential'}
                      aria-haspopup="true"
                      aria-controls="residential-services-menu"
                    >
                      <span>Residential Services</span>
                      <svg
                        className={`chevron-icon ${openDropdown === 'residential' ? 'open' : ''}`}
                        width="14"
                        height="14"
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
                    </button>
                    <div
                      id="residential-services-menu"
                      className="dropdown-panel"
                      role="region"
                      aria-label="Residential Services submenu"
                      onMouseEnter={() => handleMouseEnter('residential')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="dropdown-panel-list">
                        {RESIDENTIAL_SERVICES.map((item) => (
                          <li key={item.id}>
                            <a href={item.href} onClick={() => handleLinkSelect(item.id)}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Commercial Services Dropdown */}
                  <li
                    className={`desktop-nav-item has-dropdown ${openDropdown === 'commercial' ? 'dropdown-open' : ''}`}
                    onMouseEnter={() => handleMouseEnter('commercial')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      ref={commercialTriggerRef}
                      className={`nav-dropdown-trigger ${activeLink.startsWith('com') ? 'active' : ''}`}
                      onClick={() => handleDropdownClick('commercial')}
                      aria-expanded={openDropdown === 'commercial'}
                      aria-haspopup="true"
                      aria-controls="commercial-services-menu"
                    >
                      <span>Commercial Services</span>
                      <svg
                        className={`chevron-icon ${openDropdown === 'commercial' ? 'open' : ''}`}
                        width="14"
                        height="14"
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
                    </button>
                    <div
                      id="commercial-services-menu"
                      className="dropdown-panel"
                      role="region"
                      aria-label="Commercial Services submenu"
                      onMouseEnter={() => handleMouseEnter('commercial')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="dropdown-panel-list">
                        {COMMERCIAL_SERVICES.map((item) => (
                          <li key={item.id}>
                            <a href={item.href} onClick={() => handleLinkSelect(item.id)}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Service Areas */}
                  <li className="desktop-nav-item">
                    <a
                      href="#service-areas"
                      className={`nav-link ${activeLink === 'service-areas' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('service-areas')}
                    >
                      Service Areas
                    </a>
                  </li>

                  {/* Blog Dropdown */}
                  <li
                    className={`desktop-nav-item has-dropdown ${openDropdown === 'blog' ? 'dropdown-open' : ''}`}
                    onMouseEnter={() => handleMouseEnter('blog')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      ref={blogTriggerRef}
                      className={`nav-dropdown-trigger ${activeLink.startsWith('blog') ? 'active' : ''}`}
                      onClick={() => handleDropdownClick('blog')}
                      aria-expanded={openDropdown === 'blog'}
                      aria-haspopup="true"
                      aria-controls="blog-menu"
                    >
                      <span>Blog</span>
                      <svg
                        className={`chevron-icon ${openDropdown === 'blog' ? 'open' : ''}`}
                        width="14"
                        height="14"
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
                    </button>
                    <div
                      id="blog-menu"
                      className="dropdown-panel"
                      role="region"
                      aria-label="Blog submenu"
                      onMouseEnter={() => handleMouseEnter('blog')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <ul className="dropdown-panel-list">
                        <li>
                          <a href="#blog-tips" onClick={() => handleLinkSelect('blog-tips')}>
                            Pressure Washing Tips
                          </a>
                        </li>
                        <li>
                          <a href="#blog-projects" onClick={() => handleLinkSelect('blog-projects')}>
                            Recent Projects
                          </a>
                        </li>
                        <li>
                          <a href="#blog-guides" onClick={() => handleLinkSelect('blog-guides')}>
                            Maintenance Guides
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>

                {/* Desktop Actions: Theme Toggle & Free Quote CTA */}
                <div className="desktop-nav-actions">
                  <ThemeToggle />
                  <a
                    href="#quote"
                    className="btn-quote-cta"
                    onClick={() => handleLinkSelect('quote')}
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>

              {/* Mobile Right Controls: Theme Toggle & Hamburger */}
              <div className="mobile-header-controls">
                <ThemeToggle />
                <button
                  type="button"
                  className="hamburger-button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-controls="mobile-nav-drawer"
                >
                  {isMobileMenuOpen ? (
                    /* Close (X) icon */
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    /* 3-line hamburger icon */
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* =========================================================================
                Expanded Mobile Navigation Drawer
                ========================================================================= */}
            <div
              id="mobile-nav-drawer"
              className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
              aria-hidden={!isMobileMenuOpen}
            >
              <div className="container mobile-drawer-container">
                <ul className="mobile-nav-list">
                  <li>
                    <a
                      href="#home"
                      className={`mobile-nav-link ${activeLink === 'home' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('home')}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className={`mobile-nav-link ${activeLink === 'about' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('about')}
                    >
                      About Us
                    </a>
                  </li>

                  {/* Mobile Residential Accordion */}
                  <li className="mobile-accordion-item">
                    <button
                      type="button"
                      className="mobile-accordion-button"
                      onClick={() => toggleMobileDropdown('residential')}
                      aria-expanded={mobileExpandedDropdown === 'residential'}
                      aria-controls="mobile-residential-list"
                    >
                      <span>Residential Services</span>
                      <svg
                        className={`chevron-icon ${mobileExpandedDropdown === 'residential' ? 'open' : ''}`}
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
                    </button>
                    <div
                      id="mobile-residential-list"
                      className={`mobile-accordion-panel ${mobileExpandedDropdown === 'residential' ? 'open' : ''}`}
                    >
                      <ul className="mobile-sub-list">
                        {RESIDENTIAL_SERVICES.map((item) => (
                          <li key={item.id}>
                            <a href={item.href} onClick={() => handleLinkSelect(item.id)}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  {/* Mobile Commercial Accordion */}
                  <li className="mobile-accordion-item">
                    <button
                      type="button"
                      className="mobile-accordion-button"
                      onClick={() => toggleMobileDropdown('commercial')}
                      aria-expanded={mobileExpandedDropdown === 'commercial'}
                      aria-controls="mobile-commercial-list"
                    >
                      <span>Commercial Services</span>
                      <svg
                        className={`chevron-icon ${mobileExpandedDropdown === 'commercial' ? 'open' : ''}`}
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
                    </button>
                    <div
                      id="mobile-commercial-list"
                      className={`mobile-accordion-panel ${mobileExpandedDropdown === 'commercial' ? 'open' : ''}`}
                    >
                      <ul className="mobile-sub-list">
                        {COMMERCIAL_SERVICES.map((item) => (
                          <li key={item.id}>
                            <a href={item.href} onClick={() => handleLinkSelect(item.id)}>
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>

                  <li>
                    <a
                      href="#service-areas"
                      className={`mobile-nav-link ${activeLink === 'service-areas' ? 'active' : ''}`}
                      onClick={() => handleLinkSelect('service-areas')}
                    >
                      Service Areas
                    </a>
                  </li>

                  {/* Mobile Blog Accordion */}
                  <li className="mobile-accordion-item">
                    <button
                      type="button"
                      className="mobile-accordion-button"
                      onClick={() => toggleMobileDropdown('blog')}
                      aria-expanded={mobileExpandedDropdown === 'blog'}
                      aria-controls="mobile-blog-list"
                    >
                      <span>Blog</span>
                      <svg
                        className={`chevron-icon ${mobileExpandedDropdown === 'blog' ? 'open' : ''}`}
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
                    </button>
                    <div
                      id="mobile-blog-list"
                      className={`mobile-accordion-panel ${mobileExpandedDropdown === 'blog' ? 'open' : ''}`}
                    >
                      <ul className="mobile-sub-list">
                        <li><a href="#blog-tips" onClick={() => handleLinkSelect('blog-tips')}>Pressure Washing Tips</a></li>
                        <li><a href="#blog-projects" onClick={() => handleLinkSelect('blog-projects')}>Recent Projects</a></li>
                        <li><a href="#blog-guides" onClick={() => handleLinkSelect('blog-guides')}>Maintenance Guides</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>

                {/* Mobile Quote CTA */}
                <div className="mobile-cta-wrapper">
                  <a
                    href="#quote"
                    className="btn-quote-cta btn-quote-mobile"
                    onClick={() => handleLinkSelect('quote')}
                  >
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
