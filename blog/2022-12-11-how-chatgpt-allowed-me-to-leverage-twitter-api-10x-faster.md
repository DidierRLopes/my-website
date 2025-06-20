---
slug: how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster
title: How ChatGPT allowed me to leverage Twitter API 10x faster
date: 2022-12-11
image: /blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster.png
tags:
- chatgpt
- twitter-api
- tweepy
- python
- programming
description: Leveraging the power of ChatGPT to interact with Twitter API for real-time financial news updates.
---




<p align="center">
    <img width="600" src="/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster.png"/>
</p>

<br />

Leveraging the power of ChatGPT to interact with Twitter API for real-time financial news updates.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

For a while now, users have been asking for adding real-time financial news on [OpenBB Terminal](https://github.com/OpenBB-finance/OpenBBTerminal).

Since OpenBB Terminal is a command line interface for the world’s financial data, and there is no threading going on — there was never a very straightforward way to do this.

**Until today.**

After recalling [this tweet](https://twitter.com/elonmusk/status/1591121142961799168?s=20&t=j-cjTu-XA9SNcY8PBrbUnQ) from Elon earlier in November, I realized that I’ve been using Twitter for news substantially more than MSM.

![image](/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster_1.png)

So, my next train of thought was; What if I was able to somehow display the latest tweets from Twitter accounts that I trust. In particular, accounts that have up-to-date information and usually mention the words “JUST IN” or “BREAKING”. E.g. [@WatcherGuru](https://twitter.com/WatcherGuru) or [@unusual_whales](https://twitter.com/unusual_whales).

By doing this, I could then use the bottom of the OpenBB Terminal to highlight the news. An example of this is below:

![image](/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster_2.png)

## Coding and ChatGPT

The next step for me was to implement the code!

First, I needed to understand how I could have access to the last tweet of a specific user account. I already had a Twitter API account created, which meant I already had the key, token and secrets, therefore, I just needed to read documentation to understand how to use the Twitter API. Hence, I started reading [Twitter’s developer documentation](https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent).

The day before I had been playing around with ChatGPT. And like everyone else, I was very impressed. One of the things that surprised me the most was how good it was at outputting working code with an explanation along the lines.

So, while I was reading the documentation, I was thinking “I wish there was a way for me to just be able to get the last N tweets of an account without needing to dig in the developer documentation”. Could ChatGPT be the answer?

So I tried…

![image](/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster_3.png)

This was already amazing. But I’m lazy and didn’t want to copy all the cells individually to put it into a Jupyter notebook, so asked ChatGPT to provide the code output as a single block. I wasn’t convinced it was going to work. **But it did**.

![image](/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster_4.png)

… it just worked. 🤯

After that, I needed the timestamp associated with the tweet, to see how old it was. As usual, I started looking into [Tweepy documentation](https://docs.tweepy.org/en/latest/authentication.html#twitter-api-v2).

**Ups, what was I doing again?**

After a couple of seconds, I went onto ChatGPT and asked how I could get the timestamp of a tweet using Tweepy library.

**And 🪄, it worked again!!!**

![image](/blog/2022-12-11-how-chatgpt-allowed-me-to-leverage-twitter-api-10x-faster_5.png)

One thing that is for sure: ChatGPT is going to truly disrupt many industries. And I will be here for it.

PS: The PR with this addition is in development [here](https://github.com/OpenBB-finance/OpenBBTerminal/pull/3757).
