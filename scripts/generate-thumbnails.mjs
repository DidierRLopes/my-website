// Generates small WebP thumbnails for images that list pages render at a
// fraction of their size (blog post covers, book covers).
//
// Output goes to generated-static/thumbs/, which docusaurus.config.js serves as
// an extra static directory, so `/books/x.jpg` gets a thumbnail at
// `/thumbs/books/x.webp`. The URL mapping lives in src/lib/thumbnails.ts and
// must stay in sync with thumbnailPath() below.
//
// Runs automatically before `start` and `build` (see package.json). Only
// regenerates a thumbnail when its source image is newer than it.
import { mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const STATIC_DIR = "static";
const OUT_DIR = "generated-static";
const MAX_SIDE = 320; // ~2x the largest list-page render size
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function thumbnailPath(publicPath) {
	return join(OUT_DIR, "thumbs", publicPath.replace(IMAGE_EXT, ".webp"));
}

function bookCovers() {
	return readdirSync(join(STATIC_DIR, "books"))
		.filter((name) => IMAGE_EXT.test(name))
		.map((name) => `/books/${name}`);
}

function blogCovers() {
	const covers = [];
	for (const name of readdirSync("blog")) {
		if (!/\.mdx?$/.test(name)) continue;
		const frontMatter = readFileSync(join("blog", name), "utf8").match(/^---\n([\s\S]*?)\n---/);
		const image = frontMatter?.[1].match(/^image:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
		if (image?.startsWith("/")) covers.push(image);
	}
	return covers;
}

function isFresh(source, target) {
	try {
		return statSync(target).mtimeMs >= statSync(source).mtimeMs;
	} catch {
		return false;
	}
}

const sources = [...new Set([...bookCovers(), ...blogCovers()])];
let generated = 0;
for (const publicPath of sources) {
	const source = join(STATIC_DIR, publicPath);
	const target = thumbnailPath(publicPath);
	if (isFresh(source, target)) continue;
	mkdirSync(dirname(target), { recursive: true });
	await sharp(source, { limitInputPixels: false })
		.rotate()
		.resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true })
		.webp({ quality: 75 })
		.toFile(target);
	generated++;
}
console.log(`[thumbnails] ${generated} generated, ${sources.length - generated} up to date`);
