import { Pacifico } from 'next/font/google';
import React from 'react';

import StarRating from '@/components/organisms/StarRating';

interface SuggedtedRecipeProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  time: number;
  initialRating: number;
  isReview?: boolean; // New prop to determine if it's a review
  name?: string; // Optional prop for the reviewer's name
  date?: string; // Optional prop for the review date
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
  isReview = false,
  name,
  date,
  ...divProps
}) => {
  // Determine the subtitle based on the isReview prop
  const displaySubtitle = isReview && name && date ? `@${name} - Avaliado em ${date}` : subtitle;

  return (
    <div
      {...divProps}
      className={`flex items-center bg-base-beige rounded-md py-2 px-4 max-w-sm shadow-md`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <h2 className={`text-xl font-bold text-secondary-base ${pacifico.className}`}>{title}</h2>
          <StarRating
            initialRating={initialRating}
            disabled
            style={{ width: '30%', marginLeft: '1rem' }}
          />
        </div>
        <div className="flex">
          <p className="text-light-secondary-base text-xs">{displaySubtitle}</p>
          {!isReview && <p className="text-light-secondary-base text-xs">&nbsp;- {time} min</p>}
        </div>
      </div>
    </div>
  );
};

export default SuggedtedRecipe;
