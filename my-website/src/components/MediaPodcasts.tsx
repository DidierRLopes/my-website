import React from 'react';
import PodcastsList from './General/PodcastsList';

const mediaPodcasts = [
  {
    title: 'Making Investment Data Easy To Access And Analyze With The OpenBB Terminal',
    link: 'https://www.pythonpodcast.com/openbb-terminal-investment-data-framework-episode-363/',
    host: 'Podcast.__init__',
    date: '2022-05-10',
    summary: 'Investing effectively is largely a game of information access and analysis. This can involve a substantial amount of research and time spent on finding, validating, and acquiring different information sources. In order to reduce the barrier to entry and provide a powerful framework for amateur and professional investors alike Didier Rodrigues Lopes created the OpenBB Terminal. In this episode he explains how a pandemic project that started as an experiment has led to him founding a new company and dedicating his time to growing and improving the project and its community.',
  }
];

export default function MediaPodcasts() {
  return <PodcastsList podcasts={mediaPodcasts} />;
}
