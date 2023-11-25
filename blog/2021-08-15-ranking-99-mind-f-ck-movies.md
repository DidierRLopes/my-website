---
slug: ranking-99-mind-f-ck-movies
title: Ranking 99 Mind f*ck movies
date: 2021-08-15
image: https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280496558-cccaf22e-5d70-4a6d-bb80-d6b728b2d500.png
tags: ['Movies', 'Thrillers', 'IMDbPy', 'Python', 'Sorting Algorithm']
description: Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python.
---

<p align="center">
    <img width="600" src="https://github-production-user-asset-6210df.s3.amazonaws.com/88618738/280496558-cccaf22e-5d70-4a6d-bb80-d6b728b2d500.png"/>
</p>

<br />

Ranking and sorting a list of 99 mind-bending thriller movies using IMDbPy API in Python.

The open source code is available [here](https://github.com/DidierRLopes/SortMoviesPerRating).

<!-- truncate -->

<div style={{borderTop: '1px solid #21af90', margin: '1.5em 0'}} />

During the Christmas holidays, me and my girlfriend, after watching The Office [US] twice in a row, and knowing most of Dwight’s pranks off by heart, decided that it was time to find something worth watching.

Although there’s lots of tempting series out there, we didn’t want to follow that path as we don’t like the “addiction” effect that a series has. Also, we have the same taste regarding movies, where **we both enjoy complex thriller plots**, that leave your mind to resonate about them long after being done with it. Personally, I consider a movie great when it still crosses my mind when trying to sleep or the day after. So, thriller movies it was.

After doing a little research work I came across this list of movies on Reddit: [99 mind f*ck movies](https://www.reddit.com/r/coolguides/comments/geipee/99_mindfck_movies/). I knew this list was good because most of my favourite movies were there, e.g. _The Prestige, Inception, The Usual Suspects, Primal Fear_, and _Ex Machina_.

So, the movie list was decided, and with that, also our new year’s resolution.

However, this list had 2 issues:

**1. The list didn’t have any particular order.** We would like to have the list ranked from best to worst, so that watching the best ones first will keep our motivation levels up to finish the list.

**2. The movie title didn’t have the released year.** Although we don’t particularly mind old movies, sometimes we’re just not in the mood to watch a B&W screen, or poor image resolution.

Therefore, while Meg was busy, I was on a role to hack something that would both sort the list based on IMDB ranking, and add the release years to the titles.

In a couple of minutes, I was already playing with [IMDbPy API](https://imdbpy.github.io/). This allowed me to have the sorting algorithm running in the background pretty quick. Within the hour, we already had our sorted movie list. Which I have attached below for future reference.

![image](https://github.com/Meg1211/my-website/assets/88618738/3c01a3fc-fa84-483a-98d2-7cb2edf69084)

The first movie of the list that none of us had already watched was the movie [Incendies](https://www.imdb.com/title/tt1255953/). After having watched this movie, I can already tell you that sorting out this list was worth it. Definitely mind blowing, and a great watch.

As usual, you can find the source code on my github: [SortMoviesPerRating](https://github.com/DidierRLopes/SortMoviesPerRating).

Hope you enjoyed this read!
