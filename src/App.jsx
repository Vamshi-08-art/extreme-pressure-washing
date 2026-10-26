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
import './App.css';

/**
 * Extreme Pressure Washing Rock Hill - Complete Homepage
 *
 * Assembles all 11 homepage sections in coordinated sequence:
 * 1. Header & Navigation (Preserved)
 * 2. Hero Section (Preserved)
 * 3. Our Services (9 Interactive Cards)
 * 4. Why Choose Us (Owner-Operated & 4 Pillars)
 * 5. By the Numbers (Verified Metrics & Credibility)
 * 6. Testimonials (Multi-card Touch & Keyboard Carousel)
 * 7. Request a Free Quote (Full-width Call to Action)
 * 8. Before & After Gallery (2 Independent Interactive Sliders)
 * 9. Service Areas (5 Regional Hubs & Coverage Map)
 * 10. Frequently Asked Questions (14-item Accessible Accordion)
 * 11. Footer (Multi-column Links & Contact Details)
 */
function App() {
  return (
    <div className="site-layout">
      {/* 1. Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main id="main-content">
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
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Fixed Mobile Bottom Action Bar */}
      <MobileActionBar />
    </div>
  );
}

export default App;
