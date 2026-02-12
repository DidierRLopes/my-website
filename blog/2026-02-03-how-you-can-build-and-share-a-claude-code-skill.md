---
slug: how-you-can-build-and-share-a-claude-code-skill
title: How you can build and share a Claude Code skill
date: 2026-02-03
image: /blog/2026-02-03-how-you-can-build-and-share-a-claude-code-skill.webp
tags:
- ai
- claude
- skills
- developer-experience
description: Creating a skill to generate a financial report with a specific branding
hideSidebar: true
---

Creating a skill to generate a financial report with a specific branding

<!-- truncate -->

In a [previous post](/blog/how-i-turned-days-of-developer-training-into-a-skill), I shared how I turned days of developer training into a skill that lets anyone build [OpenBB](https://openbb.co/) apps in minutes.

Today I'm going to show you how to build a skill from scratch.

**Here's the counterintuitive thing:** as models get smarter, the premium on well-crafted skills goes *up*, not down.

Most people assume better models mean less need for customization.

**The opposite is true.**

A 5% improvement in base capability compounds with a well-designed skill. The skill becomes the multiplier.

So this is my attempt to show you how to create a skill from scratch and iterate on it until it's good enough to share with someone else.

For this example, I'm going to build a **financial report generation skill**.

## The Process

I also recorded a video walkthrough which you can find here:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/HRalrMR8k_0"
        width="800"
        height="400"
    />
</div>

<br />

Here's the approach I use:

### 1. Create a new repo

Start with a clean folder.

This will become your skill directory.

```bash
mkdir dbs-report-skill
cd dbs-report-skill
```

### 2. Add example reports you like

Find 2-3 reports that represent the style and quality you're targeting. These become your "ground truth".

Drop them into the repo. PDFs, screenshots, whatever format they're in.

The key is having concrete examples, not abstract descriptions of what you want.

### 3. Have Claude analyze the design in detail

Tell Claude to study the reports and extract *everything* it would need to recreate them:

- **Visual design**: Layout, typography, spacing, color palette, margins
- **Content structure**: Section hierarchy, data relationships, narrative flow
- **Formatting patterns**: How tables are styled, how charts are positioned, how callouts work

<br />

Ask Claude to be exhaustive.

You want it to notice things you wouldn't think to mention.

### 4. Generate a report with mock data

Now test whether Claude actually absorbed the design language.

Ask it to create a report in that exact style, but with completely made-up data.

This isolates the skill from data dependencies. If the mock report looks wrong, it's a design problem, not a data problem.

### 5. Iterate until it's right

This is the loop:

1. Review the output
2. Identify what's off
3. Update the skill instructions
4. Regenerate
5. Repeat

<br />

Don't move on until a single prompt produces a report that matches your examples.

Don't keep running claude yourself either, let it iterate on its own until it thinks that the report it created is actually fairly similar style-wise from the ground-truth ones in the folder.

### 6. Connect real data

Now add the data layer.

Give Claude access to real financial data via MCP servers and web search.

In this example, I'm going to connect with Carbon Arc MCP and utilize web search.

### 7. Generate a real report

The moment of truth.

Ask Claude to create a report on an actual company using the skill and real data sources.

## Where the Skill lives

Once you're done, the skill exists in your `.claude` folder (or wherever you configured skills to live).

The structure looks like this:

```
financial-report-skill/
├── SKILL.md           # The instructions
├── assets/            # Templates, fonts, images
└── references/        # Example reports, style guides
```

The SKILL.md file is the brain. It contains:

- **Frontmatter**: Name and description (this is what triggers the skill)
- **Instructions**: The procedural knowledge Claude needs

<br />

Here's a simplified example of what the frontmatter looks like:

```markdown
---
name: dbs-report
description: Generate a DBS Group Research US Equity Research report in HTML format. Use this skill when the user asks to create, generate, or produce a DBS-style equity research report for a company. The skill produces a pixel-perfect reproduction of the DBS report format including cover page, financial tables, ratings history, and disclaimer pages.
argument-hint: <company-name>
user-invocable: true
---

# DBS Group Research -- US Equity Research Report Generator

You are generating a **DBS Group Research US Equity Research report** in HTML format. The output must be a single self-contained HTML file that, when opened in a browser and printed to PDF, is visually indistinguishable ...

...
```

The description is critical. It's how Claude knows when to use the skill.

## Sharing the Skill

### Option 1: Send the file directly

Just share the skill folder.

The recipient drops it into their skills directory. **I love this about skills.**

### Option 2: Publish to skills.sh

If you open source your skill repository, it becomes available through [skills.sh](https://skills.sh/).

Anyone can install it with:

```bash
npx skills add <your-github-org>/<your-repo>
```

And that means you can add it with:

```bash
npx skills add didierlopes/dbs-report-skill
```

Then they ask Claude to generate a financial report, and the skill triggers automatically.

## Why you should care

We're entering an era where the raw intelligence of models keeps climbing.

But intelligence without context is generic. The skill is what makes it *yours*.

It encodes your taste, your standards, your workflow.

The model provides the horsepower; the skill provides the steering.

And the better the model gets, the more it can do with a well-crafted skill.

Start building yours.
