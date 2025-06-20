---
slug: turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm
title: Turn my blog feed into a QA dataset to fine-tune a LLM
date: 2025-01-21
image: /blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm
tags:
- ai
- ml
- llm
- dataset
- hugging-face
- ollama
- llama
- fine-tuning
- python
description: This project converts blog feed content into a structured Question-Answer dataset using LLaMA 3.2 (via Ollama) for local processing. The generated dataset follows a conversational format and can be automatically pushed to Hugging Face.
hideSidebar: true
---



<p align="center">
    <img width="900" src="/blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm.png"/>
</p>

This project converts blog feed content into a structured Question-Answer dataset using LLaMA 3.2 (via Ollama) for local processing. The generated dataset follows a conversational format and can be automatically pushed to Hugging Face.

The open source code is available [here](https://github.com/DidierRLopes/turn-blog-feed-into-qa-dataset).

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

I was looking to fine-tune an open source LLM with content that I have produced in the past to see how advanced such LLMs were and how close I could get a model running locally to "output tokens" the same way I would.

According to Daniel Kahneman and his book <a href="https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555" target="_blank" rel="noopener noreferrer">Thinking, Fast and Slow</a>, humans have two modes of thought:

- **System 1**: Fast, instinctive and emotional. An example of this are my <a href="https://x.com/didier_lopes" target="_blank" rel="noopener noreferrer">posts on X</a>.

There are multiple libraries out there to scrape data from X. One that I used recently, and liked (without requiring an X API key) was <a href="https://github.com/elizaOS/twitter-scraper-finetune" target="_blank" rel="noopener noreferrer">Twitter scraper finetune from ElizaOS</a>.

- **System 2**: Slower, more deliberative and more logic. An example of this is my blog, where some of these posts take me several hours to write and need to sleep on the topic before pushing.

For this, I didn't find any good out-of-the-box library that allowed me to convert my posts into a QA dataset to fine-tune a model.

So this is what I ended up building.

## Getting Started

In order to do this you will need:

- Python 3.11
- Poetry (for python dependencies)
- Ollama (to run Llama 3.2)
- Hugging Face account (for dataset upload)

and obviously your blog in a JSON feed like <a href="https://didierlopes.com/blog/feed.json" target="_blank" rel="noopener noreferrer">https://didierlopes.com/blog/feed.json</a>.

#### 1. Install dependencies

<CodeBlock language="bash">
{`poetry install
poetry run python -m spacy download en_core_web_sm`}
</CodeBlock>

#### 2. Install Ollama and pull Llama 3.2

Follow instructions to install Ollama: https://ollama.com/

Select a model to run locally using https://ollama.com/search.

In this case, we want to run `llama3.2:latest` (https://ollama.com/library/llama3.2).

<CodeBlock language="bash">
{`ollama pull llama3.2:latest`}
</CodeBlock>

<p align="center">
    <img width="900" src="/blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm_1.png"/>
</p>

Then, we can check that the model has been downloaded with:

<CodeBlock language="bash">
{`ollama list`}
</CodeBlock>

<p align="center">
    <img width="900" src="/blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm_2.png"/>
</p>

Finally, we can test that it works with:

<CodeBlock language="bash">
{`ollama run llama3.2:latest`}
</CodeBlock>

<p align="center">
    <img width="900" src="/blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm_3.png"/>
</p>

#### 3. Configure Hugging Face

- Create a write-enabled token at [Hugging Face](https://huggingface.co/docs/hub/en/security-tokens)

- Create a `.env` file:

<CodeBlock language="bash">
{`HF_TOKEN=your_token_here`}
</CodeBlock>

## Usage

**1. Update the blog feed URL in <a href="https://github.com/DidierRLopes/turn-blog-feed-into-qa-dataset/blob/main/turn-blog-feed-into-qa-dataset.ipynb" target="_blank" rel="noopener noreferrer">this notebook</a>.**

Below you can see the feed structure being used - which is the default coming from <a href="https://docusaurus.io/docs/blog" target="_blank" rel="noopener noreferrer">Docusaurus</a>, which is the framework I'm using to auto-generate the feed for my personal blog.

<CodeBlock language="python">
{`url = "https://didierlopes.com/blog/feed.json"`}
</CodeBlock>

<details summary="JSON Feed Structure">

<CodeBlock language="json">
{`{
  "version": "https://jsonfeed.org/version/1",
  "title": "Didier Lopes Blog", 
  "home_page_url": "https://didierlopes.com/blog",
  "description": "Didier Lopes Blog",
  "items": [
    {
      "id": "URL of the post",
      "content_html": "HTML content of the post", 
      "url": "URL of the post",
      "title": "Title of the post",
      "summary": "Brief summary of the post",
      "date_modified": "ISO 8601 date format",
      "tags": [
        "array",
        "of", 
        "tags"
      ]
    },
    // ... more items
  ]
}`}
</CodeBlock>

</details>

<br />

**2. Set your Hugging Face dataset repository name:**

<CodeBlock language="python">
{`dataset_repo = "didierlopes/my-blog-qa-dataset"`}
</CodeBlock>

This is what the dataset will look like in HuggingFace: https://huggingface.co/datasets/didierlopes/my-blog-qa-dataset/viewer.

<p align="center">
    <img width="900" src="/blog/2025-01-21-turn-my-blog-feed-into-a-qa-dataset-to-fine-tune-a-llm_4.png"/>
</p>

<br />

**3. Run the notebook cells sequentially.**

The notebook contains detailed explanations throughout to guide you through the process step-by-step.

## Dataset Format

The generated dataset includes:

- `title`: Blog post title
- `conversation`: Array of Q&A pairs in role-based format
- `context`: Original cleaned blog content
- `url`: Source blog post URL
- `date`: Publication date

Note: This is the format of the conversation field:

<CodeBlock language="python">
{`conversation = [
    {
        "role": "user", 
        "content": (
            "You mentioned that when ChatGPT launched, everyone rushed to build "
            "financial chatbots. What were some of the fundamental truths that "
            "those who built these chatbots missed?"
        )
    },
    {
        "role": "assistant",
        "content": (
            "Those building financial chatbots missed two fundamental truths:"
            "1. AI models are useless without access to your data."
            "2. Access to data isn't enough - AI needs to handle complete "
            "workflows, not just conversations."
            "These limitations led to chatbots that can't access proprietary "
            "data, can't handle complex workflows and restrict analysts to an"
            "unnatural chat interface."
        )
    },
    # ... more Q&A pairs following the same pattern
]`}
</CodeBlock>

## Summary of how it works

1. Fetches blog content from JSON feed
2. Cleans HTML to markdown format
3. Analyzes sentence count to determine Q&A pair quantity
4. Generates contextual questions using LLaMA 3.2 running locally
5. Creates corresponding answers
6. Filters and removes duplicate Q&A pairs
7. Formats data for Hugging Face
8. Pushes to Hugging Face Hub
