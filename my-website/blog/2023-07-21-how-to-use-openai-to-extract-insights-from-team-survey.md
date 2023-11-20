---
slug: how-to-use-openai-to-extract-insights-from-team-survey
title: How to Use OpenAI to Extract Insights from Team Survey
authors: didier
date: 2023-07-21
image: https://github.com/Meg1211/my-website/assets/88618738/a80c7f1b-f119-4a33-83e3-8eb5aa10e6f2
tags: []
---

description

<!-- truncate -->

![image](https://github.com/Meg1211/my-website/assets/88618738/a80c7f1b-f119-4a33-83e3-8eb5aa10e6f2)

## Motivation

I’ve been wanting to play with the OpenAI API for a while, but I’ve had higher priority tasks. Yesterday (4th of July), I thought that I could use the day to do this, but I didn’t want to just try it in a notebook. Instead, I wanted to use it in a real project that could save me time.

Last week, I posted about how at OpenBB we have developed a monthly team survey and automated the process of requesting information through Slack and Airtable. You can find more on that post here.

![image](https://github.com/Meg1211/my-website/assets/88618738/e1c2c71d-6a6b-4c3b-a0ca-28e848e78e7a)

This made me think that even though I have access to all this data, which OpenBB has fully available here, I still have to spend some time looking at the data to extract insights.

What if I could automate that analysis using OpenAI? This is what I set out to build, and this post will focus on how I went from idea to implementation.

## Requirements

I already had a notebook that I used to analyze our Airtable data with our team survey in it. However, that analysis was quite “heavy,” and it was not straightforward to extract insights. Thus, one of the requirements was to use OpenAI to analyze the team survey feedback for the current month and highlight anything worth mentioning. Additionally, I wanted to compare the team’s experience to the prior month to understand if we were improving or not, and identify areas for further improvement. Finally, based on these insights, I wanted OpenAI to suggest what OpenBB, as a company, could do to improve our culture.

To achieve this using an OpenAI model, I could either export the team survey responses from Airtable in CSV and copy-paste them into ChatGPT, or I could automate the data retrieval using the Airtable API. Being an engineer, why would I do something in 5 minutes when I can spend 1 day automating it? 🤣

Lastly, I didn’t want to run this script and have to copy-paste the output into our Slack group so that everyone on the team could have access to the overall analysis and provide feedback/suggestions. Therefore, I would like to have a Slack integration that sends the output in a specific formatted way to our Slack channel.

So, the idea is as follows:

1. Retrieve team feedback responses from Airtable
2. Extract insights from the team survey data using OpenAI
3. Send the insights output to the OpenBB Slack channel

## Implementation

**Slack API**

First of all, I went to the Slack API page. There, I created an app named “Employee Voice” and selected the “OpenBB” workspace, as shown below:

![image](https://github.com/Meg1211/my-website/assets/88618738/d2d88e11-f81b-472f-b073-0aa195e7d9d6)

After clicking “Create App,” I proceeded to update the display information.

![image](https://github.com/Meg1211/my-website/assets/88618738/e11533e2-424c-4828-b520-3e5235cc69fb)

Then I go into “Incoming Webhooks” and select the channel I’m interested in posting messages to. That should be all the settings you need to configure for your app.

![image](https://github.com/Meg1211/my-website/assets/88618738/ed08fcb7-43d7-4510-b43d-13606bcd5d1d)

The webhook URL will be necessary, so I copied it and added it to the following script. For the channel name, I used my personal name, “Didier Lopes”, since I was just testing if it worked. As for the message, I used the infamous “Hello World” text.

Here is a sample that you can use to test whether you can successfully send yourself a direct message using the Slack API.

    SLACK_WEBHOOK_URL=<Webhook URL mentioned above>
    
    insight="Hello World"
    
    payload = {
        'text': insight,
    }
    
    req = Request(SLACK_WEBHOOK_URL, json.dumps(payload).encode('utf-8'))
    try:
        response = urlopen(req)
        response.read()
        
        print("SUCCESS: Message with insights sent to slack\n")
    except HTTPError as e:
        print(f"Request failed: {e.code} {e.reason}\n")
    except URLError as e:
        print(f"Server connection failed: {e.reason}\n")

**Airtable API**

At OpenBB, we are using Airtable to automate the monthly team survey questionnaire and store the associated data. I wrote more about that process in the blog post below:

https://dro-lopes.medium.com/how-to-use-openai-to-extract-insights-from-team-survey-7f0d273a3978#:~:text=Employees%20are%20leaving,lopes.medium.com

Now, I want to have programmatic access to this data.

Firstly, I need to obtain the Airtable API key, which you can get from the Airtable Developer Hub. Secondly, I navigate to Airtable and locate the table that contains the data of interest, as shown below:

![image](https://github.com/Meg1211/my-website/assets/88618738/91b2ac4a-d18a-4083-a422-bb9c85a3ae8c)

The name of the table, “OpenBB_monthly”, corresponds to the “TABLE NAME” that will be necessary. Additionally, when you are on this table view, your URL will have the following format: https://airtable.com/XXX. That XXX is your “BASE ID,” which will be the final element necessary to retrieve data from Airtable.

Next, run the following script to ensure that you have access to this data.

    AIRTABLE_API_KEY=<Located in Airtable Developer Hub>
    AIRTABLE_BASE_ID=<Located in URL when accessing data>
    AIRTABLE_TABLE_NAME="OpenBB_monthly"
    
    response = requests.get(
        url=f'https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{AIRTABLE_TABLE_NAME}',
        headers={'Authorization': f'Bearer {AIRTABLE_API_KEY}'}
    )
    
    Check if the data has been loaded correctly
    if response.status_code == 200:
        data = response.json()["records"]
    else:
        print(f"Error: {response.status_code}")
    
    print(data)

## OpenAI API

Finally, go to OpenAI Developer platform and grab your OpenAI API key.

![image](https://github.com/Meg1211/my-website/assets/88618738/e6e9b5b8-cb5e-4c34-aabb-2027c1f67ad1)

Once you have that, you are pretty much ready to test whether this works or not. In this case, we assume you have access to the data from Airtable, so you can test if the OpenAI code is set up correctly with the following:

    data_previous_month=<dataframe with raw survey data from previous month>
    data_current_month=<dataframe with raw survey data from current month>
    current_month=<current month date>
    
    openai.api_key=<Located in OpenAI Developer platform>
    response = openai.ChatCompletion.create(
    model="gpt-4",  # you can use a different model
    messages=[
            {"role": "system", "content": "You are a Chief of Staff with a MSc. in Data analysis and are trying to improve the culture of the company."},
            {"role": "user", 
            "content": 
                f"""
        This table represents the company survey for the previous month: {data_previous_month}
    
        This table represents the company survey for this month: {data_current_month}.
    
        Based on this data, can you do 3 things:
        
        1. Summarize main differences since last month
        2. Summarize main highlights for current month
        3. Create suggestions for what could be done to improve those areas
        
        Please use the following format for the output:
            As the title use the following: Insights from team survey in {current_month}.
            Follow the title by 2 line breaks.
            Use bullet points within each of the points mentioned above.
            Between the 3 points, use 1 line breaks, a line with ----------------------- and another line break.
            Use `` when referring to a component like `Reward` or `Growth`.
            Do not use asterisks '*' or '**'.
            When referring to to Engineering or Product, Marketing, Design, Finance wrap them around asterisk, e.g. _Engineering_.
                """
            },
        ]
    )
    
    print(response.choices[0].message.content)

## Glue it together!

Once you have the scripts, merging them is straightforward. I will show you what the input vs. output looks like.

Here is OpenBB’s team survey data from June of 2023:

![image](https://github.com/Meg1211/my-website/assets/88618738/cfadfada-6841-4f21-8cbe-689761aa1333)

If I run the script here, as shown below (yes, you guessed it right — I open-sourced this project as usual. I hope you and your team find it useful):

    $ python extract_insights_from_last_team_survey.py

This is the expected output if the script runs successfully.

    Loading environment variables...
    Loading team survey data from Airtable...
    Processing data from Airtable...
    Extracting insights from team survey data...
    Sending insights to Slack through a message...
    SUCCESS: Message with insights sent to slack

![image](https://github.com/Meg1211/my-website/assets/88618738/17871455-02b0-4b30-867a-2b9efdd97b15)

## There’s more!

We’re almost there! It doesn’t make sense for us to manually run this script every month. Plus, software engineers are known for their laziness (which is actually a virtue of a great programmer), so let’s create a GitHub action to automate this process.

To begin, create a file called “main.yml” in the “.github/workflows” directory. This workflow will be divided into three main sections:

**“When”** — Specifies when this GitHub action should run.

    on:
      push:
        branches:
          - main
      schedule:
        - cron: '0 0 3 * *'

The first section, “on: push: branches: [main],” means that whenever there is a code push to the “main” branch, this workflow will be triggered. This feature allows us to quickly test whether the action is functioning as expected.

The “schedule-cron” makes it so that the yaml gets run at a specific dates and times.

**Pre-requirements** — What do we need in advance for this to work?

    env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
      OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
      AIRTABLE_API_KEY: ${{ secrets.AIRTABLE_API_KEY }}
      AIRTABLE_BASE_ID: ${{ secrets.AIRTABLE_BASE_ID }}
      AIRTABLE_TABLE_NAME: ${{ secrets.AIRTABLE_TABLE_NAME }}

All of these variables need to be set as action secrets. You can do this by selecting the “Settings” tab above, then going into “Scripts and variables,” and selecting “New repository secret.” Fill in the information accordingly, as shown below:

![image](https://github.com/Meg1211/my-website/assets/88618738/b0f054a3-4b55-47ac-a34a-678b7edbed86)

What: What commands are we running with this GitHub action? In our case, these are the ones we are interested in.

    jobs:
      build:
        runs-on: ubuntu-latest
    
        steps:
          - name: checkout repo content
            uses: actions/checkout@v2
    
          - name: setup python
            uses: actions/setup-python@v2
            with:
              python-version: 3.9
    
          - name: install python packages
            run: |
              python -m pip install --upgrade pip
              pip install python-dotenv
              pip install pandas
              pip install openai
    
          - name: extract insights from team feedback
            run: |
              python extract_insights_from_last_team_survey.py

And that’s it! You now have a complete automation pipeline from employee feedback to insights within seconds.

I hope you enjoyed reading this post, and I would love to hear your feedback. Do you appreciate the level of technical detail I go into, or would you prefer less?

Any comments are very helpful. Thank you!
