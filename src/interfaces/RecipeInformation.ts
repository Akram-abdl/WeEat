import { z } from 'zod';
import { IngredientSchema } from './Ingredient';
import { RecipeSchema } from './Recipe';

export const RecipeInformationSchema = RecipeSchema.extend({
  servings: z.number(),
  readyInMinutes: z.number(),
  license: z.string().optional(),
  sourceName: z.string(),
  sourceUrl: z.string(),
  spoonacularSourceUrl: z.string(),
  aggregateLikes: z.number(),
  healthScore: z.number(),
  spoonacularScore: z.number().optional(),
  pricePerServing: z.number(),
  analyzedInstructions: z.array(z.unknown()),
  cheap: z.boolean(),
  creditsText: z.string(),
  cuisines: z.array(z.string()),
  dairyFree: z.boolean(),
  diets: z.array(z.unknown()),
  gaps: z.string(),
  glutenFree: z.boolean(),
  instructions: z.string(),
  ketogenic: z.boolean().optional(),
  lowFodmap: z.boolean(),
  occasions: z.array(z.unknown()),
  sustainable: z.boolean(),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  veryHealthy: z.boolean(),
  veryPopular: z.boolean(),
  whole30: z.boolean().optional(),
  weightWatcherSmartPoints: z.number(),
  dishTypes: z.array(z.string()),
  extendedIngredients: z.array(IngredientSchema),
  summary: z.string(),
  winePairing: z.unknown(),
});

export type RecipeInformation = z.infer<typeof RecipeInformationSchema>;
