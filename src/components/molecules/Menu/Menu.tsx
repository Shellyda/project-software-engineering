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
import { usePathname, useRouter } from 'next/navigation';
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
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  useEffect(() => {
    const route = pathname.split('/')[1];
    setActiveIcon(route || 'home');
  }, [pathname]);

  const HandleIconClick = (iconName: string) => {
    setActiveIcon(iconName);
    router.push(`/${iconName}`);
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
        isActive={activeIcon === 'home'}
        outlineIcon={HomeOutlineIcon}
        solidIcon={HomeSolidIcon}
        onClick={() => HandleIconClick('home')}
      />
      <IconButton
        isActive={activeIcon === 'search'}
        outlineIcon={SearchOutlineIcon}
        solidIcon={SearchSolidIcon}
        onClick={() => HandleIconClick('search')}
      />
      <IconButton
        isActive={activeIcon === 'recipe-creation'}
        outlineIcon={RecipeOutlineIcon}
        solidIcon={RecipeSolidIcon}
        onClick={() => HandleIconClick('recipe-creation')}
      />
      <IconButton
        isActive={activeIcon === 'reviews'}
        outlineIcon={StarOutlineIcon}
        solidIcon={StarSolidIcon}
        onClick={() => HandleIconClick('reviews')}
      />
      <IconButton
        isActive={activeIcon === 'perfil'}
        outlineIcon={ChefHatOutlineIcon}
        solidIcon={ChefHatSolidIcon}
        onClick={() => HandleIconClick('perfil')}
        width={33}
        height={33}
      />
    </Flex>
  );
};
