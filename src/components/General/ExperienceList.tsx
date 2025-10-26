import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Experience {
  title: string;
  company: string;
  link: string;
  daterange: string;
  summary: string | string[]; // Support both string (markdown) and string[] (legacy bullet points)
}

interface ExperienceListProps {
  experience: Experience[];
}

export default function ExperienceList({ experience }: ExperienceListProps) {
  const renderSummary = (summary: string | string[]) => {
    // If it's an array (legacy format), convert to markdown bullet list
    if (Array.isArray(summary)) {
      const markdownList = summary.map(point => `- ${point}`).join('\n');
      return (
        <div className="text-sm mb-4">
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-mission-text-color hover:underline"
                >
                  {children}
                </a>
              ),
              p: ({ children }) => <p className="mb-2 text-gray-700 dark:text-gray-300">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 text-gray-700 dark:text-gray-300">{children}</ol>,
              li: ({ children }) => <li className="mb-1 text-gray-700 dark:text-gray-300">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>,
              em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
              h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-3 text-gray-900 dark:text-gray-100">{children}</h3>,
            }}
          >
            {markdownList}
          </ReactMarkdown>
        </div>
      );
    }
    
    // If it's a string, render as markdown
    return (
      <div className="text-sm mb-4">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-mission-text-color hover:underline"
              >
                {children}
              </a>
            ),
            p: ({ children }) => <p className="mb-2 text-gray-700 dark:text-gray-300">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-5 mb-2 text-gray-700 dark:text-gray-300">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5 mb-2 text-gray-700 dark:text-gray-300">{children}</ol>,
            li: ({ children }) => <li className="mb-1 text-gray-700 dark:text-gray-300">{children}</li>,
            strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-gray-100">{children}</strong>,
            em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
            h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-3 text-gray-900 dark:text-gray-100">{children}</h3>,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="mx-auto mt-8">
      {experience.map((job, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='text-xs mb-2'>
              {job.daterange}
            </div>
            <div className="text-base mb-4">
              <strong>{job.title}</strong> @ <a href={job.link} rel="noopener noreferrer" target="_blank" className="text-mission-text-color hover:underline">{job.company}</a>
            </div>
            {renderSummary(job.summary)}
          </div>
        </div>
      ))}
    </div>
  );
};