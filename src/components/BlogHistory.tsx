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

	const getOptimalInterval = (months: Date[]) => {
		const totalMonths = months.length;

		// Aim to show roughly 6-8 labels on the axis
		if (totalMonths <= 8) return 1; // Show all labels if 8 or fewer months
		if (totalMonths <= 16) return 2; // Every 2 months if <= 16 months
		if (totalMonths <= 24) return 3; // Every quarter if <= 2 years
		if (totalMonths <= 48) return 6; // Every 6 months if <= 4 years
		return 12; // Every year for longer periods
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
		const showLabel = index % interval === 0;

		// Create an object with individual post sizes
		const postSizes = postsInMonth.reduce(
			(acc: { [key: string]: number }, post, idx) => {
				acc[`post${idx + 1}`] = post.content_html.length / 1024;
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
			showLabel,
			posts: postsInMonth,
			...postSizes, // Spread individual post sizes
		};
	});

	// Generate colors for different posts
	const getPostColor = (index: number) => {
		const colors = ["#0088CC", "#00AAFF", "#33BBFF", "#66CCFF", "#99DDFF"];
		return colors[index % colors.length];
	};

	// Get maximum number of posts in any month
	const maxPosts = Math.max(...monthlyData.map((data) => data.posts.length));

	return (
		<div style={{ width: "100%", height: 400 }}>
			<ResponsiveContainer>
				<BarChart
					data={monthlyData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
					onMouseLeave={() => {
						setActiveIndex(null);
						setIsHoveringBar(false);
					}}
				>
					<XAxis
						dataKey="monthDisplay"
						type="category"
						interval={0}
						angle={-45}
						textAnchor="end"
						height={60}
					/>
					<YAxis />
					<Tooltip
						cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
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
										}}
									>
										<div style={{ display: "flex", alignItems: "center" }}>
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
														fontSize: "1.2em",
														fontWeight: "bold",
														color: payload[0].color,
														marginBottom: "8px",
														textAlign: "left",
													}}
												>
													{post.title}
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
													{post.summary}
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
					{Array.from({ length: maxPosts }, (_, i) => (
						<Bar
							key={`post${i + 1}`}
							dataKey={`post${i + 1}`}
							stackId="posts"
							fill={getPostColor(i)}
							name={`Post ${i + 1}`}
							onMouseOver={(_, index) => {
								setActiveIndex(i);
								setIsHoveringBar(true);
							}}
							onMouseLeave={() => {
								setIsHoveringBar(false);
							}}
							onClick={(entry, index) => {
								if (entry && monthlyData[index].posts[i]) {
									window.open(monthlyData[index].posts[i].url, "_blank");
								}
							}}
							style={{
								cursor: "pointer",
								transition: "fill 0.3s ease",
							}}
						/>
					))}
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
