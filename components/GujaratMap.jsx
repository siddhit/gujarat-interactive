'use client';

import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ERAS } from '../data/eras';

// ── SVG marker icons from the Visual Identity spec ───────────────────────────
// Person: pen-stroke on madder (#6B1F2E)
// Place:  stepped-well on terracotta (#B04E18)
// Event:  concentric ripple on peacock teal (#1B5A66)

const MARKER_SVGS = {
  person: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#6B1F2E"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <path d="M22 42 L28 24 L34 30 L40 22" stroke="#F5EFE2" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="40" cy="22" r="1.8" fill="#C49532"/>
  </svg>`,

  place: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#B04E18"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <path d="M22 42 L22 38 L26 38 L26 34 L30 34 L30 30 L34 30 L34 34 L38 34 L38 38 L42 38 L42 42 Z" fill="#F5EFE2"/>
    <rect x="30" y="38" width="4" height="4" fill="#B04E18"/>
  </svg>`,

  event: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill="#1B5A66"/>
    <circle cx="32" cy="32" r="28" fill="none" stroke="#F5EFE2" stroke-opacity="0.25" stroke-width="1.5"/>
    <circle cx="32" cy="32" r="14" fill="none" stroke="#F5EFE2" stroke-width="1.2" opacity="0.4"/>
    <circle cx="32" cy="32" r="9"  fill="none" stroke="#F5EFE2" stroke-width="1.2" opacity="0.7"/>
    <circle cx="32" cy="32" r="3.5" fill="#F5EFE2"/>
  </svg>`,
};

function buildMarkerEl(marker) {
  const el = document.createElement('div');
  el.className = 'gujarat-marker marker-enter';
  el.title = marker.title_eng;
  el.innerHTML = MARKER_SVGS[marker.type] ?? MARKER_SVGS.place;
  el.setAttribute('data-id', marker._id);
  return el;
}

export default function GujaratMap({ markers, activeEra, activeMarkerId, onMarkerClick }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const mbMarkersRef = useRef([]);  // { el, mbMarker, id }
  const prevEraRef   = useRef(null);
  const readyRef     = useRef(false);

  // ── Init map ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [71.5, 22.3],
      zoom: 6.3,
      minZoom: 5,
      maxZoom: 14,
      pitchWithRotate: false,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new mapboxgl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    map.on('load', () => {
      ERAS.forEach((era) => {
        map.addSource(`era-${era.id}-src`, {
          type: 'geojson',
          data: `/geojson/era-${era.id}.geojson`,
        });
        map.addLayer({
          id: `era-${era.id}-fill`,
          type: 'fill',
          source: `era-${era.id}-src`,
          paint: {
            'fill-color': era.fillColor,
            'fill-opacity': 0,
            'fill-opacity-transition': { duration: 600, delay: 0 },
          },
        });
        map.addLayer({
          id: `era-${era.id}-line`,
          type: 'line',
          source: `era-${era.id}-src`,
          paint: {
            'line-color': era.color,
            'line-width': 2,
            'line-opacity': 0,
            'line-opacity-transition': { duration: 600, delay: 0 },
            'line-dasharray': [6, 4],
          },
        });
      });

      mapRef.current = map;
      readyRef.current = true;
      map.fire('gujarat:ready');
    });

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []);

  // ── Sync selected marker ring ──────────────────────────────────────────────
  useEffect(() => {
    mbMarkersRef.current.forEach(({ el, id }) => {
      el.classList.toggle('marker-selected', id === activeMarkerId);
    });
  }, [activeMarkerId]);

  // ── Clear markers ──────────────────────────────────────────────────────────
  const clearMarkers = useCallback((animate) => {
    mbMarkersRef.current.forEach(({ el, mbMarker }) => {
      if (animate) {
        el.classList.remove('marker-active', 'marker-pulse', 'marker-selected');
        el.classList.add('marker-exit');
        setTimeout(() => mbMarker.remove(), 220);
      } else {
        mbMarker.remove();
      }
    });
    mbMarkersRef.current = [];
  }, []);

  // ── Add markers with staggered entrance ──────────────────────────────────
  const addMarkers = useCallback((list) => {
    const map = mapRef.current;
    if (!map) return;

    list.forEach((m, i) => {
      const el = buildMarkerEl(m);
      const mbMarker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([m.lng, m.lat])
        .addTo(map);

      el.addEventListener('click', (e) => { e.stopPropagation(); onMarkerClick(m); });

      // Stagger: wait for exit (220ms) + stagger
      setTimeout(() => {
        el.classList.remove('marker-enter');
        el.classList.add('marker-active', 'marker-pulse');
      }, 280 + i * 80);

      mbMarkersRef.current.push({ el, mbMarker, id: m._id });
    });
  }, [onMarkerClick]);

  // ── Handle era switch ─────────────────────────────────────────────────────
  const applyEra = useCallback((eraIdx) => {
    const map = mapRef.current;
    if (!map) return;

    if (prevEraRef.current !== null) {
      map.setPaintProperty(`era-${prevEraRef.current}-fill`, 'fill-opacity', 0);
      map.setPaintProperty(`era-${prevEraRef.current}-line`, 'line-opacity', 0);
    }
    const era = ERAS[eraIdx];
    if (era) {
      map.setPaintProperty(`era-${eraIdx}-fill`, 'fill-opacity', era.fillOpacity);
      map.setPaintProperty(`era-${eraIdx}-line`, 'line-opacity', 0.75);
    }
    prevEraRef.current = eraIdx;

    clearMarkers(true);
    addMarkers(markers.filter((m) => m.eras.includes(eraIdx)));
  }, [markers, clearMarkers, addMarkers]);

  useEffect(() => {
    if (!readyRef.current) {
      const onReady = () => applyEra(activeEra);
      mapRef.current?.on('gujarat:ready', onReady);
      return () => mapRef.current?.off('gujarat:ready', onReady);
    }
    if (mapRef.current?.isStyleLoaded()) applyEra(activeEra);
  }, [activeEra, markers, applyEra]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ background: 'var(--indigo-900)' }}>
          <p className="text-sm text-center px-8" style={{ fontFamily: 'var(--font-ui)', color: 'rgba(245,239,226,0.4)', letterSpacing: '0.06em' }}>
            Set <code style={{ color: 'var(--gold)' }}>NEXT_PUBLIC_MAPBOX_TOKEN</code> in{' '}
            <code style={{ color: 'var(--gold)' }}>.env.local</code>
          </p>
        </div>
      )}
    </div>
  );
}
