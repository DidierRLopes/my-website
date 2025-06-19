import React from 'react';
import Section from '../common/Section';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function WhoAmI({ isDesktop, isTablet }) {
  return (
    <Section title="Who am I?">
      <div className="text-xl">
        Founder &amp; CEO at{' '}
        <a target="_blank" rel="noreferrer" href="https://openbb.co/">
          OpenBB
        </a>
      </div>
      {!isDesktop ? (
        <div className="flex items-center content-center mx-auto align-center justify-center flex-wrap mt-4 gap-8 mb-4">
          <Carousel
            showThumbs={false}
            showStatus={false}
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
        You can reach me on{' '}
        <a href="https://twitter.com/didier_lopes" target="_blank" rel="noreferrer">
          X
        </a>{' '}
        and{' '}
        <a href="https://www.linkedin.com/in/didier-lopes/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        , where I post frequently.
      </p>
    </Section>
  );
}

export default WhoAmI; 