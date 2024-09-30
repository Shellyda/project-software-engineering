import Image from 'next/image';
import React from 'react';

import StarRating from '@/components/organisms/StarRating';
import Tag from '@/components/organisms/Tag';

// Define the props interface
interface RecipeInformationProps extends React.HTMLAttributes<HTMLDivElement> {
  initialRating: number;
  time: number;
  type: string;
  name: string;
  date: string;
  tags: string[];
}

const RecipeInformation: React.FC<RecipeInformationProps> = ({
  initialRating,
  time,
  type,
  name,
  date,
  tags,
  ...rest
}) => (
  <div className="flex flex-row w-full" {...rest}>
    <Image
      src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
      alt="image"
      width={136}
      height={120}
      className="rounded-md mx-1 object-cover min-w-[130px] mx-2 min-h-[110px] max-h-[120px]"
    />
    <div className="flex flex-col flex-1 justify-between">
      <div>
        <h2 className="text-sm truncate max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </h2>
        <div className="flex flex-row text-sm mb-1">
          <p className="text-xs text-secondary-base">{type} - </p>
          <p className="text-xs text-brown-ds mx-1">{time}min</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <StarRating initialRating={initialRating} disabled style={{ width: '70px' }} />{' '}
          <p className="text-xs">{date}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-0.5">
        {tags.map((tag) => (
          <Tag key={tag} id={tag} value={tag} style={{ height: '20px', width: 'fit-content' }} />
        ))}
      </div>
    </div>
  </div>
);

export default RecipeInformation;
