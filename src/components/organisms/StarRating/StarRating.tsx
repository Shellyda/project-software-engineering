// StarRating.tsx
'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface StarRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  initialRating?: number; // For the viewing option
  onVote?: (rating: number) => void; // For the voting option
  disabled?: boolean; // New prop to disable voting
}

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onVote,
  disabled = false,
  ...props
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleMouseOver = (index: number) => {
    if (!disabled) {
      setHoveredRating(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (index: number) => {
    if (!disabled) {
      setRating(index);
      if (onVote) {
        onVote(index); // Call the onVote function if provided
      }
    }
  };

  return (
    <div className="flex space-x-1" {...props}>
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1; // Star index starts from 1
        const isFilled = hoveredRating ? starIndex <= hoveredRating : starIndex <= rating;

        return (
          <button
            key={starIndex}
            onMouseOver={() => handleMouseOver(starIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starIndex)}
            className={`focus:outline-none ${disabled ? 'cursor-not-allowed' : ''}`} // Add cursor style for disabled
            disabled={disabled} // Disable the button if the prop is true
            aria-label={starIndex.toString()}
            id={isFilled ? 'text-primary' : 'secondary-base'}
          >
            <StarIcon
              fill="currentColor"
              className={`h-full w-full ${isFilled ? 'text-primary' : 'secondary-base'}`} // Adjust colors here
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
