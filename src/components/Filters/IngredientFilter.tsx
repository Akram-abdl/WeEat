import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  chakraComponents, MultiValue, Select,
} from 'chakra-react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import useLazyQuery from '../../hooks/useLazyQuery';
import SpoonacularService from '../../services/SpoonacularService';
import { IngredientAutoComplete } from '../../interfaces/IngredientAutoComplete';
import filterIngredientsAtom from '../../atoms/filtersAtom';

// These are the defaults for each of the custom props
const asyncComponents = {
  LoadingIndicator: (props: any) => (
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color="currentColor" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor="transparent"
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize="md"
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed="0.45s"
      // A CSS size string representing the thickness of the spinner's line
      thickness="2px"
      // Don't forget to forward the props!
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  ),
};

function IngredientFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [trigger, query] = useLazyQuery(['spoonacular-search-ingredient', searchTerm], () => SpoonacularService.autoCompleteIngredient(searchTerm));

  const setFilterIngredients = useSetRecoilState(filterIngredientsAtom);

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);

    trigger();
  };

  const queryClient = useQueryClient();

  const handleClick = (ingredientsAutoCompleted: MultiValue<IngredientAutoComplete>) => {
    setFilterIngredients(ingredientsAutoCompleted.map((ingredientAutoCompleted) => ingredientAutoCompleted.name));
    queryClient.invalidateQueries({ queryKey: ['spoonacular-search'] });
  };

  return (
    <Box>
      <p>Ingrédients</p>
      <Select
        isMulti
        name="ingredients"
        options={query.data}
        placeholder="Choisissez des ingrédients..."
        onChange={(values) => handleClick(values)}
        components={asyncComponents}
        isLoading={searchTerm !== '' && query.isLoading}
        onInputChange={handleSearch}
        getOptionLabel={(v) => v.name}
        getOptionValue={(v) => v.name}
      />
    </Box>
  );
}

export default IngredientFilter;
