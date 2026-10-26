import { useState, useEffect } from 'react';
import './ThemeToggle.css';

/**
 * ThemeToggle Component
 *
 * Provides an accessible, keyboard-friendly button to switch between light and dark themes.
 * - Dark mode active: displays a yellowish-orange sun icon (☀) to switch to light mode.
 * - Light mode active: displays a grey-white half-moon icon (🌙) to switch to dark mode.
 * - Updates immediately upon theme change and persists to localStorage.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  // Apply theme to the root <html> element and sync localStorage on change
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Keep track of OS theme changes if the user hasn't manually set a preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(event.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const handleToggle = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      <span
        className={`theme-toggle-icon ${isDark ? 'sun-icon' : 'moon-icon'}`}
        aria-hidden="true"
      >
        {isDark ? (
          /* Sun icon in warm yellowish orange (shown when dark mode is active to switch to light) */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="currentColor" />
            <line x1="12" y1="1" x2="12" y2="3.5" />
            <line x1="12" y1="20.5" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="6" y2="6" />
            <line x1="18" y1="18" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3.5" y2="12" />
            <line x1="20.5" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="6" y2="18" />
            <line x1="18" y1="6" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          /* Half-moon icon in grey-white (shown when light mode is active to switch to dark) */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
