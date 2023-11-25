---
slug: customizable-meme-filter
title: Customizable Meme Filter
date: 2021-06-12
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495694-b123cf98-3411-4edc-9597-7b8c6d0c7e73.png
tags: ['Python', 'Meme Filter', 'Image Processing', 'Face Recognition']
description: In this blogpost, I share my journey of creating a customizable meme filter using Python. This filter selects a random meme based on the number of people on the screen and assigns each person to a character in the meme.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280495694-b123cf98-3411-4edc-9597-7b8c6d0c7e73.png"/>
</p>

<br />

In this blogpost, I share my journey of creating a customizable meme filter using Python. This filter selects a random meme based on the number of people on the screen and assigns each person to a character in the meme.

The open source code is available [here](https://github.com/DidierRLopes/meme-filter).

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

For the people who know me, they know how much I enjoy memes. I’ve got to admit, whenever I go to museums I have a lot of fun captioning artwork as memes. **As I like to say, I go for the art, and I stay for the memes.**

One day while commuting to work (you can still see the [first commit](https://github.com/DidierRLopes/meme-filter/commit/59be427571c96350d9652922b3ab2ba52ddf18af) which dates back to 10 February of 2020 and has only notes of the sketch of this idea in Portuguese) I thought:

> “It would be funny if there was a snapchat kind of filter where given the number of people on the screen, a random meme was selected and each person would be one of its characters”.

<br />

Since I was still improving my Python skills, I thought why not do it in Python. After 1 month, I already had the working code, however, since I was switching jobs at the time my commute time reduced drastically and so did my time to work on this. It took around 1 more month to finish the cleaning up of the script (324 lines) to be more readable, and at the same time Covid happened. **The latter explains why my hair is blonde on the demo below** :)

Usage:

```console
./didifilter.py — location=memes — caption=’Which meme am I?’ — initial=30 — final=50 -b — max=3
```

![hair_1](https://github.com/DidierRLopes/my-website/assets/25267873/100b62e1-9c40-4532-af0d-bdfc7ada697e)

**To sum up:** This program is meant to be an advanced version of the known snapchat filter where there are random images spinning on top of people’s heads. The main improvement is that you can not only select the images you want to choose from and the caption, but you can also play it with friends (recognizing more than 1 face at the same time).

The best part of the script is that it is meant to be easily customizable. Any person is able to create their own filter by creating a folder with the images they want within a folder with 1, 2, … based on the number of people they are meant to be used (apart from when backwardCompatible flag is enabled), and select/specify different types of flags/parameters, e.g.:

```console
./didifilter.py — locationFolder=celebrities — caption=’What celeb am I?’ — max=2 -v — video=”exampleVideo”
```

```console
./didifilter.py --locationFolder=pokemons --caption="Who's this pokemon?" --width=250 --height=150 --max=1 -p
```

**AND**, you can also quickly tweak the code to adapt it to do something else. Here’s me **pranking** my girlfriend with a psyduck when the query was: “_Who do I look like?_”

![hair_2](https://github.com/DidierRLopes/my-website/assets/25267873/826e8bdc-39b9-4db0-a4f4-f94178d4c746)

Hope you have a nice read and enjoy the filter. You can find the code [here](https://github.com/DidierRLopes/meme-filter).

Feel free to provide feedback, as always!
