import { z } from 'zod';
import ingredientsAutocompleteResponse from '../data/ingredientsAutocompleteResponse';
import recipesSearchedResponse from '../data/recipesSearchedResponse';
import { IngredientAutoComplete } from '../interfaces/IngredientAutoComplete';
import { Recipe, RecipeSchema } from '../interfaces/Recipe';
import { SpoonacularSearchDataSchema, IngredientsAutocompleteResponseData } from '../interfaces/SpoonacularData';

class SpoonacularService {
  private apiUrl = import.meta.env.VITE_SPOONACULAR_API_URL;

  private apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  async searchRecipes(searchTerm: string): Promise<Recipe[]> {
    // const url = this.addApiKeyToUrl(`${this.apiUrl}/recipes/complexSearch?query=${searchTerm}`);
    // const response = await fetch(url, {});

    // const data = await response.json();
    const data = recipesSearchedResponse; // TESTS ONLY

    const spoonacularData = SpoonacularSearchDataSchema.parse(data);

    const recipes = z.array(RecipeSchema).parse(spoonacularData.results);

    return recipes;
  }

  // eslint-disable-next-line class-methods-use-this
  async autoCompleteIngredient(searchTerm: string): Promise<IngredientAutoComplete[]> {
    if (searchTerm === '' || searchTerm.trim() === '') return [];
    console.log('autoCompleteIngredient', searchTerm);

    // const url = this.addApiKeyToUrl(`${this.apiUrl}/food/ingredients/autocomplete?query=${searchTerm}&number=5`);
    // const response = await fetch(url, {});

    // const data = await response.json();
    const data = ingredientsAutocompleteResponse;

    const ingredients = IngredientsAutocompleteResponseData.parse(data);

    return ingredients;
  }

  addApiKeyToUrl(url: string) {
    const splittedUrl = url.split('?');

    const newUrl = `${splittedUrl[0]}?apiKey=${this.apiKey}${splittedUrl[1] ? `&${splittedUrl[1]}` : null}`;

    return newUrl;
  }
}

export default new SpoonacularService();
