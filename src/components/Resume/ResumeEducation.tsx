import React from 'react';
import EducationList from '../General/EducationList';

const data = [
  {
    school: 'Imperial College London, United Kingdom 🇬🇧',
    link: 'https://www.imperial.ac.uk/study/courses/postgraduate-taught/control-optimisation/',
    degree: 'MSc. in Control Systems, Distinction',
    date: 'October 2017 - October 2018',
    summary: [
      'Mathematics for Signals and Systems, System Identification, Optimisation, Predictive Control, Estimation and Fault Detection, Pattern Recognition and Machine Learning for Computer Vision.',
      'The overall examination mark was 75.4 / 100.',
      'Achieved 83.4 / 100 on thesis: "Energy savings from an Ecological Cooperative Adaptive Cruise Control: a Battery Electric Vehicle platoon investigation".',
    ],
  },
  {
    school: 'Delft University of Technology, The Netherlands 🇳🇱',
    link: 'https://www.tudelft.nl/en/education/programmes/masters/systems-control/msc-systems-control/programme',
    degree: 'Student Exchange Program',
    date: 'February 2017 - July 2017',
    summary: [
      'Adaptive and Predictive Control, Modelling and Control of Hybrid Systems, Knowledge Based Control Systems, Networked and Distributed Control Systems, Integration Project Systems and Control and Space Robotics.',
      'Finished with 7.6 out of 10.',
    ],
  },
  {
    school:
      'Faculty of Sciences and Technology, New University of Lisbon, Portugal 🇵🇹',
    link: 'https://guia.unl.pt/en/2020/fct/program/853#structure',
    degree: 'BSc. in Electrical and Computer Engineering, Top 1',
    date: 'September 2013 - January 2017',
    summary: [
      'Mathematics, Physics, Energy, Telecommunication, Digital Systems, Electronics, Robotics and Control Systems.',
      'Finished the degree with 17.4 out of 20 being top 1 out of 96 students.',
    ],
  },
];

export default function ResumeEducation() {
  return <EducationList education={data} />;
}
