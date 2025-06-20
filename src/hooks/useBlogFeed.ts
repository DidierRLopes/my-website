import { useState, useEffect } from 'react';
import { fetchBlogFeed } from '../lib/fetchFeed';
import type { EnrichedBlogItem } from '../types/blog';

export function useBlogFeed() {
  const [data, setData] = useState<EnrichedBlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        const feedData = await fetchBlogFeed();
        setData(feedData);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  return { data, loading, error };
} 