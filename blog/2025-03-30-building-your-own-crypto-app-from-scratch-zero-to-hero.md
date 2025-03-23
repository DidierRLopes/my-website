---
slug: 2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero
title: Building your own Crypto app from scratch - zero to hero
date: 2025-03-30
image: /blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero
tags: ['openbb', 'crypto', 'dashboard', 'tutorial', 'data visualization', 'AI', 'workflows']
description: A comprehensive guide to building sophisticated crypto applications using OpenBB. Learn how to create custom dashboards, implement consistent styling, leverage widget specifications, build template workflows, and customize AI agents for your specific use case.
hideSidebar: true
unlisted: true

---

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero.png" />
</p>

A comprehensive guide to building sophisticated crypto applications using OpenBB. Learn how to create custom dashboards, implement consistent styling, leverage widget specifications, build template workflows, and customize AI agents for your specific use case.

<!-- truncate -->

import CodeBlock from '@theme/CodeBlock';
import Details from '@theme/Details';
import Admonition from '@theme/Admonition';

<div style={{borderTop: '1px solid #0088CC', margin: '1.5em 0'}} />

## Background

My friend Matt Maximo is an investor in digital assets at VanEck. The first time he shared with me what he was working on, I was impressed.

So impressed that I shared a <a href="https://www.linkedin.com/feed/update/urn:li:activity:7275174801860636672/" target="_blank">post about it</a> on LinkedIn, which got over 50k impressions.

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_1.png" />
</p>

However, I wanted to take the dashboard he built to the next level. So I'm going to highlight the 5 different OpenBB levels that enable you to go from zero to hero.

I'll be sharing some minimal code just for reference. The code will be in Python and the framework used was FastAPI. But if you are comfortable with other languages and frameworks, you should be able to use those.

## Level 1 - Bringing data
You are able to bring data from different data vendors into OpenBB.

In order to do this, you will have to create a custom backend that parses data from the data vendors of your interest and pushes it out.

Luckily for you, we have <a href="https://github.com/OpenBB-finance/backend-examples-for-openbb-workspace/tree/main" target="_blank">open sourced this data integration</a> layer to make it as easy as possible.

This is already impressive particularly because you can see that the data you are interested in visualizing is right there available to you.

AND, you get out-of-the-box:

- Mix and matching the datasets into the layout you are interested in
- Sharing dashboards with your team
- Utilizing an AI model on top of those datasets

This is where I would say Matt's dashboard was.

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_2.png" />
</p>

## Level 2 - Data style rendering

Once you bring all the data into OpenBB, it's important that it all matches a certain style. Think of it as your own design system for OpenBB widgets.

At this stage you are still working on the custom backend code and the data it outputs.

### Plotly

Something we support is a Plotly chart, and if you're familiar with Plotly, you know it comes with a large amount of options that a user can customize.

So, here I recommend creating a Plotly config that you will be utilizing throughout your App. This ensures that your interface retains the same branding regardless of what workflow you're getting done.

<details summary="Example of Plotly config">
<CodeBlock
    language="python"
    title="ploty_config.py"
    showLineNumbers
>
{`def get_layout_update(theme="dark"):
    """
    Returns standard layout updates to apply to all charts.
    
    Parameters:
        theme (str): The theme to use, either "light" or "dark"
    
    Returns:
        dict: A dictionary of layout settings to update Plotly charts
    """
    # Define color schemes based on theme
    if theme == "light":
        text_color = '#333333'
        grid_color = 'rgba(221, 221, 221, 0.3)'  # Very faded grid
        line_color = '#AAAAAA'
        tick_color = '#AAAAAA'
        bg_color = '#ffffff'  # More opaque background
        active_color = '#3366CC'  # Nice blue color for light theme
        # Black text for better contrast in light mode
        legend_text_color = '#000000'
        # Darker border for better visibility
        legend_border_color = '#ffffff'
    else:  # dark theme (default)
        text_color = '#FFFFFF'
        grid_color = 'rgba(51, 51, 51, 0.3)'  # Very faded grid
        line_color = '#444444'
        tick_color = '#444444'
        bg_color = '#151518'  # More opaque background
        active_color = '#FF8000'  # Orange color for dark theme
        legend_text_color = text_color  # Use the same text color
        legend_border_color = "#151518"  # Use the same border color
    
    return {
        'uirevision': 'constant',  # Maintains view state during updates
        'autosize': True,  # Enables auto-sizing for responsive behavior
        'dragmode': 'zoom',  # Sets default mode to zoom instead of pan
        'hovermode': 'closest',  # Improves hover experience
        'clickmode': 'event',  # Makes clicking more responsive
        'margin': {
            't': 50,  # Top margin - increase this for more modebar space
            'r': 30,  # Right margin
            'b': 40,  # Bottom margin
            'l': 40,  # Left margin
            'pad': 4   # Padding between the plotting area and the axis lines
        },
        'transition': {
            'duration': 50,  # Small transition for smoother feel
            'easing': 'cubic-in-out'  # Smooth easing function
        },
        'modebar': {
            'orientation': 'v',  # Vertical orientation for modebar
            'activecolor': active_color  # Active button color
        },
        'font': {
            'family': 'Arial, sans-serif',  # Sans-serif font
            'size': 12,
            'color': text_color  # Text color based on theme
        },
        'xaxis': {
            'rangeslider': {'visible': False},  # Disable rangeslider
            'autorange': True,  # Enable autorange
            'constrain': 'domain',  # Constrain to domain for better zoom
            'showgrid': True,  # Show vertical grid lines
            'gridcolor': grid_color,  # Very faded grid lines
            'linecolor': line_color,  # Axis line color based on theme
            'tickcolor': tick_color,  # Tick color based on theme
            'linewidth': 1,  # Match y-axis line width
            'mirror': True,  # Mirror axis to match y-axis
            'showline': False,  # Hide the axis line to remove the box
            'zeroline': False,  # Hide zero line to match y-axis
            'ticks': 'outside',  # Place ticks outside
            'tickwidth': 1  # Match y-axis tick width
        },
        'yaxis': {
            'autorange': True,  # Enable autorange
            'constrain': 'domain',  # Constrain to domain
            'fixedrange': False,  # Allow y-axis zooming
            'showgrid': True,  # Show horizontal grid lines
            'gridcolor': grid_color,  # Very faded grid lines
            'linecolor': line_color,  # Axis line color based on theme
            'tickcolor': tick_color,  # Tick color based on theme
            'linewidth': 1,  # Consistent line width
            'mirror': True,  # Mirror axis
            'showline': False,  # Hide the axis line to remove the box
            'zeroline': False,  # Hide zero line
            'ticks': 'outside',  # Place ticks outside
            'tickwidth': 1  # Consistent tick width
        },
        'legend': {
            # Legend text color with better contrast
            'font': {'color': legend_text_color},
            'bgcolor': bg_color,  # More opaque background
            'bordercolor': legend_border_color,  # Better visible border
            'borderwidth': 1  # Add border width for better visibility
        },
    }
`}
</CodeBlock>
</details>
Here's an example of how a dashboard that utilizes the same Plotly config file looks:

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_3.png" />
</p>

Notice the visual consistency.

### Theme

Pretty much everyone on our team is a dark mode fan. This might be due to our origins and the OG Gamestonk Terminal command line interface.

However, from customer conversations, some users had a strong preference for light mode. So we developed OpenBB workspace to support both. You can switch with a simple Ctrl+M shortcut.

Here's how the previous dashboard looks in light mode:

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_4.png" />
</p>

As seen above, the Plotly config file is prepared for both dark and light mode. However, how does it know which to use?

That's because whenever the user retrieves their data through a request, we send an additional `theme` parameter that specifies if the user is in `dark` or `light` mode.

Let's look at a simple example of how we handle theme in our API endpoints:

<CodeBlock
    language="python"
    title="Example of a Fast API endpoint with theme support"
    showLineNumbers
>
{`async def get_velo_net_liquidations(
    coin: str = "BTC",
    begin: str = None,
    resolution: str = "1d",
    theme: str = "dark"  # defaults to dark mode
)`}
</CodeBlock>

This ensures a consistent visual experience regardless of the user's theme preference.

## Level 3 - OpenBB Widget spec
When you bring data into OpenBB, you will see a table or a chart that effectively lives within a container.

That entire container is what we call a widget.

It's not just the data that you are pushing into OpenBB - it also comes with the concepts of parameters and metadata.

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_5.png" />
</p>

Once you understand this, you enter a whole new domain.

This spec is what allows you to control the user experience around how data flows in the workspace, and is defined through a JSON.

Here's an example of a decorator from an endpoint that has a specific widget spec.

<CodeBlock
    language="python"
    title="Example of a widget spec decorator"
    showLineNumbers
>
{`@register_widget({
    "name": "Net Liquidations",
    "description": "Net liquidations (long - short) across exchanges",
    "category": "crypto",
    "source": "VeloData",
    "endpoint": "velo/net-liquidations",
    "type": "chart",
    "data": {"chart": {"type": "line"}},
    "gridData": {"w": 40, "h": 12},
    "params": [
        {
            "paramName": "coin",
            "value": "ETH",
            "label": "Coin",
            "show": True,
            "description": "Cryptocurrency to display data for",
        },
        {
            "paramName": "resolution",
            "value": "1d",
            "label": "Resolution",
            "show": True,
            "description": "Time resolution for data points",
            "type": "endpoint",
            "optionsEndpoint": "velo/resolution-options",
        },
        {
            "paramName": "begin",
            "value": "2024-01-01",
            "label": "Start Date",
            "show": True,
            "description": "Start date for the data",
            "type": "date",
        }
    ],
})`}
</CodeBlock>

<Admonition type="note">
This decorator is something that we built to make it easier to add to each widget, but it isn't required. You may simply have a widgets.json file that has the specs for each widget, as done <a href="https://github.com/OpenBB-finance/backend-examples-for-openbb-workspace/blob/main/widget_examples/chart_widget/widgets.json" target="_blank">here</a>.
</Admonition>

There are many arguments that are important, but let me divide them into 3 categories:

### Parameters

Parameters are what allow the user to change a ticker on a widget in the interface, triggering another request on the backend to update the data with the latest ticker selected. This also works for dates, numbers, dropdowns, or any other input type.

Funny story: Recently a customer asked us for an input form field. Once we supported that, someone on our team built a widget that effectively enables users to execute trades on OpenBB.

If we go through the parameters example above, you'll start to understand the capabilities you have at your disposal.

1. The coin symbol parameter is a string, and you can see that it has "ETH" as its default value. The "Coin" label and the "Cryptocurrency to display data for" description appear when hovering over the field. Note that these fields are also important for the AI agent which can use them to make different data requests for the dataset.

<br />

<CodeBlock
    language="python"
    title="Coin ticker"
    showLineNumbers
>
{`{
  "paramName": "coin",
  "value": "ETH",
  "label": "Coin",
  "show": True,
  "description": "Cryptocurrency to display data for",
}`}
</CodeBlock>

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_6.png" />
</p>
2. The resolution dropdown highlights that there's a component that takes another endpoint for the list of choices that the user has at their disposal, and even that they can search for the right options. This enables developers to limit the selections that the end user will have when utilizing OpenBB.

<br />

<CodeBlock
    language="python"
    title="Resolution dropdown"
    showLineNumbers
>
{`{
  "paramName": "resolution",
  "value": "1d",
  "label": "Resolution",
  "show": True,
  "description": "Time resolution for data points",
  "type": "endpoint",
  "optionsEndpoint": "velo/resolution-options",
}`}
</CodeBlock>

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_7.png" />
</p>

3. The "date" type parameter is a common one, as a lot of financial data requires users to select a starting date. This functionality is controlled by the selection in the "type" field.

<br />

<CodeBlock
    language="python"
    title="Calendar date type"
    showLineNumbers
>
{`{
  "paramName": "begin",
  "value": "2024-01-01",
  "label": "Start Date",
  "show": True,
  "description": "Start date for the data",
  "type": "date",
}`}
</CodeBlock>

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_8.png" />
</p>
More information on parameters can be found <a href="https://docs.openbb.co/terminal/custom-backend/widgets-json-reference" target="_blank">here</a>.

### Metadata

Metadata is data associated with the widget that is relevant for the agent on the workspace. It includes: title, description, category, sub category and source. This is pushed into embedding so that when the user asks anything, that prompt is pushed into embedding and through similarity search it will understand the best data widget to use as context to answer the question.

Here's an example, for when asking "What was net liquidation of BTC on March 17 of this year?".

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_9.png" />
</p>

It gets the right data, but how given the data isn't available right there?

This is done through function calling, and I have an entire post about it which you can find <a href="http://didierlopes.com/blog/2025-03-01-how-function-calling-and-context-aware-ai-shapes-openbb" target="_blank">here</a>.

But if you were interested in getting the data that was used to answer the prompt right there you can simply go to the citation, and add the widget to the dashboard.

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_10.png" />
</p>

The widget added will look like this:

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_11.png" />
</p>

Note that all the parameters are the correct ones to get the right data.

### Others

Anything else falls here. That includes:

- The real endpoint being used to access this data, in this case "velo/net-liquidations"
- The data type, in this case chart of type line
- The default visualization type, in this case chart. This argument exists so users can toggle between chart and raw data.
- The widget dimensions, i.e. the widget dimensions when added to the dashboard
- And others

## Level 4 - Template workflows

Once you have all the data you want on OpenBB. And the UI/UX is great, what's next?

Then you wrap it all together.

### Interface

You create a template workflow, which basically means that anyone that has access to what you build can click on said workflow and it will render that exact same dashboard for you to nail a specific workflow. Even the grouping relationship between the widgets are preserved!

And you can create many of these.

This can be done by simply exporting template from a dashboard that you like. Like this:

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_12.png" />
</p>

And then pushing it into templates.json.

Here's an example of having multiple custom template workflows to choose from.

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_13.png" />
</p>

### Prompts

For us it is important that a workflow is not just a collection of widgets, grouping and its display, but it ultimately enables you to automate a task that is manual and takes a lot of time.

This is why we allow users to add prompts to their template workflows.

<p align="center">
    <img width="600" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_14.png" />
</p>

After running that prompt on the data available within this template workflow.

<p align="center">
    <img width="900" src="/blog/2025-03-30-building-your-own-crypto-app-from-scratch-zero-to-hero_15.png" />
</p>

## Level 5 - Custom AI agent

Now that you have all the data in OpenBB, a great UI/UX and you have your workflow templates ready... there's only one thing missing.

Customizing your AI agent.

Instead of relying on our generic implementation that can work on top of your data out-of-the-box, you can integrate a more tailored agent for a specific workflow.

Ultimately you may have multiple agents for different workflows based on the task they are trying to get done, and you are in control.

You can find more examples of building your agent on OpenBB in <a href="https://github.com/OpenBB-finance/copilot-for-openbb" target="_blank">this open source repo</a>.

## Concluding remarks

In this post I go through the fundamentals of creating a powerful crypto dashboard on OpenBB.

I tried to not be too technical, but rather give an overview of all the capabilities of our product so you can understand that once you learn the patterns you can build your own powerful desktop application.

Given the requests for this, I'm preparing a workshop on how to create an OpenBB app from scratch.

Focused on people who want to build apps on OpenBB.

If you want to sponsor the event by providing data to the audience, ping me.

Sign up in here: tbd.
