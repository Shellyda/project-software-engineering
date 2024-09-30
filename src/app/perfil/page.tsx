'use client';
import React from 'react';

import SuggestedReceipe from '@/components/atoms/SuggestedReceipe';
import ProfileHeader from '@/components/organisms/ProfileHeader';
import SwitchTabs from '@/components/organisms/SwitchTabs';
import { BaseLayout } from '@/components/templates/BaseLayout';

import RecipeInformation from '../../components/atoms/RecipeInformation';

const Profile = () => {
  const isMyProfile = true; // Replace with your actual logic

  // Array of recipe data for the Feed tab
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
      title: 'Feed',
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
      )
    },
    ...(isMyProfile
      ? [
          {
            title: 'Review',
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
                      // ADD Onclick
                    />
                  </div>
                ))}
              </div>
            )
          }
        ]
      : [])
  ];

  return (
    <div>
      <BaseLayout>
        <ProfileHeader
          onEdit={() => null}
          name="Ana Maria"
          email="anamaria@gmail.com"
          username="lorojose"
          profileImage="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
        />
        <SwitchTabs tabs={tabs} />
      </BaseLayout>
    </div>
  );
};

export default Profile;
