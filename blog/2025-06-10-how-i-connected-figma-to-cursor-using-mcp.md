---
slug: 2025-06-10-how-i-connected-figma-to-cursor-using-mcp
title: How I connected Figma to Cursor using MCP
date: 2025-06-10
image: /blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp
tags:
- figma
- cursor
- mcp
- developer-tools
- tutorial
- integration
- design-to-code
- productivity
- development-workflow
description: A step-by-step guide on how to connect Figma to Cursor using MCP (Model-Client-Protocol), enabling seamless design-to-code workflow and improving developer productivity through direct design system integration.
hideSidebar: true
---



import CodeBlock from '@theme/CodeBlock';

<p align="center">
    <img width="600" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp.png" />
</p>

A step-by-step guide on how to connect Figma to Cursor using MCP (Model-Client-Protocol), enabling seamless design-to-code workflow and improving developer productivity through direct design system integration.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

This weekend, I was - **again** - mind blown by technology.

As I was working on OpenBB, and needed to copy the style from the Figma mockups - I stumbled upon Figma MCP.

Here's what I said on the <a href="https://www.linkedin.com/posts/didier-lopes_i-still-cant-believe-this-i-was-deep-into-activity-7337573643431944192-f9-L?utm_source=share&utm_medium=member_desktop&rcm=ACoAABub6aIBaA7HieEI5VizHglQPohLA_Wptag" target="_blank" rel="noreferrer">LinkedIn post</a>.

<p align="center">
    <img width="600" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_1.png" />
</p>

And this is the video that I added to the post:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/UwC_pbEnN3U?si=w15gGna5j1OhgPFp"
        width="800"
        height="400"
    />
</div>

<br />

So, in this short post, I'm going to tell you how you can do the same in a couple of steps.

## Enabling MCP Server on Figma

1. Make sure you are using Figma desktop app.

2. Go into "Dev Mode" on the bottom toolbar.

<br />
<p align="center">
    <img width="400" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_2.png" />
</p>

3. Enable MCP Server.

<br />
<p align="center">
    <img width="400" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_3.png" />
</p>

## Set up MCP client (Cursor)

1. Open Cursor Settings

<br />
<p align="center">
    <img width="500" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_4.png" />
</p>

2. Add a new MCP server

<br />
<p align="center">
    <img width="600" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_5.png" />
</p>

When clicking on "Add Custom MCP", copy paste the following block of code:

<CodeBlock language="json">
{`{
  "mcpServers": {
    "Figma": {
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}`}
</CodeBlock>

Then save it, like this:

<p align="center">
    <img width="400" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_6.png" />
</p>

Once you close that file, you'll see that Cursor Settings MCP tab now displays "Loading tools":

<p align="center">
    <img width="700" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_7.png" />
</p>

After a few seconds you can toggle the Figma MCP and you should be able to see a few tools.

<p align="center">
    <img width="700" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_8.png" />
</p>

## Usage

The usage is very simple.

You just need to select the layout you want to pass to Cursor on Figma, and then right click on it and select "Copy link to selection".

<p align="center">
    <img width="400" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_9.png" />
</p>

Then you paste that link to Cursor and you prompt accordingly.

<p align="center">
    <img width="400" src="/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp_10.png" />
</p>

Note: I recommend to be explicit with the model to utilize MCP.

That's it. I hope this is helpful.

Happy hacking.
