---
slug: how-i-turned-days-of-developer-training-into-a-skill
title: How I turned days of developer training into a skill you can use in minutes
date: 2026-01-27
image: /blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill.webp
tags:
- ai
- claude
- skills
- openbb
- developer-experience
description: I materialized my knowledge of how to build OpenBB apps, and days of building alongside users and clients, into a SKILL that you can give your agents. So you can start building apps in minutes.
hideSidebar: true
---

I materialized my knowledge of how to build OpenBB apps, and days of building alongside users and clients, into a SKILL that you can give your agents. So you can start building apps in minutes.

<!-- truncate -->

Recently, we added support for YouTube widgets.

So I sent a video to our marketing person explaining that I could add a YouTube video to each tab of our [reference backend application](https://github.com/OpenBB-finance/backends-for-openbb/tree/main) to onboard developers on how to build apps/widgets on OpenBB.

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_1.webp" alt="Slack message about YouTube videos" />
</p>

<br />

She liked the idea, and I was set to do it.

But then I kept postponing actually doing it.

Not because I didn't have the time, but because I thought my time was better spent doing something different.

**Stick with me.**

We run developer training workshops where we work hands-on with teams to build OpenBB apps - [https://openbb.link/workshops](https://openbb.link/workshops)

But not everyone needs that level of depth to get started and even those who do, could benefit from a head start.

Still, whether it's videos or docs, developers need to dedicate time to learning the craft. And some people are very successful at it, I constantly see people building incredible apps on the workspace by just reading the docs. Examples here: [https://openbb.co/solutions](https://openbb.co/solutions)

But their workflow could be faster if we were there. Next to them providing suggestions on how to apply grouping between widgets, utilize a widget settings more efficiently, mark data as stale, etc…

However, in 2026, we can actually create digital twins.

What if developers could tap into the same mental framework I use when building apps, available anytime, without scheduling a call?

*You know where I am heading right?*

So I provided my full framework on how I build apps on OpenBB and had Claude help me turn that into a skill.

But this isn't enough because I have a lot of bias as I know what I'm looking for.

So I tested and iterated - in a loop.

I pretended I was a user who knew nothing about OpenBB and asked it to build something. Three use cases:

- From scratch and generic - build a crypto app
- From an existing GitHub repo code - could be just the data
- From looking at an existing website

<br />

After each attempt, I'd ask the model to analyze its work - did it learn something new? Could anything be added to the skill?

If a one-shot prompt didn't result in a working app, I'd immediately fix the skill.

Iterate until it works.

Ship.

## And it worked.

After my prompt, here's what Claude outputs:

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_2.webp" alt="Claude output - part 1" />
</p>

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_3.webp" alt="Claude output - part 2" />
</p>

<br />

And then I said: "Ship it".

Only to come back to this working app:

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_4.webp" alt="Working app - tab 1" />
</p>

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_5.webp" alt="Working app - tab 2" />
</p>

<p align="center">
    <img width="800" src="/blog/2026-01-27-how-i-turned-days-of-developer-training-into-a-skill_6.webp" alt="Working app - tab 3" />
</p>

<br />

You can now do this by running

```bash
npx skills add openbb-finance/backends-for-openbb
```

and asking Claude to build an OpenBB app from within that environment.

Excited to see what you build.

Just reach out.
