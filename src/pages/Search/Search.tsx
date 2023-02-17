import React from 'react';
import {
  Box, CircularProgress, Flex, Grid, Img,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SpoonacularService from '../../services/SpoonacularService';

function Search() {
  const [queryParameters] = useSearchParams();

  const searchTerm = queryParameters.get('searchTerm') ?? '';

  const {
    isLoading, data,
  } = useQuery(['spoonacular-search', searchTerm], () => SpoonacularService.searchRecipes(searchTerm));

  return (
    <div>
      <div>
        Résultats:
      </div>

      {isLoading && <CircularProgress />}

      <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
        {data && data.map((recipe) => (
          <Flex key={recipe.id} justifyContent="space-between" flexDir="column">
            <Box textAlign="center">
              {recipe.title}
            </Box>
            <Img src={recipe.image} />
          </Flex>
        ))}
      </Grid>

    </div>
  );
}

export default Search;
