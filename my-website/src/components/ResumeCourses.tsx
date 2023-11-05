import React from 'react';
import CoursesList from './General/CoursesList';

const courses = [
  {
    title: 'Scrum Master',
    date: '2022 August',
    link: 'https://credentials.mountaingoatsoftware.com/7348705a-f319-4323-af56-abe25b056b57#gs.m4tp2g',
    issuer: 'Mountain Goat',
  },
  {
    title: 'Speaker: Open Source in Finance Forum London 2022',
    date: '2022 July',
    link: 'https://www.credly.com/badges/77e29fd8-4928-4506-a4a3-036bd258f158/public_url',
    issuer: 'FINOS',
  },
  {
    title: 'Kinematics: Describing the Motions of Spacecraft',
    date: '2021 June',
    link: 'https://www.coursera.org/account/accomplishments/certificate/MGMBCHRF5ASS',
    issuer: 'University of Colorado',
  },
  {
    title: 'Self-Driving Cars Specialization',
    date: '2020 May',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/26529W9YTUFE',
    issuer: 'University of Toronto',
  },
  {
    title: 'Motion Planning for Self-Driving Cars',
    date: '2020 May',
    link: 'https://www.coursera.org/account/accomplishments/certificate/MHDX5G7HBAQA',
    issuer: 'University of Toronto',
  },
  {
    title: 'Visual Perception for Self-Driving Cars',
    date: '2020 May',
    link: 'https://www.coursera.org/account/accomplishments/certificate/LE54G346BC52',
    issuer: 'University of Toronto',
  },
  {
    title: 'State Estimation and Localization for Self-Driving Cars',
    date: '2020 April',
    link: 'https://www.coursera.org/account/accomplishments/certificate/DNPSUAX5VH4R',
    issuer: 'University of Toronto',
  },
  {
    title: 'Introduction to Self-Driving Cars',
    date: '2020 April',
    link: 'https://www.coursera.org/account/accomplishments/certificate/PNV6AJQ9YX63',
    issuer: 'University of Toronto',
  },
  {
    title: 'Machine Learning',
    date: '2020 January',
    link: 'https://www.coursera.org/account/accomplishments/certificate/G7DUXURJC7MP',
    issuer: 'Stanford',
  },
];

export default function ResumeCourses() {
  return <CoursesList courses={courses} />;
}
