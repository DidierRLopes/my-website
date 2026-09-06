---
slug: data-is-the-moat
title: "Data is THE moat"
date: 2026-06-21
image: /blog/2026-06-21-data-is-the-moat/2026-06-21-data-is-the-moat.webp
tags:
- ai
- data
- moats
- startups
- finance
- openbb
description: "Proprietary data, client data, and the context from using these."
hideSidebar: true
---

Proprietary data, client data, and the context from using these.

<!-- truncate -->

Every other AI startup pitch I see right now is selling workflows: vertical, agentic, AI-native. They have real value, but I do not think there is a durable startup moat there. It is closer to a services business, like consulting, than a software one.

Models are language engines. They produce sequences of words, and they are converging fast on the ability to produce those sequences well. Reasoning gets better, inference gets cheaper, open-weight models catch up (check [GLM-5.2 launch](https://z.ai/blog/glm-5.2)!!), and labs leapfrog each other every few months.

But the sequence of words gets harder to put together when it relies on data the model does not have access to. The probability of surfacing the right tokens drops to nearly zero. And it does not matter how good your model is. If it does not have your data, it cannot do miracles…

That is where the moat starts to form.

## Workflows have no moat

Workflows are not defensible because anyone can find someone who has done that work before - check [Mercor’s job listing page](https://work.mercor.com/explore) if you need a proof point. You can replicate prompts, reverse engineer agents, copy orchestration logic, reproduce UI patterns, and observe how teams operate. A company may do something slightly better than another for some period of time, but that does not last. Eventually everyone catches up and the market enters a pricing war where value compresses to zero.

I see this in my own use. A few months ago I used ChatGPT heavily to write blog posts. Then I moved most of that work to Claude. For coding I preferred Claude for a long time, and recently switched to the Codex. For image generation I started with ChatGPT, and these days I often use Gemini.

The workflow barely changed. The work was always the same: writing, coding, research, image generation. The model changed, not the workflow.

If I can swap platforms and do the exact same workflow, the platform does not have a real moat. The amount of additional context I need to do these tasks well is small. For coding it is my codebase, which I bring with me. For writing it is a memory of patterns I like and dislike. There is not much else.

A good example of the dynamic is Daloopa. They open-source many of the skills and workflows built on top of their data ([here](https://github.com/daloopa/investing/tree/main/.claude/skills)). If workflows were the moat, why would they do that? Because the smart move is to [commoditize their complements](https://www.joelonsoftware.com/2002/06/12/strategy-letter-v/). Make the workflows widely available, increase adoption, let others build on top, and in doing so make their underlying data layer more valuable.

## Data is the moat

What competitors cannot get around is the data they do not have access to. That data takes three forms.

1. The first is **vendor proprietary data**. Data you have licensed or built that competitors cannot get on equal terms. That could mean a dataset you have exclusive rights to, or one you put together yourself, or some integration nobody else can access. It does not have to be exotic.

2. The second is **client data**, when your platform is where it lives. Client data on its own is not a moat if the client is happy to send the same data to five other companies. It becomes one when your product is the system of record, the integration layer, or the workspace where that data accumulates. What you are really locking in is not the data itself. It is the fact that the data and its context only exist in usable form inside your product.

3. The third is **derivative data**. When client and proprietary data run through workflows on your platform, they produce a new layer: corrections, decisions, errors, conventions, artifacts, the way a team actually operates. This layer cannot be reconstructed from outside. It exists only because the work happened on your system.

<br />

**The most defensible position combines all three.**

The derivative layer feeds back into making the first two more useful over time. The corrections users make on your platform end up refining the proprietary data. The way teams operate teaches the system how to surface the right client data at the right time. Each interaction makes the next one a bit better, and none of that compounds outside your system.

## The labs are coming for it

Even the workflows the AI labs are pushing into orgs are not really a moat long term.

Right now they are specializing models toward specific workflows. This wins market share in the short term. As models keep improving, those same workflows can be done by another model. The catch is that the labs are coming for the same context.

As models become more of the finalized product, they keep eating into more workflows. And as that happens, the products themselves get more valuable once users bring their data into them.

That is why the labs are being aggressive about going up-market. If they win the context, they get the data. And that data is exactly what they use to train the next version of the underlying model.

It goes deeper than the API call. The labs are training on signals from inside the harness too, not just on what gets sent to the model. Every time you accept a result, that is positive reward. Every time you reject one and ask for a retry, that is negative signal. Every edit, every abandonment, every continuation feeds back into the RL pipeline.

CLIs are where you see this most directly. Inside a CLI especially, the user is constantly producing reward signal just by working. Same goes for agent harnesses, copilots, editors. Anywhere the user gives the model a task, evaluates the result, and moves on or pushes back, the lab gets to learn.

I believe that AI labs will become data companies in the long run too. Everything will become training data to win the battle for intelligence.

## The moat shifts as the technology shifts

A natural pushback is that this will not hold as models get better. As they improve, they will start aggregating proprietary data on their own. Read documents, query systems, mimic workflows from a few examples. If agents can do that, the data moat erodes too.

They can, to a point. But the data still has to live somewhere. An agent reading a client’s CRM is calling into a system someone else stores. So the moat shifts a level deeper, from owning the data to owning where the data lives and who is allowed to read it - i.e. control.

## The defense

The defense is to control where the context lands. If the context accumulates inside your system and the lab only sees inference calls, you are building a moat. If the context accumulates inside the lab's product (their memory, their connectors, their workspace) and you are orchestrating prompts on top, you are helping them consolidate their moat.

This is where workflows earn their place. They are how you get users in and how you get their data in. They create the surface where derivative data starts to accumulate.

But make no mistake, the workflow isn’t a product. The workflow is really just the funnel. **The actual product is the data and context that get captured along the way.**

This is why so many AI companies are converging on the same things: copilots, workspace layers, memory, integrations, skills, enterprise connectors, collaboration features.

**Owning the interaction layer is the most direct way to accumulate proprietary context.**

## Why finance is different

All of this applies broadly, but finance is different in a few ways that make the data moat harder for the labs to absorb than in most other verticals.

Most financial data is licensed under terms that prohibit training, and the vendors actively enforce those terms.

The data is operational input, not training corpus. It is pricing, positions, trades, exposures. Each piece is point-in-time and only useful if it is current, so there is no way for the labs to scrape their way to it.

Trust also matters a lot more in finance than in other domains. Compliance teams move (incredibly) slowly and prefer vendors with track records. The cost of replacing a trusted financial vendor relationship is extremely high - this is why selling market data is so hard, most firms already picked a vendor and have built their systems/models/workflows on top of it.

None of this blocks the labs though.

The financial workspace war is going to be fought between data incumbents and labs trying to own the context layer from different angles:

- Data incumbents by bringing intelligence to their platforms.
- AI labs by bringing proprietary data to their products.

<br />

On the other hand, the buy-side will most likely build their own platforms so they can leverage intelligence without pushing out their context (portfolio positions, trade ideas, internal discussions and models, etc.), the same way they have been leveraging proprietary data from vendors without them having access to what they are doing with it.

This is something that surprised me a lot in the space, most data vendors have no idea what their data is being used for and in what context. I always thought this was a failure in part of the vendor, but maybe is a feature in part of the buyer. If the vendor doesn’t know what their data is being used for, they cannot broadcast it as an idea to their other clients.

Oh and btw, at OpenBB, we offer an agentic financial workspace that you can:

1. Run on-prem/VPC and keep your context all to yourself.
2. Integrate data from any vendor (we just announced an [apps marketplace](https://openbb.co/blog/introducing-the-openbb-app-marketplace/) to make these more accessible to you!).
3. Integrate any [AI agent](https://github.com/OpenBB-finance/agents-for-openbb) (even if you’ve built one internally on top of an open-weight model).

<br />

Separately, I’ve been spending some time on a personal project to create a Workspace Bench evals for an agent interacting with our workspace. More on that soon.
