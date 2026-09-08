---
slug: introducing-workspace-mcp
title: "Introducing Workspace MCP: agentic financial workflows, governed by design"
date: 2026-05-26
image: /blog/2026-05-26-introducing-workspace-mcp/2026-05-26-introducing-workspace-mcp.webp
tags:
- openbb
- mcp
- agents
- workspace
- governance
description: "Workspace MCP lets Claude Code, Codex, and any MCP-compatible agent do real financial work inside your environment, on your data, governed from the start."
hideSidebar: true
---

Workspace MCP lets Claude Code, Codex, and any MCP-compatible agent do real financial work inside your environment, on your data, governed from the start.

<!-- truncate -->

AI inside investment firms has changed. A year ago, the conversation was about chat interfaces on top of financial data. Today, the firms moving fastest are running long-running agents, Claude Code, Codex, and similar systems that plan and execute work across hours without constant human input.

That shift has exposed a real problem. These agents pull from whatever data they can reach, often scattered across disconnected sources with no consistent permissions layer. Their outputs land in chat threads, documents, or someone's local folder, with no lineage, no access controls, and no clear path into production. The work gets done, but nobody can verify it, govern it, or build on top of it.

## What MCP is

MCP, short for Model Context Protocol, is an open standard that lets AI agents connect to external data sources and take actions through them. Think of it as a universal adapter: instead of every agent needing a custom integration for every data source, MCP makes the connection standardized and plug-and-play.

Most companies have responded to this by shipping a read-only MCP integration. An agent connects, reads data, and answers a question. Done.

A read-only connection lets an agent answer questions. It doesn't let the agent do the job.

## What Workspace MCP actually does

Workspace MCP turns OpenBB Workspace into an environment where MCP-compatible agents can do real financial work, not just retrieve data.

A connected agent can reach any data source you have set up in your workspace, whether that's a proprietary database, a licensed vendor feed, an internal system, or public market data. It can query that data, transform it, and combine sources that normally live far apart.

The output is reusable. Instead of a block of text that gets copied into a document and forgotten, an agent running through Workspace MCP produces working widgets, dashboards, and full apps that the rest of the team can open and use straight away. A portfolio manager's morning brief. A credit dashboard built overnight. A full application the whole desk keeps running.

### Governed by design

When an analyst points a long-running agent at the workspace, everything that agent does runs through OpenBB Workspace's existing governance layer. There is no side door.

**Entitlements apply to the agent exactly as they apply to the user behind it**. A junior analyst's agent reads only what that analyst is permissioned for. It never sees the PM's positions.

**The artifacts an agent builds are governed too**. When an agent creates a widget, a dashboard, or a full app, that artifact inherits access controls like anything else in the workspace. An agent building something doesn't mean the whole firm can see it.

**Connections are vaulted**. API keys and credentials are managed centrally. An agent can use a data connection without the key ever being exposed or pasted into a prompt.

**Every output carries data lineage**. You can trace which sources fed into anything an agent produced. That matters when you need to confirm a licensed feed was used within its terms, or when compliance asks where a number came from.

Right now, a lot of firms are solving this the hard way. Analysts are shipping agent-built apps faster than anyone can review them, sending outputs to developers, asking colleagues how to get things into production. Some CTOs are hiring people whose main job is reviewing what the analysts' AI produced.

Workspace MCP removes that review step. The work is governed as it is created.

## What you can do with Workspace MCP today

### See it in action

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/0tD8prdUK5A"
        width="800"
        height="400"
    />
</div>
<p align="center" style={{fontSize: '0.85em', marginTop: '0.5em'}}>Codex given a PRD and a data source. It builds the full Kalshi Event Explorer app from scratch: 10 widgets across 4 tabs, apps.json, widgets.json, and a live analysis of prediction market data.</p>

<br />

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/WGsjef_SzbI"
        width="800"
        height="400"
    />
</div>
<p align="center" style={{fontSize: '0.85em', marginTop: '0.5em'}}>Codex querying portfolio data, running a full risk assessment across multiple widgets, and pushing the output as a new widget into the Workspace.</p>

<br />

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/CrcU63kHQo8"
        width="800"
        height="400"
    />
</div>
<p align="center" style={{fontSize: '0.85em', marginTop: '0.5em'}}>Ihsan, our CPO, using Cortex Code inside OpenBB Workspace to write SQL queries against FactSet data on the fly, and pushing the output as a new widget into an existing app.</p>

<br />

### Full breakdown

#### Automate specific analysis workflows (eg. portfolio risk assessment)

Point an agent at your portfolio data and ask it to assess risk. In the second demo above, a single prompt to Codex, "assess the risk of my us_stocks portfolio according to the model calibration output and the factor covariance matrix," triggered the agent to read the Risk Calibration, Portfolio Risk, and Factor Covariance widgets in parallel. It came back with a full structured analysis: 19.09% total volatility, a 76.16% factor risk share, and specific covariance relationships flagging Energy, Liquidity, and Consumer Cyclical as the dominant risk sources. The analyst didn't write a line of code.

#### Build apps from your connected data

If your data is already connected to the Workspace, an agent can build a working application on top of it. An analyst describes what they need, the agent writes it, and the result is a functioning widget, a dashboard, or even a full app with multiple tabs, not a prototype that needs a developer to productionize. The firm's entitlements apply from the moment the artifact is created.

In the first demo above, Codex was given a PRD and access to Kalshi's public prediction market data. It built the full Kalshi Event Explorer from scratch: 10 widgets across 4 tabs covering event discovery, market inspection, orderbook data, and probability analysis, including the apps.json and widgets.json configuration files.

#### Ask an agent to explain what you're looking at

When an analyst opens a dashboard they didn't build, they can ask an agent to walk them through it. In the demo, Codex read the full Open Portfolio analytics app and explained each tab, its inputs, its configuration, and what the numbers meant, in plain language. That kind of institutional knowledge transfer normally takes a meeting. Here it takes 25 seconds.

#### Turn analysis into a shareable widget

After running an analysis, an agent can write the output directly into a new HTML widget inside your workspace. Both CoCo and Codex in the demos above created a new tab with a structured widget containing the full findings, ready to be shared with a portfolio manager or pinned to a dashboard. No copy-paste, no reformatting. The artifact lives in the Workspace, governed by the same access controls as everything else.

**Long-running agents are going to run inside your firm whether you plan for it or not. Most of the output will end up in a chat thread, ungoverned, untraceable, and useful to nobody. Workspace MCP is how that changes.**

## Get started

Workspace MCP is hosted directly inside OpenBB Workspace. OpenBB provides the MCP endpoint from your Workspace session, and you authorize external agents with tokens created inside Workspace.

**Connection steps**:

1. Open OpenBB Workspace.
2. Click the hamburger menu in the top left and select MCP Companion.
3. Turn on the Endpoint connection. Workspace will show the hosted MCP endpoint for your session.
4. Click the "Create Token" button to create a token that will authorize your AI agent interacting with OpenBB Workspace through the MCP. Save the token when it is shown, because it cannot be viewed again later. You can create as many tokens as you need and they will work until you revoke them.
5. Configure your MCP client with the MCP endpoint and the authorization token. Here's an example of how to configure Claude Code to use the MCP:

```bash
claude mcp add --transport http workspace_mcp \
  https://pro.openbb.co/mcp \
  --header "Authorization: Bearer obb_mcp_..."
```

6. Keep the Workspace tab open and the MCP Companion connected while the agent works.

<br />

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/wTUa5afZmBs"
        width="800"
        height="400"
    />
</div>

<br />

Once connected, the agent can read your active Workspace session, manage widgets, build apps from your connected data, and navigate dashboards on your behalf. The agent runs through the same Workspace governance layer as the user behind the session: entitlements still apply, credentials stay vaulted, and artifacts created by the agent remain governed inside Workspace.

For the full setup guide, see the [Workspace MCP Quickstart](https://docs.openbb.co/agents/workspace-mcp-quickstart). For architecture and security details, see the [Workspace MCP Overview](https://docs.openbb.co/agents/workspace-mcp-overview).

For teams that want to run the full setup inside their own premises or VPC, reach out to our team, and we can walk through what that looks like.
