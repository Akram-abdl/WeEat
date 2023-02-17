import {
  Box, Flex, Grid, Img,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import SpoonacularService from '../../services/SpoonacularService';

function SearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [queryParameters] = useSearchParams();

  const searchTerm = queryParameters.get('searchTerm');

  const handleSearch = async () => {
    if (searchTerm === null || searchTerm === '') return;

    const newRecipes = await SpoonacularService.searchRecipes(searchTerm);

    setRecipes(newRecipes);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <div>
      <div>
        Résultats:
      </div>

      <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
        {recipes.map((recipe) => (
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

export default SearchRecipes;
