import './Statistics.css';

/**
 * Statistics Component ("By the Numbers")
 *
 * Displays verified business milestones and brand credibility metrics:
 * - 100+ Google Reviews
 * - 5.0 Overall Rating
 * - 1,000+ Homes Cleaned
 * - Founded in 2015
 */
const STATS_DATA = [
  {
    id: 'google-reviews',
    value: '100+',
    label: 'Google Reviews',
    accent: false,
  },
  {
    id: 'overall-rating',
    value: '5.0 ★',
    label: 'Overall Rating',
    accent: false,
  },
  {
    id: 'homes-cleaned',
    value: '1,000+',
    label: 'Homes Cleaned',
    accent: false,
  },
  {
    id: 'established',
    value: '2015',
    label: 'Founded in',
    accent: false,
  },
];

export default function Statistics() {
  return (
    <section className="stats-section" aria-labelledby="stats-heading">
      <div className="container">
        <div className="stats-layout">
          {/* Left Side: Eyebrow, Heading, Description, and 2x2 Grid */}
          <div className="stats-content">
            <span className="section-eyebrow stats-eyebrow">BY THE NUMBERS</span>
            <h2 id="stats-heading" className="stats-title">
              Professional Pressure Washing You Can Trust
            </h2>
            <p className="stats-description">
              See the results of our dedication through verified customer satisfaction and proven community milestones.
            </p>

            <div className="stats-grid">
              {STATS_DATA.map((stat) => (
                <div key={stat.id} className={`stat-card ${stat.accent ? 'stat-card-accent' : ''}`}>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Visual Panel with Verified Standalone Brand Logo */}
          <div className="stats-visual-panel" aria-label="Extreme Pressure Washing brand logo">
            <div className="stats-logo-card">
              <img
                src="/images/By%20the%20Numbers%20background/EPW%20logo.png"
                alt="Extreme Pressure Washing Rock Hill official brand logo"
                className="stats-logo-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
