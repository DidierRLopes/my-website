import { useBlogPost } from '@docusaurus/theme-common/internal';
import BlogPostItem from '@theme-original/BlogPostItem';
import React from 'react';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();

  return (
    <>
      <BlogPostItem {...props}>
        {props.children}
        {isBlogPostPage && (
          <div>
            <iframe
              src={
                document.documentElement.getAttribute('data-theme') !== 'dark'
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
      </BlogPostItem>
    </>
  );
}
