import React from 'react';
import {
  Box, Flex, Grid, IconButton, Spinner, Stack, Image, Heading, SimpleGrid,
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
  if (isLoadingRecipes || isLoadingFavorites) return <Spinner size="xl" />;

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
      {recipes && (
        <SimpleGrid minChildWidth="30em">
          {recipes.map((recipe) => (
            <Flex key={recipe.id} p={4} bg="white" boxShadow="md" borderRadius="md" width="20em" margin="1em" marginTop="3em">
              <Box
                role="group"
                p={6}
                maxW="330px"
                w="full"
                bg="gray.200"
                boxShadow="2xl"
                rounded="lg"
                pos="relative"
                zIndex={1}
              >
                <Box
                  rounded="lg"
                  mt={-12}
                  pos="relative"
                  height="230px"
                  _after={{
                    transition: 'all .3s ease',
                    content: '""',
                    w: 'full',
                    h: 'full',
                    pos: 'absolute',
                    top: 5,
                    left: 0,
                    backgroundImage: `url(${recipe.image})`,
                    filter: 'blur(15px)',
                    zIndex: -1,
                  }}
                  _groupHover={{
                    _after: {
                      filter: 'blur(20px)',
                    },
                  }}
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
                  <Image
                    rounded="lg"
                    height="230px"
                    width="282px"
                    objectFit="cover"
                    src={recipe.image}
                  />
                </Box>
                <Stack pt={10} align="center">
                  <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                    {recipe.title}
                  </Heading>

                </Stack>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      )}
    </Grid>
  );
}

export default RecipesSearched;
