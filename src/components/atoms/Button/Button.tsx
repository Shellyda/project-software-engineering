import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'default' | 'outline';
  children: React.ReactNode;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ variant, children, loading = false, ...props }) => {
  const baseClasses =
    'px-6 py-2 text-xl font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500';
  const defaultClasses = 'bg-black-primary text-white hover:bg-gray-800';
  const outlineClasses = 'border-2 border-black text-black hover:bg-gray-100';

  const buttonClasses =
    variant === 'default' ? `${baseClasses} ${defaultClasses}` : `${baseClasses} ${outlineClasses}`;

  return (
    <button
      className={`${buttonClasses} flex justify-center items-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin r h-5 w-5 text-white" // Change text-white to text-black for outline variant if needed
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.964 7.964 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
