import {
  Heading, Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../../components/Carousel/Carousel';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import SpoonacularService from '../../services/SpoonacularService';
import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';

function Home() {
  const { t } = useTranslation();
  const user = auth.currentUser;

  const {
    isLoading: isLoadingUser, data: userDocument,
  } = useQuery(['firebase-search', user?.uid], () => user && UserService.getUser(user.uid));

  const {
    isLoading, data,
  } = useQuery(
    ['favoriteBulk-search', userDocument],
    () => userDocument && SpoonacularService.searchRecipeInformationBulk({ ids: userDocument.favorites }),
    { retry: false, refetchOnWindowFocus: false },
  );

  const {
    isLoading: isLoadingSuggestedRecipes, data: suggestedRecipes,
  } = useQuery(
    ['spoonacular-suggested-search', userDocument],
    () => userDocument && SpoonacularService.searchRecipes({ query: userDocument.diet }),
    { retry: false, refetchOnWindowFocus: false },
  );

  const {
    isLoading: isLoadingRandomRecipes, data: randomRecipes,
  } = useQuery(
    ['spoonacular-search'],
    () => SpoonacularService.searchRandomRecipes(),
    { retry: false, refetchOnWindowFocus: false },
  );

  if (isLoadingRandomRecipes && isLoadingSuggestedRecipes && isLoadingUser && isLoading) return <Spinner size="xl" />;

  return (
    <div>
      <Heading as="h2" textAlign="center" marginBottom="1rem">{t('popular-recipes')}</Heading>
      {
        randomRecipes
        && <Carousel recipes={randomRecipes} />
      }

      {user && data
        && (
          <>
            <Heading as="h2" textAlign="center" marginBottom="1rem">{t('last-favorites')}</Heading>
            <RecipeGrid maxCards={data.length} recipes={data} />
          </>
        )}

      <Heading as="h2" textAlign="center" marginBottom="1rem">{t('suggestions')}</Heading>
      {suggestedRecipes
        && <RecipeGrid maxCards={suggestedRecipes.length} recipes={suggestedRecipes} />}
    </div>
  );
}

export default Home;
