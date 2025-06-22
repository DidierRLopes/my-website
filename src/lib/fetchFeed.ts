import type { BlogItem, EnrichedBlogItem } from '../types/blog';

const FEED_URL = 'https://didierlopes.com/blog/feed.json';

function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const trimmedText = text.trim();
  if (trimmedText === '') {
    return 0;
  }
  return trimmedText.split(/\s+/).length;
}

function extractImage(html: string): string | undefined {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = html.match(imgRegex);
    return match ? match[1] : undefined;
}

export function parseBlogItems(items: BlogItem[]): EnrichedBlogItem[] {
  if (!items || items.length === 0) {
    return [];
  }

  const dates = items.map(item => new Date(item.date_modified).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const dateRange = maxDate - minDate;

  const HUE_OLDEST = 214; // #002244
  const HUE_NEWEST = 195; // #66CCFF
  const hueRange = HUE_OLDEST - HUE_NEWEST;

  return items.map(item => {
    const date = new Date(item.date_modified);
    const dateValue = date.getTime();

    let dateRatio = 0;
    if (dateRange > 0) {
      dateRatio = (dateValue - minDate) / dateRange;
    }

    const colorHue = HUE_OLDEST - dateRatio * hueRange;

    return {
      ...item,
      image: extractImage(item.content_html),
      wordCount: countWords(item.content_html),
      colorHue: colorHue,
      recencyRatio: dateRange > 0 ? (dateValue - minDate) / dateRange : 0,
    };
  });
}

export async function fetchBlogFeed(): Promise<EnrichedBlogItem[]> {
  try {
    const response = await fetch(`${FEED_URL}?_=${new Date().getTime()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const feed = await response.json();
    if (!feed.items) {
        return [];
    }
    const enrichedItems = parseBlogItems(feed.items);
    return enrichedItems;
  } catch (error) {
    console.error('Failed to fetch or parse blog feed:', error);
    return [];
  }
} 