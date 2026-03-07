---
slug: no-financial-terminal-will-survive
title: No financial terminal will survive.
date: 2026-02-24
image: /blog/2026-02-24-no-financial-terminal-will-survive.webp
tags:
- finance
- openbb
- ai
- product
description: No financial terminal in their current state will survive. Here's why the future belongs to open, composable workspaces.
hideSidebar: true
---

No financial terminal **in their current state** will survive. (sorry for the clickbaity title eheh)

<!-- truncate -->

Anyway, I would bet a lot on this - and want to explain my reasoning.

But first let's understand what exists to-date to analyze financial data.

## The bespoke dashboard

On one end, we have the custom-built dashboards, often started as weekend projects.

A Streamlit app or React app or built on Lovable (the way it was produced doesn't matter), an internal tool some dev built over a weekend because the data vendor software didn't do what they needed. And it's great. It does that one thing really well. It was built by someone who understood the problem, for the people who had the problem.

I'm a big fan of this. After all I do this for me all the time (e.g. my [pokemon website](https://pokvault.com/) that I use to track my binder).

Unfortunately, the important part of the sentence is the "**ME**". Most financial software is not built with one single person in mind (unless you are [Jose Donato](https://josedonato.com/), who has built his own [Orderflow Terminal](https://cryexc.josedonato.com/) for his own needs).

So that means that the weekend custom application will face your team members. And one of them will ultimately need something slightly different. A different view. A new column. A different dataset plugged in. Now you're back to the person who built it. They make the change, but it shifts the experience for everyone else using it. So they build a second version. Then a third. Then the original builder leaves the firm and no one wants to touch the code.

The dashboard was perfect the day it shipped.

And it started dying the day after.

There's a graveyard with millions of Streamlit apps that were built with the intent of increasing shareholder value, lmao.

And I'm a massive Streamlit fan - I used to use it to prototype applications all the time. Note the use of "prototype", I never thought of it for something that it was not.

My point is that these type of custom dashboards (Streamlit or not) are built for a moment in time, for a specific person's workflow, and the moment the context changes - which it will - you're stuck.

Either you:

- Live with it - then you will complain the software sucks, which brings us back to the start of this essay
- Bother a developer to modify it - they may say no because it will impact others (so **you** will complain software sucks); or they may say yes which will impact others (so **others** will complain software sucks - at least eventually).

<br />

It's literally a losing battle.

Unless you build your own open workspace. But more on this in a bit.

## BI software gets the model right, but not for finance

I'm very bullish on BI software.

Tableau (Salesforce), Power BI (Microsoft), Looker (Google) - they understood something important: the best software is the software you can shape to your own needs. They give you primitives. Building blocks. Drag this here, filter that there, connect to this data source. The user has agency.

And for a lot of industries, this works extremely well.

But for financial services, these dashboards are used for anything but market data analysis and insights.

My hypothesis is that the building blocks are too generic. BI tools are horizontal by design - they're built to serve every industry, which means they're optimized for none. They don't incorporate financial symbology. They don't optimize for speed of data streaming. There's no concept of data staleness indicators, no natural way to put unstructured research next to structured time series, no role-based access at the widget level, no watchlist widget that triggers a workflow some place else.

They have the right idea - composable, personal, user-controlled - but the wrong execution for finance.

## The high-end terminal problem

On the other end, you have the high-end financial applications.

These were designed with a single assumption: the analyst, quant, or PM will navigate the interface to find the information they need.

And to be fair, these interfaces have been iterated over years/decades. They've been refined toward a local maxima: the configuration that optimizes for the most clients' happiness, utilizing the data they own, whilst not making it so complex that new users bounce.

Credit where credit is due - this is an incredibly hard balance to get right.

It's so hard, in fact, that companies like SPGI have significantly more data available through their APIs than they expose through their interface.

Think about what that means. Please.

The data exists.

The capability exists.

But the interface can't absorb it, because every new feature risks breaking the carefully calibrated experience for existing users.

If you're trying to nail a specific workflow, you can't keep bolting on functionality to the UI. But you can keep creating API endpoints. So the interface becomes a frozen subset of what's actually possible.

And here's where the data incentive makes it worse.

These vendors own the data. Their interface is optimized to showcase _their_ data in _their_ way. There's no structural incentive to make it easy to bring in outside data or customize beyond what serves their distribution model. The UI isn't just static - it's static in a direction that serves the vendor, not you.

So either the terminal does your workflow perfectly - because a PM somewhere decided your workflow was common enough to optimize for - or tough luck. You're forced into someone else's opinion of how you should do your job.

## The same failure mode

These two worlds - the bespoke Streamlit dashboard and the enterprise terminal - look completely different on the surface. But they fail in the exact same way.

Both end up static. Both take control away from the end user.

The BI tool is dynamic for the _developer_ - the person building the dashboard. They have full creative control. But the moment they ship it, it becomes static for the _consumer_. The end user gets a fixed view, and now we're right back in the terminal problem, except the UI is probably worse.

The terminal is static for everyone. It was iterated into a local maxima that serves the average client reasonably well and no individual client perfectly. It can't be dynamic because that would break the very thing that makes it reliable.

Neither model gives the end user real agency over their experience.

And I think this is the core issue that the industry has been unable to solve.

The spectrum from "fully custom" to "fully productized" has this big problem: **no matter where you land on it, the end user eventually loses control.**

You are literally forced to think of your workflows in the way **someone else** has decided they should be done.

## What's needed

You need the primitives and abstractions of BI software - the composability, the building blocks, the user agency - delivered in a high-end, finance-native interface that understands the domain. Symbology. Real-time data. Staleness indicators. Structured and unstructured side by side. Role-based access at the widget level. The things that make financial workflows actually work.

Rings a bell?

Check [https://openbb.co/solutions](https://openbb.co/solutions), where you can build custom financial applications with OpenBB's scalable infrastructure. From portfolio risk analysis to economic indicators, create enterprise-ready apps that transform fragmented data and AI tools into cohesive workflows.

And - **this is the important part** - both the developer _and_ the end user need to be able to control their experience. Not just the person who builds the dashboard. **The analyst/PM who consumes it too.**

## Where AI agents fit

"But what about AI agents? Where do they fit?"

Well, they fit in both!!

They can work as developers (when they are building applications) but also as the analyst/PM (when they are analyzing data in a dashboard as copilot).

Here's my matrix on how I think about this:

**Human as Developer.** This is what exists today in BI tools or bespoke apps. A person builds a dashboard, configures widgets, connects data sources, designs the layout. They have full control - but it takes time, it requires skill, and the result is static for everyone else.

In OpenBB, this exists and it's very important. Analysts and quant developers can build and customize their workspace exactly how they want. The main thing is that they are bringing data widgets to this workspace, connecting with the right tables on Snowflake, bringing in proprietary data. Full control. But unlike traditional BI, the building blocks are optimized for financial workflows.

We literally have open sourced a [reference backend](https://github.com/OpenBB-finance/backends-for-openbb) to connect data to the workspace, but also [examples of apps](https://github.com/OpenBB-finance/awesome-openbb) built by the community.

**Human as End User.** This is the traditional terminal experience. You navigate, you click, you consume. The interface was built for you by someone else - a vendor PM, an internal developer - and you work within its constraints.

But in OpenBB you have full control of that interface in the way the data is organized from the "lego blocks" that the development team has done.

**AI Agent as Developer.** This is what everyone is going crazy for. Coding agents. This is also why we are going to see an even bigger graveyard of bespoke apps, but many that might actually mature for narrow use cases. I think BI tools should be doing MUCH more here because they have the right primitives and could constrain the software built nicely.

In our case, we think of how we can improve the process of building applications on our workspace via an agent. Not changing the UI itself because it's important to keep familiarity + brand consistency and for latency reasons, but the data being displayed and the analytics.

I've built an [OpenBB app builder](https://skills.sh/openbb-finance/backends-for-openbb/openbb-app-builder) SKILL for agents to help them close that building ability gap.

**AI Agent as End User.** This is where it starts to get interesting. An AI agent that consumes the workspace like a human would - reading data from widgets, interpreting charts, understanding the current state of a dashboard - and then acts on it. It can look at your portfolio view, add a widget to the dashboard with data that is of interest based on that portfolio. It can read a research note displayed in one widget and cross-reference it against the financial data in another.

The agent isn't just answering questions in a chat box. It's _seeing_ the same workspace you see, understanding the context of what's in front of you but also other widgets, and adding value on top of it. The workspace becomes shared context between you and the agent.

This [generative UI](https://docs.openbb.co/workspace/analysts/ai-features/generative-ui) capability is something that we are only getting better. I believe in this so much that this is where I spend most of my time building at OpenBB. We are adding capabilities to fully control the workspace and its widgets organization to create perfect layout for analysis on the fly.

## The boundary dissolves

When you put these four quadrants together, something important happens: **the boundary between building software and using software dissolves**.

Funnily enough when discussing OpenBB positioning, this has been one of the topics we have discussed the most.

That is because I have believed, for a while, that analysts will start owning more developer tasks. Data point [here](https://openbb.co/blog/from-excel-to-agents-rebuilding-the-macro-research-workflow-for-the-ai-era) and [here](https://github.com/MattMaximo/CryptoBB), both built by analysts pre-Opus 4.5.

And to accelerate giving control to analysts/PMs, there's a need for an open workspace.

**A workspace that is personal, malleable, and responsive to context.**

A human can build a dashboard in the morning. An AI agent can modify it based on new data at noon. The human can rearrange it for a client meeting at 2pm. The agent can strip it down to the essentials for a quick mobile check at 6pm.

The workspace is alive.

Not because it's generating novel UI from scratch - that would be disorienting. But because it's assembling and reassembling familiar pieces based on who's using it, what they're doing, and what the data demands.

This is what "software should be personal" actually means. Not "you get to pick your theme color".

Personal as in: the software reflects your workflow, your data, your context, your role - and it adapts as those things change. Whether the one changing it is you or an AI agent working on your behalf.

## Why the old model doesn't survive

The old model - where a PM defines the interface, ships it, and you live with it - doesn't survive this shift.

Not because the interfaces were bad. Many of them were excellent, refined over years by smart people who understood their users deeply. But they were built for a world where the interface _had_ to be static, because the only way to make it dynamic was to hire a developer. And developers are expensive, slow, and their changes affect everyone.

AI agents remove that constraint. When the cost of modifying an interface drops to near zero - when you can reshape your workspace with a sentence - there's no reason to accept a static view ever again.

The high-end terminals will still have great data. The BI tools will still have great primitives. But I believe the future is in a platform that combines finance-native building blocks with true composability for both humans and AI agents.

Software should be personal.

Now it finally can be.

[https://pro.openbb.co/](https://pro.openbb.co/)
