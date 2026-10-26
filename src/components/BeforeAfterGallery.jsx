import { useState, useRef, useCallback, useEffect } from 'react';
import './BeforeAfterGallery.css';

/**
 * Single Image Comparison Slider Component
 *
 * Implements an accessible, independent before-and-after slider supporting
 * mouse drag, touch drag, and keyboard arrow key adjustments.
 *
 * Badge crossing behavior:
 * - When handle moves right toward the AFTER badge, the AFTER badge disappears
 *   as the handle crosses it and the AFTER image becomes covered.
 * - When handle moves left toward the BEFORE badge, the BEFORE badge disappears
 *   as the handle crosses it and the BEFORE image becomes covered.
 * - Both badges remain visible while their respective image areas are meaningfully visible.
 */
function ImageComparisonItem({ id, label, beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const beforeBadgeRef = useRef(null);
  const afterBadgeRef = useRef(null);

  // Dynamic cutoffs based on actual badge widths and container size
  const [badgeThresholds, setBadgeThresholds] = useState({ beforeMax: 18, afterMin: 82 });

  useEffect(() => {
    const updateThresholds = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth || 500;

      const beforeWidth = beforeBadgeRef.current?.offsetWidth || 72;
      const afterWidth = afterBadgeRef.current?.offsetWidth || 65;

      // 14px left padding + badge width + 6px safety buffer
      const beforeCutoff = Math.min(35, Math.max(12, ((14 + beforeWidth + 6) / containerWidth) * 100));
      // 14px right padding + badge width + 6px safety buffer from the right edge
      const afterCutoff = Math.max(65, Math.min(88, 100 - ((14 + afterWidth + 6) / containerWidth) * 100));

      setBadgeThresholds({ beforeMax: beforeCutoff, afterMin: afterCutoff });
    };

    updateThresholds();
    window.addEventListener('resize', updateThresholds);
    return () => window.removeEventListener('resize', updateThresholds);
  }, []);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(offsetX, rect.width));
    const percentage = Math.round((clampedX / rect.width) * 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  // Badge visibility depends on handle position relative to each badge's physical area
  const showBeforeBadge = sliderPosition > badgeThresholds.beforeMax;
  const showAfterBadge = sliderPosition < badgeThresholds.afterMin;

  return (
    <div className="comparison-card">
      <div
        ref={containerRef}
        className="comparison-slider-stage"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Underneath: AFTER Image */}
        <img
          src={afterImage}
          alt={`${label || 'Surface'} - After clean restoration`}
          className="comparison-img after-img"
          loading="lazy"
        />

        {/* AFTER badge: disappears when the handle moves right and crosses its boundary */}
        <span
          ref={afterBadgeRef}
          className={`badge-after ${!showAfterBadge ? 'badge-hidden' : ''}`}
          aria-hidden={!showAfterBadge}
        >
          AFTER
        </span>

        {/* Top Layer: BEFORE Image (Clipped precisely by sliderPosition %) */}
        <div
          className="comparison-before-wrapper"
          style={{ clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={`${label || 'Surface'} - Before pressure washing`}
            className="comparison-img before-img"
            loading="lazy"
          />
        </div>

        {/* BEFORE badge: disappears when the handle moves left and crosses its boundary */}
        <span
          ref={beforeBadgeRef}
          className={`badge-before ${!showBeforeBadge ? 'badge-hidden' : ''}`}
          aria-hidden={!showBeforeBadge}
        >
          BEFORE
        </span>

        {/* Draggable Divider Handle */}
        <div
          className="comparison-handle"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          tabIndex={0}
          role="slider"
          aria-label={`Interactive before and after comparison slider for ${label || 'surface'}`}
          aria-valuenow={sliderPosition}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
        >
          <div className="handle-divider-line" />
          <div className="handle-knob">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section id="gallery" className="gallery-section" aria-labelledby="gallery-heading">
      <div className="container">
        {/* Section Header */}
        <div className="gallery-header">
          <span className="section-eyebrow">SEE THE DIFFERENCE</span>
          <h2 id="gallery-heading" className="gallery-title">
            A Fresh Look for Every Surface
          </h2>
        </div>

        {/* 4 Independent Comparisons Grid (2x2 on desktop, 1 col on mobile) */}
        <div className="comparisons-grid">
          <ImageComparisonItem
            id="driveway"
            label="Concrete Driveway"
            beforeImage="/images/Before%20&%20After%20pairs/1.1.jpg"
            afterImage="/images/Before%20&%20After%20pairs/1.2.jpg"
          />

          <ImageComparisonItem
            id="deck"
            label="Wood Deck Restoration"
            beforeImage="/images/Before%20&%20After%20pairs/2.1.jpg"
            afterImage="/images/Before%20&%20After%20pairs/2.2.jpg"
          />

          <ImageComparisonItem
            id="brick-steps"
            label="Brick Front Steps"
            beforeImage="/images/Before%20&%20After%20pairs/3.1.jpg"
            afterImage="/images/Before%20&%20After%20pairs/3.2.jpg"
          />

          <ImageComparisonItem
            id="exterior-siding"
            label="Exterior Siding Building"
            beforeImage="/images/Before%20&%20After%20pairs/4.1.jpg"
            afterImage="/images/Before%20&%20After%20pairs/4.2.jpg"
          />
        </div>

        {/* View More Button linking to Google Business Profile Photos */}
        <div className="gallery-cta-wrapper">
          <a
            href="https://www.google.com/maps/place/Extreme+Pressure+Washing+Rock+Hill/@35.1104605,-80.9976809,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgID_8Lam8gE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9TSrghePd4_zkSA1B_bq_-evsYq49ZNrvFpk1QlVTRTQwZ44OB5qkOU-j8ZhKdo-gBc0DKEhQrhn6Wm5hScjohT61ajJkFjeagZZFBu73QmWZ_ePcduZvFwYQ7DShWxbnAs0YAVsA%3Dw529-h298-k-no!7i1850!8i1042!4m13!1m2!2m1!1sextreme+pressure+washing+rock+hill!3m9!1s0xc8bb4048787e979:0x1ba3a0dec4c83c16!8m2!3d35.1104605!4d-80.9976809!10e5!14m1!1BCgIgAQ!15sCiJleHRyZW1lIHByZXNzdXJlIHdhc2hpbmcgcm9jayBoaWxsWiQiImV4dHJlbWUgcHJlc3N1cmUgd2FzaGluZyByb2NrIGhpbGySARhwcmVzc3VyZV93YXNoaW5nX3NlcnZpY2XgAQA!16s%2Fg%2F11wb0qn2k9?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gallery-more"
            aria-label="View more project photos on Google Maps (opens in new tab)"
          >
            VIEW MORE
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
