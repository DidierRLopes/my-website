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
      {articles.map((article) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]">
          <div>
            <div className='justify-left items-start text-xs'>
              {article.conference}
            </div>
            <h3 className="justify-center items-center font-semibold text-base mt-1 mb-3">
              {article.title}
            </h3>
            <a
              href={article.link}
              rel="noopener noreferrer"
              target="_blank"
              className="justify-center items-center text-base mb-2"
            >
              Learn more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};