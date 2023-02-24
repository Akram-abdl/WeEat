import {
  Flex,
  Grid, GridItem, Heading,
} from '@chakra-ui/react';
import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
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
  ];

  return (
    <div>
      <Heading as="h2" textAlign="center">Popular recipes</Heading>
      <Carousel />
      <Heading as="h2" textAlign="center">Your last 3 favorites</Heading>

      <Flex alignItems="center" justifyContent="center">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {favoriteRecipes
            ? favoriteRecipes.map((favorite) => (
              <GridItem>
                {' '}
                <RecipeCard recipe={favorite} />
                {' '}
              </GridItem>
            ))
            : <p>No favorites found.</p>}
        </Grid>
      </Flex>
      <Heading as="h2" textAlign="center">Some recipes you may like</Heading>
    </div>
  );
}

export default Home;
