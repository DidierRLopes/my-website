import React from 'react';
import PodcastsList from './General/PodcastsList';

const mediaPodcasts = [
  {
    title: 'Making Investment Data Easy To Access And Analyze With The OpenBB Terminal',
    link: 'https://www.pythonpodcast.com/openbb-terminal-investment-data-framework-episode-363/',
    host: 'Podcast.__init__',
    date: '2022-05-10',
    summary: 'Investing effectively is largely a game of information access and analysis. This can involve a substantial amount of research and time spent on finding, validating, and acquiring different information sources. In order to reduce the barrier to entry and provide a powerful framework for amateur and professional investors alike Didier Rodrigues Lopes created the OpenBB Terminal. In this episode he explains how a pandemic project that started as an experiment has led to him founding a new company and dedicating his time to growing and improving the project and its community.',
  },
  {
    title: 'Interview with Didier Lopes: CEO and Founder, OpenBB',
    link: 'https://www.flagsmith.com/podcast/openbb',
    host: 'Flagsmith',
    date: '2023-11-28',
    summary: 'OpenBB stands at the crossroads of innovation, uniting open-source spirit with financial prowess to empower every individual. In this episode of our podcast, Didier Lopes discusses OpenBB, a revolutionary platform aiming to democratize access to financial data. From its inception to its evolution into a versatile financial data hub, Didier shows how OpenBB thrives as a bridge connecting financial data for everyone. Join us as we explore the potential future directions for OpenBB, envisioning an ecosystem where financial data is seamlessly accessible, customized, and affordable for all types of users. Tune in now!',
  }  
];

export default function MediaPodcasts() {
  return <PodcastsList podcasts={mediaPodcasts} />;
}
