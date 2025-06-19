import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export const DSHeading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  className = '',
}) => {
  const baseClasses = 'ds-heading';
  const sizeClasses = {
    1: 'ds-text-xl',
    2: 'ds-text-lg',
    3: 'ds-text-md',
    4: 'ds-text-sm',
    5: 'ds-text-sm',
    6: 'ds-text-xs',
  };

  const classes = `${baseClasses} ${sizeClasses[level]} ${className}`.trim();
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
};

export default DSHeading;