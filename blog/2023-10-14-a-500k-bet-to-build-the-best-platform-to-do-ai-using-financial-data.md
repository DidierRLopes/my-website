---
slug: a-500k-bet-to-build-the-best-platform-to-do-ai-using-financial-data
title: A $500k bet to build the best platform to do AI using financial data
date: 2023-10-14
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280557960-f07a672a-3129-42ae-96c9-fecb7a88a325.png
tags: ['AI', 'Financial Data', 'OpenBB', 'Data Access', 'Agents']
description: This blog post discusses our $500k investment in building the best platform for AI using financial data. We focus on the rebranding of OpenBB SDK to OpenBB Platform, its features, and the potential payoff of this bet in 2024.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280557960-f07a672a-3129-42ae-96c9-fecb7a88a325.png"/>
</p>

<br />

This blog post discusses our $500k investment in building the best platform for AI using financial data. We focus on the rebranding of OpenBB SDK to OpenBB Platform, its features, and the potential payoff of this bet in 2024.

The open source code is available [here](https://github.com/DidierRLopes/openbb-agents/tree/main).

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

Earlier this year we made a $500k bet.

The [OpenBB SDK](https://my.openbb.co/app/sdk) had access to over 500 data endpoints. But it was built as a second thought (after the Terminal) and it was extremely time-consuming to manage all dependencies.

Plus, the SDK had more than just access to data and thus was bloated.

So we invested $500,000 to build it from the ground up and focus on data access.

Now the OpenBB Platform (rebrand) is lean and scalable.

It can be used in Python (`pip install openbb==4.0.0a2`) but also for web development. More information [here](https://pypi.org/project/openbb/).

And honestly, is the door to financial data.

**Why am I saying all this?**

Because I predict that in 2024 this bet will have a massive payoff.

**The reason?**

Agents are going to be big.

And when they are, financial firms that aren’t leveraging them are going to have to spend a lot of resources to make up for the lack of efficiency.

## Enter OpenBB Platform

- We are data vendor agnostic (we enable them)
- We are open source (everyone can contribute data)
- We standardize data across close to 100 different data providers
- We put a lot of effort into our documentation

The last 3 points are key for agents, and why people will build agents on top of the OpenBB platform.

In a few hours, I was able to use the following prompt:

```console
    Check what are TSLA peers.
    From those, check which one has the highest market cap. 
    Then, on the ticker that has the highest market cap get 
    the most recent rating from an analyst. And tell me who 
    was the analyst and what date was it that the rating was done
```

To have an agent execute this entire workflow in a 1/10th of the time that it would have taken an analyst to do.

Check for yourself the example below,

![image](https://github.com/Meg1211/my-website/assets/88618738/f07a672a-3129-42ae-96c9-fecb7a88a325)
