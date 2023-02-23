import React from 'react';
import {
  Box, CircularProgress, Flex, Grid, IconButton, Img,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import filterIngredientsAtom from '../../atoms/filtersAtom';
import SpoonacularService from '../../services/SpoonacularService';
import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';

function RecipesSearched() {
  const [queryParameters] = useSearchParams();
  const queryClient = useQueryClient();

  const searchTerm = queryParameters.get('searchTerm') ?? '';
  const filterIngredients = useRecoilValue(filterIngredientsAtom);

  const { currentUser } = auth;

  const {
    isLoading: isLoadingRecipes, data: recipes,
    // eslint-disable-next-line max-len
  } = useQuery(['spoonacular-search', searchTerm, filterIngredients], () => SpoonacularService.searchRecipes({ query: searchTerm, includeIngredients: filterIngredients }));

  const {
    isLoading: isLoadingFavorites, data: favorites, refetch: refetchFavorites,
  } = useQuery(['favorites-search', currentUser?.uid], () => currentUser && UserService.getFavorites(currentUser.uid));

  const mutateAddFavorite = useMutation((recipeId: number) => UserService.addFavorite(currentUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search', currentUser?.uid]);
    },
  });

  const mutateRemoveFavorite = useMutation((recipeId: number) => UserService.removeFavorite(currentUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search', currentUser?.uid]);
    },
  });

  const handleFavoriteClick = async (recipeId: number) => {
    if (currentUser && favorites) {
      if (favorites.includes(recipeId)) {
        await mutateRemoveFavorite.mutateAsync(recipeId);
      } else {
        await mutateAddFavorite.mutateAsync(recipeId);
      }

      // update the favorites query data
      refetchFavorites();
    }
  };
  if (isLoadingRecipes || isLoadingFavorites) return <CircularProgress />;

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
      {recipes && recipes.map((recipe) => (
        <Flex key={recipe.id} justifyContent="space-between" flexDir="column">
          <Box
            bg="gray.100"
            boxShadow="2xl"
            rounded="lg"
            p={4}
            _hover={{ bg: 'gray.200' }}
            position="relative"
          >
            <IconButton
              icon={<FaHeart color={favorites && favorites.includes(recipe.id) ? 'red' : 'white'} />}
              aria-label="favorite"
              onClick={(event) => {
                event.preventDefault();
                handleFavoriteClick(recipe.id);
              }}
              position="absolute"
              top="0"
              right="0"
              m={2}
              size="md"
              colorScheme="transparent"
              // border="2px"
              // borderColor='red'
              zIndex="1"
            />

            <Box textAlign="center">
              {recipe.title}
            </Box>
            <Img src={recipe.image} />
          </Box>
        </Flex>
      ))}
    </Grid>
  );
}

export default RecipesSearched;
