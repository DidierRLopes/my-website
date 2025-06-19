import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'ghost' | 'chevron';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
}

export const DSButton: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  onClick,
  disabled = false,
  href,
  className = '',
}) => {
  const baseClasses = 'ds-button';
  const variantClasses = {
    default: '',
    ghost: 'ds-button--ghost',
    chevron: 'ds-button--chevron',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default DSButton;