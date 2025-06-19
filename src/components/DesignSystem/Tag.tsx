import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant?: 'red' | 'orange' | 'gray';
  className?: string;
}

export const DSTag: React.FC<TagProps> = ({
  children,
  variant = 'gray',
  className = '',
}) => {
  const baseClasses = 'ds-tag';
  const variantClasses = {
    red: 'ds-tag--red',
    orange: 'ds-tag--orange',
    gray: 'ds-tag--gray',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default DSTag;