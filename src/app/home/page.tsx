/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import Greeting from '@/components/atoms/Greeting';
import LinkButton from '@/components/atoms/LinkButton';
import Slider from '@/components/atoms/Slider';
import SuggestedReceipe from '@/components/atoms/SuggestedReceipe';
import ReceipeCard from '@/components/molecules/ReceipeCard';
import { BaseLayout } from '@/components/templates/BaseLayout';

type RecipeData = {
  categories: string[];
  difficulty: string;
  ingredient_types: string[];
  picture: string;
  preparation_time: number;
  published_by: string;
  published_by_profile_picture: string;
  published_date: string;
  rating: number;
  recipe_id: number;
  title: string;
};

const HomePage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = useSupabase();
  const [userImage, setUserImage] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<RecipeData[]>();
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeData[]>([]); // New state for filtered recipes

  const handleClickRecipe = (event: any, recipe: RecipeData) => {
    event.preventDefault(); // Prevent default button behavior

    const query = new URLSearchParams({
      recipe_name: recipe.title,
      recipe_image: recipe.picture,
      recipe_rating: recipe.rating?.toString(),
      user_name: recipe.published_by,
      user_image:
        recipe?.published_by_profile_picture ||
        'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
      ingredients:
        'Prepare o arroz, o feijão e o macarrão alem de de tudo e muito mais que isso testando palavras aleatorias pois me prometeram um autoresize então se promoteram ainda terá Prepare o arroz, o feijão e o macarrão alem de de tudo e muito mais que isso testando palavras aleatorias pois me prometeram um autoresize então se promoteram ainda terá',
      instructions: 'Cozinhe tudo por 80 minutos e vai ser isso mesmo.'
    }).toString();

    router.push(`/receita/${recipe.recipe_id}?${query}`); // Redirect to recipe details page
  };

  const getUserImage = async () => {
    if (!user?.id) return;

    try {
      const { data: profile, error } = await supabase
        .from('profile')
        .select('profile_picture') // Select the image field
        .eq('id', user.id) // Filter by user id
        .single(); // Get a single record

      if (error) {
        console.error('Error fetching user image:', error);

        return;
      }

      setUserImage(profile?.profile_picture); // Set the user's image in state
    } catch (err) {
      console.error(err);
    }
  };

  // Call getUserImage when the component mounts
  useEffect(() => {
    getUserImage();
  }, [user]);

  const getRecipeData = useCallback(async () => {
    try {
      const { data: recipe, error } = await supabase.from('recipe_feed').select();

      if (error) {
        console.error('Error fetching user recipes', error);

        return;
      }

      setRecipeData(recipe);
    } catch (err) {
      console.error('Error in getUserRecipes:', err);
    }
  }, [supabase]);

  // Filter recipes to include only those with a non-null profile picture and exclude duplicates
  useEffect(() => {
    if (recipeData) {
      const seenProfilePictures = new Set<string>(); // To track seen profile pictures
      const filtered = recipeData.filter((recipe) => {
        if (
          recipe.published_by_profile_picture &&
          !seenProfilePictures.has(recipe.published_by_profile_picture)
        ) {
          seenProfilePictures.add(recipe.published_by_profile_picture); // Add to the set if it's not a duplicate

          return true; // Keep this recipe in the filtered list
        }

        return false; // Exclude this recipe
      });

      setFilteredRecipes(filtered);
    }
  }, [recipeData]);

  useEffect(() => {
    getRecipeData();
  }, [getRecipeData, user]);

  return (
    <div>
      <BaseLayout>
        <Greeting
          title="Olá, Chef"
          isAuthenticated={!!user?.id}
          userImage={userImage} // Use user image from state
        />
        <div className="my-4">
          <Slider>
            {recipeData?.map((recipe) => (
              <ReceipeCard
                key={recipe.recipe_id}
                receipeId={recipe.recipe_id.toString()}
                title={recipe.title}
                image={recipe.picture}
                initialRating={recipe.rating}
                onClick={(event) => handleClickRecipe(event, recipe)}
              />
            ))}
          </Slider>
        </div>
        <div className="mt-8">
          <p className="font-light font-thin">Chefs pra você conhecer</p>
          <div className="my-4">
            <Slider>
              {filteredRecipes.map((recipe) => (
                <Image
                  key={recipe.recipe_id}
                  src={recipe.published_by_profile_picture || ''}
                  alt={recipe.published_by}
                  width={80}
                  height={70}
                  className="rounded-md mx-1 object-cover min-w-[80px] min-h-[80px] max-h-[80px]"
                  // ADD OnClick
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="my-4 mt-8">
          <div className="flex flex-row justify-between">
            <p>Receitas feitas pra você</p>
            <LinkButton onClick={() => null}>ver mais</LinkButton>
          </div>
          {recipeData?.map((recipe) => (
            <div
              key={recipe.title}
              onClick={(event) => handleClickRecipe(event, recipe)}
              className="my-4"
            >
              <SuggestedReceipe
                key={recipe.recipe_id}
                title={recipe.title}
                initialRating={recipe.rating}
                time={recipe.preparation_time}
                subtitle="Jantar"
              />
            </div>
          ))}
        </div>
      </BaseLayout>
    </div>
  );
};

export default HomePage;
