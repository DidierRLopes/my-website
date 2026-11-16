import React, { useEffect, useRef, useState } from "react";
import { thumbnailUrl } from "../../lib/thumbnails";
import styles from "./CoverImage.module.css";

// Covers are drawn in one book shape (2:3) so every book is the same size.
// Book-shaped covers fill it; the few genuinely square or landscape covers
// (e.g. coffee-table books) are shown whole on a white page instead of being
// cropped.
const SQUARE_BELOW = 1.2; // height / width

interface Props {
	src: string;
	className?: string;
	draggable?: boolean;
}

export default function CoverImage({ src, className, draggable }: Props) {
	const ref = useRef<HTMLImageElement>(null);
	const [square, setSquare] = useState(false);

	const measure = () => {
		const img = ref.current;
		if (img?.naturalWidth) setSquare(img.naturalHeight / img.naturalWidth < SQUARE_BELOW);
	};

	// Covers already in the cache can finish loading before hydration.
	useEffect(() => {
		if (ref.current?.complete) measure();
	}, []);

	return (
		<img
			ref={ref}
			src={thumbnailUrl(src)}
			alt=""
			loading="lazy"
			decoding="async"
			draggable={draggable}
			onLoad={measure}
			className={`${styles.cover} ${square ? styles.square : ""} ${className ?? ""}`}
		/>
	);
}
