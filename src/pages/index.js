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
              <Carousel showThumbs={false} showStatus={false}>
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
          <p className="text-xl text-center">
            Building an open-source legacy, one commit at a time.
          </p>
          <div className="h-[200px] relative">
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} interval={5000}>
              <div className="flex items-center justify-center h-full">
                <iframe
                  src="https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=000&tc=fff&ic=fff&bc=fff"
                  width="100%"
                  height="200"
                  title="GitHub Stats"
                  className="border-0 my-auto pt-8"
                />
              </div>
              <div className="flex items-center justify-center">
                <iframe
                  src="https://ssr-contributions-svg.vercel.app/_/DidierRLopes?chart=3dbar&format=svg&theme=blue"
                  width="100%"
                  height="200"
                  title="GitHub Contributions"
                  className="border-0 my-auto"
                />
              </div>
            </Carousel>
          </div>
          <p className="text-center mt-8 mb-4">
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
              <div className="relative mt-8 mb-4 overflow-hidden">
                <div className="flex animate-scroll gap-8">
                  {postsHighlight.concat(postsHighlight).map((post, index) => (
                    <div
                      key={`${post.id}-${index}`}
                      className="flex-shrink-0 w-[250px]"
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
              </div>
            </>
          ) : isTablet ? (
            <div className="flex justify-center gap-8 mt-8 mb-4">
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
            <Carousel showThumbs={false} showStatus={false} showIndicators={false} autoPlay={true} interval={5000}>
              {postsHighlight.map((post) => (
                <div key={post.id} className='!max-w-[260px] mx-auto text-center'>
                  <a href={`${post.id}`} className="group block pt-8">
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
              src={
                document.documentElement.getAttribute('data-theme') !== 'dark'
                  ? 'https://embeds.beehiiv.com/57f8fb43-3409-4d9a-9979-66489741be0c'
                  : 'https://embeds.beehiiv.com/8a4b3599-3ce0-40ad-8586-910fd9a20ee4'
              }
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

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center rounded-[14px]">
          <h1 className="mb-4 font-bold">My journey.</h1>
          <Timeline />
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <h1 className="_h1 !mb-2 font-bold">Let's catch up!</h1>
          <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 pr-8 mb-2">
            <span>
              I am available for 15m calls as long as you set an agenda.
            </span>
            <p>(and it is not a sales call)</p>
          </div>
          <div className="flex justify-center items-center mx-auto mt-2">
            <a
              href="https://cal.com/didierlopes/15min"
              target="_blank"
              rel="noreferrer noopener"
              className="flex justify-center items-center mx-auto"
            >
              <div className="flex rounded-xl p-2 w-32 bg-[#0088CC] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#0088CC] hover:no-underline mx-auto text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={101}
                  height={22}
                  fill="currentColor"
                  className="mx-auto"
                  title="Cal.com logo"
                  aria-label="Cal.com logo"
                  role="img"
                >
                  <path d="M10.058 20.817C4.321 20.817 0 16.277 0 10.67 0 5.046 4.1.468 10.058.468c3.163 0 5.351.971 7.061 3.195l-2.758 2.299c-1.159-1.234-2.556-1.85-4.303-1.85-3.88 0-6.013 2.97-6.013 6.558 0 3.588 2.336 6.503 6.013 6.503 1.729 0 3.2-.616 4.358-1.85l2.721 2.392c-1.636 2.13-3.88 3.102-7.079 3.102ZM29.016 5.886h3.714v14.575h-3.714v-2.13c-.772 1.514-2.06 2.523-4.523 2.523-3.935 0-7.08-3.42-7.08-7.624 0-4.205 3.145-7.624 7.08-7.624 2.445 0 3.75 1.009 4.523 2.522V5.886Zm.11 7.344c0-2.28-1.563-4.167-4.027-4.167-2.372 0-3.916 1.906-3.916 4.167 0 2.205 1.544 4.167 3.916 4.167 2.446 0 4.027-1.906 4.027-4.167ZM35.36 0h3.714v20.443H35.36V0ZM40.73 18.518c0-1.196.955-2.205 2.26-2.205a2.18 2.18 0 0 1 2.226 2.205c0 1.233-.938 2.242-2.225 2.242a2.231 2.231 0 0 1-2.262-2.242ZM59.43 18.107c-1.38 1.681-3.476 2.747-5.958 2.747-4.432 0-7.686-3.42-7.686-7.624 0-4.205 3.254-7.624 7.686-7.624 2.39 0 4.468 1.009 5.847 2.597l-2.868 2.41c-.717-.896-1.655-1.569-2.98-1.569-2.371 0-3.916 1.906-3.916 4.167s1.545 4.167 3.917 4.167c1.434 0 2.427-.747 3.163-1.757l2.795 2.486ZM59.742 13.23c0-4.205 3.255-7.624 7.686-7.624 4.432 0 7.686 3.42 7.686 7.624s-3.254 7.624-7.686 7.624c-4.431-.02-7.686-3.42-7.686-7.624Zm11.603 0c0-2.28-1.545-4.167-3.917-4.167-2.372-.019-3.916 1.887-3.916 4.167 0 2.26 1.544 4.167 3.916 4.167s3.917-1.906 3.917-4.167ZM100.232 11.548v8.895h-3.714v-7.98c0-2.522-1.177-3.606-2.942-3.606-1.655 0-2.832.823-2.832 3.607v7.979H87.03v-7.98c0-2.522-1.195-3.606-2.942-3.606-1.655 0-3.108.823-3.108 3.607v7.979h-3.714V5.868h3.714v2.018c.772-1.57 2.17-2.355 4.321-2.355 2.041 0 3.751 1.01 4.69 2.71.937-1.738 2.316-2.71 4.817-2.71 3.052.019 5.424 2.336 5.424 6.017Z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
}
