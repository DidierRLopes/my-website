---
slug: 2024-02-27-openbb-copilot-now-available-to-all-terminal-pro-users
title: OpenBB Copilot is now available to all Terminal Pro users
date: 2024-02-27
image: https://github.com/DidierRLopes/my-website/assets/25267873/64b9e7a6-2720-4bd5-97ff-a62d9900820e
tags: ['openbb', 'copilot', 'generative ai', 'ai', 'llm']
description: Introducing the OpenBB Copilot, an ever-present financial analyst at your fingertips with the OpenBB Terminal Pro.
---

<p align="center">
    <img width="600" src="https://github.com/DidierRLopes/my-website/assets/25267873/64b9e7a6-2720-4bd5-97ff-a62d9900820e"/>
</p>

For the past few weeks, we’ve been working on the OpenBB Copilot, an ever-present financial analyst at your fingertips with the OpenBB Terminal Pro.

<br />

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

The [OpenBB Copilo](https://openbb.co/use-cases/ai) is our latest addition to the [Terminal Pro](https://openbb.co/products/pro), and we could not be more excited to share it with you.

If you don't have access yet, join the [Terminal Pro waitlist](https://my.openbb.co/app/pro/early-access) and enjoy your 3-week free trial soon!

Now, take a moment to meet your new **AI investment research partner**.


## What can the OpenBB Copilot do?

OpenBB Copilot is multi-functional and can perform several tasks that are useful to analysts. We’ll be exploring these below.


### Generic financial knowledge

Using OpenBB Copilot, you can ask any general financial question. For example:

**What is the P/E ratio?**

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/7c8c9658-4c4d-4090-8a61-826de823981b"
    />
</video>

As an additional bonus feature, OpenBB Copilot includes a LaTeX renderer to display mathematical formulas and equations.


### Conversation capability

OpenBB Copilot is a conversational agent and is, therefore, aware of the chat history of the current conversation.

As a result, you can ask follow-up questions and steer OpenBB Copilot toward your line of inquiry while developing an investment thesis.

To clear the message history, for example, when investigating a new asset, you can click on the trashcan icon to start a new conversation.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/3e1170f2-59b4-458a-bc6e-cd86c688b8db"
    />
</video>


### Terminal Pro as context

If you ask questions about the data on the dashboard, OpenBB Copilot will query the Terminal Pro for the data necessary to answer your query.

The Copilot has access to the dashboard metadata on the backend and can decide to retrieve data from any of the widgets currently on your dashboard.

In most cases, if you can see the data on your dashboard, you can assume OpenBB Copilot has access to it.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/6c22201f-67ce-49a7-ab4d-213b594c657b"
    />
</video>

This is an application of what’s known in the AI world as function calling, which allows LLMs to interact with external systems.

The OpenBB Copilot can choose to automatically retrieve the data from your dashboard if it needs it to answer your query.

The advantage of this approach is that, since you can retrieve data from any widget, you can also expand OpenBB Copilot’s knowledge by adding custom widgets or by bringing your own data to the Terminal Pro.


### Query specific widgets

Sometimes, you may wish to focus your analysis and use OpenBB Copilot with only a specific subset of widgets.

For example, you may want to use OpenBB Copilot to assist you in a deep analysis of an earnings transcript in the "Earnings Transcript" widget without retrieving data from the rest of the dashboard.

To achieve this, you can chat with specifically selected widgets by clicking on the "Add widgets as context".

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/dc74b30a-73ed-4b85-af23-9bb8ab9c844c"
    />
</video>

Selecting a widget will make that widget's data available to OpenBB Copilot while excluding all the other widgets.

You can then use the Copilot as normal and the unselected widgets will be ignored by the Copilot.


### Query your own documents

You’re also not limited by the data that is available in Terminal Pro.

You can upload your own documents for OpenBB Copilot to use as context while answering your queries.

OpenBB Copilot currently supports txt, PDF, CSV and XLSX documents.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/dec690c2-ed07-40c1-8b3e-ff0ad7294258"
    />
</video>

### Citations

We understand that sometimes getting an answer from an AI chatbot with financial knowledge isn’t satisfactory.

You often want to do further research or do your own fact-checking of the sources used to answer to your query.

That is why OpenBB Copilot provides citations as part of its answers.

When using the Terminal Pro as context or chatting with your uploaded data files, the Copilot will cite which data sources it used to formulate the answers.

Simply mouse over the citation to see which widget data was used, or which uploaded file was referenced. For PDF document specifically, the Copilot will also source the specific page that was used to answer your query.

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/e35a0b2c-8150-4d2b-9743-a72862ba3b6d"
    />
</video>

## What if you don't want to use our copilot?

You don’t have to. That is the reason we came up with the Bring Your Own Copilot concept.

If you’re an OpenBB Terminal Pro user, you’re able to bring your own financial Copilot that has been fine-tuned and tweaked on your enterprise’s private data.

This provides an edge to financial firms as they can access their own fine-tuned LLM with access to real-time data provided by the OpenBB Terminal Pro - making this the perfect combo to perform investment research.

We have an [open-source repository](https://github.com/OpenBB-finance/copilot-for-terminal-pro/tree/main) to help you make your own copilots accessible on the Terminal Pro.

You can also see the video below:

<video controls>
    <source
        src="https://openbb-cms.directus.app/assets/2703e8d8-2497-40ab-b513-678d78989f5b"
    />
</video>

<br />

Check out our [AI page](https://openbb.co/use-cases/ai) to learn more about these features and stay updated in the future.
