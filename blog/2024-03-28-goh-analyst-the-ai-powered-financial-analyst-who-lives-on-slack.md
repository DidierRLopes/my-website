---
slug: goh-analyst-the-ai-powered-financial-analyst-who-lives-on-slack
title: Goh Analyst - The AI-powered financial analyst who lives on Slack
date: 2024-03-26
image: https://github.com/DidierRLopes/my-website/assets/25267873/42e21efe-0555-498c-80d8-039c886d380b
tags: ['learning', 'experience', 'growth', 'moving', 'london', 'bay', 'US', 'travel', 'startup', 'nyc']
description: How I built a financial analyst that lives on Slack and has access to OpenBB.
---

<p align="center">
    <img width="600" src="https://github.com/DidierRLopes/my-website/assets/25267873/5a931097-9dc7-4b7b-baa5-d8c4f52a8705"/>
</p>

How I built a financial analyst that lives on Slack and has access to OpenBB.

The open source code is available [here](https://github.com/DidierRLopes/openbb-slack-agent).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Context

At OpenBB, we have the tradition of hosting an internal Creaton on the penultimate week of the year.

The OpenBB Creaton is our creative Hackathon, where every team member picks a project to work on throughout the week and gets fully focused on it. The only rule is that it relies on OpenBB technology.

It’s a way for us to get further contact with our technology, but it also allows us to create proofs-of-concept of products/features that we may invest in the feature. Think of it as an R&D week.

We do it then because our team members get the last week of the year as time off. So, if they want to present their project to the rest of the team in January, they can also use that time to wrap up.

## My Project

At the Open Core Summit III, I presented a way of creating an AI-powered financial analyst capable of handling complex financial queries.

I wrote more about this in this [blog post](/blog/creating-an-ai-powered-financial-analyst). This robust architecture can access 100+ financial datasets from OpenBB tools and reason about them. The code is open source here.

I shared how our AI-powered financial analyst was able to answer

> “Check what TSLA peers are. From those, check which one has the highest market cap. Then, for the ticker that has the highest market cap, get the most recent price target estimate from an analyst, and tell me who it was and on what date the estimate was made.”

<br />

and

> “Perform a fundamentals financial analysis of AMZN using the most recently available data. What do you find that’s interesting?”

<br />

Since that was already working so well (watch the [presentation video here](https://www.youtube.com/watch?v=A-43EKK2PhE&embeds_referring_euri=https://openbb.co/blog/creating-an-ai-powered-financial-analyst&source_ve_path=MjM4NTE)), I wanted to bring these capabilities to Slack, show that this could be the future, and prove it would impact every analyst job.

That’s when Goh Analyst was born.

<p align="center">
    <img width="800" src="https://github.com/DidierRLopes/my-website/assets/25267873/3460df7d-0860-4761-9f99-686afca1d78c"/>
</p>

Note: Goh Analyst together is GOHANalyst, which is why the image is Gohan from Dragon Ball with the OpenBB logo on his forehead.

## How does it work?

To get started, you can see the [open-source repository and instructions](https://github.com/DidierRLopes/openbb-slack-agent/tree/main).

First, I forked the [open-source code of the OpenBB agents repository](https://github.com/OpenBB-finance/openbb-agents) that we have been using for R&D. This repository contains all the code for the OpenBB agent and has access to 100+ financial datasets.

Then, I modified it to my needs:

Created the Slack bot interface

When a Slack message mentions @Gohanalyst this workflow gets triggered

When the Slack message contains the word “OpenBB”, I send that message through the OpenBB agent since the assumption is that data retrieval will be necessary. Otherwise, it goes straight through OpenAI.

In a nutshell, this is what the architecture looks like:

<p align="center">
    <img width="800" src="https://github.com/DidierRLopes/my-website/assets/25267873/6ed47ea6-47b8-4253-97cd-d29b076c7c73"/>
</p>

I made Goh Analyst slightly sarcastic to make it a bit more fun. This makes interacting in a public channel somewhat more human and exciting. It can handle simple financial questions, retrieve data using OpenBB tools, or even answer more complex reasoning questions.

<p align="center">
    <img width="800" src="https://github.com/DidierRLopes/my-website/assets/25267873/6ad2d3e6-2472-4b33-a29c-7fc30e84f49c"/>
</p>

<p align="center">
    <img width="800" src="https://github.com/DidierRLopes/my-website/assets/25267873/7101b979-63dd-4363-995c-1dd9704513ca"/>
</p>

Now imagine that every organization has an analyst on their Slack to help make decisions.

## What's next

As I mentioned earlier, one of the advantages we get from OpenBB Creaton is that we test our products and give feedback to the team on what went well or less well. After working on this project, this is what I shared with the team:

<p align="center">
    <img width="800" src="https://github.com/DidierRLopes/my-website/assets/25267873/11d24983-0863-4232-a4d7-e9912837eee3"/>
</p>

Exciting times we live in. If you want to leverage AI within your financial firm, we can help you 🤝