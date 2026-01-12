---
slug: free-investment-research-ecosystem-to-consistently-beat-the-market
title: Free investment research ecosystem to consistently beat the market
date: 2023-05-05
image: /blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market.webp
tags:
- openbb
- investment-research
- openbb-terminal
- openbb-bot
- openbb-sdk
- openbb-hub
---




<p align="center">
    <img width="600" src="/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market.webp"/>
</p>

<br />

The OpenBB Hub is a comprehensive platform for managing all products, data, subscriptions, and content for users, aiming to empower investors globally with tools previously exclusive to institutions.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

The OpenBB Hub is the new one-stop-shop for managing all products, data, subscriptions, and content for users!

## Introduction

When we started this journey, we always wanted to empower investors across the globe to have access to tools previously only available to institutions.

We started by building the [OpenBB Terminal](https://my.openbb.co/app/terminal) which is an open source investment research platform that users can customize as they see fit and build on top of.

If you haven’t starred the repo, now is a good chance to do so [here](https://github.com/OpenBB-finance/OpenBBTerminal) ⭐️.

Then, we wanted to address the social nature of investing. Instead of adding the chat functionality to OpenBB Terminal, we brought investment research data where these communities were already having fruitful discussions (Discord and Telegram). This makes much more sense from a user-convenience standpoint, and that’s how the OpenBB Bot was born. More information [here](https://my.openbb.co/app/bot).

As much customization as the OpenBB Terminal allowed, we didn’t give creators as much freedom as we could have since they would need to download the source code of the terminal in order to leverage our core.

![image](/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market_1.webp)

But we we wanted to make this experience as seamless as possible so users could build on top of our foundation. Thus, we repurposed the core of the OpenBB Terminal into an OpenBB SDK that is “_pip installable_” from everywhere — [OpenBB](https://pypi.org/project/openbb/) . This means that all you need to have access to a universe of investment research data programmatically is python and running pip install openbb within a notebook.

This was a big win since the community reaction was very positive and we are now seeing it adopted by investors, educational courses, and even content creators. So much that we even created a tab to keep track of these on our [/open page](https://openbb.co/open).

However, we focused too much on the products and didn’t slow down to think about the user experience utilizing multiple OpenBB products. This is where OpenBB Hub comes into play. [OpenBB Hub](https://my.openbb.co/) is the platform we use to interact with our community, push OpenBB content, allow product management, and much more.

TL;DR:

- Allows to manage your OpenBB Terminal API keys, feature flags and settings. In addition, we allow users to save & share their openbb script routines
- Allows access to the OpenBB Terminal installer new versions
- Allows access to the OpenBB Bot dashboard — which allows fully customization from a user perspective. This improves your experience by 10x when using OpenBB Bot on Telegram or Discord.
- Allows to sign-up for early waitlist of OpenBB Terminal Pro

## OpenBB Hub - OpenBB Terminal

Since the beginning users have installed the OpenBB Terminal in multiple desktops due to its free nature. The issue? The API key management was a pain since there was not a way to sync these across different machines. Until now.

With [OpenBB Hub](https://my.openbb.co/) and using that account detail to log in the terminal, this problem gets fixed. Not only that, but users will benefit from default data sources, terminal color schema customization and even .openbb routines being manageable from Hub and more importantly accessible on a terminal instance as long as they login with their user details.

![image](/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market_2.webp)

## OpenBB Hub - OpenBB Bot

Today we are also announcing the OpenBB Bot will be fully free for individuals. All you have to do is to register for the [OpenBB Hub](https://my.openbb.co/).

For users that were already users of our OpenBB Bot, the only change on the platform is pricing and an increase push towards better documentation and more tutorials. This is an initiative that we are taking company-wide to focus on better documentation and more content to fully leverage our suite of products.

OpenBB bot is critical to us as we work hard towards making a full ecosystem for investment research. And now you can access this experience for free, and share investment research data with your friends / colleagues.

![image](/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market_3.webp)

## OpenBB Hub - OpenBB SDK

As the OpenBB SDK is in its core a pip installable package with its [own page on PiPy](https://pypi.org/project/openbb/) there aren’t a lot of functionalities that we can make available in this page. We allow the user to set their API keys similarly to what we do in the Terminal, to improve UX when utilizing the SDK.

In addition, we are going to display open source projects built by the community that leverage our core so that they can serve as an inspiration to you. If you are working on something that uses OpenBB at its core, tag your GitHub repository with “openbb” and we’ll add you to the list of projects that rely on our foundation.

![image](/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market_4.webp)

## OpenBB Hub - OpenBB Terminal Pro (waitlist)

If all these features weren’t enough, we have decided to open the [OpenBB Terminal Pro WAITLIST](https://my.openbb.co/app/pro/early-access) for users who register on our OpenBB Hub.

The OpenBB Terminal Pro is something that has been months in the works and is yet our most exciting product to date. We have been holding back on it because we believe this will change the way investors think about investing. This time we worked with design partners and had dozens of user interviews from financial professionals to understand their pain points and what role we could fill. So even being able to start creating a waitlist around it is something that the team is very excited about.

We will gradually roll out the OpenBB Terminal Pro to a few users from the waitlist to get early feedback.

If you are one of these, I look forward to onboarding you personally 🤝

![image](/blog/2023-05-05-free-investment-research-ecosystem-to-consistently-beat-the-market_5.webp)

## Final thoughts

Although OpenBB Hub is not a product per se, the amount of work that the team put together to make this happen is something nothing short of extraordinary. This was the first project where the entire team (~20 people from engineering, product, design and marketing) had to work together as whole.

The OpenBB Terminal dashboard is completely new, the concept of login had to be invented and needed to function perfectly with the Hub. The SDK page is also new. The OpenBB Bot dashboard already existed, but we made the tier for individuals completely free, so we had to update it to reflect that big pricing change. And finally, we open the OpenBB Terminal Pro waitlist.

The [OpenBB Hub](https://my.openbb.co/) is completely free.

All you have to do is to register so we can know more information about yourself regarding your primary usage for our products (professional, academic, personal) — this allows us to understand what features to prioritize in the future and improve the quality of our products.

In case you missed the webinar, you can view it below so that you are up-to-date with all the exciting new features that the team has released.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/_4dQs_q_Jtk?si=76h-YFtiqkATHisF"
        width="800"
        height="400"
    />
</div>

<br />
