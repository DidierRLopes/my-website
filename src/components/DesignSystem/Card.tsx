import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'semi-black';
  className?: string;
}

export const DSCard: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'ds-card';
  const variantClasses = {
    default: '',
    'semi-black': 'ds-card--semi-black',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default DSCard;