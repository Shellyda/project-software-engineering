'use client';
import { PencilIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

interface ProfileHeaderProps {
  name: string;
  username: string;
  email: string;
  profileImage: string;
  isMyProfile: boolean;
  onEdit: () => void;
  logout: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  username,
  email,
  profileImage,
  isMyProfile,
  onEdit,
  logout
}) => {
  return (
    <div className="flex flex-col items-center p-6 bg-transparent">
      {/* Profile Image */}
      {isMyProfile && (
        <ArrowLeftStartOnRectangleIcon
          width={30}
          height={30}
          className="absolute top-0 right-0 m-2"
          onClick={logout}
        />
      )}
      <div className="relative">
        <Image
          src={
            profileImage || 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
          }
          alt={`${name}'s profile photo`}
          width={82}
          height={82}
          className="rounded-full max-w-[82px] max-h-[82px] object-cover border border-black-primary"
        />
        {isMyProfile && (
          <button
            onClick={onEdit}
            className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
          >
            <PencilIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>

      <h1 className="mt-4 text-4xl text-gray-800">{name}</h1>

      <div className="flex text-lg text-gray-600">
        <p className="text-xs text-gray-ds-600">@{username} </p>
        <p className="text-xs text-brown-ds">&nbsp;— {email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
