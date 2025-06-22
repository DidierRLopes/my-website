export interface BlogItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  content_html: string;
  date_published: string;
  date_modified: string;
  tags: string[];
  image?: string;
}

export interface EnrichedBlogItem extends BlogItem {
  wordCount: number;
  colorHue: number;
  recencyRatio: number; // 0 = oldest, 1 = newest
} 