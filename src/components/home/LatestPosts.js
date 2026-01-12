import React from 'react';
import Section from '../common/Section';
import BlogHistory from '../BlogHistory';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Construct hero image URL from post date and slug
// Pattern: /blog/YYYY-MM-DD-slug.webp
const getHeroImage = (post) => {
  if (!post.date_modified || !post.id) return null;
  const date = new Date(post.date_modified);
  // Use UTC methods to avoid timezone issues
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  // Extract slug from URL like "https://didierlopes.com/blog/my-slug"
  const slug = post.id.split('/blog/')[1];
  if (!slug) return null;
  return `/blog/${yyyy}-${mm}-${dd}-${slug}.webp`;
};

function LatestPosts({ allPosts, postsHighlight, isDesktop, isTablet }) {
  // Ensure we never display more than 3 highlight posts with hero images
  const highlights = (postsHighlight || [])
    .map(post => ({ ...post, image: getHeroImage(post) }))
    .filter(post => post.image)
    .slice(0, 3);

  return (
    <Section title="Latest posts." subtitle="I write so I can think and communicate better.">
      {allPosts && allPosts.length > 0 && (
        <BlogHistory posts={allPosts} isDesktop={isDesktop} />
      )}
      {isDesktop ? (
        <div className="relative overflow-hidden max-w-[814px] mx-auto">
          <div className="flex animate-scroll gap-8">
            {highlights.concat(highlights).map((post, index) => (
              <div
                key={`${post.id}-${index}`}
                className="flex-shrink-0 w-[250px]"
              >
                <a href={`${post.id}`} className="block h-full">
                  <div className="overflow-hidden rounded-xl mb-3">
                    <img
                      className="w-full h-[180px] object-cover transition-transform duration-300 hover:scale-110"
                      src={post.image}
                      alt={post.title}
                    />
                  </div>
                  <h3 className="text-left text-sm font-semibold">{post.title}</h3>
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : isTablet ? (
        <div className="flex justify-center gap-8 mb-4">
          {highlights.slice(0, 2).map((post) => (
            <div key={post.id} className="w-[250px]">
              <a
                href={`${post.id}`}
                className="group block h-full transition-transform duration-300 hover:scale-105"
              >
                <div className="overflow-hidden rounded-xl mb-3">
                  <img
                    className="w-full h-[180px] object-cover transition-transform duration-300 group-hover:scale-110"
                    src={post.image}
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
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          autoPlay
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
          {highlights.map((post) => (
            <div key={post.id} className="!max-w-[260px] mx-auto text-center">
              <a href={`${post.id}`} className="group block pt-12">
                <img
                  className="rounded-xl h-[120px] mx-auto object-cover"
                  src={post.image}
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
    </Section>
  );
}

export default LatestPosts; 