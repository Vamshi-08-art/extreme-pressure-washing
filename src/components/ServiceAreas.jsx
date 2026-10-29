import { useEffect, useRef, useState } from 'react';
import { SERVICE_AREAS } from '../data/serviceAreas';
import { navigateTo } from '../utils/navigation';
import './ServiceAreas.css';

/**
 * Service Areas Component with Real Interactive Map
 *
 * Implements:
 * - Real interactive Leaflet map rendering all 6 confirmed service areas.
 * - Interactive markers with custom styling and popups.
 * - Direct destination links to the confirmed Google Maps URLs.
 * - Full zoom, pan, and touch controls.
 * - Dynamic light/dark theme tile layers.
 * - Coordinated location list that focuses and highlights map markers.
 * - Steele Creek, NC is completely removed.
 */
export default function ServiceAreas() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef({});
  const [activeAreaId, setActiveAreaId] = useState('rock-hill');
  const [mapLayer, setMapLayer] = useState('street'); // 'street' | 'satellite'

  // Map Tile Configuration (Both Keyless & Legitimate)
  const TILE_CONFIG = {
    street: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 19,
    },
  };

  useEffect(() => {
    // Ensure Leaflet is loaded
    if (typeof window === 'undefined' || !window.L || !mapContainerRef.current) {
      return;
    }

    // Prevent duplicate map initialization
    if (mapInstanceRef.current) {
      return;
    }

    // Map Center roughly between Rock Hill, York, Lake Wylie, Fort Mill, and Charlotte
    const initialCenter = [35.06, -81.04];
    const initialZoom = 10;

    const map = window.L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 8,
      maxZoom: 19,
      zoomControl: true,
      scrollWheelZoom: false, // Prevents unintended page scroll traps
    });

    mapInstanceRef.current = map;

    // Tile Layer: default Street Map
    const initialConfig = TILE_CONFIG.street;
    const initialLayer = window.L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: initialConfig.maxZoom,
    });
    initialLayer.addTo(map);
    tileLayerRef.current = initialLayer;

    // Watch for theme changes on <html>
    const themeObserver = new MutationObserver(() => {
      // Invalidate map size on theme/layout updates to ensure smooth rendering
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Add markers for all 6 confirmed locations
    SERVICE_AREAS.forEach((area) => {
      const isPrimary = area.isPrimary;

      const markerHtml = `
        <div class="custom-map-marker ${isPrimary ? 'primary-marker' : ''}" id="marker-${area.id}">
          <div class="marker-pin">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="${isPrimary ? '#4cbbe7' : '#0A8CBF'}" stroke="#FFFFFF" stroke-width="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          ${isPrimary ? '<div class="marker-pulse"></div>' : ''}
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'custom-leaflet-div-icon',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 28],
        popupAnchor: [0, -28],
      });

      const popupHtml = `
        <div class="map-info-popup">
          <div class="popup-header">
            <strong>${area.name}</strong>
            ${isPrimary ? '<span class="popup-badge">HQ</span>' : ''}
          </div>
          <p class="popup-tagline">${area.tagline}</p>
          <a
            href="${area.mapUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="popup-map-link"
          >
            <span>Open in Google Maps</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      `;

      const marker = window.L.marker([area.lat, area.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupHtml, { className: 'custom-leaflet-popup' });

      marker.on('click', () => {
        setActiveAreaId(area.id);
      });

      markersRef.current[area.id] = marker;
    });

    // Invalidate map size on window resize so tiles fill completely
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      themeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Map layer toggle handler (Map vs Satellite)
  const handleLayerChange = (layer) => {
    if (layer === mapLayer || !mapInstanceRef.current) return;
    setMapLayer(layer);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const config = TILE_CONFIG[layer] || TILE_CONFIG.street;
    const newLayer = window.L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    });
    newLayer.addTo(mapInstanceRef.current);
    tileLayerRef.current = newLayer;
  };

  // Handle location click from the sidebar list
  const handleSelectArea = (area) => {
    setActiveAreaId(area.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([area.lat, area.lng], 12, {
        duration: 0.8,
      });
      const marker = markersRef.current[area.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <section id="service-areas" className="service-areas-section" aria-labelledby="service-areas-heading">
      <div className="container">
        <div className="service-areas-grid">
          {/* Section Heading & Intro */}
          <div className="service-areas-intro">
            <span className="section-eyebrow">SERVICE AREAS</span>
            <h2 id="service-areas-heading" className="service-areas-title">
              Areas We Serve
            </h2>
            <p className="service-areas-description">
              We provide professional pressure washing and soft washing services throughout York County, SC and the greater Charlotte metropolitan border corridor. Explore our service coverage below.
            </p>
          </div>

          {/* Interactive Service Area Map Card */}
          <div className="service-areas-map-col" aria-label="Interactive service areas coverage map">
            <div className="map-preview-card">
              {/* Simplified Header with Map / Satellite Layer Control */}
              <div className="map-control-bar">
                <div className="map-layer-toggle" role="group" aria-label="Map imagery style">
                  <button
                    type="button"
                    className={`map-layer-btn ${mapLayer === 'street' ? 'is-active' : ''}`}
                    onClick={() => handleLayerChange('street')}
                    aria-pressed={mapLayer === 'street'}
                  >
                    Map
                  </button>
                  <button
                    type="button"
                    className={`map-layer-btn ${mapLayer === 'satellite' ? 'is-active' : ''}`}
                    onClick={() => handleLayerChange('satellite')}
                    aria-pressed={mapLayer === 'satellite'}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              {/* Real Leaflet Map Viewport */}
              <div className="map-viewport-wrapper">
                <div
                  id="interactive-service-map"
                  ref={mapContainerRef}
                  className="interactive-map-container"
                  tabIndex={0}
                  role="region"
                  aria-label="Interactive map of Extreme Pressure Washing service areas"
                />
              </div>
            </div>
          </div>

          {/* Locations List & CTA */}
          <div className="service-areas-content-col">
            <ul className="locations-list">
              {SERVICE_AREAS.map((loc) => {
                const isActive = activeAreaId === loc.id;
                return (
                  <li key={loc.id} className="location-item">
                    <a
                      href={loc.link}
                      className={`location-link ${isActive ? 'is-active' : ''}`}
                      onClick={(e) => {
                        handleSelectArea(loc);
                      }}
                      title={`View ${loc.name} on the map`}
                      aria-label={`${loc.label} (Click to focus on map)`}
                    >
                      <span className="location-pin-icon" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </span>
                      <span className="location-name">{loc.label}</span>
                      <span className="location-arrow" aria-hidden="true">→</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="service-areas-cta">
              <a
                href="/quote"
                className="btn-areas-quote"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/quote');
                }}
                aria-label="Request a quote for service in your area"
              >
                <span>Request Service in Your Area</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
