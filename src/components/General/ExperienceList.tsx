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

  // Group experiences by company
  const groupedExperiences = experience.reduce((acc, job) => {
    const existingCompany = acc.find(group => group.company === job.company);
    if (existingCompany) {
      existingCompany.roles.push(job);
    } else {
      acc.push({
        company: job.company,
        link: job.link,
        roles: [job]
      });
    }
    return acc;
  }, [] as { company: string; link: string; roles: Experience[] }[]);

  return (
    <div className="mx-auto mt-8">
      {groupedExperiences.map((companyGroup, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            {companyGroup.roles.length === 1 ? (
              // Single role at company - render as before
              <>
                <div className='text-xs mb-2'>
                  {companyGroup.roles[0].daterange}
                </div>
                <div className="text-base mb-4">
                  <strong>{companyGroup.roles[0].title}</strong> @ <a href={companyGroup.link} rel="noopener noreferrer" target="_blank" className="text-mission-text-color hover:underline">{companyGroup.company}</a>
                </div>
                {renderSummary(companyGroup.roles[0].summary)}
              </>
            ) : (
              // Multiple roles at same company - group them
              <>
                <div className="text-base mb-4">
                  <a href={companyGroup.link} rel="noopener noreferrer" target="_blank" className="text-mission-text-color hover:underline font-bold">{companyGroup.company}</a>
                </div>
                {companyGroup.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className={roleIndex > 0 ? "mt-6 pt-6 border-t border-gray-700 dark:border-gray-600" : ""}>
                    <div className='text-xs mb-2'>
                      {role.daterange}
                    </div>
                    <div className="text-base mb-4">
                      <strong>{role.title}</strong>
                    </div>
                    {renderSummary(role.summary)}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};