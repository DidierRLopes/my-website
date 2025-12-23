import { useLocation } from '@docusaurus/router';
import BlogPostPage from '@theme-original/BlogPostPage';
import React, { useEffect } from 'react';

export default function BlogPostPageWrapper(props) {
  const location = useLocation();
  const isSpecificPost = location.pathname.includes('/blog/');

  // Add class to body for CSS targeting (faster than waiting for React)
  useEffect(() => {
    if (isSpecificPost) {
      document.body.classList.add('blog-post-page');
      return () => document.body.classList.remove('blog-post-page');
    }
  }, [isSpecificPost]);

  if (isSpecificPost) {
    // Override the blogSidebarCount for this specific post
    props = {
      ...props,
      sidebar: {
        ...props.sidebar,
        items: [],
      },
    };
  }

  return <BlogPostPage {...props} />;
}
