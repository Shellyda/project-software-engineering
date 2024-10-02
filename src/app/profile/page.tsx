'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSupabase } from '@/hooks/useSupabase';
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

const Profile = () => {
  const searchParams = useSearchParams();
  const supabase = useSupabase();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('Seu feed');
  const [userData, setuserData] = useState<UserProfile | null>(null);

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

  // Call getUserImage when the component mounts
  useEffect(() => {
    getUserData();
  }, [getUserData, user, userId]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'reviews') {
      setActiveTab('Reviews');
    } else {
      setActiveTab('Seu feed');
    }
  }, [searchParams]);

  const feedRecipes = [
    {
      initialRating: 3,
      time: 45,
      type: 'Almoço',
      name: 'Abóboras maciças',
      date: '11/03/2001',
      tags: ['vegano', 'fácil', 'Até 15 min']
    },
    {
      initialRating: 4,
      time: 30,
      type: 'Jantar',
      name: 'Salada de Quinoa',
      date: '20/05/2022',
      tags: ['vegetariano', 'saudável', 'Até 30 min']
    },
    {
      initialRating: 5,
      time: 60,
      type: 'Sobremesa',
      name: 'Bolo de Chocolate',
      date: '12/07/2019',
      tags: ['doce', 'favorito', 'Até 1 hora']
    },
    {
      initialRating: 2,
      time: 20,
      type: 'Café da Manhã',
      name: 'Panquecas Simples',
      date: '15/08/2018',
      tags: ['rápido', 'fácil', 'Até 20 min']
    },
    {
      initialRating: 5,
      time: 50,
      type: 'Jantar',
      name: 'Lasanha de Berinjela',
      date: '25/09/2020',
      tags: ['vegetariano', 'fácil', 'Até 1 hora']
    },
    {
      initialRating: 3,
      time: 10,
      type: 'Lanche',
      name: 'Sanduíche Natural',
      date: '01/01/2023',
      tags: ['saudável', 'rápido', 'Até 10 min']
    }
  ];

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
          {feedRecipes.map((recipe, index) => (
            <RecipeInformation
              key={index}
              initialRating={recipe.initialRating}
              time={recipe.time}
              type={recipe.type}
              name={recipe.name}
              date={recipe.date}
              tags={recipe.tags}
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
        {userData?.profile_picture && (
          <ProfileHeader
            onEdit={() => null}
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
