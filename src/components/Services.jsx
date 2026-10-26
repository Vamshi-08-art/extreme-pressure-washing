import { useState } from 'react';
import './Services.css';

/**
 * Our Services Component
 *
 * Displays the 9 primary pressure washing and exterior restoration services
 * with interactive hover cards, accessible touch toggles, and direct links.
 */
const SERVICES_DATA = [
  {
    id: 'soft-wash',
    title: 'Soft Wash',
    description: 'Gentle low-pressure cleaning for delicate siding, stucco, and trim.',
    image: '/images/Service-card%20images/Soft%20washing.jpg',
    link: '#service-soft-wash',
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing',
    description: 'High-pressure deep cleaning that lifts tough dirt, grime, and buildup.',
    image: '/images/Service-card%20images/Pressure%20washing.jpg',
    link: '#service-pressure-washing',
  },
  {
    id: 'concrete-cleaning',
    title: 'Concrete Cleaning',
    description: 'Restores driveways, sidewalks, and walkways by lifting heavy stains.',
    image: '/images/Service-card%20images/Concrete%20Cleaning.jpg',
    link: '#service-concrete-cleaning',
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    description: 'Safe soft washing to eliminate dark algae streaks and moss.',
    image: '/images/Service-card%20images/Roof%20Cleaning.jpg',
    link: '#service-roof-cleaning',
  },
  {
    id: 'deck-staining',
    title: 'Deck Staining',
    description: 'Protective sealing and staining to preserve outdoor wood against weathering.',
    image: '/images/Service-card%20images/Deck%20Staining.jpg',
    link: '#service-deck-staining',
  },
  {
    id: 'wood-restoration',
    title: 'Wood Restoration',
    description: 'Deep cleaning to revive weathered gray wood to its natural grain.',
    image: '/images/Service-card%20images/Wood%20Restoration.jpg',
    link: '#service-wood-restoration',
  },
  {
    id: 'fence-sealing',
    title: 'Fence Sealing',
    description: 'Durable weather-resistant sealing that protects wood and vinyl fencing.',
    image: '/images/Service-card%20images/Fence%20Staining.jpg',
    link: '#service-fence-sealing',
  },
  {
    id: 'paver-sealing',
    title: 'Paver Sealing',
    description: 'Protects joint sand, prevents weeds, and enhances natural stone color.',
    image: '/images/Service-card%20images/Paver%20Sealing.jpg',
    link: '#service-paver-sealing',
  },
  {
    id: 'exterior-cleaning',
    title: 'Exterior Cleaning',
    description: 'Complete exterior washing to restore residential and commercial curb appeal.',
    image: '/images/Service-card%20images/Exterior%20Cleaning.jpg',
    link: '#service-exterior-cleaning',
  },
];

export default function Services() {
  const [activeTouchCard, setActiveTouchCard] = useState(null);

  const handleCardClick = (id) => {
    // Allows mobile users to tap to reveal description
    setActiveTouchCard((prev) => (prev === id ? null : id));
  };

  return (
    <section id="services" className="services-section" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <div className="services-header">
          <span className="section-eyebrow">OUR SERVICES</span>
          <h2 id="services-heading" className="services-title">
            Our Professional Pressure Washing Services
          </h2>
          <p className="services-description">
            From residential to commercial, our expert pressure washing and cleaning services will revitalize your exterior surfaces. Whether it’s restoring curb appeal or maintaining cleanliness, we offer a range of solutions designed to keep your property looking its best year-round.
          </p>
        </div>

        {/* 9 Service Cards Grid */}
        <div className="services-grid">
          {SERVICES_DATA.map((service) => {
            const isTouchActive = activeTouchCard === service.id;
            return (
              <a
                key={service.id}
                href={service.link}
                className={`service-card ${isTouchActive ? 'touch-active' : ''}`}
                onClick={(e) => {
                  // If on a touch device and card isn't active yet, tap reveals description
                  if (window.matchMedia('(hover: none)').matches && !isTouchActive) {
                    e.preventDefault();
                    handleCardClick(service.id);
                  }
                }}
                aria-label={`${service.title} - ${service.description} (Dedicated page pending configuration)`}
                title={`${service.title} (Dedicated page link)`}
              >
                <div className="service-card-image-wrap">
                  <img
                    src={service.image}
                    alt={`${service.title} service by Extreme Pressure Washing`}
                    className="service-card-img"
                    loading="lazy"
                  />
                  <div className="service-card-gradient" />
                </div>

                <div className="service-card-content">
                  <div className="service-card-title-row">
                    <h3 className="service-card-title">{service.title}</h3>
                  </div>
                  <p className="service-card-text">{service.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

