---
slug: why-an-apps-marketplace-for-a-financial-workspace
title: "Why an Apps Marketplace for a Financial Workspace"
date: 2026-05-14
image: /blog/2026-05-14-why-an-apps-marketplace-for-a-financial-workspace/2026-05-14-why-an-apps-marketplace-for-a-financial-workspace.webp
tags:
- openbb
- finance
- apps
- marketplace
- data
description: "Announcing a free data and analytics marketplace on OpenBB"
hideSidebar: true
---

Announcing a free data and analytics marketplace on OpenBB

<!-- truncate -->

Announcement [here](https://openbb.co/blog/introducing-the-openbb-app-marketplace/).

More financial data vendors exist today than ever before. Alternative data, satellite imagery, credit card transactions, analyst transcripts, ESG scores - the list keeps growing.

So does the pain of accessing it with fragmented onboarding, long integration cycles and days of contract negotiation before there’s any value extracted.

Meanwhile, AI has changed what financial infrastructure needs to be. Agents are the new first-class consumers, not the terminals built decades ago. Incumbents will have a hard time to retrofit their way to AI-native without cannibalizing their own business. So the gap widens.

The natural solution would be a marketplace - a neutral layer where vendors distribute data and firms access it without the friction. It’s been tried. Repeatedly. And it keeps failing.

## Why financial data marketplaces keep failing

Every major incumbent has tried a marketplace at some point. Bloomberg has one. FactSet has one, though it’s worth remembering that FactSet started as a pure integration layer, aggregating third-party data with proprietary analytics on top, before acquiring its way into being a data company itself. Refinitiv tried. Nasdaq acquired Quandl, originally founded as a “Wikipedia for numerical data”, and folded it into their own data distribution strategy. Crux Informatics raised over \$100 million from some of the most sophisticated financial institutions in the world, with the explicit goal of being a neutral data pipeline.

On the other side, you have the pure neutral players (e.g. Eagle Alpha and BattleFin) that don't sell their own data, just connect buyers and sellers across thousands of alternative data products. What they’ve built is closer to a data catalogue than a platform. You can discover data there. You can’t really use it though.

So the landscape splits neatly into two failure modes: the marketplaces run by incumbents, which get optimized for the operator’s own products until third-party data is effectively just a listing (if that); and the neutral catalogues, which solve discovery but stop well short of value.

Nobody has built the thing in between.

The standard explanation for the first failure mode is incentive misalignment - when the marketplace operator also sells data, their products get the best placement, the deepest integration, the most seamless onboarding.

The deeper issue is that financial data has structural characteristics that resist marketplace intermediation regardless of who runs the platform. Enterprise data deals take months to close, with custom delivery requirements, legal reviews, and compliance questionnaires. A "subscribe" button doesn't replace that. The datasets themselves aren't fungible. Satellite imagery and credit card transaction data and analyst transcripts aren't like batteries on Amazon where a private-label substitute can undercut. And the network effects that make consumer marketplaces so powerful don't apply the same way: a buyer doesn't benefit from more buyers on the platform; they benefit from better data.

So the real problem isn’t just that incumbents are conflicted. It’s that they’re conflicted *and* have no incentive to solve the hard structural problems that a real marketplace requires. They’d be cannibalizing their highest-margin businesses to fix a distribution model that might commoditize their products.

One company genuinely working on the structural problem is Carbon Arc. They’re not aggregating data or running a catalogue - they’re building the ontology layer that sits underneath all of it. The reason firms spend months before extracting value from a new data vendor isn’t just bad onboarding, it’s that every vendor handles data differently. Carbon Arc’s brands, companies, locations, and people entities ontology and normalization layer means data from dozens of different vendors can finally be used together without a custom engineering project for each one. The infrastructure question shifts from “can I access this?” to “what can I build with it?”.

## The order of operations matters

Amazon didn’t start by publishing books. They aggregated books from vendors, made them available to a larger audience, and put all the focus on the user experience of finding and getting the book you wanted. They didn’t own the content. They owned the experience.

Only after establishing themselves as the neutral layer did they start competing on content (e.g. Amazon Basics). The same pattern plays out at Netflix (Originals) or Costco (Kirkland).

The financial marketplaces that failed got this order wrong. They started with their own content, optimized the interface around it, and then wanted to add a marketplace. But the experience was already shaped by what they owned. Third-party data never had a fair shot because it was always being introduced into an environment designed for someone else’s products.

There’s an important counterargument here. Apple and Salesforce both compete with their marketplace participants - the App Store and AppExchange are enormously successful despite that. So the “neutral ground first” principle isn’t absolute.

**What makes the difference is whether the platform lock-in is strong enough that developers accept the competitive risk in exchange for distribution reach.**

In financial data, that lock-in hasn’t existed at the platform level.

Until now, possibly.

## What we have today

### Data Catalogues

Companies that aggregate vendor metadata and keep a searchable list. A useful starting point, but it's far from users actually getting value out of the data. Most of these exist because data vendors have broken onboarding experiences. If you could pip install a feed and get started in five minutes, you wouldn't need a catalogue listing.

### CSP Marketplaces

Snowflake, Databricks, AWS - they’ve built marketplaces inside their platforms and stayed genuinely neutral. A real step in the right direction, particularly as some F500 have started to shift to asking data vendors to integrate with some of these marketplaces if they wanted to sell them their data.

But there are two problems I see: (1) subscribing to a raw data feed still leaves you far from value - someone has to build the pipeline, normalize the schema, create the visualization, integrate it with everything else; and (2) many of the listings are more marketing than substance - you click “subscribe” and get redirected to an AE, or you get a data sample with a call-to-action at the bottom.

### Others

Outside of these, there are two things worth watching:

1.  **MCP**

Structurally, a universal connector between AI agents and external tools. When data vendors announce MCP support, in theory they’re making their data accessible to any agent. Right?

Well, I reached out to one of the large data incumbents after they announced an MCP server. They asked me for my use case before granting access. Then the AE said they needed to speak with their team because they were worried about cannibalizing their desktop product. And that was it. So yea, kind of defeats the purpose of it.

I think MCP will matter for data integration, but it's still a bit far from value as it just provides an agent with access to data, the same way an API would to a developer. You still need to know what you will build, integrate it with data from other vendors, etc.. and ultimately it’s only going to be helpful for agentic workflows - not really for analytics. I wrote more on this topic here: [API vs MCP](https://didierrlopes.substack.com/p/apis-for-analytics-mcp-for-point).

2.  **Data standardization.**

The company I'm most bullish on in this space is Carbon Arc. They're not just aggregating data from different vendors. They're building the ontology layer so that firms don't have to spend months doing it themselves. When data from ten different vendors finally speaks the same language, the infrastructure question shifts from "*can I access this?*" to "*what can I build with it?*".

## The problem we’re actually solving

Firms don’t only need data *(at least yet)*.

They need workflows.

Data is an input. A workflow is value. And the gap between the two, which involves cleaning, normalizing, contextualizing, visualizing, and connecting it to everything else a team actually uses, is where the time and the cost actually live.

There’s an argument to be made around there potentially being a correlation of the best dev teams being the ones that can get a new dataset into their workflows in the least amount of time because they have all the infra rails prepared to support it and be ready to extract value from said data.

So instead of building another catalogue or another raw data pipe, we asked: **what if the unit of distribution was a workflow?**

A specific, ready-to-use experience that a data vendor builds on top of their own data, packaged as an app, accessible inside the workspace where analysts and agents already do their work?

That’s the purpose of OpenBB Apps Marketplace.

<p align="center">
    <img width="800" src="/blog/2026-05-14-why-an-apps-marketplace-for-a-financial-workspace/2026-05-14-why-an-apps-marketplace-for-a-financial-workspace.webp" alt="Why an Apps Marketplace for a Financial Workspace" />
</p>

<br />

We don't host data. We don't disintermediate the vendor. The data always hits the vendor's infrastructure, and we're the platform where the work happens.

- Vendors get distribution to users who are already in a financial research context, not just browsing a catalogue.

- Users get not just raw data access but a functional workflow from day one. And once you subscribe to an app, all the individual widgets are unlocked, so you can mix, match, and build your own views on top.

You’re fully in control. It’s between you and the data vendor.

We’re just where that work happens.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/1v3rpze6C-s"
        width="800"
        height="400"
    />
</div>

<br />

Speedrun of comparing average cost of residential electricity (from EIA Energy) VS CPI (from FRED).

Try it for yourself here (for free): [https://pro.openbb.co/app?tab=apps-marketplace](https://pro.openbb.co/app?tab=apps-marketplace)

What excites me even more about this is what we have made available to some of our enterprise customers, where they will be able to use their favorite agent (Codex, Claude Code, … ) to interact with the workspace and even data from the marketplace.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/Q4Pj9wMZgGs"
        width="800"
        height="400"
    />
</div>

<br />

More on this soon.

### TL;DR:

What we’re building is the open infrastructure layer for a new category of financial workflow apps: neutral by design, workflow-first by architecture, and built with AI agents as first-class participants from day one. The convergence of more data vendors than the market can parse, a new generation of AI-native infrastructure, and open protocol standards like MCP creates a specific window for this.

We’ve just launched with 10+ partners. More coming.

If you’re a data/analytics vendor and want to distribute your app to thousands of users, reach out.
