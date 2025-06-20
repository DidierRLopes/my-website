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
                <BlogListFallback items={filteredItems} />
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
                        <GraphCanvas 
                            items={filteredItems} 
                            width={dimensions.width} 
                            height={dimensions.height}
                            showThoughts={true}
                            showTopics={showTopics && canShowTopics}
                            searchQuery={searchQuery}
                            colorMode={colorMode}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GraphContainer; 