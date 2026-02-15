import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useState, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import NewsletterCTA from '@site/src/components/NewsletterCTA';

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  const [isReady, setIsReady] = useState(!isBlogPostPage); // List pages are ready immediately
  const articleRef = useRef(null);

  useEffect(() => {
    // On blog post page, remove intro thumbnail/preview and the decorative border
    if (!isBlogPostPage || !ExecutionEnvironment.canUseDOM) return;

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      const article = articleRef.current?.querySelector('article') || document.querySelector('article');
      if (!article) {
        setIsReady(true);
        return;
      }

      const borderDiv = article.querySelector('div[style*="border-top"]');
      if (!borderDiv) {
        setIsReady(true);
        return;
      }

      // Collect all nodes to remove first (avoids multiple reflows)
      const nodesToRemove = [];
      let node = borderDiv.previousSibling;
      while (node) {
        nodesToRemove.push(node);
        node = node.previousSibling;
      }
      nodesToRemove.push(borderDiv);

      // Remove all nodes in a single batch
      nodesToRemove.forEach(n => n.remove?.());

      // Mark as ready to show content
      setIsReady(true);
    });
  }, [isBlogPostPage]);

  const containerStyle = !isBlogPostPage ? { marginBottom: '5rem' } : {};

  // On blog post pages, hide content until cleanup is complete
  const wrapperStyle = isBlogPostPage && !isReady
    ? { ...containerStyle, visibility: 'hidden', position: 'absolute' }
    : containerStyle;

  return (
    <div ref={articleRef} style={wrapperStyle}>
      <BlogPostItem {...props}>
        {props.children}
        {isBlogPostPage && <NewsletterCTA />}
      </BlogPostItem>
    </div>
  );
}