import React from 'react';
import VideosList from '../General/VideosList';

const data = [
  {
    title: 'AI x Wall Street Night',
    description: "Discover how traditional Wall Street firms are adapting to technological transformations with cutting-edge applications. This event goes beyond traditional panel discussions, focusing on real-time demonstrations of what's achievable today with AI in finance: The first AI-Powered Financial Terminal - Watch how efficient analysts can perform research in 2024 using generative AI.",
    date: '2024-05-22',
    location: 'Tower Research Ventures',
    image: '/media/ai-x-wall-street-night.jpeg',
    info: '<p>The OpenBB demo at the event has been pre-recorded <a href="https://www.youtube.com/watch?v=Uj_wpLC-Zho">here</a>.'
  },
  {
    title: 'Python Uses in Quant Finance and Entrepreneurships',
    description: "Didier R. Lopes, co-founder and CEO of OpenBB, and Jason Strimpel, founder of PyQuant News, discuss the areas of Python that are most important for financial services professionals. In this session, discover how Python can help new firms and what you should consider learning to improve your career.",
    date: '2024-03-07',
    location: 'CFA Society New York',
    image: '/media/python-uses-in-quant-finance-and-entrepreneurships.jpeg',
    info: '<p>More information can be found <a href="https://cfany.org/event/python-uses-in-quant-finance-and-entrepreneurships/">here</a>.'
  },
  {
    title: 'Creating an AI-Powered Financial Analyst with OpenBB',
    embed: 'https://www.youtube.com/embed/A-43EKK2PhE?si=fOuAbg42uEoieBNv',
    description: "In this session, we will go over how analysts and quants can build their own AI-powered financial analysts using AI and open source. This will rely on building an agent, in Python, that can access 500+ data endpoints through the OpenBB platform.",
    date: '2023-12-07',
    location: 'Open Core Summit',
    time: '24 minutes',
  },
  {
    title: 'The new FinAI Tech Stack - OpenBB Terminal Pro',
    embed: 'https://www.youtube.com/embed/V1rYmWWVbIY?si=ahxTpjkwQibGqwLq',
    description: 'Didier Lopes, CEO of OpenBB, presented the OpenBB Platform and the OpenBB Terminal Pro at the event "The new FinAI Tech Stack" hosted by MindsDB in SF, California.',
    date: '2023-12-05',
    location: 'MindsDB',
    time: '22 minutes',
  },
  {
    title: 'TimeGPT Launch | Didier Lopes, OpenBB: Democratizing Quantitative Finance',
    embed: 'https://www.youtube.com/embed/W3CTkaEGOiM?si=LHOHE1AJcFLgK4I4',
    description: "Didier Lopes, CEO and Co-Founder of OpenBB, he explores how his company is democratizing the world of Quantitative Finance. Don't miss out on a live code demonstration showing the integration of TimeGPT by Nixtla into the OpenBB terminal to predict stock prices.",
    date: '2023-09-06',
    location: 'MindsDB',
    time: '13 minutes',
  },
  {
    title: 'Revolutionizing the financial industry through Python',
    embed: 'https://www.youtube.com/embed/z52SYR7-Rm4?si=OHDdjnuc5D9erIit',
    description: 'Didier talks about his journey from the pain points of doing investment research to starting his own investment research platform in Python and raising $8.8M to democratize investment research through open source. He will introduce the OpenBB Terminal - the famous open source investment research platform, and some of its functionalities. In addition, he will present the OpenBB SDK which allows devs to build products on OpenBB.',
    date: '2023-06-14',
    location: 'SF Python @ GGU',
    time: '32 minutes',
  },
  {
    title: 'How to grow your open-source community from scratch',
    embed: 'https://www.youtube.com/embed/kgA3uv5h9Fk',
    description: 'Learn how to grow your open-source community from scratch. This presentation was done during the Web Summit 2022.',
    date: '2022-11-09',
    location: 'Web Summit',
    time: '3 minutes',
  },
  {
    title: "Why Proprietary Investment Research Platforms won't Last",
    embed: 'https://www.youtube.com/embed/Sn-SAEzGtPc',
    description: "Today's investment research platforms are proprietary, expensive, come bundled with a full suite of services, and do not offer a custom solution to fit your business's needs. OpenBB Terminal offers the first open source, fully customisable investment research platform that your company can tailor to their own needs, all built off of GitHub's top investment research platform.",
    date: '2022-07-19',
    location: 'Open Source in Finance Forum',
    time: '29 minutes',
  },
];

export default function MediaOnStage() {
  return <VideosList videos={data} />;
}
