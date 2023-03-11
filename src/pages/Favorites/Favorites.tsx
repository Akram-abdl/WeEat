import React from 'react';
import {
  Box, Heading, SimpleGrid, Image, Spinner,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useSpoonacular from '../../hooks/useSpoonacular';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

function Favorites() {
  const {
    user, favorites,
  } = useUser();

  const { favorites: favoritesRecipes, isLoadingFavorites: isLoadingFavoritesRecipes } = useSpoonacular();

  if (!user) return <Navigate to="/" />;

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>My Favorites</Heading>
      {isLoadingFavoritesRecipes && <Spinner size="xl" />}
      {!!favoritesRecipes && !!favorites && (
        <SimpleGrid minChildWidth="30em">
          {favoritesRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Favorites;
