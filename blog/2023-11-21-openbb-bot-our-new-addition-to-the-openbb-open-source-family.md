---
slug: openbb-bot-our-new-addition-to-the-openbb-open-source-family
title: OpenBB Bot - our new addition to the OpenBB open source family
date: 2023-11-21
image: /blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family.png
tags: ['openbb', 'bot', 'open source', 'discord', 'monetization']
description: The OpenBB Bot architecture is now open source. Check out our Discord Bot architecture now on GitHub.
---

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family.png"/>
</p>

<br />

The OpenBB Bot is now open source. Check out our Discord Bot architecture now on GitHub.

The open source code is available [here](https://github.com/OpenBB-finance/openbb-bot).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## What is the OpenBB Bot, and why did we build it?

When the OpenBB Terminal first went viral, users were writing online that one of the things missing from our product was a chat feature like other investment platforms provide.

However, we didn’t understand why the chatting experience needed to be centralized in the application where users research their financial data. Plus, with the ever-growing userbase of apps like Discord, Telegram, Slack, and others, combined with their capabilities to build apps on top, we thought we could do more.

We believe in a future where you can query financial data right from where you are. Meaning you can chat with colleagues, from any of the apps you’re already using.

This is when we partnered with OptionsFamBot (the biggest Discord financial bot that was present in 15k+ servers, reaching 1 M+ users) to build the OpenBB Bot.

You can read more about our launch in August 2022 [here](https://openbb.co/blog/openbb-bot-launch).

## Failing to monetize. Failing to grow user base.

To provide OpenBB Bot users with access to 100+ financial commands (including expensive datasets such as the options and dark pool ones) we had to pay not just the data vendors but also for the display rights.

This was relatively expensive, but we considered it a marketing cost since we expected exponential user growth. We expected that since the Bot could be deployed in any server in a few seconds, more users would be exposed to the Bot, bringing the Bot to other servers, and so on...

**However, that didn’t happen.**

In September 2022, Discord changed its command syntax to force commands to start with “/” and the user drop was noticeable.

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_1.png"/>
</p>

In the meantime, with the end of the Covid-19 Pandemic, people started leaving their houses more and spending less time with communities investing online. Other companies with financial bots were experiencing the same: investors spending less time talking about investing on apps like Discord.

We saw a trend that these same companies started increasing their prices to balance out the number of users.

This is when we went in the other direction: we upgraded our free tier package and decreased the price of our paid version. That announcement can be found [here](https://openbb.co/blog/openbb-bot-price-change).

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_2.png"/>
</p>

This happened at the same time as we added more innovative features to the bot. Features that OpenBB brought to market, while other bots copied from us today.

We created a codebase that was robust and scalable, but still flexible so that it could be quickly tweaked and deployed on other chatting apps.

A couple of days after the price reduction, we announced OpenBB Bot for Telegram (read more about this announcement [here](https://openbb.co/blog/openbb-bot-arrives-on-telegram)).

With the growth of Telegram users and crypto communities, we were well posed to capture that market.

Or so we thought. But our growth never achieved the numbers we had initially estimated.

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_3.png"/>
</p>

Our conclusion is that the market for financial chatbots is much smaller than what we had originally forecasted. This also meant that our goal with the OpenBB Bot as a marketing tool wasn’t returning the ROI that we were expecting.

So in May 2023 we went pretty much all-in on considering the OpenBB Bot as a marketing expense, and removed the individual paid tier. You can see that announcement [here](https://openbb.co/blog/openbb-bot-free-for-individuals).

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_4.png"/>
</p>

Note that we maintained the control of the Billboard message. This is a feature that allows us to add OpenBB events and announcements to the top of these commands, hence increasing awareness. See below how it looks,

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_5.png"/>
</p>

However, even with that change and [adding an AI feature](https://openbb.co/blog/openbb-midjourney-for-investing) to the OpenBB Bot, the user base never grew past what we had hoped.

So we decided to open source the architecture behind the OpenBB Bot.

## Decision to open source

When talking with Roberto Talamas (check out his [OpenBB champion story](https://openbb.co/blog/openbb-champions-roberto-talamas)), he mentioned that he was building his own financial chatbot for his fund from scratch.

That was the trigger we needed to open source our architecture, so the “Robertos” of the world wouldn’t have to start building their chatbot from scratch, but could piggyback on our architecture, which just works (it has never been down since launch and processed over 2.75 M Discord requests).

Since we failed to monetize the Bot, and our adoption trajectory never grew past our expectations, open-sourcing the architecture behind the OpenBB Bot made a ton of sense.

This architecture utilizes data from the OpenBB platform (check out last week’s [beta announcement](https://openbb.co/blog/celebrating-the-openbb-platform-v4-beta)) which means that developers can simultaneously get familiar with our platform while seeing how easy it is to pull financial data from OpenBB - effectively growing OpenBB’s ecosystem.

<p align="center">
    <img width="600" src="/blog/2023-11-21-openbb-bot-our-new-addition-to-the-openbb-open-source-family_6.png"/>
</p>

I’m looking forward to seeing what products are built around the OpenBB Bot in the future.

You can check the repository [here](https://github.com/OpenBB-finance/openbb-bot).

Welcome to the OpenBB open source family.
