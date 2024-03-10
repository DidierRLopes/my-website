import React from 'react';
import VideosList from '../General/VideosList';

const data = [
  {
    title: 'ClueCon',
    embed: 'https://www.youtube.com/embed/OEboNpQlwgk?si=BK5NpvyHXi7z7H7X',
    description: "Joining us this week is Didier Lopes from the open source project, Open BB. Open BB is focused on building the most advanced investment research tools accessible to everyone. As a Software Developer and an AI/ML enthusiast, Didier decided to leverage modern data science tools to help make sense out of investing. As a young investor, he looked for research tools about investing and couldn't find anything helpful.",
    date: '2024-02-20',
    time: '30min',
  },
  {
    title: 'OpenBB + Supabase',
    embed: 'https://www.youtube.com/embed/lHmCshk4pJc?si=oZH2Vv_jUvSFbY_t',
    description: 'Copple chats to Didier Lopes, the cofounder of OpenBB, about their origin story, their Supabase integration, and whether he prefers to fight ducks or horses.',
    date: '2023-12-19',
    time: '22min',
  },
  {
    title: 'Fintech CEO Fireside Chat: Open Source Fintech Ft. OpenBB',
    embed: 'https://www.youtube.com/embed/dDrQgbe-HF4?si=UXbPb-cGtx_PfppK',
    description: 'In our latest Fintech CEO Fireside Chat, our CEO dives in with Didier Lopes, the Founder & CEO of OpenBB. Topics Covered: Open-source and "freemium" business models Competing with Bloomberg, Reinventing the "terminal", Startup fundraising, How to scale a startup, Retail and institutional investment trends, and more!!',
    date: '2023-12-12',
    time: '1h 7min',
  },
  {
    title: 'Open source interviews #20 - Didier Lopes, founder of OpenB',
    embed: 'https://www.youtube.com/embed/BV-zdBpVKjk?si=SJ2rwOxnq9WzcXr7',
    description: 'Open source investment research platform | Terminal | SDK | Bot.',
    date: '2023-08-02',
    time: '37 minutes',
  },
  {
    title: 'LlamaIndex Webinar: LLMs for Investment Research',
    embed: 'https://www.youtube.com/embed/s8ZNLqi9hzc?si=30qYav28IqKZ88q0',
    description: "OpenBB has an awesome Terminal product, and it's made even better with AI! We'll talk about AskOBB, powered by LlamaIndex - it gives users a natural language interface to access financial data. We'll also talk about their future plans: utilizing LLMs to chat with financial data and extract insights more efficiently, or even creating a custom research report.",
    date: '2023-07-14',
    time: '46 minutes',
  },
];

export default function MediaInterviews() {
  return <VideosList videos={data} />;
}
