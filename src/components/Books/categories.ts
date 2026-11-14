// Single source of truth for book categories. The order here is the order
// the filter chips render in on the books pages.
export const BOOK_CATEGORIES = [
	{ id: "startups", label: "Startups" },
	{ id: "venture", label: "Venture Capital" },
	{ id: "product", label: "Product" },
	{ id: "design", label: "Design" },
	{ id: "sales", label: "Sales & Marketing" },
	{ id: "strategy", label: "Strategy" },
	{ id: "leadership", label: "Leadership" },
	{ id: "open-source", label: "Open Source & Community" },
	{ id: "stories", label: "Biographies & Company Stories" },
	{ id: "investing", label: "Investing & Wealth" },
	{ id: "wall-street", label: "Wall Street" },
	{ id: "quant", label: "Quant & Trading" },
	{ id: "decisions", label: "Decisions & Risk" },
	{ id: "ideas", label: "History & Science" },
	{ id: "ai-data", label: "AI & Data" },
	{ id: "personal-growth", label: "Personal Growth" },
	{ id: "writing", label: "Writing & Storytelling" },
	{ id: "fiction", label: "Fiction" },
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number]["id"];

export interface Book {
	title: string;
	author: string;
	image: string;
	category: BookCategory;
}
