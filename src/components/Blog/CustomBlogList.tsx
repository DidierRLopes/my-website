import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './CustomBlogList.module.css';

interface BlogPost {
  id: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    formattedDate: string;
    tags: { label: string; permalink: string }[];
    permalink: string;
    frontMatter: {
      image?: string;
    };
  };
}

interface CustomBlogListProps {
  posts: BlogPost[];
}

export default function CustomBlogList({ posts }: CustomBlogListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!posts || !Array.isArray(posts)) {
    return (
      <div className={styles.terminal}>
        <div className={styles.noResults}>
          <p>&gt; No blog posts found</p>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter(
    (post) => {
      const title = post?.metadata?.title?.toLowerCase() || '';
      const description = post?.metadata?.description?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      
      const titleMatch = title.includes(searchLower);
      const descriptionMatch = description.includes(searchLower);
      const tagMatch = post?.metadata?.tags?.some(tag => 
        tag?.label?.toLowerCase().includes(searchLower)
      ) || false;
      
      return titleMatch || descriptionMatch || tagMatch;
    }
  );

  return (
    <div className={styles.terminal}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="> Search by title, description, or tags..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPosts.length > 0 ? (
        <ul className={styles.postList}>
          {filteredPosts.map((post) => (
            <li className={styles.postItem} key={post.id}>
              <div className={styles.postContent}>
                <div className={styles.postDate}>{post.metadata?.formattedDate}</div>
                <div className={styles.tagsContainer}>
                  {post.metadata?.tags?.map((tag) => (
                    <Link
                      key={tag.label}
                      to={tag.permalink}
                      className={styles.tag}
                    >
                      {tag.label}
                    </Link>
                  ))}
                </div>
                <div className={styles.postMain}>
                  <div className={styles.leftSection}>
                    {post.metadata?.frontMatter?.image ? (
                      <div className={styles.postImageContainer}>
                        <img
                          src={post.metadata.frontMatter.image}
                          alt={`${post.metadata.title} cover`}
                          className={styles.postThumbnail}
                        />
                      </div>
                    ) : (
                      <div className={styles.postImageContainer}>
                        <div className={styles.placeholderThumbnail}>
                          No Image
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.postInfo}>
                    <Link to={post.metadata?.permalink} className={styles.postTitle}>
                      {post.metadata?.title}
                    </Link>
                    <div className={styles.postDescription}>
                      {post.metadata?.description}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>
          <p>&gt; No results found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}