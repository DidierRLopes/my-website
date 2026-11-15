import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./PixelSelect.module.css";

// A dropdown drawn in the site's pixel style. A native <select> opens the
// operating system's own menu, which cannot be themed.

export interface PixelOption {
	value: string;
	label: string;
	count?: number;
}

interface Props {
	value: string;
	options: PixelOption[];
	onChange: (value: string) => void;
	ariaLabel: string;
	className?: string;
}

export default function PixelSelect({ value, options, onChange, ariaLabel, className }: Props) {
	const id = useId();
	const root = useRef<HTMLDivElement>(null);
	const list = useRef<HTMLUListElement>(null);
	const [open, setOpen] = useState(false);
	const selectedIndex = Math.max(
		0,
		options.findIndex((o) => o.value === value),
	);
	const [active, setActive] = useState(selectedIndex);
	const selected = options[selectedIndex];

	useEffect(() => {
		if (!open) return;
		setActive(selectedIndex);
		const onDown = (e: PointerEvent) => {
			if (!root.current?.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener("pointerdown", onDown);
		return () => document.removeEventListener("pointerdown", onDown);
	}, [open, selectedIndex]);

	useEffect(() => {
		if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
	}, [open, active]);

	const choose = (index: number) => {
		onChange(options[index].value);
		setOpen(false);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (!open) {
			if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
				e.preventDefault();
				setOpen(true);
			}
			return;
		}
		if (e.key === "ArrowDown") setActive((i) => Math.min(options.length - 1, i + 1));
		else if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
		else if (e.key === "Home") setActive(0);
		else if (e.key === "End") setActive(options.length - 1);
		else if (e.key === "Enter" || e.key === " ") choose(active);
		else if (e.key === "Escape" || e.key === "Tab") {
			setOpen(false);
			if (e.key === "Tab") return;
		} else return;
		e.preventDefault();
	};

	return (
		<div ref={root} className={`${styles.root} ${className ?? ""}`}>
			<button
				type="button"
				className={styles.button}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={`${ariaLabel}: ${selected?.label}`}
				aria-controls={`${id}-list`}
				aria-activedescendant={open ? `${id}-${active}` : undefined}
				onClick={() => setOpen((o) => !o)}
				onKeyDown={onKeyDown}
			>
				<span className={styles.value}>{selected?.label}</span>
				{selected?.count !== undefined && <span className={styles.count}>{selected.count}</span>}
				<span className={styles.caret} aria-hidden="true" />
			</button>
			{open && (
				<ul ref={list} id={`${id}-list`} role="listbox" aria-label={ariaLabel} className={styles.list}>
					{options.map((o, i) => (
						<li
							key={o.value}
							id={`${id}-${i}`}
							data-index={i}
							role="option"
							aria-selected={o.value === value}
							className={`${styles.option} ${i === active ? styles.active : ""}`}
							onPointerEnter={() => setActive(i)}
							onClick={() => choose(i)}
						>
							<span>{o.label}</span>
							{o.count !== undefined && <span className={styles.count}>{o.count}</span>}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
