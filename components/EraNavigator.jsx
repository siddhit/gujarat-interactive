'use client';

import { useEffect } from 'react';
import { ERAS } from '../data/eras';

export default function EraNavigator({ activeEra, onChange, panelOpen }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onChange(Math.min(activeEra + 1, ERAS.length - 1));
      if (e.key === 'ArrowLeft')  onChange(Math.max(activeEra - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeEra, onChange]);

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
          padding: '16px 56px 0',
          height: 84,
        }}
      >
        <div className="flex justify-between items-start h-full">
          {ERAS.map((era, idx) => {
            const isActive = idx === activeEra;
            return (
              <button
                key={era.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(idx)}
                className={`era-step flex-1 flex flex-col items-center text-center ${isActive ? 'era-active' : ''}`}
                style={{ background: 'none', border: 'none', padding: '0 0 14px', cursor: 'pointer' }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontStyle: 'italic',
                    fontSize: 14,
                    fontVariationSettings: '"opsz" 144',
                    letterSpacing: 0,
                    marginBottom: 5,
                    color: isActive ? 'var(--accent)' : 'rgba(26,26,72,0.38)',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {era.period}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontWeight: isActive ? 600 : 500,
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
      </nav>
    </div>
  );
}
