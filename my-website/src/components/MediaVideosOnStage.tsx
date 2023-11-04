import React from 'react';
import VideosList from './General/VideosList';

const mediaVideosOnStage = [
  {
    title: 'TimeGPT Launch | Didier Lopes, OpenBB: Democratizing Quantitative Finance',
    embed: 'https://www.youtube.com/embed/W3CTkaEGOiM?si=LHOHE1AJcFLgK4I4',
    description: "Didier Lopes, CEO and Co-Founder of OpenBB, he explores how his company is democratizing the world of Quantitative Finance. Don't miss out on a live code demonstration showing the integration of TimeGPT by Nixtla into the OpenBB terminal to predict stock prices.",
    date: '2023-09-06',
    time: '13 minutes',
  },
  {
    title: 'Revolutionizing the financial industry through Python - SF Python @ GGU',
    embed: 'https://www.youtube.com/embed/z52SYR7-Rm4?si=OHDdjnuc5D9erIit',
    description: 'Didier talks about his journey from the pain points of doing investment research to starting his own investment research platform in Python and raising $8.8M to democratize investment research through open source. He will introduce the OpenBB Terminal - the famous open source investment research platform, and some of its functionalities. In addition, he will present the OpenBB SDK which allows devs to build products on OpenBB.',
    date: '2023-06-14',
    time: '32 minutes',
  },
  {
    title: 'How to grow your open-source community from scratch',
    embed: 'https://www.youtube.com/embed/kgA3uv5h9Fk',
    description: 'Learn how to grow your open-source community from scratch. This presentation was done during the Web Summit 2022.',
    date: '2022-11-09',
    time: '3 minutes',
  },
  {
    title: "Why Proprietary Investment Research Platforms won't Last",
    embed: 'https://www.youtube.com/embed/Sn-SAEzGtPc',
    description: "Today's investment research platforms are proprietary, expensive, come bundled with a full suite of services, and do not offer a custom solution to fit your business's needs. OpenBB Terminal offers the first open source, fully customisable investment research platform that your company can tailor to their own needs, all built off of GitHub's top investment research platform.",
    date: '2022-07-19',
    time: '29 minutes',
  },
];

export default function MediaVideosOnStage() {
  return <VideosList videos={mediaVideosOnStage} />;
}
