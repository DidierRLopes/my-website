import React from 'react';
import VideosList from '../General/VideosList';

const data = [
  {
    title: 'Protocols powered by Chronicle Proof of Asset.q',
    link: 'https://x.com/ChronicleLabs/status/2029993834223165713?s=20',
    description: 'An overview of how Chronicle Protocol\'s Proof of Asset model powers protocols across the Web3 ecosystem.',
    date: '2025',
    location: '',
  },
  {
    title: 'Truth is onchain.',
    link: 'https://x.com/ChronicleLabs/status/2024874279431467108/video/1',
    description: 'Chronicle Protocol — the original oracle on Ethereum, bringing verifiable, onchain truth to the Web3 ecosystem.',
    date: '2025',
    location: '',
  },
];

export default function MediaProductVideos() {
  return <VideosList videos={data} />;
}
