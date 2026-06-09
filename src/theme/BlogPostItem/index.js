import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import NewsletterCTA from '@site/src/components/NewsletterCTA';

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  const articleRef = useRef(null);

  useEffect(() => {
    // On blog post page, remove intro thumbnail/preview and the decorative border
    if (!isBlogPostPage || !ExecutionEnvironment.canUseDOM) return;

    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      const article = articleRef.current?.querySelector('article') || document.querySelector('article');
      if (!article) return;

      const borderDiv = article.querySelector('div[style*="border-top"]');
      if (!borderDiv) return;

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

    });
  }, [isBlogPostPage]);

  const containerStyle = !isBlogPostPage ? { marginBottom: '5rem' } : {};

  return (
    <div ref={articleRef} style={containerStyle}>
      <BlogPostItem {...props}>
        {props.children}
        {isBlogPostPage && <NewsletterCTA />}
      </BlogPostItem>
    </div>
  );
}
