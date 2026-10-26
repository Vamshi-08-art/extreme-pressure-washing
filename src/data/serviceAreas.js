/**
 * Confirmed Service Areas Data for Extreme Pressure Washing
 *
 * All coordinates resolved from verified geographic data.
 * All Google Maps links match the exact confirmed client destinations.
 */
export const SERVICE_AREAS = [
  {
    id: 'rock-hill',
    name: 'Rock Hill, SC',
    shortName: 'Rock Hill',
    slug: 'rock-hill',
    label: 'Pressure Washing in Rock Hill, SC',
    link: '#service-area-rock-hill',
    mapUrl: 'https://maps.app.goo.gl/ogwDaGv7xdnKoeCC8',
    lat: 34.9249,
    lng: -81.0259,
    isPrimary: true,
    tagline: 'Primary Operations Hub & Headquarters',
  },
  {
    id: 'fort-mill',
    name: 'Fort Mill, SC',
    shortName: 'Fort Mill',
    slug: 'fort-mill',
    label: 'Pressure Washing in Fort Mill, SC',
    link: '#service-area-fort-mill',
    mapUrl: 'https://maps.app.goo.gl/48nLx7rz9zdFzCLM6',
    lat: 35.0074,
    lng: -80.9451,
    isPrimary: false,
    tagline: 'Residential & Commercial Exterior Cleaning',
  },
  {
    id: 'york',
    name: 'York, SC',
    shortName: 'York',
    slug: 'york',
    label: 'Pressure Washing in York, SC',
    link: '#service-area-york',
    mapUrl: 'https://maps.app.goo.gl/sbvciYhFhSjo5QqV8',
    lat: 34.9943,
    lng: -81.2420,
    isPrimary: false,
    tagline: 'Complete Historic & Modern Property Washing',
  },
  {
    id: 'clover',
    name: 'Clover, SC',
    shortName: 'Clover',
    slug: 'clover',
    label: 'Pressure Washing in Clover, SC',
    link: '#service-area-clover',
    mapUrl: 'https://maps.app.goo.gl/ExspYiFBFsamYfRw5',
    lat: 35.1118,
    lng: -81.2265,
    isPrimary: false,
    tagline: 'Professional Surface Cleaning & Soft Washing',
  },
  {
    id: 'lake-wylie',
    name: 'Lake Wylie, SC',
    shortName: 'Lake Wylie',
    slug: 'lake-wylie',
    label: 'Pressure Washing in Lake Wylie, SC',
    link: '#service-area-lake-wylie',
    mapUrl: 'https://maps.app.goo.gl/9gCULxZqZv5pr5wN8',
    lat: 35.1082,
    lng: -81.0662,
    isPrimary: false,
    tagline: 'Waterfront Home & Dock Pressure Washing',
  },
  {
    id: 'charlotte',
    name: 'Charlotte, NC',
    shortName: 'Charlotte',
    slug: 'charlotte',
    label: 'Pressure Washing in Charlotte, NC',
    link: '#service-area-charlotte',
    mapUrl: 'https://maps.app.goo.gl/71DpWpDgH7XMrrJbA',
    lat: 35.2271,
    lng: -80.8431,
    isPrimary: false,
    tagline: 'Regional Commercial & Residential Cleaning',
  },
];

/**
 * Helper to determine the active location name based on URL hash or path.
 * Defaults to 'Rock Hill' for the main homepage.
 */
export function getActiveServiceAreaLocation() {
  if (typeof window === 'undefined') return 'Rock Hill';
  const hash = (window.location.hash || '').toLowerCase();
  const path = (window.location.pathname || '').toLowerCase();

  for (const area of SERVICE_AREAS) {
    if (hash.includes(area.slug) || path.includes(area.slug)) {
      return area.shortName;
    }
  }

  return 'Rock Hill';
}

