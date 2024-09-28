import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import React from 'react';

import DetailsButton from '@/components/organisms/DetailsButton';
import StarRating from '@/components/organisms/StarRating';

interface ReceipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  receipeId: string;
  title: string;
  image: string;
  initialRating: number;
}

// Import Pacifico font
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin']
});

const ReceipeCard: React.FC<ReceipeCardProps> = ({
  title,
  image,
  initialRating,
  className,
  receipeId,
  ...rest
}) => {
  return (
    <div
      id={receipeId}
      className={`bg-secondary-base py-2 px-4 rounded-lg w-[235px] h-[235px] min-w-[235px] min-h-[235px] ${className}`}
      {...rest}
    >
      <div>
        <h2 className={`text-2xl font-bold mb-2 text-[#FFFFFF] ${pacifico.className}`}>{title}</h2>
      </div>

      <div className="flex justify-center w-full h-[130px] mb-4">
        <Image
          src={image}
          alt={title}
          width={220}
          height={130}
          className="rounded-md object-cover w-full h-full"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="w-1/2">
          <StarRating aria-label="star" initialRating={initialRating} disabled />
        </div>
        <DetailsButton
          style={{ maxWidth: '40%', width: '40%', height: '20px' }}
          className="text-sm font-bold text-[#4F8056] bg-[#F5F3EC] hover:bg-[#D6D0C7]"
        >
          ver mais
        </DetailsButton>
      </div>
    </div>
  );
};

export default ReceipeCard;
