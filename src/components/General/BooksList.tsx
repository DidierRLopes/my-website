import React, { useMemo, useState } from "react";
import Bedroom from "../Books/Bedroom";
import CoverGrid from "../Books/CoverGrid";
import { BOOK_CATEGORIES, type Book, type BookCategory } from "../Books/categories";
import PixelSelect from "./PixelSelect";
import styles from "./BooksList.module.css";

interface BooksListProps {
	books: Book[];
	/** "covers": 3D books, click to copy (to read). "bedroom": books spread on Van Gogh's bedroom floor (read). */
	variant: "covers" | "bedroom";
}

export default function BooksList({ books, variant }: BooksListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [activeCategory, setActiveCategory] = useState<BookCategory | null>(null);

	const categoryCounts = useMemo(() => {
		const counts = new Map<BookCategory, number>();
		for (const book of books) {
			counts.set(book.category, (counts.get(book.category) ?? 0) + 1);
		}
		return counts;
	}, [books]);

	const query = searchTerm.toLowerCase();
	const filteredBooks = books.filter(
		(book) =>
			(activeCategory === null || book.category === activeCategory) &&
			(book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)),
	);
	const matches = useMemo(() => new Set(filteredBooks.map((b) => b.title)), [filteredBooks]);
	const activeLabel = BOOK_CATEGORIES.find((c) => c.id === activeCategory)?.label;

	const search = (
		<input
			type="search"
			placeholder={variant === "bedroom" ? `Search ${books.length} books` : `Search ${books.length} books by title or author`}
			aria-label="Search books"
			className={styles.searchInput}
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		/>
	);
	const shownCategories = BOOK_CATEGORIES.filter((category) => categoryCounts.has(category.id));

	if (variant === "bedroom") {
		// The room always shows every book (matches stay lit, others dim), so
		// filtering never reshuffles it; the controls live inside the room.
		return (
			<div className={styles.root}>
				<Bedroom
					books={books}
					matches={matches}
					controls={
						<div className={styles.inline}>
							{search}
							<PixelSelect
								className={styles.categorySelect}
								ariaLabel="Category"
								value={activeCategory ?? ""}
								onChange={(v) => setActiveCategory((v || null) as BookCategory | null)}
								options={[
									{ value: "", label: "All categories", count: books.length },
									...shownCategories.map((c) => ({
										value: c.id,
										label: c.label,
										count: categoryCounts.get(c.id),
									})),
								]}
							/>
							{filteredBooks.length === 0 && <p className={styles.inlineEmpty}>No matching books.</p>}
						</div>
					}
				/>
			</div>
		);
	}

	return (
		<div className={styles.root}>
			{search}
			<div className={styles.categories} role="group" aria-label="Categories">
				<button
					type="button"
					className={styles.chip}
					aria-pressed={activeCategory === null}
					onClick={() => setActiveCategory(null)}
				>
					All <span className={styles.count}>{books.length}</span>
				</button>
				{shownCategories.map((category) => (
					<button
						type="button"
						key={category.id}
						className={styles.chip}
						aria-pressed={activeCategory === category.id}
						onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
					>
						{category.label} <span className={styles.count}>{categoryCounts.get(category.id)}</span>
					</button>
				))}
			</div>
			{filteredBooks.length === 0 ? (
				<p className={styles.noResults}>
					No results found for "{searchTerm}"{activeLabel ? ` in ${activeLabel}` : ""}
				</p>
			) : (
				<CoverGrid books={filteredBooks} />
			)}
		</div>
	);
}
