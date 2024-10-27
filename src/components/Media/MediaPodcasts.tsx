import React from "react";
import PodcastsList from "../General/PodcastsList";

const data = [
	{
		title: "To the Moon: OpenBB with Didier Lopes",
		link: "https://www.contributor.fyi/openbb",
		host: "Scale Venture Partners - Eric Anderson",
		date: "2024-03-13",
		summary:
			"OpenBB is an open-source investment research platform created by Didier Lopes (@didier_lopes). OpenBB grew out of a project called Gamestonk Terminal that Didier began working on shortly before the Gamestop short squeeze in January 2021. Today, OpenBB has evolved into an infrastructure platform that allows users to build extensions and access financial data with automation and customization.",
	},
	{
		title:
			"From 4,000 GitHub Stars to a Successful - Open Source Business with Didier Lopes of OpenBB",
		link: "https://www.emilyomier.com/podcast/didier-lopes",
		host: "Open Source Business - Emily Omier",
		date: "2024-01-03",
		summary:
			"Didier Lopes, Co-founder and CEO of OpenBB, joins me to share the story of how OpenBB went from receiving 4000 GitHub stars in the first 24 hours of the project to a fully funded company launching new monetization initiatives. Didier and I chat about his background, what led him to start OpenBB in his spare time, and his vision for the company's future. He shares the story of teaming up with his co-founder, why he loves working in the open source ecosystem, and how his team continues contributing to OpenBB's success.",
	},
	{
		title: "Interview with Didier Lopes: CEO and Founder, OpenBB",
		link: "https://www.flagsmith.com/podcast/openbb",
		host: "Flagsmith",
		date: "2023-11-28",
		summary:
			"OpenBB stands at the crossroads of innovation, uniting open-source spirit with financial prowess to empower every individual. In this episode of our podcast, Didier Lopes discusses OpenBB, a revolutionary platform aiming to democratize access to financial data. From its inception to its evolution into a versatile financial data hub, Didier shows how OpenBB thrives as a bridge connecting financial data for everyone. Join us as we explore the potential future directions for OpenBB, envisioning an ecosystem where financial data is seamlessly accessible, customized, and affordable for all types of users. Tune in now!",
	},
	{
		title:
			"Making Investment Data Easy To Access And Analyze With The OpenBB Terminal",
		link: "https://www.pythonpodcast.com/openbb-terminal-investment-data-framework-episode-363/",
		host: "Podcast.__init__",
		date: "2022-05-10",
		summary:
			"Investing effectively is largely a game of information access and analysis. This can involve a substantial amount of research and time spent on finding, validating, and acquiring different information sources. In order to reduce the barrier to entry and provide a powerful framework for amateur and professional investors alike Didier Rodrigues Lopes created the OpenBB Terminal. In this episode he explains how a pandemic project that started as an experiment has led to him founding a new company and dedicating his time to growing and improving the project and its community.",
	},
];

export default function MediaPodcasts() {
	return <PodcastsList podcasts={data} />;
}
