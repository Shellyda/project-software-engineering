'use client';
import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';

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

  return (
    <BaseLayout>
      <Greeting
        title="Encontre"
        isAuthenticated={!!user?.id}
        userImage="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
      />
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
      <div className="flex flex-col gap-4">
        {filteredRecipes?.length > 0 ? (
          filteredRecipes?.map((recipe) => (
            <RecipeInformation
              key={recipe.recipe_id}
              initialRating={recipe.rating}
              time={recipe.preparation_time}
              recipeImage={recipe.picture}
              type="Vegano"
              name={recipe.title}
              date={format(new Date(recipe.published_date), 'dd/MM/yyyy')}
              tags={recipe.categories}
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
