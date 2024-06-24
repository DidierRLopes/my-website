---
slug: introducing-the-openbb-add-in-for-excel
title: Introducing the OpenBB Add-in for Excel
date: 2024-01-17
image: /blog/2024-01-17-introducing-the-openbb-add-in-for-excel.png
tags: ['excel', 'launch', 'openbb', 'announcement']
description: We acknowledged the enduring centrality of Excel in the financial sector, so we're now making data from the Terminal Pro readily available in Excel. We're also excitedly working to integrate the "Bring Your Own Data" feature into our Excel Add-in, a move we foresee as a transformative step in the financial data industry.
---

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel.png"/>
</p>

<br />

We acknowledged the enduring centrality of Excel in the financial sector, so we're now making data from the Terminal Pro readily available in Excel. We're also excitedly working to integrate the "Bring Your Own Data" feature into our Excel Add-in, a move we foresee as a transformative step in the financial data industry.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Introduction

Building something people truly want requires direct engagement with them. After conducting over 100 interviews with analysts and quants, three key insights surfaced:

1. The financial world runs on Excel.

2. The primary value of the OpenBB Terminal Pro lies in its customization (bring your own data + widget/dashboard creation) and AI features.

3. The financial world, **LITERALLY**, still runs on Excel.

For topic number 2, we were well underway towards building the [Terminal Pro](https://openbb.co/products/pro) as the most customizable and efficient financial terminal.

But for topics number 1 and 3, we weren’t.

So we devised a small task force to tackle this effort and work with design partners towards building the [OpenBB Add-in for Excel](https://openbb.co/products/excel).

The goal was simple: **financial data available on the Terminal Pro should be accessible in Excel**.

But as we do for all our products, we wanted to understand where this product would sit in our ecosystem.

Since the Terminal Pro offers a basic data tier (including historical price, fundamentals, analyst estimates, news, macro-economy, and forex) with redistribution rights, we decided to make those same datasets available in Excel.

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_1.png"/>
</p>

## Getting Started

So, in simple terms, we allow the user to access financial data right from Excel, by connecting with the OpenBB server to do the data request.

In the example below you can see that we are using the formula `=OBB.EQUITY.ESTIMATES.PRICE_TARGET("AAPL")` which retrieves the latest data about AAPL’s price target.

You can read more information about it in our [Documentation](https://docs.openbb.co/excel/reference/equity/estimates/price_target).

This is how it looks:

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_2.png"/>
</p>

This was a huge step for us.

However, another question came up:

**As the datasets keep expanding, discoverability will become a big problem.**

And we haven’t been around for 40 years for users to be familiar with our terminology.

So, how would users know what function to use, to access the datasets they are interested in?

We figured that enterprise users would be interested in accessing the data they are already visualizing in the [OpenBB Terminal Pro](https://openbb.co/products/pro).

So we allowed them to get the Excel function directly from each widget:

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_3.png"/>
</p>

After clicking on the “Functions” button in the ellipsis icon of the widget data you are interested in, this is what a user sees:

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_4.png"/>
</p>

## Templates

Since [OpenBB Terminal Pro](https://my.openbb.co/app/pro) users are used to the templates they have access to with our product, e.g. our equity analyst template:

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_5.png"/>
</p>

We ensured that similar templates were available for the Excel Add-in, and you can find them [here](https://my.openbb.co/app/excel/templates).

<p align="center">
    <img width="600" src="/blog/2024-01-17-introducing-the-openbb-add-in-for-excel_6.png"/>
</p>

## What's Next

Last but not least, we are working on the upcoming integration of the "Bring Your Own Data" (BYOD) feature into our Excel Add-in.

Until now, this capability has been exclusive to the OpenBB Terminal Pro and is a **cornerstone of our offering**.

But it doesn’t have to stop there.

Our foundation on an open-source platform empowers us to facilitate open data access across multiple interfaces, whether through the Terminal Pro or the Excel Add-in.

We expect this to be a complete game-changer in the industry. While numerous financial Excel add-ins exist, they lack the flexibility to seamlessly incorporate third-party or proprietary datasets.

We are currently working with design partners on this. So if this sounds like something you are interested in - please reach out.

We have a 5,000+ [waitlist](https://my.openbb.co/app/pro/early-access) to the Terminal Pro and have already started onboarding users. As part of the Terminal Pro free trial, you will be granted access to the OpenBB Add-in for Excel as long as you have Microsoft Excel.

Wondering how to get started easily? Here is a video to help:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/Rn3M36H_6Cw?si=hxCf3zMw2y4kIi7N"
        width="800"
        height="400"
    />
</div>

<br />

You can find more tutorials in the [Documentation](https://docs.openbb.co/excel/getting-started/installation).

For more information, contact us at sales@openbb.finance or sign up for [our waitlist](https://my.openbb.co/app/pro/early-access).

