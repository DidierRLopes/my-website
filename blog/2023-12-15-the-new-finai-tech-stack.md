---
slug: the-new-finai-tech-stack
title: The new FinAI Tech Stack
date: 2023-12-15
image: /blog/2023-12-15-the-new-finai-tech-stack.webp
tags:
- openbb
- finance
- ai
- agents
- langchain
- llamaindex
- mindsdb
- nixtla
description: This blog post delves into how our collaboration with MindsDB, Nixtla, LlamaIndex, and Langchain is revolutionizing the financial world. Read on to learn all about the event "The New FinAI Tech Stack" held last week in SF, California.
---



<p align="center">
    <img width="600" src="/blog/2023-12-15-the-new-finai-tech-stack.webp"/>
</p>

<br />

This blog post delves into how our collaboration with MindsDB, Nixtla, LlamaIndex, and Langchain is revolutionizing the financial world. Read on to learn all about the event "The New FinAI Tech Stack" held last week in SF, California.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Context

In early September, I attended a “Future of Finance” event in NYC. Despite the presence of well-known financial professionals from top firms in the industry, I found the event lacked practical applications demonstrating how AI is impacting the financial sector.

Once I was back in the Bay Area, I had a barbecue with Jorge and Max from MindsDB and Nixtla, and I was commenting on that experience. To which Jorge promptly replied - why don’t we do it ourselves? So following this discussion, we decided to put the AI in finance event in motion.

<p align="center">
    <img width="600" src="/blog/2023-12-15-the-new-finai-tech-stack_1.webp"/>
</p>

At OpenBB, AI has become a key component in our approach to refactoring the OpenBB Platform from the ground up. We've recently recruited a Head of AI to help us build our strategy and work on this effort full-time.

You can find more details on this [here](/blog/revolutionizing-ai-at-openbb-with-new-leader-michael-struwig).

<p align="center">
    <img width="600" src="/blog/2023-12-15-the-new-finai-tech-stack_2.webp"/>
</p>

## OpenBB x MindsDB

A few days later, I visited the MindsDB office to discuss collaborating with Jorge on potential partnerships. I suggested the idea of gaining access to MindsDB's data, a proposal that seemed feasible to implement.

Eventually, we accomplished this, and I even showcased it during the event last week. The code for this endeavour is open source. Take a look [here](https://github.com/OpenBB-finance/backend-for-terminal-pro/tree/main/mindsdb_python).

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/bbc1b3c9-2617-46a1-aae6-f41cfd4d3745"
    />
</video>

However, Jorge had an even bigger idea. He proposed the concept of granting MindsDB users access to OpenBB data via SQL and harnessing MindsDB's capabilities for machine learning. Essentially, we could convert the data frame in runtime into a virtual SQL table, since we have access to the Pydantic model from the OpenBB platform, and we can build that on the go.

After [tweeting about this](https://twitter.com/didier_lopes/status/1710560436398264756?s=20), I received numerous messages, which validated that there was interest in OBB SQL. So, we set off to work on this. Together with the OpenBB team, we made it easy to access all available inputs/outputs for each endpoint, while the MindsDB team worked on virtualizing the tables. The result can be seen [here](https://github.com/mindsdb/mindsdb/tree/staging/mindsdb/integrations/handlers/openbb_handler).

At the event last week, Jorge shared this work. Additionally, in collaboration with LangChain, he successfully developed a Slack bot with direct access to this data, all accessible within Slack

## OpenBB x Nixtla

Back in August, Nixtla introduced the initial foundation generative AI model for temporal data at MindsDB. At that time, we received an invitation to showcase the practical applications of TimeGPT in production, and for the first time, we unveiled Terminal Pro briefly.

I detailed this experience in a [blog post](https://openbb.co/blog/openbb-incorporates-the-first-generative-AI-model-for-temporal-data-timegpt) and shared a similar demo during the event last week.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/a8a391c9-33e8-4c6b-821c-620617d4fe33"
    />
</video>

Following that, Max and Azul from Nixtla proceeded to share a presentation where they used OpenBB data to assess price targets from analysts and develop an approach on how it is possible to reduce the bias inherent to price estimates and produce better estimates.

## OpenBB x LlamaIndex

Back in July, we initiated the development of AskOBB, enabling users to interact with the open source [OpenBB Terminal](https://github.com/OpenBB-finance/OpenBBTerminal) using natural language. In this effort, we leveraged LlamaIndex and you can see more about it [here](https://openbb.co/blog/breaking-barriers-with-openbb-and-llamaIndex).

So when we started discussing an AI in Finance event, it only made sense to reach out to Jerry and Simon to invite their team to present at the event. And so we did. Jerry ended up presenting their [open source SEC insights repo](https://github.com/run-llama/sec-insights) that uses the Retrieval Augmented Generation (RAG) capabilities of LlamaIndex to answer questions about SEC 10-K & 10-Q documents.

As for the OpenBB Terminal Pro, we demonstrated how we are using LlamaIndex to chat with documents that are uploaded to the OpenBB Terminal Pro. The video below highlights these features.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/3c4190be-2676-4790-a59e-c33c6006a195"
    />
</video>

## OpenBB x Langchain

After attending the AI Engineering Summit event, specifically Harrison’s workshop on how to get started with agents using Langchain, I felt inspired to create an agent on top of the OpenBB platform.

So that very day, I went home and started to work on [this repo](https://github.com/DidierRLopes/openbb-agents). By the end of the day, the agent was already able to perform complex queries.

Over time I iterated on it to make the agent more robust, but the improvement on the architecture started to happen after Michael joined OpenBB and he was able to focus on this full-time - the progress can be found on [this open source repo](https://github.com/OpenBB-finance/openbb-agents). An example of a prompt that the agent can answer is:

> _Check what are TSLA peers. From those, check which one has the highest market cap. Then, on the ticker that has the highest market cap get the most recent price target estimate from an analyst, and tell me who it was and on what date the estimate was made._

<br />

So at the event, Harrison presented this architecture which heavily relies on Langchain and OpenBB tools.

<p align="center">
    <img width="600" src="/blog/2023-12-15-the-new-finai-tech-stack_3.webp"/>
</p>

Later on, I demonstrated how we can integrate this architecture into OpenBB Copilot and make it available from the OpenBB Terminal Pro.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/a3c20953-ca08-4bdd-b7d5-93878edc7e07"
    />
</video>

## Wrap up

Finally, this was an amazing event organized by MindsDB and a team that put together 5 of the most prominent open-source companies working on problems at the intersection of AI and Finance.

You can rewatch the entire event here:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/V1rYmWWVbIY?si=25HUWPxjAB8sfUPx"
        width="800"
        height="400"
    />
</div>

<br />

We're considering organizing another event like this soon, possibly even in NYC.

And if your firm is interested in early access to the OpenBB Terminal Pro, you can reach out to hello@openbb.finance, we’d love to chat.