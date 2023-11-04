import React from 'react';
import NewsMentionsList from './General/NewsList';

const mediaNewsMentions = [
  {
    title: 'OpenBB Releases Its Second Generation Open Source Investment Research Platform With a Software Development Kit (SDK) and an AI/ML Toolkit',
    link: 'https://www.newswire.com/news/openbb-releases-its-second-generation-open-source-investment-research-21885626',
    magazine: 'Newswire',
    date: '2022-11-29',
  },
  {
    title: 'OpenBB wants to be an open source challenger to Bloomberg Terminal',
    link: 'https://venturebeat.com/data-infrastructure/openbb-wants-to-be-an-open-source-challenger-to-bloomberg-terminal/',
    magazine: 'Venture Beat',
    date: '2022-03-30',
  },
  {
    title: 'Gamestonk Terminal Is a DIY, Meme Stock Version of Bloomberg Terminal',
    link: 'https://www.vice.com/en/article/qjp9vp/gamestonk-terminal-is-a-diy-meme-stock-version-of-bloomberg-terminal',
    magazine: 'VICE Magazine',
    date: '2021-03-01',
  },
];

export default function MediaNewsMentions() {
  return <NewsMentionsList news={mediaNewsMentions} />;
}
