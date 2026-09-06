/* eslint-disable react/no-danger */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CustomBlogList from '../../components/Blog/CustomBlogList';

const LLMS_FULL_URL = 'https://didierlopes.com/blog/llms-full.txt';

function CopyButton({ text }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="blog-discovery-copy"
      aria-label={copied ? 'Copied' : 'Copy link'}
      title={copied ? 'Copied' : 'Copy link'}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

export default function BlogListPageWrapper(props) {
  const { items, metadata } = props;
  
  // Transform the items to match our CustomBlogList expected format
  const posts = items.map(item => {
    let imagePath = item.content.metadata.frontMatter?.image;
    
    // Check if image path exists and has extension, if not try a common extension.
    if (imagePath && !imagePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      imagePath = `${imagePath}.png`;
    }
    
    return {
      id: item.content.metadata.permalink,
      metadata: {
        title: item.content.metadata.title,
        description: item.content.metadata.description,
        date: item.content.metadata.date,
        formattedDate: new Date(item.content.metadata.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        readingTime: item.content.metadata.readingTime,
        tags: item.content.metadata.tags,
        permalink: item.content.metadata.permalink,
        frontMatter: {
          ...item.content.metadata.frontMatter,
          image: imagePath
        },
      }
    };
  });
  
  return (
    <Layout
      title={metadata?.blogTitle || 'Blog'}
      description={metadata?.blogDescription || 'Blog posts'}
      noFooter={false}
    >
      <div className="blog-wrapper blog-wrapper--no-sidebar">
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '2rem 1rem',
          minHeight: '50vh'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>
              {metadata?.blogTitle || 'Blog'}
            </h1>
            <p className="blog-discovery-note">
              Blog graph <Link to="/intelligence">here</Link> or chat with my blog <Link to="/chat">here</Link>.
              Send all my blog as context to your agent with{' '}
              <a href={LLMS_FULL_URL}>didierlopes.com/blog/llms-full.txt</a>
              <CopyButton text={LLMS_FULL_URL} />
            </p>
          </div>
          <CustomBlogList posts={posts} />
        </div>
      </div>
      
      {/* Custom CSS to hide sidebar permanently */}
      <style>
        {`
          .theme-doc-sidebar-container {
            display: none !important;
          }
          .main-wrapper {
            margin-left: 0 !important;
          }
          .container {
            max-width: none !important;
          }
        `}
      </style>
    </Layout>
  );
}
