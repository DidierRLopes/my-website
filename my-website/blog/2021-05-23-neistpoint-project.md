---
slug: neistpoint-project
title: NeistPoint Project
date: 2021-05-23
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495631-c2282aa1-115e-451f-b0c0-af1351936c37.png
tags: ['NeistPoint', 'Clothing Brand', 'Sustainability', 'Project Management', 'C++', 'Stock Management']
description: In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495631-c2282aa1-115e-451f-b0c0-af1351936c37.png"/>
</p>

<br />

In this blogpost, I share my journey of starting a sustainable clothing brand, managing the project, and developing a stock management tool in C++.

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

More than 2 years ago, me and some friends started a clothing brand - NeistPoint. The logo and name is inspired by the Neist Point Lighthouse in the Isle of Skye. The motto was “For a greener future and a bluer ocean”, and the goal was to raise awareness to contribute for a sustainable environment.

![image](https://github.com/Meg1211/my-website/assets/88618738/c2282aa1-115e-451f-b0c0-af1351936c37)

At Neist, we tried to not be yet another clothing brand, but actually to fill the current gap in the retail industry by producing high-quality, eco-friendly clothes at affordable prices. And we achieved that. For instance, our t-shirts are made of 100% organic ring-spun combed cotton, and they last longer than my Lacoste t-shirts — seriously.

The problem is that to be profitable, you need to either increase the prices of your products, or decrease the quality, which were not things we wanted to do since they didn’t represent the value of our brand. Due to that, and the fact that the team behind our brand no longer has time/resources, we’re dropping our last ever season now.

Anyway, no regrets from my side, it has been a great learning experience to understand what is involved around the creation of a brand, being a project manager internally, and doing something other than coding in my spare time. Also, most importantly, ending up with a full new wardrobe of pieces that I love and that will probably last for my kids.

Sorry for this rambling, just wanted to share this context with everyone.

Given that our team had no experience in clothing whatsoever, and based on our needs, our steps to make this a high-quality product were:
1) Get the best (environmentaly friendly) clothing material
2) Send it to the best embroidery store in Portugal
3) Package it and forward it onto the customer

![image](https://github.com/Meg1211/my-website/assets/88618738/d614045b-39b0-408a-bbd8-11006c55efc5)

This process was far from being optimised. In fact, pretty much everything was manual. Apart from the creation of the clothes. Therefore, we needed a Software to keep track of the products at each of it’s stages: material to request, material shipping, material in stock, product to create, product creating, product in stock, and product sent.

Since I didn’t find anything that I liked online, and I knew how to code, I thought the best solution was to develop something myself. This way it could be adapted to perfectly fit my own requirements (advantages of being your own product owner eheh). In addition, I wanted to improve my C++ skills, so I thought, why not?

![image](https://github.com/Meg1211/my-website/assets/88618738/e0dd7c35-d7f4-4175-a80e-be881ff03141)

For 1 week or so, during my commute I worked on the NeistPoint Stock Management tool. To be honest, I think it took longer to devise the architecture behind it than to actually write the code, as there were lots of things that I wanted to be taken into account. Also, the fact that the “database” is a .csv file, was intentional. This way, we could share this file between the team members.

Hope someone finds this tool interesting, and gets inspired to develop their own software to meet their own project requirements. In the meantime, feel free to check us one last time on our website or instagram. You may even spot me in some of the pictures!

The repository for the code can be found here: https://github.com/DidierRLopes/NeistpointCLI

Thanks for reading, as always!
