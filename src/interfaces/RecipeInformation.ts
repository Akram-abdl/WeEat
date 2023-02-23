import { z } from 'zod';
import { RecipeSchema } from './Recipe';

export const RecipeInformationSchema = RecipeSchema.extend({
  servings: z.number(),
  readyInMinutes: z.number(),
  license: z.string(),
  sourceName: z.string(),
  sourceUrl: z.string(),
  spoonacularSourceUrl: z.string(),
  aggregateLikes: z.number(),
  healthScore: z.number(),
  spoonacularScore: z.number(),
  pricePerServing: z.number(),
  analyzedInstructions: z.array(z.unknown()),
  cheap: z.boolean(),
  creditsText: z.string(),
  cuisines: z.array(z.string()),
  dairyFree: z.boolean(),
  diets: z.array(z.unknown()),
  gaps: z.boolean(),
  glutenFree: z.boolean(),
  instructions: z.string(),
  ketogenic: z.boolean(),
  lowFodmap: z.boolean(),
  occasions: z.array(z.unknown()),
  sustainable: z.boolean(),
  vegan: z.boolean(),
  vegetarian: z.boolean(),
  veryHealthy: z.boolean(),
  veryPopular: z.boolean(),
  whole30: z.boolean(),
  weightWatcherSmartPoints: z.number(),
  dishTypes: z.array(z.string()),
  extendedIngredients: z.array(z.unknown()),
  summary: z.string(),
  winePairing: z.unknown(),
});

export type RecipeInformation = z.infer<typeof RecipeInformationSchema>;
