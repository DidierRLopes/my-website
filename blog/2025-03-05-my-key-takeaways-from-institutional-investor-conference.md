---
slug: my-key-takeaways-from-institutional-investor-conference
title: My key takeaways from Institutional Investor conference
date: 2025-03-05
image: /blog/2025-03-05-my-key-takeaways-from-institutional-investor-conference.jpg
tags:
- openbb
- financial-services
- ai-adoption
- data-privacy
- enterprise-ai
- build-vs-buy
- open-source
- finance
- local-deployment
description: Key insights from financial services technology leaders on AI adoption, including build vs. buy strategies, data privacy concerns, technology adoption divides, and the challenges of moving from prototypes to production-ready solutions.
hideSidebar: true
---



<p align="center">
    <img width="900" src="/blog/2025-03-05-my-key-takeaways-from-institutional-investor-conference.jpg" />
</p>

Key insights from financial services technology leaders on AI adoption, including build vs. buy strategies, data privacy concerns, technology adoption divides, and the challenges of moving from prototypes to production-ready solutions.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I just returned from an insightful financial services technology conference where CTOs, CIOs, and technology leaders shared their perspectives on AI.

I was on the stage on the topic of "Autonomous Agents — The Next Step in AI Applications?" which was one of my favorite panels that I've ever done.

This allowed me to have extremely insigthful conversations with industry leaders managing dozens to hundreds of billions of dollars in AUM.

Here are the most valuable insights I gathered:

## The build vs. buy evolution

Financial institutions increasingly prefer building over buying complete solutions. Most follow a hybrid approach—purchasing foundational technology but building customized layers on top. The consensus is that this approach reduces complexity in the long term while avoiding vendor lock-in.

> **OpenBB hat on**: This is one of the reasons we love open source - it gives users a third option: building on top of an infrastructure that is continuously maintained and improved, allowing firms to focus solely on their workflows.

<br />


## AI adoption challenges

Despite the hype, financial services firms struggle with AI implementation, primarily due to unclear use cases. There is no dominant AI product in the industry, and most organizations cautiously use general tools under strict controls.

> **OpenBB hat on**: This is a great sign that we are still early, and there isn't yet a clear winner in AI financial products. It also indicates that companies need to invest capital in educating the market—not just about their products (I'm guilty of this) but about the workflows that AI can enable. (Luckily, [Ihsan](https://www.linkedin.com/in/ihsan-erman-saracgil-42628454/) joined the team recently, and I've seen him build full workflows for clients like this [earnings workflow](https://www.youtube.com/watch?v=JTlyU6HdWjQ) solely on OpenBB. If you're looking for something specific, he's the person to ask!)

<br />

<p align="center">
    <img width="900" src="/blog/2025-03-05-my-key-takeaways-from-institutional-investor-conference_1.jpg" />
</p>

## Data privacy concerns without local solutions

Significant concern was expressed about data leakage when using AI tools, with strict policies such as "no credit card swipes for AI tools" and "turn off uploads" being common. Interestingly, no one mentioned running open-weight models locally, a solution that would address these privacy concerns by keeping data in-house. This represents a major market education opportunity, as firms are worried about data leaving their environment but aren't aware of alternatives to cloud-based AI services.

> **OpenBB hat on**: This one really surprised me. It may be because most products currently follow a traditional SaaS model. However, I saw a clear need for on-prem/VPC deployments where firms run open-weight models locally with zero data leakage. We can do this — and we might be one of the few products on the market that can today.

<br />

## Technology adoption divide

A clear divide exists between technology resistors and embracers. Some professionals cling to legacy tools and manual processes, seemingly to preserve their relevance. Meanwhile, AI adopters are achieving remarkable productivity gains, quickly building React applications, simulations, and analytical tools.

> **OpenBB hat on**:  This trend was expected. I've personally experienced how AI has dramatically increased my coding efficiency. As the cost of building continues to approach zero, we'll see exponential opportunities to automate workflows. Talent with AI expertise won't just deliver 2-3x value for their firms but potentially 10x or more. This represents both a challenge and an opportunity for organizations ready to embrace these new capabilities.

<br />

## Prototype-to-production gap

A common challenge is bridging the gap between 70% done prototypes and enterprise-ready solutions. AI enables rapid development and impressive demos, but the real challenge is implementing governance, security, compliance, and scalability for production environments. Organizations need talent that can leverage AI for rapid innovation while also understanding enterprise requirements to bring projects to completion.

> **OpenBB hat on**: This reality is particularly evident in development practices. A quick demo in Streamlit can be built in minutes—great for rapid prototyping. However, such solutions rarely meet enterprise standards. Developing production-ready features like RBAC, SSO, administrative controls, sharing capabilities, comprehensive logging, and reporting systems requires an entirely different skill set and approach. We often see firms approaching us after realizing their prototype tools won't scale to meet their long-term strategic objectives.

<br />

## What this means for OpenBB

OpenBB is uniquely positioned at the intersection of these trends. As an open workspace that supports bring-your-own-data, local AI deployment, and enterprise-grade features, we provide financial institutions with the flexibility to build custom solutions while addressing security concerns and bridging the prototype-to-production gap.

Our approach aligns perfectly with the industry's evolving needs, making us an ideal partner for forward-thinking financial organizations navigating AI transformation.

If you want to chat, feel free to e-mail me at didier.lopes[at]openbb.finance.