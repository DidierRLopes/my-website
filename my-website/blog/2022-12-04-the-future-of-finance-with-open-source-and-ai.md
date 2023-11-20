---
slug: the-future-of-finance-with-open-source-and-ai
title: The future of finance with open source and AI
date: 2022-12-04
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280552376-81f97180-abdd-41fa-a422-becefc8fd5cd.png
tags: ['Open Source', 'AI', 'Finance', 'Future']
description: The future of finance is being reshaped by open source and AI. This post discusses the potential of these technologies in disrupting the financial industry, the advantages of open source, and the role of AI in user interface.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280552376-81f97180-abdd-41fa-a422-becefc8fd5cd.png"/>
</p>

<br />

The future of finance is being reshaped by open source and AI. This post discusses the potential of these technologies in disrupting the financial industry, the advantages of open source, and the role of AI in user interface.

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

This post will talk about my (very) u̶n̶biased opinion about the future of finance built on top of open source and AI.

## Open Source platform

![image](https://github.com/Meg1211/my-website/assets/88618738/61585c8f-085f-4697-9714-4fe02296053d)

**OpenBB Terminal**

**1. Data licensing vs Marketplace**

Current monopolies spend an enormous amount of cash on financial data licensing. There are dozens of different asset classes (stocks, options, crypto, NFTs, currencies, bonds, ETFs, mutual funds, …) and these often vary based on geography. That makes the overall investment research industry a very tough market to compete. Startups cannot disrupt the space without a massive capital injection. This is also why startups usually focus on a certain asset class in a certain geography.

**In my opinion, the only shot we have to disrupt incumbents is by not owning the data but becoming the infra layer between data sources and users.** _This is no different than Uber not owning cars, Airbnb not owning apartments or Deliveroo not owning restaurants._

**This also has a great advantage which is being able to integrate new data sources very fast and easily.** Plus, owing to open source, anyone can add it. On the other hand, it’s very unlikely that an incumbent will add data that you require. Plus, if they do, they will need to license the data and therefore decrease their margins — unless they increase the price to users.

**2. Full-price bundle**

Current incumbents pricing is usually a complete bundled offering. This means that regardless of what you are utilizing in terms of both breadth and depth, you pay the full price tag. A good analogy is like a restaurant ONLY having a buffet when all you want is a bottle of water, or some chips. What happens is that a user ends up paying for data that they are not using.

In 2022, this is a very outdated take. Companies are looking to get leaner, and it doesn’t make sense to pay for data that you aren’t going to leverage. Being the infrastructure between users and data sources allows you to create value to both; Since users will have access to all the data they want and pay for the ones they use, and data sources will have access to a big pool of users and may not need to create a dashboard product to monetize their offerings.

**3. Transparency & Customization**

Current incumbents have built several in-house financial models. Although these are often customizable, their customization is typically limited. That is because what is usually customizable are the values/weights, but not necessarily the formulas — that is kept hidden in their source code. This is an issue because that code cannot be validated and users cannot modify it.

With open source, the story is completely different. Users can see every single line of code, and therefore not only audit the code quality but adapt the models/formulas to their own needs. At the end of the day, there is no point in re-inventing the wheel for financial theory that has been around for decades.

By having the code open source, users can rely on the fact that these formulas have been validated/tested by thousands or millions of users and, therefore, there’s a very low chance that these are wrong. In addition, users are more secure because they can investigate the code and check/fix any vulnerabilities.

**4. Community**

One of the best parts of open source is the integrated community that it creates. This attracts people from every background, gender or ethnicity. Such a pool of diversity tends to allow for better ideas and pushes a project further. With people from the community being able to contribute, this also drives innovation.

OpenBB has been driven a lot by the community so far. What started as a terminal mostly focused on stocks, soon evolved into including a broad range of datasets and considering several geographies. E.g. A contributor from Sweeden integrated Avanza API to the mutual funds menu that would only appear if users were looking into mutual funds from Sweden. This shows the power of community.

Having the platform be open source is key.

## GPT as the interface

**One of the hedges that incumbents have is the fact that they have been around for a very long time and spent a lot on educating users about their product.** As a result, users are used to their platform. This makes them harder to switch to an unknown product. This is also why a product needs to be 10x better than competition for users to switch.

However, what if there was no learning curve ? What if you could use a product for the first time and knew how to access all the data without spending any time reading the documentation. In essence, the educational incumbent advantage would become obsolete.

With the new LLM advancements, such as ChatGPT. We are not far from this reality.

**ADD GIF**

Plus, if this is built on top of an open source project it means that the community can help in improving the model by providing more training data (e.g. provide a text as input and the corresponding command as output) or even confirm whether or not the chart that pops up was accurate. In addition, along with data sources you can imagine that the community could start contributing with new languages for the GPT model.

You can easily imagine that such interface would work well with a speech recognition model (something like whisper but that allowed real-time).

This makes using a new investment research platform easy, but more importantly makes retrieving information much faster and efficient.

## GPT to build investment research reports

One of the new features that were announced with OpenBB Terminal 2.0 was the automated reports generation that utilizes papermill to leverage jupyter notebook templates.

**ADD GIF**

As it stands creating one of these notebook templates requires some coding skills and reading OpenBB documentation to understand how to retrieve the data of interest providing the correct function and necessary arguments.

**But, for a second, imagine if you could build these notebook templates with almost no-code?**

The proof-of-concept below in combination with the automated report generation should allow you to further understand the breakthrough that we may accomplish in the following few months.

![image](https://github.com/Meg1211/my-website/assets/88618738/81f97180-abdd-41fa-a422-becefc8fd5cd)

**My prediction is that open source + AI will disrupt the financial sector in the upcoming years.**

OpenBB will be leading that wave.

Thanks for reading!

If you like this content, follow me on Twitter where I share OpenBB progress. Or follow OpenBB!
