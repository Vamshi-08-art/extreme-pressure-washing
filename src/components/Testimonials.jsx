import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import './Testimonials.css';

/**
 * Verified Real Customer Reviews Data
 * Exact wording preserved, strictly unquoted and non-italic.
 */
const REVIEWS_DATA = [
  {
    id: 'walter-insley',
    name: 'Walter Insley',
    rating: 5,
    text: 'Extreme Pressure Washing was extreme(ly) good. The communication was exceptional. The quote came quickly and was the cost to do the job not some inflated price testing the tolerance for a high price. The crew was punctual and respected my property. The results were better than I imagined. Try this easy to work with company. You won’t be disappointed.',
  },
  {
    id: 'jeremy-hartz',
    name: 'Jeremy Hartz',
    rating: 5,
    text: 'Josh did an amazing job on our historic brick home that needed some love! He was very upfront about scheduling the work, expectations during the process and any aftercare that we needed to do. 10/10 he will be back next year!',
  },
  {
    id: 'emily-denton',
    name: 'Emily Denton',
    rating: 5,
    text: 'Josh (the owner) did an awesome job! He was on time and it only took him maybe an hour and a half. My house looks white again! Didn’t have to have before and after, but I would highly recommend good price and friendly.',
  },
  {
    id: 'eric-p',
    name: 'Eric P',
    rating: 5,
    text: 'Huge shoutout to Josh for the awesome job pressure washing our house and office today. He showed up exactly when he said he would, worked hard the entire time, and made everything look fresh and clean again. Super professional, easy to work with, and his pricing was more than fair. It’s hard to find people who actually do what they say they’re going to do these days, and Josh absolutely delivered. Highly recommend him to anyone needing pressure washing work done.',
  },
  {
    id: 'barbara',
    name: 'Barbara',
    rating: 5,
    text: 'I had my house siding as well as a large patio pressure washed today. I used Extreme Pressure Washing. Josh did a fantastic job!! My house sparkled and my patio looked new. I noticed that Josh takes pride in his work. He was meticulous and is a hard worker. I will certainly be using Josh with Extreme Pressure Washing again. I highly recommend!!',
  },
];

// 3 identical sets of 5 reviews (15 items total)
// Set 0: indices 0-4 (buffer for backward navigation)
// Set 1: indices 5-9 (active viewport set)
// Set 2: indices 10-14 (buffer for forward navigation)
const ALL_REVIEWS = [
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const isSteppingRef = useRef(false);
  const isOffscreenRef = useRef(false);
  const isTabHiddenRef = useRef(false);
  const lastTimeRef = useRef(performance.now());
  const stepRef = useRef(380);
  const setWidthRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const animStepIdRef = useRef(null);
  const touchStartXRef = useRef(0);
  const resumeTimerRef = useRef(null);
  const isInitializedRef = useRef(false);
  const targetIndexRef = useRef(0);
  const [mobileCardWidth, setMobileCardWidth] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      const isNarrow = window.innerWidth <= 480;
      const containerPad = isNarrow ? 16 : 24;
      return Math.max(200, window.innerWidth - containerPad - 72);
    }
    return 0;
  });

  // Helper to schedule marquee movement resumption after exactly 5 seconds of inactivity
  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        lastTimeRef.current = performance.now();
        isPausedRef.current = false;
      }
    }, 5000);
  }, []);

  // Measure card step and set width accurately from DOM elements
  const measureTrack = useCallback(() => {
    if (viewportRef.current && trackRef.current && trackRef.current.children.length > 1) {
      const isMobile = window.innerWidth <= 768;
      let measuredStep = 0;
      if (isMobile) {
        // On mobile: exactly one complete card per viewport
        const vWidth = viewportRef.current.clientWidth;
        if (vWidth > 0) {
          setMobileCardWidth(vWidth);
          measuredStep = vWidth;
        }
      } else {
        setMobileCardWidth(0);
        const card0 = trackRef.current.children[0];
        const card1 = trackRef.current.children[1];
        measuredStep = card1.offsetLeft - card0.offsetLeft || card0.offsetWidth;
      }

      if (measuredStep > 0) {
        const prevStep = stepRef.current;
        stepRef.current = measuredStep;
        setWidthRef.current = measuredStep * REVIEWS_DATA.length;

        // Initialize offset to Set 1 (middle copy) on first measure
        if (!isInitializedRef.current) {
          offsetRef.current = setWidthRef.current;
          isInitializedRef.current = true;
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
          }
        } else if (prevStep > 0 && prevStep !== measuredStep) {
          // Keep current card alignment when window resizes
          const currentSetOffset = offsetRef.current % setWidthRef.current;
          const cardIndex = Math.round(currentSetOffset / prevStep);
          offsetRef.current = setWidthRef.current + cardIndex * measuredStep;
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
          }
        }
      }
    }
  }, []);

  // Measure before browser paint to prevent layout jumps
  useLayoutEffect(() => {
    measureTrack();
  }, [measureTrack]);

  // Continuous right-to-left marquee animation loop
  useEffect(() => {
    measureTrack();

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      isPausedRef.current = true;
    }

    lastTimeRef.current = performance.now();
    const speed = 0.55; // Pixels per frame (~33px per second, calm and readable)

    const tick = (now) => {
      const delta = Math.min((now - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = now;

      if (
        !isPausedRef.current &&
        !isSteppingRef.current &&
        !isOffscreenRef.current &&
        !isTabHiddenRef.current &&
        setWidthRef.current > 0
      ) {
        offsetRef.current += speed * delta;

        const setWidth = setWidthRef.current;
        // Seamless wrap within Set 1 range [setWidth, 2 * setWidth)
        if (offsetRef.current >= 2 * setWidth) {
          offsetRef.current -= setWidth;
        } else if (offsetRef.current < setWidth) {
          offsetRef.current += setWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    // Pause animation when off-screen to avoid unnecessary rendering
    let observer;
    if (sectionRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isOffscreenRef.current = !entry.isIntersecting;
          if (entry.isIntersecting) {
            lastTimeRef.current = performance.now();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(sectionRef.current);
    }

    // Pause animation when tab or window is backgrounded
    const handleVisibilityChange = () => {
      isTabHiddenRef.current = document.hidden;
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      measureTrack();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (animStepIdRef.current) cancelAnimationFrame(animStepIdRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (observer) observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, [measureTrack]);

  // Smooth ease-out glide to target offset without jumping or losing cards
  const animateToOffset = useCallback((targetOffset) => {
    isSteppingRef.current = true;
    if (animStepIdRef.current) cancelAnimationFrame(animStepIdRef.current);

    const startOffset = offsetRef.current;
    const distance = targetOffset - startOffset;
    const duration = 320; // 320ms smooth easeOut glide
    const startTime = performance.now();

    const stepAnim = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startOffset + distance * ease;

      offsetRef.current = current;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(-${current}px, 0, 0)`;
      }

      if (progress < 1) {
        animStepIdRef.current = requestAnimationFrame(stepAnim);
      } else {
        // Settled position: normalize within Set 1 range so next click has infinite buffer
        const setWidth = setWidthRef.current;
        if (setWidth > 0) {
          let settled = targetOffset;
          while (settled >= 2 * setWidth) settled -= setWidth;
          while (settled < setWidth) settled += setWidth;
          offsetRef.current = settled;
          targetIndexRef.current = Math.round(settled / (stepRef.current || 360));
          if (trackRef.current) {
            trackRef.current.style.transform = `translate3d(-${settled}px, 0, 0)`;
          }
        }
        isSteppingRef.current = false;
        lastTimeRef.current = performance.now();
      }
    };

    animStepIdRef.current = requestAnimationFrame(stepAnim);
  }, []);

  // Arrow click handlers: step forward or backward by 1 full discrete card step
  const handleNext = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    isPausedRef.current = true;

    const step = stepRef.current || 360;
    let baseIndex;
    if (isSteppingRef.current) {
      baseIndex = targetIndexRef.current;
    } else {
      baseIndex = Math.floor(offsetRef.current / step + 0.05);
    }
    const nextIndex = baseIndex + 1;
    targetIndexRef.current = nextIndex;
    animateToOffset(nextIndex * step);
    scheduleResume();
  }, [animateToOffset, scheduleResume]);

  const handlePrev = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    isPausedRef.current = true;

    const step = stepRef.current || 360;
    let baseIndex;
    if (isSteppingRef.current) {
      baseIndex = targetIndexRef.current;
    } else {
      baseIndex = Math.ceil(offsetRef.current / step - 0.05);
    }
    const prevIndex = baseIndex - 1;
    targetIndexRef.current = prevIndex;
    animateToOffset(prevIndex * step);
    scheduleResume();
  }, [animateToOffset, scheduleResume]);

  // Pause control handlers
  const handleMouseEnter = () => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    scheduleResume();
  };

  const handleFocus = () => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleBlur = () => {
    scheduleResume();
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
        return;
      }
    }
    scheduleResume();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="container testimonials-container">
        {/* Central Section Heading */}
        <div className="testimonials-header">
          <h2 id="testimonials-heading" className="testimonials-title">
            What Our Clients Say
          </h2>
        </div>

        {/* Carousel Outer Shell with Flanking Circular Arrows */}
        <div
          className="testimonials-carousel-shell"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer Reviews Carousel"
        >
          {/* Previous Reviews Arrow */}
          <button
            type="button"
            className="carousel-nav-btn prev-arrow"
            onClick={handlePrev}
            aria-label="Previous review"
            title="Previous review"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Carousel Viewport with Gradient Edge Fades on Desktop */}
          <div
            ref={viewportRef}
            className="carousel-viewport"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-label="Customer reviews track"
          >
            {/* Seamless Infinite Marquee Track */}
            <div
              ref={trackRef}
              className="carousel-track"
            >
              {ALL_REVIEWS.map((review, idx) => {
                const isDuplicate = idx < REVIEWS_DATA.length || idx >= REVIEWS_DATA.length * 2;
                return (
                  <div
                    key={`${review.id}-${idx}`}
                    className="review-card-item"
                    style={
                      mobileCardWidth > 0
                        ? {
                            width: `${mobileCardWidth}px`,
                            minWidth: `${mobileCardWidth}px`,
                            maxWidth: `${mobileCardWidth}px`,
                            flex: `0 0 ${mobileCardWidth}px`,
                          }
                        : undefined
                    }
                    aria-hidden={isDuplicate ? 'true' : undefined}
                  >
                    <article className="review-card">
                      {/* 1. Five gold star icons */}
                      <div className="review-stars" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                        {[...Array(review.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="star-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>

                      {/* 2. Full review text (unquoted, non-italic, unclipped) */}
                      <div className="review-body">
                        <p className="review-text">
                          {review.text}
                        </p>
                      </div>

                      {/* 3. Thin horizontal divider */}
                      <div className="review-divider" aria-hidden="true" />

                      {/* 4. Reviewer's name aligned to the left */}
                      <div className="review-author">
                        <span className="review-author-name">{review.name}</span>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Reviews Arrow */}
          <button
            type="button"
            className="carousel-nav-btn next-arrow"
            onClick={handleNext}
            aria-label="Next review"
            title="Next review"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Read More on Google CTA */}
        <div className="reviews-cta-container">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Extreme+Pressure+Washing+Rock+Hill+SC"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-google-reviews"
            aria-label="Read more customer reviews on Google"
          >
            <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
            <span>READ MORE ON GOOGLE</span>
          </a>
        </div>
      </div>
    </section>
  );
}
