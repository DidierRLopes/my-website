import React from 'react';

const Section = ({ title, subtitle, children, level = 2, className = '' }) => {
  const HeadingTag = `h${level}`;

  return (
    <section className={`mt-16 md:mt-32 mx-auto max-w-[880px] px-3 text-center ${className}`}>
      {title && (
        <HeadingTag className="text-4xl font-bold mb-4">
          {title}
        </HeadingTag>
      )}
      {subtitle && (
        <p className="text-xl mb-2 md:mb-8 whitespace-pre-line">
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
};

export default Section; 