import React from 'react';
import {
  Stack, Heading, Image, Flex, Box,
} from '@chakra-ui/react';
import useUser from '../../hooks/useUser';
import { Recipe } from '../../interfaces/Recipe';
import RecipeHeartButton from '../RecipeHeartButton/RecipeHeartButton';

interface Props {
  recipe: Recipe
}

function RecipeCard({ recipe }: Props) {
  const { favorites } = useUser();

  return (
    <Flex p={4} bg="white" boxShadow="md" borderRadius="md" width="20em" margin="1em">
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
          {Array.isArray(favorites)
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

  );
}

export default RecipeCard;
