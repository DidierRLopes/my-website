---
slug: 2025-07-xx-is-prompt-engineering-dead-the-case-for-test-driven-ai-development
title: Is Prompt Engineering dead? The case for Test-Driven AI Development
date: 2025-07-30
image: /blog/2025-07-xx-is-prompt-engineering-dead-the-case-for-test-driven-ai-development
tags:
  - ai
  - prompt-engineering
  - llm
  - software-development
  - automation
  - agentic-ai
  - self-improving-ai
  - test-driven-development
  - control-systems
description: This post explores Test-Driven AI Development, where AI writes its own tests and prompts, potentially making manual prompt engineering obsolete. It covers how self-improving AI systems can be built and the implications of this paradigm shift.
hideSidebar: true
hide: true
draft: true
---

<p align="center">
    <img width="600" src="/blog/2025-07-xx-is-prompt-engineering-dead-the-case-for-test-driven-ai-development.png" />
</p>

This post explores Test-Driven AI Development, where AI writes its own tests and prompts, potentially making manual prompt engineering obsolete. It covers how self-improving AI systems can be built and the implications of this paradigm shift.

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I learned about Test Driven Development (TDD) a few years ago while working as a Firmware Engineer. What I didn't expect was how this traditional methodology would evolve into something that could fundamentally change how we build AI systems, and potentially make prompt engineering obsolete.

**The thesis:** If AI can write comprehensive tests from a PRD AND automatically generate prompts to pass those tests, then manual prompt engineering becomes as outdated as manually optimizing low-level assembly code.

## Test Driven Development: A quick refresher

Skip this if you're familiar with TDD.

Test-driven development is a software development process where tests are written before the actual code. The core process, known as "Red-Green-Refactor" involves writing a failing test, writing the minimal code to pass it, and then refactoring the code.

```python
# Test first
def test_discount():
    assert calculate_discount(100, 0.1) == 90

# Then minimal code
def calculate_discount(price, rate):
    return price * (1 - rate)
```

The traditional flow looks like this:

```
Mock data  ────>  Code  ────>  Output × Tests
                   ↑              │
          Refactor │              │
                   └── Error ←────┘
```

The cycle continues: run the test, refactor the code, run the test again, until all tests pass.

## TDD with AI: First evolution

TDD with AI becomes much easier. The concept is the same, except the user isn't required to refactor the code manually or run the tests.

```
Mock data  ────>  Code  ────>  Output × Tests
                   ↑              │
              AI   │              │
                   └── Error ←────┘
```

The process simplifies to: ask AI to run the tests and fix any errors until they pass.

**Critical lesson learned:** You must explicitly tell the AI it cannot modify the tests. Otherwise, it takes the easy path and just changes failing tests to pass. (This literally happened to me! 🙃)

## Prompt-Test Driven Development: The paradigm shift

Sometimes you want to test the agentic capabilities of your model. Assuming the tools are implemented correctly, you're actually testing the instructions - i.e. the prompt.

Prompt engineering is this whole new field that has emerged with LLMs. It is defined as: _"the practice of crafting specific and effective instructions, known as prompts, to guide generative AI models in producing desired outputs"_. Chip Huyen's [AI Engineering book](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) has an entire section on the topic (I highly recommend).

When testing prompts, the flow becomes:

```
Mock data  ────>  Prompt → LLM  ────>  Output × Tests
                     ↑                    │
           Improve   │                    │
           Prompt    │                    │
                     └──── Error ←────────┘
```

Your "tests" become example scenarios with expected AI behaviors:

```
Test: Customer asks "I want a refund"
Expected: AI checks return policy first
Current behavior: AI immediately offers refund

Result: ❌ FAIL
```

Your "code" is now the prompt that instructs the AI how to behave. When tests fail, you improve the prompt instead of traditional code.

## The breakthrough: Self-improving AI

The same way we removed manual refactoring from traditional TDD, we can remove the human from prompt improvement:

```
Mock data  ──>  Prompt + LLM + Tools  ───>  Output × Tests
                       ↑                           │
                    AI │                           │
                       └──── Error ←───────────────┘
```

Here's where it gets interesting: **the AI agent itself is a combination of Prompt + LLM + Tools**.

When we use the same LLM to improve the prompt as the one our agent is built on, we create a self-reinforcing loop.

<p align="center">
    <img width="900" src="/blog/2025-07-xx-is-prompt-engineering-dead-the-case-for-test-driven-ai-development_1.png" />
    <em style={{opacity: 0.9}}>Real example of me utilizing this for our production tests</em>
</p>

**Example in action:**

```
Test: Customer asks "I want a refund"

Current Prompt: "You are a helpful customer service agent".
Expected: AI checks return policy first
Current behavior: AI immediately offers refund

AI Self-Analysis:
"I failed because I offered a refund without checking policy. 
The prompt lacks specific instructions about policy verification."

AI-Generated Improvement: 
"You are a customer service agent. Always check the return 
policy before processing refund requests. If eligible, explain 
the process. If not, explain why and offer alternatives."

Test Result: ✅ PASS
```

## The elegant insight: No external execution required

The AI isn't even required to run tests using your framework. It can evaluate outcomes by examining the data directly.

Since the AI helping you improve the prompt is the same as the one in production, it can "recreate" the output you would see just by looking at the code and data. No logs required, the model can predict its own behavior.

When you show an AI:

- Current prompt
- Mock input data
- Expected output

The AI can immediately identify mismatches and generate improvements.

**The feedback loop happens entirely within the AI's reasoning process**, making iteration nearly instantaneous.

## The death of Prompt Engineering: Test Coverage as the new paradigm

Here's the revolutionary implication: **if AI can generate both comprehensive test coverage from a PRD AND the prompts to pass those tests, then manual prompt engineering becomes obsolete**.

Consider this progression:

**Manual Prompt Engineering (Current State):**

```
Human writes requirements → Human crafts prompts → Test in production → Manual debugging
```

**Test-Driven AI Development (Future State):**

```
Human writes requirements → AI generates comprehensive tests → AI generates optimal prompts → Continuous self-improvement
```

With sufficient test coverage, prompts become an automatically generated implementation detail—like compiled machine code that you never need to see or manually optimize.

**The new workflow**:

1. Define behavioral requirements through examples
2. AI generates exhaustive test scenarios covering edge cases
3. AI automatically generates and refines prompts to pass all tests
4. System continuously improves itself as new test cases are added

<br />

**Instead of asking "How do I prompt this AI?"** we ask **"How do I comprehensively test this behavior?"**

## Moving toward singularity

This is where we're approaching something unprecedented: AI that can fix itself, with humans only adding tests to guide its behavior.

The key insight: instead of retraining models with new data (expensive, slow), we can improve behavior through prompt refinement (fast, cheap, immediate).

The system can literally predict and fix its own behavior through disciplined self-reflection.

**Prompt engineering doesn't disappear—it becomes automated.**

## The control systems perspective

This reminds me of my MSc in Control Systems, where we learned that systems have poles that can be on the negative side (stable) or positive side (unstable).

The same principle applies here:

- **Stable:** AI generates genuinely better prompts → improved performance → convergence  
- **Unstable:** AI games the system → overfitting to tests → real-world failure

<br />

**Warning signs of instability:**

- Prompts becoming absurdly specific to test cases
- AI suggesting test modifications "for clarity"
- Tests passing but real-world performance degrading
<br />

**Maintaining stability:**

- Lock test cases as immutable
- Monitor real-world performance alongside test performance
- Explicitly forbid test modifications in improvement instructions

<br />

The incentive should always be to pass the tests AS THEY ARE.

## The revolutionary potential

This isn't just about better prompts—it's about creating AI systems that can debug their own reasoning processes in real-time.

We're moving toward AI that doesn't just follow instructions, but improves the instructions themselves through disciplined self-reflection.

Prompt engineering as we know it may be dead, which is scary because this is how we "control" AI.

The question is: **are we ready to let AI systems write their own prompt**, or do we still need the illusion of control that manual prompting provides?
