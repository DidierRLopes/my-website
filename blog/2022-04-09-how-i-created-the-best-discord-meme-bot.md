---
slug: how-i-created-the-best-discord-meme-bot
title: How I created the best discord meme bot
date: 2022-04-09
image: /blog/2022-04-09-how-i-created-the-best-discord-meme-bot.png
tags: ['Discord', 'Meme Bot', 'Open Source', 'Community Building']
description: In this blog post, I share my journey of creating a Discord meme bot, the role it played in building a vibrant community around our open source project, and how you can add your own memes to the bot.
---

<p align="center">
    <img width="600" src="/blog/2022-04-09-how-i-created-the-best-discord-meme-bot.png"/>
</p>

<br />

In this blog post, I share my journey of creating a Discord meme bot, the role it played in building a vibrant community around our open source project, and how you can add your own memes to the bot.

The open source code is available [here](https://github.com/DidierRLopes/discord-memes).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Background

Over the past few weeks, life has been very chaotic on my end, mostly due to the announcement of [OpenBB](http://www.openbb.co/) last week which you can read the full story on [here](https://openbb.co/blog/gme-didnt-take-me-to-the-moon-but-gamestonk-terminal-did).

When I started [OpenBB Terminal](https://github.com/OpenBB-finance/OpenBBTerminal), all my focus was on building, building and building. Once I made the project open source and contributors started to appear, I slowly saw my time shifting **from building a product to building a community**. This community ultimately would end up building the product, but from my end, I need to be able to pass on my passion to the project and vision.

Developing features for the terminal only took me a couple of minutes, whereas the connection with the community is a long-time game. You don’t become close with someone you’ve never met within couple of minutes. Instead you need to put effort into the relationship and **consistency is key**.

The community on our Discord was growing day by day. And so was my relationship with the people in it. The truth is, we were not only sharing insights about the platform, but were laughing and bonding together whilst building it. **And memes/gifs are a big part of these interactions.**

For people who know me, they know how much I love memes and how I can always create memes for every situation (honestly, all the time I spent on Instagram is finally paying off).

Although I believe that we have one of the most exciting open source projects going on, I also strongly believe that our fun culture (i.e. memes) is what makes contributors want to work in this particualr environment. **Building the future of investment research can be fun and this is what we’re proving.**

At this stage, I think I’ve spent more time interacting with people than I have working on the platform. The funny thing is that **the platform is 10x better than what it would be if I was working on my own**. Creating a strong community pays off and this is why since the start I was having calls with literally everyone to help them install our platform. Today, most of the team at OpenBB was met on Discord whilst working on the platform. **I didn’t need any interviews, they weren’t candidates anymore but people that I enjoyed to work with** and wanted on the team.

Sorry for the background story, but it was important to me to explain why I worked on this. **The interesting part of the article starts now.**

## Development

**The idea of Discord Memes is to avoid to open [imgflip](https://imgflip.com/) everytime I wanted to add text to a meme.** Personally, I love the gifs available through Discord but I think a meme with text is much more powerful (and funny).

When I started coding this here and there, I wanted the code to be super straightforward so it was very simple and fast to add a new meme to the pool. And so I did.

The process to add new memes is incredibly easy. Go to the [project](https://github.com/DidierRLopes/discord-memes) and star it for starters (also [OpenBB Terminal](https://github.com/OpenBB-finance/OpenBBTerminal) since you’re at it). Then,

1. Add the meme you want to the `memes/` folder, e.g. `spongebob.jpg`

2. Then create a function with the same name of the image (e.g. `spongebob`) with the following format

<br />

```python
@create_and_send_meme()
def spongebob(inter, text: str = None, _=None):
    if text:
        _.text(
            0.5,
            0.2,
            "\n".join(wrap(''.join(choice((str.upper, str.lower))(c) for c in text), 40)),
            fontsize=20,
            color="white",
            alpha=0.9,
            horizontalalignment="center",
            path_effects=[pe.withStroke(linewidth=4, foreground="black")]
        )
    return _
```

3. That’s it.

<br />

**Note:** I created a python decorator `@create_and_send_meme()` that basically abstracts all the memes created and picks up the image on memes with the same name of the function. This way, the person adding a meme just needs to focus on the text on the image, i.e. it's location, size, where it wraps, colours and alignment.

I used a playground.ipynb notebook, which is also on the repo, to increase the speed of the text placement on each of the memes I added.

This is how it looks,

![image](/blog/2022-04-09-how-i-created-the-best-discord-meme-bot_1.png)

OR

![image](/blog/2022-04-09-how-i-created-the-best-discord-meme-bot_2.png)

As you can see, our Discord server just stepped up. [Join us](https://openbb.co/discord) to try out the meme bot, build the future of investment research or just to say hi.

We’ll be waiting for you. 🦋
