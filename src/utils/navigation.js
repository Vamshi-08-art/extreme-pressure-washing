/**
 * Lightweight Client-Side Navigation Utility for Extreme Pressure Washing
 *
 * Provides standard browser history management (pushState / popstate)
 * and seamless switching between the Homepage ('/') and Quote Page ('/quote').
 */

export function getCurrentRoute() {
  if (typeof window === 'undefined') return '/';
  const pathname = (window.location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
  const hash = (window.location.hash || '').toLowerCase();

  if (
    pathname === '/quote' ||
    pathname === '/get-a-free-quote' ||
    hash === '#/quote' ||
    hash === '#quote' ||
    hash === '#quote-page'
  ) {
    return '/quote';
  }

  return '/';
}

export function navigateTo(target) {
  if (typeof window === 'undefined') return;

  const isQuote =
    target === '/quote' ||
    target === 'quote' ||
    target === '#quote' ||
    target === '#/quote';

  if (isQuote) {
    if (window.location.pathname !== '/quote') {
      window.history.pushState(null, '', '/quote');
    }
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Target is home or a hash anchor on home (e.g. '/' or '/#services' or '#services')
  const anchor = target && target.includes('#') ? target.substring(target.indexOf('#')) : '';

  if (window.location.pathname !== '/') {
    window.history.pushState(null, '', `/${anchor}`);
  } else if (anchor) {
    window.history.pushState(null, '', anchor);
  } else {
    window.history.pushState(null, '', '/');
  }

  window.dispatchEvent(new Event('popstate'));

  if (anchor) {
    setTimeout(() => {
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

