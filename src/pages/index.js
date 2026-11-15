import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PixelGoku from '../components/Pixel/PixelGoku';
import styles from './index.module.css';

const AGENT_SYSTEMS_2023_URL = 'https://www.youtube.com/watch?v=fK53ChIiKlM';
const AGENTIC_WORKSPACE_2023_URL = 'https://www.youtube.com/watch?v=V1rYmWWVbIY';
const WORKSPACE_DEMO_URL = 'https://www.youtube.com/watch?v=uYyhswnZkSw';
const AI_CAPABILITIES_URL = 'https://www.youtube.com/watch?v=x42T8GArcCw';
const AGENTIC_WORKFLOWS_URL = 'https://www.youtube.com/watch?v=7fDTDYh2NJ4';
const OPENBB_OPEN_SOURCE_URL = 'https://openbb.co/blog/openbb-belongs-to-everyone/';
const ICMLA_PAPER_URL = 'https://ieeexplore.ieee.org/document/9680024';
const TIMESERIES_REPO_URL = 'https://github.com/DidierRLopes/UnivariateTimeSeriesForecast';

// The bio, as paragraphs of text runs (plain, linked or emphasised). It is
// "streamed" from the laptop word by word at Didier's typing speed.
const BIO = [
  [
    'I build applied AI for financial markets: the systems that make agents work in production. I like to innovate and rethink workflows from first principles, with ',
    { text: 'agent systems in April 2023', href: AGENT_SYSTEMS_2023_URL },
    ' and an ',
    { text: 'agentic workspace in December 2023', href: AGENTIC_WORKSPACE_2023_URL },
    '.',
  ],
  [
    'I built an open-source financial terminal as a side project over the 2020 holidays; it went viral in February 2021 and became OpenBB, one of the most popular finance projects on GitHub and an AI-native research platform used by institutional asset managers. I raised close to $10M from OSS Capital, Naval Ravikant, Ram Shriram and Elad Gil. What started as a CLI became an agentic workspace used by institutions, deployable on-prem or in a VPC (',
    { text: 'Workspace demo', href: WORKSPACE_DEMO_URL },
    ' · ',
    { text: 'AI capabilities', href: AI_CAPABILITIES_URL },
    ' · ',
    { text: 'agentic workflows', href: AGENTIC_WORKFLOWS_URL },
    ').',
  ],
  [
    'OpenBB closed in September 2026, but we ',
    { text: 'open sourced it to the world', href: OPENBB_OPEN_SOURCE_URL },
    '.',
  ],
  [
    'Before OpenBB, I was a Sensor Fusion Engineer at NURVV, working on smart running insoles. I built and cleaned the running dataset the team developed its algorithms on, redesigned altitude estimation around a Kalman filter, added GPS outlier filtering, and shipped footstrike detection and inertial navigation that improved the distance and speed reported to runners. Along the way I published ',
    { text: 'Step Detection using SVM on NURVV Trackers', href: ICMLA_PAPER_URL },
    ' at IEEE ICMLA 2021.',
  ],
  [
    "In 2020 I also wrote the code behind my former university maths professor's PhD thesis, ",
    {
      text: 'Data Science in the Modeling and Forecasting of Financial Time Series: from Classic Methodologies to Deep Learning',
      em: true,
    },
    ', which is where I got hands-on with LSTM neural networks. It is open sourced as ',
    { text: 'UnivariateTimeSeriesForecast', href: TIMESERIES_REPO_URL },
    '.',
  ],
  [
    'My background is in Control Systems, machine learning and AI. MSc with Distinction, Imperial College London. Top 1 student in the BSc in Electrical and Computer Engineering at the Faculty of Sciences and Technology, New University of Lisbon (Portugal).',
  ],
];

// Words of each run, numbered across the whole bio.
const RUNS = (() => {
  let n = 0;
  return BIO.map((paragraph) =>
    paragraph.map((run) => {
      const r = typeof run === 'string' ? { text: run } : run;
      const words = (r.text.match(/\s*\S+\s*/g) ?? []).map((w) => ({ w, i: n++ }));
      return { ...r, words };
    }),
  );
})();
const WORDS = RUNS.flat().reduce((sum, run) => sum + run.words.length, 0);

// Typing speed over the bio: warms up from 104 wpm, holds 127 (where he
// powers up), then eases to 110. Averages 120 wpm over these words.
function wpmAt(progress) {
  if (progress < 0.35) return 104 + (127 - 104) * (progress / 0.35);
  if (progress < 0.7) return 127;
  return 127 - (127 - 110) * ((progress - 0.7) / 0.3);
}
const SPEED = Array.from({ length: WORDS }, (_, i) => wpmAt(i / WORDS));
const AVERAGE_WPM = Math.round(WORDS / (SPEED.reduce((t, w) => t + 1 / w, 0)));
// The stream plays this many times faster than real typing so it does not
// take minutes; the screen still shows the real typing speed.
const PLAYBACK = 5;
const DELAY_MS = SPEED.map((w) => 60000 / w / PLAYBACK);
// Golden hair from reaching 127 wpm until the pace drops under 119.
const POWERED = SPEED.reduce((acc, w, i) => {
  const before = i > 0 ? acc[i - 1] : false;
  acc.push(before ? w >= 119 : w >= 127);
  return acc;
}, []);
const START_MS = 700;
// The streamed layout is for tablets and up; phones keep the classic page.
const STUDIO_QUERY = '(min-width: 768px)';

function Bio({ revealed, streaming }) {
  return RUNS.map((paragraph, p) => (
    <p key={p}>
      {paragraph.map((run, r) => {
        const words = run.words.map(({ w, i }) => (
          <span
            key={i}
            className={`${i >= revealed ? styles.hidden : ''} ${streaming && i === revealed - 1 ? styles.head : ''}`}
          >
            {w}
          </span>
        ));
        if (run.href) {
          return (
            <a key={r} href={run.href} target="_blank" rel="noreferrer">
              {words}
            </a>
          );
        }
        return run.em ? <em key={r}>{words}</em> : <React.Fragment key={r}>{words}</React.Fragment>;
      })}
    </p>
  ));
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { url: siteUrl } = siteConfig;
  const [revealed, setRevealed] = useState(0);
  const [live, setLive] = useState(false);
  const [family, setFamily] = useState(false);
  const timer = useRef();

  useEffect(() => {
    setLive(true);
    if (!window.matchMedia(STUDIO_QUERY).matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(WORDS);
      return;
    }
    let i = 0;
    const next = () => {
      i += 1;
      setRevealed(i);
      if (i < WORDS) timer.current = window.setTimeout(next, DELAY_MS[i]);
    };
    timer.current = window.setTimeout(next, START_MS + DELAY_MS[0]);
    return () => window.clearTimeout(timer.current);
  }, []);

  // Keep the newest words in view when the text is taller than its box.
  const story = useRef(null);
  useEffect(() => {
    const box = story.current;
    const head = box?.querySelector(`.${styles.head}`);
    if (!box || !head) return;
    const overflow = head.getBoundingClientRect().bottom - box.getBoundingClientRect().bottom + 24;
    if (overflow > 0) box.scrollBy({ top: overflow, behavior: 'smooth' });
  }, [revealed]);

  const skip = () => {
    window.clearTimeout(timer.current);
    setRevealed(WORDS);
  };

  const done = revealed >= WORDS;
  const streaming = live && !done;
  const current = revealed > 0 ? Math.round(SPEED[revealed - 1]) : 0;
  const powered = streaming && revealed > 0 && POWERED[revealed - 1];

  return (
    <Layout
      title="Homepage"
      description={siteConfig.customFields.description}
    >
      <Head>
        <html className="home-page" />
        <meta property="og:title" content="Didier Website" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={siteConfig.customFields.description}
        />
        <meta property="og:image" content={`${siteUrl}/img/avatar-power-up.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Didier Lopes with his golden-haired pixel avatar typing at a laptop" />
        <meta property="og:video" content={`${siteUrl}/video/avatar-power-up.mp4`} />
        <meta property="og:video:secure_url" content={`${siteUrl}/video/avatar-power-up.mp4`} />
        <meta property="og:video:type" content="video/mp4" />
        <meta property="og:video:width" content="1200" />
        <meta property="og:video:height" content="630" />
        <meta property="og:url" content="https://didierlopes.com" />

        {/* Add X-specific meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@didier_lopes" />
        <meta name="twitter:creator" content="@didier_lopes" />
        <meta
          name="twitter:title"
          content="Didier Rodrigues Lopes - Personal Website"
        />
        <meta
          name="twitter:description"
          content={siteConfig.customFields.description}
        />
        <meta name="twitter:image" content={`${siteUrl}/img/avatar-power-up.jpg`} />
        <meta name="twitter:image:alt" content="Didier Lopes with his golden-haired pixel avatar typing at a laptop" />
      </Head>
      <main>
        {/* Phones: the classic homepage, unchanged. */}
        <div className={styles.classic}>
          <section className="mx-auto max-w-[720px] px-4 mt-16 md:mt-28 mb-24 text-lg leading-relaxed">
            {/* Phone: tagline, then centered photo, then location. Desktop: photo left, tagline and location right. */}
            <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-4 sm:gap-y-2 items-center mb-10">
              <p className="m-0 text-xl order-1 sm:order-none sm:col-start-2 sm:row-start-1 sm:self-end">
                Curious, self-driven and obsessive in the pursuit of knowledge; currently, of how machines learn and
                how markets work.
              </p>
              <img
                src="/img/didier.webp"
                alt="Didier Lopes"
                width="176"
                height="176"
                className="rounded-2xl order-2 sm:order-none sm:col-start-1 sm:row-start-1 sm:row-span-2 justify-self-center sm:justify-self-start"
              />
              <p className="m-0 text-base opacity-75 order-3 sm:order-none sm:col-start-2 sm:row-start-2 sm:self-start text-center sm:text-left">
                Lives in New York City
              </p>
            </div>
            <p>
              I build applied AI for financial markets: the systems that make agents work in production. I like to
              innovate and rethink workflows from first principles, with{' '}
              <a href={AGENT_SYSTEMS_2023_URL} target="_blank" rel="noreferrer">agent systems in April 2023</a>{' '}
              and an{' '}
              <a href={AGENTIC_WORKSPACE_2023_URL} target="_blank" rel="noreferrer">agentic workspace in December 2023</a>.
            </p>
            <p className="mt-6">
              I built an open-source financial terminal as a side project over the 2020 holidays; it went viral in
              February 2021 and became OpenBB, one of the most popular finance projects on GitHub and an AI-native research
              platform used by institutional asset managers. I raised close to $10M from OSS Capital, Naval Ravikant,
              Ram Shriram and Elad Gil. What started as a CLI became an agentic workspace used by institutions,
              deployable on-prem or in a VPC (
              <a href={WORKSPACE_DEMO_URL} target="_blank" rel="noreferrer">Workspace demo</a>
              {' · '}
              <a href={AI_CAPABILITIES_URL} target="_blank" rel="noreferrer">AI capabilities</a>
              {' · '}
              <a href={AGENTIC_WORKFLOWS_URL} target="_blank" rel="noreferrer">agentic workflows</a>
              ).
            </p>
            <p className="mt-6">
              OpenBB closed in September 2026, but we{' '}
              <a href={OPENBB_OPEN_SOURCE_URL} target="_blank" rel="noreferrer">open sourced it to the world</a>.
            </p>
            <p className="mt-6">
              Before OpenBB, I was a Sensor Fusion Engineer at NURVV, working on smart running insoles. I built and
              cleaned the running dataset the team developed its algorithms on, redesigned altitude estimation around a
              Kalman filter, added GPS outlier filtering, and shipped footstrike detection and inertial navigation that
              improved the distance and speed reported to runners. Along the way I published{' '}
              <a href={ICMLA_PAPER_URL} target="_blank" rel="noreferrer">Step Detection using SVM on NURVV Trackers</a>{' '}
              at IEEE ICMLA 2021.
            </p>
            <p className="mt-6">
              In 2020 I also wrote the code behind my former university maths professor's PhD thesis,{' '}
              <em>Data Science in the Modeling and Forecasting of Financial Time Series: from Classic Methodologies to
              Deep Learning</em>, which is where I got hands-on with LSTM neural networks. It is open sourced as{' '}
              <a href={TIMESERIES_REPO_URL} target="_blank" rel="noreferrer">UnivariateTimeSeriesForecast</a>.
            </p>
            <p className="mt-6">
              My background is in Control Systems, machine learning and AI. MSc with Distinction, Imperial College
              London. Top 1 student in the BSc in Electrical and Computer Engineering at the Faculty of Sciences and
              Technology, New University of Lisbon (Portugal).
            </p>
          </section>
        </div>

        {/* Tablets and up: Didier at his desk, the bio streaming from his laptop. */}
        <div className={styles.studio}>
          <aside className={styles.left}>
            <PixelGoku
              superSaiyan={powered}
              family={family}
              className={styles.sprite}
              screen={<Readout done={done || !live} wpm={current} />}
            />
            <p className={styles.tagline}>
              Curious, self-driven and obsessive in the pursuit of knowledge; currently, of how machines learn and
              how markets work.
            </p>
            <p className={styles.location}>
              Lives in New York City with{' '}
              <button
                type="button"
                className={styles.familyToggle}
                aria-pressed={family}
                onClick={() => setFamily((f) => !f)}
              >
                wife, daughter and two poms
              </button>
            </p>
          </aside>

          <section className={`px-box ${styles.story} ${live ? styles.live : ''}`}>
            <div className={styles.storyHead}>
              <span className={styles.speaker}>Didier</span>
              {streaming && (
                <button type="button" className={styles.skip} onClick={skip}>
                  Show it all
                </button>
              )}
            </div>
            <div ref={story} className={styles.storyText}>
              <Bio revealed={revealed} streaming={streaming} />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

// What the laptop screen shows: the live typing speed, then the average.
function Readout({ done, wpm }) {
  return done ? (
    <>
      <span className={styles.readLabel}>avg</span>
      <span className={styles.readValue}>{AVERAGE_WPM}</span>
      <span className={styles.readLabel}>wpm</span>
    </>
  ) : (
    <>
      <span className={styles.readLabel}>wpm</span>
      <span className={styles.readValue}>{wpm}</span>
    </>
  );
}
