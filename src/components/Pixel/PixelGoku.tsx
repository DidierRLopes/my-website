import React from "react";
import styles from "./PixelGoku.module.css";

// Pixel Didier at his desk. `superSaiyan` turns his hair gold (a hair-only
// layer made from the same art, static/img/pixel/goku-hair-ssj.png) with an
// aura around him; `family` brings in his wife, standing behind him, drawn
// as Android 18 (blonde bob, denim vest and skirt), and then his newborn
// daughter, sitting on his lap, drawn as baby Marron; `screen` is drawn on
// the laptop screen. The sprite is square and fills the width it is given.

interface Props {
	superSaiyan?: boolean;
	family?: boolean;
	screen?: React.ReactNode;
	className?: string;
	alt?: string;
}

export default function PixelGoku({
	superSaiyan = false,
	family = false,
	screen,
	className,
	alt = "Pixel-art Didier typing at a laptop",
}: Props) {
	return (
		<div
			className={`${styles.root} ${superSaiyan ? styles.powered : ""} ${family ? styles.withFamily : ""} ${className ?? ""}`}
			role="img"
			aria-label={[alt, superSaiyan && "powered up with golden hair", family && "with his wife behind him dressed as Android 18 and his newborn daughter on his lap dressed as Marron"]
				.filter(Boolean)
				.join(", ")}
		>
			{/* His wife stands at the left, in the room the scene makes when it
			    zooms out (a 320px canvas around his 256px one). */}
			<img src="/img/pixel/family-wife.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.wife}`} />
			<div className={styles.scene}>
				<span className={styles.aura} aria-hidden="true" />
				<img src="/img/pixel/goku-desk.png" alt="" width={256} height={256} className={styles.layer} />
				<img src="/img/pixel/goku-hair-ssj.png" alt="" width={256} height={256} className={`${styles.layer} ${styles.hair}`} />
				<img src="/img/pixel/family-daughter.png" alt="" width={256} height={256} className={`${styles.layer} ${styles.daughter}`} />
				{screen && (
					<div className={styles.screen} aria-hidden="true">
						{screen}
					</div>
				)}
			</div>
			{/* The dogs sit in front of the desk, on the same 320px canvas. */}
			<img src="/img/pixel/family-dog-black.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.dogBlack}`} />
			<img src="/img/pixel/family-dog-brown.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.dogBrown}`} />
		</div>
	);
}
