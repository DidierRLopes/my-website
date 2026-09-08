---
slug: introducing-skills
title: "Introducing Skills. Define playbooks for your AI agents."
date: 2026-03-25
image: /blog/2026-03-25-introducing-skills/2026-03-25-introducing-skills.webp
tags:
- openbb
- skills
- agents
- workflows
- ai
description: "The most expensive part of a research workflow isn't the analysis. It's rebuilding the same process from scratch every single time. See how Skills change that."
hideSidebar: true
---

The most expensive part of a research workflow isn't the analysis. It's rebuilding the same process from scratch every single time. See how Skills change that.

<!-- truncate -->

Back in 2024, we wrote about [why chat-only AI assistants fall short for investment research](https://openbb.co/blog/why-chat-only-ai-financial-assistants-are-not-the-answer-you-might-think-they-are/). Not because AI isn't useful, but because a chat interface alone doesn't reflect how research actually gets done.

OpenBB's AI was built differently from the start. It sits inside the Workspace, it reasons over the data on your dashboard, and its outputs can be saved directly back as widgets, shared across teams, and built into collaborative dashboards.

Skills are the next step in that same direction.

## Stop rebuilding what you've already figured out

Until now, even with a fully integrated AI agent, the starting point was still a prompt. You'd describe what you wanted, the agent would run it, you'd review and iterate. Powerful, but still initiated from scratch each time.

A Skill changes that. You define the capability once, before you run it. Which widgets to pull from, what the agent is supposed to do with that data, how the output should be structured. Then you save it.

<p align="center">
    <img width="800" src="/blog/2026-03-25-introducing-skills/2026-03-25-introducing-skills_1.webp" alt="Configuring a Report Skill in OpenBB Workspace" />
</p>
<p align="center" style={{fontSize: '0.85em', marginTop: '-0.5em'}}>Example of Report Skill</p>

The next time you or anyone on your team needs that workflow, it runs in a single action, with the same logic, the same data context, and the same output format.

<p align="center">
    <img width="800" src="/blog/2026-03-25-introducing-skills/2026-03-25-introducing-skills_2.webp" alt="Running a saved Skill in a single action" />
</p>

Every time a workflow starts from scratch, you're paying an overhead tax on something you've already figured out. Skills eliminate that.

## Five workflows you can automate this week

The clearest example: automated investment memo generation.

Configure a "Report Generation" Skill that pulls from selected market widgets, searches relevant news and filings, and structures the output into a formatted memo. What used to be rebuilt manually each time becomes a repeatable, single-action workflow.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/CAG-NBC3-OU"
        width="800"
        height="400"
    />
</div>

<br />

Other Skills your team can configure today:

- Portfolio commentary
- Thematic research briefs
- Earnings summaries
- Signal generation across datasets

<br />

Each Skill saves the methodology, not just the output. Consistency across analysts, without the overhead.

## Also available in the Snowflake Native App

Skills are also rolling out inside our Snowflake Native App. This means you can run defined AI capabilities directly against data already in Snowflake, no data movement, no pipeline changes, everything stays inside your environment.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/qYKPRi3IcHI"
        width="800"
        height="400"
    />
</div>

<br />

For firms running sensitive data behind strict governance requirements, this matters. The intelligence layer comes to the data.

## The bigger picture

The goal has always been to make OpenBB the layer where financial work and intelligence happen together.

Skills are a meaningful step in that direction: AI that doesn't just respond to questions, but executes defined, repeatable capabilities inside real workflows, saving teams hours of manual work per week.

You can get started with OpenBB Workspace and skills today for free.
