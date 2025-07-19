---
slug: 2025-06-01-not-your-typical-data-vendor
title: Not your typical data vendor
date: 2025-06-01
image: /blog/2025-06-01-not-your-typical-data-vendor
tags:
  - financial-data
  - api
  - developer-experience
  - ai
  - ai-agents
  - openbb
  - data-quality
  - financial-datasets
  - sec-filings
description: This post explores Financial Datasets, a data vendor focused on top-tier developer experience and data quality, with an API built for AI agents.
hideSidebar: true
---

<p align="center">
    <img width="600" src="/blog/2025-06-01-not-your-typical-data-vendor.png" />
</p>

This post explores Financial Datasets, a data vendor focused on top-tier developer experience and data quality, with an API built for AI agents.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

There are hundreds, maybe even thousands, of financial data vendors out there.  
  
Each with its own flavor of data quality, coverage, automation, business model, developer experience, and pricing.  
  
But in such a crowded space, standing out means doing at least one thing 10x better than the rest.  
  
Financial Datasets does two:
  
1. **Best-in-class developer experience**.

    The API is simple, clean, and fast—not just for humans, but purpose-built for AI agents. As the founder puts it: "Our API is designed for AI financial agents (...)"

2. **Obsessive focus on data quality**.

    The founder personally digs into SEC filings to understand discrepancies between their numbers and those from other vendors. That level of care isn't common. It shows.

<br />

Given all that (and the fact that I play football ⚽️ with the author), I decided to build an OpenBB app powered by this API so you can try it out yourself - and see what data is available.

<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1em'}}>
    <img width="500" src="/blog/2025-06-01-not-your-typical-data-vendor_2.jpeg" />
    <img width="500" src="/blog/2025-06-01-not-your-typical-data-vendor_3.jpeg" />
</div>
<br />

Two steps:

    1. Login into [https://pro.openbb.co](https://pro.openbb.co/)  
    2. Add the app with this link: [https://pro.openbb.co/app?modal=connect-backend&name=Financial%20Datasets&url=https://financial-datasets-openbb.fly.dev](https://pro.openbb.co/app?modal=connect-backend&name=Financial%20Datasets&url=https://financial-datasets-openbb.fly.dev)

<br />

This is the app that you should expect:

<p align="center">
    <img width="300" src="/blog/2025-06-01-not-your-typical-data-vendor_1.jpeg" />
</p>

It will be limited to a few tickers that the creator has made accessible for free. 

More information you can check it out at [https://www.financialdatasets.ai/](https://www.financialdatasets.ai/).

Or if you have an API key, you can adapt the source code to support more tickers [here](https://github.com/virattt/openbb-financialdatasets-backend).
