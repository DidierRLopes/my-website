---
slug: the-evolution-of-ai-agents-in-finance
title: The Evolution of AI Agents in Finance
date: 2025-09-23
image: /blog/2025-09-23-the-evolution-of-ai-agents-in-finance
tags:
- ai
- finance
- agents
- chatgpt
- mcp
- openbb
- fintech
- data
- anthropic
- evolution
description: Mapping the evolution of AI agents in finance from ChatGPT wrappers to derived data insights - and why the real value is shifting from interfaces to intelligence.
hideSidebar: true
---

![The Evolution of AI Agents in Finance](/blog/2025-09-23-the-evolution-of-ai-agents-in-finance.png)

Mapping the evolution of AI agents in finance from ChatGPT wrappers to derived data insights - and why the real value is shifting from interfaces to intelligence.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Introduction

In late 2022, OpenAI's ChatGPT burst onto the scene and immediately captured the attention of finance. Almost overnight, the industry recognized that generative AI could dramatically speed up data-gathering, research, and analysis.

What started as a buzz around a clever chatbot quickly ignited an arms race: How could we harness this "pure" AI intelligence specifically for finance?

This essay maps the acceleration of AI agents in finance, from wrapping ChatGPT around financial datasets in the early days to deep data integrations and emerging standards now. I wrap up by laying out where I believe this is heading.

_Spoiler: the game is changing, and the real value in finance AI is shifting from fancy chat interfaces to the derived data insights those interfaces can produce._

### Phase 1: ChatGPT wrappers on open and public data

The first phase of this evolution saw nimble startups harnessing AI models to make sense of _publicly available_ financial information. Using APIs and open datasets, these innovators built AI assistants that could, for example, pull stock prices, scrape financial news, or parse SEC filings and then answer questions or generate basic analyses.

This was the era of taking off-the-shelf AI and wrapping it around well-known data sources like EDGAR or even Yahoo Finance.

The beauty of Phase 1 was **accessibility**: anyone could access the same public data, so a small startup could create a financial research chatbot without needing special partnerships. Or even a big budget, as most of the cost was on the inference.

Nonetheless, these early AI agents demonstrated that even with common data, AI could deliver value by digesting mountains of information in seconds - summarizing earnings reports or comparing company metrics on the fly - tasks that would take humans hours or days.

> The defining feature of Phase 1 was **speed of access**: information that once required hours or days of work could suddenly be retrieved and synthesized in seconds.

<br />

However, because they relied only on public data, their insights were often not unique; every competitor had access to the same information. This meant that while Phase 1 proved AI's potential in finance, it also highlighted the next challenge: how to go beyond the readily available data to gain deeper, proprietary insights.

At the end of this phase, Perplexity showed up. They saw the value on the public open data, but didn't keep it to a few datasets. They connected LLMs to the entire web and focused on that one feature.

They pioneered the concept of "getting answers" from search as opposed to links. The next step after search.

So at the end of this phase, an analyst's AI assistant wasn't limited to static training data or a fixed library of filings; it could pull the latest news, prices, and research from the entire internet - on-the-go.

But web search was never meant to be a product, but a feature.

### Phase 2: Big labs add web search

While Perplexity gained a lot of market share due to the time it took big labs to add this feature, they effectively caught up.

For finance, this was revolutionary: market conditions change by the minute, and being able to retrieve up-to-the-moment information meant AI assistants could provide far more relevant answers. An investor could ask an AI agent about today's Federal Reserve announcement or a rumor affecting a stock, and the agent would actually go out, search the web, and return with an answer.

This phase expanded the AI's knowledge horizon dramatically, turning these systems into dynamic _research analysts_ that weren't confined by a knowledge cutoff OR by the embedding chunks that the startup had in their vector database.

> The defining feature of Phase 2 was **breadth of access**: instead of being limited to a handful of sources, AI agents could now reach across the entire internet.

<br />

It did introduce new challenges, like ensuring the information found was reliable and managing the complexity of searching and reasoning on the fly, but overall Phase 2 proved that giving AI agents the tools to access external data made them significantly more powerful and context-aware.

Startups understood that they would need to narrow down one step further, and they couldn't conquer the world. AI labs were coming to eat their lunch after all.

### Phase 3: Integrating proprietary vendor data

As the space heated up, financial AI startups sought new ways to differentiate. The obvious next step was going beyond public web data into _proprietary financial datasets_ held by incumbent data vendors.

Instead of just parsing SEC filings (which anyone can get), why not plug into premium data like analyst ratings from Morningstar, credit data from rating agencies, or rich financials from FactSet?

**This phase saw startups forging partnerships with data providers to narrow their focus on high-value content not freely available on the open web**.

For example, Perplexity announced integrations allowing subscribers with a FactSet or Crunchbase account to query those databases through its AI. FactSet's own product team embraced this, noting that providing their trusted data via Perplexity's AI research tool created an "open, flexible ecosystem" for clients.

In practice, these deals meant an AI assistant could now answer questions not just from public info, but from paid datasets (e.g. _"What's the 5-year EBITDA CAGR of all companies in the S&P 500, according to FactSet?"_).

> The defining feature of Phase 3 was **depth of access**: moving from shallow, open information to rich proprietary datasets that offered a competitive edge.

<br />

Startups that secured such partnerships gained an edge, effectively becoming one-stop research copilots.

However, this shift brought new _challenges_: accessing vendor data is expensive and requires legal agreements, and the AI's answers are only as good as the data plugged into it.

Nevertheless, the trend was clear - the most advanced finance chatbots were those tapping into **incumbent data vendors' proprietary troves**, not just the free internet.

Funnily enough, these big data vendors started having to have interesting discussions internally. On the one hand, they are a data business - so selling data to startups makes sense. But startups are creating derived data essentially (via answers to user prompts) so that creates a conflict of interest with their desktop businesses.

Ultimately, if a big data vendor has an AI agent on top of their fundamentals datasets that can be accessed from their desktop app, and they are selling that same underlying data to a startup that has an AI agent on top of that data, … something has to give. This is a zero sum game.

BUT. Data vendors actually have everything to win by forging these relationships. They are slow moving, risk averse but have capital, distribution and ultimately, the main asset: the data. So for them it actually makes sense to partner with nimble startups that are bold, innovative and have nothing to lose. If nothing else, as R&D to understand the size of the market and for M&A (more on this later).

The main friction point that startups have here is that these datasets from big vendors are very pricey (particularly because they are redistributing this derived data) so they can only select 1 or 2 vendors to work with and consume a subset of their datasets. But also because the APIs between these vendors varies drastically.

Only if there was some sort of standard…

### Phase 4: Anthropic introduces MCP

Phase 4 was the moment the game changed. Anthropic unveiled the Model Context Protocol (MCP) - and in doing so, they deliberately erased an entire category of startups.

MCP is an open standard that lets AI assistants securely interface with any company's data or tools in a plug-and-play way. Instead of a bespoke integration for every vendor, firms can spin up an MCP "server," and any compliant AI model can consume that data instantly. For finance, this meant that a provider like FactSet or PitchBook could wire their proprietary dataset straight into Claude, bypassing the need for a third-party startup to sit in the middle.

And Anthropic open-sourced it. That wasn't just generosity, it was strategy. By making integration a commodity, they torched the moat that dozens of AI-finance startups had built their businesses around. What used to take a year of engineering and a venture round to fund could now be done with a weekend project and a config file. The "we connect LLMs to financial data" pitch evaporated almost overnight.

> _The defining feature of Phase 4 was_ **_ease of access_**_: what once required expensive, custom integrations was suddenly standardized and commoditized._

<br />

The labs moved fast to prove the point. Anthropic launched Claude for Financial Services, preloaded with FactSet fundamentals, Morningstar valuations, PitchBook private markets data, and S&P Capital IQ transcripts - all natively accessible inside Claude.

The pattern was clear: **the labs weren't going to verticalize into finance, they were going to hollow out the startups by giving vendors a universal port into their intelligence.**

This was the classic big-tech play: **commoditize your complements** (read [**Joel on Software Strategy Letter V**](https://www.joelonsoftware.com/2002/06/12/strategy-letter-v/)). The complements here were the connectors, the painstaking integrations that startups had built to justify their existence. By turning those into a free, open standard, Anthropic ensured that the value flowed not to the wrappers, but to the intelligence itself. Labs want one thing above all: for their models to be the default intelligence powering every workflow.

And the best way to make that happen was to nuke the integration moat and let data vendors plug in directly.

What happens when you have access to raw intelligence and can connect data from any big data vendor via MCP to it?

Again:

Startups understood that they would need to narrow down one step further, and they couldn't conquer the world. AI labs were coming to eat their lunch after all.

### Phase 5: From Interfaces to Insights (Derived Data)

Once MCP commoditized integrations, startups were forced to narrow their scope. They leaned into very specific problems: an agent to prep earnings decks, an agent to monitor ESG disclosures, an agent for company meetings. Useful, yes - but inherently smaller markets. This narrowing was the survival play: carve out niches that the frontier labs wouldn't immediately prioritize.

But firms quickly revealed what they actually valued. They didn't want to spend their time inside yet another agentic interface, watching an AI chain steps together. They wanted **deterministic-like outputs** from those workflows, clean, machine-generated insights that could slot directly into their existing data pipelines. Instead of asking an agent a generic question about the semi-conductor industry and then following-up on that, they wanted a report that talked about everything they should know the about semi-conductor, including replying to questions that they didn't know they should be asking.

In other words: **derived data.** Not a conversation, not a demo of agentic reasoning, but something as tangible and consumable as a sentiment feed, a risk signal, or a proprietary factor dataset.

This was the pivot.

> The defining feature of Phase 5 was **intelligence on access**: not just reaching data, but transforming it into structured, consumable insights that could flow directly into existing pipelines.

<br />

The real prize wasn't building the workflow, it was productizing its **outputs**.

Phase 5 marks the moment when value shifted from the _experience_ of interacting with an AI agent to the **data exhaust** those agents produce.

Startups that recognized this started selling not "AI copilots" but new, machine-synthesized datasets that looked and felt like traditional vendor products, only built by AI.

But this raises a new question: if multiple providers generate competing research reports on TSMC, how does a firm evaluate which one is best? Add another agent to compare them? Sounds inception-ish. At some point, the human backstop becomes essential, especially in domains where there is no single "right" answer. In practice, this means the first wave of derivative data will deliver significant value, but as competition intensifies, advantage may once again shift toward those with privileged or proprietary sources. Or to a workspace that can handle these…

## My take on where we are heading

Given these trends, the likely outcomes for most AI-in-finance startups are converging around two paths.

#### Acquisition by data vendors

They get acquired by big data vendors. Most likely the very same data vendor that is providing the raw data for them to generate derived insights. Not just because these big data vendors want to sell these second-order effect data as another dataset (and we know how much data acquisitions these vendors do, it's literally their playbook for growth), but because:

- They want to bring the expertise of building these agentic experience on top of their data in-house
- As a defense mechanism in case they get acquired by another large vendor that has similar datasets (a good parallel is what happened with Meta's 49% acquisition of ScaleAI and what that meant for OpenAI)

And honestly, they control the raw inputs, they have the distribution, they have the capital. Not buying the startups that are experimenting on their data would simply be negligence.

### Acquisition by frontier AI labs

They get absorbed by the frontier labs. OpenAI, Anthropic, and Google don't need the startup's UI, they want the domain expertise baked into their models.

A team that has truly cracked bond covenant parsing, or IPO prospectuses becomes far more valuable as part of the foundation model itself. Acquisitions here aren't about market share; they're about hard-won micro domain expertise that can tip the scales in the labs' race for vertical dominance.

#### Consolidation

Either way, consolidation is the destiny of this wave of startups. I don't think that most startups have enough leverage to stand alone once the data vendors and labs have their hooks in.

The only way I see startups winning big here is by being deeply integrated in large financial firms, but the value cannot be on the data or on the intelligence. It needs to be in something deeper than that, e.g. infrastructure..

## Phase 6: Where does OpenBB fit

If Phase 5 was about everyone chasing derived insights, **Phase 6 is about financial firms operationalizing those insights on top of their own data.** It's not enough for AI agents to summarize filings or produce signals; the real value comes when firms can combine those machine-generated insights with their proprietary data, and do it securely, on their own terms.

This is where OpenBB comes in.

> The defining feature of Phase 6 is **orchestration of access**: bringing together internal, external, and AI-derived data into one secure, intelligent workspace.

<br />

The big question facing financial institutions now is simple: do we build our own AI stack from scratch, or do we adopt an open workspace that's already designed for this purpose, and that we can fully own? Incumbent platforms like Bloomberg, FactSet, and Capital IQ were never designed to ingest a client's proprietary data. They have little incentive to let users integrate outside sources, because their business is selling their own datasets. This is the classic **"Are you team MCP client or MCP server"** dilemma, I wrote about it [here](https://didierlopes.beehiiv.com/p/are-you-team-mcp-client-or-server). I reckon that most of the big data vendors are team MCP Servers and they want to be the source of data into AI contexts, not the consumer of external data into their walled gardens. They are data businesses at core.

That's why OpenBB is building the opposite.

Our vision is an open IDE for finance - an open workspace where a firm can plug in all its data sources (internal databases, vendor feeds, public datasets, even AI-derived insights) and layer on multiple AI models to generate answers, workflows, and ultimately alpha.

Just as software developers need IDEs, analysts will still need a financial terminal for the foreseeable future. Unfortunately, there wasn't an open source VSCode that we could have used to start building on top, so we built OpenBB Workspace. Relentlessly.

Critically, Phase 6 also requires **deployment flexibility.** Firms want all of this to run inside their perimeter, on-prem or in a private VPC, so their proprietary edge never leaves their control.

We designed OpenBB that way from day one.

The endgame is a **unified intelligence platform for finance**: not just an AI chatbot, but a programmable workspace where human experts and AI agents collaborate over both internal and external data.

Unlike the vendors, we aren't locked into selling one dataset. Unlike the labs, we aren't just selling raw intelligence. We're building the open infrastructure layer that lets firms put their proprietary edge into intelligence - securely, flexibly, and at scale.

That's why OpenBB exists. And that's why we have been betting on Phase 6 for so many years.

## Conclusion

AI agents in finance have come a long way in a very short time, from the early novelty of Q&A on SEC filings, through web-enabled research assistants, to fully integrated multi-source analytics. Yet, as I've argued, there's still another phase on the horizon.

The real transformation will happen when every financial institution can easily plug its own data into intelligent systems, and do so safely and efficiently. The differentiator won't be the chat interface, it will be the combination of internal and external data with AI, producing a constant stream of new, data-driven insights that firms can actually operationalize.

OpenBB has been building for this phase for three years. We've designed for private deployments, for open integrations, and for full transparency and control. This isn't a pivot for us, it's the phase we anticipated from the start.

I believe in this future so strongly that I've made it my life's work. And I'm convinced we're uniquely positioned for it: there simply isn't another product like OpenBB in the market.

I actually started writing this essay after noticing something in our own client conversations: firms weren't asking to integrate AI-finance startups as agents into our workspace. They were asking to integrate their **outputs** - as input data widgets into our Workspace dashboard. Not different from a sell-side research report on the screen, but this time produced by an agent in 30minutes instead of days. That's the shift. That's Phase 6. That's why we're here, and that's also why we're just getting started.