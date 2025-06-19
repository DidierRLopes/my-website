import React from 'react';

interface Education {
  school: string;
  degree: string;
  link: string;
  date: string;
  summary: string[];
}

interface EducationListProps {
  education: Education[];
}

export default function EducationList({ education }: EducationListProps) {
  return (
    <div className="mx-auto mt-8">
      {education.map((program, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='text-xs mb-2'>
              {program.date}
            </div>
            <div className='text-sm mb-2'>
              {program.school}
            </div>
            <div className="text-base font-semibold mb-4">
              {program.degree}
            </div>
            <div className="text-sm mb-4">
              {program.summary.map((point, pointIndex) => (
                <p key={pointIndex} className="mb-1">- {point}</p>
              ))}
            </div>
          </div>
          <div className="mission-buttons">
            <a
              href={program.link}
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