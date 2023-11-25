---
slug: sweepstake-world-cup-2022-for-your-startup-team
title: Sweepstake World Cup 2022 for your startup team
date: 2022-11-26
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280552072-ba486af7-2579-4c00-a575-278cb74faeb6.png
tags: ['World Cup 2022', 'Startup Team', 'Sweepstake', 'Team Building', 'Slack Bot']
description: In this blogpost, we share how we organized a World Cup 2022 sweepstake for our startup team as a team building activity, and how we built a slack bot to facilitate discussions around the event.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280552072-ba486af7-2579-4c00-a575-278cb74faeb6.png"/>
</p>

<br />

In this blogpost, we share how we organized a World Cup 2022 sweepstake for our startup team as a team building activity, and how we built a slack bot to facilitate discussions around the event.

The open source code is available [here](https://github.com/DidierRLopes/worldcup2022-sweepstake-slackbot).

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

At [OpenBB](https://openbb.co/), the team puts in so much hard work for [our product](https://github.com/OpenBB-finance/OpenBBTerminal) that doing a team event is like a breath of fresh air. With the World Cup 2022 now taking place and more than half of the team being from Europe (where football is the main sport), we thought that it would be nice to run an OpenBB sweepstake.

We decided to offer a prize to the teams that end up on the podium. 1st place gets X, 2nd place gets Y and 3rd place gets Z - with $ X > $ Y > $Z.

The next step was to assign teams to each employee, so at the end of our all hands meeting we did just that. For that we used this free website: https://spinnerwheel.com/fifa-world-cup-sweepstake-generator.

This allowed us to spin the wheel of team members and then spin wheel of countries, and get a 1:1 match — it was quite funny to have everyone involved and see the reactions as the wheel was slowing down.

![image](https://github.com/Meg1211/my-website/assets/88618738/ab35cfc3-143f-43bf-b345-0999289a4442)

**Most companies stop here.**

...

The best part about the sweepstake for me, is that the team members that don’t usually interact with each other on a day to day basis have the opportunity to talk amongst themselves for this.

So, to encourage these team interactions, the first step was to create a slack channel #worldcup-2022 that we could use to discuss each game.

**But that isn’t enough**, because sometimes you require a trigger to start a discussion about the results and the next fixtures.

I looked for a slack bot that achieved this, but **I didn’t find one**.

So I built one using Python which you can find [here](https://github.com/DidierRLopes/worldcup2022-sweepstake-slackbot).

This is the notification that the #worldcup-2022 receives everyday after all the matches have been played.

![image](https://github.com/Meg1211/my-website/assets/88618738/7e91f7e9-b085-455f-9768-4da69d409c52)

The outcome has been great so far! Our team engagement is even higher than usual and we see team members that don’t work directly with each other having the opportunity to get to know others better.

If you want to do the same for your team, follow the instructions highlighted [here](https://github.com/DidierRLopes/worldcup2022-sweepstake-slackbot).

Any feedback is appreciated!
