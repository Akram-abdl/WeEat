import React from 'react';
import {
  Box, CircularProgress, Flex, Heading, SimpleGrid, Stack, Image,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import SpoonacularService from '../../services/SpoonacularService';
import { RecipeInformation } from '../../interfaces/RecipeInformation';
// import UserService from '../../services/UserService';
// import { auth } from '../../utils/firebaseSetup';

function Favorite() {
  // const [queryParameters] = useSearchParams();
  // const queryClient = useQueryClient();
  // const myUser = auth.currentUser;
  const myIds = [782585, 715497, 716406];
  // const {
  //   isLoading: isLoadingFavorites, data: favorites, refetch: refetchFavorites,
  // } = useQuery(['favoritespage-search', myUser?.uid], () => myUser && UserService.getFavorites(myUser.uid));
  // const mutateAddFavorite = useMutation((recipeId: number) => UserService.addFavorite(myUser?.uid || '', recipeId), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['favoritespage-search', myUser?.uid]);
  //   },
  // });

  // const mutateRemoveFavorite = useMutation((recipeId: number) => UserService.removeFavorite(myUser?.uid || '', recipeId), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['favoritespage-search', myUser?.uid]);
  //   },
  // });

  const {
    isLoading, data,
  } = useQuery(['favoriteBulk-search', myIds], () => SpoonacularService.searchRecipeInformationBulk({ ids: myIds }));
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>My Favorites</Heading>
      {isLoading && <CircularProgress />}
      {data && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {data.map((recipe) => (
            <Flex key={recipe.id} p={4} bg="white" boxShadow="md" borderRadius="md">
              <Box
                role="group"
                p={6}
                maxW="330px"
                w="full"
                bg="gray.800"
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
    </Box>
  );
}

export default Favorite;
