/* eslint-disable react/no-danger */
import React from 'react';
import Layout from '@theme/Layout';
import CustomBlogList from '../../components/Blog/CustomBlogList';

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
