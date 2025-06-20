---
slug: gamestonk-terminal-ux-features
title: UX/UI is better than features
date: 2022-01-06
image: /blog/2022-01-06-gamestonk-terminal-ux-features.png
tags:
- gamestonk-terminal
- ux/ui
- software-development
- teamwork
description: Gamestonk Terminal's UX/UI features and the teamwork behind their implementation.
---




<p align="center">
    <img width="600" src="/blog/2022-01-06-gamestonk-terminal-ux-features.png"/>
</p>

<br />

Gamestonk Terminal's UX/UI features and the teamwork behind their implementation.

The open source code is available [here](https://github.com/DidierRLopes/GamestonkTerminal).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

**Features attract users, UX/UI conquers them ⚔️**

Throughout month of December, me and 3 of the most active maintainers of [Gamestonk Terminal](https://github.com/GamestonkTerminal/GamestonkTerminal) had a meeting where we discussed shifting our focus from adding features, to improving the terminal UX/UI to make it even more attractive. The main outcomes of these meeting were:

1. Relative and Absolute menu jumping, e.g. if i’m in crypto/ta and want to go to stocks/ta I can do:

   a. Absolute: `/stocks/load tsla/ta`

   b. Relative: `../../stocks/load tsla/ta`

3. Scripting feature. You can now interact with the terminal through a sequence of commands, e.g.: `stocks/disc/ugs -l 3/gtech/active`.

4. `reset` command everywhere to allow for faster development as it exits from the terminal and comes to the same menu running new terminal code and its API keys.

5. Auto-completion in commands with choices.

6. When misspelling a command name, if it’s similar enough that the terminal recognises the right command, it will replace it, to speed up interaction.

<br />

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_1.png)

6. Running a `.gst` job, like `python terminal.py scripts/test_stocks_disc.gst` which allows to run a sequence of commands of the terminal. In the future we can take advantage of this for integration tests. The user can build their own daily routines to speed up the investment process.

<br />

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_2.png)

Now, I know what you’re thinking. This is a massive improvement over the terminal usage up until now, and that’s a **LOT** of code changes. Which is very much true, to be specific, this engineering effort resulted in:

> **370 files changed with 44,875 additions and 18,463 deletions**

<br />

And you may be wondering how long did this take us to do. Nope, it wasn’t months but…

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_3.png)

**1 week. Yup, a single f*king week.** You can see that it was finalised with these PRs ([#1049](https://github.com/GamestonkTerminal/GamestonkTerminal/pull/1049), [#1041](https://github.com/GamestonkTerminal/GamestonkTerminal/pull/1041), [#1048](https://medium.com/@dro-lopes/gamestonk-terminal-ux-features-f9754b484919#1048)).

In that week we split work, did pair programming, we called each other to discuss better implementation practices, we changed the architecture 2/3 more times… On top of that, I was feeling overwhelmed with the stocks menu, I clearly underestimated how many features we have (how naive…), so the 3 other maintainers jumped on it and helped me out. In 3 or so years of software engineering, this was** teamwork like I’ve not felt before**.

That weekend I was so happy as we accomplished this task that I think I didn’t even work on the terminal that Sunday! Doesn’t happen often these days!

However, as a good friend of mine told me:

> _**“The entertainment industry hasn’t found yet something more appealing than developing code towards a product I believe in and with people I like”**_

<br />

I still think about this often, and this is what I tell my girlfriend, to explain why I’m coding and not playing Mario Kart 8 Deluxe with her. (the fact she always beats me at it also may be considered as a factor 🤣).

You may be thinking this is a one off, the reality is that **it isn’t**. Another example can be seen in [this blog post](https://dev.to/northern64bit/aspiring-16-year-old-quant-developer-contributing-to-open-source-application-16k4). This goes over the story of the development of our discord bot where it all started from a message from a **16yo contributor that wants to become a quant**. He wanted to not only improve his python skills with us but also bring the terminal features to a bigger audience. Working with us in an open-source project is helping him towards achieving his life-goal dream.

While I write this post another contributor, finishing his CPA, is working on [improving the code resulting from that UX effort by creating a base class](https://github.com/OpenBB-finance/OpenBBTerminal/pull/1141) so that new developers can add controllers much easily (he estimates a reduction of 11% of codebase size based on “napkin maths” as he puts it).

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_4.png)

While user experience is critical, so is user interface. And that is why our next engineering effort will be around it. We already have something in the works in [this PR](https://github.com/GamestonkTerminal/GamestonkTerminal/pull/1140), where we can draw lines and write text! Almost like TradingView (almost… 😬).

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_5.png)

So, keep on the lookout because 2022 is gonna be a big year for us!! 🦋 🚀

Ohh, before I say thanks for the read and all that, it’s also worth mentioning that there’s a PR in the queue for a new context called “**alternative data**”, which already has a **COVID menu** to factor that data into account on your investments.

![image](/blog/2022-01-06-gamestonk-terminal-ux-features_6.png)

_PS: The blue text is because we are transitioning towards [rich package](https://github.com/Textualize/rich) which gives a lot more freedom when it comes to improving our user interface._

<br />

Thanks for your read, and if you enjoy Gamestonk Terminal, please reach out to [our discord](https://discord.gg/ptYabd8w) to say thank you, or ideally: for **@terp340** to change date format to dd/MM/YYYY — **the only correct one**!

Happy 2022 with lots of love ❤️
