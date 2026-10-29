import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import QuoteCTA from './components/QuoteCTA';
import BeforeAfterGallery from './components/BeforeAfterGallery';
import ServiceAreas from './components/ServiceAreas';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';
import QuotePage from './components/QuotePage';
import { getCurrentRoute } from './utils/navigation';
import './App.css';

/**
 * Extreme Pressure Washing Rock Hill - Main Application
 *
 * Supports seamless client-side routing between:
 * - Homepage ('/'): All 10 homepage sections
 * - Dedicated Quote Page ('/quote'): Request a Free Quote page with embedded Testimonials
 * Header, Footer, and MobileActionBar persist across all pages.
 */
function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window !== 'undefined') return getCurrentRoute();
    return '/';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(getCurrentRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const isQuotePage = currentRoute === '/quote';

  return (
    <div className="site-layout">
      {/* 1. Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content">
        {isQuotePage ? (
          <QuotePage />
        ) : (
          <>
            {/* 2. Hero Section */}
            <Hero />

            {/* 3. Our Services */}
            <Services />

            {/* 4. Why Choose Us */}
            <WhyChooseUs />

            {/* 5. By the Numbers */}
            <Statistics />

            {/* 6. Testimonials */}
            <Testimonials />

            {/* 7. Request a Free Quote */}
            <QuoteCTA />

            {/* 8. Before & After Gallery */}
            <BeforeAfterGallery />

            {/* 9. Service Areas */}
            <ServiceAreas />

            {/* 10. Frequently Asked Questions */}
            <FAQ />
          </>
        )}
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Action Bar */}
      <MobileActionBar />
    </div>
  );
}

export default App;
