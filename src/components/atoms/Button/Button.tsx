import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'default' | 'outline';
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  const baseClasses =
    'px-6 py-2 text-xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500';
  const defaultClasses = 'bg-black-primary text-white hover:bg-gray-800';
  const outlineClasses = 'border-2 border-black text-black hover:bg-gray-100';

  const buttonClasses =
    variant === 'default' ? `${baseClasses} ${defaultClasses}` : `${baseClasses} ${outlineClasses}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
