---
slug: building-a-pokemon-card-price-estimator-with-claude-code
title: Building a Pokemon Card Price Estimator with Claude Code
date: 2026-01-06
image: /blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code.webp
tags:
- pokemon
- claude-code
- ai
- automation
description: The Pokemon TCG market is inefficient. I built a tool to exploit it.
hideSidebar: true
---

The Pokemon TCG market is inefficient. I built a tool to exploit it.

<!-- truncate -->

A few weeks ago, I saw this post on X.

That post reminded me of my childhood, where I had a few sets of Pokemon cards. However, silly me, I sold all of those sets a few years ago when I was back home. I didn't even think that much about it to be honest.

Then I talked about it with my wife, and she shared a Pokemon pop-up happening in NYC.

When we were in Chelsea Market with friends visiting from out of town, we stopped by. I looked for a Kabuto card - specifically the Gen 1 version - but couldn't find it. So I grabbed the Gen 2 version instead, just in case.

<p align="center">
    <img width="600" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_1.webp" alt="Kabuto card purchase" />
</p>

And then I bought a booster pack. You know, just in case.

I got home and opened it. Eleven cards stared back at me. But I had no idea what any of them were worth.

<p align="center">
    <img width="600" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_2.webp" alt="Booster pack cards" />
</p>

My first instinct was to take a photo and throw it at ChatGPT: "How much are these worth?"

The results were... bad. The model would either not respond or confuse cards, miss some or even hallucinate prices.

I was giving it way too much freedom. Without constraints, the model didn't know where to pull reliable information from. It would make up prices or reference outdated data or just plain ignore the card.

But anyway, after a bit of chat it was enough for me to understand that what I got sucked. So I went into eBay to see if there were good cards for sale - you know, as a "store of value".

And of course, pictures on eBay are diabolical.

And maybe, just maybe, there were sellers that were as clueless as I was selling Pokemon cards back a few years.

But I just didn't know how to value the cards from a picture. So I couldn't know if a set listed for $20 was worth $10 or $100.

But I knew who could.

The combined information from the web and a specific skillset - **ENTER CLAUDE SKILLS**.

So I built a Claude Code skill that does exactly that.

The full source code is available on [GitHub](https://github.com/DidierRLopes/pokemon-cards-value-scraper).

## The workflow

### Step 0: Find a set that you might be interested in

<p align="center">
    <img width="800" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_3.webp" alt="eBay Pokemon card listing" />
</p>

### Step 1: Provide an Image

Drop a photo of Pokemon cards - a binder page, a spread on a table, whatever.

<p align="center">
    <img width="600" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_4.webp" alt="Test Pokemon cards input" />
</p>

### Step 2: Card Recognition

Claude's vision model analyzes the image and extracts card details into a structured table:

| # | Name | Set | Card # | Holo | Edition |
|---|------|-----|--------|------|---------|
| 1 | Alakazam | Base Set | 1/102 | Holo | Unlimited |
| 2 | Blastoise | Base Set | 2/102 | Holo | Unlimited |
| 3 | Charizard | Base Set | 4/102 | Holo | Unlimited |

<br />

The key here is providing clear guidelines about what to look for (set symbols, card numbers, holo patterns) and what to ignore (partially visible cards, reflections). Without these constraints, the model hallucinates. With them, it's remarkably accurate. And if in doubt, the model will ask to clarify.

<p align="center">
    <img width="800" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_5.webp" alt="Card recognition in Claude Code" />
</p>

### Step 3: Human-in-the-Loop Confirmation

Even if the model was confident on the cards, it can still misread card numbers or confuse similar-looking Pokemon. A quick sanity check saves headaches later.

So this just allows you to iterate quickly. E.g. if you see that it got the wrong Pokemon, or that the card is not a Holo you can quickly rectify it here.

Once this is confirmed we export this as a raw CSV file.

### Step 4: Visual Verification Grid

Here's where it gets interesting.

Claude Code downloads the official card image for each identified card from [pokemontcg.io](https://pokemontcg.io/). To do this, we need to map set names to their API codes - "Base Set" → base1, "Twilight Masquerade" → sv6.

I built a lookup table covering 100+ sets from 1999 to 2025.

Then we use PIL (Pillow) to reconstruct the original layout - same rows, same columns. For instance `--layout 3,3,3` flag means 3 cards per row, 3 rows total.

We added this script to this specific SKILLS folder.

<p align="center">
    <img width="800" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_6.webp" alt="Visual verification script in Claude Code" />
</p>

I store images from each of the cards individually. But most importantly I reconstruct the layout so it's easy to compare with my eyes. Here's the resulting output:

<p align="center">
    <img width="800" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_7.webp" alt="Reconstructed card layout for verification" />
</p>

As they match, I'm confident in the identification. If something's off, I go back and fix the table before wasting time on wrong price lookups.

Why bother with this step? Two reasons:

1. **Image quality varies wildly.** eBay photos are particularly bad - poor lighting, weird angles, reflections everywhere. The verification grid catches misidentifications before they become wrong prices.

2. **Holos are hard.** Distinguishing between a regular card, a holo, and a reverse holo from a photo is genuinely difficult. The rainbow sheen doesn't always photograph well. Human verification catches these edge cases.

<br />

### Step 5: Price Estimation

With double-verified card data, Claude Code fetches prices from [Pokellector.com](https://pokellector.com/), which aggregates six sources:

- TCGPlayer
- Troll & Toad
- eBay
- Stop2Shop
- Collectors Cache
- CoolStuffInc

<br />

We have another script file on our SKILLS folder that is responsible by this.

Here's the catch: Pokellector is renders dynamically with JavaScript, so requests and BeautifulSoup alone didn't work. So I had to use Selenium with headless Chrome to:

1. Search for a card
2. Navigate to the best match
3. Extract prices from all six sources
4. Capture reference URLs

<br />

The result: a comprehensive price table with links to verify each price.

<p align="center">
    <img width="800" src="/blog/2026-01-06-building-a-pokemon-card-price-estimator-with-claude-code_8.webp" alt="Price estimation results" />
</p>

## The Takeaway

Throwing an image at a model and asking "what's this worth?" gives you unreliable results. But breaking the problem into discrete steps, adding human verification at key points, and constraining the model's data sources transforms it into something genuinely useful.

Ultimately, it boils down to "do you have this skillset?".

And now you add skills easily to your agents.

## What's Next

A few ideas of what could be done:

- **eBay URL scraping:** Instead of manually saving photos, provide an eBay listing URL. The tool would scrape the images, run the identification workflow, and tell you if the listing is underpriced.

- **Interface:** Right now this runs as a Claude Code skill. A dedicated website with lower latency and a cleaner UX would make it more accessible.

- **Batch processing:** For larger collections, process multiple binder pages in sequence and aggregate the results.

- **Condition grading:** Card condition dramatically affects value. Integrating some form of condition assessment (even a rough one) would improve accuracy.
