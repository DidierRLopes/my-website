import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useBlogFeed } from '../../hooks/useBlogFeed';
import { GraphCanvas } from './GraphCanvas';
import { GraphControls } from './GraphControls';
import type { EnrichedBlogItem } from '../../types/blog';
import BlogListFallback from './BlogListFallback';
import { trackEvent } from '../../lib/analytics';

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
    const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
    const [rawSearch, setRawSearch] = useState('');
    const searchQuery = useDebounce(rawSearch, 300);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showThoughts, setShowThoughts] = useState(true);
    const [showTopics, setShowTopics] = useState(true);
    const mountTimeRef = useRef(Date.now());

    useEffect(() => {
        function update() {
            const graphWidth = Math.max((window.innerWidth - 48) * 0.5, 300); // half viewport, min 300
            setDimensions({
                width: graphWidth,
                height: graphWidth, // square
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
        if (selectedTags.length > 0) {
            items = items.filter(item => selectedTags.every(tag => item.tags.includes(tag)));
        }
        return items;
    }, [data, selectedTags]);

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
        <div>
            {isMobile ? (
                <BlogListFallback items={filteredItems} />
            ) : (
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <div id="intelligence-graph-container" ref={containerRef} 
                        style={{ width: dimensions.width, height: dimensions.height, border: '1px solid #333', borderRadius: '8px', position: 'relative' }}>
                        <GraphCanvas 
                            items={filteredItems} 
                            width={dimensions.width} 
                            height={dimensions.height}
                            searchQuery={searchQuery}
                            showThoughts={showThoughts}
                            showTopics={showTopics}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: 250 }}>
                        <GraphControls 
                            allTags={allTags}
                            onSearch={setRawSearch}
                            onTagFilterChange={setSelectedTags}
                            onDateRangeChange={() => {}} // Placeholder
                            showThoughts={showThoughts}
                            showTopics={showTopics}
                            onToggleThoughts={() => setShowThoughts((v) => !v)}
                            onToggleTopics={() => setShowTopics((v) => !v)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GraphContainer; 