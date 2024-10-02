/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { ShareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';

import Button from '@/components/atoms/Button/Button';
import Greeting from '@/components/atoms/Greeting';
import StarRating from '@/components/organisms/StarRating';
import { BaseLayout } from '@/components/templates/BaseLayout';

type Recipe = {
  id: number;
  name: string;
  description: string;
  preparation: string;
  rating: number;
  recipe_picture: string;
  created_at: string;
  user_id: string;
};

const RecipePage = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const { user } = useAuth();
  const supabase = useSupabase();
  const router = useRouter();

  const [userData, setUserData] = useState<Recipe>();
  const [isUserRecipe, setIsUserRecipe] = useState<boolean | null>(null);

  const userName = searchParams.get('user_name');
  const recipeName = searchParams.get('recipe_name');
  const recipeImage = searchParams.get('recipe_image');
  const recipeRating = searchParams.get('recipe_rating');
  const userImage = searchParams.get('user_image');

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

  const deleteRecipe = async () => {
    if (!id) return;

    try {
      await supabase.from('recipe').delete().eq('id', id);
    } catch (err) {
      alert(err);
    }
  };

  const getRecipeData = useCallback(async () => {
    if (!id) return;

    try {
      const { data: recipe, error } = await supabase.from('recipe').select().eq('id', id);

      if (error) {
        console.error('Error fetching user recipes', error);

        return;
      }

      setUserData(recipe[0]);
    } catch (err) {
      console.error('Error in getUserRecipes:', err);
    }
  }, [id, supabase, user?.id]);

  useEffect(() => {
    getRecipeData();
  }, [getRecipeData, user]);

  useEffect(() => {
    setIsUserRecipe(user?.id === userData?.user_id);
  }, [userData?.user_id]);

  const handleRating = useCallback(async () => {
    if (!ratingValue) return;
    if (!user?.id) return;

    try {
      await supabase
        .from('recipe_rating')
        .insert([{ recipe_id: id, user_id: user?.id, rating: ratingValue }])
        .select();

      setRatingValue(null);
    } catch (err) {
      setRatingValue(null);
      console.error('Error fetching user recipes', err);
    }
  }, [ratingValue, user?.id]);

  const handleRedirectProfile = (event: any, userId: string | undefined) => {
    event.preventDefault();
    if (!userId) return;

    const query = new URLSearchParams({
      user_id: userId
    }).toString();

    router.push(`/profile?${query}`);
  };

  return (
    <BaseLayout>
      <Greeting
        title={isUserRecipe ? 'Sua receita' : 'Me passa aí!'}
        isAuthenticated={!!user?.id}
        userImage={userImage || ('' as string)}
      />
      {isUserRecipe && (
        <div>
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
        <div
          onClick={(e) => handleRedirectProfile(e, userData?.user_id)}
          className="mt-4 flex flex-row items-center"
        >
          {userImage && (
            <Image
              src={userImage}
              alt={`${userName}'s Recipe`}
              className="max-h-[40px] min-h-[40px] h-auto rounded-full object-cover border border-[#3D2D1D]"
              height={40}
              width={40}
            />
          )}
          <div className="mx-4">
            <p>{userName || 'Usuário sem apelido'}</p>
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
        {userData?.description && (
          <textarea
            value={userData.description}
            className="mt-2 w-full text-[#868686] text-sm rounded-md bg-transparent min-h-[160px] resize-none"
          />
        )}
        <h3 className="mt-8 text-md font-semibold">Modo de preparo</h3>
        {userData?.preparation && (
          <textarea
            value={userData.preparation}
            className="mt-2 w-full text-[#868686] text-sm rounded-md bg-transparent min-h-[160px] resize-none"
          />
        )}
        {!isUserRecipe && user?.id && (
          <>
            <h3 className="mt-8 mb-2 text-md font-semibold">
              Avalie essa receita! Qual nota ela merece?
            </h3>
            <StarRating style={{ width: '50%' }} onVote={handleVote} />
            <Button
              onClick={handleRating}
              variant="default"
              disabled={!recipeRating}
              style={{ width: '200px', height: '50px' }}
              className={`mt-4 w-full mb-6 py-2 px-4 rounded-md transition-colors duration-300 ${
                isButtonEnabled
                  ? 'bg-black-primary text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Enviar
            </Button>
          </>
        )}
      </div>
      {isUserRecipe && (
        <Button
          variant="default"
          style={{ width: '100%', height: '50px', background: '#e80d0d', color: 'white' }}
          className="mt-4 w-full mb-6 py-2 px-4 rounded-md"
          onClick={deleteRecipe}
        >
          Deletar receita
        </Button>
      )}
    </BaseLayout>
  );
};

export default RecipePage;
