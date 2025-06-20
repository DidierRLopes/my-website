import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useBlogFeed } from '../../hooks/useBlogFeed';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import type { EnrichedBlogItem } from '../../types/blog';
import BlogListFallback from './BlogListFallback';
import { trackEvent } from '../../lib/analytics';
import { useColorMode } from '@docusaurus/theme-common';

// simple debounce hook
function useDebounce<T>(value: T, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const GraphContainer = () => {
    const { data, loading, error } = useBlogFeed();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 420 });
    const [rawSearch, setRawSearch] = useState('');
    const searchQuery = useDebounce(rawSearch, 300);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showTopics, setShowTopics] = useState(true);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const mountTimeRef = useRef(Date.now());
    const { colorMode } = useColorMode();

    useEffect(() => {
        function update() {
            const containerWidth = Math.min(window.innerWidth * 0.8, 800);
            setDimensions({
                width: containerWidth,
                height: containerWidth * 0.7, // 30% smaller height
            });
        }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        return () => {
            const dwell = Date.now() - mountTimeRef.current;
            trackEvent('dwell_time', 'intelligence', Math.round(dwell / 1000));
        };
    }, []);

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        for (const item of data) {
            for (const tag of item.tags) {
                tags.add(tag);
            }
        }
        return Array.from(tags).sort();
    }, [data]);

    const filteredItems = useMemo(() => {
        let items = data;

        // Tag filter
        if (selectedTags.length > 0) {
            items = items.filter(item => selectedTags.every(tag => item.tags.includes(tag)));
        }

        // Date range filter
        const [startDate, endDate] = dateRange;
        if (startDate) {
            items = items.filter(item => new Date(item.date_modified) >= startDate);
        }
        if (endDate) {
            items = items.filter(item => new Date(item.date_modified) <= endDate);
        }

        return items;
    }, [data, selectedTags, dateRange]);

    const searchedItems = useMemo(() => {
        if (!searchQuery) return filteredItems;
        return filteredItems.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [filteredItems, searchQuery]);

    const isFiltered = useMemo(() => {
        return searchQuery.length > 0 || selectedTags.length > 0 || dateRange[0] !== null || dateRange[1] !== null;
    }, [searchQuery, selectedTags, dateRange]);

    const canShowTopics = filteredItems.length >= 7;

    const isMobile = dimensions.width < 640;

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading brain...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>Error: {error.message}</div>;
    }
    
    if (data.length === 0) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>No data available to build the brain.</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
            {isMobile ? (
                <BlogListFallback items={searchedItems} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GraphControls 
                        allTags={allTags}
                        onSearch={setRawSearch}
                        onTagFilterChange={setSelectedTags}
                        onDateRangeChange={setDateRange}
                        showTopics={showTopics}
                        onToggleTopics={() => setShowTopics((v) => !v)}
                    />
                    <div id="intelligence-graph-container" ref={containerRef} 
                        style={{ width: dimensions.width, height: dimensions.height, border: '1px solid #333', borderRadius: '8px', position: 'relative' }}>
                        {searchedItems.length > 0 ? (
                            <GraphCanvas 
                                items={filteredItems} 
                                width={dimensions.width} 
                                height={dimensions.height}
                                showThoughts={true}
                                showTopics={showTopics && canShowTopics}
                                searchQuery={searchQuery}
                                colorMode={colorMode}
                            />
                        ) : (
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: colorMode === 'dark' ? '#A0AEC0' : '#4A5568',
                                fontSize: '1.2rem',
                            }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    style={{ width: '48px', height: '48px', marginBottom: '1rem', opacity: 0.8 }}
                                >
                                    <title>No brain activity</title>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 12h3l2.25 6L12 6l2.25 6h3"
                                    />
                                </svg>
                                No brain activity reported
                            </div>
                        )}
                    </div>
                    <p style={{ 
                        color: colorMode === 'dark' ? '#888888' : '#2c3e50', 
                        fontSize: '0.8rem', 
                        textAlign: 'center', 
                        marginTop: '1rem', 
                        fontStyle: 'italic',
                        maxWidth: '600px'
                    }}>
                        This page serves as a visual "second brain," mapping relationships between blog posts.
                        Nodes are posts, with metadata determining their size, color, and connections.
                    </p>
                </div>
            )}
        </div>
    )
}

export default GraphContainer; 