import React, { useEffect } from 'react';
import {
  Grid, Spinner, SimpleGrid, GridItem,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import useSpoonacular from '../../hooks/useSpoonacular';
import RecipeCard from '../RecipeCard/RecipeCard';

function RecipesSearched() {
  const [queryParameters] = useSearchParams();

  const searchTerm = queryParameters.get('searchTerm') ?? '';

  const {
    setSearchTerm, isLoadingSearchRecipes, searchRecipes,
  } = useSpoonacular();

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm]);

  if (isLoadingSearchRecipes) return <Spinner size="xl" />;

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
      {searchRecipes && (
        <SimpleGrid minChildWidth="30em">
          {searchRecipes.map((recipe) => (
            <GridItem>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </Grid>
  );
}

export default RecipesSearched;
