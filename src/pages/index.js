import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogHistory from '../components/BlogHistory';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      setIsDesktop(window.innerWidth > 1024);
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

  console.log(postsHighlight);
  console.log(allPosts);

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
        <meta property="og:image" content="img/goku.png" />{' '}
        {/* Update with your thumbnail URL */}
        <meta property="og:url" content={'http://didierlopes.com'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center md:mt-16">
          <h1 className="_h1 !mb-2">Who am I?</h1>
          <div className="_subtitle text-lg">
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
                    className="rounded-3xl max-w-[220px]"
                    src="img/me_timegpt.webp"
                    alt="Time-GPT event from Nixtla"
                  />
                </div>
                <div>
                  <img
                    className="rounded-3xl max-w-[220px]"
                    src="img/tattoo.webp"
                    alt="OpenBB Tattoo"
                  />
                </div>
                <div>
                  <img
                    className="rounded-3xl max-w-[220px]"
                    src="img/bridge_sticker.webp"
                    alt="OpenBB bridget sticker"
                  />
                </div>
              </Carousel>
            </div>
          ) : (
            <div className="flex items-center content-center mx-auto align-center justify-center flex-wrap mt-4 gap-8 mb-4">
              <img
                className="rounded-3xl max-h-[300px] mx-auto"
                src="img/tattoo.webp"
                alt="OpenBB Tattoo"
              />
              <img
                className="rounded-3xl max-h-[300px] mx-auto"
                src="img/me_timegpt.webp"
                alt="Time-GPT event from Nixtla"
              />
              <img
                className="rounded-3xl max-h-[300px] mx-auto"
                src="img/bridge_sticker.webp"
                alt="OpenBB bridget sticker"
              />
            </div>
          )}
        </div>
        <div className="mt-16 max-w-[880px] mx-auto">
          {ExecutionEnvironment.canUseDOM && (
            <iframe
              src={
                document.documentElement.getAttribute('data-theme') !== 'dark'
                  ? 'https://embeds.beehiiv.com/57f8fb43-3409-4d9a-9979-66489741be0c'
                  : 'https://embeds.beehiiv.com/8a4b3599-3ce0-40ad-8586-910fd9a20ee4'
              }
              data-test-id="beehiiv-embed"
              width="100%"
              height="200"
              frameBorder="0"
              scrolling="no"
              title="Didier newsletter"
            />
          )}
        </div>
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center rounded-[14px]">
          <h1 className="mb-4">My journey.</h1>
          <div
            style={{ maxHeight: '280px', overflowY: 'scroll', padding: '2px' }}
          >
            <ul className="mt-4 text-left pr-2">
              <p>
                <strong>2024</strong> 🗽 Moved with family again to be closer to
                customers in NYC.
              </p>
              <br />
              <p>
                <strong>2023</strong> 🇺🇸 Moved with family to the Bay area, to
                be closer to tech founders and investors.
              </p>
              <br />
              <p>
                <strong>2022</strong> 🦋 Announced OpenBB to the world and
                rebranded the terminal - [
                <a
                  href="https://openbb.co/blog/gme-didnt-take-me-to-the-moon-but-gamestonk-terminal-did"
                  target="_blank"
                  rel="noreferrer"
                >
                  announcement
                </a>
                ].
              </p>
              <br />
              <p>
                <strong>2021</strong> 📈 We raised $8.9M in a seed round to
                democratize investment research.
              </p>
              <br />
              <p>
                <strong>2021</strong> 🦍 Gamestonk Terminal was open source and
                went viral on{' '}
                <a
                  href="https://www.reddit.com/r/Superstonk/comments/mx2cjh/move_over_bloomberg_terminal_here_comes_gamestonk/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Reddit
                </a>{' '}
                and{' '}
                <a
                  href="https://news.ycombinator.com/item?id=26258773"
                  target="_blank"
                  rel="noreferrer"
                >
                  HackerNews
                </a>
                .
              </p>
              <br />
              <p>
                <strong>2020</strong> 🦠 During Xmas my flight got cancelled. So
                started building a financial terminal.
              </p>
              <br />
              <p>
                <strong>2020</strong> 😤 Performing own investment research and
                frustrated by how time-consuming it was.
              </p>
              <br />
              <p>
                <strong>2020</strong> 🏃 Joined startup NURVV and worked as
                Sensor Fusion Engineer [
                <a
                  href="https://ieeexplore.ieee.org/document/9680024"
                  target="_blank"
                  rel="noreferrer"
                >
                  paper
                </a>
                ].
              </p>
              <br />
              <p>
                <strong>2019</strong> 🎓 Wrote code behind my math teacher's
                thesis on{' '}
                <a
                  href="https://github.com/DidierRLopes/UnivariateTimeSeriesForecast"
                  target="_blank"
                  rel="noreferrer"
                >
                  Forecasting of Financial timeseries
                </a>
                .
              </p>
              <br />
              <p>
                <strong>2018</strong> 🚗 Excited about AI and self-driving cars,
                worked as Software Engineer at u-blox.
              </p>
              <br />
              <p>
                <strong>2017</strong> 🇬🇧 Moved to London for a MSc. in Control
                Systems at Imperial College London [
                <a
                  href="https://ieeexplore.ieee.org/document/8796226"
                  target="_blank"
                  rel="noreferrer"
                >
                  paper
                </a>
                ].
              </p>
              <br />
              <p>
                <strong>2016</strong> 🇳🇱 Did a semester in TU Delft and learned
                about self-driving cars.
              </p>
              <br />
              <p>
                <strong>2013</strong> 📚 BSc. in Electrical and Computer
                Engineering at FCT-UNL.
              </p>
              <br />
              <p>
                <strong>2003</strong> 🇵🇹 Moved to Portugal when I was 8yo.
              </p>
              <br />
              <p>
                <strong>1995</strong> 🇨🇭 I was born in Switzerland, but both my
                parents are Portuguese emmigrants.
              </p>
            </ul>
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-base mt-4">
            <div className="flex mx-auto gap-8 grid-cols-2 justify-center">
              <div className="flex justify-center items-center mx-auto mt-4">
                <a
                  href="https://twitter.com/didier_lopes"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="!no-underline"
                >
                  <div className="flex rounded-xl p-2 w-32 bg-[#0088CC] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#0088CC] hover:no-underline mx-auto text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      title="X (formerly Twitter) logo"
                      aria-label="X (formerly Twitter) logo"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={1.5}
                      viewBox="0 0 50 50"
                      className="mx-auto"
                      role="img"
                    >
                      <path d="M11 4c-3.854 0-7 3.146-7 7v28c0 3.854 3.146 7 7 7h28c3.854 0 7-3.146 7-7V11c0-3.854-3.146-7-7-7H11zm0 2h28c2.774 0 5 2.226 5 5v28c0 2.774-2.226 5-5 5H11c-2.774 0-5-2.226-5-5V11c0-2.774 2.226-5 5-5zm2.086 7 9.223 13.104L13 37h2.5l7.938-9.293L29.977 37h7.937L27.79 22.613 36 13h-2.5l-6.84 8.01L21.023 13h-7.937zm3.828 2h3.065l14.107 20H31.02L16.914 15z" />
                    </svg>
                  </div>
                </a>
              </div>
              <div className="flex justify-center items-center mx-auto mt-4">
                <a
                  href="https://www.linkedin.com/in/didier-lopes/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="!no-underline"
                >
                  <div className="flex rounded-xl p-2 w-32 bg-[#0088CC] hover:bg-grey-200 hover:dark:bg-grey-200 hover:text-[#0088CC] hover:no-underline mx-auto justify-center items-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={32}
                      height={32}
                      title="Linkedin logo"
                      aria-label="Linkedin logo"
                      fill="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 30 30"
                      className="mx-auto"
                      role="img"
                    >
                      <path d="M24 4H6a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM10.954 22h-2.95v-9.492h2.95V22zM9.449 11.151a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44zM22.004 22h-2.948v-4.616c0-1.101-.02-2.517-1.533-2.517-1.535 0-1.771 1.199-1.771 2.437V22h-2.948v-9.492h2.83v1.297h.04c.394-.746 1.356-1.533 2.791-1.533 2.987 0 3.539 1.966 3.539 4.522V22z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <h1 className="_h1 !mb-2">Latest Blog Posts</h1>
          {isDesktop ? (
            <div className="flex items-start content-center mx-auto align-center justify-center mt-4 gap-8 mb-4 flex-row">
              {postsHighlight.map((post) => (
                <div
                  key={post.id}
                  className="mx-2 max-w-[250px] flex flex-col items-center"
                  style={{ height: '100%' }}
                >
                  <a
                    href={`${post.id}`}
                    className="flex flex-col items-center h-full"
                  >
                    <img
                      className="rounded-3xl object-cover mb-2 text-center justify-center align-center mx-auto"
                      src={post.content_html.match(/<img.*?src="(.*?)"/)[1]}
                      alt={post.title}
                      style={{
                        flex: '1 0 auto',
                        width: '220px',
                        height: '150px',
                        objectFit: 'cover',
                      }}
                    />
                    <p className="text-left text-sm w-full mt-auto">
                      {post.title}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center content-center mx-auto align-center justify-center mt-4 gap-4 mb-4 flex-col">
              {postsHighlight.map((post) => (
                <div key={post.id} className="my-2">
                  <a href={`${post.id}`}>
                    <img
                      className="rounded-3xl w-[220px] h-[160px] object-cover mb-2 mx-auto"
                      src={post.content_html.match(/<img.*?src="(.*?)"/)[1]}
                      alt={post.title}
                    />
                    <p className="text-center text-sm w-[240px] mx-auto">
                      {post.title}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <div className="_subtitle text-lg">Consistency</div>
          {allPosts && allPosts.length > 0 && <BlogHistory posts={allPosts} />}
        </div>

        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center rounded-[14px]">
          <h1>What I believe in.</h1>
          <p className="mb-4 mt-4">
            Building an open-source legacy, one commit at a time.{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/DidierRLopes"
            >
              Follow my journey on GitHub
            </a>
            .
          </p>
          <div className="flex-col items-center text-center mx-auto align-center justify-center gap-8 mt-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <iframe
                src="https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=000&tc=fff&ic=fff&bc=fff"
                width={isDesktop ? '400' : '300'}
                height="200"
                title="GitHub Stats"
                className="flex"
              />
              <iframe
                src="https://ssr-contributions-svg.vercel.app/_/DidierRLopes?chart=3dbar&format=svg&theme=blue"
                width={isDesktop ? '400' : '300'}
                height="200"
                title="GitHub Contributions"
                className="flex"
              />
            </div>
            <p className="mb-4 mt-4">
              Starting with the most open financial company:{' '}
              <a target="_blank" rel="noreferrer" href="https://openbb.co/open">
                openbb.co/open
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex flex-col px-3 text-center md:max-w-[880px]">
          <h1 className="_h1 !mb-2">Outside work?</h1>
          <span className="_subtitle">
            In my spare time I like to do boxing, read books, play soccer or PS5
            with wife.
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
        <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center mb-16">
          <h1 className="_h1 !mb-2">Let's catch up!</h1>
          <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 pr-8 mb-2">
            <span>
              I am available for 15 minutes calls as long as you set an agenda.
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
