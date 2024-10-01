'use client';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ label, icon, type = 'text', ...props }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    if (type === 'password') {
      setInputType(inputType === 'password' ? 'text' : 'password');
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          style={{ color: '#2E2C25' }}
          className="text-black-primary text-purple-600 text-sm font-bold"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          aria-label="code"
          className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-transparent placeholder-secondary-base"
          {...props}
        />
        <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
          {type === 'password' ? (
            <span onClick={togglePasswordVisibility}>
              {inputType === 'password' ? (
                <EyeSlashIcon data-testid="icon" className="h-6 w-6" />
              ) : (
                <EyeIcon data-testid="icon" className="h-6 w-6" />
              )}{' '}
            </span>
          ) : (
            icon
          )}
        </div>
      </div>
    </div>
  );
};

export default InputWithIcon;
