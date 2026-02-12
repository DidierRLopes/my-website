---
slug: the-year-of-consolidation
title: "2026: The Year of Consolidation"
date: 2026-01-23
image: /blog/2026-01-23-the-year-of-consolidation.webp
tags:
- ai
- enterprise
- technical-debt
- openbb
description: Technical debt is about to hit levels we've never seen.
hideSidebar: true
---

Technical debt is about to hit levels we've never seen.

<!-- truncate -->

## The building boom

The bar is so low to build apps.

Like literally so low.

You are literally able to ship a working application without knowing a single thing about software engineering. This has never happened in the history of human kind! Like literally.

So now anything you want to do you can get it done in a couple of hours using one of the latest coding agents.

The friction of building collapsed overnight.

I'm not just talking about engineers. Data scientists are doing it (Boris, creator of Claude Code, actually has a funny anecdote about it [here](https://youtu.be/AmdLVWMdjOk?si=ARe83kshNQgoAMUa&t=4588)); Analysts are doing it; PMs are doing it; damn even C-level execs are doing it.

This is great right?

**Kind of.**

## The Frankenstein problem

When everyone can build apps in a few hours, you don't get a streamlined organization.

You get Frankenstein.

Think about what actually happens inside a 500-person firm when building becomes nearly free:

- The equity research team builds a custom earnings dashboard
- The credit team builds their own version - same data sources, different assumptions
- The macro team builds another - same widget types, different logic
- Portfolio management builds yet another - because the other three don't quite fit their workflow

<br />

Four dashboards. Four codebases. Four sets of assumptions. Four potential points of failure. Zero shared foundation.

Now multiply this across every function, every team, every use case that someone thought was "quick enough to just build myself".

What do you get?

A graveyard of internal tools that nobody maintains, nobody documents, and nobody knows how to find.

I literally have seen this happening already - usually in the form of 10+ Streamlit apps.

The other issue is that once you want to add an intelligence layer to these apps, it requires very expensive AI developers to build them. But you are reinventing the wheel every single time to build an agent familiar with that specific app that was built.

## The visibility crisis

Here's a question you should start asking your CTO/CIO:

"Do you know how many internal AI tools your organization built last year?"

Most can't answer.

Not because they don't care - because they genuinely don't know.

When a quant builds a custom model in a Jupyter notebook, does that count? When an analyst creates a Streamlit app for their team, is that tracked? When someone spins up a quick automation using Claude, does IT even know it exists?

The honest answer at most firms: *no visibility whatsoever*.

This creates two problems:

**1. Duplication at scale**

I've seen the same widget rebuilt several times (and over) across different teams at the same firm. Not because people are lazy - because they didn't know it already existed. There's no central registry.

No shared workspace.

**2. Governance nightmares**

When you don't know what's being used, you can't govern it. You can't audit it. You can't secure it. Every one of those "quick internal tools" is a potential compliance risk, a data leak waiting to happen, a black box that someone critical to the business depends on.

At a 10-person startup, this can be managed. At a 2,000-person financial institution, it can't.

## The technical debt tsunami

Here's the thing about the "build fast" era: the debt comes due.

Every prototype that skipped proper authentication? **Debt**.

Every dashboard that hardcoded assumptions? **Debt**.

Every tool built on a free tier API that's about to change pricing? **Debt**.

Every widget that only one person understands? **Debt**.

<p align="center">
    <img width="600" src="/blog/2026-01-23-the-year-of-consolidation_1.webp" alt="Technical debt tweet" />
</p>

<br />

We've talked about technical debt for decades. But what's coming is different in scale.

Previously, technical debt accumulated slowly. Building was hard enough that the rate of debt creation was naturally constrained.

Now? The rate of creation has 10x'd while the rate of maintenance has stayed flat.

The math doesn't work.

I predict 2026 will see the first wave of "**AI tool cleanup**" initiatives at major enterprises - massive projects to audit, consolidate, or kill the hundreds of internal tools that were built.

Maybe the best ones stick? But even then, you will need a way to consolidate what they do for other departments.

Some firms will do this proactively.

Most will be forced into it after something breaks.

## The consolidation imperative

So what's the answer?

It's not "stop building". There's too much at stake.

The answer is consolidation. A uniform layer that sits in the middle.

Think about what actually needs to happen:

**One data layer.** Every tool, every dashboard, every agent pulling from the same governed, normalized data sources. Not twelve different connections to the same API with twelve different authentication schemes.

**One workspace.** A central place where tools get built, discovered, and shared. Where leadership can actually see what exists. Where teams can find what's already been built before rebuilding it.

**One governance framework.** Audit logs. Permissions. Compliance controls. Applied consistently across every tool, not retrofitted onto whatever someone spun up in an afternoon.

The idea is to make innovation sustainable.

## Where OpenBB Fits

This is exactly why we built OpenBB the way we did.

Not as another point solution. Not as another tool to add to the pile.

As the uniform layer.

One workspace where every widget, every workflow, every agent operates from the same foundation. Data normalized once, available everywhere - workspace, API, Excel, agents. Governance built in from day one.

When your equity team builds a dashboard, it's discoverable. When your credit team needs something similar, they extend it rather than rebuild it. When leadership asks "what AI tools are we using", there's an actual answer.

The infrastructure layer that lets you keep building fast - without the Frankenstein.

## The fork in the road

2026 is going to separate two types of organizations:

- **The consolidators:** Firms that recognize the mess, centralize proactively, and emerge with a clean, governed, scalable foundation for AI-native workflows.
- **The firefighters:** Firms that keep building on shaky foundations until something break - then scramble to clean up while their competitors pull ahead.

<br />

The consolidation is coming either way.

<p align="center">
    <img width="800" src="/blog/2026-01-23-the-year-of-consolidation_2.webp" alt="OpenBB Workspace - Apps" />
</p>
<p align="center" style={{fontSize: '0.85em', marginTop: '-0.5em'}}>OpenBB Workspace - Apps</p>

<br />

And we are building towards it.
