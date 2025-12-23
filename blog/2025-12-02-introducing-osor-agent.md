---
slug: introducing-osor-agent
title: Introducing OSOR Agent
date: 2025-12-02
image: /blog/2025-12-02-introducing-osor-agent
tags:
- ai
- open-source
- openbb
- finance
- agents
- llm
description: How I quickly hot-swap my financial agent with different LLM providers - fully open source
hideSidebar: true
---

![Introducing OSOR Agent](/blog/2025-12-02-introducing-osor-agent.png)

How I quickly hot-swap my financial agent with different LLM providers - fully open source.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

When Gemini 3.0 dropped last week, I wanted to test it immediately.

But I have to go to Google AI Studio, and none of my data is there...

And I couldn't be bothered to drop CSV files or asking Claude Code to use it via API simply.

However, I have OpenBB workspace - which:

- Has the financial data I care about
- AND I can bring my own agent

<br />

Silly me...

So, I spent Saturday building **OSOR Agent** - a bridge between two problems:

1. New models drop constantly, but testing them with financial data requires jumping between platforms
2. OpenBB has all the financial data infrastructure, but no easy way to experiment with different LLM backends

<br />

So I built something that solves both.

Before we start, here's the entire agent code fully open source: [https://github.com/DidierRLopes/openbb-open-router-agent](https://github.com/DidierRLopes/openbb-open-router-agent)

## What OSOR Agent Does

OSOR Agent combines OpenBB's data & infra layer with Open Router's model flexibility.

Here's what that actually means:

### Pick Any Model, Anytime

Open Router gives you access to hundreds of models - Claude, GPT-4o, Gemini, Grok, open-source models.

Some are literally free, like Grok 4.1 Fast (as of Nov' 23).

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_1.png" alt="Open Router model selection showing free models" />
</p>

When a new model drops, you just select it. No new account, no new interface.

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_2.png" alt="Model selection dropdown in OSOR Agent" />
</p>

### Mature AI Chatting Interface

Instead of copy-pasting financial data around, the agent pulls directly from OpenBB widgets. Your market data, portfolio metrics, news, whatever you've connected to your workspace, feeds directly into the LLM context.

You can also expand AI chat so the remainder of the dashboard disappears.

It even has access to data via MCP as you can see below, and shares its internal step by step reasoning!

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_3.png" alt="OSOR Agent showing step by step reasoning with MCP data" />
</p>

### Your Agentic Financial Workspace

The agent can generate charts, tables, and citations so you're not just reading wall-of-text responses. It understands your data structure and responds accordingly.

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_4.png" alt="OSOR Agent generating charts and tables" />
</p>

In my opinion, you shouldn't have to choose between testing the latest AI model and having access to your financial data.

You shouldn't have to manually move data around.

You shouldn't have to become an expert in multiple platforms.

OSOR Agent is small, but the principle is big. It treats data access like infrastructure - get it right once, then let people experiment freely on top of it.

## Open Source

The full code is MIT licensed and open source.

That means you can fork it, extend it, build whatever you want on top of it. Want to add RAG underneath? Build it. Want custom analysis for a specific strategy? Build it.

The best models are worthless without access to data that matters.

OSOR Agent is a step in that direction on top of a mature financial workspace, OpenBB Workspace.

### This is a Starting Point

There's a lot that can be done to improve the agent, this was a weekend project built on top of our vanilla agent examples [https://github.com/OpenBB-finance/agents-for-openbb](https://github.com/OpenBB-finance/agents-for-openbb)

Here's an example of the agent powered by Gemini 3 working with Top Events from Polymarket when asked about what events I should look at within the "FED" category.

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_5.png" alt="OSOR Agent with Polymarket FED events analysis" />
</p>

<p align="center">
    <img width="800" src="/blog/2025-12-02-introducing-osor-agent_6.png" alt="OSOR Agent detailed analysis of FED events" />
</p>

Contributions are welcome, happy hacking! :)

[https://github.com/DidierRLopes/openbb-open-router-agent](https://github.com/DidierRLopes/openbb-open-router-agent)
