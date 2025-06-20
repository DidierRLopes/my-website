---
slug: how-i-would-do-due-diligence-on-amt-using-openbb-terminal
title: How I would do due diligence on $AMT using OpenBB Terminal
date: 2022-10-20
image: /blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal.png
tags:
- openbb-terminal
- investment-research
- stocks
- due-diligence
description: This blog post provides a detailed walkthrough on how to conduct due diligence on $AMT using the OpenBB Terminal, a free and open source platform for financial data analysis.
---




<p align="center">
    <img width="600" src="/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal.png"/>
</p>

<br />

This blog post provides a detailed walkthrough on how to conduct due diligence on $AMT using the OpenBB Terminal, a free and open source platform for financial data analysis.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Last month someone on Twitter asked me to do a thread on how I would do due diligence on $AMT using the free and open source [OpenBB Terminal](https://github.com/OpenBB-finance/OpenBBTerminal).

Below I demonstrate what you can expect from using that platform.

We could go much deeper, but this shows examples of output that you can expect. With over 800 commands and over 100 data sources, this is a very small subset of what you can achieve through this platform.

In addition, this will only be in relation with stocks data, but the terminal also has access to options, crypto, ETFs, mutual funds, NFTs, macro economy, futures and even alternative data!

More information on the platform and how to install it [here](https://my.openbb.co/app/terminal/download).

Strap in.

```console
$ /stocks/load AMT/candle
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_1.png)

```console
$ /stocks/fa/mktcap
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_2.png)

```console
$ /stocks/fa/mgmt
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_3.png)

```console
$ /stocks/fa/income/balance/cash
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_4.png)

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_5.png)

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_6.png)

```console
$ /stocks/fa/shrs
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_7.png)

```console
$ /stocks/fa/sust
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_8.png)

```console
$ /stocks/fa/divs
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_9.png)

```console
$ /stocks/fa/dcf
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_10.png)

```console
$ /stocks/ins/stats
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_11.png)

```console
$ /stocks/dps/psi
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_12.png)

```console
$ /stocks/gov/histcont
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_13.png)

```console
$ /stocks/dd/rating
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_14.png)

```console
$ /stocks/dd/pt
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_15.png)

```console
$ /stocks/dd/est
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_16.png)

```console
$ /stocks/ta/sma
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_17.png)

```console
$ /stocks/ta/recom/summary
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_18.png)

```console
$ /stocks/ba/sentiment
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_19.png)

```console
$ /stocks/sia/metric tc
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_20.png)

```console
$ /stocks/sia/metric fcf
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_21.png)

```console
$ /stocks/sia/vis oi
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_22.png)

```console
$ /stocks/ca/historical/hcorr
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_23.png)

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_24.png)

```console
$ /stocks/ca/cashflow/income/balance
```

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_25.png)

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_26.png)

![image](/blog/2022-10-20-how-i-would-do-due-diligence-on-amt-using-openbb-terminal_27.png)

I know this can be overwhelming information and it takes some time to run all these commands.

Hence I created a [script](https://github.com/OpenBB-finance/OpenBBTerminal/blob/main/openbb_terminal/miscellaneous/routines/due_diligence_stock.openbb). So now you can run all of these commands in one go, with:

```console
$ /exe due_diligence_stock.openbb -i AMT
```

Any feedback is welcome!

And if you want to ask questions about the product before installing it, feel free to join us on Discord here: https://openbb.co/discord
