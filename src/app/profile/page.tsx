/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

import SuggestedReceipe from '@/components/atoms/SuggestedReceipe';
import ProfileHeader from '@/components/organisms/ProfileHeader';
import SwitchTabs from '@/components/organisms/SwitchTabs';
import { BaseLayout } from '@/components/templates/BaseLayout';

import RecipeInformation from '../../components/atoms/RecipeInformation';

type UserProfile = {
  id: string;
  display_name: string;
  email: string;
  profile_picture: string;
  created_at: string; // You can also use Date if you prefer parsing the timestamp
};

type Recipe = {
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

type Rating = {
  rating_id: number;
  rating: number;
  rating_date: string;
  recipe_id: number;
  recipe_name: string;
  recipe_picture: string;
  review: string | null;
  reviewer_name: string;
  reviewer_profile_picture: string;
};

const Profile = () => {
  const searchParams = useSearchParams();
  const supabase = useSupabase();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('Seu feed');
  const [userData, setuserData] = useState<UserProfile | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe[]>();
  const [suggestedRecipes, setSuggestedRecipes] = useState<Rating[]>();

  const userId = searchParams.get('user_id');
  const isMyProfile = userId === null;

  const getUserData = useCallback(async () => {
    // Ensure user or userId is available
    const id = userId || user?.id;
    if (!id) return; // If neither are available, exit early

    try {
      const { data: profile, error } = await supabase
        .from('profile')
        .select()
        .eq('id', id) // Use the correct id (either the current user's id or the query param userId)
        .single();

      if (error) {
        console.error('Error fetching user image:', error);

        return;
      }

      setuserData(profile); // Ensure correct column name for profile image
    } catch (err) {
      console.error('Error in getUserImage:', err);
    }
  }, [supabase, user?.id, userId]);

  const getRecipeData = useCallback(async () => {
    const id = userData?.display_name;
    if (!id) return;

    try {
      const { data: recipe, error } = await supabase
        .from('recipe_feed')
        .select()
        .eq('published_by', id);

      if (error) {
        console.error('Error fetching user recipes', error);

        return;
      }

      setRecipeData(recipe);
    } catch (err) {
      console.error('Error in getUserRecipes:', err);
    }
  }, [supabase, userData]);

  useEffect(() => {
    getUserData();
  }, [getUserData, user, userId]);

  useEffect(() => {
    getRecipeData();
  }, [getRecipeData, user, userId]);

  const handleReviews = useCallback(async () => {
    if (!user?.id) return;

    const { data } = await supabase.rpc('get_user_recipe_ratings', {
      _user_id: user?.id
    });

    setSuggestedRecipes(data);
  }, [user?.id]);

  useEffect(() => {
    handleReviews();
  }, [handleReviews]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'reviews') {
      setActiveTab('Reviews');
    } else {
      setActiveTab('Seu feed');
    }
  }, [searchParams]);

  const handleClickRecipe = (event: any, recipe: Recipe) => {
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

  const tabs = [
    {
      title: 'Seu feed',
      content: (
        <div className="flex flex-col gap-4">
          {recipeData?.map((recipe) => (
            <RecipeInformation
              key={recipe.recipe_id}
              initialRating={recipe.rating}
              time={recipe.preparation_time || 0}
              type="Vegano"
              recipeImage={recipe.picture}
              name={recipe.title}
              date={format(new Date(recipe.published_date), 'dd/MM/yyyy')}
              tags={recipe.categories}
              onClick={(event) => handleClickRecipe(event, recipe)}
            />
          ))}
        </div>
      ),
      path: 'feed'
    },
    ...(isMyProfile
      ? [
          {
            title: 'Reviews',
            content: (
              <div>
                {suggestedRecipes?.map((receipe) => (
                  <div key={receipe.recipe_name} className="mt-4">
                    <SuggestedReceipe
                      key={receipe.recipe_id}
                      title={receipe.recipe_name}
                      initialRating={receipe.rating}
                      time={0}
                      subtitle={receipe.reviewer_name}
                      isReview
                      name="Jorge"
                      date={format(new Date(receipe.rating_date), 'dd/MM/yyyy')}
                    />
                  </div>
                ))}
              </div>
            ),
            path: 'reviews'
          }
        ]
      : [])
  ];

  return (
    <div>
      <BaseLayout>
        {userData?.email && (
          <ProfileHeader
            onEdit={() => router.push('/edit')}
            logout={logout}
            isMyProfile={isMyProfile && !!user?.id}
            name={userData?.display_name}
            email={userData?.email}
            username={userData?.display_name}
            profileImage={userData?.profile_picture}
          />
        )}
        <SwitchTabs tabs={tabs} activeTab={activeTab} />
      </BaseLayout>
    </div>
  );
};

export default Profile;
