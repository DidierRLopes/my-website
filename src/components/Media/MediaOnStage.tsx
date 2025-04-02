import React from "react";
import VideosList from "../General/VideosList";

const data = [
	{
		title: "PANEL DISCUSSION: Future of Data in Investing",
		description:
			"With Didier Rodrigues Lopes, Founder & CEO @ OpenBB; Richard Peterson, CEO, MarketPsych (division of London Stock Exchange); Yosef Zweibach, Chief Operating Officer of Quantic, Walleye Capital; Chris White, CEO at ViableMkts & BondCliQ and moderated by Christina Qi, CEO Databento & Founder Domeyard LP, MIT Trustee.",
		date: "2025-03-20",
		location: "Columbia Mathematics of Finance - 2025 Future of Portfolio Management & Artificial Intelligence Conference",
		image: "/media/columbia-2025-march.jpg",
		info: "More information on the event can be found <a href='https://www.rebellionresearch.com/columbia-mathematics-of-finance-mafn-2025-future-of-portfolio-management-lars-tyge-nielsen-memorial-conference' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "Autonomous Agents — The Next Step in AI Applications?",
		description:
			"Autonomous agents - AI programs that interact independently with multiple applications, LLMs or websites to complete an entire workflow – promise to be the next step in enhancing productivity in investment management. In response to an inflow into a mutual fund, for example, a group of agents might build a list of buy orders using the OMS, stage the orders to an EMS, review liquidity conditions to craft a trading strategy and send orders to the broker algorithms best suited to execute the orders, rather than requiring traders to interact with several applications. What are the challenges, risks and benefits of creating and deploying autonomous agents in the investment management enterprise?",
		date: "2025-02-24",
		location: "2025 Financial Technology Forum Winter Workshop & Automating Alpha (Ft. Lauderdale, FL)",
		image: "/media/institutional-investor-conference-2025.jpg",
		info: "More information on the event can be found <a href='https://event.institutionalinvestor.com/event/c16a1d32-6bae-42ac-b45d-f951f986fa39/summary' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "PANEL DISCUSSION: ChatGPT & The Future of AI in Finance",
		description:
			"With Professor Francesco Fabozzi, Yale University, Didier Lopes, OpenBB and Dan Joldzic, Alexandria Technology, moderated by Christos Koutsoyannis, Atlas Ridge Capital. Join leading practitioners for a discussion on the practical applications of unstructured data in quant trading. This session will address the opportunities and nuances of deploying these models, including data sourcing, processing, and integration.",
		date: "2025-02-12",
		location: "Eagle Alpha's New York Alternative Data Conference 2025",
		image: "/media/eagle-alpha-conference-2025.jpg",
		info: "More information on the event can be found <a href='https://www.eaglealpha.com/2024/05/12/alt-data-conference-february-2025/' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "PANEL DISCUSSION: The Opportunities And Nuances of Deploying Unstructured Data In Quant Trading Models",
		description:
			"Yu Yu - Director of Data Science at BlackRock, Tony Berkman - Managing Director at Two Sigma, Samson Qian - Citadel, Didier Rodrigues Lopes - Founder and CEO @ OpenBB",
		date: "2024-09-14",
		location: "Cornell Financial Engineering Manhattan - 2024 Future of Finance & AI Conference",
		image: "/media/chatgpt-the-future-of-ai-in-finance.jpg",
		info: "A blogpost about the talk can be found <a href='https://didierlopes.com/blog/chatgpt-and-the-future-of-ai-in-finance' target='_blank' rel='noopener noreferrer'>here</a>. More information on the event can be found <a href='https://www.rebellionresearch.com/cornell-financial-engineering-manhattan-rebellion-research-2024-future-of-finance-conference' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title:
			"Incorporating an open-source AI financial analyst into a financial terminal",
		description:
			"In this talk, Didier Lopes, founder and CEO of OpenBB will talk about how the open source OpenBB Platform standardizes and aggregates access to financial data. He will also talk about how the team has open source an AI financial analyst that leverages the OpenBB platform and datasets from dozens of different data vendors. Finally, Didier will go over why financial terminals should enable users to bring their own custom agents and how the OpenBB Terminal Pro enables users to do this.",
		date: "2024-08-07",
		location: "CIBC New York",
		image:
			"/media/incorporating-an-open-source-ai-financial-analyst-into-a-financial-terminal.png",
		info: 'The 15min presentation can be seen in Mindstone content <a href="https://app.mindstone.com/annotate/article_Akn6C4queFqPoWMeTB" target="_blank" rel="noopener noreferrer">here</a>.',
	},
	{
		title: "AI x Wall Street Night",
		description:
			"Discover how traditional Wall Street firms are adapting to technological transformations with cutting-edge applications. This event goes beyond traditional panel discussions, focusing on real-time demonstrations of what's achievable today with AI in finance: The first AI-Powered Financial Terminal - Watch how efficient analysts can perform research in 2024 using generative AI.",
		date: "2024-05-22",
		location: "Tower Research Ventures",
		image: "/media/ai-x-wall-street-night.jpeg",
		info: "<p>The OpenBB demo at the event has been pre-recorded <a href='https://www.youtube.com/watch?v=Uj_wpLC-Zho' target='_blank' rel='noopener noreferrer'>here</a>. More information on the event can be found <a href='https://tower-research.com/trv-ai-x-wall-street-event/' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "Python Uses in Quant Finance and Entrepreneurships",
		description:
			"Didier R. Lopes, co-founder and CEO of OpenBB, and Jason Strimpel, founder of PyQuant News, discuss the areas of Python that are most important for financial services professionals. In this session, discover how Python can help new firms and what you should consider learning to improve your career.",
		date: "2024-03-07",
		location: "CFA Society New York",
		image: "/media/python-uses-in-quant-finance-and-entrepreneurships.jpeg",
		info: '<p>More information can be found <a href="https://cfany.org/event/python-uses-in-quant-finance-and-entrepreneurships/" target="_blank" rel="noopener noreferrer">here</a>.',
	},
	{
		title: "Creating an AI-Powered Financial Analyst with OpenBB",
		embed: "https://www.youtube.com/embed/A-43EKK2PhE?si=fOuAbg42uEoieBNv",
		description:
			"In this session, we will go over how analysts and quants can build their own AI-powered financial analysts using AI and open source. This will rely on building an agent, in Python, that can access 500+ data endpoints through the OpenBB platform.",
		date: "2023-12-07",
		location: "Open Core Summit",
		time: "24 minutes",
	},
	{
		title: "The new FinAI Tech Stack - OpenBB Terminal Pro",
		embed: "https://www.youtube.com/embed/V1rYmWWVbIY?si=ahxTpjkwQibGqwLq",
		description:
			'Didier Lopes, CEO of OpenBB, presented the OpenBB Platform and the OpenBB Terminal Pro at the event "The new FinAI Tech Stack" hosted by MindsDB in SF, California.',
		date: "2023-12-05",
		location: "MindsDB",
		time: "22 minutes",
	},
	{
		title:
			"TimeGPT Launch | Didier Lopes, OpenBB: Democratizing Quantitative Finance",
		embed: "https://www.youtube.com/embed/W3CTkaEGOiM?si=LHOHE1AJcFLgK4I4",
		description:
			"Didier Lopes, CEO and Co-Founder of OpenBB, he explores how his company is democratizing the world of Quantitative Finance. Don't miss out on a live code demonstration showing the integration of TimeGPT by Nixtla into the OpenBB terminal to predict stock prices.",
		date: "2023-09-06",
		location: "MindsDB",
		time: "13 minutes",
	},
	{
		title: "Revolutionizing the financial industry through Python",
		embed: "https://www.youtube.com/embed/z52SYR7-Rm4?si=OHDdjnuc5D9erIit",
		description:
			"Didier talks about his journey from the pain points of doing investment research to starting his own investment research platform in Python and raising $8.8M to democratize investment research through open source. He will introduce the OpenBB Terminal - the famous open source investment research platform, and some of its functionalities. In addition, he will present the OpenBB SDK which allows devs to build products on OpenBB.",
		date: "2023-06-14",
		location: "SF Python @ GGU",
		time: "32 minutes",
	},
	{
		title: "How to grow your open-source community from scratch",
		embed: "https://www.youtube.com/embed/kgA3uv5h9Fk",
		description:
			"Learn how to grow your open-source community from scratch. This presentation was done during the Web Summit 2022.",
		date: "2022-11-09",
		location: "Web Summit",
		time: "3 minutes",
	},
	{
		title: "Why Proprietary Investment Research Platforms won't Last",
		embed: "https://www.youtube.com/embed/Sn-SAEzGtPc",
		description:
			"Today's investment research platforms are proprietary, expensive, come bundled with a full suite of services, and do not offer a custom solution to fit your business's needs. OpenBB Terminal offers the first open source, fully customisable investment research platform that your company can tailor to their own needs, all built off of GitHub's top investment research platform.",
		date: "2022-07-19",
		location: "Open Source in Finance Forum",
		time: "29 minutes",
	},
];

export default function MediaOnStage() {
	return <VideosList videos={data} />;
}
