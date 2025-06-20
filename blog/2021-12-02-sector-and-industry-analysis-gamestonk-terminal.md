---
slug: sector-and-industry-analysis-gamestonk-terminal
title: Sector and Industry Analysis — Gamestonk Terminal
date: 2021-12-02
image: /blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal.png
tags:
- gamestonk-terminal
- sector-analysis
- industry-analysis
- financedatabase
- open-source
description: The development journey of a new Sector and Industry Analysis feature for Gamestonk Terminal, integrating the FinanceDatabase package.
---




<p align="center">
    <img width="600" src="/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal.png"/>
</p>

<br />

The development journey of a new Sector and Industry Analysis feature for Gamestonk Terminal, integrating the FinanceDatabase package.

The open source code is available [here](https://github.com/DidierRLopes/GamestonkTerminal).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

The end-to-end story of developing a new **Sector and Industry Analysis** for [Gamestonk Terminal](https://github.com/GamestonkTerminal/GamestonkTerminal) from scratch.

On the 13th of October, [Jeroen Bouma](https://github.com/JerBouma) (a ALM advisor and python enthusiast) reached out in order to integrate his [FinanceDatabase package](https://github.com/JerBouma/FinanceDatabase) into [Gamestonk Terminal](https://github.com/GamestonkTerminal/GamestonkTerminal).

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_1.png)

After having a call with Jeroen to bounce ideas, it was clear that our terminal needed such capability to be even more powerful (as if **over 500 features** already and counting didn’t already do the trick eheh). However, at the time I was too busy to work on the concept so I asked Jeroen if he could sketch something up on a jupyter notebook.

Within the following week, Jeroen sent a Jupyter notebook explaining the FinanceDatabase module and what we could have in a Sector and Industry analysis.

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_2.png)

In addition, he also mentioned his [PassiveInvestor package](https://github.com/JerBouma/ThePassiveInvestor), and ended up [implementing it on his own in Gamestonk Terminal](https://github.com/GamestonkTerminal/GamestonkTerminal/pull/857)! This was a great addition, as it strengthened our **ETF context** and provided a slick Excel report for the Excel fans out there! See his [LinkedIn post](https://www.linkedin.com/feed/update/urn:li:activity:6859887432532291584/) on the experience.

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_3.png)

...

Forward to last weekend (1.5 months later), I had a free Sunday afternoon so started working on the development of this menu. I started by thinking about what would make this menu more flexible and powerful.

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_4.png)

These were my thoughts about what it needs:

- **Several filtering parameters** as the number of companies in the database is pretty huge with 155.705 tickers, 16 sectors, 242 industries, 111 countries and 82 exchanges. These were the filters selected: Country, Sector, Industry, Market Cap and Flag to include/exclude international exchanges.
- **To be able to do some statistics on the sector**, industries and countries (e.g. companies per sector/industry with a specified country and market cap) which allows users to better understand companies landscape of a sector and industry.
- **To get the financials of the companies that fall under that filter subset** (e.g. return on assets, quick ratio, debt to equity), and then compare these in order to get the best performers.
- Since one of the previous financials isn’t enough to understand which company would be best to invest in, I wanted the filtered companies to have the capability to jump onto the comparison analysis menu so you could get all the capabilities of comparing historical price data, volume data, income/balance/cash flow, sentiment, or even technical indicators.
- If in the stocks context I had Tesla loaded, I wanted to go into this sia menu and get all the filtering parameters to be ready to filter for companies similar to Tesla in terms of (Sector, Industry, Country and Market Cap).

By Sunday night, I created the [pull request for this](https://github.com/GamestonkTerminal/GamestonkTerminal/pull/995). Due to the due diligent reviews performed by the main contributors of the project, the menu got a lot of improvements. Some of them were:
- Do not display companies that account for under a certain threshold (1%) and therefore sum them in an “Others” slice.
- Allow to export all the data as a table.
- After filtering and getting financials, save the data for faster data retrieval if the same filters are used.
- Minor bug fixes.

After a lot of comments and feedback from the main maintainers, and everyone being happy with this first iteration, the PR got merged. In fact, one of the main maintainers found a hidden gem while testing it.

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_5.png)

In the meantime, I’ve been in contact with Jeroen about adding some more capabilities to his FinanceDatabase package so that everyone could benefit from them. Some examples are:
- When an industry is selected, the corresponding sector should be automatically filled.
- If I select a country and a market cap for filtering, my sector choices should be bounded by what exists within those.
- I should be able to query about companies landscape in terms of a country. E.g. I want to understand what countries have the most large cap companies within the Financial Services sector.

This would not only make the FinanceDatabase a more powerful Package, which would in turn benefit Gamestonk Terminal sia menu, and ultimately our thousands of users!

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_6.png)

This is an example of how the Sector and Industry Analysis menu looks (as a bonus I show how you can go into the Comparison Analysis menu):

![image](/blog/2021-12-02-sector-and-industry-analysis-gamestonk-terminal_7.png)

Next time you know, it all starts with an e-mail. At Gamestonk Terminal we are on a role to have the best investment research terminal, and hope this story reflects it.

Try it now, it’s free. ❤️
