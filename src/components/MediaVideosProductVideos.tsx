import React from 'react';
import VideosList from './General/VideosList';

const mediaVideosProductVideos = [
  {
    title: 'How to use the OpenBB Terminal - full length version',
    embed: 'https://www.youtube.com/embed/76IkkbUlQcA?si=E1RFFRa_C2Z4YtYo',
    description: 'Get started with the OpenBB Terminal today and learn everything you need to perform your investment research and analysis.',
    date: '2023-10-22',
    time: '40 minutes',
  },
  {
    title: 'OpenBB x Keychron: Doing due diligence on a stock will never be the same',
    embed: 'https://www.youtube.com/embed/cgeN3Ep2nEw?si=9WVjmvppx3tHTQrb',
    description: 'In this video I show the concept of routines in the OpenBB Terminal and how you can automate your investment research workflows. In addition, I share how you can create your own custom MACROS on your Keychron mechanical keyboard',
    date: '2023-02-26',
    time: '17 minutes',
  },
  {
    title: 'Adding feargreed command to OpenBB Terminal',
    embed: 'https://www.youtube.com/embed/9BMI9cleTTg',
    description: "This is a video of myself live coding on Gamestonk Terminal. More precisely, adding the 'feargreed' command to the 'economy' menu. Along with the coding, I explain the architecture that we are currently using, so that more developers can add features.",
    date: '2022-06-20',
    time: '70 minutes',
  },
  {
    title: 'OpenBB Terminal Demo',
    embed: 'https://www.youtube.com/embed/fqGPK8OVHLk',
    description: 'OpenBB Terminal Demo after 1 year of development. In this video I go over: introducing the terminal, how to set API keys, enable feature flags, export data, integrate excel, prediction menu, advanced user and routines, +500 features, portfolio menu, automatic reports, dashboards, OpenBB API, and even our OpenBB Bot.',
    date: '2022-02-24',
    time: '43 minutes',
  },
];

export default function MediaVideosProductVideos() {
  return <VideosList videos={mediaVideosProductVideos} />;
}
