import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Lazy-loaded Beehiiv iframe component
function LazyBeehiivEmbed() {
  const [isVisible, setIsVisible] = useState(false);
  const [beehiivSrc, setBeehiivSrc] = useState(null);
  const containerRef = useRef(null);

  // Get the correct theme-based URL
  const getBeehiivUrl = useCallback(() => {
    if (!ExecutionEnvironment.canUseDOM) return null;
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDarkTheme
      ? 'https://embeds.beehiiv.com/2c2719b8-abe1-4f8b-8427-fb9c2361f059'
      : 'https://embeds.beehiiv.com/e1ef8c12-fc6d-4afa-8235-057b2e9bb6f3';
  }, []);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || !containerRef.current) return;

    // IntersectionObserver for lazy loading - only load when near viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          setBeehiivSrc(getBeehiivUrl());
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before it enters viewport
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [getBeehiivUrl]);

  // Listen for theme changes after iframe is loaded
  useEffect(() => {
    if (!isVisible || !ExecutionEnvironment.canUseDOM) return;

    const handleThemeChange = (mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setBeehiivSrc(getBeehiivUrl());
        }
      }
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, [isVisible, getBeehiivUrl]);

  return (
    <div ref={containerRef} style={{ minHeight: '200px' }}>
      {isVisible && beehiivSrc && (
        <iframe
          src={beehiivSrc}
          data-test-id="beehiiv-embed"
          width="100%"
          height="200"
          frameBorder="0"
          scrolling="no"
          title="Didier newsletter"
          loading="lazy"
        />
      )}
    </div>
  );
}

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
        {isBlogPostPage && <LazyBeehiivEmbed />}
      </BlogPostItem>
    </div>
  );
}