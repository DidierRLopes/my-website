import Link from "@docusaurus/Link";
import React from "react";
import styles from "./SectionTabs.module.css";

// Tabs for the pages inside a top-level section, shown at the top of each of
// those pages (the site has no sidebar). The current tab is circled by hand.
// A section can instead use its page titles as the switch: the current title
// is solid and the others are faded ghosts you click to go there.

export interface Tab {
	label: string;
	to: string;
}

interface Section {
	tabs: Tab[];
	/** Show the tabs as the page title (the docs page hides its own). */
	asTitle?: boolean;
}

export const SECTIONS: Section[] = [
	{
		asTitle: true,
		tabs: [
			{ label: "Already Read", to: "/books/already-read" },
			{ label: "To Read", to: "/books/to-read" },
		],
	},
];

const clean = (path: string) => path.replace(/\/$/, "");

interface Props {
	/** The current page; picks the section whose tabs include it. */
	permalink: string;
}

export default function SectionTabs({ permalink }: Props) {
	const current = clean(permalink);
	const section = SECTIONS.find((s) => s.tabs.some((t) => clean(t.to) === current));
	if (!section) return null;
	if (section.asTitle) {
		return (
			<h1 className={styles.titleSwitch}>
				{section.tabs.map((t, i) => {
					const active = clean(t.to) === current;
					return (
						<React.Fragment key={t.to}>
							{i > 0 && (
								<span className={styles.slash} aria-hidden="true">
									/
								</span>
							)}
							{active ? (
								<span aria-current="page">{t.label}</span>
							) : (
								<Link to={t.to} className={styles.ghost}>
									{t.label}
								</Link>
							)}
						</React.Fragment>
					);
				})}
			</h1>
		);
	}
	return (
		<nav className={styles.tabs} aria-label="Section">
			{section.tabs.map((t) => {
				const active = clean(t.to) === current;
				return (
					<Link
						key={t.to}
						to={t.to}
						className={`${styles.tab} ${active ? styles.active : ""}`}
						aria-current={active ? "page" : undefined}
					>
						{t.label}
					</Link>
				);
			})}
		</nav>
	);
}
