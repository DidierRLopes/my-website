import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const isBrowser = useIsBrowser();
  const [theme, setTheme] = useState('light');
  const [beehiivSrc, setBehiivSrc] = useState('https://embeds.beehiiv.com/2c2719b8-abe1-4f8b-8427-fb9c2361f059');

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // Function to update sources based on theme
      const updateSources = () => {
        const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  
        setBehiivSrc(
          isDarkTheme
            ? 'https://embeds.beehiiv.com/2c2719b8-abe1-4f8b-8427-fb9c2361f059'
            : 'https://embeds.beehiiv.com/e1ef8c12-fc6d-4afa-8235-057b2e9bb6f3'
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
        attributeFilter: ['data-theme']
      });
  
      // Cleanup
      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <BlogPostItem {...props}>
        {props.children}
        {isBlogPostPage && (
          <BrowserOnly>
            {() => (
              <div>
                <iframe
                  src={beehiivSrc}
                  data-test-id="beehiiv-embed"
                  width="100%"
                  height="200"
                  frameBorder="0"
                  scrolling="no"
                  title="Didier newsletter"
                />
              </div>
            )}
          </BrowserOnly>
        )}
      </BlogPostItem>
    </>
  );
}