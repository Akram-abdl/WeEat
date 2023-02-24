import React from 'react';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../interfaces/Recipe';

interface Props {
  recipes: Recipe[]
  maxCards: number
}

function RecipeGrid({ recipes, maxCards }: Props) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Grid templateColumns={`repeat(${maxCards > 5 ? 5 : maxCards}, 1fr)`} gap={6}>
        {recipes.slice(0, maxCards).map((recipe) => (
          <GridItem>
            {' '}
            <RecipeCard recipe={recipe} />
            {' '}
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}

export default RecipeGrid;
