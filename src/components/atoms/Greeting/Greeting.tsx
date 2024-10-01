'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import LinkButton from '../LinkButton';

type GreetingProps = {
  isAuthenticated: boolean;
  title: string;
  userImage?: string;
  disableSuffix?: boolean;
};

const Greeting: React.FC<GreetingProps> = ({
  isAuthenticated,
  title,
  userImage,
  disableSuffix
}) => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleProfileRedirect = () => {
    router.push('/profile');
  };

  return (
    <div className="flex flex-row items-center justify-between bg-transparent rounded-lg">
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl text-black-primary">{title}</h1>
      </div>

      {!disableSuffix && (
        <div className="ml-4">
          {isAuthenticated && userImage ? (
            <Image
              src={userImage}
              alt="Profile Picture"
              width={50}
              height={50}
              className="h-[50px] rounded-full object-cover border border-black-primary"
              onClick={handleProfileRedirect}
            />
          ) : (
            <LinkButton onClick={handleLoginRedirect}>Log In</LinkButton>
          )}
        </div>
      )}
    </div>
  );
};

export default Greeting;
