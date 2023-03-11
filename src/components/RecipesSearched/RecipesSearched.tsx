import React, { useEffect } from 'react';
import {
  Box, Flex, Grid, Spinner, Stack, Image, Heading, SimpleGrid,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import RecipeHeartButton from '../RecipeHeartButton/RecipeHeartButton';
import useSpoonacular from '../../hooks/useSpoonacular';
import useUser from '../../hooks/useUser';

function RecipesSearched() {
  const [queryParameters] = useSearchParams();

  const { user, favorites } = useUser();

  const searchTerm = queryParameters.get('searchTerm') ?? '';

  const {
    setSearchTerm, isLoadingSearchRecipes, searchRecipes,
  } = useSpoonacular();

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm]);

  if (isLoadingSearchRecipes) return <Spinner size="xl" />;

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={2}>
      {searchRecipes && (
        <SimpleGrid minChildWidth="30em">
          {searchRecipes.map((recipe) => (
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
                  {Array.isArray(favorites) && !!user
                    && (
                      <RecipeHeartButton recipeId={recipe.id} isFavorite={favorites.includes(recipe.id)} />
                    )}
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
