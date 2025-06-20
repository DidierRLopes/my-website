import React, { useState, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './CustomBlogList.module.css';

interface BlogPost {
  id: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    formattedDate: string;
    readingTime?: number;
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
  const history = useHistory();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('search') || '';
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get('tags')?.split(',').filter(Boolean) || [];
  });

  // Sync state from URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search') || '';
    const tagsParam = urlParams.get('tags')?.split(',').filter(Boolean) || [];

    setSearchInput(searchParam);
    setSelectedTags(tagsParam);
  }, [location.search]);

  // Update URL when search or tags change
  useEffect(() => {
    const urlParams = new URLSearchParams();
    const textForUrl = searchInput.trim();
    if (textForUrl) {
      urlParams.set('search', textForUrl);
    } else {
      urlParams.delete('search');
    }
    
    if (selectedTags.length > 0) {
      urlParams.set('tags', selectedTags.join(','));
    } else {
      urlParams.delete('tags');
    }
    
    const newSearch = urlParams.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;

    // Only replace history if the search string differs
    if (newUrl !== location.pathname + location.search) {
      history.replace(newUrl);
    }
  }, [searchInput, selectedTags, history, location.pathname, location.search]);

  // Handle input changes to extract tags and update text search
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const tagRegex = /tag:(\S+)\s/g;
    const newTags: string[] = [];

    const remainingText = value.replace(tagRegex, (match, tag) => {
      if (tag && !selectedTags.includes(tag)) {
        newTags.push(tag);
      }
      return ''; // Remove the tag from the input string
    });

    if (newTags.length > 0) {
      setSelectedTags(currentTags => [...new Set([...currentTags, ...newTags])]);
    }

    setSearchInput(remainingText);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.currentTarget;
      const tagRegex = /tag:(\S+)/g;
      const newTags: string[] = [];

      const remainingText = value.replace(tagRegex, (match, tag) => {
        if (tag && !selectedTags.includes(tag)) {
          newTags.push(tag);
        }
        return '';
      });

      if (newTags.length > 0) {
        setSelectedTags(currentTags => [...new Set([...currentTags, ...newTags])]);
      }

      setSearchInput(remainingText);
    }
  };
  
  // Get all unique tags for autocomplete (or other UI features)
  const allTags = Array.from(
    new Set(
      posts.flatMap(post => 
        post.metadata?.tags?.map(tag => tag.label) || []
      )
    )
  ).sort();

  // Filter posts based on text search and selected tags
  const filteredPosts = posts.filter((post) => {
    // Text search (title and description only)
    const textMatch = !searchInput || 
      post?.metadata?.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
      post?.metadata?.description?.toLowerCase().includes(searchInput.toLowerCase());
    
    // Tag filtering (must have ALL selected tags)
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.every(selectedTag => 
        post?.metadata?.tags?.some(tag => 
          tag.label.toLowerCase() === selectedTag.toLowerCase()
        )
      );
    
    return textMatch && tagMatch;
  });

  // Tag manipulation functions
  const toggleTag = (tagLabel: string) => {
    setSelectedTags(currentTags =>
      currentTags.includes(tagLabel)
        ? currentTags.filter(tag => tag !== tagLabel)
        : [...currentTags, tagLabel]
    );
  };

  const removeTag = (tagLabel: string) => {
    setSelectedTags(currentTags => currentTags.filter(tag => tag !== tagLabel));
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSelectedTags([]);
  };

  if (!posts || !Array.isArray(posts)) {
    return (
      <div className={styles.terminal}>
        <div className={styles.noResults}>
          <p>&gt; No results found for your query</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.terminal}>
      <div className={styles.searchContainer}>
        {/* Enhanced Search Input */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder='> Search posts... (use tag:name to filter)'
              className={`${styles.searchInput} ${selectedTags.length > 0 ? styles.searchInputActive : ''}`}
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            { (searchInput || selectedTags.length > 0) && (
              <button 
                type="button"
                onClick={clearAllFilters}
                className={styles.clearSearchButton}
                title="Clear all"
              >
                ×
              </button>
            )}
          </div>
          
          {/* Visual representation of active filters */}
          {selectedTags.length > 0 && (
            <div className={styles.activeFiltersDisplay}>
              {selectedTags.map(tag => (
                <div
                  key={tag}
                  className={styles.activeFilterChip}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleTag(tag)}
                  onKeyPress={(e) => { if (e.key === 'Enter') toggleTag(tag); }}
                >
                  <span>{tag}</span>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                    className={styles.removeFilterButton}
                    title={`Remove ${tag} filter`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {filteredPosts.length > 0 ? (
        <ul className={styles.postList}>
          {filteredPosts.map((post) => (
            <li className={styles.postItem} key={post.id}>
              <div className={styles.postContent}>
                <div className={styles.postDate}>{post.metadata?.formattedDate}</div>
                
                <div className={styles.metaContainer}>
                  <div className={styles.tagsContainer}>
                    {post.metadata?.tags?.map((tag) => (
                      <button
                        type="button"
                        key={tag.label}
                        onClick={() => toggleTag(tag.label)}
                        className={`${styles.tag} ${selectedTags.includes(tag.label) ? styles.tagSelected : ''}`}
                        title={`Filter by ${tag.label} tag`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>

                  {post.metadata.readingTime && (
                    <div className={styles.readingTime}>
                      {Math.round(post.metadata.readingTime)} min
                    </div>
                  )}
                </div>

                <Link to={post.metadata?.permalink} className={styles.postLink}>
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
                      <h2 className={styles.postTitle}>
                        {post.metadata?.title}
                      </h2>
                      <div className={styles.postDescription}>
                        {post.metadata?.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>
          <p>&gt; No results found for your query</p>
        </div>
      )}
    </div>
  );
}
