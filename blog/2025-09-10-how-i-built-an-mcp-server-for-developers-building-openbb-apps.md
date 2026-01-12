---
slug: how-i-built-an-mcp-server-for-developers-building-openbb-apps
title: How I built an MCP Server for developers building OpenBB apps
date: 2025-09-10
image: /blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps.webp
tags:
  - openbb
  - mcp
  - ai
  - development
  - tools
  - documentation
description: The hardest part of building an OpenBB app isn't writing Python, it's getting the widgets.json spec right. I built an MCP server to expose every piece of documentation as a structured, callable tool.
---

The hardest part of building an OpenBB app isn't writing Python, it's getting the `widgets.json` spec right, since this spec was invented by us.

Every app requires developers to define widget types, inputs, and configuration options in exactly the right format. The documentation is strong, but it is long-form, which forces you to dig around for the parts you need. That slows down iteration, especially when you just want to get an idea live in OpenBB Workspace.

<!-- truncate -->

AI feels like a natural solution here. For example, providing the documentation to a model like Claude Code and asking it to generate your `widgets.json` spec.

If you ask Claude Code to read the docs from OpenBB, it **kind of works**. But it takes too much time (given the extensive documentation available), wastes a lot of tokens, and the model often gets confused. This is the same as using an MCP server like Context7, except that with Context7 the context is not really guaranteed to be up to date, so it is even worse.

The alternative is to send the exact part of the page that the model requires, which actually works pretty well. But this is very time consuming for the developer. The problem is that when you are building a complex widget, you need context from a lot of different pages, which increases the risk of not sending the right context and the model hallucinating. So basically, it **doesn't work either**.

BUT.

What if, instead of stuffing all the docs into context, **I built an MCP server** where every piece of the documentation is exposed as a structured, callable tool?

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_1.webp" />
</p>

I just had to try it.

## 1. Breaking down the docs into building blocks

I spent the weekend [refactoring OpenBB docs](https://github.com/OpenBB-finance/openbb-docs/pull/104) into developer and analyst roles, so I understood very well the principal components that were relevant for developers.

There are three natural categories of building blocks:

- **Widget types**: Plotly charts, AgGrid tables, Markdown, HTML, Metrics, etc.
- **Parameters and controls**: dropdowns, toggles, date pickers, text inputs, etc.
- **Configuration options**: grid sizing, stale times, error handling, refetch intervals, etc.

Instead of treating the docs as one big reference, I split them into these **granular tools**.

## 2. Adding an ad-hoc boilerplate tool

On top of the building blocks, I added one special tool: `building_widgets_on_openbb`.

This is an **ad-hoc boilerplate reference** that acts as a base. By requiring it to always be called first, I can guarantee that every widget starts from a solid baseline and everything else plugs into that baseline.

I enforced this behavior with the following MCP tool description:

```python
@mcp.tool()
def building_widgets_on_openbb() -> str:
    """Essential boilerplate code for building OpenBB Workspace widgets. 
    This provides the foundational FastAPI setup, CORS configuration, widgets.json endpoints, 
    and register_widget decorator pattern. ALWAYS call this first when creating OpenBB widgets 
    to get the required boilerplate structure."""
    
    return """# Essential Boilerplate Code for OpenBB Workspace Widgets
...
"""
```

## 3. Using FastMCP to turn everything into tools

I used **FastMCP** to create a tool for each block. Every widget type, parameter, and configuration setting is its own MCP endpoint.

So instead of asking the AI, "What's the JSON spec for a dropdown?" and hoping it parses the docs correctly, the AI can just call:

- `widget_parameters_dropdown`
- `widget_types_plotly_charts`
- `widget_configuration_grid_size`

and immediately get valid JSON to work with.

## 4. Deploying on Smithery.ai for easy access

Finally, I deployed the server on Smithery.ai. That makes it discoverable, shareable, and instantly usable, with no local setup required. You can connect Claude Desktop, Cursor, or Smithery Playground to it in seconds.

It became immediately available [here](https://smithery.ai/server/@DidierRLopes/openbb-docs-mcp).

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps.webp" />
</p>

## 5. Testing

But I didn't just deploy and hope for the best.

Instead, I clicked on "Explore capabilities" on the [smithery.ai page](https://smithery.ai/server/@DidierRLopes/openbb-docs-mcp) and asked it to create a complicated `widgets.json` spec for a specific widget request.

It didn't work perfectly at first.

But that's okay. I went back and improved the docs (and even realized that I needed the ad-hoc boilerplate tool).

Eventually, it worked.

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_2.webp" />
</p>

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_3.webp" />
</p>

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_4.webp" />
</p>

## How to use it

Here's how you may use this OpenBB widgets.json spec MCP Server with Claude Code.

1. Add this MCP Server to Claude Code (URL [here](https://server.smithery.ai/@DidierRLopes/openbb-docs-mcp/mcp))

```bash
claude mcp add --transport http openbb-docs-mcp https://server.smithery.ai/@DidierRLopes/openbb-docs-mcp/mcp
```

2. Set up MCP Server and authenticate

And ensure you see a "✅ connected"

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_5.webp" />
</p>

3. Then ask your prompt, and you need to confirm that CC can access these MCP tools.

This is what you expect to see:

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_6.webp" />
</p>

In the end, you should be able to get the correct `widgets.json` spec.

## Monte Carlo stock simulation widget

In order to test this, I ask CC:

_Create an OpenBB widget that has 3 parameters (ticker str, start date and boolean). The data is meant to be a plotly chart, but also support raw data. And because it's a monte carlo simulation, can you add a run button to it?_

But essentially, it allowed me to connect this one-shot widget to the workspace:

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_7.webp" />
</p>

Note the difficulty associated with building this widget from scratch:

- Requires adding the boilerplate code
- Requires a Plotly visualization with simulation paths plus percentile bands
- Adds 3 parameters: `ticker` (text), `start_date` (date), `use_volatility_adjustment` (boolean)
- Raw data mode returning pure simulation arrays
- A run button for manual execution

This example shows the end-to-end workflow:

**AI + MCP server → OpenBB widget in minutes.**

One recommendation I have is to separate the data problem from the `widgets.json` specs. Make sure it works with mock data first, and once that is figured out, you just need to ensure you can push the correct data to it.

## tl;dr

AI as a search engine for docs is messy and inconsistent.

**AI as a programmable assistant with tools is structured, accurate, and composable.**

By exposing the docs as tools, you reduce hallucinations, improve accuracy, and make it much easier for developers to mix and match widget components when building new OpenBB apps.

Happy hacking!

**PS:** We are actually working on introducing Widget Studio, which will greatly simplify the user experience of building custom widgets in the workspace, particularly when it comes to the UI.

<p align="center">
    <img width="800" src="/blog/2025-09-10-how-i-built-an-mcp-server-for-developers-building-openbb-apps_8.webp" />
</p>