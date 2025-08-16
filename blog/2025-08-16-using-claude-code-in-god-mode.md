---
slug: 2025-08-16-using-claude-code-in-god-mode
title: Using Claude Code in God Mode
date: 2025-08-16
image: /blog/2025-08-16-using-claude-code-in-god-mode
tags:
  - claude-code
  - anthropic
  - dictation
  - ai
  - coding
description: Learn how to squeeze performance out of Claude Code.
hideSidebar: true
---

Learn how to squeeze performance out of Claude Code.

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Brief demo of how I use Claude Code.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/E9Q6le-ahaA?si=bUizX39byP5NpFLy"
        width="800"
        height="400"
    />
</div>

<br />

Below you will find the step-by-step guide on how to get here.

## Get started with Claude Code

Install Claude Code.

```
npm install -g @anthropic-ai/claude-code
```

Then run claude in your project of choice:

```
claude
```

It’s that easy. (documentation <a href="https://docs.anthropic.com/en/docs/claude-code/setup" target="_blank">here</a>)

## A. Set up CLAUDE.md

1. Go to the project of interest, and run claude in the terminal there.

<br />

When it is open, run:

```
init
```

Claude will then analyze your codebase in that folder and create a `CLAUDE.md` file that Claude will take into account every time you are working with it.

<p align="center">
    <img width="600" src="/blog/2025-08-16-using-claude-code-in-god-mode_1.png" />
</p>

2. Tweak CLAUDE.md to fit your needs.

<br />

Here’s my recommendation - leave CLAUDE.md as is at the start. As you get more familiar with claude you will understand what you like, but **more importantly**, what you dislike about it.

Here’s where I landed with "my" preferences. (Open source repo <a href="https://github.com/DidierRLopes/CLAUDE.md/blob/main/README.md" target="_blank">here</a>)


```
## 1. Global scope & boundaries

- NEVER run any linters unless explicitly asked.
- NEVER write unit tests unless explicitly asked.
- NEVER refactor code that is outside the scope of the request.
- NEVER run the build; I will run it locally.

## 2. Alignment before starting

- Restate my goal in your own words.
- List unknowns and ask clarifying questions until the request is unambiguous.
- Wait for my confirmation before proceeding.

## 3. Implementation Planning

### 3.1 Plan of attack

- Create a step-by-step plan with small, verifiable commits.
- Include a rollback plan.
- Wait for my go-ahead before writing code.

### 3.2 Change surface

- List all files you expect to modify.
- If you are going to add 1 or more new files ask me permission to do so and explain what is the purpose of each of the files created. And why you couldn't use the others available.
- If you are going to delete 1 or more files ask me permission to do so and tell me what the file used to do and why you want to get rid of it.

### 3.3 Edge cases list

- Enumerate edge cases, failure modes, and concurrency/race concerns.
- State how each will be handled.

### 3.4 Testing strategy

- Assume I will run tests/builds. Do not run the build.
- Add lightweight debug hooks (console.log or equivalent) at key points so I can verify behavior quickly.
- Outline what to test and expected outputs, but only include actual tests if I explicitly ask.

### 3.5 Reuse before rebuild

- Identify existing utilities/hooks/services to reuse.
- If introducing a new abstraction, justify why reuse isn’t sufficient.

### 3.6 MVP first (divide to conquer)

- Propose a simplistic first pass to validate direction (minimal interface, happy path).
- Plan the follow-up phases to complete the full implementation after MVP is confirmed.

## 4. Step phased plan (detailed prompt)

Use the agreed Design/PRD, that we iterated together, as the single source of truth. Before coding, produce a 5–8 step phased plan. Each phase specifies goals, files to touch, and, when helpful, tiny code diffs/pseudocode (<15 lines). Keep phases minimal, shippable, and verifiable.

Deliverables before coding:
- a. Goal restatement & acceptance criteria.
- b. Repo scan & reuse targets.
- c. Implementation plan (5–8 phases) with file changes and small diffs.
- d. Testing strategy with debug logs I can use.
- e. Risks & rollback.
- f. Clarifying questions if any ambiguity remains.

## 5. Code Style & Comments

- Avoid line-by-line comments.
- Comment only where logic is non-obvious.

## 6. During Execution

- If blocked or uncertain, stop and present 2–3 options with pros/cons; confirm before proceeding.
- Stick to the plan and scope; confirm any scope expansion first.
- Keep diffs small and mapped to phases; include the debug logs defined in 3.4.
```

One of the reasons for which it’s important to have such an extensive/detailed prompt is that is VERY easy (I cannot emphasis this enough) to get stuck in a loop.

The amount of times I had to `git restore` or `git stash` and start from scratch is mind blowing. And it happened every single time when I was being too optimistic about Claude being able to one-shot a feature.

<p align="center">
    <img width="600" src="/blog/2025-08-16-using-claude-code-in-god-mode_2.png" />
</p>

Like this lol

The problem with these is that you get a false sense of progress, but you just start digging more and more. And at some point you will realize that you are better to start off from the start. At that time you are maybe like 5/6 prompts in with 8 files modified and a LOT of tokens that went to waste.

A better prompt will not only save you the tokens, but save you the time. It’s worth editing to reflect your goals.

## B. Add notifications for when Claude Code finishes

1. Create a notifier script. Open the Terminal and run:

<br />

```
mkdir -p ~/.claude/scripts

cat > ~/.claude/scripts/notify-end.sh <<'SH'
#!/usr/bin/env bash
# Minimal, dependency-free notification
# Shows a macOS banner + plays a short sound.

TITLE="Claude Code"
MESSAGE="Task complete"

# macOS banner with sound
osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"Glass\""

# Extra: play sound explicitly in case banners are muted
afplay /System/Library/Sounds/Glass.aiff >/dev/null 2>&1 &
SH

chmod +x ~/.claude/scripts/notify-end.sh
```

2. Add a global Claude Code global config. Run this in the terminal:

<br />

```
mkdir -p ~/.claude
```

3. Add the Stop hook in Claude Code’s CLI config - `~/.claude/settings.json`.

Create this minimal file or edit the existing one by merging the "hooks" block correctly:

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "bash ~/.claude/scripts/notify-end.sh" }
        ]
      }
    ]
  }
}
```

4. Test that it works on the terminal.

<br />

```
bash ~/.claude/scripts/notify-end.sh
```

## C. Tips & Tricks

### Compact mode sucks

My experience with /compact is not great at all. The performance drops drastically when that occurs.

Claude code displays: _“Context left until auto-compact: n%”_

My suggestion is that when that number is 10% or less, you ask for Claude to give you a summary of everything that happened up until that point and what are the next steps, without doing any code change.

Then you can copy that. Close that CC window. Open a new CC and paste that.

This allows you to be able to edit the content and have more control over what compact is doing under the hood.

### MCP Server

Don’t be scared to add MCP Servers that make your life easier.

It’s extremely easy to add an MCP Server - it just depends on where the context you want to enhance CC is. Most of the times I just copy-paste the text from either Confluence, a Slack conversation or I drop a voice note (more on this in a second).

But sometimes having an MCP Server can make your life easier, as it enables you to do things where copy-pasting isn’t really an option.

E.g. my favorite is Figma MCP Server - I wrote a post about it <a href="https://didierlopes.com/blog/2025-06-10-how-i-connected-figma-to-cursor-using-mcp/" target="_blank" rel="noopener noreferrer">here</a>. But you can also use browser-tool or puppeteer to have access to the browser and iterate more autonomously.

### Annoying 00~ and 01~ copy paste bug

There’s a <a href="https://github.com/anthropics/claude-code/issues/3134" target="_blank" rel="noopener noreferrer">known bug</a> when launching and exiting Claude Code, it corrupts terminal paste functionality. All subsequent paste operations are prefixed with 00~ and suffixed with 01~. Like this:

<p align="center">
    <img width="600" src="/blog/2025-08-16-using-claude-code-in-god-mode_3.png" />
</p>

I usually just type type `reset` in the terminal and that fixes it.

## D. Speech-to-text

This is a crazy unlock. We are so much faster at speaking than typing.

To be faster at typing than speaking, you generally need to type around 150 words per minute (WPM) or faster. To put this into perspective, an average person types around 40 WPM, and an experienced programmer between 50-75 WPM.

My speed is usually just above 100 WPM (you can test your speed here: https://10fastfingers.com/typing-test/english).

So what I did was enable dictation on Macbook, and set the shortcut for it to be pressing control key twice (and then control once to stop).

<p align="center">
    <img width="600" src="/blog/2025-08-16-using-claude-code-in-god-mode_4.png" />
</p>

And it’s awesome - it allows me to dump a bunch of information extremely fast.

## Appendix

While this allows me to be productive, it also gets the team to start petitions like this 🤣

<p align="center">
    <img width="600" src="/blog/2025-08-16-using-claude-code-in-god-mode_5.png" />
</p>
