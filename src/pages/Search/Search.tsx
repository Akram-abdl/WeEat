import React from 'react';
import {
  Box, CircularProgress, Flex, Grid, Img, GridItem,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SpoonacularService from '../../services/SpoonacularService';
import Filters from '../../components/Filters/Filters';

function Search() {
  const [queryParameters] = useSearchParams();

  const searchTerm = queryParameters.get('searchTerm') ?? '';

  const {
    isLoading, data,
  } = useQuery(['spoonacular-search', searchTerm], () => SpoonacularService.searchRecipes(searchTerm));

  return (
    <Grid gridTemplateColumns="240px 1fr" gap={2}>
      <Filters />
      <GridItem>
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
      </GridItem>
    </Grid>
  );
}

export default Search;
