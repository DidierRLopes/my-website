---
slug: the-role-of-ai-and-openbb-in-the-future-of-investment-research
title: The role of AI and OpenBB in the future of investment research
date: 2023-04-03
image: /blog/2023-04-03-the-role-of-ai-and-openbb-in-the-future-of-investment-research.png
tags: ['OpenAI', 'future', 'ChatGPT', 'Discord']
description: How OpenBB can lead the future of finance using AI on top of an open source investment research platform.
---

<p align="center">
    <img width="600" src="/blog/2023-04-03-the-role-of-ai-and-openbb-in-the-future-of-investment-research.png"/>
</p>

<br />

How OpenBB can lead the future of finance using AI on top of an open source investment research platform.

The open source code is available [here](https://github.com/openbb-finance/OpenBBTerminal).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Introduction

This blogpost won't speak about what the OpenBB Terminal can offer today. Instead, we are going to share where we think AI can play a role in the future of investment research, and how through an open source platform, we can lead that wave.

A lot of this blog is based on the fact that the OpenBB Terminal is an open source investment research platform, and therefore it's very relevant to read [our blogpost about why we are open source](/blog/why-the-need-for-an-open-source-investment-research-platform).

Note: This blogpost will share several proof-of-concepts that are still within R&D and are not yet ready for production. Also, this blogpost will assume that you are aware of LLMs such as ChatGPT and WhisperAI.

## ChatGPT as the interface

An edge that incumbents have is the fact that they have been around for a very long time and spent a lot on educating users about their product. As a result, users are used to their platform. This makes it harder for users to switch to an unknown product, meaning they need to be 10x better than the competition for them to do so.

However, what if there was no learning curve? What if you could use a product for the first time and know how to access all the information you wanted without spending any time reading the documentation? In essence, the educational incumbent advantage would become obsolete.

With the new LLM advancements, such as ChatGPT. We are not far from this reality. Below is a proof-of-concept of what this could look like:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/FeYgQxnF_VY?si=3ZuXnyrWdW4UkqQy"
        width="800"
        height="400"
    />
</div>

Plus, if this is built on top of an open source project it means that the community can help in improving the model by providing more training data (e.g. provide a text as input and the corresponding command as output) or even confirm whether or not the chart that pops up was accurate.

In addition, along with data sources you can imagine that the community could start contributing with new languages for the GPT model. This makes using a new investment research platform easy, but more importantly makes retrieving information much faster and efficient.

The screenshot below shows that ChatGPT can accurately return the right OpenBB command when the user requests a certain type of data, as long as the model can be trained on our documentation:

![image](https://cdn-images-1.medium.com/max/1600/1*IWnSMNhHDyiulxri_hEB0g.png)

EDIT: Bloomberg introduced [BloombergGPT](https://openai.com/research/whisper) last week, and the following screenshot is taken from their research paper which validates the argument above.

![image](/blog/2023-04-03-the-role-of-ai-and-openbb-in-the-future-of-investment-research_1.png)

## WhisperAI as the interface

If we go one step further, instead of relying on text as input, the platform could rely on voice. With models such as [WhisperAI](https://www.bloomberg.com/company/press/bloomberggpt-50-billion-parameter-llm-tuned-finance) we will be able to speak with the platform in order to retrieve financial data.

Below is a proof-of-concept showing how you can retrieve this data through voice.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/1CHti3nmWGY?si=yLF5AFHe91JFVgaS"
        width="800"
        height="400"
    />
</div>

One of the advantages of an automatic speech recognition (ASR) system is the fact that it doesn't rely solely on english and therefore, it would welcome people from all over the world to interact with the platform. Note: WhisperAI is open source and you can find more information on it [here](https://github.com/openai/whisper).

## GPT to build investment research reports

One of the new features that was announced with the [OpenBB Terminal 2.0](https://openbb.co/blog/openbb-terminal-2-acai) was the automated reports generation that utilizes [Netflix's papermill](https://netflixtechblog.com/notebook-innovation-591ee3221233) to leverage jupyter notebook templates.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/gHVyAZTampQ?si=s-4uIElohM-qzmNh"
        width="800"
        height="400"
    />
</div>

As it stands creating one of these notebook templates requires some coding skills and reading [OpenBB documentation](https://docs.openbb.co) to understand how to retrieve the data of interest providing the correct function and necessary arguments.

But, for a second, imagine if you could build these notebook templates with almost no-code?

The proof-of-concept below in combination with the automated report generation should allow you to further understand the breakthrough that we may accomplish in the future.

![image](/blog/2023-04-03-the-role-of-ai-and-openbb-in-the-future-of-investment-research_2.png)

My prediction is that open source + AI will disrupt the financial sector in the upcoming years, and OpenBB will be leading that wave.