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
      {courses.map((course, index) => (
        <div key={index} className="mission-container">
          <div className="mission-description">
            <div className='text-xs mb-2'>
              {course.date}, {course.issuer}
            </div>
            <div className="text-base font-semibold mb-4">
              {course.title}
            </div>
          </div>
          <div className="mission-buttons">
            <a
              href={course.link}
              rel="noopener noreferrer"
              target="_blank"
              className="mission-button mission-button--join"
            >
              Certificate here
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};