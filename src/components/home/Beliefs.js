import React from 'react';
import Section from '../common/Section';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Beliefs({ isDesktop, isTablet, githubSrc, githubChartSrc }) {
  const subtitleDesktop = 'Most impactful work is making invisible systems visible, so more people can navigate them';
  const subtitleMobile = 'Most impactful work is making invisible systems visible, so more people can navigate them.';

  return (
    <Section title="What I believe in" subtitle={isTablet || isDesktop ? subtitleDesktop : subtitleMobile} className="px-4">

    </Section>
  );
}

export default Beliefs; 