---
name: add-book
description: Adds a book to the website's "Books to Read" or "Books Already Read" page, including downloading its cover image from Amazon. Use when the user asks to add a book to the books list, books-to-read, or books-already-read page.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - WebSearch
---

# Adding a Book to the Website

A guide for adding books to the website's book lists.

## Files involved

- `src/components/Books/BooksToRead.tsx` — the "Books to Read" list (page: `/books/to-read`)
- `src/components/Books/BooksAlreadyRead.tsx` — the "Books Already Read" list (page: `/books/already-read`)
- `static/books/` — book cover images
- Each file holds a `data` array of `{ title, author, image }` objects. The list is rendered **reversed**, so the last entry in the array appears first on the page.

## Step-by-step process

### 1. Determine the target list

Default to `BooksToRead.tsx` unless the user says the book is already read (then use `BooksAlreadyRead.tsx`).

### 2. Find the Amazon hardcover cover image

- Run a `WebSearch` for `"<title>" <author> hardcover amazon` to get the Amazon product page URL and ASIN/ISBN-10 (the 10-character code in the `/dp/<ASIN>` part of the URL). Prefer the well-known hardcover edition.
- Amazon product pages block direct fetching (HTTP 503). Instead, download the cover directly using the ASIN:
  ```
  https://images-na.ssl-images-amazon.com/images/P/<ASIN>.01.L.jpg
  ```
- Use the filename slug convention: lowercase, spaces and punctuation replaced with hyphens, no subtitle separators. Example: `my-years-with-general-motors.jpg`.

  ```bash
  cd static/books && curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" \
    -o <slug>.jpg -w "HTTP %{http_code} size %{size_download}\n" \
    "https://images-na.ssl-images-amazon.com/images/P/<ASIN>.01.L.jpg"
  ```
- Verify the download is a valid JPEG (`file <slug>.jpg`) and Read the image to confirm it is the correct book cover before proceeding.

### 3. Add the entry

Append a new object to the **end** of the `data` array (so it shows first on the page):

```tsx
{
	title: "My Years with General Motors",
	author: "Alfred P. Sloan, Jr.",
	image: "/books/my-years-with-general-motors.jpg"
},
```

- Use the full title including subtitle, matching the style of nearby entries.
- The `image` path starts with `/books/` (it maps to `static/books/`).
- Match the file's existing indentation (tabs).

### 4. Verify

- If a Docusaurus dev server is running, it hot-reloads. A newly added static image may require a dev server restart to be served.
- Books-to-read page: `/books/to-read`. Books-already-read page: `/books/already-read`.

## Notes

- If the browser extension is unavailable, the direct `images-na.ssl-images-amazon.com/images/P/<ASIN>.01.L.jpg` URL is the reliable fallback for cover images.
- Both `.jpg` and `.jpeg` extensions exist in the repo; `.jpg` is fine for new additions.
