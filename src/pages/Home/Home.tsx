import { Heading } from '@chakra-ui/react';
import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { Recipe } from '../../interfaces/Recipe';

function Home() {
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

  return (
    <div>
      <Heading as="h2" textAlign="center" marginBottom="1rem">Popular recipes</Heading>
      <Carousel />
      <Heading as="h2" textAlign="center" marginBottom="1rem">Your last favorites</Heading>
      <RecipeGrid maxCards={5} recipes={favoriteRecipes} />
      <Heading as="h2" textAlign="center" marginBottom="1rem">Some recipes you may like</Heading>
    </div>
  );
}

export default Home;
