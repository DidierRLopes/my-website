import React from "react";
import VideosList from "../General/VideosList";

const data = [
	{
		title: "From Viral Reddit Tool to Enterprise AI: The OpenBB Story with Didier Lopes | S2E2",
		description: "In this episode, Michael sits down with Didier Lopes, the founder of OpenBB, for a conversation that started five years ago during the meme stock boom. Michael reached out to Didier in 2021 after he shared his 'Gamestonk Terminal' on r/wallstreetbets. Michael reached out to Didier to ask if he was interested in a job on his team at Citadel but Didier had other ideas. That initial LinkedIn message from Michael ended up in the pitch deck that helped Didier raise nearly $9 million for his company and the rest is history.<br/><br/>Didier recounts his journey from being a software engineer who automated his personal investment research to becoming the creator of a massively popular open-source project. The Gamestonk Terminal went viral on WallStreetBets and Hacker News, gaining 4,000 GitHub stars in less than 24 hours by cleverly aggregating the free API tiers from hundreds of different data vendor and has evolved into what OpenBB is today.<br/><br/>Join us as we dive into the evolution of a viral tool into a sophisticated enterprise platform and explore the disruptive forces reshaping the financial data landscape.",
		date: "2025-08-26",
		location: "Hedgineer Podcast",
		embed: "https://www.youtube.com/embed/QeYl2Gq7mAA?si=Lmv5UUB7LYheeQoc",
		time: "1h 30m",
	},
	{
		title: "AI for Finance Summit: Rise of Multi-Agent Systems",
		description:
			"Use Case Fireside: Deploying AI in Financial Workflows with Pete Petersen (CTO and Chief Cybersecurity Officer) of Causeway Capital Management.",
		date: "2025-06-04",
		location: "NY Tech Week",
		image: "/media/ai-for-finance-summit-rise-of-multi-agent-systems.jpg",
		info: "More information on the event can be found <a href='https://partiful.com/e/eStqfkIQo7pAlpykUmYh?guest=UL3z5QaMwDO8jmR80ymI' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	
];

export default function MediaOnStage() {
	return <VideosList videos={data} />;
}
