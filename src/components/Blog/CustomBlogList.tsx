import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
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
    tags: { label: string; permalink: string }[];
    permalink: string;
    frontMatter: {
      image?: string;
    };
  };
}

interface CustomBlogListProps {
  posts: BlogPost[];
  onFilterChange?: (hasActiveFilters: boolean) => void;
}

export default function CustomBlogList({ posts, onFilterChange }: CustomBlogListProps) {
  const [searchInput, setSearchInput] = useState(''); // This is now just for text search
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const history = useHistory();
  const location = useLocation();

  // Initialize state from URL parameters
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
    if (searchInput) urlParams.set('search', searchInput);
    if (selectedTags.length > 0) urlParams.set('tags', selectedTags.join(','));
    
    const newSearch = urlParams.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    
    if (newUrl !== location.pathname + location.search) {
      history.replace(newUrl);
    }
  }, [searchInput, selectedTags, history, location.pathname, location.search]);

  // Notify parent about filter state changes
  useEffect(() => {
    const hasActiveFilters = searchInput.length > 0 || selectedTags.length > 0;
    onFilterChange?.(hasActiveFilters);
  }, [searchInput, selectedTags, onFilterChange]);

  // Handle input changes to extract tags and update text search
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const tagRegex = /tag:"([^"]+)"/g;
    const newTags: string[] = [];

    const remainingText = value.replace(tagRegex, (match, tag) => {
      if (!selectedTags.includes(tag)) {
        newTags.push(tag);
      }
      return ''; // Remove the tag from the input string
    });

    if (newTags.length > 0) {
      setSelectedTags(currentTags => [...currentTags, ...newTags]);
    }

    setSearchInput(remainingText.trim());
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
  const addTag = (tagLabel: string) => {
    if (!selectedTags.includes(tagLabel)) {
      setSelectedTags(currentTags => [...currentTags, tagLabel]);
    }
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
          <p>&gt; No blog posts found</p>
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
              placeholder='> Search posts... (use tag:"tagname" to filter by tags)'
              className={styles.searchInput}
              value={searchInput}
              onChange={handleInputChange}
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
                <div key={tag} className={styles.activeFilterChip}>
                  <span className={styles.filterType}>Tag:</span>
                  <span className={styles.filterValue}>{tag}</span>
                  <button 
                    type="button"
                    onClick={() => removeTag(tag)}
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
                <div className={styles.tagsContainer}>
                  {post.metadata?.tags?.map((tag) => (
                    <button
                      type="button"
                      key={tag.label}
                      onClick={() => addTag(tag.label)}
                      className={`${styles.tag} ${selectedTags.includes(tag.label) ? styles.tagSelected : ''}`}
                      title={`Filter by ${tag.label} tag`}
                    >
                      {tag.label}
                    </button>
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
          <p>&gt; No results found for your query</p>
        </div>
      )}
    </div>
  );
}