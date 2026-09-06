import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const AGENT_SYSTEMS_2023_URL = 'https://www.youtube.com/watch?v=fK53ChIiKlM';
const AGENTIC_WORKSPACE_2023_URL = 'https://www.youtube.com/watch?v=V1rYmWWVbIY';
const WORKSPACE_DEMO_URL = 'https://www.youtube.com/watch?v=uYyhswnZkSw';
const AI_CAPABILITIES_URL = 'https://www.youtube.com/watch?v=x42T8GArcCw';
const AGENTIC_WORKFLOWS_URL = 'https://www.youtube.com/watch?v=7fDTDYh2NJ4';
const OPENBB_OPEN_SOURCE_URL = 'https://openbb.co/blog/openbb-belongs-to-everyone/';
const ICMLA_PAPER_URL = 'https://ieeexplore.ieee.org/document/9680024';
const TIMESERIES_REPO_URL = 'https://github.com/DidierRLopes/UnivariateTimeSeriesForecast';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const { url: siteUrl } = siteConfig;

  return (
    <Layout
      title="Homepage"
      description="Didier Rodrigues Lopes personal website"
    >
      <Head>
        <meta property="og:title" content="Didier Website" />
        <meta
          property="og:description"
          content="Where you can find my posts, personal projects and everything in between."
        />
        <meta property="og:image" content={`${siteUrl}/img/goku_pixel.png`} />
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
          content="Discover my posts, personal projects, and journey as Co-founder & CEO at OpenBB."
        />
        <meta name="twitter:image" content={`${siteUrl}/img/goku.png`} />
      </Head>
      <main>
        <section className="mx-auto max-w-[720px] px-4 mt-16 md:mt-28 mb-24 text-lg leading-relaxed">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-10">
            <img
              src="/img/didier.webp"
              alt="Didier Lopes"
              width="176"
              height="176"
              className="rounded-2xl shrink-0"
            />
            <div>
              <p className="m-0 text-xl">
                Curious, self-driven and obsessive in the pursuit of knowledge; currently, of how machines learn and
                how markets work.
              </p>
              <p className="m-0 mt-3 text-base opacity-75">Lives in New York City</p>
            </div>
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
      </main>
    </Layout>
  );
}
