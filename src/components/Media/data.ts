// Media appearances, rendered by MediaTV. One array per section.

export interface MediaItem {
	title: string;
	date: string;
	description?: string;
	embed?: string;
	image?: string;
	time?: string;
	location?: string;
	info?: string;
	link?: string;
	host?: string;
	summary?: string;
	magazine?: string;
	img?: string;
}

export const onStage: MediaItem[] = [
	{
		title: "Entrepreneurship in Quant Finance",
		description: "Also presented 'What it takes to build an AI financial workspace from zero'.",
		date: "2026-04-10",
		location: "Quaint Quant Conference - SMU Cox School of Business in Dallas, Texas",
		image: "/media/quaintconference.jpg",
		info: "More information on the event can be found <a href='https://www.quaintquantconference.com/' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "APIs for Analytics & MCP for Point-in-Time Data",
		description:
			"The MCP hype suggests every data request should go through tool calls. But not all queries are equal - rich, multi-dimensional analytics and lightweight point-in-time lookups have fundamentally different needs, and treating them the same leads to brittle agents and poor user experiences. In this lightning talk, Didier Lopes (Founder & CEO, OpenBB) shows how OpenBB draws this line from their financial workspace: Routing heavy analytical workloads through API and point-in-time data queries through MCP. In the end, you'll see how both can be first-class citizens in your financial workspace.",
		date: "2026-04-02",
		location: "MCP in the Wild: The Future of Data Agents in Production (NYC)",
		image: "/media/mcp-in-the-wild.jpg",
		info: "More information on the event can be found <a href='https://luma.com/e1y4c9jv' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "Fragmentation Kills Alpha",
		description:
			"Markets have commoditized data, speed, and models. The remaining edge lives in how you connect them. This talk introduces the new alpha loop, Data x AI x Context, and what it takes to build a system where insights compound.",
		date: "2026-03-31",
		location: "Future Alpha",
		image: "/media/future-alpha.jpg",
		info: "More information on the event can be found <a href='https://www.alphaevents.com/events-futurealphaglobal' target='_blank' rel='noopener noreferrer'>here</a>.",
	},
	{
		title: "Quant Dev & Applied AI",
		description:
			"Didier will demonstrate how firms can integrate MCP servers into their Workspace and gain full transparency into data and tool usage. But also by sharing how the MCP tools can be converted into visual widgets that analysts can interact with.<br/><br/>Future of Quant Development in the Age of AI & AI Agents panel.",
		date: "2025-09-25",
		location: "Guidepoint HQ",
		image: "/media/fintech-dev-night.jpg",
		info: "More information on the event can be found <a href='https://fintech-dev-night.com/quant-devnight-nyc/' target='_blank' rel='noopener noreferrer'>here</a>.",
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
	{
		title: "PANEL DISCUSSION: Future of Data in Investing",
		description:
			"With Didier Rodrigues Lopes, Founder & CEO @ OpenBB; Richard Peterson, CEO, MarketPsych (division of London Stock Exchange); Yosef Zweibach, Chief Operating Officer of Quantic, Walleye Capital; Chris White, CEO at ViableMkts & BondCliQ and moderated by Christina Qi, CEO Databento & Founder Domeyard LP, MIT Trustee.",
		date: "2025-03-20",
		location:
			"Columbia Mathematics of Finance - 2025 Future of Portfolio Management & Artificial Intelligence Conference",
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
		title: "Incorporating an open-source AI financial analyst into a financial terminal",
		description:
			"In this talk, Didier Lopes, founder and CEO of OpenBB will talk about how the open source OpenBB Platform standardizes and aggregates access to financial data. He will also talk about how the team has open source an AI financial analyst that leverages the OpenBB platform and datasets from dozens of different data vendors. Finally, Didier will go over why financial terminals should enable users to bring their own custom agents and how the OpenBB Terminal Pro enables users to do this.",
		date: "2024-08-07",
		location: "CIBC New York",
		image: "/media/incorporating-an-open-source-ai-financial-analyst-into-a-financial-terminal.webp",
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
		title: "TimeGPT Launch | Didier Lopes, OpenBB: Democratizing Quantitative Finance",
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

export const newsCoverage: MediaItem[] = [
	{
		title: "2024 Best New Quant Research & Analytics Product",
		link: "https://www.rebellionresearch.com/2024-best-new-quant-research-analytics-product",
		magazine: "Rebellion Research",
		date: "2024-12-30",
		img: "/media/rebellion-research-2024-december.webp",
	},
	{
		title: "Fintech OpenBB aims to be more than an 'open source Bloomberg Terminal'",
		link: "https://techcrunch.com/2024/10/07/fintech-openbb-aims-to-be-more-than-an-open-source-bloomberg-terminal/",
		magazine: "TechCrunch",
		date: "2024-10-08",
		img: "/media/tech-crunch-2024-october.webp",
	},
	{
		title: "OpenBB: I am Not Uncertain",
		link: "https://ted-merz.com/2024/03/07/openbb-i-am-not-uncertain/",
		magazine: "Ted Merz",
		date: "2024-03-24",
		img: "/media/ted-merz-2024-march.webp",
	},
	{
		title:
			"OpenBB Releases Its Second Generation Open Source Investment Research Platform With a Software Development Kit (SDK) and an AI/ML Toolkit",
		link: "https://www.newswire.com/news/openbb-releases-its-second-generation-open-source-investment-research-21885626",
		magazine: "Newswire",
		date: "2022-11-29",
		img: "/media/newswire-2022-november.webp",
	},
	{
		title: "OpenBB wants to be an open source challenger to Bloomberg Terminal",
		link: "https://venturebeat.com/data-infrastructure/openbb-wants-to-be-an-open-source-challenger-to-bloomberg-terminal/",
		magazine: "Venture Beat",
		date: "2022-03-30",
		img: "/media/venture-beats-2022-march.webp",
	},
	{
		title: "Português cria versão gratuita de terminal da Bloomberg",
		link: "https://visao.pt/exameinformatica/2022-03-29-portugues-cria-versao-gratuita-do-terminal-da-bloomberg/#google_vignette",
		magazine: "Visão",
		date: "2022-03-29",
		img: "/media/visao-2022-march.jpg",
	},
	{
		title: "Gamestonk Terminal Is a DIY, Meme Stock Version of Bloomberg Terminal",
		link: "https://www.vice.com/en/article/qjp9vp/gamestonk-terminal-is-a-diy-meme-stock-version-of-bloomberg-terminal",
		magazine: "VICE Magazine",
		date: "2021-03-01",
		img: "/media/vice-magazine-2021-march.webp",
	},
];

export const interviews: MediaItem[] = [
	{
		title: "Control Systems and Electrical Engineering to AI in Finance",
		embed: "https://www.youtube.com/embed/Wt92O84OQ2o?si=oembed",
		description:
			"Interview with Dimitri Bianco about the journey from control systems and electrical engineering to AI in finance.",
		date: "2026-03-03",
		time: "55min",
	},
	{
		title: "From Viral Reddit Tool to Enterprise AI: The OpenBB Story with Didier Lopes | S2E2",
		description:
			"In this episode, Michael sits down with Didier Lopes, the founder of OpenBB, for a conversation that started five years ago during the meme stock boom. Michael reached out to Didier in 2021 after he shared his 'Gamestonk Terminal' on r/wallstreetbets. Michael reached out to Didier to ask if he was interested in a job on his team at Citadel but Didier had other ideas. That initial LinkedIn message from Michael ended up in the pitch deck that helped Didier raise nearly $9 million for his company and the rest is history.<br/><br/>Didier recounts his journey from being a software engineer who automated his personal investment research to becoming the creator of a massively popular open-source project. The Gamestonk Terminal went viral on WallStreetBets and Hacker News, gaining 4,000 GitHub stars in less than 24 hours by cleverly aggregating the free API tiers from hundreds of different data vendor and has evolved into what OpenBB is today.<br/><br/>Join us as we dive into the evolution of a viral tool into a sophisticated enterprise platform and explore the disruptive forces reshaping the financial data landscape.",
		date: "2025-08-26",
		location: "Hedgineer Podcast",
		embed: "https://www.youtube.com/embed/QeYl2Gq7mAA?si=Lmv5UUB7LYheeQoc",
		time: "1h 30m",
	},
	{
		title: "Analytics Vidhya",
		embed: "https://www.youtube.com/embed/jSMH-PuwnrA?si=aItl0QeAsy97t7KS",
		description:
			"Celebrating 50 episodes of Leading with Data, this time, we're joined by Didier Rodrigues Lopes, Founder and CEO of OpenBB, a company revolutionizing the space of open-source financial tools. Before founding OpenBB, Didier worked as a sensor fusion engineer at NURVV, where he played a pivotal role in enhancing the GNSS receiver's time-to-first-fix, re-imagining altitude estimation with Kalman Filters, and designing a GPS filtering algorithm to improve accuracy.",
		date: "2024-11-27",
		time: "56min",
	},
	{
		title: "ClueCon",
		embed: "https://www.youtube.com/embed/OEboNpQlwgk?si=BK5NpvyHXi7z7H7X",
		description:
			"Joining us this week is Didier Lopes from the open source project, OpenBB. OpenBB is focused on building the most advanced investment research tools accessible to everyone. As a Software Developer and an AI/ML enthusiast, Didier decided to leverage modern data science tools to help make sense out of investing. As a young investor, he looked for research tools about investing and couldn't find anything helpful.",
		date: "2024-02-20",
		time: "30min",
	},
	{
		title: "OpenBB : Future of Quantitative Wall Street Research",
		embed: "https://www.youtube.com/embed/btVxYhdA-to?si=Fp0XCtIkOToLHrtq",
		description: "Interview with Didier by Alexander Fleiss from Rebellion Research",
		date: "2024-01-16",
		time: "11:30min",
	},
	{
		title: "OpenBB + Supabase",
		embed: "https://www.youtube.com/embed/lHmCshk4pJc?si=oZH2Vv_jUvSFbY_t",
		description:
			"Copple chats to Didier Lopes, the cofounder of OpenBB, about their origin story, their Supabase integration, and whether he prefers to fight ducks or horses.",
		date: "2023-12-19",
		time: "22min",
	},
	{
		title: "Fintech CEO Fireside Chat: Open Source Fintech Ft. OpenBB",
		embed: "https://www.youtube.com/embed/dDrQgbe-HF4?si=UXbPb-cGtx_PfppK",
		description:
			'In our latest Fintech CEO Fireside Chat, our CEO dives in with Didier Lopes, the Founder & CEO of OpenBB. Topics Covered: Open-source and "freemium" business models Competing with Bloomberg, Reinventing the "terminal", Startup fundraising, How to scale a startup, Retail and institutional investment trends, and more!!',
		date: "2023-12-12",
		time: "1h 7min",
	},
	{
		title: "Open source interviews #20 - Didier Lopes, founder of OpenB",
		embed: "https://www.youtube.com/embed/BV-zdBpVKjk?si=SJ2rwOxnq9WzcXr7",
		description: "Open source investment research platform | Terminal | SDK | Bot.",
		date: "2023-08-02",
		time: "37 minutes",
	},
	{
		title: "LlamaIndex Webinar: LLMs for Investment Research",
		embed: "https://www.youtube.com/embed/s8ZNLqi9hzc?si=30qYav28IqKZ88q0",
		description:
			"OpenBB has an awesome Terminal product, and it's made even better with AI! We'll talk about AskOBB, powered by LlamaIndex - it gives users a natural language interface to access financial data. We'll also talk about their future plans: utilizing LLMs to chat with financial data and extract insights more efficiently, or even creating a custom research report.",
		date: "2023-07-14",
		time: "46 minutes",
	},
];

export const webinars: MediaItem[] = [
	{
		title: "It's Just Function Calling",
		embed: "https://www.youtube.com/embed/gH1mMtRa84Y?si=fc3ClW3RrbqDk9Rt",
		description: "In this presentation, Didier goes over what happens under the hood in OpenBB Copilot.",
		date: "2025-02-12",
		time: "13 minutes",
	},
	{
		title: "Webinar - The Next Chapter: AI Meets the OpenBB Terminal",
		embed: "https://www.youtube.com/embed/QSpMrj947G8?si=-s_qxg6ldiPJQaPb",
		description:
			"Welcome to the first live demo of the new OpenBB Terminal! It's the first AI-powered workspace designed to transform research and data analysis.",
		date: "2024-10-16",
		time: "51 minutes",
	},
	{
		title: "Didier's journey and Demo of the OpenBB Terminal and OpenBB SDK",
		embed: "https://www.youtube.com/embed/t-EKA1xoFp8",
		description:
			"During a course of PyQuant News titled 'Getting Started with Quant Finance' I speaks about my background and do a demo about the OpenBB Terminal and the OpenBB SDK. Please note that this version of the OpenBB Terminal was an Early Release Candidate.",
		date: "2022-12-13",
		time: "36 minutes",
	},
	{
		title: "OpenBB - Terminal 2.0 Launch Event",
		embed: "https://www.youtube.com/embed/W9r2joPZOOw",
		description:
			"Webinar regarding the release of the OpenBB Terminal 2.0. Within this release, the OpenBB SDK and the AI/ML Toolkit are released. Furthermore, many improvements to the already existing 914 commands in the OpenBB Terminal supported by 92 data sources were made.",
		date: "2022-11-30",
		time: "56 minutes",
	},
	{
		title: "First presentation of Gamestonk Terminal",
		embed: "https://www.youtube.com/embed/lVtxXyCAZ-4?start=811",
		description:
			"In this Hacktoberfest '21 kickoff by DeepSource I go over why I started an open source investment research terminal, share some highlights and early growth, talk about our discord bot and finally discuss how we will accommodate powerful machine learning models.",
		date: "2021-10-5",
		time: "15 minutes",
	},
];

export const productVideos: MediaItem[] = [
	{
		title: "OpenBB Workspace Demo: Portfolio Analysis, Apps Marketplace, MCP & AI Agents",
		embed: "https://www.youtube.com/embed/Ik1qUa-HbUY?start=18",
		description:
			"Didier Lopes (CEO) walks through a full OpenBB Workspace session, from dashboard configuration to multi-source data analysis and automated reporting.",
		date: "2026-07-31",
		time: "12 minutes",
	},
	{
		title: "Vibe-coded financial apps: How OpenBB fixes ownership and data governance",
		embed: "https://www.youtube.com/embed/7fDTDYh2NJ4?start=5",
		description:
			"Recorded after NY Tech Week as a replay of the presentation at the AI in Finance Forum, this demo shows how OpenBB Workspace centralizes enterprise workflows with role‑based access, sharing and audit trails in one environment you control end to end.",
		date: "2026-06-11",
		time: "26 minutes",
	},
	{
		title: "OpenBB Terminal Pro in 12 minutes",
		embed: "https://www.youtube.com/embed/UjpnnTNJcoQ?si=PYHoJRYBY1NfB41B",
		description:
			"The OpenBB Terminal Pro is the first AI-powered and customizable investment research tool for financial analysts and quants looking to increase efficiency, productivity, and team collaboration.",
		date: "2024-05-06",
		time: "12 minutes",
	},
	{
		title: "OpenBB Terminal Pro Tutorial - full length version",
		embed: "https://www.youtube.com/embed/pxKqd1r2Ut4?si=9-UZw9vEciBI4PuG",
		description:
			"Discover the superior investment research capabilities of the OpenBB Terminal Pro. Built on top of the open-source OpenBB Terminal, our platform provides a sleek graphical interface that is intuitive and fully customizable, making it easier for you to access and analyze financial information with ease.",
		date: "2023-12-14",
		time: "55 minutes",
	},
	{
		title: "How to use the OpenBB Terminal - full length version",
		embed: "https://www.youtube.com/embed/76IkkbUlQcA?si=E1RFFRa_C2Z4YtYo",
		description:
			"Get started with the OpenBB Terminal today and learn everything you need to perform your investment research and analysis.",
		date: "2023-10-22",
		time: "40 minutes",
	},
	{
		title: "OpenBB x Keychron: Doing due diligence on a stock will never be the same",
		embed: "https://www.youtube.com/embed/cgeN3Ep2nEw?si=9WVjmvppx3tHTQrb",
		description:
			"In this video I show the concept of routines in the OpenBB Terminal and how you can automate your investment research workflows. In addition, I share how you can create your own custom MACROS on your Keychron mechanical keyboard",
		date: "2023-02-26",
		time: "17 minutes",
	},
	{
		title: "Adding feargreed command to OpenBB Terminal",
		embed: "https://www.youtube.com/embed/9BMI9cleTTg",
		description:
			"This is a video of myself live coding on Gamestonk Terminal. More precisely, adding the 'feargreed' command to the 'economy' menu. Along with the coding, I explain the architecture that we are currently using, so that more developers can add features.",
		date: "2022-06-20",
		time: "70 minutes",
	},
	{
		title: "OpenBB Terminal Demo",
		embed: "https://www.youtube.com/embed/fqGPK8OVHLk",
		description:
			"OpenBB Terminal Demo after 1 year of development. In this video I go over: introducing the terminal, how to set API keys, enable feature flags, export data, integrate excel, prediction menu, advanced user and routines, +500 features, portfolio menu, automatic reports, dashboards, OpenBB API, and even our OpenBB Bot.",
		date: "2022-02-24",
		time: "43 minutes",
	},
];

export const podcasts: MediaItem[] = [
	{
		title: "To the Moon: OpenBB with Didier Lopes",
		link: "https://www.contributor.fyi/openbb",
		host: "Scale Venture Partners - Eric Anderson",
		date: "2024-03-13",
		summary:
			"OpenBB is an open-source investment research platform created by Didier Lopes (@didier_lopes). OpenBB grew out of a project called Gamestonk Terminal that Didier began working on shortly before the Gamestop short squeeze in January 2021. Today, OpenBB has evolved into an infrastructure platform that allows users to build extensions and access financial data with automation and customization.",
	},
	{
		title: "From 4,000 GitHub Stars to a Successful - Open Source Business with Didier Lopes of OpenBB",
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
		title: "Making Investment Data Easy To Access And Analyze With The OpenBB Terminal",
		link: "https://www.pythonpodcast.com/openbb-terminal-investment-data-framework-episode-363/",
		host: "Podcast.__init__",
		date: "2022-05-10",
		summary:
			"Investing effectively is largely a game of information access and analysis. This can involve a substantial amount of research and time spent on finding, validating, and acquiring different information sources. In order to reduce the barrier to entry and provide a powerful framework for amateur and professional investors alike Didier Rodrigues Lopes created the OpenBB Terminal. In this episode he explains how a pandemic project that started as an experiment has led to him founding a new company and dedicating his time to growing and improving the project and its community.",
	},
];
