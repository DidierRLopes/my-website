import React from 'react';

interface News {
  date: string;
  title: string;
  magazine: string;
  link: string;
}

interface NewsMentionsListProps {
  news: News[];
}

export default function NewsMentionsList({ news }: NewsMentionsListProps) {

  return (
    <div className="mx-auto mt-8">
      {news.map((single_news) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]">
          <div>
            <div className='justify-left items-start text-xs'>
              {single_news.date} - <strong>{single_news.magazine}</strong>
            </div>
            <h3 className="justify-center items-center text-base mt-1 mb-3">
              {single_news.title}
            </h3>
          </div>
          <a
            href={single_news.link}
            rel="noopener noreferrer"
            target="_blank">
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};