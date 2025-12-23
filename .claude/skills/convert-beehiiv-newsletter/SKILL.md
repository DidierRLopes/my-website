---
name: convert-beehiiv-newsletter
description: Converts Beehiiv newsletter posts into properly formatted blog markdown files. Use when converting newsletters to blog posts, importing Beehiiv content, or creating blog posts from newsletter URLs.
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - mcp__fetch__imageFetch
  - WebFetch
---

# Converting Beehiiv Newsletter to Blog Post

A comprehensive guide for converting Beehiiv newsletter posts into properly formatted blog markdown files for the website.

## Prerequisites

- Access to the Beehiiv newsletter URL
- Image extraction capabilities (use mcp__fetch__imageFetch tool)
- Understanding of the blog's markdown structure and front matter requirements

## Step-by-Step Conversion Process

### 1. Extract Newsletter Content

Use the imageFetch tool to extract content and images:

```
mcp__fetch__imageFetch with url=<newsletter-url> and images={"output": "file", "layout": "individual", "maxCount": 10}
```

**Key extraction requirements:**
- Capture all text content including headings, paragraphs, and lists
- Extract all images in high quality (minimum 1000px width)
- Preserve link URLs and their context
- Note any special formatting (bold, italics, quotes)
- **CRITICAL:** The blog post content must be 1:1 with the original newsletter (excluding ads). Do not summarize, paraphrase, or restructure. Copy the exact content, structure, and formatting.
- **IMPORTANT:** Use WebFetch with a prompt to extract ALL important links:
  - GitHub repository URLs (especially for open source project posts)
  - YouTube video URLs (these need to be embedded as iframes)
  - Links to other Beehiiv posts (convert to internal blog links if already converted)
  - Any other substantive links mentioned in the content

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
image: /blog/<filename-without-extension>
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
- **image**: Points to the hero image path (without extension)
- **tags**: Extract 3-6 relevant tags from content themes (lowercase)
- **description**: Use newsletter subtitle or create compelling summary
- **hideSidebar**: Set to `true` for blog posts

### 4. Process Images

**Image Handling Rules:**

1. **Hero Image**
   - **IMPORTANT:** Fetch the hero image from https://didierlopes.beehiiv.com/ main page
   - Find the newsletter post by title and extract its thumbnail image
   - Save as: `/static/blog/YYYY-MM-DD-slug.png` (must be PNG format)
   - Dimensions: 1200x630px minimum (social media preview)
   - Note: The image must be saved in the `static/blog/` directory, not just `/blog/`
   - Do NOT use images from inside the newsletter post itself

2. **Content Images**
   - Save as: `/static/blog/YYYY-MM-DD-slug_N.png` (where N is sequential number)
   - Download from Beehiiv CDN URLs
   - Convert to high-quality PNG format
   - Maintain aspect ratio
   - Note: Save in the `static/blog/` directory

3. **Image Markdown Format**
   ```markdown
   ![Alt text description](/blog/image-path.png)

   <!-- For centered images with custom width -->
   <p align="center">
       <img width="500" src="/blog/image-path.png" alt="Description" />
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
   - **IMPORTANT:** Add `<br />` after the video embed so following text doesn't appear glued to it

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

   <br />
   ```

   **Note:** Always verify the video link exists in the original Beehiiv content - don't assume or guess video IDs

10. **Image Captions**
    - If text immediately following an image is a caption/description of that image, style it differently
    - Use smaller font size and bring it closer to the image with negative margin

    Example:
    ```html
    <p align="center">
        <img width="800" src="/blog/image.png" alt="Description" />
    </p>
    <p align="center" style={{fontSize: '0.85em', marginTop: '-0.5em'}}>Caption text describing the image above.</p>
    ```

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
- [ ] All images are downloaded and properly referenced
- [ ] Links are clean (no tracking parameters)
- [ ] Markdown syntax is valid
- [ ] Content flows naturally without newsletter artifacts
- [ ] File is saved in `/blog/` directory with correct naming
- [ ] Test render locally to ensure formatting

## Example Conversion

**Newsletter URL:** `https://didierlopes.beehiiv.com/p/the-trampoline-job-optimize-your-career-for-growth`

**Converted to:** `/blog/2025-09-19-the-trampoline-job-optimize-your-career-for-growth.md`

**Key transformations:**
- Extracted tweet screenshot as centered image
- Converted newsletter sections to H2/H3 headings
- Cleaned URLs of tracking parameters
- Added proper front matter with relevant tags
- Preserved personal narrative and bullet points

## Common Pitfalls to Avoid

- Don't include newsletter-specific language ("Click here to read more")
- Don't forget to download images (Beehiiv CDN links may expire)
- Don't use relative dates ("last week") - use specific dates
- Don't include email-specific formatting (table layouts for email clients)
- Don't forget the `<!-- truncate -->` marker for blog preview
