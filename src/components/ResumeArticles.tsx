import React from 'react';
import ArticlesList from './General/ArticlesList';

const articles = [
  {
    title:
      'Energy savings from an Eco-Cooperative Adaptive Cruise Control: a BEV platoon investigation',
    link: 'https://ieeexplore.ieee.org/abstract/document/8796226',
    conference: '2019, 18th European Control Conference (ECC)',
  },
  {
    title: 'Step Detection using SVM on NURVV Trackers',
    link: 'https://ieeexplore.ieee.org/document/9680024',
    conference:
      '2021, 20th IEEE International Conference on Machine Learning and Applications (ICMLA)',
  },
  {
    title: 'Forecasting models for time-series: a comparative study between classical methodologies and Deep Learning',
    link: 'https://ciencia.iscte-iul.pt/publications/forecasting-models-for-time-series-a-comparative-study-between-classical-methodologies-and-deep/83651',
    conference: '2021, XXV Portuguese Statistical Society (SPE)',
  },
];

export default function ResumeArticles() {
  return <ArticlesList articles={articles} />;
}
