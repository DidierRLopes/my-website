// Utility function to extract YouTube video ID from embed URL
export function getYouTubeVideoId(embedUrl: string): string | null {
  const regex = /(?:youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = embedUrl.match(regex);
  return match ? match[1] : null;
}

// Generate YouTube thumbnail URL from video ID
export function getYouTubeThumbnail(embedUrl: string, quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'): string | null {
  const videoId = getYouTubeVideoId(embedUrl);
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}