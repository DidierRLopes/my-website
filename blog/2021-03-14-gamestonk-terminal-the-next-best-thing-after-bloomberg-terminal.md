---
slug: gamestonk-terminal-the-next-best-thing-after-bloomberg-terminal
title: Gamestonk Terminal - The next best thing after Bloomberg Terminal
date: 2021-03-14
image: /blog/2021-03-14-gamestonk-terminal-the-next-best-thing-after-bloomberg-terminal.png
tags: ['Gamestonk Terminal', 'Finance', 'Stock Market', 'Programming', 'Open Source']
description: In this blogpost, I introduce Gamestonk Terminal, an open-source project that aims to be a comprehensive tool for financial analysis and stock market research. It includes functionalities for discovering stocks, market sentiment analysis, fundamental and technical analysis, due diligence, prediction techniques, and more.
---

<p align="center">
    <img width="600" src="/blog/2021-03-14-gamestonk-terminal-the-next-best-thing-after-bloomberg-terminal_1.png"/>
</p>

<br />

In this blogpost, I introduce Gamestonk Terminal, an open-source project that aims to be a comprehensive tool for financial analysis and stock market research. It includes functionalities for discovering stocks, market sentiment analysis, fundamental and technical analysis, due diligence, prediction techniques, and more.

The open source code is available [here](https://github.com/DidierRLopes/GamestonkTerminal).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

If you like stocks and are careful with the way you spend your money, (me saying it seems counter-intuitive given that I bought GME at the peak, I know) you know how much time goes into buying shares of a stock.

You need to: Find stocks that are somehow undervalued; Research on the company, and its competitors; Check that the financials are healthy; Look into different technical indicators; Investigate SEC fillings and Insider activity; Look up for next earnings date and analysts estimates; Estimate market’s sentiment through Reddit, Twitter, Stocktwits; Read news;. … the list goes on.

It’s tedious and I don’t have 24k for a Bloomberg terminal. Which led me to the idea during xmas break to spend the time creating my own terminal. I introduce you to “Gamestonk Terminal” (probably should’ve sent 1 tweet everyday to Elon Musk for copyrights permission eheh).

As someone mentioned, this is meant to be like a swiss army knife for finance.

It contains the following functionalities:

- **Discover Stocks**: Some features are: Top gainers; Sectors performance; upcoming earnings releases; top high shorted interest stocks; top stocks with low float; top orders on fidelity; and some SPAC websites with news/calendars.

- **Market Sentiment**: Main features are: Scrolling through Reddit main posts, and most tickers mentions; Extracting trending symbols on stocktwits, or even stocktwit sentiment based on bull/bear flags; Twitter in-depth sentiment prediction using AI; Google mentions over time.

- **Research Web pages**: List of good pages to do research on a stock, e.g. macroaxis, zacks, macrotrends, ..

- **Fundamental Analysis**: Read financials from a company from Market Watch, Yahoo Finance, Alpha Vantage, and Financial Modeling Prep API. Since I only rely on free data, I added the information from all of these, so that the user can get it from the source it trusts the most. Also exports management team behind stock, along with their pages on Google, to speed up research process.

- **Technical Analysis**: The usual technical indicators: sma, rsi, macd, adx, bbands, and more.

- **Due Diligence**: It has several features that I found to be really useful. Some of them are: Latest news of the company; Analyst prices and ratings; Price target from several analysts plot over time vs stock price; Insider activity, and these timestamps marked on the stock price historical data; Latest SEC fillings; Short interest over time; A check for financial warnings based on Sean Seah book.

- **Prediction Techniques**: The one I had more fun with. It tries to predict the stock price, from simple models like sma and arima to complex neural network models, like LSTM. The additional capability here is that all of these are easy to configure. Either through command line arguments, or even in form of a configuration file to define your NN. It also allows backtesting.

- **Reports**: Allows you to run several jobs functionalities and write daily notes on a stock, so that you can assess what you thought about the stock in the past, to perform better decisions.

- **Comparison Analysis**: Allows to compare different stocks.

- **On the ROADMAP**: Cryptocurrencies, Portfolio Analysis, Credit Analysis. Feel free to add the features you’d like and we would happily work on it.

This project will always remain open-source, and the idea is that it can grow substantially over-time so that more and more people start taking advantage of it.

Feel free to contribute towards the project.

Feedback is extremely welcome!
