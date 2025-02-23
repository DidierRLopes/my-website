---
slug: 2025-02-18-long-live-long-context-with-gemini
title: Validation from BlackRock Aladdin
date: 2025-02-22
image: /blog/2025-02-xx-validation-from-blackrock-aladdin
tags: ['openbb', 'blackrock', 'copilot', 'enterprise', 'agent', 'widgets', 'architecture', 'open-source', 'finance', 'portfolio', 'security']
description: "At the recent AI Engineering Summit, BlackRock unveiled their Aladdin Copilot - a platform remarkably similar to what we've built at OpenBB, but with a key difference. While they've invested massive resources into building a closed system, we've created an open-source solution that achieves the same goals: multi-application support, seamless agent integration, explainable AI, and enterprise-grade security. Here's a deep dive into how the world's largest asset manager validated our approach to AI-powered financial workflows."
hideSidebar: true
unlisted: true

---

<p align="center">
    <img width="900" src="/blog/2025-02-18-long-live-long-context-with-gemini.png" />
</p>

At the recent AI Engineering Summit, BlackRock unveiled their Aladdin Copilot - a platform remarkably similar to what we've built at OpenBB, but with a key difference.

While they've invested massive resources into building a closed system, we've created an open-source solution that achieves the same goals: multi-application support, seamless agent integration, explainable AI, and enterprise-grade security. Here's a deep dive into how the world's largest asset manager validated our approach to AI-powered financial workflows.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

On Friday 21st, I attended the [AI Engineering Summit](https://www.ai.engineer/summit/2025) from @swyx and Ben. If you're working in the agentic space, this is arguably one of the best conferences available.

One presentation that particularly caught my attention was BlackRock's session about their Aladdin Copilot. While I can't share the presentation materials as they're conference-exclusive, what I saw left me incredibly bullish about OpenBB's direction.

IMAGE: OF THE SCHEDULE

Here's why: BlackRock's copilot is remarkably similar to what we've built at OpenBB - but with 1% of their resources and one major distinction.

Let's dive into the striking similarities first.


## Not a single workflow, but multiple applications

BlackRock's Aladdin platform centers heavily on Portfolio - enabling users to handle portfolio construction, management, and monitoring.

In contrast, OpenBB's Workspace functions as an open playground. While it certainly handles portfolio management (as demonstrated in [this example](https://www.youtube.com/watch?v=K80ayaZYyk4)), it extends far beyond that. Our platform supports risk management, equity/crypto/macro research, ideation, ranking, client advisory, and even compliance workflows.

IMAGE OF IT BEING USED BY PUBLIC COMPANY ON SHIPPING VS CLIENT ADVISORY VS COMPLIANCE VS PORTFOLIO

This versatility stems from our workspace architecture where users build on their own data. The flexible widget creation system can accommodate virtually any workflow - provided users have the necessary data.


## Not a single chatting interface, the agent is on the side and is invoked when needed

This is a hill I'm willing to die on.

For the most part, analysts and PMs don't want a chat-only interface for their daily work. I wrote about this extensively [8 months ago](https://openbb.co/blog/why-chat-only-ai-financial-assistants-are-not-the-answer-you-might-think-they-are), and my conviction has only strengthened.

BlackRock appears to share this view. Their agentic copilot acts as a sidebar to the main interface, allowing users to query dashboard data and quickly validate information without disrupting their workflow.

Seeing this in their demo was genuinely shocking - it looked remarkably similar to what we've had in OpenBB for over a year now. It's validating to see the world's largest asset manager (with 20k employees) arriving at the same conclusions we did.

(SHOW IMAGE OF OPENBB WITHOUT COPILOT -> THEN ASK QUESTION AND GET ANSWER AND SHOW COPILOT, HIGHLIGHT THAT)

## Explainability

Both platforms prioritize data transparency. Every copilot response that references dashboard data clearly highlights its source. This enables users to validate LLM outputs and trace information back to its origin, maintaining trust and accountability.

(SHOW CITATION IN PDF + SHOW REFERENCE FROM WIDGET)


## Secure environment first approach

This is non-negotiable in finance, where both data and prompts can be competitive advantages. Our president recently detailed our approach to this in our [on-prem announcement](https://openbb.co/blog/run-openbb-on-premises-and-be-in-control-of-your-data-and-UI).


## Architecture

While I can't share specifics from BlackRock's presentation, I can explain OpenBB's architecture, which appears to follow identical principles.

Our OpenBB Copilot acts as an orchestrator, gathering context from three main sources (in order of importance):

1. In-context: Either attached files or explicitly referenced data widgets
2. Dashboard: Data currently visible in the dashboard
3. Product-wide: Connected to the workspace but not visible

IMAGE: FUNCTION CALL WITH 3 SLIDES

This context exists in the form of widgets, and there can be thousands! In the case of BlackRock, they refer to this as Plugin Registry.

IMAGE: DATA CONNECTORS FROM FUNCTION CALLING SLIDES

### What is a widget?

In our system, a widget combines:

- Data origin (API endpoint, static file, SQL query with DB connection, etc)
- The parameters that can be modified to query a variation of the data
- Metadata (title, description, category, sub-category, and source)

The metadata enables our copilot to identify and utilize appropriate widget based on user prompts, by controlling the widget through its parameters.

You can think of these widgets effectively as tools that are rendered on our workspace. Therefore, our agent can call different widgets to retrieve the data it needs to reply more effectively to the user.

For a deeper dive into this architecture, check out my recent [10-minute presentation](https://www.youtube.com/watch?v=gH1mMtRa84Y).

## Distinction

So what is the main distinction?

How Open we are.

We have an open source data integration framework that enables any firm from bringing any type of data into our product.

We have an open source agentic framework that enables any firm to build their own agent (even one running locally).

And we intend to open source much more.

We believe in a future where each firm will build their own tools on top of the most popular open source infra.

If you fall under that umbrella, reach out.
