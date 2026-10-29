import { navigateTo } from '../utils/navigation';
import './MobileActionBar.css';

/**
 * MobileActionBar Component
 *
 * Fixed action bar docked to the bottom of the viewport on mobile devices only.
 * - Left: CALL NOW (tel:803-833-0988, background #1f2630 matching navbar)
 * - Right: FREE ESTIMATE (href="/quote", background var(--color-interactive, #0A8CBF))
 * - Equal 50/50 width, no gap between buttons, with safe-area-inset-bottom support.
 * - Hidden on desktop and tablet layouts (breakpoint: 1024px).
 */
export default function MobileActionBar() {
  return (
    <aside className="mobile-action-bar" aria-label="Mobile quick contact actions">
      <div className="mobile-action-bar-inner">
        <a
          href="tel:803-833-0988"
          className="mobile-action-btn mobile-action-call"
          aria-label="Call Extreme Pressure Washing at 803-833-0988"
        >
          <svg
            className="mobile-action-icon"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>CALL NOW</span>
        </a>

        <a
          href="/quote"
          className="mobile-action-btn mobile-action-estimate"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/quote');
          }}
          aria-label="Request a free pressure washing estimate (Dedicated Quote Page)"
        >
          <span>FREE ESTIMATE</span>
        </a>
      </div>
    </aside>
  );
}

