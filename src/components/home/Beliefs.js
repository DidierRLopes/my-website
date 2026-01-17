import React from 'react';
import Section from '../common/Section';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Beliefs({ isDesktop, isTablet, githubSrc, githubChartSrc }) {
  const subtitleDesktop = 'Building an open-source legacy, one commit at a time.';
  const subtitleMobile = 'Building an open-source legacy,\none commit at a time.';

  return (
    <Section title="What I believe in" subtitle={isTablet || isDesktop ? subtitleDesktop : subtitleMobile} className="px-4">

    </Section>
  );
}

export default Beliefs; 