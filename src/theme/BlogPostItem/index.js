import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useIsBrowser from '@docusaurus/useIsBrowser';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const isBrowser = useIsBrowser();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (isBrowser) {
      setTheme(document.documentElement.getAttribute('data-theme') !== 'dark' ? 'light' : 'dark');
    }
  }, [isBrowser]);

  return (
    <>
      <BlogPostItem {...props}>
        {props.children}
        {isBlogPostPage && (
          <BrowserOnly>
            {() => (
              <div>
                <iframe
                  src={
                    theme === 'light'
                      ? 'https://embeds.beehiiv.com/e1ef8c12-fc6d-4afa-8235-057b2e9bb6f3'
                      : 'https://embeds.beehiiv.com/2c2719b8-abe1-4f8b-8427-fb9c2361f059'
                  }
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