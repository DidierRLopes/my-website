---
slug: chat-is-not-the-future-interface-its-the-future-router
title: Chat is not the future interface. It's the future router.
date: 2026-01-20
image: /blog/2026-01-20-chat-is-not-the-future-interface.webp
tags:
- ai
- user-interface
- chatbots
- product
description: Why AI won't replace your apps, but your home screen
hideSidebar: true
---

Why AI won't replace your apps, but your home screen

<!-- truncate -->

There's a narrative floating around AI circles that goes something like this: "In the future, we won't need apps. We'll just chat with AI and it will do everything for us."

It sounds compelling. **But it's wrong.**

Not completely wrong - there's a kernel of truth buried in there. But the maximalist version of this take? The one where chat interfaces subsume everything? **That's a fantasy that ignores how humans actually want to interact with information.**

Let me show you why.

## The evolution is already telling us the answer

Watch the progression over the past two years:

First, we had chat only. GPT-3, early ChatGPT. Text in, text out. Revolutionary at the time.

Then we got charts generated in chat. Cool, but you're squinting at a chart generated between paragraphs of text. And you can only interact with it via panel drag, zooms, etc… very limiting.

Then Claude introduced Artifacts - a side panel where code, documents, and visualizations could live *outside* the chat stream. Suddenly the chat wasn't the destination. It was the control panel.

Then Perplexity started generating full workspace-like experiences.

Then Claude showed up in Excel. Not replacing Excel. Living inside it.

Notice the direction here? We're not converging on chat. **We're expanding out of it.**

Every major AI interface innovation of the past months has been about escaping the constraints of the chat window, **not doubling down on them.**

## The "generate UI on the fly" fantasy

There's a related idea that's equally seductive: AI will just generate custom interfaces on the fly, perfectly tailored to your task. No need for pre-built apps. The UI materializes from your intent.

It's a beautiful vision. **But it doesn't work due to latency.**

By the time the AI understands your request, generates a custom interface, renders it, and lets you interact with it - you could have just opened the app. The cognitive overhead of waiting for a UI to materialize, then learning that UI, then realizing it's not quite right, then asking for modifications... it compounds.

For this to work, the strong foundation needs to be set in advance. Which means you're not really using "generated UI". You're using pre-built components that get assembled based on your request.

And at that point, the chat isn't the interface. **It's just the router.**

## The chat-only life: a thought experiment

Let's stress-test the chat maximalist position. Imagine running your entire digital life through a chat interface:

### Chat-only Instagram

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_1.webp" alt="Chat-only Instagram thought experiment" />
</p>

<br />

"Show me my feed." You get a list of descriptions. "Show me the third image." You see it. "Like it." Done. "Show me comments." You read them in a text block. "Post a comment." You type it.

Yup, this would suck.

### Chat-only calendar

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_2.webp" alt="Chat-only calendar thought experiment" />
</p>

<br />

"What's on my schedule tomorrow?" Fine, that works. "Move my 2pm to 3pm." Also fine. "Show me my week and help me find 90 minutes for deep work." Now you want to *see* the gaps. You want to drag and drop. You want spatial reasoning.

Chat is great for queries but is actually very bad for manipulation of complex, visual information.

### Chat-only Map

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_3.webp" alt="Chat-only map thought experiment" />
</p>

<br />

"What are the directions to the stadium?" You get a turn-by-turn list: "Head north, turn right on Main St...". "What's the ETA?" You get a time. "Show me the area and help me find a scenic route with less traffic." Now you want to see the green park, the red traffic lines. You want to drag your route to a different street. You want spatial reasoning…

And if you get the map embedded on the chat response, then you want to interact with it. Which at that point you might as well be in the Maps app.

### Chat-only Jira

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_4.webp" alt="Chat-only Jira thought experiment" />
</p>

<br />

"Show me my sprint backlog." You get a text list. "Move ticket PROJ-447 to In Progress." Done. "Show me the board."

This could actually work, except that you lose the drag and drop experience and the ability to zoom-in a ticket to get more details or change assignee etc.

## What chat actually replaces

Here's the reframe: **chat doesn't replace apps. Chat replaces the router to apps.**

Think about your laptop right now. You have a dock with icons. You click an icon, an app opens. The dock is a routing mechanism - a way to get to the thing you actually want to use.

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_5.webp" alt="Laptop dock with icons" />
</p>

<br />

Your phone works the same way. Grid of icons. Tap one. App opens.

This routing mechanism is dumb. It requires you to know which app you need before you can get there. It forces you to think in terms of applications rather than tasks.

Chat fixes this.

"I need to analyze last quarter's revenue by region" → routes you to a data workspace with the right context loaded.

"Schedule a call with David next week" → routes you to your calendar with suggested slots.

"Draft a response to that investor email" → routes you to a writing environment with the email thread as context.

The chat is the new dock. The new home screen. The new command line. But you still land somewhere richer than a text box.

## The ChatGPT Apps announcement

They're acknowledging that chat alone isn't enough. That users need richer interfaces for certain tasks. That the "just chat" paradigm has limits.

The interface layer still matters.

It just gets summoned differently now.

And this time it lives on the cloud first as opposed to [Computer Use Agents](https://openai.com/index/computer-using-agent/), which relies on user's operating system.

## Where this leaves us

Chat is genuinely transformative. For quick queries, brainstorming, first drafts, routing decisions - it's unbeatable.

But it's a steering wheel, not the engine.

Companies will build AI that drops you into the right experience at the right moment. The ones that don't will keep trying to stuff spreadsheets and calendars and design tools into a text box.

The future isn't chat replacing interfaces. It's chat as the universal entry point to interfaces that actually respect how humans think.

## Appendix

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_6.webp" alt="Apps in ChatGPT announcement" />
</p>

<br />

And a highly relevant post I read with the exact same idea I share in this thread:

<p align="center">
    <img width="800" src="/blog/2026-01-20-chat-is-not-the-future-interface_7.webp" alt="Related post about chat as router" />
</p>
