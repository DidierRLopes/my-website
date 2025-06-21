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
    const [rawSearch, setRawSearch] = useState('');
    const searchQuery = useDebounce(rawSearch, 300);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showClusters, setShowClusters] = useState(true);
    const [showNodes, setShowNodes] = useState(false);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const mountTimeRef = useRef(Date.now());
    const { colorMode } = useColorMode();

    const borderColor = colorMode === 'dark' ? 'rgba(251, 191, 36, 0.4)' : 'rgba(0, 0, 0, 0.4)';
    const borderWidth = '1px';
    const cornerSize = '36px';

    const dimensions = { width: '100%', height: '500px' };

    useEffect(() => {
        return () => {
            const dwell = Date.now() - mountTimeRef.current;
            trackEvent('dwell_time', 'intelligence', Math.round(dwell / 1000));
        };
    }, []);

    const dateFilteredItems = useMemo(() => {
        let items = data;
        const [startDate, endDate] = dateRange;
        if (startDate) {
            items = items.filter(item => new Date(item.date_modified) >= startDate);
        }
        if (endDate) {
            items = items.filter(item => new Date(item.date_modified) <= endDate);
        }
        return items;
    }, [data, dateRange]);

    const filteredItems = useMemo(() => {
        if (selectedTags.length === 0) {
            return dateFilteredItems;
        }
        return dateFilteredItems.filter(item => 
            selectedTags.every(tag => item.tags.includes(tag))
        );
    }, [dateFilteredItems, selectedTags]);

    const availableTags = useMemo(() => {
        const tagFrequencies: Record<string, number> = {};
        for (const item of dateFilteredItems) {
            for (const tag of item.tags) {
                tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1;
            }
        }

        const itemsToSourceTagsFrom = selectedTags.length > 0 ? filteredItems : dateFilteredItems;
        const tags = new Set<string>();
        for (const item of itemsToSourceTagsFrom) {
            for (const tag of item.tags) {
                tags.add(tag);
            }
        }
        
        return Array.from(tags).sort((a, b) => {
            const freqA = tagFrequencies[a] || 0;
            const freqB = tagFrequencies[b] || 0;
            if (freqB !== freqA) {
                return freqB - freqA;
            }
            return a.localeCompare(b);
        });
    }, [filteredItems, dateFilteredItems, selectedTags.length]);

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

    const canShowClusters = filteredItems.length >= 7;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (containerRef.current) {
                setIsMobile(containerRef.current.offsetWidth < 640);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        <div style={{ width: '100%' }}>
            {isMobile ? (
                <BlogListFallback items={searchedItems} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GraphControls 
                        allTags={availableTags}
                        onSearch={setRawSearch}
                        onTagFilterChange={setSelectedTags}
                        onDateRangeChange={setDateRange}
                        showClusters={showClusters}
                        onToggleClusters={() => setShowClusters((v) => !v)}
                        showNodes={showNodes}
                        onToggleNodes={() => setShowNodes((v) => !v)}
                    />
                    <div id="intelligence-graph-container" ref={containerRef} 
                        style={{
                            marginTop: '2rem',
                            width: dimensions.width,
                            height: dimensions.height,
                            borderRadius: '8px',
                            position: 'relative',
                            backgroundImage: `radial-gradient(${colorMode === 'dark' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(217, 119, 6, 0.15)'} 1px, transparent 1px)`,
                            backgroundSize: '16px 16px',
                        }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: cornerSize,
                            height: cornerSize,
                            borderTop: `${borderWidth} solid ${borderColor}`,
                            borderLeft: `${borderWidth} solid ${borderColor}`,
                            zIndex: 1,
                        }}/>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: cornerSize,
                            height: cornerSize,
                            borderTop: `${borderWidth} solid ${borderColor}`,
                            borderRight: `${borderWidth} solid ${borderColor}`,
                            zIndex: 1,
                        }}/>
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: cornerSize,
                            height: cornerSize,
                            borderBottom: `${borderWidth} solid ${borderColor}`,
                            borderLeft: `${borderWidth} solid ${borderColor}`,
                            zIndex: 1,
                        }}/>
                        <div style={{
                            position: 'absolute',
                            top: '0.75rem',
                            left: '0.75rem',
                            zIndex: 2,
                            color: colorMode === 'dark' ? '#CBD5E0' : '#4A5568',
                            fontSize: '12px',
                            fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
                            backgroundColor: colorMode === 'dark' ? 'rgba(26, 32, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            backdropFilter: 'blur(4px)',
                            border: `1px solid ${colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        }}>
                            {searchedItems.length} {searchedItems.length === 1 ? 'node' : 'nodes'} found
                        </div>
                        {searchedItems.length > 0 ? (
                            <GraphCanvas 
                                items={filteredItems} 
                                width={containerRef.current?.offsetWidth || 0}
                                height={containerRef.current?.offsetHeight || 0}
                                showThoughts={true}
                                showClusters={showClusters && canShowClusters}
                                showNodes={showNodes}
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
                        <img 
                            src={colorMode === 'dark' ? '/img/kaws.webp' : '/img/kawspeely.webp'}
                            alt="Kaws"
                            style={{
                                position: 'absolute',
                                bottom: '-50px',
                                right: '-30px',
                                height: '140px',
                                zIndex: 10
                            }}
                        />
                    </div>
                    <p style={{ 
                        color: colorMode === 'dark' ? '#888888' : '#2c3e50', 
                        fontSize: '0.8rem', 
                        textAlign: 'center', 
                        marginTop: '1rem', 
                        fontStyle: 'italic',
                        maxWidth: '600px'
                    }}>
                        This page serves as a visual "second brain" mapping relationships between blog posts.
                        Nodes are posts, with metadata determining their size, color, and connections.
                    </p>
                </div>
            )}
        </div>
    )
}

export default GraphContainer; 