import React from 'react';
import {
  Box, CircularProgress, Flex, Grid, IconButton, Img,
} from '@chakra-ui/react';
import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import SpoonacularService from '../../services/SpoonacularService';
import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';

function Search() {
  const [queryParameters] = useSearchParams();
  const queryClient = useQueryClient();

  const searchTerm = queryParameters.get('searchTerm') ?? '';

  const myUser = auth.currentUser;

  const {
    isLoading, data,
  } = useQuery(['spoonacular-search', searchTerm], () => SpoonacularService.searchRecipes(searchTerm));

  const {
    isLoading: isLoadingFavorites, data: favorites, refetch: refetchFavorites,
  } = useQuery(['favorites-search', myUser?.uid], () => myUser && UserService.getFavorites(myUser.uid));

  const mutateAddFavorite = useMutation((recipeId: number) => UserService.addFavorite(myUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search', myUser?.uid]);
    },
  });

  const mutateRemoveFavorite = useMutation((recipeId: number) => UserService.removeFavorite(myUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites-search', myUser?.uid]);
    },
  });

  const handleFavoriteClick = async (recipeId: number) => {
    if (myUser && favorites) {
      if (favorites.includes(recipeId)) {
        await mutateRemoveFavorite.mutateAsync(recipeId);
      } else {
        await mutateAddFavorite.mutateAsync(recipeId);
      }

      // update the favorites query data
      refetchFavorites();
      console.log(favorites, recipeId);
    }
  };

  return (
    <div>
      <div>
        Résultats:
      </div>
      {isLoading && isLoadingFavorites && <CircularProgress />}

      <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
        {data && data.map((recipe) => (
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

    </div>
  );
}

export default Search;
