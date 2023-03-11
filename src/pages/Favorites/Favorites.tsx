import React from 'react';
import {
  Box, Flex, Heading, SimpleGrid, Stack, Image, Spinner,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
// import UserService from '../../services/UserService';
import useUser from '../../hooks/useUser';
import useSpoonacular from '../../hooks/useSpoonacular';
import RecipeHeartButton from '../../components/RecipeHeartButton/RecipeHeartButton';

function Favorites() {
  const {
    user, favorites,
  } = useUser();

  const { favorites: favoritesRecipes, isLoadingFavorites: isLoadingFavoritesRecipes } = useSpoonacular();

  if (!user) return <Navigate to="/" />;

  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4}>My Favorites</Heading>
      {isLoadingFavoritesRecipes && <Spinner size="xl" />}
      {!!favoritesRecipes && !!favorites && (
        <SimpleGrid minChildWidth="30em">
          {favoritesRecipes.map((recipe) => (
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
                  <RecipeHeartButton recipeId={recipe.id} isFavorite={favorites.includes(recipe.id)} />
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
