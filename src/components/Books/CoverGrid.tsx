import React, { useEffect, useRef, useState } from "react";
import type { Book } from "./categories";
import CoverImage from "./CoverImage";
import styles from "./CoverGrid.module.css";

const COPIED_MS = 1600;

// "To Read": 3D books whose cover swings open on hover, showing the title and
// author on the cover. Clicking copies "Title by Author" to the clipboard.
// 3D book effect adapted from realvjy: https://codepen.io/realvjy/pen/KKEdXOa
export default function CoverGrid({ books }: { books: Book[] }) {
	const [copied, setCopied] = useState<string | null>(null);
	const timer = useRef<number>();

	useEffect(() => () => window.clearTimeout(timer.current), []);

	const copy = async (book: Book) => {
		try {
			await navigator.clipboard.writeText(`${book.title} by ${book.author}`);
			setCopied(book.title);
			window.clearTimeout(timer.current);
			timer.current = window.setTimeout(() => setCopied(null), COPIED_MS);
		} catch {
			// Clipboard can be unavailable (permissions, insecure origin); nothing to undo.
		}
	};

	return (
		<ul className={styles.books}>
			{books.map((book) => {
				const isCopied = copied === book.title;
				return (
					<li key={book.title} className={styles.bookItem}>
						<button
							type="button"
							className={`${styles.book} ${isCopied ? styles.copied : ""}`}
							onClick={() => copy(book)}
							aria-label={`${book.title} by ${book.author}. Copy title and author`}
						>
							<span className={styles.pages} aria-hidden="true" />
							<span className={styles.cover}>
								<CoverImage src={book.image} />
								<span className={styles.hinge} aria-hidden="true" />
								<span className={styles.light} aria-hidden="true" />
								<span className={styles.details} aria-hidden="true">
									<span className={styles.title}>{book.title}</span>
									<span className={styles.author}>{book.author}</span>
									<span className={styles.hint}>{isCopied ? "Copied" : "Click to copy"}</span>
								</span>
							</span>
						</button>
						<span className={styles.status} role="status">
							{isCopied ? `Copied ${book.title} by ${book.author}` : ""}
						</span>
					</li>
				);
			})}
		</ul>
	);
}
