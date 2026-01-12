# Converting Beehiiv Newsletter to Blog Post

A comprehensive guide for converting Beehiiv newsletter posts into properly formatted blog markdown files for the website.

## Prerequisites

- Access to the Beehiiv newsletter URL
- Image extraction capabilities (use mcp__fetch__imageFetch tool)
- `cwebp` and `gif2webp` installed for image conversion
- Understanding of the blog's markdown structure and front matter requirements

## Step-by-Step Conversion Process

### 1. Extract Newsletter Content

```bash
# Use the imageFetch tool to extract content and images
mcp__fetch__imageFetch --url <newsletter-url> --images '{"output": "file", "layout": "individual", "maxCount": 10}'
```

**Key extraction requirements:**
- Capture all text content including headings, paragraphs, and lists
- Extract all images in high quality (minimum 1000px width)
- Preserve link URLs and their context
- Note any special formatting (bold, italics, quotes)

### 2. Generate Blog Filename

**Format:** `YYYY-MM-DD-slug-from-title.md`

**Rules:**
- **IMPORTANT:** Extract the publication date from https://didierlopes.beehiiv.com/ main page
- Find the newsletter post by title and get its publication date
- Create slug from title: lowercase, replace spaces with hyphens, remove special characters
- Example: "The trampoline job: Optimize your career for growth" → `2025-09-19-the-trampoline-job-optimize-your-career-for-growth.md`
- Never use today's date - always use the actual publication date from Beehiiv

### 3. Create Front Matter

```yaml
---
slug: <title-slug-without-date>
title: <Full Newsletter Title>
date: <YYYY-MM-DD>
image: /blog/<filename>.webp
tags:
- <relevant-tag-1>
- <relevant-tag-2>
- <relevant-tag-3>
description: <Newsletter subtitle or first paragraph summary (max 160 chars)>
hideSidebar: true
---
```

**Front Matter Rules:**
- **slug**: Use title in kebab-case without the date prefix
- **title**: Exact newsletter title, properly capitalized
- **date**: Newsletter publication date in YYYY-MM-DD format (extracted from Beehiiv main page, NOT today's date)
- **image**: Points to the hero image path (WITH `.webp` extension)
- **tags**: Extract 3-6 relevant tags from content themes (lowercase)
- **description**: Use newsletter subtitle or create compelling summary
- **hideSidebar**: Set to `true` for blog posts

### 4. Process Images

**IMPORTANT: All images must be in WebP format for optimal file size and fast page loads.**

**Image Handling Rules:**

1. **Hero Image**
   - **IMPORTANT:** Fetch the hero image from https://didierlopes.beehiiv.com/ main page
   - Find the newsletter post by title and extract its thumbnail image
   - Download to `/static/blog/YYYY-MM-DD-slug.png` first, then convert to WebP
   - Dimensions: 1200x630px minimum (social media preview)
   - Note: The image must be saved in the `static/blog/` directory, not just `/blog/`
   - Do NOT use images from inside the newsletter post itself

2. **Content Images**
   - Download to `/static/blog/YYYY-MM-DD-slug_N.png` (where N is sequential number)
   - Download from Beehiiv CDN URLs
   - Maintain aspect ratio
   - Note: Save in the `static/blog/` directory

3. **Convert All Images to WebP**
   After downloading images, convert them to WebP format using:
   ```bash
   # For PNG/JPG images:
   cwebp -q 90 "image.png" -o "image.webp" && rm "image.png"

   # For GIF images (animated):
   gif2webp -q 90 "image.gif" -o "image.webp" && rm "image.gif"
   ```

   Final filenames should be:
   - Hero: `/static/blog/YYYY-MM-DD-slug.webp`
   - Content: `/static/blog/YYYY-MM-DD-slug_N.webp`

4. **Image Markdown Format**
   ```markdown
   ![Alt text description](/blog/image-path.webp)

   <!-- For centered images with custom width -->
   <p align="center">
       <img width="500" src="/blog/image-path.webp" alt="Description" />
   </p>
   ```

### 5. Convert Content Structure

**Content Conversion Rules:**

1. **Opening Section**
   - Do NOT add hero image in the content (it's handled automatically via the front matter `image` field)
   - Include newsletter subtitle as opening paragraph
   - Add `<!-- truncate -->` after intro paragraph for blog preview

2. **Section Dividers**
   - Generally not needed between sections
   - Let content flow naturally without visual breaks
   - Only use if there's a major topic shift that requires clear separation

3. **Headings**
   - Newsletter H3 → Blog H2 (`##`)
   - Newsletter H4 → Blog H3 (`###`)
   - Maintain heading hierarchy

4. **Lists**
   - Preserve bullet points as markdown lists (`-`)
   - Maintain indentation for nested lists
   - **Important:** Add `<br />` after each list block for proper spacing

   Example:
   ```markdown
   - First item
   - Second item
   - Third item

   <br />

   Next paragraph starts here...
   ```

5. **Links**
   - Convert Beehiiv tracking URLs to original URLs
   - Format: `[link text](url)`
   - For tweets/social embeds, reference as: `This [post](url)`

6. **Emphasis**
   - Bold text: `**text**`
   - Italic text: `*text*`

7. **Quotes and Citations**
   - Use blockquote syntax (`>`) for extended quotes
   - For multi-paragraph quotes, use `> <br />` between paragraphs
   - Add `<br />` after the quote block
   - **IMPORTANT:** Extract the actual hyperlink from the Beehiiv newsletter, not guess or create new ones
   - Include attribution with author name and link when available

   Example:
   ```markdown
   > First paragraph of the quote goes here.
   >
   > <br />
   >
   > Second paragraph of the quote continues here.

   <br />

   **Author Name** - ["Article Title"](https://actual-link-from-beehiiv.com)
   ```

8. **Code/Technical Content**
   - Wrap technical terms in backticks: \`term\`
   - Use code blocks for snippets

9. **YouTube Videos**
   - **IMPORTANT:** Extract the actual YouTube URL from the Beehiiv newsletter content
   - Convert YouTube links to embedded iframe format
   - Extract video ID from URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID` → `VIDEO_ID`)
   - Use only the video ID in the embed URL, no additional parameters
   - Use responsive embed with centered layout

   Example conversion:
   - Original: `https://www.youtube.com/watch?v=Zyw-YA0k3xo`
   - Embed format:
   ```html
   <div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
       <iframe
           src="https://www.youtube.com/embed/Zyw-YA0k3xo"
           width="800"
           height="400"
       />
   </div>
   ```

   **Note:** Always verify the video link exists in the original Beehiiv content - don't assume or guess video IDs

### 6. Content Cleanup

**Remove from Newsletter:**
- Beehiiv footer/unsubscribe links
- Newsletter-specific CTAs (subscribe buttons, share widgets)
- Tracking parameters from URLs (`?utm_source=...`)
- Newsletter metadata (view in browser links)

**Preserve:**
- Author voice and tone
- All substantive content
- External references and citations
- Story flow and narrative structure

### 7. Quality Checks

Before finalizing:

- [ ] Front matter is complete and valid YAML
- [ ] Front matter `image:` field includes `.webp` extension
- [ ] All images are downloaded, converted to WebP, and properly referenced
- [ ] All image references in content use `.webp` extension
- [ ] Links are clean (no tracking parameters)
- [ ] Markdown syntax is valid
- [ ] Content flows naturally without newsletter artifacts
- [ ] File is saved in `/blog/` directory with correct naming
- [ ] Test render locally to ensure formatting

## Example Conversion

**Newsletter URL:** `https://didierlopes.beehiiv.com/p/the-trampoline-job-optimize-your-career-for-growth`

**Converted to:** `/blog/2025-09-19-the-trampoline-job-optimize-your-career-for-growth.md`

**Key transformations:**
- Extracted tweet screenshot as centered image (converted to WebP)
- Converted newsletter sections to H2/H3 headings
- Cleaned URLs of tracking parameters
- Added proper front matter with relevant tags
- Preserved personal narrative and bullet points

## Automation Tips

For batch conversions:
1. Use the imageFetch tool to extract content and images
2. Parse the HTML/Markdown structure programmatically
3. Apply transformation rules consistently
4. Validate front matter and markdown syntax
5. Batch download and convert images to WebP
6. Run local preview before committing

## Common Pitfalls to Avoid

- Don't include newsletter-specific language ("Click here to read more")
- Don't forget to download images (Beehiiv CDN links may expire)
- Don't forget to convert images to WebP format
- Don't use relative dates ("last week") - use specific dates
- Don't include email-specific formatting (table layouts for email clients)
- Don't forget the `<!-- truncate -->` marker for blog preview
