import React, { useState, useEffect, useCallback } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './CustomBlogList.module.css';

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return '';
  // The date string from frontmatter 'YYYY-MM-DD' is parsed as midnight UTC.
  // When converted to a local timezone, it might roll back to the previous day.
  // To prevent this, we explicitly create a date and format it in UTC.
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
};

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

  const [searchInput, setSearchInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minReadingTime, setMinReadingTime] = useState<number | undefined>();

  // Sync state from URL search params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSearchInput(urlParams.get('search') || '');
    setSelectedTags(urlParams.get('tags')?.split(',').filter(Boolean) || []);
    
    const readingTimeParam = urlParams.get('readingTimeOverMin');
    if (readingTimeParam) {
      const time = Number.parseInt(readingTimeParam, 10);
      setMinReadingTime(Number.isNaN(time) ? undefined : time);
    } else {
      setMinReadingTime(undefined);
    }
  }, [location.search]);

  // Function to update URL params
  const updateUrlParams = useCallback((newParams: Record<string, string | string[] | undefined>) => {
    const urlParams = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(newParams)) {
      if (value !== undefined && String(value).length > 0) {
        if (Array.isArray(value)) {
          urlParams.set(key, value.join(','));
        } else {
          urlParams.set(key, String(value));
        }
      } else {
        urlParams.delete(key);
      }
    }
    history.replace(`${location.pathname}?${urlParams.toString()}`);
  }, [location.pathname, location.search, history]);

  const handleSearchChange = (value: string) => {
    updateUrlParams({ search: value });
  };
  
  const handleReadingTimeChange = (value: number | undefined) => {
    updateUrlParams({ readingTimeOverMin: value?.toString() });
  };

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
      updateUrlParams({ tags: [...new Set([...selectedTags, ...newTags])] });
    }

    handleSearchChange(remainingText);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputChange(e as unknown as ChangeEvent<HTMLInputElement>); // Reuse logic
    }
  };
  
  const allTags = Array.from(
    new Set(
      posts.flatMap(post => 
        post.metadata?.tags?.map(tag => tag.label) || []
      )
    )
  ).sort();

  const filteredPosts = posts.filter((post) => {
    const textMatch = !searchInput || 
      post?.metadata?.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
      post?.metadata?.description?.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.metadata?.tags?.some((tag) => tag.label.toLowerCase().includes(searchInput.toLowerCase()));
    
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.every(selectedTag => 
        post?.metadata?.tags?.some(tag => 
          tag.label.toLowerCase() === selectedTag.toLowerCase()
        )
      );
    
    const readingTimeMatch = minReadingTime === undefined || 
      (post.metadata.readingTime && post.metadata.readingTime > minReadingTime);
      
    return textMatch && tagMatch && readingTimeMatch;
  });

  const toggleTag = (tagLabel: string) => {
    const newTags = selectedTags.includes(tagLabel)
      ? selectedTags.filter(tag => tag !== tagLabel)
      : [...selectedTags, tagLabel];
    updateUrlParams({ tags: newTags });
  };

  const removeTag = (tagLabel: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagLabel);
    updateUrlParams({ tags: newTags });
  };

  const clearAllFilters = () => {
    // Setting params to undefined will clear them
    updateUrlParams({ search: undefined, tags: undefined, readingTimeOverMin: undefined });
  };

  const handleReadingTimeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, arrows, home, end
    if (
      [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'Home',
        'End',
      ].includes(e.key) ||
      // Allow: Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+X, Ctrl/Cmd+V
      ((e.key === 'a' || e.key === 'c' || e.key === 'x' || e.key === 'v') && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key < '0' || e.key > '9') {
      e.preventDefault();
    }
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
        <div className={styles.topBar}>
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
              { (searchInput || selectedTags.length > 0 || minReadingTime !== undefined) && (
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

          <div className={styles.readingTimeFilter}>
            <label htmlFor="reading-time" className="text-lg">≥</label>
            <div className={styles.readingTimeInputWrapper}>
              <input
                type="number"
                id="reading-time"
                value={minReadingTime ?? ''}
                onChange={(e) => handleReadingTimeChange(e.target.value ? Number.parseInt(e.target.value, 10) : undefined)}
                onKeyDown={handleReadingTimeKeyDown}
                min="0"
                className={styles.readingTimeInput}
              />
              <span className={styles.readingTimeUnit}>min</span>
            </div>
          </div>
        </div>
      </div>
      {filteredPosts.length > 0 ? (
        <ul className={styles.postList}>
          {filteredPosts.map((post) => (
            <li className={styles.postItem} key={post.id}>
              <div className={styles.postContent}>
                <div className={styles.postDate}>{formatDateForDisplay(post.metadata?.date)}</div>
                
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
