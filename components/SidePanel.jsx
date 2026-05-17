'use client';

import { useEffect, useRef } from 'react';
import { ERAS } from '../data/eras';
import { MARKER_SVGS } from '../lib/markerIcons';

export default function SidePanel({ marker, onClose }) {
  const isOpen   = Boolean(marker);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 sm:hidden bg-black/40" onClick={onClose} />
      )}

      <aside
        ref={panelRef}
        tabIndex={-1}
        role="complementary"
        aria-label="Marker detail"
        className={`side-panel fixed top-[56px] right-0 bottom-0 z-40
          w-full sm:w-[380px] flex flex-col
          outline-none overflow-hidden
          ${isOpen ? 'panel-open' : ''}`}
        style={{
          background: 'var(--cream-100)',
          borderLeft: '1px solid rgba(26,26,72,0.1)',
        }}
      >
        {marker && <PanelContent marker={marker} onClose={onClose} />}
      </aside>
    </>
  );
}

function PanelContent({ marker, onClose }) {
  const TYPE_LABELS = { person: 'Person', place: 'Place', event: 'Event' };
  const eraTags = (marker.eras ?? []).map((id) => ERAS[id]?.shortLabel).filter(Boolean);

  return (
    <>
      {/* All content sits above the bandhani pseudo-element */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1 leading-none transition-colors"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 18,
            color: 'var(--muted-on-light)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-on-light)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-on-light)'; }}
          aria-label="Close panel"
        >
          ✕
        </button>

        {/* Marker icon */}
        <div
          className="pt-6 px-6"
          dangerouslySetInnerHTML={{ __html: MARKER_SVGS[marker.type] ?? MARKER_SVGS.place }}
          style={{ width: 32, height: 32 }}
        />

        {/* Type label — accent crimson, Inter small-caps */}
        <p
          className="pt-2 px-6"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 500,
          }}
        >
          {TYPE_LABELS[marker.type] ?? marker.type}
        </p>

        {/* Gujarati title — Tiro Gujarati, large */}
        <h2
          className="px-6 pt-2 pb-1"
          style={{
            fontFamily: 'var(--font-guj)',
            fontSize: 28,
            lineHeight: 1.3,
            color: 'var(--indigo-900)',
          }}
        >
          {marker.title_guj ?? marker.title_eng}
        </h2>

        {/* English title — Fraunces italic */}
        {marker.title_guj && (
          <p
            className="px-6 pb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontVariationSettings: '"opsz" 72',
              fontSize: 17,
              color: 'var(--muted-on-light)',
            }}
          >
            {marker.title_eng}
          </p>
        )}

        {/* Divider */}
        <div className="mx-6" style={{ height: 1, background: 'rgba(26,26,72,0.1)' }} />

        {/* Era tags */}
        {eraTags.length > 0 && (
          <div className="flex flex-wrap gap-2 px-6 py-3">
            {eraTags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  border: '1px solid rgba(26,26,72,0.15)',
                  color: 'var(--indigo-800)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          {/* English prose */}
          <p
            className="panel-prose"
            dangerouslySetInnerHTML={{ __html: marker.body_eng ?? '' }}
          />

          {/* Gujarati excerpt — Tiro Gujarati with accent left border */}
          {marker.excerpt_guj && (
            <blockquote
              className="py-3 pl-4 pr-3"
              style={{
                fontFamily: 'var(--font-guj)',
                fontSize: 17,
                lineHeight: 1.9,
                color: 'var(--indigo-900)',
                borderLeft: '3px solid var(--accent)',
                background: 'rgba(201,52,42,0.05)',
              }}
            >
              {marker.excerpt_guj}
            </blockquote>
          )}

          {/* Coordinates */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.03em',
              color: 'rgba(26,26,72,0.25)',
            }}
          >
            {marker.lat?.toFixed(4)}°N · {marker.lng?.toFixed(4)}°E
          </p>
        </div>

        {/* Links */}
        {marker.links?.length > 0 && (
          <div
            className="flex flex-col gap-2 px-6 py-4"
            style={{ borderTop: '1px solid rgba(26,26,72,0.08)' }}
          >
            {marker.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 transition-all duration-200 group"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  letterSpacing: '0.04em',
                  color: 'var(--indigo-800)',
                  border: '1px solid rgba(26,26,72,0.15)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--indigo-900)';
                  e.currentTarget.style.color = 'var(--cream-100)';
                  e.currentTarget.style.borderColor = 'var(--indigo-900)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '';
                  e.currentTarget.style.color = 'var(--indigo-800)';
                  e.currentTarget.style.borderColor = 'rgba(26,26,72,0.15)';
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
