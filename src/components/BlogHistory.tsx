import React from "react";
import {
	Bar,
	BarChart,
	Cell,
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

	// Group posts by month and aggregate content size
	const groupedPosts = posts.reduce((acc, post) => {
		const date = new Date(post.date_modified);
		const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		if (!acc[monthKey]) {
			acc[monthKey] = { month: monthKey, totalSize: 0, posts: [] };
		}
		acc[monthKey].totalSize += post.content_html.length / 1024; // Convert to KB
		acc[monthKey].posts.push({
			title: post.title,
			contentSize: post.content_html.length / 1024,
		});
		return acc;
	}, {} as { [key: string]: { month: string; totalSize: number; posts: { title: string; contentSize: number }[] } });

	// Create data for the chart
	const data = Object.values(groupedPosts).sort((a, b) => a.month.localeCompare(b.month));

	return (
		<div style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<BarChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<XAxis dataKey="month" />
					<YAxis
						label={{
							value: "Total Content Size (KB)",
							angle: -90,
							position: "insideLeft",
						}}
					/>
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload[0]) {
								const data = payload[0].payload;
								return (
									<div
										className="custom-tooltip"
										style={{
											backgroundColor: "white",
											padding: "10px",
											border: "1px solid #ccc",
										}}
									>
										<p>{`Month: ${data.month}`}</p>
										<p>{`Total Content Size: ${data.totalSize.toFixed(2)} KB`}</p>
										{data.posts.map((post: { title: string; contentSize: number }) => (
											<div key={post.title}>
												<p>{`Title: ${post.title}`}</p>
												<p>{`Content Size: ${post.contentSize.toFixed(2)} KB`}</p>
											</div>
										))}
									</div>
								);
							}
							return null;
						}}
					/>
					<Bar dataKey="totalSize" name="Total Content Size">
						{data.map((entry, index) => (
							<Cell
								key={`cell-${entry.month}`}
								fill={`hsl(${(index * 360) / data.length}, 70%, 50%)`}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
