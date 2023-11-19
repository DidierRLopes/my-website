---
slug: customizable-meme-filter
title: Customizable Meme Filter
authors: didier
tags: []
---

# Customizable Meme Filter

![image](https://github.com/Meg1211/my-website/assets/88618738/b123cf98-3411-4edc-9597-7b8c6d0c7e73)

For the people who know me, they know how much I enjoy memes. I’ve got to admit, whenever I go to museums I have a lot of fun captioning artwork as memes. As I like to say, I go for the art, and I stay for the memes.

One day while commuting to work (you can still see the first commit which dates back to 10 February of 2020 and has only notes of the sketch of this idea in Portuguese) I thought:

“It would be funny if there was a snapchat kind of filter where given the number of people on the screen, a random meme was selected and each person would be one of its characters”.

Since I was still improving my Python skills, I thought why not do it in Python. After 1 month, I already had the working code, however, since I was switching jobs at the time my commute time reduced drastically and so did my time to work on this. It took around 1 more month to finish the cleaning up of the script (324 lines) to be more readable, and at the same time Covid happened. The latter explains why my hair is blonde on the demo below :)

**TO DO ADD GIF**

To sum up: This program is meant to be an advanced version of the known snapchat filter where there are random images spinning on top of people’s heads. The main improvement is that you can not only select the images you want to choose from and the caption, but you can also play it with friends (recognizing more than 1 face at the same time).

The best part of the script is that it is meant to be easily customizable. Any person is able to create their own filter by creating a folder with the images they want within a folder with 1, 2, … based on the number of people they are meant to be used (apart from when backwardCompatible flag is enabled), and select/specify different types of flags/parameters, e.g.:

./didifilter.py — locationFolder=celebrities — caption=’What celeb am I?’ — max=2 -v — video=”exampleVideo”
./didifilter.py --locationFolder=pokemons --caption="Who's this pokemon?" --width=250 --height=150 --max=1 -p

AND, you can also quickly tweak the code to adapt it to do something else. Here’s me pranking my girlfriend with a psyduck when the query was: “Who do I look like?”

**TO DO ADD GIF**

Hope you have a nice read and enjoy the filter. You can find the code here.

Feel free to provide feedback, as always!
