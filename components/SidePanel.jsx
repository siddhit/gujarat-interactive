'use client';

import { useEffect, useRef } from 'react';
import { ERAS } from '../data/eras';

function ExternalLinkArrow() {
  return <span className="text-[10px] tracking-wide opacity-50 uppercase font-sans">↗</span>;
}

export default function SidePanel({ marker, onClose }) {
  const isOpen  = Boolean(marker);
  const panelRef = useRef(null);

  // Escape key
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
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-30 sm:hidden bg-black/40" onClick={onClose} />
      )}

      <aside
        ref={panelRef}
        tabIndex={-1}
        role="complementary"
        aria-label="Marker detail"
        className={`side-panel fixed top-[52px] right-0 bottom-[100px] z-40
          w-full sm:w-[360px] flex flex-col
          outline-none overflow-hidden
          border-l border-[rgba(26,26,72,0.12)]
          ${isOpen ? 'panel-open' : ''}`}
        style={{ background: 'var(--cream)' }}
      >
        {marker && <PanelContent marker={marker} onClose={onClose} />}
      </aside>
    </>
  );
}

function PanelContent({ marker, onClose }) {
  const TYPE_LABELS = { person: 'Person', place: 'Place', event: 'Event' };

  // Derive era tags
  const eraTags = (marker.eras ?? []).map((id) => ERAS[id]?.shortLabel).filter(Boolean);

  // All tags: era + any extra (we expose eras only for now)
  const metaTags = eraTags;

  return (
    <>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-[var(--muted)] hover:text-[var(--indigo)] transition-colors text-xl leading-none p-1"
        aria-label="Close panel"
      >
        ✕
      </button>

      {/* Type label */}
      <p
        className="pt-6 px-6 text-[10px] tracking-[0.22em] uppercase"
        style={{ fontFamily: 'var(--font-eng)', color: 'var(--rust)' }}
      >
        {TYPE_LABELS[marker.type] ?? marker.type}
      </p>

      {/* Gujarati title */}
      <h2
        className="px-6 pt-2 pb-1 text-[28px] leading-tight"
        style={{ fontFamily: 'var(--font-guj)', color: 'var(--indigo)' }}
      >
        {marker.title_guj ?? marker.title_eng}
      </h2>

      {/* English title (shown only if Gujarati title exists) */}
      {marker.title_guj && (
        <p
          className="px-6 pb-4 text-base italic"
          style={{ fontFamily: 'var(--font-eng)', color: 'var(--muted)' }}
        >
          {marker.title_eng}
        </p>
      )}

      {/* Divider */}
      <div className="mx-6 h-px bg-[rgba(26,26,72,0.1)]" />

      {/* Meta tags */}
      {metaTags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-6 py-3.5">
          {metaTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] border"
              style={{
                fontFamily: 'var(--font-eng)',
                color: 'var(--indigo)',
                borderColor: 'rgba(26,26,72,0.15)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Body + excerpt — scrollable */}
      <div
        className="flex-1 overflow-y-auto px-6 pb-4 space-y-4"
        style={{ color: '#3a3a6a' }}
      >
        {/* English prose */}
        <p
          className="panel-prose"
          dangerouslySetInnerHTML={{ __html: marker.body_eng ?? '' }}
        />

        {/* Gujarati excerpt */}
        {marker.excerpt_guj && (
          <blockquote
            className="pl-4 py-3 pr-3 text-[17px] leading-[1.9]"
            style={{
              fontFamily: 'var(--font-guj)',
              color: 'var(--indigo)',
              borderLeft: '3px solid var(--rust)',
              background: 'rgba(26,26,72,0.03)',
            }}
          >
            {marker.excerpt_guj}
          </blockquote>
        )}

        {/* Coordinates */}
        <p className="text-[11px] font-mono opacity-30">
          {marker.lat?.toFixed(4)}°N, {marker.lng?.toFixed(4)}°E
        </p>
      </div>

      {/* Links */}
      {marker.links?.length > 0 && (
        <div
          className="flex flex-col gap-2 px-6 py-4 border-t"
          style={{ borderColor: 'rgba(26,26,72,0.08)' }}
        >
          {marker.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 border text-sm transition-all duration-200
                hover:bg-[var(--indigo)] hover:text-[var(--cream)] hover:border-[var(--indigo)] group"
              style={{
                fontFamily: 'var(--font-eng)',
                color: 'var(--indigo)',
                borderColor: 'rgba(26,26,72,0.15)',
                letterSpacing: '0.04em',
              }}
            >
              <span>{link.label}</span>
              <ExternalLinkArrow />
            </a>
          ))}
        </div>
      )}
    </>
  );
}
