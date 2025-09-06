---
slug: 2025-09-06-tracking-your-partner-health-stats-with-oura-and-ai
title: Tracking your partner's health stats with Oura and AI
date: 2025-09-06
image: /blog/2025-09-06-tracking-your-partner-health-stats-with-oura-and-ai
tags:
  - health
  - ai
  - relationships
  - ios
  - api
  - humor
description: The rise of health tracking devices has given us unprecedented insight into our daily wellness metrics. But what if you could use that data not just for personal optimization, but for relationship optimization?
---

The rise of health tracking devices has given us unprecedented insight into our daily wellness metrics. But what if you could use that data not just for personal optimization, but for relationship optimization?

<!-- truncate -->

I was scrolling through X the other day while waiting for Claude Code to finish running something else, and I saw a post about someone using the Oura API.

My wife absolutely loves her Oura ring and all the metrics it provides her. The same way it gives her these insights, I realized I could have access to them too.

But what if on top of the metrics I had AI giving me tactical advice on how to navigate married life? Picture this:

- She's slept poorly, so she'll be grumpy - tactical retreat recommended
- She's well-rested and in a good mood - perfect time to ask for that roast dinner

So on Sunday morning, I decided to quickly build something fun.

## iOS widget

I built a Scriptable iOS widget that displays my wife's health metrics in an RPG-style interface with AI-generated British humor.

<p align="center">
    <img width="800" src="/blog/2025-09-06-tracking-your-partner-health-stats-with-oura-and-ai.png" />
</p>

**Key features:**

- RPG-style HP hearts showing her readiness level (❤️❤️❤️🖤🖤)
- Activity and Sleep score displayed on the bottom left and right corners, respectively
- AI-generated British humor management tips. Context includes:
  - Readiness score, activity score (and steps), sleep score (and hours slept)
  - The health data from yesterday to be used as a reference from shifts
  - Current datetime as recommendation will differ from the time of the day
  - Guidelines on the type of sentence to write
  - Examples of sentences - for few shot prompting

## Step-by-step technical implementation

### Setting up the foundation

**Challenge**: Creating a widget that could access external APIs and display dynamic content on iOS.

**Solution**: Used Scriptable app as the platform, which allows JavaScript execution with native iOS widget capabilities. → easy for me to access.

### Oura API integration

I connected to Oura Cloud API v2 endpoints and fetched multiple data streams: _daily\_readiness_, _daily\_sleep_, _sleep_ sessions, and _daily\_activity_. Built robust error handling for API failures and handled data from multiple days for comparison metrics.

```javascript
const headers = { "Authorization": `Bearer ${OURA_TOKEN}` }
const readinessUrl = `https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${yesterday}&end_date=${today}`
```

This was all done with Claude Code in a few minutes.

Before I even touched on Scriptable, I made sure that with Meg's Oura PAT (personal access token) I could access the data.

I did so by asking Claude Code to check if it could retrieve that data, and so it one-shot a few scripts to test the API and it worked perfectly.

Previously this used to take a bit of time because you had to read the documentation, etc - but now CC can just iterate with you quickly.

### AI-powered contextual advice

This isn't just displaying numbers - it creates a funny sentence on what to do! I integrated OpenAI's model to get contextual advice based on my wife's raw biometric data.

Rather than just showing generic health scores, the AI actually thinks about the full picture. A 60% readiness score at 7 AM when she's been sleeping poorly hits way different than the same score at 9 PM after she got a good night's rest. Context matters.

**My prompt:**

This is arguably the part that took me the longest - maybe 20 minutes or so.

```javascript
const prompt = `You are a cheeky British AI assistant helping a husband manage his wife Meg. Generate a funny, dramatic 1-2 sentence management advisory based on her biometric data:

Today metrics:
- Energy Level: ${ouraData.readiness}/100
- Sleep Quality: ${ouraData.sleep}/100  
- Activity Performance: ${ouraData.activity}/100
- Sleep Duration: ${ouraData.sleepDuration.toFixed(1)} hours
- Steps Taken: ${ouraData.steps}
- Current Time: ${timeOfDay} (${hour}:${now.getMinutes().toString().padStart(2, '0')})

Yesterday metrics:
- Activity: ${ouraData.yesterdayActivity}/100
- Steps: ${ouraData.yesterdaySteps}
- Sleep Quality: ${ouraData.yesterdaySleep || 0}/100 vs today's ${ouraData.sleep}/100
- Sleep Duration: ${(ouraData.yesterdaySleepDuration || 0).toFixed(1)}h vs today's ${ouraData.sleepDuration.toFixed(1)}h

MANAGEMENT GUIDELINES:
- High metrics = confident wife, low maintenance mode
- Low metrics = deploy emergency protocols (tea, snacks, Netflix)
- Use British expressions: jammy, brilliant, proper, chuffed, knackered, blimey, crikey, ace, smashing
- Reference UK treats: tea, hobnobs, digestives, biscuits, Yorkshire tea, crumpets, chippy
- Time-based recommendations: morning=brew up, afternoon=snack deployment, evening=telly time
- Include tactical advice for optimal wife management
- Keep it cheeky, affectionate, and dramatically helpful
- No emojis in response

Examples:
- "Wife operating at peak performance - minimal intervention required, perhaps celebratory hobnobs"
- "Danger zone detected: Deploy emergency tea protocol and activate Netflix immediately"
- "Meg's running on fumes - tactical retreat advised, arm yourself with digestives"
- "Queen is properly chuffed today - excellent time for difficult conversations"
- "Low battery mode activated - approach with Yorkshire tea and zero expectations"

Output a single sentence (with 1 to 2 phrases). Do not add any "-" or quotes.
You are providing this recommendation to the husband.`
```

### RPG-Style UI Design

I wanted to make this actually fun to look at, so here's the styling that I went for:

- **Top:** Wife's name + HP hearts (instant status check)
- **Middle:** AI tactical advice (the good stuff)
- **Bottom:** Raw stats for context (Activity: 85%, Sleep: 92%)

I went with soft pink to blue gradients because my wife likes those colors, and then I can send her a screenshot of her mood.

Here's how it looks in practice:

<p align="center">
    <img width="400" src="/blog/2025-09-06-tracking-your-partner-health-stats-with-oura-and-ai_1.png" />
</p>

And you can see that I acted immediately on the recommendation by bringing a coffee and hobnobs 😄

## Implement it yourself

I'm sharing the complete code so you can recreate this for yourself. The full implementation including all the API integration, caching logic, AI prompting, and UI design.

You'll just need:

1. An Oura API token (from your partner's account, with permission!)
2. An OpenAI API key
3. The Scriptable app on iOS

Feel free to customize the AI personality, adjust the health metrics display, or modify the caching intervals to suit your needs.

## Other thoughts

Imagine the alpha potential in tracking health stats of executives at public companies:

- CEO sleep patterns before earnings calls
- Recovery metrics during crisis periods
- Team health dynamics during product launches

If you knew that a company's leadership team was consistently sleep-deprived, highly stressed, and showing declining health metrics leading up to a major product launch, wouldn't that inform your investment decisions?

We might be heading toward a world where VCs require portfolio company founders to wear Oura rings. Imagine the due diligence: "_Your burn rate looks good, your team is solid, but your founder's recovery score has been below 60% for three months straight. That's a red flag._"

Another thought is that Oura is potentially sitting on a gold mine? The patterns in sleep, stress, and recovery among successful entrepreneurs, executives, and decision-makers could be worth more than the hardware business itself.

Imagine how much HFs would pay to get access to these health stats from high-level execs at companies under their mandate.
