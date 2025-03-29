---
slug: 2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow
title: OpenBB enables streamlined Client Advisory AI workflow
date: 2025-03-23
image: /blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow
tags: ['AI', 'investment', 'client advisory', 'automation', 'LLM', 'openbb']
description: In this blog post, I’ll show you how an AI agent can transform your funds performance, macro data, news around your holding companies, and more into a draft investor letter that has the same writing style as your team.
hideSidebar: true

---

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow.png" />
</p>

In this blog post, I’ll show you how an AI agent can transform your funds performance, macro data, news around your holding companies, and more into a draft investor letter that has the same writing style as your team.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Gathering performance data, analyzing market shifts, and crafting detailed investor communications is a process that demands precision, consistency, and a personal touch.

But what if your analysts could have an AI writing partner that thinks and communicates just like your team and could prepare those drafts in a few minutes?

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_1.png" />
</p>

## How does it work?

### Step 1: Custom PDF parsing of factsheets

First, the agent tackles the challenge of extracting structured data from your quarterly factsheets.

Using a combination of OCR and state-of-the-art LLM models with structured output, it can capture all the relevant information from the document with a high degree of accuracy.

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_2.png" />
</p>

### Step 2: Learning your communication style

Processing your investor letters is significantly easier, as they usually consist of text, which can be easily parsed to markdown format (ideal for LLMs), and simpler tables, easily identified by the latest models.

So in this step, the important aspect is identifying what makes your ~10-page investor letter unique. To be able to do that, the agent needs several quarter investor letters so it can understand the patterns and similarities between them and answer questions like:

- How does the analyst write the intro?
- How do they wrap up the letter? Does it change based on the overall flow?
- What are the sections of the document (e.g., performance review, outlook)?
- What is the analyst’s tone of voice in general? Does it change based on the performance review?
- How much detail does it go into regarding the major holdings?
- Do they talk about positions that were exited and why? What about new ones?
…

Ultimately, the model needs to understand what makes your investor letter unique.

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_3.png" />
</p>

### Step 3: Pattern recognition between factsheet and investor letter

At this point, it already knows what makes your investor letter unique. However, it still does not know what makes the analyst write certain comments vs others. Where do these come from?

For that, we are picking the concept of “supervised learning” from machine learning, where a model is trained based on the input and output to understand the trends between the two.

In this case:

- The model is the LLM of your choice (e.g., local LLM so data doesn’t leave your machine)
- The input is the factsheet data
- The output is the investor letter

And we use a prompt along the lines of:

> Can you extract the structure/pattern between the factsheet data and what is written in this investor letter? Your goal is to output instructions that can be used as a prompt for a model to predict what the analyst would write based on that factsheet data.

<br />

We are ultimately looking for a detailed "recipe" that connects your factsheet data to what your analyst would write.

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_4.png" />
</p>

The AI learns exactly how your team moves from raw numbers to meaningful insights, maintaining your analytical frameworks and professional voice.

It allows you to understand which factsheet data tables impact which section of the investor letter and how.

**Tips & tricks:**

1. Feed the model with multiple different “Factsheet → Investor letter” examples so it’s easier for it to capture edge cases. Example: The last quarter of the year might have a different section to wrap up the year

2. Do not use examples that had a different writing style than what you're trying to achieve as that can impact the results. Example: an example from 7 years ago might no longer be relevant due to overall style changes

3. Go more granular. Instead of using the entire document as an example, go after a subset of the data. Example: If the performance section of the Investor letter only relies on 4 of the 14 tables, focus on those only to extract a pattern

4. Get the main analyst responsible for the investment letters involved in this process. Having a subject matter expert is essential here and will be a deal breaker.

### Step 4: Preparing your prompt

The agent has now found:

- Your communication style, which will be used as a system prompt
- The recipe to write the investor letter based on factsheet data, which will be used as the user prompt
- Examples of factsheet data and their resulting investor letters, which will be used for few-shot prompt
- A model that we have decided to use (whether OpenAI, open weights model like Llama, or other)

However, we still need to provide the model with:

- Latest factsheet data
- Any additional context to be included in the letter (e.g., tickers of interest for this quarter, macro, ..)

That’s where the OpenBB workspace is crucial.

### Step 5: Connect this custom agent to the OpenBB workspace

It doesn’t matter how good this pipeline is if your team does not have a good interface to interact with it easily—feed it the data it requires, review its output, iterate, etc.

By connecting this custom agent to the OpenBB workspace, your firm can access it directly from there and combine it with the other features OpenBB offers.

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_5.png" />
</p>

Those features include:

- Being able to drag and drop to the workspace the latest factsheet data and any additional context that the model will require
- Interact with the model directly on OpenBB’s interface
- Review the generated draft directly and ask for quick edits or adjustments
- Convert that draft into a widget on the workspace
- Share this initial draft version with your team for feedback

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_6.png" />
</p>

Our unique solution consists of an AI-ready interface where firms can seamlessly integrate their own data and AI agents. This means that these agents are accessible right where your analysts perform their analysis and research, eliminating the need to switch between platforms or learn new tools. This approach allows portfolio managers and analysts to leverage AI to complement their existing processes, rather than relying on generic solutions.

OpenBB also stands out because it’s built on an open-source foundation, unlike anything else in the market, translating into unparalleled transparency, flexibility, and the ability to adapt to your unique needs.

Additionally, our flexible on-prem deployment option means that firms can run open-weight AI models locally and that data never leaves their environment, ensuring privacy and compliance.

## Summing up

While the results can make it look simple, in reality, this is how the pipeline works under the hood:

<p align="center">
    <img width="600" src="/blog/2025-03-23-openbb-enables-streamlined-client-advisory-ai-workflow_7.png" />
</p>

### Real-life results on our clients' operations

The impact of this workflow on our clients' operations has been transformative. Analysts now have first drafts ready within minutes of receiving factsheet data, giving them more time to focus on analysis and personalization. The consistency in communications has improved, while the accuracy of data and insights remains impeccable.

### Increase your team’s throughput and efficiency with AI

Imagine you have an AI partner that thinks like your team, writes like your team, and helps maintain the high standards your investors expect. A partner that's always available, consistently accurate, and infinitely scalable.

That's something OpenBB can help you achieve.

Whether you manage multiple funds, communicate in different languages, or simply want to give your analysts more time for high-value work, we're excited to explore how we can transform your investment communications process.

Interested in seeing how this could work for your firm?

Let's discuss how we can customize this solution for your organization’s unique needs and communication style. Contact me at didier.lopes@openbb.finance.
