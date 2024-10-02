'use client';
import { useAuth } from '@/hooks/useAuth';
import { XCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

import Greeting from '@/components/atoms/Greeting';
import RecipeInformation from '@/components/atoms/RecipeInformation';
import TextInput from '@/components/atoms/TextInput';
import { BaseLayout } from '@/components/templates/BaseLayout';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const { user } = useAuth();

  const handleClearInput = () => {
    setSearchValue('');
  };

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

  // Filter recipes based on the search value (case-insensitive)
  const filteredRecipes = feedRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchValue.toLowerCase())
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
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <RecipeInformation
              key={index}
              initialRating={recipe.initialRating}
              time={recipe.time}
              type={recipe.type}
              name={recipe.name}
              date={recipe.date}
              tags={recipe.tags}
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
