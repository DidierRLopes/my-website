/* eslint-disable react/no-danger */
import React from 'react';
import Layout from '@theme/Layout';
import CustomBlogList from '../../components/Blog/CustomBlogList';

export default function BlogListPageWrapper(props) {
  const { items, metadata } = props;
  
  // Transform the items to match our CustomBlogList expected format
  const posts = items.map(item => {
    let imagePath = item.content.metadata.frontMatter?.image;
    
    // Check if image path exists and has extension, if not try common extensions
    if (imagePath && !imagePath.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      // Try common image extensions in order of preference
      const possibleExtensions = ['.png', '.jpg', '.jpeg', '.JPG', '.PNG', '.JPEG'];
      // For posts without extensions, we'll try the first extension that commonly exists
      imagePath = `${imagePath}.png`;
    }
    
    // Special handling for known problematic images
    const fileName = imagePath?.split('/').pop();
    if (fileName === '2025-05-28-openbb-is-underrated.png') {
      imagePath = '/blog/2025-05-28-openbb-is-underrated.jpeg';
    } else if (fileName === '2025-03-18-my-first-half-marathon.png') {
      imagePath = '/blog/2025-03-18-my-first-half-marathon.JPG';
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
          <h1 className="blog-list__title">
            {metadata?.blogTitle || 'Blog'}
          </h1>
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