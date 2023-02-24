import { Heading, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { Recipe } from '../../interfaces/Recipe';
import SpoonacularService from '../../services/SpoonacularService';

function Home() {
  // const {
  //   isLoading: isLoadingRecipes, data: recipes,
  //   // eslint-disable-next-line max-len
  // } = useQuery(['spoonacular-search'], () => SpoonacularService.searchRandomRecipes());

  const favoriteRecipes: Recipe[] = [
    {
      id: 654959,
      title: 'Pasta With Tuna',
      image: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654857,
      title: 'Pasta On The Border',
      image: 'https://spoonacular.com/recipeImages/654857-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654959,
      title: 'Pasta With Tuna',
      image: 'https://spoonacular.com/recipeImages/654959-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654857,
      title: 'Pasta On The Border',
      image: 'https://spoonacular.com/recipeImages/654857-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
    {
      id: 654883,
      title: 'Pasta Vegetable Soup',
      image: 'https://spoonacular.com/recipeImages/654883-312x231.jpg',
      imageType: 'jpg',
    },
  ];

  // if (isLoadingRecipes) return <Spinner size="xl" />;

  return (
    <div>
      <Heading as="h2" textAlign="center" marginBottom="1rem">Popular recipes</Heading>
      {/* {recipes
        && <Carousel recipes={recipes} />} */}
      <Heading as="h2" textAlign="center" marginBottom="1rem">Your last favorites</Heading>
      <RecipeGrid maxCards={4} recipes={favoriteRecipes} />
      <Heading as="h2" textAlign="center" marginBottom="1rem">Some recipes you may like</Heading>
      <RecipeGrid maxCards={4} recipes={favoriteRecipes} />
    </div>
  );
}

export default Home;
