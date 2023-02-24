import React from 'react';
import {
  Box, Flex, Heading, SimpleGrid, Stack, Image, Spinner, IconButton,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import SpoonacularService from '../../services/SpoonacularService';
import UserService from '../../services/UserService';
// import UserService from '../../services/UserService';
import { auth } from '../../utils/firebaseSetup';

function Favorites() {
  // const [queryParameters] = useSearchParams();
  const queryClient = useQueryClient();
  const myUser = auth.currentUser;
  const { currentUser } = auth;
  console.log('myUser', myUser);
  // const myIds = [782585, 715497, 716406];
  const {
    isLoading: isLoadingFavorites, data: favorites, refetch: refetchFavorites,
  } = useQuery(['favoritespage-search', myUser?.uid], () => myUser && UserService.getFavorites(myUser.uid));
  const mutateAddFavorite = useMutation((recipeId: number) => UserService.addFavorite(myUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favoritespage-search', myUser?.uid]);
    },
  });

  const mutateRemoveFavorite = useMutation((recipeId: number) => UserService.removeFavorite(myUser?.uid || '', recipeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['favoritespage-search', myUser?.uid]);
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
  const {
    isLoading, data,
  } = useQuery(
    ['favoriteBulk-search', favorites],
    () => favorites && SpoonacularService.searchRecipeInformationBulk({ ids: favorites }),
    { retry: false, refetchOnWindowFocus: false },
  );
  console.log('favorites', favorites, 'data', data);
  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>My Favorites</Heading>
      {isLoading && isLoadingFavorites && <Spinner size="xl" />}
      {data && (
        <SimpleGrid minChildWidth="30em">
          {data.map((recipe) => (
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
    </Box>
  );
}

export default Favorites;
