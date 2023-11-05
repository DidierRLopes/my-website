---
slug: 5-steps-i-used-to-change-my-job-title-in-less-than-1-year
title: 5 steps I used to change my job title in less than 1 year.
authors: didier
tags: []
---

# 5 steps I used to change my job title in less than 1 year.

In March 2020, I joined a startup as an Embedded Firmware Engineer. The startup’s product focuses on smart running insoles with lightweight trackers that fit any running shoes.

The company was small, and the firmware team was myself and 2 Senior Embedded Firmware Engineers.

What I liked the most about this team was that our interests complemented each other very well. One of the Senior Embedded Firmware Engineers was very strong at wireless communications (BLE, ANT) while the other was great at communication protocols (SPI, I2C). On my end, my strength was from my MSc in Control Systems and my past experience with GNSS. In addition, I had a very high interest in learning about Inertial Navigation System (INS). My goal was to become a Sensor Fusion Engineer.

So what did I do to become a Sensor Fusion Engineer?

## 1. Declare your intent

Since day 1 in the company, my team lead knew that my goal was to become a Sensor Fusion Engineer.

This is very important, as your manager can keep this in the back of their mind when assigning tasks to you. For instance, my team lead was giving me a lot of material around the way our product processed external samples as this was critical to the INS.

## 2. Define a roadmap

I asked my manager: “What do I need to do to be recognized as a Sensor Fusion Engineer”.

Knowing about the matter is not enough, you want to have the credentials so that you can jump faster in your career.

My team lead was not aware of the capabilities I would need to have to become a Sensor Fusion Engineer, so he spent quite some time doing due diligence on this. Good managers will go out of their way to help you grow.

After some time, we discussed what I would need to do at the company to be recognized as Sensor Fusion Engineer and built a roadmap in order to get there.

## 3. Work extremely hard towards that roadmap

I was not only working towards that roadmap, but I was also working towards it at 2.5x the average speed. I was working 80h — 100h / weeks during that time.

I was being pulled into all meetings that discussed sensor fusion, I was reading old documentation to understand the decisions that I made, I was reading codebase and questioning all code (which allowed me to find some issues) and I was taking online courses on top of this.

More importantly, I was experimenting with the product. Theory will only help you so much, you need to get your hands dirty or you will never be able to fully master a skill.

## 4. Frequently revise your roadmap

Throughout all my 1:1 with my manager, we always revisited the roadmap — even if briefly. This made sure that he knew how serious I was about this topic, and allowed me to demonstrate my progress.

This also allowed myself to look back and realize my own progress. I would spend time educating him on what I had learned and how we could apply that in our product, including some simulations I had done in Python.

## 5. Don’t miss an opportunity to prove yourself

This is the most critical point, you need to prove that you are capable of delivering by actually demonstrating a real example.

This is the egg or chicken first problem. When you don’t have the initial experience, your company won’t trust you to apply your knowledge. But if your company doesn’t give you the chance you will never get the experience.

In our case, users started getting weird jumps in altitude reported by the trackers. And we needed to figure out the issue fast as this was increasing the churn. I immediately knew I was able to solve this, and knew I had to grab this opportunity.

Our trackers were not taking the GPS location in the estimation of user altitude, and I knew that considering that would substantially improve the estimation as the altitude has less chances to change drastically over a small distance.

Finally, my degree and hundreds of hours of work were paying off. That day, I wrote our C/C++ altitude estimation algorithm in Python and provided with an input that had a spurious jump in pressure readings — i.e. I recreated how the issue was happening.

I proceeded to implement a Kalman Filter solution to consider GPS readings as well, and the result was a massive improvement. The jump in altitude was non-existant now.

In the daily standup the next day, I had accomplished most of my tasks for the sprint and asked the product owner if I could take a shot at fixing the altitude issue. He was a bit hesitant, but I had a notebook ready to show the problem recreated and my proposed solution in Python.

He accepted and gave me the next 3 days to work on it and to present results on Monday. I didn’t sleep until that Monday. Implementing from Python to C++ was the easy part. The hard part was debugging + optimizing the weights of the Kalman Filter.

I was touching the code. Performing an over the air upgrade. Going outside for a run in a track with a bridge where I knew the altitude. Analyzing results at home. Iterate.

Monday arrived and I presented results, and they looked so much better. The proposed solution was accepted. Our INS algorithm hadn’t changed in a long time, so a lot of testing was needed.

After that, the company accepted to offer me the title of Sensor Fusion engineer. Without a pay rise, but that was fine as for me it was about speeding up my career.

![image](https://github.com/Meg1211/my-website/assets/88618738/fd343f2a-7508-488a-a705-a716af395bb2)

## Conclusion

TL;DR:

- Declare intent
- Define roadmap
- Work towards that roadmap
- Frequently revise roadmap
- Don’t miss an opportunity to prove yourself

Note: If the company doesn’t give you a chance to prove yourself, you should interview for that position with other companies. And if another company offers you that job, you will have the leverage that another company perceives you as that.

I like this video about understanding your market value.

https://www.youtube.com/shorts/x71Rm0MWVHY?source=post_page-----91fd796fdfd9--------------------------------

And I think it can be extended in terms of your skillset if you want to change your role.

Feedback as always is welcome :)
