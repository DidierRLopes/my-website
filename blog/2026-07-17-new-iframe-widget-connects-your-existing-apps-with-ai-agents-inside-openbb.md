---
slug: new-iframe-widget-connects-your-existing-apps-with-ai-agents-inside-openbb
title: "New iframe widget connects your existing apps with AI Agents inside OpenBB"
date: 2026-07-17
image: /blog/2026-07-17-new-iframe-widget-connects-your-existing-apps-with-ai-agents-inside-openbb/2026-07-17-new-iframe-widget-connects-your-existing-apps-with-ai-agents-inside-openbb.webp
tags:
- openbb
- iframe
- mcp
- agents
- widgets
description: "Bring your existing web apps into OpenBB Workspace and make them part of the workflow. The new iframe widget lets Streamlit dashboards and internal tools..."
hideSidebar: true
---

Bring your existing web apps into OpenBB Workspace and make them part of the workflow. The new iframe widget lets Streamlit dashboards and internal tools share parameters, export data into the Workspace, and connect to AI agents.

<!-- truncate -->

Until recently, the iframe widget in OpenBB Workspace did one job. You dropped in a URL and it loaded that page inside a dashboard tile. Handy for keeping an internal tool in view, but nothing past that. The page rendered and you still worked around it.

The revamped iframe widget changes this in a meaningful way:

- You can have the iframe come preloaded with the right app for each dashboard, because the URL can now be set from your backend instead of being configured manually.
- You can make the iframe drive real interactions, not just display a page, by executing JavaScript inside the widget.
- You can keep filters and state consistent across the dashboard, because widget parameters can now stay in sync with the iframe content.

<br />

For example, you can use it for state and filter management. The demo below shows the [Terrapin app](https://pro.openbb.co/app?tab=apps-marketplace&app=muni-bond-lookup), where an iframe widget controls the parameters across the other (grouped) widgets in the dashboard.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/-kll-dZLhDU"
        width="800"
        height="400"
    />
</div>

<br />

This covers what you can do with the widget directly. The other half of the equation is the agent.

If you have an agent running in the Workspace, how does it interact with this iframe?

## MCP tools associated with iframe widget

MCP servers and tools can now be associated to an iframe widget, so any agent in the Workspace can interact with the underlying data. Those MCP tools expose read and write actions against the iframe, so the agent can both pull data out and drive interactions back into the embedded app.

You can drive the widget yourself through JS execution or you can also give the agent a way to read from and write to that same widget through MCP.

Read more about the technical details in our [Iframe - OpenBB Docs](https://docs.openbb.co/workspace/developers/widget-types/iframe).

Data and analytics providers can put all of this to work from within the Apps Marketplace.

In the [Kalshi](https://pro.openbb.co/app?tab=apps-marketplace&app=kalshi-prediction-markets) example, you ask questions to an agent and it answers with live numbers from the Kalshi iframe. The agent reads the table in the iframe and returns structured results through MCP tools, so it is effectively querying that app on your behalf.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/PSX_C2RWJoI"
        width="800"
        height="400"
    />
</div>

<br />

## The native app experience

One last thing that mattered to us was letting users port their existing applications into the Workspace, and have it look clean.

Now both the widget navbar and the border containers are hidden, so it feels like you are inside that app, with the benefit of having OpenBB Copilot (or another agent you have connected) available to you. Instead of looking like you brought your application into OpenBB Workspace, it looks like you brought OpenBB Copilot into your existing application and use case.

Here's a Streamlit app we built as a reference you can use:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/jh6wSP-GMPk"
        width="800"
        height="400"
    />
</div>

<br />

The code can be seen and edited here: [Streamlit — OpenBB Iframe Widget Protocol](https://github.com/OpenBB-finance/backends-for-openbb/tree/main/widget-examples/streamlit)

The upgraded iframe widget is now available to all users, including the Community Edition.

We can't wait to see the workflows the community builds with this new flexible widget.
