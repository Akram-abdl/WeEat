import { createStandaloneToast } from '@chakra-ui/react';
import { z } from 'zod';
import { IngredientAutoComplete } from '../interfaces/IngredientAutoComplete';
import RandomRecipes from '../interfaces/RandomRecipes';
import { Recipe, RecipeSchema } from '../interfaces/Recipe';
import { RecipeInformation, RecipeInformationSchema } from '../interfaces/RecipeInformation';
import { SpoonacularSearchDataSchema, IngredientsAutocompleteResponseData } from '../interfaces/SpoonacularData';

interface SearchRecipesParameters {
  query: string;
  includeIngredients?: string[]
}

interface AutoCompleteIngredientParameters {
  query: string
}

interface RecipeInformationParameters {
  ids: number[]
}

const { toast } = createStandaloneToast();
const warningID = 'warningID';
class SpoonacularService {
  private apiUrl = import.meta.env.VITE_SPOONACULAR_API_URL;

  private apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  async searchRecipes(parameters: SearchRecipesParameters): Promise<Recipe[]> {
    if (parameters.query.trim() === '') return [];

    const data = await this.call('recipes/complexSearch', { ...parameters, number: 10 });

    const spoonacularData = SpoonacularSearchDataSchema.parse(data);

    const recipes = z.array(RecipeSchema).parse(spoonacularData.results);

    return recipes;
  }

  async searchRecipeInformationBulk(parameters: RecipeInformationParameters): Promise<Recipe[]> {
    if (parameters.ids.length === 0) return [];

    const data = await this.call('recipes/informationBulk', parameters);

    const recipesInformation = z.array(RecipeInformationSchema).parse(data);
    return recipesInformation;
  }

  async searchRecipeInformation(recipeID: number): Promise<RecipeInformation> {
    const data = await this.call(`recipes/${recipeID}/information?apiKey=${this.apiKey}`);

    const recipesInformation = RecipeInformationSchema.parse(data);
    return recipesInformation;
  }

  async searchRandomRecipes(): Promise<RecipeInformation[]> {
    const parameters = { number: 5 };
    const data = await this.call('recipes/random', parameters);

    const randomRecipes: RandomRecipes = data;

    const recipes = z.array(RecipeInformationSchema).parse(randomRecipes.recipes);

    return recipes;
  }

  // eslint-disable-next-line class-methods-use-this
  async autoCompleteIngredient(parameters: AutoCompleteIngredientParameters): Promise<IngredientAutoComplete[]> {
    if (parameters.query?.trim() === '') return [];

    const data = await this.call('food/ingredients/autocomplete', { ...parameters, number: 5 });

    const ingredients = IngredientsAutocompleteResponseData.parse(data);

    return ingredients;
  }

  private async call(url: string, parameters?: object) {
    let response: Response;

    if (parameters) {
      response = await fetch(`${this.apiUrl}/${url}${this.createUrlParameters(parameters)}`);
    } else {
      response = await fetch(`${this.apiUrl}/${url}`);
    }

    const data = await response.json();
    if (!response.ok) {
      if (!toast.isActive(warningID)) {
        toast({
          id: warningID,
          title: response.statusText,
          description: data.message,
          status: 'error',
          position: 'top',
          isClosable: true,
          duration: 4000,
        });
      }
      throw new Error(response.statusText);
    }
    return data;
  }

  private createUrlParameters(parameters: object) {
    return Object.entries(parameters).reduce((url, [parameterKey, parameterValue]) => {
      const newUrl = `${url}&${parameterKey}=`;

      if (Array.isArray(parameterValue) && parameterValue.length > 0) return `${newUrl}${parameterValue.join(',')}`;
      if (typeof parameterValue === 'string' && parameterValue.trim() !== '') return `${newUrl}${parameterValue}`;
      if (typeof parameterValue === 'number') return `${newUrl}${parameterValue}`;

      return url;
    }, `?apiKey=${this.apiKey}`);
  }
}

export default new SpoonacularService();
