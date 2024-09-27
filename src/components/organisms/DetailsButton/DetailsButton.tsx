import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const DetailsButton: React.FC<ButtonProps> = ({ children, className, ...rest }) => {
  const baseClasses =
    'bg-base px-6 py-2 text-black font-bold text-xs rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500';

  return (
    <button className={`${baseClasses} ${className || ''}`} {...rest}>
      {children || `ver mais`}
    </button>
  );
};

export default DetailsButton;
