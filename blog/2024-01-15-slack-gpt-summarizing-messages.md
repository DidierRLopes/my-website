---
slug: slack-gpt-summarizing-messages
title: SlackGPT - Your Slack bot that summarizes unread messages
date: 2024-01-15
image: /blog/2024-01-15-slack-gpt-summarizing-messages.png
tags: ['slack', 'slackgpt', 'llm', 'summarization', 'open source', 'bot']
description: The SlackGPT is a Slack bot that summarizes conversations and sends you a summary per channel.
---

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages.png"/>
</p>

<br />

The SlackGPT is a Slack bot that summarizes conversations and sends you a summary per channel.

The open source code is available [here](https://github.com/DidierRLopes/slackGPT).

<!-- truncate -->

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Context

Saw someone the other day tweeting that it would be great if there was a SlackGPT that could summarize all the Slack messages for when they wake up.

And I immediately related to that. We are a team of 20, and I'm the only one in SF. So when I wake up, most of the team is already half a day in or has just wrapped up.

That means that I always spend the first 30 minutes of the day reading messages to catch-up on everything.

And tonight felt like hacking something quick.

So I created a script that:

* Reads all Slack messages from the time I go to bed
* Summarizes the conversation of each channel
* The bot sends me a message with this summary

## Getting Started

Clone the open source project [here](https://github.com/DidierRLopes/slackGPT).

### Slack API

1. Go to [Slack API page](https://api.slack.com/apps) and create a new app.

2. Install the app in the workspace you are interested in summarizing Slack messages.

3. Get the User OAuth Token which exists in the Install App settings. This will be needed to use Slack's SDK. Set this value as the `SLACK_TOKEN` on a `.env` file if you want to run the script locally or as a GitHub secret if you want to leverage the GitHub workflow.

<br />

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_1.png"/>
</p>

4. Create a **Webhook URL** for your channel so that you can receive messages' summary. Set this value as the `SLACK_WEBHOOK_URL`` on a `.env` file if you want to run the script locally or as a GitHub secret if you want to leverage the GitHub workflow.

5. Depending on the type of access needed, different **User Token Scopes** need to be set. Here's the methods that we will need and the associated user token scopes.
    - conversations_history: This method retrieves a conversation's history of messages and events. It requires the **channels:history** scope for public channels, or **groups:history** for private channels and im:history for direct messages.

    - users_info: This method returns information about a user. It requires the **users:read** scope.

    - conversations_info: This method retrieves information about a conversation. It requires the **channels:read** scope for public channels, or **groups:read** for private channels and im:read for direct messages.

<br />

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_2.png"/>
</p>

### OpenAI API

Go to [OpenAI API page](https://platform.openai.com/api-keys) to extract the API key. Set this value as the `OPENAI_API_KEY` on a `.env` file if you want to run the script locally or as a GitHub secret if you want to leverage the GitHub workflow.

<br />

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_3.png"/>
</p>

### Slack channels

Get the Channel IDs that you are interested in reading messages from.

Set those values as the `SLACK_CHANNEL_IDS` on a `.env` file if you want to run the script locally or as a GitHub secret if you want to leverage the GitHub workflow. If you want to read from multiple channels you can set `SLACK_CHANNEL_IDS` with multiple IDs separated by commas (with no space), e.g. ABC123,DEF456,GHI789.

<br />

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_4.png"/>
</p>

### Running

After you fork the project [here](https://github.com/DidierRLopes/slackGPT), there are 2 ways you can run the code.

1. Ad-hoc by running the python script with `python slackgpt.py`

2. Automatically, by leveraging GitHub actions. For this you will need to set up GitHub secrets and you can modify [this workflow](https://github.com/DidierRLopes/slackGPT/blob/main/.github/workflows/main.yml) in order to change the frequency of the messages sumary. 

The most important part of this script is the `cron: '0 8 * * 1-5'` which specifies the frequency. In this case, the expression means that the task will run at 8:00 AM from Monday to Friday, and breaks down as follows:

- 0: Specifies the minute when the task will run (in this case, 0 minutes).

- 8: Specifies the hour when the task will run (in this case, 8 AM).

- *: Represents any day of the month, meaning the task is not restricted to a specific day.

- *: Represents any month, meaning the task is not restricted to a specific month.

- 1-5: Specifies the days of the week when the task will run (Monday to Friday).

## Results

By inputting the following text on the Slack channel of my choice:

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_5.png"/>
</p>

The SlackGPT summarized it as follows:

<p align="center">
    <img width="600" src="/blog/2024-01-15-slack-gpt-summarizing-messages_6.png"/>
</p>

