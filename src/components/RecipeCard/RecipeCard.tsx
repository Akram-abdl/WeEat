import {
  Card, CardBody, Stack, Heading, Divider, CardFooter, Button, Image, Spinner,
} from '@chakra-ui/react';
import React from 'react';
import { Recipe } from '../../interfaces/Recipe';

interface Props {
  recipe: Recipe
}

function RecipeCard({ recipe }: Props) {
  return (
    <div>
      {recipe
        ? (
          <Card maxW="sm" align="center">
            <CardBody>
              <Image
                src={recipe.image}
                alt={recipe.title}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{recipe.title}</Heading>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                View recipe
              </Button>
            </CardFooter>
          </Card>
        )
        : <Spinner />}

    </div>

  );
}

export default RecipeCard;
