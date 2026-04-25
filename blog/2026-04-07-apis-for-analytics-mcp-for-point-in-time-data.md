---
slug: apis-for-analytics-mcp-for-point-in-time-data
title: "APIs for Analytics, MCP for Point-in-Time Data"
date: 2026-04-07
image: /blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data.webp
tags:
- mcp
- api
- openbb
- ai
description: "MCP adoption is real."
hideSidebar: true
---

MCP adoption is real.

<!-- truncate -->

At the Future Alpha event a few days ago, most panels that were talking about AI ended up talking about MCP. That was not the case a few months ago.

Buy-side is paying attention. Two Sigma compared MCP adoption to ATM adoption driven by interbank card networks. Sell-side too. Goldman Sachs is betting on it heavily. And data vendors who want to reach end users are now forced to build MCP servers. Some were even mentioning how the consumption-based pricing model is the future.

So MCP has momentum.

But everyone has seen the recent posts on CLI > MCP.

So let's debunk that first.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_1.webp" alt="CLI vs MCP meme" />
</p>

The short answer is no. They solve different problems.

**CLI is about direct execution within an environment you already have access to.**

You open a terminal, run commands, interact with files, processes, and network resources. The trust boundary is the environment itself: the OS, the container, IAM, whatever. The interface doesn't constrain intent. If you can run it, you can run it.

**MCP is about controlled access to capabilities exposed by a system you don't have direct access to.**

The trust boundary is the server, not the environment. The server defines what you can do, with what inputs, and whether you're allowed. It exposes scoped tools with typed I/O. The agent sends requests. The server decides what happens.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_2.webp" alt="CLI vs MCP diagram showing trust boundaries" />
</p>

This matters because agents aren't humans sitting at a terminal. An agent needs to connect to systems, authenticate, discover what's available, and operate within boundaries. That's what MCP does. It gives agents a standardized way to get access and permission to external systems.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_3.webp" alt="MCP agent authentication and discovery flow" />
</p>

We see this concretely in the OpenBB Workspace. When you connect an MCP server like Carbon Arc, the agent authenticates via OAuth, checks the credits in my account, discovers the available tools, and operates within the scope that server exposes.

**But you may ask...**

> *Haven't we figured out access and permissions of data & tools for humans?*

This is a fair question.

And we have.

It's called API for Application Programming Interface.

**So if an agent is trained on human data, shouldn't that suffice?**

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_4.webp" alt="API fragmentation across providers" />
</p>

## The problem is that APIs are bespoke

Every provider has its own auth flow, its own endpoint structure, its own pagination, its own error codes, its own rate limiting. Provider A uses OAuth 2.0, REST with cursor pagination, and returns JSON errors. Provider B uses API key plus HMAC, GraphQL with relay pages, and returns status codes with a body. Provider C uses mTLS with tokens, gRPC with offset pagination, and has a custom error schema. N providers means N integrations. Each one is a custom job.

**MCP is a universal protocol.**

One client speaks to N MCP servers the same way. The agent doesn't need to know it's talking to different servers. It discovers what's available, calls it, gets results. Every server exposes tools/list, tools/call, and typed responses. N providers means one integration. Same interface every time.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_5.webp" alt="API vs MCP integration comparison" />
</p>

## Are API and MCP the same in a way?

This is from the [documentation from FastMCP](https://gofastmcp.com/servers/server) (one of the most popular MCP frameworks in Python):

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_6.webp" alt="FastMCP documentation" />
</p>

And shows that a function, which can be turned into an API with FastAPI, only requires 1 line of code to be turned into an MCP tool.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_7.webp" alt="FastMCP code example showing one-line conversion" />
</p>

But there are real differences beyond standardization.

- **Data volume.** APIs are built for bulk. You can stream gigabytes, paginate through millions of rows, download entire datasets. MCP is designed for agent-sized bites. The responses need to fit in a context window. You wouldn't use MCP to bulk export a year of tick data. You'd use an API.

- **Caller intent.** APIs assume the caller already knows what it wants. The developer reads the docs, picks the endpoint, constructs the request. MCP assumes the caller needs to figure out what it wants. Discovery, schema inspection, parameter descriptions. The interface is designed for a reasoning agent that explores before it acts.

- **Granularity of exposure.** An API typically exposes everything. Full CRUD, admin endpoints, bulk operations, the entire surface area. MCP is curated. You expose only what you want the agent to do. Nothing more.

- **Composition.** A single MCP tool call might use three or four API calls behind the scenes, aggregate the results, and return a coherent answer. The agent doesn't need to know about the orchestration. With raw APIs, the caller usually manages that orchestration themselves.

- **Real-time and streaming.** APIs handle webhooks, websockets, and long-lived connections well. MCP is request-response oriented. If you need a live feed of price updates, that's an API job.

<br />

The good news is that this isn't an either-or situation.

APIs and MCP can (and should!) coexist.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_8.webp" alt="APIs and MCP coexisting" />
</p>

## How this plays out in the OpenBB Workspace

In the OpenBB Workspace, you can see this playing out.

On the right side you have me asking the OpenBB Copilot to:

> *Use fred series MCP to check latest 2026 UNRATE data*

This utilizes an MCP tool that extracts data from FRED utilizing the open source [Open Data Platform](https://github.com/OpenBB-finance/openbb).

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_9.webp" alt="OpenBB Copilot using MCP to query FRED data" />
</p>

And you can see the step-by-step reasoning that shows the parameters used as part of that MCP tool. But also the artifact generated from it.

On the left side, you have the OpenBB dashboard.

Where you can see a single FRED Series widget, which is basically an abstraction on an API - where the parameters can be selected above.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_10.webp" alt="OpenBB dashboard with FRED Series widget" />
</p>

## Bridging MCP and API with matching signatures

The fact that an MCP tool can wrap one API call, gave us an idea.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_11.webp" alt="API and MCP same signature concept" />
</p>

What if we made it so that when the API and MCP had the same signature, the workspace understood that we were talking about the same data?

And that's what we did.

Basically now if your agent utilizes a certain MCP tool and it finds a widget with the same signature, you get this notification:

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_12.webp" alt="Widget match notification" />
</p>

Then in the agent output, you see the \* next to the citation. This means that whilst the data didn't come from this API, it matches the spec of the MCP one.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_13.webp" alt="Citation asterisk showing MCP and API spec match" />
</p>

Finally, when you add it to the dashboard you can see that they match 1:1 in terms of the input parameters.

<p align="center">
    <img width="800" src="/blog/2026-04-07-apis-for-analytics-mcp-for-point-in-time-data_14.webp" alt="Dashboard showing MCP and API parameters matching 1:1" />
</p>

Same data source. Two different access patterns. The API handles the analytical workload: bulk data, charting, time series exploration. The MCP handles the point-in-time query: what's the latest number?

This is the best of both worlds.

APIs for analytics. MCP for point-in-time data. They're not competitors. They're complements. The API gives you the full dataset to analyze. The MCP gives the agent a quick, scoped answer to a specific question.

Most of the times, you need both.
