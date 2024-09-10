import { useLocation } from '@docusaurus/router';
import BlogPostPage from '@theme-original/BlogPostPage';
import React from 'react';

export default function BlogPostPageWrapper(props) {
  const location = useLocation();
  const isSpecificPost = location.pathname.includes('/blog/');

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
