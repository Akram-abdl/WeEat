import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react';
import IngredientFilter from './IngredientFilter';

function Filters() {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={2}
      align="stretch"
    >
      <IngredientFilter />
    </VStack>
  );
}

export default Filters;
