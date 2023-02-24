import { Heading, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import SpoonacularService from '../../services/SpoonacularService';
import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';

function Home() {
  const user = auth.currentUser;

  const {
    isLoading: isLoadingUser, data: userDocument,
  } = useQuery(['firebase-search', user?.uid], () => user && UserService.getUser(user.uid));

  const {
    isLoading, data,
  } = useQuery(
    ['favoriteBulk-search', userDocument],
    () => userDocument && SpoonacularService.searchRecipeInformationBulk({ ids: userDocument.favorites }),
  );

  const {
    isLoading: isLoadingSuggestedRecipes, data: suggestedRecipes,
  } = useQuery(['spoonacular-search', userDocument], () => userDocument && SpoonacularService.searchRecipes({ query: 'vegetarian' }));

  const {
    isLoading: isLoadingRandomRecipes, data: randomRecipes,
  } = useQuery(['spoonacular-search'], () => SpoonacularService.searchRandomRecipes());

  if (isLoadingRandomRecipes && isLoadingSuggestedRecipes && isLoadingUser && isLoading) return <Spinner size="xl" />;

  return (
    <div>
      <Heading as="h2" textAlign="center" marginBottom="1rem">Popular recipes</Heading>
      {randomRecipes
        && <Carousel recipes={randomRecipes} />}
      <Heading as="h2" textAlign="center" marginBottom="1rem">Your last favorites</Heading>
      {data
        && <RecipeGrid maxCards={data.length} recipes={data} />}
      <Heading as="h2" textAlign="center" marginBottom="1rem">Some recipes you may like</Heading>
      {suggestedRecipes
        && <RecipeGrid maxCards={suggestedRecipes.length} recipes={suggestedRecipes} />}
    </div>
  );
}

export default Home;
