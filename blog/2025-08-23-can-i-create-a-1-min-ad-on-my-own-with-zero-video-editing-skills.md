---
slug: 2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills
title: Can I create a 1 min Ad on my own with zero video editing skills?
date: 2025-08-23
image: /blog/2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills
tags:
  - ai-tools
  - video-generation
  - content-creation
  - marketing
  - veo3
  - prompt-engineering
  - startup
  - openbb
description: A hands-on experiment using Google's Veo3 AI to create a professional 1-minute video ad with zero video editing experience. Covers the complete workflow from script writing using the Hero's Journey framework to JSON-structured prompting techniques that unlock better AI video generation results.
hideSidebar: true
---

<p align="center">
    <img width="600" src="/blog/2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills.png" />
</p>

A hands-on experiment using Google's Veo3 AI to create a professional 1-minute video ad with zero video editing experience. Covers the complete workflow from script writing using the Hero's Journey framework to JSON-structured prompting techniques that unlock better AI video generation results.

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

It all started with this Kalshi AI Ad that went viral.

<div className="flex place-items-center justify-center items-center rounded-sm mx-auto">
    <iframe
        src="https://www.youtube.com/embed/mzXFURkcCt4?si=TyLHBw1QX8l2KFNA"
        width="800"
        height="400"
    />
</div>

<br />

When I saw this AI-generated ad, my thought was: "_Wtf. There’s no way this was solely done using AI._”

Then I saw a lot of people on X sharing their Veo-3 AI-generated clips, and I was like: “_hmmm, maybe it is possible_”.

## The script

Between dog walks and daily routines, I found myself sketching out ideas for what would become an AI-generated video to announce OpenBB’s position as a counterpoint to legacy workspace infrastructure.

This would be a cinematic short film about the transformation of financial infrastructure and the rise of OpenBB.

I iterated on this script on my own in terms of what I wanted for it to happen at a very high level, in order to invoke emotion to the audience - in order to do that, I followed the typical Hero journey framework.

Here’s a brief description of what I ended up with at a very high level.

- **The ordinary world**: The legacy financial office with tired analysts in gray suits. Repetitive, robotic work on outdated CRT terminals. This establishes the mundane, oppressive status quo.

- **The call to adventure (opening)**: The young analyst pauses and closes their screen. The moment of questioning: "What if we started over?". The frosted-glass door labeled "UNLOCKED" literally represents the call.

- **Crossing the threshold (transition)**: Walking through the "UNLOCKED" door. The flood of light as they enter the futuristic workspace. It symbolizes leaving the old world behind. Launching OpenBB is the point of no return.

- **Tests and allies**: Other analysts join the journey (allies). Each person transforms into their unique self (rejecting uniformity). The collaborative work represents the tests - learning new ways to work. The AI agent becomes a supernatural aid/mentor figure.

- **The Ordeal (system collapse)**: The legacy system crashes ("INTERNAL ERROR"). This is the death/destruction of the old world. The moment of greatest crisis for those still trapped.

- **The revelation/reward (digital dissolution)**: The walls literally dissolve, revealing the truth. The massive Hub represents the reward/treasure. "This isn't an upgrade. This is a migration" - the wisdom gained.

- **The return**: The black void and logo emergence. Sharing the message with the world: "WE DON'T SELL DATA. WE SELL FREEDOM.". "The financial industry isn't rebooting" - bringing this knowledge back to transform society.

Then I had ChatGPT help me decompose this into different scenes. 

Also bear in mind that these AI video models are trained to output 8s videos, so I wanted to try to have each scene not taking longer than that. At least the core of it - as it’s hard to preserve scene styles between 8s clip.

Although the “extend” feature on Google’s Flow was better than what I hoped for. More on this later.

## Flow - Veo3

I first went to Google AI Studio, to the Generate Media section and tried to paste one the scenes text I had.

Although it was free, the output was pretty disappointing and that’s when I noticed that this was Veo2, and not Veo3 - the model that everyone was raving about on X.

Then I tried to upgrade to Veo3 - but in the typical Google manner - I couldn’t. Ultimately I found it in Google DeepMind platform which pointed me to try it in Flow.

I didn’t have the right subscription so I signed up to “Google AI Ultra for Business” which costed $125/mo (with a 50% discount). The estimates is that this provides around 1250 clips, which is enough, because the quality of the model is extremely impressive and there are ways to squeeze performance out of it - through prompt engineering.

<p align="center">
    <img width="600" src="/blog/2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills_1.png" />
</p>

Copy-pasting the scenes as I had them on a document produced very impressive results, but I felt like the results were very diverse among each run.

I felt like it needed more structure. Then I saw several creators mentioned that these models performed significantly better with JSON-structured inputs rather than simple text prompts.

So I copied the text narrative of each of the scenes and converted these into JSON.

**Example:**

<CodeBlock language="json">
{`{
    "scene and action": "A slow dolly shot glides across a rigid financial office. Identical gray cubicles house analysts in matching suits, typing robotically at CRT-style terminals with pixelated dashboards. Close-ups reveal tired faces, blinking cursors, and a mechanical monotony. Voiceover: 'For decades, the tools of finance have remained the same. Expensive. Opaque. Inflexible. You weren’t meant to build with them. You were meant to follow.'",
    "camera angle": "center-aligned symmetry with slow dolly pans",
    "lighting": "harsh fluorescent with blue-gray tint",
    "room": "legacy financial office",
    "ratio": "16:9",
    "character": "analysts in identical gray suits, robotic behavior",
    "voice": "calm and authoritative male voice",
    "furniture": [
      "CRT monitors",
      "repetitive gray cubicles",
      "fluorescent ceiling lights"
    ],
    "action and motion": "minimal movement, robotic typing, blinking screens, fluorescent flickering",
    "keywords": [
      "legacy finance",
      "monotony",
      "rigid systems",
      "pixelated UI",
      "inflexibility"
    ]
}`}
</CodeBlock>

This level of detail gave us precise control over every aspect of the scene, and then we just had to paste it to Flow and let the model cook 🧑‍🍳.

<p align="center">
    <img width="600" src="/blog/2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills_2.png" />
</p>

That improved the quality and reproducibility significantly.

But I knew we could still get more out of it so I iterated on these prompts with ChatGPT so it would add more relevant keys: value pairs to this JSON, such as:
- Scene and action descriptions
- Camera angles and movement
- Lighting and color grading
- Character direction and emotion
- Environmental details
- Keywords for style consistency

<p align="center">
    <img width="600" src="/blog/2025-08-23-can-i-create-a-1-min-ad-on-my-own-with-zero-video-editing-skills_3.png" />
</p>

This JSON structure forced me to think about every element, which was awesome.

## Iteration

At this point I knew there was something here.

**I was - once again - mind blown by AI and what it could enable.**

There I was, never having done any video editing/film concept - being able to do something on my own in very very little time.

This is the point at which I asked help.

While I was good at the technical prompt crafting, my wife has an eye for what actually looks good on screen and so she did all the iteration after that initial work. Flow's feature allowing 4 variations per prompt was a game-changer here,  instead of generating one video and hoping for the best, she could compare options and identify what worked.

But also the Extend feature of flow which allows a scene to be based on the past ones so characters/environments aren’t lost between clips. Particularly relevant as we wanted to follow the Hero journey and for that the audience needs to develop a relationship/affinity with the hero.

Then our marketing, Rita, helped refine the copy to make it perfect- with OpenBB style all over it.

And then my wife just helped stitching things together and having audio being synced with the video.

To the final result, which you can see here:

**VIDEO HERE**

## Final thoughts

What started as a weekend curiosity turned into a legitimate short film.

The tools are there, the quality is impressive, and the barrier to entry is lower than ever. 

But perhaps most importantly, AI video generation doesn't replace human creativity – it amplifies it.

This represents more than just a technical experiment.

It's LITERAL proof that individual creators can now produce content that would have required significant budgets and teams just a few years ago.

We are definitely in a golden age. Enjoy.