'use client';

import { useEffect } from 'react';
import { ERAS } from '../data/eras';

// Tick positions as fractions of 4 equal intervals
const TICK_POSITIONS = [0, 25, 50, 75, 100];

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
      className="absolute bottom-0 z-20"
      style={{
        left: 0,
        right: panelOpen ? 'var(--panel-w)' : 0,
        transition: 'right 350ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <nav
        role="tablist"
        aria-label="Historical eras"
        style={{
          background: 'rgba(250,246,234,0.97)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(26,26,72,0.1)',
          padding: '0 52px 14px',
          position: 'relative',
        }}
      >
        {/* Patola lattice texture on the bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'var(--patola-bg-light)',
            backgroundSize: '40px 40px',
            opacity: 0.14,
            pointerEvents: 'none',
          }}
        />

        {/* Era labels */}
        <div
          className="relative z-10 flex justify-between items-end"
          style={{ paddingTop: 20, marginBottom: 14 }}
        >
          {ERAS.map((era, idx) => {
            const isActive = idx === activeEra;
            return (
              <button
                key={era.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(idx)}
                className={`era-step flex-1 flex flex-col items-center text-center pb-1 ${isActive ? 'era-active' : ''}`}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                {/* Year — Fraunces italic */}
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 13,
                    fontVariationSettings: '"opsz" 72',
                    letterSpacing: 0,
                    marginBottom: 5,
                    color: isActive ? 'var(--accent)' : 'rgba(26,26,72,0.45)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {era.period}
                </span>
                {/* Label — Inter small caps */}
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 10,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'rgba(26,26,72,0.35)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {era.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Track + fill + ticks + thumb */}
        <div className="relative z-10" style={{ height: 16 }}>
          {/* Track hairline */}
          <div
            style={{
              position: 'absolute',
              top: 7,
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(26,26,72,0.15)',
            }}
          />

          {/* Fill gradient — madder → terracotta → gold */}
          <div
            style={{
              position: 'absolute',
              top: 7,
              left: 0,
              height: 1,
              width: `${sliderPct}%`,
              background: 'linear-gradient(90deg, #6B1F2E, #B04E18 40%, var(--accent) 100%)',
              transition: 'width 400ms cubic-bezier(0.32, 0.72, 0.24, 1.1)',
            }}
          />

          {/* Tick marks */}
          {TICK_POSITIONS.map((pct, i) => {
            const isActiveTick = i === activeEra;
            return (
              <div
                key={pct}
                style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: isActiveTick ? 3 : 4,
                  width: 1,
                  height: isActiveTick ? 9 : 7,
                  background: isActiveTick ? 'var(--accent)' : 'rgba(26,26,72,0.3)',
                  transform: 'translateX(-50%)',
                  transition: 'background 0.25s ease, height 0.25s ease, top 0.25s ease',
                }}
              />
            );
          })}

          {/* Thumb — zari gold with glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPct}%`,
              transform: 'translate(-50%, -50%)',
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'var(--accent)',
              border: '2px solid var(--cream-100)',
              boxShadow: '0 0 0 3px rgba(201,52,42,0.18)',
              transition: 'left 400ms cubic-bezier(0.32, 0.72, 0.24, 1.1)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </nav>
    </div>
  );
}
