import React, { useState, useCallback } from "react";
import styles from "./PokemonTCGWanted.module.css";

// Auto-discover all card images from static/cards/ at build time
const cardContext = require.context(
	"@site/static/cards",
	false,
	/\.(png|jpe?g|webp|gif)$/,
);

interface Card {
	name: string;
	image: string;
}

function deriveDisplayName(filename: string): string {
	const nameWithoutExt = filename.replace(/^\.\//, "").replace(/\.[^.]+$/, "");
	return nameWithoutExt
		.replace(/[-_]/g, " ")
		.replace(/\b\w/g, (c) => c.toUpperCase());
}

const cards: Card[] = cardContext.keys().map((key: string) => ({
	name: deriveDisplayName(key),
	image: cardContext(key).default || cardContext(key),
}));

const MAX_TILT = 15;

function CardItem({
	card,
	onSelect,
}: { card: Card; onSelect: (image: string) => void }) {
	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLLIElement>) => {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = (e.clientY - rect.top) / rect.height;
			const rotateY = (x - 0.5) * MAX_TILT * 2;
			const rotateX = (0.5 - y) * MAX_TILT * 2;
			e.currentTarget.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
		},
		[],
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLLIElement>) => {
			e.currentTarget.style.transform = "";
		},
		[],
	);

	return (
		<li
			className={styles.cardItem}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<div
				onClick={() => onSelect(card.image)}
				onKeyDown={(e) => e.key === "Enter" && onSelect(card.image)}
				role="button"
				tabIndex={0}
			>
				<img
					src={card.image}
					alt={card.name}
					className={styles.cardImage}
				/>
			</div>
			<span className={styles.cardName}>{card.name}</span>
		</li>
	);
}

export default function PokemonTCGWanted() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	return (
		<div className={styles.container}>
			{cards.length > 0 ? (
				<ul className={styles.cardGrid}>
					{cards.map((card) => (
						<CardItem
							key={card.name}
							card={card}
							onSelect={setSelectedImage}
						/>
					))}
				</ul>
			) : (
				<div className={styles.noResults}>
					<p>&gt; No cards added yet</p>
				</div>
			)}
			{selectedImage && (
				<div
					className={styles.modalBackdrop}
					onClick={() => setSelectedImage(null)}
					onKeyDown={(e) =>
						e.key === "Escape" && setSelectedImage(null)
					}
					role="button"
					tabIndex={0}
				>
					<div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
					>
						<button
							type="button"
							className={styles.closeButton}
							onClick={() => setSelectedImage(null)}
						>
							X
						</button>
						<img
							src={selectedImage}
							alt="Enlarged card"
							className={styles.modalImage}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
