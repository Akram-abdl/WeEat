import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import filterIngredientsAtom from '../atoms/filtersAtom';
import SpoonacularService from '../services/SpoonacularService';
import useUser from './useUser';

const useSpoonacular = () => {
  const { userDetails } = useUser();

  const {
    isLoading: isLoadingFavorites, data: favorites,
  } = useQuery(
    ['spoonacular-favorite-recipe-information-bulk', userDetails],
    () => userDetails && SpoonacularService.searchRecipeInformationBulk({ ids: userDetails.favorites }),
    { retry: false, refetchOnWindowFocus: false, enabled: !!userDetails },
  );

  const {
    isLoading: isLoadingSuggestedRecipes, data: suggestedRecipes,
  } = useQuery(
    ['spoonacular-suggested-search', userDetails],
    () => userDetails && SpoonacularService.searchRecipes({ query: userDetails.diet }),
    { retry: false, refetchOnWindowFocus: false, enabled: !!userDetails },
  );

  const {
    isLoading: isLoadingRandomRecipes, data: randomRecipes,
  } = useQuery(
    ['spoonacular-search'],
    () => SpoonacularService.searchRandomRecipes(),
    { retry: false, refetchOnWindowFocus: false },
  );

  const filterIngredients = useRecoilValue(filterIngredientsAtom);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    isLoading: isLoadingSearchRecipes, data: searchRecipes,
  } = useQuery(
    ['spoonacular-search-recipes', searchTerm, filterIngredients],
    () => SpoonacularService.searchRecipes({ query: searchTerm, includeIngredients: filterIngredients }),
    { retry: false, refetchOnWindowFocus: false },
  );

  return {
    favorites,
    isLoadingFavorites,
    suggestedRecipes,
    isLoadingSuggestedRecipes,
    randomRecipes,
    isLoadingRandomRecipes,
    isLoadingSearchRecipes,
    searchRecipes,
    setSearchTerm,
  };
};

export const getDetails = (recipeID: number) => {
  const {
    isLoading: isLoadingRecipeDetails, data: recipeDetails,
  } = useQuery(
    ['spoonacular-recipe-details', recipeID],
    () => SpoonacularService.searchRecipeInformation(recipeID),
    { retry: false, refetchOnWindowFocus: false },
  );

  return { isLoadingRecipeDetails, recipeDetails };
};

export default useSpoonacular;
