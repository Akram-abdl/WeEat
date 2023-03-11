import {
  Box,
  Heading, Spinner, Text,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../../components/Carousel/Carousel';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import useSpoonacular from '../../hooks/useSpoonacular';
import useUser from '../../hooks/useUser';

function Home() {
  const { t } = useTranslation();

  const { user } = useUser();

  const {
    isLoadingSuggestedRecipes, suggestedRecipes, isLoadingFavorites, favorites, isLoadingRandomRecipes, randomRecipes,
  } = useSpoonacular();

  return (
    <Box textAlign="center">
      <Heading as="h2" marginBottom="1rem">{t('popular-recipes')}</Heading>
      {
        isLoadingRandomRecipes ? <Spinner size="xl" /> : !!randomRecipes
          && <Carousel recipes={randomRecipes} />
      }

      <Heading as="h2" marginBottom="1rem">{t('last-favorites')}</Heading>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoadingFavorites && user ? <Spinner size="xl" />
        : favorites
          ? (
            <RecipeGrid maxCards={favorites.length} recipes={favorites} />
          ) : <Text>{t('you-must-be-connected')}</Text>}

      <Heading as="h2" marginBottom="1rem">{t('suggestions')}</Heading>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isLoadingSuggestedRecipes && user
        ? <Spinner size="xl" />
        : suggestedRecipes
          ? <RecipeGrid maxCards={5} recipes={suggestedRecipes} />
          : <Text>{t('you-must-be-connected')}</Text>}
    </Box>
  );
}

export default Home;
