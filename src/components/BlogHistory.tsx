import React from "react";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

// Add interface for post type
interface Post {
	id: string;
	content_html: string;
	url: string;
	title: string;
	summary: string;
	date_modified: string;
	tags: string[];
}

interface BlogHistoryProps {
	posts?: Post[];
}

export default function BlogHistory({ posts = [] }: BlogHistoryProps) {
	// Add early return if no posts
	if (!posts || posts.length === 0) {
		return <div>No blog posts available</div>;
	}

	// Sort posts by date
	const sortedPosts = [...posts].sort(
		(a, b) =>
			new Date(a.date_modified).getTime() - new Date(b.date_modified).getTime(),
	);

	// Prepare data for the chart
	const data = sortedPosts.map((post) => ({
		date: new Date(post.date_modified),
		title: post.title,
		summary: post.summary,
		contentSize: post.content_html.length / 1024,
		url: post.url,
		content_html: post.content_html,
	}));

	const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

	const handleBarClick = (entry: any, index: number) => {
		if (entry.url) {
			window.open(entry.url, "_blank");
		}
	};

	const getColor = (date: Date) => {
		// Calculate percentage through year (0 to 1)
		const startOfYear = new Date(date.getFullYear(), 0, 1);
		const endOfYear = new Date(date.getFullYear() + 1, 0, 1);
		const percentage =
			(date.getTime() - startOfYear.getTime()) /
			(endOfYear.getTime() - startOfYear.getTime());

		// Convert hex to RGB
		const startColor = {
			r: 0x99,
			g: 0xdd,
			b: 0xff,
		};

		const endColor = {
			r: 0x00,
			g: 0x66,
			b: 0x99,
		};

		// Interpolate between colors
		const r = Math.round(
			startColor.r + (endColor.r - startColor.r) * percentage,
		);
		const g = Math.round(
			startColor.g + (endColor.g - startColor.g) * percentage,
		);
		const b = Math.round(
			startColor.b + (endColor.b - startColor.b) * percentage,
		);

		return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
	};

	return (
		<div style={{ width: "100%", height: 400 }}>
			<ResponsiveContainer>
				<BarChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					onMouseLeave={() => setActiveIndex(null)}
				>
					<XAxis
						dataKey="date"
						tickFormatter={(date) =>
							date.toLocaleDateString(undefined, {
								month: "short",
								year: "numeric",
							})
						}
						type="category"
						domain={["dataMin", "dataMax"]}
					/>
					<Tooltip
						content={({ active, payload, label }) => {
							if (active && payload && payload.length) {
								const data = payload[0].payload;
								return (
									<div
										className="custom-tooltip"
										style={{
											backgroundColor: "rgba(255, 255, 255, 0.9)",
											padding: "12px",
											border: "1px solid rgba(204, 204, 204, 0.8)",
											backdropFilter: "blur(5px)",
											borderRadius: "8px",
											boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
											width: "600px",
										}}
									>
										<div style={{ display: "flex", alignItems: "center" }}>
											<div
												className="flex items-center justify-center mr-4"
												style={{
                          width: "100px",
                          height: "100px",
                          flexShrink: 0,
                          backgroundColor: "#f0f0f0"
                        }}
											>
												<img
													className="rounded-xl w-full h-full"
													src={data.content_html.match(/<img.*?src="(.*?)"/)[1]}
													alt={data.title}
													style={{
														objectFit: "cover",
                            width: "100px",
                            height: "100px"
													}}
												/>
											</div>
											<div>
												<p
													style={{
														fontSize: "1.1em",
														fontWeight: "normal",
														color: "#000000",
														marginBottom: "8px",
														textAlign: "left",
													}}
												>
													{data.date.toLocaleDateString(undefined, {
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</p>
												<p
													style={{
														fontSize: "1.2em",
														fontWeight: "bold",
														color: payload[0].color,
														marginBottom: "8px",
														textAlign: "left",
													}}
												>
													{data.title}
												</p>
												<p
													style={{
														fontSize: "0.9em",
														color: "#000",
														fontStyle: "italic",
														marginBottom: "12px",
														textAlign: "left",
													}}
												>
													{data.summary}
												</p>
												<p
													style={{
														fontSize: "0.9em",
														color: "#666",
														fontStyle: "italic",
													}}
												>
													(click bar to view post)
												</p>
											</div>
										</div>
									</div>
								);
							}
							return null;
						}}
					/>
					<Bar
						dataKey="contentSize"
						fill="#0088CC"
						isAnimationActive={false}
						onMouseEnter={(_, index) => setActiveIndex(index)}
						onClick={(entry, index) => handleBarClick(entry, index)}
						style={{
							cursor: "pointer",
							transition: "fill 0.3s ease",
						}}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
