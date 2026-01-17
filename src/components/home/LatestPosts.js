import React from 'react';
import Section from '../common/Section';
import BlogHistory from '../BlogHistory';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function LatestPosts({ allPosts, postsHighlight, isDesktop, isTablet }) {
  // Ensure we never display more than 3 highlight posts
  const highlights = (postsHighlight || []).slice(0, 3);

  return (
    <Section title="Latest posts." subtitle="I write so I can think and communicate better.">
    
    </Section>
  );
}

export default LatestPosts; 