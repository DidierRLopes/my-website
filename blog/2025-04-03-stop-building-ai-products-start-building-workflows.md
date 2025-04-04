---
slug: 2025-04-03-stop-building-ai-products-start-building-workflows
title: Stop building AI products, start building workflows
date: 2025-04-03
image: /blog/2025-04-03-stop-building-ai-products-start-building-workflows
tags: ['AI', 'product strategy', 'business', 'openai', 'workflows', 'openbb']
description: The secret to building defensible AI companies isn't better AI - it's better workflows. An insider's perspective on why some AI companies thrive while others will become obsolete with each new model release.
hideSidebar: true

---

<p align="center">
    <img width="600" src="/blog/2025-04-03-stop-building-ai-products-start-building-workflows.png" />
</p>

The secret to building defensible AI companies isn't better AI - it's better workflows. An insider's perspective on why some AI companies thrive while others will become obsolete with each new model release.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Lately, I've been asked several times about my opinion on how better AI models are ultimately going to impact financial companies and OpenBB.

If you're not an AI lab, then your product is a wrapper around an LLM.

In the AI space, a lot of people use the term wrapper with a negative connotation. But not all wrappers are created equal.

Being a wrapper around an LLM just means that your product is not the LLM—but the wrapper itself.

## Chatting with your internal data

If you're building a general-purpose AI model to be used on any user data, and your pitch is: our model is better at retrieval than any other AI lab.

Then you’ve already lost.

The funny thing is, the companies that fall into this trap will say:

> _"OpenAI isn't a competitor because we are better at understanding the user data"_

<br />

But then, every time a new model drops they will tell investors:

> _"Our product just got 2x better because of the latest OpenAI release"_

<br />

You see the irony right?

If you have _this_ thin of a wrapper, then in the words of Sam Altman — OpenAI will steamroll you.

I.e., while you're telling investors that your product performance improved thanks to the latest model, we both know that the value gap between using OpenAI directly and your product just got smaller.

You're fighting a fight you can't win.

## But our chatting interface is better

How is it better?

- Does it create charts and tables?
- Does it create artifacts?
- Does it highlight citations?
- Does it provide reasoning?
- Does it do web search?
- Does it do deep research?
- Does it allow you to upload documents?

I'm sorry to tell you, but OpenAI already does all these things.

Even worse - in the financial services, firms are likely already using Microsoft or Google as a cloud vendor.

And both of these have products where OpenAI and Gemini, respectively, work on top of firm's data.

So why would a firm even look at your product if this is where you fall?

## What about Perplexity?

Perplexity needs to be studied. For good reasons.

They fine-tuned an open-weight model and used it for web search.

Nothing groundbreaking here.

Except that their execution is seamless.

They did it much earlier than any of the main AI labs—and every day that passed, Perplexity was gaining market share around AI for querying the internet.

While they were gaining market share, they never let the momentum die—either through launches, partnerships, competitions...

And so today, although OpenAI and others have web search, Perplexity is considered the best product for queries that involve the web.

Ultimately, I think their moat is a combination of being first to market (on search), having a strong brand, and—more importantly—flawless execution by Aravind.

One of the things I never understood was why they didn’t push more on the Enterprise AI angle. After all, they have the best demo there is:

> _“If we can give you an answer based on a personal blog post written 17 years ago by a professor of history from Portugal, do you really think we can’t get your ‘extract the company’s last twelve months’ revenue’?”_

<br />

But they announced crossing $100M ARR, so they’re doing pretty well.

## Where does the highest value lie?

I'm seeing two dimensions here:

1. Data
2. Workflows

<br />

Let's approach each individually.

### 1. Data

When it comes to data, we are talking about:

> _Do you have your own proprietary data that firms would pay for?_

<br />

If the answer is yes—then _this_ is your moat.

Note that this has nothing to do with AI, but with the data itself.

AI is just the delivery mechanism for that data. Not an API call, not a dashboard with the data, not a notification... a box that expects natural language and returns the data.

If the answer is no, then you don’t have a moat here.

**BUT.**

If you were thinking, _“But my application connects with data from FactSet, S&P, ...”_

Then your moat is not the data itself, but the **workflow**—which takes me to the next moat discussion.

### 2. Workflows

Here, the question is: what types of workflows do you allow users to get done on your product?

The definition of a _workflow_ is: a sequence of steps or tasks that are carried out to complete a specific process or achieve a particular goal.

There’s no mention of AI anywhere in that definition. AI is a tool that can help get a workflow done, but it isn’t required.

What _is_ required is understanding users—and understanding what they want to get done.

So there's a _lot_ of value in going narrow and nailing the workflow for a specific type of user.

_"But if you go narrow in a vertical, can’t you be disrupted more easily?"_ — you ask.

Yes and no.

- **YES**, if OpenAI ultimately wanted to go after that market, it could. But OpenAI won’t care. Not necessarily because the market isn’t big, but because they’re pursuing one that’s even bigger.

- **NO**, because the more vertical and narrow you go, the fewer experts there are, the stronger the word-of-mouth is, and the lower the competition. And once you’re in—you have first-mover advantage.

## Examples

Cursor and Windsurf are amazing products because they _nail the workflow_ of developers.

It’s not just about the AI model being used—but _when_ and _how_ it's used.

It’s about being in a full IDE that users are already familiar with, and plugging in the AI at the exact moments a user needs it.

They understood the pain of developers—and used AI to alleviate that pain.

The moat is in nailing the workflow and the user experience.

**What about better models being released? How do they impact these products?**

They get better.

Because the developers behind the product understand how to use these better models to remove _even more_ friction for their users.

Another thing worth saying here—I don’t actually believe in users selecting different models.

It sounds good in theory, but in practice, it doesn’t really work.

I don’t care what model Cursor is using—I care about getting my workflow done.

As a developer, I have _zero_ loyalty to my tools. I’ll use whatever gets the job done faster and more efficiently.

I mean—how many people actually switch models manually on Cursor? I think not many, and definitely not frequently.

I, for one, use Claude because it’s the best for coding right now. But if I’m asking an implementation question, then I’ll click on the “Claude Thinking” model.

Do I _want_ to click on “Thinking model”? Not really. But Cursor doesn’t yet understand my intent to get all the “firepower” I can for this answer—so for now, this will do.

Even better—do I _really_ care that it’s Claude? Nope. If it turns out Gemini 2.5 is the best at coding, I’ll happily switch and never look back.

## OpenBB

Ok, so where do we fit?

We’re very much in the category of **Workflows** - similar to Cursor.

The difference is: we didn’t have a VSCode that we could fork and build on top of.

The best financial terminals used in the space — Bloomberg, FactSet, CapIQ — are all closed-source.

So we had to build **OpenBB Workspace** from scratch over three years to match the capability and quality that financial professionals expect.

And now, we’re adding AI where it makes sense.

Some of these workflows that can be done on OpenBB include:

1. **Public Equity**: Earnings guidance intelligence; Investor call preparation.
2. **Wealth Management**: AI-Generated investment notes; Portfolio optimization & risk management.
3. **Private Equity & Credit**: AI-enhanced due diligence; Credit data room intelligence.
4. **Crypto**: On-chain & off-chain analysis; Sentiment & community perception tracking.
5. **Commodities & Macro**: Scenario-based forecasting; Regime shift analysis.
6. **Client Advisory**: Generate draft investor letters; Client sentiment analysis.
7. **Logistics & Operations**: Bunkering intelligence; Regulatory compliance & risk monitoring.

<br />

And we’re adding more fast.

Now that we have a UI that meets industry standards, we can double down on **workflows that delight customers**.

And we’ll keep expanding how many workflows can be done on OpenBB—ultimately with the goal of making OpenBB the **central interface** used within a firm, built on top of their own data.

Here’s an example of an application built on OpenBB in just a couple of days by one of our engineers, for a workshop we’re putting together with risk managers:

<p align="center">
    <img width="900" src="/blog/2025-04-03-stop-building-ai-products-start-building-workflows_1.jpeg" />
</p>

This highlights not only what we’ve built, but also how quickly we can delight customers on top of our product.
