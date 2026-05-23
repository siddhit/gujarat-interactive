'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import './narsinh.css';

// ── Poem data ─────────────────────────────────────────────────────────────────
const POEMS_RAW = {
  1: {
    titleGuj: 'વૈષ્ણવ જન તો',
    titleEng: 'The True Vaishnav',
    tag: 'Pada · Bhakti · Ethics',
    stanzas: [
      // Dhruva (refrain) — source: Wikipedia / Vaishnava Jana To
      [
        { gu: 'વૈષ્ણવ જન તો તેને કહિયે જે', en: 'Call them a Vaishnav —', roman: 'vaiṣṇava jana to tene kahiye je' },
        { gu: 'પીડ પરાઈ જાણે રે', en: 'who feels the pain of others.', roman: 'pīḍa parāī jāṇe re' },
        { gu: 'પર દુ:ખે ઉપકાર કરે તો યે', en: 'Who helps others in suffering —', roman: 'para duḥkhe upakāra kare to ye' },
        { gu: 'મન અભિમાન ન આણે રે', en: 'yet keeps no pride in mind.', roman: 'mana abhimāna na āṇe re' },
      ],
      [
        { gu: 'સકળ લોકમાં સહુને વંદે,', en: 'Who honours all people of the world,', roman: 'sakaḷa lokamāṃ sahune vaṃde' },
        { gu: 'નિંદા ન કરે કેની રે', en: 'slanders no one.', roman: 'niṃdā na kare kenī re' },
        { gu: 'વાચ કાછ મન નિશ્ચલ રાખે', en: 'Who holds word, deed and mind unwavering —', roman: 'vāca kācha mana niścala rākhe' },
        { gu: 'ધન ધન જનની તેની રે', en: 'blessed, blessed is their mother.', roman: 'dhana dhana jananī tenī re' },
      ],
      [
        { gu: 'સમદૃષ્ટિ ને તૃષ્ણા ત્યાગી', en: 'Who has equal sight and has shed all desire,', roman: 'samadṛṣṭi ne tṛṣṇā tyāgī' },
        { gu: 'પરસ્ત્રી જેને માત રે', en: "regards another's woman as mother.", roman: 'parastrī jene māta re' },
        { gu: 'જિહ્વા થકી અસત્ય ન બોલે', en: 'Whose tongue never forms a lie,', roman: 'jihvā thakī asatya na bole' },
        { gu: 'પરધન નવ ઝાલે હાથ રે', en: "whose hand never reaches for another's wealth.", roman: 'paradhana nava jhāle hātha re' },
      ],
      [
        { gu: 'મોહ માયા વ્યાપે નહિ જેને,', en: 'In whom delusion and illusion find no hold,', roman: 'moha māyā vyāpe nahi jene' },
        { gu: 'દૃઢ વૈરાગ્ય જેના મનમાં રે', en: 'whose mind stands firm in renunciation.', roman: 'dṛḍha vairāgya jenā manamāṃ re' },
        { gu: 'રામ નામ શુ તાળી રે લાગી', en: 'Who is sealed in the name of Rām —', roman: 'rāma nāma śu tāḷī re lāgī' },
        { gu: 'સકળ તીરથ તેના તનમાં રે', en: 'all pilgrimage lives within their body.', roman: 'sakaḷa tīratha tenā tanamāṃ re' },
      ],
      [
        { gu: 'વણ લોભી ને કપટ રહિત છે,', en: 'Free from greed, free from deceit,', roman: 'vaṇa lobhī ne kapaṭa rahita che' },
        { gu: 'કામ ક્રોધ નિવાર્યાં રે', en: 'who has overcome desire and anger.', roman: 'kāma krodha nivāryāṃ re' },
        { gu: 'ભણે નરસૈયો તેનું દર્શન કરતાં', en: 'Says Narsaiyo: upon beholding such a person,', roman: 'bhaṇe narsaiyo tenuṃ darśana karatāṃ' },
        { gu: 'કુળ એકોતેર તાર્યાં રે', en: 'seventy-one generations are saved.', roman: 'kuḷa ekotera tāryāṃ re' },
      ],
    ],
  },
  2: {
    titleGuj: 'મારી હૂંડી',
    titleEng: 'My Promissory Note',
    tag: 'Hundi · Bhakti · Narrative',
    stanzas: [
      // Source: tahuko.com — Narsinh Mehta ni Hundi
      [
        { gu: 'મારી હૂંડી સ્વીકારો મહારાજ રે શામળા ગિરધારી,', en: 'Accept my promissory note, O great Lord — O Shyam who holds the hill,', roman: 'mārī hūṃḍī svīkāro mahārāja re śāmaḷā giradhārī' },
        { gu: 'મારી હૂંડી શામળીયાને કાજ રે શામળા ગિરધારી!', en: 'my note is addressed to you, O dark one who lifts the hill!', roman: 'mārī hūṃḍī śāmaḷiyāne kāja re śāmaḷā giradhārī' },
      ],
      [
        { gu: 'સ્તંભ થકી પ્રભુ પ્રગટીયા, વળી ધરિયા નરસિંહ રૂપ,', en: 'You emerged from the pillar and assumed the form of Narasimha,', roman: 'staṃbha thakī prabhu pragaṭiyā, vaḷī dhariyā narasiṃha rūpa' },
        { gu: 'પ્રહ્લાદને ઉગારિયો…વ્હાલે માર્યો હરણાકંસ ભૂપ રે!', en: 'saved Prahlad — your beloved slew king Hiranyakashipu!', roman: 'prahlādane ugāriyoṃ… vhāle māriyo haraṇākaṃsa bhūpa re' },
      ],
      [
        { gu: 'ગજને વ્હાલે ઉગારિયો વળી સુદામાની ભાંગી ભૂખ,', en: 'You saved the elephant with love and broke Sudama\'s hunger,', roman: 'gajane vhāle ugāriyoṃ vaḷī sudāmānī bhāṃgī bhūkha' },
        { gu: 'સાચી વેળાના મારા વ્હાલમા…તમે ભક્તોને આપ્યા સુખ રે!', en: 'O my beloved who comes in the true hour — you give joy to all your devotees!', roman: 'sācī veḷānā mārā vhālamā… tame bhaktone āpyā sukha re' },
      ],
      [
        { gu: 'પાંડવની પ્રતિજ્ઞા પાળી, વળી દ્રૌપદીના પૂર્યાં ચીર,', en: 'You kept the Pandavas\' oath and filled Draupadi\'s sari without end,', roman: 'pāṃḍavanī pratijñā pāḷī, vaḷī draupadīnā pūryāṃ cīra' },
        { gu: 'નરસિંહ મહેતાની હૂંડી સ્વીકારજો…તમે સુભદ્રાબાઈના વીર રે!', en: 'accept Narsinh Mehta\'s note — O hero, brother of Subhadra!', roman: 'narasiṃha mahetānī hūṃḍī svīkārajo… tame subhadrābāīnā vīra re' },
      ],
      [
        { gu: 'રહેવાને નથી ઝૂંપડું, વળી જમવા નથી જુવાર,', en: 'I have no hut to live in and no millet to eat,', roman: 'rahevāne nathī jhūṃpaḍuṃ, vaḷī jamavā nathī juvāra' },
        { gu: 'બેટાબેટી વળાવિયા….મેં તો વળાવી ઘર કેરી નાર રે!', en: 'I have given son and daughter in marriage — and even the mistress of my house!', roman: 'beṭābeṭī vaḷāviyā… meṃ to vaḷāvī ghara kerī nāra re' },
      ],
      [
        { gu: 'ગરથ મારું ગોપીચન્દન, વળી તુલસી હેમનો હાર,', en: 'My wealth is gopi-sandal paste and a garland of tulsi and gold,', roman: 'garatha māruṃ gopīcaṃdana, vaḷī tulasī hemano hāra' },
        { gu: 'સાચું નાણું મારે શામળો….મારે મૂડીમાં ઝાંઝપખાજ રે!', en: 'my true currency is Shyam — my only capital is the cymbals and drum!', roman: 'sācuṃ nāṇuṃ māre śāmaḷo… māre mūḍīmāṃ jhāṃjhapakhāja re' },
      ],
      [
        { gu: 'તીરથવાસી સૌ ચાલિયા, વળી આવ્યા નગરની બહાર,', en: 'All the pilgrims set out and came to the edge of the city,', roman: 'tīrathavāsī sau cāliyā, vaḷī āvyā nagaranī bahāra' },
        { gu: 'વેશ લીધો વણિકનો….મારું શામળશા શેઠ એવું નામ રે!', en: 'he took the guise of a merchant — "Shamalsha Seth is my name!"', roman: 'veśa līdho vaṇikano… māruṃ śāmaḷaśā śeṭha evuṃ nāma re' },
      ],
      [
        { gu: 'હૂંડી લાવો હાથમાં, વળી આપું પૂરા દામ,', en: 'Bring the note to my hand and I will pay the full sum —', roman: 'hūṃḍī lāvo hāthamāṃ, vaḷī āpuṃ pūrā dāma' },
        { gu: 'રૂપિયા આપું રોકડા….મારું શામળશા શેઠ એવું નામ રે!', en: 'I pay in cash — "Shamalsha Seth is my name!"', roman: 'rūpiyā āpuṃ rokadā… māruṃ śāmaḷaśā śeṭha evuṃ nāma re' },
      ],
      [
        { gu: 'હૂંડી સ્વીકારી વ્હાલે શામળે, વળી અરજે કીધાં કામ,', en: 'Beloved Shyam accepted the note and completed the work with grace,', roman: 'hūṃḍī svīkārī vhāle śāmaḷe, vaḷī araje kīdhāṃ kāma' },
        { gu: 'મહેતાજી ફરી લખજો…..મુજ વાણોતર સરખાં કામ રે!', en: 'Mehtaji, write again — work of this kind is what my servant does!', roman: 'mahetājī pharī lakhajo… muja vāṇotara sarakhāṃ kāma re' },
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
export default function NarsinhMehta() {
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
        const tr = await fetch('/verses/narsinh-mehta/audio/timings.json', { cache: 'no-store' });
        if (!tr.ok) throw new Error('no timings');
        timingsRef.current = await tr.json();
        const probe = await fetch('/verses/narsinh-mehta/audio/poem-1.mp3', { method: 'HEAD' });
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
      const audio = new Audio(`/verses/narsinh-mehta/audio/poem-${id}.mp3`);
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

  const POEM_NUMERALS = { 1: 'i', 2: 'ii' };

  function renderPoem(poemId) {
    const poem = POEMS[poemId];
    const active = activeLine[poemId] ?? -1;
    const played = playedUpTo[poemId] ?? -1;
    const prog = progress[poemId] ?? 0;
    const isPlaying = playing === poemId;
    const hasAudio = audioAvail && !!timingsRef.current?.[poemId];

    return (
      <article className="poem-card" id={`poem-${poemId}`} key={poemId}>
        <header className="poem-head">
          <div>
            <div className="poem-num">
              Verse {poemId} · {POEM_NUMERALS[poemId]}
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
            <span className="play-meta">{hasAudio ? 'Sarvam · Meera' : 'Simulated'}</span>
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
          <span className="crumb-current">Poets · Narsinh Mehta</span>
        </nav>
        <div className="topbar-spacer" />
        <a className="topbar-era" href="/map">
          Early Period · c. 1450 CE
        </a>
      </div>

      {/* Mini nav */}
      <div id="minnav" className={minNavVisible ? 'visible' : ''}>
        <div className="minnav-inner">
          <span className="minnav-label">Verses</span>
          <a className={`chip${activeChip === '1' ? ' active' : ''}`} href="#poem-1">
            <span className="chip-guj">વૈષ્ણવ જન તો</span>
            <span>Vaishnav Jan</span>
          </a>
          <a className={`chip${activeChip === '2' ? ' active' : ''}`} href="#poem-2">
            <span className="chip-guj">હૂંડી</span>
            <span>Hundi</span>
          </a>
          <div className="minnav-spacer" />
          <a className="minnav-back" href="/map">
            ← Back to map
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-kicker">15th Century · Saurashtra · Bhakti</div>
          <div className="hero-grid">
            <div>
              <h1 className="hero-title-guj">નરસિ</h1>
              <p className="hero-title-eng">Narsinh Mehta — Songs of Surrender</p>
              <div className="hero-dates">
                <span>
                  <b>c. 1414</b> Talaja, Saurashtra
                </span>
                <span>
                  <b>c. 1481</b>
                </span>
              </div>
            </div>
            <div className="hero-bio">
              Narsinh Mehta was the <em>adi kavi</em> — the first poet — of Gujarati literature. A
              goldsmith from Talaja in Saurashtra, he turned to Krishna in grief and composed
              hundreds of bhajans and padas. His <em>Vaishnav jan to</em> became the anthem of
              Gandhi&apos;s independence movement. His <em>Hundi</em> — a promissory note drawn on
              God — is one of the most dramatic poems of medieval India.
            </div>
          </div>
          <div className="hero-meta">
            <div className="hm-cell">
              <div className="hm-label">Form</div>
              <div className="hm-value">
                Pada · Bhajan <span className="small">two linked forms</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Language</div>
              <div className="hm-value">
                Old Gujarati <span className="small">with Braj inflections</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Tradition</div>
              <div className="hm-value">
                Vaishnava · Bhakti <span className="small">Krishna devotion</span>
              </div>
            </div>
            <div className="hm-cell">
              <div className="hm-label">Verses in this set</div>
              <div className="hm-value">
                Two <span className="small">selected</span>
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

        <aside className="aside-chhapa">
          <blockquote>
            The <em>pada</em> is a rhyming devotional lyric meant to be sung. Narsinh wrote
            hundreds; this one became the moral charter of Gandhian India.
          </blockquote>
        </aside>

        {renderPoem(2)}

        <aside className="aside-chhapa">
          <blockquote>
            A <em>hundi</em> is a bill of exchange — a promissory note used in medieval Indian
            trade. Narsinh Mehta, in debt for a family occasion and penniless, drew one payable by
            God. The poem narrates how Shyam came as a merchant to honour it.
          </blockquote>
        </aside>

        {/* Credits & Sources */}
        <aside className="aside-credits">
          <h3 className="credits-heading">Sources &amp; Credits</h3>
          <ul className="credits-list">
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Vaishnava_Jana_To"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia · Vaishnava Jana To
              </a>{' '}
              — Gujarati text of all five stanzas
            </li>
            <li>
              <a href="https://tahuko.com/?p=696" target="_blank" rel="noopener noreferrer">
                tahuko.com
              </a>{' '}
              — Narsinh Mehta ni Hundi (full nine stanzas)
            </li>
            <li>
              <a href="https://rekhtagujarati.org" target="_blank" rel="noopener noreferrer">
                Rekhta Gujarati
              </a>{' '}
              — Gujarati literary archive
            </li>
            <li>
              <a href="https://gujarativishwakosh.org" target="_blank" rel="noopener noreferrer">
                Gujarati Vishwakosh
              </a>{' '}
              — biographical source
            </li>
            <li>
              <a
                href="https://en.wikipedia.org/wiki/Narsinh_Mehta"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia · Narsinh Mehta
              </a>{' '}
              — biographical article
            </li>
          </ul>
          <p className="credits-note">
            Poem texts sourced from Wikipedia (Vaishnava Jana To) and tahuko.com (Hundi).
            English renderings are contextual translations, not literal.
          </p>
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
            Navigation
          </span>
          <a href="/map">← Back to map</a>
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
