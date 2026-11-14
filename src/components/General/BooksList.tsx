import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
	BOOK_CATEGORIES,
	type Book,
	type BookCategory,
} from "../Books/categories";
import styles from "./BooksList.module.css";

interface BooksListProps {
	books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState<BookCategory | null>(
		null,
	);

	const categoryCounts = useMemo(() => {
		const counts = new Map<BookCategory, number>();
		for (const book of books) {
			counts.set(book.category, (counts.get(book.category) ?? 0) + 1);
		}
		return counts;
	}, [books]);

	const openModal = (imageUrl: string) => {
		setSelectedImage(imageUrl);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		if (selectedImage) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [selectedImage]);

	const query = searchTerm.toLowerCase();
	const filteredBooks = books.filter(
		(book) =>
			(activeCategory === null || book.category === activeCategory) &&
			(book.title.toLowerCase().includes(query) ||
				book.author.toLowerCase().includes(query)),
	);

	const activeLabel = BOOK_CATEGORIES.find(
		(category) => category.id === activeCategory,
	)?.label;

	return (
		<div className={styles.terminal}>
			<div className={styles.searchContainer}>
				<input
					type="text"
					placeholder={`> Search from ${books.length} books by title or author...`}
					className={styles.searchInput}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<div className={styles.categories} role="group" aria-label="Categories">
				<button
					type="button"
					className={styles.categoryChip}
					aria-pressed={activeCategory === null}
					onClick={() => setActiveCategory(null)}
				>
					All <span className={styles.categoryCount}>{books.length}</span>
				</button>
				{BOOK_CATEGORIES.filter((category) =>
					categoryCounts.has(category.id),
				).map((category) => (
					<button
						type="button"
						key={category.id}
						className={styles.categoryChip}
						aria-pressed={activeCategory === category.id}
						onClick={() =>
							setActiveCategory(
								activeCategory === category.id ? null : category.id,
							)
						}
					>
						{category.label}{" "}
						<span className={styles.categoryCount}>
							{categoryCounts.get(category.id)}
						</span>
					</button>
				))}
			</div>
			{filteredBooks.length > 0 ? (
				<ul className={styles.bookList}>
					{filteredBooks.map((book) => (
						<li
							className={styles.bookItem}
							key={book.title}
							onClick={() => openModal(book.image)}
							onKeyDown={(e) => e.key === "Enter" && openModal(book.image)}
							role="button"
							tabIndex={0}
						>
							<img
								src={book.image}
								alt={`${book.title} cover`}
								className={styles.bookThumbnail}
							/>
							<div className={styles.bookInfo}>
								<span className={styles.bookTitle}>{book.title}</span>
								<span className={styles.bookAuthor}>by {book.author}</span>
							</div>
						</li>
					))}
				</ul>
			) : (
				<div className={styles.noResults}>
					<p>
						&gt; No results found for "{searchTerm}"
						{activeLabel ? ` in ${activeLabel}` : ""}
					</p>
				</div>
			)}
			{selectedImage &&
				createPortal(
					<div
						className={styles.modalBackdrop}
						onClick={closeModal}
						role="button"
						tabIndex={0}
					>
						<div
							className={styles.modalContent}
							onClick={(e) => e.stopPropagation()}
							role="dialog"
							aria-modal="true"
						>
							<button
								type="button"
								className={styles.closeButton}
								onClick={closeModal}
							>
								X
							</button>
							<img
								src={selectedImage}
								alt="Enlarged book cover"
								className={styles.modalImage}
							/>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}
