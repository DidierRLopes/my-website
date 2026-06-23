import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import BlogPostItem from '@theme-original/BlogPostItem';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import NewsletterCTA from '@site/src/components/NewsletterCTA';

const useIsomorphicLayoutEffect = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;
const introDividerSelector =
  ':scope > div[style*="border-top"], :scope > div[style*="borderTop"]';

function removeIntroPreview(markdown) {
  const divider = markdown.querySelector(introDividerSelector);
  if (!divider) return false;

  let node = markdown.firstChild;
  while (node && node !== divider) {
    const next = node.nextSibling;
    node.remove?.();
    node = next;
  }

  divider.remove();
  return true;
}

export default function BlogPostItemWrapper(props) {
  const { isBlogPostPage } = useBlogPost();
  const articleRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // Full posts should start after the old thumbnail/excerpt block used for lists.
    if (!isBlogPostPage || !ExecutionEnvironment.canUseDOM) return;

    const wrapper = articleRef.current;
    if (!wrapper) return;

    const cleanup = () => {
      const markdown = wrapper.querySelector('article .markdown');
      if (markdown) removeIntroPreview(markdown);
    };

    cleanup();

    const observer = new MutationObserver(cleanup);
    observer.observe(wrapper, { childList: true, subtree: true });

    return () => observer.disconnect();
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
