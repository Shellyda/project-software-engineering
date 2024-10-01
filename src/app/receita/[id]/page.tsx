'use client';
import { ShareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Greeting from '@/components/atoms/Greeting';
import StarRating from '@/components/organisms/StarRating';
import { BaseLayout } from '@/components/templates/BaseLayout';

const RecipePage = () => {
  const params = useParams();
  const { id } = params;

  const userId = 'exampleUserId';

  const searchParams = useSearchParams();
  const userName = searchParams.get('user_name');
  const recipeName = searchParams.get('recipe_name');
  const recipeImage = searchParams.get('recipe_image');
  const recipeRating = searchParams.get('recipe_rating');
  const ingredients = searchParams.get('ingredients');
  const instructions = searchParams.get('instructions');

  const isUserRecipe = id === userId;

  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const isButtonEnabled = ratingValue !== null;

  const handleVote = (rating: number) => {
    setRatingValue(rating);
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <BaseLayout>
      <Greeting
        title={isUserRecipe ? 'Sua receita' : 'Me passa aí!'}
        isAuthenticated={true}
        userImage={recipeImage as string}
      />
      {isUserRecipe && (
        <div>
          <p className="color-base-beige text-xs" style={{ color: '#7B4D1F' }}>
            Edite ou adicione informações...
          </p>
          <p className="color-base-beige text-xs" style={{ color: '#7B4D1F' }}>
            Passa essa receita por aí!
          </p>
        </div>
      )}
      <div>
        <div className="mt-8 flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">{recipeName}</h1>
          <ShareIcon width={15} height={15} onClick={handleCopyLink} className="cursor-pointer" />
        </div>
        <div className="mt-4 flex flex-row items-center">
          {recipeImage && (
            <Image
              src={recipeImage}
              alt={`${userName}'s Recipe`}
              className="max-h-[40px] min-h-[40px] h-auto rounded-full object-cover border border-[#3D2D1D]"
              height={40}
              width={40}
            />
          )}
          <div className="mx-4">
            <p>{userName}</p>
            <StarRating
              style={{ width: '80px' }}
              disabled={false}
              initialRating={Number(recipeRating)}
              onVote={handleVote}
            />
          </div>
        </div>
        {recipeImage && (
          <Image
            src={recipeImage}
            alt={`${userName}'s Recipe`}
            className="mt-2 w-full max-h-[232px] h-auto rounded-md object-cover"
            height={40}
            width={200}
          />
        )}
        <h3 className="mt-8 text-md font-semibold">Ingredientes</h3>
        {ingredients && (
          <p className="mt-2 w-full text-[#868686] text-sm rounded-md bg-transparent resize-none">
            {ingredients}
          </p>
        )}
        <h3 className="mt-8 text-md font-semibold">Modo de preparo</h3>
        {instructions && (
          <p className="mt-2 w-full text-[#868686] text-sm rounded-md bg-transparent resize-none">
            {instructions}
          </p>
        )}
        <h3 className="mt-8 mb-2 text-md font-semibold">
          Avalie essa receita! Qual nota ela merece?
        </h3>
        <StarRating style={{ width: '50%' }} onVote={handleVote} />
        <Button
          variant="default"
          disabled={isButtonEnabled}
          style={{ width: '200px', height: '50px' }}
          className={`mt-4 w-full mb-6 py-2 px-4 rounded-md transition-colors duration-300 ${
            isButtonEnabled
              ? 'bg-black-primary text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Enviar
        </Button>
      </div>
    </BaseLayout>
  );
};

export default RecipePage;
