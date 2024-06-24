---
slug: how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds
title: Twitter thread to LinkedIn carousel in python
date: 2022-10-23
image: /blog/2022-10-23-how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds.png
tags: ['Python', 'LinkedIn', 'Twitter', 'Carousel', 'Content Creation']
---

<p align="center">
    <img width="600" src="/blog/2022-10-23-how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds.png"/>
</p>

<br />

In this blog post, I share how I built a Python tool that converts a Twitter thread into a LinkedIn carousel in seconds. This tool is open source and contributions for improvements are welcome.

The open source code is available [here](https://github.com/DidierRLopes/thread-to-carousel/tree/master).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

As content creators, it would be good if the same content could be utilised across every platform easily. Sometimes you need some tweaks based on audience, but often the same content is used across all platforms.

I noticed recently that LinkedIn carousels have been picking a lot of traction, and given I have some nice Twitter threads ([example](https://twitter.com/didier_lopes/status/1570731358204600323?s=20&t=SAO9fD7FR7jeTE-6kem6Mg)) I thought that it would be great if I could convert them into a LinkedIn carousel.

So, I looked for free tools and didn’t find anything good enough. I ended up using [canvas](https://canvas.apps.chrome/) to re-create the thread — which you can find [here](https://www.linkedin.com/posts/didier-lopes_due-diligence-on-amt-using-openbb-terminal-activity-6977569279395176448-TFMn?utm_source=share&utm_medium=member_desktop). It worked well, but it was time consuming and for most cases, I don’t want to be messing around with the design side of things.

![image](/blog/2022-10-23-how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds_1.png)

As a true software engineer and pythonist, I obtained the Twitter API keys and built a tool that would convert a Twitter thread into a LinkedIn carousel in a matter of seconds.

And as usual, I open sourced it: https://github.com/DidierRLopes/thread-to-carousel.

This tool is far from perfect, and a lot can be improved on the design side of things to: Recognize emojis; Highlight mentions; Change the size of the box based on the text; Better text placement when images attached; Better URL link display.

The goal for me wasn’t to build a perfect tool, but something easy enough that did the job. And, as the project is open source, I expect to have users contributing to the script so that it can be improved over time.

Today I run it using:

```console
python convert2carousel.py https://twitter.com/didier_lopes/status/1581247044228100096
```

And the result can be found [here](https://www.linkedin.com/posts/didier-lopes_football-momentum-indicator-carousel-activity-6989972573782482944-nM9s?utm_source=share&utm_medium=member_desktop).

![image](/blog/2022-10-23-how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds_2.png)

Feel free to check the project here and I look forward to having contributors helping me improve it!

As always, any feedback welcome 🙏🏽
