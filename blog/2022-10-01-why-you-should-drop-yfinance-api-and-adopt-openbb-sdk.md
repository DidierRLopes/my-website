---
slug: why-you-should-drop-yfinance-api-and-adopt-openbb-sdk
title: Why you should drop yfinance API and adopt OpenBB SDK
date: 2022-10-01
image: /blog/2022-10-01-why-you-should-drop-yfinance-api-and-adopt-openbb-sdk.webp
tags:
- openbb-sdk
- yfinance-api
- financial-data
- apis
- open-source
description: Why you should consider switching from yfinance API to OpenBB SDK for financial data retrieval. OpenBB SDK offers access to multiple data sources, potential for unlimited data, and incentives for data source partners.
---




<p align="center">
    <img width="600" src="/blog/2022-10-01-why-you-should-drop-yfinance-api-and-adopt-openbb-sdk.webp"/>
</p>

<br />

Why you should consider switching from yfinance API to OpenBB SDK for financial data retrieval. OpenBB SDK offers access to multiple data sources, potential for unlimited data, and incentives for data source partners.

The open source code is available [here](https://github.com/DidierRLopes/GamestonkTerminal).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

OpenBB SDK will be released later this month 👀.

[yfinance API](https://github.com/ranaroussi/yfinance) is an unofficial (not affiliated) API around [Yahoo Finance website](https://finance.yahoo.com/).

Although it is used in over 12,600 projects on GitHub and is downloaded on average 90,000 per week. This is still an unofficial wrapper. As you can see from Yahoo Finance website, it uses an ad revenue business model. This means that Yahoo Finance doesn’t has any incentive from having users utilizing it through Yfinance API.

If one day Yahoo Finance website adds a paywall through an API key, then Yahoo Finance would:

1. Either become obsolete
2. Or adopt the same architecture of OpenBB where an API key from a data source is necessary

<br />

Regardless, Yfinance API retrieves data that exists on a third-party website: Yahoo Finance website. This means that this API is limited by the data Yahoo Finance is currently paying for redistribution. And thus, users get only what data is supported through the website.

On the other hand, OpenBB SDK allows you to retrieve data from over 50 different APIs (and growing). With yfinance being one of these APIs.

Since OpenBB SDK requires API keys from most of the data sources, these have incentives to partner with OpenBB. Because:

1. Marketing opportunity due to significant larger pool of users
2. New revenue stream

<br />

In essence, Yfinance API:

- Not officially supported by Yahoo Finance
- No incentive for Yahoo Finance
- Limited data by what Yahoo Finance displays
- May become obsolete

On the other hand, OpenBB SDK:

- Marketing for new data sources
- New revenue stream for partners through premium API keys
- (Almost) unlimited data - open source project that keeps on adding new data sources
- Multiple data sources for same data (user has choices)

As counter-intuitive as it sounds:

The shutting down of yfinance API (which is one of the data sources that OpenBB SDK has access to) would be beneficial to OpenBB adoption. This is because users would need to migrate to OpenBB SDK as that’s the most mature and maintained open source financial API.

If you have any questions, feel free to drop me a message!
