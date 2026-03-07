---
slug: the-era-of-on-demand-software
title: The era of on-demand software
date: 2026-03-06
image: /blog/2026-03-06-the-era-of-on-demand-software.webp
tags:
- ai
- software-development
- agents
- openbb
description: When agents can work in a loop while you do something else, time is removed from the equation. Welcome to the era of on-demand software.
hideSidebar: true
---

When agents can work in a loop while you do something else, time is removed from the equation. Welcome to the era of on-demand software.

<!-- truncate -->

A couple of weeks back I went to a Pokemon TCG shop to buy some vintage WOTC cards. I'm just getting this collection started, so I had dozens of gaps to fill.

<p align="center">
    <img width="400" src="/blog/2026-03-06-the-era-of-on-demand-software_1.webp" alt="Pokemon card collection starting to shape up" />
</p>
<p align="center" style={{fontSize: '0.85em', marginTop: '-0.5em'}}>My collection starting to shape up.</p>

<br />

The guys at the counter weren't thrilled. Dozens of different vintage cards meant dozens of manual price lookups.

So they triaged, anything marked shadowless went in one pile. Known valuable cards (e.g. Dragonite, Gengar,..) in another. Everything else? $1 flat, $3 for Shadowless. The rest they looked up individually on TCGPlayer.

I said "It would be nice to have software that does all this and totals it up, right?"

"Yeah" they said.

First thing I did once I got home was write this Issue on my pokvault repo.

<p align="center">
    <img width="800" src="/blog/2026-03-06-the-era-of-on-demand-software_2.webp" alt="GitHub issue for card scanner feature" />
</p>

<br />

This is a fairly involved feature given that there's a lot to be done:

- Indexing all the card images universe
- Locate the card in the frame using a corner detection algorithm
- Encode the card with a vision model to compare with our indexed ones
- Show the best match cards
- Allow to add cards to the list (and their correct variant)
- Allow to edit price manually but also search manually
- Run on device and be fast

<br />

So I wasn't going to touch it until later...

**Also me (given that I can hand off things to AI agents):**

<p align="center">
    <img width="500" src="/blog/2026-03-06-the-era-of-on-demand-software_3.webp" alt="Meme about doing it anyway" />
</p>

<br />

So I decomposed it in a few sub-tasks.

1. Indexing all cards
2. Get TCGPlayer reference images to near-100% similarity matches
3. Handle my actual photos (odd angles, lighting, wear) with robust corner detection
4. Implement the UI/UX I had in mind

<br />

Then I let Claude Code iterate in a loop while I did other things.

Steps 2-3 took the longest. Claude tried different algorithms, compared performance, and **this is the part that surprised me**: it started tuning hyperparameters like an ML engineer would to improve retrieval accuracy.

**Insane**.

After a few hours of back-and-forth, it worked. Exactly as I'd envisioned.

My wife watched the whole thing. We'd just seen two guys at a shop struggle through a painfully manual process and here we were...

Now I had a working solution without writing a single line of code myself.

Bear in mind that I highlighted the problem perfectly, and had in my head exactly the UI/UX I wanted the user to have. And I also understood what choices the agent was doing on the ML pipeline. But still, I didn't touch any code manually myself - and the fact that it works exactly as I wanted is just incredible.

You can test it here: [https://pokvault.com/scanner](https://pokvault.com/scanner)

I'm calling this the **era of on-demand software**.

I've always been a builder. The only constraint was: **time**. But when agents can work in a loop while you do something else, time is removed from the equation.

Plus, if you're a builder, it's never been a better moment for you. You shouldn't be in love with the act of coding, but with the act of creation itself. Because now everyone can create easily.

But if you're not a builder, that's fine. Non-builders don't need the vision either, they just need the pain point.

While in the past you would write that pain point on Google to look for existing solutions, now you can share your pain point with the agent and let it create a solution that solves your problem and that you can iterate with the agent to match your preferences.

This is good.

It will push for software companies to produce higher quality software built to stand the test of time.

And if you're wondering - this is exactly why we're building OpenBB the way we are.

The value isn't in the UI itself. It's in the overall infrastructure, the ease of data and agent integrations, the institutional-grade features that take years to build and maintain, and the relentless innovation. That's the moat.
