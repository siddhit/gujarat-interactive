'use client';

import { useEffect } from 'react';
import { ERAS } from '../data/eras';

export default function EraNavigator({ activeEra, onChange, panelOpen }) {
  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange(Math.min(activeEra + 1, ERAS.length - 1));
      if (e.key === 'ArrowLeft')  onChange(Math.max(activeEra - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeEra, onChange]);

  const sliderPct = (activeEra / (ERAS.length - 1)) * 100;

  return (
    <div
      className="absolute bottom-0 z-20 flex flex-col"
      style={{
        left: 0,
        right: panelOpen ? 'var(--panel-w)' : 0,
        transition: 'right 350ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <nav
        className="flex flex-col"
        style={{
          background: 'rgba(26,26,72,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '0 52px',
          paddingBottom: '12px',
          paddingTop: '10px',
          gap: '10px',
        }}
      >
        {/* Era label buttons */}
        <div
          className="flex justify-between items-end"
          role="tablist"
          aria-label="Historical eras"
        >
          {ERAS.map((era, idx) => {
            const isActive = idx === activeEra;
            return (
              <button
                key={era.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(idx)}
                className={`era-step flex-1 flex flex-col items-center text-center
                  transition-colors duration-200 pb-1
                  ${isActive ? 'era-active' : ''}`}
                style={{
                  fontFamily: 'var(--font-eng)',
                  fontSize: 10,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--gold)' : 'rgba(245,239,226,0.25)',
                }}
              >
                <span
                  className="block text-xs italic mb-0.5"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {era.period}
                </span>
                <span>{era.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Progress track */}
        <div className="relative h-0.5 bg-white/10 mx-0">
          {/* Filled portion */}
          <div
            className="absolute left-0 top-0 h-full"
            style={{
              width: `${sliderPct}%`,
              background: 'linear-gradient(to right, var(--rust), var(--gold))',
              transition: 'width 0.4s ease',
            }}
          />
          {/* Thumb dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300"
            style={{
              left: `${sliderPct}%`,
              background: 'var(--gold)',
              borderColor: 'var(--indigo)',
              boxShadow: '0 0 0 3px rgba(196,149,50,0.35)',
            }}
          />
        </div>
      </nav>
    </div>
  );
}
