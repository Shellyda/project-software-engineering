import React from 'react';

type UnderlineButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

const UnderlineButton: React.FC<UnderlineButtonProps> = ({ children, className, ...rest }) => {
  const baseClasses =
    'bg-transparent text-secondary-base underline font-bold text-base rounded outline-none transition duration-200';

  return (
    <button className={`${baseClasses} ${className || ''}`} {...rest}>
      {children}
    </button>
  );
};

export default UnderlineButton;
