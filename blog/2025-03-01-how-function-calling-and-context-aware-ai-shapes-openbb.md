---
slug: 2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb
title: How function calling and context-aware AI shapes OpenBB
date: 2025-03-01
image: /blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb
tags: ['AI', 'function calling', 'data analytics', 'openbb', 'financial analysis', 'agent', 'copilot']
description: Building on OpenBB's presentation at the Anote AI Day Summit, this post explores how intelligent function calling serves as the cornerstone of our AI-native workspace for data analytics.
hideSidebar: true

---

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb.png" />
</p>

Building on OpenBB's presentation at the Anote AI Day Summit, this post explores how intelligent function calling serves as the cornerstone of our AI-native workspace for data analytics.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I recently had the opportunity to present our OpenBB Copilot and how most of what it does is function calling, in the Anote AI Day Summit: [It is All Function Calling - Anote AI Day Summit 2025](https://www.youtube.com/watch?v=gH1mMtRa84Y).

This blog post is a similar presentation in text-written format.

## Our vision for the OpenBB Workspace

At the core of our product is the OpenBB workspace, a fully customizable dashboard where users can control their data visualization and analysis. The middle section shows a dashboard that you can fully customize with widgets containing relevant data widgets. We've designed it with a practical sidebar for managing dashboards, folder organization, sharing capabilities, templates, and data connections.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_1.png" />
</p>

But what I'm going to talk about is our agentic sidebar on the right. This is effectively your AI agent that works as an analyst with access to all the data inside the product. And this is where our implementation of function calling becomes crucial.

## Context is key

We've developed three ways to provide context to our Copilot:

1. **Explicit context**: We've added a simple button on the top right of widgets that allows users to directly add them to the Copilot's context. You can also simply drop files into the Copilot window.

<br />

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_2.png" />
</p>

2. **Dashboard context**: In this case, the Copilot can access all data present on the current dashboard and will then inform the user which widgets were used.

<br />

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_3.png" />
</p>

3. **Global context**: Through a feature flag, users can also enable searching across all widgets within the workspace.

<br />

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_4.png" />
</p>

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_5.png" />
</p>

What's important is how we've prioritized these: explicit context takes precedence, followed by dashboard context, and then global context.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_6.png" />
</p>

It's similar to an analyst's process—you begin by examining the document in front of you, then assess the items on your desk, and finally consider your wider resources, such as Google Drive or Slack.

### The power of widget metadata

One of our key innovations is our metadata system.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_7.png" />
</p>

Each widget in our product has what we call "widget metadata" composed of five components:

- Title
- Category
- Subcategory
- Description
- Data source

We convert this metadata into embeddings and compare it against user prompts to determine which functions the Copilot should access. This allows us to scale effectively while maintaining accuracy, especially since there can be literally thousands of data widgets. Due to the metadata, widgets are only invoked when a user triggers a relevant prompt.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_8.png" />
</p>


## Function Calling in practice

Let me share some real examples of how this works.

### Basic function calls

When analyzing unstructured data like market reports, our Copilot can extract specific information without parameter changes:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_9.png" />
</p>

Copilot understands from widget metadata that the user requires information from it and queries it:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_10.png" />
</p>

In turn that data is utilized to answer the prompt:


<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_11.png" />
</p>

### Parameter-modified calls

We can handle cases where users want to switch contexts.

For instance, even if you're looking at Apple news, you can ask about Palantir, and our system will automatically adjust the parameters:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_12.png" />
</p>

Copilot understands from widget metadata that the user requires information from it and queries it:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_13.png" />
</p>

But, not as is. It requires updating input parameters accordingly (symbol and dates):

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_14.png" />
</p>

In turn, that data is utilized to answer the prompt:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_15.png" />
</p>

Finally, the utilized widget (with updated parameters) can be added to the dashboard seamlessly.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_16.png" />
</p>

### Complex analysis

For more sophisticated tasks like analyzing futures contracts for arbitrage opportunities, our Copilot can make multiple function calls, process the data, and create visualizations.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_17.png" />
</p>

Copilot understands from widget metadata that the user requires information from it, with updated parameters, and queries it.

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_18.png" />
</p>


In turn, that data is utilized to answer the prompt...

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_19.png" />
</p>

and creating a chart like the user asked:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_20.png" />
</p>

Finally, the resulting artifact (in this case, a chart) can be added to the dashboard:

<p align="center">
    <img width="900" src="/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb_21.png" />
</p>

## Verification and output

We're particularly proud of our verification system for the Copilot. It allows users to:

- See the step-by-step reasoning
- Access data sources through citations
- Add source widgets to their dashboard
- Get highlights of specific data references

The output can be added directly to the dashboard as new widgets, creating a seamless workflow from query to visualization to presentation.

## Looking forward

We've built something that I believe truly changes how people can interact with financial data, and we're just getting started. The combination of intelligent function calling, context awareness, and user-friendly interface is making sophisticated financial analysis more accessible than ever before.

You can get started for free at [pro.openbb.co](http://pro.openbb.co).