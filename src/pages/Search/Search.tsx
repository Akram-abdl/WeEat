import React from 'react';
import {
  Grid, GridItem,
} from '@chakra-ui/react';
import Filters from '../../components/Filters/Filters';
import RecipesSearched from '../../components/RecipesSearched/RecipesSearched';

function Search() {
  return (
    <Grid gridTemplateColumns="240px 1fr" gap={2}>
      <GridItem>
        <Filters />
      </GridItem>
      <GridItem>
        <RecipesSearched />
      </GridItem>
    </Grid>
  );
}

export default Search;
