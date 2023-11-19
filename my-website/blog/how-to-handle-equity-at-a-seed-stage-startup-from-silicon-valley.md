---
slug: how-to-handle-equity-at-a-seed-stage-startup-from-silicon-valley
title: How to handle equity at a seed-stage startup from Silicon Valley
authors: didier
tags: []
date: 2010-04-07
---

# How to handle equity at a seed-stage startup from Silicon Valley

As a startup founder and CEO, you need to wear multiple hats, from engineering and product to design, marketing, and even finance.

Today, I’m going through the details of how we handle equity at OpenBB. This blog post provides a step-by-step guide on the implementation process, including links to relevant spreadsheets that you can reuse for your startup.

To make this post easier to follow, I will create a purely fictional example.

John Doe, a software engineer from Portugal, has been contributing to the open source OpenBB Terminal for a few consecutive weeks. He not only fixes bugs but also adds features that the community has requested through pull requests and on Discord. Additionally, he is a fast learner and gets along well with the current team. This sparks the interest of the OpenBB team because having this open-source contributor work with us full-time would be great, rather than being limited by his current full-time job.

From here, we set up an initial exploratory call to better understand John Doe as an individual — what he is passionate about, why he has contributed to the project, and more. We follow up the call with an interview involving engineers to assess his skills and experience. Finally, he joins a call with me, where I sell the vision of the company and explain why what OpenBB is doing matters. At this point, we extend him an offer. Up until this stage, the recruiting process is standard, except for the fact that we have a “filtered” candidate coming from the open-source community.

However, as a startup, that offer cannot (or at least should not) consist solely of cash compensation. A startup operates at a much faster pace and is riskier than a company. Therefore, in exchange for hard work and long hours, you should offer part of the company through equity, allowing the employee to benefit from the upside in case the company achieves a successful exit (IPO or sale).

**So, how do we decide on the equity to offer the new hire?**

It’s easy. You follow your company Option Guidelines.

What are the Option Guidelines?

The Option Guidelines are an Excel spreadsheet approved by the board. In this document, you explicitly create bands (minimum and maximum range options) based on the role and stage of the company. Board approval is crucial as it allows you to extend the offer directly without needing permission from the board since the guidelines have already been approved.

Here’s what the document looks like:

![image](https://github.com/Meg1211/my-website/assets/88618738/c4d5f9ed-d2b4-4faf-802d-1de3e3e83d71)
The total number of shares is random and not representative of OpenBB.

First, you need to ask yourself what roles your company envisions needing. Within those roles, there are two things to consider:

- **Departments:** You may differentiate between Engineering, Marketing, Operations, Sales, Finance, and HR/Admin. You can also add others such as Design, Product, etc. Note that having different departments does not necessarily mean you need different band structures.
- **Titles:** You’ll want to be able to “compare” individuals based on their contributions. For instance, Vice President, Director, Manager, Senior Individual Contributor, and Individual Contributor. Note that if you have fewer titles, the bands should be wider to differentiate individuals with the same title. If you add five levels of Individual Contributors, you’ll want narrower bands. I recommend starting with fewer titles, KISS: keep it simple stupid. Again, having different levels does not necessarily mean the bands need to be mutually exclusive. A Manager does not necessarily have a higher band than a Senior Individual Contributor; this depends on your own company culture.

Next, you need to differentiate between company stages. This allows you to distinguish employees who join very early when the startup carries the most risk. We distinguish between three stages: Pre-production revenue, Pre-profit with production revenue, and Profitable.

Once all these categories are completed, you should have a similar table to the one shared above. Now, it’s important to fill in the equity percentage. For privacy reasons, I will not provide the specific values for OpenBB but will create a random example.

Let’s imagine that OpenBB Charter has a total of 1 million shares (assuming only one class of stock for simplicity). If our priced round values the company at $10 million, this means that each share is valued at $10.

On the top left of the document, we will insert the number of shares, which is 1,000,000. Then, we adjust the % LOW and % HIGH columns, representing the range of company ownership we want to grant to this individual.

Let’s go through a fake example for the SW role:

![image](https://github.com/Meg1211/my-website/assets/88618738/39ea2b1f-af4b-45b1-be7d-ba88f4c03c40)

The column “Low Shrs” is computed by multiplying the % LOW by the total number of shares. On the other hand, the column “High Shrs” is computed by multiplying the % HIGH by the total number of shares. This value is important as it represents the amount stipulated in the contract.

Let’s consider a scenario where the company is in the Pre-Profit stage with Production Revenue, and we want to hire an Engineering IC. Based on our assessment of their skillset and fairness in comparison to other team members, we would offer a contract that vests over time between 1000 and 2000 shares.

![image](https://github.com/Meg1211/my-website/assets/88618738/b84e4085-b26c-41a5-87cc-7667fe279d62)

Next, you need to decide on the vesting calendar that the company supports. The most common option is a 4-year vesting schedule with a 1-year cliff. This means that while you begin vesting during your first year, you need to stay with the company for the entire year to be able to exercise those options. The 1-year cliff protects the company from employees leaving early or underperforming.

Carta provides a good explanation on how stock options work here — which I recommend to everyone.

Please note that in theory, while the value of these options is $10 per share, the startup will need to conduct a 409a valuation to determine the fair market value of each option, which is likely to be much lower than the initial price, such as $1 per share. And this is the strike price that employees will need to pay to exercise the shares.

Note: when selecting the number of shares, use a number that is divisible by the number of months that the employee is vesting, e.g., for a 4-year vesting period that would be 48 (4 x 12), which ensures that employees get the same amount of shares each month, and there’s no need to account for floating numbers.

This is it for today.

In Part II, I will talk about how you can handle equity top-ups.

So follow me if you want to learn more about what that process may look like.
