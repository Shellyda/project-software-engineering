'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

import Greeting from '@/components/atoms/Greeting';
import RecipeInformation from '@/components/atoms/RecipeInformation';
import TextInput from '@/components/atoms/TextInput';
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

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [feedRecipes, setFeedRecipes] = useState<RecipeData[]>([]); // State for storing recipe data
  const { user } = useAuth();
  const router = useRouter();
  const supabase = useSupabase(); // Get Supabase instance

  const handleClearInput = () => {
    setSearchValue('');
  };

  const getRecipeData = useCallback(async () => {
    try {
      const { data: recipes, error } = await supabase.from('recipe_feed').select();

      if (error) {
        console.error('Error fetching user recipes', error);

        return;
      }

      setFeedRecipes(recipes); // Set the fetched recipes
    } catch (err) {
      console.error('Error in getUserRecipes:', err);
    }
  }, [supabase]);

  // Fetch recipes on component mount
  useEffect(() => {
    getRecipeData();
  }, [getRecipeData]);

  // Filter recipes based on the search value (case-insensitive)
  const filteredRecipes = feedRecipes?.filter((recipe) =>
    recipe?.title?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClickRecipe = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    recipe: RecipeData
  ) => {
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

  return (
    <BaseLayout>
      <Greeting title="Encontre" isAuthenticated={!!user?.id} userImage="" />
      <div className="my-4">
        <TextInput
          placeholder="Pesquise receitas..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          icon={
            searchValue ? (
              <XCircleIcon
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={handleClearInput}
              />
            ) : (
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            )
          }
        />
      </div>
      <div className="recipe-information flex flex-col gap-4">
        {filteredRecipes?.length > 0 ? (
          filteredRecipes?.map((recipe) => (
            <RecipeInformation
              key={recipe.recipe_id}
              initialRating={recipe.rating}
              time={recipe.preparation_time}
              recipeImage={recipe.picture}
              type={recipe.categories[0]}
              name={recipe.title}
              date={format(new Date(recipe.published_date), 'dd/MM/yyyy')}
              tags={recipe.categories}
              onClick={(event) => handleClickRecipe(event, recipe)}
            />
          ))
        ) : (
          <p className="text-gray-500">Nenhuma receita encontrada.</p>
        )}
      </div>
    </BaseLayout>
  );
};

export default Search;
