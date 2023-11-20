---
slug: how-to-convert-a-twitter-thread-into-a-linkedin-carousel-in-seconds
title: Twitter thread to LinkedIn carousel in python
authors: didier
date: 2022-10-23
image: https://github.com/Meg1211/my-website/assets/88618738/3f34f9d5-d1b2-426f-8b8d-e6d26a5367da
tags: []
---

description

<!-- truncate -->

# Twitter thread to LinkedIn carousel in python

As content creators, it would be good if the same content could be utilised across every platform easily. Sometimes you need some tweaks based on audience, but often the same content is used across all platforms.

I noticed recently that LinkedIn carousels have been picking a lot of traction, and given I have some nice Twitter threads (example) I thought that it would be great if I could convert them into a LinkedIn carousel.

So, I looked for free tools and didn’t find anything good enough. I ended up using canvas to re-create the thread — which you can find here. It worked well, but it was time consuming and for most cases, I don’t want to be messing around with the design side of things.

![image](https://github.com/Meg1211/my-website/assets/88618738/3f34f9d5-d1b2-426f-8b8d-e6d26a5367da)

As a true software engineer and pythonist, I obtained the Twitter API keys and built a tool that would convert a Twitter thread into a LinkedIn carousel in a matter of seconds.

And as usual, I open sourced it: https://github.com/DidierRLopes/thread-to-carousel.

This tool is far from perfect, and a lot can be improved on the design side of things to: Recognize emojis; Highlight mentions; Change the size of the box based on the text; Better text placement when images attached; Better URL link display.

The goal for me wasn’t to build a perfect tool, but something easy enough that did the job. And, as the project is open source, I expect to have users contributing to the script so that it can be improved over time.

Today I run it using:

python convert2carousel.py https://twitter.com/didier_lopes/status/1581247044228100096

And the result can be found here.

![image](https://github.com/Meg1211/my-website/assets/88618738/67efec99-d219-47c5-8d83-f19e97a44d76)

Feel free to check the project here and I look forward to having contributors helping me improve it!

As always, any feedback welcome 🙏🏽
