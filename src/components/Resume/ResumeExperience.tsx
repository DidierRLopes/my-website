import React from "react";
import ExperienceList from "../General/ExperienceList";

const data = [
	{
		company: "OpenBB",
		title: "Founder & CEO",
		link: "https://openbb.co",
		daterange: "September 2021 - Present",
		summary: `
**Team outcomes:**
- Our open source product, the [Open Data Platform (ODP)](/blog/goodbye-openbb-sdk-hello-openbb-platform), became the most-starred finance project on GitHub: **72,500+ stars**, 269 contributors, top 250 globally, and **2M+ downloads**. It integrates data from dozens of vendors including FRED, BLS, IMF, EIA, Congress and HDSL, and exposes it via REST API, MCP or Python SDK.
- Built [OpenBB Bot](/blog/openbb-bot-our-new-addition-to-the-openbb-open-source-family) on top of that infrastructure, which used to be the most popular financial bot on Discord with **millions of users**.
- Grew a large community around the ODP, including a **Discord with 16k members**.
- Built our agentic [OpenBB Workspace](/blog/ai-chatbots-wont-revolutionize-finance-but-intelligent-workspaces-will) from scratch, with an AI-first approach to data and widgets. We were the first financial workspace to adopt [tagging widgets](/blog/how-function-calling-and-context-aware-ai-shapes-openbb) as context, [citations](/blog/how-function-calling-and-context-aware-ai-shapes-openbb), [skills](/blog/introducing-skills), [MCP tools](/blog/openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about) and [generative UI](/blog/no-financial-terminal-will-survive).
- Took the platform through enterprise readiness (**SOC 2 Type II**, on-prem deployment, security review) to approved-vendor status at a **tier-1 bank**. Institutional clients connect their internal data (including portfolio data) with external data and MCP servers, and use the workspace as their central interface to get work done.
- Partnered with Snowflake to ship OpenBB Workspace as a [Snowflake Native App](/blog/the-context-wars-in-financial-services) to facilitate enterprise adoption.
- Built the [OpenBB Excel Add-in](/blog/introducing-the-openbb-add-in-for-excel) so data from the workspace flows into Excel for analysts.
- Built an [Apps Marketplace](/blog/why-an-apps-marketplace-for-a-financial-workspace) that lets dozens of third-party vendors integrate data & analytics into the product, so the AI agent can access their data seamlessly for end-to-end agentic workflows.

**Personal highlights:**
- Wrote the first version alone over two months. It hit **#1 on Hacker News** and **4,000 GitHub stars within 24 hours** of release, which allowed me to raise close to **$10M**, build a team from scratch and move from London to SF and then NYC.
- Personally hired everyone on the team, up to **20 people**, including engineering, product, design, marketing and leaders.
- My work spanned the whole team, but what I am proudest of are the new concepts we introduced to financial software:
  - **[Workspace MCP](/blog/introducing-workspace-mcp)**: exposes the workspace (dashboards, widgets, data, apps, skills) as MCP tools and resources, so coding agents like Codex and Claude Code can read data, build dashboards and assemble whole apps under the user's own data entitlements. The labs will win long-running agents, so the play for a product is to become the runtime where those agents do real work.
  - **[iframe widget MCP](/blog/new-iframe-widget-connects-your-existing-apps-with-ai-agents-inside-openbb)**: MCP servers and tools can be attached to an iframe widget, exposing read and write actions so an agent can pull data out of an embedded app (a Streamlit dashboard, an internal tool, a marketplace app like Kalshi) and drive interactions back into it. Combined with backend-set URLs, JavaScript execution and parameter sync, existing apps become part of the agentic workflow instead of a page in a tile.
  - **[API and MCP signature matching](/blog/apis-for-analytics-mcp-for-point-in-time-data)**: when an MCP tool and a widget share the same signature, the workspace treats them as the same data, cites the widget against the agent's answer and adds it to the dashboard 1:1. APIs handle analytics and bulk data, MCP handles point-in-time questions, and they complement rather than compete.
  - **[Function calling over widget metadata](/blog/how-function-calling-and-context-aware-ai-shapes-openbb)**: the copilot selects from thousands of widgets through embedded metadata, with three tiers of context (tagged widgets, current dashboard, whole workspace), step-by-step reasoning and citations back to the source widget. This is the protocol that made every dataset usable by humans and agents alike, before MCP existed.
  - **[Generative UI](/blog/you-cant-prompt-your-way-to-an-ai-bloomberg-terminal)**: the agent operates the dashboard rather than just chatting about it. It started incremental: a data point surfaced mid-conversation is one click away from the dashboard, a suggested parameter change is one click to approve, and a matching widget is offered whenever an MCP or API call finds one. It grew into composing entire dashboards, and derived artifacts like HTML reports, from a firm's trusted and themeable components. Primitives over prompts, so nothing is generated from scratch and layouts stay predictable, governed, fast and on-brand, with the workspace as shared context between analyst and agent. This is where I spent most of my time building at OpenBB.
  - **[WorkspaceBench](/blog/introducing-workspacebench-to-evaluate-openbb-workspace-for-agentic-workflows)**: a benchmark for how well agents operate the workspace over Workspace MCP, with a vanilla harness, a simulator of the workspace, realistic analyst tasks and graders, inspired by SWE-bench and Terminal-Bench. If agents are going to drive the workspace for real analysts, we need to measure how well they navigate it.
		`,
	},
	{
		company: "C-MORE",
		title: "AI/Tech Advisor",
		link: "/blog/joining-c-more-as-an-advisor/",
		daterange: "August 2025 - September 2026",
		summary: `
- Regular discussions with the founders around their [AI strategy](/blog/joining-c-more-as-an-advisor/): shaping how C-MORE turns its verified ESG data into evidence-based, traceable answers, and approaches for parsing complex sustainability documents with long-context models.
		`,
	},
	{
		company: "Universidade Europeia",
		title: "ML Guest Lecturer",
		link: "https://www.europeia.pt",
		daterange: "April 2024 - January 2026",
		summary: `
Invited to teach a course in "Big Data and Data Analytics" focusing on Supervised Learning.

I gave 4 hours of classes, divided into:
- Supervised Learning - Theory
- Supervised Learning - Practice

and graded student's coursework on supervised learning.

Then I also gave a 2h seminar in:
- Data Analytics in Financial Markets
- AI in Financial Markets

I open sourced the syllabus and content about Supervised Learning here: [github.com/DidierRLopes/supervised-learning](https://github.com/DidierRLopes/supervised-learning)
		`,
	},
	{
		company: "NURVV",
		title: "Sensor Fusion Engineer",
		link: "https://www.nurvv.com/en-gb/",
		daterange: "November 2020 - October 2021",
		summary: `
**My biggest contributions have been:**
- Improving the time-to-first-fix of the GNSS receiver
- Re-designing the concept of altitude estimation using Kalman Filter
- Adding a GPS filtering algorithm for outliers, including an approach to pick a valid start point
- Work on a new way of calibrating insoles to increase their life span and accuracy
- Create and clean Nurvv running dataset. This allowed to implement a new footstrike detection and INS algorithm to improve distance covered and speed reported to users

All of these tasks had a major research/simulation component carried through python in jupyter notebook environment.

**In addition I have:**
- Developed a python data analyzer that processes the data from a running session and produces a html report, which allows us to assess the state of the product, and helps us in development to make sure the product is behaving as expected
- Developed a python sensor analyzer that allows to analyze the raw samples seen by the trackers over a running session, to understand - at a low level - if something unexpected is happening
- Started the development of a python internal tool, similar to the app, to be used by the firmware team to communicate with the product
		`,
	},
	{
		company: "NURVV",
		title: "Embedded Firmware Engineer",
		link: "https://www.nurvv.com/en-gb/",
		daterange: "March 2020 - November 2020",
		summary: `
The primary tasks of the job are working on software development and automated systems. The job requires proficiency with C and C++ programming language and Python scripting; Some knowledge on Wireless communications (BLE, ANT), Communication protocols (SPI, I2C) and Sensor technologies (drivers). In addition, expertise in INS and GPS systems.

As part of a new firmware team of 3 engineers, we managed to get several bug fixes and features (e.g. auto-pause) in the latest release of the product.
		`,
	},
	{
		company: "U-blox",
		title: "Software Design Engineer",
		link: "https://www.u-blox.com/en",
		daterange: "November 2018 - February 2020",
		summary: `
The primary tasks of the job include designing and maintaining the internal and external customer-facing features, taking part in the whole embedded software development life cycle, in order to release state of the art GNSS receivers for this innovative IoT semiconductor company. Within my team responsibilities I was more keen towards Sensor Fusion and Inertial Navigation Systems.

The job requires: Proficiency in programming and scripting languages (C, C++, MATLAB and Perl); Knowledge in software testing, test automation and continuous integration concepts; Project tracking and collaboration (e.g. Jira); Agile software development processes; Experience with integrated development environments (e.g. Visual Studio Code), revision control systems (e.g. Git) and Linux computing.
		`,
	},
	{
		company: "Faculty of Sciences and Technology, New University of Lisbon",
		title: "Teacher Assistant",
		link: "https://www.fct.unl.pt",
		daterange: "January 2016 - June 2016",
		summary: `
My main activity was helping students to comprehend their MATLAB/Octave laboratory work and help them understanding the program of the course. I was responsible for 75 students, organized by 3 classes of 2 hours per week.

The program of the course was Signal and Systems; Linear, time invariant systems; The Laplace transform; Z transform; Periodic signals and the Fourier series (DFT); Discrete-time Fourier transform and The continuous-time Fourier Transform.
		`,
	},
];

export default function ResumeExperience() {
	return <ExperienceList experience={data} />;
}
