import React from "react";
import {
	Bar,
	BarChart,
	Legend,
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
	isDesktop: boolean;
}

export default function BlogHistory({ posts = [], isDesktop }: BlogHistoryProps) {
	// Add early return if no posts
	if (!posts || posts.length === 0) {
		return <div>No blog posts available</div>;
	}

	// Sort posts by date
	const sortedPosts = [...posts].sort(
		(a, b) =>
			new Date(a.date_modified).getTime() - new Date(b.date_modified).getTime(),
	);

	// Get the start and end dates for the chart
	const startDate = new Date(sortedPosts[0].date_modified);
	const endDate = new Date(sortedPosts[sortedPosts.length - 1].date_modified);

	// Generate an array of months
	const generateMonths = (start: Date, end: Date) => {
		const months: Date[] = [];
		const currentDate = new Date(start);
		currentDate.setDate(1); // Start from the beginning of the month

		while (currentDate <= end) {
			months.push(new Date(currentDate));
			currentDate.setMonth(currentDate.getMonth() + 1);
		}

		return months;
	};

	const months = generateMonths(startDate, endDate);

	const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
	const [isHoveringBar, setIsHoveringBar] = React.useState(false);
	const [tooltipOpacity, setTooltipOpacity] = React.useState(0);

	const getOptimalInterval = (months: Date[]) => {
		const totalMonths = months.length;
		
		// Determine desired number of labels based on screen size
		let targetLabels = isDesktop ? 6 : 3;
		
		// Calculate interval that would give us roughly the desired number of labels
		let interval = Math.max(1, Math.floor(totalMonths / targetLabels));
		
		return interval;
	};

	// Modify the monthlyData generation
	const monthlyData = months.map((monthStart, index) => {
		const monthEnd = new Date(monthStart);
		monthEnd.setMonth(monthEnd.getMonth() + 1);
		monthEnd.setDate(0);

		const postsInMonth = sortedPosts.filter((post) => {
			const postDate = new Date(post.date_modified);
			return postDate >= monthStart && postDate <= monthEnd;
		});

		const interval = getOptimalInterval(months);
		const showLabel = index === 0 || 
			index === months.length - 1 || 
			index % interval === 0;

		// Create an object with individual post sizes
		const postSizes = postsInMonth.reduce(
			(acc: { [key: string]: number }, post, idx) => {
				// Parse the HTML content
				const parser = new DOMParser();
				const doc = parser.parseFromString(post.content_html, 'text/html');
				
				// Select all text nodes, excluding those within <code>, <pre>, and <img> tags
				const textNodes = Array.from(doc.body.childNodes).filter(node => 
					node.nodeType === Node.TEXT_NODE || 
					(node.nodeType === Node.ELEMENT_NODE && 
					!['CODE', 'PRE', 'IMG'].includes(node.nodeName))
				);
				
				// Calculate the total length of text content
				const textContent = textNodes.reduce((text, node) => 
					text + (node.textContent || ''), ''
				);
				
				// Store the size in KB
				acc[`post${idx + 1}`] = textContent.length / 1024;
				return acc;
			},
			{},
		);

		return {
			month: monthStart.toISOString().substring(0, 7),
			monthDisplay: monthStart.toLocaleDateString(undefined, {
				year: "numeric",
				month: "short",
			}),
			showLabel, // This property is already being set based on getOptimalInterval
			posts: postsInMonth,
			...postSizes,
		};
	});

	const maxVolume = Math.max(
		...monthlyData.flatMap((data) =>
			Object.entries(data)
				.filter(([key]) => key.startsWith("post"))
				.map(([_, value]) => (typeof value === "number" ? value : 0)),
		),
	);

	// Generate colors for different posts
	const getPostColor = (index: number) => {
		const colors = ["#0088CC", "#00AAFF", "#33BBFF", "#66CCFF", "#99DDFF"];
		return colors[index % colors.length];
	};

	// Get maximum number of posts in any month
	const maxPosts = Math.max(...monthlyData.map((data) => data.posts.length));

	return (
		<div style={{ width: "100%", height: isDesktop ? 400 : 300 }}>
			<ResponsiveContainer>
				<BarChart
					data={monthlyData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					onMouseLeave={() => {
						if (isDesktop) {
							setActiveIndex(null);
							setIsHoveringBar(false);
						}
					}}
				>
					<XAxis
						dataKey="monthDisplay"
						type="category"
						interval={(index) => {
							return monthlyData[index].showLabel;
						}}
						height={60}
						tick={{ fontSize: 14 }}
					/>
					<YAxis
						label={{
							value: "Words",
							angle: -90,
							position: "insideLeft",
							offset: -1,
							style: {
								textAnchor: "middle",
								fontSize: 14,
							},
						}}
						tick={false}
						width={30}
						domain={[0, Math.ceil(maxVolume)]}
					/>
					{isDesktop && (
						<Tooltip
							cursor={{ fill: "rgba(0, 0, 0, 0)" }}
							content={({ active, payload, label }) => {
								if (
									active &&
									payload &&
									payload.length &&
									activeIndex !== null &&
									isHoveringBar
								) {
									const data = payload[0].payload;
									const postIndex = activeIndex;
									const post = data.posts[postIndex];

									if (!post) return null;

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
												opacity: tooltipOpacity,
												transition: "all 1s ease-in-out",
												transform: `translateY(${tooltipOpacity ? "0" : "10px"})`,
											}}
										>
											<div
												style={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													marginBottom: "6px",
												}}
											>
												<p
													style={{
														fontSize: "0.8em",
														fontWeight: "normal",
														color: "#000000",
														margin: 0,
														textAlign: "left",
													}}
												>
													{new Date(post.date_modified).toLocaleDateString(
														undefined,
														{
															year: "numeric",
															month: "long",
															day: "numeric",
														},
													)}
												</p>
												<p
													style={{
														fontSize: "0.9em",
														color: "#666",
														fontStyle: "italic",
														margin: 0,
													}}
												>
													(click bar to view post)
												</p>
											</div>
											<p
												style={{
													fontSize: "1em",
													fontWeight: "bold",
													color: payload[0].color,
													marginBottom: "6px",
													textAlign: "left",
												}}
											>
												{post.title}
											</p>
											<div style={{ display: "flex", alignItems: "flex-start" }}>
												<div
													className="flex items-center justify-center mr-4"
													style={{
														width: "100px",
														height: "100px",
														flexShrink: 0,
														backgroundColor: "#f0f0f0",
													}}
												>
													<img
														className="rounded-xl w-full h-full"
														src={
															post.content_html.match(
																/<img.*?src="(.*?)"/,
															)?.[1] || ""
														}
														alt={post.title}
														style={{
															objectFit: "cover",
															width: "100px",
															height: "100px",
														}}
													/>
												</div>
												<p
													style={{
														fontSize: "0.9em",
														color: "#000",
														fontStyle: "italic",
														marginBottom: "12px",
														textAlign: "left",
														flex: 1,
													}}
												>
													{post.summary}
												</p>
											</div>
										</div>
									);
								}
								return null;
							}}
						/>
					)}
					{Array.from({ length: maxPosts }, (_, i) => (
						<Bar
							key={`post${i + 1}`}
							dataKey={`post${i + 1}`}
							stackId="posts"
							fill={getPostColor(i)}
							name={`Post ${i + 1}`}
							onMouseOver={(_, index) => {
								if (isDesktop) {
									setActiveIndex(i);
									setIsHoveringBar(true);
									setTooltipOpacity(1); // Fade in
								}
							}}
							onMouseLeave={() => {
								if (isDesktop) {
									setIsHoveringBar(false);
									setTooltipOpacity(0); // Fade out
								}
							}}
							onClick={(entry, index) => {
								if (isDesktop && entry && monthlyData[index].posts[i]) {
									window.open(monthlyData[index].posts[i].url, "_blank");
								}
							}}
							style={{
								cursor: isDesktop ? "pointer" : "default",
								transition: "fill 0.3s ease",
							}}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
