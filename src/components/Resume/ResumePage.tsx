import Head from "@docusaurus/Head";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { articles, education, experience } from "./data";
import EducationMap from "./EducationMap";
import styles from "./ResumePage.module.css";

// The resume is one page in three sections. Each section has its own URL
// (/resume/experience, /resume/articles, /resume/education): opening one
// scrolls to it, and the URL and the sidebar follow the reader's scroll.

export const RESUME_SECTIONS = [
	{ id: "experience", label: "Experience" },
	{ id: "articles", label: "Articles" },
	{ id: "education", label: "Education" },
] as const;

export type ResumeSectionId = (typeof RESUME_SECTIONS)[number]["id"];

const pathOf = (id: ResumeSectionId) => `/resume/${id}`;

const markdownLinks = {
	a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
		<a href={href} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	),
};

// The section whose heading has passed the top of the viewport.
function useScrolledSection(initial: ResumeSectionId): ResumeSectionId {
	const [active, setActive] = useState<ResumeSectionId>(initial);
	useEffect(() => {
		const onScroll = () => {
			const line = 140;
			let current: ResumeSectionId = RESUME_SECTIONS[0].id;
			for (const s of RESUME_SECTIONS) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= line) current = s.id;
			}
			const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
			if (atBottom) current = RESUME_SECTIONS[RESUME_SECTIONS.length - 1].id;
			setActive(current);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return active;
}

export default function ResumePage({ section }: { section: ResumeSectionId }) {
	const active = useScrolledSection(section);

	// Land on the section the URL names.
	useEffect(() => {
		if (section !== RESUME_SECTIONS[0].id) document.getElementById(section)?.scrollIntoView();
	}, [section]);

	// Keep the address bar on the section being read, without a navigation.
	useEffect(() => {
		const path = pathOf(active);
		if (window.location.pathname.replace(/\/$/, "") !== path) {
			window.history.replaceState(window.history.state, "", path + window.location.search);
		}
	}, [active]);

	const label = RESUME_SECTIONS.find((s) => s.id === active)!.label;

	return (
		<main className={styles.page}>
			<Head>
				<title>{`${label} - Resume | Didier`}</title>
			</Head>
			<nav className={styles.sidebar} aria-label="Resume sections">
				<ul>
					{RESUME_SECTIONS.map((s) => (
						<li key={s.id}>
							<a
								href={pathOf(s.id)}
								className={`${styles.navItem} ${s.id === active ? styles.navActive : ""}`}
								aria-current={s.id === active ? "location" : undefined}
								onClick={(e) => {
									e.preventDefault();
									document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
								}}
							>
								{s.label}
							</a>
						</li>
					))}
				</ul>
			</nav>

			<div className={styles.content}>
				<h1 className={styles.title}>Resume</h1>

				<section id="experience" className={styles.section}>
					<h2 className={styles.sectionTitle}>Experience</h2>
					{experience.map((role) => (
						<div key={`${role.company}-${role.title}`} className={styles.role}>
							<h3 className={styles.roleTitle}>
								{role.title}{" "}
								<span className={styles.at}>
									at{" "}
									<a href={role.link} target="_blank" rel="noopener noreferrer">
										{role.company}
									</a>
								</span>
							</h3>
							<p className={styles.when}>{role.daterange}</p>
							<div className={styles.prose}>
								<ReactMarkdown components={markdownLinks}>{role.summary}</ReactMarkdown>
							</div>
						</div>
					))}
				</section>

				<section id="articles" className={styles.section}>
					<h2 className={styles.sectionTitle}>Articles</h2>
					<ul className={styles.articles}>
						{articles.map((a) => (
							<li key={a.link}>
								<a href={a.link} target="_blank" rel="noopener noreferrer">
									{a.title}
								</a>
								<span className={styles.venue}>{a.conference}</span>
							</li>
						))}
					</ul>
				</section>

				<section id="education" className={styles.section}>
					<h2 className={styles.sectionTitle}>Education</h2>
					<EducationMap schools={education} />
				</section>
			</div>
		</main>
	);
}
