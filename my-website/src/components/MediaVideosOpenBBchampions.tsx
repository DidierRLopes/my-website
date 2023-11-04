import React from 'react';
import VideosList from './General/VideosList';

const mediaVideosOpenBBchampions = [
  {
    title: 'Meet Jason Strimpel - OpenBB Champion',
    embed: 'https://www.youtube.com/embed/ULvR-oHynZE?si=EO4gSN_ojpgxeHfO',
    description: "Jason Strimpel's passion for teaching and simplifying complex concepts aligned perfectly with OpenBB's mission to democratize financial data access. That's why we are super proud to announce that Jason Strimpel - founder of PyQuant News - is our next OpenBB Champion.",
    date: '2023-05-28',
    time: '25 minutes',
  },

  {
    title: 'Meet Roberto Talamas - OpenBB Champion',
    embed: 'https://www.youtube.com/embed/I_p77ne75-Y?si=SC8-p_iaBGpr1JzH',
    description: "We sat down with the remarkable Roberto Talamas, partner at Syncracy Capital, a leading hedge fund in the cryptocurrency industry, to hear about his career and experience using OpenBB. In this conversation, he talked about the crucial role Python plays in the world of finance, discussed the immense potential of tools like the OpenBB Terminal, and emphasized the transformative power of community-driven platforms. Roberto's insights provide a valuable perspective on the evolving needs of analysts in the crypto space and explain why OpenBB's commitment to user-centric features, from Excel integration to intuitive interfaces, aligns with the needs of a modern analyst.",
    date: '2023-09-27',
    time: '43 minutes',
  },
  {
    title: 'Meet Cordell Tanny - OpenBB Champion',
    embed: 'https://www.youtube.com/embed/1SYTJpRJJLI?si=zuQ4vU1GyYZEoJOW',
    description: "In a world where the boundaries between traditional fields continue to blur, individuals with diverse experiences often bring fresh and innovative perspectives. Cordell Tanny's story serves as a testament to this. His journey from a Bachelor's degree in Biology at McGill University to the intricate world of finance is as fascinating as it is inspiring. That's why we were excited to interview him as an OpenBB Champion!",
    date: '2023-10-26',
    time: '41 minutes',
  },
];

export default function MediaVideosOpenBBchampions() {
  return <VideosList videos={mediaVideosOpenBBchampions} />;
}
