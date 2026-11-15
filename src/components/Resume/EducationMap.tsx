import React from "react";
import type { School } from "./data";
import { ANCHORS, COUNTRIES, MAP_HEIGHT, MAP_WIDTH } from "./europeMap";
import styles from "./EducationMap.module.css";

// Education as a journey across Western Europe: Portugal, then the Netherlands,
// then the UK, each country lit, with arrows between them and each school's
// details placed by its country.

type Country = keyof typeof ANCHORS;

interface Stop {
	country: Country;
	/** Matches the start of School.school. */
	school: string;
	/** Card position, in % of the map (top-left corner). */
	card: { left: number; top: number };
}

// In the order he studied.
const STOPS: Stop[] = [
	{ country: "Portugal", school: "Faculty of Sciences and Technology", card: { left: 2, top: 51 } },
	{ country: "Netherlands", school: "Delft University of Technology", card: { left: 64, top: 5 } },
	{ country: "United Kingdom", school: "Imperial College London", card: { left: 2, top: 3 } },
];

// How far each leg of the journey bows (map units; sign picks the side).
const LEG_BOW = [110, -60];

// A gentle curve between two points, bowing to one side.
function arc(from: { x: number; y: number }, to: { x: number; y: number }, bow: number): string {
	const mx = (from.x + to.x) / 2;
	const my = (from.y + to.y) / 2;
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const len = Math.hypot(dx, dy);
	const cx = mx - (dy / len) * bow;
	const cy = my + (dx / len) * bow;
	return `M${from.x} ${from.y} Q${cx} ${cy} ${to.x} ${to.y}`;
}

// Trim a path's ends so arrows start and stop just off the markers.
function inset(from: { x: number; y: number }, to: { x: number; y: number }, by: number) {
	const dx = to.x - from.x;
	const dy = to.y - from.y;
	const len = Math.hypot(dx, dy);
	return {
		from: { x: from.x + (dx / len) * by, y: from.y + (dy / len) * by },
		to: { x: to.x - (dx / len) * by, y: to.y - (dy / len) * by },
	};
}

export default function EducationMap({ schools }: { schools: School[] }) {
	const stops = STOPS.map((stop, i) => ({
		...stop,
		n: i + 1,
		at: ANCHORS[stop.country],
		info: schools.find((s) => s.school.startsWith(stop.school)),
	}));
	const legs = stops.slice(1).map((stop, i) => inset(stops[i].at, stop.at, 22));

	return (
		<div className={styles.wrap}>
			<div className={styles.map}>
				<svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} role="img" aria-label="Map: Portugal, then the Netherlands, then the United Kingdom">
					<defs>
						<marker id="edu-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
							<path d="M0 0 L10 5 L0 10 Z" fill="var(--px-border)" stroke="var(--px-panel)" strokeWidth="1.5" />
						</marker>
					</defs>
					{Object.entries(COUNTRIES).map(([name, d]) => (
						<path key={name} d={d} className={name in ANCHORS ? styles.studied : styles.country} />
					))}
					{legs.map((leg, i) => {
						const d = arc(leg.from, leg.to, LEG_BOW[i]);
						return (
							<g key={d}>
								<path d={d} className={styles.legCasing} />
								<path d={d} className={styles.leg} markerEnd="url(#edu-arrow)" />
							</g>
						);
					})}
					{stops.map((s) => (
						<g key={s.country}>
							<circle cx={s.at.x} cy={s.at.y} r="15" className={styles.pin} />
							<text x={s.at.x} y={s.at.y} className={styles.pinNumber}>
								{s.n}
							</text>
						</g>
					))}
				</svg>

				{stops.map(
					(s) =>
						s.info && (
							<article
								key={s.country}
								className={`px-box ${styles.card}`}
								style={{ left: `${s.card.left}%`, top: `${s.card.top}%` }}
							>
								<span className={styles.step}>{s.n}</span>
								<h3 className={styles.degree}>{s.info.degree}</h3>
								<a href={s.info.link} target="_blank" rel="noopener noreferrer" className={styles.school}>
									{s.info.school}
								</a>
								<span className={styles.date}>{s.info.date}</span>
								<ul className={styles.summary}>
									{s.info.summary.map((line) => (
										<li key={line}>{line}</li>
									))}
								</ul>
							</article>
						),
				)}
			</div>
		</div>
	);
}
