---
slug: 2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel
title: What if... you could access an OpenBB widget on Excel?
date: 2025-08-05
image: /blog/2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel
tags:
  - openbb
  - excel
  - integration
  - data-analytics
  - investment-research
  - fintech
description: This post introduces a new integration that allows users to embed dynamic OpenBB widgets directly into Excel.
hideSidebar: true
---

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel.png" />
</p>

This post introduces a new integration that allows users to embed dynamic OpenBB widgets directly into Excel.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Some time ago I was asked if I thought Excel was going to survive.

My answer was: “**I wouldn’t bet against it**”.

Better than rowing against the tide is positioning yourself to be carried by it.

We want OpenBB to sit at the core of an organization.

Be what happens after the data team has been in charge.

And that means we need to meet users where they are i.e., **allow them to access their analytics & insights from the OpenBB workspace in Excel**.

After adding an App to OpenBB, you can create a dashboard to fit your exact needs.

A specific widget may look like this:

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel_1.png" />
</p>

Where in red you have the parameters that can be modified on the frontend, and in green you have the data associated with it.

Now, we've had an Excel Add-in for some time that allows users to retrieve data from OpenBB - what it did was basically route the request to our Excel Add-in.

So you could do something like this:

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel_2.png" />
</p>

This is great!

**BUT**.

**What if we could do more?**

What if we could bring the concept of a "Widget" to Excel?

## OpenBB Widget on Excel

I started toying with this idea on an evening, and later that night I shared a POC with the team.

Raw & unfiltered video below:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/XNAVGyiYT8s?si=RPEe3VIkMbYYtd8g"
        width="800"
        height="400"
    />
</div>

<br />

### Implicit vs Explicit

Here’s what the POC entailed in a nutshell:

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel_3.png" />
</p>

I created a distinction between "**implicit**" and "**explicit**".

"**Implicit**" is what I shared at the start of this post, where the parameters are in the formula. This is great, but for someone who just copy-pastes the formula, they don’t have visibility into which parameters are actually returning the data they're looking at.

This is where the "**explicit**" concept comes in, mimicking an OpenBB widget.

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel_4.png" />
</p>

So, when you copy-paste into Excel, this is what you get out-of-the-box.

<p align="center">
    <img width="600" src="/blog/
    2025-08-05-what-if-you-could-access-an-openbb-widget-on-excel_5.png" />
</p>

Notice the analogy with an OpenBB widget, users can modify parameters and have the latest data fetched automatically. All achieved programmatically.

**But we didn’t stop here**.

The next question we asked ourselves was - if a user wants to visualize a particular OpenBB widget on Excel, why wouldn’t they be interested in visualizing an OpenBB App?

So, we made it possible for a user to export a dashboard to Excel in 3 formats:

- **Static** - where the data is what is available, your typical exporting
- **Dynamic** - where it relies on the Excel Add-in for the formula
  - **Implicit** - with parameters within the formula
  - **Explicit** - with parameters in the cells above

I’m genuinely excited about this one.

If this sounds like something your firm would be interested in, feel free to reach out.

With the platform’s integration with data sources like FRED, BLS, IMF, and more, there’s a lot of data that could be available in Excel out of the box. More on this coming soon.

A few weeks later I added a Polymarket app to OpenBB and then showed that I had immediate access to it on Excel, check it out below:

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/Wfjpwgglw40?si=eo-Ll4nNrxIoGH7L"
        width="800"
        height="400"
    />
</div>

<br />

Any feedback let me know!
