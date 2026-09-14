import Link from 'next/link';

const poets = [
  { number: '01', gu: 'નરસિંહ મહેતા', en: 'Narsinh Mehta', note: 'Devotion · compassion · the human condition', era: '15th century', href: '/verses/narsinh-mehta', verse: 'પીડ પરાઈ જાણે રે', translation: 'who feels the pain of others.' },
  { number: '02', gu: 'અખો ભગત', en: 'Akha Bhagat', note: 'Clarity · satire · the inner life', era: '17th century', href: '/verses/akha-bhagat', verse: 'તિલક કરતાં ત્રેપન થયાં,', translation: 'Tilak marks were made as decades passed.' },
];

const paths = [
  { number: '01', gu: 'કરુણા', en: 'Compassion', text: 'What does it mean to feel another person’s pain?', href: '/verses/narsinh-mehta#poem-1' },
  { number: '02', gu: 'પ્રશ્ન', en: 'Questioning', text: 'What remains when ritual is stripped away?', href: '/verses/akha-bhagat#poem-1' },
  { number: '03', gu: 'વિશ્વાસ', en: 'Trust', text: 'What can a promise carry across a life?', href: '/verses/narsinh-mehta#poem-2' },
];

function Arrow() { return <span className="folio-arrow" aria-hidden="true">↗</span>; }

function Brand() {
  return <Link href="/" className="folio-brand" aria-label="Gujarat, home"><span className="folio-brand-gu">ગુજરાત</span><span className="folio-brand-english">A LIVING LIBRARY<br/>OF GUJARATI VERSE</span></Link>;
}

export default function LandingPage() {
  return <div className="folio-site" lang="en">
    <div className="folio-weather"><span>AN OPEN FOLIO FOR GUJARATI LITERATURE</span><span>READ · LISTEN · FOLLOW</span></div>
    <header className="folio-header"><Brand/><nav aria-label="Main navigation"><a href="#voices">વાંચો <small>READ</small></a><Link href="/map">શોધો <small>FOLLOW A THREAD</small></Link><a href="#about">વિશે <small>ABOUT</small></a></nav><Link className="folio-header-entry" href="/verses/narsinh-mehta">OPEN A VERSE <Arrow/></Link></header>

    <main>
      <section className="folio-hero" aria-labelledby="folio-hero-title">
        <div className="folio-hero-copy"><span className="folio-eyebrow"><i/>01 / THE BEGINNING</span><h1 id="folio-hero-title"><span lang="gu">શબ્દથી<br/>શરૂઆત.</span><em>Begin with<br/>a word.</em></h1><p>Gujarati literature is not a distant artifact. It is a voice you can meet, a question you can follow, and a line you might carry with you.</p><div className="folio-hero-actions"><Link href="/verses/narsinh-mehta">READ THE FIRST VERSE <Arrow/></Link><Link href="/map">FOLLOW A THREAD <span aria-hidden="true">→</span></Link></div><div className="folio-hero-baseline"><span>GUJARAT / AN OPEN FOLIO</span><span>SCROLL TO TURN THE PAGE ↓</span></div></div>
        <div className="folio-hero-page" aria-label="An excerpt from Narsinh Mehta’s Vaishnav Jan To"><div className="folio-page-top"><span>FOLIO 01 — NARSINH MEHTA</span><span>15TH CENTURY</span></div><div className="folio-hero-excerpt"><span className="folio-quote-mark" aria-hidden="true">“</span><p lang="gu">વૈષ્ણવ જન તો<br className="folio-mobile-break"/> તેને કહિયે જે<br/>પીડ પરાઈ જાણે રે</p><span className="folio-excerpt-rule"/><p className="folio-excerpt-en">Call them a Vaishnav —<br/>who feels the pain of others.</p></div><div className="folio-page-bottom"><span>01 / 07 VERSES</span><Link href="/verses/narsinh-mehta#poem-1" aria-label="Read Vaishnav Jan To">READ THE FOLIO <Arrow/></Link></div><div className="folio-dot-trail" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div></div>
      </section>

      <section className="folio-voices" id="voices" aria-labelledby="folio-voices-title"><div className="folio-section-head"><span className="folio-eyebrow"><i/>02 / TWO VOICES</span><h2 id="folio-voices-title">A page has<br/><em>two sides.</em></h2><p>Read in Gujarati. Find your footing in English. Listen to the recitation and let each line take its time.</p></div><div className="folio-poet-list">{poets.map(poet => <Link href={poet.href} className="folio-poet" key={poet.number}><span className="folio-poet-index">{poet.number} / {poet.era}</span><div className="folio-poet-main"><span className="folio-poet-gu" lang="gu">{poet.gu}</span><span className="folio-poet-en">{poet.en}</span></div><div className="folio-poet-excerpt"><span lang="gu">{poet.verse}</span><small>{poet.translation}</small></div><div className="folio-poet-action"><span>{poet.note}</span><Arrow/></div></Link>)}</div></section>

      <section className="folio-routes" aria-labelledby="folio-routes-title"><div className="folio-routes-intro"><span className="folio-eyebrow"><i/>03 / NO PIN REQUIRED</span><h2 id="folio-routes-title">One thought<br/>leads to <em>another.</em></h2><p>This is an atlas of relationships, not exact locations. Begin with a question, then move between voices, verses, and ideas.</p><Link href="/map">SEE ALL THREADS <Arrow/></Link></div><div className="folio-route-list">{paths.map(path => <Link key={path.number} href={path.href} className="folio-route"><span className="folio-route-dot" aria-hidden="true"/><span className="folio-route-number">{path.number}</span><span className="folio-route-title"><strong lang="gu">{path.gu}</strong><small>{path.en}</small></span><span className="folio-route-description">{path.text}</span><Arrow/></Link>)}</div></section>

      <section className="folio-about" id="about" aria-labelledby="folio-about-title"><span className="folio-eyebrow"><i/>04 / WHY THIS EXISTS</span><div><h2 id="folio-about-title">A language stays alive<br/>when we <em>return to it.</em></h2><p>This project gathers Gujarati poetry with contextual English renderings and recitation. It is a place to encounter the original words, linger over their meaning, and discover a way into the next verse.</p></div><span className="folio-about-mark" aria-hidden="true">ગ</span></section>
    </main>
    <footer className="folio-footer"><div><Brand/><p>Words to return to. Voices to carry forward.</p></div><div className="folio-footer-links"><Link href="/verses/narsinh-mehta">Narsinh Mehta <Arrow/></Link><Link href="/verses/akha-bhagat">Akha Bhagat <Arrow/></Link><Link href="/map">Follow a thread <Arrow/></Link></div><div className="folio-footer-bottom"><span>© {new Date().getFullYear()} GUJARAT · AN OPEN FOLIO</span><a href="#folio-hero-title">BACK TO THE FIRST PAGE ↑</a></div></footer>
  </div>;
}
