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
      {education.map((program) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]">
          <div>
            <div className='justify-left items-start text-xs'>
              {program.date}
            </div>
            <div className='justify-left items-start text-s mt-2'>
              {program.school}
            </div>
            <h3 className="justify-center items-center text-base mb-2 font-bold">
              {program.degree}
            </h3>
          </div>
          <div className="flex-none overflow-y-scroll rounded-sm mx-auto text-sm p-2 pr-8 mt-2">
            {program.summary.map((point, index) => (
              <p key={index}>- {point}</p>
            ))}
          </div>
          <a
            href={program.link}
            rel="noopener noreferrer"
            target="_blank"
            className="justify-center items-center text-base mb-2"
          >
            Learn more
          </a>
        </div>
      ))}
    </div>
  );
};