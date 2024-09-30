'use client';
import Image from 'next/image';

import Greeting from '@/components/atoms/Greeting';
import LinkButton from '@/components/atoms/LinkButton';
import Slider from '@/components/atoms/Slider';
import SuggestedReceipe from '@/components/atoms/SuggestedReceipe';
import ReceipeCard from '@/components/molecules/ReceipeCard';
import { BaseLayout } from '@/components/templates/BaseLayout';

const recipes = [
  {
    recipeId: '1',
    title: 'Spaghetti Carbonara',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.5
  },
  {
    recipeId: '2',
    title: 'Chicken Tikka Masala',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.7
  },
  {
    recipeId: '3',
    title: 'Beef Stroganoff',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.3
  },
  {
    recipeId: '4',
    title: 'Vegetable Stir Fry',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.2
  },
  {
    recipeId: '5',
    title: 'Pancakes',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.8
  },
  {
    recipeId: '6',
    title: 'Caesar Salad',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.6
  },
  {
    recipeId: '7',
    title: 'Grilled Salmon',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.9
  },
  {
    recipeId: '8',
    title: 'Chocolate Cake',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.7
  },
  {
    recipeId: '9',
    title: 'Lentil Soup',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.5
  },
  {
    recipeId: '10',
    title: 'Apple Pie',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D',
    initialRating: 4.4
  }
];

const chefs = [
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    name: 'Ashita Akaia',
    photo:
      'https://images.unsplash.com/photo-1654922207993-2952fec328ae?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D'
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

const HomePage = () => (
  <div>
    <BaseLayout>
      <Greeting
        title="Olá, Chef"
        isAuthenticated={true}
        userImage="https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
      />
      <div className="my-4">
        <Slider>
          {recipes.map((recipe) => (
            <ReceipeCard
              key={recipe.recipeId}
              receipeId={recipe.recipeId}
              title={recipe.title}
              image={recipe.image}
              initialRating={recipe.initialRating}
              //ADD onClickDetails={(id: string) => null}
            />
          ))}
        </Slider>
      </div>
      <div className="mt-8">
        <p className="font-light font-thin">Chefs pra você conhecer</p>
        <div className="my-4">
          <Slider>
            {chefs.map((chef) => (
              <Image
                key={chef.name}
                src={chef.photo}
                alt={chef.name}
                width={80}
                height={70}
                className="rounded-md mx-1 object-cover min-w-[80px] max-h-[80px]"
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
        {suggestedRecipes.map((receipe) => (
          <div key={receipe.title} className="my-4">
            <SuggestedReceipe
              key={receipe.title}
              title={receipe.title}
              initialRating={receipe.initialRating}
              time={receipe.time}
              subtitle={receipe.subtitle}
              // ADD Onclick
            />
          </div>
        ))}
      </div>
    </BaseLayout>
  </div>
);

export default HomePage;
