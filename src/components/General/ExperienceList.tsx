import React from 'react';

interface Experience {
  title: string;
  company: string;
  link: string;
  daterange: string;
  summary: string[];
}

interface ExperienceListProps {
  experience: Experience[];
}

export default function ExperienceList({ experience }: ExperienceListProps) {
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
            <div className="text-sm mb-4">
              {job.summary.map((point, pointIndex) => (
                <p key={pointIndex} className="mb-1">- {point}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};