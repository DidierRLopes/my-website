import React from "react";
import styles from "./PixelGoku.module.css";

// Pixel Didier at his desk. `superSaiyan` turns his hair gold (a hair-only
// layer made from the same art, static/img/pixel/goku-hair-ssj.png) with an
// aura around him; `family` zooms the scene out and brings in his wife,
// standing behind him holding their daughter, then their two Pomeranians: the
// black one asleep on his lap, the brown one asleep at the foot of the desk; `screen`
// is drawn on the laptop screen. The sprite is square and fills the width it
// is given.

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
			aria-label={[alt, superSaiyan && "powered up with golden hair", family && "with his wife behind him holding their daughter, a small black Pomeranian asleep on his lap and a brown one asleep at the foot of the desk"]
				.filter(Boolean)
				.join(", ")}
		>
			{/* His wife, holding their daughter, stands at the left, in the room
			    the scene makes when it zooms out (a 320px canvas around his 256px
			    one, on the same pixel grid). The dogs use the same canvas. */}
			<img src="/img/pixel/family-wife.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.wife}`} />
			<div className={styles.scene}>
				<span className={styles.aura} aria-hidden="true" />
				<img src="/img/pixel/goku-desk.png" alt="" width={256} height={256} className={styles.layer} />
				<img src="/img/pixel/goku-hair-ssj.png" alt="" width={256} height={256} className={`${styles.layer} ${styles.hair}`} />
				{screen && (
					<div className={styles.screen} aria-hidden="true">
						{screen}
					</div>
				)}
			</div>
			{/* The black one is curled up on his lap; the brown one sleeps on the
			    floor at the foot of the desk. */}
			<img src="/img/pixel/family-dog-black.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.dogBlack}`} />
			<img src="/img/pixel/family-dog-brown.png" alt="" width={320} height={320} className={`${styles.layer} ${styles.dogBrown}`} />
		</div>
	);
}
