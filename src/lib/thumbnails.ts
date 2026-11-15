// Maps a static image path to its generated thumbnail. Thumbnails are built by
// scripts/generate-thumbnails.mjs for book covers and blog post covers only.
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export function thumbnailUrl(src: string): string {
	if (!src.startsWith("/") || !IMAGE_EXT.test(src)) return src;
	return `/thumbs${src.replace(IMAGE_EXT, ".webp")}`;
}
