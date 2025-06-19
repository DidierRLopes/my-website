import React from 'react';
import Section from '../common/Section';

function OutsideWork({ isDesktop }) {
  return (
    <Section
      title="Outside work?"
      subtitle="In my spare time I do boxing, play soccer, code, read books or play PS5."
      className="md:max-w-[880px]"
    >
      <div className="flex-none overflow-y-scroll rounded-sm text-center mx-auto text-lg p-2 mb-4">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1cA9FfT4NkLqRKCsIcgtGKJXh6P9H15M&ehbc=2E312F&zoom=9"
          width="100%"
          height={isDesktop ? '480' : '220'}
          title="My travels"
          className="mt-2 mb-4"
        />
        <p className="text-sm">
          Nowadays I put work first. But I intend to travel to over 100 different countries.
        </p>
      </div>
    </Section>
  );
}

export default OutsideWork; 