---
slug: tracking-my-writing-progress-through-an-open-source-blog-tracker-generator
title: Tracking my writing progress through an open source blog tracker generator
date: 2025-01-07
image: /blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator
tags:
- writing
- productivity
- open-source
- svg
- visualization
- blog
- tracking
- metrics
description: Learn how I built an open-source tool that generates beautiful SVG visualizations of your blog post history, supporting both JSON and ATOM XML feeds. Perfect for keeping yourself accountable and monitoring your writing progress over time.
hideSidebar: true
---



<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator.png"/>
</p>

Learn how I built an open-source tool that generates beautiful SVG visualizations of your blog post history, supporting both JSON and ATOM XML feeds. Perfect for keeping yourself accountable and monitoring your writing progress over time.

The open source code is available [here](https://github.com/DidierRLopes/blog-history-generator).

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

As a developer, you measure your productivity based on the ~~amount~~ quality of code you produce.

If we assume that the quality coming from an engineer remains constant (slightly improving) based on their current experience and continuously growing knowledge of the codebase, then we can assume that their productivity can be measured based on the amount of code they push into the codebase.

As the founder of OpenBB, I don't have a lot of time to code (at least not as much as I used to).

But I love programming, so I try to hop into Cursor at least once a day (every day). Sometimes I just don't have the bandwidth, but it's much easier to fall into that if you are not constantly reminding yourself that you haven't coded since x days ago.

So, in order to keep myself accountable I bought a DeskHub which sits on my desk and I use to keep track of when I am shipping.

<p align="center">
    <img width="600" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_1.jpeg"/>
</p>

I am less interested in the quality and quantity, but that every day I open Cursor and do one of the following:

- Fix a small bug or improve UI/UX on OpenBB (usually during the day)
- Add a new feature (usually during evening as more time is required)
- Write a new post on my website, like this one (evenings or weekend)
- Do a side project (weekend or holidays)

While this has been working for a while, I realized that - for me - writing is as important as coding.

It not only helps me communicate better as a leader, but also (and more importantly) think more clearly.

But I didn't have a way to track that I have been practicing writing and putting myself out there.

So, I built one.

I built a program that generates an SVG visualization of your blog post history - as long as you get your blog post history in ATOM XML or JSON feed.

And open source it <a href="https://github.com/DidierRLopes/blog-history-generator" target="_blank" rel="noopener noreferrer">here</a>.

## Blog format

<CodeBlock
    language="javascript"
    title="Common interface that all formats must conform to"
    showLineNumbers
>
{`interface Post {
  id: string;
  title: string;
  url: string;
  content_html: string;     // Falls back to 'content' in some formats
  summary: string;           // Falls back to 'excerpt' in some formats
  date_modified: string;  // Falls back to date_published/date/updated/published
  tags: string[];                // Defaults to [] if missing
}`}
</CodeBlock>

## Examples

<Tabs>
  <TabItem value="json" label="JSON" default>

Example: <a href="https://didierlopes.com/blog/feed.json" target="_blank" rel="noopener noreferrer">https://didierlopes.com/blog/feed.json</a>

<br/>

<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_2.png"/>
</p>
  </TabItem>
  <TabItem value="atom" label="ATOM XML">

Example: <a href="https://simonwillison.net/tags/datasette.atom" target="_blank" rel="noopener noreferrer">https://simonwillison.net/tags/datasette.atom</a>

<br/>

<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_3.png"/>
</p>

  </TabItem>
</Tabs>

## Quick Setup

1. Fork this <a href="https://github.com/DidierRLopes/blog-history-generator" target="_blank" rel="noopener noreferrer">repository</a>.

2. Give the repo the correct permissions.
    1. Click on Settings.
    2. Then go into Actions and click General.
    3. Scroll down and in Workflow permissions set "Read and write permissions".

<br/>
<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_4.png"/>
</p>

3. Run the workflow.
    1. Click on Actions.
    2. Click on "Generate Blog History" on the left side.
    3. On the right side click on "Run workflow".
    4. A blog feed URL will be required to run this (e.g. https://didierlopes.com/blog/feed.json or https://simonwillison.net/tags/datasette.atom).
    5. Click "Run workflow".

<br/>
<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_5.png"/>
</p>  

That's it.

The SVG will be available here: [./output/blog-history.svg](https://github.com/DidierRLopes/blog-history-generator/blob/main/output/blog-history.svg).

<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_6.png"/>
</p>

## More customization

If you want further customization, you need to:

1. Clone this repository.

2. Install dependencies.

```
npm install
```

3. Run script.

```
npm run generate
```

## Interactive

If for some reason you want this widget to be interactive, you can check [this](https://github.com/DidierRLopes/my-website/blob/main/src/components/BlogHistory.tsx) which is the one I used to integrate into [my homepage](/).

<p align="center">
    <img width="900" src="/blog/2025-01-07-tracking-my-writing-progress-through-an-open-source-blog-tracker-generator_7.png"/>
</p>