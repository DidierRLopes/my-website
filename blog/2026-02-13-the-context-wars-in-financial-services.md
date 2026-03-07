---
slug: the-context-wars-in-financial-services
title: The context wars in financial services
date: 2026-02-13
image: /blog/2026-02-13-the-context-wars-in-financial-services.webp
tags:
- ai
- finance
- openbb
- enterprise
description: As AI collapses the enterprise application stack, the context layer becomes the most valuable part of the technology stack in financial services.
hideSidebar: true
---

As AI collapses the enterprise application stack, the context layer becomes the most valuable part of the technology stack in financial services.

<!-- truncate -->

**A quick note:** I've moved this newsletter from Beehiiv to Substack. Nothing changes on your end - just letting you know. Now, onto this week's piece.

Matt Slotnick recently wrote an excellent essay on "[Context Rules Everything Around Me: The Future Of Enterprise Applications](https://x.com/matt_slotnick/status/2016968805034192962)" about how AI collapses the enterprise application stack. As agents take over more work, existing applications get relegated to data sources. The value shifts up to a data layer, a context layer on top of it, and an interaction layer where agents and people actually do work.

He's writing about enterprise software broadly - Salesforce, Workday, ServiceNow. But I think the implications for financial software are even more dramatic. In finance, proprietary insight is the product. Which means the context layer is everything.

<p align="center">
    <img width="600" src="/blog/2026-02-13-the-context-wars-in-financial-services.webp" alt="Context Rules Everything Around Me diagram" />
</p>

<br />

Context is what happens when you connect everything a firm knows. When your agent doesn't just see your portfolio positions - it sees the positions, the research that led to them, the macro environment they sit in, the risk limits they're constrained by, the client preferences they serve, and the market data that's moving right now.

That's the difference between an AI that gives you generic answers and one that reasons about your portfolio the way a senior analyst would.

Particularly in a world of Opus 4.6 and Codex 5.3.

And that's why the context layer is where the leverage is. The applications underneath are commoditizing - their value shifts from the interface they provide to the data and workflow state they hold. The interaction layer on top matters, but it's downstream - the quality of the context determines the quality of everything above it. A beautifully designed workspace powered by thin context is just a pretty terminal with generic answers.

For financial firms, this layer determines what your agents know, what they can reason about, and how useful they actually are when it matters.

Every company in the space sees this shift coming. And the instinct from most of them is: "_We'll build the context layer for you. Give us your data, and we'll manage the intelligence on top._"

I think that's the wrong framing.

When a vendor says "we'll manage your context" what they're really saying is: "_trust us with the most valuable layer of your entire technology stack"_. The layer that determines what your agents see, what they act on, and how they reason about your business.

For any firm where differentiation matters - where the way you analyze, decide, and act is your edge - that should be a non-starter.

And there's a subtler problem. If a vendor owns your context layer, every firm on that vendor gets a version of context shaped by the same system, the same defaults, the same biases. Your "proprietary" intelligence starts looking a lot like everyone else's.

The right framing: companies should focus on being the underlying tech that enables firms to **own their own context**. Not build it for them. Not host it for them. Give them the tools to build it themselves, on their own infrastructure, under their own control.

## The platform cannot also be the data vendor

This leads to a structural point that I keep repeating.

If the context layer needs to be owned by the firm, then the platform enabling it **cannot also be the data vendor**.

The moment you own the data, you have an incentive to privilege your own feeds and content. That breaks the neutrality that makes the orchestration layer trustworthy. It's the same reason you don't want your operating system to also be the only application developer. **The OS works because it's agnostic to what runs on it.**

A financial workspace needs that same structural neutrality. Internal data, vendor data, proprietary models, open-source tools - they all need to be first-class citizens. The platform's job is to orchestrate, not compete.

The company that wins this layer wins by being the best orchestrator. Not the best data vendor, not the best AI model - the best at bringing everything together in a way that's fast, familiar, and built around how each firm actually works.

## On-premise is the consequence

This is the part that ties it all together - and it's where we're putting our money where our mouth is.

If you believe firms should own their context, then you have to go all the way. That means the platform runs on the firm's infrastructure, where the data never leaves their walls.

This is the architectural consequence of everything above. If the context layer is the most valuable part of the stack, and it's built from the firm's proprietary data, research, and workflows, then it can't live on someone else's servers. Full stop.

For firms that want the same principle with less infrastructure overhead, we built OpenBB as a [Snowflake Native App](https://openbb.co/blog/openbb-launches-openbb-workspace-as-a-snowflake-native-app-on-snowflake-marketplace). It runs on your Snowflake instance - your data stays in your environment, you control the compute, and you're up and running without a six-month deployment. Same ownership, easier on-ramp.

Either way, the firm owns the context. We provide the workspace - the finance-native building blocks, the open ecosystem for data providers and widget builders, the agentic layer that both humans and AI can operate on. But the intelligence, the data, the workflows? That stays with you.

## Context compounds

Another beautiful thing with context is that it isn't static. Every workflow executed, every analysis run, every agent interaction generates more context. What your analysts researched, how they structured their analysis, what patterns the agents flagged, what decisions were made and why - all of that feeds back into the system.

If that compounding happens on your infrastructure, your firm gets smarter over time. Your agents get better because they're learning from your firm's accumulated intelligence. That's a real defensible edge.

If that compounding happens on a vendor's infrastructure, the vendor captures that value. They get smarter. Their product gets better. And your proprietary workflows become training data for a system that serves everyone else.

The open ecosystem isn't a feature. It's the architecture. And paradoxically, it's the moat - because the platform that lets everyone build on it will always have more integrations and capabilities than the one that tries to do it all alone.

Openness compounds.

In a world where context rules everything, the platform with the most context wins. But the context has to belong to the firm, not the platform.

The firms that understand this will build on infrastructure that gives them that ownership.
