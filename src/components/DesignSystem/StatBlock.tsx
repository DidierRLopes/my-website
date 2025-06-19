import React from 'react';

interface StatBlockProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const DSStatBlock: React.FC<StatBlockProps> = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  const baseClasses = 'ds-stat-block';
  const orientationClasses = {
    horizontal: '',
    vertical: 'ds-stat-block--vertical',
  };

  const classes = `${baseClasses} ${orientationClasses[orientation]} ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default DSStatBlock;