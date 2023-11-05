import React from 'react';
import ExperienceList from './General/ExperienceList';

const experience = [
  {
    company: 'OpenBB',
    title: 'Co-founder & CEO',
    link: 'https://openbb.co',
    daterange: 'September 2021 - Present',
    summary: [
      'Raised $ 8.5M in funding from an open source project I started in my spare time.',
      'Built a team of over 20 people from scratch in less than 1 year, including: engineering, product, marketing, design and finance departments.',
    ],
  },
  {
    company: 'NURVV',
    title: 'Embedded Firmware Engineer | Sensor Fusion Engineer',
    link: 'https://www.nurvv.com/en-gb/',
    daterange: 'March 2020 - October 2021',
    summary: [
      'The job required proficiency with C and C++ programming language and Python scripting.',
      'Improved the time-to-first-fix of the GNSS receiver.',
      'Re-designed the concept of altitude estimation using Kalman Filter.',
      'Added a GPS filtering algorithm for outliers, including an approach to pick a valid start point.',
      'Developed a new method of calibrating insoles to increase their life span and accuracy.',
      'Created and cleaned Nurvv running dataset which allowed to implement a new footstrike detection and INS algorithm to improve distance covered and speed reported to users.',
      'Developed a python data analyzer that processes the data from a running session and produces a html report, which allows us to assess the state of the product, and helps us in development to make sure the product is behaving as expected.',
      'Developed a python sensor analyzer that allows to analyze the raw samples seen by the trackers over a running session, to understand - at a low level - if something unexpected is happening.',
      'Started the development of a python CLI, similar to the iOS and Android apps, to be used by the firmware team to communicate with the trackers.',
    ],
  },
  {
    company: 'U-blox',
    title: 'Software Design Engineer',
    link: 'https://www.u-blox.com/en',
    daterange: 'November 2018 - February 2020',
    summary: [
      'Designing and maintaining the internal and external customer-facing features and other higher-level software features',
      'Taking part in the whole embedded software development life cycle, in order to release state of the art GNSS receivers.',
      'Proficiency in programming and scripting languages (C, C++, MATLAB and Perl).',
      'Knowledge in software testing, test automation and continuous integration concepts.',
      'Project tracking and collaboration (e.g. Jira)',
      'Experience with integrated development environments (e.g. Visual Studio Code), revision control systems (e.g. Git) and Linux computing.',
    ],
  },
  {
    company: 'Faculty of Sciences and Technology, New University of Lisbon',
    title: 'Teacher Assistant',
    link: 'https://www.fct.unl.pt',
    daterange: 'January 2016 - June 2016',
    summary: [
      'Help 75 students to understand the theory of the Signal Theory course, and guide them throughout their MATLAB assignments.',
    ],
  },
];

export default function ResumeExperience() {
  return <ExperienceList experience={experience} />;
}
