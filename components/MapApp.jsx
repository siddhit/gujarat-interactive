'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ERAS } from '../data/eras';
import { fetchAllMarkers } from '../lib/sanity';
import SidePanel from './SidePanel';
import EraNavigator from './EraNavigator';
import ReportPanel from './ReportPanel';

const GujaratMap = dynamic(() => import('./GujaratMap'), { ssr: false });

export default function MapApp() {
  const [activeEra,    setActiveEra]    = useState(0);
  const [markers,      setMarkers]      = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showAbout,    setShowAbout]    = useState(false);

  useEffect(() => {
    fetchAllMarkers().then(setMarkers).catch(console.error);
  }, []);

  const handleEraChange    = useCallback((idx) => { setActiveEra(idx); setActiveMarker(null); }, []);
  const handleMarkerClick  = useCallback((m) => setActiveMarker(m), []);
  const handlePanelClose   = useCallback(() => setActiveMarker(null), []);

  const era       = ERAS[activeEra];
  const panelOpen = Boolean(activeMarker);

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ background: 'var(--cream-50)' }}
    >
      {/* ── Map ── */}
      <GujaratMap
        markers={markers}
        activeEra={activeEra}
        activeMarkerId={activeMarker?._id}
        onMarkerClick={handleMarkerClick}
      />

      {/* ── Top bar ── */}
      <header
        className="absolute top-0 left-0 right-0 z-20 flex items-center px-7 gap-4"
        style={{
          height: 56,
          background: 'rgba(250,246,234,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(26,26,72,0.1)',
        }}
      >
        {/* ગુજરાત — Tiro Gujarati, links back to home */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-guj)',
            fontSize: 22,
            lineHeight: 1,
            color: 'var(--indigo-900)',
            textDecoration: 'none',
          }}
        >
          ગુજરાત
        </a>

        {/* Divider — hidden on mobile */}
        <span
          className="hidden sm:flex-none"
          style={{ width: 1, height: 22, background: 'rgba(26,26,72,0.15)' }}
        />

        {/* Gujarat — Across Time — hidden on mobile */}
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 144',
            fontSize: 14,
            color: 'rgba(26,26,72,0.45)',
          }}
        >
          Gujarat — Across Time
        </span>

        <div className="flex-1" />

        {/* Marker legend (desktop) */}
        <div className="hidden md:flex items-center gap-5 mr-2">
          {[
            { bg: 'var(--marker-person)', label: 'Person' },
            { bg: 'var(--marker-place)',  label: 'Place'  },
            { bg: 'var(--marker-event)',  label: 'Event'  },
          ].map(({ bg, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-none"
                style={{ background: bg }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(26,26,72,0.45)',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Era badge — accent crimson on cream, Inter small-caps */}
        <button
          onClick={() => setShowAbout(true)}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            padding: '5px 10px',
            border: '1px solid rgba(201,52,42,0.3)',
            background: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,52,42,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(201,52,42,0.3)'; }}
          title="About this map"
        >
          {era.shortLabel} · {era.period}
        </button>
      </header>

      {/* ── About modal ── */}
      {showAbout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(17,16,58,0.75)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowAbout(false)}
        >
          <div
            className="max-w-sm w-full p-8 space-y-4"
            style={{ background: 'var(--cream-50)', border: '1px solid rgba(26,26,72,0.12)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 500,
              }}
            >
              About this map
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontVariationSettings: '"opsz" 144',
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--indigo-900)',
              }}
            >
              Gujarat —<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--accent)' }}>
                Across Time
              </em>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.65,
                fontStyle: 'italic',
                color: 'var(--muted-on-light)',
              }}
            >
              An interactive historical map exploring Gujarat across five eras — from the Solanki
              golden age and its poets, through Sultanate, Mughal rule, and the nationalist
              movement, to the modern state.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                lineHeight: 1.6,
                color: 'var(--muted-on-light)',
              }}
            >
              Click any marker to read more. Use the era navigator at the bottom, or press{' '}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>← →</span>{' '}
              to travel through time. Historical borders are approximate.
            </p>
            <div style={{ height: 1, background: 'rgba(26,26,72,0.1)' }} />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--muted-on-light)',
                letterSpacing: '0.04em',
              }}
            >
              Leaflet · Next.js · Sanity CMS
            </p>
            <button
              onClick={() => setShowAbout(false)}
              style={{
                width: '100%',
                padding: '10px',
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: 'var(--indigo-900)',
                color: 'var(--cream-100)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile legend ── */}
      <div
        className="md:hidden absolute left-4 z-20 flex flex-col gap-2 p-3"
        style={{
          bottom: 100,
          background: 'rgba(250,246,234,0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(26,26,72,0.1)',
        }}
      >
        {[
          { bg: 'var(--marker-person)', label: 'Person' },
          { bg: 'var(--marker-place)',  label: 'Place'  },
          { bg: 'var(--marker-event)',  label: 'Event'  },
        ].map(({ bg, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: bg }} />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(26,26,72,0.55)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Side panel ── */}
      <SidePanel marker={activeMarker} onClose={handlePanelClose} />

      {/* ── Era navigator ── */}
      <EraNavigator
        activeEra={activeEra}
        onChange={handleEraChange}
        panelOpen={panelOpen}
      />

      {/* ── Report panel ── */}
      <ReportPanel />

      {/* ── Attribution / made-with — desktop only, bottom-right ── */}
      <div
        className="hidden sm:flex fixed flex-col items-end gap-1"
        style={{
          bottom: 90,
          right: 12,
          transition: 'opacity 300ms ease',
          opacity: panelOpen ? 1 : 0.55,
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-guj)',
            fontSize: 12,
            lineHeight: 1.4,
            color: 'var(--indigo-800)',
            opacity: 0.75,
          }}
        >
          💙 ગાઠિયા&thinsp;🥨 ને જલેબી&thinsp;🍩 ના હેત સાથે
        </p>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.04em',
            color: 'var(--muted-on-light)',
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} · Built with Claude · Historical borders approximate
        </p>
      </div>
    </div>
  );
}
