import { Pacifico } from 'next/font/google';
import React from 'react';

import StarRating from '@/components/organisms/StarRating';

interface SuggedtedRecipeProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  time: number;
  initialRating: number;
}

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
});

const SuggedtedRecipe: React.FC<SuggedtedRecipeProps> = ({
  title,
  subtitle,
  time,
  initialRating,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={`flex items-center bg-base-beige rounded-md py-2 px-4 max-w-sm shadow-md`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <h2 className={`text-xl font-bold text-secondary-base ${pacifico.className}`}>{title}</h2>
          <StarRating
            initialRating={initialRating}
            disabled
            style={{ width: '30%', marginLeft: '1rem' }}
          />
        </div>
        <p className="text-light-secondary-base">
          {subtitle} - {time} min
        </p>
      </div>
    </div>
  );
};

export default SuggedtedRecipe;
