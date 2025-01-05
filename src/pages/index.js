import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogHistory from '../components/BlogHistory';
import Timeline from '../components/Timeline';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [beehiivSrc, setBehiivSrc] = useState('https://embeds.beehiiv.com/8a4b3599-3ce0-40ad-8586-910fd9a20ee4');
  const [githubSrc, setGithubSrc] = useState('https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000');
  const [githubChartSrc, setGithubChartSrc] = useState('https://contribution.oooo.so/_/DidierRLopes?chart=calendar&format=png&weeks=20&theme=blue&widget_size=small');


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
      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

      setBehiivSrc(
        isDarkTheme
          ? 'https://embeds.beehiiv.com/8a4b3599-3ce0-40ad-8586-910fd9a20ee4'
          : 'https://embeds.beehiiv.com/57f8fb43-3409-4d9a-9979-66489741be0c'
      );

      setGithubSrc(
        isDarkTheme
          ? 'https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=000&tc=fff&ic=fff&bc=fff'
          : 'https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000'
      );

      setGithubChartSrc(
        isDarkTheme
          ? 'https://contribution.oooo.so/_/DidierRLopes?chart=calendar&format=png&weeks=20&theme=blue&widget_size=small&dark=true'
          : 'https://contribution.oooo.so/_/DidierRLopes?chart=calendar&format=png&weeks=20&theme=blue&widget_size=small'
      )
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
        <meta property="og:image" content={`${siteUrl}/img/goku.png`} />
        <meta property="og:url" content="https://didierlopes.com" />
        
        {/* Add X-specific meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@didier_lopes" />
        <meta name="twitter:creator" content="@didier_lopes" />
        <meta name="twitter:title" content="Didier Rodrigues Lopes - Personal Website" />
        <meta name="twitter:description" content="Discover my posts, personal projects, and journey as Co-founder & CEO at OpenBB." />
        <meta name="twitter:image" content={`${siteUrl}/img/goku.png`} />
      </Head>
      <main>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center md:mt-16">
          <h1 className="_h1 !mb-2 font-bold">Who am I?</h1>
          <div className="text-xl">
            Co-founder & CEO at{' '}
            <a target="_blank" rel="noreferrer" href="https://openbb.co/">
              OpenBB
            </a>
          </div>
          {!isDesktop ? (
            <div className="flex items-center content-center mx-auto align-center justify-center flex-wrap mt-4 gap-8 mb-4">
              <Carousel
                showThumbs={false}
                showStatus={false}
                renderArrowPrev={(clickHandler, hasPrev) => (
                  hasPrev && (
                    <button
                      type="button"
                      onClick={clickHandler}
                      className="absolute left-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      aria-label="Previous slide"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                  hasNext && (
                    <button
                      type="button"
                      onClick={clickHandler}
                      className="absolute right-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                      aria-label="Next slide"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )
                )
              }>
                <div>
                  <img
                    className="rounded-xl max-w-[220px]"
                    src="img/me_timegpt.webp"
                    alt="Time-GPT event from Nixtla"
                  />
                </div>
                <div>
                  <img
                    className="rounded-xl max-w-[220px]"
                    src="img/tattoo.webp"
                    alt="OpenBB Tattoo"
                  />
                </div>
                <div>
                  <img
                    className="rounded-xl max-w-[220px]"
                    src="img/bridge_sticker.webp"
                    alt="OpenBB bridge sticker"
                  />
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="flex items-center content-center mx-auto align-center justify-center flex-wrap mt-4 gap-8 mb-4">
              <img
                className="rounded-xl max-h-[300px] mx-auto"
                src="img/tattoo.webp"
                alt="OpenBB Tattoo"
              />
              <img
                className="rounded-xl max-h-[300px] mx-auto"
                src="img/me_timegpt.webp"
                alt="Time-GPT event from Nixtla"
              />
              <img
                className="rounded-xl max-h-[300px] mx-auto"
                src="img/bridge_sticker.webp"
                alt="OpenBB bridget sticker"
              />
            </div>
          )}
          <p className="text-center mt-4">
            You can reach me on <a href="https://twitter.com/didier_lopes" target="_blank" rel="noreferrer">X</a> and <a href="https://www.linkedin.com/in/didier-lopes/" target="_blank" rel="noreferrer">LinkedIn</a>, where I post frequently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-[880px] px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">What I believe in</h2>
          <p className="text-xl text-center sm:block hidden mb-4">
            Building an open-source legacy, one commit at a time.
          </p>
          <p className="text-xl text-center sm:hidden block mb-4">
            Building an open-source legacy,<br />one commit at a time.
          </p>
          <div className="mb-2">
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              autoPlay={true}
              interval={5000}
              renderArrowPrev={(clickHandler, hasPrev) => (
                hasPrev && (
                  <button
                    type="button"
                    onClick={clickHandler}
                    className="absolute left-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label="Previous slide"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )
              )}
              renderArrowNext={(clickHandler, hasNext) => (
                hasNext && (
                  <button
                    type="button"
                    onClick={clickHandler}
                    className="absolute right-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label="Next slide"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )
              )
            }>
              <div className="flex items-center justify-center w-full">
                <picture className="flex justify-center">
                  <source srcSet={githubSrc} />
                  <img alt="" src="https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000" style={{ width: '700px' }} />
                </picture>
              </div>
              <div className="flex items-center justify-center w-full h-full">
                <picture className="flex justify-center items-center">
                  <source srcSet={githubChartSrc} />
                  <img alt="" src={githubChartSrc} style={{ maxWidth: isDesktop ? '600px' : isTablet ? '500px' : '300px', margin: 'auto' }} />
                </picture>
              </div>
            </Carousel>
          </div>
          <p className="text-center mb-4">
            Follow my progress on <a href="https://github.com/DidierRLopes" target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <h1 className="_h1 !mb-2 font-bold">Latest posts.</h1>
          <p className="text-xl text-center mb-2 md:mb-8">
            I write so I can think and communicate better.
          </p>
          {allPosts && allPosts.length > 0 && (
            <BlogHistory posts={allPosts} isDesktop={isDesktop} />
          )}
          {isDesktop ? (
            <>
              <div className="relative mb-4 overflow-hidden">
                <div className="flex animate-scroll gap-8">
                  {postsHighlight.concat(postsHighlight).map((post, index) => (
                    <div
                      key={`${post.id}-${index}`}
                      className="flex-shrink-0 w-[250px]"
                    >
                      <a
                        href={`${post.id}`}
                        className="block h-full"
                      >
                        <div className="overflow-hidden rounded-xl mb-3">
                          <img
                            className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-110"
                            src={post.content_html.match(/<img.*?src="(.*?)"/)[1]}
                            alt={post.title}
                          />
                        </div>
                        <h3 className="text-left text-sm font-semibold">
                          {post.title}
                        </h3>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : isTablet ? (
            <div className="flex justify-center gap-8 mb-4">
              {postsHighlight.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="w-[250px]"
                >
                  <a
                    href={`${post.id}`}
                    className="group block h-full transition-transform duration-300 hover:scale-105"
                  >
                    <div className="overflow-hidden rounded-xl mb-3">
                      <img
                        className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-110"
                        src={post.content_html.match(/<img.*?src="(.*?)"/)[1]}
                        alt={post.title}
                      />
                    </div>
                    <h3 className="text-left text-sm font-semibold group-hover:text-blue-500 transition-colors duration-300">
                      {post.title}
                    </h3>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} interval={5000}
            renderArrowPrev={(clickHandler, hasPrev) => (
              hasPrev && (
                <button
                  type="button"
                  onClick={clickHandler}
                  className="absolute left-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              hasNext && (
                <button
                  type="button"
                  onClick={clickHandler}
                  className="absolute right-0 z-10 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )
            )}
          >
              {postsHighlight.map((post) => (
                <div key={post.id} className='!max-w-[260px] mx-auto text-center'>
                  <a href={`${post.id}`} className="group block pt-12">
                    <img
                      className="rounded-xl h-[120px] mx-auto object-cover"
                      src={post.content_html.match(/<img.*?src="(.*?)"/)[1]}
                      alt={post.title}
                    />
                    <h3 className="text-center text-sm font-semibold mt-2 group-hover:text-blue-500 transition-colors duration-300">
                      {post.title}
                    </h3>
                  </a>
                </div>
              ))}
            </Carousel>
          )}
        </div>
        
        <div className="mt-4 max-w-[880px] mx-auto px-4">
          {ExecutionEnvironment.canUseDOM && (
            <iframe
              src={beehiivSrc}
              data-test-id="beehiiv-embed"
              width="100%"
              height={isDesktop ? "200" : "250"}
              frameBorder="0"
              scrolling="no"
              title="Didier newsletter"
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                display: 'block',
                margin: '0 auto'
              }}
            />
          )}
        </div>
        <div className="mx-auto mt-16 flex flex-col px-3 text-center md:max-w-[880px]">
          <h1 className="_h1 !mb-2 font-bold">Outside work?</h1>
          <span className="_subtitle">
            In my spare time I do boxing, play soccer, code, read books or play PS5.
          </span>
          <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 mb-4">
            <iframe
              // Note that the &zoom=9 is important to set the zoom level
              src="https://www.google.com/maps/d/u/0/embed?mid=1cA9FfT4NkLqRKCsIcgtGKJXh6P9H15M&ehbc=2E312F&zoom=9"
              width="100%"
              height={isDesktop ? '480' : '220'}
              title="My travels"
              className="mt-2 mb-4"
            />
            <p className="text-sm">
              Nowadays I put work first. But I intend to travel to over 100
              different countries.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center rounded-[14px] mb-8">
          <h1 className="mb-4 font-bold">My journey.</h1>
          <Timeline />
        </div>
      </main>
    </Layout>
  );
}
