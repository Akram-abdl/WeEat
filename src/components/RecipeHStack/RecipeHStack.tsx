import React from 'react';
import {
  HStack,
} from '@chakra-ui/react';
import RecipeCard from '../RecipeCard/RecipeCard';
import { Recipe } from '../../interfaces/Recipe';

interface Props {
  recipes: Recipe[]
  maxCards: number
}

function RecipeHStack({ recipes, maxCards }: Props) {
  return (
    <HStack alignItems="flex-start" justifyContent="center" gap="0.5rem">
      {recipes.slice(0, maxCards).map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </HStack>
  );
}

export default RecipeHStack;
