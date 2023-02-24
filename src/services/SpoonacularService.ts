import { z } from 'zod';
import ingredientsAutocompleteResponse from '../data/ingredientsAutocompleteResponse';
import recipesSearchedResponse from '../data/recipesSearchedResponse';
import { IngredientAutoComplete } from '../interfaces/IngredientAutoComplete';
import { Recipe, RecipeSchema } from '../interfaces/Recipe';
import { RecipeInformationSchema } from '../interfaces/RecipeInformation';
import { SpoonacularSearchDataSchema, IngredientsAutocompleteResponseData } from '../interfaces/SpoonacularData';

interface SearchRecipesParameters {
  query?: string;
  includeIngredients?: string[]
}

interface AutoCompleteIngredientParameters {
  query: string
}

interface RecipeInformationParameters {
  ids: number[]
}

class SpoonacularService {
  private apiUrl = import.meta.env.VITE_SPOONACULAR_API_URL;

  private apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  async searchRecipes(parameters: SearchRecipesParameters): Promise<Recipe[]> {
    if (parameters.query?.trim() === '') return [];

    // const response = await this.call('recipes/complexSearch', { ...parameters, number: 10 });

    // const data = await response.json();
    const data = recipesSearchedResponse; // TESTS ONLY

    const spoonacularData = SpoonacularSearchDataSchema.parse(data);

    const recipes = z.array(RecipeSchema).parse(spoonacularData.results);

    return recipes;
  }

  async searchRecipeInformationBulk(parameters: RecipeInformationParameters): Promise<Recipe[]> {
    if (parameters.ids.length === 0) return [];

    const response = await this.call('recipes/informationBulk', parameters);
    console.log('response :', response);
    const data = await response.json();
    console.log('data service :', data);
    const recipesInformation = z.array(RecipeInformationSchema).parse(data);
    console.log('recipesInformation :', recipesInformation);
    return recipesInformation;
  }

  // eslint-disable-next-line class-methods-use-this
  async autoCompleteIngredient(parameters: AutoCompleteIngredientParameters): Promise<IngredientAutoComplete[]> {
    if (parameters.query?.trim() === '') return [];

    // const response = await this.call('food/ingredients/autocomplete', { ...parameters, number: 5 });

    // const data = await response.json();
    const data = ingredientsAutocompleteResponse;

    const ingredients = IngredientsAutocompleteResponseData.parse(data);

    return ingredients;
  }

  private async call(url: string, parameters: object) {
    return fetch(`${this.apiUrl}/${url}${this.createUrlParameters(parameters)}`);
  }

  private createUrlParameters(parameters: object) {
    return Object.entries(parameters).reduce((url, [parameterKey, parameterValue]) => {
      const newUrl = `${url}&${parameterKey}=`;

      if (Array.isArray(parameterValue) && parameterValue.length > 0) return `${newUrl}${parameterValue.join(',')}`;
      if (typeof parameterValue === 'string' && parameterValue.trim() !== '') return `${newUrl}${parameterValue}`;
      if (typeof parameterValue === 'number') return `${newUrl}${parameterValue}`;

      console.error(`Invalid parameter '${parameterKey}' -> '${parameterValue}'`);

      return url;
    }, `?apiKey=${this.apiKey}`);
  }
}

export default new SpoonacularService();
