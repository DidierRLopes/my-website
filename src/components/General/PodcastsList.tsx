import React from 'react';

interface Podcast {
  date: string;
  title: string;
  host: string;
  link: string;
  summary: string;
}

interface PodcastsListProps {
  podcasts: Podcast[];
}

export default function PodcastsList({ podcasts }: PodcastsListProps) {

  return (
    <div className="mx-auto mt-8">
      {podcasts.map((podcast, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='text-xs mb-2'>
              {podcast.date}
            </div>
            <div className="font-bold text-base mb-2">
              {podcast.title}
            </div>
            <div className="text-sm mb-2">
              <span className="font-semibold">
                {podcast.host}
              </span>
            </div>
            <p className="text-sm mb-4">
              {podcast.summary}
            </p>
          </div>
          <div className="mission-buttons">
            <a
              href={podcast.link}
              rel="noopener noreferrer"
              target="_blank"
              className="mission-button mission-button--join">
              Learn more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};