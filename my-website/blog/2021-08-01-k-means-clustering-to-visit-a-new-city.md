---
slug: k-means-clustering-to-visit-a-new-city
title: K-means algorithm to visit a new city
authors: didier
date: 2021-08-01
image: https://github.com/Meg1211/my-website/assets/88618738/1085caea-fe72-439a-ba05-b0f6d5883719
tags: []
---

description

<!-- truncate -->

https://github.com/DidierRLopes/LondonVisit

Usually when I book a weekend getaway, I spend quite some time doing 2 things:

- Writing down the main attractions I want to see
- Depicting the travel path to maximise efficiency and see the most in less time (I’m a bit of an efficiency freak myself, sorry)

**This repository aims to decide which attractions to visit in London as a function of the number of days that you will be visiting, by applying K-means algorithm.**

As input you need to give the GPS coordinates of the main attractions you want to visit during your stay, and the number of days you are planning to visit. Notice that attractions that are not within the map screenshot boundaries will be discarded. See disclaimer below.

The K-means algorithm will interpret: List of GPS coordinates of the main attractions that you want to visit as 2D samples, after converting to UTM. Number of days of the visit as Number of clusters.

Of course, this is rather unrealistic because of several reasons, such as:

- Not taking into account if they want to just pass by the London Eye, or have a ride on it;
- Assumes that we are in a no man’s land since it completely bypasses the existence of other buildings, roads, …;
- Does not consider altitude, even though London is rather plane;
- Does not consider the number of attractions that one can possibly do per day;
- Plus, if there was to be an attraction really far from the centre, **it may happen that the algorithm considers an entire day for it (this would depend upon kernel initialisation)**

Nonetheless, I think this is a funny exercise, and if I were to select the areas to visit by myself, it would most likely be a similar choice to the one taken by K-means.

Disclaimer: I did not know how to use Google API (neither wanted to pay for a key to be fair) hence I just took a screenshot of google maps and wrote down the coordinate of the lower left corner, so that I could use it as my origin. I also took the right top corner coordinate so that I could give the map with an “accurate” scaling.

Note: GPS coordinates (latitude, longitude) have degrees has units, thus, explaining why the conversion to UTM coordinates, which uses meters.

Immediately below you can see the result of a visit to London for 2, 3 and 4 days.

![image](https://github.com/Meg1211/my-website/assets/88618738/1085caea-fe72-439a-ba05-b0f6d5883719)

This project was done for fun. However, I believe that by creating a tuple per location with coordinates and estimate of time taken on each attraction, something nice could come out of this.

Hope you find this interesting.

Let me know your thoughts.
