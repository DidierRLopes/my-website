import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { thumbnailUrl } from "../../lib/thumbnails";
import { interviews, type MediaItem, newsCoverage, onStage, podcasts, productVideos, webinars } from "./data";
import styles from "./MediaTV.module.css";

// "Didier TV": the Media section drawn as a video channel page. /media shows
// one row per section that steps sideways with arrows; "View all" opens
// /media/<id> with all of one section. Search works across everything; any
// item opens in a watch view.

// Sections, in order; ids are the URL slugs.
export const MEDIA_SECTIONS = [
	{ id: "on-stage", label: "On stage", items: onStage },
	{ id: "news-mentions", label: "News coverage", items: newsCoverage },
	{ id: "interviews", label: "Interviews", items: interviews },
	{ id: "webinars", label: "Webinars", items: webinars },
	{ id: "product-videos", label: "Product videos", items: productVideos },
	{ id: "podcasts", label: "Podcasts", items: podcasts },
] as const;

export type MediaSectionId = (typeof MEDIA_SECTIONS)[number]["id"];

type Kind = "video" | "photo" | "podcast" | "article";

interface Card {
	key: string;
	kind: Kind;
	section: MediaSectionId;
	title: string;
	date: string;
	channel?: string;
	duration?: string;
	thumb?: string;
	image?: string;
	embed?: string;
	link?: string;
	html?: string;
	info?: string;
	text: string; // lower-cased searchable text
}

const KIND_BADGE: Record<Kind, string> = { video: "", photo: "Photo", podcast: "Podcast", article: "Article" };

function youtubeId(embed: string): string | undefined {
	return embed.match(/embed\/([\w-]{11})/)?.[1];
}

// "55 minutes" -> "55 min", "1h 7min" -> "1h 7m"; already-compact values pass through.
function shortDuration(time?: string): string | undefined {
	if (!time) return undefined;
	return time
		.replace(/\s*minutes?$/, " min")
		.replace(/(\d)min$/, "$1 min")
		.replace(/(\d+)h\s*(\d+)\s*m(in)?$/, "$1h $2m")
		.replace(/^(\d+:\d+)\s*min$/, "$1");
}

const stripHtml = (html?: string) => (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function toCard(item: MediaItem, section: MediaSectionId, index: number): Card {
	const base = {
		key: `${section}-${index}`,
		section,
		title: item.title,
		date: item.date,
	};
	const text = [item.title, item.location, item.host, item.magazine, stripHtml(item.description), item.summary]
		.filter(Boolean)
		.join(" ")
		.toLowerCase();
	if (item.embed) {
		const id = youtubeId(item.embed);
		return {
			...base,
			text,
			kind: "video",
			channel: item.location,
			duration: shortDuration(item.time),
			thumb: id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : undefined,
			embed: item.embed,
			html: item.description,
			info: item.info,
		};
	}
	if (item.host) {
		return { ...base, text, kind: "podcast", channel: item.host, link: item.link, html: item.summary };
	}
	if (item.magazine) {
		return {
			...base,
			text,
			kind: "article",
			channel: item.magazine,
			link: item.link,
			thumb: item.img ? thumbnailUrl(item.img) : undefined,
			image: item.img,
		};
	}
	return {
		...base,
		text,
		kind: "photo",
		channel: item.location,
		thumb: item.image ? thumbnailUrl(item.image) : undefined,
		image: item.image,
		html: item.description,
		info: item.info,
	};
}

const SECTION_CARDS = Object.fromEntries(
	MEDIA_SECTIONS.map((s) => [s.id, s.items.map((item, i) => toCard(item, s.id, i))]),
) as Record<MediaSectionId, Card[]>;
const ALL_CARDS = Object.values(SECTION_CARDS).flat();
const labelOf = (id: MediaSectionId) => MEDIA_SECTIONS.find((s) => s.id === id)!.label;

function formatDate(date: string): string {
	return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(
		new Date(date),
	);
}

function countLabel(n: number, section: MediaSectionId): string {
	const noun = section === "news-mentions" ? "article" : section === "podcasts" ? "episode" : "video";
	return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

function search(query: string): Card[] {
	const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
	return ALL_CARDS.filter((c) => terms.every((t) => c.text.includes(t))).sort((a, b) =>
		b.date.localeCompare(a.date),
	);
}

// ---------- Pieces ----------

// A pixel sound wave for podcast covers, shaped by the title so each differs.
function Wave({ seed }: { seed: string }) {
	let h = 2166136261;
	const bars = Array.from({ length: 26 }, (_, i) => {
		h ^= seed.charCodeAt(i % seed.length) + i;
		h = Math.imul(h, 16777619) >>> 0;
		const envelope = Math.sin((Math.PI * (i + 1)) / 27);
		return Math.max(2, Math.round((4 + (h % 13)) * envelope));
	});
	return (
		<svg className={styles.wave} viewBox="0 0 208 40" aria-hidden="true" shapeRendering="crispEdges">
			{bars.map((height, i) => (
				<rect key={i} x={i * 8 + 2} y={20 - height} width="4" height={height * 2} />
			))}
		</svg>
	);
}

function Thumb({ card }: { card: Card }) {
	return (
		<span className={styles.thumb}>
			{card.thumb ? (
				<img src={card.thumb} alt="" loading="lazy" decoding="async" />
			) : (
				<span className={`${styles.placeholder} ${styles[card.kind]}`} aria-hidden="true">
					{card.kind === "podcast" && <Wave seed={card.title} />}
					<span className={styles.placeholderLabel}>{card.channel}</span>
				</span>
			)}
			{card.kind === "video" && <span className={styles.play} aria-hidden="true" />}
			{(card.duration || KIND_BADGE[card.kind]) && (
				<span className={styles.badge}>{card.duration ?? KIND_BADGE[card.kind]}</span>
			)}
		</span>
	);
}

function Watch({
	card,
	upNext,
	onPick,
	onClose,
}: {
	card: Card;
	upNext: Card[];
	onPick: (c: Card) => void;
	onClose: () => void;
}) {
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div
				className={styles.watch}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label={card.title}
			>
				<button type="button" className={styles.close} onClick={onClose} aria-label="Close" autoFocus>
					✕
				</button>
				<div className={styles.watchMain}>
					<div className={styles.player}>
						{card.embed ? (
							<iframe
								src={card.embed}
								title={card.title}
								allow="encrypted-media; picture-in-picture; fullscreen"
								allowFullScreen
							/>
						) : card.image ? (
							<img src={card.image} alt={card.title} />
						) : (
							<span className={`${styles.placeholder} ${styles[card.kind]}`} aria-hidden="true">
								{card.kind === "podcast" && <Wave seed={card.title} />}
								<span className={styles.placeholderLabel}>{card.channel}</span>
							</span>
						)}
					</div>
					<h2 className={styles.watchTitle}>{card.title}</h2>
					<p className={styles.watchMeta}>
						{[card.channel, formatDate(card.date), card.duration].filter(Boolean).map((part) => (
							<span key={part}>{part}</span>
						))}
					</p>
					{card.link && (
						<a className={styles.cta} href={card.link} target="_blank" rel="noopener noreferrer">
							{card.kind === "podcast" ? "Listen to the episode" : "Read the article"}
						</a>
					)}
					{card.html && <div className={styles.watchBody} dangerouslySetInnerHTML={{ __html: card.html }} />}
					{card.info && <div className={styles.watchBody} dangerouslySetInnerHTML={{ __html: card.info }} />}
				</div>
				{upNext.length > 0 && (
					<aside className={styles.upNext}>
						<h3>Up next in {labelOf(card.section)}</h3>
						<ul>
							{upNext.map((c) => (
								<li key={c.key}>
									<button type="button" onClick={() => onPick(c)}>
										<Thumb card={c} />
										<span>
											<span className={styles.upTitle}>{c.title}</span>
											<span className={styles.upMeta}>{formatDate(c.date)}</span>
										</span>
									</button>
								</li>
							))}
						</ul>
					</aside>
				)}
			</div>
		</div>
	);
}

// A video card: thumbnail, title, channel and date.
function VideoCard({ card, onOpen }: { card: Card; onOpen: () => void }) {
	return (
		<button type="button" className={styles.card} onClick={onOpen}>
			<Thumb card={card} />
			<span className={styles.cardTitle}>{card.title}</span>
			{card.channel && <span className={styles.cardChannel}>{card.channel}</span>}
			<span className={styles.cardMeta}>{formatDate(card.date)}</span>
		</button>
	);
}

// One section as a row of cards that steps sideways, one card per arrow press.
function Shelf({ id, onOpen }: { id: MediaSectionId; onOpen: (c: Card) => void }) {
	const row = useRef<HTMLUListElement>(null);
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);
	const cards = SECTION_CARDS[id];

	useEffect(() => {
		const el = row.current;
		if (!el) return;
		const update = () => {
			setAtStart(el.scrollLeft <= 4);
			setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
		};
		update();
		el.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			el.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, []);

	const step = (dir: 1 | -1) => {
		const el = row.current;
		const first = el?.querySelector("li");
		if (!el || !first) return;
		const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
		el.scrollBy({ left: dir * (first.getBoundingClientRect().width + gap), behavior: "smooth" });
	};

	return (
		<section className={styles.shelf} aria-labelledby={`shelf-${id}`}>
			<div className={styles.shelfHead}>
				<h2 id={`shelf-${id}`} className={styles.shelfTitle}>
					{labelOf(id)}
					<span className={styles.shelfCount}>{countLabel(cards.length, id)}</span>
				</h2>
				<Link to={`/media/${id}`} className={styles.viewAll}>
					View all
				</Link>
			</div>
			<div className={styles.shelfBody}>
				<ul ref={row} className={styles.shelfRow}>
					{cards.map((c) => (
						<li key={c.key}>
							<VideoCard card={c} onOpen={() => onOpen(c)} />
						</li>
					))}
				</ul>
				{!atStart && (
					<button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => step(-1)} aria-label="Previous">
						<span aria-hidden="true" />
					</button>
				)}
				{!atEnd && (
					<button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => step(1)} aria-label="Next">
						<span aria-hidden="true" />
					</button>
				)}
			</div>
		</section>
	);
}

// A search result row: large thumbnail, title, details and a snippet.
function Row({ card, onOpen }: { card: Card; onOpen: () => void }) {
	const snippet = stripHtml(card.html);
	return (
		<li className={styles.row}>
			<button type="button" onClick={onOpen}>
				<Thumb card={card} />
				<span className={styles.rowText}>
					<span className={styles.rowTitle}>{card.title}</span>
					<span className={styles.rowMeta}>
						{card.channel && <span>{card.channel}</span>}
						<span>{formatDate(card.date)}</span>
						<span>{labelOf(card.section)}</span>
					</span>
					{snippet && <span className={styles.rowSnippet}>{snippet}</span>}
				</span>
			</button>
		</li>
	);
}

// ---------- Page ----------

interface Props {
	/** Omit for the channel home (/media). */
	section?: MediaSectionId;
	/** Browser tab title. */
	pageTitle: string;
}

export default function MediaTV({ section, pageTitle }: Props) {
	const [query, setQuery] = useState("");
	const [watching, setWatching] = useState<Card | null>(null);
	const closeWatch = useCallback(() => setWatching(null), []);

	const searching = query.trim().length > 0;
	const results = useMemo(() => (searching ? search(query) : []), [searching, query]);

	const upNext = watching
		? SECTION_CARDS[watching.section].filter((c) => c.key !== watching.key).slice(0, 6)
		: [];

	return (
		<div className={styles.app}>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<header className={styles.topbar}>
				<form className={styles.searchRow} role="search" onSubmit={(e) => e.preventDefault()}>
					<div className={styles.searchField}>
						<span className={styles.searchIcon} aria-hidden="true" />
						<input
							type="search"
							className={styles.search}
							placeholder="Search talks, interviews, podcasts"
							aria-label="Search media"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
				</form>
			</header>

			<main className={styles.body}>
				{searching ? (
					<section>
						<div className={styles.resultsHead}>
							<h1 className={styles.feedTitle}>
								Results for "{query.trim()}"
								<span className={styles.resultCount}>{results.length}</span>
							</h1>
							<button
								type="button"
								className={styles.clear}
								onClick={() => setQuery("")}
							>
								Clear search
							</button>
						</div>
						{results.length === 0 ? (
							<p className={styles.empty}>Nothing matches that search.</p>
						) : (
							<ul className={styles.rows}>
								{results.map((c) => (
									<Row key={c.key} card={c} onOpen={() => setWatching(c)} />
								))}
							</ul>
						)}
					</section>
				) : section ? (
					<section>
						<Link to="/media" className={styles.back}>
							All media
						</Link>
						<h1 className={styles.feedTitle}>
							{labelOf(section)}
							<span className={styles.resultCount}>{countLabel(SECTION_CARDS[section].length, section)}</span>
						</h1>
						<ul className={styles.grid}>
							{SECTION_CARDS[section].map((c) => (
								<li key={c.key}>
									<VideoCard card={c} onOpen={() => setWatching(c)} />
								</li>
							))}
						</ul>
					</section>
				) : (
					MEDIA_SECTIONS.map((s) => <Shelf key={s.id} id={s.id} onOpen={setWatching} />)
				)}
			</main>

			{watching && <Watch card={watching} upNext={upNext} onPick={setWatching} onClose={closeWatch} />}
		</div>
	);
}
