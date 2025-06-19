import React from 'react';

interface Article {
  title: string;
  conference: string;
  link: string;
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticlesList({ articles }: ArticleListProps) {
  return (
    <div className="mx-auto mt-8">
      {articles.map((article, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='text-xs mb-2'>
              {article.conference}
            </div>
            <div className="font-semibold text-base mb-4">
              {article.title}
            </div>
          </div>
          <div className="mission-buttons">
            <a
              href={article.link}
              rel="noopener noreferrer"
              target="_blank"
              className="mission-button mission-button--join"
            >
              Learn more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};