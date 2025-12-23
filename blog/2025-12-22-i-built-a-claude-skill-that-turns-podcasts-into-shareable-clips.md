---
slug: i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips
title: I built a Claude Skill that turns podcasts into shareable clips
date: 2025-12-22
image: /blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips
tags:
- claude
- ai
- skills
- podcast
- automation
- open-source
description: Skills might be the right abstraction for agentic workflows
hideSidebar: true
---

![I built a Claude Skill that turns podcasts into shareable clips](/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips.png)

Skills might be the right abstraction for agentic workflows.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I've been meaning to experiment with [Claude Skills](https://claude.com/blog/skills), particularly after watching this video from AI Engineer:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/CEvIs9y1uog"
        width="800"
        height="400"
    />
</div>

<br />

Simon Willison's blog ["Claude Skills are awesome, maybe a bigger deal than MCP"](https://simonwillison.net/2025/Oct/16/claude-skills/) is also an amazing read on the subject.

However, the best way to learn any technology is to get your hands dirty. Attending conferences isn't enough. Reading about it isn't enough. You need to build something, and you're better off when you have a real problem to solve.

Here was mine: I listen to a lot of podcasts. They're full of incredible nuggets I want to share, but nobody wants a link to a 90-minute episode with "trust me, minute 47 is awesome." I'd tried various clipping tools - paid ones with watermarks, free ones that were painful, even Claude Code with a lot of back-and-forth. Nothing worked in one shot.

Then I thought about my friend Jordi Visser (ex-CIO of Weiss Multi-Strategy), who produces a [weekly macro podcast](https://www.youtube.com/watch?v=dgUnl5agSmw) essentially on his own. There's so much shareable content in his episodes that never gets extracted. I wanted to build something he could use too.

Skills seemed like the right abstraction. I knew Claude Code *could* do this after enough iteration, but with Skills, I could package deterministic tools the agent could use off the shelf.

## The approach: INPUT to OUTPUT first

At the start of any project, I bridge INPUT to OUTPUT at a high level. Make sure the connection works, then double down on everything in between.

**Inputs:**

- Video URL (*required*)
- Number of clips, min/max duration, specific focus areas (*optional*)

<br />

**Outputs (one folder per clip):**

- `metadata.json` — clip title, start/end times, selection rationale
- `transcript.txt` — ready to copy-paste
- `clip.mp4` — ready to share

<br />

## 1. Make it work

First goal: make it work in one shot. A single prompt like "get 3 clips under 2 minutes from this URL" should produce three folders with all the outputs.

I gave Claude Code the input/output spec, a rough workflow, the [Skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills), and a [reference Skill that uses YouTube](https://github.com/michalparkola/tapestry-skills-for-claude-code/blob/main/youtube-transcript/SKILL.md).

It started with a PRD we agreed on, then converted it into a Skill. I gave it a URL. It worked.

But it was **rough around the edges**.

## 2. Make it good

"Good" depends on perspective. You acquire taste by using many products and noticing what separates good from bad experiences. Since I was my own end user, I could iterate fast.

I tried different use cases - e.g.:

- Get me 3 clips under 2 minutes
- Grab the clip about the AI bubble and startup valuations
- Get the 1 most controversial take of this podcast

<br />

A few things I noticed and fixed:

- The transcript needed polish for easy copy-paste to X
- The transcript missed some text that showed up in the video
- Clips needed subtitles (I often watch without sound)
- Metadata was too sparse - I added the video URL with timestamp and the reasoning behind clip selection (insight, controversy, engagement potential)

<br />

I kept iterating until I was happy, then asked Claude to update the Skill based on our final workflow.

## 3. Make it fast

Everything worked well now. But it was slow.

The bottleneck: Claude Code only had the Skill markdown prompt. Every script and command was being created on the fly.

So I added pre-built Python tools to my Skills folder. Instead of reasoning through script creation every time, the agent could execute tools directly. In one case, it even created a CLI with configurable arguments.

## Why Skills are a weird and powerful abstraction

Skills aren't just prompts, but they're also not as complex as building a sub-agent.

I considered writing a Python CLI myself - let an AI model pick start/end times and be done with it. But that only works if I can one-shot my use case. What happens when I want "shift the window by 20 seconds" or "find similar topics across these five videos"?

Skills keep the workflow open-ended. The agent can traverse the tooling universe and pick whatever's needed to get the job done.

This is what made the experience strange: I was watching the agent execute commands, create scripts, and build a more deterministic Python tool for downloading YouTube videos - all things I would have done myself, but it would have taken me a day. The agent was churning them out on the fly.

And I could iterate alongside it.

I can see where this is going. You have a conversation with Claude where you figure out a workflow through iteration. Then you say: "now turn this into a Skill".

It's not that different from human memory, when you do something, you learn how to do it.

**Except in this case, I can add skills from other humans/agents to my toolset.**

Incredible times ahead.

## How to use it

### Step 0: Set up Claude Code

[Set up Claude Code](https://docs.anthropic.com/en/docs/claude-code/getting-started) - Install, authenticate, and start using Claude Code on your development machine.

Or make sure you update it with

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 1: Run CC

```bash
claude
```

### Step 2: Install the get-y2b-clips plugin

Run:

```bash
/plugin
```

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_1.png" alt="Plugin command in Claude Code" />
</p>

Click "Add Marketplace" and add **DidierRLopes/get-y2b-clips**

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_2.png" alt="Add Marketplace dialog" />
</p>

Then go into Marketplaces tab again and click on it.

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_3.png" alt="Marketplace tab" />
</p>

Then select one of the "Install" options.

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_4.png" alt="Install options" />
</p>

And finally you will have this skill installed

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_5.png" alt="Skill installed confirmation" />
</p>

### Step 3: Try it out

> Use get-y2b-clips on [https://www.youtube.com/watch?v=Ps8PQOryRSU](https://www.youtube.com/watch?v=Ps8PQOryRSU) to get one clip from Jordi talking about Gavin Baker's interview with Patrick O'Shaughnessy and then another clip that is no more than 1m30s long that is the most controversial take from Jordi in the entire video.

<p style={{fontSize: '0.85em'}}>Prompt I used to trigger my get-y2b-clips skill on CC</p>

<p align="center">
    <img width="800" src="/blog/2025-12-22-i-built-a-claude-skill-that-turns-podcasts-into-shareable-clips_6.png" alt="Prompt I used to trigger my get-y2b-clips skill on CC" />
</p>

Here's one of the outputs: [https://x.com/didier_lopes/status/2002746090408333635](https://x.com/didier_lopes/status/2002746090408333635)

## Open source code

[GitHub - DidierRLopes/get-y2b-clips](https://github.com/DidierRLopes/get-y2b-clips): YouTube nuggets extraction via Claude Code Skill
