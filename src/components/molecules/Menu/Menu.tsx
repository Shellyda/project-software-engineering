import { Flex } from '@chakra-ui/react';
import {
  HomeIcon as HomeOutlineIcon,
  MagnifyingGlassIcon as SearchOutlineIcon,
  StarIcon as StarOutlineIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolidIcon,
  MagnifyingGlassIcon as SearchSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  ChefHatOutlineIcon,
  ChefHatSolidIcon,
  RecipeOutlineIcon,
  RecipeSolidIcon
} from '@/styles/customIcons';

import IconButton from '@/components/atoms/IconButton/IconButton';

export const Menu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  useEffect(() => {
    const tab = searchParams.get('tab');
    const route = pathname.split('/')[1];

    const currentRoute = tab === 'reviews' ? 'profile?tab=reviews' : route || 'home';

    setActiveRoute(currentRoute);
  }, [pathname, searchParams]);

  const HandleIconClick = (routeName: string) => {
    setActiveRoute(routeName);
    router.push(routeName);
  };

  return (
    <Flex
      className="bg-primary"
      w="100%"
      position="fixed"
      bottom={0}
      h={64}
      alignItems="center"
      justifyContent="center"
      gap={25}
    >
      <IconButton
        isActive={activeRoute === 'home'}
        outlineIcon={HomeOutlineIcon}
        solidIcon={HomeSolidIcon}
        onClick={() => HandleIconClick('home')}
      />
      <IconButton
        isActive={activeRoute === 'search'}
        outlineIcon={SearchOutlineIcon}
        solidIcon={SearchSolidIcon}
        onClick={() => HandleIconClick('search')}
      />
      <IconButton
        isActive={activeRoute === 'recipe-creation'}
        outlineIcon={RecipeOutlineIcon}
        solidIcon={RecipeSolidIcon}
        onClick={() => HandleIconClick('recipe-creation')}
      />
      <IconButton
        isActive={activeRoute === 'profile?tab=reviews'}
        outlineIcon={StarOutlineIcon}
        solidIcon={StarSolidIcon}
        onClick={() => HandleIconClick('profile?tab=reviews')}
      />
      <IconButton
        isActive={activeRoute === 'profile'}
        outlineIcon={ChefHatOutlineIcon}
        solidIcon={ChefHatSolidIcon}
        onClick={() => HandleIconClick('profile')}
        width={33}
        height={33}
      />
    </Flex>
  );
};
