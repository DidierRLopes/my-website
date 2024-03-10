import React from 'react';

interface Course {
  title: string;
  date: string;
  link: string;
  issuer: string;
}

interface CourseListProps {
  courses: Course[];
}

export default function CoursesList({ courses }: CourseListProps) {
  return (
    <div className="mx-auto mt-8">
      {courses.map((course) => (
        <div className="container relative justify-center items-center mb-8 my-4 mx-auto border-[1px] p-2 rounded border-[#0088CC]">
          <div>
            <div className='justify-left items-start text-xs'>
              {course.date}, {course.issuer}
            </div>
            <h3 className="justify-center items-center text-base mt-1 mb-2 font-semibold">
              {course.title}
            </h3>
            <a
              href={course.link}
              rel="noopener noreferrer"
              target="_blank"
              className="justify-center items-center text-base mb-2"
            >
              Certificate here
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};