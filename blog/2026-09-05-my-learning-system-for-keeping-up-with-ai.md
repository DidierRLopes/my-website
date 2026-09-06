---
slug: my-learning-system-for-keeping-up-with-ai
title: "My learning system for keeping up with AI"
date: 2026-09-05
image: /blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai.webp
tags:
- ai
- learning
- productivity
- llms
- second-brain
description: "I've spent the last few months of spare time trying to understand how LLMs work and keeping up with the frontier. This is my entire consumption routine."
hideSidebar: true
---

I've spent the last few months of spare time trying to understand how LLMs work and keeping up with the frontier. This describes my entire consumption routine.

<!-- truncate -->

LLMs are the most groundbreaking technology I have seen in my lifetime. It’s hard not to be curious about how they work at a fundamental level; and what happens at the frontier labs.

### Context

It’s now 10 years since I got introduced to Neural Networks at my university in Portugal. I spent weeks in MATLAB training a NNARX with ~100 parameters (optimizing weights with Levenberg-Marquardt) to control a thermal process.

<p align="center">
    <img width="318" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_1.webp" alt="MATLAB Neural Network Training tool showing a NNARX network being trained with Levenberg-Marquardt" />
</p>

Then at TU Delft in 2017, I had classes on Reinforcement Learning. Slides from Knowledge-Based Control Systems course.

<p align="center">
    <img width="800" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_2.webp" alt="Slides from the TU Delft Knowledge-Based Control Systems course on types of reinforcement learning algorithms" />
</p>

Then in 2020, I actually helped a friend writing the code behind his PhD thesis on modeling and forecasting SP500 using LSTM NN with tensorflow. I open source it [here](https://github.com/DidierRLopes/UnivariateTimeSeriesForecast/tree/master).

<p align="center">
    <img width="800" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_3.webp" alt="Charts of real versus predicted SP500 values from the LSTM forecasting model" />
</p>

I was blown away by NN capabilities at the time, but I was only using it in numerical data. I never applied it to text as modality.

This same NN architecture is what kicked off LLMs as we know it. Because humans interact mostly via language and it turns out that with enough data and compute - text generalizes incredibly well.

PS: if you are interested about companies working on “ChatGPT” for time-series, then check out [Nixtla](https://www.nixtla.io/).

Anyway, given that you have this context about some of my background, I want to share what does my AI-augmented learning consumption looks like.

## X as the top of the funnel

I deleted all social media apps from my phone (except LinkedIn for network).

The goal here is to avoid low calorie content - things that keep you hooked on the screen and that when you realize it’s been 30 minutes and learned nothing.

X also has this with their videos, which I hate and sometimes still fall for.

The main job that X is doing for me is **discovery**.

I trust that X will surface all the posts on the topics that I am interested about. And I trust X because I put myself in a position to trust X. I spent a lot of time providing signals to my recommendation algorithm as I can be the main evaluator of the algo.

At the time I went into my Interests and cleaned it pretty well - removed things that I didn’t care about and were added because they generate clicks (e.g. midnight fight at a gas station lol). Unfortunately, I cannot see this setting anymore on X, so they may have removed the capability to tweak it manually and now you are at the X mercy.

<p align="center">
    <img width="800" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_4.webp" alt="X settings page showing the Content you see section with Topics and Interests" />
</p>

Then I spent a lot of time curating my timeline:

- Long blogposts/articles or YouTube/Podcasts in a topic I care about get bookmarked (highest signal)
- Cool projects/experiments, announcements of company raising a round in the space, etc.. get a like
- If there’s people in the space that I start to particularly enjoy, I try to interact with their content - e.g.:

<br />

> I progressively removed larger endings from each poem and asked gpt‑4o and Claude Sonnet 4.5 (3.7 is no longer available via the API) to reconstruct the missing text at each cutoff.
>
> <br />
>
> I compared the embedding of each continuation with the poem’s actual missing ending. Lower distance means greater semantic similarity.
>
> <br />
>
> I used temperature 0.7 and a "best of 10", while keeping the percentile range to show variation.
>
> <br />
>
> For poem A, GPT‑4o produced the closer continuation at more than twice as many cutoffs as Claude: 35 versus 15. For poem B, Claude won more than three times as many: 38 versus 11.
>
> <br />
>
> So I’d argue that poem A is more gpt‑4o-like, while poem B is substantially more Claude-like.

<br />

**Didier Lopes** (@didier_lopes) replying to @natolambert - [full post](https://x.com/didier_lopes/status/2079455204185915787)

<br />

- Posts outside of what I care about - e.g. dating, looksmaxxing, skincare, .. - I go out of my way to click on them “Not interested in this post”
- Everyone that I see in the timeline that posts something interesting on the topic I care about where they are the main author (side project, founders, watched a youtube/podcast from them) I follow. As this will show me their content - which I am likely to enjoy, and also with their reposts I expect to find other people doing interesting things in the space.

<br />

After 1-2 weeks, you will see your timeline changing drastically for the better. So much that you almost want to read everything in the timeline (and it is high calorie).

SUCCESS.

## X curation and consumption

As mentioned above, everything that I see on X that interests me either:

- Gets read immediately
- Goes to bookmarks

<br />

I use bookmarks, A LOT. Also because a lot of time I open X is between meetings, walking dogs, commute etc - so many times I’m not in the zone to consume a long or technical post.

My bookmarks (now called History) tab has a lot of posts now; so it can be overwhelming to go through them. So every now and then I dedicate an evening, while having a series/movie in the background to curate it.

Here’s what my curation pipeline looks like:

- Is it a YouTube link?
  - Is there a video component to it?
    - Yes - Add to my “WATCH” folder on Arc
    - No - Open phone and download YouTube so I can listen it during one of my runs. (I’m training for the full marathon, and it turns out that I actually enjoy running more now that I can learn things during!)
  - Then like the post and remove it from the bookmarks. (I like the post before reading the content as that way if I ever want to find the content I can; but also as a signal for the algorithm).
- Is it a blogpost?
  - Is it a small-ish (under 30min) consumption blogpost?
    - Yes - Add to my “READ” folder on Arc.
      - These are most frequently consumed with my phone and I end up reading them when commuting or doing my dog walks.
    - No - Add to my “LONG READ” folder on Arc
      - Are they too technical for my level?
        - Yes - consume on laptop with Claude open in my second brain (more on this later) and ask stupid questions until I understand what’s going on.
        - No - consumed via my iPad on the weekend or late evenings before bed.
      - Regardless, these are never consumed on-the-go as that isn’t productive for this type of content.
- Is it a paper?
  - Yes - I add them to [my second brain](https://github.com/DidierRLopes/second-brain-ai/tree/main), into a folder called papers/TO_BE_ORGANIZED and then have a skill that takes the papers in that folder and organizes them accordingly. I usually don’t read this UNLESS I have a specific question in a topic that cites them, and I scroll through to get to the core idea I’m after.
- Is it a technical report?
  - Yes - These are gold!!! It’s incredible that companies share these in such detail - e.g. [https://poolside.ai/assets/laguna/laguna-m1-xs2-technical-report.pdf](https://poolside.ai/assets/laguna/laguna-m1-xs2-technical-report.pdf). For this type of content I usually print the document and spend an entire day around it and write down notes on it. I also add it to the second brain.
    - Not only that - but these are usually quite heavy. Now my base understanding is higher so there are fewer topics that I can’t grok into my mental model of the space. But what I would do is put these type of reports into NotebookLM and create a technical podcast from it - so I could get more familiar ideas during my runs.
- All the rest remains in my X bookmarks!
  - Unfortunately this is still a lot, as more folks do only X Articles or only X videos. At the start this wasn’t an issue, but it has since become as I cannot consume content as fast as it comes (even after an aggressive curation!) - after all I only do this during my spare time lol
    - One trick that I used recently was to have Codex open my X bookmarks and use Computer Use to organize the bookmarks based on different topics: agents, harness, LLM research, RAG, etc.. - whilst it doesn’t make me consume content faster, it does organize it more nicely so I can decide what to read based on interests rather than based on latest.
    - A secondary result of this amount of volume is that some of the posts I end up not reading because they are no longer relevant - e.g. I had a post bookmarked that went in detail into /ralph-loop, and by the time I got to it - it was no longer relevant, so I just deleted it.

<br />

Here’s what my Arc folders look like right now:

<p align="center">
    <img width="400" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_5.webp" alt="Arc browser sidebar with WATCH and READ folders full of bookmarked videos and articles" />
</p>

## Second brain

I mentioned above that I have this [second brain repo](https://github.com/DidierRLopes/second-brain-ai/tree/main).

This was based on this LLM Wiki idea from Karpathy:

> LLM Knowledge Bases
>
> <br />
>
> Something I'm finding very useful recently: using LLMs to build personal knowledge bases for various topics of research interest. In this way, a large fraction of my recent token throughput is going less into manipulating code, and more into manipulating knowledge (stored as markdown and images). The latest LLMs are quite good at it.
>
> <br />
>
> TLDR: raw data from a given number of sources is collected, then compiled by an LLM into a .md wiki, then operated on by various CLIs by the LLM to do Q&A and to incrementally enhance the wiki, and all of it viewable in Obsidian. You rarely ever write or edit the wiki manually, it's the domain of the LLM. I think there is room here for an incredible new product instead of a hacky collection of scripts.

<br />

**Andrej Karpathy** (@karpathy) - [full post](https://x.com/karpathy/status/2039805659525644595)

<br />

The workflow looks like this:

- I push content into it based on what I’m learning: notes, links, papers, ideas, etc..
- Claude Code organizes it. I set up the GitHub integration in the Claude mobile app, so the agent can read the repo and push to it from anywhere.
  - A github action merges the claude/branch into main, which means capture works from my phone in seconds.
- Skills handle the recurring work.
  - One organizes papers on arrival: I dump a PDF in, and it gets filed along with its content.
  - Another is Matt Pocock’s /teach skill, which turns the agent into a tutor that tracks what I’ve learned across sessions. And creates very good learning artifacts!!
- Every now and then I ask Claude how we can improve the setup itself.

<br />

I started doing this as a way to have this expert at my fingertips with all expertise that is relevant to me - but then I started doubting its usability as with web search, you get intelligence on-tap without being “filtering” the papers/content that make it into the wiki.

So, now the way I see the value in this second brain is that it is the best model available to any agent of how my brain operates given that I only push things that I’ve read/watch (apart from the papers!). So giving it this baseline helps when I try to learn something, because it has a fundamental understanding of what I have ingested and as a result “understood”. And I think that this is why I usually get better learning materials from it than if I am just interacting with Claude or ChatGPT.

But as I have more conversations (i.e. memories), I wonder if this is still going to be a thing in the future. Anyway, it’s worth mentioning, as this is part of my current workflow - but continuously adapting to what works :)

## Productivity tips & tricks

I have a lot of these to share that work for me. If you have some others, please feel free to share!

#### Bookmarks shortcut

If you open X Bookmarks on Safari (iOS) - [https://x.com/i/history](https://x.com/i/history) - and then click “Share” you get the following options:

<p align="center">
    <img width="350" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_6.webp" alt="iOS Safari share sheet for X bookmarks showing the Add to Home Screen option" />
</p>

And if you click “**Add to Home Screen**” you are basically adding a shortcut to the Bookmarks tab.

This has been super helpful for me as a lot of times I go into X as a reflex, and even though I have time to consume some X bookmarks I get distracted on the main timeline. Having this shortcut next to the X icon in my main iPhone screen, means that I have to make the Discovery/Consumption decision every time. (Although I can admit that the reflex to click on X (discovery) and not think about the bookmark shortcut is still there 😅)

#### Compress audio time consumption

Most podcasts are quite slow-paced (unless you are listening to Marc Andreesen lmao), and you can easily increase speed to 2x and still get most of the ideas.

I used to be “paranoid” about missing part of the audio, when I got distracted etc. I don’t anymore. Perfection is your enemy, and the way our brain works we compress information heavily - e.g. even if you listen at 0.5x after watching 5 minutes of a podcast, do you think you would be able to recite every single sentence, in the order? And what about 1 week from now? Exactly… It’s moot.

Just let the neurons, neuron.

Although for more technical content (like what I’m talking below), I do 1.25-1.5x only!

#### Turn technical content into podcasts

Some of these technical reports are quite heavy technically. And so in order to help me understand them, I want to consume more than just the technical report with notes; I’ll watch a video on some of the concepts; but I also do the following:

I take the technical report and with the following prompt convert it into a technical podcast:

> *Create a podcast that goes over the architecture like I’m knowledgeable about ML but just starting to understand the transformer.*
>
> <br />
>
> *This needs to be a technical podcast that goes over the architecture and choices taken by the team and why. But also should mention what others are being used in the industry (particularly when steering from what is utilized by default) and always mentioned the why and why not.*
>
> <br />
>
> *The pdocast should be packed with nuggets that would allow someone to pass a technical interview based on the information in the podcast*

<br />

<p align="center">
    <img width="800" src="/blog/2026-09-05-my-learning-system-for-keeping-up-with-ai/2026-09-05-my-learning-system-for-keeping-up-with-ai_7.webp" alt="NotebookLM with the Laguna technical report loaded and the podcast prompt in the chat" />
</p>

I then send this podcast audio as a memo to my phone, so I can listen to it on my next run.

#### ChatGPT /voice

ChatGPT voice mode has had a step function improvement over the last couple of weeks. So now when I’m listening to more technical podcasts, even during runs, I will go into ChatGPT and brainstorm a concept back and forth with /voice.

I will ELI5 the sh!t out of it, until I can grok the concept reasonably well.

This is one of the most mind blowing experiences when the voice agent does “hummm” and it looks like you have an expert at your fingertips.

It’s insane. The fact you can tap into this at an extremely low cost is mind blowing, and you should leverage it as much as you can.

#### Leverage dead times as much as possible

I’m a bit of an optimization freak. I don’t procrastinate often, I’m always doing something. And at every opportunity I try to learn/grow in some axis.

Some things I do:

- When I go boxing at Gleason’s, the commute is like 50 minutes door-to-door - so I always save long reads for that time.
- During the week for small lunches I like to watch [Theo’s videos](https://www.youtube.com/@t3dotgg) - I like his takes; and he’s very opinionated which I think is a good thing.
- When I am rocking our newborn I always put a YouTube video that I can watch while rocking her.
- When walking doggos I’m usually reading some bookmark posts, scrolling X timeline (to add to content curation), or listening to Audible.
  - Audible is really good in general because they break chapters usually in smaller sections which tends to align well with the time for a walk - 12-20mins. I also listen to Audible in commutes - here’s some of the [books I read recently](https://didierlopes.com/books/already-read/).
- Long reads get blocked time on the weekend - and I need to be in mental space to retain some of those more heavy concepts.

<br />

If you use your time efficiently it’s impressive how much content you can consume. Also bear in mind I don’t do many social activities - apart from sparring on Saturday mornings.

#### Read books

Physical books are great because they force you out of the digital world and you get to focus fully into it. I don’t buy that many physical books - but when they have many formulas/figures I do; or when I want to support the author because I like the content they publish.

> Pretraining is over. Time for post-training.

<br />

**Didier Lopes** (@didier_lopes) - [post](https://x.com/didier_lopes/status/2074223022106386758)

<br />

Or sometimes just because I have an idea for a banger!

## Be comfortable with not knowing everything

As I said before, you won’t be an expert in everything. Accept that. I pick a few topics to go deep on and keep the rest at surface level. Surface level is fine, as long as it’s enough that when I revisit the topic later, things make sense.

Like I spent a couple days on this: [https://jax-ml.github.io/scaling-book/](https://jax-ml.github.io/scaling-book/)

Spent a very long time in the initial sections, as I wanted to get a good understanding on how the math worked (triggered by [this Dwarkesh episode with Reiner Pope](https://www.youtube.com/watch?v=xmkSf5IS-zw)). And then realized that this level of granularity isn’t very relevant for my day-to-day and having a broader high level understanding is enough for me; so I stopped trying to do exercises on my own and just looked at solutions and made sure I got the gist.

You can always scale up and down your study based on the level of familiarity you want to gain in a concept. For me understanding agentic harnesses and concepts like RAG was very important so I go deep in those as I worked on that at OpenBB; but hardware inference I just spend enough time to understand what’s going on but not enough that I would be able to have an opinion on it.

The other thing is that sometimes I would bookmark things that I wanted to understand, but my base level understanding was quite far from the level at which the article/post is operating at. And sometimes I would read it for the sake of reading it, almost like to get the “checkmark”. I learned to stop doing that - if I’m half way and I’m not getting the value out of the materials, I will quit it.

Here’s an example of a post recently where this happened. [https://www.aleksagordic.com/blog/collective-operations](https://www.aleksagordic.com/blog/collective-operations)

It’s a very interesting post; but it’s too low level for me. So I added it to my second brain and if I ever am required to understand this better, I will spend a lot of time on it. Or maybe I get more familiar with neighbor concepts which will make this post more intuitive.

## Tinker, tinker & tinker

All of the things above are theoretical. Which is great. But if you don’t actually put in the miles - the concepts won’t crystalize in your brain.

And you will never be able to talk about things from experience - but always talk about other’s experience.

I’m sure you’ve met people that are incredibly smart and can talk in depth about many topics (mostly big readers) but then when it’s time to get practical they struggle - or if you get into edge cases they won’t know about them because they haven’t experienced it.

So whenever I’m learning topics, I write down random ideas that I have to put that into practice. I try to find ideas that:

- Make it practical to allow me to learn the technology;
- Something that I would find interesting (enough to spend my spare time on it);
- I can take ideas from it to my day-to-day job;
- It’s short lived - I work on it and it’s done, and doesn’t become a project on its own.

<br />

And then I always always document it. The reason I do that is that having to document it in an essay format forces me to understand concepts at a much deeper level.

At university I would study weeks in advance of an exam, and then the days before the exam I would stay at Uni with colleagues and they would ask me questions about certain topics - and that always helped me the most to crystalize ideas because it would force me to understand what I didn’t know as well as I thought I did. This is similar.

Here’s a few that I worked on recently:

- [Introducing WorkspaceBench to evaluate OpenBB Workspace for agentic workflows](/blog/introducing-workspacebench-to-evaluate-openbb-workspace-for-agentic-workflows)
- [The model did what I rewarded, not what I wanted](/blog/the-model-did-what-i-rewarded-not-what-i-wanted)
- [Codex beats ChipWits](/blog/codex-beats-chipwits)

<br />

## Wrap up

This is what works for me.

But we are all very different - so what works for you may be very different; but hopefully you can find some good ideas here that you can take!

There are still other things that I think I should do more:

- Interact more with a community of individuals involved in a specific project - I tend to join Discord groups; but almost never go there.
- Joining reading groups or similar - and getting more out of the comfort zone from having to talk about said topics in public.
- Post more on these topics in public. Right now most of what I do is sharing nuggets from podcast ([which I have a skill for](https://github.com/DidierRLopes/get-y2b-clips)), but ideally I can share more insights which spark debates and forces me to analyze my own understanding.

<br />

> People are sleeping on this interview with Z.ai (@Zai_org) Director of Product for GenAI strategy and global partnerships (@ZixuanLi_) from 2 months ago.
>
> <br />
>
> Here are some takes that I found interesting!
>
> <br />
>
> 1. Long-horizon = iterations, not time
>
> <br />
>
> "If you have 1 hour, you have a solution within that 1 hour. But if you are given 10 hours, you can perform it better. Most models can only get the job done within an hour and cannot improve afterwards. But a better model, a model like Opus 4.6, can see better results after several hours, or after several iterations. So long-horizon doesn't mean time. It actually means the level of iterations."

<br />

**Didier Lopes** (@didier_lopes) - [full post](https://x.com/didier_lopes/status/2069999579890626625)

<br />

And this system is continuously evolving as I iterate more on what works/doesn’t!

I hope you find this helpful.
