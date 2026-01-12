---
slug: minion-recipes-program
title: Minion Recipes Program
date: 2021-07-23
image: /blog/2021-07-23-minion-recipes-program.webp
tags:
- python
- programming
- recipes
- software-development
description: In this blogpost, I share how I developed a program to help my mum manage her recipes. The program allows for adding, editing, and removing recipes, and even includes fun minion icons.
---




<p align="center">
    <img width="600" src="/blog/2021-07-23-minion-recipes-program.webp"/>
</p>

<br />

In this blogpost, I share how I developed a program to help my mum manage her recipes. The program allows for adding, editing, and removing recipes, and even includes fun minion icons.

The open source code is available [here](https://github.com/DidierRLopes/RecipesProgram).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Once I developed the [Housebills program](/blog/household-bills-program), I really enjoyed the feeling of being able to create usable software from scratch. Therefore, that year during Christmas, I wanted to challenge myself to see if I could find any interesting project to do in only 1 week.

I started by nagging my dad and brother for them to tell me something that would be useful to them in their daily lives. Sadly, none of them had any idea. Then, I went to the kitchen to ask my mum the same. She was busy searching recipes for xmas on her messy notebook, so she also said no.

I sat there next to her thinking about what I could do, while she kept on going back and forth in her notebook searching. I don’t know if she had been reading about the binary search algorithm, or if she was just opening pages randomly. What I know is that 1 week later I did a program for her to keep her recipes. Safe to say that I saved Christmas, I guess.

Note: Before the end of that year, I still upgraded the software for its version 2.0, which included more than 20 minion icons. To this day, I think she opens the program to see the minion icons more than the recipes themselves.

Below it displays the interfaces used, and these correspond to: Red-Visualize; Add; Blue-Add; Green-Edit; and Yellow-Remove recipes.

![image](/blog/2021-07-23-minion-recipes-program_1.webp)

PS: Any resemblance with the Microsoft colour scheme is pure coincidence eheh.

When adding a recipe, the following window will be displayed.

![image](/blog/2021-07-23-minion-recipes-program_2.webp)

This allows you to add both a recipe, and a category (i.e. the “Tiramisu” recipe would be within “Desserts” category).

The recipe content would include:

- Name of the recipe
- Ingredients
- Preparation
- Comment

When visualising a recipe, the following window will be displayed.

![image](/blog/2021-07-23-minion-recipes-program_3.webp)

Where the recipe dialog box would prompt the recipes based on the category chosen on its left. Then, after selecting a recipe, the ingredients, preparation and comment would be filled out.

When editing a recipe, the following window will be displayed. This is similar to the visualisation window, with the difference that the text boxes are editable, and therefore, the recipe can be improved.

![image](/blog/2021-07-23-minion-recipes-program_4.webp)

Note: throughout the program there are Message Dialog boxes (as shown above) that tell the user whether the recipe has been successfully (or not) edited, added or removed.

Finally, in order to remove a recipe, the following window would be displayed. Where you can either delete a single recipe, or the entire category.

![image](/blog/2021-07-23-minion-recipes-program_5.webp)

The recipe database is handled in the most robust way: **with plain text files**, obviously.

As always, hope you had a nice read.
