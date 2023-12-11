---
slug: momentum-football-bets
title: Momentum Football Bets
date: 2021-04-07
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495392-fbf8e3ee-21a6-47c0-95f7-97b535a07dd0.png
tags: ['Football', 'Betting', 'Momentum', 'Web Scraping', 'Beautiful Soup', 'Python']
description: In this blogpost, I share how I developed an automated task to estimate the momentum of football teams for betting purposes using Beautiful Soup and Python.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495392-fbf8e3ee-21a6-47c0-95f7-97b535a07dd0.png"/>
</p>

<br />

In this blogpost, I share how I developed an automated task to estimate the momentum of football teams for betting purposes using Beautiful Soup and Python.

The open source code is available [here](https://github.com/DidierRLopes/momentum-football-bets).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

This Easter, I spoke with my girlfriend’s father and there were several football matches happening that weekend, he started talking about betting on some of those matches.

He carried on to explain me his betting routine, which consisted of:

1. Checking the next fixtures for a specific competition: https://www.skysports.com/premier-league-fixtures
2. Checking the last results of each of the team and “estimate” their momentum (e.g. https://www.skysports.com/football/wolverhampton-wanderers-vs-liverpool/stats/429116)

<br />

Then, iterate these 2 steps for all the fixtures happening, from Premier League, Championship, League One, and League Two.

Since I recently learned how to use Beautiful Soup to scrap data from web pages (see [GamestonkTerminal](https://dro-lopes.medium.com/gamestonk-terminal-the-next-best-thing-after-bloomberg-terminal-a263c001a61f)), I thought that I could create an automated task that would do all of these steps with a simple double click executable. After checking that I could extract such data from SkySports, I let him know that by the next day I would have something working.

After dinner, I started working on the project, and before I went to sleep I had the first prototype working, which you can see in [here](https://github.com/DidierRLopes/momentum-football-bets).

On top of “his” automated task, I created a “momentum score” which tries to estimate the momentum score based on what my girlfriend’s father told me that he does. He looks into the last games of the team and see if they have a positive momentum by looking to see if they come from a winning series.

So, I thought it would be good to attribute a weight to each of the last matches where the most recent match would have the biggest weight, and last one from the 6 provided from SkySports stats would have the lowest weight. Together with this weight, I thought we could use the sum of the weight to the score in case of a win, subtract in case of loss, and don’t do anything in case of a draw.

So, in simple terms, if score is positive the team is likely to have been winning their last matches, if score is negative the team is likely to have loss their last matches.

But then, I thought:

_“Ok, this is nice. But when you bet, you don’t bet on a single team, but on the result between the 2 teams that are playing each other.”_ I.e. if team A has an amazing momentum, and so has team B, the bet will — in theory — be risky.

Hence, the next step was to address this concern. This was done by checking the momentum score difference between the teams, the bigger the momentum score, the less risky — in theory — a bet would be. What we want to see is a team that has been doing amazing for the past 6 games, and one that has been performing consistently bad.

Lastly, I added a confidence filter so that the terminal would only output the games that shown at least a certain X confidence. And also, an argument that would select the number of days in the future that we could look for fixtures.

After having this implemented, the day after was about polishing the code, adding some colouring and emojis, creating a repository for it, a README, discussing the binning of the momentum score and bet confidence terms, creating a logo for it, and creating an executable + adding the logo which my girlfriend did.

![image](https://github.com/Meg1211/my-website/assets/88618738/4e16ec33-ae1a-4ade-88a0-c985fe8b8c12)

After this, we were quite excited to backtest the app. We filtered the next features with a big confidence bet score (to have less risk), and put 20 pounds on 3 different accumulators. [And it’s gone.](https://www.youtube.com/watch?v=-DT7bX-B1Mg)

Hope you had a good read. Feedback is always appreciated.
