'use client';

import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ERAS } from '../data/eras';

// Emoji icons matching the HTML mock's design language
const TYPE_ICONS = {
  person: '✍',
  place:  '🏛',
  event:  '◎',
};

function buildMarkerEl(marker) {
  const el = document.createElement('div');
  el.className = `gujarat-marker type-${marker.type} marker-enter`;
  el.title = marker.title_eng;
  el.innerHTML = TYPE_ICONS[marker.type] ?? '•';
  el.setAttribute('data-id', marker._id);
  return el;
}

export default function GujaratMap({ markers, activeEra, onMarkerClick }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const mbMarkersRef = useRef([]);
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
      style: 'mapbox://styles/mapbox/dark-v11',
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
      // Add a source + fill + stroke layer per era
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

  // ── Remove all markers (with optional CSS exit animation) ─────────────────
  const clearMarkers = useCallback((animate) => {
    mbMarkersRef.current.forEach(({ el, mbMarker }) => {
      if (animate) {
        el.classList.remove('marker-active', 'marker-pulse');
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

      // Wait for exit animation (220ms) + staggered offset (80ms each)
      setTimeout(() => {
        el.classList.remove('marker-enter');
        el.classList.add('marker-active', 'marker-pulse');
      }, 280 + i * 80);

      mbMarkersRef.current.push({ el, mbMarker });
    });
  }, [onMarkerClick]);

  // ── Handle era switch ─────────────────────────────────────────────────────
  const applyEra = useCallback((eraIdx) => {
    const map = mapRef.current;
    if (!map) return;

    // Fade out previous borders
    if (prevEraRef.current !== null) {
      map.setPaintProperty(`era-${prevEraRef.current}-fill`, 'fill-opacity', 0);
      map.setPaintProperty(`era-${prevEraRef.current}-line`, 'line-opacity', 0);
    }

    // Fade in new borders
    const era = ERAS[eraIdx];
    if (era) {
      map.setPaintProperty(`era-${eraIdx}-fill`, 'fill-opacity', era.fillOpacity);
      map.setPaintProperty(`era-${eraIdx}-line`, 'line-opacity', 0.75);
    }

    prevEraRef.current = eraIdx;

    // Swap markers
    clearMarkers(true);
    const filtered = markers.filter((m) => m.eras.includes(eraIdx));
    addMarkers(filtered);
  }, [markers, clearMarkers, addMarkers]);

  useEffect(() => {
    if (!readyRef.current) {
      const onReady = () => applyEra(activeEra);
      mapRef.current?.on('gujarat:ready', onReady);
      return () => mapRef.current?.off('gujarat:ready', onReady);
    }
    if (mapRef.current?.isStyleLoaded()) {
      applyEra(activeEra);
    }
  }, [activeEra, markers, applyEra]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0e0e28]">
          <div className="text-center px-8 space-y-2">
            <p className="text-sm text-cream/50" style={{ fontFamily: 'var(--font-eng)' }}>
              Set{' '}
              <code className="text-[#C49532]">NEXT_PUBLIC_MAPBOX_TOKEN</code>
              {' '}in{' '}
              <code className="text-[#C49532]">.env.local</code>
              {' '}to load the map.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
