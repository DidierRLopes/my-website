import React from 'react';
import ExperienceList from '../General/ExperienceList';

const data = [
    {
    company: 'Chronicle',
    title: 'Head of Developer Relations',
    link: 'https://chroniclelabs.org/',
    daterange: 'May 2024 - Present',
    summary: [
      'designed and executed the end-to-end DevRel strategy, spanning content, documentation, events, hackathons, and developer experience',
      'built & launched a developer documentation portal from scratch, improving developer experience through AI-powered chatbot support, structured feedback mechanisms, and analytics',
      'produced 50+ technical articles, guides, and tutorials to educate developers and directly support the sales pipeline, contributing to inbound interest and faster technical onboarding',
      'served as the primary technical point of contact for developers and partners, answering technical inquiries and supporting the sales funnel from evaluation to integration',
      
    ],
  },
      {
    company: 'Web3 DevRel Summit',
    title: 'Co-organizer',
    link: 'https://web3devrelsummit.com/',
    daterange: 'June 2025',
    summary: [
      'co-organized along ETHBelgrade the first conference for Web3 DevRel professionals, bringing together 200+ attendees and 25+ speakers from leading web3 projects',
      'curated agenda, managed speakers and marketing campaign',
    ],
  },
  {
    company: 'LUKSO',
    title: 'Head of Developer Relations',
    link: 'https://openbb.co',
    daterange: 'July 2023 - May 2024',
    summary: [
      'manage a team of 3 Developer Relations professionals',
      'spearhead brand awareness campaigns and lead the launch of Universal Profiles resulting in 16K profiles on Mainnet',
      'lead the development of developer documentation and tooling for LUKSO’s account abstraction implementation (LSP0)',
      'collaborated with engineering teams to deliver tooling for social account recovery features',
    ],
  },
  {
    company: 'DevRel Uni',
    title: 'Founder',
    link: 'https://www.nurvv.com/en-gb/',
    daterange: 'March 2020 - Present',
    summary: [
      'founded DevRel Uni, an educational training program I started in my spare time for training DevRel professionals and helping protocols discover and hire DevRel talent',
      'trained 180+ students across 42 countries',
      'co-organized along ETHBelgrade the first Web3 DevRel Summit for Web3 DevRel professionals',
    ],
  },
    {
    company: 'Balancer',
    title: 'Developer Relations Engineer',
    link: 'https://balancer.fi/',
    daterange: 'June 2022 - June 2023',
    summary: [
      'as the first Developer Relations Engineer for Balancer, I established strategy, KPIs, and processes that increased developer engagement',
      'one piece of content converted into an additional $1.2M in liquidity to the protocol',
      'worked closely with the grants committee to select new grantees, support existing ones, resulting in a 20% increase in retention rate of projects',
      'secured and delivered non-sponsored speaking engagements at 15+ key web3 events',
      'created a GitHub analytics pipeline and re-engineered and relaunched the documentation portal',
    ],
  },
  {
    company: 'AWS',
    title: 'Solutions Architect',
    link: 'https://aws.amazon.com/',
    daterange: 'September 202 - June 2022',
    summary: [
      'worked with customers as a trusted-advisor for software vendors to develop systems using best architectural practices',
      'engineered cloud infrastructures for multinational companies in the DACH area',
      'organized Game Days for strategic customers, workshops, and created content',
      'conducted 15 candidate interviews which led to 3 key hires',
    ],
  },
  {
    company: 'Strathyde University',
    title: 'Lab Assistant (CS106) and Tutor (CS208)',
    link: 'https://www.strath.ac.uk/',
    daterange: 'December 2019 - May 2020',
    summary: [
      'led workshops for 120 students in algorithms and computer systems design',
    ],
  },
  {
    company: 'National Institute for Research and Development in Informatics Romania',
    title: 'Intern',
    link: 'https://www.ici.ro/en/',
    daterange: 'July 2018 - September 2018',
    summary: [
      'contributed to the development of software to sort scientific articles into interest categories increasing the efficiency of research teams',
      'organized ”The Potential and Challenges of Blockchain Technology” Summit in Bucharest',
    ],
  },
];

export default function ResumeExperience() {
  return <ExperienceList experience={data} />;
}
