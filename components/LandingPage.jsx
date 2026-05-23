'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <style>{`
        .landing-page * { box-sizing: border-box; }
        .landing-page { background: #FAF6EA; color: #1A1A48; font-family: 'Cormorant Garamond', serif; }
        .landing-page a { color: inherit; }

        /* ── Topbar ────────────────────────────────────────────── */
        .lp-topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          height: 56px;
          background: rgba(250,246,234,0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(26,26,72,0.1);
          display: flex;
          align-items: center;
          padding: 0 28px;
          gap: 16px;
        }
        .lp-site-guj {
          font-family: 'Tiro Gujarati', serif;
          font-size: 24px;
          color: #11103A;
          line-height: 1;
          text-decoration: none;
        }
        .lp-site-eng {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-variation-settings: "opsz" 144;
          font-size: 14px;
          color: rgba(26,26,72,0.45);
          font-weight: 300;
          text-decoration: none;
        }
        .lp-topbar-spacer { flex: 1; }
        .lp-topbar-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .lp-topbar-nav a {
          color: rgba(26,26,72,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-topbar-nav a:hover { color: #11103A; }
        @media (max-width: 600px) {
          .lp-site-eng { display: none; }
          .lp-topbar-nav { gap: 16px; font-size: 10px; }
          .lp-topbar { padding: 0 16px; gap: 10px; }
        }

        /* ── Hero ─────────────────────────────────────────────── */
        .lp-hero {
          padding: 96px 28px 80px;
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .lp-hero { grid-template-columns: 1fr; gap: 32px; padding: 56px 20px 48px; }
        }
        .lp-hero-kicker {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9342A;
          font-weight: 500;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .lp-hero-kicker::before {
          content: '';
          width: 28px;
          height: 1px;
          background: #C9342A;
        }
        .lp-hero-title {
          font-family: 'Tiro Gujarati', serif;
          font-size: clamp(6rem, 18vw, 12rem);
          color: #11103A;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }
        .lp-hero-subtitle {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-variation-settings: "opsz" 144;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          color: rgba(26,26,72,0.5);
          font-weight: 300;
          margin-top: 20px;
          line-height: 1.2;
        }
        .lp-hero-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.75;
          color: #1A1A48;
          max-width: 52ch;
          margin-top: 8px;
        }
        .lp-hero-body em { font-style: italic; color: #11103A; }
        .lp-hero-body p + p { margin-top: 1em; }

        /* ── Divider ornament ─────────────────────────────────── */
        .lp-ornament {
          text-align: center;
          color: #C49532;
          font-size: 22px;
          letter-spacing: 0.5em;
          padding: 24px 0;
          border-top: 1px solid rgba(26,26,72,0.08);
          border-bottom: 1px solid rgba(26,26,72,0.08);
          margin: 0 28px;
        }

        /* ── Two ways in ──────────────────────────────────────── */
        .lp-ways-section {
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 28px;
        }
        .lp-section-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9342A;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 40px;
        }
        .lp-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(26,26,72,0.1);
        }
        .lp-ways-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 680px) {
          .lp-ways-grid { grid-template-columns: 1fr; }
          .lp-ways-section { padding: 56px 20px; }
        }
        .lp-tile {
          position: relative;
          display: block;
          padding: 48px 40px;
          border: 1px solid rgba(26,26,72,0.12);
          text-decoration: none;
          color: #11103A;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
          background: #F5EFE2;
        }
        .lp-tile:hover {
          border-color: rgba(26,26,72,0.28);
          box-shadow: 0 8px 32px rgba(17,16,58,0.08);
        }
        .lp-tile-guj {
          font-family: 'Tiro Gujarati', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          color: #11103A;
          line-height: 1;
          margin-bottom: 16px;
        }
        .lp-tile-eng {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-variation-settings: "opsz" 144;
          font-size: 22px;
          color: rgba(26,26,72,0.7);
          font-weight: 300;
          margin-bottom: 16px;
        }
        .lp-tile-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(26,26,72,0.6);
          max-width: 38ch;
          margin-bottom: 28px;
        }
        .lp-tile-cta {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9342A;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lp-tile-cta::after {
          content: '→';
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          transition: transform 0.2s;
        }
        .lp-tile:hover .lp-tile-cta::after { transform: translateX(4px); }
        .lp-tile-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: #C9342A;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .lp-tile:hover .lp-tile-accent { opacity: 1; }
        .lp-tile-num {
          position: absolute;
          top: 24px;
          right: 24px;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-variation-settings: "opsz" 144;
          font-size: 72px;
          color: rgba(26,26,72,0.05);
          line-height: 1;
          font-weight: 300;
          pointer-events: none;
          user-select: none;
        }

        /* ── Poets strip ──────────────────────────────────────── */
        .lp-poets-section {
          border-top: 1px solid rgba(26,26,72,0.1);
          border-bottom: 1px solid rgba(26,26,72,0.1);
          background: #F5EFE2;
          padding: 64px 28px;
        }
        .lp-poets-inner {
          max-width: 1240px;
          margin: 0 auto;
        }
        .lp-poets-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid rgba(26,26,72,0.1);
          margin-top: 40px;
        }
        @media (max-width: 800px) { .lp-poets-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .lp-poets-grid { grid-template-columns: 1fr; } }
        .lp-poet-card {
          padding: 28px 24px;
          border-right: 1px solid rgba(26,26,72,0.1);
          text-decoration: none;
          display: block;
          color: #11103A;
          transition: background 0.2s;
        }
        .lp-poet-card:last-child { border-right: none; }
        .lp-poet-card:hover { background: rgba(26,26,72,0.03); }
        .lp-poet-card.coming-soon { opacity: 0.45; cursor: default; pointer-events: none; }
        .lp-poet-guj {
          font-family: 'Tiro Gujarati', serif;
          font-size: 2.2rem;
          color: #11103A;
          line-height: 1;
          margin-bottom: 10px;
        }
        .lp-poet-eng {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-variation-settings: "opsz" 144;
          font-size: 15px;
          color: rgba(26,26,72,0.6);
          font-weight: 300;
          margin-bottom: 8px;
        }
        .lp-poet-dates {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: rgba(26,26,72,0.4);
          letter-spacing: 0.06em;
          margin-bottom: 12px;
        }
        .lp-poet-badge {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 3px 8px;
          display: inline-block;
        }
        .lp-poet-badge.live {
          color: #C9342A;
          border: 1px solid rgba(201,52,42,0.3);
        }
        .lp-poet-badge.soon {
          color: rgba(26,26,72,0.35);
          border: 1px solid rgba(26,26,72,0.15);
        }

        /* ── About section ────────────────────────────────────── */
        .lp-about {
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 28px;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .lp-about { grid-template-columns: 1fr; gap: 32px; padding: 56px 20px; }
        }
        .lp-about-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C9342A;
          font-weight: 600;
          padding-top: 4px;
        }
        .lp-about-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          line-height: 1.75;
          color: #1A1A48;
        }
        .lp-about-body em { font-style: italic; }
        .lp-about-body p + p { margin-top: 1.2em; }
        .lp-about-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(26,26,72,0.1);
          margin-top: 32px;
        }
        @media (max-width: 480px) { .lp-about-meta { grid-template-columns: 1fr; } }
        .lp-meta-cell {
          padding: 16px 20px;
          border-right: 1px solid rgba(26,26,72,0.1);
        }
        .lp-meta-cell:last-child { border-right: none; }
        .lp-meta-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(110,110,146,0.8);
          font-weight: 600;
          margin-bottom: 5px;
        }
        .lp-meta-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: #11103A;
          line-height: 1.4;
        }

        /* ── Footer ───────────────────────────────────────────── */
        .lp-footer {
          border-top: 1px solid rgba(26,26,72,0.1);
          padding: 24px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: rgba(26,26,72,0.4);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .lp-footer a { color: #C9342A; text-decoration: none; }
        .lp-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lp-footer-guj {
          font-family: 'Tiro Gujarati', serif;
          font-size: 18px;
          color: #11103A;
          line-height: 1;
        }
      `}</style>

      {/* ── Topbar ── */}
      <header className="lp-topbar">
        <Link href="/" className="lp-site-guj">ગુજરાત</Link>
        <span style={{width:1,height:22,background:'rgba(26,26,72,0.18)',display:'inline-block'}} />
        <Link href="/" className="lp-site-eng">Gujarat — a literary atlas</Link>
        <div className="lp-topbar-spacer" />
        <nav className="lp-topbar-nav">
          <Link href="/map">Map</Link>
          <Link href="/verses/akha-bhagat">Verses</Link>
          <a href="#about">About</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section style={{borderBottom:'1px solid rgba(26,26,72,0.08)'}}>
        <div className="lp-hero">
          <div>
            <div className="lp-hero-kicker">A literary atlas</div>
            <h1 className="lp-hero-title">ગુજરાત</h1>
            <p className="lp-hero-subtitle">Gujarat</p>
          </div>
          <div>
            <div className="lp-hero-body">
              <p>
                This is an atlas of two kinds: a <em>historical map</em> that lets you travel
                through five eras of Gujarat's past — Solanki, Sultanate, Mughal, nationalist,
                modern — and a <em>poetry reader</em> that opens the literature those eras produced.
              </p>
              <p>
                Two doors into the same library. The map shows <em>where</em> things happened;
                the verses carry you into <em>how it felt</em>.
              </p>
              <p>
                Begin anywhere.
              </p>
            </div>
            <div style={{marginTop:32,display:'flex',gap:16,flexWrap:'wrap'}}>
              <Link
                href="/map"
                style={{
                  fontFamily:'Inter,sans-serif',
                  fontSize:11,
                  letterSpacing:'0.18em',
                  textTransform:'uppercase',
                  color:'#C9342A',
                  padding:'10px 22px',
                  border:'1px solid rgba(201,52,42,0.35)',
                  textDecoration:'none',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#C9342A'; e.currentTarget.style.color='#FAF6EA'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9342A'; }}
              >
                Open the map
              </Link>
              <Link
                href="/verses/akha-bhagat"
                style={{
                  fontFamily:'Inter,sans-serif',
                  fontSize:11,
                  letterSpacing:'0.18em',
                  textTransform:'uppercase',
                  color:'#11103A',
                  padding:'10px 22px',
                  border:'1px solid rgba(26,26,72,0.2)',
                  textDecoration:'none',
                  transition:'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#11103A'; e.currentTarget.style.color='#FAF6EA'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#11103A'; }}
              >
                Read Akha Bhagat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ornament ── */}
      <div className="lp-ornament">❧ ❧ ❧</div>

      {/* ── Two ways in ── */}
      <section className="lp-ways-section">
        <div className="lp-section-label">Two ways in</div>
        <div className="lp-ways-grid">
          <Link href="/map" className="lp-tile">
            <div className="lp-tile-accent" />
            <div className="lp-tile-num">I</div>
            <div className="lp-tile-guj">નકશો</div>
            <div className="lp-tile-eng">The Map</div>
            <div className="lp-tile-desc">
              An interactive historical map across five eras. Click any marker to read
              about the person, place, or event. Travel through time with the era navigator.
            </div>
            <div className="lp-tile-cta">Gujarat Across Time</div>
          </Link>
          <Link href="/verses/akha-bhagat" className="lp-tile">
            <div className="lp-tile-accent" />
            <div className="lp-tile-num">II</div>
            <div className="lp-tile-guj">કાવ્ય</div>
            <div className="lp-tile-eng">The Verses</div>
            <div className="lp-tile-desc">
              Gujarati poetry with bilingual karaoke — Gujarati and English side by side,
              line by line, with recitation. Two poets live: Narsinh Mehta and Akha Bhagat.
            </div>
            <div className="lp-tile-cta">Narsinh Mehta · Akha Bhagat</div>
          </Link>
        </div>
      </section>

      {/* ── Poets strip ── */}
      <section className="lp-poets-section">
        <div className="lp-poets-inner">
          <div className="lp-section-label">Poets in this atlas</div>
          <div className="lp-poets-grid">
            <Link href="/verses/akha-bhagat" className="lp-poet-card">
              <div className="lp-poet-guj">અખો</div>
              <div className="lp-poet-eng">Akha Bhagat</div>
              <div className="lp-poet-dates">c. 1591 – c. 1656 · Ahmedabad</div>
              <span className="lp-poet-badge live">Live</span>
            </Link>
            <div className="lp-poet-card coming-soon">
              <div className="lp-poet-guj">મીરાં</div>
              <div className="lp-poet-eng">Mirabai</div>
              <div className="lp-poet-dates">c. 1498 – c. 1547</div>
              <span className="lp-poet-badge soon">Coming soon</span>
            </div>
            <Link href="/verses/narsinh-mehta" className="lp-poet-card">
              <div className="lp-poet-guj">નરસિ</div>
              <div className="lp-poet-eng">Narsinh Mehta</div>
              <div className="lp-poet-dates">c. 1414 – c. 1481 · Talaja</div>
              <span className="lp-poet-badge live">Live</span>
            </Link>
            <div className="lp-poet-card coming-soon">
              <div className="lp-poet-guj">દયારામ</div>
              <div className="lp-poet-eng">Dayaram</div>
              <div className="lp-poet-dates">1777 – 1852 · Vadodara</div>
              <span className="lp-poet-badge soon">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="lp-about" id="about">
        <div className="lp-about-label">About this project</div>
        <div>
          <div className="lp-about-body">
            <p>
              Gujarat holds one of the richest literary traditions in South Asia — a thousand
              years of <em>bhakti</em> poetry, Jain learning, Sufi verse, and reform-era prose,
              most of it unknown outside the Gujarati-speaking world.
            </p>
            <p>
              This atlas is a slow attempt to change that: to make the geography legible through
              the map, and the literature accessible through the poetry reader. Both are works
              in progress.
            </p>
            <p>
              Translations aim for <em>fidelity to sense</em>, not literal word-for-word rendering.
              Historical borders are approximate. Audio recitation is AI-generated and will be
              replaced by human voices as this project grows.
            </p>
          </div>
          <div className="lp-about-meta">
            <div className="lp-meta-cell">
              <div className="lp-meta-label">Tech</div>
              <div className="lp-meta-value">Next.js · Leaflet · Sanity</div>
            </div>
            <div className="lp-meta-cell">
              <div className="lp-meta-label">Audio</div>
              <div className="lp-meta-value">Sarvam AI · Meera voice</div>
            </div>
            <div className="lp-meta-cell">
              <div className="lp-meta-label">Status</div>
              <div className="lp-meta-value">In progress · open research</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp-footer">
        <div className="lp-footer-brand">
          <span className="lp-footer-guj">ગુજરાત</span>
          <span>· a literary atlas · in progress</span>
        </div>
        <div>
          Texts public domain · Voice: <a href="https://sarvam.ai" target="_blank" rel="noopener">Sarvam AI</a>
          <span style={{margin:'0 10px',opacity:0.4}}>·</span>
          Built with <a href="https://claude.ai" target="_blank" rel="noopener">Claude</a>
        </div>
      </footer>
    </div>
  );
}
