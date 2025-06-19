import React from 'react';

interface DividerProps {
  variant?: 'solid' | 'dashed';
  width?: 'full' | 'half';
  className?: string;
}

export const DSDivider: React.FC<DividerProps> = ({
  variant = 'solid',
  width = 'full',
  className = '',
}) => {
  const baseClasses = 'ds-divider';
  const variantClasses = {
    solid: '',
    dashed: 'ds-divider--dashed',
  };
  const widthClasses = {
    full: '',
    half: 'ds-divider--half',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${widthClasses[width]} ${className}`.trim();

  return <hr className={classes} />;
};

export default DSDivider;