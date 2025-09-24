---
slug: openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about
title: OpenBB Workspace + MCP - The platform play I can’t stop thinking about
date: 2025-08-12
image: /blog/2025-08-12-openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about
tags:
  - openbb
  - mcp
  - model-context-protocol
  - platform-strategy
  - ai-agents
  - workspace
  - integrations
  - developer-tools
  - fintech
  - ai-infrastructure
description: How a simple protocol could change the way firms build, integrate, and scale with OpenBB.
hideSidebar: true
---

How a simple protocol could change the way firms build, integrate, and scale with OpenBB.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

When I first heard about the Model Context Protocol (MCP), I didn't get the hype.

People on X were starting to buzz about it - but people hype everything that comes along, and most of those topics fade quickly.

<p align="center">
    <img width="600" src="/blog/2025-08-12-openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about_1.png" />
</p>

I kind of understood the idea, but I couldn't see what made it so special from an OpenAPI spec for LLMs.

At the start of the year, I attended the AI Engineering Conference, where they had a workshop Saturday on MCP by Anthropic, that I attended with <a href="https://x.com/virattt" target="_blank">Virat</a>.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/kQmXtrmQ5Zg?si=BSIRbU3hpB3jCzeH"
        width="600"
        height="300"
    />
</div>

<br />

Even then I didn't fully get it.

Virat, though, got it instantly. A few weeks later, he'd already built an <a href="https://docs.financialdatasets.ai/mcp-server" target="_blank">MCP server for financial datasets</a> - one of the very first for finance.

## We'd been doing "MCP" all along

Part of my early skepticism was because, in many ways, OpenBB had already solved this problem before MCP even had a name.

We'd built our own protocol to integrate data into the Workspace so that it could be consumed by both humans (through visualization) and AI agents (through function calls). I even wrote about it <a href="https://didierlopes.com/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb" target="_blank">here</a>.

We spent years making sure that any data feeding the Workspace was equally usable for the UI and for AI - effectively building MCP before MCP existed.

So when MCP came along, I didn't feel the pull. We already had our own seamless protocol and didn't see why we needed someone else's.

## The "Aha" moment: Tools without a UI

Then things started to change.

MCP topic started showing up on our client conversations. They weren't necessarily asking for MCP at first, but wanted to know what was our strategy towards it.

At the same time, I was adding MCP Servers to my Claude Code, <a href="https://didierlopes.com/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp" target="_blank">such as the Figma one</a>. And that's when my perspective started to shift. There I was with all my data in Figma, and with a couple of clicks my agent in a completely different environment (the terminal) had access to it.

It wasn't even just about the data but the tools. Ultimately, the context.

That was it.

The killer use case for OpenBB wasn't on the data side - we already handle that well with UI components.

It's **tools that don't need to be visualized**, and can work with the data already in the Workspace.

Think:

- Writing an investment memo in OpenBB and sending it straight to Ghost (workflow suggested by <a href="https://www.linkedin.com/in/ca%C3%ADque-cober-117bbb1ab/" target="_blank">Caique</a>).
- Using a memory server to remember user preferences across sessions.
- Monte Carlo models
- Code interpreter
- Web search
- …

It's like a **universal adapter** for capabilities.

Plug in the tool, and it just works inside the Workspace - for both humans and AI.

And it's not just a handful of companies working on this.

There are thousands nows.

It's the differentiator between companies that innovate and the ones who don't (but will soon do).

There are full-blown directories with MCP Server URLs that you can connect with a couple of clicks - e.g. smithery.ai with hundreds of MCP servers ready to connect (Derek has an <a href="https://youtu.be/ITRvaLmVAWM?si=jprbfEtMGeYU4hMO&t=241" target="_blank">awesome demo</a> on the topic).

Each server is a potential new feature.

- **Before**: every integration was a full-blown project.

- **Now**: browse, connect, use. That easy.

Even simple tools, like <a href="https://context7.com/" target="_blank">Context7</a>, can improve the user experience significantly.

<p align="center">
    <img width="800" src="/blog/2025-08-12-openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about_2.jpeg" />
</p>

That's when it became obvious - this wasn't just a nice-to-have, it was a platform play. 

Our platform play.

## How we decide what to build ourselves

MCP won't replace what we build - it complements it.

Obviously, when the data is meant to be rendered as a widget on OpenBB - we rely on our protocol. As the information in the protocol contains now just raw data but the way it's displayed on the workspace, the parameters, the apps, the prompts, …  

However, when features relate mostly with the usage of an AI agent we will be more mindful about the features that we want to own.

<p align="center">
    <img width="800" src="/blog/2025-08-12-openbb-workspace-mcp-the-platform-play-i-cant-stop-thinking-about_3.png" />
</p>

I foresee us owning the features when:

**They rely deeply on Workspace data, e.g.**:

- **Global Data** which gives the agent access to the full range of data widgets in the entire workspace product.
- **Generative UI** which gives the agent access to the workspace dashboard and allows to add widgets into the dashboard based on the conversation or modify the dashboard

**We need to control the full end-to-end experience, e.g.**:

- **Web Search** where we want to be able to control the way the citations are highlighted so they work more natively on the product
- **Code Interpreter** (coming soon) so that we optimize this virtual sandbox to create charts that can be created as interactive widgets to add to the workspace.

Everything else?

The MCP ecosystem can handle it - often better than we could build it ourselves.

And even for some of these, users may still want to add their own web search or code interpreter.

But ultimately, we are giving them that option.

The way I see it, MCP turns OpenBB into the place to build financial applications - a permissioned, AI-ready infrastructure layer that can tap into an entire universe of tools without friction.

A few months ago, I didn't see it.

Now, I can't stop thinking about what we'll build next.
