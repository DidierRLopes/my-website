---
slug: how-theta-data-serves-the-entire-us-options-market-from-four-racks
title: "How Theta Data serves the entire US Options market from four racks"
date: 2026-08-21
image: /blog/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks.webp
tags:
- options
- market-data
- infrastructure
- finance
- theta-data
description: "Bailey Danseglio started with one server in one rack. I visited his data center to see what the full pipeline looks like now."
hideSidebar: true
---

Bailey Danseglio started with one server in one rack. I visited his data center to see what the full pipeline looks like now.

<!-- truncate -->

This is going to be a different post than my usual ones - but I hope you find value in it. I definitely did.

Today I’m going to talk about how options data flows from exchanges to your favorite options dashboard.

Back in 2023 I met [Bailey](https://www.linkedin.com/in/bailey-danseglio-56135a16a/) from [Theta Data](https://www.thetadata.net/).

A few months after we synced online he suggested grabbing a coffee and even doing a data center tour. He had literally just set up his first servers at the time, and his company was 1 person.

<p align="center">
    <img width="800" src="/blog/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks_1.webp" alt="LinkedIn messages from Bailey Danseglio in September 2023 suggesting coffee and a data center tour of EWR2" />
</p>

Unfortunately, at the time I was living in the Bay Area and was just in NYC for a few days and already had back-to-back meetings.

But after 2.5 years, I finally made it! Now Theta Data has 13 employees and thousands of clients.

I finally visited Theta Data’s colocation site in New Jersey!

So this post will talk about the path of a single options quote. From the exchange that creates it, through OPRA, through Theta Data’s hardware, through the wire protocol, and finally into your favorite options market app.

<p align="center">
    <img width="800" src="/blog/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks_2.webp" alt="Diagram of an options quote flowing from the exchange and OPRA through Theta Data's colocation, FPSS ingest, Interp3 Greeks, storage and FIC compression into your app" />
</p>

Some of the post were things I already knew, but many are things that I learned with Bailey or once I got home and spent a few hours iterating with an LLM to up my game!

## 1. The exchange creates the quote

A trader places an options order through a broker. For retail that means Robinhood, Fidelity, Schwab, IBKR, or similar. For institutions it’s a prime broker or a direct-market-access provider.

The broker decides where to send the order. There are seventeen registered US options exchanges, owned by a handful of operators.

- Cboe Global Markets runs four (Cboe Options, C2, BZX Options, EDGX Options).
- Nasdaq runs six (PHLX, NOM, BX Options, ISE, GEMX, MRX).
- NYSE runs two (American Options, Arca Options).
- MIAX runs four.
- BOX and MEMX run one each.

<br />

The broker’s routing logic picks among them based on best-execution obligations, rebate economics, and its own smart order router.

Listed US options trade almost exclusively on exchanges. US equities are different: they have a whole second layer of venues, including wholesale market makers that internalize retail flow and alternative trading systems that run dark pools. Options don’t have that layer. Every order in this post ends up on one of those seventeen exchanges’ order books.

### Order book

The order book is where resting buy and sell interest sits, organized by price level.

Here’s what a simplified one looks like for the AAPL Jan 15 2027 \$180 call on a single exchange:

```text
Offer side (sells)
$2.45  x 200
$2.42  x 100
$2.40  x 75    <- best offer
-----------------
$2.35  x 50    <- best bid
$2.33  x 120
$2.30  x 300
Bid side (buys)
```

The first line on each side of the divider is the top of the book: the highest bid and the lowest offer at that moment. Everything below the best bid and above the best offer is called depth, or away from the top.

Most of the activity concentrates at the top.

Market makers (like Citadel, Jane Street, and Optiver) don’t post (i.e. placing a resting order on the book) deep in the book because those orders don’t trade. They compete at the best price, so the top updates constantly while deeper levels sit mostly still. That’s why most quote messages on the feed describe top-of-book updates: the best bid moved from \$2.35 to \$2.36, or the 75 contracts at \$2.40 got partially filled and dropped to 50.

OPRA publishes NBBO (National Best Bid and Offer) and regional BBO for each exchange. Almost every vendor and user of OPRA data chooses to only evaluate NBBO as consuming the BBO messages increases message volume by ~4x.

The matching engine is the software that maintains the book and pairs new incoming orders against resting orders. Most options exchanges use price-time priority: best price wins, and at the same price the earliest order wins. Some use pro-rata matching, where fills at a price level are split proportionally by size across resting quotes.

### Type of events

Two kinds of events come out of the matching engine.

**A quote is a change to the book.** Someone posts a new bid, the size on an existing offer changes, or a resting order is canceled. No contracts have changed hands.

**A trade is an execution.** Two orders matched at an agreed price and contracts changed hands.

Both become messages on the exchange’s data feed. Quotes dominate by volume. At OPRA’s scale, most of the 200+ billion daily messages are quote updates. Only a small fraction are actual executions. Every OPRA quote message is a top-of-book update from one exchange.

#### Options quote

An options quote is a message that says, for one specific options contract at one specific moment in time, what the best bid and best offer look like on that exchange.

The contract itself is identified by four things: the **underlying asset**, the **expiration date**, the **strike price**, and whether it’s a **call or a put.**

The quote then carries a **bid price**, a **bid size,** an **ask price**, an **ask size**, a **timestamp**, and an **exchange identifier**.

A concrete example:

> AAPL, January 15 2027 expiry, \$180 strike, call. Bid \$2.35 for 50 contracts. Ask \$2.40 for 75 contracts. Timestamp 14:32:17.847 ET. From Cboe.

<br />

## 2. OPRA consolidates and disseminates

OPRA is the Options Price Reporting Authority. It consolidates last-sale and quotation information from every U.S. options exchange and disseminates it to licensed vendors. A vendor can receive the feed directly from the processor or from another vendor, but either way the data remains the property of the originating exchange.

There are two main things to handle here:

- **Volume:** The SEC reported recently that OPRA message volumes rose from 9 billion per day in 2017 to a peak of 247 billion per day in early 2025. OPRA’s SIP metrics show peak throughput of 50.9 million messages per second in January 2026 and 53.5 million in February 2026.
- **Legal**: Before anyone writes an API, the vendor has to deal with entitlements, exchange fee schedules, subscriber agreements, and redistribution permissions.

<br />

This is the first thing Bailey had to handle when he started the company.

**Crazy**.

## 3. The quote hits Theta Data’s hardware

The feed arrives at the colocation facility. In this case EWR2, then you will have racks with servers that will handle the quotes.

<p align="center">
    <img width="500" src="/blog/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks/2026-08-21-how-theta-data-serves-the-entire-us-options-market-from-four-racks_3.webp" alt="Didier and Bailey holding a Theta Data sign in front of the server racks at the EWR2 colocation site" />
</p>

Some of the facts Bailey told me:

- 8 racks, 100+ servers
- 60kW footprint
- 3 petabyte of uncompressed data!! Mix between normalized history and computed analytics
- NVMe for faster retrieval
- Firewalls
- Redundancy in everything (we even talked about how Elon was able to move racks for X without downtime). Theta Data is no different.
- Monitoring to ensure high availability. They even monitor the temperature of the front and back of each rack.

<br />

## 4. NBBO state gets maintained

Once the quote lands on the feed handler, Theta Data has to update state.

NBBO stands for national best bid and offer. It’s the best displayed bid and the best displayed offer consolidated across the exchanges. Think of it as top of book at the national level rather than on a single exchange. In options, OPRA’s rules determine the NBBO first by price, then by size, then by time. A new quote has to improve the current best by at least one cent to displace it. At the same price level, the size has to improve by at least ten contracts.

The best bid and the best offer do not always change at the same moment. OPRA’s output specification has separate indicators for a new best bid, a new best offer, or both. One side can move while the other stays put. If your infrastructure only handles the case where both sides change together, you miss updates or emit stale state.

Theta Data handles one-sided updates.

Bailey told me that this is one of the reasons that they win a lot of business, because many vendors don’t support it due to engineering challenges associated with processing more data.

## 5. Analytics get computed on top

Theta Data computes first-, second-, and third-order Greeks tick by tick and on an aggregated basis.

They pair each option tick with the exact underlying tick at the same moment, apply Black-Scholes, default to SOFR for the risk-free rate, and solve implied volatility with a bisection method. Output is available in both real-time and historical form. In addition to greeks, data on intervals like 1-minute and 1-second are also computed.

The engine that does this work is something Bailey designed called Interp3. It’s an analytics engine for financial data built to handle tick-level computation at OPRA volumes.

## 6. The result lands in tiered storage

Theta Data’s product exposes tick, 1-second, 1-minute, and end-of-day granularities, plus open interest and flat files. A single daily option trade-quote flat file is about 1.2 GB. A daily EOD file is about 150 MB. The API preserves millisecond-level timing through an ms_of_day field.

Put together, this is a multi-tier store: live state and recent high-granularity history on NVMe, bulk archives on spinning disk. Sitting on top of the storage is a server Theta Data calls MDDS, or Market Data Distribution Server. Every query-based request a customer makes (snapshots, historical pulls, bulk downloads) is handled by MDDS. It’s what allows the “give me a year of SPY option trades” into reads across the right storage tiers and returns the result.

## 7. It gets compressed for the wire

Now the quote has to travel from Theta Data’s servers to another machine.

Theta Data uses a proprietary wire protocol that reduces bandwidth by up to 30x versus raw formats. Bailey designed it. They call it *FIC (Financial Information Compression)*. This is applied information theory: encode the same market data content in fewer bits by exploiting structure in the feed.

What gets compressed is a FIT, or Financial Information Tick. A FIT is the atomic unit at Theta Data’s level: a single row of market data, natively represented as an array of signed int32s. Quotes, trades, and Greeks all travel as sequences of FITs. FIC takes those sequences and packs them into the wire format that the Theta Terminal decodes on the other end.

At OPRA volumes, a 30x compression ratio means the same customer can receive the same data over a 30x thinner network pipe, or receive 30x more data over the same pipe. For a vendor serving high-volume customers over the public internet or through cross-connects, the wire format is one of the most important parts of the stack.

## 8. Your favorite options app

This is where the journey ends. The compressed stream leaves Theta Data’s racks, travels over the internet or a cross-connect, and lands in an application. That app might be a trading platform that licenses the data underneath, a research dashboard (cough OpenBB Workspace cough), or the side project you’re vibe coding at night with quotes coming off a WebSocket.

As far as the app is concerned, market data is a service that just works. It does not think about OPRA entitlements, feed handlers, one-sided NBBO updates, Greeks computation, storage tiers, or wire compression.

All of that is abstracted away behind a clean stream of quotes.

The journey passes through exchange licensing, compliance approvals, multi-megawatt facility power, redundant networks, FPSS, the Interp3 analytics engine, petabyte storage, and a 30x compression protocol. The app just shows you a live option chain without the developer having to worry/touch a multicast packet.

---

Massive shoutout to [Theta Data](https://www.thetadata.net/) and [Bailey](https://www.linkedin.com/in/bailey-danseglio-56135a16a/).

I’m trying to convince Bailey to talk more about the BTS of Theta Data, so if you found some value in this post and would like to learn more (or become a customer!) reach out to him and the team.
