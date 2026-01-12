---
slug: finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen
title: Finance's OceanGate moment - The AI adoption disaster waiting to happen
date: 2025-07-09
image: /blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen.webp
tags:
  - ai
  - finance
  - risk-management
  - data-security
  - llm
  - leadership
  - strategy
  - data-leakage
description: The financial industry's rush to adopt AI without proper data security is creating an 'OceanGate moment' - a disaster waiting to happen. This post explores the risks of reckless AI implementation and charts a safer path forward through on-premise and local model deployment.
hideSidebar: true
---

<p align="center">
    <img width="600" src="/blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen.webp" />
</p>

The financial industry's rush to adopt AI without proper data security is creating an 'OceanGate moment' - a disaster waiting to happen. This post explores the risks of reckless AI implementation and charts a safer path forward through on-premise and local model deployment.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

The more I learn about how financial firms are adopting AI, the more convinced I become that we're heading toward an inevitable reckoning.

There's a chilling scene in the OceanGate documentary trailer where Rob McCallum, a former advisor to OceanGate, observes:

> "There was no way of knowing when Titan would fail. But it was a mathematical certainty that it would fail."

<br />

<p align="center">
    <img width="600" src="/blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen_1.webp" />
</p>

This wasn't about predicting the exact moment of catastrophe. It was about recognizing that the submarine's fundamental design flaws made disaster inevitable.

This is precisely where we stand today with AI adoption in finance.

## Three colliding forces

### Leadership FOMO vs. Industry inertia

The financial industry moves at glacial speed. Many investment firms today still operate without AI capabilities, lack dedicated AI engineers, or worse - have no coherent data strategy whatsoever.

Yet these same leaders consume report after report showcasing dramatic efficiency gains at AI-forward companies.

The result? FOMO is forcing an inherently cautious industry to abandon its natural risk-averse instincts.

### The technology diffusion flip

Andrej Karpathy made a crucial observation that explains why this situation is unprecedented:

> "LLMs flip the direction of technology diffusion that is usually present in technology. [...] Typically it is the government and corporations that are the first users, because it's new and expensive, etc. And it only later diffuses to consumers."

<br />

Read his full analysis [here](https://x.com/karpathy/status/1909308143156240538).

<p align="center">
    <img width="400" src="/blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen_2.webp" />
</p>

For the first time in corporate history, employees have access to transformative technology before their institutions can properly evaluate and control it.

### The individual productivity arms race

Employees and interns at these firms face an impossible situation. They watch peers in tech, consulting, and other industries leverage AI for 10x productivity gains while they're constrained by institutional caution.

The social pressure is immense.

The career advantages are obvious.

When someone discovers they can draft reports in minutes instead of hours using ChatGPT, the secret spreads like wildfire. Soon, not using AI becomes a career-limiting move.

## The inevitable escalation

What starts as something innocent, such as using AI for basic chat queries, quickly escalates:

- **Week 1**: "I'll just use it for brainstorming"
- **Week 2**: "Let me upload this one document to help with my analysis"
- **Week 3**: "If I can provide these few reports, then it will save me so much time!"  
- **Week 4**: "F*** it, everyone's doing it. What's the worse that can happen?"
<br />

In a few months, you can have entire teams processing confidential client data through external AI services

Each step feels reasonable in isolation.

Collectively, they represent a massive compliance and security breach waiting to happen.

Consider the recent case where [Samsung employees inadvertently leaked sensitive code by using ChatGPT for debugging](https://www.forbes.com/sites/siladityaray/2023/05/02/samsung-bans-chatgpt-and-other-chatbots-for-employees-after-sensitive-code-leak/).

### The cost of inaction vs. reckless action

**Traditional Approach Costs:**
- substantial productivity disadvantage vs. AI-enabled competitors
- Talent retention challenges as top performers seek AI-forward environments
- Gradual market share erosion to more agile competitors
<br />

**Reckless AI Adoption Costs:**
- Regulatory violations
- Data breaches
- Client trust erosion and potential lawsuits
- Competitive intelligence leakage
<br />

Something has to give - and history suggests it won't be pretty when it does.

## The path forward

Fortunately, forward-thinking firms are already charting safer courses:

- **Policies to not push any data outside their premises**: Implement strict data governance preventing any information from leaving company premises. This approach sacrifices efficiency gains for security but may prove insufficient as competitive pressures mount. (ok)
- **Utilizing AI software on-premise**: Deploy enterprise AI software within company infrastructure, maintaining data control while enabling productivity gains. Solutions like Microsoft's enterprise ChatGPT or Google's Vertex AI offer this middle ground, and firms are in control with their relationship with the AI labs. (good)
- **Running their own AI models locally**: Run proprietary AI models on company hardware, achieving complete data sovereignty while maintaining cutting-edge capabilities. (best)

<br />

The viability of running models locally has dramatically improved. While the performance gap between closed and open models remains significant, it's narrowing rapidly.

Newest LLMs are no longer showing exponential improvements but incremental only. This means that the open weight models are catching up, and - likely - in a long enough time horizon the performance of closed and open models converges.

## In practice

We've implemented this philosophy in the [OpenBB Workspace](https://openbb.co/products/workspace).

<p align="center">
    <img width="900" src="/blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen_3.webp" />
</p>

Our product enables complete on-premises deployment **with local model integration**, giving financial professionals AI-powered analysis without data sovereignty concerns.

The question isn't whether AI will transform finance - it's whether your firm will control that transformation or become its victim.

If you're ready to discuss how to implement AI safely and strategically within your organization, let's talk. Our product helps financial firms navigate this transition without compromising security, compliance, or competitive position.

The mathematical certainty of failure only applies to those who don't listen to the cracks in the ship.

<div style={{borderBottom: '1px solid #0088CC', margin: '1.5em 0'}} />

I believe in this so much that I actually added a [Chat page](https://didierlopes.com/chat) to my personal website that allows users to run open-weight models on their machine, via Ollama, with access to data from my blogposts.

<p align="center">
    <img width="900" src="/blog/2025-07-09-finances-oceangate-moment-the-ai-adoption-disaster-waiting-to-happen_4.webp" />
</p>
