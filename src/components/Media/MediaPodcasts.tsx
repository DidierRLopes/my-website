import React from "react";
import PodcastsList from "../General/PodcastsList";

const data = [
	{
		title: "Web3 DevRel Engineer: KPIs, Blockchain Hackathons, Education",
		link: "https://www.youtube.com/watch?v=sqIPEzcMNWw",
		host: "Decentralized Voices",
		date: "2024-10-02",
		summary:
			"In this episode, I join Decentralized Voices to talk about the privileges and challenges of a DevRel career, how to measure success in a product team, educational resources for aspiring DevRels, and what it's like running DevRel Uni — an educational program helping people advance in their Developer Relations careers.",
	},
	{
		title: "DevNTell - Getting Started with Oracles & Chronicle Protocol",
		link: "https://www.youtube.com/watch?v=7FgpblK4EUI",
		host: "DevNTell",
		date: "2024-12-27",
		summary:
			"In this episode of DevNTell, I give an overview of Chronicle Protocol and oracles in general, covering key criteria to consider when selecting an oracle for your project. Chronicle is the original oracle on Ethereum — a blockchain-agnostic solution that has secured up to $22B in assets for Sky (formerly MakerDAO) and its ecosystem since 2017, and has recently opened up to the broader Web3 ecosystem.",
	},
];

export default function MediaPodcasts() {
	return <PodcastsList podcasts={data} />;
}
