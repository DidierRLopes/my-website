---
slug: what-if-you-could-create-any-report
title: What if you could create any report - right where your data lives?
date: 2026-02-20
image: /blog/2026-02-20-what-if-you-could-create-any-report.webp
tags:
- openbb
- ai
- open-source
- skills
description: Bringing Claude Code Skills into the OpenBB Workspace to create custom reports right where your data lives.
hideSidebar: true
---

Bringing Claude Code Skills into the OpenBB Workspace to create custom reports right where your data lives.

<!-- truncate -->

Last week I shared a video building a Claude Code Skill from scratch. It took a DBS Report and converted it into a Skill so I could produce DBS-style reports with any financial data. (more info [here](https://didierlopes.com/blog/how-you-can-build-and-share-a-claude-code-skill/))

[Magnus](https://www.linkedin.com/in/magnus-samuelsen/) has been working on one of my favorite projects: building [AI agents for the OpenBB Workspace with Pydantic AI](https://openbb.co/blog/building-ai-agents-for-openbb-workspace-with-pydantic-ai). He saw my video and had the idea to bring skills like this directly into the Workspace.

Not just to replicate what I had done, but because he saw the potential.

The ability to create custom reports in the place where you already have all your data!

So he built it.

Using its very own [OpenBB Pydantic AI framework](https://github.com/MagnusS0/openbb-pydantic-ai), he made it possible to discover and run skills inside the Workspace via code.

You can literally check the PR [here](https://github.com/MagnusS0/openbb-pydantic-ai/pull/7).

<p align="center">
    <img width="800" src="/blog/2026-02-20-what-if-you-could-create-any-report.webp" alt="OpenBB Workspace with Skills integration" />
</p>

<br />

<p align="center">
    <img width="800" src="/blog/2026-02-20-what-if-you-could-create-any-report_1.webp" alt="OpenBB Workspace Skills demo" />
</p>

<br />

We're bringing skills to the Workspace very soon. But the fact that the community is already finding ways to do it programmatically - that's just amazing.
