'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, ZoomControl, ScaleControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ERAS } from '../data/eras';

// Prevent Leaflet from loading default PNG marker icons
delete L.Icon.Default.prototype._getIconUrl;

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

function makeIcon(type, selected) {
  return L.divIcon({
    html: `<div class="gujarat-marker marker-active${selected ? ' marker-selected' : ''}">${MARKER_SVGS[type] ?? MARKER_SVGS.place}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export default function GujaratMap({ markers, activeEra, activeMarkerId, onMarkerClick }) {
  const [geoJson, setGeoJson] = useState(null);

  useEffect(() => {
    fetch(`/geojson/era-${activeEra}.geojson`)
      .then(r => r.json())
      .then(setGeoJson)
      .catch(console.error);
  }, [activeEra]);

  const era = ERAS[activeEra];
  const visible = markers.filter(m => m.eras.includes(activeEra));

  return (
    <MapContainer
      center={[22.3, 71.5]}
      zoom={6.3}
      minZoom={5}
      maxZoom={14}
      zoomControl={false}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <ZoomControl position="topright" />
      <ScaleControl position="bottomright" imperial={false} />

      {geoJson && (
        <GeoJSON
          key={activeEra}
          data={geoJson}
          style={{
            fillColor: era.fillColor,
            fillOpacity: 0.35,
            color: era.color,
            weight: 2,
            opacity: 0.75,
            dashArray: '6 4',
          }}
        />
      )}

      {visible.map(m => (
        <Marker
          key={`${m._id}-${m._id === activeMarkerId}`}
          position={[m.lat, m.lng]}
          icon={makeIcon(m.type, m._id === activeMarkerId)}
          eventHandlers={{ click: () => onMarkerClick(m) }}
        />
      ))}
    </MapContainer>
  );
}
