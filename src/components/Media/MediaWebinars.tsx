import React from 'react';
import VideosList from '../General/VideosList';

const data = [
  {
    title: "Didier's journey and Demo of the OpenBB Terminal and OpenBB SDK",
    embed: 'https://www.youtube.com/embed/t-EKA1xoFp8',
    description: "During a course of PyQuant News titled 'Getting Started with Quant Finance' I speaks about my background and do a demo about the OpenBB Terminal and the OpenBB SDK. Please note that this version of the OpenBB Terminal was an Early Release Candidate.",
    date: '2022-12-13',
    time: '36 minutes',
  },
  {
    title: 'OpenBB - Terminal 2.0 Launch Event',
    embed: 'https://www.youtube.com/embed/W9r2joPZOOw',
    description: 'Webinar regarding the release of the OpenBB Terminal 2.0. Within this release, the OpenBB SDK and the AI/ML Toolkit are released. Furthermore, many improvements to the already existing 914 commands in the OpenBB Terminal supported by 92 data sources were made.',
    date: '2022-11-30',
    time: '56 minutes',
  },
  {
    title: 'First presentation of Gamestonk Terminal',
    embed: 'https://www.youtube.com/embed/lVtxXyCAZ-4?start=811',
    description: "In this Hacktoberfest '21 kickoff by DeepSource I go over why I started an open source investment research terminal, share some highlights and early growth, talk about our discord bot and finally discuss how we will accommodate powerful machine learning models.",
    date: '2021-10-5',
    time: '15 minutes',
  },
];

export default function MediaWebinars() {
  return <VideosList videos={data} />;
}
