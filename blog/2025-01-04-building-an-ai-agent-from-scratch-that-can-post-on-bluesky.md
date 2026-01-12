---
slug: building-an-ai-agent-from-scratch-that-can-post-on-bluesky
title: Building an AI agent from scratch that can post on bluesky
date: 2025-01-04
image: /blog/2025-01-04-building-an-ai-agent-from-scratch-that-can-post-on-bluesky.webp
tags:
- ai
- agent
- python
- open-source
- llm
- ollama
- telegram
- bluesky
- api
description: A practical guide to building an AI agent that processes Telegram messages through a local LLM, gathers context from various sources (OpenBB, Perplexity, Grok), and automatically posts content to Bluesky.
hideSidebar: true
---

<p align="center">
    <img width="900" src="/blog/2025-01-04-building-an-ai-agent-from-scratch-that-can-post-on-bluesky.webp"/>
</p>

A practical guide to building an AI agent that processes Telegram messages through a local LLM, gathers context from various sources (OpenBB, Perplexity, Grok), and automatically posts content to Bluesky.

The open source code is available [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post).

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

Over the Christmas break, I decided to explore the world of fine-tuning while assessing the quality of open-source models that can run locally. This exploration is particularly important for me, as we frequently discuss with prospects the possibility of integrating local AI agents into OpenBB to avoid reliance on third-party vendors.

To make this experiment practical and engaging, I needed a well-defined use case. My objective was straightforward: to develop an agent capable of focusing on a specific topic, gathering external information, and crafting a post to share on Bluesky triggered by myself.

<p align="center">
    <img width="600" src="/blog/2025-01-04-building-an-ai-agent-from-scratch-that-can-post-on-bluesky_1.webp"/>
</p>

This is the workflow we are looking at:

1. I send a message to my Telegram bot with the idea of what I want to post on Bluesky.
2. That message gets processed by my fine-tune agent, which runs locally.
3. That message is used to extract further context either from:
	1. OpenBB if financial information is needed.
	2. xAI if latest news from social media is needed.
	3. Perplexity if more information from the web is necessary.
4. The agent then writes a thought on the topic.
5. Then it pushes that post to Bluesky.

## Getting Started

### Environment Setup

You have a Bluesky account - like mine here:  [https://bsky.app/profile/didierlopes.com](https://bsky.app/profile/didierlopes.com).

- You will need `BLUESKY_HANDLE` and `BLUESKY_PASSWORD`.

You have a Telegram account and you have created a bot by following the steps highlighted here:  [https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token](https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token).

- You will need `TELEGRAM_BOT_TOKEN`.

You have installed Ollama and are running a model like `Llama3.2:latest` locally.

Additionally, you will need the following tokens for the agent's tools:
- `OPENBB_PAT` which you can retrieve from: https://my.openbb.co/app/platform/pat
- `PERPLEXITY_API_KEY` which you can retrieve from: https://www.perplexity.ai/settings/api
- `GROK_API_KEY` which you can retrieve from: https://console.x.ai/

### Main libraries

The bot is built using several key libraries:
- **ATProto Client**: For interacting with the Bluesky social network
- **Python-Telegram-Bot**: For handling Telegram interactions
- **Asyncio**: For handling asynchronous operations
- **OpenBB**: To access financial data
- **OpenAI**: to hit Perplexity and Grok OpenAI compatible endpoints

## Implementation

For this tutorial, I'm not going to write about fine-tuning my own LLM to keep it simpler. I will leave that for another post where I want to share more on what I learned about doing so.

I'm also going through the step-by-step I performed in order to complete this project, so that this can serve as an inspiration for somebody starting something.

I have a folder called "experiments" [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/tree/main/experiments) which I use to show you how I experiment each subsystem independently and only after each individually works I merge them together. Dividing and conquering here is fundamental.

### 1. Bluesky API

I can't push a post to Bluesky if the API doesn't allow me to do so. Therefore, this is where I started.

<CodeBlock
    language="python"
    title={
        <a 
            href="https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/experiments/bluesky-api.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#0366d6' }}
        >
            /experiments/bluesky-api.ipynb
        </a>
    }
    showLineNumbers>
    {`from atproto import Client, client_utils
import os
from dotenv import load_dotenv

load_dotenv()

client = Client()
profile = client.login(
    os.getenv('BLUESKY_HANDLE'),
    os.getenv('BLUESKY_PASSWORD')
)
print('Welcome,', profile.display_name)

text = client_utils.TextBuilder().text('Merry Christmas!')
post = client.send_post(text)
client.like(post.uri, post.cid)
`}
</CodeBlock>

The code is extremely simple, this made me understand how easy Bluesky API is to interact with.

The only thing I added to this was to create a thread of posts if the 300 character post limit was crossed. I didn't know the limit was 300 characters, and so had to handle that situation after when merging all the pieces together since, it turns out, AI agents like to write long posts (or my prompt didn't hint at not doing so strong enough).

### 2. Telegram API

In order to push a post to Bluesky, I need to have something that triggers it.

I could have automated this process as in "at 9am every day post something on a topic", but I wanted the subject to vary and retain control over what my agent does research on.

Therefore, I chose Telegram to act as the "trigger". I have used Discord and Slack in the past, this allowed me to get familiar with interacting with a bot on Telegram.

I was actually mind-blown by how simple they made the process. More on this here: https://www.siteguarding.com/en/how-to-get-telegram-bot-api-token.

Then I tested that I could send a Telegram bot a message that I would receive on the terminal where this code was running.

<details summary="View Telegram API Code">
<CodeBlock
    language="python"
    title={
        <a 
            href="https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/experiments/telegram-api.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#0366d6' }}
        >
            /experiments/telegram-api.py
        </a>
    }
    showLineNumbers>
    {`import logging
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
)
import os
from dotenv import load_dotenv
import argparse

# Load token from .env file
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    raise ValueError("No TOKEN found in .env file")

# Initialize logger
logger = logging.getLogger(__name__)


# Move logging setup into a function
def setup_logging(verbose: bool) -> None:
    level = logging.INFO if verbose else logging.WARNING
    logging.basicConfig(
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=level
    )


async def start(update: Update, _context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    await update.message.reply_html(
        f"Hi {user.mention_html()}! "
        f"I'm a bot. Send me a message and I'll print it on the console."
    )


async def handle_message(update: Update, _context: ContextTypes.DEFAULT_TYPE) -> None:
    """Print the user message on the console."""
    message = update.message.text
    user = update.effective_user
    chat_id = update.effective_chat.id

    logger.info(
        "New message received from @%s (chat_id: %s): %s",
        user.username,
        chat_id,
        message,
    )

    print(f"Message from @{user.username}: {message}")


async def error_handler(_update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Log errors caused by Updates."""
    logger.error("Exception while handling an update:", exc_info=context.error)


def main() -> None:
    # Add argument parsing
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    args = parser.parse_args()

    # Setup logging based on verbose flag
    setup_logging(args.verbose)

    logger.info("Bot started. Waiting for messages...")

    # Create application
    app = Application.builder().token(TOKEN).build()

    # Add handlers
    app.add_handler(CommandHandler("start", start))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Register error handler
    app.add_error_handler(error_handler)

    # Start polling
    app.run_polling(poll_interval=1.0)


if __name__ == "__main__":
    main()`}
</CodeBlock>

</details>


The only additional things I added afterwards for a better user experience were: 
- Shows processing status in text
- Provides the Bluesky post URL when complete
- Indicates if the post was threaded
- Reports any errors

### 3. Agent brain

I have used Ollama and `Llama3.2:latest` previously, and knew how easy it was to call the model. So I didn't bother spending time testing it up in advance.

<CodeBlock
    language="python"
>
    {`response = requests.post(
	"http://localhost:11434/api/generate",
	json={"model": model, "prompt": post_prompt, "stream": False},
)`}
</CodeBlock>

However, I wanted to give some form of flexibility in case someone found some interest in the project - so they could bring their own custom models.

So I put this code into a folder called `agents` and each file here has a class `LanguageModelWrapper`and works as an agent with (potential) access to tools.

The code for the `LLama3.2:latest` agent can be found here: https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/agents/llama_3_2_ollama.py

### 4. Tools for the agent

Finally, I wanted the agent to have access to a few tools, so I created a folder within agents called `tools` where I added each of these. It can be found [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/tree/main/agents/tools).

```
agents/
    llama_3_2_ollama.py
    phi_3_mini_4k_instruct_ft_on_didier_blog.py
    ...
    tools/
        grok.py
        openbb.py
        perplexity.py
        ...
```

The implementation for how function calling is performed can be found [here]( https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/agents/llama_3_2_ollama.py).

I didn't do anything fancy, just followed the [documentation from Meta](https://www.llama.com/docs/model-cards-and-prompt-formats/llama3_2) and checked that the model would return the function in the right format.

The implementation is also very straightforward:
- Check what the topic is (that I wrote on Telegram)
- Check if it needs to do research using any of the tools provided
	- Currently can only use up to one of them
- Uses the topic I wrote on Telegram + the output from the function call to write a post

#### 4.1. OpenBB

I'm biased here, but wanted to throw OpenBB in the mix for financial information.

In this case there are 2 tools that the agent has access to:

`openbb_news_search` is used when the agent needs:
- General news articles from various sources
- Latest headlines on a specific topic

`openbb_news_on_company_search`  is used when the agent needs:
- Specific news articles about a particular company
- Latest information on a company

Here's how I tested that I could get this data easily:

<CodeBlock
    language="python"
    title={
        <a 
            href="https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/experiments/test_openbb.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#0366d6' }}
        >
            /experiments/test_openbb.py
        </a>
    }
    showLineNumbers>
    {`import os
from openbb import obb
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize the OpenBB SDK
obb.account.login(pat=os.getenv("OPENBB_PAT"))

def openbb_news_search(query):
    """Retrieve news results for a given query using OpenBB's news world endpoint."""

    # Fetch news from the world endpoint
    return obb.news.world(query=query, limit=5, provider="benzinga")

def openbb_news_on_company_search(query):
    """Retrieve news results for a given query using OpenBB's news world endpoint."""

    # Fetch news from the company news endpoint
    return obb.news.company(query=query, limit=5, provider="benzinga")


if __name__ == "__main__":
    result = openbb_news_search("technology")
    print(result)

    result = openbb_news_on_company_search("Apple")
    print(result)`}
</CodeBlock>

And the real implementation is [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/agents/tools/openbb.py).

#### 4.2. Perplexity

`perplexity_web_search` is used when the agent needs:
- General web information
- Detailed background information

Here's how I tested that the API worked:

<CodeBlock
    language="python"
    title={
        <a 
            href="https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/experiments/test_perplexity.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#0366d6' }}
        >
            /experiments/test_perplexity.py
        </a>
    }
    showLineNumbers>
    {`import os
import re
from openai import OpenAI
from dotenv import load_dotenv

def perplexity_query(messages):
    client = OpenAI(
        api_key=os.getenv("PERPLEXITY_API_KEY"),
        base_url="https://api.perplexity.ai"
    )

    response = client.chat.completions.create(
        model="llama-3.1-sonar-small-128k-online",
        messages=messages,
        stream=False,
    )

    # Remove citations using regex
    content = response.choices[0].message.content
    cleaned_content = re.sub(r'\[\d+\]', '', content)
    return cleaned_content.strip()

if __name__ == "__main__":
    # Load environment variables from .env file
    load_dotenv()

    # Example message
    example_messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is the capital of France?"}
    ]

    # Run the query
    result = perplexity_query(example_messages)
    print("Response:", result)
`}
</CodeBlock>

And the implementation is [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/agents/tools/perplexity.py).

#### 4.3. Grok

`grok_x_search` is used when the agent needs:
- Recent social media discussions
- Twitter/X specific content
- Real-time reactions and trends

Here's how I tested the API:

<CodeBlock
    language="python"
    title={
        <a 
            href="https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/experiments/test_grok.py"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#0366d6' }}
        >
            /experiments/test_grok.py
        </a>
    }
    showLineNumbers>
    {`import os
import re
from openai import OpenAI
from dotenv import load_dotenv


def grok_x_search(query):
    """Retrieve web search results for a given query using Grok."""
    client = OpenAI(
        api_key=os.getenv("GROK_API_KEY"),
        base_url="https://api.x.ai/v1",
    )
    messages = [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant with access to up-to-date information "
                "from the web. You can provide context on various topics, especially "
                "recent events and developments. Your task is to provide enough "
                "content so the user can craft an informative and engaging post "
                "based on the given query."
            ),
        },
        {"role": "user", "content": query},
    ]

    response = client.chat.completions.create(
        model="grok-beta",
        messages=messages,
        stream=False,
    )

    # Remove citations using regex
    content = response.choices[0].message.content
    cleaned_content = re.sub(r"\[\d+\]", "", content)
    return cleaned_content.strip()

if __name__ == "__main__":
    # Load environment variables from .env file
    load_dotenv()
    # Run the query
    result = grok_x_search("What are the latest developments in AI?")
    print("Response:", result)
`}
</CodeBlock>

And the implementation is [here](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/agents/tools/grok.py).

### 5. Put it all together

Finally, I merged it all together in [this file](https://github.com/DidierRLopes/telegram-text-to-bluesky-post/blob/main/bluesky-agent.py).

This is what the architecture looks like:

<p align="center">
    <img width="900" src="/blog/2025-01-04-building-an-ai-agent-from-scratch-that-can-post-on-bluesky.webp"/>
</p>

## Conclusion

I enjoyed working on this project. It didn't take me much time to do it, and allowed me to learn:
- Utilizing Telegram API and bot convention
- Posting on Bluesky
- Playing with local models through Ollama
- Using xAI API for the first time - made extremely easy with OpenAI compatibility

The architecture I went with offers several advantages:
1. **Privacy**: Using a local LLM means sensitive data stays on your machine
2. **Customization**: The system prompt can be easily modified to change the AI's tone
3. **Reliability**: Asynchronous design prevents the bot from hanging
4. **Scalability**: The modular design makes it easy to add new tools or models

<br />

This hasn't been heavily tested - just enough for me to test that it works end-to-end.

Over the next few days I'm going to play with [Eliza from ai16z](https://github.com/elizaOS/eliza) which I learned about only after having this implemented. It looks like it has a similar concept but agents "live" natively on X.

Any feedback please let me know!
