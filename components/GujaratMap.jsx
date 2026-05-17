'use client';

import { MapContainer, TileLayer, Marker, ZoomControl, ScaleControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MARKER_SVGS } from '../lib/markerIcons';

// Prevent Leaflet from loading default PNG marker icons
delete L.Icon.Default.prototype._getIconUrl;

function makeIcon(type, selected) {
  return L.divIcon({
    html: `<div class="gujarat-marker marker-active${selected ? ' marker-selected' : ''}">${MARKER_SVGS[type] ?? MARKER_SVGS.place}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

export default function GujaratMap({ markers, activeEra, activeMarkerId, onMarkerClick }) {
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
