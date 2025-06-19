import React from 'react';

interface IndicatorProps {
  variant?: 'red' | 'orange' | 'gray';
  blinking?: boolean;
  className?: string;
}

export const DSIndicator: React.FC<IndicatorProps> = ({
  variant = 'gray',
  blinking = false,
  className = '',
}) => {
  const baseClasses = 'ds-indicator';
  const variantClasses = {
    red: 'ds-indicator--red',
    orange: 'ds-indicator--orange',
    gray: 'ds-indicator--gray',
  };
  const blinkClass = blinking ? 'ds-blink' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${blinkClass} ${className}`.trim();

  return <span className={classes}></span>;
};

export default DSIndicator;