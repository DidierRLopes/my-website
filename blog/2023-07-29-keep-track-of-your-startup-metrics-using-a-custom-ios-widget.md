---
slug: keep-track-of-your-startup-metrics-using-a-custom-ios-widget
title: Keep track of your startup metrics using a custom iOS widget
date: 2023-07-29
image: /blog/2023-07-29-keep-track-of-your-startup-metrics-using-a-custom-ios-widget.png
tags:
- ios
- startup
- metrics
- openbb
- scriptable
- open-source
description: Keep track of your startup metrics using a custom iOS widget. This blog post will guide you on how to build a custom iOS widget that displays your startup metrics at all times. The entire code is open source and requires minimal coding skills.
---




<p align="center">
    <img width="600" src="/blog/2023-07-29-keep-track-of-your-startup-metrics-using-a-custom-ios-widget.png"/>
</p>

<br />

Keep track of your startup metrics using a custom iOS widget. This blog post will guide you on how to build a custom iOS widget that displays your startup metrics at all times. The entire code is open source and requires minimal coding skills.

The open source code is available [here](https://github.com/DidierRLopes/opensource-scriptable-widget/tree/main).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

If you have a high level role in your organization, you are likely obsessed over a few metrics that act as the north star for your company. Whether that is MRR, number of customers, GitHub stars, AUM, .. depends on the type and stage of company, and what you are optimizing for.

At [OpenBB](https://openbb.co) we are currently optimizing for [OpenBB Hub](https://my.openbb.co) users, since this is the place where you have access to our entire suite of products. From [OpenBB Terminal](https://my.openbb.co/app/terminal), [OpenBB SDK](https://my.openbb.co/app/sdk), [OpenBB Bot](https://my.openbb.co/app/bot) and soon — the highly awaited [OpenBB Terminal Pro](https://my.openbb.co/app/pro).

So everyday I spent some time checking our startup [/open page](https://openbb.co/open). However, whenever I had to check these on mobile I had to open up the browser, type the link and then look for the metric of interest.

Hence, to save time, I built a custom iOS widget that displays these metrics of interest at all times. All I need to do is unlock my phone and *BAM*, they are right there.

So, today, I’ll teach you how you can do the same with minimal coding skills required. I open source the entire code, so that you can get up to speed as fast as possible here: https://github.com/DidierRLopes/opensource-scriptable-widget

## Track your open source metrics

This section will provide a plug-and-play example for your open source repository.

![image](/blog/2023-07-29-keep-track-of-your-startup-metrics-using-a-custom-ios-widget_1.png)

These are the steps necessary to have it working on your iOS device:

1/ Download Scriptable app to your iOS device

2/ Open Scriptable app and click on the “+” on the top right corner

3/ Rename that script to whatever repo you would like to track

4/ Copy the code from the file opensource.js on this repository

5/ Paste it into that new script on your phone

6/ Change the 4 initial parameters from the file:

```python
    const WIDGET_TITLE = "openbb.co/open"
    const GITHUB_REPO = "OpenBB-finance/OpenBBTerminal"
    const PIP_PACKAGE_NAME = "openbb"
    const CACHED_DATA_HOURS = 1
```

- If you only want to track GitHub stats, do `PIP_PACKAGE_NAME=""`.
- If you only want to track PiPy stats, do `GITHUB_REPO=""`.
- The `CACHED_DATA_HOURS` corresponds to the amount of hours where the data is not updated.

7/ Run script to make sure that it works using the “play button” on the bottom right corner

8/ Leave the app

9/ Leave your finger pressed on the iOS homepage

10/ Click on the “+” on the left top corner

11/ In the “Search Widgets” tab look for “Scriptable”

12/ You will see “Run Script” and there are 3 pages. Select the type of widget size that you are interested in

13/ Select “Add Widget”

14/ The widget will appear with the sentence “Long press and edit widget to select the script to run”

15/ Do that and then you will have 3 options:

- Script — Select script name that you renamed to earlier
- When Interacting — Select “Open URL” — A new field will appear with “URL” then provide the link you want to open you cick on the widget (e.g. http://openbb.co)
- Parameter — If there’s any parameter needed to the script

16/ Click outside the window, and you should be all set!

Feel free to contribute to the repository with other examples / templates!
