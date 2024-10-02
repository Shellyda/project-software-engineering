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

const Profile = () => {
  const searchParams = useSearchParams();
  const supabase = useSupabase();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('Seu feed');
  const [userData, setuserData] = useState<UserProfile | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe[]>();

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

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'reviews') {
      setActiveTab('Reviews');
    } else {
      setActiveTab('Seu feed');
    }
  }, [searchParams]);

  const suggestedRecipes = [
    {
      title: 'Poke de salmão',
      initialRating: 3,
      time: 30,
      subtitle: 'Almoço'
    },
    {
      title: 'Frango à parmegiana',
      initialRating: 4.5,
      time: 45,
      subtitle: 'Jantar'
    },
    {
      title: 'Spaghetti Carbonara',
      initialRating: 5,
      time: 25,
      subtitle: 'Almoço'
    },
    {
      title: 'Tacos de Carne',
      initialRating: 4,
      time: 35,
      subtitle: 'Jantar'
    },
    {
      title: 'Salada Caesar',
      initialRating: 4.2,
      time: 20,
      subtitle: 'Almoço'
    },
    {
      title: 'Pizza Margherita',
      initialRating: 5,
      time: 50,
      subtitle: 'Jantar'
    },
    {
      title: 'Bolo de Chocolate',
      initialRating: 4.8,
      time: 60,
      subtitle: 'Sobremesa'
    },
    {
      title: 'Sopa de Lentilha',
      initialRating: 4.3,
      time: 40,
      subtitle: 'Almoço'
    },
    {
      title: 'Risoto de Cogumelos',
      initialRating: 4.9,
      time: 45,
      subtitle: 'Jantar'
    },
    {
      title: 'Sanduíche Caprese',
      initialRating: 4.6,
      time: 15,
      subtitle: 'Lanche'
    },
    {
      title: 'Torta de Limão',
      initialRating: 4.7,
      time: 50,
      subtitle: 'Sobremesa'
    },
    {
      title: 'Batata Gratinada',
      initialRating: 4.4,
      time: 40,
      subtitle: 'Jantar'
    },
    {
      title: 'Pão de Queijo',
      initialRating: 4.9,
      time: 25,
      subtitle: 'Café da Manhã'
    },
    {
      title: 'Lasanha Bolonhesa',
      initialRating: 5,
      time: 75,
      subtitle: 'Almoço'
    },
    {
      title: 'Mousse de Maracujá',
      initialRating: 4.5,
      time: 35,
      subtitle: 'Sobremesa'
    }
  ];

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
                {suggestedRecipes.map((receipe) => (
                  <div key={receipe.title} className="mt-4">
                    <SuggestedReceipe
                      key={receipe.title}
                      title={receipe.title}
                      initialRating={receipe.initialRating}
                      time={receipe.time}
                      subtitle={receipe.subtitle}
                      isReview
                      name="Jorge"
                      date="22/07/2024"
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
        {userData?.display_name && (
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
