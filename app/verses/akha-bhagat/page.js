'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import './akha.css';

// ── Poem data ─────────────────────────────────────────────────────────────────
const POEMS_RAW = {
  1: {
    titleGuj: 'તિલક કરતાં ત્રેપન',
    titleEng: 'Tilak & Ritual',
    tag: 'Chhappā · Vedanta · Satire',
    stanzas: [
      [
        { gu: 'તિલક કરતાં ત્રેપન થયાં,', en: 'Tilak marks were made so many times that decades passed,', roman: 'tilak karatāṃ trepan thayāṃ' },
        { gu: 'ને જપમાળાનાં નાકાં ગયાં,', en: 'and the rosary beads wore out from use.', roman: 'ne japmāḷānāṃ nākāṃ gayāṃ' },
        { gu: 'તીરથ ફરી ફરી થાકયા ચરણ,', en: 'Feet grew weary circling tirtha after tirtha,', roman: 'tīrath pharī pharī thākyā charaṇ' },
        { gu: 'તોય ન પહોંચ્યો હરિને શરણ.', en: 'yet still no refuge found at Hari\'s door.', roman: 'toẏ na pahoñchyo haritne śaraṇ' },
        { gu: 'કથા સુણી સુણી ફૂટ્યા કાન,', en: 'Ears broke from hearing katha told and retold,', roman: 'kathā suṇī suṇī phūṭyā kān' },
        { gu: 'તોય અખા ન આવ્યું બ્રહ્મજ્ઞાન.', en: 'yet no brahma-wisdom came, says Akha.', roman: 'toẏ akhā na āvyuṃ brahmagñān' },
      ],
      [
        { gu: 'એક મૂરખને એવી ટેવ,', en: 'One fool has this habit:', roman: 'ek mūrakhne evī ṭev' },
        { gu: 'પથ્થર એટલા પૂજે દેવ,', en: 'every stone becomes a god to worship,', roman: 'patthhar eṭalā pūje dev' },
        { gu: 'પાણી દેખી કરે સ્નાન,', en: 'at every puddle he bathes,', roman: 'pāṇī dekhi kare snān' },
        { gu: 'તુલસી દેખી તોડે પાન.', en: 'at every tulsi he plucks a leaf.', roman: 'tuḷasī dekhi toḍe pān' },
        { gu: 'એ અખા વડું ઉત્પાત,', en: 'O Akha, what havoc this is:', roman: 'e akhā vaḍuṃ utpāt' },
        { gu: 'ઘણા પરમેશ્વર એ ક્યાંની વાત?', en: 'where does one go with so many gods?', roman: 'ghaṇā parameśvar e kyāṃnī vāt' },
      ],
      [
        { gu: 'દેહાભિમાન હૂતો પાશેર,', en: 'Body-pride began at a quarter-measure,', roman: 'dehābhimān hūto pāśer' },
        { gu: 'વિદ્યા ભણતાં વાધ્યો શેર;', en: 'studying grew it to a full seer;', roman: 'vidyā bhaṇatāṃ vādhyo śer' },
        { gu: 'ચર્ચાવાદમાં તોલે થયો,', en: 'debate added its weight to the scale,', roman: 'charchāvādmāṃ tole thayo' },
        { gu: 'ગુરુ થયો ત્યાં મણમાં ગયો;', en: 'becoming guru, it swelled to a maund.', roman: 'guru thayo tyāṃ maṇmāṃ gayo' },
        { gu: 'અખા એમ હલકાથી ભારે હોય,', en: 'Akha: thus a light thing becomes heavy,', roman: 'akhā em halakāthi bhāre hoẏ' },
        { gu: 'આત્મજ્ઞાન મૂળગું ખોય.', en: 'and the root of self-knowledge is lost.', roman: 'ātmagnān mūḷaguṃ khoẏ' },
      ],
    ],
  },
  2: {
    titleGuj: 'સમજણ વિના',
    titleEng: 'Samjan & Understanding',
    tag: 'Chhappā · Jñāna · Viveka',
    stanzas: [
      [
        { gu: 'સમજણ વિના રે સુખ નહીં જંતને રે;', en: 'Without understanding, creature, there is no peace;', roman: 'samajaṇ vinā re sukh nahīṃ jantne re' },
        { gu: 'વસ્તુગતિ કેમ કરી ઓળખય ?', en: 'how then does one recognize the nature of things?', roman: 'vastugatī kem karī oḷakhay' },
        { gu: 'આપમાં વસે છે આપનો આતમા રે,', en: 'Within oneself dwells one\'s own ātmā,', roman: 'āpmāṃ vase chhe āpno ātmā re' },
        { gu: 'તેણે કાંઈ જીવપણું નવ જાય.', en: 'yet the sense of being a separate creature does not go.', roman: 'teṇe kāṃī jīvapaṇuṃ nav jāy' },
        { gu: 'રવિ રવિ કરતાં રે રજની નહીં મટે રે,', en: 'Chanting "sun, sun" will not remove the night;', roman: 'ravi ravi karatāṃ re rajanī nahīṃ maṭe re' },
        { gu: 'અંધારું તો ઊગ્યા પૂંઠે જાય;', en: 'darkness only leaves when the sun truly rises.', roman: 'aṃdhāruṃ to ūgyā pūṃṭhe jāy' },
      ],
      [
        { gu: 'રુદે કવિ ઊગે રે નિજ ગુરુજ્ઞાનનો રે,', en: 'Let the guru\'s knowledge rise in the heart\'s verse,', roman: 'rude kavi ūge re nij gurugñānano re' },
        { gu: 'થનાર હોય તે સહેજે થાય.', en: 'then what is to be, comes to be on its own.', roman: 'thanār hoẏ te saheje thāẏ' },
        { gu: 'જળ જળ કરતાં રે તૃષ્ણા નવ ટળે રે,', en: 'Saying "water, water" does not quench thirst;', roman: 'jaḷ jaḷ karatāṃ re tṛṣṇā nav ṭaḷe re' },
        { gu: 'ભોજન કહેતાં ન ભાંગે ભૂખ;', en: 'saying "food, food" does not break hunger.', roman: 'bhojan kahetāṃ na bhāṃge bhūkh' },
        { gu: 'પ્રેમરસ પીતા રે તૃષ્ણા તુરત ટળે રે,', en: 'Drinking the nectar of love — thirst vanishes at once;', roman: 'premras pītā re tṛṣṇā turat ṭaḷe re' },
        { gu: 'એમ મહાજ્ઞાનીઓ બોલે છે મુખ.', en: 'so say the great knowers with one voice.', roman: 'em mahāgñānīo bole chhe mukh' },
      ],
      [
        { gu: 'પારસમણિ વિના રે જે પથરા મળે રે,', en: 'Without a philosopher\'s stone, gather all the rocks you like —', roman: 'pārasmaṇi vinā re je patharā maḷe re' },
        { gu: 'તેણે કાંઈ કાંચન લોહ ન થાય;', en: 'iron will not turn gold.', roman: 'teṇe kāṃī kāṃcan loh na thāy' },
        { gu: 'સમજણ વિના રે જે સાધન કરે રે,', en: 'Without understanding, perform all the practices you like —', roman: 'samajaṇ vinā re je sādhan kare re' },
        { gu: 'તેણે કાંઈ જીવપણું નવ જાય.', en: 'the sense of being a separate creature will not go.', roman: 'teṇe kāṃī jīvapaṇuṃ nav jāy' },
        { gu: 'દશ મણ અગ્નિ રે લખિયે કાગળે રે,', en: 'Write ten maunds of fire on a page —', roman: 'daś maṇ agni re lakhiye kāgaḷe re' },
        { gu: 'એને લઈ રૂમાં જો અલપાય;', en: 'take it and touch it to cotton;', roman: 'ene laī rūmāṃ jo alapāẏ' },
      ],
      [
        { gu: 'એની અગ્નિથી રે રૂ નથી દાઝતું રે,', en: 'that written fire will not burn the cotton.', roman: 'enī agnithi re rū nathī dāztū re' },
        { gu: 'રતી એક સાચે પ્રલય જ થાય.', en: 'A single spark of real fire — and there is conflagration.', roman: 'ratī ek sāce pralay ja thāẏ' },
        { gu: 'જીવપણું માટે રે અનહદ ચિંતવ્યે રે,', en: 'Thinking endlessly about the sense of being a creature —', roman: 'jīvapaṇuṃ māṭe re anahad cintavye re' },
        { gu: 'એ તો વાણીરહિત છે રે વિચાર;', en: 'that thought is itself without speech.', roman: 'e to vāṇīrahit chhe re vicār' },
        { gu: 'જે જે નર સમજ્યા રે તે તો ત્યાં સમ્યા રે,', en: 'Those who truly understood — they became absorbed there,', roman: 'je je nar samajyā re te to tyāṃ samyā re' },
        { gu: 'કહે અખો ઊતર્યા પેલે પાર.', en: 'says Akha: they crossed to the other shore.', roman: 'kahe akho ūtaryā pele pār' },
      ],
    ],
  },
};

// Flatten poem: each line gets a flatIdx
function buildPoem(raw) {
  let flatIdx = 0;
  const stanzas = raw.stanzas.map((stanza, si) =>
    stanza.map((line, li) => ({ ...line, si, li, flatIdx: flatIdx++ }))
  );
  const totalLines = flatIdx;
  return { ...raw, stanzas, totalLines };
}

const POEMS = {
  1: buildPoem(POEMS_RAW[1]),
  2: buildPoem(POEMS_RAW[2]),
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function AkhaBhagat() {
  const [playing, setPlaying] = useState(null);
  const [activeLine, setActiveLine] = useState({});
  const [playedUpTo, setPlayedUpTo] = useState({});
  const [progress, setProgress] = useState({});
  const [audioAvail, setAudioAvail] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [minNavVisible, setMinNavVisible] = useState(false);
  const [activeChip, setActiveChip] = useState(null);

  const audioRef = useRef({});
  const rafRef = useRef(null);
  const timingsRef = useRef(null);
  const playingRef = useRef(null);
  const speedRef = useRef(1);

  // Boot: probe for audio
  useEffect(() => {
    async function boot() {
      try {
        const tr = await fetch('/verses/akha-bhagat/audio/timings.json', { cache: 'no-store' });
        if (!tr.ok) throw new Error('no timings');
        timingsRef.current = await tr.json();
        const probe = await fetch('/verses/akha-bhagat/audio/poem-1.mp3', { method: 'HEAD' });
        if (!probe.ok) throw new Error('no mp3');
        setAudioAvail(true);
        setShowBanner(false);
      } catch {
        setShowBanner(true);
      }
    }
    boot();
  }, []);

  // Sticky mini-nav
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const onScroll = () => {
      if (!hero) return;
      setMinNavVisible(hero.getBoundingClientRect().bottom < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver for chip highlighting
  useEffect(() => {
    const cards = document.querySelectorAll('.poem-card');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.18) {
            setActiveChip(e.target.id.replace('poem-', ''));
          }
        });
      },
      { threshold: [0, 0.2, 0.5], rootMargin: '-180px 0px -40% 0px' }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const stopPoem = useCallback((id) => {
    playingRef.current = null;
    setPlaying(null);
    if (audioRef.current[id]) {
      try {
        audioRef.current[id].pause();
        audioRef.current[id].currentTime = 0;
      } catch {}
      audioRef.current[id] = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setTimeout(() => {
      setActiveLine((prev) => ({ ...prev, [id]: -1 }));
      setPlayedUpTo((prev) => ({ ...prev, [id]: -1 }));
      setProgress((prev) => ({ ...prev, [id]: 0 }));
    }, 500);
  }, []);

  const startSimulated = useCallback(
    (id) => {
      const poem = POEMS[id];
      const lines = [];
      poem.stanzas.forEach((s) => s.forEach((l) => lines.push(l)));
      const durations = lines.map((l) => Math.max(1400, l.gu.length * 60) / speedRef.current);
      const total = durations.reduce((a, b) => a + b, 0);
      const startedAt = performance.now();

      function tick() {
        if (playingRef.current !== id) return;
        const elapsed = performance.now() - startedAt;
        let acc = 0;
        let idx = lines.length;
        for (let i = 0; i < durations.length; i++) {
          if (elapsed < acc + durations[i]) {
            idx = i;
            break;
          }
          acc += durations[i];
        }
        const lineIdx = idx < lines.length ? idx : lines.length - 1;
        setActiveLine((prev) => ({ ...prev, [id]: lineIdx }));
        setPlayedUpTo((prev) => ({ ...prev, [id]: lineIdx }));
        setProgress((prev) => ({ ...prev, [id]: Math.min(100, (elapsed / total) * 100) }));
        if (elapsed >= total) {
          stopPoem(id);
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      }
      setActiveLine((prev) => ({ ...prev, [id]: 0 }));
      rafRef.current = requestAnimationFrame(tick);
    },
    [stopPoem]
  );

  const startWithAudio = useCallback(
    (id) => {
      const audio = new Audio(`/verses/akha-bhagat/audio/poem-${id}.mp3`);
      audio.playbackRate = speedRef.current;
      audioRef.current[id] = audio;
      const timings = timingsRef.current?.[id] ?? [];

      audio.addEventListener('timeupdate', () => {
        if (playingRef.current !== id) return;
        const t = audio.currentTime;
        let lineIdx = -1;
        for (let i = 0; i < timings.length; i++) {
          if (t >= timings[i].start && t < timings[i].end) {
            lineIdx = i;
            break;
          }
          if (t >= timings[i].start) lineIdx = i;
        }
        setActiveLine((prev) => ({ ...prev, [id]: lineIdx }));
        setPlayedUpTo((prev) => ({ ...prev, [id]: lineIdx }));
        if (audio.duration) {
          setProgress((prev) => ({ ...prev, [id]: (t / audio.duration) * 100 }));
        }
      });
      audio.addEventListener('ended', () => stopPoem(id));
      audio.addEventListener('error', () => {
        audioRef.current[id] = null;
        startSimulated(id);
      });
      audio.play().catch(() => {
        audioRef.current[id] = null;
        startSimulated(id);
      });
    },
    [stopPoem, startSimulated]
  );

  const togglePlay = useCallback(
    (id) => {
      if (playingRef.current === id) {
        stopPoem(id);
        return;
      }
      if (playingRef.current) stopPoem(playingRef.current);
      playingRef.current = id;
      setPlaying(id);
      setActiveLine((prev) => ({ ...prev, [id]: 0 }));
      setPlayedUpTo((prev) => ({ ...prev, [id]: -1 }));
      setProgress((prev) => ({ ...prev, [id]: 0 }));
      if (audioAvail && timingsRef.current?.[id]) startWithAudio(id);
      else startSimulated(id);
    },
    [audioAvail, startWithAudio, startSimulated, stopPoem]
  );

  const copyPoem = useCallback((id, lang, e) => {
    const btn = e.currentTarget;
    const lines = [];
    POEMS[id].stanzas.forEach((s) =>
      s.forEach((l) => lines.push(lang === 'gu' ? l.gu : l.en))
    );
    navigator.clipboard
      .writeText(lines.join('\n'))
      .then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>';
        setTimeout(() => {
          btn.innerHTML = orig;
        }, 1600);
      })
      .catch(() => {});
  }, []);

  function renderPoem(poemId) {
    const poem = POEMS[poemId];
    const active = activeLine[poemId] ?? -1;
    const played = playedUpTo[poemId] ?? -1;
    const prog = progress[poemId] ?? 0;
    const isPlaying = playing === poemId;

    return (
      <article className="poem-card" id={`poem-${poemId}`} key={poemId}>
        <header className="poem-head">
          <div>
            <div className="poem-num">
              Verse {poemId} · {poemId === 1 ? 'i' : 'ii'}
            </div>
            <h2 className="poem-title-guj">{poem.titleGuj}</h2>
            <p className="poem-title-eng">{poem.titleEng}</p>
            <span className="poem-tag">{poem.tag}</span>
          </div>
          <div className="controls">
            <button
              className={`play-btn${isPlaying ? ' playing' : ''}`}
              onClick={() => togglePlay(poemId)}
              aria-label={`Recite poem ${poemId}`}
            >
              <svg className="icon-play" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <svg className="icon-pause" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
            <span className="play-label">Recite</span>
            <span className="play-meta">Sarvam · Meera</span>
            <div className="icon-row">
              <button
                className="icon-btn"
                title="Copy Gujarati"
                onClick={(e) => copyPoem(poemId, 'gu', e)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
              <button
                className="icon-btn"
                title="Copy English"
                onClick={(e) => copyPoem(poemId, 'en', e)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 18H6V4h7v5h5v11z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="poem-progress">
          <div className="poem-progress-fill" style={{ width: `${prog}%` }} />
        </div>

        <div className="poem-body">
          {/* Column labels — each occupies one grid column on desktop */}
          <div className="col-label">
            ગુજરાતી{' '}
            <span style={{ color: 'rgba(110,110,146,0.6)', fontFamily: 'Inter,sans-serif', fontSize: '9px' }}>
              Gujarati
            </span>
          </div>
          <div className="col-label col-label-en">
            English{' '}
            <span style={{ color: 'rgba(110,110,146,0.6)', fontFamily: 'Inter,sans-serif', fontSize: '9px' }}>
              Contextual rendering
            </span>
          </div>

          {/* Lines — gu then en per line, so grid auto-places them into col 1 / col 2 */}
          {poem.stanzas.map((stanza, si) => (
            <Fragment key={si}>
              {si > 0 && <div className="stanza-div" />}
              {stanza.map((line) => (
                <Fragment key={line.flatIdx}>
                  <span
                    className={`gu-line${active === line.flatIdx ? ' active' : line.flatIdx < played ? ' played' : ''}`}
                    title={line.roman}
                  >
                    {line.gu}
                  </span>
                  <span
                    className={`en-line${active === line.flatIdx ? ' active' : line.flatIdx < played ? ' played' : ''}`}
                  >
                    {line.en}
                  </span>
                </Fragment>
              ))}
            </Fragment>
          ))}
        </div>
      </article>
    );
  }

  return (
    <>
      {/* Topbar */}
      <div id="topbar">
        <a className="site-guj" href="/">
          ગુજરાત
        </a>
        <div style={{ width: 1, height: 22, background: 'rgba(26,26,72,0.18)' }} />
        <nav className="crumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="crumb-sep">›</span>
          <a href="/map">Across Time</a>
          <span className="crumb-sep">›</span>
          <span className="crumb-current">Poets · Akha Bhagat</span>
        </nav>
        <div className="topbar-spacer" />
        <a className="topbar-era" href="/map">
          Middle Period · c. 1600 CE
        </a>
      </div>

      {/* Mini nav */}
      <div id="minnav" className={minNavVisible ? 'visible' : ''}>
        <div className="minnav-inner">
          <span className="minnav-label">Verses</span>
          <a className={`chip${activeChip === '1' ? ' active' : ''}`} href="#poem-1">
            <span className="chip-guj">ત૧</span>
            <span>Tilak &amp; Ritual</span>
          </a>
          <a className={`chip${activeChip === '2' ? ' active' : ''}`} href="#poem-2">
            <span className="chip-guj">ત૨</span>
            <span>Samjan &amp; Understanding</span>
          </a>
          <div className="minnav-spacer" />
          <a className="minnav-back" href="/map">
            ← Gujarat Across Time
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-kicker">Poet · Gujarati Verse · 17th Century</div>
          <div className="hero-grid">
            <div>
              <h1 className="hero-title-guj">અખો</h1>
              <p className="hero-title-eng">Akha Bhagat — Verses of Clarity</p>
              <div className="hero-dates">
                <span>
                  <b>c. 1591</b> Jetalpur, Gujarat
                </span>
                <span>
                  <b>c. 1656</b> Ahmedabad
                </span>
              </div>
            </div>
            <div className="hero-bio">
              Akha was a goldsmith of Ahmedabad who renounced his trade to follow{' '}
              <em>Vedanta</em>. His <em>chhappas</em> — six-line verses — cut through ritual,
              false priests, and ego-laden scholarship with biting wit. He wrote as an insider
              who had seen through it all.
            </div>
          </div>
          <div className="hero-meta">
            <div className="hm-cell">
              <div className="hm-label">Form</div>
              <div className="hm-value">
                Chhappā <span className="small">six-line satirical verse</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Language</div>
              <div className="hm-value">
                Old Gujarati <span className="small">with Vraj &amp; Hindi loanwords</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Tradition</div>
              <div className="hm-value">
                Bhakti · Jñāna <span className="small">Advaita Vedānta</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Verses in this set</div>
              <div className="hm-value">
                Two <span className="small">selected from the Akhegita</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        <div className="section-label">Verses</div>

        {showBanner && (
          <div className="banner" id="audio-banner">
            <span style={{ color: '#C49532' }}>●</span>
            <span>
              <em>Live audio not yet generated.</em> Recitation uses an estimated cadence —
              for native voice, run <code>scripts/generate_audio.py</code>.
            </span>
          </div>
        )}

        {renderPoem(1)}
        {renderPoem(2)}

        <aside className="aside-chhapa">
          <blockquote>
            The <em>chhappā</em> is a six-line Hindi-Gujarati verse form: two rhyming couplets
            followed by two longer lines that turn the argument. Akha used it like a scalpel.
          </blockquote>
        </aside>

        <div className="next-poet">
          <span
            style={{
              fontFamily: 'Inter,sans-serif',
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(110,110,146,0.6)',
            }}
          >
            Next
          </span>
          <a href="/">← Back to the library</a>
        </div>
      </main>

      <footer className="akha-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'Tiro Gujarati,serif', fontSize: 16, color: '#11103A' }}>
            ગુજરાત
          </span>
          <span>· a literary atlas · in progress</span>
        </div>
        <div>
          Source texts public domain · Voice:{' '}
          <a href="https://sarvam.ai" target="_blank" rel="noopener">
            Sarvam AI
          </a>
        </div>
      </footer>
    </>
  );
}
