import React, { useEffect, useMemo, useRef, useState } from "react";
import { BOOK_CATEGORIES, type Book } from "./categories";
import CoverImage from "./CoverImage";
import styles from "./Bedroom.module.css";

// "Already Read", inspired by thevisibleshelf.com and set in Van Gogh's
// The Bedroom (1888). Read books lie spread on the floor; the latest one sits
// on the chair with its details above it. Drag a book anywhere on the floor
// (piling them up); clicking a book (or Enter), or dropping it on the chair,
// swaps it with the one on the chair.

// Geometry, in pixels of the painting at 1200 x 952.
const PAINTING = { w: 1200, h: 952 };
// The open floor between the front chair, the table and the bed.
const FLOOR: [number, number][] = [
	[215, 560],
	[590, 560],
	[705, 800],
	[1110, 760],
	[1190, 790],
	[1190, 930],
	[30, 930],
	[30, 840],
	[215, 820],
];
const FLOOR_BACK = 560;
const FLOOR_FRONT = 930;
// Where a dropped book counts as "on the chair": the seat and the back of the
// front-left chair.
const CHAIR_ZONE = { x0: 10, y0: 380, x1: 215, y1: 720 };

const BOOK_WIDTH = 4.8; // % of the room's width, at scale 1

const px = (x: number) => (x / PAINTING.w) * 100;
const py = (y: number) => (y / PAINTING.h) * 100;

interface Placed {
	x: number; // % of room width (centre)
	y: number; // % of room height (centre)
	rot: number; // deg, spin on the floor
	z: number;
}

function mulberry32(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function onFloor(x: number, y: number): boolean {
	let inside = false;
	for (let i = 0, j = FLOOR.length - 1; i < FLOOR.length; j = i++) {
		const [xi, yi] = FLOOR[i];
		const [xj, yj] = FLOOR[j];
		if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}

// Nearer the viewer (lower in the painting) books are drawn larger.
function depthScale(yPercent: number): number {
	const y = (yPercent / 100) * PAINTING.h;
	const t = Math.min(1, Math.max(0, (y - FLOOR_BACK) / (FLOOR_FRONT - FLOOR_BACK)));
	return 0.72 + 0.45 * t;
}

function scatter(books: Book[]): Record<string, Placed> {
	const rand = mulberry32(1888);
	const spots = books.map(() => {
		for (;;) {
			const x = 30 + rand() * 1160;
			const y = FLOOR_BACK + rand() * (FLOOR_FRONT - FLOOR_BACK);
			if (onFloor(x, y)) return { x: px(x), y: py(y), rot: (rand() - 0.5) * 70 };
		}
	});
	// Books further back are underneath, so the pile reads front to back.
	const order = spots.map((_, i) => i).sort((a, b) => spots[a].y - spots[b].y);
	const placed: Record<string, Placed> = {};
	order.forEach((i, z) => {
		placed[books[i].title] = { ...spots[i], z: z + 1 };
	});
	return placed;
}

function inChair(x: number, y: number): boolean {
	return x >= px(CHAIR_ZONE.x0) && x <= px(CHAIR_ZONE.x1) && y >= py(CHAIR_ZONE.y0) && y <= py(CHAIR_ZONE.y1);
}

interface Drag {
	title: string;
	el: HTMLElement;
	dx: number;
	dy: number;
	startX: number;
	startY: number;
	origin: Placed;
	moved: boolean;
}

interface Props {
	/** Latest read first. */
	books: Book[];
	/** Titles matching the current search and category; others are dimmed. */
	matches: Set<string>;
	/** Search and category controls, drawn on the empty wall at the top. */
	controls: React.ReactNode;
}

export default function Bedroom({ books, matches, controls }: Props) {
	const room = useRef<HTMLDivElement>(null);
	const drag = useRef<Drag | null>(null);
	const zTop = useRef(books.length + 1);
	const [chair, setChair] = useState(books[0]?.title);
	const [placed, setPlaced] = useState(() => scatter(books.slice(1)));
	const [dragging, setDragging] = useState<string | null>(null);
	const [overChair, setOverChair] = useState(false);

	const byTitle = useMemo(() => new Map(books.map((b) => [b.title, b])), [books]);
	const chairBook = chair ? byTitle.get(chair) : undefined;

	// Pointer position as a percentage of the room.
	const toRoom = (clientX: number, clientY: number) => {
		const r = room.current!.getBoundingClientRect();
		return { x: ((clientX - r.left) / r.width) * 100, y: ((clientY - r.top) / r.height) * 100 };
	};

	const putOnChair = (title: string, spot: Placed) => {
		if (!chair || title === chair) return;
		const previous = chair;
		setChair(title);
		setPlaced((p) => ({ ...p, [previous]: { ...spot, z: ++zTop.current } }));
	};

	const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>, title: string) => {
		if (e.button !== 0) return;
		const spot = placed[title];
		const pt = toRoom(e.clientX, e.clientY);
		e.currentTarget.setPointerCapture(e.pointerId);
		const z = ++zTop.current;
		e.currentTarget.style.zIndex = String(z);
		drag.current = {
			title,
			el: e.currentTarget,
			dx: spot.x - pt.x,
			dy: spot.y - pt.y,
			startX: e.clientX,
			startY: e.clientY,
			origin: { ...spot, z },
			moved: false,
		};
	};

	const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = drag.current;
		if (!d) return;
		if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < 5) return;
		if (!d.moved) {
			d.moved = true;
			setDragging(d.title);
		}
		const pt = toRoom(e.clientX, e.clientY);
		const x = Math.min(98, Math.max(2, pt.x + d.dx));
		const y = Math.min(97, Math.max(3, pt.y + d.dy));
		// Move the element directly; React state is updated once on drop.
		d.el.style.left = `${x}%`;
		d.el.style.top = `${y}%`;
		d.el.style.width = `${BOOK_WIDTH * depthScale(y)}%`;
		setOverChair(inChair(pt.x, pt.y));
	};

	const onPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = drag.current;
		drag.current = null;
		if (!d) return;
		setDragging(null);
		setOverChair(false);
		const pt = toRoom(e.clientX, e.clientY);
		if (!d.moved || inChair(pt.x, pt.y)) {
			putOnChair(d.title, d.origin);
			return;
		}
		const x = Math.min(98, Math.max(2, pt.x + d.dx));
		const y = Math.min(97, Math.max(3, pt.y + d.dy));
		setPlaced((p) => ({ ...p, [d.title]: { ...d.origin, x, y } }));
	};

	const onKeyDown = (e: React.KeyboardEvent, title: string) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			putOnChair(title, placed[title]);
		}
	};

	// Escape drops a drag in progress back where it started.
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const d = drag.current;
			if (e.key !== "Escape" || !d) return;
			drag.current = null;
			d.el.style.left = `${d.origin.x}%`;
			d.el.style.top = `${d.origin.y}%`;
			d.el.style.width = `${BOOK_WIDTH * depthScale(d.origin.y)}%`;
			setDragging(null);
			setOverChair(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const category = chairBook ? BOOK_CATEGORIES.find((c) => c.id === chairBook.category)?.label : undefined;

	return (
		<figure className={styles.figure}>
			<div className={styles.controls}>{controls}</div>
			<div className={styles.scroller}>
				<div ref={room} className={`${styles.room} ${dragging ? styles.isDragging : ""}`}>
					{chairBook && (
						<div className={`px-box ${styles.details}`} aria-live="polite">
							<span className={styles.label}>On the chair</span>
							<span className={styles.title}>{chairBook.title}</span>
							<span className={styles.author}>{chairBook.author}</span>
							{category && <span className={styles.tag}>{category}</span>}
						</div>
					)}

					<div
						className={`${styles.chairZone} ${overChair ? styles.chairActive : ""}`}
						style={{
							left: `${px(CHAIR_ZONE.x0)}%`,
							top: `${py(CHAIR_ZONE.y0)}%`,
							width: `${px(CHAIR_ZONE.x1 - CHAIR_ZONE.x0)}%`,
							height: `${py(CHAIR_ZONE.y1 - CHAIR_ZONE.y0)}%`,
						}}
						aria-hidden="true"
					/>

					{chairBook && (
						<div className={styles.chairBook} key={chairBook.title}>
							<CoverImage src={chairBook.image} draggable={false} />
						</div>
					)}

					{books.map((book) => {
						if (book.title === chair) return null;
						const spot = placed[book.title];
						if (!spot) return null;
						const lifted = dragging === book.title;
						return (
							<button
								key={book.title}
								type="button"
								className={`${styles.book} ${lifted ? styles.lifted : ""} ${
									matches.has(book.title) ? "" : styles.dim
								}`}
								style={
									{
										left: `${spot.x}%`,
										top: `${spot.y}%`,
										width: `${BOOK_WIDTH * depthScale(spot.y)}%`,
										zIndex: spot.z,
										"--rot": `${spot.rot}deg`,
									} as React.CSSProperties
								}
								title={`${book.title} by ${book.author}`}
								aria-label={`Put ${book.title} by ${book.author} on the chair`}
								onPointerDown={(e) => onPointerDown(e, book.title)}
								onPointerMove={onPointerMove}
								onPointerUp={onPointerUp}
								onPointerCancel={onPointerUp}
								onKeyDown={(e) => onKeyDown(e, book.title)}
							>
								<CoverImage src={book.image} draggable={false} />
							</button>
						);
					})}
				</div>
			</div>
			<figcaption className={styles.credit}>
				Vincent van Gogh, The Bedroom (1888).
			</figcaption>
		</figure>
	);
}
