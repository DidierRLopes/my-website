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

  useEffect(() => {
    // On blog post page, remove intro thumbnail/preview and the decorative border
    if (isBlogPostPage && ExecutionEnvironment.canUseDOM) {
      // Select the rendered markdown article
      const article = document.querySelector('article');
      if (!article) return;

      // Locate the border divider that follows the excerpt
      const borderDiv = article.querySelector('div[style*="border-top"]');
      if (!borderDiv) return;

      // Remove every node that comes before the border (intro image, paragraphs, etc.)
      let node = borderDiv.previousSibling;
      while (node) {
        const prevNode = node.previousSibling;
        if (node.remove) {
          node.remove();
        }
        node = prevNode;
      }
      // Finally, remove the border itself
      borderDiv.remove();
    }
  }, [isBlogPostPage]);

  const containerStyle = !isBlogPostPage ? { marginBottom: '5rem' } : {};

  return (
    <>
      <div style={containerStyle}>
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
      </div>
    </>
  );
}