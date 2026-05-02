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
  const [activeEra, setActiveEra]       = useState(0);
  const [markers,   setMarkers]         = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showAbout, setShowAbout]       = useState(false);

  useEffect(() => {
    fetchAllMarkers().then(setMarkers).catch(console.error);
  }, []);

  const handleEraChange = useCallback((idx) => {
    setActiveEra(idx);
    setActiveMarker(null);
  }, []);

  const handleMarkerClick = useCallback((m) => setActiveMarker(m), []);
  const handlePanelClose  = useCallback(() => setActiveMarker(null), []);

  const era        = ERAS[activeEra];
  const panelOpen  = Boolean(activeMarker);

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={{ background: 'var(--surface)' }}>

      {/* ── Map ── */}
      <GujaratMap
        markers={markers}
        activeEra={activeEra}
        onMarkerClick={handleMarkerClick}
      />

      {/* ── Top bar ── */}
      <header
        className="absolute top-0 left-0 right-0 z-20 flex items-center px-7 gap-4"
        style={{
          height: 52,
          background: 'rgba(26,26,72,0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Site name */}
        <span
          className="text-[22px] leading-none"
          style={{ fontFamily: 'var(--font-guj)', color: 'var(--cream)' }}
        >
          ગુજરાત
        </span>
        <span className="w-px h-[22px] flex-none" style={{ background: 'rgba(255,255,255,0.15)' }} />
        <span
          className="text-[13px] italic tracking-[0.06em]"
          style={{ fontFamily: 'var(--font-eng)', color: 'rgba(245,239,226,0.5)' }}
        >
          Gujarat — Across Time
        </span>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Marker legend (desktop) */}
        <div className="hidden md:flex items-center gap-4 mr-2">
          {[
            { type: 'person', bg: 'var(--indigo)',  label: 'Person' },
            { type: 'place',  bg: 'var(--rust)',    label: 'Place'  },
            { type: 'event',  bg: '#2A5C45',        label: 'Event'  },
          ].map(({ type, bg, label }) => (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-none"
                style={{ background: bg }}
              />
              <span
                className="text-[11px] tracking-[0.08em] uppercase"
                style={{ fontFamily: 'var(--font-eng)', color: 'rgba(245,239,226,0.5)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Era badge */}
        <button
          onClick={() => setShowAbout(true)}
          className="hidden sm:flex items-center px-3.5 py-1.5 border text-[11px] tracking-[0.18em] uppercase transition-all duration-300"
          style={{
            fontFamily: 'var(--font-eng)',
            color: 'var(--gold)',
            borderColor: 'rgba(196,149,50,0.4)',
          }}
          title="About this map"
        >
          {era.shortLabel} · {era.period}
        </button>
      </header>

      {/* ── About modal ── */}
      {showAbout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(14,14,40,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowAbout(false)}
        >
          <div
            className="max-w-sm w-full p-8 space-y-4"
            style={{ background: 'var(--cream)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-xl"
              style={{ fontFamily: 'var(--font-eng)', color: 'var(--indigo)' }}
            >
              Gujarat — Across Time
            </h2>
            <p
              className="text-[15px] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#3a3a6a' }}
            >
              An interactive historical map exploring Gujarat across five eras — from the Solanki
              golden age and its poets, through the Sultanate, Mughal rule, and the nationalist
              movement, to the modern state.
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}
            >
              Click any marker to read more. Use the era navigator at the bottom, or press the
              ← → arrow keys to travel through time. Historical borders are approximate.
            </p>
            <div className="h-px" style={{ background: 'rgba(26,26,72,0.1)' }} />
            <p
              className="text-[10px] tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
            >
              Built with Mapbox GL JS · Next.js · Sanity CMS
            </p>
            <button
              onClick={() => setShowAbout(false)}
              className="w-full py-2.5 text-[11px] tracking-[0.18em] uppercase border transition-all duration-200"
              style={{
                fontFamily: 'var(--font-eng)',
                background: 'var(--indigo)',
                color: 'var(--cream)',
                borderColor: 'var(--indigo)',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Marker legend (mobile) ── */}
      <div
        className="md:hidden absolute left-4 z-20 flex flex-col gap-1.5 p-2.5"
        style={{
          bottom: 120,
          background: 'rgba(26,26,72,0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {[
          { bg: 'var(--indigo)', label: 'Person' },
          { bg: 'var(--rust)',   label: 'Place'  },
          { bg: '#2A5C45',       label: 'Event'  },
        ].map(({ bg, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: bg }} />
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-eng)', color: 'rgba(245,239,226,0.55)' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Side panel ── */}
      <SidePanel marker={activeMarker} onClose={handlePanelClose} />

      {/* ── Era navigator — shifts left when panel is open ── */}
      <EraNavigator
        activeEra={activeEra}
        onChange={handleEraChange}
        panelOpen={panelOpen}
      />

      {/* ── Report panel ── */}
      <ReportPanel />
    </div>
  );
}
