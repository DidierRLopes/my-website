import React from "react";
import NewsMentionsList from "../General/NewsList";

const data = [
	{
		title:
			"Fintech OpenBB aims to be more than an 'open source Bloomberg Terminal'",
		link: "https://techcrunch.com/2024/10/07/fintech-openbb-aims-to-be-more-than-an-open-source-bloomberg-terminal/",
		magazine: "TechCrunch",
		date: "2024-10-08",
		img: "/media/tech-crunch-2024-october.png",
	},
	{
		title:"OpenBB: I am Not Uncertain",
		link: "https://ted-merz.com/2024/03/07/openbb-i-am-not-uncertain/",
		magazine: "Ted Merz",
		date: "2024-03-24",
	},
	{
		title:
			"OpenBB Releases Its Second Generation Open Source Investment Research Platform With a Software Development Kit (SDK) and an AI/ML Toolkit",
		link: "https://www.newswire.com/news/openbb-releases-its-second-generation-open-source-investment-research-21885626",
		magazine: "Newswire",
		date: "2022-11-29",
	},
	{
		title: "OpenBB wants to be an open source challenger to Bloomberg Terminal",
		link: "https://venturebeat.com/data-infrastructure/openbb-wants-to-be-an-open-source-challenger-to-bloomberg-terminal/",
		magazine: "Venture Beat",
		date: "2022-03-30",
		img: "/media/venture-beats-2022-march.png",
	},
	{
		title:
			"Gamestonk Terminal Is a DIY, Meme Stock Version of Bloomberg Terminal",
		link: "https://www.vice.com/en/article/qjp9vp/gamestonk-terminal-is-a-diy-meme-stock-version-of-bloomberg-terminal",
		magazine: "VICE Magazine",
		date: "2021-03-01",
		img: "/media/vice-magazine-2021-march.png",
	},
];

export default function NewsMentions() {
	return <NewsMentionsList news={data} />;
}
