---
slug: the-hidden-incentive-war-behind-financial-terminals
title: The hidden incentive war behind financial terminals
date: 2025-10-08
image: /blog/2025-10-08-the-hidden-incentive-war-behind-financial-terminals
tags:
- finance
- financial-terminals
- data
- incentives
- business-model
- ux
- bloomberg
- interfaces
description: How the misalignment between data providers and interface builders creates friction for users - the hidden conflict between selling data and serving users in financial software.
hideSidebar: true
---

![The hidden incentive war behind financial terminals](/blog/2025-10-08-the-hidden-incentive-war-behind-financial-terminals.png)

How the misalignment between data providers and interface builders creates friction for users - the hidden conflict between selling data and serving users in financial software.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I've spent years building and learning about financial software, and I've come to understand how big of a misalignment there is between data providers and interface builders. In simpler terms, companies that sell financial data also build the software (workspaces, terminals, interfaces) that professionals use, but their goals for the data often clash with what users need from the interface.

This misalignment operates quietly behind the scenes, yet it affects everything from product features to user workflows. In this first part of a two-part series, I want to unpack this conflict from my perspective, to shed light on why these tools often feel clunky despite sky-high prices.

## Why the all-in-one model made sense (until it didn't)

To understand why this gap runs so deep, it helps to look at how the current model came to be.

A few decades ago, the "all-in-one terminal" was a brilliant solution to a real problem. Financial data was scarce, fragmented, and technically hard to distribute. Building a single platform that bundled real-time prices, analytics, chat, research, and trading in one environment was revolutionary. It created a flywheel: the more professionals used it, the more indispensable it became. Every new user made the network more valuable; every new data feed reinforced the platform's position.

That success baked in an assumption: the same company should own both the data and the interface. At the time, that made perfect sense. Integration guaranteed speed, consistency, and trust. Clients didn't want to juggle APIs; they wanted one screen where everything just worked. For decades, that was the winning formula, and the incentives were aligned, the vendor got paid for data, and the user got reliability.

But the world changed. Data exploded. APIs became cheap and ubiquitous. Firms started generating their own proprietary datasets, and new categories of alternative data - web traffic, satellite imagery, sentiment, transactions - appeared faster than any one vendor could absorb. The interface was no longer the bottleneck; the business model was.

The incumbents stayed optimized for the old equilibrium: control all the data, protect the margins, keep the user inside.

That's the problem. What was once an elegant way to simplify complexity has become a structural drag on innovation. The all-in-one design isn't broken because it's unified; it's broken because it's closed. Every decision about openness or interoperability now runs through the same filter: "Will this threaten our data revenue?"

At a high level, the data vendors are primarily optimized to protect and grow their data profit streams, while the ideal interface should be optimized to reduce user friction and empower workflow flexibility. These two priorities collide constantly. The result is interfaces that are frequently restricted or designed in ways that favor the vendor's bottom line over the user's experience.

## How data vendors guard the golden goose

### Act 1: What users see

Financial data is extremely lucrative. Major market data providers enjoy operating profit margins that tech-only product companies can only dream of. Selling data is a high-margin business because once it's collected and cleaned, reselling it to additional customers costs very little. Also consider how many employees at these firms are based offshore or in low-cost centers, further boosting margins.

This sets up a clear incentive: data vendors will do almost anything to protect that high-margin data business. And "almost anything" often includes holding back their own interface capabilities to avoid giving away too much value without additional payment.

One common tactic is imposing caps and friction on data usage in their flagship software. A financial desktop app may limit how much data you can export each month - hit the cap and you're stuck waiting until next month unless you pay for a more expensive package.

I first knew about these limits because it was one of the biggest complaints I heard in our early user interviews. Later, I met someone who used to work at one of these big incumbents. Their job was monitoring each client's data usage, cutting them off when they exceeded certain limits, and then calling them to understand what they were doing with "too much" data. They eventually quit because they felt it was morally wrong to hamstring clients like that. But this story shows the extent of guarding the golden goose.

These caps and throttles are not accidental; they're deliberate choices to funnel users into higher-priced data plans or premium products. If you exceed your data-export limit for the month, no one in your firm can download any more data until the next month's reset. You can imagine how infuriating it is to be cut off mid-workflow. But from the vendor's perspective, it's protecting the golden goose of data revenue.

Another way vendors guard their data P&L is by creating friction to bring external data in. In theory, you'd want your analytics workspace to ingest any data you have - proprietary models, alternative datasets - and let you see everything in one place.

But there's basically no such thing as "bring your own data" to the interface of a traditional data vendor. They are a data business. The interface is just a distribution mechanism, and the vendor is only incentivized to make that interface great as long as it results in more of their data being sold. That doesn't include letting clients easily plug in data from outside sources. This keeps clients dependent on the vendor's own data offerings and prevents any third-party data or tools from diluting the value of the vendor's ecosystem.

Case in point: I recently talked with one of the big incumbents about getting access to their MCP Server. The discussion with their sales team quickly jumped into use cases. I explained that I just wanted to enable our mutual clients to access the vendor's data via our workspace (i.e. using our interface to consume data they're already entitled to). Their response was that they needed to learn more about the use case because "We don't want to take a hit on the market share of our desktop interface". In other words, they were worried that if clients can get the data through any interface other than the vendor's own, it would cannibalize their desktop business.

This is the incentive conflict in action, the vendor protecting its data (and the interface lock-in around that data) at the direct expense of user flexibility.

It gets worst, most of these large data vendors don't even make all of their own datasets available on their flagship desktop applications. They'll happily sell you the interface as a gateway to their data, but then you discover you can't even get all their feeds through that gateway. If you need one of those "off-platform" datasets, you might have to buy it separately and access it through a completely different channel or API.

All of these are designed to protect data revenue.

### Act 2: Why it happens (inside the company)

The restrictions users feel externally are battles the interface team lost internally.

Inside large financial data firms, there's frequently a tug-of-war between the data business and the interface product team. Imagine you work at one of these incumbents and you suggest an improvement to the interface for a specific workflow. The first question from management will be: How will this result in more data sales?

It gets trickier when you're up against a PM on the data team who's suggesting adding a new data feed that could be packaged and sold. The data teams are the revenue engines of the company, so they get to call the shots. The desktop/interface team has the less glamorous task of maintaining and incrementally improving a mature software product that, in many cases, hasn't fundamentally changed in years.

Here's a scenario: the interface team proposes a new feature, a way for users to seamlessly import their own CSV data into the platform to chart or analyze alongside the vendor's data. It's technically feasible and would make users very happy. But implementing it might mean users don't need to buy the vendor's extended historical data package (because they could import an alternative source they already have). The proposal gets watered down or vetoed by the data side, which argues it "cannibalizes" the product offerings.

From the outside, clients just see a slow, clunky interface that never seems to embrace obvious conveniences like modern import/export tools or collaboration features. From the inside, it's a story of the higher-margin business overriding the user-experience improvements. The interface team might be banging the drum for usability, but the data team is banging the drum for revenue.

Another angle to this internal friction is how products are sold. A client might really only want to buy a raw data feed (skipping the fancy desktop software), because maybe they have their own analytics platform. But the desktop sales reps have quotas tied to selling the desktop product. If a big client opts to pay only for data and not for the interface, the desktop sales team misses out on their numbers (and likely their commissions). This leads to absurd situations where the company has an internal debate about what to offer the client, even if the client's preference is clear, simply because selling data alone could "undermine" the desktop business's targets. Different teams have conflicting goals.

It's not that the people running these companies are clueless about UX or blind to user needs; it's that they are conflicted. When push comes to shove, protecting the lucrative data revenue will win over improving the interface every time. These firms have essentially set up an internal hierarchy where data is king and UX is a second-class citizen.

### Act 3: The economic reality (why this hierarchy exists)

These internal battles aren't random politics, they reflect a deeper economic reality.

This economic imbalance between data and interface products is key to understanding many design decisions (or lack thereof) in financial software. Simply put, data scales, software doesn't (as much).

**Data products** (feed subscriptions, specialty datasets) scale incredibly well. Once the data is collected, cleaned, and stored, selling it to one more customer costs almost nothing. Each additional sale is nearly pure profit, so these businesses boast exceptionally high margins.

**Interface products** (analytics workstations, charting applications, desktop terminals) behave like typical software. You need engineers to build new features, you need a support team to help users, there's ongoing maintenance and infrastructure - and it's hard to charge $30k/y per seat for UI. The margins here are much thinner.

Many incumbents recognize this and actually bundle the software as long as you're really paying for the data underneath. Buy the data feeds, and consume it via desktop platform. This bundling obscures a reality: if you isolated the interface itself, users probably wouldn't be willing to pay very much for it. The willingness-to-pay resides in the data.

The result is that every roadmap decision for the interface is filtered through a revenue lens. Does adding a certain feature help sell more high-margin data? If yes, do it. If not (i.e., it "just" improves user experience but doesn't clearly drive new data subscriptions), it'll get de-prioritized or scrapped. This is why you see seemingly obvious usability improvements left untouched for years.

For instance, adding a slick code editor might be low-hanging fruit technically - lots of users would love to script and automate tasks. But if that encourages power users to pull data out of the platform (potentially bypassing some paid service or exposing data externally), it won't get much love internally. Conversely, adding yet another dataset (say an ESG scores package, or some new analytics feed) gets a big marketing push because it's a new SKU to sell.

The net effect of all this is a status quo where the interfaces feel archaic and user-unfriendly across the board. Not coincidentally, these vendors have barely budged on pricing or profitability for decades. In a truly competitive, user-centric market, one might expect a slick, modern UX at a lower price by now - but the incentive structure has kept competition at bay and kept vendors squarely focused on milking data profits via bundled interfaces.

Now the pattern is clear. What looks like user-hostile design (Act 1) is actually the outcome of internal power dynamics (Act 2) driven by margin economics (Act 3).

**This isn't incompetence - it's rational profit maximization under a specific business model.**

## Why this persists

A natural question is: Why haven't upstart competitors disrupted this model with a more user-friendly alternative?

One reason competition has been so stagnant is that the incumbents have a habit of doubling down on their data dominance through acquisitions. Look at the acquisition history of any major financial data vendor, and a pattern emerges: they almost always buy other data companies or content sources, not interface innovators. If a smaller company comes along with a valuable new dataset, data feed, or unique analytics content, the big players snap it up and fold that data into their empire (often keeping it exclusive to their platform). They rarely, if ever, acquire companies that innovate on the UI/UX layer.

This consolidation strategy means the big vendors keep enriching their data catalog (and strengthening their data monopoly) while the actual software interface remains largely the same. This prevents serious competition on the data front, which in turn protects the interface from outside disruption (because any would-be challenger would need comparable data to be useful).

A startup might create a beautiful, modern analytics interface, but without the breadth of data that the incumbents offer, it's hard to convince users to switch. And if a startup focuses on building a unique dataset, one of the big vendors will likely either imitate it quickly or offer to acquire the upstart. The result is a kind of data monopoly flywheel. The big players keep getting bigger by absorbing new data sources, which raises the barrier to entry for anyone else.

## Incentives shape everything (and change is coming)

The conflict between data monetization and interface usability is the quiet force that has shaped financial software for decades. Data vendors have been optimized to protect their margins; interfaces should be optimized to reduce user friction - but when one company controls both, guess which priority wins out?

We've been living in a world where the firms selling data also control the interface through which analysts access it, and they've designed that interface (consciously or not) as a sort of toll booth. It's not that these platforms provide no value - on the contrary, they deliver enormous value, but it's value delivered on the vendor's terms. Users feel the friction daily: the inability to easily mix in a new data source, the archaic workflows that never improve, the upsell pop-ups or usage limits that remind us who's really in charge.

The key point here is that this misalignment isn't due to some cluelessness or malice on the part of the companies; it's an incentive problem baked into a legacy business model. Understanding that is crucial. The vendor isn't necessarily trying to make it terrible, they're just not that incentivized to make it much better.

And indeed, change is afoot. We're starting to see the early signs of a shift in this model. In the next part of this series, I'll dive into how a new approach - a pure-interface model decoupled from data sales - could realign incentives in favor of the user.

In other words, what if the company that builds your interface has no stake in selling you data?

Could that lead to a truly user-centric financial workspace?

I believe it can, and I'm excited to explore that in Part II.