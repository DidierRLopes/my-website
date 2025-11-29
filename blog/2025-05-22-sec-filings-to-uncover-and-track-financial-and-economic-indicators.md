---
slug: sec-filings-to-uncover-and-track-financial-and-economic-indicators
title: SEC filings to uncover and track financial and economic indicators
date: 2025-05-22
image: /blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators
tags:
  - sec-filings
  - financial-indicators
  - economic-indicators
  - openbb
  - data-analysis
  - open-source
  - investment-research
  - market-trends
  - dashboard
description: This post explores how SEC filings can be used to uncover and track financial and economic indicators. It showcases an open-source OpenBB app that visualizes this data, providing valuable insights for investment research and market trend analysis.
hideSidebar: true
---

<p align="center">
    <img width="600" src="/blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators.png" />
</p>

This post explores how SEC filings can be used to uncover and track financial and economic indicators. It showcases an open-source OpenBB app that visualizes this data, providing valuable insights for investment research and market trend analysis.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

A few days ago, [Justin Lokos](https://www.linkedin.com/in/justinlokos/) shared a fascinating GitHub repository maintained by [John Friedman](https://www.linkedin.com/in/johngfriedman/) that really caught my attention.

This repository analyzes SEC filings to uncover and track financial and economic indicators across a wide range of sectors.

It can be found [here](https://github.com/john-friedman/datamule-indicators).

It processes topic mentions from regulatory filings and turns them into standardized, sector-level metrics that are updated daily - making it a powerful tool for identifying trends across the economy.

I found the data so compelling that I built and hosted an OpenBB app around it.

<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1em'}}>
    <img width="500" src="/blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators_1.jpeg" />
    <img width="500" src="/blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators_2.jpeg" />
</div>
<br />

The app offers a wide range of indexes across key domains, including DEI and ESG in Governance; Tariffs and Supply Chain in Trade; Layoffs in Employment; Outsourcing and Supplier Concentration in Market Dynamics; Consumer Confidence in Consumer Sentiment; Space and Nuclear in Technology; Political Stability in International; IPO in Corporate Finance; Health Research, Health, and Pandemic in Health; various indexes in Resources such as Explosive Materials, Metals, Semiconductor Materials, Propellant Components, Raw Materials, Electronic Components, and Chemicals; and Military Equipment, Terrorism, and War in Military & Security

And then I made it available to everyone.

<p align="center">
    <img width="300" src="/blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators_3.jpeg" />
</p>

In fact, I [shared this on LinkedIn](https://www.linkedin.com/posts/didier-lopes_a-few-days-ago-justin-lokos-shared-a-fascinating-activity-7332437330659549185-4jVk?utm_source=share&utm_medium=member_desktop&rcm=ACoAABub6aIBaA7HieEI5VizHglQPohLA_Wptag) and asked people interested on the app to comment and the post got close to 20k impressions.

<p align="center">
    <img width="400" src="/blog/2025-05-22-sec-filings-to-uncover-and-track-financial-and-economic-indicators_4.png" />
</p>

My friend [Caique](https://www.linkedin.com/in/ca%C3%ADque-cober-117bbb1ab/) does this often and has seen a lot of people asking for the apps from OpenBB.

And here's the template DM I sent to 100+ people interested.

> Hey,
> <br />
> Sending you a message based on your comment in the post!
> <br />
> 1. Go to https://pro.openbb.co/ and make sure that you have an account - it's free.
> <br />
> 2. Then go to this link: https://pro.openbb.co/app?modal=connect-backend&name=Datamule%20Indicator&url=https://openbb-datamule-indicators.fly.dev
> <br />
> That should populate a new backend on OpenBB where:
> <br />
> - Name: Datamule Indicator
> - URL: https://openbb-datamule-indicators.fly.dev
> <br />
> 3. On the "Apps" tab, click on the "Financial and Economic Indicators" - that should open a dashboard with all the data in one place.
> <br />
> All the data should be ready to be interacted with OpenBB Copilot out-of-the-box.
> <br />
> If you have any questions ping me!

<br />

Also, if you want to see how I built this app - the full code is open source here: [https://github.com/DidierRLopes/openbb-datamule-indicators](https://github.com/DidierRLopes/openbb-datamule-indicators).