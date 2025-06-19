import React from "react";

interface News {
	date: string;
	title: string;
	magazine: string;
	link: string;
	img?: string;
}

interface NewsMentionsListProps {
	news: News[];
}

export default function NewsMentionsList({ news }: NewsMentionsListProps) {
	return (
		<div className="mx-auto mt-8">
			{news.map((single_news) => (
				<div key={single_news.link} className="mission-container">
					<div className="mission-description">
						<div className="text-xs mb-2">
							{single_news.date} - <strong>{single_news.magazine}</strong>
						</div>
						<div className="text-base mb-3">
							{single_news.title}
						</div>
						{single_news.img && (
							<div className="my-4 flex justify-center">
								<img
									src={single_news.img}
									alt={single_news.title}
									className="max-w-sm h-auto rounded-lg"
								/>
							</div>
						)}
					</div>
					<div className="mission-buttons">
						<a
							href={single_news.link}
							rel="noopener noreferrer"
							target="_blank"
							className="mission-button mission-button--join"
						>
							Learn more
						</a>
					</div>
				</div>
			))}
		</div>
	);
}
