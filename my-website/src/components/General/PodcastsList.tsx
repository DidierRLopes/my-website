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
      {podcasts.map((podcast) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]">
          <div>
            <div className='justify-left items-start text-xs'>
              {podcast.date}
            </div>
            <h3 className="justify-center items-center text-base mb-2">
              {podcast.title}
            </h3>
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-sm p-2 pr-8 mt-2">
            <span className="font-semibold">
              {podcast.host}
            </span>
            <p>
              {podcast.summary}
            </p>
            <div className="mt-2">
              <a
                href={podcast.link}
                rel="noopener noreferrer"
                target="_blank">
                Learn more
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};