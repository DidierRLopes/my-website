import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Section from '../components/common/Section';
import WhoAmI from '../components/home/WhoAmI';
import Beliefs from '../components/home/Beliefs';
import LatestPosts from '../components/home/LatestPosts';
import OutsideWork from '../components/home/OutsideWork';
import Journey from '../components/home/Journey';
import NewsletterCTA from '../components/NewsletterCTA';

if (typeof window !== 'undefined') {
  // Prevent TradingView cross-origin "Script error." from triggering the dev-server overlay
  window.addEventListener(
    'error',
    (evt) => {
      if (evt.message === 'Script error.') {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return false;
      }
    },
    true,
  );

  // Fallback: hide the overlay element if it still shows up
  const style = document.createElement('style');
  style.innerHTML =
    '#webpack-dev-server-client-overlay { display: none !important; }';
  document.head.appendChild(style);
}

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [githubSrc, setGithubSrc] = useState(
    'https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000',
  );
  const [githubChartSrc, setGithubChartSrc] = useState(
    'https://contribution.oooo.so/_/DidierRLopes?chart=3dbar&gap=0.6&scale=2&flatten=1&gradient=false&legend=true&legendPosition=bottomLeft&legendDirection=row&strokeWidth=2&strokeColor=222222&animation=mess&animation_duration=4&animation_loop=true&format=html&weeks=30&theme=blue_orbit&dark=true',
  );

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const handleResize = () => {
        // Using 576px as the mobile breakpoint and 992px as the tablet breakpoint
        setIsTablet(window.innerWidth > 576 && window.innerWidth <= 992);
        setIsDesktop(window.innerWidth > 992);
      };

      // Initial check
      handleResize();

      // Add resize listener to handle window resizing
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // Function to update sources based on theme
      const updateSources = () => {
        const isDarkTheme =
          document.documentElement.getAttribute('data-theme') === 'dark';

        setGithubSrc(
          isDarkTheme
            ? 'https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=000&tc=fff&ic=fff&bc=fff'
            : 'https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000',
        );

        setGithubChartSrc(
          isDarkTheme
            ? 'https://contribution.oooo.so/_/DidierRLopes?chart=3dbar&gap=0.6&scale=2&flatten=1&gradient=false&legend=true&legendPosition=bottomLeft&legendDirection=row&strokeWidth=2&strokeColor=222222&animation=mess&animation_duration=4&animation_loop=true&format=html&weeks=30&theme=blue_orbit&dark=true'
            : 'https://contribution.oooo.so/_/DidierRLopes?chart=3dbar&gap=0.6&scale=2&flatten=1&gradient=false&legend=true&legendPosition=bottomLeft&legendDirection=row&strokeWidth=2&strokeColor=222222&animation=mess&animation_duration=4&animation_loop=true&format=html&weeks=30&theme=blue_orbit',
        );
      };

      // Initial update
      updateSources();

      // Create mutation observer
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-theme'
          ) {
            updateSources();
          }
        }
      });

      // Start observing
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  const { siteConfig } = useDocusaurusContext();
  const { url: siteUrl } = siteConfig;
  const [postsHighlight, setPostsHighlight] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    fetch(`${siteUrl}/blog/feed.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAllPosts(data.items);
        setPostsHighlight(data.items.slice(0, 3));
      })
      .catch((error) => {
        console.log(
          `There was a problem with the fetch operation: ${error.message}`,
        );
      });
  }, [siteUrl]);

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
        {/*}
        <div className="w-full py-3 sm:py-4">
          <div className="max-w-[880px] mx-auto px-4 flex items-center justify-center">
            <a
              href="https://substack.com/@didierrlopes"
              target="_blank"
              rel="noreferrer"
              className="pill-banner-link"
            >
              <span className="pill-banner-text">I write weekly about AI, open source, startups and finance</span>
            </a>
          </div>
        </div>
        */}
        <div className="w-full py-3 sm:py-4">
          <div className="max-w-[880px] mx-auto px-4 flex items-center justify-center">
            <div className="fundraiser-teaser-card" role="note" aria-label="Fundraiser teaser">
              <div className="fundraiser-teaser-preview">
                <div className="fundraiser-teaser-media">
                  <img
                    src="/blog/2024-08-01-inspired-by-bia-how-her-fight-against-cancer-changed-my-life/2024-08-01-inspired-by-bia-how-her-fight-against-cancer-changed-my-life_3.webp"
                    alt="Bia"
                  />
                </div>
                <div className="fundraiser-teaser-copy">
                  <div className="fundraiser-teaser-kicker">NYC Marathon for Team Continuum</div>
                  <p>
                    At 16, my best friend Bia fought cancer. Having someone this close to you die at that age, shapes you. All her would-haves are indeed our opportunities.
                  </p>
                  <div className="fundraiser-teaser-actions">
                    <a
                      href="/blog/inspired-by-bia-how-her-fight-against-cancer-changed-my-life"
                      className="fundraiser-teaser-story"
                    >
                      Read the full story
                    </a>
                    <a
                      href="https://www.teamcontinuum.net/didierlopes/"
                      target="_blank"
                      rel="noreferrer"
                      className="fundraiser-teaser-main"
                      aria-label="Support Didier's NYC Marathon fundraiser for Team Continuum"
                    >
                      <span className="fundraiser-teaser-cta">Support this cause</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Home Sections */}
        <WhoAmI isDesktop={isDesktop} isTablet={isTablet} />

        <Beliefs
          isDesktop={isDesktop}
          isTablet={isTablet}
          githubSrc={githubSrc}
          githubChartSrc={githubChartSrc}
        />

        <LatestPosts
          allPosts={allPosts}
          postsHighlight={postsHighlight}
          isDesktop={isDesktop}
          isTablet={isTablet}
        />

        {/* Newsletter CTA */}
        <Section className="max-w-[880px] px-4 !mt-0">
          <NewsletterCTA variant="compact" />
        </Section>

        <OutsideWork isDesktop={isDesktop} />

        <Journey />
      </main>
    </Layout>
  );
}
