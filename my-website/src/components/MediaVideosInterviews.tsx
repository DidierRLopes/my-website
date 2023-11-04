import React from 'react';
import VideosList from './General/VideosList';

const mediaVideosInterviews = [
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

export default function MediaVideosInterviews() {
  return <VideosList videos={mediaVideosInterviews} />;
}
