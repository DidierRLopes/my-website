import React from 'react';
import Section from '../common/Section';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Beliefs({ isDesktop, isTablet, githubSrc, githubChartSrc }) {
  const subtitleDesktop = 'Building an open-source legacy, one commit at a time.';
  const subtitleMobile = 'Building an open-source legacy,\none commit at a time.';

  return (
    <Section title="What I believe in" subtitle={isTablet || isDesktop ? subtitleDesktop : subtitleMobile} className="px-4">
      <div className="mb-2">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          interval={5000}
          renderArrowPrev={(clickHandler, hasPrev) =>
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
          }
          renderArrowNext={(clickHandler, hasNext) =>
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
          }
        >
          <div className="flex items-center justify-center w-full">
            <picture className="flex justify-center">
              <source srcSet={githubSrc} />
              {/* fallback */}
              <img
                alt="GitHub stats"
                src="https://github-stats-alpha.vercel.app/api?username=DidierRLopes&cc=fff&tc=000&ic=000&bc=000"
                style={{ width: '700px' }}
              />
            </picture>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <picture className="flex justify-center items-center">
              <source srcSet={githubChartSrc} />
              <img
                alt="GitHub chart"
                src={githubChartSrc}
                style={{
                  maxWidth: isDesktop ? '600px' : isTablet ? '500px' : '300px',
                  margin: 'auto',
                }}
              />
            </picture>
          </div>
        </Carousel>
      </div>
      <p className="text-center mb-4">
        Follow my progress on{' '}
        <a href="https://github.com/DidierRLopes" target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}

export default Beliefs; 