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
      {experience.map((job) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#0088CC]">
          <div>
            <div className='justify-left items-start text-xs'>
              {job.daterange}
            </div>
            <h3 className="justify-center items-center text-base mt-1 mb-2">
              <strong>{job.title}</strong> @ <a href={job.link} rel="noopener noreferrer" target="_blank">{job.company}</a>
            </h3>
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-sm p-2 pr-8 mt-2">
            {job.summary.map((point, index) => (
              <p key={index}>- {point}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};