import React from "react";
import VideosList from "../General/VideosList";

const data = [
	{
		title: "Strengthening Oracle Security in 2026: Key Principles for Builders",
		description: "Provides builders with a practical framework to select, configure, and integrate oracles in DeFi, drawing on lessons learned to date.",
		date: "2026-04-02",
		location: "EthCC, Cannes",
		embed: "https://www.youtube.com/embed/9uXyFnPLJIs",
	},
	{
		title: "Building Secondary Markets for Onchain Real-World Assets",
		description: "In this panel, Graham Nelson (Centrifuge), Charles Jansen (S&P Global), Emilio Frangella (Aave), Amos Song (DigiFT), and Bianca Buzea (Chronicle, Moderator) examine how secondary markets for onchain RWAs can be structured to support liquidity, pricing, and credible exit.",
		date: "2026-03-28",
		location: "Stable Summit, Cannes",
		embed: "https://www.youtube.com/embed/x502G0Mg9Sg",
	},
	{
		title: "DevRel's New Dawn: Web3 Team Alchemy",
		description: "Panel with Alberto Viera and Francesco Andreoli exploring the evolving role of Developer Relations in Web3 and how teams can collaborate to drive ecosystem growth.",
		date: "2025-11-27",
		location: "sub0, Buenos Aires",
		embed: "https://www.youtube.com/embed/5ld0pJihzSc",
	},
	{
		title: "Choosing the Right Oracle: A Practical Framework",
		description: "Oracles are often overlooked despite their vital role in blockchain applications. This framework helps participants evaluate oracle types using criteria such as push vs. pull models, validator networks, decentralization, data sources, and more to make well-informed decisions.",
		date: "2025-03-01",
		location: "ETHDenver, Denver",
		embed: "https://www.youtube.com/embed/iM2r2dql6js",
	},
	{
		title: "Developer Relations: Accelerating Web3 Growth",
		description: "Panel with Emily Lin, Nader Dabit, and Jenks Guo exploring how Developer Relations is accelerating growth across the Web3 ecosystem.",
		date: "2024-03-01",
		location: "ETHDenver, Denver",
		embed: "https://www.youtube.com/embed/HmfJxgVEXAU",
	},
	{
		title: "The Role of DevRel in Shaping Developer Tooling",
		description: "Discover how we can tackle the challenges of creating developer tooling, such as navigating potential conflicts of interest between a protocol's and developer community's needs and avoiding over-reliance on a specific set of tools or technologies.",
		date: "2023-07-20",
		location: "ETHcc, Paris",
		embed: "https://www.youtube.com/embed/2Klfd6v2FfU",
	},
	{
		title: "The Power of Developer Communities",
		description: "ETHDam gathered over 500 DeFi and Privacy builders in Amsterdam. In this talk I explore how developer communities drive ecosystem growth and what it takes to build and sustain them.",
		date: "2023-05-20",
		location: "ETHDam, Amsterdam",
		embed: "https://www.youtube.com/embed/7Lvocw04Ll4",
	},
	{
		title: "The State of DevRel in Web3",
		description: "Panel exploring the role of Developer Relations in the web3 landscape — how the role has shaped the space, how it has evolved over time, and how developer communities will continue to grow. Featuring Nader Dabit, Steph Orpilla, Vitto Rivabella, and Leilani.",
		date: "2023-03-04",
		location: "ETHDenver, Denver",
		embed: "https://www.youtube.com/embed/Zg1Bb6S98IA",
	},
];

export default function MediaOnStage() {
	return <VideosList videos={data} />;
}
