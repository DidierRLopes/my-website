import React from 'react';
import EducationList from '../General/EducationList';

const data = [
  {
    school: 'Strathclyde University, Scotland, UK 🇬🇧',
    link: 'https://www.strath.ac.uk/',
    degree: 'BSc. Hons. Computer Science',
    date: '2016 - 2020',
    summary: [
      'Thesis: "A Distributed Reputation System Built on Top of Ethereum Network"',
      'Class Representative',
      'President and Founder: Strathclyde Female Coding Society',
    ],
  },
  {
    school: 'Technical University of Munich, Germany 🇩🇪',
    link: 'https://www.tum.de/en/',
    degree: 'Student Exchange Program',
    date: '2018 - 2019',
    summary: [
   
    ],
  },

];

export default function ResumeEducation() {
  return <EducationList education={data} />;
}
